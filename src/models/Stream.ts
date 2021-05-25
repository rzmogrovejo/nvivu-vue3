import { nextTick } from '@vue/runtime-core';
import axios from 'axios';
import Hls from 'hls.js';
import Channel from '../contracts/Channel';
import snakeToCamel from '../utils/snakeToCamel';

interface HtmlTags { 'iframe': string; 'video': string }

export default class Stream {
	private html: string;
	private toggle: boolean;

	constructor() {
		this.html = "";
		this.toggle = false;
	}

	public setToggle(toggle: boolean) {
		this.toggle = toggle;
	}

	public getToggle() {
		return this.toggle;
	}

	public getHtml() {
		return this.html;
	}

	private emptyHtml() {
		this.html = "";
	}

	private resolveSource(channel: Channel) {
		const condition = channel.stream.allow && 'url' in channel.stream;
		return condition ? channel.stream.url! : channel.url;
	}

	private resolveHtml(channel: Channel, source: string) {
		const condition = 'type' in channel.stream;
		this.html = condition ? this.htmlTags(source)[channel.stream.type as keyof HtmlTags].trim() : '';
	}

	public resolveStream(channel: Channel) {

		this.emptyHtml();

		const slugToCamel = snakeToCamel(channel.slug);

		if (typeof (this as any)[slugToCamel] === "function") {
			(this as any)[slugToCamel](channel);
			return;
		}

		const source = this.resolveSource(channel);
		this.resolveHtml(channel, source);
	}

	private async atv(channel: Channel) {
		const tokenEndpoint = "https://past-server.nedp.io/token/pe-atv-atv?rsk=";
		this.resolveAtv(channel, tokenEndpoint);
	}

	private async atvMas(channel: Channel) {
		const tokenEndpoint = "https://past-server.nedp.io/token/pe-atv-atv-mas?rsk=";
		this.resolveAtv(channel, tokenEndpoint);
	}

	private async resolveAtv(channel: Channel, tokenEndpoint: string) {
		// i'm going to fetch the script, run it and get the hash
		const html = await axios
			.get('https://url-scrapper-v1.herokuapp.com/?url=' + channel.url)
			.then(response => response.data.html);
		
		const startHashScript = html.indexOf('_0x5d50') - 4; // 56852 - 4
		const endHashScript = html.indexOf('past-server') - 27; // 58007 - 27

		let hashScript = html.substring(startHashScript, endHashScript);

		const nullPos = hashScript.indexOf('null') + 7;
		const equalPos = hashScript.indexOf('=', nullPos) + 1;

		const varResult = hashScript.substring(nullPos,equalPos);

		hashScript = hashScript.replace(varResult, "return ");

		const hashScriptValue = (new Function (hashScript))();

		// if the script returns undefined then a fallback should be applied
		if (hashScriptValue == undefined) {
			this.html = this.htmlTags(channel.url)['iframe'].trim();
			return;
		}

		// if the script returns the hash then request the token
		const token = await axios
			.get(tokenEndpoint + hashScriptValue)
			.then(response => response.data.token);

		const source = this.resolveSource(channel) + token;
		this.resolveHtml(channel, source);		

		nextTick(() => {
			const video: any = document.getElementById("video");
			if (Hls.isSupported()) {
				const hls = new Hls();
				hls.loadSource(source);
				hls.attachMedia(video);
			} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
				video.src = source;
			}
		})
	}

	private htmlTags(url?: string): HtmlTags {
		return {
			'iframe': `
				<iframe 
					id="iframe"
					style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden" 
					frameborder="0" 
					type="text/html" 
					src="${ url }"
					width="100%" 
					height="100%"
					allowfullscreen 
					allow="autoplay">
				</iframe>
			`,
			'video': `
				<video 
					id="video"
					style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;" 
					autoplay
					controls>
				</video>			
			`
		}
	}
}
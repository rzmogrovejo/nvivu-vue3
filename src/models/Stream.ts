import { nextTick } from '@vue/runtime-core';
import axios from 'axios';
import Hls from 'hls.js';
import Channel from '../contracts/Channel';

interface HtmlTags { 'iframe': string; 'video': string }

export default class Stream {
	private source: string;
	private html: string;
	private toggle: boolean;
	private channel?: Channel;

	constructor() {
		this.source = "";
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

	public resolveSourceAndHtml(channel: Channel) {
		let condition = channel.stream.allow && 'url' in channel.stream;
		this.source = condition ? channel.stream.url! : channel.url;

		this.html = "";

		if (channel.name == 'ATV') {
			// i'm going to fetch the script, run it and then get the token
			axios.get('https://url-scrapper-v1.herokuapp.com/?url=' + channel.url).then((response) => {
				const html = response.data.html;
	
				const startHashScript = html.indexOf('_0x5d50') - 4; // 56852 - 4
				const endHashScript = html.indexOf('past-server') - 27; // 58007 - 27
	
				let hashScript = html.substring(startHashScript, endHashScript);
	
				const nullPos = hashScript.indexOf('null') + 7;
				const equalPos = hashScript.indexOf('=', nullPos) + 1;
	
				const varResult = hashScript.substring(nullPos,equalPos);
	
				hashScript = hashScript.replace(varResult, "return ");
	
				const hashScriptFunction = new Function (hashScript);
	
				axios.get("https://past-server.nedp.io/token/pe-atv-atv?rsk=" +  hashScriptFunction()).then((response) => {
					this.source = this.source + response.data.token
					console.log(this.source);

					condition = 'type' in channel.stream;
					this.html = condition ? this.htmlTags(this.source)[channel.stream.type as keyof HtmlTags].trim() : '';

					nextTick(() => {
						const video: any = document.getElementById("video");
						if (Hls.isSupported()) {
							const hls = new Hls();
							hls.loadSource(this.source);
							hls.attachMedia(video);
						} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
							video.src = this.source;
						}
					})
				});	
			})
		} else {
			condition = 'type' in channel.stream;
			this.html = condition ? this.htmlTags(this.source)[channel.stream.type as keyof HtmlTags].trim() : '';
		}
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
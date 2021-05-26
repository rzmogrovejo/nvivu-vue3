import { nextTick } from '@vue/runtime-core';
import axios from 'axios';
import Hls from 'hls.js';
import RawChannel from '../contracts/RawChannel';
import Channel from './Channel';

export default class Stream {
	private html: string;

	constructor() {
		this.html = '';
	}

	public getHtml() {
		return this.html;
	}

	private emptyHtml() {
		this.html = '';
	}

	private setHtmlContent(contentType: string, source?: string) {
		this.html = (this.htmlContent(source) as any)[contentType].trim();
	}

	private resolveHtml(channel: Channel, source?: string) {		
		if (!channel.content().enable()) {
			this.emptyHtml();
			return;
		}

		source = source || channel.content().source();

		this.setHtmlContent(channel.content().type(), source);
	}

	public resolveStream(rawChannel: RawChannel) {
		this.emptyHtml();
		this.setHtmlContent('loading');

		const channel = new Channel(rawChannel);

		const slugInCamel = channel.slugInCamel();

		if (typeof (this as any)[slugInCamel] === "function") {
			(this as any)[slugInCamel](channel);
			return;
		}

		if (!channel.content().enable()) {
			this.setHtmlContent('blank', channel.source())
			window.open(channel.source(), '_blank');
			return;
		}

		this.resolveHtml(channel);
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
			.get('https://url-scrapper-v1.herokuapp.com/?url=' + channel.source())
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
			this.setHtmlContent('blank', channel.source())
			window.open(channel.source(), '_blank');
			return;
		}

		// if the script returns the hash then request the token
		const token = await axios
			.get(tokenEndpoint + hashScriptValue)
			.then(response => response.data.token);

		const source = channel.content().source() + token;
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
		});
	}

	private htmlContent(source?: string) {
		return {
			'iframe': `
				<iframe 
					id="iframe"
					style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden" 
					frameborder="0" 
					type="text/html" 
					src="${ source }"
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
			`,
			'blank': `
				<div
					style="
						color: white;
    					margin: 0;
    					position: absolute;
    					top: 50%;
    					left: 50%;
    					transform: translate(-50%, -50%);">
					Transmisión en un nueva ventana
				</div>
			`,
			'loading': `
				<div
					style="
						color: white;
    					margin: 0;
    					position: absolute;
    					top: 50%;
    					left: 50%;
    					transform: translate(-50%, -50%);">
					Cargando...
				</div>
			`
		}
	}
}
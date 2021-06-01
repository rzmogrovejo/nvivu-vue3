import { deleteUrlParam, insertUrlParam } from '@/utils/urlParam';
import axios from 'axios';
import Hls from 'hls.js';
import RawChannel from '../contracts/RawChannel';
import Channel from './Channel';

export default class Stream {
	private html: string;
	private hls: Hls;

	constructor() {
		this.html = '';
		this.hls = new Hls();
	}

	public getHtml() {
		return this.html;
	}

	public emptyHtml() {
		this.html = '';
		this.hls.destroy();
		deleteUrlParam('c');
	}

	private setHtmlContent(contentType: string, source?: string) {
		this.html = (this.htmlContent(source) as any)[contentType].trim();
	}

	private resolveHtml(channel: Channel, source?: string) {
		source = source || channel.content().source();
		this.setHtmlContent(channel.content().type(), source);

		if (channel.content().isVideoType()) {
			setTimeout(() => {
				const video: any = document.getElementById("video");
				if (Hls.isSupported()) {
					console.log(source);
					const myHls = this.hls = new Hls();
					myHls.attachMedia(video);
					myHls.on(Hls.Events.MEDIA_ATTACHED, () => {
						console.log("video and hls.js are now bound together !");
						myHls.loadSource(source!);
						myHls.on(Hls.Events.MANIFEST_PARSED, (event: any, data: any) => {
							console.log("manifest loaded, found " + data.levels.length + " quality level");
							video.play();
						});
					});
					const _this = this;
					myHls.on(Hls.Events.ERROR, function (event, data) {
						if (data.fatal) {
							switch (data.type) {
								case Hls.ErrorTypes.NETWORK_ERROR:
									// try to recover network error
									console.log('fatal network error encountered, try to recover');
									//myHls.startLoad();
									_this.setHtmlContent('blank', channel.source())
									myHls.destroy();
									break;
								case Hls.ErrorTypes.MEDIA_ERROR:
									console.log('fatal media error encountered, try to recover');
									myHls.recoverMediaError();
									//_this.setHtmlContent('blank', channel.source())
									break;
								default:
									// cannot recover
									_this.setHtmlContent('blank', channel.source())
									myHls.destroy();
									break;
							}
						}
					});
				} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
					video.src = source;
				}
			}, 4000)
		}
	}

	public resolveStream(rawChannel: RawChannel) {
		this.emptyHtml();
		this.setHtmlContent('loading');

		const channel = new Channel(rawChannel);

		insertUrlParam('c', channel.slug());

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
		const tokenEndpoint = "https://past-server.nedp.io/token/pe-atv-atv?rsk=3cb59ec005bace19610c8f9dbb13edcae11573ca";
		this.resolveAtv(channel, tokenEndpoint);
	}

	private async atvMas(channel: Channel) {
		const tokenEndpoint = "https://past-server.nedp.io/token/pe-atv-atv-mas?rsk=ba027770d3e875225dc22db025b2f128dcdbf652";
		this.resolveAtv(channel, tokenEndpoint);
	}

	private async resolveAtv(channel: Channel, tokenEndpoint: string) {
		const token = await axios
			.get(tokenEndpoint)
			.then(response => response.data.token);

		const source = channel.content().source() + token;
		this.resolveHtml(channel, source);
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
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
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
    					transform: translate(-50%, -50%);
						text-align: center;">
					¡Ups! Recarga la página o visita la <a class="no-underline hover:underline text-blue-500" href="${ source }" target="_blank">página del canal</a>.
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
    					transform: translate(-50%, -50%);
						text-align: center;">
					Cargando...
				</div>
			`
		}
	}
}
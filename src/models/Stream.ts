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

		condition = 'type' in channel.stream;
		this.html = condition ? this.htmlTags(this.source)[channel.stream.type as keyof HtmlTags].trim() : '';
	}

	private htmlTags(url: string): HtmlTags {
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
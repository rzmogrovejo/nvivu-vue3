if (channel.stream.type == 'video') {
	this.streamHtml = videoTag;
	this.$nextTick(() => {
		//let video: any = this.$refs["video"];
		let video: any = document.getElementById("video");

		if (channel.name == "ATV") {
			getStreamUrlWithToken(this.streamUrl).then((streamUrl) => {
				if (Hls.isSupported()) {
					let hls = new Hls();
					hls.loadSource(streamUrl);
					hls.attachMedia(video);
				} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
					video.src = streamUrl;
				}
			});
		} else {
			let stream = this.streamUrl;

			if (Hls.isSupported()) {

				let hls = new Hls();
				hls.loadSource(stream);
				hls.attachMedia(video);
			} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
				video.src = stream;
			}
		}

	})
	} else if (channel.stream.type == 'iframe') {
	this.streamHtml = iframeTag;
	this.$nextTick(() => {
		let iframe: any = document.getElementById("iframe");

		console.log(iframe.contentWindow);
	});
}

import axios from 'axios';

export function getHash() {
	const _0x5d50: any = ['substring','split','length','join'];
	
	(function(_0x2fbeca,_0x302170){
		const _0x1ae02f = function(_0x1066ee: any){
			while(--_0x1066ee){
				_0x2fbeca['push'](_0x2fbeca['shift']());
			}
		};_0x1ae02f(++_0x302170);
	}(_0x5d50,0x14d));
	
	const _0x2fb6 = function(_0x2a2fed: any){
		_0x2a2fed=_0x2a2fed-0x0;
		const _0x45aef5=_0x5d50[_0x2a2fed];
		return _0x45aef5;
	};

	function qkdvfsprbazhwmxuigojcytnel(_0x577235:any,_0x101774:any){const _0x5ba90b=_0x101774[_0x2fb6('0x0')]('');const _0x104575=_0x5ba90b[_0x2fb6('0x1')];for(let _0x1b593c=_0x104575-0x1;_0x1b593c>=0x0;_0x1b593c--){const _0x543598=_0x1b593c*_0x577235%_0x104575;const _0x374569=_0x5ba90b[_0x1b593c];_0x5ba90b[_0x1b593c]=_0x5ba90b[_0x543598];_0x5ba90b[_0x543598]=_0x374569;}const _0x322c71=_0x5ba90b[_0x2fb6('0x2')]('');const _0x3b3d76=_0x322c71[_0x2fb6('0x3')](_0x104575-0x2,_0x104575);if(_0x3b3d76=='OK')return _0x322c71[_0x2fb6('0x3')](0x0,_0x104575-0x2);return null;}
	
	return qkdvfsprbazhwmxuigojcytnel(Math.floor(Date.now() / 3600000),'0563b09Kd695e6O091bfdad321ee0b2aada2d1c249') || qkdvfsprbazhwmxuigojcytnel(Math.floor(Date.now() / 3600000)-1,'0563b09Kd695e6O091bfdad321ee0b2aada2d1c249');
}

export async function getStreamUrlWithToken(url: string) {
	const response = await axios.get('https://past-server.nedp.io/token/pe-atv-atv?rsk=' + getHash());
	return url + response.data.token
}
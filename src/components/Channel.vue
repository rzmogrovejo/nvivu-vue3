<template lang="">
	<div>
		<ul class="">
			<li v-for="channel in channels" :key="channel">
				<a :href="!channel.stream.allow ? channel.url : 'javascript:void(0)'"
					:target="!channel.stream.allow ? '_blank' : '' "
					@click="toggleStream(channel)">
					{{ channel.name }}
				</a>	
				<span v-if="!channel.stream.allow"> (Se abre en una nueva ventana)</span>
			</li>
			<br/>
			<li><a href="javascript:void(0)" @click="offStream()">Apagar</a></li>
		</ul>
<!-- 		<div v-if="showStream" 
			style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
			<iframe 
				style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden" 
				frameborder="0" 
				type="text/html" 
				:src="streamUrl"
				width="100%" 
				height="100%"
				allowfullscreen 
				allow="autoplay">
			</iframe>
		</div> -->
		<div v-if="showStream" 
			style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
<!-- 			<video 
				ref="video"
				style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden" 
				autoplay
				controls>
			</video> -->
			<div v-html="streamHtml"></div>
		</div>
	</div>
</template>

<script lang = "ts">
import Hls from 'hls.js';
import { defineComponent } from 'vue';
import { getStreamUrlWithToken } from '../helpers/atv';


interface Channel {
	"name": string;
	"url": string;
	"number": {
		"national"?: string,
		"movistar-hd"?: string
	};
	"stream": {
		"allow": boolean,
		"type"?: string,
		"url"?: string
	}
}

const rawChannels = [
	{
		"name": "Latina",
		"url": "https://www.latina.pe/tvenvivo",
		"number": {
			"national": "2",
			"movistar-hd": "702"
		},
		"stream": {
			"allow": false,
			"type": "video",
			//"url": "https://live-normal-movistar-hls.latina.pe/egress/bhandler/cialatina/live/manifest.m3u8?nva=1628581848&ttl=432000&ip=190.237.122.66&hash=0a6a1a7776bda9e132d2a",
			"url": "https://live-normal-movistar-hls.latina.pe/egress/bhandler/cialatina/live/manifest.m3u8?nva=1628581848&ttl=432000&ip=190.237.122.66&hash=0a6a1a7776bda9e132d2a"
		}
	},
	{
		"name": "America TV",
		"url": "https://tvgo.americatv.com.pe/",
		"number": {
			"national": "4",
			"movistar-hd": "704"
		},
		"stream": {
			"allow": false,
			"type": "iframe",
			"url": "https://mdstrm.com/live-stream/5c51e67df4d3c6698b02bbee?jsapi=true&autoplay=true&player=5b8ea6f89ff52d0770a144c7&ref=https%3A%2F%2Ftvgo.americatv.com.pe%2F&access_token=f8138FWoO5LuzxSJxou0ENsqzVFCIG6k1k9cewp27m6qnQVZFHLwfLrnXAB8PULCsM3hPowUf9i",
			//"url": "https://mdstrm.com/live-stream-playlist/5c51e67df4d3c6698b02bbee.m3u8?uid=QC9pBD53YBxmKJk2Mxqk8V911Q3LEfGn&sid=TeVxC2UEKe1lctDnnCv2ED3vYrduVHgm&pid=9nBW6kZsmG8QsUVlPPfdFnUk4MlW4Jis&an=screen&at=web-app&av=v5.2.134&ref=https%3A%2F%2Ftvgo.americatv.com.pe%2F&res=803x452&without_cookies=false&dnt=true&access_token=f8138FWoO5LuzxSJxou0ENsqzVFCIG6k1k9cewp27m6qnQVZFHLwfLrnXAB8PULCsM3hPowUf9i"
		}
	},
	{
		"name": "Panamericana",
		"url": "https://panamericana.pe/tvenvivo",
		"number": {
			"national": "5",
			"movistar-hd": "705"
		},
		"stream": {
			"allow": true,
			"type": "iframe",
			"url": "https://www.dailymotion.com/embed/video/x774s7s?autoplay=1"
		}
	},
	{
		"name": "TV Perú",
		"url": "https://www.tvperu.gob.pe/play",
		"number": {
			"national": "7",
			"movistar-hd": "707"
		},
		"stream": {
			"allow": false,
			"type": "video",
			"url": "https://cdnh71.iblups.com/hls/R9WtilpKKB.m3u8"
		}
	},
	{
		"name": "ATV",
		"url": "https://www.atv.pe/envivo-atv",
		"number": {
			"national": "9",
			"movistar-hd": "709"
		},
		"stream": {
			"allow": false,
			"type": "video",
			"url": "https://pe-atv-atv-live.ned.media/atv/smil:atv.smil/playlist.m3u8?iut=",
			//"url": "https://pe-atv-atv-live.ned.media/atv/smil:atv.smil/playlist.m3u8?iut=eyJwYXJhbXMiOnsiZXhwIjoxNjIwODM5MDc3LCJzZXNzaW9uIjoiMTkwLjIzNy4xMjIuNjYiLCJ3aGl0ZWxpc3QiOlsiMTkwLjIzNy4xMjIuNjYiXX0sInNpZ25hdHVyZSI6ImMzZjMyZWYwNWZkYjMyMDhjNzE1OThkZDAyMmQ2NGUyNDlkNWI3ZDUifQ=="
		}
	},
	{
		"name": "Willax",
		"url": "https://willax.tv/en-vivo/",
		"number": {
			"national": "16",
			"movistar-hd": "716"
		},
		"stream": {
			"allow": true,
			"type": "iframe",
			"url": "https://www.dailymotion.com/embed/video/x7x4dgx?autoplay=1"
		}
	},
];

let channelsList: Channel[] = rawChannels;

export default defineComponent({
	name: 'Channel',
	data() {
		return {
			channels: channelsList,
			showStream: false,
			streamUrl: "",
			streamHtml: ""
		}
	},
	mounted() {

	},
	methods: {
		toggleStream(channel: Channel) {
			this.showStream = channel.stream.allow;

			if (channel.stream.allow) {
				this.streamUrl = 'url' in channel.stream ? channel.stream.url! : channel.url;	
			}

			let iframeTag: string = `
				<iframe 
					style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden" 
					frameborder="0" 
					type="text/html" 
					src="${ this.streamUrl }"
					width="100%" 
					height="100%"
					allowfullscreen 
					allow="autoplay">
				</iframe>
			`;

			let videoTag: string = `
				<video 
					id="video"
					style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;" 
					autoplay
					controls>
				</video>
			`;
			
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
			}
		},
		offStream(){
			this.showStream = false;
		}
	}
})

</script>
<style lang="css">

#video::-webkit-media-controls-timeline {
	display: none;
}
#video::-webkit-media-controls-current-time-display {
	display: none;
}
#video::-webkit-media-controls-time-remaining-display {
	display: none;
}


</style>
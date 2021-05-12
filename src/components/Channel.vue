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
			"allow": false
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
			"url": "https://iblups.com/e_tvperuHD"
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
			"allow": true,
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
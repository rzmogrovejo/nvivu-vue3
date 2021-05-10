<template lang="">
	<div>
		<ul class="">
			<li v-for="channel in channels" :key="channel">
				<a :href="!channel.iframe.allow ? channel.url : 'javascript:void(0)'"
					:target="!channel.iframe.allow ? '_blank' : '' "
					@click="toggleIframe(channel)">
					{{ channel.name }}
				</a>	
				<span v-if="!channel.iframe.allow"> (Se abre en una nueva ventana)</span>
			</li>
		</ul>
		<div v-if="showIframe" 
			style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
			<iframe 
				style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden" 
				frameborder="0" 
				type="text/html" 
				:src="iframeUrl" 
				width="100%" 
				height="100%"
				allowfullscreen 
				allow="autoplay">
			</iframe>
		</div>
	</div>
</template>

<script lang = "ts">
import { defineComponent } from 'vue';

interface Channel {
	"name": string;
	"url": string;
	"number": {
		"national"?: string,
		"movistar-hd"?: string
	};
	"iframe": {
		"allow": boolean
		"url"?: string,
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
		"iframe": {
			"allow": false
		}
	},
	{
		"name": "America TV",
		"url": "https://tvgo.americatv.com.pe/",
		"number": {
			"national": "4",
			"movistar-hd": "704"
		},
		"iframe": {
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
		"iframe": {
			"allow": true,
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
		"iframe": {
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
		"iframe": {
			"allow": false
		}
	},
	{
		"name": "Willax",
		"url": "https://willax.tv/en-vivo/",
		"number": {
			"national": "16",
			"movistar-hd": "716"
		},
		"iframe": {
			"allow": true,
			"url": "https://www.dailymotion.com/embed/video/x7x4dgx?autoplay=1"
		}
	},
];

let channelsList: Channel[] = rawChannels;

//console.log(channelsList);

export default defineComponent({
	name: 'Channel',
	data() {
		return {
			channels: channelsList,
			showIframe: false,
			iframeUrl: ""
		}
	},
	mounted() {		
		//console.log(this.channels);
	},
	methods: {
		toggleIframe(channel: Channel) {
			this.showIframe = channel.iframe.allow;
			if (channel.iframe.allow) {
				this.iframeUrl = 'url' in channel.iframe ? channel.iframe.url! : channel.url;
			}
		}
	}
})

</script>
<style lang="">
	
</style>
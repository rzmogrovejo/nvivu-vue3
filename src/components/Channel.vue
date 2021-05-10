<template lang="">
	<div>
		<ul class="">
			<li v-for="channel in channels" :key="channel">
				<a :href="!channel.allowIframe ? channel.website : 'javascript:void(0)'"
					:target="!channel.allowIframe ? '_blank' : '' "
					@click="toggleIframe(channel.website, channel.allowIframe)">
					{{ channel.name }}
				</a>	
				<span v-if="!channel.allowIframe"> (Se abre en una nueva ventana)</span>
			</li>
		</ul>
		<iframe 
			v-if="showIframe"
			width="100%"
			height="700"
			frameborder=0
			allow="fullscreen"
			:src="iframeUrl">
		</iframe>
	</div>
</template>

<script lang = "ts">
import { defineComponent } from 'vue';

interface Channel {
	"name": string;
	"website": string;
	"number": {
		"national"?: string,
		"movistar-hd"?: string
	};
	"allowIframe": boolean;
}

const rawChannels = [
	{
		"name": "Latina",
		"website": "https://www.latina.pe/tvenvivo",
		"number": {
			"national": "2",
			"movistar-hd": "702"
		},
		"allowIframe": false
	},
	{
		"name": "America TV",
		"website": "https://tvgo.americatv.com.pe/",
		"number": {
			"national": "4",
			"movistar-hd": "704"
		},
		"allowIframe": true
	},
	{
		"name": "Panamericana",
		"website": "https://panamericana.pe/tvenvivo",
		"number": {
			"national": "5",
			"movistar-hd": "705"
		},
		"allowIframe": true
	},
	{
		"name": "TV Perú",
		"website": "https://www.tvperu.gob.pe/play",
		"number": {
			"national": "7",
			"movistar-hd": "707"
		},
		"allowIframe": false
	},
	{
		"name": "ATV",
		"website": "https://www.atv.pe/envivo-atv",
		"number": {
			"national": "9",
			"movistar-hd": "709"
		},
		"allowIframe": true
	},
	{
		"name": "Willax",
		"website": "https://willax.tv/en-vivo/",
		"number": {
			"national": "16",
			"movistar-hd": "716"
		},
		"allowIframe": true
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
		toggleIframe(iframeUrl: string, allowIframe: boolean) {
			if (allowIframe) {
				this.showIframe = true;
				this.iframeUrl = iframeUrl;
			}
		}
	}
})

</script>
<style lang="">
	
</style>
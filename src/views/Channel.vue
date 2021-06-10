<template>
	<div style="
			overflow: hidden;
			position: fixed;
			top: 0px;
			right: 0px;
			bottom: 0px;
			left: 0px;
			background-color: black">
		<router-link to="/" 
			style="left: 25px;
					top: 60px;
					opacity: 0.7;
					position: absolute;
					background: black;
					color: white;
					border-radius: 5px;
					padding: 10px 15px;
					font-size: 25px;
					cursor: pointer;
					z-index: 9999999;">
			<font-awesome-icon icon="arrow-left" />
		</router-link>
		<div v-if="readyToDisplay">
			<component :is="contentType" :source="contentSource" @should-fallback="useContentFallback"></component>
		</div>
	</div>	
</template>

<script lang="ts">
// @ is an alias to /src
import IframeType from "@/components/IframeType.vue";
import VideoType from "@/components/VideoType.vue";
import FallbackType from "@/components/FallbackType.vue"
import RawChannel from '@/contracts/RawChannel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineComponent } from "vue";
import axios from "axios";

library.add(faArrowLeft)

export default defineComponent({
	name: 'Channel',
	data() {
		return {
			contentType: '',
			contentSource: '',
			contentFallbackSource: ''
		}
	},
	computed: {
		readyToDisplay(): boolean {
			const value = this.contentType !== '' && this.contentSource !== '';
			return value;
		}
	},
	async beforeRouteEnter(to, from, next) {
		// check before enter the route
		// if check failed, you can cancel this routing
		let endpoint = "";
		
		if (process.env.NODE_ENV === 'production') {
			endpoint = "https://raw.githubusercontent.com/rzmogrovejo/nvivu/main/public/raw-channelsv2.json"
		} else {
			endpoint = "https://raw.githubusercontent.com/rzmogrovejo/nvivu/main/src/data/raw-channelsv2.json"
		}

		const slug = to.params.slug;
		const channel = await 
			axios(endpoint)
				.then((response) => response.data
					.find((channel: RawChannel) => {
						return (channel.slug === slug) && (channel.contentEnabled);
					}));

		if (!channel) {
			return next({ name: 'Home' });
		}

		next((vm : any) => {
			vm.resolveContent(channel);
		})
	},
	methods: {
		async resolveContent(channel: RawChannel) {
			const contentType = channel.contentType;
			this.contentType = contentType!.charAt(0).toUpperCase() + contentType!.slice(1) + 'Type';
			this.contentSource = await this.resolveSource(channel);
			this.contentFallbackSource = channel.contentFallbackSource;
		},
		useContentFallback() {
			this.contentType = 'FallbackType';
			this.contentSource = this.contentFallbackSource;
		},
		async resolveSource(channel: RawChannel) {
			if (typeof (this as any)[channel.slug] === "function") {
				console.log(channel.slug);
				return await (this as any)[channel.slug](channel);
			}

			return channel.contentSource;
		},
		async atv(channel: RawChannel) {
			console.log('olaa');
			const tokenEndpoint = "https://past-server.nedp.io/token/pe-atv-atv?rsk=";
			return await this.resolveAtv(channel, tokenEndpoint);
		},
		async atvMas(channel: RawChannel) {
			const tokenEndpoint = "https://past-server.nedp.io/token/pe-atv-atv-mas?rsk=";
			return await this.resolveAtv(channel, tokenEndpoint)
		},
		async resolveAtv(channel: RawChannel, tokenEndpoint: string) {
			// i'm going to fetch the script, run it and get the hash
			const html = await axios
				.get('https://api.allorigins.win/get?url=' + channel.contentFallbackSource)
				.then(response => response.data.contents);
			
			const startHashScript = html.indexOf('_0x5d50') - 4; // 56852 - 4
			const endHashScript = html.indexOf('past-server') - 27; // 58007 - 27

			let hashScript = html.substring(startHashScript, endHashScript);

			const nullPos = hashScript.indexOf('null') + 7;
			const equalPos = hashScript.indexOf('=', nullPos) + 1;

			const varResult = hashScript.substring(nullPos,equalPos);

			hashScript = hashScript.replace(varResult, "return ");

			const hashScriptValue = (new Function(hashScript))();

			// if the script returns the hash then request the token
			const token = await axios
				.get(tokenEndpoint + hashScriptValue)
				.then(response => response.data.token);

			return channel.contentSource + token;
		}
	},
	components: {
		VideoType,
		IframeType,
		FallbackType,
		FontAwesomeIcon
	}
})
</script>

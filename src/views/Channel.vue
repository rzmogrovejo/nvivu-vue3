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
import Channel from "@/models/Channel";

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
		async resolveContent(rawChannel: RawChannel) {
			const channel = new Channel(rawChannel);
			this.contentType = channel.resolveContentType();
			this.contentSource = await channel.resolveContentSource();
			this.contentFallbackSource = channel.contentFallbackSource();
		},
		useContentFallback() {
			this.contentType = 'FallbackType';
			this.contentSource = this.contentFallbackSource;
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

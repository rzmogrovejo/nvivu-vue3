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
import rawChannels from '@/data/rawChannels';

library.add(faArrowLeft)

export default defineComponent({
	name: 'Channel',
	data() {
		return {
			contentType: '',
			contentSource: '',
			channelSource: ''
		}
	},
	computed: {
		readyToDisplay(): boolean {
			const value = this.contentType !== '' && this.contentSource !== '';
			return value;
		}
	},
	beforeRouteEnter(to, from, next) {
        // check before enter the route
        // if check failed, you can cancel this routing
		const slug = to.params.slug;
		const channel = rawChannels.find((channel: RawChannel) => channel.slug === slug);

		if (!channel) {
			return next({ name: 'Home' });
		}

		next((vm: any) => vm.resolveContent(channel));
    },
	methods: {
		resolveContent(channel: RawChannel) {
			const _type = channel.content.type;
			this.contentType = _type!.charAt(0).toUpperCase() + _type!.slice(1) + 'Type';
			this.contentSource = channel.content.source!;
			this.channelSource = channel.source;
		},
		useContentFallback() {
			this.contentType = 'FallbackType';
			this.contentSource = this.channelSource;
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

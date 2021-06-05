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
		<component :is="contentType" :source="source"></component>
	</div>	
</template>

<script lang="ts">
// @ is an alias to /src
import IframeType from "@/components/IframeType.vue";
import VideoType from "@/components/VideoType.vue";
import RawChannel from '@/contracts/RawChannel';
import Stream from '@/models/Stream';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineComponent } from "vue";

library.add(faArrowLeft)

export default defineComponent({
	name: 'Channel',
	props: {
		channels: {
			type: Object as () => RawChannel[],
			required: true
		}
	},
	data() {
		return {
			stream: new Stream(),
			contentType: "",
			source: ""
		}
	},
	created() {
		const slug = this.$route.params.slug;
		const channel = this.channels.find((channel: RawChannel) => channel.slug === slug);
		if (channel) {
			this.source = channel.content.source!;
			this.resolveContentType(channel);
		}
	},
	methods: {
		resolveContentType(channel: RawChannel) {
			const _type = channel.content.type;
			this.contentType = _type!.charAt(0).toUpperCase() + _type!.slice(1) + 'Type';
		}
	},
	components: {
		VideoType,
		IframeType,
		FontAwesomeIcon
	}
})
</script>

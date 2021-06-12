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
			<component :is="contentType" :source="contentSource" @should-fallback="resolveContentWith"></component>
		</div>
	</div>	
</template>

<script lang="ts">
// @ is an alias to /src
import IframeType from "@/components/IframeType.vue";
import VideoType from "@/components/VideoType.vue";
import FallbackType from "@/components/FallbackType.vue"
import NotFoundType from "@/components/NotFoundType.vue";
import RawChannel from '@/contracts/RawChannel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineComponent } from "vue";
import Channel from "@/models/Channel";

library.add(faArrowLeft)

export default defineComponent({
	name: 'Player',
	props: {
		rawChannels: {
			type: Object as () => Promise<RawChannel[]>,
			required: true
		}
	},
	data() {
		return {
			contentType: '',
			contentSource: '',
			contentFallbackSource: '',
			readyToDisplay: false
		}
	},
	async created() {
		const slug = (this.$route.params.slug as string);
		await this.validateSlug(slug);
	},
	async beforeRouteUpdate(to, from, next) {
		const slug = (to.params.slug as string);
		await this.validateSlug(slug);
		next();
	},
	mounted() {
		console.log('player');
	},
	methods: {
		async validateSlug(slug: string) {
			const rawChannel = await (this.rawChannels as any).find((rawChannel: RawChannel) => {
				return rawChannel.slug === slug && rawChannel.contentEnabled
			});

			if (!rawChannel) {
				this.resolveContentWith('NotFoundType');
				return;
			}

			await this.resolveContent(rawChannel);				
		},		
		async resolveContent(rawChannel: RawChannel) {
			this.readyToDisplay = false;
			const channel = new Channel(rawChannel);
			this.contentType = channel.resolveContentType();
			this.contentSource = await channel.resolveContentSource();
			this.contentFallbackSource = channel.contentFallbackSource();
			this.readyToDisplay = true;
		},
		resolveContentWith(contentType: any) {
			this.readyToDisplay = false;
			this.contentType = contentType;
			this.contentSource = this.contentFallbackSource;
			this.readyToDisplay = true;	
		}
	},
	components: {
		VideoType,
		IframeType,
		FallbackType,
		NotFoundType,
		FontAwesomeIcon
	}
})
</script>

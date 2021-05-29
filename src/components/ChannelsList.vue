<template lang="">
	<div>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			<div class="font-light no-underline hover:underline text-blue-700" v-for="channel in channels" :key="channel">
				<a href="javascript:void(0)"
					@click="toggleStream(channel)">
					{{ channel.name }}
				</a>
			</div>
		</div>
		<div v-if="showStream" 
			style="
				overflow: hidden;
				position: fixed;
				top: 0px;
				right: 0px;
				bottom: 0px;
				left: 0px;"
			:class="{ 'backdrop': showStream }">
			<div @click="offStream()"
				style="
					left: 25px;
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
			</div>
			<div v-html="stream.getHtml()"></div>
		</div>
	</div>
</template>

<script lang = "ts">
import { defineComponent } from 'vue';
import Stream from '../models/Stream';
import RawChannel from '../contracts/RawChannel';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowLeft)

export default defineComponent({
	name: 'ChannelsList',
	props: {
		'channels': Object
	},
	data() {
		return {
			stream: new Stream(),
			showStream: false
		}
	},
	mounted() {
		const searchParams = new URLSearchParams(window.location.search);
		const slug = searchParams.get('canal');
		if (slug) {
			const rawChannel = this.channels?.find((channel: RawChannel) => channel.slug === slug)
			this.toggleStream(rawChannel);
		}
	},
	methods: {
		toggleStream(rawChannel: RawChannel) {
			this.stream.resolveStream(rawChannel);
			this.showStream = true;
			document.documentElement.style.overflow = "hidden"
		},
		offStream() {
			this.stream.emptyHtml();
			this.showStream = false;
			document.documentElement.style.overflow = "auto"
		}
	},
	components: {
		FontAwesomeIcon
	},
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
.backdrop {
	background-color: black;
}

</style>
<template lang="">
	<div>
		<ul class="">
			<li v-for="channel in channels" :key="channel">
				<a href="javascript:void(0)"
					@click="toggleStream(channel)">
					{{ channel.name }}
				</a>
			</li>
			<br/>
			<li><a href="javascript:void(0)" @click="offStream()">Apagar</a></li>
		</ul>
		<div v-if="showStream" 
			style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;"
			:class="{ 'backdrop': showStream }">
			<div v-html="stream.getHtml()"></div>
		</div>
	</div>
</template>

<script lang = "ts">
import { defineComponent } from 'vue';
import Stream from '../models/Stream';
import RawChannel from '../contracts/RawChannel';

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

	},
	methods: {
		toggleStream(rawChannel: RawChannel) {
			this.stream.resolveStream(rawChannel);
			this.showStream = true;
		},
		offStream() {
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
.backdrop {
	background-color: black;
}

</style>
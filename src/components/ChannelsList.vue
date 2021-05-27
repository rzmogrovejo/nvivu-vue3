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
			style="
				overflow:hidden;
				position: absolute;
				top: 0px;
				right: 0px;
				bottom: 0px;
				left: 0px;"
			:class="{ 'backdrop': showStream }">
			<div @click="offStream()"
				style="
					right: 10px;
					top: 60px;
					left: auto;
					opacity: 0.7;
					position: absolute;
					background: black;
					color: white;
					border-radius: 5px;
					padding: 5px;
					margin: 10px 10px 10px 15px;
					cursor: pointer;
					z-index: 9999999;">
				Volver
			</div>
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
			this.stream.emptyHtml();
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
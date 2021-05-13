<template lang="">
	<div>
		<ul class="">
			<li v-for="channel in channels" :key="channel">
				<a :href="!channel.stream.allow ? channel.url : 'javascript:void(0)'"
					:target="!channel.stream.allow ? '_blank' : '' "
					@click="toggleStream(channel)">
					{{ channel.name }}
				</a>	
				<span v-if="!channel.stream.allow"> (Se abre en una nueva ventana)</span>
			</li>
			<br/>
			<li><a href="javascript:void(0)" @click="offStream()">Apagar</a></li>
		</ul>
		<div v-if="stream.getToggle()" 
			style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
			<div v-html="stream.getHtml()"></div>
		</div>
	</div>
</template>

<script lang = "ts">
import { defineComponent } from 'vue';
import Stream from '../models/Stream';
import Channel from '../contracts/Channel';

export default defineComponent({
	name: 'ChannelsList',
	props: {
		'channels': Object
	},
	data() {
		return {
			stream: new Stream()
		}
	},
	mounted() {

	},
	methods: {
		toggleStream(channel: Channel) {
			this.stream.resolveSourceAndHtml(channel);
			this.stream.setToggle(channel.stream.allow);
		},
		offStream() {
			this.stream.setToggle(false);
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

</style>
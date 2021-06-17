<template>
	<router-view :raw-channels="rawChannels"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Channels from '@/repo/Channels';
import RawChannel from "./contracts/RawChannel";

export default defineComponent({
	name: 'App',
	data() {
		return {
			rawChannels: Array()
		}
	},
	async created() {
		this.rawChannels = await Channels.getAll((channels: RawChannel[]) => {
			return channels.filter((channel: RawChannel) => channel.contentEnabled);
		});
	},
	mounted() {
		console.log('app');
	},
})
</script>

<style>

</style>

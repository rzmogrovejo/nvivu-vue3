<template>
	<router-view :channels="rawChannels" />
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import RawChannel from "@/contracts/RawChannel";

export default defineComponent({
	name: 'App',
	data() {
		return {
			rawChannels: []
		}
	},
	async created() {
		this.rawChannels = await 
			axios('https://raw.githubusercontent.com/rzmogrovejo/nvivu/main/src/data/raw-channelsv2.json')
				.then((response) => response.data
					.filter((channel: RawChannel) => channel.contentEnabled));
	}
})
</script>

<style>

</style>

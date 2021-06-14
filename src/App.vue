<template>
	<router-view :raw-channels="rawChannels"/>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import RawChannel from "./contracts/RawChannel";

export default defineComponent({
	name: 'App',
	data() {
		return {
			rawChannels: []
		}
	},
	async created() {
		let endpoint = "";
		
		if (process.env.NODE_ENV === 'production') {
			endpoint = "https://raw.githubusercontent.com/rzmogrovejo/nvivu/main/public/raw-channelsv2.json"
		} else {
			endpoint = "https://raw.githubusercontent.com/rzmogrovejo/nvivu/main/src/data/raw-channelsv2.json"
		}

		this.rawChannels = await 
			axios(endpoint)
				.then((response) => response.data
					.filter((channel: RawChannel) => channel.contentEnabled));
	},
	mounted() {
		console.log('app');
	}
})
</script>

<style>

</style>

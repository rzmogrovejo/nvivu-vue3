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
		if (process.env.NODE_ENV === 'production') {
			await this.resolveForProduction();
		} else {
			this.resolveForLocal();
		}
	},
	mounted() {
		console.log('app');
	},
	methods: {
		resolveForLocal() {
			const rawChannels = require('@/data/raw-channelsv2.json');
			this.rawChannels = this.filterChannels(rawChannels);
		},
		async resolveForProduction() {
			let endpoint = "https://raw.githubusercontent.com/rzmogrovejo/nvivu/main/src/data/raw-channelsv2.json";

			this.rawChannels = await axios(endpoint)
				.then((response) => this.filterChannels(response.data));			
		},
		filterChannels(rawChannels: []) {
			return rawChannels.filter((channel: RawChannel) => channel.contentEnabled);
		}
	}
})
</script>

<style>

</style>

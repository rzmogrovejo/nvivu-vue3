<template>
	<div class="container font-sans antialiased">
		<h1 class="py-6 text-3xl font-bold">
			<router-link :to="{ name: 'Home' }">
				nvivu <font-awesome-icon class="text-red-600" icon="play-circle"/>
			</router-link>
		</h1>
		<div>
			<p class="pb-6 font-light">Disfruta de tus canales favoritos vía streaming, selecciona uno:</p>
		</div>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			<div class="font-light no-underline hover:underline text-blue-700" v-for="channel in rawChannels" :key="channel">
				<router-link :to="{ name: 'Channel', params: { slug: channel.slug } }">
					{{ channel.name }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import RawChannel from "@/contracts/RawChannel";
import axios from "axios";

library.add(faPlayCircle)

export default defineComponent({
	name: 'Home',
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
	components: {
		FontAwesomeIcon
	},	
})
</script>

<template>
	<div class="container font-sans antialiased">
		<h1 class="py-6 text-3xl font-bold">
			<router-link :to="{ name: 'Home' }">
				nvivu <font-awesome-icon class="text-red-600" icon="play-circle"/>
			</router-link>
		</h1>
		<div>
			<p class="pb-6 font-light">
				Disfruta de tus canales favoritos vía streaming, selecciona uno:
			</p>
		</div>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			<div v-for="channel in rawChannelsFiltered" 
				:key="channel">
				<span class="mr-3">
					{{ countryFlag(channel.countryIsoCode) }}
				</span>
				<span class="font-light no-underline hover:underline text-blue-700">
					<router-link 
						:to="{ 
							name: 'Player', 
							params: { slug: channel.slug } 
						}">
						{{ channel.name }}
					</router-link>
				</span>
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
import countryMap from '@/utils/countryMap';
//import rawChannels from "@/data/rawChannels";

library.add(faPlayCircle)

export default defineComponent({
	name: 'Home',
	props: {
		rawChannels: {
			type: Object as () => RawChannel[],
			required: true
		}
	},
	computed: {
		rawChannelsFiltered(): RawChannel[] {
			return this.rawChannels.filter((channel: RawChannel) => channel.contentInHome);
		}
	},
	methods: {
		countryFlag(countryIsoCode: string): string {
			return countryMap(countryIsoCode);
		}
	},
	components: {
		FontAwesomeIcon
	},	
})
</script>

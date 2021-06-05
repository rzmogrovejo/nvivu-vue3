<template>
	<div class="container font-sans antialiased">
		<h1 class="py-6 text-3xl font-bold">nvivu <font-awesome-icon class="text-red-600" icon="play-circle"/></h1>
		<div>
			<p class="pb-6 font-light">Disfruta de tus canales favoritos vía streaming, selecciona uno:</p>
		</div>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			<div class="font-light no-underline hover:underline text-blue-700" v-for="channel in channels" :key="channel">
				<router-link :to="'/c/' + channel.slug">{{ channel.name }}</router-link>
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

library.add(faPlayCircle)

export default defineComponent({
	name: 'Home',
	props: {
		channels: Object
	},
	components: {
		FontAwesomeIcon
	},	
})
</script>

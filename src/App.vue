<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
	<div class="container font-sans antialiased">
		<h1 class="py-6 text-3xl font-bold">nvivu <font-awesome-icon class="text-red-600" icon="play-circle"/></h1>
		<div>
			<p class="pb-6 font-light">Disfruta de tus canales favoritos vía streaming, selecciona uno:</p>
		</div>
		<ChannelsList :channels="channels" />
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import ChannelsList from './components/ChannelsList.vue';
import rawChannels from './data/rawChannels';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlayCircle)

@Options({
	data() {
		return {
			channels: rawChannels
		}
	},
	components: {
		HelloWorld,
		ChannelsList,
		FontAwesomeIcon
	},
})
export default class App extends Vue {}
</script>

<style>
#app {
/*   font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
/*   color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>

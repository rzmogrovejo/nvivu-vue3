<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
	<div class="container font-sans antialiased">
		<h1 class="py-8 text-3xl font-bold">TV Streaming</h1>
		<ChannelsList :channels="channels" />
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import ChannelsList from './components/ChannelsList.vue';
import rawChannels from './data/rawChannels';

@Options({
	data() {
		return {
			channels: rawChannels
		}
	},
	components: {
		HelloWorld,
		ChannelsList
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

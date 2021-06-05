<template>
	<router-view :channels="channels" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import rawChannels from '@/data/rawChannels';

export default defineComponent({
	name: 'App',
	data() {
		return {
			channels: rawChannels
		}
	}
})
</script>

<style>

</style>

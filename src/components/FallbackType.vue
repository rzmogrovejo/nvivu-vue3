<template>
	<div
		style="
			color: white;
			margin: 0;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;" class="font-light">
		¡Ups! Recarga la página o visita la <a class="font-light no-underline hover:underline text-blue-600" :href="source" target="_blank">página del canal</a>.
	</div>	
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";

export default defineComponent({
	name: 'FallbackType',
	props: {
		source: {
			type: String,
			required: true
		}
	}
})
</script>

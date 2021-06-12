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
		¡Ups! No se encontró el contenido, <router-link class="font-light no-underline hover:underline text-blue-600" to="/" >regresa al inicio</router-link>.
	</div>	
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";

export default defineComponent({
	name: 'NotFoundType',
})
</script>

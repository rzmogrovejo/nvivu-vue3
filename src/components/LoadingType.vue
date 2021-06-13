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
		Cargando...
	</div>	
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";

export default defineComponent({
	name: 'LoadingType',
})
</script>

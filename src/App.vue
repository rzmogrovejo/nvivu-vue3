<template>
	<router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: 'App',
	mounted() {
		console.log(process.env.VUE_APP_NOT_SECRET_CODE);
		console.log(process.env.ABC);
	}
})
</script>

<style>

</style>

<template>
	<iframe 
		id="iframe"
		style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden" 
		frameborder="0" 
		type="text/html" 
		:src="source"
		width="100%" 
		height="100%"
		allowfullscreen 
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
	</iframe>
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";

export default defineComponent({
	name: 'IframeType',
	props: {
		source: String
	}
})
</script>

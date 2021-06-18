<template>
	<iframe-type :source="sourceWithParams"></iframe-type>
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";
import IframeType from "@/components/IframeType.vue"

export default defineComponent({
	name: 'YoutubeType',
	props: {
		source: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			sourceWithParams: ''
		}
	},
	created() {
		this.sourceWithParams = this.source + "?autoplay=1&controls=1&modestbranding=1&rel=0";
	},
	components: {
		IframeType
	}
})
</script>

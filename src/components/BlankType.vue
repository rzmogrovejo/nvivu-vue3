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
		El contenido se transmite en la <a class="font-light no-underline hover:underline text-blue-600" :href="source" target="_blank">página del canal</a>. Te redirigimos en {{ countdown }}.
	</div>	
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";

export default defineComponent({
	name: 'BlankType',
	props: {
		source: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			countdown: 7
		}
	},
	mounted() {
		this.countdownTimer();
	},
	methods: {
		countdownTimer() {
			if(this.countdown > 0) {
				setTimeout(() => {
					this.countdown -= 1;
					this.countdownTimer();
				}, 1000);
				return;
			}
			
			window.open(this.source);
		}
	}
})
</script>

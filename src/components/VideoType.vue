<template>
	<video
		id="video"
		ref="videos"
		style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"
		autoplay
		controls>
	</video>
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";
import Hls from 'hls.js';

export default defineComponent({
	name: 'VideoTag',
	props: {
		source: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			hls: new Hls()
		}
	},
	emits: ['shouldFallback'],
	mounted() {
		const video: any = document.getElementById("video");
		if (Hls.isSupported()) {
			console.log(this.source);
			
			this.hls.attachMedia(video);
			this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
				console.log("video and hls.js are now bound together !");
				this.hls.loadSource(this.source!);
				this.hls.on(Hls.Events.MANIFEST_PARSED, (event: any, data: any) => {
					console.log("manifest loaded, found " + data.levels.length + " quality level");
					const playPromise = video.play();
					playPromise.catch(() => {
						video.muted = 'muted';
						video.play();
					});
				});
			});
			const _this = this;
			this.hls.on(Hls.Events.ERROR, function (event, data) {
				if (data.fatal) {
					switch (data.type) {
						case Hls.ErrorTypes.NETWORK_ERROR:
							// try to recover network error
							console.log('fatal network error encountered, try to recover');
							//myHls.startLoad();
							_this.$emit('shouldFallback');
							_this.hls.destroy();
							break;
						case Hls.ErrorTypes.MEDIA_ERROR:
							console.log('fatal media error encountered, try to recover');
							_this.hls.recoverMediaError();
							//_this.$emit('shouldFallback');
							break;
						default:
							// cannot recover
							_this.$emit('shouldFallback');
							_this.hls.destroy();
							break;
					}
				}
			});
		} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = this.source;
		}
	},
	unmounted() {
		this.hls.destroy();
	}
})
</script>

<style lang="css" scoped>
#video::-webkit-media-controls-timeline {
	display: none;
}
#video::-webkit-media-controls-current-time-display {
	display: none;
}
#video::-webkit-media-controls-time-remaining-display {
	display: none;
}
</style>
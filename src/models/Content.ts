import Model from "./Model";

export default class Content extends Model {
	public enable() {
		return this.get('enable');
	}

	public type() {
		return this.get('type');
	}
	
	public source() {
		return this.get('source');
	}

	public isVideoType() {
		return this.type() === 'video';
	}
}
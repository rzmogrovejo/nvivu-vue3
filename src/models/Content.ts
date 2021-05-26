import Model from "./Model";

export default class Content extends Model {
	public enable() {
		return this.get('allow');
	}

	public type() {
		return this.get('type');
	}
	
	public source() {
		return this.get('url');
	}
}
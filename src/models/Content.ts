import Model from "./Model";

export default class Content extends Model {
	public allow() {
		return this.get('allow');
	}

	public type() {
		return this.get('type');
	}
	
	public source() {
		return this.get('url');
	}

	public setSource(value: string) {
		this.set('url', value);
	}
}
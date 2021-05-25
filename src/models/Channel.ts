import RawChannel from "@/contracts/RawChannel";
import snakeToCamel from "@/utils/snakeToCamel";
import Content from "./Content";
import Model from "./Model";

export default class Channel extends Model {
	public slug() {
		return this.get('slug');
	}

	public source() {
		return this.get('url');
	}

	public name() {
		return this.get('name');
	}

	public content() {
		return new Content(this.get('stream'));
	}

	public slugInCamel(): string {
		return snakeToCamel(this.slug());
	}
}
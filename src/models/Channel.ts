import countryMap from "@/utils/countryMap";
import snakeToCamel from "@/utils/snakeToCamel";
import Content from "./Content";
import Model from "./Model";

export default class Channel extends Model {
	public slug() {
		return this.get('slug');
	}

	public source() {
		return this.get('source');
	}

	public name() {
		return this.get('name');
	}

	public content() {
		return new Content(this.get('content'));
	}

	public slugInCamel(): string {
		return snakeToCamel(this.slug());
	}

	public countryCode() {
		return this.get('country-code');
	}

	public country() {
		return countryMap(this.get('country-code'));
	}
}
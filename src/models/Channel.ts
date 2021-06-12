import snakeToCamel from "@/utils/snakeToCamel";
import axios from "axios";
import Model from "./Model";

export default class Channel extends Model {
	public name(): string {
		return this.get('name');
	}

	public slug(): string {
		return this.get('slug');
	}

	public slugInCamel(): string {
		return snakeToCamel(this.slug());
	}

	public contentSource(): string {
		return this.get('contentSource');
	}	

	public contentFallbackSource(): string {
		return this.get('contentFallbackSource');
	}

	public contentType(): string {
		return this.get('contentType');
	}

	public contentEnabled(): string {
		return this.get('contentEnabled');
	}	

	public countryName(): string {
		return this.get('countryName');
	}	

	public countryIsoCode(): string {
		return this.get('countryIsoCode');
	}

	public resolveContentType() {
		return this.contentType()!.charAt(0).toUpperCase() + this.contentType()!.slice(1) + 'Type';
	}

	public async resolveContentSource(): Promise<string> {
		if (typeof (this as any)[this.slugInCamel()] === "function") {
			return await (this as any)[this.slugInCamel()]();
		}

		return this.contentSource();
	}

	private async atv(): Promise<string> {
		const tokenEndpoint = "https://past-server.nedp.io/token/pe-atv-atv?rsk=";
		return await this.resolveAtv(tokenEndpoint);
	}

	private async atvMas(): Promise<String> {
		const tokenEndpoint = "https://past-server.nedp.io/token/pe-atv-atv-mas?rsk=";
		return await this.resolveAtv(tokenEndpoint)
	}

	private async resolveAtv(tokenEndpoint: string): Promise<string> {
		// i'm going to fetch the script, run it and get the hash
		const html = await axios
			.get('https://api.allorigins.win/get?url=' + this.contentFallbackSource())
			.then(response => response.data.contents);
		
		const startHashScript = html.indexOf('_0x5d50') - 4; // 56852 - 4
		const endHashScript = html.indexOf('past-server') - 27; // 58007 - 27

		let hashScript = html.substring(startHashScript, endHashScript);

		const nullPos = hashScript.indexOf('null') + 7;
		const equalPos = hashScript.indexOf('=', nullPos) + 1;

		const varResult = hashScript.substring(nullPos,equalPos);

		hashScript = hashScript.replace(varResult, "return ");

		const hashScriptValue = (new Function(hashScript))();

		// if the script returns the hash then request the token
		const token = await axios
			.get(tokenEndpoint + hashScriptValue)
			.then(response => response.data.token);

		return this.contentSource() + token;
	}

}
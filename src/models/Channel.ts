import axios from "axios";
import Model from "./Model";
import _camelCase from 'lodash.camelcase';

export default class Channel extends Model {
	public name(): string {
		return this.get('name');
	}

	public slug(): string {
		return this.get('slug');
	}

	public slugInCamel(): string {
		return _camelCase(this.slug());
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

	private async tele13() {
		const token = await axios
			.get('https://us-central1-canal-13-stream-api.cloudfunctions.net/media/token?id=5f51a916c21eec083ab337a8&type=live&tid=25ea71d3411966ee7387f90fd4c4410b921b40cf&uid=bffd75654f90d31f382df4e3f7dbe1f3693d05ab')
			.then(response => response.data.token);
		
		return this.contentSource() + token;
	}

}
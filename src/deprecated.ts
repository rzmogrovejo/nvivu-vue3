	private async atv(channel: Channel) {
		const tokenEndpoint = "https://past-server.nedp.io/token/pe-atv-atv?rsk=";
		this.resolveAtv(channel, tokenEndpoint, '3cb59ec005bace19610c8f9dbb13edcae11573ca');
	}

	private async atvMas(channel: Channel) {
		const tokenEndpoint = "https://past-server.nedp.io/token/pe-atv-atv-mas?rsk=";
		this.resolveAtv(channel, tokenEndpoint, 'ba027770d3e875225dc22db025b2f128dcdbf652');
	}

	private async resolveAtv(channel: Channel, tokenEndpoint: string, hashScriptValue: string) {
/* 		// i'm going to fetch the script, run it and get the hash
		const html = await axios
			.get('https://api.allorigins.win/get?url=' + channel.source())
			.then(response => response.data.contents);
		
		const startHashScript = html.indexOf('_0x5d50') - 4; // 56852 - 4
		const endHashScript = html.indexOf('past-server') - 27; // 58007 - 27

		let hashScript = html.substring(startHashScript, endHashScript);

		const nullPos = hashScript.indexOf('null') + 7;
		const equalPos = hashScript.indexOf('=', nullPos) + 1;

		const varResult = hashScript.substring(nullPos,equalPos);

		hashScript = hashScript.replace(varResult, "return ");

		hashScriptValue = hashScriptValue || (new Function (hashScript))(); */

		// if the script returns the hash then request the token
		const token = await axios
			.get(tokenEndpoint + hashScriptValue)
			.then(response => response.data.token);

		const source = channel.content().source() + token;
		this.resolveHtml(channel, source);
	}
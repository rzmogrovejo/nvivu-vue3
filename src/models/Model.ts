export default abstract class Model {
	private data = {};

	constructor(data: Object) {
		this.data = data;
	}

	protected get(key: string): any {
		if (!(key in this.data)) {
			return null;
		}
		
		return (this.data as any)[key];
	}

	protected set(key: string, value: any) {
		if (!(key in this.data)) {
			throw Error();
		}

		(this.data as any)[key] = value;
	}
}
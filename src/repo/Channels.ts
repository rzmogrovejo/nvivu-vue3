import RawChannel from "@/contracts/RawChannel";
import httpClient from "@/utils/httpClient";

export default class Channels {

	static async getAll(): Promise<RawChannel[]>;

	static async getAll(
		callback: (channels: RawChannel[]) => RawChannel[]
	): Promise<RawChannel[]>;

	static async getAll(
		callback?: (channels: RawChannel[]) => RawChannel[]
	): Promise<RawChannel[]> {

		if (!callback) {
			callback = (channels: RawChannel[]) => {
				return channels;
			};
		}

		if (process.env.NODE_ENV === 'production') {
			return callback(await this.resolveForProduction());
		} else {
			return callback(this.resolveForLocal());
		}
	}	

	static resolveForLocal(): RawChannel[] {
		const rawChannels = require('@/data/raw-channelsv2');

		if (!rawChannels) {
			return [];
		}

		return rawChannels;
	}

	static async resolveForProduction(): Promise<RawChannel[]> {
		const endpoint = "https://raw.githubusercontent.com/rzmogrovejo/nvivu/main/src/data/raw-channelsv2.json";

		return await httpClient(endpoint, {
			cache: true
		}).then((response) => response.data);
	}
}
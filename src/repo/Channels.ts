import RawChannel from "@/contracts/RawChannel";
import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";

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

		const http = axios.create({
			baseURL: '/',
			//headers: { 'Cache-Control': 'no-cache' },
			// cache will be enabled by default
			adapter: cacheAdapterEnhancer(axios.defaults.adapter!)
		});

		return await http(endpoint).then((response) => response.data);
	}
}
import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";

const cacheConfig = {
	enabledByDefault: false, 
}

const httpClient = axios.create({
	baseURL: '/',
/* 	headers: {
		'Cache-Control': 'no-cache'
	}, */
	adapter: cacheAdapterEnhancer(axios.defaults.adapter!, cacheConfig)
})

export default httpClient;
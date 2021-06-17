import axios, { AxiosError, AxiosResponse } from "axios";
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

// interceptor to catch errors
const errorInterceptor = (error: AxiosError) => {
    // check if it's a server error
    if (!error.response) {
      return Promise.reject(error);
    }

    // all the other error responses
    switch(error.response.status) {
        case 400:
            console.error(error.response.status, error.message);
            break;

        case 401: // authentication error, logout the user
            localStorage.removeItem('token');
            break;

        default:
            console.error(error.response.status, error.message);
    }
    return Promise.reject(error);
}

// Interceptor for responses
const responseInterceptor = (response: AxiosResponse) => {
    switch(response.status) {
        case 200: 
            // yay!
			console.log('todo good');
            break;
        // any other cases
        default:
            // default case
    }

    return response;
}

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;
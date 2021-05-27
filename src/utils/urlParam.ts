export function insertUrlParam(key: string, value: string) {
	const searchParams = new URLSearchParams(window.location.search);
	searchParams.set(key, value);
	replaceState(searchParams);
}

export function deleteUrlParam(key: string) {
	const searchParams = new URLSearchParams(window.location.search);
	searchParams.delete(key);
	replaceState(searchParams);
}

function replaceState(searchParams: URLSearchParams) {
	const search = searchParams.toString() == '' ? '' : '?' + searchParams.toString();
	const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + search;
	window.history.replaceState({ path: newurl }, '', newurl);
}
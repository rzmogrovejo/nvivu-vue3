export function insertUrlParam(key: any, value:any) {
	const searchParams = new URLSearchParams(window.location.search);
	searchParams.set(key, value);
	const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
	window.history.replaceState({ path: newurl }, '', newurl);
}

export function deleteUrlParam(key: any) {
	const searchParams = new URLSearchParams(window.location.search);
	searchParams.delete(key);
	const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
	window.history.replaceState({ path: newurl }, '', newurl);
}
export default function countryMap(code: string) {
	return (mapping as any)[code];
}

const mapping = {
	'PE': '🇵🇪',
	'CL': '🇨🇱',
	'MX': '🇲🇽',
	'ZZ': '🌎'
}
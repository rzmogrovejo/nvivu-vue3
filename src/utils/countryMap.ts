const countryMap = (code: string): string => {
	return (mapping as any)[code];
}

const mapping = {
	'AR': '🇦🇷',
	'PE': '🇵🇪',
	'CL': '🇨🇱',
	'MX': '🇲🇽',
	'ZZ': '🌎'
	
}

export default countryMap;
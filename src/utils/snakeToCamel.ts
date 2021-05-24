export default function snakeToCamel(str: string): string {
	return str.replace(/([-_]\w)/g, g => g[1].toUpperCase())
}
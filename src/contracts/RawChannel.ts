export default interface RawChannel {
	"name": string;
	"slug": string;
	"source": string;
	"country-code": string;
	"content": {
		"enable": boolean,
		"type"?: string,
		"source"?: string
	}
}
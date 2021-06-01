export default interface RawChannel {
	"name": string;
	"slug": string;
	"url": string;
	"country-code": string;
	"stream": {
		"allow": boolean,
		"type"?: string,
		"url"?: string
	}
}
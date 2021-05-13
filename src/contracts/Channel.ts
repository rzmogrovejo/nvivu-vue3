export default interface Channel {
	"name": string;
	"url": string;
	"number": {
		"national"?: string,
		"movistar-hd"?: string
	};
	"stream": {
		"allow": boolean,
		"type"?: string,
		"url"?: string
	}
}
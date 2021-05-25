export default [
	{
		"name": "Latina",
		"slug": "latina",
		"url": "https://www.latina.pe/tvenvivo",
		"number": {
			"national": "2",
			"movistar-hd": "702"
		},
		"stream": {
			"allow": false
		}
	},
	{
		"name": "America TV",
		"slug": "america-tv",
		"url": "https://tvgo.americatv.com.pe/",
		"number": {
			"national": "4",
			"movistar-hd": "704"
		},
		"stream": {
			"allow": true,
			"type": "iframe",
			"url": "https://tvgo.americatv.com.pe/"
		}
	},
	{
		"name": "Panamericana",
		"slug": "panamericana",
		"url": "https://panamericana.pe/tvenvivo",
		"number": {
			"national": "5",
			"movistar-hd": "705"
		},
		"stream": {
			"allow": true,
			"type": "iframe",
			"url": "https://www.dailymotion.com/embed/video/x774s7s?autoplay=1"
		}
	},
	{
		"name": "TV Perú",
		"slug": "tv-peru",
		"url": "https://www.tvperu.gob.pe/play",
		"number": {
			"national": "7",
			"movistar-hd": "707"
		},
		"stream": {
			"allow": false
		}
	},
	{
		"name": "ATV",
		"slug": "atv",
		"url": "https://www.atv.pe/envivo-atv",
		"number": {
			"national": "9",
			"movistar-hd": "709"
		},
		"stream": {
			"allow": true,
			"type": "video",
			//"url": "https://www.atv.pe/envivo-atv"
			"url": "https://pe-atv-atv-live.ned.media/atv/smil:atv.smil/playlist.m3u8?iut=",
		}
	},
	{
		"name": "ATV Más",
		"slug": "atv-mas",
		"url": "https://www.atv.pe/envivo-atvmas",
		"number": {
			"national": "21",
			"movistar-hd": "776"
		},
		"stream": {
			"allow": true,
			"type": "video",
			//"url": "https://www.atv.pe/envivo-atv"
			"url": "https://pe-atv-atv-mas-live.ned.media/atv/smil:atv-mas.smil/playlist.m3u8?iut=",
		}		
	},
	{
		"name": "Willax",
		"slug": "willax",
		"url": "https://willax.tv/en-vivo/",
		"number": {
			"national": "16",
			"movistar-hd": "716"
		},
		"stream": {
			"allow": true,
			"type": "iframe",
			"url": "https://www.dailymotion.com/embed/video/x7x4dgx?autoplay=1"
		}
	},
];
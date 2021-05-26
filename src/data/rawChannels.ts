export default [
	{
		"name": "Latina",
		"slug": "latina",
		"source": "https://www.latina.pe/tvenvivo",
		"number": {
			"national": "2",
			"movistar-hd": "702"
		},
		"content": {
			"enable": false
		}
	},
	{
		"name": "America TV",
		"slug": "america-tv",
		"source": "https://tvgo.americatv.com.pe/",
		"number": {
			"national": "4",
			"movistar-hd": "704"
		},
		"content": {
			"enable": false,
			"type": "iframe",
			"source": "https://tvgo.americatv.com.pe/"
		}
	},
	{
		"name": "Panamericana",
		"slug": "panamericana",
		"source": "https://panamericana.pe/tvenvivo",
		"number": {
			"national": "5",
			"movistar-hd": "705"
		},
		"content": {
			"enable": true,
			"type": "iframe",
			"source": "https://www.dailymotion.com/embed/video/x774s7s?autoplay=1"
		}
	},
	{
		"name": "TV Perú",
		"slug": "tv-peru",
		"source": "https://www.tvperu.gob.pe/play",
		"number": {
			"national": "7",
			"movistar-hd": "707"
		},
		"content": {
			"enable": false
		}
	},
	{
		"name": "ATV",
		"slug": "atv",
		"source": "https://www.atv.pe/envivo-atv",
		"number": {
			"national": "9",
			"movistar-hd": "709"
		},
		"content": {
			"enable": true,
			"type": "video",
			//"source": "https://www.atv.pe/envivo-atv"
			"source": "https://pe-atv-atv-live.ned.media/atv/smil:atv.smil/playlist.m3u8?iut=",
		}
	},
	{
		"name": "ATV Más",
		"slug": "atv-mas",
		"source": "https://www.atv.pe/envivo-atvmas",
		"number": {
			"national": "21",
			"movistar-hd": "776"
		},
		"content": {
			"enable": true,
			"type": "video",
			//"source": "https://www.atv.pe/envivo-atv"
			"source": "https://pe-atv-atv-mas-live.ned.media/atv/smil:atv-mas.smil/playlist.m3u8?iut=",
		}		
	},
	{
		"name": "Willax",
		"slug": "willax",
		"source": "https://willax.tv/en-vivo/",
		"number": {
			"national": "16",
			"movistar-hd": "716"
		},
		"content": {
			"enable": true,
			"type": "iframe",
			"source": "https://www.dailymotion.com/embed/video/x7x4dgx?autoplay=1"
		}
	},
];
import axios from 'axios';

export function getHash() {
	const _0x5d50: any = ['substring','split','length','join'];
	
	(function(_0x2fbeca,_0x302170){
		const _0x1ae02f = function(_0x1066ee: any){
			while(--_0x1066ee){
				_0x2fbeca['push'](_0x2fbeca['shift']());
			}
		};_0x1ae02f(++_0x302170);
	}(_0x5d50,0x14d));
	
	const _0x2fb6 = function(_0x2a2fed: any){
		_0x2a2fed=_0x2a2fed-0x0;
		const _0x45aef5=_0x5d50[_0x2a2fed];
		return _0x45aef5;
	};
	
	function jetdugvzomxrkwnchpblsfayqi(_0x577235: any,_0x101774: any){
		const _0x5ba90b=_0x101774[_0x2fb6('0x0')]('');
		const _0x104575=_0x5ba90b[_0x2fb6('0x1')]
		for(let _0x1b593c=_0x104575-0x1;_0x1b593c>=0x0;_0x1b593c--){
			const _0x543598=_0x1b593c*_0x577235%_0x104575;
			const _0x374569=_0x5ba90b[_0x1b593c];
			_0x5ba90b[_0x1b593c]=_0x5ba90b[_0x543598];
			_0x5ba90b[_0x543598]=_0x374569;
		}
		const _0x322c71=_0x5ba90b[_0x2fb6('0x2')]('');
		const _0x3b3d76=_0x322c71[_0x2fb6('0x3')](_0x104575-0x2,_0x104575);
		if(_0x3b3d76=='OK')
			return _0x322c71[_0x2fb6('0x3')](0x0,_0x104575-0x2);
		return null;
	}

	return jetdugvzomxrkwnchpblsfayqi(Math.floor(Date.now() / 3600000),'1961be7593341b8cd1K342eb0079ed74129dO9ed88') 
			|| jetdugvzomxrkwnchpblsfayqi(Math.floor(Date.now() / 3600000)-1,'1961be7593341b8cd1K342eb0079ed74129dO9ed88');
}

export async function getStreamUrlWithToken(url: string) {
	const response = await axios.get('https://past-server.nedp.io/token/pe-atv-atv?rsk=' + getHash());
	return url + response.data.token
}
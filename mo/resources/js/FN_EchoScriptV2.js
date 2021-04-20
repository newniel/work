
function FN_ZoneMark(_Ea) { if (_Ea < 10) { return "0" + _Ea; } else { return _Ea; } }
function FN_GetDomain(_Eb) { var _s = _Eb.split("."); if (_s.length == 3) { if (_s[1].length == 2) { return _Eb; } else { return _s[1] + "." + _s[2]; } } else if (_s.length > 3) { if (_s[_s.length-2].length == 2) { return _s[_s.length-3] + "." + _s[_s.length-2] + "." + _s[_s.length-1]; } else { return _s[_s.length-2] + "." + _s[_s.length-1]; } } else { return _Eb; } }
function FN_SetCookie(_Ec,_Ed,_Ee,_Ef,_Eg) { var _dt = new Date(); _ut = _dt.getTime(); _Ee = (!_Ee) ? "/" : _Ee; if( _Ed == null ) { _Eg = 0; } if( _Eg != null ) { _et = _ut + (_Eg * 1000); _dt.setTime(_et); _pt = " expires=" + _dt.toUTCString() + ";"; 	} else { _pt = ""; } if( _Ef != null ) { _pt += " domain=" + _Ef + ";"; } document.cookie = _Ec + "=" + escape(_Ed) + "; path=" + _Ee + ";" + _pt; }
function FN_GetCookie(_Ec) { var _nc = _Ec + "="; var _x = 0; while( _x <= document.cookie.length ) { var _y = _x + _nc.length; if (document.cookie.substring(_x,_y) == _nc) { if ((_ec = document.cookie.indexOf(";",_y)) == -1) { _ec = document.cookie.length; } return unescape(document.cookie.substring(_y,_ec)); } _x = document.cookie.indexOf(" ", _x) + 1; if (_x == 0) { break; } } return ""; }
function FN_StrPos(_Eh,_Ei) { for (var _i=0; _i < _Eh.length; _i++) { if (_Eh.substring(_i, _i+1) == _Ei) { return _i; } } return -1; }
function FN_FullDomain(_Ej) { if (FN_StrPos(_Ej, ":") > 0) { _Ej = _Ej.substring(0, FN_StrPos(_Ej, ":")); } if (FN_StrPos(_Ej, "/") > 0) { _Ej = _Ej.substring(0, FN_StrPos(_Ej, "/")); } _Ej = FN_GetDomain(_Ej); return _Ej; }
function FN_PageUrl(_Ek) { _Ek = _Ek.replace("http://", ""); _Ek = _Ek.replace("https://", ""); if (_Ek.indexOf("/") > 0 ) { _Ek = _Ek.replace(_Ek.substring(0, FN_StrPos(_Ek, "/")), ""); _Ek = _Ek.substring(0, FN_StrPos(_Ek, "?")); return _Ek; } else { return "/"; } }
function FN_getNavigatorInfoStr() { var name = navigator.appName, ver = navigator.appVersion, ver_int = parseInt(navigator.appVersion), ua = navigator.userAgent, infostr; if(name == "Microsoft Internet Explorer") { if(ver.indexOf("MSIE 3.0") != -1) { return "Internet Explorer 3.0x"; } if(ver_int != 4) { return "Internet Explorer " + ver.substring(0, ver.indexOf(" ")); } var real_ver = parseInt(ua.substring(ua.indexOf("MSIE ") + 5)); if(real_ver >= 7) { infostr = "Windows Internet Explorer "; } else {infostr = "Microsoft Internet Explorer "; } if(ua.indexOf("MSIE 5.5") != -1) { return infostr + "5.5"; } else { return infostr + real_ver + ".x"; } return "Internet Explorer"; } else if(name == "Netscape") { if(parseInt(ua.substring(8, 8)) <= 4) { return "Netscape " + ver.substring(0, ver.indexOf(" ")); } else if(ua.lastIndexOf(" ") < ua.lastIndexOf("/")) { return ua.substring(ua.lastIndexOf(" ")); } else { return "Netscape"; } } else { return name; } }
function FN_getOSInfoStr() { var ua = navigator.userAgent; if(ua.indexOf("NT 6.0") != -1) { return "Windows Vista/Server 2008"; }  else if(ua.indexOf("NT 5.2") != -1) { return "Windows Server 2003"; } else if(ua.indexOf("NT 5.1") != -1) { return "Windows XP"; } else if(ua.indexOf("NT 5.0") != -1) { return "Windows 2000"; } else if(ua.indexOf("NT") != -1) { return "Windows NT"; } else if(ua.indexOf("9x 4.90") != -1) { return "Windows Me"; } else if(ua.indexOf("98") != -1) { return "Windows 98"; } else if(ua.indexOf("95") != -1) { return "Windows 95"; } else if(ua.indexOf("Win16") != -1) { return "Windows 3.x"; } else if(ua.indexOf("Windows") != -1) { return "Windows"; } else if(ua.indexOf("Linux") != -1) { return "Linux"; } else if(ua.indexOf("Macintosh") != -1) { return "Macintosh"; } else { return ""; } }

function FN_DivSH(DivName, SHType) { if (SHType == "auto") { if (DivName.style.display == "none") { DivName.style.display = "block"; } else { DivName.style.display = "none"; } } else if (SHType == "true") { DivName.style.display = "block"; } else if (SHType == "false") { DivName.style.display = "none"; } }
function getPageSize() { var xScroll, yScroll; if (window.innerHeight && window.scrollMaxY) { xScroll = window.innerWidth + window.scrollMaxX; yScroll = window.innerHeight + window.scrollMaxY; } else if (document.body.scrollHeight > document.body.offsetHeight){ xScroll = document.body.scrollWidth; yScroll = document.body.scrollHeight; } else { xScroll = document.body.offsetWidth; yScroll = document.body.offsetHeight; } var windowWidth, windowHeight; if (self.innerHeight) { if(document.documentElement.clientWidth){ windowWidth = document.documentElement.clientWidth; } else { windowWidth = self.innerWidth; } windowHeight = self.innerHeight; } else if (document.documentElement && document.documentElement.clientHeight) { windowWidth = document.documentElement.clientWidth; windowHeight = document.documentElement.clientHeight; } else if (document.body) { windowWidth = document.body.clientWidth; windowHeight = document.body.clientHeight; } if(yScroll < windowHeight){ pageHeight = windowHeight; } else { pageHeight = yScroll; } if(xScroll < windowWidth){ pageWidth = xScroll; } else { pageWidth = windowWidth; } return [pageWidth,pageHeight]; }
function FN_bookmarksite() { var title=window.location.title; var url=window.location.href; if (window.sidebar) { window.sidebar.addPanel(title, url, ""); }else if(window.opera && window.print) { var elem = document.createElement('a');  elem.setAttribute('href',url); elem.setAttribute('title',title); elem.setAttribute('rel','sidebar'); elem.click(); } else if(document.all) { window.external.AddFavorite(parent.location.href, parent.location.title); } }

function FN_EchoCresendo(EchoCV_P, EchoPN_P, EchoGM_P, EchoAT_P) {
	
	var EchoID = "shinhan00";
	var EchoGoodNm = "";
	var EchoAmount = "";
	var EchoUIP = "";
	var EchoTarget = "";
	var EchoLogSend = "";
	var EchoCV = "";
	var EchoPN = "";
	if (EchoCV_P != "")	{ EchoCV = EchoCV_P; }
	if (EchoPN_P != "")	{ EchoPN = EchoPN_P; }
	if (EchoGM_P != "")	{ EchoGoodNm = EchoGM_P; }
	if (EchoAT_P != "")	{ EchoAmount = EchoAT_P; }

	var EchoLogServer = "log.cresendo.net";
	var EchoCookieDays = 45;
	var Echotoday = new Date();
	var EchoToDay = Echotoday.getYear() + "" + FN_ZoneMark(Echotoday.getMonth()) + "" + FN_ZoneMark(Echotoday.getDate());
	var EchoToDayHours = Echotoday.getHours();

	var _EchoPR = location.protocol.indexOf("https");
	var _EchoHostName = location.hostname;
	var _EchoPathName = location.pathname;
	var _EchoSearch = location.search;
	var _EchoHash = location.hash
	var _EchoUL = document.URL;
	var _EchoRF = document.referrer;
	var _EchoDoMain = FN_FullDomain(_EchoHostName);

	var _EchoAK = FN_GetCookie(EchoID+"_CTNAAKEY");
	var _EchoCK = FN_GetCookie(EchoID+"_CTNACKEY");
	var _EchoSK = FN_GetCookie(EchoID+"_CTNAKEY");
	var _EchoSS = FN_GetCookie(EchoID+"_CTNASESSION");
	var _EchoOv = FN_GetCookie(EchoID+"_CTNAOVKEY");
	var _EchoK = "";
	var _EchoDate = FN_GetCookie(EchoID+"_CTNADATE");
	var _EchoInKey = "";
	var _EchoCV = "";
	var _EchoPN = "";
	var _EchoLogSend = "";

	if (_EchoUL.indexOf("#") > 0) { _EchoUL = _EchoUL.substring(0, _EchoUL.indexOf("#")); }
	if (_EchoUL.charAt(_EchoUL.length-1) == "/" ) { _EchoUL = _EchoUL.substring(0, _EchoUL.length-1); }

	var _EchoULEchoKey = _EchoUL.toUpperCase().indexOf("CTNAKEY=");
	var _EchoULOvKey = _EchoUL.toUpperCase().indexOf("OVKEY=");
	var _EchoULTemp="", _EchoULSubDomain="", _EchoRFTemp="", _EchoRFSubDomain="";

	if (_EchoULEchoKey > 0) { 
		var _ii = _EchoUL.indexOf("&", _EchoULEchoKey+8); 
		
		if( _ii > 0 ) {
			_EchoK = _EchoUL.substring(_EchoULEchoKey+8, _ii); 
		} else {
			_EchoK = _EchoUL.substring(_EchoULEchoKey+8); 
		}
		
		if( _EchoK != _EchoSK ) { echo_new_session = true; } FN_SetCookie(EchoID+"_CTNAKEY", _EchoK, "/", _EchoDoMain); }
	if (_EchoULOvKey > 0) { var _ii = _EchoUL.toUpperCase().substring(_EchoULOvKey+6, _EchoUL.toUpperCase().indexOf("&", _EchoULOvKey+6)); _EchoOv = _ii; FN_SetCookie(EchoID+"_CTNAOVKEY", _ii, "/", _EchoDoMain); }
	if (!_EchoK || _EchoK == "") { _EchoK="unknown"; }
	if (!_EchoCK || _EchoCK == "") { _EchoCK="unknown"; }
	if (_EchoK != "unknown") { _EchoCK = _EchoK; _EchoDate = EchoToDay; FN_SetCookie(EchoID+"_CTNACKEY", _EchoK, "/", _EchoDoMain, EchoCookieDays * 24 * 60 * 60); FN_SetCookie(EchoID+"_CTNADATE", EchoToDay, "/", _EchoDoMain, EchoCookieDays * 24 * 60 * 60); if (!_EchoAK || _EchoAK == "") { _EchoAK = _EchoK; FN_SetCookie(EchoID+"_CTNAAKEY", _EchoK, "/", _EchoDoMain, 1 * 24 * 60 * 60); } }
	if (!_EchoSS || _EchoSS == "") { var _DT=new Date(); _EchoSS = ((Math.round(Math.random()*900)%900+100)) + "" + _DT.getTime(); FN_SetCookie(EchoID+"_CTNASESSION", _EchoSS, "/", _EchoDoMain); }

	_EchoUL = _EchoUL.replace("'", "");
	_EchoULTemp = _EchoUL.replace("http://", "");
	_EchoULTemp = _EchoULTemp.replace("https://", "");
	_EchoULSubDomain = FN_FullDomain(_EchoULTemp);

	if (!_EchoRF || _EchoRF == "") { _EchoRFSubDomain = ""; } else { _EchoRF = _EchoRF.replace("'", ""); _EchoRFTemp = _EchoRF.replace("http://", ""); _EchoRFTemp = _EchoRFTemp.replace("https://", ""); _EchoRFSubDomain = FN_FullDomain(_EchoRFTemp); }

	var _LandYn = "N";
	var _BookMark = "N";
	var _EchoIPCloseYn = "N";

	if (_EchoPR > 0) { if (_EchoULSubDomain != _EchoRFSubDomain) { _LandYn="Y"; if (_EchoRFSubDomain == "") { _BookMark="Y"; _LandYn="N"; } } _EchoInKey = _EchoCK; } else { if (_EchoULSubDomain != _EchoRFSubDomain) { _LandYn="Y"; if (_EchoRFSubDomain == "") {  _BookMark="Y"; _LandYn="N"; } } if (_EchoK=="unknown") { if (_EchoCK=="unknown") { _EchoInKey = _EchoAK; } else { _EchoInKey = _EchoCK; } } else { _EchoInKey = _EchoK; } }
	
	

	if (typeof(EchoTarget)!="string") { EchoTarget=""; }
	if (typeof(EchoCV)=="undefined" || typeof(EchoCV)!="string") { _EchoCV=""; } else { _EchoCV=EchoCV; }
	if (typeof(EchoPN)=="undefined" || typeof(EchoPN)!="string") { _EchoPN=""; } else { _EchoPN=EchoPN; }
	if (typeof(EchoLogSend)=="undefined" || typeof(EchoLogSend)!="string") { _EchoLogSend=""; } else { _EchoLogSend=EchoLogSend; }
	
	if (_EchoLogSend=="Y") {
		if (_EchoInKey!="" || _EchoAK!="") {
			if (_LandYn=="Y" || _EchoCV=="Y") {
				var _EchoLogUrl = "//" + EchoLogServer + "/?ac=" + EchoID + "&k=" + escape(_EchoInKey) + "&ak=" + _EchoAK + "&ok=" + escape(_EchoOv)+ "&la=" + _LandYn + "&bm=" + _BookMark + "&gd=" + encodeURIComponent(EchoGoodNm) + "&at=" + EchoAmount + "&ud=" + escape(_EchoULSubDomain) + "&ul=" + escape(_EchoUL) + "&rd=" + escape(_EchoRFSubDomain) + "&rl=" + escape(_EchoRF) + "&pg=" + escape(_EchoUL.replace(_EchoSearch + _EchoHash,"")) + "&cd=" + _EchoDate + "&ic=" + _EchoIPCloseYn + "&br=" + escape(FN_getNavigatorInfoStr()) + "&os=" + escape(FN_getOSInfoStr()) + "&et=" + EchoTarget + "&cv=" + _EchoCV + "&pn=" + _EchoPN + "&ss=" + _EchoSS + "&vr=5.0";
				var _EchoImg = new Image(); _EchoImg.src = _EchoLogUrl;
			
			}
		}
	} else {
		var _EchoLogUrl = "//" + EchoLogServer + "/?ac=" + EchoID + "&k=" + escape(_EchoInKey) + "&ak=" + _EchoAK + "&ok=" + escape(_EchoOv)+ "&la=" + _LandYn + "&bm=" + _BookMark + "&gd=" + encodeURIComponent(EchoGoodNm) + "&at=" + EchoAmount + "&ud=" + escape(_EchoULSubDomain) + "&ul=" + escape(_EchoUL) + "&rd=" + escape(_EchoRFSubDomain) + "&rl=" + escape(_EchoRF) + "&pg=" + escape(_EchoUL.replace(_EchoSearch + _EchoHash,"")) + "&cd=" + _EchoDate + "&ic=" + _EchoIPCloseYn + "&br=" + escape(FN_getNavigatorInfoStr()) + "&os=" + escape(FN_getOSInfoStr()) + "&et=" + EchoTarget + "&cv=" + _EchoCV + "&pn=" + _EchoPN + "&ss=" + _EchoSS + "&vr=5.0";
		var _EchoImg = new Image(); _EchoImg.src = _EchoLogUrl;
	}
		

}
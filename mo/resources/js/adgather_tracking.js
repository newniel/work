/* 애드개더 공통스크립트 */
function smartHttpsConv(conv1, conv2){

	var SEA_sale = ""; //매출액
	var SEA_others1 = conv1;
	var SEA_others2 = conv2; 
	var SEA_others3="";  var SEA_others4="";
	var SEA_others5=""; SEA_others5=new Date().getTime();
	var S_URL1 = 'https://'+'tag.adgather.net/conv' ;
	var SEA_url=document.location.hostname;
	var TAG_JS  = document.createElement('script');
		TAG_JS.src  = S_URL1+ '?SU=' + escape(SEA_url) + '&SS=' + SEA_sale + '&o1='+escape(SEA_others1)+ '&o2='+escape(SEA_others2)+ '&o3='+escape(SEA_others3)+ '&o4='+escape(SEA_others4)+ '&o5='+escape(SEA_others5);

	document.getElementsByTagName('head')[0].appendChild(TAG_JS);
}


function setAdTrackingCookie(key, val, expiredDt) {	
	var dt = new Date();
	dt.setDate(dt.getDate() + expiredDt);
	
	var trackingDomain = '.shinhansavings.com';
	document.cookie = key + '=' + escape(val) + '; path=/; domain=' + trackingDomain + '; expires='  + dt.toGMTString() + ';';
}


function getAdTrackingCookie(key) {
	var val = getCookieByKey(document.cookie, key, ';');
		
	if(val !== undefined && val !== '') {
		return getCookieByKey(document.cookie, key, ';');
	}
	
	return "";
}

function chkAdTrackingCookie(key) {
	if(getAdTrackingCookie(key) != "") {
		setAdTrackingCookie(key, "", -1);
	}
}

function getCookieByKey(cookieStr, key, delim) {		
	key = key + '=';

	if(cookieStr.indexOf(key) < 0)	return '';
	
	if(cookieStr.indexOf('?' + key) > 0){
		key = '?' + key;
	}
	if(cookieStr.indexOf('&' + key) > 0){
		key = '&' + key;
	}
	
	var keyIdx = cookieStr.indexOf(key) + (key.length);
	var val = cookieStr.substr(keyIdx, cookieStr.length - keyIdx);
	var idx = keyIdx + val.indexOf(delim);

	if(idx >= keyIdx) {
		val = cookieStr.substr(keyIdx, idx - keyIdx);
	}
	
	return val;
}
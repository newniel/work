(function(window) {
'use strict';

	var document = window.document,
			navigator = window.navigator,
			location = window.location;

	var root = window;
		
	var cookieQueueCount = 6;
	var trackingDays = 30;
	var cookieExpireDays = 30;
	var trackingDomain = multiDomain(document.domain);
	
	var query = {};
	query['ekams'] = getParseQueryValue(location.href, 'EKAMS', '&');
	query['trackingDays'] = getParseQueryValue(location.href, 'trackingDays', '&');
	query['cookieExpireDays'] = getParseQueryValue(location.href, 'cookieExpireDays', '&');

	query['trackingDays'] = query['trackingDays'] ? Number(query['trackingDays']) : trackingDays;
	query['cookieExpireDays'] = query['cookieExpireDays'] ? Number(query['cookieExpireDays']) : cookieExpireDays;

	var neoAdvertiserId = getAdvertiserId();
	var ekamsCookieName, medsCookieName;
	
	if(neoAdvertiserId) {
		ekamsCookieName = 'emf.' + neoAdvertiserId + '.ekams';
		medsCookieName = 'emf.' + neoAdvertiserId + '.meds';
	}

	/*
		check parameter
	*/
	if (query['ekams'] !== '' && query['ekams'] !== undefined && neoAdvertiserId !== '' && neoAdvertiserId !== undefined) {
		makeCookie(cookieQueueCount);

	}

	function multiDomain(dd) {
		var s = dd.split(".");
		if (s.length == 3) {
			if (s[1].length == 2) {
				return dd;
			} else {
				return s[1] + "." + s[2];
			}
		} else if (s.length > 3) {
			if (s[s.length-2].length == 2) {
				return s[s.length-3] + "." + s[s.length-2] + "." + s[s.length-1];
			} else {
				return s[s.length-2] + "." + s[s.length-1];
			}
		} else {
			return dd;
		}
	}

	function getSubDomain(rf) {
		var start = rf.indexOf('//');
		var end = rf.substring(start+2, rf.length).indexOf('/');
		return (rf.substring(start+2, start+2+end));
	}

	function getAdvertiserId() {
		if(query['ekams'] !== '' && query['ekams'] !== undefined) {
			return query['ekams'].split('.')[1];
		}else {
			return;
		}
	}

	function getParseQueryValue(q, key, delimiter) {
		
		key = key + '=';

		if(q.indexOf(key) < 0) return '';
		
		if(q.indexOf('?' + key) > 0){
			key = '?' + key;
		}
		if(q.indexOf('&' + key) > 0){
			key = '&' + key;
		}
		var s_idx = q.indexOf(key) + (key.length);
		var value = q.substr(s_idx, q.length - s_idx);
		var e_idx = s_idx + value.indexOf(delimiter);

		if(e_idx >= s_idx) {
			value = q.substr(s_idx, e_idx - s_idx);
		}
		return value;
	}

	function getEpochTime(type) {
		var todayDate = new Date();

		if(type == 'ekams') {
			todayDate.setDate(todayDate.getDate() + query['trackingDays']);
			return parseInt(todayDate.getTime() / 1000,10);
		}else if(type == 'meds') {
			todayDate.setDate(todayDate.getDate());
			return parseInt(todayDate.getTime() / 1000,10);
		}
	}

	function getCookie(name) {
		var cookieValue = getParseQueryValue(document.cookie,name,';');
		
		if(cookieValue !== undefined && cookieValue !== '') {
			return getParseQueryValue(document.cookie,name,';');
		}else {
			return;
		}
	}

	function setCookie(name, value, expiredays, dateType) {
		var todayDate = new Date();

		todayDate.setDate(todayDate.getDate() + expiredays);

		document.cookie = name + '=' + value + '; path=/; domain=' + trackingDomain + '; expires=' + todayDate.toGMTString() + ';';

		//local storage
		try{
			var memory = window.localStorage || (window.UserDataStorage && new UserDataStorage()) || new CookieStorage();
			memory.setItem(name,value);
		}catch(ex){

		}
	}

	function assembleCookie(oldArr, currentStr) {
		var value = [];
		
		var oldArrLen = oldArr.length;

		if(oldArrLen < cookieQueueCount) {
			value = oldArr;
		}else {
			for(var i=0;i<oldArrLen-1;i++) {
				value.push(oldArr[i+1]);
			}
		}
		value.push(currentStr);

		return value;
	}

	function getStringFromArray(arr) {
		var valueStr = '';

		for(var i=0;i<arr.length;i++) {
			if(i===0) {
				valueStr = arr[i];
			}else {
				valueStr += '|' + arr[i];
			}
		}
		return valueStr;
	}

	//encoding utf-8
	function encodeURL(str){
		var s0, i, s, u;
		s0 = "";                // encoded str
		for (i = 0; i < str.length; i++){   // scan the source
			s = str.charAt(i);
			u = str.charCodeAt(i);          // get unicode of the char
			if (s == " "){
				s0 += "+"; // SP should be converted to "+"
			}else{
				if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a))){       // check for escape
				s0 = s0 + s; // don't escape
				}else { // escape
					if ((u >= 0x0) && (u <= 0x7f)){     // single byte format
						s = "0"+u.toString(16);
						s0 += "%"+ s.substr(s.length-2);
					}else if (u > 0x1fffff){     // quaternary byte format (extended)
						s0 += "%" + (oxf0 + ((u & 0x1c0000) >> 18)).toString(16);
						s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
						s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
						s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
					}else if (u > 0x7ff){        // triple byte format
						s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
						s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
						s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
					}else {                      // double byte format
						s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
						s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
					}
				}
			}
		}
		return s0;
	}

	function getSearchKeyword() {
		var searchEngine = {
			'www.google.co.kr' : 'q',
			'www.google.com' : 'q',
			'search.naver.com' : 'query',
			'ad.search.naver.com' : 'query',
			'm.search.naver.com' : 'query',
			'm.ad.search.naver.com' : 'query',
			'search.daum.net' : 'q',
			'm.search.daum.net' : 'q',
			'kr.search.yahoo.com' : 'p',
			'livesearch.msn.co.kr' : 'q',
			'search.nate.com' : 'q',
			'm.search.nate.com' : 'q',
			'powersearch.korea.com' : 'query',
			'search.chol.com' : 'q',
			'm.chol.com' : 'keyword',
			'search.dreamwiz.com' : 'sword',
			'm.dreamwiz.com' : 'sword',
			'find.joins.com' : 'q',
			'search.zum.com' : 'query',
			'm.search.zum.com' : 'query',
			//test
			'dev.facebook.emforce.co.kr:8080' : 'q',
			'beta.media.emforce.co.kr' : 'q',
			'www.grapi.kr' : 'q'
		};

		var rfd = getRfd();
		var attr = searchEngine[rfd];
		if(attr !== '' && attr !== undefined) {
			var topRef = top.document.referrer;
			return getParseQueryValue(topRef, attr, '&');
		}else {
			return '';
		}
	}

	function keywordFilter(key, before, after){
		if (key !== '' && key !== undefined) {
			key = key.split(before).join(after);
		}
		return key;
	}

	function getMedsCookie(kwd) {
		var value = '';

		var rfd = getRfd();
		var keyword = encodeURL(kwd);
		var matchType = keywordFilter(rfd, '.', '_');

		if(keyword !== '' && keyword !== undefined) {
			keyword = keywordFilter(keyword, '.', '');
			keyword = keywordFilter(keyword, '%7C', '');
		} else {
			keyword = 'NOSEARCH';
		}
		value = matchType + '.' + keyword;

		return value;
	}

	function getRfd() {
		var value = '';

		var rf = document.referrer;
		var rfd = '';
		/* no ref media */
		if(rf === '' || rf === undefined){
			var param = location.href;
			if(param.indexOf('_caosrefdm') > -1) {
				rfd = getParseQueryValue(param, '_caosrefdm', '&');
			}else {
				rfd = 'NOREF';
			}
		}else {
			rfd = getSubDomain(rf);
		}

		value = rfd;

		return value;
	}

	function makeCookie(maxCnt) {
		/*
			1. cookie => emf.{id}.ekams
		*/
		var epochTimeForEkams = getEpochTime('ekams');
		var oldEkamsCookie = getCookie(ekamsCookieName);
		var newEkamsCookieValue = '';
		var newEkamsCookieValueArr = [];

		/*
			2. cookie => emf.{id}.meds
			search_url.keyword.localTime
		*/

		var epochTimeForMeds = getEpochTime('meds');
		var oldMedsCookie = getCookie(medsCookieName);

		var searchKeyword = getSearchKeyword();
		var newMedsCookieValue = encodeURIComponent(getMedsCookie(searchKeyword));
		var newMedsCookieValueArr = [];

		if(oldEkamsCookie === '' || oldEkamsCookie === undefined) {
			newEkamsCookieValue = query['ekams'] + '.' + epochTimeForEkams;
			newMedsCookieValue += '.' + epochTimeForMeds;
		}else {
				var oldEkamsCookieArr = oldEkamsCookie.split('|');
				var lastEkamsCookie = oldEkamsCookieArr[oldEkamsCookieArr.length-1];

				var oldMedsCookieArr = oldMedsCookie.split('|');

				if(lastEkamsCookie.indexOf(query['ekams']) > -1) {
					oldEkamsCookieArr[oldEkamsCookieArr.length-1] = query['ekams'] + '.' + epochTimeForEkams;
					oldMedsCookieArr[oldMedsCookieArr.length-1] = newMedsCookieValue + '.' + epochTimeForMeds;

					newEkamsCookieValueArr = oldEkamsCookieArr;
					newMedsCookieValueArr = oldMedsCookieArr;
				}else {
					var currentEkamsCookieValue = query['ekams'] + '.' + epochTimeForEkams;
					newEkamsCookieValueArr = assembleCookie(oldEkamsCookieArr,currentEkamsCookieValue);

					var currentMedsCookieValue = newMedsCookieValue + '.' + epochTimeForMeds;
					newMedsCookieValueArr = assembleCookie(oldMedsCookieArr, currentMedsCookieValue);
				}
				newEkamsCookieValue = getStringFromArray(newEkamsCookieValueArr);
				newMedsCookieValue = getStringFromArray(newMedsCookieValueArr);
		}

		setCookie(ekamsCookieName, newEkamsCookieValue, query['cookieExpireDays']);
		setCookie(medsCookieName, newMedsCookieValue, query['cookieExpireDays']);
	}
})(window);

/**
 * 신한데이타시스템 SDSMobileFrameWork 공통 모듈
 * 
 * date : 2014.06.27
 * auth : kswksk
 */

// Java Map 처럼 사용하기 위한 객체
var SDSFMap = function() {};

SDSFMap.prototype = {  
	map : new Object(),
	
	// 데이터 입력
    put : function(key, value){   
        this.map[key] = value;
    },   
    
    // 데이터 가져오기
    get : function(key){   
        return this.map[key];
    },
    
    // 데이터 내용에 값이 있는지 찾기
    containsKey : function(key){    
    	return key in this.map;
    },
    
    // value 가 있는지 확인
    containsValue : function(value){    
    	for(var prop in this.map){
    		if(this.map[prop] == value) return true;
    	}
    	return false;
    },
    
    // 비여 있는지 확인
    isEmpty : function(key){    
    	return (this.size() == 0);
    },
    
    // 데이터 지우기
    clear : function(){   
    	for(var prop in this.map){
    		delete this.map[prop];
    	}
    },
    
    // 해당 키의 데이터 삭제
    remove : function(key){    
    	delete this.map[key];
    },
    
    // 입력된 데이터 키목록 가져오기
    keys : function(){   
    	var keys = new Array();   
    	for(var prop in this.map){   
    		keys.push(prop);
    	}   
    	return keys;
    },
    
    // value 전체 가져오기
    values : function(){   
    	var values = new Array();   
    	for(var prop in this.map){   
    		values.push(this.map[prop]);
    	}   
    	return values;
    },
    
    // 데이터 사이즈 가져오기
    size : function(){
    	var count = 0;
    	for (var prop in this.map) {
    		count++;
    	}
    	return count;
    }
};

var SDSFrameWork = function () {};

SDSFrameWork.Const = {
	// 개발모드 여부
	isDevelop : true,
	
	// Browser OS TYPE
	BROWSER_TYPE_IOS 	: 0,
	BROWSER_TYPE_AND 	: 1,
	BROWSER_TYPE_OTHER  : 2,
	
	// 네트워크 관련 키
	KEY_ERROR_CODE : "errorCode",
	KEY_ERROR_MSG  : "errorMessage",
	KEY_ERROR_DATA : "receiveData",
    
    // IOS 연동 스키마
    IOS_SCHEME_PRE : "sdshybrid://",
}

SDSFrameWork.util = {
	JSONtoString : function(object) {
		// 프레임워크가 바뀌면 수정되어야 할 부분
		return JSON.stringify(object);
	}, 
	
	stringToJSON : function(jsonStr) {
		if (jsonStr == null || jsonStr == '') {
			return [];
		}
		
		while (jsonStr.indexOf('+') > -1) {
			jsonStr = jsonStr.replace('+', ' ');
		} 
		
		var decJsonStr = decodeURIComponent(jsonStr);
		
		// 프레임워크가 바뀌면 수정되어야 할 부분
		var jsonData = jQuery.parseJSON(decJsonStr);
		return jsonData;
	},
	
	getDeviceType : function() {
		/*
		 * 		// navigator.userAgent.match(/Android/i)
				// || navigator.userAgent.match(/webOS/i)
				// || navigator.userAgent.match(/iPhone/i)
				// || navigator.userAgent.match(/iPad/i)
				// || navigator.userAgent.match(/iPod/i)
				// || navigator.userAgent.match(/BlackBerry/i)
				// || navigator.userAgent.match(/Windows Phone/i)
		 */
		if( navigator.userAgent.match(/Android/i)) {
		    return SDSFrameWork.Const.BROWSER_TYPE_AND;
		} else if (navigator.userAgent.match(/iPhone/i)
				|| navigator.userAgent.match(/iPad/i)
				|| navigator.userAgent.match(/iPod/i)) {
		    return SDSFrameWork.Const.BROWSER_TYPE_IOS;
		} else {
			return SDSFrameWork.Const.BROWSER_TYPE_OTHER;
		}
	},
	
	getUnickKey : function() {
		// 년월일밀리초_랜덤값
		var toDay = new Date();
		var key = SDSFrameWork.util.addLeft(toDay.getFullYear(), 4, "0")
			+ SDSFrameWork.util.addLeft(toDay.getMonth()+1, 2, "0")
			+ SDSFrameWork.util.addLeft(toDay.getDay(), 2, "0")
			+ SDSFrameWork.util.addLeft(toDay.getMilliseconds(), 3, "0");
		// 랜덤정보 생성
		key = key + "_" + String(Math.round(100000*Math.random()));
		
		return key;
	},
	
	addLeft : function(data, size, prefix) {
		if (data == null) {	
			data = ""; 
		}
		data = String(data);
		while (data.length < size) {
			data = prefix + data;
		}
		return data;
	} 
};

// 네트워크 요청 모듈
SDSFrameWork.request = {
	register : new SDSFMap(),
	requestData :  function (params) {
		try {
			var key = SDSFrameWork.util.getUnickKey();
			this.register.put(key, params);
            
            var strUrl = params.url;
            var strParams = SDSFrameWork.util.JSONtoString(params.params);
            var isLoadingBar = params.isLoadingBar;
            
            if (strUrl == null) {
                alert('요청 URL이 설정되어 있지 않습니다.');
                return;
            }
            
            if (strParams == null) {
                strParams = '';
            }
            
            if (isLoadingBar == null) {
                isLoadingBar = true;
            }
			
			if (SDSFrameWork.util.getDeviceType() == SDSFrameWork.Const.BROWSER_TYPE_AND) {
				window.sinhansys.request(strUrl, strParams, key, isLoadingBar);
			} else if (SDSFrameWork.util.getDeviceType() == SDSFrameWork.Const.BROWSER_TYPE_IOS) {
				// alert('IOS 용으로 개발해야함');
                var schemeUrl = SDSFrameWork.Const.IOS_SCHEME_PRE
                +"request?url="+encodeURIComponent(strUrl)
                +"&isLoadingBar="+encodeURIComponent(isLoadingBar)
                +"&key="+encodeURIComponent(key)
                +"&params="+encodeURIComponent(strParams);
                window.location.href = schemeUrl;
			} else {
				// alert('PC 브라우져에서는 지원되지 않는 기능입니다.');
			}
		} catch (e) {
			console.log(e);
			// alert('PC 브라우져에서는 지원되지 않는 기능입니다.');
		}
	},
	callBack : function (isOK, key, strData) {
		var jsonData = SDSFrameWork.util.stringToJSON(strData);
		var params = this.register.get(String(key));
		
		if (params == null) return;
		
		if (params.callBack != null) {
			params.callBack(isOK, jsonData);
		}
		
		this.register.remove(String(key));
	}
};

SDSFrameWork.plugin = {
	register : new SDSFMap(),
	execute : function(params) {
		try {
            var pluginId = params.pluginId;
            var method = params.method;
			if (pluginId == null) {
				alert('요청 pluginId 값이 존재하지 않습니다.');
				return;
			}
			
			this.register.put(this.getExecuteId(pluginId, method), params);
            
            var strParams = SDSFrameWork.util.JSONtoString(params.params);
            var isLoadingBar = params.isLoadingBar;
            
            if (strParams == null) {
                strParams = '';
            }
            
            if (isLoadingBar == null) {
                isLoadingBar = true;
            }
			
            if (SDSFrameWork.util.getDeviceType() == SDSFrameWork.Const.BROWSER_TYPE_AND) {
				window.sinhansys.execute(pluginId, method, strParams);
			} else if (SDSFrameWork.util.getDeviceType() == SDSFrameWork.Const.BROWSER_TYPE_IOS) {
				var schemeUrl = SDSFrameWork.Const.IOS_SCHEME_PRE
                    +"plugin?pluginId="+encodeURIComponent(pluginId)
                    +"&method="+encodeURIComponent(method)
                    +"&params="+encodeURIComponent(strParams);
                window.location.href = schemeUrl;
			} else {
				alert('PC 브라우져에서는 지원되지 않는 기능입니다.');
			}
		} catch (e) {
			console.log(e);
			// alert('PC 브라우져에서는 지원되지 않는 기능입니다.');
		}
	}, 
	callBack : function (isOK, pluginId, method, strData) {
		var jsonData = SDSFrameWork.util.stringToJSON(strData);
		var params = this.register.get(this.getExecuteId(pluginId, method));
		
		if (params == null) return;
		
		if (params.callBack != null) {
			params.callBack(isOK, jsonData);
		}
		
		this.register.remove(pluginId);
	},
    getExecuteId : function(pluginId, method) {
        return pluginId + "-" + method;
    }
};

SDSFrameWork.secureKeyPad = {
	// 표출방식
	KEY_SHOW_FULL 		: "fullScreen",
	KEY_SHOW_HALF 		: "halfScreen",
	// 키패드 종료
	KEY_PAD_TYPE_CHAR 	: "char",
	KEY_PAD_TYPE_NUMBER : "number",
	
	// 입력 키패드 키코드
	KEY_CODE_NEXT	: 'NEXT',	// 다음
	KEY_CODE_PRE	: 'PRE', 	// 이전
	KEY_CODE_DONE	: 'DONE',   // 완료
	KEY_CODE_INPUT	: 'INPUT',   // 입력
	
	callBack : null,
	
	/**
	 * 전체화면 보안키패드 표출
	 * reqCode : 요청구분코드
	 * callBack : 입력 후 리턴 받을 컬백 메소드
	 * payType : 숫자, 문자
	 * keyPadTitle : 보안키패드 타이틀
	 */
	showFullScreen : function (padType, keypadTitle, callBack) {
		var showType = this.KEY_SHOW_FULL;
		
		this.callBack = callBack;
		
		var params = {
			pluginId : 'secureKeyPad',
			method : 'onExecute',
			params : {
				showType 	: showType, 
				padType 	: padType,
				keyPadTitle	: keypadTitle
			},
			callBack : function(isOK, json) {
				// 아무짓도 하지않는다.
				if (isOK == false) {
					alert('보안키패드 요청중에 오류가 발생하였습니다. 잠시 후에 다시 시도해 주십시오.');
				}
			}
		};
		
		SDSFrameWork.plugin.execute(params);
	},
	
	/**
	 * 전체화면 보안키패드 표출
	 * reqCode : 요청구분코드
	 * callBack : 입력 후 리턴 받을 컬백 메소드
	 * payType : 숫자, 문자
	 */
	showHalfScreen : function(padType, callBack, isPre, isNext) {
		var showType = this.KEY_SHOW_HALF;
		
		this.callBack = callBack;
		
		var params = {
				pluginId : 'secureKeyPad',
				method : 'onExecute',
				params : {
					showType 	: showType, 
					padType 	: padType,
					isNext		: isNext,
					isPre		: isPre
				},
				callBack : function(isOK, json) {
					if (isOK == false) {
						alert('보안키패드 요청중에 오류가 발생하였습니다. 잠시 후에 다시 시도해 주십시오.');
					}
				}
		};
		
		SDSFrameWork.plugin.execute(params);
	},
	
	/**
	 * 보안키패드 중 반키패드를 닫는다.
	 */
	closeHalfScreen : function(_callBack) {
		var params = {
				pluginId : 'secureKeyPad',
				method : 'closeKeyPad',
				params : {},
				callBack : function(isOK, json) {
					if (_callBack != null) {
						_callBack();
					}
				}
		};
		
		SDSFrameWork.plugin.execute(params);
	},
	
	inputData : function(json) {
		console.log(json);
		if (this.callBack != null) {
			var jsonObj = SDSFrameWork.util.stringToJSON(json);
			this.callBack(jsonObj);
		}
	}
};

// WebView History 관련 플러그인 (back, forward, clear)
SDSFrameWork.history = {
	KEY_BACK 	: "back",
	KEY_FORWARD : "forward",
	KEY_CLEAR 	: "clear",
	KEY_HOME 	: "home",
	
	clear : function() {
		this.execute(this.KEY_CLEAR);
	},
	
	goBack : function() {
		this.execute(this.KEY_BACK);
	},
	
	goForward : function() {
		this.execute(this.KEY_FORWARD);
	},
	
	goHome : function() {
		this.execute(this.KEY_HOME);
	}, 
	
	execute : function(command) {
		var params = {
				pluginId : 'history',
				method : 'onExecute',
				params : {'command' : command}
		};
		SDSFrameWork.plugin.execute(params);
	}
};

function comProcessErrorResult(json, isApp) {
	var errorMsg = json.RESULT_DESC;	
	
	if(json.RESULT_DETAIL_NO == "000901") {						// 상당신청 존재
		if(confirm(errorMsg.split("<br/>").join("\n"))) {
			callTel(json.DATA.TEL);
		}
	} else if(json.RESULT_DETAIL_NO == "000902" || json.RESULT_DETAIL_NO == "000903") {				// 신청내역 존재
		if(confirm(errorMsg.split("<br/>").join("\n"))) {
			if (isApp == true) {
				var params = {
						pluginId : 'webPostBridge',
						method : 'onExecute',
						params : {
							"url": "/loan_request/login",	// "url":"/loanRequestResult", 
							"data":{
								"title":"대출진행조회",
								"CUST_NO":json.DATA.CUST_NO, 
							    "CUST_NM":json.DATA.CUST_NM
							}
					    },
						callBack : function(isOK, json) {
						}
					};
				SDSFrameWork.plugin.execute(params);
				return;
			} else {
				appInvoke();				
			}
		}
	} else {
		alert(errorMsg.split("<br/>").join("\n"));
	}
	location.href='/main';
}

function redirectProcessErrorResult(json, isApp, url) {
	var errorMsg = json.RESULT_DESC;	
	
	if(json.RESULT_DETAIL_NO == "000901") {						// 상당신청 존재
		if(confirm(errorMsg.split("<br/>").join("\n"))) {
			callTel(json.DATA.TEL);
		}
	} else if(json.RESULT_DETAIL_NO == "000902" || json.RESULT_DETAIL_NO == "000903") {				// 신청내역 존재
		if(confirm(errorMsg.split("<br/>").join("\n"))) {
			if (isApp == true) {
				var params = {
						pluginId : 'webPostBridge',
						method : 'onExecute',
						params : {
							"url":"/loanRequestResult", 
							"data":{
								"title":"대출진행조회",
								"CUST_NO":json.DATA.CUST_NO, 
							    "CUST_NM":json.DATA.CUST_NM
							}
					    },
						callBack : function(isOK, json) {
						}
					};
				SDSFrameWork.plugin.execute(params);
				return;
			} else {
				appInvoke();				
			}
		}
	} else {
		alert(errorMsg.split("<br/>").join("\n"));
	}
	location.href = url;
}

function callTel(tel) {
	var frame_id = '__check_tel__'; 
	$iframe = $('#'+frame_id);

	if(!$iframe[0]) {
		$iframe = $('<iframe id="'+frame_id+'" />').hide().appendTo('body');
	}
	$iframe.attr('src', 'tel:' + tel);
}

function appInvoke() {
	uagentLow = navigator.userAgent.toLocaleLowerCase();
	if(uagentLow.search("chrome") > -1 && navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split("/")[1] > 25) {
		//location.href="Intent://#Intent;scheme=ssbmobile;end";
		location.href="Intent://#Intent;scheme=ssbmobile;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.shinhan.smartloan;end";
	} else {
		var frame_id = '__check_app__'; 
		$iframe = $('#'+frame_id);
		clickedAt=+new Date;
		
		if(!$iframe[0]) {
			$iframe = $('<iframe id="'+frame_id+'" />').hide().appendTo('body');
		}
		
		setTimeout(function(){
			if(+new Date - clickedAt < 2000) {
				if(isANDROID) {
					//alert("안드로이드 마켓으로 이동");
					$iframe.attr('src', 'Intent://#Intent;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.shinhan.smartloan;end');
				} else if(isIPHONE || isIPAD) {
					//alert("애플 앱스토어로 이동");
					$iframe.attr('src', '애플 앱스토어 링크');
				}
			}
		},500);
		$iframe.attr('src', 'ssbmobile://');
	}
};
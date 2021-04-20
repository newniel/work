//Ver.2.8.1
//Ver.2.8.1_2018071001 
    
    
    


	
	
	
	var nFilterSiteCode = "";
	var nFilterContextPath = "";
	var nFilterJSPath = "/nfilter/js/";
	var nFilterCSSPath = "/nfilter/css/";
	var nFilterCSSMobilePath = "/nfilter/css/";
	
	var nFilterIsResourceAutoLoad = false;
	var nFilterIsNoSecretKeypad = false;
	var nFilterFileEncoding = "";
	var nFilterDefaultLanguage = "en"; 
	var nFilterLanguage = "en"; 
	var nFilterImageRenderType = "m";
	var nFilterRandomIdLength = 10;
	var nFilterUserInputMin = 1;
	var nFilterUserInputMax = 50;
	var nFilterIsKeypadEncode = true;
	var nFilterIsEncryptImmediate = true;
	var nFilterSecElement="";
	
	
	
	
	var nFilterServiceNameKeypadManager = "NFilterKeypadManager";
	var nFilterServiceNameImageManager = "NFilterImageManager";
	var nFilterServiceNameCSManager = "NFilterCSManager";
	
	var nFilterRequestParamLanguage = "nfilter_lang";
	var nFilterRequestParamKeypadType = "nfilter_type";
	var nFilterRequestParamIsKeypadInit = "nfilter_is_init";
	var nFilterRequestParamIsMobile = "nfilter_is_mobile";
	var nFilterRequestParamEnableNoSecret = "nfilter_enable_nosecret";
	var nFilterRequestParamImageRandom = "nfilter_imgsec";
	var nFilterRequestParamSecretValue = "nfilter_encrypted";
	var nFilterRequestParamScreenSize = "nFilter_screenSize";
	var nFilterRequestParamScreenKeyPadSize ="nFilter_screenKeyPadSize";

	var nFilterResponseErrCdPrefix = "ErrCode:";
	var nFilterResponseErrMsgPrefix = "ErrMsg:";
	var nFilterResponseErrCallBackType = "";
	
	var nFilterKeypadMaskCharL = "0001";
	var nFilterKeypadMaskCharU = "0010";
	var nFilterKeypadMaskCharS = "0100";
	var nFilterKeypadMaskNum = "1000";
	var nFilterImageRenderTypeE = "e"; 

	var nFilterKeypadIdCharL = "nfilter_char_content_l";
	var nFilterKeypadIdCharU = "nfilter_char_content_u";
	var nFilterKeypadIdCharS = "nfilter_char_content_s";
	var nFilterKeypadIdNum = "nfilter_num_content";
	var nFilterKeypadIdPreviewChar = "nfilter_preview_char";
	var nFilterKeypadIdPreviewNum = "nfilter_preview_num";
	var nFilterKeypadIdTargetSuffix = "_nfilter_sec";
	var nFilterKeypadIdNoSecretSuffix = "_no_secret";
	var nFilterKeypadIdNoSecretPrefix = "no_secret_";
	var nFilterKeypadIdDummy = "dummy";
	

	
	
	
	var nFilterKeypadType = 0;
	var nFilterKeypadShowType = 0;
	var nFilterIsSInitialized = false;
	var nFilterLoadingStatusEnabled = false;
	var nFilterMain;
	var nFilterMainSub;
	
	var nFilterInputTargetElement;
	var nFilterInputDisplayElement;
	var nFilterInputNextTargetElementIdList;
	var nFilterInputNextDisplayElementIdList;
	var nFilterPositionElementId = "";
	var nFilterPositionCode = "";
		
	var nFilterPositionCheckElement;
	var nFilterTargetX = 0;
	var nFilterTargetY = 0;
	var nFilterPreScrollTop;
	var nFilterIsTargetChecked = false;
	var nFilterIsKeyShiftNow = false;
	var nFilterIsKeypadNowL = false;
	var nFilterIsKeypadNowU = false;
	var nFilterIsKeypadNowS = false;
	var nFilterIsInputShow = false;
	var nFilterIsMobileRequest = false;
	var nFilterEnableNoSecretKeypad = false;
	var nFilterInputAutoFocus = false;

	var tmpKeypadIdCharL = "";
	var tmpKeypadIdCharU = "";
	var tmpKeypadIdCharS = "";
	var tmpKeypadIdNum = "";
	
	var nFilterCSPublicKey = "";
	var nFilterCSReturnURL = "";
	var nFilterXmlHttp;

	
	
	var nFilterCallback = null;
	

	
	
	
	
	var nFilterMsgKeypadLoading = new Array();
	var nFilterMsgMinCheck = new Array();
	var nFilterMsgMaxCheck = new Array();

    
    
    

	function nFilterJSLoad(jsFilePath) {
		
		
		var script = document.createElement("script"); 
		script.type = "text/javascript"; 
		script.src = jsFilePath;
		
		script.charset = nFilterFileEncoding;
	   
		var ary = document.getElementsByTagName("script");
	   
		for(var i=0; i<ary.length; i++) {
			var vAry = ary[i].src.split('/');
			var cAry = jsFilePath.split('/');
			if(vAry[vAry.length-1] == cAry[cAry.length-1]) return false; 
		}
		document.getElementsByTagName("head")[0].appendChild(script);
		
		return true;
	}
	
	
	function nFilterJSAllLoad(jsRootPath) {
		
		
		
		
		
		return true;
	}
	
	function nFilterCSSLoad(cssFilePath) {
		
		
		
		if(!document.getElementById("nfilter_main")) {
			
			var css = document.createElement("link"); 
			css.rel = "stylesheet"; 
			css.href = cssFilePath; 
			css.type = "text/css";
		   
			var ary = document.getElementsByTagName("link");
		   
			for(var i=0; i<ary.length; i++) {
				var vAry = ary[i].href.split('/');
				var cAry = cssFilePath.split('/');
				if(vAry[vAry.length-1] == cAry[cAry.length-1]) return false; 
			}
			document.getElementsByTagName("head")[0].appendChild(css);
		}
		
		return true;
	}
	

    
    
    
	
	
	var nFilterOSInfo = getNFilterOSInfo();
	var nFilterTabletWidth = 0;
	var nFilterTOPGap = 0;
	var nFilterDeviceMode = "";
	
	
	
	function getNFilterBrowerInfo() {
		
	    var ua = navigator.userAgent;
	    if(ua.indexOf("Trident/5.0") != -1) return "IE9";
	    else if(ua.indexOf("MSIE 7") != -1) return "IE7";
	    else if(ua.indexOf("Trident/4.0") != -1) return "IE8";
	    else if(ua.indexOf("Trident/6.0") != -1) return "IE10";
	    else if(ua.indexOf("Trident/7.0") != -1) return "IE11";
	    else if(ua.indexOf("MSIE 8") != -1) return "IE8";
		else if(ua.indexOf("Trident") != -1) return "IE";
	    else if(ua.indexOf("Firefox") != -1) return "Firefox";
	    else if(ua.indexOf("Opera") != -1) return "Opera";
	   
	}
	
	
	function getNFilterOSInfo() {
	    var ua = navigator.userAgent;
	    if(ua.indexOf("NT 6.1") != -1) return "Windows7";	
	    else if(ua.indexOf("iPhone") != -1) return "iPhone";
	    else if(ua.indexOf("iPod") != -1) return "iPod";
	    else if(ua.indexOf("iPad") != -1 ) return "iPad";
	    else if(ua.indexOf("Android") != -1) return "Android";
	    else if(ua.indexOf("NT 6.0") != -1) return "Windows Vista/Server 2008";
	    else if(ua.indexOf("NT 5.2") != -1) return "Windows Server 2003";
	    else if(ua.indexOf("NT 5.1") != -1) return "Windows XP";
	    else if(ua.indexOf("NT 5.0") != -1) return "Windows 2000";
	    else if(ua.indexOf("NT") != -1) return "Windows NT";
	    else if(ua.indexOf("9x 4.90") != -1) return "Windows Me";
	    else if(ua.indexOf("Win16") != -1) return "Windows 3.x";
	    else if(ua.indexOf("Windows") != -1) return "Windows";
	    else if(ua.indexOf("Macintosh") != -1) return "Macintosh";
	    else if(ua.indexOf("BlackBerry") != -1) return "BlackBerry";
	    else if(ua.indexOf("Linux") != -1) return "Linux";
	    else return "";
	}
	

	if( nFilterOSInfo != "BlackBerry" && nFilterOSInfo != "iPhone" && nFilterOSInfo != 'iPod' ){
		var timeout;
		var lastTap = 0;
		document.ontouchstart=function( e ) {
			 var currentTime = new Date().getTime();
			    var tapLength = currentTime - lastTap;
			    clearTimeout(timeout);
			    if (tapLength < 500 && tapLength > 0) {
			        //event.preventDefault();
			    } else {
			        timeout = setTimeout(function() {
			            clearTimeout(timeout);
			        }, 500);
			    }
			    lastTap = currentTime;
		};
	}
	
	
	function nFilterDevice(mode) {
		nFilterDeviceMode = "_" + mode;
	}
	function nFilterTopHeight(height) {
		nFilterTOPGap = height;
	}
	function nFilterTabletSize(width) {
		nFilterTabletWidth = width;
	}
	

	
	
	

	function nFilterFindOffsetTop(obj) {
		var vTop = 0;
		
		if(obj.offsetParent) {
			do {
				vTop += obj.offsetTop;
				if(obj.scrollTop > 30) vTop -= obj.scrollTop;
			} while(obj = obj.offsetParent);
		}
		return vTop;
	}
	
	function nFilterFindOffsetLeft(obj) {
		var vLeft = 0;
		if(obj.offsetParent) {
			do {
				vLeft += obj.offsetLeft;
			} while(obj = obj.offsetParent);
		}
		return vLeft;
	}
	
	function nFilterPxSplit(str) {
		var spl = str.split('px');
		return Number(spl[0]);
	}

	function nFilterGetNowScroll() {
		var de = document.documentElement; 
		var b = document.body; 
		var now = {}; 

		now.X = document.all ? (!de.scrollLeft ? b.scrollLeft : de.scrollLeft) : (window.pageXOffset ? window.pageXOffset : window.scrollX); 
		now.Y = document.all ? (!de.scrollTop ? b.scrollTop : de.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY); 

		return now; 	
	}
	
	
	function nFilterMobileLandLocation() {
		if(nFilterDeviceMode == "_mobile") {
			nFTMPEditView.style.display = "block";
			nFTMPEditViewNUM.style.display = "block";
			parent.scrollTo(0, nFilterPxSplit(nFilterMain.style.top) - 25);
		}
	}
	
	var nFilter_LEFT_TOP = "LeftTop";
	var nFilter_LEFT_MIDDLE = "LeftMiddle";
	var nFilter_RIGHT_TOP = "RightTop";
	var nFilter_RIGHT_MIDDLE = "RightMiddle";
	var nFilter_RIGHT_BOTTOM = "RightBottom";

	
	var nFilterMainPositionLeftOrigin = 0;
	var nFilterMainPositionTopOrigin = 0;
	
	function nFilterSetLocation(obj) {




        if(nFilterTabletWidth != 0) {
        	var nFilterInnerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if(nFilterInnerWidth >= 800) {
                nFilterMain.style.width = nFilterTabletWidth + "px";


            }
        }

        if(parent.window.orientation == 90 || parent.window.orientation == -90) {

        } else if(nFilterOSInfo == "BlackBerry") {
            nFilterMobileLandLocation();
        }

        var inputLeft = nFilterFindOffsetLeft(obj) + nFilterPxSplit(obj.style.paddingLeft);
        var inputTop = nFilterFindOffsetTop(obj) + nFilterTOPGap;
        var gap = obj.offsetHeight;

        var nowScroll = nFilterGetNowScroll();





        if(nFilterPositionCode != "") {
        	 var nFilterWidth =  nFilterPxSplit(nFilterMainSub.style.width);
             var nFilterHeight = nFilterPxSplit( nFilterMainSub.style.height);
        	   if( nFilterIsMobileRequest ){

                   if( nFilterGetKeypadBinary(nFilterKeypadShowType) != "1000" || obj.getAttribute("mode") == "qwerty" ){
                       nFilterWidth = 320; nFilterHeight = 244;
                   }else{
                       nFilterWidth = 320; nFilterHeight = 148;
                   }

               }else{

                   if( nFilterGetKeypadBinary(nFilterKeypadShowType) != "1000" || obj.getAttribute("mode") == "qwerty" ){
                       nFilterWidth = 495; nFilterHeight = 198;
                   }else{
                       nFilterWidth = 285; nFilterHeight = 130;

                   }

               }

            var inputWidth = obj.offsetWidth + nFilterPxSplit(obj.style.paddingLeft);
            var inputHeight = nFilterPxSplit(obj.style.height);


            var location = nFilterPositionCode;


            if(location == nFilter_LEFT_TOP) {

                nFilterMain.style.left = (nFilterDeviceMode == "_mobile") ? "0px" : inputLeft + "px";
                if(getNFilterBrowerInfo() == "IE7"|| getNFilterBrowerInfo() == "IE8" || getNFilterBrowerInfo() == "IE11"|| getNFilterBrowerInfo() == "IE10" || getNFilterBrowerInfo() == "Firefox" || getNFilterBrowerInfo() == "Opera") {
					if(nFilterHeight == 130)
					{
						if(getNFilterBrowerInfo() == "Opera"){
						nFilterMain.style.top = ( inputTop - nFilterHeight ) +"px";
						}else {
							
							nFilterMain.style.top = ( inputTop - nFilterHeight ) +( 3) +"px";
						}
					}else {
						nFilterMain.style.top = ( inputTop - nFilterHeight ) +( 10) +"px";
					}

                } else if(getNFilterBrowerInfo() == "IE9"){
				 if(nFilterHeight == 130)
					{
						nFilterMain.style.top = ( inputTop - nFilterHeight ) +( 3) +"px";
					}else {
						nFilterMain.style.top = ( inputTop - nFilterHeight ) - 15+ "px";
						
					}
				}else{
					 if(nFilterHeight == 130)
					{
						nFilterMain.style.top = ( inputTop - nFilterHeight ) + nowScroll.Y+( 3) +"px";
					}
                }

                if( nFilterIsMobileRequest ){
                	if (getNFilterBrowerInfo() == "Firefox") {
                		nFilterMain.style.top = ( inputTop - nFilterHeight ) +"px";
					}else {
						
						nFilterMain.style.top =  ( nFilterFindOffsetTop(obj) - nFilterHeight )  + nowScroll.Y + "px";
					}
                    if( nFilterPxSplit( nFilterMain.style.top ) < 0 ) nFilterMain.style.top = "0px";
                    parent.scrollTo( 0,  nFilterPxSplit( nFilterMain.style.top )  );
                }

            } else if(location == nFilter_RIGHT_MIDDLE) {

                var rightBottomLeft = inputLeft + inputWidth/2 - nFilterWidth/2 - gap;
                if(rightBottomLeft < 0)
                    rightBottomLeft = 10;

                nFilterMain.style.left = rightBottomLeft + "px";
                if( getNFilterBrowerInfo() == "IE7" && getNFilterOSInfo() == "Windows XP" || getNFilterBrowerInfo() == "IE8" ||  getNFilterBrowerInfo() == "IE9" || getNFilterBrowerInfo() == "IE11"|| getNFilterBrowerInfo() == "IE10"||getNFilterBrowerInfo() == "Firefox" || getNFilterBrowerInfo() == "Opera") {
                    nFilterMain.style.top = inputTop + gap + "px";
                } else {
                    nFilterMain.style.top = inputTop + gap + nowScroll.Y + "px";
                }
            } else if(location == nFilter_RIGHT_TOP) {
                nFilterMain.style.left = inputLeft + inputWidth - nFilterWidth + "px";
                if(getNFilterBrowerInfo() == "IE" || getNFilterBrowerInfo() == "IE7" && getNFilterOSInfo() == "Windows XP" || getNFilterBrowerInfo() == "IE8" ||  getNFilterBrowerInfo() == "IE9" || getNFilterBrowerInfo() == "IE11"|| getNFilterBrowerInfo() == "IE10"||  getNFilterBrowerInfo() == "Firefox" || getNFilterBrowerInfo() == "Opera") {

                } else {
                    nFilterMain.style.top = inputTop - nFilterHeight + nowScroll.Y + "px";
                }
            } else if(location == nFilter_LEFT_MIDDLE) {
                nFilterMain.style.left = inputLeft - inputWidth/2 + gap + "px";
                if( getNFilterBrowerInfo() == "IE7" && getNFilterOSInfo() == "Windows XP" || getNFilterBrowerInfo() == "IE8" ||  getNFilterBrowerInfo() == "IE9" || getNFilterBrowerInfo() == "IE11"|| getNFilterBrowerInfo() == "IE10"||  getNFilterBrowerInfo() == "Firefox" || getNFilterBrowerInfo() == "Opera") {
                    nFilterMain.style.top = inputTop + gap + "px";
                } else {
                    nFilterMain.style.top = inputTop + gap + nowScroll.Y + "px";
                }
            } else if(location == nFilter_RIGHT_BOTTOM) {

                var rightBottomLeft = inputLeft + inputWidth - nFilterWidth;
                if(rightBottomLeft < 0)
                    rightBottomLeft = 10;

                nFilterMain.style.left = rightBottomLeft + "px";
                if( getNFilterBrowerInfo() == "IE7" && getNFilterOSInfo() == "Windows XP" || getNFilterBrowerInfo() == "IE8" ||  getNFilterBrowerInfo() == "IE9" || getNFilterBrowerInfo() == "IE11"|| getNFilterBrowerInfo() == "IE10"||  getNFilterBrowerInfo() == "Firefox" || getNFilterBrowerInfo() == "Opera") {
                    nFilterMain.style.top = inputTop + gap + "px";
                } else {
                    nFilterMain.style.top = inputTop + gap + nowScroll.Y + "px";
                }
            }
        } else if(obj.getAttribute("xlocation") && obj.getAttribute("ylocation")) {
            nFilterMain.style.left = parseInt(obj.getAttribute("xlocation"));
            nFilterMain.style.top = parseInt(obj.getAttribute("ylocation"));
        } else if(obj.getAttribute("xlocation")) {
            nFilterMain.style.left = parseInt(obj.getAttribute("xlocation"));
            nFilterMain.style.top = nFilterFindOffsetTop(obj) + 25 + "px";
        } else {
            var browserWidth = document.body.clientWidth;
            var keypadWidth = document.getElementById(nFilterMainSub.id).offsetWidth;

            if((inputLeft + keypadWidth) >  browserWidth) {
            	
                nFilterMain.style.left = inputLeft - ((inputLeft + keypadWidth) -  browserWidth) + "px";
                if(parseInt(nFilterMain.style.left,10) < 0) nFilterMain.style.left = "0px";
            } else {
                nFilterMain.style.left = (nFilterDeviceMode == "_mobile") ? "2px" : inputLeft+"px";
            }

            if( getNFilterBrowerInfo() == "IE7" || getNFilterBrowerInfo() == "IE8" ||  getNFilterBrowerInfo() == "IE9" || getNFilterBrowerInfo() == "IE11"|| getNFilterBrowerInfo() == "IE10"|| getNFilterBrowerInfo() == "Firefox"|| getNFilterBrowerInfo() == "Opera") {
            	nFilterMain.style.top = nFilterFindOffsetTop(obj) + gap + "px";
            } else {
                nFilterMain.style.top = nFilterFindOffsetTop(obj) + gap + nowScroll.Y + "px";
            }


            if( nFilterIsMobileRequest ){

                if( nFilterGetKeypadBinary(nFilterKeypadShowType) != "1000" || obj.getAttribute("mode") == "qwerty" ){
                    nFilterWidth = 320; nFilterHeight = 244;
                }else{
                    nFilterWidth = 320; nFilterHeight = 148;
                }

            }else{

                if( nFilterGetKeypadBinary(nFilterKeypadShowType) != "1000" || obj.getAttribute("mode") == "qwerty" ){
                    nFilterWidth = 495; nFilterHeight = 198;
                }else{
                    nFilterWidth = 285; nFilterHeight = 130;

                }

            }
            var nFilterInnerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            if( nFilterIsMobileRequest ){
            	if (getNFilterBrowerInfo() == "Firefox") {
					
            		if ( nowScroll.Y != 0 && nFilterFindOffsetTop(obj)+ nFilterHeight >=  nowScroll.Y+nFilterInnerHeight) {
                      		 setNFilterPositionCode(nFilter_LEFT_TOP);
                      		 nFilterSetLocation(obj);
                      		 return ;
          				}else {
          					nFilterMain.style.top = nFilterFindOffsetTop(obj) + gap + "px";
						}
            		
				}else {
					nFilterMain.style.top = nFilterFindOffsetTop(obj) + gap + nowScroll.Y + "px";
				}
				if( nFilterIsMobileRequest ) {
    				if (nfilterscrollto) {
               		 parent.scrollTo( 0,  nFilterPxSplit( nFilterMain.style.top ) - 25  );
    				}
    			}
				
            	
             }else {
            	 if((nFilterInnerHeight - nFilterPxSplit(nFilterMain.style.top)) <=  nFilterHeight ){
            		 setNFilterPositionCode(nFilter_LEFT_TOP);
            		 nFilterSetLocation(obj);
            		 return ;
            	 }
				
			}
           
        }
        if( nFilterIsMobileRequest ){
        	var nFilterInnerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            nFilterMain.style.left = ( nFilterInnerWidth - nFilterPxSplit( nFilterMain.style.width ) ) /2 + "px";
          nFilterInnerWidth=0;
        
        }

        if( nFilterCSReturnURL != "" ){
            nFilterMain.style.left = "0px";
            nFilterMain.style.top = "0px";
        }

        nFilterPositionCode = "";
    }
	
var nfilterscrollto = true;
	function nFilterScrollto(scrollto) {
		nfilterscrollto = scrollto;
		
	}
	function nFilterSetPosition(emementId) {
		
		var nFilterPositionTargetObj = document.getElementById(emementId);
		nFilterPositionTargetObj.setAttribute("nfilter", "on");
		
		
		
		if(!nFilterMain) return false;
		
		
		nFilterInputDisplayElement.setAttribute("disabled", "disabled");
	
		var height = Math.max(document.body["scrollHeight"], document.documentElement["scrollHeight"], document.body["offsetHeight"], document.documentElement["offsetHeight"]);
		document.getElementById("nfilter_bg").style.display = 'block';
		document.getElementById("nfilter_bg").style.height = height +"px";
		
		
		
		nFilterMain.style.display = 'block';

		
		if(nFilterIsNoSecretKeypad == true) {
			tmpKeypadIdCharL = nFilterKeypadIdCharL + nFilterKeypadIdNoSecretSuffix;
			tmpKeypadIdCharU = nFilterKeypadIdCharU + nFilterKeypadIdNoSecretSuffix;
			tmpKeypadIdCharS = nFilterKeypadIdCharS + nFilterKeypadIdNoSecretSuffix;
			tmpKeypadIdNum = nFilterKeypadIdNum + nFilterKeypadIdNoSecretSuffix;
		} else {
			tmpKeypadIdCharL = nFilterKeypadIdCharL;
			tmpKeypadIdCharU = nFilterKeypadIdCharU;
			tmpKeypadIdCharS = nFilterKeypadIdCharS;
			tmpKeypadIdNum = nFilterKeypadIdNum;
		}

		if(nFilterGetKeypadBinary(nFilterKeypadShowType) == "1000") {
			document.getElementById(tmpKeypadIdNum).style.display = "block";
			nFilterMainSub = document.getElementById("nfilter_num");
		} else {
			if(nFilterGetKeypadBinary(nFilterKeypadShowType) == "0001") {
				document.getElementById(tmpKeypadIdCharL).style.display = "block";
			} else if(nFilterGetKeypadBinary(nFilterKeypadShowType) == "0010") {
				document.getElementById(tmpKeypadIdCharU).style.display = "block";
			} else if(nFilterGetKeypadBinary(nFilterKeypadShowType) == "0100") {
				document.getElementById(tmpKeypadIdCharS).style.display = "block";
			} else if(nFilterGetKeypadBinary(nFilterKeypadShowType) == "0011") {
				document.getElementById(tmpKeypadIdCharL).style.display = "block";
				document.getElementById(tmpKeypadIdCharU).style.display = "none";
			} else if(nFilterGetKeypadBinary(nFilterKeypadShowType) == "0111") {
				document.getElementById(tmpKeypadIdCharL).style.display = "block";
				document.getElementById(tmpKeypadIdCharU).style.display = "none";
				document.getElementById(tmpKeypadIdCharS).style.display = "none";
			}
			nFilterMainSub = document.getElementById("nfilter_char");
		}

		
		nFilterMainSub.style.display = "block";
		

		nFilterSetLocation(nFilterPositionTargetObj);
		if ( !nFilterIsMobileRequest) {

			if(getNFilterBrowerInfo() == "IE" || getNFilterBrowerInfo() == "IE7" 
				|| getNFilterBrowerInfo() == "Firefox" || getNFilterBrowerInfo() == "Opera") {
				var preScrollTop = document.documentElement.scrollTop;
				var currentHeight = document.documentElement.clientHeight;
			} else {
				preScrollTop = document.body.scrollTop;
				currentHeight = document.body.clientHeight;
			}
			
		
		
		var mainTop = nFilterPxSplit(nFilterMain.style.top);
		var mainHeight = nFilterMain.style.height;
		var bodyHeight = parseInt(mainTop, 10) + parseInt(mainHeight, 10) - preScrollTop;
		
		if(currentHeight <= bodyHeight) {
			if(height < (bodyHeight + preScrollTop)) {
				height = bodyHeight + preScrollTop;
			}
			document.getElementById("nfilter_bg").style.height = height + "px";
			
			if(getNFilterBrowerInfo() == "IE" || getNFilterBrowerInfo() == "IE7" 
				||getNFilterBrowerInfo() == "Firefox" || getNFilterBrowerInfo() == "Opera"){
				document.documentElement.scrollTop = parseInt(mainHeight,10) - (currentHeight - parseInt(mainTop,10));
			}else{
				document.body.scrollTop = parseInt(mainHeight,10) - (currentHeight - parseInt(mainTop,10));
			}
		}
		}
		
		var browserWidth = document.body.offsetWidth;
		var keypadWidth = document.getElementById(nFilterMainSub.id).offsetWidth;
		
		if(browserWidth < keypadWidth) {
			
			
			document.getElementById("nfilter_bg").style.width = "100%";
		} else {
			document.getElementById("nfilter_bg").style.width = "100%";
		}
		
		return true;
	}
	
	function setWindowScrollTop() {
		if(getNFilterBrowerInfo() == "IE" || getNFilterBrowerInfo() == "IE7" 
			|| getNFilterBrowerInfo() == "Firefox" || getNFilterBrowerInfo() == "Opera") {
			
			nFilterPreScrollTop = document.documentElement.scrollTop;
		} else {
			nFilterPreScrollTop = document.body.scrollTop;
		}
		
		var mainTop = nFilterMain.style.top;
		var mainHeight = nFilterMain.style.height;
		var height = Math.max(document.body["scrollHeight"], document.documentElement["scrollHeight"], document.body["offsetHeight"] , document.documentElement["offsetHeight"]);

		var bodyHeight = parseInt(mainTop,10) + parseInt(mainHeight,10) - nFilterPreScrollTop;
		var currentHeight = document.documentElement.clientHeight;
		
		if(currentHeight <= bodyHeight) {
			if(height < (bodyHeight + nFilterPreScrollTop)) {
				height = bodyHeight + nFilterPreScrollTop;
			}
			document.getElementById('nfilter_bg').style.height = height + "px";

			if(getNFilterBrowerInfo() == "IE" || getNFilterBrowerInfo() == "IE7" 
				|| getNFilterBrowerInfo() == "Firefox" || getNFilterBrowerInfo() == "Opera") {
				
				
				document.documentElement.scrollTop = parseInt(mainHeight,10) - (currentHeight - parseInt(mainTop,10));
			} else {
				document.body.scrollTop = parseInt(mainHeight,10) - (currentHeight - parseInt(mainTop,10));
			}
		}
		var browserWidth = document.body.offsetWidth;
		var keypadWidth = document.getElementById(nFilterMainSub.id).offsetWidth;
		
		if(browserWidth < keypadWidth) {
			
			document.getElementById('nfilter_bg').style.width = "100%";
		} else {
			document.getElementById('nfilter_bg').style.width = "100%";
		}
	}
	
	function nFilterSetImageVisible(id, visible) {
	    var img = document.getElementById(id);
	    img.style.visibility = (visible ? 'visible' : 'hidden');
	}
	
	parent.onorientationchange = function() {
		onorientationchangeStyle();
	};
 
	var OnorientationchangeStyle = false;
	
	function onorientationchangeStyle(){
	
		if (OnorientationchangeStyle == true) {
			setTimeout(function() {
				nFilterSetPosition( nFilterInputDisplayElement.id );
			}, 600);
			
		}	
		
	}		

    
    
    

	
	function nFilterInputEncrypt(inputValue) {
		if( inputValue.length == 256 || inputValue.length == 512 ){
			return inputValue;
		}
		
		var rsa = new nFilterRSAKey();
		
		if( isBCP & !isNFilterExE2E() ){
			rsa.setPublic(document.getElementById('nfilter_bypass_modulus').value, document.getElementById('nfilter_bypass_exponent').value);
		}else{
			rsa.setPublic(document.getElementById("nfilter_modulus").value, document.getElementById("nfilter_exponent").value);
		}
		
		var encryptedValue = "";
		var blockSize = 100;
		
		
		if(inputValue.length > blockSize) {
			
			var length = Number(inputValue.length/blockSize).toFixed(2);
			
			var _tmp_password = "";
			
			for(var i=0; i<length; i++) {
				var _substring_password = inputValue.substring((i*blockSize), (i+1)*blockSize);
				_tmp_password += rsa.encrypt(_substring_password);	
			}
			encryptedValue = _tmp_password;
		} else {
			encryptedValue = rsa.encrypt(inputValue);
		}
		
		return encryptedValue;
	}
	
    
    
    

	function nFilterClearInput() {
		if(nFilterInputTargetElement != undefined && nFilterInputTargetElement != null) {
			nFilterInputTargetElement.value = "";
			nFilterSecElement = "";
		}
		if(nFilterInputDisplayElement != undefined && nFilterInputDisplayElement != null) {
			nFilterInputDisplayElement.value = "";
		}
		
		if (nFilterOSInfo == "IE7" ||nFilterOSInfo == "IE8") {
			
			if(nFilterIsElementExist("nfilter_tmp_editview")) {
				document.getElementById("nfilter_tmp_editview").innerHTML = "&nbsp;";
			}
			if(nFilterIsElementExist("nfilter_tmp_editview_num")) {
				document.getElementById("nfilter_tmp_editview_num").innerHTML = "&nbsp;";
			}
			
		
		}else {
			if(nFilterIsElementExist("nfilter_tmp_editview")) {
				document.getElementById("nfilter_tmp_editview").innerHTML = "";
			}
			if(nFilterIsElementExist("nfilter_tmp_editview_num")) {
				document.getElementById("nfilter_tmp_editview_num").innerHTML = "";
			}	
		}
		
	}
	
	function nFilterClearNextInputs(nFilterInputNextTargetElementIdList, nFilterInputNextDisplayElementIdList) {
		var nextTargetFields = nFilterInputNextTargetElementIdList.split("|");
		var nextDisplayFields = nFilterInputNextDisplayElementIdList.split("|");

        for(var i=0; i<nextTargetFields.length; i++) {
        	document.getElementById(nextTargetFields[i]).value = "";
        	document.getElementById(nextDisplayFields[i]).value = "";
		}
	}
	
	function nFilterMinMaxCheck(inputKeyId) {
		var minMaxCheckElement = document.getElementById(inputKeyId);
		var maxlenth = 0;
		var minlength = 0;
		
		try {
			maxlenth = window[inputKeyId].getMaxLength();
			minlength = window[inputKeyId].getMinLength();
		} catch(e) {
			maxlenth = minMaxCheckElement.maxlength;
			minlength = minMaxCheckElement.minlength;

			if(maxlenth == null && maxlenth == undefined) {
				maxlenth = minMaxCheckElement.getAttribute('maxlength');
			}
			if(minlength == null && minlength == undefined) {
				
				minlength = minMaxCheckElement.getAttribute('minlength');
			}
		}
		

		
		if(maxlenth == null || maxlenth == undefined || maxlenth == 0) {
			maxlenth = nFilterUserInputMax;
		}
		if(minlength == null || minlength == undefined || minlength == 0) {
			minlength = nFilterUserInputMin;
		}
		

	    
		
	    
		
		var checkElement = minMaxCheckElement.value;
		
		if( isMoneyFormatting() ){
			checkElement =checkElement.replace(/,/g, "");
		}
		
		
		
		if(Number(maxlenth) < Number( checkElement.length)) {
			if(typeof nFilterExtMessageHandler == "function") {
				 nFilterExtMessageHandler(nFilterMsgMaxCheck[nFilterLanguage].replace("#1", maxlenth));
			}

			
			return false;
		}

		
		if(Number(minlength) > Number( checkElement.length ) ) { 
			if(typeof nFilterExtMessageHandler == "function") {
				if (nFilterIsMobileRequest) {
					
					document.getElementById("nfilter_touch_mask").style.display="none";
				}
				nFilterExtMessageHandler(nFilterMsgMinCheck[nFilterLanguage].replace("#1", minlength));
			}

			
			return false; 
		}
		
		return true;
	}

	function nFilterGetMaxLength(inputKeyId) {
		var minMaxCheckElement = document.getElementById(inputKeyId);
		
		var maxlenth = 0;
		
		try {
			maxlenth = window[inputKeyId].getMaxLength();
			
		} catch(e) {
			maxlenth = minMaxCheckElement.maxlength;
			

			if(maxlenth == null || maxlenth == undefined) {
				maxlenth = minMaxCheckElement.getAttribute('maxlength'); 
				
			}
		}
		
		if(maxlenth == null || maxlenth == undefined || maxlenth == 0) {
			maxlenth = nFilterUserInputMax;
			
		}
		

		return maxlenth;
	}

	function nFilterIsValidXSSCheck(targetElementValue) {
		
		

		if(targetElementValue == "") {
			return true;
		}
		
		
		if(/[^a-zA-Z0-9]/.test(targetElementValue)) {
			return false;
		} else {
			return true;
		}
	}

	function nFilterCreateElement(createElementId, siblingElementId) {
		if(!nFilterIsElementExist(createElementId)) {
			
			
			
			var inputTargetElement = document.createElement("input");
			inputTargetElement.setAttribute("type", "hidden");
			inputTargetElement.setAttribute("id", createElementId);
			inputTargetElement.setAttribute("name", createElementId);

			var displayElement = document.getElementById(siblingElementId);
			try{
				displayElement.parentNode.insertBefore(inputTargetElement, displayElement.nextSibling);
				return true;
			}catch(e){
				return false;
			}

		}
	}
	
	
	function nFilterClose() {
		OnorientationchangeStyle = false;
		if( nFilterInputDisplayElement == undefined || nFilterInputDisplayElement == null) return false;
		
		if( nFilterInputDisplayElement != undefined ) nFilterInputDisplayElement.removeAttribute( "disabled" );
		
		if(nFilterIsElementExist("nfilter_char")) {
			document.getElementById("nfilter_char").style.display = "none";
		}
		if(nFilterIsElementExist("nfilter_num")) {
			document.getElementById("nfilter_num").style.display = "none";
		}
		nFilterSetDefaultKeypadType();
		
		document.getElementById("nfilter_document").style.display = "none";

		
		try { 
			
			if( nFilterInputDisplayElement.getAttribute("directkey") == "on" ){
				nFilterInputDisplayElement.focus(); 
			}
			
		} catch (e) {}

		scCardNumDelete();
		
		if(typeof nFilterCallback == "function") {
			nFilterCallback( "close" );
		}
		
		
		if(nFilterInputTargetElement != undefined && nFilterInputTargetElement.value.length > 0) {
			nFilterInputTargetElement.value = "";
			nFilterSecElement="";
		} else {
			return false;
		}

		
		if(nFilterInputDisplayElement != undefined && nFilterInputDisplayElement.value.length > 0) {
			nFilterInputDisplayElement.value = "";

			
			if (nFilterOSInfo == "IE7" || nFilterOSInfo == "IE8") {
				if(nFilterIsElementExist("nfilter_tmp_editview")) {
					document.getElementById("nfilter_tmp_editview").innerHTML = "&nbsp;";
				}
				if(nFilterIsElementExist("nfilter_tmp_editview_num")) {
					document.getElementById("nfilter_tmp_editview_num").innerHTML = "&nbsp;";
				}
			}else {
				
				if(nFilterIsElementExist("nfilter_tmp_editview")) {
					document.getElementById("nfilter_tmp_editview").innerHTML = "";
				}
				if(nFilterIsElementExist("nfilter_tmp_editview_num")) {
					document.getElementById("nfilter_tmp_editview_num").innerHTML = "";
				}
			}
			
			
		} else {
			return false;
		}
		
		
		if(nFilterInputDisplayElement != undefined && nFilterIsInputShow) {
			if(typeof nFilterExtE2EImpl == "function") {
				
				nFilterExtE2EImpl(nFilterInputDisplayElement.id, "delete", "");
			}
		}
		
	}
	
	function nFilterClose2( inputKeyId ){
		OnorientationchangeStyle = false;
		
		if(nFilterIsElementExist("nfilter_change_eng")) {
			document.getElementById("nfilter_change_eng").style.display = "none";
		}
		if(nFilterIsElementExist("nfilter_change_special")) {
			document.getElementById("nfilter_change_special").style.display = "none";
		}
		
		if(inputKeyId == "nfilter_close_num" || inputKeyId == "nfilter_enter_num"
			|| inputKeyId == "nfilter_close_num_mobile" || inputKeyId == "nfilter_enter_num_mobile") {
			if(nFilterIsElementExist(tmpKeypadIdNum)) {
				document.getElementById(tmpKeypadIdNum).style.display = "none";
				document.getElementById("nfilter_num_header").style.display = "none";
				document.getElementById("nfilter_num").style.display = "none";
			}
		} else {
			if(nFilterIsElementExist(tmpKeypadIdCharL)) {
				document.getElementById(tmpKeypadIdCharL).style.display = "none";
			}
			if(nFilterIsElementExist(tmpKeypadIdCharU)) {
				document.getElementById(tmpKeypadIdCharU).style.display = "none";
			}
			if(nFilterIsElementExist(tmpKeypadIdCharS)) {
				document.getElementById(tmpKeypadIdCharS).style.display = "none";
			}
			document.getElementById("nfilter_char").style.display = "none";
		}
		
		
		setTimeout(function() {
			 document.getElementById("nfilter_document").style.display = "none";
	        }, 300);
		 

		try {  if( nFilterInputDisplayElement.getAttribute("directkey") == "on" ){ nFilterInputDisplayElement.focus(); } } catch (e) {}
		nFilterInputDisplayElement.removeAttribute( "disabled" );
		
	}

	function nFilterDataPadLeft(inputData, padData, resultLength) {
		if(inputData == "" || inputData.length >= resultLength) {
			return inputData;
		}

		var padDataLength = resultLength - inputData.length;
		
		for(var i=0; i<padDataLength; i++) {
			inputData = padData + inputData;
		}
		
		return inputData;
	}
	
    
    
    
	
	function nFilterIsElementExist(elementName) {
	
		
		if(!document.getElementById(elementName)){
			return false;
		} else {
			return true;
		}
	}
	
	function nFilterSetDefaultKeypadType() {
		if(nFilterIsMaskMatch(nFilterKeypadType, "0001")) {
			nFilterIsKeypadNowL = true;
			nFilterIsKeypadNowU = false;
			nFilterIsKeypadNowS = false;
		} else if(nFilterIsMaskMatch(nFilterKeypadType, "0010")) {
			nFilterIsKeypadNowL = false;
			nFilterIsKeypadNowU = true;
			nFilterIsKeypadNowS = false;
		} else if(nFilterIsMaskMatch(nFilterKeypadType, "0100")) {
			nFilterIsKeypadNowL = false;
			nFilterIsKeypadNowU = false;
			nFilterIsKeypadNowS = true;
		} else if(nFilterIsMaskMatch(nFilterKeypadType, "1000")) {
			nFilterIsKeypadNowL = false;
			nFilterIsKeypadNowU = false;
			nFilterIsKeypadNowS = false;
		}
	}


    
    
    

	function nFilterAsyncRequest(url, param, cfunc) {
		if(window.XMLHttpRequest) {
			nFilterXmlHttp = new XMLHttpRequest();
		} else {
			nFilterXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		nFilterXmlHttp.onreadystatechange=cfunc;
		nFilterXmlHttp.open("POST", url, true);
		
		nFilterXmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		nFilterXmlHttp.send(param);
	}
	

    
    
    


	
	
	

	
	function nFilterGetKeypadBinary(keypadType) {
		var keypadBinary = keypadType.toString(2);
		
		keypadBinary = "0000".substr(0, (4 - keypadBinary.length)) + keypadBinary;
		
		return keypadBinary;
	}

	
	function nFilterGetDefaultKeypadId(keypadType) {
		var keypadId = "";
		
		if(nFilterIsMaskMatch(keypadType, "0001")){ 
			return keypadId = nFilterKeypadIdCharL;
		} else if(nFilterIsMaskMatch(keypadType, "0010")) {
			return keypadId = nFilterKeypadIdCharU;
		} else if(nFilterIsMaskMatch(keypadType, "0100")) {
			return keypadId = nFilterKeypadIdCharS;
		} else if(nFilterIsMaskMatch(keypadType, "1000")) {
			return keypadId = nFilterKeypadIdNum;
		}
		
		return keypadId;
	}

	
	
	function nFilterIsMaskMatch(keypadTypeInt, maskString) {
		var maskInt = parseInt(maskString, 2);
		
		var isMatched = false;
		
		var masked = keypadTypeInt & maskInt;
		
		while (maskInt % 2 == 0) {
			maskInt = maskInt >>> 1;
			masked = masked >>> 1;
		}
		
		if(masked > 0) {
			isMatched = true;
		}
		
	    return isMatched;
	}


	
	
	function nFilterIsSupportType(keypadTypeInt, keypadShowTypeBinary) {
		var isSupport = true;
		var keypadTypeBinary = keypadTypeInt.toString(2);
		
		keypadTypeBinary = nFilterDataPadLeft(keypadTypeBinary, "0", 4);

		

		for(var i=0; i<keypadShowTypeBinary.length; i++) {
			if(keypadShowTypeBinary.charAt(i) == "1" && keypadTypeBinary.charAt(i) == "0") {
				isSupport = false;
			}
		}
		
		return isSupport;
	}
	

	function nFilterParseErrorCode(errorData) {
		var errCode = "";
		

		
		if(errorData.indexOf(nFilterResponseErrMsgPrefix) > -1){
			errCode = errorData.substr(nFilterResponseErrCdPrefix.length, 3);
		}
		return errCode;
	}

	function nFilterParseErrorMessage(errorData) {
		var errMssage = "";

		if(errorData.indexOf(nFilterResponseErrMsgPrefix) > -1){
			errMssage = errorData.substr(errorData.indexOf(nFilterResponseErrMsgPrefix) + nFilterResponseErrMsgPrefix.length);
		}
		return errMssage;
	}
	
	
	
	

    
    
    
	
	
	function nFilterKeypadInitMobile(requestKeypadType, isKeypadInit, isDisplay, targetElementId, displayElementId, responseElementId) {
		nFilterIsMobileRequest = true;
		
		nFilterKeypadInit(requestKeypadType, isKeypadInit, isDisplay, targetElementId, displayElementId, responseElementId);
	}
	

	function createNFilterDocument(){
		if(!document.getElementById("nfilter_document")) {
			var nFilterDocumentElement = document.createElement("div");
			nFilterDocumentElement.setAttribute("id", "nfilter_document");
			nFilterDocumentElement.setAttribute("style", "display: none");
			
			nFilterDocumentElement.setAttribute("oncontextmenu", "return false");
			nFilterDocumentElement.setAttribute("ondragstart", "return false");
			nFilterDocumentElement.setAttribute("onselectstart", "return false");
				 
			document.body.appendChild(nFilterDocumentElement);
			
			return nFilterDocumentElement; 
		}else{
			return document.getElementById("nfilter_document");
		}
	}
	
	function nFilterInitBefore( requestKeypadType, targetElementId, displayElementId  ){
		
		nFilterIsNoSecretKeypad = false;
		tmpKeypadIdCharL = nFilterKeypadIdCharL;
		tmpKeypadIdCharU = nFilterKeypadIdCharU;
		tmpKeypadIdCharS = nFilterKeypadIdCharS;
		tmpKeypadIdNum = nFilterKeypadIdNum;
		

		
		
	    
		if(nFilterIsResourceAutoLoad) {
			var jsLoad = nFilterJSAllLoad(nFilterJSPath);
			
			if(nFilterIsMobileRequest) {
				var cssLoad2 = nFilterCSSLoad(nFilterCSSPath + "nFilter-mobile.css");
			} else {
				var cssLoad1 = nFilterCSSLoad(nFilterCSSPath + "nFilter.css");
			}
		}

		
		
	    
		createNFilterDocument();

		if(targetElementId == undefined || targetElementId == "") {
			
			targetElementId = displayElementId + nFilterKeypadIdTargetSuffix;
		}
		
		if(!nFilterIsElementExist(targetElementId)) {
			if( !nFilterCreateElement(targetElementId, displayElementId) ) return;
		}
		
		
    	
		
	    
		window.defaultStatus = "";
		
		nFilterInputTargetElement = document.getElementById(targetElementId);
		nFilterInputDisplayElement = document.getElementById(displayElementId);

		
		
		
		nFilterInputTargetElement.value = "";
		nFilterInputDisplayElement.value = "";
		if (nFilterOSInfo == "IE7" || nFilterOSInfo == "IE8") {
			if(nFilterIsElementExist("nfilter_tmp_editview")) {
				document.getElementById("nfilter_tmp_editview").innerHTML = "&nbsp;";
			}
			if(nFilterIsElementExist("nfilter_tmp_editview_num")) {
				document.getElementById("nfilter_tmp_editview_num").innerHTML = "&nbsp;";
			}	
		}else {
			
			if(nFilterIsElementExist("nfilter_tmp_editview")) {
				document.getElementById("nfilter_tmp_editview").innerHTML = "";
			}
			if(nFilterIsElementExist("nfilter_tmp_editview_num")) {
				document.getElementById("nfilter_tmp_editview_num").innerHTML = "";
			}	
		}
		
		nFilterIsSInitialized = false;
		nFilterIsInputShow = false;
		
		nFilterInputDisplayElement.setAttribute("location", ""); 
		nFilterKeypadType = requestKeypadType;
	}

	var nFilterScreenSize = 320;
    var nFilterScreenKeyPadSize = nFilterScreenSize-10;
	function setNFilterScreenSize(screenSizeWidth,screenSizeHeight) {
		
		
		var screenSize = 320;
		if (screenSizeWidth >= screenSizeHeight) {
			screenSize = screenSizeHeight;
		}else {
			screenSize = screenSizeWidth;
		}
		
		if (screenSize >=400 ) {
			nFilterScreenSize = 400;
			InputSizewidth = 220;
		}else if (screenSize >=360) {
			
			nFilterScreenSize =360;
			InputSizewidth = 200;
		}else {
			nFilterScreenSize = "null";
		}
		
		if (nFilterScreenSize == "null") {
			
			nFilterScreenKeyPadSize = 310;
		}else{
			nFilterScreenKeyPadSize = (nFilterScreenSize-10);
		}
	}
	
	function nFilterKeypadInit(requestKeypadType, isKeypadInit, isDisplay, targetElementId, displayElementId, responseElementId) {

		nFilterInitBefore( requestKeypadType, targetElementId, displayElementId );
		
		
		
    	
		
	    
		
		var requestParam = "";
		nFilterLanguage = (nFilterLanguage != null && nFilterLanguage != undefined && nFilterLanguage != "")? nFilterLanguage : nFilterDefaultLanguage;
		
		if(nFilterIsMobileRequest) {
			requestParam = nFilterRequestParamLanguage + "=" + nFilterLanguage
							+ "&" + nFilterRequestParamKeypadType + "=" + nFilterKeypadType
							+ "&" + nFilterRequestParamIsKeypadInit + "=" + isKeypadInit
							+ "&" + nFilterRequestParamIsMobile + "=" + nFilterIsMobileRequest;
		requestParam += "&"+nFilterRequestParamScreenSize +"="+ nFilterScreenSize 
							+"&"+nFilterRequestParamScreenKeyPadSize +"="+ nFilterScreenKeyPadSize;
			
		} else {
			requestParam = nFilterRequestParamLanguage + "=" + nFilterLanguage
							+ "&" + nFilterRequestParamKeypadType + "=" + nFilterKeypadType
							+ "&" + nFilterRequestParamIsKeypadInit + "=" + isKeypadInit;
		}

		if(nFilterEnableNoSecretKeypad) {
			requestParam += "&" + nFilterRequestParamEnableNoSecret + "=" + nFilterEnableNoSecretKeypad;
		}
		
		

		nFilterAsyncRequest(nFilterContextPath + "/"+nFilterServiceNameKeypadManager, requestParam, function() {
			if(nFilterXmlHttp.readyState==1 || nFilterXmlHttp.readySate==2 || nFilterXmlHttp.readyState==3) {
				if(nFilterLoadingStatusEnabled) {
					if(!document.getElementById("nfilter_loading")) {
						
						
						document.getElementById("nfilter_document").innerHTML += "<div id='nfilter_loading' " +
					  			"style='position:absolute;z-index:1000;" +
					  			"padding: 7.5px 15px;font-size: 15px;" +
					  			"top:50%;left:50%;margin: -50px 0 0 -70px;background: #ffffff;" +
					  			"border: 1px solid #8f8f8f;" +
					  			"background: #949494;" +
					  			"background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#ffffff));" +
					  			"background: -moz-linear-gradient(top, #ffffff, #ffffff);" +
					  			"-webkit-border-radius: 8px;-moz-border-radius: 8px;border-radius: 8px;" +
					  			"-webkit-box-shadow: rgba(0,0,0,1) 0 1px 0;-moz-box-shadow: rgba(0,0,0,1) 0 1px 0;box-shadow: rgba(0,0,0,1) 0 1px 0;'>" + nFilterMsgKeypadLoading[nFilterLanguage] + "</div>";
					} else {
						
				  		document.getElementById("nfilter_loading").style.display = "block";
					}
				}
			} else if(nFilterXmlHttp.readyState==4 && nFilterXmlHttp.status==200) {
				
				
				if(nFilterLoadingStatusEnabled) {
					
					document.getElementById("nfilter_loading").style.display = "none";
					nFilterLoadingStatusEnabled  = false; 
				}
				
				if(nFilterResponseErrCdPrefix == nFilterXmlHttp.responseText.substr(0, 8)) {
					
					

					if(responseElementId != null && responseElementId != "") {
						if(typeof nFilterExtExceptionCallBack == "function") {
							nFilterExtExceptionCallBack(nFilterXmlHttp.responseText, responseElementId);
						}
					} else {
						
						
						
						if(typeof nFilterExtExceptionCallBack == "function") {
							nFilterExtExceptionCallBack(nFilterXmlHttp.responseText, "");
						}
					}
				} else {
					
					document.getElementById("nfilter_document").innerHTML = nFilterXmlHttp.responseText;
   				    nFilterInitAfter( isDisplay,targetElementId, displayElementId);
				}
		    }
		});
	}
	
	function nFilterInitAfter( isDisplay, targetElementId, displayElementId ){

		
		if(nFilterIsElementExist("nfilter_content_target")) {
			if(!nFilterIsTargetChecked) {
				nFilterPositionCheckElement = document.getElementById("nfilter_content_target");
				
				nFilterTargetX = nFilterPositionCheckElement.style.left;
				nFilterTargetY = nFilterPositionCheckElement.style.top;
				nFilterIsTargetChecked = true;
				nFilterPositionCheckElement.style.display = "none";
				
			}
		}
		
		
		if(nFilterIsElementExist(nFilterKeypadIdCharL)) {
			if(nFilterIsKeypadEncode == true) {
				document.getElementById(nFilterKeypadIdCharL).innerHTML = nFilterDecode64(document.getElementById(nFilterKeypadIdCharL).innerHTML);
			}
			document.getElementById(nFilterKeypadIdCharL).style.display = "none";
		}
		if(nFilterIsElementExist(nFilterKeypadIdCharU)) {
			if(nFilterIsKeypadEncode == true) {
				document.getElementById(nFilterKeypadIdCharU).innerHTML = nFilterDecode64(document.getElementById(nFilterKeypadIdCharU).innerHTML);
			}
			document.getElementById(nFilterKeypadIdCharU).style.display = "none";
		}
		if(nFilterIsElementExist(nFilterKeypadIdCharS)) {
			if(nFilterIsKeypadEncode == true) {
				document.getElementById(nFilterKeypadIdCharS).innerHTML = nFilterDecode64(document.getElementById(nFilterKeypadIdCharS).innerHTML);
			}
			document.getElementById(nFilterKeypadIdCharS).style.display = "none";
		}
		if(nFilterIsElementExist(nFilterKeypadIdNum)) {
			if(nFilterIsKeypadEncode == true) {
				document.getElementById(nFilterKeypadIdNum).innerHTML = nFilterDecode64(document.getElementById(nFilterKeypadIdNum).innerHTML);
			}
			document.getElementById(nFilterKeypadIdNum).style.display = "none";
		}

		if(nFilterEnableNoSecretKeypad) {
			if(nFilterIsElementExist(nFilterKeypadIdCharL + nFilterKeypadIdNoSecretSuffix)) {
				if(nFilterIsKeypadEncode == true) {
					document.getElementById(nFilterKeypadIdCharL + nFilterKeypadIdNoSecretSuffix).innerHTML = nFilterDecode64(document.getElementById(nFilterKeypadIdCharL + nFilterKeypadIdNoSecretSuffix).innerHTML);
				}
				document.getElementById(nFilterKeypadIdCharL + nFilterKeypadIdNoSecretSuffix).style.display = "none";
			}
			if(nFilterIsElementExist(nFilterKeypadIdCharU + nFilterKeypadIdNoSecretSuffix)) {
				if(nFilterIsKeypadEncode == true) {
					document.getElementById(nFilterKeypadIdCharU + nFilterKeypadIdNoSecretSuffix).innerHTML = nFilterDecode64(document.getElementById(nFilterKeypadIdCharU + nFilterKeypadIdNoSecretSuffix).innerHTML);
				}
				document.getElementById(nFilterKeypadIdCharU + nFilterKeypadIdNoSecretSuffix).style.display = "none";
			}
			if(nFilterIsElementExist(nFilterKeypadIdCharS + nFilterKeypadIdNoSecretSuffix)) {
				if(nFilterIsKeypadEncode == true) {
					document.getElementById(nFilterKeypadIdCharS + nFilterKeypadIdNoSecretSuffix).innerHTML = nFilterDecode64(document.getElementById(nFilterKeypadIdCharS + nFilterKeypadIdNoSecretSuffix).innerHTML);
				}
				document.getElementById(nFilterKeypadIdCharS + nFilterKeypadIdNoSecretSuffix).style.display = "none";
			}
			if(nFilterIsElementExist(nFilterKeypadIdNum + nFilterKeypadIdNoSecretSuffix)) {
				if(nFilterIsKeypadEncode == true) {
					document.getElementById(nFilterKeypadIdNum + nFilterKeypadIdNoSecretSuffix).innerHTML = nFilterDecode64(document.getElementById(nFilterKeypadIdNum + nFilterKeypadIdNoSecretSuffix).innerHTML);
				}
				document.getElementById(nFilterKeypadIdNum + nFilterKeypadIdNoSecretSuffix).style.display = "none";
			}
		}
		
		
		if(isDisplay) {
			document.getElementById("nfilter_document").style.display = "block";
		} else {
			document.getElementById("nfilter_document").style.display = "none";
		}

		if(nFilterIsMaskMatch(nFilterKeypadType, "0001") || nFilterIsMaskMatch(nFilterKeypadType, "0010") || nFilterIsMaskMatch(nFilterKeypadType, "0100") || nFilterIsMaskMatch(nFilterKeypadType, "1000")) {
			if(nFilterKeypadType.toString(2) == "1000") {
				document.getElementById("nfilter_char").style.display = "none";
				document.getElementById("nfilter_num").style.display = "block";
			} else {
				
				
			}
			
			var defaultContentId = nFilterGetDefaultKeypadId(nFilterKeypadType);
			
			var defaultContentElement = document.getElementById(defaultContentId);

			
			
			
			if(nFilterTargetX != undefined && nFilterTargetX != null) {
				defaultContentElement.style.left = nFilterTargetX;
			}
			if(nFilterTargetY != undefined && nFilterTargetY != null) {
				defaultContentElement.style.top = nFilterTargetY;
			}

			if(isDisplay) {
				
				
			} else {
				defaultContentElement.style.display = "none";
			}
			
			nFilterSetDefaultKeypadType();
			
			nFilterIsKeyShiftNow = false;
			
			
			if(nFilterCSReturnURL != "" && nFilterIsElementExist("nfilter_close_char")) {
				document.getElementById("nfilter_close_char").style.display = "none";
			}
		}

		nFilterMain = document.getElementById("nfilter_main");
		
		
		if(isDisplay) {
			nFilterSetPosition(displayElementId);
		}
	
		nFilterExtRegistEventOnKeyDownUp();
		
		if(isDisplay) {
			
			nFilterKeypadShow(nFilterGetKeypadBinary(nFilterKeypadType), false, targetElementId, displayElementId);
		}
		

		if (getNFilterOSInfo() == "Android" || getNFilterOSInfo() == "iPad" || getNFilterOSInfo() == "iPhone" || getNFilterOSInfo() == "iPod" ) {
			
			
			
			
				
				
				var mobileEnterChar = document.getElementById( "nfilter_enter_char_mobile" );
				if( mobileEnterChar.ontouchstart == undefined ){
					mobileEnterChar.ontouchstart = function(){
						nFilterOnTouchstart();
					}
				}
				
				if( mobileEnterChar.ontouchend == undefined ){
					mobileEnterChar.ontouchend = function(){
						nFilterOnTouchend( this.id );
					}
				}
				
				
				var mobileClearChar = document.getElementById( "nfilter_clear_mobile" );
				if( mobileClearChar.ontouchstart == undefined ){
					mobileClearChar.ontouchstart = function(){
						nFilterOnTouchstart();
					}
				}
				
				if( mobileClearChar.ontouchend == undefined ){
					mobileClearChar.ontouchend = function(){
						nFilterOnTouchend( this.id );
					}
				}
				
				var mobileChangeChar = document.getElementById( "nfilter_change_mobile" );
				if( mobileChangeChar.ontouchstart == undefined ){
					mobileChangeChar.ontouchstart = function(){
						nFilterOnTouchstart();
					}
				}
				
				if( mobileChangeChar.ontouchend == undefined ){
					mobileChangeChar.ontouchend = function(){
						nFilterOnTouchend( this.id );
					}
				}
			
					
				var mobileCloseNum = document.getElementById( "nfilter_close_num_mobile" );
				if( mobileCloseNum.ontouchstart == undefined ){
					mobileCloseNum.ontouchstart = function(){
						nFilterOnTouchstart();
					}
				}
				
				if( mobileCloseNum.ontouchend == undefined ){
					mobileCloseNum.ontouchend = function(){
						nFilterOnTouchend( this.id );
					}
				}
				
				var mobileCloseChar = document.getElementById( "nfilter_close_char_mobile" );
				if( mobileCloseChar.ontouchstart == undefined ){
					mobileCloseChar.ontouchstart = function(){
						nFilterOnTouchstart();
					}
				}
				
				if( mobileCloseChar.ontouchend == undefined ){
					mobileCloseChar.ontouchend = function(){
						nFilterOnTouchend( this.id );
					}
				}
				
				
			
			}else {
				
				var changeEng = document.getElementById( "nfilter_change_eng" );
				if( changeEng != undefined && changeEng.onclick == undefined ){
					changeEng.onclick = function(){
						nFilterOnKeyClick(this);
					}
				}

				var changeSpecial = document.getElementById( "nfilter_change_special" );
				if( changeSpecial != undefined && changeSpecial.onclick == undefined ){
					changeSpecial.onclick = function(){
						nFilterOnKeyClick(this);
					}
				}		
				
				var closeChar = document.getElementById( "nfilter_close_char" );
				if( closeChar != undefined && closeChar.onclick == undefined ){
					closeChar.onclick = function(){
						nFilterOnKeyClick(this);
					}
				}
				var closeNum = document.getElementById( "nfilter_close_num" );
				if( closeNum != undefined && closeNum.onclick == undefined  ){
					closeNum.onclick = function(){
						nFilterOnKeyClick(this);
					}
				}						
				
				var mobileEnterChar = document.getElementById( "nfilter_enter_char_mobile" );
				if( mobileEnterChar != undefined && mobileEnterChar.onclick == undefined  ){
					mobileEnterChar.onclick = function(){
						nFilterOnKeyClick(this);
					}
				}
				
				var mobileClearChar = document.getElementById( "nfilter_clear_mobile" );
				if( mobileClearChar != undefined && mobileClearChar.onclick == undefined  ){
					mobileClearChar.onclick = function(){
						nFilterOnKeyClick(this);
					}
				}					
				
				var mobileChangeChar = document.getElementById( "nfilter_change_mobile" );
				if( mobileChangeChar != undefined && mobileChangeChar.onclick == undefined  ){
					mobileChangeChar.onclick = function(){
						nFilterOnKeyClick(this);
					}
				}						
				
				var mobileCloseNum = document.getElementById( "nfilter_close_num_mobile" );
				if( mobileCloseNum != undefined && mobileCloseNum.onclick == undefined  ){
					mobileCloseNum.onclick = function(){
						nFilterOnKeyClick(this);
					}
				}	
				var mobileCloseChar = document.getElementById( "nfilter_close_char_mobile" );
				if( mobileCloseChar != undefined && mobileCloseChar.onclick == undefined  ){
					mobileCloseChar.onclick = function(){
						nFilterOnKeyClick(this);
					}
				}
			}
			
			var mapTags = document.getElementsByTagName( 'map' );
			for (var int = 0; int < mapTags.length; int++) {
				var area = mapTags[ int ].getElementsByTagName( 'area' );
				for (var int2 = 0; int2 < area.length; int2++) {
					
					
					if (getNFilterOSInfo() == "Android" || getNFilterOSInfo() == "iPad" || getNFilterOSInfo() == "iPhone" || getNFilterOSInfo() == "iPod" ) {
						
						if( area[ int2 ].ontouchstart == undefined ){
							area[ int2 ].ontouchstart = function(){
								nFilterOnTouchstart();
							}
						}
						
						if( area[ int2 ].ontouchend == undefined ){
							area[ int2 ].ontouchend = function(){
								nFilterOnTouchend( this.id );
							}
						}
					}else {
						
						if( area[ int2 ].onmouseup == undefined ){
							area[ int2 ].onmouseup = function(){
								nFilterOnKeyClick(this);
							}
						}
					}
						
			
						
				}
			}		
			
		}
	
	function nFilterKeypadShowExt(keypadShowTypeBinary, targetElementId, displayElementId) {
		if( document.getElementById( displayElementId ).getAttribute( "shift" ) == "upper" ){
			keypadShowTypeBinary = "0010";
		}
		
		if( nFilterSiteCode == "shinhan" ){
			
			if( nFilterLanguage == "vn" || nFilterLanguage == "ve" ){
				var nFilterCharSubTitle =  document.getElementById("nfilter_char_sub_title" );
				if( nFilterCharSubTitle != null && nFilterCharSubTitle != undefined ){
					nFilterCharSubTitle.style.display = "block";
					document.getElementById("nfilter_char_header").style.marginBottom = "21px";
					nFilterCharSubTitle.innerHTML = nFilterSubTitle;
				}
				
				var nFilterNumSubTitle =  document.getElementById("nfilter_num_sub_title" );
				if( nFilterNumSubTitle != null && nFilterNumSubTitle != undefined ){
					nFilterNumSubTitle.style.display = "block";
					document.getElementById("nfilter_num_header").style.marginBottom = "23px";
					nFilterNumSubTitle.innerHTML = nFilterSubTitle;
				}
			}
			
		}
		
		
		if (typeof(keypadOpenEvent) != 'undefined'){
			keypadOpenEvent( displayElementId );
		}
		
		
			
		
		for (var int = 0; int < nFilterTypeArray.length; int++) {
			var nFilterTypeCheck = nFilterTypeArray[int].replace(new RegExp(document.getElementById( displayElementId ).id+"&","g"),"");
			
			
			if (nFilterTypeCheck == "true") {
				nFilterKeypadShow( keypadShowTypeBinary, false, targetElementId, displayElementId);
				break;
			}else if(nFilterTypeCheck == "false") {
				nFilterKeypadShow( keypadShowTypeBinary, true, targetElementId, displayElementId);
				break;
			}
			
		}
		
		
		
		
		
	}
	
	
	
	
	var inputMax = 13;
	var inputMaxNum = 6;
	var inputMaxMobile = 13;
	var inputMaxMobileNum = 13;
	
	function nFilterKeypadShow(keypadShowTypeBinary, isNoSecret, targetElementId, displayElementId) {
		
		document.getElementById(displayElementId).blur();		
		
		OnorientationchangeStyle = true;
		nFilterKeypadShowType = parseInt(keypadShowTypeBinary, 2);
		
		
		if (nFilterIsMobileRequest) {
			
			if (isNoSecret) {
				

				if (nFilterGetKeypadBinary(keypadShowTypeBinary) == "1000") {
					
					var minMaxCheckElement = document.getElementById(displayElementId);
					inputMaxMobileNum = minMaxCheckElement.getAttribute('maxlength');
					if (11 <= inputMaxMobileNum) {
						inputMaxMobileNum = 11;
					}
					
				}else {
					var minMaxCheckElement = document.getElementById(displayElementId);
					inputMaxMobile = minMaxCheckElement.getAttribute('maxlength');
					if (6 <= inputMaxMobile) {
						inputMaxMobile = 6;
					}
				}
				
			}else {
				
				
				if (nFilterGetKeypadBinary(keypadShowTypeBinary) == "1000") {
					var minMaxCheckElement = document.getElementById(displayElementId);
					inputMaxMobileNum = minMaxCheckElement.getAttribute('maxlength');
					if (13 <= inputMaxMobileNum) {
						inputMaxMobileNum = 13;
					}
				}else {
					var minMaxCheckElement = document.getElementById(displayElementId);
					inputMaxMobile = minMaxCheckElement.getAttribute('maxlength');
					if (13 <= inputMaxMobile) {
						inputMaxMobile = 13;
					}
				}
			}
			
		}else {
			if (isNoSecret) {
				if (nFilterGetKeypadBinary(keypadShowTypeBinary) == "1000") {
					
					var minMaxCheckElement = document.getElementById(displayElementId);
					inputMaxNum = minMaxCheckElement.getAttribute('maxlength');
					
					
					
				}else {
					
					var minMaxCheckElement = document.getElementById(displayElementId);
					inputMax = minMaxCheckElement.getAttribute('maxlength');
					
				}
				
				
				
				document.getElementById(moneyFormatting).id
				
			}else {
				if (nFilterGetKeypadBinary(keypadShowTypeBinary) == "1000") {
					
					var minMaxCheckElement = document.getElementById(displayElementId);
					inputMaxNum = minMaxCheckElement.getAttribute('maxlength');
					if (6 <=inputMaxNum) {
						inputMaxNum = 6;
					}
					
				}else {
					
					var minMaxCheckElement = document.getElementById(displayElementId);
					inputMax = minMaxCheckElement.getAttribute('maxlength');
					if (13 <= inputMax) {
						inputMax = 13;
					}
				}
			}
			
			
			
		}
			
		
		
		
		

		
		
		
		if( nFilterIsMobileRequest && nFilterGetKeypadBinary(nFilterKeypadShowType) == "1000" ){
			
			if (nFilterScreenSize == 400) {
				
				document.getElementById("nfilter_num").style.height= 203+"px";
				}else if(nFilterScreenSize == 360){
					
				 document.getElementById("nfilter_num").style.height= 192+"px"; 
				
				document.getElementById("nfilter_tmp_editview_num").style.marginLeft=80+"px";
				
				}else {
				
					document.getElementById("nfilter_tmp_editview_num").style.marginLeft=75+"px"; 
				
				}
	
		}else {
			if (nFilterIsMobileRequest) {
			if (nFilterScreenSize == 400) {
				document.getElementById("nfilter_char").style.height= 269+"px";
				
			}else if(nFilterScreenSize == 360){
				document.getElementById("nfilter_char").style.height= 258+"px";
			
			}else {
				
			}
			
			}
		}
		
		if(displayElementId == undefined || displayElementId == null || displayElementId == "") {
			
			return false;
		}
		
		
		if(targetElementId == undefined || targetElementId == null || targetElementId == "") {
			if(displayElementId.indexOf("|") > -1) {
				var displayElts = displayElementId.split("|");
				
				for(var d=0; d<displayElts.length; d++) {
					targetElementId += displayElts[d] + nFilterKeypadIdTargetSuffix;
				}
			} else {
				targetElementId = displayElementId + nFilterKeypadIdTargetSuffix;
			}
		}
			
		
		if(!nFilterIsSupportType(nFilterKeypadType, keypadShowTypeBinary)) {
			
			return false;
		}
		
		if(isNoSecret != undefined && isNoSecret != null && isNoSecret == true) {
			nFilterIsNoSecretKeypad = true;

			tmpKeypadIdCharL = nFilterKeypadIdCharL + nFilterKeypadIdNoSecretSuffix;
			tmpKeypadIdCharU = nFilterKeypadIdCharU + nFilterKeypadIdNoSecretSuffix;
			tmpKeypadIdCharS = nFilterKeypadIdCharS + nFilterKeypadIdNoSecretSuffix;
			tmpKeypadIdNum = nFilterKeypadIdNum + nFilterKeypadIdNoSecretSuffix;

			if(nFilterIsElementExist(nFilterKeypadIdCharL)) {
				document.getElementById(nFilterKeypadIdCharL).style.display = "none";
			}
			if(nFilterIsElementExist(nFilterKeypadIdCharU)) {
				document.getElementById(nFilterKeypadIdCharU).style.display = "none";
			}
			if(nFilterIsElementExist(nFilterKeypadIdCharS)) {
				document.getElementById(nFilterKeypadIdCharS).style.display = "none";
			}
			if(nFilterIsElementExist(nFilterKeypadIdNum)) {
				document.getElementById(nFilterKeypadIdNum).style.display = "none";
			}
		} else {
			nFilterIsNoSecretKeypad = false;

			tmpKeypadIdCharL = nFilterKeypadIdCharL;
			tmpKeypadIdCharU = nFilterKeypadIdCharU;
			tmpKeypadIdCharS = nFilterKeypadIdCharS;
			tmpKeypadIdNum = nFilterKeypadIdNum;

			if(nFilterIsElementExist(nFilterKeypadIdCharL + nFilterKeypadIdNoSecretSuffix)) {
				document.getElementById(nFilterKeypadIdCharL + nFilterKeypadIdNoSecretSuffix).style.display = "none";
			}
			if(nFilterIsElementExist(nFilterKeypadIdCharU + nFilterKeypadIdNoSecretSuffix)) {
				document.getElementById(nFilterKeypadIdCharU + nFilterKeypadIdNoSecretSuffix).style.display = "none";
			}
			if(nFilterIsElementExist(nFilterKeypadIdCharS + nFilterKeypadIdNoSecretSuffix)) {
				document.getElementById(nFilterKeypadIdCharS + nFilterKeypadIdNoSecretSuffix).style.display = "none";
			}
			if(nFilterIsElementExist(nFilterKeypadIdNum + nFilterKeypadIdNoSecretSuffix)) {
				document.getElementById(nFilterKeypadIdNum + nFilterKeypadIdNoSecretSuffix).style.display = "none";
			}
		}

    	
    	
    	
		
		if(targetElementId.indexOf("|") > -1 && displayElementId.indexOf("|") > -1) {
			nFilterInputNextTargetElementIdList = targetElementId.substring(targetElementId.indexOf("|") + 1);
			nFilterInputNextDisplayElementIdList = displayElementId.substring(displayElementId.indexOf("|") + 1);
			targetElementId = targetElementId.substring(0, targetElementId.indexOf("|"));
			displayElementId = displayElementId.substring(0, displayElementId.indexOf("|"));
			
			nFilterCreateElement(targetElementId, displayElementId);
			
			nFilterInputTargetElement = document.getElementById(targetElementId);
			nFilterInputDisplayElement = document.getElementById(displayElementId);
		} else {
			nFilterInputNextTargetElementIdList = "";
			nFilterInputNextDisplayElementIdList = "";
			
			nFilterCreateElement(targetElementId, displayElementId);
			
			nFilterInputTargetElement = document.getElementById(targetElementId);
			nFilterInputDisplayElement = document.getElementById(displayElementId);
		}
		
		
		
		nFilterClearInput();

		
		if(nFilterInputNextTargetElementIdList != "" && nFilterInputNextDisplayElementIdList != "") {
			nFilterClearNextInputs(nFilterInputNextTargetElementIdList, nFilterInputNextDisplayElementIdList);
		}
		
		if( nFilterInputDisplayElement.getAttribute("curconfirm") ){
			var currentConfirmObject = document.getElementById( nFilterInputDisplayElement.getAttribute("curconfirm") );
			
			if( currentConfirmObject.getAttribute("directkey") == "off"   && currentConfirmObject.getAttribute("encrypt") == "on" ){
				currentConfirmObject.value = "";
				document.getElementById( currentConfirmObject.id + nFilterKeypadIdTargetSuffix ).value = "";
				currentConfirmObject.setAttribute("encrypt", "off");
				var confirmObject = document.getElementById( currentConfirmObject.getAttribute( "confirm1" ) );
				confirmObject.value = "";
				document.getElementById( confirmObject.id + nFilterKeypadIdTargetSuffix ).value = "";
				confirmObject.setAttribute("encrypt", "off");
				var confirmObject2 = document.getElementById( currentConfirmObject.getAttribute( "confirm2" ) );
				document.getElementById( confirmObject2.id + nFilterKeypadIdTargetSuffix ).value = "";
				confirmObject2.value = "";
				confirmObject2.setAttribute("encrypt", "off");
				
				encryptValidation = false;
			}
						
		}else if( nFilterInputDisplayElement.getAttribute("confirm") ){
			
			if( nFilterInputDisplayElement.getAttribute("directkey") == "off"   && nFilterInputDisplayElement.getAttribute("encrypt") == "on" ){
				nFilterInputDisplayElement.value = "";
				document.getElementById( nFilterInputDisplayElement.id + nFilterKeypadIdTargetSuffix ).value = "";
				nFilterInputDisplayElement.setAttribute("encrypt", "off");
				var confirmObject2 = document.getElementById( nFilterInputDisplayElement.getAttribute( "confirm" ) );
				document.getElementById( confirmObject2.id + nFilterKeypadIdTargetSuffix ).value = "";
				confirmObject2.value = "";
				confirmObject2.setAttribute("encrypt", "off");
				
				encryptValidation = false;
			}
			
		}else if( NFILTERSET == nFilterDefault ){
			if( document.getElementById( "nfilter_close_num" )  != undefined ){
				document.getElementById( "nfilter_close_num" ).style.display = "none";
				document.getElementById( "nfilter_close_char" ).style.display = "none";
			}
			
		}		
		
		
		nFilterClearInput();

		
		if(nFilterInputNextTargetElementIdList != "" && nFilterInputNextDisplayElementIdList != "") {
			nFilterClearNextInputs(nFilterInputNextTargetElementIdList, nFilterInputNextDisplayElementIdList);
		}
		
	
		
		if(nFilterPositionElementId != undefined && nFilterPositionElementId != null && nFilterPositionElementId != "") {
			
			nFilterSetPosition(displayElementId);
			nFilterSetLocation(document.getElementById(nFilterPositionElementId));
			nFilterPositionElementId = "";

			if(getNFilterBrowerInfo() == "IE" || getNFilterBrowerInfo() == "IE7" 
				|| getNFilterBrowerInfo() == "Firefox" || getNFilterBrowerInfo() == "Opera") {
				nFilterPreScrollTop = document.documentElement.scrollTop;
			} else {
				nFilterPreScrollTop = document.body.scrollTop;
			}
		} else {
			
			nFilterSetPosition(displayElementId);
		}
		
		
    	
    	
    	
		if(nFilterIsElementExist("nfilter_document")) {
			document.getElementById("nfilter_document").style.display = "block";
			if(nFilterIsMobileRequest) {
				if(nFilterIsMaskMatch(nFilterKeypadShowType, "0001") && nFilterIsElementExist(tmpKeypadIdCharL)) {
					document.getElementById(tmpKeypadIdCharL).style.display = "block";
					document.getElementById(tmpKeypadIdCharL).style.left = nFilterTargetX;
					document.getElementById(tmpKeypadIdCharL).style.top = nFilterTargetY;
					nFilterIsKeypadNowL = true;
					if(nFilterIsElementExist(tmpKeypadIdCharU)) {
						document.getElementById(tmpKeypadIdCharU).style.display = "none";
						nFilterIsKeypadNowU = false;
					}
					if(nFilterIsElementExist(tmpKeypadIdCharS)) {
						document.getElementById(tmpKeypadIdCharS).style.display = "none";
						nFilterIsKeypadNowS = false;
					}
					if(nFilterIsElementExist(tmpKeypadIdNum)) {
						document.getElementById(tmpKeypadIdNum).style.display = "none";
					}
				} else if(nFilterIsMaskMatch(nFilterKeypadShowType, "0010") && nFilterIsElementExist(tmpKeypadIdCharU)) {
					document.getElementById(tmpKeypadIdCharU).style.display = "block";
					document.getElementById(tmpKeypadIdCharU).style.left = nFilterTargetX;
					document.getElementById(tmpKeypadIdCharU).style.top = nFilterTargetY;
					nFilterIsKeypadNowU = true;

					if(nFilterIsElementExist(tmpKeypadIdCharS)) {
						document.getElementById(tmpKeypadIdCharS).style.display = "none";
						nFilterIsKeypadNowS = false;
					}
					if(nFilterIsElementExist(tmpKeypadIdNum)) {
						document.getElementById(tmpKeypadIdNum).style.display = "none";
					}
				} else if(nFilterIsMaskMatch(nFilterKeypadShowType, "0100") && nFilterIsElementExist(tmpKeypadIdCharS)) {
					document.getElementById(tmpKeypadIdCharS).style.display = "block";
					document.getElementById(tmpKeypadIdCharS).style.left = nFilterTargetX;
					document.getElementById(tmpKeypadIdCharS).style.top = nFilterTargetY;
					nFilterIsKeypadNowS = true;
					
					if(nFilterIsElementExist(tmpKeypadIdNum)) {
						document.getElementById(tmpKeypadIdNum).style.display = "none";
					}
				} else if(nFilterIsMaskMatch(nFilterKeypadShowType, "1000") && nFilterIsElementExist(tmpKeypadIdNum)) {
					document.getElementById(tmpKeypadIdNum).style.display = "block";
					document.getElementById(tmpKeypadIdNum).style.left = nFilterTargetX;
					
				}
			} else {
				
				if(nFilterIsMaskMatch(nFilterKeypadShowType, "0001") || nFilterIsMaskMatch(nFilterKeypadShowType, "0010")) {
					if(nFilterIsElementExist("nfilter_change_eng")) {
						document.getElementById("nfilter_change_eng").style.display = "block";
					}
				} else {
					if(nFilterIsElementExist("nfilter_change_eng")) {
						document.getElementById("nfilter_change_eng").style.display = "none";
					}
				}
				
				if(nFilterIsMaskMatch(nFilterKeypadShowType, "0100")) {
					if(nFilterIsElementExist("nfilter_change_special")) {
						document.getElementById("nfilter_change_special").style.display = "block";
					}
				} else {
					if(nFilterIsElementExist("nfilter_change_special")) {
						document.getElementById("nfilter_change_special").style.display = "none";
					}
				}
			}

			
			if(keypadShowTypeBinary == "1000") {
				if(nFilterIsElementExist("nfilter_char")) {
					document.getElementById("nfilter_char").style.display = "none";
				}
				if(nFilterIsElementExist("nfilter_num")) {
					document.getElementById("nfilter_num").style.display = "block";
					document.getElementById("nfilter_num_header").style.display = "block";
				}

				if(isNoSecret != undefined && isNoSecret != null && isNoSecret == true) {
					if(nFilterIsElementExist(nFilterKeypadIdNum)) {
						document.getElementById(nFilterKeypadIdNum).style.display = "none";
					}
					if(nFilterIsElementExist(nFilterKeypadIdNum + nFilterKeypadIdNoSecretSuffix)) {
						document.getElementById(nFilterKeypadIdNum + nFilterKeypadIdNoSecretSuffix).style.display = "block";
					}
				} else {
					if(nFilterIsElementExist(nFilterKeypadIdNum)) {
						document.getElementById(nFilterKeypadIdNum).style.display = "block";
					}
					if(nFilterIsElementExist(nFilterKeypadIdNum + nFilterKeypadIdNoSecretSuffix)) {
						document.getElementById(nFilterKeypadIdNum + nFilterKeypadIdNoSecretSuffix).style.display = "none";
					}
				}
				if(nFilterIsElementExist(tmpKeypadIdNum)) {
					document.getElementById(tmpKeypadIdNum).style.display = "block";
				}

				nFilterIsKeypadNowL = false;
				nFilterIsKeypadNowU = false;
				nFilterIsKeypadNowS = false;
			} else {
				if(nFilterIsElementExist("nfilter_num")) {
					document.getElementById("nfilter_num").style.display = "none";
				}

				if(nFilterIsElementExist("nfilter_char")) {
					document.getElementById("nfilter_char").style.display = "block";
				}
				
				if(nFilterIsMaskMatch(nFilterKeypadShowType, "0001")) {
					if(nFilterIsElementExist(tmpKeypadIdCharL)) {
						document.getElementById(tmpKeypadIdCharL).style.display = "block";
					}
				} else if(nFilterIsMaskMatch(nFilterKeypadShowType, "0010")) {
					if(nFilterIsElementExist(tmpKeypadIdCharU)) {
						document.getElementById(tmpKeypadIdCharU).style.display = "block";
					}
				} else if(nFilterIsMaskMatch(nFilterKeypadShowType, "0100")) {
					if(nFilterIsElementExist(tmpKeypadIdCharS)) {
						document.getElementById(tmpKeypadIdCharS).style.display = "block";
					}
				}

				if(nFilterIsElementExist("nfilter_change_special") && nFilterIsElementExist("nfilter_change_eng")) {
					if(keypadShowTypeBinary == "0101" || keypadShowTypeBinary == "0110" || keypadShowTypeBinary == "0111") {
						document.getElementById("nfilter_change_special").style.display = "block";
						document.getElementById("nfilter_change_eng").style.display = "block";
					} else {
						document.getElementById("nfilter_change_special").style.display = "none";
						document.getElementById("nfilter_change_eng").style.display = "none";
					}
				}
			}
			
			if(nFilterIsMobileRequest){
				document.getElementById("nfilter_tmp_editview_num").style.width = InputSizewidth+"px";
			}
		
			
			
		} else {
			
		}
		
		
	}
	
	var InputSizewidth = 185;
	function setNFilterInputSize(width) {
		if (width == "large") {
			InputSizewidth = 185;
		}else {
			InputSizewidth = 137;
		}
	}
	
	
	function nFilterResize(width, height) {
		
		
		if(nFilterIsElementExist("nfilter_document")) {
			document.getElementById("nfilter_document").style.width = width + "px";
			document.getElementById("nfilter_document").style.height = height + "px";
			
			
			
		}

		
		if(nFilterIsElementExist("nfilter_bg")) {
			document.getElementById("nfilter_bg").style.width = "100%";
			document.getElementById("nfilter_bg").style.height = "100%";

			
			
		}
		
		
		if(nFilterIsElementExist("nfilter_main")) {
			document.getElementById("nfilter_main").style.width = width + "px";
			document.getElementById("nfilter_main").style.height = height + "px";
		}
	}

	var isNFilterPreview = false;
	function nFilterPreview( v ){
		isNFilterPreview = v;
	}
	
	
	
	

	var touchUse = false;
	
	
	function nFilterOnTouchstart() {
		touchUse = true;
	}

	
	
	
	var beforeTouchKeyId = "";
	
	function nFilterOnTouchend(key) {
		if( key.id != "nfilter_close_char_mobile" && key.id != "nfilter_close_num_mobile"
			 && key.id != "nfilter_enter_char_mobile" ) {
			
			nFilterClick(key);
		}
		//e.preventDefault();
	}


	
	function nFilterOnKeyClick(key) {
		
		try {
			
			if( key.id == "nfilter_close_char_mobile" || key.id == "nfilter_close_num_mobile"
				 || key.id == "nfilter_enter_char_mobile" ) touchUse = false;
		} catch (e) {}
			
		if(!touchUse) nFilterClick(key);
		touchUse = false;
	}

	
	function nFilterClick(key) {

		if( typeof key == "string" && key.indexOf( nFilterKeypadIdDummy ) > -1 ) return;
		else if( typeof key == "object" && key.id.indexOf( nFilterKeypadIdDummy ) > -1 ) return;
		
		var inputKeyId = "";
		var inputKeyElement = null;
		var inputImageUrl = "";
		
		
		
		
		
		try {
			if(nFilterImageRenderType == nFilterImageRenderTypeE) {
				if(key.id == undefined || key.id == null || key.id == "") {
					inputKeyElement = document.getElementById(key);
					inputKeyId = key;
				} else {
					inputKeyElement = key;
					inputKeyId = key.id;
					inputImageUrl = key.src;
				}
			} else { 
				if(key.id == undefined || key.id == null || key.id == "") {
					
					var num_check=/^[0-9]*$/;
					if( nFilterKeypadShowType == 7 && num_check.test(key) ){

						var charl_childNodes = document.getElementById(  (nFilterIsKeypadNowU) ? "charu_no_secretmap" : "charl_no_secretmap" ).childNodes;
						for ( i = 0; i < charl_childNodes.length ; i++ ){
							if( key == charl_childNodes[i].id ){
								inputKeyElement = charl_childNodes[i];
								break;
							}
						}
					}else{
						inputKeyElement = document.getElementById(key);
					}

					inputKeyId = key;
				} else {
					inputKeyElement = key;
					inputKeyId = key.id;
				}
			}
		} catch(e) {
		}

		
		
		
	
    	
    	
    	
		
		
			

			var nFilterTouchMaskElt = document.getElementById("nfilter_touch_mask");
			
			try {
				
				if (  inputKeyElement.tagName.toLowerCase() == "area" ) {
					
					var nowScroll = nFilterGetNowScroll();
					
					
					if( nFilterIsMobileRequest && nFilterGetKeypadBinary(nFilterKeypadShowType) == "1000" ){
						if (nFilterScreenSize == 400) {
							nFilterTouchMaskElt.style.height =  54+"px";	
							
						}else if(nFilterScreenSize == 360){
							nFilterTouchMaskElt.style.height = 49 +"px";
						}else {
							
						}
					}else {
						if (nFilterIsMobileRequest) {
						if (nFilterScreenSize == 400) {
							nFilterTouchMaskElt.style.height =  49+"px";	
							
						}else if(nFilterScreenSize == 360){
							nFilterTouchMaskElt.style.height = 47 +"px";
						}else {
							
						}
						}
						
					}
					
						
						
		if( nFilterRequestParamIsMobile ){
						nFilterTouchMaskElt.style.left = ( parseInt( nFilterPxSplit( document.getElementById( "nfilter_main" ).style.left ) ) +  parseInt(inputKeyElement.coords.split(',')[0] ) )+ 5  +"px";
						if( nFilterGetKeypadBinary(nFilterKeypadShowType) != "1000" ){
							if (nFilterScreenSize == 400) {
								nFilterTouchMaskElt.style.top = ( parseInt( nFilterPxSplit( document.getElementById( "nfilter_main" ).style.top ) ) +  parseInt(inputKeyElement.coords.split(',')[1] ) )+ 54  +"px";
							}else if (nFilterScreenSize == 360) {
								nFilterTouchMaskElt.style.top = ( parseInt( nFilterPxSplit( document.getElementById( "nfilter_main" ).style.top ) ) +  parseInt(inputKeyElement.coords.split(',')[1] ) )+ 53  +"px";
							}else {
								
								nFilterTouchMaskElt.style.top = ( parseInt( nFilterPxSplit( document.getElementById( "nfilter_main" ).style.top ) ) +  parseInt(inputKeyElement.coords.split(',')[1] ) )+ 54  +"px";
							}
						}else{
							
							nFilterTouchMaskElt.style.top = ( parseInt( nFilterPxSplit( document.getElementById( "nfilter_main" ).style.top ) ) +  parseInt(inputKeyElement.coords.split(',')[1] ) )+  49+45 +"px";
						}
					}else{
						nFilterTouchMaskElt.style.left = ( parseInt(nFilterFindOffsetLeft(inputKeyElement.parentNode.parentNode)) + parseInt(inputKeyElement.coords.split(',')[0]) + nowScroll.X ) + "px";
						nFilterTouchMaskElt.style.top = ( parseInt(nFilterFindOffsetTop(inputKeyElement.parentNode.parentNode)) + parseInt(inputKeyElement.coords.split(',')[1]) + nowScroll.Y + 2 ) + "px";
					}
					
					nFilterTouchMaskElt.style.width =( parseInt(inputKeyElement.coords.split(',')[2])  - parseInt(inputKeyElement.coords.split(',')[0]) ) +"px" ;
					nFilterTouchMaskElt.style.display = "block";
					
					window.setTimeout(function() {
						nFilterTouchMaskElt.style.display = "none";
					}, 50);
				}
			} catch (e) {
				
			}
		
		
		if(inputKeyId == "nfilter_close_char" || inputKeyId == "nfilter_close_char_mobile" || inputKeyId == "nfilter_close_char_u" 
			|| inputKeyId == "nfilter_enter_char" || inputKeyId == "nfilter_enter_char_u"
			|| inputKeyId == "nfilter_close_num" || inputKeyId == "nfilter_enter_num"
			|| inputKeyId == "nfilter_close_num_mobile"
			|| inputKeyId == "nfilter_enter_char_mobile" || inputKeyId == "nfilter_enter_num_mobile" || inputKeyId == "nfilter_clear_mobile") {
			
			if( nFilterClassActiveState ) nFilterClassActive( inputKeyId );
			
	    	
	    	
	    	
			
			if(inputKeyId == "nfilter_close_char" || inputKeyId == "nfilter_close_char_mobile" || inputKeyId == "nfilter_close_char_u" || inputKeyId == "nfilter_close_num" || inputKeyId == "nfilter_close_num_mobile" || inputKeyId == "nfilter_clear_mobile") {
		    	
		    	
		    	
				
				nFilterClearInput();
				if( inputKeyId == "nfilter_clear_mobile" ) return;
				if(nFilterIsMobileRequest) {
					if(nFilterIsElementExist(nFilterKeypadIdPreviewChar)) {
						document.getElementById(nFilterKeypadIdPreviewChar).style.display = "none";
					}
				}
				
				
				
				
				nFilterInputNextTargetElementIdList = "";
				nFilterInputNextDisplayElementIdList = "";
				
				
				if(nFilterInputAutoFocus) {
					
					if( !nFilterConfirmClose() ) {
						nFilterInputDisplayElement.setAttribute("directkey", "on");
					}
					
					
					if(nFilterInputDisplayElement != undefined) {
						
						
						if(getNFilterBrowerInfo() == "IE7" || getNFilterBrowerInfo() == "Firefox") {
							nFilterInputDisplayElement.disabled = false;
						} else {
							nFilterInputDisplayElement.readOnly = false;
						}
						
						
						
					}
					nFilterInputAutoFocus = false;
				}
				
				
				nFilterInputDisplayElement.removeAttribute( "disabled" );
			
				
				
				if(nFilterIsInputShow) {
					if(typeof nFilterExtE2EImpl == "function") {
						nFilterExtE2EImpl(nFilterInputDisplayElement.id, "clear", "");
					}
				}
				
				if( NFILTERSET == nFilterDefaultDirectButton && !nFilterInputDisplayElement.getAttribute("curconfirm") ) {
					nFilterInputDisplayElement.setAttribute("directkey", "on");
				}
				
				scCardNumDelete();
				
				if(typeof nFilterCallback == "function") {
					nFilterCallback( "close" );
				}
				
			} else { 
				
				
				var checkResult = nFilterMinMaxCheck( nFilterInputDisplayElement.id );
				
				if(!checkResult) {
					nFilterClearInput();
					return false;
				}

				if(nFilterIsMobileRequest) {
					if(nFilterIsElementExist(nFilterKeypadIdPreviewChar)) {
						document.getElementById(nFilterKeypadIdPreviewChar).style.display = "none";
					}
				}
				
				
				if(  NFILTERSET == nFilterDefaultDirect && nFilterInputDisplayElement.getAttribute("curconfirm") 
						|| NFILTERSET == nFilterDefaultButtonOrDirect && nFilterInputDisplayElement.getAttribute("curconfirm") 
							|| NFILTERSET == nFilterDefaultDirectButton && nFilterInputDisplayElement.getAttribute("curconfirm")  ){
					var currentConfirmObject = document.getElementById( nFilterInputDisplayElement.getAttribute("curconfirm") );
					
					if(  nFilterInputDisplayElement.id != currentConfirmObject.id &&  currentConfirmObject.getAttribute("directkey") == "on" ) currentConfirmObject.value = "";
					currentConfirmObject.setAttribute("directkey", "off");
					currentConfirmObject.setAttribute("encrypt", "off");
					currentConfirmObject.readOnly = true; 
					
					var confirmObject = document.getElementById( currentConfirmObject.getAttribute( "confirm1" ) );
					if(  nFilterInputDisplayElement.id != confirmObject.id &&  confirmObject.getAttribute("directkey") == "on" ) confirmObject.value = "";
					confirmObject.setAttribute("directkey", "off");
					confirmObject.setAttribute("encrypt", "off");
					confirmObject.readOnly = true; 
					
					var confirmObject2 = document.getElementById( currentConfirmObject.getAttribute( "confirm2" ) );
					if( nFilterInputDisplayElement.id != confirmObject2.id &&  confirmObject2.getAttribute("directkey") == "on" ) confirmObject2.value = "";
					confirmObject2.setAttribute("directkey", "off");					
					confirmObject2.setAttribute("encrypt", "off");
					confirmObject2.readOnly = true; 
					
					
				}else	 if(  NFILTERSET == nFilterDefaultDirect && nFilterInputDisplayElement.getAttribute("confirm") 
						|| NFILTERSET == nFilterDefaultButtonOrDirect && nFilterInputDisplayElement.getAttribute("confirm") 
						|| NFILTERSET == nFilterDefaultDirectButton && nFilterInputDisplayElement.getAttribute("confirm")  ){
					nFilterInputDisplayElement.setAttribute("directkey", "off");
					nFilterInputDisplayElement.setAttribute("encrypt", "off");
					nFilterInputDisplayElement.readOnly = true; 
					
					var confirmObject2 = document.getElementById( nFilterInputDisplayElement.getAttribute( "confirm" ) );
					if( confirmObject2.getAttribute("directkey") == null || confirmObject2.getAttribute("directkey") == "on" ) confirmObject2.value = "";
					confirmObject2.setAttribute("directkey", "off");					
					confirmObject2.setAttribute("encrypt", "off");	
					confirmObject2.readOnly = true; 
					
				}else{
					nFilterInputDisplayElement.setAttribute("directkey", "off");
					nFilterInputDisplayElement.readOnly = true;
				}
				
				if(nFilterIsMobileRequest && isNFilterPreview) {
					if(nFilterIsElementExist(nFilterKeypadIdPreviewChar)) {
						
						nFilterSetImageVisible(nFilterKeypadIdPreviewChar, false);
					}
				}
				
		    	
		    	
		    	
				if(nFilterIsEncryptImmediate == true || nFilterCSReturnURL != "") {
					
					

					
					if( nFilterIsNoSecretKeypad ) {
						
						nFilterInputTargetElement.value = nFilterInputEncrypt(nFilterKeypadIdNoSecretPrefix + nFilterSecElement);
					} else {
						if( !nFilterInputDisplayElement.getAttribute("curConfirm") && ! nFilterInputDisplayElement.getAttribute("confirm") ){
							
							nFilterInputTargetElement.value  =  nFilterInputEncrypt(nFilterSecElement);
						}
					}
					
				}
				
				
		    	
				
		    	
				if(nFilterCSReturnURL != "") {
					nFilterCSProcess(nFilterInputTargetElement.value, nFilterInputDisplayElement.id);
				} else if(nFilterInputNextTargetElementIdList != undefined && nFilterInputNextTargetElementIdList != "" 
					&& nFilterInputNextDisplayElementIdList != undefined && nFilterInputNextDisplayElementIdList != "") {
					
					
					nFilterKeypadShow(nFilterGetKeypadBinary(nFilterKeypadShowType), nFilterEnableNoSecretKeypad, nFilterInputNextTargetElementIdList, nFilterInputNextDisplayElementIdList);
					return true;
				} else {
					nFilterInputNextTargetElementIdList = "";
					nFilterInputNextDisplayElementIdList = "";
				}
				
				
				
				if(typeof nFilterCallback == "function") {
					nFilterCallback( "enter" );
				}
			}
			
			
			nFilterSetDefaultKeypadType();
			
			if( nFilterClassActiveState ){
				window.setTimeout(function() { nFilterClose2( inputKeyId ); }, 300);
			}else{
				window.setTimeout(function() { nFilterClose2( inputKeyId ); }, 300);
			}
			
		} else if(inputKeyId == "nfilter_backspace_char" || inputKeyId == "nfilter_backspace_char_u" || inputKeyId == "nfilter_backspace_num" 
			|| inputKeyId == "nfilter_backspace_l_mobile" || inputKeyId == "nfilter_backspace_u_mobile" || inputKeyId == "nfilter_backspace_s_mobile" || inputKeyId == "nfilter_backspace_num_mobile") {

			if(nFilterSecElement.length > 0) {
				if(nFilterSecret(nFilterInputDisplayElement.id)) {
					nFilterSecElement = nFilterSecElement.substr(0, nFilterSecElement.length - 1);
				} else {
					nFilterSecElement = nFilterSecElement.substr(0, nFilterSecElement.length - nFilterRandomIdLength);
				}
			} else {
				//return false;
			}
			
			
				if( nFilterIsNoSecretKeypad) {
					var temInputDisplayElementValue = "";


					if(nFilterInputDisplayElement.value.length > 0) {
						temInputDisplayElementValue = nFilterInputDisplayElement.value.substr(0, nFilterInputDisplayElement.value.length - 1);
						

						if(temInputDisplayElementValue.substring(temInputDisplayElementValue.length - 1, temInputDisplayElementValue.length) == ",") {
							nFilterInputDisplayElement.value = temInputDisplayElementValue.substr(0, temInputDisplayElementValue.length - 1);
						} else {
							nFilterInputDisplayElement.value = temInputDisplayElementValue;
						}
						
						if (nFilterIsMobileRequest) {
							
							if(nFilterIsElementExist("nfilter_tmp_editview")) {
								var tmpEditviewNumValue = nFilterInputDisplayElement.value;	
								document.getElementById("nfilter_tmp_editview").innerHTML = tmpEditviewNumValue.substring(nFilterInputDisplayElement.value.length-inputMaxMobile,nFilterInputDisplayElement.value.length);
															
								
							}
						
							
							if(nFilterIsElementExist("nfilter_tmp_editview_num")) {
								var tmpEditviewNumValue = nFilterInputDisplayElement.value;	
								document.getElementById("nfilter_tmp_editview_num").innerHTML = tmpEditviewNumValue.substring(nFilterInputDisplayElement.value.length-inputMaxMobileNum ,nFilterInputDisplayElement.value.length);
								
								
							}
							
						}else {
							
							
							
							if(nFilterIsElementExist("nfilter_tmp_editview")) {
								var tmpEditviewNumValue = nFilterInputDisplayElement.value;	
								document.getElementById("nfilter_tmp_editview").innerHTML = tmpEditviewNumValue.substring(nFilterInputDisplayElement.value.length-8,nFilterInputDisplayElement.value.length);
															
								
							}
						
							
							if(nFilterIsElementExist("nfilter_tmp_editview_num")) {
								var tmpEditviewNumValue = nFilterInputDisplayElement.value;	
								document.getElementById("nfilter_tmp_editview_num").innerHTML = tmpEditviewNumValue.substring(nFilterInputDisplayElement.value.length-5,nFilterInputDisplayElement.value.length);
								
								
							}
						}
						
						
						
						
					} else {
						return false;
					}
					
				} else {
					
					if(nFilterInputDisplayElement.value.length > 0) {
						nFilterInputDisplayElement.value = nFilterInputDisplayElement.value.substr(0, nFilterInputDisplayElement.value.length - 1);
						
						if (nFilterIsMobileRequest) {
							if(nFilterIsElementExist("nfilter_tmp_editview")) {
								
							
							if (nFilterInputDisplayElement.value.length >= inputMaxMobile ) {
								
							}else {
									document.getElementById("nfilter_tmp_editview").innerHTML = document.getElementById("nfilter_tmp_editview").innerHTML.substr(0, document.getElementById("nfilter_tmp_editview").innerHTML.length - 1);;
							}
							}
							if(nFilterIsElementExist("nfilter_tmp_editview_num")) {
								if (nFilterInputDisplayElement.value.length >= inputMaxMobileNum ) {
								}else {
								document.getElementById("nfilter_tmp_editview_num").innerHTML = document.getElementById("nfilter_tmp_editview_num").innerHTML.substr(0, document.getElementById("nfilter_tmp_editview_num").innerHTML.length - 1);;
							
								}
							}
							
						}else {
							if(nFilterIsElementExist("nfilter_tmp_editview")) {
							
							
								if (nFilterInputDisplayElement.value.length >= inputMax) {
								
							}else {
								
									document.getElementById("nfilter_tmp_editview").innerHTML = document.getElementById("nfilter_tmp_editview").innerHTML.substr(0, document.getElementById("nfilter_tmp_editview").innerHTML.length - 1);;
								}
							}
							
							
							if(nFilterIsElementExist("nfilter_tmp_editview_num")) {
								if (nFilterInputDisplayElement.value.length >= inputMaxNum) {
									
								}else {
										document.getElementById("nfilter_tmp_editview_num").innerHTML = document.getElementById("nfilter_tmp_editview_num").innerHTML.substr(0, document.getElementById("nfilter_tmp_editview_num").innerHTML.length - 1);;
									}
							}
							
						}
						
						
					} else {
						return false;
					}
				}
				scCardNumDelete();
				
				
				if(nFilterIsInputShow) {
					if(typeof nFilterExtE2EImpl == "function") {
						nFilterExtE2EImpl(nFilterInputDisplayElement.id, "delete", "");
					}
				}
			} else if(inputKeyId.indexOf("nfilter_capslock") > -1) {
			
	    	
			
	    	

			
			
			
			
			if(nFilterIsKeypadNowL == true || nFilterIsKeypadNowU == true) {
				nFilterIsKeyShiftNow = false;
				
				if(inputKeyId == "nfilter_capslock_u1" || inputKeyId == "nfilter_capslock_u2") { 
					
					
					if(nFilterKeypadShowType != 0 && !nFilterIsMaskMatch(nFilterKeypadShowType, "0001")) {
						return false;
					}
					
					if(nFilterIsElementExist(tmpKeypadIdCharU) && nFilterIsElementExist(tmpKeypadIdCharL)) {
						document.getElementById(tmpKeypadIdCharU).style.display = "none";
						document.getElementById(tmpKeypadIdCharL).style.display = "block";
						document.getElementById(tmpKeypadIdCharL).style.left = nFilterTargetX;
						document.getElementById(tmpKeypadIdCharL).style.top = nFilterTargetY;
						nFilterIsKeypadNowL = true;
						nFilterIsKeypadNowU = false;
						nFilterIsKeypadNowS = false;
						nFilterIsKeyShiftNow = false;
					} else if(nFilterIsElementExist(tmpKeypadIdCharU) && nFilterIsElementExist(tmpKeypadIdCharS)) {
						document.getElementById(tmpKeypadIdCharU).style.display = "none";
						document.getElementById(tmpKeypadIdCharS).style.display = "block";
						document.getElementById(tmpKeypadIdCharS).style.left = nFilterTargetX;
						document.getElementById(tmpKeypadIdCharS).style.top = nFilterTargetY;
						nFilterIsKeypadNowL = false;
						nFilterIsKeypadNowU = false;
						nFilterIsKeypadNowS = false;
						nFilterIsKeyShiftNow = false;
					}
				} else {
					
					if(nFilterKeypadShowType != 0 && !nFilterIsMaskMatch(nFilterKeypadShowType, "0010")) {
						return false;
					}
					
					if(nFilterIsElementExist(tmpKeypadIdCharL) && nFilterIsElementExist(tmpKeypadIdCharU)) {
						document.getElementById(tmpKeypadIdCharL).style.display = "none";
						document.getElementById(tmpKeypadIdCharU).style.display = "block";
						document.getElementById(tmpKeypadIdCharU).style.left = nFilterTargetX;
						document.getElementById(tmpKeypadIdCharU).style.top = nFilterTargetY;
						nFilterIsKeypadNowL = false;
						nFilterIsKeypadNowU = true;
						nFilterIsKeypadNowS = false;
						nFilterIsKeyShiftNow = false;
					}
					if(nFilterIsElementExist(tmpKeypadIdCharS) && nFilterIsElementExist(tmpKeypadIdCharU)) {
						document.getElementById(tmpKeypadIdCharS).style.display = "none";
						document.getElementById(tmpKeypadIdCharU).style.display = "block";
						document.getElementById(tmpKeypadIdCharU).style.left = nFilterTargetX;
						document.getElementById(tmpKeypadIdCharU).style.top = nFilterTargetY;
						nFilterIsKeypadNowL = false;
						nFilterIsKeypadNowU = true;
						nFilterIsKeypadNowS = false;
						nFilterIsKeyShiftNow = false;
					}
				}
			}
		} else if(inputKeyId == "nfilter_shift" || inputKeyId == "nfilter_shift_u"
			|| inputKeyId == "nfilter_shift_l_mobile" || inputKeyId == "nfilter_shift_u_mobile" || inputKeyId == "nfilter_shift_s_mobile") {
			
			

			if(nFilterIsKeypadNowS) {
				return false;
			}

			if( inputKeyId == "nfilter_shift_s_mobile") {
				
				return false;
			}

			
	    	
			
	    	

			if(inputKeyId == "nfilter_shift" || inputKeyId == "nfilter_shift_l_mobile") { 
				
				if(nFilterKeypadShowType != 0 && !nFilterIsMaskMatch(nFilterKeypadShowType, "0010")) {
					
					return false;
				}
				if(nFilterIsElementExist(tmpKeypadIdCharU) && nFilterIsElementExist(tmpKeypadIdCharL)) {
					document.getElementById(tmpKeypadIdCharL).style.display = "none";
					document.getElementById(tmpKeypadIdCharU).style.display = "block";
					document.getElementById(tmpKeypadIdCharU).style.left = nFilterTargetX;
					document.getElementById(tmpKeypadIdCharU).style.top = nFilterTargetY;
					nFilterIsKeypadNowL = false;
					nFilterIsKeypadNowU = true;
					nFilterIsKeyShiftNow = true;
				}
			} else { 
				
				if(nFilterKeypadShowType != 0 && !nFilterIsMaskMatch(nFilterKeypadShowType, "0001")) {
					return false;
				}
				if(nFilterIsElementExist(tmpKeypadIdCharL) && nFilterIsElementExist(tmpKeypadIdCharU)) {
					document.getElementById(tmpKeypadIdCharU).style.display = "none";
					document.getElementById(tmpKeypadIdCharL).style.display = "block";
					document.getElementById(tmpKeypadIdCharL).style.left = nFilterTargetX;
					document.getElementById(tmpKeypadIdCharL).style.top = nFilterTargetY;
					nFilterIsKeypadNowL = true;
					nFilterIsKeypadNowU = false;
					nFilterIsKeyShiftNow = false;
				}
			}
			
		} else if(inputKeyId == "nfilter_change_eng" || inputKeyId == "nfilter_change_special" ||  inputKeyId == "nfilter_change_mobile") {
			
			
	    	
			
	    	
			if( nFilterClassActiveState ) nFilterClassActive( inputKeyId );
			if(inputKeyId == "nfilter_change_mobile") {
				
				var nFilterMobileOn = document.getElementById("nfilter_change_mobile").src;
				
				if( nFilterSiteCode == "busan" ){
				if(document.getElementById("nfilter_change_mobile").src.indexOf("change_mobile.png")!=-1){
					nFilterMobileOn=nFilterMobileOn.replace(".png",".gif");
					document.getElementById("nfilter_change_mobile").setAttribute("src", nFilterMobileOn);
				}else{
					
					nFilterMobileOn=nFilterMobileOn.replace(".gif",".png");
					document.getElementById("nfilter_change_mobile").setAttribute("src", nFilterMobileOn);
				}
				
				}
				
				
				if(nFilterIsKeypadNowS) {
					if(nFilterIsElementExist(tmpKeypadIdCharL)) {
						if(nFilterKeypadShowType != 0 && !nFilterIsMaskMatch(nFilterKeypadShowType, "0001")) {
							return false;
						}
						document.getElementById(tmpKeypadIdCharS).style.display = "none";
						document.getElementById(tmpKeypadIdCharL).style.display = "block";
						document.getElementById(tmpKeypadIdCharL).style.left = nFilterTargetX;
						document.getElementById(tmpKeypadIdCharL).style.top = nFilterTargetY;
						nFilterIsKeypadNowL = true;
						nFilterIsKeypadNowU = false;
						nFilterIsKeypadNowS = false;
					} else if(nFilterIsElementExist(tmpKeypadIdCharU)) {
						if(nFilterKeypadShowType != 0 && !nFilterIsMaskMatch(nFilterKeypadShowType, "0010")) {
							return false;
						}
						document.getElementById(tmpKeypadIdCharS).style.display = "none";
						document.getElementById(tmpKeypadIdCharU).style.display = "block";
						document.getElementById(tmpKeypadIdCharU).style.left = nFilterTargetX;
						document.getElementById(tmpKeypadIdCharU).style.top = nFilterTargetY;
						nFilterIsKeypadNowL = false;
						nFilterIsKeypadNowU = true;
						nFilterIsKeypadNowS = false;
					}
				} else {
					if(nFilterKeypadShowType != 0 && !nFilterIsMaskMatch(nFilterKeypadShowType, "0100")) {
						return false;
					}
					if(nFilterIsElementExist(tmpKeypadIdCharL)) {
						document.getElementById(tmpKeypadIdCharL).style.display = "none";
						nFilterIsKeypadNowL = false;
					}
					if(nFilterIsElementExist(tmpKeypadIdCharU)) {
						document.getElementById(tmpKeypadIdCharU).style.display = "none";
						nFilterIsKeypadNowU = false;
					}
					if(nFilterIsElementExist(tmpKeypadIdCharS)) {
						document.getElementById(tmpKeypadIdCharS).style.display = "block";
						document.getElementById(tmpKeypadIdCharS).style.left = nFilterTargetX;
						document.getElementById(tmpKeypadIdCharS).style.top = nFilterTargetY;
						nFilterIsKeypadNowS = true;
					}
				}
				nFilterIsKeyShiftNow = false;
			} else if(inputKeyId == "nfilter_change_eng") {
				
				if(nFilterKeypadShowType != 0 && (!nFilterIsMaskMatch(nFilterKeypadShowType, "0001") || !nFilterIsMaskMatch(nFilterKeypadShowType, "0010"))) {
					return false;
				}
				
				if(nFilterIsElementExist(tmpKeypadIdCharS) && nFilterIsElementExist(tmpKeypadIdCharL)) {
					document.getElementById(tmpKeypadIdCharS).style.display = "none";
					document.getElementById(tmpKeypadIdCharL).style.display = "block";
					document.getElementById(tmpKeypadIdCharL).style.left = nFilterTargetX;
					document.getElementById(tmpKeypadIdCharL).style.top = nFilterTargetY;
					nFilterIsKeypadNowL = true;
					nFilterIsKeypadNowU = false;
					nFilterIsKeypadNowS = false;
				} else if(nFilterIsElementExist(tmpKeypadIdCharS) && nFilterIsElementExist(tmpKeypadIdCharU)) {
					document.getElementById(tmpKeypadIdCharS).style.display = "none";
					document.getElementById(tmpKeypadIdCharU).style.display = "block";
					document.getElementById(tmpKeypadIdCharU).style.left = nFilterTargetX;
					document.getElementById(tmpKeypadIdCharU).style.top = nFilterTargetY;
					nFilterIsKeypadNowL = false;
					nFilterIsKeypadNowU = true;
					nFilterIsKeypadNowS = false;
				}
			} else { 
				
				if(nFilterKeypadShowType != 0 && !nFilterIsMaskMatch(nFilterKeypadShowType, "0100")) {
					return false;
				}
				
				if(nFilterIsElementExist(tmpKeypadIdCharU) && nFilterIsElementExist(tmpKeypadIdCharS)) {
					document.getElementById(tmpKeypadIdCharU).style.display = "none";
					document.getElementById(tmpKeypadIdCharS).style.display = "block";
					document.getElementById(tmpKeypadIdCharS).style.left = nFilterTargetX;
					document.getElementById(tmpKeypadIdCharS).style.top = nFilterTargetY;
				}
				if(nFilterIsElementExist(tmpKeypadIdCharL) && nFilterIsElementExist(tmpKeypadIdCharS)) {
					document.getElementById(tmpKeypadIdCharL).style.display = "none";
					document.getElementById(tmpKeypadIdCharS).style.display = "block";
					document.getElementById(tmpKeypadIdCharS).style.left = nFilterTargetX;
					document.getElementById(tmpKeypadIdCharS).style.top = nFilterTargetY;
				}
				nFilterIsKeypadNowL = false;
				nFilterIsKeypadNowU = false;
				nFilterIsKeypadNowS = true;
			}
			nFilterIsKeyShiftNow = false;
		} else {
	    	
			if(typeof nFilterExtBeforeDataKeyInput == "function") {
				var extBeforeDataKeyInput = nFilterExtBeforeDataKeyInput();
			}
				
	    	
	    	
	    	
			
			if( nFilterIsMobileRequest && nFilterInputDisplayElement.value.length >= nFilterGetMaxLength(nFilterInputDisplayElement.id) 
					|| touchUse  && nFilterInputDisplayElement.value.length >= ( nFilterGetMaxLength(nFilterInputDisplayElement.id) ) ) {
			
				
				return;
			}else{
				
				
				
			}
			
			
			
			

			
			if(inputKeyId.length >= nFilterKeypadIdDummy.length && inputKeyId.indexOf(nFilterKeypadIdDummy) != -1) {
			} else {
				if(nFilterSecElement.length > 0) {
					nFilterInputTargetElement.value = "";
					
					
					nFilterSecElement =  nFilterSecElement+inputKeyId;
				} else {
					nFilterInputTargetElement.value = "";
					
					nFilterSecElement = inputKeyId;
				}
			}
			
			
			
			if(nFilterIsNoSecretKeypad == false) {
				nFilterInputDisplayElement.value +=  "*";

				if(nFilterIsElementExist("nfilter_tmp_editview")) {
					
					if(nFilterIsMobileRequest){		
						if (nFilterInputDisplayElement.value.length <= inputMaxMobile ){
							document.getElementById("nfilter_tmp_editview").innerHTML += "&bull;";
							}	
					}else if (nFilterInputDisplayElement.value.length <= inputMax ){
						document.getElementById("nfilter_tmp_editview").innerHTML += "&bull;";
						
						}		
					
				}
				
				if(nFilterIsElementExist("nfilter_tmp_editview_num")) {
					if(nFilterIsMobileRequest){	
					
							if (nFilterInputDisplayElement.value.length <= inputMaxMobileNum ){
								document.getElementById("nfilter_tmp_editview_num").innerHTML += "&bull;";
								}		
						
						
				}else if (nFilterInputDisplayElement.value.length <= inputMaxNum ){
					document.getElementById("nfilter_tmp_editview_num").innerHTML += "&bull;";
					}
					
				}	
			} else {
				var nFilterInputValue = "";
							
				
				if(inputKeyId.indexOf(nFilterKeypadIdDummy) > -1) {
				
					return true;
				}
				
				if(inputKeyId == "$nfilter_quot;") {
					nFilterInputDisplayElement.value += "'";
				} else if(inputKeyId == "$nfilter_apos;") {
					nFilterInputDisplayElement.value += '"';
				} else if(inputKeyId == "$nfilter_backslash;") {
					nFilterInputDisplayElement.value += "\\";
				} else if(inputKeyId == "$nfilter_shop;") {
					nFilterInputDisplayElement.value += "#";
				} else if(inputKeyId == "$nfilter_percent;") {
					nFilterInputDisplayElement.value += "%";
				} else if(inputKeyId == "$nfilter_amp;") {
					nFilterInputDisplayElement.value += "&";
				} else { 
					if (isMoneyFormatting()) {
					if (nFilterInputDisplayElement.value.charAt(0) == 0 ) {
						nFilterInputDisplayElement.value = inputKeyId;
						nFilterInputValue =inputKeyId;
						
					}else {
						
						nFilterInputDisplayElement.value += inputKeyId;
						nFilterInputValue +=inputKeyId;
					}
					
				}else {
					nFilterInputDisplayElement.value += inputKeyId;
					nFilterInputValue +=inputKeyId;
				}
				}
				
				if(nFilterIsElementExist("nfilter_tmp_editview")) {
					if(nFilterIsMobileRequest){
						
							var tmpEditviewNumValue = nFilterInputDisplayElement.value;			
							document.getElementById("nfilter_tmp_editview").innerHTML = tmpEditviewNumValue.substring(nFilterInputDisplayElement.value.length-inputMaxMobile,nFilterInputDisplayElement.value.length+3);

						
					}else if (nFilterInputDisplayElement.value.length <= inputMax ){
						var tmpEditviewNumValue = nFilterInputDisplayElement.value;			
						document.getElementById("nfilter_tmp_editview").innerHTML = tmpEditviewNumValue.substring(nFilterInputDisplayElement.value.length-8,nFilterInputDisplayElement.value.length+3);
					}
				}
				
				
				if(nFilterIsElementExist("nfilter_tmp_editview_num")) {
					
					if(nFilterIsMobileRequest){		
							
							if (isMoneyFormatting()) {
								if ( nFilterInputDisplayElement.value.charAt(0) == "0" && nFilterInputDisplayElement.value.charAt(1) == "0"  ) {
									return;
									
							}else {
								nFilterInputDisplayElement.value = currencyComma( nFilterInputDisplayElement.value );
								var tmpEditviewNumValue = nFilterInputDisplayElement.value;	
									document.getElementById("nfilter_tmp_editview_num").innerHTML = tmpEditviewNumValue.substring(nFilterInputDisplayElement.value.length-inputMaxMobileNum,nFilterInputDisplayElement.value.length+1);
							}
							}else {
								
								var tmpEditviewNumValue = nFilterInputDisplayElement.value;	
								document.getElementById("nfilter_tmp_editview_num").innerHTML = tmpEditviewNumValue.substring(nFilterInputDisplayElement.value.length-inputMaxMobileNum ,nFilterInputDisplayElement.value.length+3);
							}
					}else if (nFilterInputDisplayElement.value.length <= inputMaxNum ){
						
						if (isMoneyFormatting()) {
							
							if ( nFilterInputDisplayElement.value.charAt(0) == "0" && nFilterInputDisplayElement.value.charAt(1) == "0" ) {
									}else {
										
										nFilterInputDisplayElement.value = currencyComma( nFilterInputDisplayElement.value );
										var tmpEditviewNumValue = nFilterInputDisplayElement.value;	
											document.getElementById("nfilter_tmp_editview_num").innerHTML = tmpEditviewNumValue.substring(nFilterInputDisplayElement.value.length-5,nFilterInputDisplayElement.value.length+1);
										
									}
							}else {
								
							var tmpEditviewNumValue = nFilterInputDisplayElement.value;	
							document.getElementById("nfilter_tmp_editview_num").innerHTML = tmpEditviewNumValue.substring(nFilterInputDisplayElement.value.length-5,nFilterInputDisplayElement.value.length+3);
							
						}
							
					}
				}
			}
			
			
			
			
			if(nFilterImageRenderType == nFilterImageRenderTypeE && nFilterIsMobileRequest) {
				if(nFilterIsKeypadNowL || nFilterIsKeypadNowU || nFilterIsKeypadNowS) {
					if(nFilterIsElementExist(nFilterKeypadIdPreviewChar)) {
						document.getElementById(nFilterKeypadIdPreviewChar).src = document.getElementById(inputKeyId).src;
						nFilterSetImageVisible(nFilterKeypadIdPreviewChar, true);
						window.setTimeout(function() { nFilterSetImageVisible(nFilterKeypadIdPreviewChar, false);}, 600);
					}
					
				} else {
					if(nFilterIsElementExist(nFilterKeypadIdPreviewChar)) {
						document.getElementById(nFilterKeypadIdPreviewNum).src = document.getElementById(inputKeyId).src;
						nFilterSetImageVisible(nFilterKeypadIdPreviewNum, true);
						window.setTimeout(function() { nFilterSetImageVisible(nFilterKeypadIdPreviewNum, false);}, 600);
					}
					
				}
			}
			
			
			
			if(nFilterIsInputShow) {
				if(typeof nFilterExtE2EImpl == "function") {
					nFilterExtE2EImpl(nFilterInputDisplayElement.id, "add", inputImageUrl);
				}
			}

			
			if(nFilterIsKeyShiftNow) {
				if(nFilterIsKeypadNowL) {
					if(nFilterIsElementExist(tmpKeypadIdCharU) && nFilterIsElementExist(tmpKeypadIdCharL)) {
						document.getElementById(tmpKeypadIdCharL).style.display = "none";
						document.getElementById(tmpKeypadIdCharU).style.display = "block";
						document.getElementById(tmpKeypadIdCharU).style.left = nFilterTargetX;
						document.getElementById(tmpKeypadIdCharU).style.top = nFilterTargetY;
					} 
				} else {
					if(nFilterIsElementExist(tmpKeypadIdCharL) && nFilterIsElementExist(tmpKeypadIdCharU)) {
						document.getElementById(tmpKeypadIdCharU).style.display = "none";
						document.getElementById(tmpKeypadIdCharL).style.display = "block";
						document.getElementById(tmpKeypadIdCharL).style.left = nFilterTargetX;
						document.getElementById(tmpKeypadIdCharL).style.top = nFilterTargetY;
					}
				}
				nFilterIsKeyShiftNow = false;
			}
			
			
			var checkElement = nFilterInputDisplayElement.value;
			if( isMoneyFormatting() ){
				checkElement =checkElement.replace(/,/g, "");
			}
			
			
			if( checkElement.length >= nFilterGetMaxLength(nFilterInputDisplayElement.id)) {
				
				if(nFilterImageRenderType == nFilterImageRenderTypeE) {
					if(nFilterIsKeypadNowL || nFilterIsKeypadNowU || nFilterIsKeypadNowS) {
						if(nFilterIsMobileRequest) {
							
						} else {
							
							if(  touchUse  && nFilterInputDisplayElement.value.length >= nFilterGetMaxLength(nFilterInputDisplayElement.id) ) {
								return;
							}
							
							nFilterClick(document.getElementById("nfilter_enter_char"));
							
						}
					} else {
						if(nFilterIsMobileRequest) {
							
						} else {
							if(  touchUse  && nFilterInputDisplayElement.value.length >= nFilterGetMaxLength(nFilterInputDisplayElement.id) ) {
								return;
							}
							nFilterOnKeyClick(document.getElementById("nfilter_enter_num"));
						}
					}
				} else {
					if(nFilterIsKeypadNowL || nFilterIsKeypadNowU || nFilterIsKeypadNowS) {
						if(nFilterIsMobileRequest) {
							
						} else {
							if(  touchUse  && nFilterInputDisplayElement.value.length >= nFilterGetMaxLength(nFilterInputDisplayElement.id) ) {
								return;
							}
							nFilterOnKeyClick("nfilter_enter_char");
						}
					} else {
						if(nFilterIsMobileRequest) {
							
						} else {
							if(  touchUse  && nFilterInputDisplayElement.value.length >= nFilterGetMaxLength(nFilterInputDisplayElement.id) ) {
								return;
							}
							nFilterOnKeyClick("nfilter_enter_num");
						}
					}
				}
			}

			
			
	    	
			if(typeof nFilterExtAfterDataKeyInput == "function") {
				var extAfterDataKeyInput = nFilterExtAfterDataKeyInput();
			}
			
		}
		
		
		

	}

	
	
	
	function nFilterCSProcess(targetElementValue, responseElementId) {

	    
		
	    
		
		
		
	    
	    
	    var requestParam = nFilterRequestParamSecretValue + "=" + targetElementValue + "&" + "cs_public_key=" + nFilterCSPublicKey;

		nFilterAsyncRequest(nFilterContextPath + "/"+nFilterServiceNameCSManager, requestParam, function() {
			
			if(nFilterXmlHttp.readyState==4 && nFilterXmlHttp.status==200) {
				

				if(nFilterResponseErrCdPrefix == nFilterXmlHttp.responseText.substr(0, 8)) {
				
					
					

					if(responseElementId != undefined && responseElementId != "") {
						if(typeof nFilterExtExceptionCallBack == "function") {
							nFilterExtExceptionCallBack(nFilterXmlHttp.responseText, responseElementId);
						}
					} else {
						document.getElementById("nfilter_document").innerHTML = nFilterXmlHttp.responseText;
						document.getElementById("nfilter_document").style.display = "block";
					}
				} else {
					
					try {
						

						location.href = nFilterCSReturnURL + "?encdata=" + nFilterXmlHttp.responseText;
						
						if(typeof nFilterExtAfterCSForword == "function") {
							nFilterExtAfterCSForword();
						}
				        //e.preventDefault(); 
				    } catch(e) {
				    	
						if(responseElementId != "") {
							if(typeof nFilterExtExceptionCallBack == "function") {
								nFilterExtExceptionCallBack("ErrCode:120, ErrMsg:CS Module Interface Error", responseElementId);
							}
						} else {
							document.getElementById("nfilter_document").innerHTML = "ErrCode:120, ErrMsg:CS Module Interface Error";
							document.getElementById("nfilter_document").style.display = "block";
						}
						
				    }
				}
		    }
		});
	}
	
	

	
	
	
	
	
	function setNFilterCallBackType(callbackType) {
		nFilterResponseErrCallBackType  = callbackType;
	}

	
	function setNFilterCSPublicKey(sessionPublicKey){
		nFilterCSPublicKey = sessionPublicKey;
	}

	
	function setNFilterCSReturnURL(csReturnUrl){
		nFilterCSReturnURL = csReturnUrl;
	}
	
	
	function setNFilterLanguage(requestLanguage){
		if(requestLanguage != null && requestLanguage != undefined && requestLanguage != "") {
			nFilterLanguage = requestLanguage;
		}
	}
	
	
	function setNFilterLoadingStatusEnable(isEnable) {
		
		nFilterLoadingStatusEnabled  = isEnable;
	}

	
	function setNFilterPositionCode(positionCode) {
		
		
		nFilterPositionCode = positionCode;
		
		
	}

	
	function setNFilterPositionElement(positionElementId) {
		if(nFilterIsElementExist(positionElementId)) {
			
			nFilterPositionElementId = positionElementId;
			
		}
	}

	
	function setNFilterInputAutoFocusEnable() {
		nFilterInputAutoFocus = true;
	}

	
	function setNFilterEnableNoSecret(isEnable) {
		nFilterEnableNoSecretKeypad = isEnable;
	}

	
	
	function nFilterEncrypted(displayEleementId) {
		var returnSecretValue = "";
		var inputValue = "";
		
		if(displayEleementId != undefined && displayEleementId != "") {
			var targetElement = document.getElementById(displayEleementId + nFilterKeypadIdTargetSuffix);

			if(targetElement != undefined && targetElement != null) {
				if(nFilterIsEncryptImmediate == true) {
					inputValue = targetElement.value;
				} else {
					
					if( nFilterIsNoSecretKeypad ) {
						returnSecretValue = nFilterInputEncrypt(nFilterKeypadIdNoSecretPrefix + targetElement.value);
					} else {
						returnSecretValue = nFilterInputEncrypt(targetElement.value);
					}
				}
			}
		} else {
			var secElements = document.getElementsByTagName("input");

			
			
	 		for(var i=0; i<secElements.length; i++) {

	 			
	 	 		
	 			
	 			
	 			if(secElements[i].type != undefined && secElements[i].type == "hidden" && secElements[i].id != undefined && secElements[i].id.indexOf(nFilterKeypadIdTargetSuffix) > -1) {
	 				if(secElements[i].value != undefined && secElements[i].value != "") {
	 					if(nFilterIsEncryptImmediate == true) {
	 	 					inputValue = secElements[i].value;
	 					} else {
		 					
		 					
	 						if( nFilterIsNoSecretKeypad ) {
	 							inputValue = nFilterInputEncrypt(nFilterKeypadIdNoSecretPrefix + targetElement.value);
		 					} else {
		 	 					inputValue = nFilterInputEncrypt(secElements[i].value);
		 					}
	 					}
	 				} else {
	 					inputValue = "";
	 				}

	 				if(inputValue != "") {
	 	 				if(returnSecretValue == "") {
	 	 	 				returnSecretValue = secElements[i].id.substring(0, secElements[i].id.indexOf(nFilterKeypadIdTargetSuffix)) + "=" + inputValue;
	 	 				} else {
	 	 	 				returnSecretValue += "|" + secElements[i].id.substring(0, secElements[i].id.indexOf(nFilterKeypadIdTargetSuffix)) + "=" + inputValue;
	 	 				}
	 				}
	 			}
	 		}
			
		}
		
		return returnSecretValue;
	}
	
	
    
    
    
	
	

    
    
    

	
	
	
	
	
	
	
	
	
	
	
	
	nFilterMsgKeypadLoading["ko"] = "보안키패드 작동 중";
	nFilterMsgKeypadLoading["en"] = "Virtual Keyboard Loading";
	nFilterMsgKeypadLoading["ve"] = "Virtual Keyboard Loading";
	nFilterMsgKeypadLoading["vn"] = nFilterMsgKeypadLoading["ve"];
	nFilterMsgKeypadLoading["ja"] = "Virtual Keyboard Loading";
	
	nFilterMsgMinCheck["ko"] = "[가상키보드] 최소 #1자 이상 입력하셔야합니다.";
	nFilterMsgMinCheck["en"] = "[Virtual Keyboard] You must enter at least #1 characters.";
	nFilterMsgMinCheck["ve"] = "[Virtual Keyboard] Bạn phải nhập ít nhất #1 ký tự";
	nFilterMsgMinCheck["vn"] = nFilterMsgMinCheck["ve"];
	nFilterMsgMinCheck["ja"] = "[ソフトウェアキーボード] 最小#1文字以上、入力して下さい。";

	nFilterMsgMaxCheck["ko"] = "[가상키보드] 최대 #1자 이하까지 입력하실 수 있습니다.";
	nFilterMsgMaxCheck["en"] = "[Virtual Keyboard] You must enter at most #1 characters.";
	
	nFilterMsgMaxCheck["ve"] = "[Virtual Keyboard] Bạn phải nhập lên #1 ký hơn";
	nFilterMsgMaxCheck["vn"] = nFilterMsgMaxCheck["ve"];
	nFilterMsgMaxCheck["ja"] = "[ソフトウェアキーボード] 最大#1文字以下、入力して下さい。";

	var nFilterSubTitle = "Sub Title";

    
	
    

	
	function nFilterExtExceptionCallBack(errorData, responseElementId) {

		
		
		nFilterResponseErrorCode = nFilterParseErrorCode(errorData);
		nFilterResponseErrorMessage = nFilterParseErrorMessage(errorData);
		
		switch(nFilterResponseErrCallBackType) {
		
			case "alert":
				alert("ErrorCode: " + nFilterResponseErrorCode + "\n" + "ErrorMessage: " + nFilterResponseErrorMessage);
				break;
	
			case "display":
				if(responseElementId != "") {
					document.getElementById(responseElementId).value = errorData;
					document.getElementById(responseElementId).style.display = "block";
					document.getElementById(responseElementId).style.visibility = "visible";
				} else {
					document.getElementById("nfilter_document").innerHTML = errorData;
					document.getElementById("nfilter_document").style.display = "block";
					document.getElementById("nfilter_document").style.visibility = "visible";
				}
				break;
	
			case "status":
				window.defaultStatus = errorData;
				break;
	
			default: 
				document.getElementById("nfilter_document").innerHTML = errorData;
				document.getElementById("nfilter_document").style.display = "block";
				document.getElementById("nfilter_document").style.visibility = "visible";
				break;
		}
	}


	
	function nFilterExtMessageHandler(message) {

		
	
		switch(nFilterResponseErrCallBackType) {

			case "alert":
				setTimeout(function() {  alert( message); }, 0);
				break;
	
			case "display":
				setTimeout(function() { alert(message); }, 0);
				break;
	
			case "status":
				window.defaultStatus = message;
				break;
	
			default: 
				if( nFilterOSInfo == "iPhone" && nFilterOSInfo == 'iPod' && nFilterOSInfo == "iPad" ){
					setTimeout(function() {  alert(message); }, 0);
				}else {
					alert(message);
				}
				break;
					
				
		}
	}

	
	
	function nFilterExtE2EImpl(displayElementId, e2eAction, imageUrl) {

		
		if(nFilterImageRenderType != "e") {
			alert("통이미지 방식의 경우, 데이터 최소화를 위해 개별 이미지 Secret Code를 Session에 저장시키지 않고 있어 기능 제공 불가"
					+ "\n필요시 통이미지 방식에서도 지원하도록 수정가능");
			return true;
		}
		
		var displayElement = document.getElementById(displayElementId + "_e2e");

		switch(e2eAction) {
		
			case "add":
				displayElement.innerHTML = '<img src="' + imageUrl + '">';
				break;
	
			case "delete":
				displayElement.innerHTML = displayElement.innerHTML.substring(0, displayElement.innerHTML.toLowerCase().lastIndexOf("<img src=")); 
				break;
	
			case "clear":
				displayElement.innerHTML = "";
				break;
		}
	}
	

	
	
	
	
	
	function nFilterExtBeforeInit(args) {
		
		
		return true;
	}
	function nFilterExtAfterInit(args) {
		
		
		return true;
	}

	
	function nFilterExtBeforeFunctionKeyInput(args) {
		
		
		return true;
	}
	function nFilterExtAfterFunctionKeyInput(args) {
		
		
		return true;
	}

	
	function nFilterExtBeforeDataKeyInput(args) {
		
		var oasEnabled = nFilterExtOasVerifyDisable();
		
		
		return oasEnabled;
	}
	
	function nFilterExtAfterDataKeyInput(args) {
		
		scCardNumClone();
		var oasEnabled = nFilterExtOasVerifyEnable();
		
		
		if( isMoneyFormatting() ){
			nFilterInputDisplayElement.value = currencyComma( nFilterInputDisplayElement.value );
		}
		
		return oasEnabled;
	}
	
	
	function nFilterExtRegistEventOnKeyDownUp() {
		
		document.onkeydown = function(e) {
			if(window.event) {
				keyCode = window.event.keyCode;
			} else if(e) {
				keyCode = e.which;
			}
			if(keyCode == 27) {
				//return false;
				if( NFILTERSET == nFilterDefaultDirectButton && ! nFilterInputDisplayElement.getAttribute("curconfirm") ) {
					nFilterInputDisplayElement.setAttribute("directkey", "on");
				}
				
				nFilterClose();
			}
			return true;
		};
		
		document.onkeyup = function(e) {
			if(window.event) {
				keyCode = window.event.keyCode;
			} else if(e) {
				keyCode = e.which;
			}
			if(keyCode == 27) { 
				//return false; 
				if( NFILTERSET == nFilterDefaultDirectButton && ! nFilterInputDisplayElement.getAttribute("curconfirm") ) {
					nFilterInputDisplayElement.setAttribute("directkey", "on");
				}
				
				nFilterConfirmClose();
				
				nFilterClose();
			}
			return true;
		};
	}



    
	
    

	function nFilterExtOasVerifyDisable() {
		
		
	    var MKD25 = document.getElementById("MKD25");
	    
	    if(MKD25 != undefined && MKD25 != null) {
	       	MKD25.SkipVerify(0);
	    } else {
			return false;
	    }
		return true;
		
	}
	function nFilterExtOasVerifyEnable() {
		
		
	    var MKD25 = document.getElementById("MKD25");
	    
	    if(MKD25 != undefined && MKD25 != null) {
	       	MKD25.SkipVerify(1);
	    } else {
			return false;
	    }
		return true;
	}
	
    
	
    

	var NFILTERSET = 2;
	
	var nFilterOff = 0;
	var nFilterDefault = 1;
	var nFilterDefaultClose = 2; 
	var nFilterDefaultDirect = 3;
	var nFilterDefaultDirectButton = 4; 
	var nFilterDefaultButtonOrDirect = 5; 
	var nFilterDirectButton = 6; 
	var nFilterButton = 7; 
	var nFilterBtnDefOnly = 8;	
	
	var nFilterExtKeypadTypeInitBinary = "";
	var nFilterExtDisplayElementId = "";
	var nFilterExtOption = "";

	function setNFilterExtSET(){
		if( nFilterSiteCode == "shinhan" ){
			
			nFilterClassActiveBackground( "nfilter_change_mobile|#e67e22|#4a4d54&nfilter_clear_mobile|#e67e22|#4a4d54&nfilter_close_char_mobile|#FFFFFF|#4a4d54" );
			
			if( NFILTERSET == nFilterDefault ){
				NFILTERSET = 	nFilterDefaultClose;
			}else if( NFILTERSET != nFilterDefaultClose && NFILTERSET != nFilterDefaultDirect 
					&& NFILTERSET != nFilterDefaultDirectButton && NFILTERSET != nFilterDefaultButtonOrDirect ){
				NFILTERSET = 	nFilterDefaultButtonOrDirect;
			}
			
		}
		
	}
	
	function setNFilterCommon(obj, strAttribute) {
		setNFilter(obj.id, "minlengths="+obj.getAttribute( "minlengths" ) +",maxlengths="+ obj.getAttribute( "maxlength" ) +",nfilter=on,padType=type1,keyType=type1,"+strAttribute);
	     
	}

	
	
	var nFilterTypeArray = new Array;
	var nFilterTypeString = "";
	
	function setNFilter(id, strAttribute) {

		nFilterExtDisplayElementId = id;
		
		if(!nFilterIsElementExist(id)) {
			return false;
		}
		
		if( typeof getDomainInfo == "function" ){ 
			NFILTERSET = getDomainInfo("nFilterOption"); 
		}else{
			NFILTERSET = 2;
		}
		
		setNFilterExtSET();

		if(NFILTERSET == nFilterOff) return false;
		
		var input = document.getElementById(id);
		var ary= strAttribute.split(",");
		setNFilterIconImage( input );
		
		if(input != null && input != "undefined") {
			
			var keypadShowTypeBinary = "";
			var keypadIdType = "";
			
			for(var i=0;i<ary.length;i++) {
				
				var typeCheck = false;
					if (input.type == "password") {
						typeCheck = true;
				}else {
					typeCheck = false;
				}
					keypadIdType=input.id+"&"+typeCheck+"|";
				
				var tmp = ary[i]; 
				var name = tmp.substr(0,tmp.indexOf("="));
				var value = tmp.substr(ary[i].indexOf("=") + 1);
				
				if( name == "curConfirm" ){
					var f_input = document.getElementById( value );
					var m_input = document.getElementById( input.getAttribute("confirm") );
					
					f_input.setAttribute(name,value);
					f_input.setAttribute( "confirm1", m_input.id );
					f_input.setAttribute( "confirm2", input.id );
					document.getElementById( input.getAttribute("confirm") ).setAttribute(name,value);
					input.setAttribute(name,value);
					
				} else {
					input.setAttribute(name,value);
					
				}
				input.blur();
				if( NFILTERSET == nFilterDefaultButtonOrDirect  ) {
					input.setAttribute("directkey", "on");
				}else{
					input.setAttribute("directkey", "off");
					input.readOnly = true;
				}

		    	
				
		    	
				var currentKeypadTypeInt = 0;
				
				if( nFilterExtKeypadTypeInitBinary != "" ) {
					currentKeypadTypeInt = parseInt(nFilterExtKeypadTypeInitBinary, 2);
				}
				
				if( name == "mode" ) {
					if( value == "number"  || value == "num" ) {
						keypadShowTypeBinary = "1000";
						nFilterKeypadType = parseInt(keypadShowTypeBinary.toString, 2);
						
						if(nFilterIsMaskMatch(currentKeypadTypeInt, "0001") || nFilterIsMaskMatch(currentKeypadTypeInt, "0010") || nFilterIsMaskMatch(currentKeypadTypeInt, "0100")) {
							nFilterExtKeypadTypeInitBinary = "1111";
							nFilterKeypadType = parseInt(nFilterExtKeypadTypeInitBinary, 2);
						} else {
							nFilterExtKeypadTypeInitBinary = "1000";
							nFilterKeypadType = parseInt(nFilterExtKeypadTypeInitBinary, 2);
						}
					} else {
						
						keypadShowTypeBinary = "0111";
						nFilterKeypadType = parseInt(keypadShowTypeBinary.toString, 2);

						if(nFilterIsMaskMatch(currentKeypadTypeInt, "1000")) {
							nFilterExtKeypadTypeInitBinary = "1111";
							nFilterKeypadType = parseInt(nFilterExtKeypadTypeInitBinary, 2);
						} else {
							nFilterExtKeypadTypeInitBinary = "0111";
							nFilterKeypadType = parseInt(nFilterExtKeypadTypeInitBinary, 2);
						}
					}
					
				}
				
				
				
				
				nFilterExtKeypadTypeInitBinary = "1111";
				
				if(name == "lang") {
					
					if(value == "ko" || value == "en" || value == "ve" || value == "vn"  || value == "ja"  ) {
						setNFilterLanguage( value );
					}
				}
				
			}
			nFilterTypeString +=keypadIdType;
			if( NFILTERSET == nFilterDefault || NFILTERSET == nFilterDefaultClose){
				input.readOnly = true; 
			}
			

		    	
				
		    	
			if( NFILTERSET == nFilterDefaultDirectButton || NFILTERSET == nFilterDefaultDirect ) {
				
				input.onclick = function( ) {
					setNFilterInputAutoFocusEnable();
					if( input.getAttribute( "directkey" ) &&  input.getAttribute( "directkey" ) == "on" ){
						if(getNFilterBrowerInfo() == "IE7" || getNFilterBrowerInfo() == "Firefox") {
							input.disabled = false;
						}else{
							input.readOnly = false;
						}
					}else{
						nFilterKeypadShowExt(keypadShowTypeBinary, input.id + "_nfilter_sec", input.id);
					}
				};
			  	
			}else if( NFILTERSET == nFilterDefaultButtonOrDirect) {
			
				input.onclick = function( ) {
					if( !input.getAttribute( "directkey" ) ||  input.getAttribute( "directkey" ) == "on" ){
						if(getNFilterBrowerInfo() == "IE7" || getNFilterBrowerInfo() == "Firefox") {
							input.disabled = false;
						}else{
							input.readOnly = false;
						}
					}else{
						nFilterKeypadShowExt(keypadShowTypeBinary, input.id + "_nfilter_sec", input.id);
					}
				};
			
				
			}else if(NFILTERSET == nFilterButton) {
				input.onclick = function() {
					
					nFilterInputTargetElement.value = "";
					nFilterInputDisplayElement.value = "";
					nFilterInputDisplayElement.setAttribute( "directkey", "on");
					if(getNFilterBrowerInfo() == "IE7" || getNFilterBrowerInfo() == "Firefox") {
						input.disabled = true;
						
					}else{
						input.readOnly = true;
					}
				};
			}else{
				input.onclick = function(){
					this.blur();
					if(NFILTERSET != undefined && NFILTERSET != null && (nFilterDefaultDirectButton == NFILTERSET || nFilterDefaultButtonOrDirect == NFILTERSET)) {
						setNFilterInputAutoFocusEnable();
					}
					nFilterKeypadShowExt(keypadShowTypeBinary, id + "_nfilter_sec", id);
				};
			}

			
		    	
				
		    	
			if(!nFilterIsElementExist(id + "_nfilter_sec")) {
				var inputTargetElement = document.createElement("input");
				inputTargetElement.setAttribute("type", "hidden");
				inputTargetElement.setAttribute("id", id + "_nfilter_sec");
				inputTargetElement.setAttribute("name", id + "_nfilter_sec");

				var displayElement = document.getElementById(id);
				displayElement.parentNode.insertBefore(inputTargetElement, displayElement.nextSibling);
			}
		}
		
		nFilterTypeArray = nFilterTypeString.split("|");
	}

	function setNFilterIconImage( object ){

		var btnObject = document.getElementById( object.id + "_iconkeyboard" );
		if( btnObject != undefined ){
			btnObject.onclick = function() {
				var id = btnObject.id.replace( "_iconkeyboard", "" );
				nFilterManualShow( id + "", "" );
			};
		}
		
	}	
	
	
	function setNFilterMobileInit(){
		
		nFilterExtRegistEventOnKeyDownUp();
		var extCss = document.createElement("link");
		extCss.setAttribute("rel","stylesheet");
		extCss.setAttribute("type","text/css");
		extCss.setAttribute("href", nFilterCSSMobilePath + "nFilter-mobile.css");
		
		var headNode = document.getElementsByTagName("head")[0];
		headNode.appendChild(extCss);
		
		if( nFilterSiteCode == "shinhan" ){
			nFilterIsMobileRequest = true;
			nFilterPositionCode = nFilter_LEFT_TOP;
		}
		
		
		nFilterKeypadInitMobile(parseInt(nFilterExtKeypadTypeInitBinary, 2), true, false, nFilterExtDisplayElementId + "_nfilter_sec", nFilterExtDisplayElementId, "");
	}
	
	
	function setNFilterInit(){
		
		nFilterExtRegistEventOnKeyDownUp();
		var extCss = document.createElement("link");
		extCss.setAttribute("rel","stylesheet");
		extCss.setAttribute("type","text/css");
		extCss.setAttribute("href", nFilterCSSPath + "nFilter.css");
		var headNode = document.getElementsByTagName("head")[0];
		headNode.appendChild(extCss);
		nFilterKeypadInit(parseInt(nFilterExtKeypadTypeInitBinary, 2), true, false, nFilterExtDisplayElementId + "_nfilter_sec", nFilterExtDisplayElementId, "");
	}
	
	
	function setNFilterIncludeInit(){
		appendNFilterMainTag();
		nFilterInitAfter( false );
	}
	
	function setNFilterIncludeMobileInit(){
		nFilterIsMobileRequest = true;
		setNFilterIncludeInit();
	}
	
	function setNFilterIncludeCertInit( displayElementId, targetElementId ){
		appendNFilterMainTag();
		nFilterInitBefore( 7, targetElementId, displayElementId );
		nFilterInitAfter( true, targetElementId, displayElementId );
	}	
	
	function appendNFilterMainTag(){
		nFilterExtRegistEventOnKeyDownUp();
		nFilterMain = document.getElementById("nfilter_main");
		var nFilterBg = document.getElementById("nfilter_bg");
		
		nFilterDocumentElement = createNFilterDocument();
		nFilterDocumentElement.appendChild( nFilterBg );
		nFilterDocumentElement.appendChild( nFilterMain );
		
	}
	
	var tmtState = true;
	
	function nFilterInit( setURL, info ){
		
		if( info == undefined ) return false;
		
		nFilterSetting( info );
		setNFilterEnableNoSecret(true);
		nFilterIsResourceAutoLoad = true;
		nFilterKeypadInit(parseInt(nFilterExtKeypadTypeInitBinary, 2), tmtState, false, nFilterExtDisplayElementId + "_nfilter_sec", nFilterExtDisplayElementId, "");
		
	}	
	
	function nFilterMobileInit( setURL, info ){
		
		if( info == undefined ) return false;
		
		nFilterSetting( info );
		setNFilterEnableNoSecret(true);
		nFilterIsResourceAutoLoad = true;
		nFilterKeypadInitMobile(parseInt(nFilterExtKeypadTypeInitBinary, 2), tmtState, false, nFilterExtDisplayElementId + "_nfilter_sec", nFilterExtDisplayElementId, "");
	}
	
	function nFilterSetting( info ){
		
		var infoArray = info.split('|');
		for (var int = 0; int < infoArray.length; int++) {
			
			var attributeArray = infoArray[ int ].split('&');
			var id = attributeArray[0];
			var keypadType = attributeArray[1];
			var minlengths = attributeArray[2];
			var maxlengths = attributeArray[3];
			
			if( int == 0 && !nFilterIsElementExist(id) ) {
				nFilterExtDisplayElementId = id;
			}
			
			setNFilter( id, "mode=" + keypadType +  ",minlength=" + minlengths +",maxlength="+ maxlengths +",nfilter=on");
			
		}
		
	}
	
	function loadNFilter(obj) {
		nFilterKeypadInit(parseInt("1111", 2), true, true, obj.id + "_nfilter_sec", obj.id, "");
	}


	function nFilterManualShow(objId, shiftMode) {

		var keypadLangOfTargetElement = document.getElementById(objId).getAttribute("lang");
		var keypadTypeOfTargetElement = document.getElementById(objId).getAttribute("mode");
		
		setNFilterLanguage(keypadLangOfTargetElement);

		if(NFILTERSET != undefined && NFILTERSET != null && (nFilterDefaultDirectButton == NFILTERSET || nFilterDefaultButtonOrDirect == NFILTERSET )) {
			setNFilterInputAutoFocusEnable();
		}

		if( keypadTypeOfTargetElement == "number" || keypadTypeOfTargetElement == "num"  ) {
			nFilterKeypadShowExt("1000", objId + "_nfilter_sec", objId);
		} else {
			nFilterKeypadShowExt("0111", objId + "_nfilter_sec", objId);
		}
					
		
		
	}
	
	var encryptValidation = false; 
	
	function nFilterGroupConfirm(){
		
		var input = document.getElementsByTagName("input");
		var confirmGroup = new Array();
		var arrayIndex = 0;
		for (var i = 0; i < input.length; i++) {
			var confirmGroupName = input.item(i).getAttribute('confirmGroup');
			var nFilterOn = input.item(i).getAttribute('nfilter');
			if ( confirmGroupName != undefined && nFilterOn == "on" ) {
				confirmGroup[ arrayIndex ] = confirmGroupName;
				arrayIndex++;
			}
		}
		
		for (var y = 0; y < confirmGroup.length; y++) {
			nFilterConfirmCheck( document.getElementById( confirmGroup[y] ) );
		}
		
	}
	
	function nFilterConfirm(){
		
		var input = document.getElementsByTagName("input");
		
		for (var i = 0; i < input.length; i++) {
			if (input.item(i).getAttribute('nfilter') == 'on') {
	
				var inputObject = input.item(i);
				if( inputObject.getAttribute("confirm") != undefined ){
					return nFilterConfirmCheck( inputObject );
				}
					
			}
				
		}
		
		return false;
	} 
	
	function nFilterConfirmCheck( inputObject ){
		if ( inputObject.getAttribute("confirm") && inputObject.getAttribute("confirm") != "undefined" ) {
			
			var newPasswordDisplayObject =  inputObject;
			var newPasswordTargetObject = document.getElementById( newPasswordDisplayObject.id + nFilterKeypadIdTargetSuffix );
			var newPasswordDisplayObject2 = document.getElementById( newPasswordDisplayObject.getAttribute("confirm") );
			var newPasswordTargetObject2 = document.getElementById( newPasswordDisplayObject2.id + nFilterKeypadIdTargetSuffix );
			var oldPasswordDisplayObject = document.getElementById( inputObject.getAttribute("curConfirm") );
			var oldPasswordTargetObject = document.getElementById( inputObject.getAttribute("curConfirm") + nFilterKeypadIdTargetSuffix );
			
			if ( newPasswordDisplayObject.value == "" || newPasswordDisplayObject.value == "undefined" ) return false; 
			if ( newPasswordDisplayObject2.value == "" || newPasswordDisplayObject2.value == "undefined" ) return false;
			if ( oldPasswordDisplayObject != null && oldPasswordDisplayObject.value == "" 
				||  oldPasswordDisplayObject != null &&  oldPasswordDisplayObject.value == "undefined" ) return false;

			
			
			if(  !newPasswordDisplayObject.getAttribute("directkey") || newPasswordDisplayObject.getAttribute("directkey") && newPasswordDisplayObject.getAttribute("directkey") == "on"  ){
			
				
				if( newPasswordDisplayObject.value != newPasswordDisplayObject2.value ){
					
					try {
						alertError( WebSquare.text.BASE64Decoder( newPasswordDisplayObject.getAttribute("confirmMsg") ) );
					} catch (e) {
						alert( newPasswordDisplayObject.getAttribute("confirmMsg") );
					}
					
					newPasswordDisplayObject.value = newPasswordDisplayObject2.value = "";
					newPasswordTargetObject.value = newPasswordTargetObject2.value = "";
					return false;
				}
				
				
				if( oldPasswordDisplayObject != null && ( oldPasswordDisplayObject.value == newPasswordDisplayObject.value ) ){
					
					try {
						alertError( WebSquare.text.BASE64Decoder( oldPasswordDisplayObject.getAttribute("confirmMsg") ) );
					} catch (e) {
						alert( oldPasswordDisplayObject.getAttribute("confirmMsg") );
					}
					
					oldPasswordDisplayObject.value = newPasswordDisplayObject.value = newPasswordDisplayObject2.value = "";
					oldPasswordTargetObject.value = newPasswordTargetObject.value = newPasswordTargetObject2.value = "";
					return false;
				}
				
				return true;
			}else{
				
				
				if ( newPasswordTargetObject.value == "" || newPasswordTargetObject.value == "undefined" ) return false; 
				if ( newPasswordTargetObject2.value == "" || newPasswordTargetObject2.value == "undefined" ) return false;
				if ( oldPasswordTargetObject != null && oldPasswordTargetObject.value == "" ||  oldPasswordTargetObject != null &&  oldPasswordTargetObject.value == "undefined" ) return false;

				if( encryptValidation && newPasswordDisplayObject.getAttribute("encrypt") && newPasswordDisplayObject.getAttribute("encrypt") == "off" ){
					newPasswordTargetObject.value = nFilterInputEncrypt( newPasswordTargetObject.value );
					newPasswordDisplayObject.setAttribute("encrypt", "on");
				}
				
				if( encryptValidation &&  newPasswordDisplayObject2.getAttribute("encrypt") && newPasswordDisplayObject2.getAttribute("encrypt") == "off" ){
					newPasswordTargetObject2.value = nFilterInputEncrypt( newPasswordTargetObject2.value );
					newPasswordDisplayObject2.setAttribute("encrypt", "on");
				}						
				
				if( oldPasswordDisplayObject != null && encryptValidation && oldPasswordDisplayObject.getAttribute("encrypt") && oldPasswordDisplayObject.getAttribute("encrypt") == "off" ){
					oldPasswordTargetObject.value =  nFilterInputEncrypt( oldPasswordTargetObject.value );
					oldPasswordDisplayObject.setAttribute("encrypt", "on");
				}
				
				
				if( newPasswordTargetObject.value != newPasswordTargetObject2.value ){
					
					if( newPasswordDisplayObject.getAttribute("encrypt") && newPasswordDisplayObject.getAttribute("encrypt") == "on" ) return true;
					
					try {
						alertError( WebSquare.text.BASE64Decoder( newPasswordDisplayObject.getAttribute("confirmMsg") ) );
					} catch (e) {
						alert( newPasswordDisplayObject.getAttribute("confirmMsg") );
					}
					
					newPasswordDisplayObject.value = newPasswordDisplayObject2.value = "";
					newPasswordTargetObject.value = newPasswordTargetObject2.value = "";
					return false;
				}

				
				if( oldPasswordTargetObject != null && oldPasswordTargetObject.value == newPasswordTargetObject.value ){
					
					try {
						alertError( WebSquare.text.BASE64Decoder( oldPasswordDisplayObject.getAttribute("confirmMsg") ) );
					} catch (e) {
						alert( oldPasswordDisplayObject.getAttribute("confirmMsg") );
					}
					
					oldPasswordDisplayObject.value = newPasswordDisplayObject.value = newPasswordDisplayObject2.value = "";
					oldPasswordTargetObject.value = newPasswordTargetObject.value = newPasswordTargetObject2.value = "";
					return false;
				}
				
				if(!newPasswordDisplayObject.getAttribute("encrypt")   || newPasswordDisplayObject.getAttribute("encrypt") && newPasswordDisplayObject.getAttribute("encrypt") == "off" ){
					newPasswordTargetObject.value = nFilterInputEncrypt( newPasswordTargetObject.value );
					newPasswordDisplayObject.setAttribute("encrypt", "on");
				}

				if( !newPasswordDisplayObject2.getAttribute("encrypt")  || newPasswordDisplayObject2.getAttribute("encrypt") && newPasswordDisplayObject2.getAttribute("encrypt") == "off" ){
					newPasswordTargetObject2.value = nFilterInputEncrypt( newPasswordTargetObject2.value );
					newPasswordDisplayObject2.setAttribute("encrypt", "on");
				}
				
				
				if( oldPasswordDisplayObject != null && !oldPasswordDisplayObject.getAttribute("encrypt")  
						|| oldPasswordDisplayObject != null && oldPasswordDisplayObject.getAttribute("encrypt") && oldPasswordDisplayObject.getAttribute("encrypt") == "off" ){
					oldPasswordTargetObject.value =  nFilterInputEncrypt( oldPasswordTargetObject.value );
					oldPasswordDisplayObject.setAttribute("encrypt", "on");
				}
				
				encryptValidation = true;
				return true;						
				
			} 
				
				
		}//end getAttribute("confirm") 
			
	}
	
	
	function nFilterConfirmClose(){
		if( NFILTERSET == nFilterDefaultDirect && nFilterInputDisplayElement.getAttribute("curconfirm") 
				|| NFILTERSET == nFilterDefaultButtonOrDirect && nFilterInputDisplayElement.getAttribute("curconfirm") 
					|| NFILTERSET == nFilterDefaultDirectButton && nFilterInputDisplayElement.getAttribute("curconfirm")  ){
	
			var currentConfirmObject = document.getElementById( nFilterInputDisplayElement.getAttribute("curconfirm") );
			if( nFilterInputDisplayElement.id != currentConfirmObject.id &&  currentConfirmObject.getAttribute("directkey") == "off" ) currentConfirmObject.value = "";
			currentConfirmObject.setAttribute("directkey", "on");
			currentConfirmObject.setAttribute("encrypt", "off");
			currentConfirmObject.readOnly = false;
			
			
			var confirmObject = document.getElementById( currentConfirmObject.getAttribute( "confirm1" ) );
			if( nFilterInputDisplayElement.id != confirmObject.id && confirmObject.getAttribute("directkey") == "off" ) confirmObject.value = "";
			confirmObject.setAttribute("directkey", "on");
			confirmObject.setAttribute("encrypt", "off");
			confirmObject.readOnly = false;
			
			
			var confirmObject2 = document.getElementById( currentConfirmObject.getAttribute( "confirm2" ) );
			if( nFilterInputDisplayElement.id != confirmObject2.id && confirmObject2.getAttribute("directkey") == "off" ) confirmObject2.value = "";
			confirmObject2.setAttribute("directkey", "on");
			confirmObject2.setAttribute("encrypt", "off");
			confirmObject2.readOnly = false;
			
			
			return true;
		}else  if( NFILTERSET == nFilterDefaultDirect && nFilterInputDisplayElement.getAttribute("confirm") 
				|| NFILTERSET == nFilterDefaultButtonOrDirect && nFilterInputDisplayElement.getAttribute("confirm") 
					|| NFILTERSET == nFilterDefaultDirectButton && nFilterInputDisplayElement.getAttribute("confirm")  ){
			
			if(nFilterInputDisplayElement.getAttribute("directkey") == "off" ) nFilterInputDisplayElement.value = "";
			nFilterInputDisplayElement.setAttribute("directkey", "on");
			nFilterInputDisplayElement.setAttribute("encrypt", "off");
			nFilterInputDisplayElement.readOnly = false;
			
			
			var confirmObject2 = document.getElementById( nFilterInputDisplayElement.getAttribute( "confirm" ) );
			if( confirmObject2.getAttribute("directkey") == "off" ) confirmObject2.value = "";
			confirmObject2.setAttribute("directkey", "on");
			confirmObject2.setAttribute("encrypt", "off");
			confirmObject2.readOnly = false;
			
			
			return true;
		}		
		
		return false;
		
	}
	
	
	
	
	
	function resetNFilter() {
		
		var object = document.getElementsByTagName("input");
		
		for (var int = 0; int < object.length; int++) {
			
			if ( object[ int ].getAttribute("nfilter") == "on" ) {
				
				if(NFILTERSET == nFilterDefaultButtonOrDirect) {
					object[ int ].setAttribute( "directkey", "on" );
				}else{
					object[ int ].setAttribute( "directkey", "off" );
				}
				
				object[ int ].value = "";
				document.getElementById( object[ int ].id +  nFilterKeypadIdTargetSuffix ).value = "";
				
			}
			
		}
		
	}

	function nFilterValidate() {
		return nFilterEncrypted();	
	}

	function nFilterEncrypted(password) {
		var returnSecretValue = "";
		var inputValue = "";
		
		var secElements = document.getElementsByTagName("input");

		
		
 		for(var i=0; i<secElements.length; i++) {
			
 			if(secElements[i].type != undefined && secElements[i].type == "hidden" && secElements[i].id != undefined && secElements[i].id.indexOf(nFilterKeypadIdTargetSuffix) > -1) {
 				if(secElements[i].value != undefined && secElements[i].value != "") {
 					inputValue = secElements[i].value;
 				} else {
 					inputValue = "";
 				}

 				if(inputValue != "") {
 	 				if(returnSecretValue == "") {
 	 	 				returnSecretValue = secElements[i].id.substring(0, secElements[i].id.indexOf(nFilterKeypadIdTargetSuffix)) + "=" + inputValue;
 	 				} else {
 	 	 				returnSecretValue += "|" + secElements[i].id.substring(0, secElements[i].id.indexOf(nFilterKeypadIdTargetSuffix)) + "=" + inputValue;
 	 				}
 				}
 			}
 		}
		
		return returnSecretValue;
	}

	function nFilterEncryptedArray(){
		
		
		var inputValue = "";
		
		var secElements = document.getElementsByTagName("input");

		var encDataArray={};	
		
		
 		for(var i=0; i<secElements.length; i++) {
			
 			if(secElements[i].type != undefined && secElements[i].type == "hidden" 
 				&& secElements[i].id != undefined && secElements[i].id.indexOf(nFilterKeypadIdTargetSuffix) > -1) {
 					
 				if(secElements[i].value != undefined && secElements[i].value != "") {
 					
 					var returnSecretValue = "";

					inputValue = secElements[i].value;
 					
					var inputElementName = secElements[i].id.substring(0, secElements[i].id.indexOf(nFilterKeypadIdTargetSuffix));
 					if( isBCP & !isNFilterExE2EFieldName( inputElementName ) ){
 						returnSecretValue = inputValue;
 					}else{
 						returnSecretValue = inputElementName + "=" + inputValue;
 					}
 					
 					encDataArray[ secElements[i].id.replace( "_nfilter_sec", "" ) ] = returnSecretValue;
 					
 					
 				} else {
 					inputValue = "";
 				}
 				
 			}
 			
 		}
				
		return encDataArray;
		
		
	}
	
	function nFilterEncryptedByField(){	
		
		return nFilterEncryptedArray();
	}
	
	function isVirtualKeyboard(obj) {
		var obj = document.getElementById(obj);
	
		if (obj.getAttribute("confirm") || obj.getAttribute("curConfirm")) {
			if (obj.getAttribute("confirm1")) {
				var confirm1 = document.getElementById(obj.getAttribute("confirm1"));
				if (confirm1.getAttribute("directkey")	&& confirm1.getAttribute("directkey") == "on") {
					return true;
				}
			}
	
			if (obj.getAttribute("confirm2")) {
				var confirm2 = document.getElementById(obj.getAttribute("confirm2"));
				if (confirm2.getAttribute("directkey") && confirm2.getAttribute("directkey") == "on") {
					return true;
				}
			}
	
			try {
				var curConfirm = document.getElementById(obj
						.getAttribute("curConfirm"));
				if (curConfirm.getAttribute("directkey") && curConfirm.getAttribute("directkey") == "on") {
					return true;
				}
			} catch (err) {
			}
	
			try {
				var confirm = document.getElementById(obj.getAttribute("confirm"));
				if (confirm.getAttribute("directkey") && confirm.getAttribute("directkey") == "on") {
					return true;
				}
			} catch (err) {
			}
		} else {
			if (obj.getAttribute("directkey") && obj.getAttribute("directkey") == "on")
				return true;
		}
	
		return false;
	}
		

	
	
	
	
	var acnoField = false;
	var acnoId;
	var cardField = false;
	var cardId;
	var moneyField = false;
	var moneyIds = new Array();

	
	function setAcnoField(isAccField, id){
		acnoField = isAccField;
		acnoId = id;
	}
	
	function setCardField(isCardField, id){
		cardField = isCardField;
		cardId = id;
	}
	
	function setMoneyField(isMoneyField, ids){
		moneyField = isMoneyField;
		moneyIds = ids.split('|');
	}
	
	function setENG(){
		setNFilterLanguage( "en" );
		setNFilterLoadingStatusEnable( false );
	}
	
	function SetNFilterTMT( TMT ){
		TMT = ( TMT ) ? false : true;
		tmtState = TMT;
	}
	
	
	
	
	var cardFormatting = false;
	function setNFilterCardFormatting( args ){
		cardFormatting = args;
	}
	
	var accountFormatting = false;
	function setNFilterAccountFormatting( args ){
		accountFormatting = args;
	}
	
	var moneyFormatting = new Array();
	function setNFilterMoneyFormatting( args ){
		moneyFormatting = args.split('|');
	}
	
	
	function isMoneyFormatting(){
		
		if( moneyFormatting.length > 0 ){
			for (var int = 0; int < moneyFormatting.length; int++) {
				if( moneyFormatting[ int ] == nFilterInputDisplayElement.id  ){
					return true;
					
				}
			}
		}else{
			return false;
		}
		
	}
		
	
	var isBCP = false;
	function SetBCP( bcp ){
		isBCP = bcp;
	}

	var ExE2EIds = new Array();
	var isExE2E = false;
	function SetExE2E( ExE2EArray ){
		isExE2E = true;
		ExE2EIds = ExE2EArray.split('|');	
	}	
	
	function isNFilterExE2E(){
		if( ExE2EIds.length > 0 ){
			for (var int = 0; int < ExE2EIds.length; int++) {
				if( ExE2EIds[ int ] == nFilterInputDisplayElement.id  ){
					return true;
				}
			}
		}else{
			return false;
		}
	}
	

	function isNFilterExE2EFieldName( nFilterInputElementName ){
		if( ExE2EIds.length > 0 ){
			for (var int = 0; int < ExE2EIds.length; int++) {
				if( ExE2EIds[ int ] == nFilterInputElementName  ){
					return true;
				}
			}
		}else{
			return false;
		}
	}	
	
	
	
	function scCardNumDelete(){
		
		if (typeof(delFunction) != 'undefined'){
			delFunction();
		}
	
		
		if(document.getElementById('SafeCardNum') != undefined && document.getElementById('SafeCardNum') != null) {
			if(document.getElementById('scNumD1') != undefined && document.getElementById('scNumD1') != null) {
				document.getElementById('scNumD1').value = document.getElementById('SafeCardNum').value;
			}
		}
		if(document.getElementById('SafeCardNum2') != undefined && document.getElementById('SafeCardNum2') != null) {
			if(document.getElementById('scNumD2') != undefined && document.getElementById('scNumD2') != null) {
				document.getElementById('scNumD2').value = document.getElementById('SafeCardNum2').value;
			}
		}
	}


	function scCardNumClone() {
		
		if(document.getElementById('SafeCardNum') != undefined && document.getElementById('SafeCardNum') != null) {
			if(document.getElementById('scNumD1') != undefined && document.getElementById('scNumD1') != null) {
				document.getElementById('scNumD1').value = document.getElementById('SafeCardNum').value;
			}
		}
		if(document.getElementById('SafeCardNum2') != undefined && document.getElementById('SafeCardNum2') != null) {
			if(document.getElementById('scNumD2') != undefined && document.getElementById('scNumD2') != null) {
				document.getElementById('scNumD2').value = document.getElementById('SafeCardNum2').value;
			}
		}
		if (typeof(etcFunction) != 'undefined'){
			etcFunction();
		}
	}
	

	function currencyComma(val){
		 var num = val.replace(/,/g, "");
		 var num_str = num.toString();
		 var result = '';
		 for(var i=0; i<num_str.length; i++) {
		  var tmp = num_str.length-(i+1);
		  if(i%3==0 && i!=0) result = ',' + result;
		   result = num_str.charAt(tmp) + result;
		 }
		 return result;
	}
	

	
	function cardNumDash(val){
		 var num = val.replace(/-/g, "");
		 var num_str = num.toString();
		 var result = '';
		 for(var i=0; i<num_str.length; i++) {
		  var tmp = i;
		  if(i%4==0 && i!=0) result = result + '-';
		   result = result + num_str.charAt(tmp);
		 }
		 return result;
	}

	
	var CSURL = "";
	function setNFilterCSURL( url ){
		CSURL = url;
	}
	
	function nFilterCertInit(  testcase1_display_element, setURL, info  ){
				nFilterExtRegistEventOnKeyDownUp();
			var extCss = document.createElement("link");
			extCss.setAttribute("rel","stylesheet");
			extCss.setAttribute("type","text/css");
			extCss.setAttribute("href", nFilterCSSPath + "nFilter.css");
			var headNode = document.getElementsByTagName("head")[0];
			headNode.appendChild(extCss);
		nFilterKeypadInit(7, true, true, '', testcase1_display_element.id, '');
	}

	
	var nFilterSpUse = false;
	var nFilterEngUse = false;
	function nFilterEngSpEnable( nFilterEngSpSet ){
		nFilterSpUse = nFilterEngSpSet;
		nFilterEngUse = nFilterEngSpSet;
	}		
	
	
	
	
	function nFilterSecret(elementId) {
		if(   elementId.indexOf(  nFilterKeypadIdNoSecretPrefix  ) < 0 ){
			return false;
		}else{
			return true;
		}
		
	}
	
	var nFilterClassActiveState;
	var nFilterClassActiveBackgroundArray;
	
	function nFilterClassActiveBackground( backgroundColor ){
		
		nFilterClassActiveState = true;
		nFilterClassActiveBackgroundArray = backgroundColor.split( "&" ); 
	}
	function nFilterClassActive( info ){
		
		var classBackgroundInfo;
		for (var int = 0; int < nFilterClassActiveBackgroundArray.length; int++) {
			if( nFilterClassActiveBackgroundArray[ int ].indexOf( info ) != -1 ) classBackgroundInfo = nFilterClassActiveBackgroundArray[ int ].split( "|" );
		}
		
		if( classBackgroundInfo != undefined ){
			var object = document.getElementById( classBackgroundInfo[ 0 ] );
			object.style.background = classBackgroundInfo[ 1 ];
			window.setTimeout(function() {
				object.style.background = classBackgroundInfo[ 2 ];
			}, 300);
		}
	}	
	
	
	function nFilterExtBeforeDataKeyInput(args) {
		var oasEnabled = nFilterExtOasVerifyDisable();
		return oasEnabled;
	}
	
	function nFilterExtAfterDataKeyInput(args) {
		var oasEnabled = nFilterExtOasVerifyEnable();
		return oasEnabled;
	}	
	

	function nFilterExtOasVerifyDisable() {
	    var MKD25 = document.getElementById("MKD25");
	    
	    if(MKD25 != undefined && MKD25 != null) {
	       	MKD25.SkipVerify(0);
	    } else {
			return false;
	    }
		return true;
		
	}
	function nFilterExtOasVerifyEnable() {
	    var MKD25 = document.getElementById("MKD25");
	    
	    if(MKD25 != undefined && MKD25 != null) {
	       	MKD25.SkipVerify(1);
	    } else {
			return false;
	    }
		return true;
	}	
	
	
	
	

	function nFilterExtAfterCSForword() {
		
	}
	
	
	
	

	var nFilterKeyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";

	function nFilterEncode64(input) {
		input = escape(input);
		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;

		do {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output + nFilterKeyStr.charAt(enc1) + nFilterKeyStr.charAt(enc2)
					+ nFilterKeyStr.charAt(enc3) + nFilterKeyStr.charAt(enc4);
			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";
		} while (i < input.length);

		return output;
	}

	function nFilterDecode64(input) {
		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;

		
		var base64test = /[^A-Za-z0-9\+\/\=]/g;
		if (base64test.exec(input)) {
			
		}
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		do {
			enc1 = nFilterKeyStr.indexOf(input.charAt(i++));
			enc2 = nFilterKeyStr.indexOf(input.charAt(i++));
			enc3 = nFilterKeyStr.indexOf(input.charAt(i++));
			enc4 = nFilterKeyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";

		} while (i < input.length);

		return unescape(output);
	}
	

    
    
    
	
	
	

	

	
	var nFilterDbits;

	
	var nFilterCanary = 0xdeadbeefcafe;
	var nFilterJ_lm = ((nFilterCanary&0xffffff)==0xefcafe);

	
	function nFilterBigInteger(a,b,c) {
	  if(a != null)
	    if("number" == typeof a) this.fromNumber(a,b,c);
	    else if(b == null && "string" != typeof a) this.fromString(a,256);
	    else this.fromString(a,b);
	}

	
	function nFilterNbi() { return new nFilterBigInteger(null); }

	
	
	
	

	
	
	
	function nFilteram1(i,x,w,j,c,n) {
	  while(--n >= 0) {
	    var v = x*this[i++]+w[j]+c;
	    c = Math.floor(v/0x4000000);
	    w[j++] = v&0x3ffffff;
	  }
	  return c;
	}
	
	
	
	function nFilteram2(i,x,w,j,c,n) {
	  var xl = x&0x7fff, xh = x>>15;
	  while(--n >= 0) {
	    var l = this[i]&0x7fff;
	    var h = this[i++]>>15;
	    var m = xh*l+h*xl;
	    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
	    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
	    w[j++] = l&0x3fffffff;
	  }
	  return c;
	}
	
	
	function nFilteram3(i,x,w,j,c,n) {
	  var xl = x&0x3fff, xh = x>>14;
	  while(--n >= 0) {
	    var l = this[i]&0x3fff;
	    var h = this[i++]>>14;
	    var m = xh*l+h*xl;
	    l = xl*l+((m&0x3fff)<<14)+w[j]+c;
	    c = (l>>28)+(m>>14)+xh*h;
	    w[j++] = l&0xfffffff;
	  }
	  return c;
	}
	if(nFilterJ_lm && (navigator.appName == "Microsoft Internet Explorer")) {
		nFilterBigInteger.prototype.am = nFilteram2;
	  nFilterDbits = 30;
	}
	else if(nFilterJ_lm && (navigator.appName != "Netscape")) {
		nFilterBigInteger.prototype.am = nFilteram1;
	  nFilterDbits = 26;
	}
	else { 
		nFilterBigInteger.prototype.am = nFilteram3;
	  nFilterDbits = 28;
	}

	nFilterBigInteger.prototype.DB = nFilterDbits;
	nFilterBigInteger.prototype.DM = ((1<<nFilterDbits)-1);
	nFilterBigInteger.prototype.DV = (1<<nFilterDbits);

	var nFilterBI_FP = 52;
	nFilterBigInteger.prototype.FV = Math.pow(2,nFilterBI_FP);
	nFilterBigInteger.prototype.F1 = nFilterBI_FP-nFilterDbits;
	nFilterBigInteger.prototype.F2 = 2*nFilterDbits-nFilterBI_FP;

	
	var nFilterBI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
	var nFilterBI_RC = new Array();
	var nFilterRr,nFilterVv;
	nFilterRr = "0".charCodeAt(0);
	for(nFilterVv = 0; nFilterVv <= 9; ++nFilterVv) nFilterBI_RC[nFilterRr++] = nFilterVv;
	nFilterRr = "a".charCodeAt(0);
	for(nFilterVv = 10; nFilterVv < 36; ++nFilterVv) nFilterBI_RC[nFilterRr++] = nFilterVv;
	nFilterRr = "A".charCodeAt(0);
	for(nFilterVv = 10; nFilterVv < 36; ++nFilterVv) nFilterBI_RC[nFilterRr++] = nFilterVv;

	function nFilterInt2char(n) { return nFilterBI_RM.charAt(n); }
	function nFilterIntAt(s,i) {
	  var c = nFilterBI_RC[s.charCodeAt(i)];
	  return (c==null)?-1:c;
	}

	
	function nFilterBnpCopyTo(r) {
	  for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
	  r.t = this.t;
	  r.s = this.s;
	}

	
	function nFilterBnpFromInt(x) {
	  this.t = 1;
	  this.s = (x<0)?-1:0;
	  if(x > 0) this[0] = x;
	  else if(x < -1) this[0] = x+DV;
	  else this.t = 0;
	}

	
	function nFilterNbv(i) { var r = nFilterNbi(); r.fromInt(i); return r; }

	
	function nFilterBnpFromString(s,b) {
	  var k;
	  if(b == 16) k = 4;
	  else if(b == 8) k = 3;
	  else if(b == 256) k = 8; 
	  else if(b == 2) k = 1;
	  else if(b == 32) k = 5;
	  else if(b == 4) k = 2;
	  else { this.fromRadix(s,b); return; }
	  this.t = 0;
	  this.s = 0;
	  var i = s.length, mi = false, sh = 0;
	  while(--i >= 0) {
	    var x = (k==8)?s[i]&0xff:nFilterIntAt(s,i);
	    if(x < 0) {
	      if(s.charAt(i) == "-") mi = true;
	      continue;
	    }
	    mi = false;
	    if(sh == 0)
	      this[this.t++] = x;
	    else if(sh+k > this.DB) {
	      this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
	      this[this.t++] = (x>>(this.DB-sh));
	    }
	    else
	      this[this.t-1] |= x<<sh;
	    sh += k;
	    if(sh >= this.DB) sh -= this.DB;
	  }
	  if(k == 8 && (s[0]&0x80) != 0) {
	    this.s = -1;
	    if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
	  }
	  this.clamp();
	  if(mi) nFilterBigInteger.ZERO.subTo(this,this);
	}

	
	function nFilterBnpClamp() {
	  var c = this.s&this.DM;
	  while(this.t > 0 && this[this.t-1] == c) --this.t;
	}

	
	function nFilterBnToString(b) {
	  if(this.s < 0) return "-"+this.negate().toString(b);
	  var k;
	  if(b == 16) k = 4;
	  else if(b == 8) k = 3;
	  else if(b == 2) k = 1;
	  else if(b == 32) k = 5;
	  else if(b == 4) k = 2;
	  else return this.toRadix(b);
	  var km = (1<<k)-1, d, m = false, r = "", i = this.t;
	  var p = this.DB-(i*this.DB)%k;
	  if(i-- > 0) {
	    if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = nFilterInt2char(d); }
	    while(i >= 0) {
	      if(p < k) {
	        d = (this[i]&((1<<p)-1))<<(k-p);
	        d |= this[--i]>>(p+=this.DB-k);
	      }
	      else {
	        d = (this[i]>>(p-=k))&km;
	        if(p <= 0) { p += this.DB; --i; }
	      }
	      if(d > 0) m = true;
	      if(m) r += nFilterInt2char(d);
	    }
	  }
	  return m?r:"0";
	}

	
	function nFilterBnNegate() { var r = nFilterNbi(); nFilterBigInteger.ZERO.subTo(this,r); return r; }

	
	function nFilterBnAbs() { return (this.s<0)?this.negate():this; }

	
	function nFilterBnCompareTo(a) {
	  var r = this.s-a.s;
	  if(r != 0) return r;
	  var i = this.t;
	  r = i-a.t;
	  if(r != 0) return r;
	  while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
	  return 0;
	}

	
	function nFilterNbits(x) {
	  var r = 1, t;
	  if((t=x>>>16) != 0) { x = t; r += 16; }
	  if((t=x>>8) != 0) { x = t; r += 8; }
	  if((t=x>>4) != 0) { x = t; r += 4; }
	  if((t=x>>2) != 0) { x = t; r += 2; }
	  if((t=x>>1) != 0) { x = t; r += 1; }
	  return r;
	}

	
	function nFilterBnBitLength() {
	  if(this.t <= 0) return 0;
	  return this.DB*(this.t-1)+nFilterNbits(this[this.t-1]^(this.s&this.DM));
	}

	
	function nFilterBnpDLShiftTo(n,r) {
	  var i;
	  for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
	  for(i = n-1; i >= 0; --i) r[i] = 0;
	  r.t = this.t+n;
	  r.s = this.s;
	}

	
	function nFilterBnpDRShiftTo(n,r) {
	  for(var i = n; i < this.t; ++i) r[i-n] = this[i];
	  r.t = Math.max(this.t-n,0);
	  r.s = this.s;
	}

	
	function nFilterBnpLShiftTo(n,r) {
	  var bs = n%this.DB;
	  var cbs = this.DB-bs;
	  var bm = (1<<cbs)-1;
	  var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
	  for(i = this.t-1; i >= 0; --i) {
	    r[i+ds+1] = (this[i]>>cbs)|c;
	    c = (this[i]&bm)<<bs;
	  }
	  for(i = ds-1; i >= 0; --i) r[i] = 0;
	  r[ds] = c;
	  r.t = this.t+ds+1;
	  r.s = this.s;
	  r.clamp();
	}

	
	function nFilterBnpRShiftTo(n,r) {
	  r.s = this.s;
	  var ds = Math.floor(n/this.DB);
	  if(ds >= this.t) { r.t = 0; return; }
	  var bs = n%this.DB;
	  var cbs = this.DB-bs;
	  var bm = (1<<bs)-1;
	  r[0] = this[ds]>>bs;
	  for(var i = ds+1; i < this.t; ++i) {
	    r[i-ds-1] |= (this[i]&bm)<<cbs;
	    r[i-ds] = this[i]>>bs;
	  }
	  if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
	  r.t = this.t-ds;
	  r.clamp();
	}

	
	function nFilterBnpSubTo(a,r) {
	  var i = 0, c = 0, m = Math.min(a.t,this.t);
	  while(i < m) {
	    c += this[i]-a[i];
	    r[i++] = c&this.DM;
	    c >>= this.DB;
	  }
	  if(a.t < this.t) {
	    c -= a.s;
	    while(i < this.t) {
	      c += this[i];
	      r[i++] = c&this.DM;
	      c >>= this.DB;
	    }
	    c += this.s;
	  }
	  else {
	    c += this.s;
	    while(i < a.t) {
	      c -= a[i];
	      r[i++] = c&this.DM;
	      c >>= this.DB;
	    }
	    c -= a.s;
	  }
	  r.s = (c<0)?-1:0;
	  if(c < -1) r[i++] = this.DV+c;
	  else if(c > 0) r[i++] = c;
	  r.t = i;
	  r.clamp();
	}

	
	
	function nFilterBnpMultiplyTo(a,r) {
	  var x = this.abs(), y = a.abs();
	  var i = x.t;
	  r.t = i+y.t;
	  while(--i >= 0) r[i] = 0;
	  for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
	  r.s = 0;
	  r.clamp();
	  if(this.s != a.s) nFilterBigInteger.ZERO.subTo(r,r);
	}

	
	function nFilterBnpSquareTo(r) {
	  var x = this.abs();
	  var i = r.t = 2*x.t;
	  while(--i >= 0) r[i] = 0;
	  for(i = 0; i < x.t-1; ++i) {
	    var c = x.am(i,x[i],r,2*i,0,1);
	    if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
	      r[i+x.t] -= x.DV;
	      r[i+x.t+1] = 1;
	    }
	  }
	  if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
	  r.s = 0;
	  r.clamp();
	}

	
	
	function nFilterBnpDivRemTo(m,q,r) {
	  var pm = m.abs();
	  if(pm.t <= 0) return;
	  var pt = this.abs();
	  if(pt.t < pm.t) {
	    if(q != null) q.fromInt(0);
	    if(r != null) this.copyTo(r);
	    return;
	  }
	  if(r == null) r = nFilterNbi();
	  var y = nFilterNbi(), ts = this.s, ms = m.s;
	  var nsh = this.DB-nFilterNbits(pm[pm.t-1]);	
	  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
	  else { pm.copyTo(y); pt.copyTo(r); }
	  var ys = y.t;
	  var y0 = y[ys-1];
	  if(y0 == 0) return;
	  var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
	  var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
	  var i = r.t, j = i-ys, t = (q==null)?nFilterNbi():q;
	  y.dlShiftTo(j,t);
	  if(r.compareTo(t) >= 0) {
	    r[r.t++] = 1;
	    r.subTo(t,r);
	  }
	  nFilterBigInteger.ONE.dlShiftTo(ys,t);
	  t.subTo(y,y);	
	  while(y.t < ys) y[y.t++] = 0;
	  while(--j >= 0) {
	    
	    var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
	    if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	
	      y.dlShiftTo(j,t);
	      r.subTo(t,r);
	      while(r[i] < --qd) r.subTo(t,r);
	    }
	  }
	  if(q != null) {
	    r.drShiftTo(ys,q);
	    if(ts != ms) nFilterBigInteger.ZERO.subTo(q,q);
	  }
	  r.t = ys;
	  r.clamp();
	  if(nsh > 0) r.rShiftTo(nsh,r);	
	  if(ts < 0) nFilterBigInteger.ZERO.subTo(r,r);
	}

	
	function nFilterBnMod(a) {
	  var r = nFilterNbi();
	  this.abs().divRemTo(a,null,r);
	  if(this.s < 0 && r.compareTo(nFilterBigInteger.ZERO) > 0) a.subTo(r,r);
	  return r;
	}

	
	function nFilterClassic(m) { this.m = m; }
	function nFilterCConvert(x) {
	  if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
	  else return x;
	}
	function nFilterCRevert(x) { return x; }
	function nFilterCReduce(x) { x.divRemTo(this.m,null,x); }
	function nFilterCMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
	function nFilterCSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

	nFilterClassic.prototype.convert = nFilterCConvert;
	nFilterClassic.prototype.revert = nFilterCRevert;
	nFilterClassic.prototype.reduce = nFilterCReduce;
	nFilterClassic.prototype.mulTo = nFilterCMulTo;
	nFilterClassic.prototype.sqrTo = nFilterCSqrTo;

	
	


	
	
	
	
	
	
	function nFilterBnpInvDigit() {
	  if(this.t < 1) return 0;
	  var x = this[0];
	  if((x&1) == 0) return 0;
	  var y = x&3;		
	  y = (y*(2-(x&0xf)*y))&0xf;	
	  y = (y*(2-(x&0xff)*y))&0xff;	
	  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	
	  
	  
	  y = (y*(2-x*y%this.DV))%this.DV;		
	  
	  return (y>0)?this.DV-y:-y;
	}

	
	function nFilterMontgomery(m) {
	  this.m = m;
	  this.mp = m.invDigit();
	  this.mpl = this.mp&0x7fff;
	  this.mph = this.mp>>15;
	  this.um = (1<<(m.DB-15))-1;
	  this.mt2 = 2*m.t;
	}

	
	function nFilterMontConvert(x) {
	  var r = nFilterNbi();
	  x.abs().dlShiftTo(this.m.t,r);
	  r.divRemTo(this.m,null,r);
	  if(x.s < 0 && r.compareTo(nFilterBigInteger.ZERO) > 0) this.m.subTo(r,r);
	  return r;
	}

	
	function nFilterMontRevert(x) {
	  var r = nFilterNbi();
	  x.copyTo(r);
	  this.reduce(r);
	  return r;
	}

	
	function nFilterMontReduce(x) {
	  while(x.t <= this.mt2)	
	    x[x.t++] = 0;
	  for(var i = 0; i < this.m.t; ++i) {
	    
	    var j = x[i]&0x7fff;
	    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
	    
	    j = i+this.m.t;
	    x[j] += this.m.am(0,u0,x,i,0,this.m.t);
	    
	    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
	  }
	  x.clamp();
	  x.drShiftTo(this.m.t,x);
	  if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
	}

	
	function nFilterMontSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

	
	function nFilterMontMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

	nFilterMontgomery.prototype.convert = nFilterMontConvert;
	nFilterMontgomery.prototype.revert = nFilterMontRevert;
	nFilterMontgomery.prototype.reduce = nFilterMontReduce;
	nFilterMontgomery.prototype.mulTo = nFilterMontMulTo;
	nFilterMontgomery.prototype.sqrTo = nFilterMontSqrTo;

	
	function nFilterBnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

	
	function nFilterBnpExp(e,z) {
	  if(e > 0xffffffff || e < 1) return nFilterBigInteger.ONE;
	  var r = nFilterNbi(), r2 = nFilterNbi(), g = z.convert(this), i = nFilterNbits(e)-1;
	  g.copyTo(r);
	  while(--i >= 0) {
	    z.sqrTo(r,r2);
	    if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
	    else { var t = r; r = r2; r2 = t; }
	  }
	  return z.revert(r);
	}

	
	function nFilterBnModPowInt(e,m) {
	  var z;
	  if(e < 256 || m.isEven()) z = new nFilterClassic(m); else z = new nFilterMontgomery(m);
	  return this.exp(e,z);
	}

	
	nFilterBigInteger.prototype.copyTo = nFilterBnpCopyTo;
	nFilterBigInteger.prototype.fromInt = nFilterBnpFromInt;
	nFilterBigInteger.prototype.fromString = nFilterBnpFromString;
	nFilterBigInteger.prototype.clamp = nFilterBnpClamp;
	nFilterBigInteger.prototype.dlShiftTo = nFilterBnpDLShiftTo;
	nFilterBigInteger.prototype.drShiftTo = nFilterBnpDRShiftTo;
	nFilterBigInteger.prototype.lShiftTo = nFilterBnpLShiftTo;
	nFilterBigInteger.prototype.rShiftTo = nFilterBnpRShiftTo;
	nFilterBigInteger.prototype.subTo = nFilterBnpSubTo;
	nFilterBigInteger.prototype.multiplyTo = nFilterBnpMultiplyTo;
	nFilterBigInteger.prototype.squareTo = nFilterBnpSquareTo;
	nFilterBigInteger.prototype.divRemTo = nFilterBnpDivRemTo;
	nFilterBigInteger.prototype.invDigit = nFilterBnpInvDigit;
	nFilterBigInteger.prototype.isEven = nFilterBnpIsEven;
	nFilterBigInteger.prototype.exp = nFilterBnpExp;

	
	nFilterBigInteger.prototype.toString = nFilterBnToString;
	nFilterBigInteger.prototype.negate = nFilterBnNegate;
	nFilterBigInteger.prototype.abs = nFilterBnAbs;
	nFilterBigInteger.prototype.compareTo = nFilterBnCompareTo;
	nFilterBigInteger.prototype.bitLength = nFilterBnBitLength;
	nFilterBigInteger.prototype.mod = nFilterBnMod;
	nFilterBigInteger.prototype.modPowInt = nFilterBnModPowInt;

	
	nFilterBigInteger.ZERO = nFilterNbv(0);
	nFilterBigInteger.ONE = nFilterNbv(1);


    
    
    
	

	
	
	

	function nFilterArcfour() {
	  this.i = 0;
	  this.j = 0;
	  this.S = new Array();
	}

	
	function nFilterARC4init(key) {
	  var i, j, t;
	  for(i = 0; i < 256; ++i)
	    this.S[i] = i;
	  j = 0;
	  for(i = 0; i < 256; ++i) {
	    j = (j + this.S[i] + key[i % key.length]) & 255;
	    t = this.S[i];
	    this.S[i] = this.S[j];
	    this.S[j] = t;
	  }
	  this.i = 0;
	  this.j = 0;
	}

	function nFilterARC4next() {
	  var t;
	  this.i = (this.i + 1) & 255;
	  this.j = (this.j + this.S[this.i]) & 255;
	  t = this.S[this.i];
	  this.S[this.i] = this.S[this.j];
	  this.S[this.j] = t;
	  return this.S[(t + this.S[this.i]) & 255];
	}

	nFilterArcfour.prototype.init = nFilterARC4init;
	nFilterArcfour.prototype.next = nFilterARC4next;

	
	function nFilterPrng_newstate() {
	  return new nFilterArcfour();
	}


    
    
    
	

	
	
	
	var nFilterRng_psize = 256;
	var nFilterRng_state;
	var nFilterRng_pool;
	var nFilterRng_pptr;

	
	function nFilterRng_seed_int(x) {
		nFilterRng_pool[nFilterRng_pptr++] ^= x & 255;
		nFilterRng_pool[nFilterRng_pptr++] ^= (x >> 8) & 255;
		nFilterRng_pool[nFilterRng_pptr++] ^= (x >> 16) & 255;
		nFilterRng_pool[nFilterRng_pptr++] ^= (x >> 24) & 255;
	  if(nFilterRng_pptr >= nFilterRng_psize) nFilterRng_pptr -= nFilterRng_psize;
	}

	
	function nFilterRng_seed_time() {
		nFilterRng_seed_int(new Date().getTime());
	}

	
	if(nFilterRng_pool == null) {
		nFilterRng_pool = new Array();
		nFilterRng_pptr = 0;
	  var t;
	  if(navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
	    
	    var z = window.crypto.random(32);
	    for(t = 0; t < z.length; ++t)
	    	nFilterRng_pool[nFilterRng_pptr++] = z.charCodeAt(t) & 255;
	  }  
	  while(nFilterRng_pptr < nFilterRng_psize) {  
	    t = Math.floor(65536 * Math.random());
	    nFilterRng_pool[nFilterRng_pptr++] = t >>> 8;
	    nFilterRng_pool[nFilterRng_pptr++] = t & 255;
	  }
	  nFilterRng_pptr = 0;
	  nFilterRng_seed_time();
	  //rng_seed_int(window.screenX);
	  //rng_seed_int(window.screenY);
	}

	function nFilterRng_get_byte() {
	  if(nFilterRng_state == null) {
		  nFilterRng_seed_time();
	    nFilterRng_state = nFilterPrng_newstate();
	    nFilterRng_state.init(nFilterRng_pool);
	    for(nFilterRng_pptr = 0; nFilterRng_pptr < nFilterRng_pool.length; ++nFilterRng_pptr)
	    	nFilterRng_pool[nFilterRng_pptr] = 0;
	    nFilterRng_pptr = 0;
	    //rng_pool = null;
	  }
	  
	  return nFilterRng_state.next();
	}

	function nFilterRng_get_bytes(ba) {
	  var i;
	  for(i = 0; i < ba.length; ++i) ba[i] = nFilterRng_get_byte();
	}

	function nFilterSecureRandom() {}

	nFilterSecureRandom.prototype.nextBytes = nFilterRng_get_bytes;



    
    
    
	
	

	

	
	function nFilterParseBigInt(str,r) {
	  return new nFilterBigInteger(str,r);
	}

	function nFilterLinebrk(s,n) {
	  var ret = "";
	  var i = 0;
	  while(i + n < s.length) {
	    ret += s.substring(i,i+n) + "\n";
	    i += n;
	  }
	  return ret + s.substring(i,s.length);
	}

	function nFilterByte2Hex(b) {
	  if(b < 0x10)
	    return "0" + b.toString(16);
	  else
	    return b.toString(16);
	}

	
	function nFilterPkcs1pad2(s,n) {
	  if(n < s.length + 11) { 
	    alert("Message too long for RSA");
	    return null;
	  }
	  var ba = new Array();
	  var i = s.length - 1;
	  while(i >= 0 && n > 0) {
	    var c = s.charCodeAt(i--);
	    if(c < 128) { 
	      ba[--n] = c;
	    }
	    else if((c > 127) && (c < 2048)) {
	      ba[--n] = (c & 63) | 128;
	      ba[--n] = (c >> 6) | 192;
	    }
	    else {
	      ba[--n] = (c & 63) | 128;
	      ba[--n] = ((c >> 6) & 63) | 128;
	      ba[--n] = (c >> 12) | 224;
	    }
	  }
	  ba[--n] = 0;
	  var rng = new nFilterSecureRandom();
	  var x = new Array();
	  while(n > 2) { 
	    x[0] = 0;
	    while(x[0] == 0) rng.nextBytes(x);
	    ba[--n] = x[0];
	  }
	  ba[--n] = 2;
	  ba[--n] = 0;
	  return new nFilterBigInteger(ba);
	}

	
	function nFilterRSAKey() {
	  this.n = null;
	  this.e = 0;
	  this.d = null;
	  this.p = null;
	  this.q = null;
	  this.dmp1 = null;
	  this.dmq1 = null;
	  this.coeff = null;
	}

	
	function nFilterRSASetPublic(N,E) {
	  if(N != null && E != null && N.length > 0 && E.length > 0) {
	    this.n = nFilterParseBigInt(N,16);
	    this.e = parseInt(E,16);
	  }
	  else
	    alert("Invalid RSA public key");
	}

	
	function nFilterRSADoPublic(x) {
	  return x.modPowInt(this.e, this.n);
	}

	
	function nFilterRSAEncrypt(text) {
	  var m = nFilterPkcs1pad2(text,(this.n.bitLength()+7)>>3);
	  if(m == null) return null;
	  var c = this.doPublic(m);
	  if(c == null) return null;
	  var h = c.toString(16);
	  if((h.length & 1) == 0) return h; else return "0" + h;
	}

	
	
	
	
	

	
	nFilterRSAKey.prototype.doPublic = nFilterRSADoPublic;

	
	nFilterRSAKey.prototype.setPublic = nFilterRSASetPublic;
	nFilterRSAKey.prototype.encrypt = nFilterRSAEncrypt;
	


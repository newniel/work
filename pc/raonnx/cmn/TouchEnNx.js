/**
****************************************************
TouchEnNx.js
****************************************************
| Version     작성자        수정일        변경사항 
 ---------  -------  -----------  ----------   
| v1.0.0.8    강남준    2019.06.11		
| v1.0.0.7    강남준    2019.04.01
| v1.0.0.6    강남준    2018.12.14    
| v1.0.0.5    백서린    2018.11.12    
| v1.0.0.4    강남준    2018.10.25   
| v1.0.0.3    강남준    2018.02.09   
| v1.0.0.2    허혜림    2017.12.20      
| v1.0.0.1    백서린    2017.01.20      최초
****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
* 본 코드에 대한 모든 권한은 (주)라온시큐어 있으며 동의없이 사용/배포/가공할 수 없습니다.
****************************************************
**/

var nxbasepath = "/raonnx";

var TouchEnNxConfig = {};

TouchEnNxConfig.path = {
		url : window.location.protocol + "//" + window.location.host,			
		base : nxbasepath
};

TouchEnNxConfig.path.base = TouchEnNxConfig.path.url + TouchEnNxConfig.path.base;

/** 최소 지원브라우저 버전정보 설정 */
TouchEnNxConfig.moduleMinVer = {
	
		MSIE			:	"6",
		chromeMinVer	:	"38",
		FireFoxMinVer	:	"36",
		OperaMinVer	 	:	"27",
		SafariMinVer	:	"5",
		SafariMinVerMac :   "6", //nxCR mac Safari 지원사양 다름
		Edge			:	"ALL"
};
	
/**	신한저축은행 라이선스 */
//TouchEnNxConfig.lic ="eyJ2ZXJzaW9uIjoiMS4wIiwiaXNzdWVfZGF0ZSI6IjIwMjEwMjE4MDkzNTM2IiwicHJvdG9jb2xfbmFtZSI6InRvdWNoZW5leCIsInV1aWQiOiJlMzgyMzIwYWVkYTY0NzY5YmM1N2ZmNjdkNmViMDljNSIsImxpY2Vuc2UiOiIzTkZ3SEpXcUlyRWFSR0VVZ3Vwd0tSdXl6ZklmdFdYbm43SnhGTjhTaGFzRUVib3pmMngzN1hHWXBiN1grYUM1a3NZY3ZScFVhdmdDTzNDeGN1SFlBN2tMbnF2OTJzZ0RmbXVxQ1BPSkNiWUFNd3d2XC8rUktHNmtXTHR6Z0xnYlBkNW9UTlwvaWdlUG5iWU5TZWUrRDBMOGhzWkNFM3BnS1dzWURkNnk1QTNYOWgwQVhjbEpaWDdwXC9CdjF1aGFLR2pKc2hjMXJFYWJ1RmdqaXZlY25tS0ZYUkNmVE44OERieklmazRrWU5mcytuSmZuVUw4bEtuY3VkRk52RkdOc2UxIn0=";
  TouchEnNxConfig.lic ="eyJ2ZXJzaW9uIjoiMS4wIiwiaXNzdWVfZGF0ZSI6IjIwMjEwMjIyMTYxNTI1IiwicHJvdG9jb2xfbmFtZSI6InRvdWNoZW5leCIsInV1aWQiOiJhMGU3YmVlMGY0MTU0NzkwOTVlNDA1ZDhmYjc5N2M0ZSIsImxpY2Vuc2UiOiJnT3Q2SjhvbTM0cmlIaDZwa0U3eDJHYUNuM1dwVUpJZmF1eUFydFBCcHVPc3VlK2E5V3dQbXI0N1VJMHBWclU1MmswUXBSaTNFRUNEdU9cLzFVTUlSR1BtTlEyRFluQ29yTENMd1Q3cnVEaE1aM2paWVwvOXNHUlU0dlwvRUJraTRMWGZzd01EV3RtUUpTeEdiRnAyMDFhN1V3NUpRandzblJtcERhdjBOaG4rMmVhdzNmeW1kZW1kc1RUT0laRFo3SllKeUt1MnZSdEpaOFo3N0VrN3JMYkRCeDhWazJmYXRGTXV5eG5qRWdnbzg4NUdPODFlV1Jwa1NrKzRNeTFQV28yWkJabWliVTdHd0x5Vnc5UFU3bXhOd0tXY29Sd3JPNEdUSHRCM2NVU1dPUT0ifQ==";

/** exproto debug */
TouchEnNxConfig.isDebug = false;

/** 모듈 자동 실행 여부*/
TouchEnNxConfig.onload = true;

/** 제품 별 사용 여부  */
TouchEnNxConfig.use	=	{
		nxkey	:	false,
		nxcr	:	false,
		nxweb	:	false,
		nxfw	:	true,
		ksbiz	: 	false,
		ksbizcompulsion : false
};
/** 제품 별 강제 설치 여부  */
TouchEnNxConfig.forcedinstall	=	{
		nxkey	:	true,
		nxcr	:	false,
		nxweb	:	false,
		nxfw	:	true,
		ksbiz	: 	false
};

/** 클라이언트 설치 시 이동할 페이지 */
TouchEnNxConfig.installPage = {
		tos		: "/ln/Download.jsp"+"?"+"&url=" + encodeURIComponent(window.location.href),
		nxkey	: "/ln/Download.jsp"+"?"+"&url=" + encodeURIComponent(window.location.href),
		nxcr	: TouchEnNxConfig.path.base + "/install/install_nxcr.html"+"?"+"&url=" + encodeURIComponent(window.location.href),
		nxweb	: TouchEnNxConfig.path.base + "/install/install_nxweb.html"+"?"+"&url=" + encodeURIComponent(window.location.href),
		nxfw	: "/ln/Download.jsp"+"?"+"&url=" + encodeURIComponent(window.location.href),
		ksbiz	: TouchEnNxConfig.path.base + "/install/install_ksbiz.html"+"?"+"&url=" + encodeURIComponent(window.location.href)
};

/** 클라이언트 설치 후 이동할 페이지 */
TouchEnNxConfig.tkMainpage = {
		tos		: "/index.html",
		nxkey	: "",
		nxcr	: "",
		nxweb	: "",
		nxfw	: "",
		ksbiz	: ""
};

/** 프로그래스바 사용 유무 */
/** 엣지브라우저에서 1sec 정도의 설치체크 시간이 필요 함으로 필수 사용을 권장한다.*/
TouchEnNxConfig.processingbar = {
		use	: true,
		path : TouchEnNxConfig.path.base + "/image/processing.gif"
};

/** demon 사용 브라우저 설정*/
TouchEnNxConfig.daemon = {
		SupportBrowser : ["EDGE", "CHROME", "FIREFOX", "OPERA"],
		macSupportBrowser : ["SAFARI"], //일단 mac은 safari만 데몬 지원
		linuxSupportBrowser : [],
		info			: {
			isUse			: true,
			portChecker		: TouchEnNxConfig.path.base + "/cmn/TouchEnNx_port_checker.js",
			localhost		: "wss://127.0.0.1",
			edgeStartPort	: 34581,
			portChkCnt		: 3,
			allSupport		: false
		}
};

/**
 * CHROME, FIREFOX, OPERA 브라우저에 대해 아래와 같이 동작한다.
 * mainextension : case1 : 데몬미설치,익스텐션 설치시 익스텐션으로 동작 
 *                 case2 : 데몬설치 ,익스텐션 미설치시 데몬으로 동작
 *                 case3 : 둘다 미설치일경우 데몬설치
 * onlydaemon    : 데몬으로 동작 및 설치
 * 공백 일 경우 ("")  : 익스텐션 동작 및 설치 
 */
 
TouchEnNxConfig.runtype	= "onlydaemon"; //windows용 runtype
TouchEnNxConfig.macRuntype = ""; //mac용 runtype
TouchEnNxConfig.linuxRuntype = ""; //linux용 runtype
/**
****************************************************
TouchEnNx_config.js
****************************************************
| Version     작성자        수정일        변경사항 
 ---------  -------  -----------  ----------
 | v1.0.0.7    강남준    2020.02.17
 | v1.0.0.6    강남준    2019.07.05
 | v1.0.0.5    강남준    2018.12.14
 | v1.0.0.4    백서린    2018.11.12
 | v1.0.0.3    강남준    2018.05.14
 | v1.0.0.2    허혜림    2018.01.31
 | v1.0.0.1    허혜림    2017.12.20          

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
****************************************************
**/

var nxKeyConfig ={};
nxKeyConfig.version = {
	
	extension :   {
		exChromeExtVer		:	"1.0.0.0",
		exFirefoxExtVer		:	"1.0.2.5",
		exFirefoxJpmExtVer	:	"1.0.1.12",
		exOperaExtVer		:	"1.0.1.14"
	},
		
	/** 키보드보안 설정 */
		tkappiver			:	"1.0.0.69",
		tkappmver			:	"1.0.0.59",
		exWinVer			:	"1.0.0.75",
		exWin64Ver			:	"1.0.0.75",
		exWinProtocolVer	:	"1.0.1.1243",
		daemonVer			:   "1.0.2.8",
		macDaemonVer		:   "1.0.1.5",
		linuxDaemonVer		:   "1.0.0.1",
		exMacVer			:	"1.0.0.11",
		exMacProtocolVer	:	"1.0.1.1392"
};

nxKeyConfig.module = {
	
	extension	:{
		//exChromeExtDownURL	: "https://chrome.google.com/webstore/detail/dncepekefegjiljlfbihljgogephdhph",
		exChromeExtDownURL	: "https://download.raonsecure.com/extension/chrome/chrome.html",
		exFirefoxExtDownURL	: TouchEnNxConfig.path.base + "/extension/touchenex_firefox.xpi",
		exFirefoxJpmExtDownURL	: TouchEnNxConfig.path.base + "/extension/jpm_touchenex_firefox.xpi",
		exOperaExtDownURL	: TouchEnNxConfig.path.base + "/extension/touchenex_opera.nex"
	},
	
		exWinClient		            :	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_32bit.exe",
		exWin64Client            	:	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_64bit.exe",
		daemonDownURL				:	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_32bit.exe",
		macDaemonDownURL			:	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_Installer.pkg",
	//	ubuntu32DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxKey/module/CrossEXService_32bit.deb",
	//	ubuntu64DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxKey/module/CrossEXService_64bit.deb",
	//	fedora32DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxKey/module/CrossEXService_32bit.rpm",
	//	fedora64DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxKey/module/CrossEXService_64bit.rpm",
		exMacClient					:	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_Installer.pkg",
		exMacProtocolDownURL		: 	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_Installer.pkg"
};

/** 키보드보안 E2E 를 사용하지 않을 경우 주석해제*/
//var TNK_SR = "";

/**	클라이언트 솔루션별 동작 설정*/
TouchEnNxConfig.solution={
		nxkey : {
				tekOption : {
					"pki": "TouchEnkeyEx",
				    "keyboardonly": "false",
				    "defaultenc": "false",
				    "verify": "1",
				    "defaultpaste": "true",
				    "iframename": "",
				    "usegetenc": "false",
				    "clearbufferonempty": "true",
				    "refreshsession": "true",
				    "improve": "true",
					"bstart": 0,
				    "setcallback": "false",
				    "usebspress": "false",
				    "ignoreprogress": "true",
				    "ignoreprogress2": "true",
				    "exformname": "",
				    "idbase": "false",
				    "allcrypt": "false",
					"browserinfo" : "",
					"cert" : "-----BEGIN CERTIFICATE-----MIIDETCCAfmgAwIBAgIJAO4t+//wr+bGMA0GCSqGSIb3DQEBCwUAMGcxCzAJBgNVBAYTAktSMR0wGwYDVQQKExRSYW9uU2VjdXJlIENvLiwgTHRkLjEaMBgGA1UECxMRUXVhbGl0eSBBc3N1cmFuY2UxHTAbBgNVBAMTFFJhb25TZWN1cmUgQ28uLCBMdGQuMB4XDTIwMTIwMjAxMzA0N1oXDTQwMTEyNzAxMzA0N1owDTELMAkGA1UEBhMCS1IwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCnWKmiiIg5Cf4xiKLjoolGc24nB+WKJ/9kbAtamev+YnlXj9WIUyZMmhuKHkM+dV/rQUGgWix2Wxw375/OPoX2JeNBwBvUb094jIEr6PUzEoQsN/IgSuGNJ/b+jQv6Fa7faMrjRkKBGsDslwljv4zlzWhiYPNr569N9OqVhJ6WDOS/yFBN2oW0Bu7dWM3rh4uaXCa+mZutLoQVc+vWCU9VmWEVz7avwr9ZitGSFM5f+tv/IkD+bPIBUIR1EdDEX7M8QylGMDvcATY4AHi7ckG1ILUKitqKGTlBxa5q5gPeeXa9r8JmpEC4p3NYZdKwdv9EAlyyICHSQRVy1J748FCBAgMBAAGjGjAYMAkGA1UdEwQCMAAwCwYDVR0PBAQDAgXgMA0GCSqGSIb3DQEBCwUAA4IBAQB3VS6eRv4YnVMGGrVMfMz/KSguOYXBmr96vmnvU2BbFgJd61OwSO9HNu9UVdBY0tOJGztgIeipj8oZpKfOydg8HcsbCFj1mGwjDS+hKer0ul5QZwVIXrNCG2Zor4oWjtjcj7ewYcSFaAMHi/COT+oWyZBCfgudf1DSPR94ST6gYAgQdBWkSZv/sbJ2GDYx6pOyTV7twNddKo/oqwQpUWN62dQ9gcOkhglw3Oufo3m6+8T7VYfMN8mApHL3G1kbXwgnMcksx8Jv3upuizLkrFdxtzADu95Y5rFhQCWU9vrmhj6HTSpgkcimPF5FiNJneHieEX69rSj0TOm7VF2uRYB1-----END CERTIFICATE-----",
					"srdk": TNK_SR,
					"generate_event": "false",
					"driverexcept": "0",
					"delayedck": "false",
					"shiftbypass": "true",
					"allowdup": "false",
					"enc2": "false",
				    "searchformname":"",
					"runtype": TouchEnNxConfig.runtype,
					"tk_isRunningSecurity" : "false", 
					"isAllowIdOverlap" : "true", //히든필드 중복오류 수정시 false설정 및 서버버전 v2.0.3.3 적용필요
					"defaultsecurityid" : "true",
					"newModule" : "true"
				}
		}
};
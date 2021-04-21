function initDataChk(){
	var check =true;
	$(":input").each(function() {
		var type = $(this).attr('type');
        var strformat=$(this).attr('strformat');
        if(type == "text"){
        	$(this).keyup(function(e){
        		var maxlength=$(this).attr('maxlength');
        		var nextelement=$(this).attr('nextelement');
        		var func=$(this).attr('func');
        		var value = $(this).val().replace(/\,/g,"");
        		if(value!=""){
	        		if(typeof(strformat)!="undefined"){
		        		if(strformat.length>0){
		        			if(strformat=="num"){
		        				if(!isIntegerOnly(value)){
		        					alert("숫자만 입력해주세요.");
		        					$(this).val('');
		    						$(this).focus();
		    						check = false;
		        				}
		        			}else if(strformat=="amt"){
		        				if(!isAmt(value)&&value.length>1){
		        					alert("0으로 시작하지 않는 숫자를 입력해주세요.");
		        					$(this).val('');
		        					$(this).focus();
		        					check =false;
		        				}
		        			}else if(strformat=="rat"){
		        				if(!isNumber(value)){
		        					alert("숫자만 입력해주세요.");
		        					$(this).val('');
		        					$(this).focus();
		        					check =false;
		        				}
		        			}else if(strformat=="kor"){
		        				if(!isKorean(value)){
		        					alert("한글만 입력해주세요.");
		        					$(this).val('');
		    						$(this).focus();
		    						check =false;
		        				}
		        			}else if(strformat=="eng"){
		        				if(!isEnglish(value)){
		        					alert("영문만 입력해주세요.");
		        					$(this).val('');
		    						$(this).focus();
		    						check =false;
		        				}
		        			}else if(strformat=="nkor"){
		        				if(!isNotKor(value)){
		        					alert("영문과 숫자만 입력해주세요.");
		        					$(this).val('');
		    						$(this).focus();
		    						check =false;
		        				}
		        			}
	        			}
	        		}
        		}
        		if(typeof(nextelement)!="undefined"){
	        		if(e.keyCode == 13&&nextelement.length>0){
	        			$("#"+nextelement).focus();
	        		}
	        		if(value.length>maxlength){
	        			alert("입력 자릿수를 초과하였습니다.");
	        			$(this).val('');
	        			$(this).focus();
	        			check = false;
	        		}
	        		if(nextelement.length>0&&value.length==maxlength){
	        			$("#"+nextelement).focus();
	        		}
        		}
        		if(typeof(func)!="undefined"){
        			if(e.keyCode == 13&&func.length>0){
        				func;
        			}
        		}
        	});
		}
    });
	return check;
}
function deleteFormat(){
	$(":input").each(function() {
		var type = $(this).attr('type');
        if(type == "text"||type == "hidden"){
        	var str = $(this).val().replace(/\,/g,'').replace(/\-/g,'');
        	$(this).val(str);
        }
	});
}
/*
 * isNumber
 * 숫자만 입력 되었는지 확인한다.(음수,소수허용)
 *
 * @param   string
 * @return  boolean
**/
function isNumber(num) 
{
	var validPattern  = /^[\+-]?\d+[.]?\d*$/;
	return  validPattern.test(num);
}
/*
 * isIntegerOnly
 * 숫자만 입력 되었는지 확인한다.(0-9)
 *
 * @param   string
 * @return  boolean
**/
function isIntegerOnly(num) 
{
	var validPattern   = /[0-9]+$/g;
	return  validPattern.test(num);
}
/*
 * isAmt
 * 0으로 시작하는 숫자만 입력 되었는지 확인한다.(0-9)
 *
 * @param   string
 * @return  boolean
**/
function isAmt(num) 
{
	var validPattern   = /^[1-9]/;
	if(validPattern.test(num)){
		return isIntegerOnly(num);
	}else{
		return  false;
	}
}

/*
 * isEnglish
 * 영문만 입력 되었는지 확인한다.
 *
 * @param   string
 * @return  boolean
**/
function isEnglish(str)
{
	var regx = /^[A-Za-z]+$/g;
	/*
	for (i=0; i<str.length; i++)
	{
		if ((str.charCodeAt(i) > 0x3130 && str.charCodeAt(i) < 0x318F) || (str.charCodeAt(i) >= 0xAC00 && str.charCodeAt(i) <= 0xD7A3))
		{
			return false;
		} 
	}
	*/
	var chk = regx.test(str);
	return chk;
}

/*
 * isKorean
 * 한글만 입력 되었는지 확인한다.
 *
 * @param   string
 * @return  boolean
**/
function isKorean(str)
{
	for (i=0; i<str.length; i++)
	{
		if (!((str.charCodeAt(i) > 0x3130 && str.charCodeAt(i) < 0x318F) || (str.charCodeAt(i) >= 0xAC00 && str.charCodeAt(i) <= 0xD7A3)))
		{
			return false;
		}
	}
	return true;
}

/*
 * isKorean
 * 한글을 제외한 것만  입력 되었는지 확인한다.
 *
 * @param   string
 * @return  boolean
**/
function isNotKor(str)
{
	var regx = /^[A-Z|a-z|0-9]+$/gi;
	/*
	for (i=0; i<str.length; i++)
	{
		if ((str.charCodeAt(i) > 0x3130 && str.charCodeAt(i) < 0x318F) || (str.charCodeAt(i) >= 0xAC00 && str.charCodeAt(i) <= 0xD7A3))
		{
			return false;
		} 
	}
	*/
	return regx.test(str);
}

/**
 * isJuminNo
 * 주민번호 형식인지 체크 한다.
 *
 * @param   str
 * @return  boolean
 */
function isJuminNo(str) 
{
	var tmp = 0;
	var sex = str.substring(6, 7);
	var birthday;
	
	if (str == "1111111111111") 
	{
		return  true;
	}
	/*
	if (str.length < 13) 
	{
		return  true;
	}
	*/
	/*
	if(str.substring(7,13)=="******")
	{
		return  true;
	}
	*/
	
	if (sex == 1 || sex == 2) 
	{
		birthday = "19" + str.substring(0, 6);
	} 
	else if (sex == 3  || sex == 4)
	{
		birthday = "20" + str.substring(0, 6);
	} 
	else if (sex == 5 || sex == 6) 
	{
		return true;
	} 
	else 
	{
		return  false;
	}

	if (!isDateYMD(birthday)) 
	{
		return  false;
	}
	

	for (var i = 0; i < 12 ; i++) 
	{
		tmp = tmp + ((i%8+2) * parseInt(str.substring(i,i+1)));
	}

	tmp = 11 - (tmp %11);
	tmp = tmp % 10;

	if (tmp != str.substring(12, 13)) 
	{
		return  false;
	}

	return  true;
}



/*
 * isDateYMD
 * 날짜 체크
 *
 * @param   date(YYYYMMDD)
 * @return  boolean
 */
function isDateYMD(date) 
{
	if (date == null || date.length != 8) 
	{
		return  false;
	}

	if (!isNumber(date)) 
	{
		return  false;
	}

	var year    = eval(date.substring(0, 4));
	var month   = eval(date.substring(4, 6));
	var day     = eval(date.substring(6, 8));

	if (month > 12) 
	{
		return  false;
	}

	var totalDays;

	switch (eval(month)) 
	{
		case 1 :
			totalDays   = 31;
			break;
		case 2 :
			if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) 
			{
				totalDays   = 29;
			} 
			else 
			{
				totalDays   = 28;
			}
			break;
		case 3 :
			totalDays   = 31;
			break;
		case 4 :
			totalDays   = 30;
			break;
		case 5 :
			totalDays   = 31;
			break;
		case 6 :
			totalDays   = 30;
			break;
		case 7 :
			totalDays   = 31;
			break;
		case 8 :
			totalDays   = 31;
			break;
		case 9 :
			totalDays   = 30;
			break;
		case 10 :
			totalDays   = 31;
			break;
		case 11 :
			totalDays   = 30;
			break;
		case 12 :
			totalDays   = 31;
			break;
	}

	if (day > totalDays) 
	{
		return  false;
	}

	return  true;
}

/**
 * isEmail
 * 이메일 체크
 *
 * @param   email(string)
 * @return  boolean
 **/
function isEmail(email) 
{
	re  = /[^@]+@[A-Za-z0-9_-]+[.]+[A-Za-z]+/;

	if (re.test(email)) 
	{
		return  true;
	}

	return  false;
}
//법인번호 체크
function isCheckCorpNo(Sect) 
{	

	var  szChkDgt = new Array(1,2,1,2,1,2,1,2,1,2,1,2);
	var  szCoNo = Sect;
	// 법인번호 오류시 빠져나가는 방법
	//if ( szCoNo = "2150110001021")
	//    return true;
	
	var  lV1 = 0;
	var  nV2 = 0;
	var  nV3 = 0;
	
	nV2 = 0;
	
	for( var i = 0 ; i < 12 ; i++) 
	{
		lV1 = parseInt(szCoNo.substring(i,i+1)) * szChkDgt[i];
		
		if(lV1 >= 10) 
		{
			nV2 += lV1 % 10;
		} 
		else 
		{
			nV2 += lV1;
		}
	}
	
	nV3 = nV2 % 10;

	if( nV3 > 0 ) 
	{
		nV3 = 10 - nV3;
	} 
	else 
	{
		nV3 = 0;
	}
	
	if( szCoNo.substring(12,13) != nV3) 
	{
		return false;
	}
	
	return true;
}

function onlyNumber(obj){
	if(obj.value!=""){
		if(!isIntegerOnly(obj.value)){
			alert("올바르게 입력해 주세요.");
			obj.value = "";
		}
	}
}
//사업자등록번호 체크
function fnCheckBizNo(bizno) {
	var sum = 0;
	var getlist = new Array(10);
	if(bizno.lenght!=10){
		
		// 사업자번호가 1111111111 이면 TRUE RETURN
		if (bizno == "1111111111" ) {
			return  true;
		}
		var chkvalue    = new Array("1","3","7","1","3","7","1","3","5");
		
		for (var i=0; i<10; i++) {
			getlist[i]  = bizno.substring(i, i+1);
		}
		
		for (var i=0; i<9; i++) {
			sum += getlist[i] * chkvalue[i];
		}
		
		sum = sum + parseInt((getlist[8] * 5) / 10);
		
		var sidliy  = sum % 10;
		var sidchk  = 0;
		if (sidliy != 0) {
			sidchk  = 10 - sidliy;
		} else {
			sidchk  = 0;
		}
	
		if (sidchk != getlist[9]) {
			return  false;
		}
		return  true;
	}
}
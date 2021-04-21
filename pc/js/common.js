/**
 *���ڿ����� �¿� ��������
*/

function trim(str)
{
		 var i,j = 0;
		 var objstr;
		 for(i=0; i< str.length; i++){
		  if(str.charAt(i) == ' ')
		   j=j + 1;
		  else 
		   break;
		 }
		 str = str.substring(j, str.length - j + 1);
		 
		 i,j = 0;
		 for(i = str.length-1;i>=0; i--){
		  if(str.charAt(i) == ' ')
		   j=j + 1;
		  else 
		   break;
		 }
		 return str.substring(0, str.length - j);
		}
		
	//return str.replace(/(^\s*)|(\s*$)/g, "");

/**
 *  �޸�����.
 */

function putComma(input) {
    var num = input;

    if (num < 0) {
        num *= -1;
        var minus = true
    }else{
        var minus = false
    }

    var dotPos = (num+"").split(".")
    var dotU = dotPos[0]
    var dotD = dotPos[1]
    var commaFlag = dotU.length%3

    if(commaFlag) {
        var out = dotU.substring(0, commaFlag)
        if (dotU.length > 3) out += ","
    }
    else var out = ""

    for (var i=commaFlag; i < dotU.length; i+=3) {
        out += dotU.substring(i, i+3)
        if( i < dotU.length-3) out += ","
    }

    if(minus) out = "-" + out
    if(dotD) return out + "." + dotD
    else return out
}

/**
*  ���ڿ��� �ִ� Ư������������ �ٸ� ������������ �ٲٴ� �Լ�.
*/


function replace(targetStr, searchStr, replaceStr)
{
    var len, i, tmpstr;

    len = targetStr.length;
    tmpstr = "";

    for ( i = 0 ; i < len ; i++ ) {
        if ( targetStr.charAt(i) != searchStr ) {
            tmpstr = tmpstr + targetStr.charAt(i);
        }
        else {
            tmpstr = tmpstr + replaceStr;
        }
    }

    return tmpstr;
}


function replace(targetStr, searchStr, replaceStr)
{
    var i=0,j=0;
    if (targetStr == null || searchStr == null || replaceStr == null) return "";

    var tmpStr = "";

    var tlen = targetStr.length;
    var slen = searchStr.length;


    var i=0;
    var j=0;

    while (i < tlen - slen+1)
    {
        j = i + slen;

        if (targetStr.substring(i,j) == searchStr)
        {
            tmpStr += replaceStr;
            i += slen;

        }
        else
        {
            tmpStr += targetStr.substring(i, i + 1);
            i++;
        }



    }

    tmpStr +=  targetStr.substring(i);

    return tmpStr;


}
/**
 �Է°����� �޸��� ���ش�.
*/
function removeComma(input) {
   return input.replace(/,/gi,"");
}
/**
#Object�� �ƴ� String:value�� �Է¹޾� �޸��� ����
*/
function wfcb_putComma(num) {
   if (num < 0) {
       num *= -1;
       var minus = true
   }else{
       var minus = false
   }

   num = removeLeftZero(num);

   var dotPos = (num+"").split(".")
   var dotU = dotPos[0]
   var dotD = dotPos[1]
   var commaFlag = dotU.length%3
   if(commaFlag) {
       var out = dotU.substring(0, commaFlag)
       if (dotU.length > 3) out += ","
   }
   else var out = ""

   for (var i=commaFlag; i < dotU.length; i+=3) {
       out += dotU.substring(i, i+3)
       if( i < dotU.length-3) out += ","
   }

   if(minus) out = "-" + out
   if(dotD) return out + "." + dotD
   else return out
}
/**
* ���ڿ� ������ 0�� ,�� �����Ѵ�.(��ȯ���� �ַ� ���)
*/
function removeLeftZero(inputValue){
   inputValue = inputValue + "";
   var zeroIdx = 0;
   for (var i = 0; i < inputValue.length; i++){
       if (inputValue.charAt(i) != "0" && inputValue.charAt(i) != ","){
           break;
       }
       else zeroIdx++;
   }

   return inputValue.substring(zeroIdx) == "" ? "0" : inputValue.substring(zeroIdx);
}
/**
* �ݾ��� �ѱ۷� ��ȯ
*/
function NUM_TO_HAN(num, mode)
{

/*   fnc(num,1):alert
   fnc(num,2):����ȭ��
   fnc(num,3,return_input):�ٸ� input�� ��ȯ
*/
   var return_input = "";
   if ( num == "" || num == "0" ) {
       if ( mode == "3" ) {
           return_input = "";
       }
       return;
   }

   num=new String(num);
   num=num.replace(/,/gi,"");

   var len  = num.length;
   var temp1 = "";
   var temp2 = "";

   if ( len/4 > 3 && len/4 <= 4 ) {
       if ( len%4 == 0 ) {
           temp1 = ciphers_to_han(num.substring(0,4)) + "��" + ciphers_to_han(num.substring(4,8)) + "��" + ciphers_to_han(num.substring(8,12)) + "��" + ciphers_to_han(num.substring(12,16));
       } else {
           temp1 = ciphers_to_han(num.substring(0,len%4)) + "��" + ciphers_to_han(num.substring(len%4,len%4+4)) + "��" + ciphers_to_han(num.substring(len%4+4,len%4+8)) + "��" + ciphers_to_han(num.substring(len%4+8,len%4+12));
       }
   } else if ( len/4 > 2 && len/4 <= 3 ) {
       if ( len%4 == 0 ) {
           temp1 = ciphers_to_han(num.substring(0,4)) + "��" + ciphers_to_han(num.substring(4,8)) + "��" + ciphers_to_han(num.substring(8,12));
       } else {
           temp1 = ciphers_to_han(num.substring(0,len%4)) + "��" + ciphers_to_han(num.substring(len%4,len%4+4)) + "��" + ciphers_to_han(num.substring(len%4+4,len%4+8));
       }
   } else if ( len/4 > 1 && len/4 <= 2 ) {
       if ( len%4 == 0 ) {
           temp1 = ciphers_to_han(num.substring(0,4)) + "��" + ciphers_to_han(num.substring(4,len));
       } else {
           temp1 = ciphers_to_han(num.substring(0,len%4)) + "��" + ciphers_to_han(num.substring(len%4,len));
       }
   } else if ( len/4 <= 1 ) {
       temp1 = ciphers_to_han(num.substring(0,len));
   }

   for (var i=0; i<temp1.length; i++) {
       temp2 = temp2 + num_to_han(temp1.substring(i, i+1));
   }

   temp3=new String(temp2);
   temp3=temp3.replace(/�� ��/gi,"�� ");
   temp3=temp3.replace(/�� ��/gi,"�� ");

   if ( mode == 1 ) {
       alert(temp3 + " ��");
   } else if ( mode == 2 ) {
       return temp3;
   } else if ( mode == 3 ) {
       return_input = " " + temp3 + "��";
   }

   return return_input;
}



function ciphers_to_han(num)
{
   var len  = num.length;
   var temp = "";

   if ( len == 1 ) {
       temp = num;
   } else if ( len == 2 ) {
       temp = num.substring(0,1) + "��" + num.substring(1,2);
   } else if ( len == 3 ) {
       temp = num.substring(0,1) + "��" + num.substring(1,2) + "��" + num.substring(2,3);
   } else if ( len == 4 ) {
       temp = num.substring(0,1) + "õ" + num.substring(1,2) + "��" + num.substring(2,3) + "��" + num.substring(3,4);
   }

   num=new String(temp);
   num=num.replace(/0��/gi,"");
   num=num.replace(/0��/gi,"");
   num=num.replace(/0õ/gi,"");
   return num;
}

//���� --> �ѱ�: num_to_han, ciphers_to_han, NUM_TO_HAN
function num_to_han(num) {
   if ( num == "1" ) {
       return "��";
   } else if ( num == "2" ) {
       return "��";
   } else if ( num == "3" ) {
       return "��";
   } else if ( num == "4" ) {
       return "��";
   } else if ( num == "5" ) {
       return "��";
   } else if ( num == "6" ) {
       return "��";
   } else if ( num == "7" ) {
       return "ĥ";
   } else if ( num == "8" ) {
       return "��";
   } else if ( num == "9" ) {
       return "��";
   } else if ( num == "��" ) {
       return "��";
   } else if ( num == "��" ) {
       return "��";
   } else if ( num == "õ" ) {
       return "õ";
   } else if ( num == "��" ) {
       return "�� ";
   } else if ( num == "��" ) {
       return "�� ";
   } else if ( num == "��" ) {
       return "�� ";
   } else if ( num == "0" ) {
       return "";
   } else                   {
       return "";
   }

}

/**
* �ݾ׺����ֱ�
*/
function changeAmt(field, amount) {
   amount = trim(amount);

   if(amount.length <= 15) {    	
       amount = amount != "" ? parseInt(removeComma(amount)) : "";
       if(amount != "" && amount != "0") {        	
           var curr_amt = removeComma(document.all[field].value);
           curr_amt = wfcb_putComma(Number(curr_amt) + Number(amount));
           if(eval("document.getElementById(\""+field+"_HAN"+"\")")==undefined || eval("document.getElementById(\""+field+"_HAN"+"\")")==null || eval("document.getElementById(\""+field+"_HAN"+"\")")=="undefined"){
           	alert("1 : " + curr_amt);
               document.all[field].value = curr_amt;
               alert("1 : " + document.all[field].value);
               alert("2 : " + field);
               
           }else{
           	alert("2 :" + curr_amt);
               document.all[field].value = curr_amt;
               alert("2 : " + document.all[field].value);
               alert("2 : " + field);
               document.frm.TRNAMT.value = curr_amt;
               eval("document.getElementById(\""+field+"_HAN"+"\")").innerHTML = "(" + NUM_TO_HAN(curr_amt, 2) + " ��)";
           }
       }
       else {        	
           document.all[field].value = "";
           alert( document.all[field].value);
           if(eval("document.getElementById(\""+field+"_HAN"+"\")")==undefined || eval("document.getElementById(\""+field+"_HAN"+"\")")==null || eval("document.getElementById(\""+field+"_HAN"+"\")")=="undefined"){
           }else{
               eval("document.getElementById(\""+field+"_HAN"+"\")").innerHTML = "(�� ��)";
           }

       }
   }
}

//���ó�¥
function fn_getToDay()
{

  var date = new Date();

  var year  = date.getFullYear();
  var month = date.getMonth() + 1; // 1��=0,12��=11�̹Ƿ� 1 ����
  var day   = date.getDate();

  if (("" + month).length == 1) { month = "0" + month; }
  if (("" + day).length   == 1) { day   = "0" + day;   }

  return ("" + year + month + day)

}

//��¥ �Է°��� �Ⱓ üũ
function checkDateTerm( startObj, endObj, gubun ){

    var conv_startDate = trim(startObj.value);
    var conv_endDate = trim(endObj.value);

    conv_startDate = replace(conv_startDate, "-", "");
    conv_endDate = replace(conv_endDate, "-", "");

    // ��¥��ȿ��üũ
    if(!(validateDate(startObj) && validateDate(endObj))) {
        return false;
    }

    if ( eval(conv_startDate - conv_endDate) > 0 ) {
        alert("�������� ������ ������ ��¥�� �����ϰų� �Է��Ͽ� �ֽʽÿ�.");
        startObj.focus();
        return false;
    }
    
    /*
    if((gubun != undefined && gubun == 'S') && eval(conv_startDate - conv_endDate) < -300 ) {
        alert("�˻��Ⱓ�� 3������ �ʰ��� �� �����ϴ�.");
        startObj.focus();
        return false;
    }
	*/
    return true;
}

//��¥�� Validation  Check
//2013.03.26 ������ - ���� ����
 function validateDate(obj) {
 	
 	var vdate   = replace(obj.value, "-", "");
 	var lvYear  = vdate.substring(0,4);
 	var lvMonth = vdate.substring(4,6);
 	var lvDay   = vdate.substring(6,8);
 	
     var daysInMonth = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31");

     if(eval(lvYear)%4 == 0 && eval(lvYear)%100 != 0 || eval(lvYear)%400 == 0) {
     	daysInMonth[1] = "29";
     } else {
     	daysInMonth[1] = "28";
     }
     
     if(eval(lvDay) > 0 && eval(lvDay) <= eval(daysInMonth[eval(lvMonth)-1])) {
         return true;
     } else {
         alert("�Էµ� ��¥�� �ùٸ��� �ʽ��ϴ�. Ȯ�� �� �ٽ� �Է��Ͻʽÿ�.");
         obj.focus();
         return false;
     }
 }


/**
 * ��ȸ �������� ����
 * gbn : ���а�
 * �� : 2013.05.05 ���� 3���� �� => 2013.02.06
 */
function uf_getCalendarTerm(index, gubun){
	
	var baseDt  = fn_getToDay();
	var yyyy    = Number(baseDt.substring(0,4));
	var mm      = Number(baseDt.substring(4,6));
	var dd      = Number(baseDt.substring(6,8)) +1;
	var bndDD   = 0;
	
	if (yyyy%4 == 0 && yyyy%100 != 0 || yyyy%400 == 0){
        bndDD = 29;
    }else{
    	bndDD = 28;
    }
	
	var lastDay = new Array(31, bndDD, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	var strDt = "";
	
	if(gubun == 'D'){
		if(dd <= index){
			mm += -1;
			if(mm == 0){
				yyyy -= 1;
				mm    = 12;
			}
			dd += (lastDay[mm-1] - index);
		}else{
			dd -= index;
		}
	}
	
	if(gubun == 'M'){
		if(Number(baseDt.substring(6,8)) == lastDay[mm-1]){
			dd == 1;
		}
		
		if(mm <= index){
			yyyy -= 1;
			mm += (12 - index);
		}else{
			mm -= index;
		}
	}
	
	if(dd > lastDay[mm-1]){
		dd = lastDay[mm-1];
	}
	
	strDt = yyyy + "-" + lpad(mm, 2, "0") + "-" + lpad(dd, 2, "0");
	return strDt; 
}
/*
 * ��¥���˿� �´��� �˻�
 */
function isDateFormat(d) {
    var df = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    return d.match(df);
}

/*
 * ���⿩�� �˻�
 */
function isLeaf(year) {
    var leaf = false;
    if(year % 4 == 0) {
        leaf = true;
        if(year % 100 == 0) leaf = false;
        if(year % 400 == 0) leaf = true;
    }
    return leaf;
}

/*
 * ��¥�� ��ȿ���� �˻�
 */
function isValidDate(d) {
    // ���˿� �ȸ����� false����
    var chkDate = "";
    if(d.length==8) {
		chkDate = d.substring(0,4) + "-" + d.substring(4,6) + "-" + d.substring(6,8);
	} else {
		chkDate = d;
	}
    if(!isDateFormat(chkDate)) {
        return false;
    }
    var month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var dateToken = chkDate.split('-');
    var year = Number(dateToken[0]);
    var month = Number(dateToken[1]);
    var day = Number(dateToken[2]);
    // ��¥�� 0�̸� false
    if(day == 0) {
        return false;
    }
    var isValid = false;
    // �����϶�
    if(isLeaf(year)) {
        if(month == 2) {
            if(day <= month_day[month-1] + 1) {
                isValid = true;
            }
        } else {
            if(day <= month_day[month-1]) {
                isValid = true;
            }
        }
    } else {
        if(day <= month_day[month-1]) {
            isValid = true;
        }
    }
    return isValid;
}

function changeCheckAmt2(field, amount) {

    var frm = document.frm;
    
    switch(amount)
    {
        case '100000':
       	 $("select[name=CHECKTYPE] option[value=13]").attr("selected",true);
            break;
        case '300000':
        	 $("select[name=CHECKTYPE] option[value=14]").attr("selected",true);
            break;
        case '500000':
        	 $("select[name=CHECKTYPE] option[value=15]").attr("selected",true);
            break;
        case '1000000':
        	 $("select[name=CHECKTYPE] option[value=16]").attr("selected",true);
            break;
        default:
        	 $("select[name=CHECKTYPE] option[value=19]").attr("selected",true);
    }

    amount = trim(amount);

    if(amount.length <= 15) {
        amount = amount != "" ? parseInt(removeComma(amount)) : "";
        if(amount != "" && amount != "0") {
            var curr_amt = removeComma(document.all[field].value);
            curr_amt = wfcb_putComma(Number(amount));
            if(eval("document.getElementById(\""+field+"_HAN"+"\")")==undefined || eval("document.getElementById(\""+field+"_HAN"+"\")")==null || eval("document.getElementById(\""+field+"_HAN"+"\")")=="undefined"){
                document.all[field].value = curr_amt;
            }else{
                document.all[field].value = curr_amt;
                eval("document.getElementById(\""+field+"_HAN"+"\")").innerHTML = "(" + NUM_TO_HAN(curr_amt, 2) + ") ��";
            }
        }
        else {
            document.all[field].value = "";
            if(eval("document.getElementById(\""+field+"_HAN"+"\")")==undefined || eval("document.getElementById(\""+field+"_HAN"+"\")")==null || eval("document.getElementById(\""+field+"_HAN"+"\")")=="undefined"){
            }else{
                eval("document.getElementById(\""+field+"_HAN"+"\")").innerHTML = "";
            }
            
        }
    }
}

/**
 * ���ڿ��� ����Ʈ ���̸� ����
 */
function getStringByteLength(str) {
    var byteLength = 0;
    for (var inx = 0; inx < str.length; inx++) {
        var oneChar = escape(str.charAt(inx));
        if ( oneChar.length == 1 ) {
            byteLength ++;
        } else if (oneChar.indexOf("%u") != -1) {
            byteLength += 2;
        } else if (oneChar.indexOf("%") != -1) {
            byteLength += oneChar.length/3;
        }
    }
    return byteLength;
}

/**
 * ���õ� üũ�ڽ��� �ִ��� üũ
 */
function hasCheckedBox(input) {
    return hasCheckedRadio(input);
}

/**
 * ���õ� ������ư�� �ִ��� üũ
 */
function hasCheckedRadio(input) {
    if (input.length > 1) {
        for (var inx = 0; inx < input.length; inx++) {
            if (input[inx].checked) return true;
        }
    } else {
        if (input.checked) return true;
    }
    return false;
}

////////////////////////////////////////////////////////////////
//������ �������� ����
////////////////////////////////////////////////////////////////

//get ����� �Ķ���͸� �ش����� input hidden ��ü�� �����Ѵ�.
function get2post(frm,sSearch){
if (sSearch.length > 0) {

   var asKeyValues = sSearch.split('&');
   var asKeyValue  = '';

   for (var i = 0; i < asKeyValues.length; i++) {

       asKeyValue = asKeyValues[i].split('=');
       var e = document.createElement("input");
       e.setAttribute("type","hidden");
       e.setAttribute("name",asKeyValue[0]);
       e.setAttribute("value",asKeyValue[1]);
       e.setAttribute("_temp","true");

//     alert("[" + e.name +"]:[" + e.value +"]");

       frm.appendChild(e);
   }
}
//alert("form ��ü ����" + frm.elements.length);
}

//get2post�� ������ �ӽ� ��ü�� �ı��Ѵ�.
function removeTempAttribute(frm){
var idx=0;
while (idx<frm.elements.length) {
   var obj = frm.elements[idx];

   if( obj.getAttribute("_temp") != null && obj.getAttribute("_temp") == "true"){
       frm.removeChild(obj);
       continue;
   }
   idx++;
}
}

/**
 *  ��ư Ŭ���� �̺�Ʈ���� (retr_0001A_01 ��������ȸ)
 * @param val,idx
 */
function fnDatil(val, idx){
	switch(idx){
	//�����������ݳ�����ȸ �̵�
	case 1 : {
		$("#href_frm input:[name='req_ACCNO']").val(val);
		$('#href_frm').attr('action','retr_0002A_01.act');
		XecureSubmit($("#href_frm").get(0));
		break;
	};
	//����/���� ������ȸ �̵�
	case 3 : {
		$("#href_frm input:[name='req_ACCNO']").val(val);
		$('#href_frm').attr('action','retr_0003A_01.act');
		XecureSubmit($("#href_frm").get(0));
		break;
		
	};
	//���� ������ȸ �̵�
	case 5 : {
		$("#href_frm input:[name='req_ACCNO']").val(val);
		$('#href_frm').attr('action','retr_0004A_01.act');
		XecureSubmit($("#href_frm").get(0));
		break;
		
	};
	//��ī������ ������ȸ �̵�
	case 7 : {
		$("#href_frm input:[name='req_ACCNO']").val(val);
		$('#href_frm').attr('action','retr_0005A_02.act');
		XecureSubmit($("#href_frm").get(0));
		break;
		
	};
	//��ī������ ������ȸ �̵�
	case 8 : {
		$("#href_frm input:[name='req_ACCNO']").val(val);
		$('#href_frm').attr('action','retr_0005A_03.act');
		XecureSubmit($("#href_frm").get(0));
		break;
		
	};
	
	// ��� �̵�
	case 2 :{
		$("#href_frm input:[name='TRNSENDACCNO']").val(val);
		$('#href_frm').attr('action','acct_0001A_01.act');
		XecureSubmit($("#href_frm").get(0));
		break;
		
	};
	//�Ա�
	case 4 :case 6 : {
		$("#href_frm input:[name='QTRNRECACCNO']").val(val);
		$('#href_frm').attr('action','acct_0001A_01.act');
		XecureSubmit($("#href_frm").get(0));
		break;
	
	};
	}
	
	
}
/**
 * ��ȸ �Ⱓüũ
 * @param startDt
 * @param endEt
 * @returns {Boolean}
 */

function checkThreeMonth(startDt, endEt) {
	var startDate = new Date();
	var endDate = new Date();
 
	if((startDt != null && startDt != undefined)
		&& startDt.length == 8) {
		startDate = new Date(parseInt(startDt.substring(0, 4)),
		parseInt(removeLeftZero(startDt.substring(4, 6)))-1,
		parseInt(removeLeftZero(startDt.substring(6, 8))),
		startDate.getHours(), startDate.getMinutes());
	}
	if((endEt != null && endEt != undefined)
		&& endEt.length == 8) {
		endDate = new Date(parseInt(endEt.substring(0, 4)),
		parseInt(removeLeftZero(endEt.substring(4, 6)))-1,
		parseInt(removeLeftZero(endEt.substring(6, 8))),
		endDate.getHours(), endDate.getMinutes());
	}

	var diffYear = endDate.getFullYear() - startDate.getFullYear();
	var diffMonth = endDate.getMonth() - startDate.getMonth();
	var diffDate = endDate.getDate() - startDate.getDate();
	if(diffYear > 1)
	{
		return true;
	}
	if(diffYear > 0)
	{
		diffMonth = endDate.getMonth() - startDate.getMonth() + 12;
	}
	if(diffMonth > 3)
	{
		return true;
	}
	else if(diffMonth == 3)
	{
		if(diffDate > 0)
		{
			// ���� ���̰� 3�ΰ��. ��¥���̰� ����̸� 3���� ����
			return true;
		}
	}
	return false;
}
//maxLengthByte ��ŭ üũ�ؼ� ������ alertâ ���.
//thisObj : ���� üũ�� ���õ� textArea id��
//maxLengthByte : byte ���̰�
//ex) onkeyup="textAreaLengthCheck('cbyte01', 1500)"
function textAreaLengthCheck(thisObj, maxLengthByte) { 
 
	var tempByteLength = 0, cutByteLength = 0;  
	var objID = document.getElementById(thisObj);

	for(var i = 0; i < objID.value.length; i++) {  

		if(escape(objID.value.charAt(i)).length > 4) {  
			tempByteLength += 2; 
		} else { 
			tempByteLength++;  
		} 

		if(tempByteLength < maxLengthByte) {  
			cutByteLength++;  
		} 
	}  

	if(tempByteLength > maxLengthByte) {  
		objID.value = objID.value.substring(0, (cutByteLength%2==1)?cutByteLength:cutByteLength+1);
	}  
}

/* �޴��� �������� �̿���
 * str : - 01 : �������� ����/�̿� ����(https://cert.vno.co.kr/app/agree/agree_m_01.jsp)
 * 		 - 02 : �����ĺ����� ó�� ����(https://cert.vno.co.kr/app/agree/agree_m_02.jsp)
 * 		 - 03 : ��Ż� �̿��� ����(https://cert.vno.co.kr/app/agree/agree_m_03.jsp)
 *		 - 04 : ���� �̿��� ����(https://cert.vno.co.kr/app/agree/agree_m_04.jsp)
 */
function fnOpen_phone_consent(consentGubun) {
	
	var strUrl		= "https://cert.vno.co.kr/app/agree/agree_m_"+ consentGubun +".jsp";
	var strWidth	= "800";
	var strHeigth	= "550";
	var strX		= ( screen.width  - strWidth) / 2;
	var strY		= ( screen.height - strHeigth) / 2;
	
	var openWin = window.open(strUrl,"phoneConsentPop","toolbar=no,menubar=no,location=no,scrollbars=yes,status=no,top="+ strY +",left="+ strX +",width="+ strWidth +",height="+ strHeigth );
	openWin.focus();
	
}

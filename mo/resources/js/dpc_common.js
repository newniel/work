var iajax   	= new Object();		
var iutil		= new Object();		/* 9. 유틸 객체				*/
iajax.postparam = "";

iajax.addParam = function(name1, value1)
{
	if ( typeof(value1) == "number" ) value1 = String(value1);
	
	var temp = iutil.encodeURL(name1) + "=" + iutil.encodeURL(value1) + "&";
    iajax.postparam += temp;
};


/**
 * clearParam
 * 파라메터를 정보를 초기화한다.
 *
 **/
iajax.clearParam = function()
{
	iajax.postparam = "";
};

/**
 * encodeURL
 * 문자열을 UTF-8 형식으로 인코딩
 *
 * @param string
 * @return string
 */
iutil.encodeURL = function(str)
{
//	console.log(str);
    var s0, i, s, u;
    s0 = "";                // encoded str
    // scan the source
    for (i = 0; i < str.length; i++) 
    {   
        s = str.charAt(i);
        u = str.charCodeAt(i);          // get unicode of the char
        if (s == " "){s0 += "+";}       // SP should be converted to "+"
        else 
        {
        	// check for escape
            if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a)))
            {       
                s0 = s0 + s;            // don't escape
            }
            else // escape
            {                  
                if ((u >= 0x0) && (u <= 0x7f)) // single byte format
                {     
                    s = "0"+u.toString(16);
                    s0 += "%"+ s.substr(s.length-2);
                }
                else if (u > 0x1fffff) // quaternary byte format (extended)
                {     
                    s0 += "%" + (0xf0 + ((u & 0x1c0000) >> 18)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
                else if (u > 0x7ff) // triple byte format
                {        
                    s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
                else // double byte format
                {                      
                    s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
            }
        }
    }
    return s0;
};



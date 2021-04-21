var ing   = new Object();
ing.process  = false;

ing.show = function() {
  if( ing.process)  //요청중이라면 실행 못하도록
  {
	 //alert('작업을 수행중입니다.');
	 return false;
  }
  
  $("body").css("overflow","hidden");
  ing.process=true;  //요청중으로 바꿈
  $("body").prepend('<div id="___prevent_div" style="left:0;top:0;width:100%;height:1000%;position:absolute;z-index:8000;background-color:#AAAAAA;filter:Alpha(opacity=20);Opacity:0.2;"></div>' +
		    '<div id="tacWrap" style="no-repeat center center;left:30%;;top:50%;width:0px;height:0px;position:absolute;z-index:9000;">' +
			'<div class="Area">'+
			'<div class="mw wid350">'+
			'<div class="layerType layerWrap">'+
			'		<h4 class="hide">프로그레스 바</h4>'+					
			'		<p class="progress tac"><strong class="point_blue">처리중입니다.</strong> 잠시만 기다려주십시오.</p>'+	
			'	</div>'+				
			'</div>'+
		'</div>'+
	'</div>');
  $('#___prevent_div').show();
  $('#tacWrap').show();
  
  return true;
}


ing.hide = function() {
	try{
		$("body").css("overflow","auto");
		ing.process = false;
		$('#tacWrap').hide();
		$('#___prevent_div').hide();
	}catch(e){
	  //alert("부모창에서 ing.js를 링크하지 않았습니다."+e.);
	}
	
}
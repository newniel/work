/**
 * 모바일대출4차개선 스크립트
 */

// 공통파라미터
var fnCommon = {};

// fnCommon.isApp = false;   // 앱 여부
// function fnCommon_addComma( value ){};  // 공통함수 ex.



	/* --------------------------------------------------------------------------------------
		실명인증/약관동의/본인인증 통합 화면
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_001 = {

		/* --------------------------------------------------------------------------------------
			기본수행
			loanRenewal4_001.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// 사전체크리스트 열기
			$("#slid_1_li").addClass("active");  // 활성화
			$("#slid_1_div").show();  // 하단 노출

		    // 약관동의 체크박스 클릭 이벤트
			$("input[type='checkbox'][name='agree_chk']").on("change", loanRenewal4_001.fnEvent_CheckChange );

			// 슬라이드 이벤트 생성
			$('.toggleList li .btnToggle').on("click", loanRenewal4_001.fnEvent_Slide );

		    // 본인인증 탭 메뉴 클릭 이벤트 생성
			$("#tab_button_official").on("click", loanRenewal4_001.fnEvent_TabClick );
			$("#tab_button_mobile").on("click", loanRenewal4_001.fnEvent_TabClick );
			$("#tab_button_credit").on("click", loanRenewal4_001.fnEvent_TabClick );

			// 고객명 변경 이벤트
			$("input[type='text'][name='cert_custNm']").on("keyup", loanRenewal4_001.fnKeyup_custNm );


			/*
			// style 넓이 반영 시점때문에 load 후에 탭선택버튼 노출로직 별도구현
			// 본인인증 탭 선택 버튼 생성
			loanRenewal4_001.fnShowTabButton();
			*/


			// 본인인증 탭 메뉴 클릭 이벤트 발생
			loanRenewal4_001.fnEvent_TabClick( {target:{id:"tab_button_official",className:""}} );

			// 스크롤 상단으로
		    // $('html,body').animate({ scrollTop: 0 },500);


			// -- nFilter --		// 보안키패드
			setNFilterScreenSize($(window).width(), window.innerHeight);
			setNFilterCommon(document.getElementById('resid_no2'), "mode=number");   // 주민번호 뒷자리
			setNFilterCommon(document.getElementById('card_no'), "mode=number");  // 카드번호
			//setNFilterCommon(document.getElementById('card_no_4'), "mode=number");  // 카드번호
			//setNFilterCommon(document.getElementById('valid_trm_yymm'), "mode=number");  // 유효기간 연월
			//setNFilterCommon(document.getElementById('cd_pwd'), "mode=number");   // 비밀번호(앞 2자리 입력)
			//	setNFilterInputSize("small");
			nFilterScrollto(false);
			setNFilterMobileInit(); //mobile
			// -- nFilter --


			// 단말 휴대폰번호 선취득 여부
			var getPhoneNumber_flag = false;

			// 앱여부
			var isApp_flag = fnCommon_isApp();
			if(isApp_flag){

				// Android
				if( fnCommon_isNull(isIOS, "boolean") ){
					getPhoneNumber_flag = true;
				}
			}

			// 단말 휴대폰번호 선취득
			if(getPhoneNumber_flag){

				// 단말정보 받은 후 수행할 함수 *plugin 수행 시점차이때문에 콜백을 사용해야함
				// 고객기본정보 조회 // 비로그인 상태에서 접근한 경우에는 고객기본정보 알수없음
				var fnCallback = loanRenewal4_001.fnSearch_1;

				// 단말정보 받기 // 휴대폰번호
				fnCommon_getDeviceData("getPhoneNumber", fnCallback);

			}else{
				// 고객기본정보 조회 // 비로그인 상태에서 접근한 경우에는 고객기본정보 알수없음
				loanRenewal4_001.fnSearch_1();
			}

		},



		/* --------------------------------------------------------------------------------------
			본인인증 탭 선택 버튼 생성 // style 넓이 반영 시점때문에 load 후에 탭선택버튼 노출로직 별도구현
			loanRenewal4_001.fnShowTabButton
		fnShowTabButton : function(){

			// 앱여부
			var isApp = $("#isApp").val();
			var isApp_flag = false;

			if( !fnCommon_isNull(isApp)  &&  (isApp == true  ||  isApp == "true"  ||  isApp == "Y") ){
				isApp_flag = true;
			}

			if(isApp_flag){
				$("#tab_button_1").show();
				$("#tab_button_2").hide();
			}else{
				$("#tab_button_1").hide();
				$("#tab_button_2").show();
			}
		},
		 -------------------------------------------------------------------------------------- */



		/* --------------------------------------------------------------------------------------
			약관상세보기 동의(닫기)
			loanRenewal4_001.fnClose_agreeDetail
		 -------------------------------------------------------------------------------------- */
		fnClose_agreeDetail : function(e){

			// 동의버튼인 경우 동의값 설정
			var button_id = e.target.id;
			if( !fnCommon_isNull(button_id)  &&  button_id == "agree_view_popup_close" ){
				agree_chk_all_show_flag = true;   // 약관열람여부 // 전체
			}

			// 스크롤 이동 재사용 시점을 위해 초기화
			$('#agree_view_popup_scroll').animate({scrollTop:0}, 0);
			$("#agree_view_popup").hide();
		},



		/* --------------------------------------------------------------------------------------
			약관상세보기 확대(+버튼 클릭)
			loanRenewal4_001.fnZoomIn
		 -------------------------------------------------------------------------------------- */
		fnZoomIn : function(){
		    var popup_width = ($("#popup_page01").width() + 25) + "px";
	    	$("img[name='agree_view_page']").css('width', popup_width );
		},



		/* --------------------------------------------------------------------------------------
			약관상세보기 축소(-버튼 클릭)
			loanRenewal4_001.fnZoomOut
		 -------------------------------------------------------------------------------------- */
		fnZoomOut : function(){
			var popup_width_val = $("#popup_page01").width() - 25;
			var default_width = $("#agree_view_popup_div").width();

			if(popup_width_val <= default_width){
				popup_width_val = default_width;
			}

		    var popup_width = popup_width_val + "px";
	    	$("img[name='agree_view_page']").css('width', popup_width );
		},



		/* --------------------------------------------------------------------------------------
		약관상세보기
		loanRenewal4_001.fnShow_agreeDetail
	 -------------------------------------------------------------------------------------- */
	fnShow_agreeDetail : function( agree_id ){
		if( !fnCommon_isNull(agree_id) ){

			// 약관 팝업 영역 생성한적 없으면 생성
			var agree_view_popup = $("#agree_view_popup");
			if( fnCommon_isNull(agree_view_popup)  ||  fnCommon_isNull(agree_view_popup.length)  ||  agree_view_popup.length < 1  ){

				var html = "";
				html += "  		<article class='layerWrap reDesignPop' id='agree_view_popup' style='display:none;'>						  ";
				html += "  		<div class='bgAlpha'>						  ";
				html += "  			<div class='popup'>					  ";
				html += "  				<div class='titleLayerCont' style='width:100%;'>				  ";

				html += "  					<div class='controlHolder' data-elem='controlHolder'  style='border-radius:5px;background:rgba(0,0,0,.4);position:absolute;right:5%;top:13px;padding:5px;z-index:100;'>			  ";
				html += "  						<div onclick='javascript:loanRenewal4_001.fnClose_agreeDetail(event);' class='closedBtn' style='opacity:1;cursor:pointer; background-position:0 0;'></div>		  ";
				html += "  					</div>			  ";

				html += "  					<div class='controlHolder' data-elem='controlHolder'  style='border-radius:5px;background:rgba(0,0,0,.4);position:absolute;right:5%;top:50%;padding:5px;z-index:100;'>			  ";
				html += "  						<div id='zoomInBtn' onclick='javascript:loanRenewal4_001.fnZoomIn();' class='zoomIn on' style='opacity:1;cursor:pointer; background-position:0 0;'></div>		  ";
				html += "  						<div id='zoomOutBtn' onclick='javascript:loanRenewal4_001.fnZoomOut();' class='zoomOut off' style='background-position:-30px 0;cursor:auto; opacity:.5'></div>		  ";
				html += "  					</div>			  ";
				html += "  					<div id='agree_view_popup_scroll'  style='overflow-y:scroll;overflow-x:scroll'>			  ";
				html += "  						<div  id='agree_view_popup_div' style='position:relative;display:block;'>		  ";

				// html += "  							<img id='popup_page01' src='http://report.shinhansavings.com:8182/smartloanReport/SH_RB01.png' style='width:100%;'/>	  ";

				html += "  							<img id='popup_page01' name='agree_view_page' src='/Files/pdf/SH_RB01.png' style='width:100%;'/>	  ";
				html += "  							<img id='popup_page02' name='agree_view_page' src='/Files/pdf/SH_RB02.png' style='width:100%;'/>	  ";
				html += "  							<img id='popup_page03' name='agree_view_page' src='/Files/pdf/SH_RB03.png' style='width:100%;'/>	  ";
				html += "  							<img id='popup_page04' name='agree_view_page' src='/Files/pdf/SH_RB04.png' style='width:100%;'/>	  ";
				html += "  							<img id='popup_page05' name='agree_view_page' src='/Files/pdf/SH_RB05.png' style='width:100%;'/>	  ";
				html += "  							<img id='popup_page06' name='agree_view_page' src='/Files/pdf/SH_RB06.png' style='width:100%;'/>	  ";
				html += "  							<img id='popup_page07' name='agree_view_page' src='/Files/pdf/SH_RB07.png' style='width:100%;'/>	  ";


				html += "  						</div>		  ";
				html += "  					</div>			  ";
				html += "  					<div id='agree_view_popup_close' onclick='javascript:loanRenewal4_001.fnClose_agreeDetail(event);' class='pop_Title' style='color:#fff; height:53px; background-color:#3858ed;'>확인</div>			  ";
				html += "  				</div>				  ";
				html += "  			</div>					  ";
				html += "  		</div>						  ";
				html += "  		</article>						  ";

				$("body").append(html);
			}

			// *show 를 먼저 해야 사이즈가 잡힌다
			$("#agree_view_popup").show();

			// 스크롤 위치 기본지정
			var window_height = $(window).height();
			var agree_height = $("#agree_view_popup_close").height();
			var popup_height = window_height - agree_height;
			$("#agree_view_popup_scroll").css('height', popup_height + "px" );

			// 가로사이즈 기본지정
			var window_width = $(window).width();
			var popup_width = window_width;   // (window_width*95/100);
			$("#agree_view_popup_div").css('width', popup_width + "px");


			// 전체동의  or  [필수]개인(신용)정보 수집&middot;이용&middot;제공동의
			if(agree_id != "all"  &&  agree_id != "agree_chk_1"){
				var scrollTop_id = "";

				// [필수]개인(신용)정보 조회 동의
				if(agree_id == "agree_chk_2"){
					scrollTop_id = "popup_page02";

				// 사잇돌2 // 서울보증보험 정보 이용 동의서
				}else if(agree_id == "agree_chk_3"){
					scrollTop_id = "popup_page03";

				// [햇살론 필수]개인(신용)정보 수집&middot;이용&middot;제공 동의
				}else if(agree_id == "agree_chk_4"){
					scrollTop_id = "popup_page04";

				// [햇살론 필수]신용정보 조회 동의
				}else if(agree_id == "agree_chk_5"){
					scrollTop_id = "popup_page05";

				// [선택]전문상담원안심상담신청
				}else if(agree_id == "agree_chk_6"){
					scrollTop_id = "popup_page07";

				// 신용정보수집&middot;이용&middot;제공관련고객권리안내문
				}else if(agree_id == "agree_chk_8"){
					scrollTop_id = "popup_page06";
				}

				// 스크롤 이동
				if( !fnCommon_isNull(scrollTop_id) ){
					var scrollTop_value = $("#" + scrollTop_id).offset().top;

					// 앱여부 // 앱일땐 윈도우 사이즈 height 가 더 짧다, 헤더길이 빼기
					var isApp_flag = fnCommon_isApp();
					if( isApp_flag ){
						scrollTop_value - 45;
					}

					$('#agree_view_popup_scroll').animate({scrollTop: scrollTop_value }, 500);
				}
			}
		}

		// 사전체크정보 // 직업 1 직장인(4대보험가입) 2 개인사업자 3 기타사업소득자인적용역제공자 4 연금소득자
		var qna01 = $("input[type='radio'][name='qna01']:checked");
		var qna01_value = "";
		if( !fnCommon_isNull(qna01)  &&  !fnCommon_isNull(qna01.length)  &&  qna01.length > 0 ){
			qna01_value = qna01[0].value;
		}
		if(qna01_value == 1){
			$("#popup_page04").show();  // 본인인증 완료 영역 노출
			$("#popup_page05").show();  // 본인인증 완료 영역 노출
		}else{
			$("#popup_page04").hide();  // 본인인증 완료 영역 노출
			$("#popup_page05").hide();  // 본인인증 완료 영역 노출
		}

	},



		/* --------------------------------------------------------------------------------------
			약관상세보기
			loanRenewal4_001.fnShow_agreeDetail
		fnShow_agreeDetail : function( agree_id ){
			if( !fnCommon_isNull(agree_id) ){
				var popupURL = "";

				// 전체동의
				if(agree_id == "all"){
					parent.setDialogTitle("전체동의");
					parent.setDialogTitleSize();

					popupURL = popupURL_clause_reservation_all;
					agree_chk_all_show_flag = true;

				// [필수]개인(신용)정보 수집&middot;이용&middot;제공동의
				}else if(agree_id == "agree_chk_1"){
					popupURL = popupURL_agree_chk_1;
					agree_chk_1_show_flag = true;

				// [필수]개인(신용)정보 조회 동의
				}else if(agree_id == "agree_chk_2"){
					popupURL = popupURL_agree_chk_2;
					agree_chk_2_show_flag = true;

				// 사잇돌2 // 서울보증보험 정보 이용 동의서
				}else if(agree_id == "agree_chk_3"){
					popupURL = popupURL_agree_chk_3;
					agree_chk_3_show_flag = true;

				// [햇살론 필수]개인(신용)정보 수집&middot;이용&middot;제공 동의
				}else if(agree_id == "agree_chk_4"){
					popupURL = popupURL_agree_chk_4;
					agree_chk_4_show_flag = true;

				// [햇살론 필수]신용정보 조회 동의
				}else if(agree_id == "agree_chk_5"){
					popupURL = popupURL_agree_chk_5;
					agree_chk_5_show_flag = true;

				// [선택]전문상담원안심상담신청
				}else if(agree_id == "agree_chk_6"){
					popupURL = popupURL_agree_chk_6;
					agree_chk_6_show_flag = true;

				// 신용정보수집&middot;이용&middot;제공관련고객권리안내문
				}else if(agree_id == "agree_chk_8"){
					popupURL = popupURL_agree_chk_8;
					agree_chk_8_show_flag = true;
				}

				// 대출 거절사유 안내 신청 --> 이건 약관 없음
				showDialog(popupURL, 420);
			}
		},
		 -------------------------------------------------------------------------------------- */



		/* --------------------------------------------------------------------------------------
			전체동의 클릭
			loanRenewal4_001.fnClickAllCheck
		 -------------------------------------------------------------------------------------- */
		fnClickAllCheck : function(e){
			var checked_flag = false;
			var checked = $("#allChk")[0].checked;
			if( !fnCommon_isNull(checked, "boolean") ){
				checked_flag = true;

				// 전체약관 상세보기
				loanRenewal4_001.fnShow_agreeDetail('all');
			}

			// 사잇돌 동의 노출 여부
			var agree_3_li_display = $("#agree_3_li").prop("style").display;
			var agree_3_check_flag = true;   // 햇살론도 전체동의에 포함 여부

			// 비노출 상태이면 체크에서 제외
			if( !fnCommon_isNull(agree_3_li_display)  &&  agree_3_li_display.indexOf("none") > -1 ){
				agree_3_check_flag = false;
			}
			
			// 햇살론 동의 노출 여부
			var agree_4_li_display = $("#agree_4_li").prop("style").display;
			var agree_4_check_flag = true;   // 햇살론도 전체동의에 포함 여부

			// 비노출 상태이면 체크에서 제외
			if( !fnCommon_isNull(agree_4_li_display)  &&  agree_4_li_display.indexOf("none") > -1 ){
				agree_4_check_flag = false;
			}

			var agree_list = $("input[type='checkbox'][name='agree_chk']");
			if( !fnCommon_isNull(agree_list)  &&  !fnCommon_isNull(agree_list.length)  &&  agree_list.length > 0 ){
				for(var i=0; i < agree_list.length; i++){
					var agree_obj = agree_list[i];

					if( !fnCommon_isNull(agree_obj) ){
						var agree_obj_id = agree_obj.id;
						if( !fnCommon_isNull(agree_obj_id) ){

							/*
							// 전체동의 제외항목
							// [필수]개인(신용)정보 수집&middot;이용&middot;제공동의 // [필수]개인(신용)정보 조회 동의
							// [사잇돌2필수]개인(신용)정보 조회 동의 // 대출 거절사유 안내 신청
							if( agree_obj_id.indexOf("agree_chk_1") < 0  &&  agree_obj_id.indexOf("agree_chk_2") < 0
									&&  agree_obj_id.indexOf("agree_chk_3") < 0  &&  agree_obj_id.indexOf("agree_chk_7") < 0 ){
							}
							*/

							// 전체동의 제외항목 (20200626 리테일 요청 전체동의 제외 없음)
							// 대출 거절사유 안내 신청
							//if( agree_obj_id.indexOf("agree_chk_6") < 0 && agree_obj_id.indexOf("agree_chk_7") < 0 ){

								// 사잇돌동의
								if( agree_obj_id.indexOf("agree_chk_3") > -1 ){
	
									// 전체동의 동작에 포함여부 확인
									if(agree_3_check_flag){
										$("#" + agree_obj_id ).prop("checked", checked_flag);
									}
	
								// 햇살론 동의
								} else if( agree_obj_id.indexOf("agree_chk_4") > -1  ||  agree_obj_id.indexOf("agree_chk_5") > -1 ){

									// 전체동의 동작에 포함여부 확인
									if(agree_4_check_flag){
										$("#" + agree_obj_id ).prop("checked", checked_flag);
									}

								// 체크값 설정
								}else{
									$("#" + agree_obj_id ).prop("checked", checked_flag);
								}
							//}
						}
					}
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			고객명 변경 이벤트
			loanRenewal4_001.fnKeyup_custNm
		 -------------------------------------------------------------------------------------- */
		fnKeyup_custNm : function( type ){

			// 본인인증완료여부
			isAuthed = false;

			if( !fnCommon_isNull(type) ){

				// 고객명 X 클릭
				if(type == "delete"){
					$("#cert_custNm").val("");
					$("#cert_custNm").focus();  // 키패드가 사라지면 싫으니까
				}
			}

			// 이름 있으면 삭제버튼 보이게
			var cert_custNm = $("#cert_custNm").val();
			if( !fnCommon_isNull(cert_custNm) ){
				$("#cert_custNm_delete_p").show();
			}else{
				$("#cert_custNm_delete_p").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			약관동의 체크박스 클릭 이벤트
			loanRenewal4_001.fnEvent_CheckChange
		 -------------------------------------------------------------------------------------- */
		fnEvent_CheckChange : function(e){
			var checked = e.target.checked;  // 현재 발생한 체크여부값
			var id = e.target.id;

			// 체크 해제이면 전체동의 해제시키기
			if( fnCommon_isNull(checked, "boolean") ){
				$("#allChk").prop("checked", false);
				var label = $("label[for='allChk']");  // 시각적 클릭효과도 없애기
				if(label.hasClass("ui-checkbox-on")){
					label.removeClass("ui-checkbox-on");
					label.addClass("ui-checkbox-off");
				}
			}

			if( !fnCommon_isNull(id) ){

				// 그룹체크인지 상세체크인지 구분하기 위해 부모 찾기
				var checkbox_list = $(e.target).parent().parent().parent().find(":checkbox");
				if( !fnCommon_isNull(checkbox_list)  &&  !fnCommon_isNull(checkbox_list.length) ){

					// 그룹체크이면 하단 상세체크도 동일하게
					if(checkbox_list.length >= 2){
						for(var i=0; i < checkbox_list.length; i++){

							var checkbox = checkbox_list[i];
							if( !fnCommon_isNull(checkbox) ){

								// 현재 체크값 동일하게 반영
								checkbox.checked = checked;
							}
						}

					// 단독체크이면 옆에있는 상세체크박스의 체크유무 확인
					}else{

						// ul 이 잡혔으면 단독 부모체크이므로 이벤트 불필요
						var parent_id = $(e.target).parent().parent().parent().parent().attr("id")

						// 안잡혔으면 상세체크박스임
						if( fnCommon_isNull(parent_id)  ||  parent_id != "agree_ul" ){
							checkbox_list = $(e.target).parent().parent().parent().parent().find(":checkbox");
							if( !fnCommon_isNull(checkbox_list)  &&  !fnCommon_isNull(checkbox_list.length)  &&  checkbox_list.length > 0 ){

								// 부모 체크박스 id 로 추출
								var parent_checkbox = $("#" + ((e.target.id).substring(0,11)));

								// 상세항목이 1개면 동일하게 반영
								if( checkbox_list.length == 1 ){
									parent_checkbox.prop("checked", checked);

								// 상세항목이 여러개면 옆항목 체크
								}else{
									for(var i=0; i < checkbox_list.length; i++){
										var checkbox = checkbox_list[i];
										if( !fnCommon_isNull(checkbox) ){

											// 나와 옆의 상세체크 중 해제된 항목있으면 부모도 해제
											var friend_checked = checkbox.checked;
											var friend_id = checkbox.id;
											if(!fnCommon_isNull(friend_id)  &&  id != friend_id){
												if(!fnCommon_isNull(checked, "boolean")  &&  !fnCommon_isNull(friend_checked, "boolean")){
													parent_checkbox.prop("checked", true);
												}else{
													parent_checkbox.prop("checked", false);
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			본인인증 탭 메뉴 클릭 이벤트
			loanRenewal4_001.fnEvent_TabClick
		 -------------------------------------------------------------------------------------- */
		fnEvent_TabClick : function(e){

			// 앱여부
			var isApp_flag = fnCommon_isApp();
			if( isApp_flag ){
				$("#tab_button_official_li").show();  // 탭 선택 버튼 영역
				$("#tab_official").show();  // 기본 노출 탭
			}else{
				$("#tab_button_official_li").hide();  // 탭 선택 버튼 영역
				$("#tab_official").hide();  // 기본 노출 탭

				$("#tab_button_official_li").removeClass("tab_on");

				/* toggle 사용시
				$("#tab_button_official").removeClass("ui-btn-active");
				$("#tab_button_official").parent().removeClass("ui-tabs-active ui-state-active");
				*/
			}

    		// 비활성화상태인 탭 클릭시
    		var className = e.target.className;
			if( fnCommon_isNull(className)  ||  className.indexOf("active") < 0 ){

	    		// 본인인증완료여부
	    		isAuthed = false;
			}

    		var this_button_id = e.target.id;
			if( !fnCommon_isNull(this_button_id) ){

				// 인증서 버튼이면 앱여부 체크
				if(this_button_id == "tab_button_official"  &&  !isApp_flag){

					// 앱이 아니면 휴대폰으로 기본설정
					this_button_id = "tab_button_mobile";
				}

				// 다른탭 클릭효과 없애기
				var tab_button_list = $("a[name='tab_button']");
				if( !fnCommon_isNull(tab_button_list)  &&  !fnCommon_isNull(tab_button_list.length)  &&  tab_button_list.length > 0 ){
					for(var i=0; i < tab_button_list.length; i++){

						var button = tab_button_list[i];
						var button_id = button.id;
						if( !fnCommon_isNull(button_id) ){

							// 인증서 아닐땐 그냥 수행, 인증서이면 앱일때만 수행
							if(button_id != "tab_button_official"  ||  (button_id == "tab_button_official"  &&  isApp_flag )){
								var button_obj = $("#" + button_id);
								if( !fnCommon_isNull(button_obj)  &&  button_obj.length > 0 ){
									var parent = button_obj.parent();  // 감싸고 있는 li 태그

									var div_id = button_id.replace("_button", "");  // id 패턴 맞춰서 하단 div 영역 id 추출

									// 해당 탭은 활성화
									if( button_id == this_button_id ){

										// 활성화 효과
										if( !fnCommon_isNull(parent)  &&  !parent.hasClass("tab_on")){
											parent.addClass("tab_on");
										}

										// 하단부 노출
										$("#" + div_id).show();
										$("#" + div_id + "_agree").show();

										/* toggle 사용시
										if(!button_obj.hasClass("active")){
											button_obj.addClass("ui-btn-active");
										}
										if(!button_obj.parent().hasClass("active")){
											button_obj.parent().addClass("ui-tabs-active ui-state-active");
										}
										*/

									// 다른 탭은 비활성
									}else{
										parent.removeClass("tab_on");
										$("#" + div_id).hide();
										$("#" + div_id + "_agree").hide();

										/* toggle 사용시
										button_obj.removeClass("ui-btn-active");
										button_obj.parent().removeClass("ui-tabs-active ui-state-active");
										*/
									}
								}
							}
						}
					}
				}


				// 휴대폰
				if(this_button_id == "tab_button_mobile"){

					// 하단의 탭 귀속영역 입력란으로 사용
					var cert_hndNo = $("#cert_hndNo").val();  // 상단 입력란
					$("#tab_mobile_cert_hndNo").val(cert_hndNo);  // 하단 휴대폰 번호 입력 영역

					$("#cert_hndNo_dl").hide();
					$("#tab_mobile_cert_hndNo_dl").show();

				}else{
					$("#cert_hndNo_dl").hide();
					$("#tab_mobile_cert_hndNo_dl").hide();
					// ARS인증 요청 휴대폰
				}

				// 인증서 인증시 휴대폰 번호 입력칸 노출
				if(this_button_id == "tab_button_official" ) {
					$("#cert_hndNo_dl").show();
					$("#tab_mobile_cert_hndNo_dl").hide();
				}

	    		/*
	    		<li class="ui-block-c ui-state-default ui-corner-top ui-tabs-active ui-state-active" role="tab" tabindex="0" aria-controls="tab_credit"
	    			aria-labelledby="tab_button_credit" aria-selected="true">

			    		<a href="#tab_credit" id="tab_button_credit" class="ui-link ui-btn ui-tabs-anchor" role="presentation" tabindex="-1">
			    		신용카드
			    		</a>
	    		</li>
	    		*/

			}
		},



		/* --------------------------------------------------------------------------------------
			휴대폰번호 변경 이벤트
			loanRenewal4_001.fnKeyup_hndNo
		 -------------------------------------------------------------------------------------- */
		fnKeyup_hndNo : function(e){

			// 본인인증완료여부
			isAuthed = false;

			var value = e.target.value;

			// 문자열 제거 후 숫자만 반환
			value = fnCommon_getOnlyNumber(value);

			// 필드에 재설정될 값
			var value_format = value;

			if( !fnCommon_isNull(value)  &&  value.length > 0 ){
				if(value.length > 3){

					// 앞자리 잘라내기
					value_format = value.substring(0, 3);
					value = value.substring(3, value.length);

					// 아직도 세자리 이상이면
					if(value.length > 3){

						// 중간자리 잘라내기
						value_format += "-" + value.substring(0, 3);
						value = value.substring(3, value.length);

						// 아직도 네자리 이상이면 중간자리로 한자리 더 넘기기
						if(value.length > 4){
							value_format += value.substring(0, 1);
							value = value.substring(1, value.length);
						}
					}

					// 남은 뒷자리가 있으면 이것도 붙이기
					if( !fnCommon_isNull(value) ){
						value_format += "-" + value;
					}
				}
			}

			// 모든 휴대폰번호 필드에 설정
			$("input[type='tel'][name='cert_hndNo']").val(value_format);
			$("input[type='tel'][name='ars_hand_no']").val(value_format);
		},



		/* --------------------------------------------------------------------------------------
			주민등록번호 근거 및 도용방지 안내 팝업
			loanRenewal4_001.fnPopup_1
		 -------------------------------------------------------------------------------------- */
		fnPopup_1 : function( type ){

			var msg = "";
			msg += "<p>신한저축은행은 신용정보의 이용 및 보호에 관한 법률 시행령 제 37조의 2에 의거하여 주민등록번호를 수집합니다.</p>";
			msg += "<p>타인의 주민등록번호를 도용하거나, 부정사용하는 자는 3년 이하의 징역 또는 3천만원 이하의 벌금이 부과될 수 있습니다.</p>";

			// 메세지 팝업
			fnCommon_popup("open", msg);
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 본인인증 서비스 동의 자세히보기
			loanRenewal4_001.fnShow_agree_certif01
		 -------------------------------------------------------------------------------------- */
		fnShow_agree_certif01 : function(){
			popupURL = popupURL_clause_auth_hp_skt;
			showDialog(popupURL, 420);

			/* 20190524 모든 통신사를 보여주도록 수정
			// 통신사
			var telecom = $("#telecom option:selected").val();
			if( fnCommon_isNull(telecom) ){
				alert("통신사를 선택해주세요.");
				return;

			}else{
				var popupURL = "";

				// sk
				if(telecom == "1" || telecom == "5"){
					popupURL = popupURL_clause_auth_hp_skt;

				// kt
				}else if(telecom == "2" || telecom == "6"){
					popupURL = popupURL_clause_auth_hp_kt;

				// lg
				}else{
					popupURL = popupURL_clause_auth_hp_lgt;
				}

				showDialog(popupURL, 420);
			}
			*/
		},



		/* --------------------------------------------------------------------------------------
			신용카드 본인인증 서비스 동의 자세히보기
			loanRenewal4_001.fnShow_agree_certif02
		 -------------------------------------------------------------------------------------- */
		fnShow_agree_certif02 : function(){
			showDialog(popupURL_clause_auth_card, 420);
		},



		/* --------------------------------------------------------------------------------------
			주민등록번호 앞자리 변경 이벤트
			loanRenewal4_001.fnKeyup_residNo_1
		 -------------------------------------------------------------------------------------- */
		fnKeyup_residNo_1 : function(e){

    		// 본인인증완료여부
    		isAuthed = false;

			// 문자열 제거 후 숫자만 반환
    		var value = e.target.value;
    		e.target.value = fnCommon_getOnlyNumber(value);
		},



		/* --------------------------------------------------------------------------------------
			단말정보 저장
			loanRenewal4_001.fnSave_2
		 -------------------------------------------------------------------------------------- */
		fnSave_2 : function( device_result ){

			// 단말에서 추출한 정보 있으면 저장
			if( !fnCommon_isNull(device_result) ){

				var BANK_INSP_NO_param = BANK_INSP_NO;  // 대출신청번호
				var HND_NO = device_phoneNumber;  // 단말에서 추출한 휴대폰번호 // 안드로이드만 추출 가능

				// 단말정보
				var IMEI = device_result.imei;  // 안드로이드만 추출 가능
				var DEVICE_TYPE = device_result.DEVICE_TYPE;
				var DEVICE_MDL = device_result.DEVICE_MDL;
				var APP_VER = device_result.APP_VER;
				var OS_VER = device_result.OS_VER;

				// null 이 있으면 iajax.postparam 오류나니까 방지!
				if( fnCommon_isNull(BANK_INSP_NO_param) ){
					BANK_INSP_NO_param = "";
				}
				if( fnCommon_isNull(HND_NO) ){
					HND_NO = "";
				}
				if( fnCommon_isNull(IMEI) ){
					IMEI = "";
				}
				if( fnCommon_isNull(DEVICE_TYPE) ){
					DEVICE_TYPE = "";
				}
				if( fnCommon_isNull(DEVICE_MDL) ){
					DEVICE_MDL = "";
				}
				if( fnCommon_isNull(APP_VER) ){
					APP_VER = "";
				}
				if( fnCommon_isNull(OS_VER) ){
					OS_VER = "";
				}

				iajax.clearParam();
				iajax.addParam("CHK_CSRF", random);
				iajax.addParam("BANK_INSP_NO", BANK_INSP_NO_param );
				iajax.addParam("HND_NO", HND_NO );

				iajax.addParam("IMEI", IMEI );
				iajax.addParam("DEVICE_TYPE", DEVICE_TYPE );
				iajax.addParam("DEVICE_MDL", DEVICE_MDL );
				iajax.addParam("APP_VER", APP_VER );
				iajax.addParam("OS_VER", OS_VER );

				$.ajax({
				    type: "post",
				    url: callURL_loanRenewal4_001_10,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
				    	if(json.RESULT_NO == "0000"){
				    	}else{
				    		alert("단말정보 저장에 실패하였습니다.");
				    	}
				    },
					error: function(data, textStatus, error){
			    		alert("단말정보 저장에 실패하였습니다.");
					},
					complete: function(){

			    		// 대출신청 등록
						loanRenewal4_001.fnSave_history();
					}
				});
			}
		},



		/* --------------------------------------------------------------------------------------
			고객기본정보 조회
			loanRenewal4_001.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function( device_result ){

			// 단말에서 추출한 휴대폰번호 있었으면 먼저 설정
			if( !fnCommon_isNull(device_result)  &&  !fnCommon_isNull(device_result.phoneNumber) ){
				device_phoneNumber = device_result.phoneNumber;
				device_phoneNumber = fnCommon_getOnlyNumber(device_phoneNumber);  // 문자열 제거 후 숫자만 반환

				if( !fnCommon_isNull(device_phoneNumber)  &&  !fnCommon_isNull(device_phoneNumber.length) ){

					// 82로 시작하는 경우
					if(device_phoneNumber.indexOf("82") == 0  &&  device_phoneNumber.length > 2){

						// 앞2자리 82 제거  ex) 8201012345678  이렇게 옴
						device_phoneNumber = device_phoneNumber.substring(2, device_phoneNumber.length);
						device_phoneNumber = "0" + device_phoneNumber;
					}

					// 휴대폰번호 변경 이벤트를 사용해서 값 설정
					loanRenewal4_001.fnKeyup_hndNo({target:{value:device_phoneNumber}});
				}
			}

			// 고객기본정보 조회
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
					
						SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;  // 건강보험 스크래핑 성공여부
						YOUTH_GUIDE_YN = json.YOUTH_GUIDE_YN;  // 공적지원제도 동의 여부

						// 고객명
						var custNm = fnCommon_deleteNull(json.custNm);
						if( !fnCommon_isNull(custNm) ){
							$("input[type='text'][name='cert_custNm']").val( custNm );
						}

						// 생년월일
						var residNo = json.residNo;
						if( !fnCommon_isNull(residNo) ){
							$("input[type='tel'][name='cert_residNo_1']").val( residNo );
						}

						// 휴대폰번호
						var hndNo = json.hndNo;
						if( !fnCommon_isNull(hndNo) ){

							// 문자열 제거 후 숫자만 반환
							hndNo = fnCommon_getOnlyNumber(hndNo);

							// 휴대폰번호 변경 이벤트를 사용해서 값 설정
							loanRenewal4_001.fnKeyup_hndNo({target:{value:hndNo}});
						}

						isXecureAuth = json.isXecureAuth;
						SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					alert(error);
					// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			휴대폰인증 유효성체크
			loanRenewal4_001.fnCert_phone_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_valid : function( type ){

			// 통신사
			var telecom = $("#telecom option:selected").val();
			if( fnCommon_isNull(telecom) ){
				alert("통신사를 선택해주세요.");
				$("#telecom").focus();
				return false;
			}

			// 휴대폰번호
			var tab_mobile_cert_hndNo = $("#tab_mobile_cert_hndNo").val();
			if( fnCommon_isNull(tab_mobile_cert_hndNo) ){
				alert("휴대폰번호를 입력해주세요.");
				$("#tab_mobile_cert_hndNo").focus();
				return false;
			}

			// 필수항목 동의여부 체크
			/*
			var agree_mobile = $(":checkbox[name='agree_mobile']");
			if( !fnCommon_isNull(agree_mobile)  &&  !fnCommon_isNull(agree_mobile.length)  &&  agree_mobile.length > 0 ){
				for(var i=0; i < agree_mobile.length; i++){

					var checkbox = agree_mobile[i];
					if( !fnCommon_isNull(checkbox) ){

						var checked = checkbox.checked;
						if( fnCommon_isNull(checked, "boolean") ){

							// 해당 체크박스 라벨 한글 추출
							alert( checkbox.title + " 항목을 '동의'로 선택하신 후 진행해주세요.");
							$("#" + checkbox.id).focus();
							return false;
						}
					}
				}
			}*/

			var allChk_mobile = $("#allChk_mobile")[0].checked;
			if( !allChk_mobile ){
				alert("휴대폰 본인인증 전체동의로 선택하신 후 진행해주세요.");
				return false;
			}


			if( !fnCommon_isNull(type) ){

				// 입력된 인증번호 검증
				if(type == "valid"){
					var aut_auth_no = $("#aut_auth_no").val();
					if( fnCommon_isNull(aut_auth_no) ){
						alert("인증이 완료되지 않았습니다.\n인증요청 후 인증번호를 입력해주세요.");
						return false;
					}
				}
			}

			return true;
		},



		/* --------------------------------------------------------------------------------------
			신용카드 유효성체크
			loanRenewal4_001.fnCert_card_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_card_valid : function(){


			var credit_code = $("#credit_code").val();			// 신용카드 회사
			var card_no = $("#card_no").val(); 				// 신용카드 번호
			var ars_hand_no = $("#ars_hand_no").val(); 	// 휴대폰 번호



			// 이름
			var cert_custNm = $("#cert_custNm").val();
			if( fnCommon_isNull(cert_custNm) ){
				alert("이름을 입력해주세요.");
				$("#cert_custNm").focus();
				return false;
			}

			// 주민등록번호
			var cert_residNo_1 = $("#cert_residNo_1").val();
			if( fnCommon_isNull(cert_residNo_1)  ||  cert_residNo_1.length < 6 ){
				alert("주민등록번호 앞자리 6자리를 입력해주세요.");
				$("#cert_residNo_1").focus();
				return false;
			}
			var resid_no2 = $("#resid_no2").val();
			if( fnCommon_isNull(resid_no2)  ||  resid_no2.length < 7 ){
				alert("주민등록번호 뒷자리 7자리를 입력해주세요.");
				$("#resid_no2").focus();
				return false;
			}


			if( fnCommon_isNull(credit_code)  ||  credit_code == "" ){
				alert("카드사를 선택해 주세요.");
				$("#credit_code").focus();
				return false;
			}

			// 신용카드 번호
			var card_no = $("#card_no").val();
			if( fnCommon_isNull(card_no)  ||  card_no.length < 6 ){
				alert("카드번호 뒤 8자리를 입력해주세요.");
				$("#card_no").focus();
				return false;
			}

			if( fnCommon_isNull(ars_hand_no)  ||  ars_hand_no.length != 13 ){
				alert("휴대폰 번호를 입력해 주세요.");
				$("#ars_hand_no").focus();
				return false;
			}

			/*
			// 필수항목 동의여부 체크
			var agree_credit = $(":checkbox[name='agree_credit']");
			if( !fnCommon_isNull(agree_credit)  &&  !fnCommon_isNull(agree_credit.length)  &&  agree_credit.length > 0 ){
				for(var i=0; i < agree_credit.length; i++){

					var checkbox = agree_credit[i];
					if( !fnCommon_isNull(checkbox) ){

						var checked = checkbox.checked;
						if( fnCommon_isNull(checked, "boolean") ){

							// 해당 체크박스 라벨 한글 추출
							alert( checkbox.title + " 항목을 '동의'로 선택하신 후 진행해주세요.");
							$("#" + checkbox.id).focus();
							return false;
						}
					}
				}
			}
			*/

			var allChk_credit = $("#allChk_credit")[0].checked;
			if( !allChk_credit ){
				alert("신용카드 본인인증 전체동의로 선택하신 후 진행해주세요.");
				return false;
			}

			return true;
		},



		/* --------------------------------------------------------------------------------------
			신용카드 ARS 요청
			loanRenewal4_001.fnCert_cardArs_request
		 -------------------------------------------------------------------------------------- */
		fnCert_cardArs_request : function(){

    		// 본인인증완료여부
    		isAuthed = false;

			// 휴대폰인증 유효성체크
			var result = loanRenewal4_001.fnCert_card_valid();
			if(!result){
				return false;
			}

			iajax.clearParam();

			iajax.addParam("KIND_CHK", "21" ); //명시적 21:ARS인증, 22:신용카드인증 확인
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );   // 실명번호

			// 휴대폰번호
			var cert_hndNo = $("#ars_hand_no").val();
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			// 문자열 제거 후 숫자만 반환
			iajax.addParam("HND_NO1", cert_hndNo.substring(0,3));
			iajax.addParam("HND_NO2", cert_hndNo.substring(3,7));
			iajax.addParam("HND_NO3", cert_hndNo.substring(7,11));
			iajax.addParam("SMS_MSG", IP);						//IP로 사용
			iajax.addParam("AUT_AUTH_NO", "02");				// (01:pc 02:mWeb 03:mApp)
			var isApp_flag = fnCommon_isApp();
			if(isApp_flag){
				iajax.addParam("AUT_AUTH_NO", "03");
			}
			iajax.addParam("CD_PWD", $("#credit_code").val());	//카드사코드로 사용

			// -- nFilter --	   // 보안키패드로 입력받은 값
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_ARS,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000"){
						isArsCalled = true;
						alert("ARS와 통화하여 카드 비밀번호 앞 2자리를 입력해주세요.");
			    	}else{
			    		alert("입력된 카드사, 카드번호, 휴대폰번호를 재확인해주세요.\n카드사에 등록된 휴대폰번호가 아닐 경우에는 ARS요청이 되지 않습니다.");
			    	}
			    },
				beforeSend : function() {
				},
				error: function(data, textStatus, error) {
					alert("ARS인증요청에 실패하였습니다.\n다시 시도해주세요.");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			신용카드 본인인증
			loanRenewal4_001.fnCert_card_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_card_confirm : function(){

    		// 본인인증완료여부
    		isAuthed = false;

			iajax.clearParam();

			iajax.addParam("KIND_CHK", "22" ); //명시적 21:ARS인증, 22:신용카드인증 확인
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );   // 실명번호
			iajax.addParam("IP", IP);							//IP로 사용
			iajax.addParam("AUT_AUTH_NO", "02");				// (01:pc 02:mWeb 03:mApp)
			var isApp_flag = fnCommon_isApp();
			if(isApp_flag){
				iajax.addParam("AUT_AUTH_NO", "03");
			}
			iajax.addParam("CD_PWD", $("#credit_code").val());	//카드사코드로 사용


			// -- nFilter --	   // 보안키패드로 입력받은 값
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_ARS_REQ,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
			    		isAuthed = true;

			    		// 본인인증 성공 처리
						loanRenewal4_001.fnCert_Success();

			    	}else{
			    		alert("신용카드 인증이 실패하였습니다.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					alert("신용카드 인증이 실패하였습니다.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			신용카드 본인인증
			loanRenewal4_001.fnCert_card_confirm_old
		 -------------------------------------------------------------------------------------- */
		fnCert_card_confirm_old : function(){

    		// 본인인증완료여부
    		isAuthed = false;

    		/* // 확인버튼 누를때 실명인증 부분으로 미리체크하도록 이동함.
			// 신용카드 유효성체크
			var result = loanRenewal4_001.fnCert_card_valid();
			if(!result){
				return false;
			}
			*/

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );   // 실명번호
			iajax.addParam("HND_NO", cert_hndNo );   // 휴대폰번호

			iajax.addParam("card_no_1", $("#card_no_1").val() );   // 신용카드
			iajax.addParam("card_no_2", $("#card_no_2").val() );
			iajax.addParam("card_no_3", $("#card_no_3").val() );

			// -- nFilter --	   // 보안키패드로 입력받은 값
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_03,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
			    		isAuthed = true;

			    		// 본인인증 성공 처리
						loanRenewal4_001.fnCert_Success();

			    	}else{
			    		alert("신용카드 인증이 실패하였습니다.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
			    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
			    	}
			    },
				error: function(data, textStatus, error){
					alert("신용카드 인증이 실패하였습니다.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			약관동의 후 확인
			loanRenewal4_001.fnConfirmAgree
		 -------------------------------------------------------------------------------------- */
		fnConfirmAgree : function(){

			// 햇살론 동의갯수
			var sunshine_agree_Y_count = 0;

			// 햇살론 동의안된항목 수집
			var sunshine_agree_N_list = [];

			// 사전체크정보 // 직업 1 직장인(4대보험가입) 2 개인사업자 3 기타사업소득자인적용역제공자 4 연금소득자
			var qna01 = $("input[type='radio'][name='qna01']:checked");
			var qna01_value = "";
			if( !fnCommon_isNull(qna01)  &&  !fnCommon_isNull(qna01.length)  &&  qna01.length > 0 ){
				qna01_value = qna01[0].value;
			}

			// 동의정보 리스트
			var agree_list = $("input[type='checkbox'][name='agree_chk']");
			if( !fnCommon_isNull(agree_list)  &&  !fnCommon_isNull(agree_list.length)  &&  agree_list.length > 0 ){
				for(var i=0; i < agree_list.length; i++){

					var agree_obj = agree_list[i];
					if( !fnCommon_isNull(agree_obj) ){

						var agree_obj_id = agree_obj.id;
						var checked = agree_obj.checked;  // 체크여부

						if( !fnCommon_isNull(agree_obj_id) ){

							// [필수]개인(신용)정보 수집이용제공동의 // [필수]개인(신용)정보 조회 동의 // [필수]고객확인제도 안내
							if( agree_obj_id.indexOf("agree_chk_1") > -1  ||  agree_obj_id.indexOf("agree_chk_2") > -1  ||  agree_obj_id.indexOf("agree_chk_9") > -1 ){
								if( fnCommon_isNull(checked, "boolean") ){
									var confirm_result = confirm("'" + agree_obj.title + "' 항목은 동의 필수사항입니다. 동의 후 진행하시겠습니까?");
									if(confirm_result){
										$("#" + agree_obj_id).prop("checked", true);

										 // 하단 상세항목까지 동의시켜주자
										if( agree_obj_id.indexOf("agree_chk_1") > -1  ||  agree_obj_id.indexOf("agree_chk_2") > -1 ){
											$("#" + agree_obj_id + "_1").prop("checked", true);
											$("#" + agree_obj_id + "_2").prop("checked", true);
										}
									}else{
										return false;
									}
								}

								/*
								// agree_chk_all_show_flag 전체동의 약관 열람여부 동시체크
								// 약관열람여부 // [필수]개인(신용)정보 수집이용제공동의
								if( agree_obj_id.indexOf("agree_chk_1") > -1 ){
									if( fnCommon_isNull(agree_chk_all_show_flag, "boolean")  &&  fnCommon_isNull(agree_chk_1_show_flag, "boolean") ){
										alert("'" + agree_obj.title + "' 항목의 약관내용을 필수열람하시기 바랍니다.");
										return false;
									}
								}
								// 약관열람여부 // [필수]개인(신용)정보 조회 동의
								if( agree_obj_id.indexOf("agree_chk_2") > -1 ){
									if( fnCommon_isNull(agree_chk_all_show_flag, "boolean")  &&  fnCommon_isNull(agree_chk_2_show_flag, "boolean") ){
										alert("'" + agree_obj.title + "' 항목의 약관내용을 필수열람하시기 바랍니다.");
										return false;
									}
								}
								*/

							// 개인사업자, 기타사업소득자, 연금소득자는 사잇돌2 동의 필수
							}else if( agree_obj_id.indexOf("agree_chk_3") > -1  &&  fnCommon_isNull(checked, "boolean") ){
								if( !fnCommon_isNull(qna01_value)  &&  ( qna01_value == "2"  ||  qna01_value == "3"  ||  qna01_value == "4" ) ){

									var qna01_name = "";
									if(qna01_value == "2"){
										qna01_name = "개인사업자";
									}else if(qna01_value == "3"){
										qna01_name = "기타사업소득자";
									}else if(qna01_value == "4"){
										qna01_name = "연금소득자";
									}

									var confirm_result = confirm(qna01_name + "는 '" + agree_obj.title + "'항목이 필수사항입니다. 동의 후 진행하시겠습니까?");
									if(confirm_result){
										$("#" + agree_obj_id).prop("checked", true);
										$("#" + agree_obj_id + "_1").prop("checked", true);  // 하단 상세항목까지 동의시켜주자
									}else{
										return false;
									}

									/*
									// 약관열람여부 // 사잇돌2 // 서울보증보험 정보 이용 동의서
									if( agree_obj_id.indexOf("agree_chk_3") > -1 ){
										if( fnCommon_isNull(agree_chk_all_show_flag, "boolean")  &&  fnCommon_isNull(agree_chk_3_show_flag, "boolean") ){
											alert("'" + agree_obj.title + "' 항목의 약관내용을 필수열람하시기 바랍니다.");
											return false;
										}
									}
									*/
								}

							// 햇살론 필수는 동시에 모두동의 또는 모두 미동의만 가능
							}else if( agree_obj_id.indexOf("agree_chk_4") > -1  ||  agree_obj_id.indexOf("agree_chk_5") > -1 ){
								if( !fnCommon_isNull(checked, "boolean") ){
									sunshine_agree_Y_count++;

								}else{
									// 동의안된항목 수집
									sunshine_agree_N_list.push("agree_obj_id");
								}

							//전문상담원 안심상담신청 체크
							}else if( agree_obj_id.indexOf("agree_chk_6") > -1){
								if( fnCommon_isNull(checked, "boolean") ){
									var confirm_result = confirm(agree_obj.title + "\n전산장애, 신청 중단 등 진행이 원활하지 않을 경우 전문상담원이 진행을 도와드립니다. 동의하시겠습니까?");
									if(confirm_result){
										$("#" + agree_obj_id).prop("checked", true);
									}
								}
							}
						}
					}
				}
			}

			// 햇살론 동의된 항목 있으면 나머지도 동시동의 필수
			if(sunshine_agree_Y_count > 0  &&  sunshine_agree_Y_count < 4){
				var confirm_result = confirm("햇살론 한도조회를 위해서는 서민금융진흥원 동의서 동의가 필요합니다.\n동의하시겠습니까?");
				// confirm("사잇돌2대출 한도를 함께 조회하기 위해서는 서울보증보험의 동의서 동의가 필요합니다.\n동의하시겠습니까?")

				// 동의했으면 나머지도 자동체크, 미동의는 모두 해제
				$("#agree_chk_4").prop("checked", confirm_result);
				$("#agree_chk_4_1").prop("checked", confirm_result);
				$("#agree_chk_5").prop("checked", confirm_result);
				$("#agree_chk_5_1").prop("checked", confirm_result);
			}

			/*
			// 햇살론 동의된 항목 있으면 열람도 필수
			if(sunshine_agree_Y_count > 0){

				// 약관열람여부 // [햇살론 필수]개인(신용)정보 수집&middot;이용&middot;제공 동의
				if( fnCommon_isNull(agree_chk_all_show_flag, "boolean")  &&  fnCommon_isNull(agree_chk_4_show_flag, "boolean") ){
					alert("'[햇살론 필수]개인(신용)정보 수집.이용.제공 동의' 항목의 약관내용을 필수열람하시기 바랍니다.");
					return false;
				}

				// 약관열람여부 // [햇살론 필수]신용정보 조회 동의
				if( fnCommon_isNull(agree_chk_all_show_flag, "boolean")  &&  fnCommon_isNull(agree_chk_5_show_flag, "boolean") ){
					alert("'[햇살론 필수]신용정보 조회 동의' 항목의 약관내용을 필수열람하시기 바랍니다.");
					return false;
				}
			}
			*/

			// 전체동의 약관 열람여부 체크
			if( fnCommon_isNull(agree_chk_all_show_flag, "boolean") ){

				// 전체약관 상세보기
				loanRenewal4_001.fnShow_agreeDetail('all');
			}

			// 유효성 통과했으면 본인인증 슬라이드 열기
			loanRenewal4_001.fnMove_slide(3);
		},



		/* --------------------------------------------------------------------------------------
			본인인증 확인 버튼 클릭
			loanRenewal4_001.fnCert_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_confirm : function(){

			// 거래 모두 성공 여부 같이 체크
			// 본인인증 완료했으면 인증단계 pass // app 에서 뒤로가기시 하단의 web 이 노출되어 재인증 현상 방지
			if(isAuthed  &&  all_tran_success_yn){

    			// 화면이동 // 공적지원제도 안내 or 온라인서류제출(스크래핑)
    			loanRenewal4_001.fnNext();

			}else{

				// 선택된 탭 추출
				var tab_button_list = $("a[name='tab_button']");
				if( !fnCommon_isNull(tab_button_list)  &&  !fnCommon_isNull(tab_button_list.length)  &&  tab_button_list.length > 0 ){
					for(var i=0; i < tab_button_list.length; i++){

						// 활성화 된 탭에 속하는 서비스 사용
						var button = tab_button_list[i];
						var parent = $(button).parent();
						if( !fnCommon_isNull(parent)  &&  parent.hasClass("tab_on") ){

							var button_id = button.id;
							if( !fnCommon_isNull(button_id) ){

								var fnCallback = null;
								var valid_result = false;

								// 인증서 유효성체크 - (이름, 주민번호, 휴대폰번호) 기본 본인인증 공통영역 체크이므로 함께 사용하자!
								valid_result = loanRenewal4_001.fnCert_xecure_valid();
								if(!valid_result){
									return false;
								}

								// 인증서
								if(button_id == "tab_button_official"){

									// 인증서 본인인증 호출(app)
									fnCallback = loanRenewal4_001.fnCert_xecure_confirm;

									// 휴대폰
								}else if(button_id == "tab_button_mobile"){

									// 휴대폰인증 유효성체크 // valid : 번호검증
									valid_result = loanRenewal4_001.fnCert_phone_valid("valid");

									// 입력된 휴대폰 인증번호 검증
									fnCallback = loanRenewal4_001.fnCert_phone_confirm;

									// 신용카드
								}else if(button_id == "tab_button_credit"){

									// Ars요청을 정상적으로 했는지 체크
									if(!isArsCalled){
										alert("[ARS요청]버튼을 눌러 통화연결 시, 카드비밀번호 앞 2자리를 입력한 후 재시도해주세요.");
										return false;
									}

									// 신용카드 유효성체크
									valid_result = loanRenewal4_001.fnCert_card_valid();

									// 신용카드 본인인증
									fnCallback = loanRenewal4_001.fnCert_card_confirm;
								}

								// 유효성체크 통과했는지 확인
								if(!valid_result){
									return false;
								}

								// 실명인증 요청 // 기본약관동의 내용 저장 포함
								loanRenewal4_001.fnSave_realName(fnCallback);
							}
						}
					}
				}
			}

		},



		/* --------------------------------------------------------------------------------------
			인증서 유효성체크
			loanRenewal4_001.fnCert_xecure_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_xecure_valid : function( type ){
			var result = true;

			// 이름
			var cert_custNm = $("#cert_custNm").val();
			if( fnCommon_isNull(cert_custNm) ){
				alert("이름을 입력해주세요.");
				$("#cert_custNm").focus();
				return false;
			}

			// 주민등록번호
			var cert_residNo_1 = $("#cert_residNo_1").val();
			if( fnCommon_isNull(cert_residNo_1)  ||  cert_residNo_1.length < 6 ){
				alert("주민등록번호 앞자리 6자리를 입력해주세요.");
				$("#cert_residNo_1").focus();
				return false;
			}
			var resid_no2 = $("#resid_no2").val();
			if( fnCommon_isNull(resid_no2)  ||  resid_no2.length < 7 ){
				alert("주민등록번호 뒷자리 7자리를 입력해주세요.");
				$("#resid_no2").focus();
				return false;
			}

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( fnCommon_isNull(cert_hndNo)  ||  cert_hndNo.length < 10 ){
				alert("휴대폰번호를 입력해주세요.");
				$("#cert_hndNo").focus();
				return false;
			}

			var cert_hndNo_pattern = /^\d{10,11}$/;
			if(!cert_hndNo_pattern.test(cert_hndNo)) {
				alert("휴대폰번호를 정확하게\n입력해주세요.");
				$("#cert_hndNo").focus();
				return false;
			}

			return result;
		},



		/* --------------------------------------------------------------------------------------
			인증서 본인인증 호출(app)
			loanRenewal4_001.fnCert_xecure_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_xecure_confirm : function(){
	   		isAuthed = false;

	   		/*// 확인버튼 누를때 실명인증 부분으로 미리체크하도록 이동함.
			// 인증서 유효성체크
			var result = loanRenewal4_001.fnCert_xecure_valid();
			if(!result){
				return false;
			}
			*/

			var params = {
					pluginId: "slCert",
					method: "certList",
					params: {},
					callBack: function(isOK, json){
						if(json.result == "true"){
					   		isAuthed = true;

				    		// 본인인증 성공 처리
							loanRenewal4_001.fnCert_Success();

						}else{
							alert("인증서 인증이 실패하였습니다.");
						}
					}
				};
			SDSFrameWork.plugin.execute(params);
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 본인인증 - 입력된 휴대폰 인증번호 검증
			loanRenewal4_001.fnCert_phone_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_confirm : function(){

    		// 본인인증완료여부
    		isAuthed = false;

    		/* // 확인버튼 누를때 실명인증 부분으로 미리체크하도록 이동함.
			// 휴대폰인증 유효성체크 // valid : 번호검증
			var result = loanRenewal4_001.fnCert_phone_valid("valid");
			if(!result){
				return false;
			}
			*/

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );   // 고객명
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );   // 실명번호
			iajax.addParam("RESID_NO_2", $("#resid_no2").val() );
			iajax.addParam("HND_NO", cert_hndNo );   // 휴대폰번호
			iajax.addParam("COM_KIND", $("#telecom").val() );   // 통신사
			iajax.addParam("AUT_AUTH_NO", $("#aut_auth_no").val());	  // 입력된 인증번호

			// -- nFilter --	   // 보안키패드로 입력받은 값
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_02,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){

			    		// 타이머 동작
			    		loanRenewal4_001.fn_stopTimer();

			    		// 본인인증완료여부
			    		isAuthed = true;

			    		// 본인인증 성공 처리
			    		loanRenewal4_001.fnCert_Success();

			    	}else{
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			햇살론(직장인) 한도조회 여부
			loanRenewal4_001.fnGetSunshineYn
		 -------------------------------------------------------------------------------------- */
		fnGetSunshineYn : function(){

			// 햇살론(직장인) 한도조회 여부
			var sunshine_yn_flag = "N";

			// [햇살론 필수]신용정보 수집이용제공 동의
			var agree_chk_4 = $("#agree_chk_4")[0].checked;
			var agree_4_checked = !fnCommon_isNull( agree_chk_4, "boolean");

			// [햇살론 필수]신용정보 조회 동의
			var agree_chk_5 = $("#agree_chk_5")[0].checked;
			var agree_5_checked = !fnCommon_isNull( agree_chk_5, "boolean");

			// 햇살론 동의되었으면 한도조회를 하나 더 보낼것임(서민금융진흥원)
			if( agree_4_checked  &&  agree_5_checked ){
				sunshine_yn_flag = "Y";
			}

			return sunshine_yn_flag;
		},



		/* --------------------------------------------------------------------------------------
			본인인증 성공 처리
			loanRenewal4_001.fnCert_Success
		 -------------------------------------------------------------------------------------- */
		fnCert_Success : function(){

		 	if(!isAuthed){
				alert("선택하신 인증수단의 절차를 진행해주세요.");
				return;
			}

		 	// 성공여부 체크용도로 설정
		 	isAuthed = false;

			// 햇살론(직장인) 한도조회 여부
			var sunshine_yn = loanRenewal4_001.fnGetSunshineYn();

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("EKAMS",FN_GetCookie("emf.797.ekams"));
			iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// 류예샘D 신규대행사(애드게더) 파라미터 적재

			iajax.addParam("SUNSHINELOAN_YN", sunshine_yn);
			iajax.addParam("ONLINE_SUNSHINELOAN_YN", sunshine_yn);


			// 사전체크정보
			// 직업 1 직장인(4대보험가입) 2 개인사업자 3 기타사업소득자인적용역제공자 4 연금소득자
			var qna01 = "";
			var qna01_obj = $("input[type='radio'][name='qna01']:checked");
			if( !fnCommon_isNull(qna01_obj)  &&  !fnCommon_isNull(qna01_obj.length)  &&  qna01_obj.length > 0 ){
				qna01 = qna01_obj[0].value;
			}
			// 고용형태 1 정규직 2 비정규직 3 근로소득미신고자 4 일용근로자
			var qna02 = "";
			var qna02_obj = $("input[type='radio'][name='qna02']:checked");
			if( !fnCommon_isNull(qna02_obj)  &&  !fnCommon_isNull(qna02_obj.length)  &&  qna02_obj.length > 0 ){
				qna02 = qna02_obj[0].value;
			}
			// 주택소유여부 1 예 2 아니오
			var qna03 = "";
			var qna03_obj = $("input[type='radio'][name='qna03']:checked");
			if( !fnCommon_isNull(qna03_obj)  &&  !fnCommon_isNull(qna03_obj.length)  &&  qna03_obj.length > 0 ){
				qna03 = qna03_obj[0].value;
			}

			// parameter 추가
			iajax.addParam("qna01", qna01);
			iajax.addParam("qna02", qna02);
			iajax.addParam("qna03", qna03);

			// 약관동의정보
			var agree_list = $("input[type='checkbox'][name='agree_chk']");
			if( !fnCommon_isNull(agree_list)  &&  !fnCommon_isNull(agree_list.length)  &&  agree_list.length > 0 ){
				for(var i=0; i < agree_list.length; i++){
					var agree_obj = agree_list[i];

					if( !fnCommon_isNull(agree_obj) ){
						var agree_obj_id = agree_obj.id;
						var checked = agree_obj.checked;  // 체크여부
						var checked_string = "0";  // default 미동의

						// 체크되어있으면 동의 처리
						if( !fnCommon_isNull(checked, "boolean") ){
							checked_string = "1";
						}

						// parameter 추가
						iajax.addParam(agree_obj_id, checked_string);
					}
				}
			}

			var agree_chk_10 = $("#agree_chk_10")[0].checked;
			if( agree_chk_10 ){
				iajax.addParam("N01","1");
			}else{
				iajax.addParam("N01","0");
			}

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_06,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull( json )  &&  json.RESULT_NO == "0000" ){

						// 5063  본인인증
						try{
							Emf.convCall(797, 5063, 0, 0, 0);
						}catch (err) { }
						setTimeout(function(){
						 	// 성공여부 체크용도로 재설정
						 	isAuthed = true;

							// 공적지원제도 과거 동의 여부
							if( !fnCommon_isNull( json.YOUTH_GUIDE_YN ) ){
								YOUTH_GUIDE_YN = json.YOUTH_GUIDE_YN;
							}

							// 청년 여부
							if( !fnCommon_isNull( json.youth_age_yn ) ){
								youth_age_yn = json.youth_age_yn;
							}

							// 인증서 본인인증 여부 "true" / "false"
							if( !fnCommon_isNull( json.isXecureAuth ) ){
								isXecureAuth = json.isXecureAuth;
							}

							if( !fnCommon_isNull( json.DATA ) ){

								// 건강보험스크래핑제외 여부
								SCRP_NHIS_EXP = json.DATA.SCRP_NHIS_EXP;

								// 민원24스크래핑제외 여부
								SCRP_MINWON24_EXP = json.DATA.SCRP_MINWON24_EXP;

								// 한도조회이력여부
								LIMIT_AMT_SEARCH_YN = json.DATA.LIMIT_AMT_SEARCH_YN;

								// 당일한도조회이력여부
								TODAY_LIMIT_AMT_SEARCH_YN = json.DATA.TODAY_LIMIT_AMT_SEARCH_YN;

					    		// 건보스크래핑장애여부
					    		SCRP_NHIS_ERROR_YN = json.DATA.SCRP_NHIS_ERROR_YN;

					    		// 민원24스크래핑장애여부
					    		SCRP_MINWON24_ERROR_YN = json.DATA.SCRP_MINWON24_ERROR_YN;
							}

							// 반환받은 대출신청번호
							BANK_INSP_NO = json.BANK_INSP_NO;

							// 앱정보 보관여부
							var appData_save_flag = false;

							// 앱여부
							var isApp_flag = fnCommon_isApp();
							if(isApp_flag){

								// Android
								if( fnCommon_isNull(isIOS, "boolean") ){
									appData_save_flag = true;
								}

								// ios개발 이후 주석제거
								appData_save_flag = true;
							}

							// 앱정보와 함께 보관한 다음 대출신청 등록
							if(appData_save_flag){

								// 단말정보 받기
								var fnCallback_deviceinfo = loanRenewal4_001.fnSave_2;  // 단말정보 저장
								fnCommon_getDeviceData("getIMEI", fnCallback_deviceinfo);

							}else{
					    		// 대출신청 등록
								loanRenewal4_001.fnSave_history();
							}
						},100);
			    	}else{

			    		var fail_flag = true;

			    		// 대출진행중입니다. 대출진행결과 조회에서 이어서 진행하세요
						if( !fnCommon_isNull( json )  &&  !fnCommon_isNull( json.RESULT_DETAIL_NO ) ){
							if(json.RESULT_DETAIL_NO == "000903"  ||  json.RESULT_DETAIL_NO == "000902"){
								fail_flag = false;

								// 메세지 팝업
					    		var msg = "<p>" + json.RESULT_DESC + "</p>";
					    		var no_button_flag = false;  // 아니오 버튼 노출 여부
					    		var fnCallback_yes = loanRenewal4_001.fnMovePage_4;  // 확인 버튼에 함수 지정 // 한도결과조회 화면 이동
					    		var fnCallback_no = null;  // 아니오 미사용

								fnCommon_popup("open", msg, no_button_flag, fnCallback_yes, fnCallback_no);
							}
						}

						// 메세지 팝업
						if(fail_flag){
				    		var msg = "<p>" + json.RESULT_DESC + "</p>";
							fnCommon_popup("open", msg);
						}
			    	}
			    },
				error: function(data, textStatus, error){
					alert("본인인증 성공 처리를 실패하였습니다.\n확인 후 다시 시도해주세요.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			이어하기 - 한도결과조회 화면 이동
			loanRenewal4_001.fnMovePage_4
		 -------------------------------------------------------------------------------------- */
		fnMovePage_4 : function(){

			// 앱여부
			var isApp_flag = fnCommon_isApp();

			// 앱이면 바로 호출
		    if( !fnCommon_isNull(isApp_flag, "boolean") ){
				var data_list = [
			             { "key" : "view_name", "value" : "loanRenewal4_015" }
			           , { "key" : "title", "value" : "한도조회" }
					];

				// renewal4 공통 url 호출
				fnCommon_callUrl( data_list );


	    	// 웹이면 딥링크 호출
		    }else{
				// var url = "https://shinhansmartloan.page.link/?link=http://221.147.190.221:8181/loanRenewal4/loanRenewal4_deeplink/";
				var url = "https://shinhansmartloan.page.link/?link=https://m.shinhansavings.com/loanRenewal4/loanRenewal4_deeplink/";

				url += "?1";  // 네이티브여부 1 웹 2 네이티브
				url += "|N";   // 로그인필요여부 Y/N
				url += "|" + "loanRenewal4_004";   // 반환받을 화면id
				url += "|" + encodeURIComponent("한도조회결과");

				// 고정값
				url += "&apn=com.shinhan.smartloan";
				url += "&isi=936581060";
				url += "&ibi=com.shinhan.SmartLoan";
				url += "&ius=ssbmobile";
				url += "&efr=1";  // 0 페이지이동 1 redirect

				var cleckTime = new Date();

				$("#__check_app__").remove();  // 여러번 시도시 발생했던 영역 삭제
				var $iframe = $("<iframe id='__check_app__' />").hide().appendTo("body");

				/*
				setTimeout(function(){
					if((new Date() - cleckTime) < 2000){
						location.href = url;
					}
				}, 500);
				*/

				// Android
				if( fnCommon_isNull(isIOS, "boolean") ){
					var uagentLow = navigator.userAgent.toLocaleLowerCase();

					// chrome
					if(uagentLow.search("chrome") > -1 && navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split("/")[1] > 25) {
						location.href = url;

					}else{
						$iframe.attr("src", url);
					}

				// IOS
				}else{
					location.href = url;
				}
		    }
		},



		/* --------------------------------------------------------------------------------------
			실명인증 요청 // 기본약관동의 내용 저장 포함
			loanRenewal4_001.fnSave_realName
		 -------------------------------------------------------------------------------------- */
		fnSave_realName : function( fnCallback ){

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()));
			iajax.addParam("RESID_NO1", $("#cert_residNo_1").val());
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("N01", "0");   // 전화	// 화면에서 없어진 항목
			iajax.addParam("N02", "0");   // DM		// 화면에서 없어진 항목

			// 고객정보에 임의 설정하기 위해 휴대폰번호 전송
			iajax.addParam("HND_NO", cert_hndNo );   // 휴대폰번호


			// -- nFilter --	   // 보안키패드로 입력받은 주민등록번호 뒷자리
			var encData = nFilterEncrypted();
			iajax.addParam("RESID_NO2", encData);
			// -- nFilter --


			// *실명인증시 동의항목을 전문으로 보내지는 않고 DB 에 쌓아둔다. 나중에 쓰려고?
			// 전문상담원 안심상담 신청
			var agree_chk_6 = $("#agree_chk_6")[0].checked;
			var agree_chk_6_value = 0;
			if( !fnCommon_isNull( agree_chk_6, "boolean") ){
				agree_chk_6_value = 1;
			}
			iajax.addParam("C08", agree_chk_6_value);   // 전문상담원 안심상담 신청에 대한 동의

			// 대출 거절사유 고지 신청
			var agree_chk_7 = $("#agree_chk_7")[0].checked;
			var agree_chk_7_value = 0;
			if( !fnCommon_isNull( agree_chk_7, "boolean") ){
				agree_chk_7_value = 1;
			}
			iajax.addParam("C09", agree_chk_7_value);   // 대출 거절사유 고지 신청

			// [사잇돌2필수]신용정보조회동의
			var agree_chk_3 = $("#agree_chk_3")[0].checked;
			var agree_chk_3_value = "0";
			if( !fnCommon_isNull( agree_chk_3, "boolean") ){
				agree_chk_3_value = "1";
			}
			iajax.addParam("C10", agree_chk_3_value);  // 서울보증보험 : 개인(신용)정보의 수집·이용·제공에 대한 동의

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_05,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){

				    	// 실명인증 후 수행할 본인인증 수행(인증서 or 휴대폰 or 신용카드)
				    	fnCallback();

			    	}else{
				    	var authErrMsg  = "실명인증이 실패하였습니다.\n";
				        authErrMsg += "확인 후 다시 시도해주세요.\n";
				        authErrMsg += "개명 등으로 실명이 변경된 경우\n";
				        authErrMsg += "NICE (02-2122-4000)\n";
				        authErrMsg += "통해 변경 후 이용가능합니다.\n\n";
				        authErrMsg += "신용조회 차단서비스 이용시\n";
				        authErrMsg += "차단해제 후 진행바랍니다.\n";
				        authErrMsg += "NICE: 02-2122-4000\n";
				        authErrMsg += "KCB: 02-708-1000";

						alert(authErrMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					alert("실명인증이 실패하였습니다.\n확인 후 다시 시도해주세요.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					alert("data.status:[ " + data.status + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			대출신청 등록
			loanRenewal4_001.fnSave_history
		 -------------------------------------------------------------------------------------- */
		fnSave_history : function(){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_08,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){

			    		// 대출신청상태조회
						loanRenewal4_001.fnSearch_2();

			    	}else{
			    		alert("대출신청 등록을 실패하였습니다.\n확인 후 다시 시도해주세요.");
			    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
			    	}
			    },
				error: function(data, textStatus, error){
					alert("대출신청 등록을 실패하였습니다.\n확인 후 다시 시도해주세요.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			본인인증 완료 후 다음 화면 호출
			loanRenewal4_001.fnNext
		 -------------------------------------------------------------------------------------- */
		fnNext : function(){

			// 한도조회이력여부 Y
			if( !fnCommon_isNull( LIMIT_AMT_SEARCH_YN )  &&  LIMIT_AMT_SEARCH_YN == "Y" ){

				// 메세지 팝업
	    		var msg = "<p>최근 대출한도조회 이력이 있습니다.\n최근 한도조회결과를 확인하시겠습니까?\n정확한 한도산출을 위해 신용조회를 합니다.</p>";
	    		var no_button_flag = true;  // 아니오 버튼 노출 여부
	    		var fnCallback_yes = loanRenewal4_001.fnMovePage_1;  // 확인 버튼에 함수 지정 // 한도결과조회 화면 이동
	    		// var fnCallback_no = null;  // 아니오 미사용
	    		var fnCallback_no = loanRenewal4_001.fnSave_1;  // 아니오 버튼에 함수 지정 // 3003 조회시 처리구분값 세션설정

				fnCommon_popup("open", msg, no_button_flag, fnCallback_yes, fnCallback_no);

			}else{

				// 3003 조회시 처리구분값 세션설정
				loanRenewal4_001.fnSave_1();
			}
		},



		/* --------------------------------------------------------------------------------------
			한도결과조회 화면 이동
			loanRenewal4_001.fnMovePage_1
		 -------------------------------------------------------------------------------------- */
		fnMovePage_1 : function(){

			// 한도조회 화면이동
			loanRenewal4_001.fnMovePage_3();

			/*
			// 당일한도조회이력여부 Y
			if( !fnCommon_isNull( TODAY_LIMIT_AMT_SEARCH_YN )  &&  TODAY_LIMIT_AMT_SEARCH_YN == "Y" ){

				// 한도조회 화면이동
				loanRenewal4_001.fnMovePage_3();

			}else{

				// 메세지 팝업
	    		var msg = "<p>당일 신용조회내역이 없습니다.\n정확한 한도를 산출을 위해 신용조회를 재조회합니다.</p>";
	    		var no_button_flag = false;  // 아니오 버튼 노출 여부
	    		var fnCallback_yes = loanRenewal4_001.fnMovePage_3;  // 확인 버튼에 함수 지정 // 한도조회 화면이동
	    		var fnCallback_no = null;  // 아니오 버튼에 함수 지정

				fnCommon_popup("open", msg, no_button_flag, fnCallback_yes, fnCallback_no);
			}
			*/
		},



		/* --------------------------------------------------------------------------------------
			페이지이동
			loanRenewal4_001.fnMovePage_3
		 -------------------------------------------------------------------------------------- */
		fnMovePage_3 : function(){
			var data_list = [
		             { "key" : "view_name", "value" : "loanRenewal4_004" }
		           , { "key" : "title", "value" : "한도조회결과" }
		           , { "key" : "beforeview", "value" : "loanRenewal4_001" }  // 한도조회 화면에서 오류 발생시 되돌아갈 화면id
				];

			// renewal4 공통 url 호출
			fnCommon_callUrl( data_list );
		},



		/* --------------------------------------------------------------------------------------
			3003 조회시 처리구분값 세션설정
			loanRenewal4_001.fnSave_1
		 -------------------------------------------------------------------------------------- */
		fnSave_1 : function(){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("PROC_GB_3003", "0");  // 3003 조회시 처리구분값 설정  // 처리구분 0 한도조회요청 1 일반한도조회 2 간편한도조회

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_07,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"){

						// 페이지이동
						loanRenewal4_001.fnMovePage_2();

			    	}else{
			    		alert("세션설정에 실패하였습니다.");
			    		return;
			    	}
			    },
				error: function(data, textStatus, error){
		    		alert("세션설정에 실패하였습니다.");
		    		return;
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			페이지이동
			loanRenewal4_001.fnMovePage_2
		 -------------------------------------------------------------------------------------- */
		fnMovePage_2 : function(){

			// 앱여부
			var isApp_flag = fnCommon_isApp();

			// 건강보험스크래핑제외 여부  or  이미 스크래핑 성공했으면
			if( (!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")
				||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y") ){

				// 대출신청한도조회 화면 호출
				var data_list = [
			             { "key" : "view_name", "value" : "loanRenewal4_004" }
			           , { "key" : "title", "value" : "한도조회결과" }
			           , { "key" : "beforeview", "value" : "loanRenewal4_001" }  // 한도조회 화면에서 오류 발생시 되돌아갈 화면id
					];

				// renewal4 공통 url 호출
				fnCommon_callUrl( data_list );

			}else{

				// 직장정보 직접입력 화면
				var view_name = "loanRenewal4_003";
				var title = "개인정보입력";

				// 앱이고 인증서로 본인인증 했으면 스크래핑 화면 이동
				if( isApp_flag  &&  !fnCommon_isNull(isXecureAuth)  &&  (isXecureAuth == "Y"  ||  isXecureAuth == "true") ){

					// 직업을 직장인 선택한 경우
					var qna01_obj = $("input[type='radio'][name='qna01']:checked");
					if( !fnCommon_isNull(qna01_obj)  &&  !fnCommon_isNull(qna01_obj.length)  &&  qna01_obj.length > 0 ){
						var qna01 = qna01_obj[0].value;

						// --------------------- 직장인(4대보험 가입 필수)
						if(qna01 == "1"){

							// 건보스크래핑장애여부
							if( fnCommon_isNull(SCRP_NHIS_ERROR_YN)  ||  SCRP_NHIS_ERROR_YN == "N" ){

								// 온라인서류제출(스크래핑) - 한도조회 화면 호출
								view_name = "loanRenewal4_002";
								title = "개인정보입력";
							}
						}
					}
				}

				// 공적지원제도 과거 동의한적 없고
				if( fnCommon_isNull(YOUTH_GUIDE_YN)  ||  YOUTH_GUIDE_YN != "Y" ){

					// 청년이면
					if( !fnCommon_isNull(youth_age_yn)  &&  youth_age_yn == "Y" ){

						// 공적지원제도 안내 화면 호출
						view_name = "loanRenewal4_006";
						title = "개인정보입력";
					}
				}

				var data_list = [
			             { "key" : "view_name", "value" : view_name }
			           , { "key" : "title", "value" : title }
					];

				// renewal4 공통 url 호출
				fnCommon_callUrl( data_list );
			}
		},



		/* --------------------------------------------------------------------------------------
			대출신청상태조회
			loanRenewal4_001.fnSearch_2
		 -------------------------------------------------------------------------------------- */
		fnSearch_2 : function(){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_09,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
				    	/* 전문 활용안함
			    		// 대출신청 내역이 존재하여 추가 신청이 불가
			    		if(json.DATA.ST_YN == 1){

							// 메세지 팝업
				    		var msg = "<p>" + json.RESULT_DESC + "</p>";
							fnCommon_popup("open", msg);

			    			// 레이어팝업 열기
		    				// loanRenewal4_001.fn_openPop( "popup_sorry", json.DATA.CUST_NO, json.DATA.CUST_NM );

			    		}else{

			    			// 거래 모두 성공 여부
			    			all_tran_success_yn = true;

					    	// app 이 올라왔다가 뒤로가기 동작시 하단의 web 레이어가 노출되어 다시 인증을 하는 현상 방지
					    	$("#auth_finish").show();  // 본인인증 완료 영역 노출
					    	$("#slid_3_div").hide();  // 본인인증 영역 숨기기

			    			// 화면이동 // 공적지원제도 안내 or 온라인서류제출(스크래핑)
			    			loanRenewal4_001.fnNext();
			    		}
			    		*/

		    			// 거래 모두 성공 여부
		    			all_tran_success_yn = true;

				    	// app 이 올라왔다가 뒤로가기 동작시 하단의 web 레이어가 노출되어 다시 인증을 하는 현상 방지
				    	$("#auth_finish").show();  // 본인인증 완료 영역 노출
				    	$("#slid_3_div").hide();  // 본인인증 영역 숨기기

		    			// 화면이동 // 공적지원제도 안내 or 온라인서류제출(스크래핑)
		    			loanRenewal4_001.fnNext();

			    	} else {
			    		alert("대출신청상태 조회가 실패하였습니다.\n확인 후 다시 시도해주세요.");
			    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
			    	}
			    },
				error: function(data, textStatus, error){
					alert("대출신청상태 조회가 실패하였습니다.\n확인 후 다시 시도해주세요.");
		    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 인증번호 요청
			loanRenewal4_001.fnCert_phone_request
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_request : function(){

    		// 본인인증완료여부
    		isAuthed = false;

			// 초기화
			$("#cert_phone_timer_dl").hide();		// 인증번호 입력 영역
			$("#aut_auth_no").hide();	 // 인증번호
			$("#aut_auth_no").val("");

			// 인증서 유효성체크 - (이름, 주민번호, 휴대폰번호) 기본 본인인증 공통영역 체크이므로 함께 사용하자!
			var result = loanRenewal4_001.fnCert_xecure_valid();
			if(!result){
				return false;
			}

			// 휴대폰인증 유효성체크
			var result = loanRenewal4_001.fnCert_phone_valid();
			if(!result){
				return false;
			}

			iajax.clearParam();

			// 통신사
			var telecom = $("#telecom").val();
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );  // 고객명
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );  // 생년월일
			iajax.addParam("COM_KIND", telecom );
			iajax.addParam("CHK_CSRF", random);

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( !fnCommon_isNull(cert_hndNo)  &&  !fnCommon_isNull(cert_hndNo.length)  &&  cert_hndNo.length >= 10 ){
				iajax.addParam("HND_NO", cert_hndNo);
			}

			// -- nFilter --	   // 보안키패드로 입력받은 값
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			//AOS 문자자동가져오기 콜
			callsmsAos();

			//앱여부
			var isApp_flag = fnCommon_isApp();
			if(isApp_flag){
				// Android
				if( fnCommon_isNull(isIOS, "boolean") ){
					iajax.addParam("APP_GUBUN", "9");
				}else{
					iajax.addParam("APP_GUBUN", "8");
				}
			}else{
				iajax.addParam("APP_GUBUN", "1");
			}

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_04,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000"){

			    		// 인증시간 timer 노출
						$("#cert_phone_timer_dl").show();
						$("#aut_auth_no").show();

			    		// 인증요청 버튼
			    		$("#certif01_btn_1").html("재요청");
			    		$("#certif01_btn_1").removeClass("on");

			    		// 타이머 동작
			    		loanRenewal4_001.fn_stopTimer();
			    		loanRenewal4_001.fn_startTimer();

			    	}else{
			    		alert("인증번호 발송에 실패하였습니다. 다시 시도해주세요.");
			    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
			    	}
			    },
				error: function(data, textStatus, error) {
					alert("실명인증이 실패하였습니다.\n확인 후 다시 시도해주세요.");
		    		console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					alert("data.status:[ " + data.status + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 인증요청 타이머 재시작
			loanRenewal4_001.fn_restartTimer
		fn_restartTimer : function(){
			stopTimer();
			startTimer();
		},
		 -------------------------------------------------------------------------------------- */

		/* --------------------------------------------------------------------------------------
			휴대폰 인증요청 타이머 시작
			loanRenewal4_001.fn_startTimer
		 -------------------------------------------------------------------------------------- */
		fn_startTimer : function(){
			seconds = 180;
			countDownTimer = setInterval("loanRenewal4_001.fn_secoundPassed()", 1000);
		},

		/* --------------------------------------------------------------------------------------
			휴대폰 인증요청 타이머 종료
			loanRenewal4_001.fn_stopTimer
		 -------------------------------------------------------------------------------------- */
		fn_stopTimer : function(){
			clearInterval(countDownTimer);
		},

		/* --------------------------------------------------------------------------------------
			휴대폰 인증요청 타이머
			loanRenewal4_001.fn_secoundPassed
		 -------------------------------------------------------------------------------------- */
		fn_secoundPassed : function(){
			var minutes = Math.round((seconds - 30) / 60);
			var remainingSeconds = seconds % 60;

			if(remainingSeconds < 10) {
				remainingSeconds = "0" + remainingSeconds;
			}

			// $("#verify_time").html("고객님 휴대폰으로 인증번호가 전송되었습니다.<br>SMS 인증시간 [ " + minutes + " : " + remainingSeconds + " ]");
			$("#cert_phone_timer").html("[<span>" + minutes + " : " + remainingSeconds + "</span>]");

			if( fnCommon_isNull(seconds) ){
				alert("휴대폰 인증이 실패하였습니다.\n인증시간이 초과된 경우\n인증번호 재요청 후 입력해주세요.");
				loanRenewal4_001.fn_stopTimer();
			}else{
				seconds--;
			}
		},



		/* --------------------------------------------------------------------------------------
			약관동의 확인 버튼 클릭 팝업  // 아래에서 위로 레이어팝업
			loanRenewal4_001.fn_layerUpDownPop
		 -------------------------------------------------------------------------------------- */
		fn_layerUpDownPop : function(e){
		    $('.layerUpDownPop').click(function(){
		        $('.mask2').remove();
		        var link = $(this).attr('href');
		        $(link).slideDown(400);
		        $('body').append('<div class="mask2"></div>');
		        $('body').css('overflow','hidden');
		        $('#container').bind('touchmove', function(e){e.preventDefault()});
		        $('.mask2').bind('touchmove', function(e){e.preventDefault()});
		        loanRenewal4_001.fn_closeUpDownPop(link);
		        return false;
		    });
		},



		/* --------------------------------------------------------------------------------------
			아래에서 위로 레이어팝업 닫기
			loanRenewal4_001.fn_closeUpDownPop
		 -------------------------------------------------------------------------------------- */
		fn_closeUpDownPop : function(link){
		    var id = link;
		    $(".layerUpDownPop .close, .close").click(function(){
		        $(id).slideUp(400);
		        $('.mask2').remove();
		        $('body').css('overflow','');
		        $('.mask2').unbind('touchmove');
		        $('#container').unbind('touchmove');
		    });
		},



		/* --------------------------------------------------------------------------------------
			인증번호 입력 후 확인버튼 클릭 이벤트 생성 // 레이어팝업
			loanRenewal4_001.fn_layerPop
		 -------------------------------------------------------------------------------------- */
		fn_layerPop : function(e){
	        $(".layerWrap").hide();
	        $('.mask2').remove();
	        var link = $(this).attr('href');
	        $(link).show();
	        $('body').append('<div class="mask2"></div>');
	        $('body').css('overflow','hidden');
	        $('#container').bind('touchmove', function(e){	e.preventDefault();}	);
	        $('.mask2').bind('touchmove', function(e){	e.preventDefault();}	);
	        loanRenewal4_001.fn_closePop(link);  // 레이어팝업 닫기
	        return false;
		},



		/* --------------------------------------------------------------------------------------
			// 레이어팝업 열기
			loanRenewal4_001.fn_openPop
		 -------------------------------------------------------------------------------------- */
		fn_openPop : function( popup_id, cust_no, cust_nm ){

	        // 대출신청 내역이 존재. 대출불가안내
			if( !fnCommon_isNull(popup_id)  &&  popup_id == "popup_sorry" ){

				// app
				if(isApp){
		    		var result = confirm("입력하신 고객정보의 대출신청 내역이 존재하여 진행이 불가능합니다.\n신청결과를 보시려면 '확인'을 선택, 자세한 사항은 대출상담을 통해 문의해주세요.");
		    		if(result){
	    				var params = {
	    						pluginId: "webPostBridge",
	    						method: "onExecute",
	    						params: {
	    							"url": "/loanRequestResult",
	    							"data": {
	    								"title": "대출진행조회",
	    								"CUST_NO": cust_no,
	    							    "CUST_NM": fnCommon_deleteNull(cust_nm)
	    							}
	    					    },
	    						callBack : function(isOK, json){
	    						}
	    					};
	    				SDSFrameWork.plugin.execute(params);
		    		}else{
		    			// 메인화면 이동
		    			fnCommon_goHome();
		    		}

	    		// web
				}else{
					// 결과보기 // 앱 다운로드 유도
					// appInvoke();

			        $("#" + popup_id).show();

			        // 레이어팝업 닫기 이벤트 생성
			        $("#" + popup_id + "_close").click(function(){
				        $("#" + popup_id).hide();
				    });
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			레이어팝업 닫기
			loanRenewal4_001.fn_closePop
		 -------------------------------------------------------------------------------------- */
		fn_closePop : function( popup_id ){
		    $(".layerUpDownPop .close, .close, .layerWrap .back").click(function(){
		        $("#" + popup_id).hide();
		        $('.mask2').remove();
		        $('body').css('overflow','');
		        $('.mask2').unbind('touchmove');
		        $('#container').unbind('touchmove');
		    });
		},



		/* --------------------------------------------------------------------------------------
			인위적 슬라이드 이동
			loanRenewal4_001.fnMove_slide
		 -------------------------------------------------------------------------------------- */
		fnMove_slide : function( num ){
			if( !fnCommon_isNull(num) ){

				// 약관동의
				if(num == 2){

					// 사전체크리스트 닫기
					$("#slid_1_li").removeClass("active");
					$("#slid_1_div").hide();

					// 약관동의 열기
					$("#slid_2_li").removeClass("checkToggle");  // 비활성모양 없애기
					$("#slid_2_li").addClass("active");
					$("#slid_2_div").show();

				// 본인인증
				}else if(num == 3){

					// 약관동의 닫기
					$("#slid_2_li").removeClass("active");
					$("#slid_2_div").hide();

					// 본인인증 열기
					$("#slid_3_li").removeClass("checkToggle");  // 비활성모양 없애기
					$("#slid_3_li").addClass("active");
					$("#slid_3_div").show();

					// 본인인증 탭 메뉴 클릭 이벤트 // 인증서 클릭효과로 설정
					loanRenewal4_001.fnEvent_TabClick( {target:{id:"tab_button_official",className:""}} );
				}

				// 스크롤 이동
		        // $('body,html').animate({scrollTop: 0}, 500);
			}
		},



		/* --------------------------------------------------------------------------------------
			슬라이드 바 클릭 이벤트
			loanRenewal4_001.fnEvent_Slide
		 -------------------------------------------------------------------------------------- */
		fnEvent_Slide : function(e){
		    var toggle_button = $(this);
		    var toggle_li = toggle_button.parent('li');

		    // 비활성 슬라이드 바는 클릭해도 열지않기, 앞의 입력 정보를 모두 입력한 후에 열어주기
		    var className = toggle_li.attr("class");
			if( !fnCommon_isNull(className)  &&  className.indexOf("checkToggle") > -1 ){
				return;
			}

		    // 다른 슬라이드 접기
		    toggle_li.siblings().eq(0).removeClass('active').children('.toggleCont').hide();
		    // toggle_li.siblings().eq(0).removeClass('active').children('.toggleCont').hide();

		    // 클릭대상 뒤쪽
		    var toggle_li_id = toggle_li[0].id;
			if( !fnCommon_isNull(toggle_li_id) ){

				// 사전체크리스트
				if( toggle_li_id.indexOf("1") > -1 ){
					if(!$("#slid_2_li").hasClass("checkToggle")){
						$("#slid_2_li").addClass("checkToggle")
					}
					if(!$("#slid_3_li").hasClass("checkToggle")){
						$("#slid_3_li").addClass("checkToggle")
					}

				// 약관동의
				}else if( toggle_li_id.indexOf("2") > -1 ){
					if(!$("#slid_3_li").hasClass("checkToggle")){
						$("#slid_3_li").addClass("checkToggle")
					}
				}
			}

		    /*
		    $('.certifMenu').show();	// 본인인증 탭
		    $('.certifCont').hide();  // 본인정보 입력란
		    */

		    // 클릭대상 슬라이드가 비활성이면 활성으로
		    if( toggle_li.hasClass('active') == false){
		    	toggle_li.removeClass('checkToggle');  // 활성으로
		        toggle_li.addClass('active').children('.toggleCont').show();   // 하단부 노출
		        toggle_li.siblings().removeClass('active').children('.toggleCont').hide();
		        $('body,html').animate({scrollTop: toggle_button.offset().top},500);   // 스크롤 이동

	        // 활성이면 비활성으로
		    }else{
		        toggle_li.removeClass('active').children('.toggleCont').hide();
		    }

		},



		/* --------------------------------------------------------------------------------------
			사전체크리스트 확인 버튼 클릭
			loanRenewal4_001.fnConfirm_checklist
		 -------------------------------------------------------------------------------------- */
		fnConfirm_checklist : function(){

			// 직업
			var qna01 = $("input[type='radio'][name='qna01']:checked");
			if( fnCommon_isNull(qna01)  ||  fnCommon_isNull(qna01.length)  &&  qna01.length < 1 ){
				alert("직업을 선택해주시기 바랍니다.");
				return false;
			}

			var qna01_checked = qna01[0];
			var qna01_checked_value = qna01_checked.value;

			if( fnCommon_isNull(qna01_checked_value) ){
				alert("직업을 선택해주시기 바랍니다.");
				return false;
			}

			// --------------------- 직장인(4대보험 가입 필수)
			if(qna01_checked_value == "1"){

				// 고용형태
				var qna02 = $("input[type='radio'][name='qna02']:checked");
				if( fnCommon_isNull(qna02)  ||  fnCommon_isNull(qna02.length)  &&  qna02.length < 1 ){
					alert("고용형태를 선택해주시기 바랍니다.");
					return false;
				}

				// 주택소유여부
				var qna03 = $("input[type='radio'][name='qna03']:checked");
				if( fnCommon_isNull(qna03)  ||  fnCommon_isNull(qna03.length)  &&  qna03.length < 1 ){
					alert("주택소유여부를 선택해주시기 바랍니다.");
					return false;
				}

				// 약관동의 슬라이드 이동
				loanRenewal4_001.fnMove_slide(2);

			// --------------------- 직장인 아니면
			}else{

				// 약관동의 슬라이드 이동
				loanRenewal4_001.fnMove_slide(2);
			}
		},



		/* --------------------------------------------------------------------------------------
			라디오 선택
			loanRenewal4_001.fnRadio_select
		 -------------------------------------------------------------------------------------- */
		fnRadio_select : function( name, val ){
			if( !fnCommon_isNull(name) ){

				// 햇살론 동의 노출여부
				var sunshine_show_flag = false;

				// 사잇돌 동의 노출여부
				var sgi_show_flag = false;
				
				// 다음스텝 전환 여부
				var next_step_flag = false;


				// 직업
				var qna01 = $("input[type='radio'][name='qna01']:checked");
				if( !fnCommon_isNull(qna01)  &&  !fnCommon_isNull(qna01.length)  &&  qna01.length > 0 ){
					var qna01_checked = qna01[0];
					var qna01_checked_value = qna01_checked.value;


					// --------------------- 직장인(4대보험 가입 필수)
					if( !fnCommon_isNull(qna01_checked_value)  &&  qna01_checked_value == "1" ){

						// 고용형태/주택소유여부 노출
						$("#qna02_p").show();
						$("#qna02_ul").show();
						$("#qna03_p").show();
						$("#qna03_ul").show();

						// 약정동의 햇살론 필수항목 노출
						sunshine_show_flag = true;

						// 약정동의 사잇돌 필수항목 노출
						sgi_show_flag = true;

						// 고용형태
						var qna02 = $("input[type='radio'][name='qna02']:checked");
						var qna02_checked_flag = false;  // 선택여부
						if( !fnCommon_isNull(qna02)  &&  !fnCommon_isNull(qna02.length)  &&  qna02.length > 0 ){
							var qna02_checked = qna02[0];
							var qna02_checked_value = qna02_checked.value;
							qna02_checked_flag = true;

							/*
							// 고용형태 : 근로소득미신고자, 일용근로자  -->  온라인햇살론(52351) 상품 거절 및 등본 스크래핑 제외
							if( !fnCommon_isNull(qna02_checked_value)  &&  (qna02_checked_value == "3"  ||  qna02_checked_value == "4") ){

								// 약정동의 햇살론 숨기기
								sunshine_show_flag = false;
							}
							*/
						}

						// 주택소유여부
						var qna03 = $("input[type='radio'][name='qna03']:checked");
						var qna03_checked_flag = false;  // 선택여부
						if( !fnCommon_isNull(qna03)  &&  !fnCommon_isNull(qna03.length)  &&  qna03.length > 0 ){
							var qna03_checked = qna03[0];
							var qna03_checked_value = qna03_checked.value;
							qna03_checked_flag = true;

							/*
							// 본인명의 주택 소유 : 예  -->  온라인햇살론(52351) 상품 거절 및 등본 스크래핑 제외
							if( !fnCommon_isNull(qna03_checked_value)  &&  qna03_checked_value == "1" ){

								// 약정동의 햇살론 숨기기
								sunshine_show_flag = false;
							}
							*/
						}

						// 직장인 귀속 문항도 모두 선택되었으면 다음스텝으로 이동
						if(qna02_checked_flag  &&  qna03_checked_flag){
							next_step_flag = true;
						}


					// --------------------- 직장인 아니면
					}else{

						// 고용형태/주택소유여부 숨기기
						$("#qna02_p").hide();
						$("#qna02_ul").hide();
						$("#qna03_p").hide();
						$("#qna03_ul").hide();

						// 고용형태/주택소유 초기화 // 선택된 항목 해제효과
						$("input[type='radio'][name='qna02']").prop("checked", false);
						$("input[type='radio'][name='qna03']").prop("checked", false);
						
						// 약정동의 햇살론 숨기기
						sunshine_show_flag = false;
						
						//8:주부, 9:무직인 경우 - 사잇돌 약정서 숨기기
						if( qna01_checked_value == "8"   ||  qna01_checked_value == "9" ){
							sgi_show_flag = false;
						}
						else
						{
							sgi_show_flag = true;
						}

						// 다음스텝 이동
						next_step_flag = true;
					}
				}

				// 사잇돌 동의 노출여부
				if(sgi_show_flag){
					$("#agree_3_li").show();
				}else{
					$("#agree_3_li").hide();

					// 체크해제 // 값이 딸려들어가지 않도록
					$("#agree_chk_3").prop("checked", false);
					$("#agree_chk_3_1").prop("checked", false);
				}

				// 햇살론 동의 노출여부
				if(sunshine_show_flag){
					$("#agree_4_li").show();
					$("#agree_5_li").show();
				}else{
					$("#agree_4_li").hide();
					$("#agree_5_li").hide();

					// 체크해제 // 값이 딸려들어가지 않도록
					$("#agree_chk_4").prop("checked", false);
					$("#agree_chk_4_1").prop("checked", false);
					$("#agree_chk_5").prop("checked", false);
					$("#agree_chk_5_1").prop("checked", false);
				}

				// 다음스텝 이동 여부
				if(next_step_flag){

					// 너무 빨리 이동한다 하여 확인버튼으로 대체
					// 약관동의 슬라이드 이동
					// loanRenewal4_001.fnMove_slide(2);
				}
			}
		},

		/* --------------------------------------------------------------------------------------
			휴대폰 동의 선택
			loanRenewal4_001.fnAgree_mobile
		 -------------------------------------------------------------------------------------- */
		fnAgree_mobile : function(){
			var al_agree_mobile = $("#al_agree_mobile").val();
			if("0" == al_agree_mobile){
				$("#allChk_mobile").prop("checked", true);
				$("#al_agree_mobile").val(1)
			}else{
				$("#allChk_mobile").prop("checked", false);
				$("#al_agree_mobile").val(0)
			}

		},

		/* --------------------------------------------------------------------------------------
			신용카드 동의 선택
			loanRenewal4_001.fnAgree_credit
		 -------------------------------------------------------------------------------------- */
		fnAgree_credit : function(){
			var al_agree_credit = $("#al_agree_credit").val();
			if("0" == al_agree_credit){
				$("#allChk_credit").prop("checked", true);
				$("#al_agree_credit").val(1);
			}else{
				$("#allChk_credit").prop("checked", false);
				$("#al_agree_credit").val(0);
			}

		}


	};   // var loanRenewal4_001 = {






	/* --------------------------------------------------------------------------------------
		온라인서류제출(스크래핑) 화면 - 한도조회
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_002 = {

		/* --------------------------------------------------------------------------------------
			기본수행
			loanRenewal4_002.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// 세션 필수체크
			fnCommon_checkSession();

			// 고객정보, 동의정보 보관값 추출
			loanRenewal4_002.fnSearch_1();
		},



		/* --------------------------------------------------------------------------------------
			고객정보, 동의정보 보관값
			loanRenewal4_002.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function(){

			iajax.clearParam();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_002_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"){

			    		custNm = fnCommon_deleteNull(json.custNm);
			    		residNo = json.residNo;
			    		SUNSHINELOAN_YN = json.SUNSHINELOAN_YN;
			    		isPersonInfoReq = json.isPersonInfoReq;
			    		isShinhanFan = json.isShinhanFan;
			    		isXecureAuth = json.isXecureAuth;
			    		SCRAP_CERT_PASS_YN = json.SCRAP_CERT_PASS_YN;
			    		qna01 = json.qna01;
			    		qna02 = json.qna02;
			    		qna03 = json.qna03;
			    		// isScrpNHISExc = json.isScrpNHISExc;
			    		// isScrpMinWon24Exc = json.isScrpMinWon24Exc;

			    		SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;	// 건보스크래핑장애여부
			    		SCRP_NHIS_ERROR_MSG = json.SCRP_NHIS_ERROR_MSG;		// 건보스크래핑장애메세지
			    		loanRenewal4_014_START_YN = json.loanRenewal4_014_START_YN;		// 온라인서류제출 메뉴로 접근여부

			    		REG_KIND = json.REG_KIND;		// 전자서명상태(자서접수처 구분)
			    		ST_CD = json.ST_CD;		// 진행상태

						//////////////////////////////////////////
						// 추가 스크래핑 대상
						// ONLINE_DOC_C;   // 민원24 제출대상
						// ONLINE_DOC_F;   // 홈택스(1,2,3)
						// ONLINE_DOC_G;   // 건보(NHIS)
						// ONLINE_DOC_H;   // 국민연금(NPS)
						ONLINE_DOC_C = json.ONLINE_DOC_C;   // 민원24 제출대상
						ONLINE_DOC_F = json.ONLINE_DOC_F;   // 홈택스(1,2,3)
						ONLINE_DOC_G = json.ONLINE_DOC_G;   // 건보(NHIS)
						ONLINE_DOC_H = json.ONLINE_DOC_H;   // 국민연금(NPS)
						
						//사업자번호 추가
						rgstNo		=	json.RGST_NO;

						// 한도조회시건강보험만 체크
						if( json.only_nhis == "Y" ){
							ONLINE_DOC_C = "0";   // 민원24 제출대상
							ONLINE_DOC_F = "0";   // 홈택스(1,2,3)
							ONLINE_DOC_G = "1";   // 건보(NHIS)
							ONLINE_DOC_H = "0";   // 국민연금(NPS)
						}

			    		// 온라인서류제출 메뉴로 접근한 케이스 아니면 스텝바 노출
				    	if( fnCommon_isNull(loanRenewal4_014_START_YN)  ||  loanRenewal4_014_START_YN != "Y"){
				    		$(".personal_data_bar").show();
				    	}

			    		// 건보 장애있으면 안내 메세지 발생
				    	if( !fnCommon_isNull(SCRP_NHIS_ERROR_YN)  &&  (SCRP_NHIS_ERROR_YN == "Y"  ||  SCRP_NHIS_ERROR_YN == "1") ){
					    	if( fnCommon_isNull(SCRP_NHIS_ERROR_MSG) ){
					    		SCRP_NHIS_ERROR_MSG = "건강보험공단 스크래핑을 실패했습니다.";
					    	}

							// 메세지 팝업
				    		var msg = "<p>" + SCRP_NHIS_ERROR_MSG + "</p>";
				    		var no_button_flag = false;  // 아니오 버튼 노출 여부
				    		var fnCallback_yes = fnCommon_goHome;  // 확인 버튼에 함수 지정 // 메인으로 이동
				    		var fnCallback_no = null;  // 아니오 미사용

							fnCommon_popup("open", msg, no_button_flag, fnCallback_yes, fnCallback_no);
				    	}
					}
			    },
				error: function(data, textStatus, error){
					alert(error);
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
		        }
			});

		},



		/* --------------------------------------------------------------------------------------
			온라인서류제출 서비스 이용신청 명칭 클릭시 팝업 호출
			loanRenewal4_002.fnShowPopup
		 -------------------------------------------------------------------------------------- */
		fnShowPopup : function(e){

			// [필수]개인(신용)정보수집이용제공동의서(온라인서류제출)
			showDialog(popupURL, 420);
		},



		/* --------------------------------------------------------------------------------------
			확인함 체크박스 클릭시 이벤트
			loanRenewal4_002.fnClickAgree
		 -------------------------------------------------------------------------------------- */
		fnClickAgree : function(e){
			var next_yn_flag = false;

			// 체크박스 동의시 확인버튼 노출
			var agree_1 = $("#agree_1");
			if( !fnCommon_isNull(agree_1)  &&  !fnCommon_isNull(agree_1.length)  &&  agree_1.length > 0 ){
				var checked = agree_1[0].checked;
				if( checked ){
					next_yn_flag = true;
				}
			}

			if(next_yn_flag){
				$("#btn_next").show();
				$("#btn_next").focus();
		        $('body,html').animate({scrollTop: $("#btn_next").offset().top},500);   // 스크롤 이동
			}else{
				// $("#btn_next")[0].style.display = "none";
				$("#btn_next").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			스크래핑 요청
			loanRenewal4_002.fnScraping_1
		 -------------------------------------------------------------------------------------- */
		fnScraping_1 : function(){

			// 앱 여부 // 앱이 아닌 경우 스크래핑 화면으로 안보낼거지만 혹시 모르니까!
			var isApp_flag = fnCommon_isApp();
			if(!isApp_flag){
				alert("스크래핑은 app에서만 가능합니다. app으로 다시 접속하시기 바랍니다.");
				return false;
			}

			// 인증서 호출 스크래핑 native method
			var method = "certListForScraping";


			/////////////////////////////////////////////////////
			// for_type 정의
			// 1. 민원24
			// 2. 국민연금
			// 3. 건강보험
			// 4. 홈텍스
			// 5. 건강보험 + 국민연금
			// 6. 민원24 + 홈텍스
			// 7. 건강보험 + 국민연금 + 홈텍스
			// 8. 건강보험 + 민원24 + 홈텍스
			// 9. 건강보험 + 민원24

			// 해당 로직에서는 민원24는 돌지 않습니다.
			// 2. 국민연금
			// 3. 건강보험
			// 4. 홈텍스
			// 5. 건강보험 + 국민연금
			// 7. 건강보험 + 국민연금 + 홈텍스

			// 기본 FOR_TYPE = "7"
			var FOR_TYPE = "7"; // 건보+국민연금+HOMETAX;
			var maxCount = 3;

			// ONLINE_DOC_C 민원24
			// ONLINE_DOC_F 홈텍스(1,2,3)
			// ONLINE_DOC_G 건보
			// ONLINE_DOC_H 국민연금

			if( ONLINE_DOC_H == "1" && ONLINE_DOC_G == "1" && (ONLINE_DOC_F >= "1" && ONLINE_DOC_F <= "3") ){
				FOR_TYPE = "7";
				maxCount = 3;
			}else if( ONLINE_DOC_G == "1" && ONLINE_DOC_H == "1" ){
				FOR_TYPE = "5";
				maxCount = 2;
			}else if( (ONLINE_DOC_F >= "1" && ONLINE_DOC_F <= "3")  && ONLINE_DOC_G == "1" ){
				FOR_TYPE = "7";
				maxCount = 3;
			}else if( ONLINE_DOC_F == "1" && ONLINE_DOC_H == "1" ){
				FOR_TYPE = "7";
				maxCount = 3;
			}else if( ONLINE_DOC_F >= "1" && ONLINE_DOC_F <= "3" ){
				FOR_TYPE = "4";
				maxCount = 1;
			}else if( ONLINE_DOC_G == "1" ){
				FOR_TYPE = "3";
				maxCount = 1;
			}else if( ONLINE_DOC_H == "1" ){
				FOR_TYPE = "2";
				maxCount = 1;
			}

			if( FOR_TYPE == "2" || FOR_TYPE == "4" ){
				tryScrp++;
			}

			if( FOR_TYPE == "7" ){
				if( ONLINE_DOC_F_HH < 80000 || 220000 < ONLINE_DOC_F_HH ){
				//if( ONLINE_DOC_F_HH < 80000 || 90000 < ONLINE_DOC_F_HH ){
					FOR_TYPE = "5";
					maxCount = 2;
				}
			}else if( FOR_TYPE == "4" ){
				if( ONLINE_DOC_F_HH < 80000 || 220000 < ONLINE_DOC_F_HH ){
					alert("온라인 서류 제출이 완료되었습니다. \n단, 추가로 홈텍스 스크래핑을 원하실 경우, [온라인 서류 제출]메뉴에서 8~22시에 다시 거래해주세요.");
					var data_list = [
							 { "key" : "view_name", "value" : "loanRenewal4_004" }
						   , { "key" : "title", "value" : "한도조회결과" }
						];

					// renewal4 공통 url 호출
					fnCommon_callUrl( data_list );
					return;
				}
			}
			
			
			//홈텍스가 정의가 안되어 있을 경우
			var for_type_7_f = ONLINE_DOC_F;
			
			// 이수민S 홈택스 오류 파악 목적 수정작업(210112)
			if( for_type_7_f != "1" && for_type_7_f != "2" && for_type_7_f != "3" ){
				if( qna01 == 5 ){
					for_type_7_f="2";
				}else if( qna01 == 6 ){
					for_type_7_f="3";
				}else{
					for_type_7_f="1";
				}	
			}
			
			//alert("FOR_TYPE :" + FOR_TYPE);

			// 본인인증 (인증서) 여부  // 인증서로 본인인증 후 접근한 경우
			if( !fnCommon_isNull(isXecureAuth)  &&  isXecureAuth == "true" ){
				method = "noCertListForScraping";   // 인증서 미호출 스크래핑 *앱에 본인인증시 보관된 인증서를 사용
			}

			var START_DATE1 = "";
			var END_DATE1 = "";
			var START_DATE2 = "";
			var END_DATE2 = "";
			var START_DATE3 = "";
			var END_DATE3 = "";

			// 현재 12월이면
			if( !fnCommon_isNull(this_month)  &&  this_month == "13" ){

				// 1년씩 기간 앞당겨주고
				START_DATE1 = startDate2;
				END_DATE1 = endDate2;
				START_DATE2 = startDate3;
				END_DATE2 = endDate3;

				// 3번째 기간(현재년도설정구간)을 000000 ~ 000000 으로 변경
				START_DATE3 = "000000";
				END_DATE3 = "000000";

			}else{

				// 12월 아니면 기본설정
				START_DATE1 = startDate1;
				END_DATE1 = endDate1;
				START_DATE2 = startDate2;
				END_DATE2 = endDate2;
				START_DATE3 = startDate3;
				END_DATE3 = endDate3;
			}
			

			var tryCount = 0;
			var trySuccess = 0;
			var isNHISSuccess = false;
			var strNHISmsg = "";
			
			$.ajax({
				type: "post",
				url: callURL_noopForMobileWeb,   // 세션 타임 추가
				dataType: "json",
				success: function(json){
					if(json.RESULT_NO == "0000"){
						tryScrp++;
						
						// 이수민S 홈택스 오류 파악 목적 수정작업(210114)
						insertScrtHistAdd("COMMON", "구분값", "00000000", "[20210114 개선] for_type_7_f = ["+ for_type_7_f +"]");
						
						var params = {
								pluginId: "slCert",
								method: method,
								params: {
									"data": {
										"START_DATE": startDateNps,
										"END_DATE": endDateNps,
										"START_DATE1": START_DATE1,
										"END_DATE1": END_DATE1,
										"START_DATE2": START_DATE2,
										"END_DATE2": END_DATE2,
										"START_DATE3": START_DATE3,
										"END_DATE3": END_DATE3,

										"START_YEAR": startYear,
										"END_YEAR": endYear,
										"START_MONTH": startMonth,
										"END_MONTH": endMonth,
										"START_YEARH3": startYearH3,
										"END_YEARH3": endYearH3,
										"HOMETAX_TYPE": for_type_7_f, // ONLINE_DOC_F로변경 
										"RGST_NO": rgstNo, // hometax_rgstNo
										"ADDR_YN":"Y",
										"SSN_YN":"Y",

										"CUST_NM": fnCommon_deleteNull(custNm),
										"BANK_INSP_NO": "SERVER_VALUE",
										"SSN": residNo,
										"title": "건보+국민연금+국세청",
										"REV_ACT_MARK": "2",
										"TIME_OUT": "180000",
										"MAX_COUNT": "2",
										"FOR_TYPE": FOR_TYPE,
										"SUNSHINE_YN": "",   // 햇살론 동의 여부 - 민원24 스크래핑 여부 // 필요없는값임

										// 등록 교부시 필요항목인듯?
										"ORG_ADDR1": "",
										"ORG_ADDR2": "",
										"ADDR": "",
										"ADDR_CD": "",
										"ZIP_CD": "",
										"SEC_MSG": ""
									}
								},
								callBack: function(isOK, json) {
									tryCount++;

									if(json.TYPE != null && json.TYPE != undefined && json.TYPE == "NPS"){

										var NPSlen = json.RESCODE.length/8;
										var NPScode = [];
										for( var i=0 ; i<NPSlen ; i++ ){
											NPScode[i] = json.RESCODE.substring(i*8,(i+1)*8);
										}

										if( NPSlen != 4 ){
											// 기존 방식
											if(json != null && json.result != null && json.result == "true") {
												scrpNPSYn = "Y";
											}else {
												scrpNPSYn = "E";
											}
										}else{
											/*
											1. 로그인
											 - 정상 - Y
											 - 오류 - E
											2. 가입증명서
											 - 정상 - Y
											 - 오류[42110000] - Y
											 - 오류 - E
											3. 연금지급내역_증명서
											 - 정상 - Y
											 - 오류[42110000] - Y
											 - 오류 - E
											4. 연금산정용가입내역확인서
											 - 정상 - Y
											 - 오류[42110000] - Y
											 - 오류 - E
											*/

											// test
											//NPScode[1] = "42110100";
											//alert("★NPS\n★RESCODE["+NPSlen+"]:" + NPScode);

											// 가입증명서/연금지급내역증명서/연금산정용가입내역확인서의 경우 42110000은 정상 처리
											if( NPScode[1] == "42110000" ){ NPScode[1] = "00000000"; }
											if( NPScode[2] == "42110000" ){ NPScode[2] = "00000000"; }
											if( NPScode[3] == "42110000" ){ NPScode[3] = "00000000"; }

											if( NPScode[0] != "00000000" || NPScode[1] != "00000000" || NPScode[2] != "00000000" || NPScode[3] != "00000000" ){
												scrpNPSYn = "E";
											}else {
												scrpNPSYn = "Y";
											}
										}
									} else if(json.TYPE != null && json.TYPE != undefined && json.TYPE == "NHIS"){


										var NHISlen = json.RESCODE.length/8;
										var NHIScode = [];
										for( var i=0 ; i<NHISlen ; i++ ){
											NHIScode[i] = json.RESCODE.substring(i*8,(i+1)*8);
										}
										
										
										insertScrtHistAdd("NHIS", "조회일자", "00000000", START_DATE1 + "_" + START_DATE2 + "_" + START_DATE3);
										insertScrtHistAdd("NHIS", "결과리스트", "00000000", json.RESCODE);

										if( NHISlen != 6 ){
											// 기존 방식
											if(json != null && json.result != null && json.result == "true") {
												scrpNHISYn = "Y";
											}else {
												scrpNHISYn = "E";
											}
										}else{

											/*
											1. 로그인
											 - 정상 - Y
											 - 오류 - E 모든거래취소 (현화면 유지) [모두종료]
											2. 재직사업장_사업자번호
											 - 정상 - Y
											 - 오류[42110000이 아닌오류] - E [모두종료]
											 - 오류[42110000]  - A [모두종료]
											3. 납부확인서 1,2,3
											 - 정상 - Y
											 - 오류[42110000이 아닌오류] - E [모두종료]
											 - 1(당해년도) 42110000 - A [모두종료]
											 - 2,3 모두 42110000 - Y
											4. 자격득식확인서
											 - 정상 - Y
											 - 오류 - E [모두종료]
											*/

											// 납부확인서 전년도/전전년도의 경우 42110000은 정상 처리
											if( NHIScode[3] == "42110000" ){ NHIScode[3] = "00000000"; }
											if( NHIScode[4] == "42110000" ){ NHIScode[4] = "00000000"; }

											if ( NHIScode[0] != "00000000" ){
												scrpNHISYn = "E";
												insertScrtHistAdd("NHIS", "자료전송_[E]종료", "00000000", "");
												//alert(json.message);
												strNHISmsg = json.message;
											}else if( NHIScode[1] == "42110000" || NHIScode[2] == "42110000"){
												scrpNHISYn = "A";
												tryScrp++;
												//alert("온라인 서류 제출이\n완료되었습니다.");
												strNHISmsg = "온라인 서류 제출이\n완료되었습니다.";
												insertScrtHistAdd("NHIS", "자료전송_[A]종료", "00000000", "");
											}else if( NHIScode[1] != "00000000" || NHIScode[2] != "00000000" || NHIScode[3] != "00000000" ||
													  NHIScode[4] != "00000000" || NHIScode[5] != "00000000" ){
												scrpNHISYn = "E";
												insertScrtHistAdd("NHIS", "자료전송_[E]종료", "00000000", "");
												//alert(json.message);
												strNHISmsg = json.message;

											}else {
												scrpNHISYn = "Y";
												insertScrtHistAdd("NHIS", "자료전송_정상", "00000000", "");
												tryScrp++;
											}
										}
									} else if(json.TYPE != null && json.TYPE != undefined && json.TYPE == "HOMETAX"){

										var HOMETAXlen = json.RESCODE.length/8;
										var HOMETAXcode = [];
										for( var i=0 ; i<HOMETAXlen ; i++ ){
											HOMETAXcode[i] = json.RESCODE.substring(i*8,(i+1)*8);
										}

										// test
										//HOMETAXcode[1] = "42110100";
										//alert("★HOME\n★RESCODE["+HOMETAXlen+"]:" + HOMETAXcode);

//										if( HOMETAXlen < 2 ){
//											if(json != null && json.result != null && json.result == "true") {
//												scrpNTSYn = for_type_7_f;
//											}else {
//												if( for_type_7_f == "1" ) scrpNTSYn = "6";
//												else if( for_type_7_f == "2" ) scrpNTSYn = "7";
//												else if( for_type_7_f == "3" ) scrpNTSYn = "8";
//											}
//										}else {
											/*
											홈텍스1,2 동일
											1. 로그인
											 - 정상 - Y
											 - 오류 - E
											2. 소득금액증명
											 - 정상 - Y
											 - 오류[42110000] - Y
											 - 오류 - E
											*/
											if( HOMETAXcode[1] == "42110000" ){ HOMETAXcode[1] = "00000000"; }
											
											// 이수민S 홈택스 관련 추가의 건(210112)
											for( var i=0 ; i<HOMETAXlen ; i++ ){												
												if(HOMETAXcode[i] != "00000000" && HOMETAXcode[i] != "ZZZZZZZZ") {
													if( for_type_7_f == "1" ) scrpNTSYn = "6";
													else if( for_type_7_f == "2" ) scrpNTSYn = "7";
													else if( for_type_7_f == "3" ) scrpNTSYn = "8";
													
													break;
										
												} else {
													scrpNTSYn = for_type_7_f;
												}
											}
											
											// 이수민S 홈택스 오류 파악 목적 수정작업(210114)
											insertScrtHistAdd("COMMON", "HOMETAX 구분값", "00000000", "[20210114 개선] scrpNTSYn = ["+ scrpNTSYn +"]");
//										}
									} else {
										if(json != null && json.message != null) {
											insertScrtHistTimeout("", "", json.message);
										}
									}
									
									if(tryCount == maxCount && strNHISmsg != "") {										
										alert(strNHISmsg);
									}
									if(tryCount == maxCount && tryScrp >= 2) {

										loanRenewal4_002.send3002();

									}
								}
							};
						SDSFrameWork.plugin.execute(params);

					}else{
						alert("장시간 서비스 이용을 하지않아 고객님의 개인정보를 보호하기 위하여 자동으로 본인인증이 취소되었습니다.\n확인을 누르시면 메인화면으로 이동합니다.");
						fnCommon_goHome();
					}
				},
				error: function(data, textStatus, error) {
					alert(error);
					fnCommon_goHome();
				},
				complete: function() {

				}
			});



		},




		/* --------------------------------------------------------------------------------------
			스크래핑 결과 전송
			loanRenewal4_002.send3002
		 -------------------------------------------------------------------------------------- */
		send3002 : function(){

			iajax.clearParam();
			iajax.addParam("PROC_GB", "1");
			iajax.addParam("SEND_MSG", "Y");
			iajax.addParam("SCRP_NHIS", scrpNHISYn);
			iajax.addParam("SCRP_MINWON24", "N");
			iajax.addParam("SCRP_NPS", scrpNPSYn);
			iajax.addParam("SCRP_NTS", scrpNTSYn);

			$.ajax({
				type: "post",
				url: callURL_requestLNC3002_NEW,
				dataType: "json",
				data: iajax.postparam,
				success: function(json) {

					if( scrpNHISYn == "A" ){

						// 대출신청한도조회 화면 호출
						var data_list = [
								 { "key" : "view_name", "value" : "loanRenewal4_004" }
							   , { "key" : "title", "value" : "한도조회결과" }
							   , { "key" : "beforeview", "value" : "loanRenewal4_004" }  // 한도조회 화면에서 오류 발생시 되돌아갈 화면id
							];

						// renewal4 공통 url 호출
						fnCommon_callUrl( data_list );
					}else if(scrpNHISYn != "E"){
						// 스크래핑 요청 당시 성공여부 결과값(NHIS 값만 가지고 판단)

						// 소득입력여부
						var yyIncmAmtYn = json.DATA.YY_INCM_AMT_YN;
						if( !fnCommon_isNull(yyIncmAmtYn)  &&  yyIncmAmtYn == "Y"){

							// 온라인서류제출 메뉴로 접근여부
							if( !fnCommon_isNull(loanRenewal4_014_START_YN)  &&  loanRenewal4_014_START_YN == "Y"){
								alert("온라인서류제출로 정보확인이 불가합니다.");
								fnCommon_goBack();

							}else{
								//var confirm_result = confirm("온라인 서류 제출이 계속 실패하였습니다.\n직장정보를 직접 입력하시겠습니까?");
								var confirm_result = confirm("건강보험납부내역으로 소득 산출이 되지 않았습니다. 직장 정보를 직접 입력하시겠습니까?");
								if(!confirm_result){
									return false;
								}

								// 직장정보 직접입력 화면 이동
								var data_list = [
										 { "key" : "view_name", "value" : "loanRenewal4_003" }
									   , { "key" : "title", "value" : "개인정보입력" }
									];

								// renewal4 공통 url 호출
								fnCommon_callUrl( data_list );
							}

						}else{

							alert("온라인 서류 제출이\n완료되었습니다.");

							// 추정 연소득 금액 조회 // 현직장명 및 건강보험 자격득실 일자, 건강보험 납부확인, 건강보험 자격득실확인 조회
							loanRenewal4_002.fnSearch_yyyyAmt();
						}

					}else{
						// 소득입력여부
						var yyIncmAmtYn = json.DATA.YY_INCM_AMT_YN;
						if( !fnCommon_isNull(yyIncmAmtYn)  &&  yyIncmAmtYn == "N"){

							company_nm = "";
							year_amt = "";
							join_company_day = "";
							_002_pass_yn = "N";

							// 세션에 저장
							loanRenewal4_002.fnSave_1();
						}else {


							var confirm_result = confirm("온라인 서류 제출이 실패하였습니다. 직장정보를 입력하시겠습니까? ");
							if(!confirm_result){
								return false;
							}

							// 국민건강보험공단 오류 & 스킵가능항 오류
							// 대출신청한도조회 화면 호출
							var data_list = [
										 { "key" : "view_name", "value" : "loanRenewal4_003" }
									   , { "key" : "title", "value" : "개인정보입력" }
								];

							// renewal4 공통 url 호출
							fnCommon_callUrl( data_list );
						}
					}

				},
				error: function(data, textStatus, error) {
				},
				complete: function() {
				}
			});
		},

		/* --------------------------------------------------------------------------------------
			스크래핑 요청결과 조회
			loanRenewal4_002.fnScraping_2
		 -------------------------------------------------------------------------------------- */
		fnScraping_2 : function( res ){

			// Y 실행성공 N 미실행 E 실행했지만 오류
			// 건강보험 스크래핑 여부
			var SCRP_NHIS = "Y";

			// callback 에서 사용할 스크래핑 요청 당시 성공여부 결과값
			var res_result_flag = false;

			if( !fnCommon_isNull(res)  &&  !fnCommon_isNull(res.result)  &&  res.result == "true" ){
				res_result_flag = true;
				loanRenewal4_002.fnScraping_3(res_result_flag, SCRP_NHIS);

			}else{

				// 오류메세지 체크해서 에러값 결정
				var message = res.message;
				if( !fnCommon_isNull(message)  &&  message.indexOf("국민건강보험공단") > -1 ){

    				// 2초 후 다시 스크래핑 내역 조회
    				setTimeout(function(){
    					loanRenewal4_002.fnScraping_reSearch(res.message);
    				} , 2000);

				}
			}

		},



		/* --------------------------------------------------------------------------------------
			스크래핑 요청결과 조회
			loanRenewal4_002.fnScraping_2
		 -------------------------------------------------------------------------------------- */
		fnScraping_2_NPS : function( res ){

			// Y 실행성공 N 미실행 E 실행했지만 오류
			// 건강보험 스크래핑 여부
			var SCRP_NPS = "Y";

			// callback 에서 사용할 스크래핑 요청 당시 성공여부 결과값
			var res_result_flag = false;

			if( !fnCommon_isNull(res)  &&  !fnCommon_isNull(res.result)  &&  res.result == "true" ){
				res_result_flag = true;
				loanRenewal4_002.fnScraping_3_NPS(res_result_flag, SCRP_NPS);

			}else{

				// 오류메세지 체크해서 에러값 결정
//				var message = res.message;
				// 20191219
				// 국민연금은 정상이건, 오류이건 메시지가 없음.
				// 만약 메시지가 있을 경우에만 해당 메시지를 설정.
				var message = "";
				if( !fnCommon_isNull(res)  &&  !fnCommon_isNull(res.message)) {
					message = res.message;
				}

				if( !fnCommon_isNull(message)){
					// if( !fnCommon_isNull(message)  &&  message.indexOf("국민건강보험공단") > -1 ){

					// 2초 후 다시 스크래핑 내역 조회
					setTimeout(function(){
						loanRenewal4_002.fnScraping_reSearch_NPS(res.message);
					} , 2000);

				}
			}

		},



		/* --------------------------------------------------------------------------------------
			스크래핑 요청결과 조회
			loanRenewal4_002.fnScraping_3
		 -------------------------------------------------------------------------------------- */
		fnScraping_3 : function(res_result_flag, SCRP_NHIS){

			iajax.clearParam();
			iajax.addParam("PROC_GB", "1");   // 1 한도조회스크래핑 2 온라인서류제출스크래핑
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("SEND_MSG", "Y");
			iajax.addParam("SCRP_NHIS", SCRP_NHIS);
			iajax.addParam("SCRP_NPS", "N"); // 건강보험 전문 전달 시에는 NPS를 'N'으로 설정

			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3002_NEW,  // 한도조회스크래핑
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000") {


		    			// 스크래핑 요청 당시 성공여부 결과값
		    			if(res_result_flag){


			    			// 소득입력여부
				    		var yyIncmAmtYn = json.DATA.YY_INCM_AMT_YN;
							if( !fnCommon_isNull(yyIncmAmtYn)  &&  yyIncmAmtYn == "Y"){

								// 온라인서류제출 메뉴로 접근여부
								if( !fnCommon_isNull(loanRenewal4_014_START_YN)  &&  loanRenewal4_014_START_YN == "Y"){
									alert("온라인서류제출로 정보확인이 불가합니다.");
									fnCommon_goBack();

								}else{
									var confirm_result = confirm("온라인 서류 제출이 계속 실패하였습니다.\n직장정보를 직접 입력하시겠습니까?");
									if(!confirm_result){
										return false;
									}

					    			// 직장정보 직접입력 화면 이동
									var data_list = [
								             { "key" : "view_name", "value" : "loanRenewal4_003" }
								           , { "key" : "title", "value" : "개인정보입력" }
										];

					    			// renewal4 공통 url 호출
					    			fnCommon_callUrl( data_list );
								}

				    		}else{

			    				alert("온라인 서류 제출이\n완료되었습니다.");

	    						// 추정 연소득 금액 조회 // 현직장명 및 건강보험 자격득실 일자, 건강보험 납부확인, 건강보험 자격득실확인 조회
	    						loanRenewal4_002.fnSearch_yyyyAmt();
				    		}

		    			}else{
		    				// 소득입력여부
				    		var yyIncmAmtYn = json.DATA.YY_INCM_AMT_YN;
							if( !fnCommon_isNull(yyIncmAmtYn)  &&  yyIncmAmtYn == "N"){

								company_nm = "";
								year_amt = "";
								join_company_day = "";
								_002_pass_yn = "N";

						    	// 세션에 저장
								loanRenewal4_002.fnSave_1();
							}else{

			    				// 국민건강보험공단 오류 & 스킵가능항 오류
					    		// 대출신청한도조회 화면 호출
								var data_list = [
							             { "key" : "view_name", "value" : "loanRenewal4_004" }
							           , { "key" : "title", "value" : "한도조회결과" }
									];

								// renewal4 공통 url 호출
								fnCommon_callUrl( data_list );
			    			}
		    			}


			    	} else {
			    		var errorMsg = json.RESULT_DESC;
			    		alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					alert(error);
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {

					// 로딩 종료
					// fnCommon_hideMask();
		        }
			});
		},


		/* --------------------------------------------------------------------------------------
			스크래핑 요청결과 조회 - 국민연금
			국민연금 스크래핑은 화면 제어를 하지 않는 관계로 스크래핑 내역만 저장
			loanRenewal4_002.fnScraping_3
		 -------------------------------------------------------------------------------------- */
		fnScraping_3_NPS : function(res_result_flag, SCRP_NPS){

			iajax.clearParam();
			iajax.addParam("PROC_GB", "1");   // 1 한도조회스크래핑 2 온라인서류제출스크래핑
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("SEND_MSG", "Y");
			iajax.addParam("SCRP_NHIS", "N"); // 국민연금 스크래핑시에는 건강보험을 'N'으로 설정
			iajax.addParam("SCRP_NPS", SCRP_NPS);

			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3002_NEW,  // 한도조회스크래핑
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	/*
			    	if(json.RESULT_NO == "0000") {


		    			// 스크래핑 요청 당시 성공여부 결과값
		    			if(res_result_flag){


			    			// 소득입력여부
				    		var yyIncmAmtYn = json.DATA.YY_INCM_AMT_YN;
							if( !fnCommon_isNull(yyIncmAmtYn)  &&  yyIncmAmtYn == "Y"){

								// 온라인서류제출 메뉴로 접근여부
								if( !fnCommon_isNull(loanRenewal4_014_START_YN)  &&  loanRenewal4_014_START_YN == "Y"){
									// alert("온라인서류제출로 정보확인이 불가합니다.");
									// fnCommon_goBack();

								}else{
									//var confirm_result = confirm("온라인서류제출로 정보확인이 불가합니다. 직접입력화면으로 이동하시겠습니까?");
									//if(!confirm_result){
										//return false;
									//}

					    			// 직장정보 직접입력 화면 이동
									//var data_list = [
								       //      { "key" : "view_name", "value" : "loanRenewal4_003" }
								        //   , { "key" : "title", "value" : "개인정보입력" }
										//];

					    			// renewal4 공통 url 호출
					    			// fnCommon_callUrl( data_list );
								}

				    		}else{

			    				alert("온라인 서류 제출이\n완료되었습니다.");

	    						// 추정 연소득 금액 조회 // 현직장명 및 건강보험 자격득실 일자, 건강보험 납부확인, 건강보험 자격득실확인 조회
	    						loanRenewal4_002.fnSearch_yyyyAmt();
				    		}

		    			}else{
		    				// 소득입력여부
				    		var yyIncmAmtYn = json.DATA.YY_INCM_AMT_YN;
							if( !fnCommon_isNull(yyIncmAmtYn)  &&  yyIncmAmtYn == "N"){

								company_nm = "";
								year_amt = "";
								join_company_day = "";
								_002_pass_yn = "N";

						    	// 세션에 저장
								loanRenewal4_002.fnSave_1();
							}else{

			    				// 국민건강보험공단 오류 & 스킵가능항 오류
					    		// 대출신청한도조회 화면 호출
								var data_list = [
							             { "key" : "view_name", "value" : "loanRenewal4_004" }
							           , { "key" : "title", "value" : "한도조회결과" }
									];

								// renewal4 공통 url 호출
								fnCommon_callUrl( data_list );
			    			}
		    			}


			    	} else {
			    		var errorMsg = json.RESULT_DESC;
			    		alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    	*/
			    },
				error: function(data, textStatus, error) {
					//alert(error);
					//console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {

					// 로딩 종료
					// fnCommon_hideMask();
		        }
			});
		},


		/* --------------------------------------------------------------------------------------
			재조회 요청하시겠습니까? 예
			loanRenewal4_002.fnScraping_2_callback_y
		 -------------------------------------------------------------------------------------- */
		fnScraping_2_callback_y : function(){

			// 스크래핑 요청
			loanRenewal4_002.fnScraping_1();
		},



		/* --------------------------------------------------------------------------------------
			재조회 요청하시겠습니까? 아니오
			loanRenewal4_002.fnScraping_2_callback_n
		 -------------------------------------------------------------------------------------- */
		fnScraping_2_callback_n : function(){
			fnCommon_goHome();
		},



		/* --------------------------------------------------------------------------------------
			다시 스크래핑 내역 조회
			loanRenewal4_002.fnScraping_reSearch
		 -------------------------------------------------------------------------------------- */
		fnScraping_reSearch : function( msg ){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("SCRT_NM", "NHIS");  // 국민건강보험공단

			$.ajax({
				type: "post",
				url: callURL_getScrtResCd,
				dataType: "json",
				data: iajax.postparam,
				success: function(json){

					// 정상
					if(json.DATA.ANS_PROC == '0'){

						loanRenewal4_002.fnScraping_3(true, "Y");

					}else if(json.DATA.ANS_PROC == '1'){
						if (json.DATA.JOB_NM == '로그인'){
							alert(msg.split("<br/>").join("\n"));
							fnCommon_goBack();  // 뒤로가기 처리

						}else{
							loanRenewal4_002.fnScraping_3(false, "E");
						}

					}else{
						alert(msg.split("<br/>").join("\n"));
						fnCommon_goBack();  // 뒤로가기 처리
					}
				},
				error: function(data, textStatus, error) {
				},
				complete: function() {
				}
			});

		},



		/* --------------------------------------------------------------------------------------
			다시 스크래핑 내역 조회 - 국민연금용
			loanRenewal4_002.fnScraping_reSearch
		 -------------------------------------------------------------------------------------- */
		fnScraping_reSearch_NPS : function( msg ){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("SCRT_NM", "NPS");  // 국민건강보험공단

			$.ajax({
				type: "post",
				url: callURL_getScrtResCd,
				dataType: "json",
				data: iajax.postparam,
				success: function(json){

					// 정상
					if(json.DATA.ANS_PROC == '0'){

						loanRenewal4_002.fnScraping_3_NPS(true, "Y");

					}else if(json.DATA.ANS_PROC == '1'){
						if (json.DATA.JOB_NM == '로그인'){
							// alert(msg.split("<br/>").join("\n"));
							// fnCommon_goBack();  // 뒤로가기 처리

						}else{
							loanRenewal4_002.fnScraping_3_NPS(false, "E");
						}

					}else{
						// alert(msg.split("<br/>").join("\n"));
						// fnCommon_goBack();  // 뒤로가기 처리
					}
				},
				error: function(data, textStatus, error) {
				},
				complete: function() {
				}
			});

		},


		/* --------------------------------------------------------------------------------------
			스크래핑 타임아웃 처리
			loanRenewal4_002.fnScraping_timeout
		 -------------------------------------------------------------------------------------- */
		fnScraping_timeout : function( scrp_nm, job_nm, msg ){
			var timeout_msg = "통신이 원활하지 않습니다.";
			if (msg != timeout_msg) {
				return;
			}

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("SCRT_NM", fnCommon_deleteNull(scrp_nm));
			iajax.addParam("JOB_NM", job_nm);
			iajax.addParam("RES_MSG", msg);

			$.ajax({
			    type: "post",
			    url: callURL_insertScrtHistTimeout,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    },
		    	error: function(data, textStatus, error) {
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			추정 연소득 금액 조회 // 현직장명 및 건강보험 자격득실 일자, 건강보험 납부확인, 건강보험 자격득실확인 조회
			loanRenewal4_002.fnSearch_yyyyAmt
		 -------------------------------------------------------------------------------------- */
		fnSearch_yyyyAmt : function(){
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);

			$.ajax({
			    type: "post",
			    url: callURL_selectNHIS,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"  &&  !fnCommon_isNull(json.DATA) ){

			    		// 직장명 및 건강보험 자격득실 일자
			    		var startDate = json.DATA.C_START_DATE;   // 시작일자
			    		var comName = json.DATA.C_COM_NAME;   // 직장명
			    		var companyCount = Number(json.DATA.COM_COUNT);   // 직장명 갯수

			    		var yyIncmAmt = json.DATA.YY_INCM_AMT;  // 없는항목 --> 연소득금액인듯?
			    		var cPaymentDate = json.DATA.C_PAYMENT_DATE;  // 없는항목 --> 컬럼명으로 보아 납입일인듯?

			    		// 건강보험 납부확인
			    		var paymentCount = Number(json.DATA.PAYMENT_COUNT);   // 납부횟수

			    		// 건강보험 자격득실확인
			    		var certCount = Number(json.DATA.CERT_COUNT);   // 자격득실확인횟수

				    	if( fnCommon_isNull(cPaymentDate) ){
			    			yyIncmAmt = "0";

			    		}else if( fnCommon_isNull(comName) ){
			    			yyIncmAmt = "0";
			    		}

				    	// 직장정보 직접입력 화면 이동 여부
				    	var loanRenewal4_003_move_flag = false;

				    	// 건강보험 납부횟수 있는데
			    		if(paymentCount > 0){

			    			// 직장명이나 자격득실 내용이 없으면
					    	if( fnCommon_isNull(companyCount)  ||  fnCommon_isNull(certCount) ){

					    		// 직장정보 직접입력 화면 이동
					    		loanRenewal4_003_move_flag = true;
			    			}
			    		}

			    		// 직장명 있는데
			    		if(companyCount > 0) {

			    			// 자격득실 내용이 없으면
			    			if(fnCommon_isNull(certCount)) {

					    		// 직장정보 직접입력 화면 이동
					    		loanRenewal4_003_move_flag = true;
			    			}
			    		}

				    	if(loanRenewal4_003_move_flag){

							// 온라인서류제출 메뉴로 접근여부
							if( !fnCommon_isNull(loanRenewal4_014_START_YN)  &&  loanRenewal4_014_START_YN == "Y"){
								alert("온라인 서류 제출 납입내역이 일치하지않습니다.");
								fnCommon_goBack();

							}else{
								// var confirm_result = confirm("온라인 서류 제출 납입내역이 일치하지않습니다.\n소득정보를 직접 입력하시겠습니까?");
								var confirm_result = confirm("온라인 서류 제출이 실패되어 소득 산출이 되지 않았습니다. 직장 정보를 직접 입력하시겠습니까?");
								if(!confirm_result){
									return false;
								}

				    			// 직장정보 직접입력 화면 이동
								var data_list = [
							             { "key" : "view_name", "value" : "loanRenewal4_003" }
							           , { "key" : "title", "value" : "개인정보입력" }
									];

				    			// renewal4 공통 url 호출
				    			fnCommon_callUrl( data_list );
							}

				    	}else{

					    	// 직장명 길이제한 40 byte 제한
							// byte 제한만큼 잘라내기
							comName = fnCommon_cutByte(40, comName);

					    	// 조회한 소득정보 세션에 저장
					    	company_nm = comName;   // 직장명
					    	year_amt = yyIncmAmt;  // 연소득금액
					    	join_company_day = startDate;  // 건강보험 자격득실 시작일자(입사일자)

					    	// 세션에 저장
							loanRenewal4_002.fnSave_1();
				    	}

			    	}else{
			    		alert("온라인 서류 제출 조회시스템 오류입니다.");
			    	}
			    },
				error: function(data, textStatus, error) {
					alert(error);
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {

					// 로딩 종료
					// fnCommon_hideMask();
		        }
			});
		},



		/* --------------------------------------------------------------------------------------
			세션에 저장
			loanRenewal4_002.fnSave_1
		 -------------------------------------------------------------------------------------- */
		fnSave_1 : function(){
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("company_nm", company_nm);  // 직장명
			iajax.addParam("year_amt", year_amt);  // 연소득금액
			iajax.addParam("join_company_day", join_company_day);  // 건강보험 자격득실 시작일자(입사일자)
			iajax.addParam("SCRP_NHIS_SUCCESS_YN", "Y");  // 스크래핑 성공여부값 생성
			iajax.addParam("SCRAP_CERT_PASS_YN", "Y");  // 인증서로 스크래핑 한 경우 세션이 살아있는한 스크래핑 이용시 인증서 재입력 PASS

			if( !fnCommon_isNull(_002_pass_yn) && "N" == _002_pass_yn){
				iajax.addParam("SCRAP_CERT_PASS_YN", "N");
			}

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_003_02,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"){

						// 온라인서류제출 메뉴로 접근여부
						if( !fnCommon_isNull(loanRenewal4_014_START_YN)  &&  loanRenewal4_014_START_YN == "Y"){
							fnCommon_goBack();

						}else{
				    		// 대출신청한도조회 화면 호출
							var data_list = [
						             { "key" : "view_name", "value" : "loanRenewal4_004" }
						           , { "key" : "title", "value" : "한도조회결과" }
						           , { "key" : "beforeview", "value" : "loanRenewal4_002" }  // 한도조회 화면에서 오류 발생시 되돌아갈 화면id
								];

							// renewal4 공통 url 호출
							fnCommon_callUrl( data_list );
						}

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
		    	error: function(data, textStatus, error) {
				},
				complete: function() {
				}
			});
		}

	};   // var loanRenewal4_002 = {







	/* --------------------------------------------------------------------------------------
		직장정보 직접입력 화면
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_003 = {

			/* --------------------------------------------------------------------------------------
				기본수행
				loanRenewal4_003.fnInit
			 -------------------------------------------------------------------------------------- */
			fnInit : function(){

				// 직장명 변경 이벤트
				// $("#company_nm").on("keyup", loanRenewal4_003.fnKeyup_company_nm );

				// 연소득 변경 이벤트
				$("#year_amt").on("keyup", loanRenewal4_003.fnKeyup_year_amt );

				// 입사일자 변경 이벤트
				$("#join_company_day").on("keyup", loanRenewal4_003.fnKeyup_join_company_day );


				// 고객 선택정보 조회
				loanRenewal4_003.fnSearch_1();
			},



			/* --------------------------------------------------------------------------------------
				연소득 입력란 입력이벤트
				loanRenewal4_003.fnKeyup_inputAmt
			 -------------------------------------------------------------------------------------- */
			fnKeyup_inputAmt : function(e){

				// 만원영역 혹시 모르니까 초기화 처리 먼저
				$("#input_manwon").parent().hide();
				$("#input_manwon").html("");

				var id = e.target.id;
				var value = $("#" + id).val();

				if( !fnCommon_isNull(value) ){

					// 문자열 제거 후 숫자만 반환
					value = fnCommon_getOnlyNumber(value);
					var value_number = Number(value);
					if(value_number > 0){

						/*
						// max값 제한
						if(value_number > 9999999999){
							value = value.substring(0, value.length-1);
							value_number = Number(value);
						}
						*/

						// 콤마찍기
						var value_format = fnCommon_addComma(value);
						$("#" + id).val( value_format );

						if(value_number > 10000){
							value_number = parseInt( value_number/10000 );   // 만원단위 이하 절사
							if(value_number > 0){
								value = String(value_number);

								// 콤마찍기
								value_format = fnCommon_addComma(value);

								// 이 영역은 한개씩밖에 존재하지 않으니까
								$("#input_manwon").parent().show();
								$("#input_manwon").html(value_format);
							}
						}
					}
				}
			},



			/* --------------------------------------------------------------------------------------
				고객 선택정보 조회
				loanRenewal4_003.fnSearch_1
			 -------------------------------------------------------------------------------------- */
			fnSearch_1 : function(){

				iajax.clearParam();

				$.ajax({
				    type: "post",
				    url: callURL_loanRenewal4_003_01,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json) {
				    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"){
				    		qna01 = json.qna01;
				    		qna02 = json.qna02;
				    		qna03 = json.qna03;

				    		SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;

							// 직장정보 직접입력값 // beforeview 값을 통해 되돌아왔을 가능성이 있으니 기존입력값 있으면 다시 설정해주기
				    		$("#company_nm").val( json.company_nm );   // 직장명
				    		$("#year_amt").val( json.year_amt );   // 연소득
				    		$("#join_company_day").val( json.join_company_day );   // 입사일자

				    		// 이벤트 강제발생시켜서 포맷 맞추기
				    		// 연소득 입력란 입력이벤트
							loanRenewal4_003.fnKeyup_inputAmt( {target:{id:"year_amt"}} );

							// 입사일자 변경 이벤트
							loanRenewal4_003.fnKeyup_join_company_day( {target:{value:json.join_company_day}} );


				    		// 선택한 직업에 따른 문구 변경
				    		// 직업 1 직장인(4대보험가입) 2 개인사업자 3 기타사업소득자인적용역제공자 4 연금소득자
					    	if( !fnCommon_isNull(qna01) ){

					    		var company_nm_dt = "";
					    		var join_company_day_dt = "";

					    		// 1 직장인(4대보험가입)
					    		if(qna01 == "1"){
					    			company_nm_dt = "직장명";
					    			join_company_day_dt = "입사일자";
					    			$("#join_company_day_comment").html("3개월이상 재직시 신청 가능");  // 입사일자 안내
					    			$("#join_company_day_comment_dl").show();

				    			// 2 개인사업자
					    		}else if(qna01 == "2"){
					    			company_nm_dt = "사업자명";
					    			join_company_day_dt = "사업개시일";
					    			$("#year_amt_dt").html("종합소득세금액");
					    			$("#year_amt_comment").html("종합소득세 소득금액증명원상 소득금액");
					    			$("#year_amt_dt_dl").show();

									// 사업자명 클릭 이벤트
									$("#company_nm").on("click", fnPopBusn );
									$("#company_nm_a").on("click", fnPopBusn );

				    			// 3 기타사업소득자인적용역제공자
					    		}else if(qna01 == "3"){
					    			company_nm_dt = "사업자명";
					    			join_company_day_dt = "입사일자";

									// 사업자명 클릭 이벤트
									$("#company_nm").on("click", fnPopBusn );
									$("#company_nm_a").on("click", fnPopBusn );

				    			// 4 연금소득자
					    		}else if(qna01 == "4"){
					    			company_nm_dt = "연금소득형태";
					    			join_company_day_dt = "연금수령개시일";
					    			$("#join_company_day_comment").html("1회이상 연금 수령시 신청 가능");  // 연금수령개시일 안내
					    			$("#join_company_day_comment_dl").show();

					    			// 직장명 직접입력 영역 미사용
					    			$("#company_nm_dd_1").hide();

					    			// 연금형태 콤보박스 사용
					    			$("#company_nm_dd_2").show();
					    		// 8 주부  9 무직
					    		}else if(qna01 == "8" || qna01 == "9"){
					    			// 직장명, 입사일자 직접입력 영역 미사용 - 연소득만 입력
					    			$("#company_nm_dt").hide();
					    			$("#company_nm_dd_1").hide();
					    			$("#join_company_day_dl").hide();
					    			//$("#join_company_day").hide();
					    			//$("#join_company_day_delete_p").hide();
					    			//$("#join_company_day_comment").hide();
					    		}
					    		
					    		//직장명/입사일자 처리
					    		if (qna01 == "1" || qna01 == "2" || qna01 == "3" || qna01 == "4")
					    		{
					    			$("#company_nm_dt").html( company_nm_dt );
					    			$("#join_company_day_dt").html( join_company_day_dt );
					    		}

				    			// 1 직장인(4대보험가입) 일때만 스크래핑 가능
				    			if(qna01 == "1"){

							    	// 건보스크래핑장애여부 장애 아니면 온라인서류제출 이동 가능
							    	if( fnCommon_isNull(SCRP_NHIS_ERROR_YN)  ||  SCRP_NHIS_ERROR_YN != "Y" ){

										// 앱여부 // 앱일때만 스크래핑 화면 이동 버튼 노출
										var isApp_flag = fnCommon_isApp();
										if( isApp_flag ){
											$("#btn_moveScrap").show();
										}
							    	}
				    			}
					    	}

							// 공통코드 콤보 생성
							fnCommon_combo_commcodelist( json.commcodelist_75048, "pensionCombo", "Y" );   // 연금형태
						}
				    },
					error: function(data, textStatus, error){
						alert(error);
						console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function(){
			        }
				});
			},



			/* --------------------------------------------------------------------------------------
				온라인서류제출(스크래핑) - 한도조회 화면 호출
				loanRenewal4_003.fnMovePage_scraping
			 -------------------------------------------------------------------------------------- */
			fnMovePage_scraping : function(){

				// 앱여부 // 앱일때만 스크래핑 화면 이동
				var isApp_flag = fnCommon_isApp();
				if( !isApp_flag ){
					alert("온라인서류제출(스크래핑)은 app 접속시에만 가능합니다.");
					return false;
				}

	    		var data_list = [
		                 { "key" : "view_name", "value" : "loanRenewal4_002" }
		                 , { "key" : "title", "value" : "개인정보입력" }
	                 ];

	    		// renewal4 공통 url 호출
	    		fnCommon_callUrl( data_list );
			},



			/* --------------------------------------------------------------------------------------
				유효성 체크
				loanRenewal4_003.fnSearch_limit_validation
			 -------------------------------------------------------------------------------------- */
			fnSearch_limit_validation : function(){

				var company_nm = $("#company_nm").val();   // 직장명
				var year_amt = $("#year_amt").val();   // 연소득
				var join_company_day = $("#join_company_day").val();   // 입사일자

				// 문자열 제거 후 숫자만 반환
				year_amt = fnCommon_getOnlyNumber(year_amt);
				join_company_day = fnCommon_getOnlyNumber(join_company_day);

				var year_amt_number = Number(year_amt);
				
				if( year_amt_number > 0 && year_amt_number < 10000 ){
					var confirm_result3 = confirm("입력하신 연소득이 "+year_amt_number+"원이 맞습니까?");
					if(!confirm_result3){
						return false;
					}
				}

				// 직업이 어떻게 되십니까?
		    	if( fnCommon_isNull(qna01) ){
					alert("선택된 직업정보가 없습니다.");
    				return false;

		    	}else{

		    		// 연금소득자
		    		if( qna01 == "4"){
		    			if( fnCommon_isNull(year_amt_number)){
		    				alert("연소득을 입력해주세요.");
		    				$("#year_amt").focus();
		    				return false;
		    			}
		    			if(year_amt_number < 6000000){
							/* 참신한500 추가에 따른 수정
							alert("연소득 금액은 최소 600만원 이상인\n경우에만 진행이 가능합니다.");
		    				$("#year_amt").focus();
		    				return false;
							*/
		    			}

		    			// 연금형태
		    			var pensionCombo = $("#pensionCombo").val();
		    			if( fnCommon_isNull(pensionCombo)){
		    				alert("연금형태를 선택해주세요.");
		    				$("#pensionCombo").focus();
		    				return false;
		    			}
					// 8 주부 9 무직
		    		}else if (qna01 == "8" || qna01 == "9") {
		    			//체크없음
		    			
		    		}else{
		    			if( fnCommon_isNull(company_nm)){
		    				alert("직장명(사업자명)을 입력해주세요.");
		    				$("#company_nm").focus();
		    				return false;
		    			}
						
		    			if( fnCommon_isNull(year_amt_number)){
		    				alert("연소득을 입력해주세요.");
		    				$("#year_amt").focus();
		    				return false;
		    			}

		    			// 1 직장인(4대보험가입)
			    		if( qna01 == "1"  &&  year_amt_number < 1000000){
							
							alert("연소득 금액은 최소 100만원 이상인\n경우에만 진행이 가능합니다.");
		    				$("#year_amt").focus();
		    				return false;
						
	    				// 2 개인사업자
			    		}else if( qna01 == "2"  &&  year_amt_number < 6000000){
							/* 참신한500 추가에 따른 수정
							alert("연소득 금액은 최소 600만원 이상인\n경우에만 진행이 가능합니다.");
		    				$("#year_amt").focus();
		    				return false;
							*/

	    				// 3 기타사업소득자인적용역제공자
			    		}else if( qna01 == "3"  &&  year_amt_number < 10000000){
							/* 참신한500 추가에 따른 수정
							alert("연소득 금액은 최소 1,000만원 이상인\n경우에만 진행이 가능합니다.");
		    				$("#year_amt").focus();
		    				return false;
							*/
			    		}
		    		}

					// 입사일자 필수( 8 주부 9 무직 제외 )
		    		if(qna01 != "8" && qna01 != "9" ) {
		    			
				    	if( fnCommon_isNull(join_company_day)  ||  fnCommon_isNull(join_company_day.length)  ||  join_company_day.length != 8 ){
			    			var join_company_day_dt = $("#join_company_day_dt").html();
							alert( join_company_day_dt + "를 입력해주세요.");
		    				return false;
				    	}
	
						// 오늘일자
						var today = new Date();
						var yyyy = today.getFullYear();
						var mm = today.getMonth() + 1;
						var dd = today.getDate();
	
						if(mm < 10){
							mm = "0" + mm;
						}
						if(dd < 10){
							dd = "0" + dd;
						}
	
						var currentDay = Number(yyyy + "" + mm + "" + dd);
						var join_company_day_number = Number(join_company_day);
	
						// 오늘일자보다 미래이면 진행불가
						if(currentDay < join_company_day_number){
			    			var join_company_day_dt = $("#join_company_day_dt").html();
							alert( join_company_day_dt + "를 확인해주세요.");
		    				return false;
						}
						
						var input_mm = (join_company_day_number%10000)/100;
						var input_dd = (join_company_day_number%100);
						if( input_mm >= 13 || input_mm < 1 ){
							var join_company_day_dt = $("#join_company_day_dt").html();
							alert( join_company_day_dt + "를 확인해주세요.");
							return false;
						}
						
						if( input_dd >= 32 || input_dd <= 0 ){
							var join_company_day_dt = $("#join_company_day_dt").html();
							alert( join_company_day_dt + "를 확인해주세요.");
							return false;
						}
		    		}
		    	}

			   return true;
			},



			/* --------------------------------------------------------------------------------------
				한도조회 클릭 - 직장정보 직접입력값 세션보관
				loanRenewal4_003.fnSave_1
			 -------------------------------------------------------------------------------------- */
			fnSave_1 : function(){

				// 유효성 체크
				var result = loanRenewal4_003.fnSearch_limit_validation();
				if(!result){
					return false;
				}

				// 직장명
				var company_nm = $("#company_nm").val();

	    		// 직업 4 연금소득자
		    	if( !fnCommon_isNull(qna01)  &&  qna01 == "4" ){

	    			// 연금형태
	    			company_nm = $("#pensionCombo").val();
		    	}

				// 연소득
				var year_amt = $("#year_amt").val();

				// 입사일자
				var join_company_day = $("#join_company_day").val();

				// 문자열 제거 후 숫자만 반환
				year_amt = fnCommon_getOnlyNumber(year_amt);
				join_company_day = fnCommon_getOnlyNumber(join_company_day);

				var month_3 = fnCommon_getDay_addMonth(-3);
				month_3 = fnCommon_getOnlyNumber(month_3);
				var jjj = $("#company_nm_dt").html();

				if( jjj == "직장명" && month_3 <= join_company_day ){
					alert("재직기간 3개월 이상 시 신청 가능합니다. 재직기간 충족 후 신청 부탁드립니다.");
					return;
				}

				iajax.clearParam();
				iajax.addParam("CHK_CSRF", random);
				iajax.addParam("company_nm", fnCommon_deleteNull(company_nm));
				iajax.addParam("company_no", $("#company_no").val()); // 사업자번호 202006 추가
				iajax.addParam("year_amt", year_amt);
				iajax.addParam("join_company_day", join_company_day);

				// 건보 스크래핑 성공유무(소득산정 상관없이...)
				//if( !fnCommon_isNull(_002_pass_yn) && "N" == _002_pass_yn){
				//	iajax.addParam("SCRAP_CERT_PASS_YN", "Y");
				//}

				$.ajax({
				    type: "post",
				    url: callURL_loanRenewal4_003_02,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
				    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"){

				    		// 5065  정보입력 - 소득입력
				    		try{
				    			Emf.convCall(797, 5065, 0, 0, 0);
				    		}catch (err) { }
				    		setTimeout(function(){
								// 대출신청한도조회 화면 호출
								var data_list = [
							             { "key" : "view_name", "value" : "loanRenewal4_004" }
							           , { "key" : "title", "value" : "한도조회결과" }
							           , { "key" : "beforeview", "value" : "loanRenewal4_003" }  // 한도조회 화면에서 오류 발생시 되돌아갈 화면id
									];

								// renewal4 공통 url 호출
								fnCommon_callUrl( data_list );
				    		},100);

/*							// 대출신청한도조회 화면 호출
							var data_list = [
						             { "key" : "view_name", "value" : "loanRenewal4_004" }
						           , { "key" : "title", "value" : "한도조회결과" }
						           , { "key" : "beforeview", "value" : "loanRenewal4_003" }  // 한도조회 화면에서 오류 발생시 되돌아갈 화면id
								];

							// renewal4 공통 url 호출
							fnCommon_callUrl( data_list );*/

				    	}else{
				    		alert("직접입력값 저장에 실패하였습니다.");
				    	}
					},
					error: function(data, textStatus, error){
						console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function() {
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				직장명 변경 이벤트
				loanRenewal4_003.fnKeyup_company_nm
			 -------------------------------------------------------------------------------------- */
			fnKeyup_company_nm : function( type ){

				// X 클릭
				if( !fnCommon_isNull(type)  &&  type == "delete" ){
					$("#company_nm").val("");
					$("#company_nm").focus();  // 키패드가 사라지면 싫으니까
				}

				// 값 있으면 삭제버튼 보이게
				var company_nm = $("#company_nm").val();

		    	// 직장명 길이제한 40 byte 제한
				// byte 제한만큼 잘라내기
				company_nm = fnCommon_cutByte(40, company_nm);

				if( !fnCommon_isNull(company_nm) ){
					$("#company_nm").val(company_nm);
					$("#company_nm_delete_p").show();
				}else{
					$("#company_nm_delete_p").hide();
				}
			},



			/* --------------------------------------------------------------------------------------
				연소득 변경 이벤트
				loanRenewal4_003.fnKeyup_year_amt
			 -------------------------------------------------------------------------------------- */
			fnKeyup_year_amt : function( type ){

				// X 클릭
				if( !fnCommon_isNull(type)  &&  type == "delete" ){

					// 만원영역 초기화
					$("#input_manwon").parent().hide();
					$("#input_manwon").html("");

					$("#year_amt").val("");
					$("#year_amt").focus();  // 키패드가 사라지면 싫으니까
				}

				// 값 없으면 삭제버튼 숨기기
				var year_amt = $("#year_amt").val();
				if( fnCommon_isNull(year_amt) ){
					$("#year_amt_delete_p").hide();

				// 값 있으면
				}else{
					$("#year_amt_delete_p").show();  // 삭제버튼 보이기

					// 콤마찍기
					var year_amt_format = fnCommon_addComma(year_amt);

					// 생성된 포맷으로 설정
					$("#year_amt").val( year_amt_format );
				}
			},



			/* --------------------------------------------------------------------------------------
				입사일자 변경 이벤트
				loanRenewal4_003.fnKeyup_join_company_day
			 -------------------------------------------------------------------------------------- */
			fnKeyup_join_company_day : function( e, type ){

				// X 클릭
				if( !fnCommon_isNull(type)  &&  type == "delete" ){
					$("#join_company_day").val("");
					$("#join_company_day").focus();  // 키패드가 사라지면 싫으니까
				}

				// 값 있으면 삭제버튼 보이게
				var join_company_day = $("#join_company_day").val();
				if( !fnCommon_isNull(join_company_day) ){
					$("#join_company_day_delete_p").show();
				}else{
					$("#join_company_day_delete_p").hide();
				}

				// 포맷 맞추기
				var value = e.target.value;

				// 문자열 제거 후 숫자만 반환
				value = fnCommon_getOnlyNumber(value);

				// 필드에 재설정될 값
				var value_format = value;

				if( !fnCommon_isNull(value)  &&  value.length > 0 ){
					if(value.length > 4){

						// 앞자리 잘라내기
						value_format = value.substring(0, 4);
						value = value.substring(4, value.length);

						// 아직도 두자리 이상이면
						if(value.length > 2){

							// 중간자리 잘라내기
							value_format += "-" + value.substring(0, 2);
							value = value.substring(2, value.length);

							// 아직도 두자리 이상이면 중간자리로 한자리 더 넘기기
							if(value.length > 2){
								value_format += value.substring(0, 1);
								value = value.substring(1, value.length);
							}
						}

						// 남은 뒷자리가 있으면 이것도 붙이기
						if( !fnCommon_isNull(value) ){
							value_format += "-" + value;
						}
					}
				}

				// 필드에 설정
				$("#join_company_day").val(value_format);
			}



	};   // var loanRenewal4_003 = {








	/* --------------------------------------------------------------------------------------
		대출신청한도조회 화면 호출
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_004 = {

		/* --------------------------------------------------------------------------------------
			기본수행
			loanRenewal4_004.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// 전화모양 이화면에서는 없애기 // 화면이용에 불편
			$(".ddaragagi").hide();

			/*
			// test 테스트
			// 자동대출 갯수
			$("#LNC3003_list_1").html("<div class='inquire_title' style='text-align: center;'>자동대출 중 이용가능한 상품이 없습니다.</div>");

			// 전화대출 갯수
			$("#LNC3003_list_2").html("<div class='inquire_title' style='text-align: center;'>전화대출 중 이용가능한 상품이 없습니다.</div>");
			*/

			// 대출한도조회 신청 - 직장인최적상품신청
			loanRenewal4_004.fnSearch_2();
		},



		/* --------------------------------------------------------------------------------------
			대출한도조회 신청 - 직장인최적상품신청
			loanRenewal4_004.fnSearch_2
		 -------------------------------------------------------------------------------------- */
		fnSearch_2 : function(){

			// 리스트 초기화
			$("#LNC3003_list_1").html("");
			$("#LNC3003_list_2").html("");

    		// 앱 여부
    		var isApp_flag = fnCommon_isApp();
    		var isApp = "N";
			if(!fnCommon_isNull(isApp_flag, "boolean")){
				isApp = "Y";
    		}

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("isApp", isApp);

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			// 대출한도 조회 중입니다 // 이미지 삽입
			$(".ajax-loading-area").css({'width':'210px','height':'100px','margin-left':'-105px','margin-top':'-50px'});
			$(".ajax-loading-icon").css({'background-image':'url("/resources/img/loading_02.gif")','background-size':'210px 100px','width':'210px','height':'100px'});

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_004_03,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_GB)  &&  json.RESULT_GB == "E" && json.RES_MSG.match("입사일자") ){

						// 202007 임시처리 입사일자 오류인 경우 직접입력하는 화면으로 이동
						var data_list = [
								 { "key" : "view_name", "value" : "loanRenewal4_003" }
							   , { "key" : "title", "value" : "개인정보입력" }
							];

						// renewal4 공통 url 호출
						fnCommon_callUrl( data_list );

					// 처리상태로 오류구분요청 반영
					}else if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_GB)  &&  json.RESULT_GB == "E"){

						// 메세지 팝업
			    		var msg = "<p>" + json.RES_MSG + "</p>";
			    		msg += "<p>다시 조회하시겠습니까? 아니오를 누르신 경우 홈으로 이동됩니다.</p>";

			    		var no_button_flag = true;  // 아니오 버튼 노출 여부
			    		var fnCallback_yes = loanRenewal4_004.fnSearch_2_callback_y;  // 확인 버튼에 함수 지정
			    		var fnCallback_no = loanRenewal4_004.fnSearch_2_callback_n;  // 아니오 버튼에 함수 지정

						fnCommon_popup("open", msg, no_button_flag, fnCallback_yes, fnCallback_no);
						return false;

			    		/*
			    		// 호출당시 시점에서 오류발생시 되돌아갈 화면id 정보
				    	if( !fnCommon_isNull(beforeview)){
							var data_list = [
			    		             { "key" : "view_name", "value" : beforeview }
			    		           , { "key" : "title", "value" : "개인정보입력" }
			                    ];

			    			// renewal4 공통 url 호출
			    			fnCommon_callUrl( data_list );

				    	}else{
				    		fnCommon_goHome();
				    	}
				    	*/

			    	}else{

				    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"){
				    		SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;  // 건강보험장애여부
				    		SCRP_MINWON24_ERROR_YN = json.SCRP_MINWON24_ERROR_YN;  // 민원24스크래핑장애여부
				    		SCRP_NHIS_EXP = json.SCRP_NHIS_EXP;  // 건강보험스크래핑제외 여부
				    		SCRP_MINWON24_EXP = json.SCRP_MINWON24_EXP;  // 민원24스크래핑제외 여부
				    		SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;  // 건강보험 스크래핑 성공여부
				    		SCRP_MINWON24_SUCCESS_YN = json.SCRP_MINWON24_SUCCESS_YN;   // 민원24 스크래핑 성공여부
							BANK_INSP_NO_key = json.BANK_INSP_NO;  // 대출신청번호
							SUNSHINELOAN_YN = json.SUNSHINELOAN_YN;  // 전자약정여부
							CERT_HNDNO = json.CERT_HNDNO;  // 인증휴대폰번호

							// 전달받은 직장정보 직접입력값 추출
							company_nm = json.company_nm;  // 직장명
							year_amt = json.year_amt;  // 연소득
							join_company_day = json.join_company_day;  // 입사일자


				    		// 조회된 한도조회결과
				    		var LNC3003_list = json.LNC3003_list;
							if( fnCommon_isNull(LNC3003_list)  ||  fnCommon_isNull(LNC3003_list.length)  ||  LNC3003_list.length < 1 ){
								// alert("조회된 한도결과가 없습니다.");

					    		// 대출불가안내 // 조회한도결과 없으면 불승인 처리된것으로 간주.
					    		loanRenewal4_004.fnGoNextSorryStep();

							}else{
								// 한도조회결과 리스트 그리기
								loanRenewal4_004.fnRenderList(LNC3003_list);
							}

				    		// 대출한도 조회
							// loanRenewal4_004.fnSearch_1();

				    	}else{
				    		alert("대출한도 조회에 실패하였습니다.");

				    		/*
			    			var errorMsg = json.RESULT_DESC.replace( "\n1800-3651\n(평일 09:00~18:00 상담 가능)", "");
				    		if(json.RESULT_DETAIL_NO == "000399"){
				    			errorMsg = "[시스템오류]\n"
				    				+ "신용조회 차단서비스로 한도 조회가 되지 않습니다.\n"
				    				+ "신용조회 차단 서비스 해제 후 조회 부탁 드립니다.\n"
				    				+ "[해제 문의]\n"
				    				+ "NICE:02-2122-4000\n"
				    				+ "KCB:02-708-1000\n"
				    				+ "오류사유\n"
				    				+ errorMsg;
				    		}else{
				    			errorMsg = "[시스템오류]\n"
				    				+ "고객님 불편을 드려 죄송합니다.\n"
				    				+ "야간 및 주말은 외부기간 IT점검 등으로 오류가 발생할 수 있습니다.\n"
				    				+ "저희 상담원이 오류사항을 확인하여 고객님께 연락 드리도록 하겠습니다.\n"
				    				+ "야간 또는 주말인 경우 영업일 오전에 연락 드리겠습니다.\n"
				    				+ "문의:1800-3651 (평일 09~18시)\n"
				    				+ "오류사유\n"
				    				+ errorMsg;
				    		}

				    		alert(errorMsg.split("<br/>").join("\n"));
				    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
				    		fnCommon_goHome();
				    		*/
				    	}
			    	}
				},
				error: function(data, textStatus, error){
		    		console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
		    		alert(error);
		    		fnCommon_goHome();
				},
				complete: function() {

					// 로딩 원복
					$(".ajax-loading-area").css({
						'display':'none',
						'z-index':'9999998',
						'position':'fixed',
						'top':'50%',
						'left':'50%',
						'border':'0',
						'background':'0',
						'filter':'Alpha(Opacity = 88)',
						'opacity':'.88',
						'width':'40px',
						'height':'40px',
						'margin-left':'-20px',
						'margin-top':'-20px'
					});

					$(".ajax-loading-icon").css({
						'z-index': '9999999',
						'background': 'url("/resources/css/themes/default/images/ajax-loader.gif")',
						'background-size': '40px 40px',
						'width': '40px',
						'height': '40px'
					});

					/*
					$(".ajax-loading-icon")[0].style.removeProperty('background-image');
					*/
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			조회 오류시 예 선택
			loanRenewal4_004.fnSearch_2_callback_y
		 -------------------------------------------------------------------------------------- */
		fnSearch_2_callback_y : function(){

			// 대출한도조회 신청 - 직장인최적상품신청
			loanRenewal4_004.fnSearch_2();
		},



		/* --------------------------------------------------------------------------------------
			조회 오류시 아니오 선택
			loanRenewal4_004.fnSearch_2_callback_n
		 -------------------------------------------------------------------------------------- */
		fnSearch_2_callback_n : function(){
    		fnCommon_goHome();
		},



		/* --------------------------------------------------------------------------------------
			대출한도 조회
			loanRenewal4_004.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function(){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			// iajax.addParam("bankInspNo", bankInspNo);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_004_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"){

			    		// 조회된 한도조회결과
			    		var LNC3003_list = json.LNC3003_list;

						// 한도조회결과 리스트 그리기
						loanRenewal4_004.fnRenderList(LNC3003_list);

						// 전달받은 직장정보 직접입력값 추출
						company_nm = json.company_nm;  // 직장명
						year_amt = json.year_amt;  // 연소득
						join_company_day = json.join_company_day;  // 입사일자
						SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;  // 스크래핑 여부

			    	}else{
			    		alert("대출한도 조회에 실패하였습니다.");
			    	}
				},
				error: function(data, textStatus, error){
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			한도조회결과 리스트 그리기
			loanRenewal4_004.fnRenderList
		 -------------------------------------------------------------------------------------- */
		fnRenderList : function( LNC3003_list ){

			var auto_count = 0;   // 자동대출 갯수
			var not_auto_count = 0;   // 전화대출 갯수

			if( !fnCommon_isNull(LNC3003_list)  &&  LNC3003_list.length > 0 ){
				for(var i=0; i < LNC3003_list.length; i++){

					var LNC3003 = LNC3003_list[i];
					if( !fnCommon_isNull(LNC3003) ){

						var list_div_id = "";  // 리스트가 들어갈 영역
						var list_div_row_id = "";  // 리스트 중 한줄 영역
						var list_choice_button = "";  // 선택버튼

						// 상품코드
						var goods_CD = LNC3003.goods_CD;

						// 대환한도
						var tranc_LIMIT = LNC3003.tranc_LIMIT;
						var tranc_LIMIT_number = Number(tranc_LIMIT);
						var tranc_LIMIT_flag = false;

						// 자동대출상품여부
						var loan_GOODS_YN = LNC3003.loan_GOODS_YN;
						if( !fnCommon_isNull(loan_GOODS_YN)  &&  loan_GOODS_YN == "1" ){

							// 자동대출 리스트에 추가
							list_div_id = "LNC3003_list_1";
							list_div_row_id = "list_1_div_";
							list_choice_button = "list_1_button_";
							auto_count++;

						}else{
							// 전화대출 리스트에 추가
							list_div_id = "LNC3003_list_2";
							list_div_row_id = "list_2_div_";
							list_choice_button = "list_2_button_";
							not_auto_count++;

							// 전화대출이면 대환한도 사용, 52301 햇살론 52351 온라인햇살론 52346 사잇돌2 표준 은 대환한도 미사용
							if( (!fnCommon_isNull(tranc_LIMIT)  &&  ( fnCommon_isNull(goods_CD)  ||  (goods_CD != "52351"  &&  goods_CD != "52301"  &&  goods_CD != "52346"))) ){
								tranc_LIMIT_flag = true;
							}
						}

						var limit_AMT = LNC3003.limit_AMT;  // 기본한도
						var limit_AMT_number = Number(limit_AMT);

						// 기본한도 + 대환한도
						// var sum = String(limit_AMT_number + tranc_LIMIT_number);

						// 대환한도만 표기하기로 함
						var sum = String(tranc_LIMIT_number);

						// 콤마찍기
						limit_AMT = fnCommon_addComma(limit_AMT);
						tranc_LIMIT = fnCommon_addComma(tranc_LIMIT);
						var sum_string = fnCommon_addComma(sum);

						var html = "";
						html += "  	<div class='inquire_Product' id='" + list_div_row_id + LNC3003.bank_INSP_NO + "' name='list_div'>		";   // <!-- class='choice' -->
						html += "  		<dl>			  ";
						html += "  			<dt>		  ";

						// 52351 온라인햇살론 은 자격안내 팝업 추가
						if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52351" ){
							html += "  				<div class='inquire_title'>" + LNC3003.goods_NM + "<p class='qualified'><a href='#' onclick='javascript:loanRenewal4_004.fnShowPopup_1();return false;'>자격확인</a></p></div>	  ";
						}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52350" ){
							html += "  				<span class='inquire_title'>" + LNC3003.goods_NM + "</span><span class='inquire_title' style='position:absolute;text-align:right;padding-right:130px;font-family:OneShinhanLight;'>#심야&nbsp; #주말</span>	  ";
						}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52347" ){
							html += "  				<span class='inquire_title'>" + LNC3003.goods_NM + "</span><span class='inquire_title' style='position:absolute;text-align:right;padding-right:100px;font-family:OneShinhanLight;'>#심야&nbsp; #주말</span>	  ";
						}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52332" ){
							html += "  				<span class='inquire_title'>" + LNC3003.goods_NM + "</span><span class='inquire_title' style='position:absolute;text-align:right;padding-right:112px;font-family:OneShinhanLight;'>#심야&nbsp; #주말</span>	  ";
						}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52343" ){
							html += "  				<span class='inquire_title'>" + LNC3003.goods_NM + "</span><span class='inquire_title' style='position:absolute;text-align:right;padding-right:96px;font-family:OneShinhanLight;'>#심야&nbsp; #주말</span>	  ";
						}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52354" ){
							html += "  				<span class='inquire_title'>" + LNC3003.goods_NM + "</span><span class='inquire_title' style='position:absolute;text-align:right;padding-right:96px;font-family:OneShinhanLight;'>#심야&nbsp; #주말</span>	  ";

						} else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52341" ){	// 참신한500
							html += "  				<span class='inquire_title'>" + LNC3003.goods_NM + "</span><span class='inquire_title' style='position:absolute;text-align:right;padding-right:96px;font-family:OneShinhanLight;'>#심야&nbsp; #주말</span>	  ";

						} else{
							html += "  				<div class='inquire_title'>" + LNC3003.goods_NM + "</div>	  ";
						}

						html += "  				<div class='inquire_interest'>연 " + LNC3003.nrml_RT + "%</div>	  ";
						html += "  			</dt>		  ";
						html += "  			<dd>		  ";
						html += "  				<div class='limit_money'>대출 가능한도 <span>" + limit_AMT + "</span>만원</div>	  ";
						html += "  				<div class='limit_select'><button class='ui-btn ui-shadow ui-corner-all' id='" + list_choice_button + LNC3003.bank_INSP_NO + "'>선택</button></div>	  ";
						html += "  			</dd>		  ";

						// 기본+대환한도
						if(tranc_LIMIT_flag){
							html += "  			<dd>		  ";
							html += "  				<div class='limit_money'>대환조건 가능한도 <span>" + sum_string + "</span>만원</div>	  ";
							html += "  				<div class='limit_select'><button class='ui-btn ui-shadow ui-corner-all' id='" + list_choice_button + "TRANC_LIMIT_" + LNC3003.bank_INSP_NO + "'>선택</button></div>	  ";
							html += "  			</dd>		  ";
						}

						html += "  		</dl>			  ";
						html += "  		<div class='limit_box' id='" + list_div_row_id + "detail_" + LNC3003.bank_INSP_NO + "' name='detail_box'>			  ";
						html += "  		</div>			  ";
						html += "  	</div>				  ";

						$("#" + list_div_id).append( html );
						$("#" + list_div_row_id + LNC3003.bank_INSP_NO).data( LNC3003 );  // 데이터 심어두기
						// 선택 버튼 이벤트 생성
						$("#" + list_choice_button + LNC3003.bank_INSP_NO).on("click", loanRenewal4_004.fnRenderDetail );

						// 기본+대환한도
						if(tranc_LIMIT_flag){
							$("#" + list_choice_button + "TRANC_LIMIT_" + LNC3003.bank_INSP_NO).on("click", loanRenewal4_004.fnRenderDetail );
						}
					}
				}
			}

			// 자동대출 갯수
			if( fnCommon_isNull(auto_count)  ||  auto_count < 1 ){
				$("#LNC3003_list_1").html("<div class='inquire_title' style='text-align: center;'>자동대출 중 이용가능한 상품이 없습니다.</div>");
			}

			// 전화대출 갯수
			if( fnCommon_isNull(not_auto_count)  ||  not_auto_count < 1 ){
				$("#LNC3003_list_2").html("<div class='inquire_title' style='text-align: center;'>전화대출 중 이용가능한 상품이 없습니다.</div>");
			}

		},



		/* --------------------------------------------------------------------------------------
			온라인햇살론 자격확인 팝업
			loanRenewal4_004.fnShowPopup_1
		 -------------------------------------------------------------------------------------- */
		fnShowPopup_1 : function(){

			// 메세지 팝업
    		var msg = "";

    		msg += "<p>";
    		msg += "<span style='font-family:NotoSans-Medium;'>햇살론 공통요건</span><br/>";
    		msg += "현 직장 3개월 이상 근속중인 직장인 중<br/>";
    		msg += "연소득 3,500만원 이하 또는<br/>";
    		msg += "연소득 4,500만원 이하 & 1개사 이상의 개인신용평가사가 산정한 개인신용평점 하위 100분의 20에 해당하는 자<br/><br/>";

    		msg += "<span style='font-family:NotoSans-Medium;'>온라인햇살론 상세요건</span><br/>";
    		msg += "1. 현 직장 <span style='font-family:NotoSans-Medium; color:#e84736'>최근 건강보험료 3개월</span>이상 정상납부<br/>";
    		msg += "2. <span style='font-family:NotoSans-Medium; color:#e84736'>인증서, 본인명의 휴대폰</span> 보유<br/><br/>";

    		msg += "※ 온라인햇살론은 햇살론과 동일한 상품으로,<br/>기존 햇살론 대비 금리가 <span style='font-family:NotoSans-Medium; color:#e84736'>1.3%p<span> 인하되며<br/>자동대출로 진행됩니다.";
    		msg += "</p>";

			fnCommon_popup("open", msg);
		},



		/* --------------------------------------------------------------------------------------
			선택 버튼 클릭시 입력 영역 열어주기
			loanRenewal4_004.fnRenderDetail
		 -------------------------------------------------------------------------------------- */
		fnRenderDetail : function(e){

			// 상세보기 값 모두 없애기
			$("div[name='detail_box']").hide();
			$("div[name='detail_box']").html("");

			// 선택효과 없애기
			$(".limit_select").removeClass("choice");
			// $("div[name='list_div']").removeClass("choice");


			var id = e.target.id;
			if( !fnCommon_isNull(id) ){

				// 1 자동대출 2 전화대출  값 추출
				var type_num = "1";
				if(id.indexOf("list_2_button_") > -1){
					type_num = "2";
				}

				// 저축은행신청번호 추출
				var bank_INSP_NO = id.replace("list_" + type_num + "_button_", "");

				// 대환한도 여부
				var tranc_LIMIT_flag = false;
				if(id.indexOf("TRANC_LIMIT_") > -1){
					tranc_LIMIT_flag = true;
					bank_INSP_NO = bank_INSP_NO.replace("TRANC_LIMIT_", "");
				}

				if( !fnCommon_isNull(bank_INSP_NO) ){

					// 심어둔 데이터 추출
					var list_div_row_id = "list_" + type_num + "_div_" + bank_INSP_NO;
					var LNC3003 = $("#" + list_div_row_id).data();

					// 사전한도
					var limit_AMT = LNC3003.limit_AMT;
					var limit_AMT_number = Number(limit_AMT) * 10000;

					// 상품코드
					var LNC3003_goods_CD = LNC3003.goods_CD;

					// 상품별 시간안내
					var goods_time_coment = "";
					if( type_num == "1" && !fnCommon_isNull(LNC3003_goods_CD) ){
						// 자동대출 상품의 경우
						if( LNC3003_goods_CD == "52351" ){
							// 52351 온라인햇살론 6:00
							goods_time_coment = "<div class='limit_text'>18시까지 모든 절차 완료하시면 당일 송금됩니다.<br />(단, 비영업일인 경우 익영업일 08시 이후 순차 송금)</div>";
						}else{
							// 그외
							goods_time_coment = "<div class='limit_text'>모든 절차 완료하시면 당일 송금됩니다.<br />(단, 23시~02시에는 시스템 점검시간으로 송금불가)</div>";
						}
					}

					var detail_id = "list_" + type_num + "_div_detail_" + bank_INSP_NO;   // 선택된 항목에 대한 상세입력 영역
					var max_amt_id = "list_" + type_num + "_div_detail_max_amt_" + bank_INSP_NO;   // 최대금액 체크박스
					var send_button_id = "list_" + type_num + "_detail_send_" + bank_INSP_NO;  // 신청하기버튼
					var delete_button_id = "list_" + type_num + "_detail_delete_" + bank_INSP_NO;  // 삭제버튼
					var input_id = "list_" + type_num + "_input_amt_" + bank_INSP_NO;  // 신청금액 입력영역
					var man_id = "list_" + type_num + "_input_amt_man_" + bank_INSP_NO;  // 신청금액 만단위 변환영역
					var textarea_id = "list_" + type_num + "_textarea_amt_" + bank_INSP_NO;  // 상담내용 입력영역

					// 대환한도
					if(tranc_LIMIT_flag){
						send_button_id = "list_" + type_num + "_detail_send_TRANC_LIMIT_" + bank_INSP_NO;  // 신청하기버튼
						delete_button_id = "list_" + type_num + "_detail_delete_TRANC_LIMIT_" + bank_INSP_NO;  // 삭제버튼
						max_amt_id = "list_" + type_num + "_div_detail_max_amt_TRANC_LIMIT_" + bank_INSP_NO;   // 최대금액 체크박스
					}

					var html = "";

					// 자동대출은 신청서로 가기때문에 입력된 금액이나 메모내용이 의미가 없음. 입력영역 보이지않게하고 버튼만 살리기로 협의(최형진 과장)
					// 1 자동대출 2 전화대출
					if(type_num == "1"){
						html += "  	<div class='limit_check' style='display:none;'>최대금액<div class='limit_check_box'><input type='checkbox' id='" + max_amt_id + "' name='agree_chk' class='checkBox'></div></div>				  ";
						html += "  	<div class='limit_input' style='padding-bottom: 0px;'>				  ";
						html += "  		<ul>			  ";
						html += "  			<li><div class='ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset' style='display:none;'>		  ";
						html += "  				  <input type='tel' id=" + input_id + " maxlength='10' name='input_won' value='" + limit_AMT_number + "' placeholder='신청금액 입력 (원단위)'></div>		  ";
						html += "  			<p class='' style='display:none;'>원</p></li>		  ";
						html += "  		</ul>			  ";
						html += "  		<ul>			  ";
						html += "  			<li style='display:none;'><span id='" + man_id + "' name='input_manwon'></span>만원</li>		  ";
						html += "  		</ul>			  ";
						html += "  	</div>				  ";
						html += "  	<div class='limit_textarea' style='display:none;'><textarea id=" + textarea_id + " class='textarea ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow' placeholder='(선택) 궁금한 점 등 상담 내용을 기입해주세요.'></textarea></div>				  ";
						html += goods_time_coment;
						html += "  	<div class='limit_btn'><button id=" + send_button_id + " class='ui-btn ui-shadow ui-corner-all'>대출 신청하기</button></div>				  ";
						html += "  	<div class='limit_cencel'><a href='#'><img id=" + delete_button_id + " src='../resources/img/loanRenewal4/close.png'></a></div><!-- cancel button -->				  ";

					}else{
						html += "  	<div class='limit_check'>최대금액<div class='limit_check_box'><input type='checkbox' id='" + max_amt_id + "' name='agree_chk' class='checkBox'></div></div>				  ";
						html += "  	<div class='limit_input'>				  ";
						html += "  		<ul>			  ";
						html += "  			<li><div class='ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>		  ";
						html += "  				  <input type='tel' id=" + input_id + " maxlength='10' name='input_won' placeholder='신청금액 입력 (원단위)'></div>		  ";
						html += "  			<p class=''>원</p></li>		  ";
						html += "  		</ul>			  ";
						html += "  		<ul>			  ";
						html += "  			<li style='display:none;'><span id='" + man_id + "' name='input_manwon'></span>만원</li>		  ";
						html += "  		</ul>			  ";
						html += "  	</div>				  ";
						html += "  	<div class='limit_text'>&#8729;&nbsp;최소 신청금액 안내<br>&nbsp;&nbsp;햇살론 500만원, 그외 3백만원<br>&nbsp;&nbsp;백만원 단위로 신청 가능 (예: 500만원, 600만원)</div>				  ";
						html += "  	<div class='limit_textarea'><textarea id=" + textarea_id + " class='textarea ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow' placeholder='(선택) 궁금한 점 등 상담 내용을 기입해주세요.'></textarea></div>				  ";
						html += "  	<div class='limit_btn'><button id=" + send_button_id + " class='ui-btn ui-shadow ui-corner-all'>대출 신청하기</button></div>				  ";
						html += "  	<div class='limit_cencel'><a href='#'><img id=" + delete_button_id + " src='../resources/img/loanRenewal4/close.png'></a></div><!-- cancel button -->				  ";
					}

					// 화면에 생성
					$("#" + detail_id).html(html);

					// 최대금액 체크박스 이벤트 생성
					$("#" + max_amt_id).on("click", loanRenewal4_004.fnClick_maxAmt );

					// 신청하기 버튼 이벤트 생성
					$("#" + send_button_id).on("click", loanRenewal4_004.fnSend_detail_1 );

					// 삭제 버튼 이벤트 생성
					$("#" + delete_button_id).on("click", loanRenewal4_004.fnDelete_detail );

					// 신청금액 입력영역 입력이벤트 생성
					$("#" + input_id).on("keyup", loanRenewal4_004.fnKeyup_inputAmt );

					// 선택 효과주기
					var parent = $("#" + id).parent();
					parent.addClass("choice");

					// 상세입력란 노출
					$("#" + detail_id).show();
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			최대금액 체크박스 이벤트
			loanRenewal4_004.fnClick_maxAmt
		 -------------------------------------------------------------------------------------- */
		fnClick_maxAmt : function(e){

			// 혹시 모르니까 초기화 처리 먼저
			$("input[type='tel'][name='input_won']").val("");  // 원
			$("span[name='input_manwon']").parent().hide();  // 만원
			$("span[name='input_manwon']").html("");

			// 체크일때 한도 최대값 자동설정
			var checked = e.currentTarget.checked;
			if(!fnCommon_isNull(checked, "boolean")){

				var max_amt_id = e.target.id;
				var bank_INSP_NO = "";  // 대출 신청번호

				// 1 자동대출 2 전화대출  값 추출
				var type_num = "1";
				if( !fnCommon_isNull(max_amt_id)  &&  max_amt_id.indexOf("list_2_div_detail_max_amt_") > -1){
					type_num = "2";

					// 대출 신청번호 추출
					bank_INSP_NO = max_amt_id.replace("list_2_div_detail_max_amt_", "");

				}else{
					// 대출 신청번호 추출
					bank_INSP_NO = max_amt_id.replace("list_1_div_detail_max_amt_", "");
				}

				// 대환한도 여부
				var tranc_LIMIT_flag = false;
				if( !fnCommon_isNull(bank_INSP_NO)  &&  bank_INSP_NO.indexOf("TRANC_LIMIT_") > -1 ){
					tranc_LIMIT_flag = true;
					bank_INSP_NO = bank_INSP_NO.replace("TRANC_LIMIT_", "");
				}

				// 부모창에 심어둔 데이터 추출
				var list_div_row_id = "list_" + type_num + "_div_" + bank_INSP_NO;
				var LNC3003 = $("#" + list_div_row_id).data();
				if( !fnCommon_isNull(LNC3003) ){

					// 대환한도
					var tranc_LIMIT = LNC3003.tranc_LIMIT;
					var tranc_LIMIT_number = 0;
					if( !fnCommon_isNull(tranc_LIMIT) ){
						tranc_LIMIT_number = Number(tranc_LIMIT) * 10000;
					}

					// 기본한도
					var limit_AMT = LNC3003.limit_AMT;
					var limit_AMT_number = Number(limit_AMT) * 10000;
					var limit_AMT_comma = "";   // 콤마추가한 문자열

					// 선택 버튼이 대환한도였으면
					if(tranc_LIMIT_flag){

						// 대환한도 사용
						limit_AMT_number = tranc_LIMIT_number;
					}

					if(limit_AMT_number > 0){

						// 콤마찍기
						limit_AMT_comma = fnCommon_addComma( String(limit_AMT_number) );

						// 신청금액 입력영역에 자동설정
						var input_id = "list_" + type_num + "_input_amt_" + bank_INSP_NO;
						$("#" + input_id).val(limit_AMT_comma);

						if(limit_AMT_number > 10000){

							var manwon_int = parseInt(limit_AMT_number/10000);
							if(manwon_int > 0){

								// 콤마찍기
								limit_AMT_comma = fnCommon_addComma( String(manwon_int) );

								// 신청금액 만단위 변환영역
								var man_id = "list_" + type_num + "_input_amt_man_" + bank_INSP_NO;
								$("#" + man_id).html( limit_AMT_comma );
								$("#" + man_id).parent().show();
							}
						}
					}

				}
			}
		},



		/* --------------------------------------------------------------------------------------
			신청금액 입력영역 입력
			loanRenewal4_004.fnKeyup_inputAmt
		 -------------------------------------------------------------------------------------- */
		fnKeyup_inputAmt : function(e){

			// 만원영역 혹시 모르니까 초기화 처리 먼저
			$("span[name='input_manwon']").parent().hide();
			$("span[name='input_manwon']").html("");

			var id = e.target.id;
			var value = $("#" + id).val();

			if( !fnCommon_isNull(value) ){

				// 문자열 제거 후 숫자만 반환
				value = fnCommon_getOnlyNumber(value);
				var value_number = Number(value);
				if(value_number > 0){

					// 콤마찍기
					var value_format = fnCommon_addComma(value);
					$("#" + id).val( value_format );

					if(value_number > 10000){
						value_number = parseInt( value_number/10000 );   // 만원단위 이하 절사
						if(value_number > 0){
							value = String(value_number);

							// 콤마찍기
							value_format = fnCommon_addComma(value);

							// 이 영역은 한개씩밖에 존재하지 않으니까
							$("span[name='input_manwon']").parent().show();
							$("span[name='input_manwon']").html(value_format);
						}
					}
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			신청하기 버튼 클릭 - 입력값 세션보관
			loanRenewal4_004.fnSend_detail_1
		 -------------------------------------------------------------------------------------- */
		fnSend_detail_1 : function(e){
			var send_button_id = e.target.id;
			var bank_INSP_NO = "";  // 대출 신청번호

    		// 앱 여부
    		var isApp_flag = fnCommon_isApp();

			// 1 자동대출 2 전화대출  값 추출
			var type_num = "1";
			if( !fnCommon_isNull(send_button_id)  &&  send_button_id.indexOf("list_2_detail_send_") > -1){
				type_num = "2";

				// 대출 신청번호 추출
				bank_INSP_NO = send_button_id.replace("list_2_detail_send_", "");

			}else{
				// 대출 신청번호 추출
				bank_INSP_NO = send_button_id.replace("list_1_detail_send_", "");
			}

			// 대환한도 여부
			var TRANC_LIMIT_flag = false;
			var TRANC_YN = "0";   // 대환여부 1 대환 0 대환아님
			if( !fnCommon_isNull(bank_INSP_NO)  &&  bank_INSP_NO.indexOf("TRANC_LIMIT_") > -1 ){
				bank_INSP_NO = bank_INSP_NO.replace("TRANC_LIMIT_", "");
				TRANC_LIMIT_flag = true;
				TRANC_YN = "1";   // 1 대환
			}

			// 부모창에 심어둔 데이터 추출
			var list_div_row_id = "list_" + type_num + "_div_" + bank_INSP_NO;
			var LNC3003 = $("#" + list_div_row_id).data();
			if( !fnCommon_isNull(LNC3003) ){

				// 꺼내쓸때 오류나지않게 null 대체처리
				if( LNC3003.sunshineloan_YN == null ){  LNC3003.sunshineloan_YN = "";  }
				if( LNC3003.cust_NO == null ){  LNC3003.cust_NO = "";  }
				if( LNC3003.bank_INSP_NO == null ){  LNC3003.bank_INSP_NO = "";  }
				if( LNC3003.goods_NM == null ){  LNC3003.goods_NM = "";  }
				if( LNC3003.nrml_RT == null ){  LNC3003.nrml_RT = "";  }
				if( LNC3003.autoloan_YN == null ){  LNC3003.autoloan_YN = "";  }
				if( LNC3003.online_SUNSHINELOAN_YN == null ){  LNC3003.online_SUNSHINELOAN_YN = "";  }
				if( LNC3003.sgi_AGR_YN == null ){  LNC3003.sgi_AGR_YN = "";  }
				if( LNC3003.goods_CD == null ){  LNC3003.goods_CD = "";  }
				if( LNC3003.co_NM == null ){  LNC3003.co_NM = "";  }
				if( LNC3003.youth_GUIDE_YN == null ){  LNC3003.youth_GUIDE_YN = "";  }
				if( LNC3003.hac_CD == null ){  LNC3003.hac_CD = "";  }
				if( LNC3003.rgst_NO == null ){  LNC3003.rgst_NO = "";  }
				if( LNC3003.entc_DT == null ){  LNC3003.entc_DT = "";  }
				if( LNC3003.cust_NM == null ){  LNC3003.cust_NM = "";  }
				if( LNC3003.priority == null ){  LNC3003.priority = "";  }
				if( LNC3003.limit_AMT == null ){  LNC3003.limit_AMT = "";  }
				if( LNC3003.redu_RT == null ){  LNC3003.redu_RT = "";  }
				if( LNC3003.haf_CD == null ){  LNC3003.haf_CD = "";  }
				if( LNC3003.hae_CD == null ){  LNC3003.hae_CD = "";  }
				if( LNC3003.insr_YN == null ){  LNC3003.insr_YN = "";  }
				if( LNC3003.red_CD == null ){  LNC3003.red_CD = "";  }
				if( LNC3003.resid_ADDR_SELF_YN == null ){  LNC3003.resid_ADDR_SELF_YN = "";  }
				if( LNC3003.hm_ADDR_TY == null ){  LNC3003.hm_ADDR_TY = "";  }
				if( LNC3003.liv_POSTNO == null ){  LNC3003.liv_POSTNO = "";  }
				if( LNC3003.liv_ADDR1 == null ){  LNC3003.liv_ADDR1 = "";  }
				if( LNC3003.liv_ADDR2 == null ){  LNC3003.liv_ADDR2 = "";  }
				if( LNC3003.liv_STRUT_MG_NO == null ){  LNC3003.liv_STRUT_MG_NO = "";  }
				if( LNC3003.real_ADDR_TY == null ){  LNC3003.real_ADDR_TY = "";  }
				if( LNC3003.real_POSTNO == null ){  LNC3003.real_POSTNO = "";  }
				if( LNC3003.real_ADDR1 == null ){  LNC3003.real_ADDR1 = "";  }
				if( LNC3003.real_ADDR2 == null ){  LNC3003.real_ADDR2 = "";  }
				if( LNC3003.real_STRUT_MG_NO == null ){  LNC3003.real_STRUT_MG_NO = "";  }
				if( LNC3003.ad_VIEW_YN == null ){  LNC3003.ad_VIEW_YN = "";  }
				if( LNC3003.scrp_NHIS == null ){  LNC3003.scrp_NHIS = "";  }
				if( LNC3003.scrp_MINWON24 == null ){  LNC3003.scrp_MINWON24 = "";  }
				if( LNC3003.tranc_LIMIT == null ){  LNC3003.tranc_LIMIT = "";  }
				if( LNC3003.tranc_RT == null ){  LNC3003.tranc_RT = "";  }
				if( LNC3003.loan_GOODS_YN == null ){  LNC3003.loan_GOODS_YN = "";  }
				// K뱅크
				if( LNC3003.in_BANK_CD == null ){  LNC3003.in_BANK_CD = "";  }
				if( LNC3003.in_ACCO_NO == null ){  LNC3003.in_ACCO_NO = "";  }

				// 선택된 상품 object 임시보관
				LNC3003_selected = LNC3003;

				var goods_CD = LNC3003.goods_CD;   // 상품코드
				var REQ_AMT = $("#list_" + type_num + "_input_amt_" + bank_INSP_NO).val();   // 대출신청금액
				var MEMO = $("#list_" + type_num + "_textarea_amt_" + bank_INSP_NO).val();   // 상담내용

				// 문자열 제거 후 숫자만 반환
				REQ_AMT = fnCommon_getOnlyNumber(REQ_AMT);

				// 자동대출/전화대출 신청버튼 클릭시 유효성 체크
				var result = loanRenewal4_004.fnSend_detail_1_validation( LNC3003, REQ_AMT, MEMO, TRANC_LIMIT_flag );
				if(!result){
					return false;
				}
				//  -------------------  1 자동대출
				if(type_num == "1"){

					// 입력값을 대출신청서작성 화면으로 끌고가기 위해 세션에 보관
					loanRenewal4_004.fnSave_3(LNC3003, REQ_AMT, MEMO);

				//  -------------------  2 전화대출
				}else{

					// 상품코드
					var goods_CD = LNC3003.goods_CD;

					iajax.clearParam();
					iajax.addParam("CHK_CSRF", random);
					iajax.addParam("CUST_NO", LNC3003.cust_NO);
					iajax.addParam("GOODS_CD", LNC3003.goods_CD);
					iajax.addParam("REQ_AMT", REQ_AMT);   // 대출신청금액
					iajax.addParam("BANK_INSP_NO", BANK_INSP_NO_key);   // 저축은행신청번호
					iajax.addParam("SEND_MSG", "Y");   // 계약서작성(전자약정) 페이지인 경우 전문 송신
					iajax.addParam("MEMO", MEMO);   // 고객이 입력한 상담내용
					iajax.addParam("REQ_GB", "3");  // 신청구분 1 전화신청 2 자동대출 3 자동신청가능여부(미적용시전화대출) 4 자동신청 5 온라인햇살론오류로인한신청 6 자동신청서작성
					iajax.addParam("TRANC_YN", TRANC_YN);   // 대환여부 1 대환 0 대환아님
					iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// 류예샘D 신규대행사(애드게더) 파라미터 적재
					
					// iajax 연계점 정보 parameter 추가
					fnCommon_partnerData();

					$.ajax({
					    type: "post",
					    url: callURL_requestLNC3004,
					    dataType: "json",
					    data: iajax.postparam,
					    success: function(json){
							if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"  ){

								// 자동대출가능여부
								var autolaonPsbYn = json.DATA.AUTOLOAN_PSB_YN;

								var type = "3";
								if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "3"){
									type = "2";
								}

									// 신청결과 안내 화면에서 노출영역 지정
									// 52301 햇살론직장인
									//if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52301" ){
									//	type = "3";  // 기본영역 노출
									//}else{
										// 앱 & 건강보험스크래핑제외 여부  or  스크래핑 성공 여부
										//if( isApp_flag  &&  ((!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")  ||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y")) ){
										//	type = "3";  // 기본영역 노출
										//}else{
										//	type = "2";  // 온라인 서류제출 버튼 보이도록
										//}
									//}
								var data_list = [
										 { "key" : "view_name", "value" : "loanRenewal4_013" }   // 대출신청이 접수되었습니다.
									   , { "key" : "title", "value" : "신청결과" }
									   , { "key" : "type", "value" : type }   // 1 앱설치하기, 2 온라인서류제출하기 3 기본 4 이어서진행하기 5 대출불가안내
									];

								// renewal4 공통 url 호출
								fnCommon_callUrl( data_list );

					    		// 신청완료 안내 이동
					    		// loanRenewal4_004.fnNext_thanks( LNC3003, json.DATA.REQ_AMT, json.DATA.AUTOLOAN_PSB_YN );

					    	}else{

					    		// 대출불가안내
					    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
						    		loanRenewal4_004.fnGoNextSorryStep();

					    		}else{

									// 52351 온라인햇살론
									if( !fnCommon_isNull(LNC3003.goods_CD)  &&  LNC3003.goods_CD == "52351" ){

										// 온라인햇살론오류로인한신청
										loanRenewal4_004.fnSave_1(LNC3003, REQ_AMT, MEMO);

									}else{
							    		var errorMsg = json.RESULT_DESC;
										alert(errorMsg.split("<br/>").join("\n"));
									}
					    		}
					    	}
						},
						error: function(data, textStatus, error){
							alert(error);
							log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
						},
						complete: function(){
						}
					});
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			자동대출 신청하기 클릭시 고객선택입력값 세션보관
			loanRenewal4_004.fnSave_3
		 -------------------------------------------------------------------------------------- */
		fnSave_3 : function(LNC3003, REQ_AMT, MEMO){

			// TOBE - 입력값을 대출신청서작성 화면으로 끌고가기 위해 세션에 보관
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("REQ_AMT", REQ_AMT);
			iajax.addParam("MEMO", MEMO);
			iajax.addParam("LNC3003", JSON.stringify(LNC3003));

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_004_02,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"){

						// 앱여부
						var isApp_flag = fnCommon_isApp();
						var view_name = "";
						var title = "";
						var data_list;

						// 휴대폰 인증여부  or  과거 휴대폰 인증이력 있으면 불필요
						if( (!fnCommon_isNull(json.isHpAuth)  &&  json.isHpAuth == "Y")  ||  !fnCommon_isNull(CERT_HNDNO) ){

							// 앱 & 건강보험스크래핑제외 여부  or  건보스크래핑 성공
							if( isApp_flag  &&  ((!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")  ||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y"))  ){
							
								// 대출신청서작성 화면으로 이동
								view_name = "loanRenewal4_012";
								title = "대출신청서 작성";
								data_list = [
									 { "key" : "view_name", "value" : view_name }
								   , { "key" : "title", "value" : title }
								];
								// renewal4 공통 url 호출
								fnCommon_callUrl( data_list );

							}else{
								// 직장인최적상품대출신청 - 자동신청가능여부 체크
								loanRenewal4_004.fnSave_2(REQ_AMT);
							}

						// 휴대폰 인증 안했으면 추가인증 화면으로 이동
						}else{

							// 추가 본인인증 화면 호출
							view_name = "loanRenewal4_008";
							title = "추가 본인인증";

							data_list = [
									 { "key" : "view_name", "value" : view_name }
								   , { "key" : "title", "value" : title }
								];
							// renewal4 공통 url 호출
							fnCommon_callUrl( data_list );
						}

			    	}
			    },
		    	error: function(data, textStatus, error){
				},
				complete: function(){
				}
			});

		},



		/* --------------------------------------------------------------------------------------
			직장인최적상품대출신청 - 자동신청가능여부 체크
			loanRenewal4_004.fnSave_2
		 -------------------------------------------------------------------------------------- */
		fnSave_2 : function(REQ_AMT){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("REQ_GB", "3");  // 신청구분 1 전화신청 2 자동대출 3 자동신청가능여부(미적용시전화대출) 4 자동신청 5 온라인햇살론오류로인한신청 6 자동신청서작성
			iajax.addParam("CUST_NO", LNC3003_selected.cust_NO);
			iajax.addParam("GOODS_CD", LNC3003_selected.goods_CD);
			iajax.addParam("REQ_AMT", REQ_AMT);   // 대출신청금액
			iajax.addParam("BANK_INSP_NO", BANK_INSP_NO_key);   // 저축은행신청번호
			iajax.addParam("SEND_MSG", "Y");   // 계약서작성(전자약정) 페이지인 경우 전문 송신
			iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// 류예샘D 신규대행사(애드게더) 파라미터 적재
			
			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();
			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3004,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

			    		// 자동대출가능여부
			    		var autolaonPsbYn = json.DATA.AUTOLOAN_PSB_YN;

			    		// 자동대출가능여부 1 자동신청가능
						if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "1" ){

			    			// 자동대출 호출
							loanRenewal4_004.fnSave_4(REQ_AMT);

		    			// 자동대출가능여부 2 신청서작성
			    		}else if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "2"){

			    			// 자동신청서작성
			    			loanRenewal4_004.fnSave_5(REQ_AMT);

			    		}else if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "3"){

			    			// 온라인서류제출하기 종료
			    			//loanRenewal4_004.fnSave_6(REQ_AMT, autolaonPsbYn);
							var type = "3";
							if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "3"){
								type = "2";
							}

							var data_list = [
									 { "key" : "view_name", "value" : "loanRenewal4_013" }   // 대출신청이 접수되었습니다.
								   , { "key" : "title", "value" : "신청결과" }
								   , { "key" : "type", "value" : type }   // 1 앱설치하기, 2 온라인서류제출하기 3 기본 4 이어서진행하기 5 대출불가안내
								];

							// renewal4 공통 url 호출
							fnCommon_callUrl( data_list );
			    		}else{
			    			// 접수되었습니다 종료
			    			loanRenewal4_004.fnSave_6(REQ_AMT, "0");
			    		}

			    	}else{

			    		// 대출불가안내
			    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
				    		loanRenewal4_004.fnGoNextSorryStep();

			    		// 오류메세지안내
			    		}else{
				    		var errorMsg = json.RESULT_DESC;
							alert(errorMsg.split("<br/>").join("\n"));
			    		}
			    	}
				},
				error: function(data, textStatus, error){
					alert(error);
					log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			대출불가안내
			loanRenewal4_004.fnGoNextSorryStep
		 -------------------------------------------------------------------------------------- */
		fnGoNextSorryStep : function(){

			// "대출 신청이 접수되었습니다."
			var data_list = [
		             { "key" : "view_name", "value" : "loanRenewal4_013" }
		           , { "key" : "title", "value" : "신청결과" }
		           , { "key" : "type", "value" : "5" }   // 1 앱설치하기, 2 온라인서류제출하기 3 기본 4 이어서진행하기 5 대출불가안내
				];

			// renewal4 공통 url 호출
			fnCommon_callUrl( data_list );
		},



		/* --------------------------------------------------------------------------------------
			자동신청 실패시 전화신청 처리
			loanRenewal4_004.fnSave_6
		 -------------------------------------------------------------------------------------- */
		fnSave_6 : function(REQ_AMT, autolaonPsbYn){

			// 한도금액
			var LIMIT_AMT = fnCommon_getOnlyNumber(LNC3003_selected.limit_AMT);   // 문자열 제거 후 숫자만 반환

			// iajax 구성
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("REQ_GB", "1");  // 신청구분 1 전화신청 2 자동대출 3 자동신청가능여부(미적용시전화대출) 4 자동신청 5 온라인햇살론오류로인한신청 6 자동신청서작성
			iajax.addParam("CUST_NO", LNC3003_selected.cust_NO);
			iajax.addParam("GOODS_CD", LNC3003_selected.goods_CD);
			iajax.addParam("REQ_AMT", REQ_AMT);   // 대출신청금액
			iajax.addParam("LIMIT_AMT", LIMIT_AMT);   // 한도금액
			iajax.addParam("BANK_INSP_NO", BANK_INSP_NO_key);   // 저축은행신청번호
			iajax.addParam("SEND_MSG", "Y");   // 계약서작성(전자약정) 페이지인 경우 전문 송신
			iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// 류예샘D 신규대행사(애드게더) 파라미터 적재
			
			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_requestLNC4004,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){
			    		var type = "3"; // 접수되었습니다 종료페이지로 이동

						if( autolaonPsbYn == "3" ){
							type = "2"; // 온라인서류제출하기 종료페이지로 이동
						}

		    			var data_list = [
		    		             { "key" : "view_name", "value" : "loanRenewal4_013" }
		    		           , { "key" : "title", "value" : "신청결과" }
		    		           , { "key" : "type", "value" : type }   // 1 앱설치하기, 2 온라인서류제출하기 3 기본 4 이어서진행하기 5 대출불가안내
		    				];

		    			// renewal4 공통 url 호출
		    			fnCommon_callUrl( data_list );

			    	}else{

			    		// 대출불가안내
			    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
				    		loanRenewal4_004.fnGoNextSorryStep();

			    		// 오류메세지안내
			    		}else{
				    		var errorMsg = json.RESULT_DESC;
							alert(errorMsg.split("<br/>").join("\n"));
			    		}
			    	}
			    },
				error: function(data, textStatus, error) {

				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			자동신청서작성
			loanRenewal4_004.fnSave_5
		 -------------------------------------------------------------------------------------- */
		fnSave_5 : function(REQ_AMT){
		
			// 신청구분 1 전화신청 2 자동대출 3 자동신청가능여부 4 자동신청 5 온라인햇살론오류로인한신청 6 자동신청서작성
			var REQ_GB = "";

			// 앱여부
			var isApp_flag = fnCommon_isApp();

			// 앱인 경우, 대출신청012화면에서 신청정보 입력받은 후, 3004로 REQ=6처리 
			if( isApp_flag ){
				var data_list = [
								{ "key" : "view_name", "value" : "loanRenewal4_012" }
								, { "key" : "title", "value" : "대출신청서 작성" }
								];
				
				// renewal4 공통 url 호출
				fnCommon_callUrl( data_list );
			//모바일웹인경우, 3004 REQ:4전송 후 이어하기 페이지 출력
			}else{
			
				REQ_GB = "4";  // 신청구분 4 자동신청

				// 한도금액
				var LIMIT_AMT = fnCommon_getOnlyNumber(LNC3003_selected.limit_AMT);   // 문자열 제거 후 숫자만 반환
	
				// iajax 구성
				iajax.clearParam();
				iajax.addParam("CHK_CSRF", random);
				iajax.addParam("REQ_GB", REQ_GB);  // 신청구분 1 전화신청 2 자동대출 3 자동신청가능여부(미적용시전화대출) 4 자동신청 5 온라인햇살론오류로인한신청 6 자동신청서작성
				iajax.addParam("CUST_NO", LNC3003_selected.cust_NO);
				iajax.addParam("GOODS_CD", LNC3003_selected.goods_CD);
				iajax.addParam("REQ_AMT", REQ_AMT);   // 대출신청금액
				iajax.addParam("LIMIT_AMT", LIMIT_AMT);   // 한도금액
				iajax.addParam("BANK_INSP_NO", BANK_INSP_NO_key);   // 저축은행신청번호
				iajax.addParam("SEND_MSG", "Y");   // 계약서작성(전자약정) 페이지인 경우 전문 송신
				iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// 류예샘D 신규대행사(애드게더) 파라미터 적재

				// iajax 연계점 정보 parameter 추가
				fnCommon_partnerData();
				$.ajax({
				    type: "post",
				    url: callURL_requestLNC4004,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json) {
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){
						
							if(REQ_GB == "6"){
					    		var data_list = [
												{ "key" : "view_name", "value" : "loanRenewal4_012" }
												, { "key" : "title", "value" : "대출신청서 작성" }
												];
								
								// renewal4 공통 url 호출
								fnCommon_callUrl( data_list );
							}
							else{
								// "대출 신청이 접수되었습니다."
				    			var data_list = [
				    		             { "key" : "view_name", "value" : "loanRenewal4_013" }
				    		           , { "key" : "title", "value" : "신청결과" }
				    		           , { "key" : "type", "value" : "4 " }   // 1 앱설치하기, 2 온라인서류제출하기 3 기본 4 이어서진행하기 5 대출불가안내
				    				];
	
				    			// renewal4 공통 url 호출
				    			fnCommon_callUrl( data_list );
							}
				    	}else{
				    		
				    		// 대출불가안내
				    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
				    			loanRenewal4_004.fnGoNextSorryStep();
	
				    		}else{
								// 52351 온라인햇살론 52341
								if( !fnCommon_isNull(LNC3003_selected.goods_CD)  &&  (LNC3003_selected.goods_CD == "52351"||LNC3003_selected.goods_CD == "52341") ){
	
									// 온라인햇살론오류로인한신청
						    		loanRenewal4_004.fnGoOnlineSunshineLoanSubmit();
	
								}else{
						    		var errorMsg = json.RESULT_DESC;
									alert(errorMsg.split("<br/>").join("\n"));
								}
				    		}
				    	}
				    },
					error: function(data, textStatus, error) {
					},
					complete: function() {
					}
				});
			}
		},



		/* --------------------------------------------------------------------------------------
			자동대출 호출
			loanRenewal4_004.fnSave_4
		 -------------------------------------------------------------------------------------- */
		fnSave_4 : function(REQ_AMT){

			// 신청구분 1 전화신청 2 자동대출 3 자동신청가능여부 4 자동신청 5 온라인햇살론오류로인한신청 6 자동신청서작성
			var REQ_GB = "";

			// 앱여부
			var isApp_flag = fnCommon_isApp();

			// 자동대출 진행 // 앱 & 건강보험스크래핑제외 여부  or  건보스크래핑 성공
			if( isApp_flag  &&  ( (!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")  ||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y") ) ){

				REQ_GB = "2";  // 신청구분 2 자동대출
			}else{
				REQ_GB = "4";  // 신청구분 4 자동신청
			}


			// 신청금액
			// var req_amt = fnCommon_getOnlyNumber(LNC3003_selected.limit_AMT);   // 문자열 제거 후 숫자만 반환

			// iajax 구성
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("REQ_GB", REQ_GB);  // 신청구분 1 전화신청 2 자동대출 3 자동신청가능여부(미적용시전화대출) 4 자동신청 5 온라인햇살론오류로인한신청 6 자동신청서작성
			iajax.addParam("CUST_NO", LNC3003_selected.cust_NO);
			iajax.addParam("GOODS_CD", LNC3003_selected.goods_CD);
			iajax.addParam("REQ_AMT", REQ_AMT);   // 대출신청금액
			iajax.addParam("BANK_INSP_NO", BANK_INSP_NO_key);   // 저축은행신청번호
			iajax.addParam("SEND_MSG", "Y");   // 계약서작성(전자약정) 페이지인 경우 전문 송신
			iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// 류예샘D 신규대행사(애드게더) 파라미터 적재

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3004,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"  ){

			    		// 신청완료안내 화면에 노출될 영역 지정
			    		var type = "3";

			    		// 신청구분 4 자동신청 이었으면 이어서 진행하기 영역 노출
			    		if(REQ_GB == "4"){
				    		type = "4";
			    		}

		    			// "대출 신청이 접수되었습니다."
		    			var data_list = [
		    		             { "key" : "view_name", "value" : "loanRenewal4_013" }
		    		           , { "key" : "title", "value" : "신청결과" }
		    		           , { "key" : "type", "value" : type }   // type : 1 앱설치하기, 2 온라인서류제출하기 3 기본 4 이어서진행하기 5 대출불가안내
		    				];

		    			// renewal4 공통 url 호출
		    			fnCommon_callUrl( data_list );

			    	}else{

			    		// 대출불가안내
			    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
			    			loanRenewal4_004.fnGoNextSorryStep();

			    		}else{
				    		// 온라인햇살론
							if( !fnCommon_isNull(LNC3003_selected.goods_CD)  &&  LNC3003_selected.goods_CD == "52351" ){

								// 온라인햇살론오류로인한신청
				    			loanRenewal4_004.fnGoOnlineSunshineLoanSubmit();

				    		}else{
					    		var errorMsg = json.RESULT_DESC;
								alert(errorMsg.split("<br/>").join("\n"));
				    		}
			    		}
			    	}
			    },
				error: function(data, textStatus, error) {
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			온라인햇살론오류로인한신청
			loanRenewal4_004.fnGoOnlineSunshineLoanSubmit
		 -------------------------------------------------------------------------------------- */
		fnGoOnlineSunshineLoanSubmit : function(){

			// 신청금액
			var req_amt = fnCommon_getOnlyNumber(LNC3003_selected.limit_AMT);   // 문자열 제거 후 숫자만 반환

			if( bank_INSP_NO == null  || bank_INSP_NO == "" ){
				bank_INSP_NO = BANK_INSP_NO_key;
			}
			
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("CUST_NO", LNC3003_selected.cust_NO);
			iajax.addParam("GOODS_CD", LNC3003_selected.goods_CD);
			iajax.addParam("REQ_AMT", req_amt);
			iajax.addParam("BANK_INSP_NO", bank_INSP_NO);
			iajax.addParam("REQ_GB", "5");   // 5 온라인햇살론오류로인한신청
			iajax.addParam("SEND_MSG", "Y");   // 전문통신여부
			iajax.addParam("TRANC_YN", "0");   // 대환여부 1 대환 0 대환아님 // 자동대출은 대환선택불가
			iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// 류예샘D 신규대행사(애드게더) 파라미터 적재
			
			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3004,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"  ){
			    		alert("온라인햇살론 보증서 발급이 잠시 중단되어, 담당 직원이 확인 후 연락드리겠습니다.");

						// "대출 신청이 접수되었습니다."
						var data_list = [
					             { "key" : "view_name", "value" : "loanRenewal4_013" }
					           , { "key" : "title", "value" : "신청결과" }
					           , { "key" : "type", "value" : "3" }   // type : 1 앱설치하기, 2 온라인서류제출하기 3 기본 4 이어서진행하기 5 대출불가안내
							];

						// renewal4 공통 url 호출
						fnCommon_callUrl( data_list );

			    	}else{
			    		// 대출불가안내
			    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
				    		loanRenewal4_004.fnGoNextSorryStep();

			    		// 오류메세지안내
			    		}else{
				    		var errorMsg = json.RESULT_DESC;
							alert(errorMsg.split("<br/>").join("\n"));
			    		}
			    	}
				},
				error: function(data, textStatus, error) {
					alert(error);
					log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			신청오류건 등록 // 직장인최적상품대출신청 등록
			loanRenewal4_004.fnSave_1
		 -------------------------------------------------------------------------------------- */
		fnSave_1 : function(LNC3003, REQ_AMT, MEMO){

			// 신청금액
			var req_amt = fnCommon_getOnlyNumber(LNC3003_selected.limit_AMT);   // 문자열 제거 후 숫자만 반환

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("REQ_GB", "5");  // 신청구분 1 전화신청 2 자동대출 3 자동신청가능여부(미적용시전화대출) 4 자동신청 5 온라인햇살론오류로인한신청 6 자동신청서작성
			iajax.addParam("CUST_NO", LNC3003_selected.cust_NO);
			iajax.addParam("GOODS_CD", LNC3003_selected.goods_CD);
			iajax.addParam("REQ_AMT", req_amt);   // 대출신청금액
			iajax.addParam("BANK_INSP_NO", BANK_INSP_NO_key);   // 저축은행신청번호
			iajax.addParam("SEND_MSG", "Y");   // 계약서작성(전자약정) 페이지인 경우 전문 송신
			iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// 류예샘D 신규대행사(애드게더) 파라미터 적재
			
			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3004,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if( !fnCommon_isNull(json)){
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"  ){

			    			// 대출불가안내 이동
			    			loanRenewal4_004.fnNext_sorry();

				    	}else{

				    		// 대출불가안내
				    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
					    		loanRenewal4_004.fnGoNextSorryStep();

				    		// 오류메세지안내
				    		}else{
					    		var errorMsg = json.RESULT_DESC;
								alert(errorMsg.split("<br/>").join("\n"));
				    		}
			    		}
			    	}
				},
				error: function(data, textStatus, error){
					alert(error);
					log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			대출불가안내 이동
			loanRenewal4_004.fnNext_sorry
		 -------------------------------------------------------------------------------------- */
		fnNext_sorry : function(){
			var data_list = [
                 { "key" : "view_name", "value" : "" }
                 , { "key" : "view_name_other", "value" : callURL_sorry }
                , { "key" : "title", "value" : "신청결과" }
                ];

			// renewal4 공통 url 호출
			fnCommon_callUrl( data_list );
		},



		/* --------------------------------------------------------------------------------------
			신청완료 안내 이동
			loanRenewal4_004.fnNext_thanks
		 -------------------------------------------------------------------------------------- */
			fnNext_thanks : function( LNC3003, REQ_AMT, AUTOLOAN_PSB_YN ){

				var title = "";
				var goods_CD = "";  // 상품코드

				// 자동대출가능여부
		    	if( !fnCommon_isNull(AUTOLOAN_PSB_YN)  &&  AUTOLOAN_PSB_YN == "1"){
		    		title = "한도확인/대출신청";
		    	}else{
		    		title = "신청결과";
		    	}

		    	if( !fnCommon_isNull(LNC3003) ){
		    		goods_CD = LNC3003.goods_CD;

		    		// 햇살론 직장인
			    	if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52301" ){

			    		// 전자약정 연계하지 않고 상담직원 연계
			    		AUTOLOAN_PSB_YN = "2";

			    		// 앱 여부
			    		var isApp_flag = fnCommon_isApp();
			    		if(!isApp_flag){

				    		// web 이면 수행 // 뭐에 쓰는거지? 일단 있었던거니까 넣자
							FN_EchoCresendo('Y', '15', '', '');
			    		}
			    	}
		    	}

				var data_list = [

	                 // 화면호출 기본값
	                   { "key" : "view_name", "value" : "" }
	                 , { "key" : "view_name_other", "value" : callURL_thanks }
	                 , { "key" : "title", "value" : title }

	                 // parameter
	                 , { "key" : "reqAmt", "value" : REQ_AMT }
	                 , { "key" : "autoloanPsbYn", "value" : AUTOLOAN_PSB_YN }
	                 , { "key" : "custNo", "value" : LNC3003.cust_NO }
	                 , { "key" : "goodsCode", "value" : LNC3003.goods_CD }
	                ];

				// renewal4 공통 url 호출
				fnCommon_callUrl( data_list );
		},



		/* --------------------------------------------------------------------------------------
			대출신청 버튼 클릭시 유효성 체크
			loanRenewal4_004.fnSend_detail_1_validation
		 -------------------------------------------------------------------------------------- */
		fnSend_detail_1_validation : function( LNC3003, REQ_AMT, MEMO, TRANC_LIMIT_flag ){
			var limit_AMT_number = 0;  // 사전한도
			var goods_CD = "";  // 상품코드
			var REQ_AMT_number = 0;  // 신청금액 입력값
			var tranc_LIMIT_number = 0;  // 대환한도

			if( !fnCommon_isNull(REQ_AMT) ){
				REQ_AMT_number = Number(REQ_AMT);
			}

			// 선택된 대출상품값
			if( !fnCommon_isNull(LNC3003) ){
				goods_CD = LNC3003.goods_CD;

				// 사전한도
				var limit_AMT = LNC3003.limit_AMT;
				if( !fnCommon_isNull(limit_AMT) ){
					limit_AMT_number = Number(limit_AMT);
					if(limit_AMT_number <= 0){
						alert("선택하신 상품은 신청가능한도가 없습니다.");
						return false;
					}

					// 비교를 위해 만원단위로 변환
					limit_AMT_number = limit_AMT_number * 10000;
				}

				// 대환한도
				var tranc_LIMIT = LNC3003.tranc_LIMIT;
				if( !fnCommon_isNull(tranc_LIMIT) ){
					tranc_LIMIT_number = Number(tranc_LIMIT);

					// 비교를 위해 만원단위로 변환
					tranc_LIMIT_number = tranc_LIMIT_number * 10000;
				}
			}

			// 숫자만 반환받은 대출신청금액   // var numPattern = /^\d*$/;
			if( fnCommon_isNull(REQ_AMT) ){
				alert("대출신청금액을 입력해주세요.");
				return false;
			}

			// 입력된 신청금액이 사전한도를 넘으면 불가
			// 대환한도 선택일땐 대환한도
			if( !fnCommon_isNull(TRANC_LIMIT_flag, "boolean") ){
				if((tranc_LIMIT_number) < REQ_AMT_number){
					alert("선택하신 상품의 예상한도를 초과하셨습니다.");
					return false;
				}
			}else{
				if(limit_AMT_number < REQ_AMT_number){
					alert("선택하신 상품의 예상한도를 초과하셨습니다.");
					return false;
				}
			}

			// 사잇돌2(표준) or 사잇돌2(간편소액)
			if( !fnCommon_isNull(goods_CD)  &&  (goods_CD == "52346" || goods_CD == "52347") ){
				if( Number(REQ_AMT) % 100000 != 0){
					alert("대출신청금액은 10만원 단위로 입력해주세요.");
					return false;
				}
			}

			// 최소 신청금액 조건
			// 햇살론(52301, 52351) : 500
			// 참신한 중금리, 직장인(52320), 허그론(52323), 사잇돌2(표준)(52346) : 300
			// 참신한 자동대출(52350), 사잇돌2(간편소액)(52347) 100

			return true;
		},



		/* --------------------------------------------------------------------------------------
			삭제 버튼 클릭시 상세영역 삭제
			loanRenewal4_004.fnDelete_detail
		 -------------------------------------------------------------------------------------- */
		fnDelete_detail : function(e){

			// 상세보기 값 모두 없애기
			$("div[name='detail_box']").hide();
			$("div[name='detail_box']").html("");

			// 선택효과 없애기
			$(".limit_select").removeClass("choice");
			// $("div[name='list_div']").removeClass("choice");
		}



	};   // var loanRenewal4_004 = {








	/* --------------------------------------------------------------------------------------
		보이스피싱 예방 안내 확인 화면
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_005 = {

		/* --------------------------------------------------------------------------------------
			기본수행
			loanRenewal4_005.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// 오늘일자
			var today = new Date();
			var yyyy = today.getFullYear();
			var mm = today.getMonth() + 1;
			var dd = today.getDate();

			if(mm < 10){
				mm = "0" + mm;
			}
			if(dd < 10){
				dd = "0" + dd;
			}

			// *숫자형태이므로 문자로 변환필수  ex) 일자 : 2018년 00월 00일
			var today_format = "일자 : " + yyyy + "년 " + mm + "월 " + dd + "일";
			$("#today_format").html( today_format );

			// 고객정보 조회
			loanRenewal4_005.fnSearch_1();
		},



		/* --------------------------------------------------------------------------------------
			고객정보 조회
			loanRenewal4_005.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function(){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_005_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

						// 고객명 // 로그인 안한경우 이름 노출 못함
						var custNm = json.custNm;
						if( !fnCommon_isNull(custNm) ){
							$("#custNm").html("성명 : " + custNm);
							$("#custNm").show();
						}

						REG_KIND = json.REG_KIND;   // 전자서명상태(자서접수처 구분)
						ST_CD = json.ST_CD;   // 진행상태
						SCRP_NHIS_EXP = json.SCRP_NHIS_EXP;   // 건강보험스크래핑 제외 여부
						SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;   // 건강보험스크래핑 성공 여부
						SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;   // 건보스크래핑 장애 여부
						YOUTH_GUIDE_YN = json.YOUTH_GUIDE_YN;   // 공적지원제도 과거 동의 여부
						youth_age_yn = json.youth_age_yn;   // 청년 여부
						ONLINE_DOC_G = json.ONLINE_DOC_G;

			    	}else{
						//alert("고객정보 조회에 실패하였습니다.");
			    	}
			    },
				error: function(data, textStatus, error){
					//alert("고객정보 조회에 실패하였습니다.");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			확인함 체크박스 클릭시 이벤트
			loanRenewal4_005.fnClickAgree
		 -------------------------------------------------------------------------------------- */
		fnClickAgree : function(e){
			var next_yn_flag = false;

			// 체크박스 동의시 확인버튼 노출
			var agree_1 = $("#agree_1");
			if( !fnCommon_isNull(agree_1)  &&  !fnCommon_isNull(agree_1.length)  &&  agree_1.length > 0 ){
				var checked = agree_1[0].checked;
				if( checked ){
					next_yn_flag = true;
				}
			}

			if(next_yn_flag){
				$("#btn_next").show();
				$("#btn_next").focus();
		        $('body,html').animate({scrollTop: $("#btn_next").offset().top},500);   // 스크롤 이동
			}else{
				$("#btn_next").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			다음 버튼 클릭 - 보이스피싱/청년대출 동의여부값 보관
			loanRenewal4_005.fnNext_1
		 -------------------------------------------------------------------------------------- */
		fnNext_1 : function(){
			// 모바일 5차개선 - 취약점 점검 후 조치사항
			// 확인함 체크 여부 확인
			/*
			if(!$("#agree_1").prop("checked")) {
				alert("상기보이스피싱 예방문진 내용을 읽어보고 해상사항이 없음을 확인해 주세요.");
				return;
			}
			*/


			// 고객기본정보 조회
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);

			iajax.addParam("VOICE_LOAN_YN", "Y");   // 보이스피싱문진표 안내여부
			// iajax.addParam("YOUTH_GUIDE_YN", "Y");   // 청년대출 안내여부

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_005_02,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

						// 5062  보이스피싱
						try{
							Emf.convCall(797, 5062, 0, 0, 0);
						}catch(err){ }
						setTimeout(function(){
							// 화면분기 호출
							loanRenewal4_005.fnNext_2();
						},100);
						// 화면분기 호출
						//loanRenewal4_005.fnNext_2();

			    	}else{
						alert("동의여부값 보관에 실패하였습니다.");
			    	}
			    },
				error: function(data, textStatus, error) {
					alert(error);
					// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			화면분기 호출
			loanRenewal4_005.fnNext_2
		 -------------------------------------------------------------------------------------- */
		fnNext_2 : function(){

			var data_list = null;

			// 이어하기 진입한 경우
			if( !fnCommon_isNull(appCall_yn)  &&  appCall_yn == "Y" ){

				// 115 자동신청전환 & 진행상태 1
				if( !fnCommon_isNull(REG_KIND)  &&  REG_KIND == "115"  &&  !fnCommon_isNull(ST_CD)  &&  ST_CD == "1" ){
				
					
					if( "N" == SCRP_NHIS_EXP && "0" == ONLINE_DOC_G ){

						data_list = [
					             { "key" : "view_name", "value" : "loanRenewal4_004" }
					           , { "key" : "title", "value" : "한도조회결과" }
					           , { "key" : "beforeview", "value" : "loanRenewal4_005" }  // 한도조회 화면에서 오류 발생시 되돌아갈 화면id
							];
																
					}else if( (!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")
							||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y") ){
						// 건강보험스크래핑제외 여부  or  이미 스크래핑 성공했으면
						data_list = [
					             { "key" : "view_name", "value" : "loanRenewal4_004" }
					           , { "key" : "title", "value" : "한도조회결과" }
					           , { "key" : "beforeview", "value" : "loanRenewal4_005" }  // 한도조회 화면에서 오류 발생시 되돌아갈 화면id
							];

					}else{
						// 건보스크래핑장애 아니면
						if( fnCommon_isNull(SCRP_NHIS_ERROR_YN)  ||  SCRP_NHIS_ERROR_YN != "Y" ){

							// 온라인서류제출(스크래핑) - 한도조회 화면 호출
							data_list = [
						             { "key" : "view_name", "value" : "loanRenewal4_002" }
						           , { "key" : "title", "value" : "개인정보입력" }
								];

						// 건보스크래핑 장애인 경우 장애 안내 화면으로 변경
						}else{
							data_list = [
						             { "key" : "view_name", "value" : "loanRenewal4_016" }
						           , { "key" : "title", "value" : "진행불가 안내" }
								];
						}
					}

					// 공적지원제도 과거 동의한적 없고
					if( fnCommon_isNull(YOUTH_GUIDE_YN)  ||  YOUTH_GUIDE_YN != "Y" ){

						// 청년이면
						if( !fnCommon_isNull(youth_age_yn)  &&  youth_age_yn == "Y" ){
							data_list = [
						             { "key" : "view_name", "value" : "loanRenewal4_006" }
						           , { "key" : "title", "value" : "개인정보입력" }
								];
						}
					}
				}

				if( data_list == null ){
					alert("이어서 진행 가능한 상태가 아닙니다.\n상담센터 (☎1800-3651)로 문의하세요.");
					fnCommon_goHome();
				}


			// 신규 신청 진입한 경우
			}else{

				// 사전체크리스트/약관동의/본인인증 통합화면 호출
				data_list = [
			             { "key" : "view_name", "value" : "loanRenewal4_001" }
			           , { "key" : "title", "value" : "개인정보입력" }
					];
			}

			// renewal4 공통 url 호출
			fnCommon_callUrl( data_list );
		}

	};   // var loanRenewal4_005 = {






	/* --------------------------------------------------------------------------------------
		공적지원제도 안내 화면
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_006 = {

		/* --------------------------------------------------------------------------------------
			기본수행
			loanRenewal4_006.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// 오늘일자
			var today = new Date();
			var yyyy = today.getFullYear();
			var mm = today.getMonth() + 1;
			var dd = today.getDate();

			if(mm < 10){
				mm = "0" + mm;
			}
			if(dd < 10){
				dd = "0" + dd;
			}

			// *숫자형태이므로 문자로 변환필수  ex) 일자 : 2018년 00월 00일
			var today_format = "일자 : " + yyyy + "년 " + mm + "월 " + dd + "일";
			$("#today_format").html( today_format );

			// 고객기본정보 조회
			loanRenewal4_006.fnSearch_1();
		},



		/* --------------------------------------------------------------------------------------
			고객기본정보 조회
			loanRenewal4_006.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function(){

			// 고객기본정보 조회
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

						// 인증서 본인인증 여부
						var isXecureAuth_string = json.isXecureAuth;
						if( !fnCommon_isNull(isXecureAuth_string)  &&  isXecureAuth_string == "Y" ){
							isXecureAuth = true;
						}

						// 건보스크래핑장애여부
						SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;

						// 사전체크리스트에서 선택했던 직업정보 // 직업 1 직장인(4대보험가입) 2 개인사업자 3 기타사업소득자인적용역제공자 4 연금소득자
						qna01 = json.qna01;

						REG_KIND = json.REG_KIND;  // 전자서명상태(자서접수처 구분)
						ST_CD = json.ST_CD;  // 진행상태
						SHINHAN_FAN_YN = json.SHINHAN_FAN_YN;  // 신나는한판여부
						CERT_HNDNO = json.CERT_HNDNO;   // 인증휴대폰번호
						ONLINE_DOC_C = json.ONLINE_DOC_C;   // 민원24 제출대상 여부
						ONLINE_DOC_D = json.ONLINE_DOC_D;   // 건보+민원24 제출대상 여부
						GOODS_CD_LNC3005 = json.GOODS_CD;   // 상품코드

						SCRP_NHIS_EXP = json.SCRP_NHIS_EXP;   // 건강보험스크래핑제외 여부
						SCRP_MINWON24_EXP = json.SCRP_MINWON24_EXP;   // 민원24스크래핑제외 여부
						SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;   // 건강보험 스크래핑 성공여부


						// 고객명 // 로그인 안한경우 이름 노출 못함
						var custNm = json.custNm;
						if( !fnCommon_isNull(custNm) ){
							$("#custNm").html("성명 : " + custNm);
							$("#custNm").show();
						}

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					alert(error);
					// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			확인함 체크박스 클릭시 이벤트
			loanRenewal4_006.fnClickAgree
		 -------------------------------------------------------------------------------------- */
		fnClickAgree : function(e){
			var next_yn_flag = false;
			$("#agree_1").prop("checked", true);

			// 체크박스 동의시 확인버튼 노출
			var agree_1 = $("#agree_1");
			if( !fnCommon_isNull(agree_1)  &&  !fnCommon_isNull(agree_1.length)  &&  agree_1.length > 0 ){
				var checked = agree_1[0].checked;
				if( checked ){
					next_yn_flag = true;
				}
			}

			if(next_yn_flag){
				$("#btn_next").show();
				$("#btn_next").focus();
		        $('body,html').animate({scrollTop: $("#btn_next").offset().top},500);   // 스크롤 이동

				// 3초후 자동 다음화면 이동
				setTimeout(function(){
					loanRenewal4_006.fnNext_1();
				} , 1000);
			}else{
				$("#btn_next").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			다음 버튼 클릭 - 보이스피싱/청년대출 동의여부값 보관
			loanRenewal4_006.fnNext_1
		 -------------------------------------------------------------------------------------- */
		fnNext_1 : function(){

			// 고객기본정보 조회
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);

			// iajax.addParam("VOICE_LOAN_YN", "Y");   // 보이스피싱문진표 안내여부
			iajax.addParam("YOUTH_GUIDE_YN", "Y");   // 청년대출 안내여부

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_005_02,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

						// 5064  지원대상자 - 청년대출
						try{
							Emf.convCall(797, 5064, 0, 0, 0);
						}catch (err) { }
						setTimeout(function(){
							// 화면 이동
							loanRenewal4_006.fnNext_2();
						},100);

						// 화면 이동
						//loanRenewal4_006.fnNext_2();

			    	}else{
						alert("동의여부값 보관에 실패하였습니다.");
			    	}
			    },
				error: function(data, textStatus, error) {
					alert(error);
					// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			화면 이동
			loanRenewal4_006.fnNext_2
		 -------------------------------------------------------------------------------------- */
		fnNext_2 : function(){

			var view_name = "loanRenewal4_012";
			var title = "대출신청서 작성";

			// 이어하기로 진입한 경우
			// 116 자동신청서작성  &  진행상태 1  &  신나는한판 1
			if( !fnCommon_isNull(REG_KIND)  &&  REG_KIND == "116"
					&&  !fnCommon_isNull(ST_CD)  &&  ST_CD == "1"
					&&  !fnCommon_isNull(SHINHAN_FAN_YN)  &&  (SHINHAN_FAN_YN == "1" || SHINHAN_FAN_YN == "Y" )){

				// 연락처 없으면 휴대폰인증 이력 없으므로 추가본인인증 화면 호출
				if(fnCommon_isNull(CERT_HNDNO)){
					view_name = "loanRenewal4_008";
					title = "추가 본인인증";

				}else{


					view_name = "loanRenewal4_012";
					title = "대출신청서 작성";

					/* 202002 Minwon24 영원히 삭제
					// 52351 온라인햇살론
					if( !fnCommon_isNull(GOODS_CD_LNC3005)  &&  GOODS_CD_LNC3005 == "52351" ){

						// 온라인서류제출(스크래핑) 등본교부 화면 호출
						view_name = "loanRenewal4_007";
						title = "개인정보입력";

					}else{

	    				// 대출신청서작성 화면 호출
						// 온라인서류제출(스크래핑) 등본교부 화면 호출
						view_name = "loanRenewal4_012";
						title = "대출신청서 작성";
					}
					*/
				}

				var data_list = [
			             { "key" : "view_name", "value" : view_name }
			           , { "key" : "title", "value" : title }
					];

				// renewal4 공통 url 호출
				fnCommon_callUrl( data_list );


			}else{

				// 건강보험스크래핑제외 여부  or  스크래핑 성공 여부
				if( (!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")
					||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y")){

					// 대출신청한도조회 화면 호출
					var data_list = [
				             { "key" : "view_name", "value" : "loanRenewal4_004" }
				           , { "key" : "title", "value" : "한도조회결과" }
				           , { "key" : "beforeview", "value" : "loanRenewal4_006" }  // 한도조회 화면에서 오류 발생시 되돌아갈 화면id
						];

					// renewal4 공통 url 호출
					fnCommon_callUrl( data_list );

				}else{

					// 앱여부 // 스크래핑 화면 이동
					var isApp_flag = fnCommon_isApp();

					var view_name = "";
					var title = "";

					// 전자서명상태(자서접수처 구분) 115 자동신청전환 상태일때는 뺑뺑이 돌지않게 무조건 스크래핑으로
					if( !fnCommon_isNull(REG_KIND)  &&  REG_KIND == "115" ){

						// 앱 & 건보스크래핑장애 아닐때
						if( isApp_flag  &&  (fnCommon_isNull(SCRP_NHIS_ERROR_YN)  ||  SCRP_NHIS_ERROR_YN != "Y") ){

							// 온라인서류제출(스크래핑) - 한도조회 화면 호출
							view_name = "loanRenewal4_002";
							title = "개인정보입력";

						}else{
							alert("이어서 진행 가능한 상태가 아닙니다.\n상담센터 (☎1800-3651)로 문의하세요.");
							return false;
						}

					}else{

						// 직장정보 직접입력 화면
						view_name = "loanRenewal4_003";
						title = "개인정보입력";

						// 앱  &  인증서로 본인인증  &  건보스크래핑장애 아닐때
						if( isApp_flag  &&  !fnCommon_isNull(isXecureAuth)  &&  (isXecureAuth == "true"  ||  isXecureAuth == true  ||  isXecureAuth == "Y")
							&&  (fnCommon_isNull(SCRP_NHIS_ERROR_YN)  ||  SCRP_NHIS_ERROR_YN != "Y") ){

							// 직장인(4대보험 가입 필수)
							if( !fnCommon_isNull(qna01)  &&  qna01 == "1" ){

								// 온라인서류제출(스크래핑) - 한도조회 화면 호출
								view_name = "loanRenewal4_002";
								title = "개인정보입력";
							}
						}
					}

					var data_list = [
				             { "key" : "view_name", "value" : view_name }
				           , { "key" : "title", "value" : title }
						];

					// renewal4 공통 url 호출
					fnCommon_callUrl( data_list );
				}
			}
		}

	};   // var loanRenewal4_006 = {








	/* --------------------------------------------------------------------------------------
		온라인서류제출(스크래핑) 등본교부 화면
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_007 = {

		/* --------------------------------------------------------------------------------------
			기본수행
			loanRenewal4_007.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// 보안숫자 재생성
			loanRenewal4_007.fnRefreshImage();

			// 3초 후 다시 스크래핑 내역 조회
			setTimeout(function(){
				$("#minWon24HomeAddr_btn").css("top", "inherit");
				$("#minWon24HomeAddr_btn").show();
			} , 300);

			// 고객정보, 동의정보 보관값 추출
			loanRenewal4_007.fnSearch_1();
		},



		/* --------------------------------------------------------------------------------------
			상세주소 입력시 글자수 제한
			loanRenewal4_007.fnKeyup_minWon24HomeAddr2
		 -------------------------------------------------------------------------------------- */
		fnKeyup_minWon24HomeAddr2 : function(e){
			var limit = 100;
			var value = e.target.value;

			// byte 제한만큼 잘라내기
			value = fnCommon_cutByte(limit, value);
			$("#minWon24HomeAddr2").val(value);
		},



		/* --------------------------------------------------------------------------------------
			고객정보, 동의정보 보관값
			loanRenewal4_007.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function(){

			iajax.clearParam();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_002_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"){
			    		custNm = json.custNm;
			    		residNo = json.residNo;
			    		isXecureAuth = json.isXecureAuth;  // 본인인증 (인증서) 여부
			    		SCRAP_CERT_PASS_YN = json.SCRAP_CERT_PASS_YN;
			    		isPersonInfoReq = json.isPersonInfoReq;  // 개인정보징구대상
			    		loanRenewal4_014_START_YN = json.loanRenewal4_014_START_YN;  // 온라인서류제출 메뉴로 접근여부
					}
			    },
				error: function(data, textStatus, error){
					alert(error);
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
		        }
			});

		},

		/* --------------------------------------------------------------------------------------
			스크래핑 요청시 유효성체크
			loanRenewal4_007.fnScraping_1_validation
		 -------------------------------------------------------------------------------------- */
		fnScraping_1_validation : function(){

			// 팝업에서 내려받은 주소값
			var minWon24Addr = $("#minWon24Addr").val();
	    	if( fnCommon_isNull(minWon24Addr) ){
				alert("주소를 검색해주세요.");
				return false;
	    	}
			var minWon24HomeAddr2 = $("#minWon24HomeAddr2").val();
	    	if( fnCommon_isNull(minWon24HomeAddr2) ){
				alert("상세주소를 입력해주세요.");
				return false;
	    	}

	    	// 이미지 보안숫자
			var secMsg = $("#secMsg").val();
	    	if( fnCommon_isNull(secMsg) ){
				alert("보안숫자를 입력해주세요.");
				return false;
	    	}
	    	if( secMsg.length != 6 ){
				alert("보안숫자를 6자리로 입력해주세요.");
				return false;
	    	}

	    	return true;
		},



		/* --------------------------------------------------------------------------------------
			스크래핑 요청
			loanRenewal4_007.fnScraping_1
		 -------------------------------------------------------------------------------------- */
		fnScraping_1 : function(){

			// 앱 여부 // 앱이 아닌 경우 스크래핑 화면으로 안보낼거지만 혹시 모르니까!
			var isApp_flag = fnCommon_isApp();
			if(!isApp_flag){
				alert("스크래핑은 app에서만 가능합니다. app으로 다시 접속하시기 바랍니다.");
				return false;
			}

			// 스크래핑 요청시 유효성체크
			var result = loanRenewal4_007.fnScraping_1_validation();
			if(!result){
				return false;
			}

			// 인증서 호출 스크래핑 native method
			var method = "certListForScraping";

			// 인증서 미호출 스크래핑 *본인인증시 선택한 인증서를 사용한다.
			// var method = "noCertListForScraping";

			// 1 민원24   2 NPS(국민연금)   3 NHIS(국민건강)  *20181120 국민연금 미사용하기로 업무팀(최형진) 결정
			var FOR_TYPE = "1";

			// 본인인증 (인증서) 여부  // 인증서로 본인인증 후 접근한 경우
			if( !fnCommon_isNull(isXecureAuth)  &&  (isXecureAuth == "true" || isXecureAuth == true) ){
				method = "noCertListForScraping";   // 인증서 미호출 스크래핑 *앱에 본인인증시 보관된 인증서를 사용
			}


			$.ajax({
			    type: "post",
			    url: callURL_noopForMobileWeb,   // 세션 타임 추가
			    dataType: "json",
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
			    		var params = {
			    				pluginId: "slCert",
			    				method: method,
			    				params: {
			    					"data": {
			    						"CUST_NM": fnCommon_deleteNull(custNm),
			    						"BANK_INSP_NO": "SERVER_VALUE",
			    						"SSN": residNo,
			    						"title": "민원24 등본교부",
			    						"REV_ACT_MARK": "2",
			    						"TIME_OUT": "180000",
			    						"MAX_COUNT": "2",
			    						"FOR_TYPE": FOR_TYPE,
			    						"SUNSHINE_YN": "",   // 햇살론 동의 여부 - 민원24 스크래핑 여부 // 필요없는값임

			    						"ORG_ADDR1": $("#orgAddr1").val(),
			    						"ORG_ADDR2": $("#orgAddr2").val().split(' ')[0],
			    						"ADDR": $("#minWon24Addr").val(),
			    						"ADDR_CD": $("#minWon24AddrCd1").val(),
			    						"ZIP_CD": $("#minWon24ZipCd").val(),
			    						"SEC_MSG": $("#secMsg").val(),   // 이미지숫자

			    						// 건강보험 필요항목
			    						"START_DATE": "",
			    						"END_DATE": "",
			    						"START_DATE1": "",
			    						"END_DATE1": "",
			    						"START_DATE2": "",
			    						"END_DATE2": "",
			    						"START_DATE3": "",
			    						"END_DATE3": "",
			    						// 모바일 5차개선 - 국세청 스크래핑 항목 추가
			    						"START_YEAR": "",
			    						"END_YEAR": "",
			    						"START_MONTH": "",
			    						"END_MONTH": "",
			    						"HOMETAX_TYPE": "",
			    						"RGST_NO":"",
			    						"ADDR_YN":"",
			    						"SSN_YN":""
			    					}
			    			    },
			    				callBack: function(isOK, json) {
			    					/*
			    					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.session_time_add_success_yn)  &&  json.session_time_add_success_yn == "N" ){
			    						alert("세션 타임아웃 연장에 실패했습니다.\n로그인 후 이용하시기 바랍니다.");
			    					}
			    					*/

		    						// 스크래핑 요청결과 조회
		    						loanRenewal4_007.fnScraping_2( json );
			    				}
			    			};
			    		SDSFrameWork.plugin.execute(params);



			    	}else{
			    		alert("장시간 서비스 이용을 하지않아 고객님의 개인정보를 보호하기 위하여 자동으로 본인인증이 취소되었습니다.\n확인을 누르시면 메인화면으로 이동합니다.");
		    			fnCommon_goHome();
			    	}
			    },
				error: function(data, textStatus, error) {
					alert(error);
	    			fnCommon_goHome();
				}
			});

		},



		/* --------------------------------------------------------------------------------------
			스크래핑 요청결과 조회
			loanRenewal4_007.fnScraping_2
		 -------------------------------------------------------------------------------------- */
		fnScraping_2 : function( res ){

			// Y 실행성공 N 미실행 E 실행했지만 오류
			// 민원24 스크래핑 여부
			var SCRP_MINWON24 = "Y";

			// callback 에서 사용할 스크래핑 요청 당시 성공여부 결과값
			var res_result_flag = false;

			//alert( "fnScraping_2 res.result[" + res.result + "]\n" + "res.message = [" + res.message + "]" );

			if( !fnCommon_isNull(res)  &&  !fnCommon_isNull(res.result)  &&  res.result == "true" ){
				res_result_flag = true;
				loanRenewal4_007.fnScraping_3(res_result_flag, SCRP_MINWON24);

			}else{

				// 오류메세지 체크해서 에러값 결정
				var message = res.message;
				if( !fnCommon_isNull(message)  &&  message.indexOf("민원24") > -1 ){
					SCRP_MINWON24 = "E";
				}

				// 스크래핑 타임아웃 처리
				loanRenewal4_007.fnScraping_timeout( "", "", res.message );  // 통신이 원활하지 않습니다.

				// 3초 후 다시 스크래핑 응답코드 내역 조회
				setTimeout(function(){
					res_reSearch = loanRenewal4_007.fnScraping_reSearch(res.message, SCRP_MINWON24);
				} , 2000);

				return true;
			}
		},



		/* --------------------------------------------------------------------------------------
			스크래핑 요청결과 조회
			loanRenewal4_007.fnScraping_3
		 -------------------------------------------------------------------------------------- */
		fnScraping_3 : function( res_result_flag, SCRP_MINWON24 ){

			iajax.clearParam();
			iajax.addParam("PROC_GB", "1");   // 1 한도조회스크래핑 2 온라인서류제출스크래핑
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("SEND_MSG", "Y");
			// iajax.addParam("SCRP_NHIS", SCRP_NHIS);
			iajax.addParam("SCRP_MINWON24", SCRP_MINWON24);

			// 개인정보징구대상
			if( !fnCommon_isNull(isPersonInfoReq, "boolean")){
				iajax.addParam("LOAN_2A", "1");
			}

			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3002_NEW,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if( !fnCommon_isNull( json )  &&  !fnCommon_isNull( json.RESULT_NO )  &&  json.RESULT_NO == "0000" ){
		    			// 스크래핑 요청 당시 성공여부 결과값
		    			if(res_result_flag){
		    				alert("온라인 서류 제출이\n완료되었습니다.");

		    				// 민원24 주소 세션 보관
		    				loanRenewal4_007.fnSave_1();

		    			}else{
		    				alert("등본제출이 실패하여 대출실행전 별도로 제출해주셔야 합니다. 신청절차완료 후 담당자가 연락드릴예정 입니다. 다음단계를 계속 진행해주세요.");

		    				$("#bak_view01").show();
		    				$("#bak_view02").show();
		    				$("#bak_view03").show();
		    				$("#btn_next").hide();

		    				// 대출신청서작성 화면 호출
				    		var data_list = [
	    		                 	{ "key" : "view_name", "value" : "loanRenewal4_012" }
	    		                  , { "key" : "title", "value" : "대출신청서 작성" }
			                    ];

							// renewal4 공통 url 호출
							fnCommon_callUrl( data_list );

		    			}

			    	}else{
			    		var errorMsg = json.RESULT_DESC;
			    		alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					alert(error);
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
		        }
			});
		},



		/* --------------------------------------------------------------------------------------
			민원24 주소 세션 보관
			loanRenewal4_007.fnSave_1
		 -------------------------------------------------------------------------------------- */
		fnSave_1 : function(){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("ORG_ADDR1", $("#orgAddr1").val() );
			iajax.addParam("ORG_ADDR2", $("#orgAddr2").val() );
			iajax.addParam("ORG_ADDR3", $("#orgAddr3").val() );
			iajax.addParam("MINWON24_ZIPCD", $("#minWon24ZipCd").val() );
			iajax.addParam("MINWON24_ADDR1", $("#minWon24Addr1").val() );
			iajax.addParam("MINWON24_ADDR2", $("#minWon24Addr2").val() );
			iajax.addParam("MINWON24_ADDR", $("#minWon24Addr").val() );
			iajax.addParam("MINWON24_ADDRCD1", $("#minWon24AddrCd1").val() );
			iajax.addParam("MINWON24_ADDRCD2", $("#minWon24AddrCd2").val() );
			iajax.addParam("MINWON24_ADDRCD3", $("#minWon24AddrCd3").val() );
			iajax.addParam("MINWON24_ADDRCD4", $("#minWon24AddrCd4").val() );
			iajax.addParam("MINWON24_HOMEADDR", $("#minWon24HomeAddr").val() );
			iajax.addParam("MINWON24_HOMEADDR2", $("#minWon24HomeAddr2").val() );
			iajax.addParam("MINWON24_SECMSG", $("#secMsg").val() );   // 이미지 입력값
			iajax.addParam("SCRP_MINWON24_SUCCESS_YN", "Y" );   // 민원24 스크래핑 성공여부
			iajax.addParam("SCRAP_CERT_PASS_YN", "Y" );   // 스크래핑에 성공한 경우 세션이 살아있는한 스크래핑 이용시 인증서 재입력 PASS

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_007_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if( !fnCommon_isNull( json )  &&  !fnCommon_isNull( json.RESULT_NO )  &&  json.RESULT_NO == "0000" ){

						// 온라인서류제출 메뉴로 접근여부
						if( !fnCommon_isNull(loanRenewal4_014_START_YN)  &&  loanRenewal4_014_START_YN == "Y"){
			    			fnCommon_goHome();

						}else{

		    				$("#bak_view01").show();
		    				$("#bak_view02").show();
		    				$("#bak_view03").show();
		    				$("#btn_next").hide();

		    				// 대출신청서작성 화면 호출
				    		var data_list = [
	    		                 	{ "key" : "view_name", "value" : "loanRenewal4_012" }
	    		                  , { "key" : "title", "value" : "대출신청서 작성" }
			                    ];

							// renewal4 공통 url 호출
							fnCommon_callUrl( data_list );
						}

			    	}else{
			    		alert("민원24 주소처리에 실패하였습니다.");
			    	}
			    },
				error: function(data, textStatus, error){
		    		alert("민원24 주소처리에 실패하였습니다.");
				},
				complete: function() {
		        }
			});
		},



		/* --------------------------------------------------------------------------------------
			스크래핑 타임아웃 처리
			loanRenewal4_007.fnScraping_timeout
		 -------------------------------------------------------------------------------------- */
		fnScraping_timeout : function( scrp_nm, job_nm, msg ){
			var timeout_msg = "통신이 원활하지 않습니다.";
			if (msg != timeout_msg) {
				return;
			}

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("SCRT_NM", fnCommon_deleteNull(scrp_nm));
			iajax.addParam("JOB_NM", job_nm);
			iajax.addParam("RES_MSG", msg);

			$.ajax({
			    type: "post",
			    url: callURL_insertScrtHistTimeout,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    },
		    	error: function(data, textStatus, error) {
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			다시 스크래핑 내역 조회
			loanRenewal4_007.fnScraping_reSearch
			return true : 정상 에러로 계정계에 정상으로 보냄
			return false : 비정상 에러로 계정계에 비정상으로 보냄
			예외 : 로그인 인경우 화면 유지 후 재 스크래핑 유도
			       아래의 경우 화면 유지후 재 스크래핑 유도
			       	8000C311	시도/시군구 입력이 필요합니다. 확인 후 조회하시기 바랍니다.
					8000C312	잘못된 지역_시도입니다. 확인 후 다시 거래하시기 바랍니다.
					8000C322	잘못된 지역_시군구입니다. 확인 후 다시 거래하시기 바랍니다.
					8000C423	잘못된 주소입니다. 확인 후 다시 거래하시기 바랍니다.
		 -------------------------------------------------------------------------------------- */
		fnScraping_reSearch : function( msg, SCRP_MINWON24 ){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("SCRT_NM", "MinWon");  // 민원24

			$.ajax({
			    type: "post",
			    url: callURL_getScrtResCd,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){

			    	///////////////////////////////////////////////////////////////////////////////////////
			    	// 오류코드 : 8000C616 포함 2건 => 리로드(보안숫자)
			    	// 오류코드 : 8000C311 포함 5건 => 리로드(주소검색)
			    	// 그외 로그인관련오류 => 리로드(로그인)
			    	// ==>
			    	// 지정오류코드 정상(0)       => 스크래핑 요청결과 조회(3002) "Y"
			    	// 지정오류코드 정상인오류(1) => 스크래핑 요청결과 조회(3002) "A"
			    	// 그외 		오류(9)       => 오류메세지 후 스크래핑 요청결과 조회(3002) "E"

		    		if( json.DATA.RES_CODE == "8000C616" || json.DATA.RES_CODE == '80003391' ){

		    			// 본인인증 (인증서) 여부  // 인증서로 본인인증 후 접근한 경우
		    			if( !fnCommon_isNull(SCRAP_CERT_PASS_YN)  &&  SCRAP_CERT_PASS_YN == "Y" ){
		    				// 20191226
		    				alert("보안숫자가 잘못 입력되었습니다.\n홈으로 이동하여 [통합 한도조회]눌러 휴대폰 본인확인 후 재진행 부탁드립니다.\n\n"  + msg.split("<br/>").join("\n"));

		    				fnCommon_goHome();
		    				return false;
		    			}


		    			alert("보안숫자가 잘못 입력되었습니다.\n확인 후 다시 진행 부탁드리겠습니다.\n\n"  + msg.split("<br/>").join("\n"));

			    		var data_list = [
			    		                 	{ "key" : "view_name", "value" : "loanRenewal4_007" }
			    		                  , { "key" : "title", "value" : "개인정보입력" }
					                    ];

									// 리로드
			    		fnCommon_callUrl( data_list );
			    		return false;

		    		}else if(json.DATA.RES_CODE == '8000C311' || json.DATA.RES_CODE == '8000C312' ||
			    				 json.DATA.RES_CODE == '8000C322' || json.DATA.RES_CODE == '8000C423' ||
			    				 json.DATA.RES_CODE == '8000C019' ) {


		    			// 본인인증 (인증서) 여부  // 인증서로 본인인증 후 접근한 경우
		    			if( !fnCommon_isNull(SCRAP_CERT_PASS_YN)  &&  SCRAP_CERT_PASS_YN == "Y" ){
		    				// 20191226
		    				alert("주민등록등본상 주소지가 아닙니다.\n홈으로 이동하여 [통합 한도조회]눌러 휴대폰 본인확인 후 재진행 부탁드립니다.\n\n"  + msg.split("<br/>").join("\n"));

		    				fnCommon_goHome();
		    				return false;
		    			}

		    			alert("주민등록등본상 주소지가 아닙니다.\n주민등록등본상 주소지 재확인 후, 정확히 입력해주세요.\n\n"  + msg.split("<br/>").join("\n"));

			    		var data_list = [
			    		                 	{ "key" : "view_name", "value" : "loanRenewal4_007" }
			    		                  , { "key" : "title", "value" : "개인정보입력" }
					                    ];

									// 리로드
			    		fnCommon_callUrl( data_list );
			    		return false;

		    		}

			    	if (json.DATA.JOB_NM == '로그인'){

		    			// 본인인증 (인증서) 여부  // 인증서로 본인인증 후 접근한 경우
		    			if( !fnCommon_isNull(SCRAP_CERT_PASS_YN)  &&  SCRAP_CERT_PASS_YN == "Y" ){
		    				// 20191226
		    				alert(" 로그인이 실패되었습니다.\n홈으로 이동하여 [통합 한도조회]눌러 휴대폰 본인확인 후 재진행 부탁드립니다.\n\n"  + msg.split("<br/>").join("\n"));

		    				fnCommon_goHome();
		    				return false;
		    			}

			    		alert(msg.split("<br/>").join("\n"));

			    		var data_list = [
			    		                 	{ "key" : "view_name", "value" : "loanRenewal4_007" }
			    		                  , { "key" : "title", "value" : "개인정보입력" }
					                    ];

									// 리로드
			    		fnCommon_callUrl( data_list );
			    		return false;
		    		}


			    	if(json.DATA.ANS_PROC == '0') {
			    		SCRP_MINWON24 = "Y";

			    		loanRenewal4_007.fnScraping_3(true, SCRP_MINWON24);
						return true;

			    	}else if (json.DATA.ANS_PROC == '1') {
						SCRP_MINWON24 = "E";
			    		//SCRP_MINWON24 = "A";

			    		loanRenewal4_007.fnScraping_3(false, SCRP_MINWON24);
	    				return true;

			    	}else {
			    		SCRP_MINWON24 = "E";
			    		alert(msg.split("<br/>").join("\n"));

						loanRenewal4_007.fnScraping_3(false, SCRP_MINWON24);
		    			return false;
			    	}
			    },
		    	error: function(data, textStatus, error) {
				},
				complete: function() {
				}
			});

			//return true;
		},



		/* --------------------------------------------------------------------------------------
			확인함 체크박스 클릭시 이벤트
			loanRenewal4_007.fnClickAgree
		 -------------------------------------------------------------------------------------- */
		fnClickAgree : function(e){
			var next_yn_flag = false;

			// 체크박스 동의시 확인버튼 노출
			var agree_1 = $("#agree_1");
			if( !fnCommon_isNull(agree_1)  &&  !fnCommon_isNull(agree_1.length)  &&  agree_1.length > 0 ){
				var checked = agree_1[0].checked;
				if( checked ){
					next_yn_flag = true;
				}
			}

			if(next_yn_flag){
				$("#btn_next").show();
				$("#btn_next").focus();
		        $('body,html').animate({scrollTop: $("#btn_next").offset().top},500);   // 스크롤 이동
			}else{
				$("#btn_next").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			보안숫자 재생성
			loanRenewal4_007.fnRefreshImage
		 -------------------------------------------------------------------------------------- */
		fnRefreshImage : function(){

			// 입력숫자 초기화
			$("#secMsg").val("");

			var params = {
					pluginId: "slCert",
					method: "secretCodeForMinWon24",
					params: {
						"data": {
							"REV_ACT_MARK": "2",
							"TIME_OUT": "180000"
						}
				    },
					callBack: function(isOK, json) {
						if(json.result == "true") {
							var src = "data:image/png;base64," + json.secretcode;
							$("#secImg").attr("src", src);
							/*
							$("#secImg").css("width", "95%");
							$("#secImg").css("height", "140%");
							*/
							$("#secImg").css("width", "140px");
							$("#secImg").css("height", "70px");
							$("#secImg").show();

						} else {
							// 타임아웃 처리
							loanRenewal4_007.fnTimeout("MinWon", "보안문자", json.message);

							alert(json.message.split("<br/>").join("\n"));
						}
					}
				};
			SDSFrameWork.plugin.execute(params);
		},



		/* --------------------------------------------------------------------------------------
			스크래핑 타임아웃 처리
			loanRenewal4_007.fnTimeout
		 -------------------------------------------------------------------------------------- */
		fnTimeout : function(scrp_nm, job_nm, msg){
			var timeout_msg = "통신이 원활하지 않습니다.";
			if (msg != timeout_msg) {
				return;
			}

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("SCRT_NM", fnCommon_deleteNull(scrp_nm));
			iajax.addParam("JOB_NM", job_nm);
			iajax.addParam("RES_MSG", msg);

			$.ajax({
			    type: "post",
			    url: callURL_insertScrtHistTimeout,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    },
		    	error: function(data, textStatus, error) {
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			주소검색 팝업 호출
			loanRenewal4_007.fnSearchAddress
		 -------------------------------------------------------------------------------------- */
		fnSearchAddress : function(){

			/*
			// test 테스트
			var str = '[{"시도":"서울특별시","시군구":["강남구","강동구"]}]';
			$("#orgDistrict").val(str);  // 시도군 리스트
			$("#step").val("1");

			// 주소팝업 호출
			showDialog(callURL_post_minwon24, 420);   // pop_post_minwon24.jsp
			return;
			*/

			// 디자인변화를 피하기 위해 검색버튼으로 포커스 강제이동
			$("#minWon24HomeAddr_btn").focus();

			var params = {
					pluginId: "slCert",
					method: "districtForMinWon24",
					params: {
						"data": {
							"REV_ACT_MARK": "2",
							"TIME_OUT": "180000"
						}
				    },
					callBack: function(isOK, json) {
						if( !fnCommon_isNull(json)  &&  json.result == "true") {
							if( !fnCommon_isNull(json.district) ){
								var str = JSON.stringify(json.district);

								/*
								str = [{"시도":"서울특별시"},{"시군구":"강남구"}];
								*/

								$("#orgDistrict").val(str);  // 시도군 리스트
								$("#step").val("1");

								// 주소팝업 호출
								showDialog(callURL_post_minwon24, 420);   // pop_post_minwon24.jsp
							}

						} else {
							// 타임아웃 처리
							loanRenewal4_007.fnTimeout("MinWon", "행정구역검색", json.message);

							alert(json.message.split("<br/>").join("\n"));
						}
					}
				};
			SDSFrameWork.plugin.execute(params);
		}



	};   // var loanRenewal4_007 = {





	/* --------------------------------------------------------------------------------------
		추가 본인인증 화면
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_008 = {

		/* --------------------------------------------------------------------------------------
			기본수행
			loanRenewal4_008.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// 고객명 변경 이벤트
			$("input[type='text'][name='cert_custNm']").on("keyup", loanRenewal4_008.fnKeyup_custNm );


			// -- nFilter --		// 보안키패드
			setNFilterScreenSize($(window).width(), window.innerHeight);
			setNFilterCommon(document.getElementById('resid_no2'), "mode=number");   // 주민번호 뒷자리
			//	setNFilterInputSize("small");
			nFilterScrollto(false);
			setNFilterMobileInit(); //mobile
			// -- nFilter --

			// 고객기본정보 조회
			loanRenewal4_008.fnSearch_1();
		},



		/* --------------------------------------------------------------------------------------
			휴대폰인증 유효성체크
			loanRenewal4_008.fnCert_phone_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_valid : function( type ){
			var result = true;

			// 통신사
			var telecom = $("#telecom option:selected").val();
			if( fnCommon_isNull(telecom) ){
				alert("통신사를 선택해주세요.");
				$("#telecom").focus();
				return false;
			}

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( fnCommon_isNull(cert_hndNo) ){
				alert("휴대폰번호를 입력해주세요.");
				$("#cert_hndNo").focus();
				return false;
			}

			var cert_hndNo_pattern = /^\d{10,11}$/;
			if(!cert_hndNo_pattern.test(cert_hndNo)){
				alert("휴대폰번호를 정확하게\n입력해주세요.");
				$("#cert_hndNo").focus();
				return false;
			}

			/*
			// 필수항목 동의여부 체크
			var agree_mobile = $(":checkbox[name='agree_mobile']");
			if( !fnCommon_isNull(agree_mobile)  &&  !fnCommon_isNull(agree_mobile.length)  &&  agree_mobile.length > 0 ){
				for(var i=0; i < agree_mobile.length; i++){

					var checkbox = agree_mobile[i];
					if( !fnCommon_isNull(checkbox) ){

						var checked = checkbox.checked;
						if( fnCommon_isNull(checked, "boolean") ){

							// 해당 체크박스 라벨 한글 추출
							alert( checkbox.title + " 항목을 '동의'로 선택하신 후 진행해주세요.");
							$("#" + checkbox.id).focus();
							return false;
						}
					}
				}
			}*/
			var allChk_mobile = $("#allChk_mobile")[0].checked;
			if( !allChk_mobile ){
				alert("휴대폰 본인인증 전체동의로 선택하신 후 진행해주세요.");
				return false;
			}

			if( !fnCommon_isNull(type) ){

				// 입력된 인증번호 검증
				if(type == "valid"){
					var aut_auth_no = $("#aut_auth_no").val();
					if( fnCommon_isNull(aut_auth_no) ){
						alert("인증이 완료되지 않았습니다.\n인증요청 후 인증번호를 입력해주세요.");
						return false;
					}
				}
			}

			return result;
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 본인인증 - 입력된 휴대폰 인증번호 검증
			loanRenewal4_008.fnCert_phone_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_confirm : function(){

    		// 본인인증완료여부
    		isAuthed = false;

			/*// 휴대폰인증 유효성체크 // valid : 번호검증
			var result = loanRenewal4_008.fnCert_phone_valid("valid");
			if(!result){
				return false;
			}*/

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			//iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );   // 고객명
			//iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );   // 실명번호
			//iajax.addParam("RESID_NO_2", $("#resid_no2").val() );
			iajax.addParam("HND_NO", cert_hndNo );   // 휴대폰번호
			iajax.addParam("COM_KIND", $("#telecom").val() );   // 통신사
			iajax.addParam("AUT_AUTH_NO", $("#aut_auth_no").val());	  // 입력된 인증번호
			iajax.addParam("PAGE_FROM", "loanRenewal4_008");

			// -- nFilter --	   // 보안키패드로 입력받은 값
			//var encData = nFilterEncrypted();
			//iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if( !fnCommon_isNull( json )  &&  !fnCommon_isNull( json.RESULT_NO )  &&  json.RESULT_NO == "0000" ){

			    		// 타이머 동작
			    		loanRenewal4_008.fn_stopTimer();

			    		// 본인인증완료여부
			    		isAuthed = true;

			    		// 본인인증 성공 처리
			    		// loanRenewal4_008.fnCert_Success();

			    		SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;  // 건보스크래핑 성공 여부
			    		SCRP_NHIS_EXP = json.SCRP_NHIS_EXP;  // 건강보험스크래핑제외 여부

			    		SCRP_MINWON24_SUCCESS_YN = json.SCRP_MINWON24_SUCCESS_YN;   // 민원24스크래핑성공여부
			    		SCRP_MINWON24_ERROR_YN = json.SCRP_MINWON24_ERROR_YN;   // 민원24스크래핑장애여부
			    		SCRP_MINWON24_EXP = json.SCRP_MINWON24_EXP;  // 민원24스크래핑제외 여부


			  		  	// 이어하기로 진입한 경우
						// 116 자동신청서작성  &  진행상태 1  &  신나는한판 1
						if( !fnCommon_isNull(REG_KIND)  &&  REG_KIND == "116"
								&&  !fnCommon_isNull(ST_CD)  &&  ST_CD == "1"
								&&  !fnCommon_isNull(SHINHAN_FAN_YN)  &&  (SHINHAN_FAN_YN == "1" || SHINHAN_FAN_YN == "Y" ) ){


				    		// default 대출신청서작성 화면
				    		var view_name = "loanRenewal4_012";
				    		var title = "대출신청서 작성";

				    		/* 202002 Minwon24 영원히 제외
							// 52351 온라인햇살론  &  민원24 제출대상  or  건보+민원24 제출대상 이면
							if( !fnCommon_isNull(GOODS_CD_LNC3005)  &&  GOODS_CD_LNC3005 == "52351"
								&&	((!fnCommon_isNull(ONLINE_DOC_C)  &&  (ONLINE_DOC_C == "Y"  ||  ONLINE_DOC_C == "1"))
								||  (!fnCommon_isNull(ONLINE_DOC_D)  &&  (ONLINE_DOC_D == "Y"  ||  ONLINE_DOC_D == "1")))  ){

					    		// 민원24스크래핑제외 대상 아니고 민원스크래핑 아직 안했고 민원24스크래핑장애 아니면
					    		if(  (fnCommon_isNull(SCRP_MINWON24_EXP)  ||  SCRP_MINWON24_EXP != "Y")
					    			&&  (fnCommon_isNull(SCRP_MINWON24_SUCCESS_YN)  ||  SCRP_MINWON24_SUCCESS_YN != "Y")
					    			&&  (fnCommon_isNull(SCRP_MINWON24_ERROR_YN)  ||  SCRP_MINWON24_ERROR_YN != "Y")  ){

					    			// 온라인서류제출(스크래핑) 등본교부 화면 호출
					    			view_name = "loanRenewal4_007";
					    			title = "개인정보입력";

					    		}
							}
							*/

				    		// 화면 이동
				    		var data_list = [
	    		                 	{ "key" : "view_name", "value" : view_name }
	    		                  , { "key" : "title", "value" : title }
			                    ];

							// renewal4 공통 url 호출
							fnCommon_callUrl( data_list );

						}else{

				    		// default 대출신청서작성 화면
				    		var view_name = "loanRenewal4_012";
				    		var title = "대출신청서 작성";

							/* 202002 Minwon24 영원히 제외
							// 한도결과조회 화면에서 넘어온 경우 선택된 대출신청 상품정보
							if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.goods_CD) ){
								var goods_CD = LNC3003_selected_json.goods_CD;

								// 52351 온라인햇살론
								if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52351" ){

									// 자동대출 진행 // 건강보험스크래핑제외 여부  or  건보스크래핑 성공
									if( (!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")
										||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y")){

							    		// 민원24스크래핑제외 대상 아니고 민원스크래핑 아직 안했고 민원24스크래핑장애 아니면
							    		if(  (fnCommon_isNull(SCRP_MINWON24_EXP)  ||  SCRP_MINWON24_EXP != "Y")
							    			&&  (fnCommon_isNull(SCRP_MINWON24_SUCCESS_YN)  ||  SCRP_MINWON24_SUCCESS_YN != "Y")
							    			&&  (fnCommon_isNull(SCRP_MINWON24_ERROR_YN)  ||  SCRP_MINWON24_ERROR_YN != "Y")  ){

								    		// 온라인서류제출(스크래핑) 등본교부 화면 호출
								    		view_name = "loanRenewal4_007";
								    		title = "개인정보입력";
								    	}
									}
								}
							}
							*/

				    		// 화면 이동
				    		var data_list = [
	    		                 	{ "key" : "view_name", "value" : view_name }
	    		                  , { "key" : "title", "value" : title }
			                    ];

							// renewal4 공통 url 호출
							fnCommon_callUrl( data_list );
						}

			    	}else{
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 인증요청 타이머 시작
			loanRenewal4_008.fn_startTimer
		 -------------------------------------------------------------------------------------- */
		fn_startTimer : function(){
			seconds = 180;
			countDownTimer = setInterval("loanRenewal4_008.fn_secoundPassed()", 1000);
		},

		/* --------------------------------------------------------------------------------------
			휴대폰 인증요청 타이머 종료
			loanRenewal4_008.fn_stopTimer
		 -------------------------------------------------------------------------------------- */
		fn_stopTimer : function(){
			clearInterval(countDownTimer);
		},

		/* --------------------------------------------------------------------------------------
			휴대폰 인증요청 타이머
			loanRenewal4_008.fn_secoundPassed
		 -------------------------------------------------------------------------------------- */
		fn_secoundPassed : function(){
			var minutes = Math.round((seconds - 30) / 60);
			var remainingSeconds = seconds % 60;

			if(remainingSeconds < 10) {
				remainingSeconds = "0" + remainingSeconds;
			}

			// $("#verify_time").html("고객님 휴대폰으로 인증번호가 전송되었습니다.<br>SMS 인증시간 [ " + minutes + " : " + remainingSeconds + " ]");
			$("#cert_phone_timer").html("[<span>" + minutes + " : " + remainingSeconds + "</span>]");

			if( fnCommon_isNull(seconds) ){
				alert("휴대폰 인증이 실패하였습니다.\n인증시간이 초과된 경우\n인증번호 재요청 후 입력해주세요.");
				loanRenewal4_008.fn_stopTimer();
			}else{
				seconds--;
			}
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 본인인증 서비스 동의 자세히보기
			loanRenewal4_008.fnShow_agree_certif01
		 -------------------------------------------------------------------------------------- */
		fnShow_agree_certif01 : function(){

			popupURL = popupURL_clause_auth_hp_skt;
			showDialog(popupURL, 420);

			/*
			// 통신사
			var telecom = $("#telecom option:selected").val();
			if( fnCommon_isNull(telecom) ){
				alert("통신사를 선택해주세요.");
				return;

			}else{
				var popupURL = "";

				// sk
				if(telecom == "1" || telecom == "5"){
					popupURL = popupURL_clause_auth_hp_skt;

				// kt
				}else if(telecom == "2" || telecom == "6"){
					popupURL = popupURL_clause_auth_hp_kt;

				// lg
				}else{
					popupURL = popupURL_clause_auth_hp_lgt;
				}

				showDialog(popupURL, 420);
			}
			*/
		},



		/* --------------------------------------------------------------------------------------
			실명인증 요청 유효성 체크
			loanRenewal4_008.fnSave_realName_valid
		 -------------------------------------------------------------------------------------- */
		fnSave_realName_valid : function(){
			var result = true;

			/*
			// 이름
			var cert_custNm = $("#cert_custNm").val();
			if( fnCommon_isNull(cert_custNm) ){
				alert("이름을 입력해주세요.");
				$("#cert_custNm").focus();
				return false;
			}

			// 주민등록번호
			var cert_residNo_1 = $("#cert_residNo_1").val();
			if( fnCommon_isNull(cert_residNo_1)  ||  cert_residNo_1.length < 6 ){
				alert("주민등록번호 앞자리 6자리를 입력해주세요.");
				$("#cert_residNo_1").focus();
				return false;
			}
			var resid_no2 = $("#resid_no2").val();
			if( fnCommon_isNull(resid_no2)  ||  resid_no2.length < 7 ){
				alert("주민등록번호 뒷자리 7자리를 입력해주세요.");
				$("#resid_no2").focus();
				return false;
			}
			 */

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( fnCommon_isNull(cert_hndNo)  ||  cert_hndNo.length < 10 ){
				alert("휴대폰번호를 입력해주세요.");
				$("#cert_hndNo").focus();
				return false;
			}

			var cert_hndNo_pattern = /^\d{10,11}$/;
			if(!cert_hndNo_pattern.test(cert_hndNo)) {
				alert("휴대폰번호를 정확하게\n입력해주세요.");
				$("#cert_hndNo").focus();
				return false;
			}

			return result;
		},



		/* --------------------------------------------------------------------------------------
			실명인증 요청
			loanRenewal4_008.fnSave_realName
		 -------------------------------------------------------------------------------------- */
		fnSave_realName : function(){

			// 실명인증 요청 유효성 체크
			var result = loanRenewal4_008.fnSave_realName_valid();
			if(!result){
				return false;
			}

			// 휴대폰인증 유효성체크 // valid : 번호검증
			var result = loanRenewal4_008.fnCert_phone_valid("valid");
			if(!result){
				return false;
			}

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			//iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()));
			//iajax.addParam("RESID_NO1", $("#cert_residNo_1").val());
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("N01", "0");   // 전화	// 화면에서 없어진 항목
			iajax.addParam("N02", "0");   // DM		// 화면에서 없어진 항목
			iajax.addParam("PAGE_FROM", "loanRenewal4_008");

			// 고객정보에 임의 설정하기 위해 휴대폰번호 전송
			iajax.addParam("HND_NO", cert_hndNo );   // 휴대폰번호


			// -- nFilter --	   // 보안키패드로 입력받은 주민등록번호 뒷자리
			//var encData = nFilterEncrypted();
			//iajax.addParam("RESID_NO2", encData);
			// -- nFilter --


			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_05,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){

				    	// 실명인증 후 수행할 본인인증 수행
						// 입력된 휴대폰 인증번호 검증
						loanRenewal4_008.fnCert_phone_confirm();

			    	}else{
				    	var authErrMsg  = "실명인증이 실패하였습니다.\n";
				        authErrMsg += "확인 후 다시 시도해주세요.\n";
				        authErrMsg += "개명 등으로 실명이 변경된 경우\n";
				        authErrMsg += "NICE (02-2122-4000)\n";
				        authErrMsg += "통해 변경 후 이용가능합니다.\n\n";
				        authErrMsg += "신용조회 차단서비스 이용시\n";
				        authErrMsg += "차단해제 후 진행바랍니다.\n";
				        authErrMsg += "NICE: 02-2122-4000\n";
				        authErrMsg += "KCB: 02-708-1000";

						alert(authErrMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					alert("실명인증이 실패하였습니다.\n확인 후 다시 시도해주세요.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					alert("data.status:[ " + data.status + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 인증번호 요청
			loanRenewal4_008.fnCert_phone_request
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_request : function(){

    		// 본인인증완료여부
    		isAuthed = false;

			// 초기화
			$("#cert_phone_timer_dl").hide();		// 인증번호 입력 영역
			$("#aut_auth_no").hide();	 // 인증번호
			$("#aut_auth_no").val("");

			// 실명인증 요청 유효성 체크
			var result = loanRenewal4_008.fnSave_realName_valid();
			if(!result){
				return false;
			}

			// 휴대폰인증 유효성체크
			var result = loanRenewal4_008.fnCert_phone_valid();
			if(!result){
				return false;
			}

			iajax.clearParam();

			// 통신사
			var telecom = $("#telecom").val();
			//iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );
			//iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );
			iajax.addParam("COM_KIND", telecom );
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("PAGE_FROM", "loanRenewal4_008");

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( !fnCommon_isNull(cert_hndNo)  &&  !fnCommon_isNull(cert_hndNo.length)  &&  cert_hndNo.length >= 10 ){
				iajax.addParam("HND_NO", cert_hndNo);
			}

			// -- nFilter --	   // 보안키패드로 입력받은 값
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			//AOS 문자자동가져오기 콜
			callsmsAos();

			//앱여부
			var isApp_flag = fnCommon_isApp();
			if(isApp_flag){
				// Android
				if( fnCommon_isNull(isIOS, "boolean") ){
					iajax.addParam("APP_GUBUN", "9");
				}else{
					iajax.addParam("APP_GUBUN", "8");
				}
			}else{
				iajax.addParam("APP_GUBUN", "1");
			}

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_04,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000"){

			    		// 인증시간 timer 노출
						$("#cert_phone_timer_dl").show();
						$("#aut_auth_no").show();

			    		// 인증요청 버튼
			    		$("#certif01_btn_1").html("재요청");
			    		$("#certif01_btn_1").removeClass("on");

			    		// 타이머 동작
			    		loanRenewal4_008.fn_stopTimer();
			    		loanRenewal4_008.fn_startTimer();

			    	}else{
			    		alert("인증번호 발송에 실패하였습니다. 다시 시도해주세요.");
			    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
			    	}
			    },
				error: function(data, textStatus, error) {
					alert("실명인증이 실패하였습니다.\n확인 후 다시 시도해주세요.");
		    		console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					alert("data.status:[ " + data.status + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			주민등록번호 근거 및 도용방지 안내 팝업
			loanRenewal4_008.fnPopup_1
		 -------------------------------------------------------------------------------------- */
		fnPopup_1 : function( type ){

			var msg = "";
			msg += "<p>신한저축은행은 신용정보의 이용 및 보호에 관한 법률 시행령 제 37조의 2에 의거하여 주민등록번호를 수집합니다.</p>";
			msg += "<p>타인의 주민등록번호를 도용하거나, 부정사용하는 자는 3년 이하의 징역 또는 3천만원 이하의 벌금이 부과될 수 있습니다.</p>";

			// 메세지 팝업
			fnCommon_popup("open", msg);
		},



		/* --------------------------------------------------------------------------------------
			휴대폰번호 변경 이벤트
			loanRenewal4_008.fnKeyup_hndNo
		 -------------------------------------------------------------------------------------- */
		fnKeyup_hndNo : function(e){

			// 본인인증완료여부
			isAuthed = false;

			var value = e.target.value;

			// 문자열 제거 후 숫자만 반환
			value = fnCommon_getOnlyNumber(value);

			// 필드에 재설정될 값
			var value_format = value;

			if( !fnCommon_isNull(value)  &&  value.length > 0 ){
				if(value.length > 3){

					// 앞자리 잘라내기
					value_format = value.substring(0, 3);
					value = value.substring(3, value.length);

					// 아직도 세자리 이상이면
					if(value.length > 3){

						// 중간자리 잘라내기
						value_format += "-" + value.substring(0, 3);
						value = value.substring(3, value.length);

						// 아직도 네자리 이상이면 중간자리로 한자리 더 넘기기
						if(value.length > 4){
							value_format += value.substring(0, 1);
							value = value.substring(1, value.length);
						}
					}

					// 남은 뒷자리가 있으면 이것도 붙이기
					if( !fnCommon_isNull(value) ){
						value_format += "-" + value;
					}
				}
			}

			// 모든 휴대폰번호 필드에 설정
			$("input[type='tel'][name='cert_hndNo']").val(value_format);
		},



		/* --------------------------------------------------------------------------------------
			주민등록번호 앞자리 변경 이벤트
			loanRenewal4_008.fnKeyup_residNo_1
		 -------------------------------------------------------------------------------------- */
		fnKeyup_residNo_1 : function(e){

    		// 본인인증완료여부
    		isAuthed = false;

			// 문자열 제거 후 숫자만 반환
    		var value = e.target.value;
    		e.target.value = fnCommon_getOnlyNumber(value);
		},



		/* --------------------------------------------------------------------------------------
			고객명 변경 이벤트
			loanRenewal4_008.fnKeyup_custNm
		 -------------------------------------------------------------------------------------- */
		fnKeyup_custNm : function( type ){

			// 본인인증완료여부
			isAuthed = false;

			if( !fnCommon_isNull(type) ){

				// 고객명 X 클릭
				if(type == "delete"){
					$("#cert_custNm").val("");
					$("#cert_custNm").focus();  // 키패드가 사라지면 싫으니까
				}
			}

			// 이름 있으면 삭제버튼 보이게
			var cert_custNm = $("#cert_custNm").val();
			if( !fnCommon_isNull(cert_custNm) ){
				$("#cert_custNm_delete_p").show();
			}else{
				$("#cert_custNm_delete_p").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			고객기본정보 조회
			loanRenewal4_008.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function(){

			// 고객기본정보 조회
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

						// 고객명
						var custNm = json.custNm;
						if( !fnCommon_isNull(custNm) ){
							$("input[type='text'][name='cert_custNm']").val( custNm );
						}

						// 생년월일
						var residNo = json.residNo;
						if( !fnCommon_isNull(residNo) ){
							$("input[type='tel'][name='cert_residNo_1']").val( residNo );
						}

						// 휴대폰번호
						var hndNo = json.hndNo;
						if( !fnCommon_isNull(hndNo) ){

							// 문자열 제거 후 숫자만 반환
							hndNo = fnCommon_getOnlyNumber(hndNo);

							// 휴대폰번호 변경 이벤트를 사용해서 값 설정
							loanRenewal4_008.fnKeyup_hndNo({target:{value:hndNo}});
						}

						SCRP_MINWON24_ERROR_YN = json.SCRP_MINWON24_ERROR_YN;
						SCRP_NHIS_EXP = json.SCRP_NHIS_EXP;
						SCRP_MINWON24_EXP = json.SCRP_MINWON24_EXP;
						SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;
						SCRP_MINWON24_SUCCESS_YN = json.SCRP_MINWON24_SUCCESS_YN;
						SUNSHINELOAN_YN = json.SUNSHINELOAN_YN;

						REG_KIND = json.REG_KIND;  // 전자서명상태(자서접수처 구분)
						ST_CD = json.ST_CD;  // 진행상태
						SHINHAN_FAN_YN = json.SHINHAN_FAN_YN;  // 신나는한판여부
						CERT_HNDNO = json.CERT_HNDNO;   // 인증휴대폰번호
						ONLINE_DOC_C = json.ONLINE_DOC_C;   // 민원24 제출대상 여부
						ONLINE_DOC_D = json.ONLINE_DOC_D;   // 건보+민원24 제출대상 여부
						GOODS_CD_LNC3005 = json.GOODS_CD;   // 상품코드

						// 한도결과조회 화면에서 자동대출 신청하기 클릭하여 넘어온 경우 선택된 대출신청 상품정보
						LNC3003_selected_json = json.LNC3003_selected_json;

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					alert(error);
					// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},

		/* --------------------------------------------------------------------------------------
			휴대폰 동의 선택
			loanRenewal4_008.fnAgree_mobile
		 -------------------------------------------------------------------------------------- */
		fnAgree_mobile : function(){
			var al_agree_mobile = $("#al_agree_mobile").val();
			if("0" == al_agree_mobile){
				$("#allChk_mobile").prop("checked", true);
				$("#al_agree_mobile").val(1)
			}else{
				$("#allChk_mobile").prop("checked", false);
				$("#al_agree_mobile").val(0)
			}

		}

	};   // var loanRenewal4_008 = {








	/* --------------------------------------------------------------------------------------
		대출신청서 작성 화면
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_012 = {

			/* --------------------------------------------------------------------------------------
				기본수행
				loanRenewal4_012.fnInit
			 -------------------------------------------------------------------------------------- */
			fnInit : function(){
				
				// 신청정보입력 열기
				$("#slid_1_li").addClass("active");  // 활성화
				$("#slid_1_div").show();  // 하단 노출

				// 슬라이드 이벤트 생성
				$('.toggleList li .btnToggle').on("click", loanRenewal4_012.fnEvent_Slide );

				// 최초납입예정일 구하기
				var d = new Date();
				var currentYear = d.getFullYear();
				var currentMonth = d.getMonth() + 1;
				var currentDate = d.getDate();
				if(currentMonth < 10){
					currentMonth = "0" + currentMonth;
				}
				if(currentDate < 10){
					currentDate = "0" + currentDate;
				}

				// *숫자형태이므로 문자로 변환필수
				firstRepayDt = currentYear + "" + currentMonth + "" + currentDate;
				firstRepayDt_format = currentYear + "." + currentMonth + "." + currentDate;
				$("#firstRepayDt_format").html(firstRepayDt_format);   // 최초납입예정일 노출

				// 기본값 조회
				loanRenewal4_012.fnSearch_1();
			},



			/* --------------------------------------------------------------------------------------
				상세주소 입력시 글자수 제한
				loanRenewal4_012.fnKeyup_homeAddr2
			 -------------------------------------------------------------------------------------- */
			fnKeyup_homeAddr2 : function(e){
				var limit = 100;
				var value = e.target.value;

				// byte 제한만큼 잘라내기
				value = fnCommon_cutByte(limit, value);
				$("#homeAddr2").val(value);
			},



			/* --------------------------------------------------------------------------------------
				이체일 변경 이벤트 1 - 상환스케줄 조회하여 첫 납입일 산출
				loanRenewal4_012.fnChange_cmsDate_1
			 -------------------------------------------------------------------------------------- */
			fnChange_cmsDate_1 : function(e){

				$("#firstRepayDt_format").html("");  // 예상 첫 납입일 초기화
				workingday_confirm_flag = false;  // 납입일자 영업일 확인 여부 초기화

				var hafDay = e.target.value;  // 영업일체크

				var today = new Date();
				var yyyy = today.getFullYear();
				var mm = today.getMonth() + 1;
				var dd = today.getDate();
				var addMontyNumber = 1;  // default +1


				// 오늘일자면 영업일체크 통과
				if(parseInt(dd) == parseInt(hafDay)){
					workingday_confirm_flag = true;  // 납입일자 영업일 확인 여부

				// 오늘 이전일자면
				}else if(parseInt(dd) > parseInt(hafDay)){
					addMontyNumber = addMontyNumber - 1;

				// 오늘 이후일자
				}else{
					// addMontyNumber = 1;
				}

				mm = today.getMonth() + addMontyNumber;
				
				var yyyy_string = String(yyyy);
				var mm_string = String(mm);
				var dd_string = hafDay;

				// 자릿수 채우기
				yyyy_string = fnCommon_lpad( yyyy_string, 4, "0" );
				mm_string = fnCommon_lpad( mm_string, 2, "0" );
				dd_string = fnCommon_lpad( dd_string, 2, "0" );

				// 최초 납입응당일
				hafDay_DD = dd_string;  // yyyy_string + mm_string + dd_string;

				// hafDay_DD  parameter 가 있으면 상환스케줄 조회 후 영업일체크 한다
				// 상환스케줄 재조회하여 예상 첫 납입일자 산출
				// 상환스케줄 조회 // 예상첫납입일 구하기 위해 강제로 돌린다
				loanRenewal4_012.fnSearch_paySchedule( hafDay_DD );
			},



			/* --------------------------------------------------------------------------------------
				이체일 변경 이벤트 2 - 영업일 체크
				loanRenewal4_012.fnChange_cmsDate_2
			 -------------------------------------------------------------------------------------- */
			fnChange_cmsDate_2 : function(e){
				iajax.clearParam();
				iajax.addParam("CHK_CSRF", random);
				iajax.addParam("haf_day", hafDay_DD);

				$.ajax({
				    type: "post",
				    url: callURL_getHafCheck,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.DATA)  &&  !fnCommon_isNull(json.DATA.HAF_CHECK_YN)  &&  json.DATA.HAF_CHECK_YN == "Y" ){
							workingday_confirm_flag = true;  // 납입일자 영업일 확인 여부

				    	}else{
				    		alert("이체일은 신청일로부터 4영업일이후부터 선택이 가능합니다.");
				    	}
				    },
					error: function(data, textStatus, error){
						alert(error.split("<br/>").join("\n"));
						console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function(){
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				직장전화번호 변경 이벤트
				loanRenewal4_012.fnKeyup_workTelNo
			 -------------------------------------------------------------------------------------- */
			fnKeyup_workTelNo : function(e, telno){
				var value = $("#workTelNum").val();

				if( fnCommon_isNull(e)  &&  !fnCommon_isNull(telno) ){
					value = telno;
				}

				// 문자열 제거 후 숫자만 반환
				value = fnCommon_getOnlyNumber(value);

				// 필드에 재설정될 값
				var value_format = value;
				if( !fnCommon_isNull(value)  &&  value.length > 0 ){

					var first_cut_length = 3;

					// 02 로 시작하면 길이 재설정
					if(value.indexOf("02") == 0){
						first_cut_length = 2;
					}

					if(value.length > first_cut_length){

						// 앞자리 잘라내기
						value_format = value.substring(0, first_cut_length);
						value = value.substring(first_cut_length, value.length);

						// 아직도 세자리 이상이면
						if(value.length > 3){

							// 중간자리 잘라내기
							value_format += "-" + value.substring(0, 3);
							value = value.substring(3, value.length);

							// 아직도 네자리 이상이면 중간자리로 한자리 더 넘기기
							if(value.length > 4){
								value_format += value.substring(0, 1);
								value = value.substring(1, value.length);

								// 아직도 네자리 이상이면 뒷자리 잘라버리기
								if(value.length > 4){
									value = value.substring(0, 4);
								}
							}
						}

						// 남은 뒷자리가 있으면 이것도 붙이기
						if( !fnCommon_isNull(value) ){
							value_format += "-" + value;
						}
					}
				}

				// 필드에 설정
				$("#workTelNum").val( value_format )
			},



			/* --------------------------------------------------------------------------------------
				인위적 슬라이드 이동
				loanRenewal4_012.fnMove_slide
			 -------------------------------------------------------------------------------------- */
			fnMove_slide : function( num ){
				if( !fnCommon_isNull(num) ){

					// 유효성체크
					var result = loanRenewal4_012.fnValidationCheck("target", num);
					if(!result){
						return false;
					}

					// 고객정보입력
					if(num == 2){

						// 신청정보입력 닫기
						$("#slid_1_li").removeClass("active");
						$("#slid_1_div").hide();

						$("#slid_2_li").removeClass("checkToggle");  // 비활성모양 없애기
						$("#slid_2_li").addClass("active");
						$("#slid_2_div").show();
						
						// 고객정보입력 열기
						//직업구분에 따라 직장정보 display
						if(job_major_cd == "3" || job_major_cd == "4" )
						{
							$("#company_info_div").hide();
							$("#sunshine_div").hide();
						}	
						else
						{
							$("#company_info_div").show();
							
							//햇살론
							if(!fnCommon_isNull(goods_CD)  &&  (goods_CD == "52351" || goods_CD == "52301") ){
								$("#sunshine_div").show();		
							}
							else {
								$("#sunshine_div").hide();	
							}
						}

						// 상환스케줄 조회 // 예상첫납입일 구하기 위해 강제로 돌린다
						loanRenewal4_012.fnSearch_paySchedule();


					// 자동이체 및 입금계좌정보 입력
					}else if(num == 3){

						// 고객정보입력 닫기
						$("#slid_2_li").removeClass("active");
						$("#slid_2_div").hide();

						// 자동이체 및 입금계좌정보 입력 열기
						$("#slid_3_li").removeClass("checkToggle");  // 비활성모양 없애기
						$("#slid_3_li").addClass("active");
						$("#slid_3_div").show();
					}

					// 스크롤 이동
			        // $('body,html').animate({scrollTop: 0}, 500);
				}
			},



			/* --------------------------------------------------------------------------------------
				최대금액 클릭 이벤트
				loanRenewal4_012.fnClick_maxAmt
			 -------------------------------------------------------------------------------------- */
			fnClick_maxAmt : function(e){
				var checked = $("#maxAmt").prop("checked");
				if( !fnCommon_isNull(checked, "boolean") ){

					// 신청금액 설정
					loanRenewal4_012.fnKeyup_inputAmt( "default" );

				}else{
					// 초기화
					$("#req_amt").val("");   // 신청금액
					$("#input_manwon").parent().hide();
					$("#input_manwon").html("");   // 만원영역
					
					// DHKANG 보증료
					if(!fnCommon_isNull(goods_CD)  &&  goods_CD == "52351" ){
						$("#grtFee").val("약 " + calcGrtFee);		
					}
				}
			},



			/* --------------------------------------------------------------------------------------
				신청금액 10만원단위로 재설정
				loanRenewal4_012.fnKeyup_inputAmt_2
			 -------------------------------------------------------------------------------------- */
			fnKeyup_inputAmt_2 : function(e){

				// 만원영역 혹시 모르니까 초기화 처리 먼저
				$("#input_manwon").parent().hide();
				$("#input_manwon").html("");

				var value = $("#req_amt").val();
				if( !fnCommon_isNull(value) ){

					// 문자열 제거 후 숫자만 반환
					value = fnCommon_getOnlyNumber(value);
					var value_number = Number(value);
					if(value_number > 100000){

						value_number = value_number - value_number%100000;
						value = String(value_number);

						// 콤마찍기
						var value_format = fnCommon_addComma(value);
						$("#req_amt").val( value_format );

						if(value_number > 10000){
							value_number = parseInt( value_number/10000 );   // 만원단위 이하 절사
							if(value_number > 0){
								value = String(value_number);

								// 콤마찍기
								value_format = fnCommon_addComma(value);

								// 이 영역은 한개씩밖에 존재하지 않으니까
								$("#input_manwon").parent().show();
								$("#input_manwon").html(value_format);
							}
						}

						$("#req_amt").focus();
					}
				}

			},



			/* --------------------------------------------------------------------------------------
				신청금액 입력영역 입력
				loanRenewal4_012.fnKeyup_inputAmt
			 -------------------------------------------------------------------------------------- */
			fnKeyup_inputAmt : function(e){

				// 만원영역 혹시 모르니까 초기화 처리 먼저
				$("#input_manwon").parent().hide();
				$("#input_manwon").html("");

				var id = "";
				var value = "";

				// 기본설정 기능이면
				if( !fnCommon_isNull(e)  &&  e == "default" ){
					id = "req_amt";  // 신청금액 입력영역
					value = REQ_AMT;  // 한도결과조회 화면에서 입력된 신청금액

				}else{
					id = e.target.id;
					value = $("#" + id).val();
				}

				if( !fnCommon_isNull(value) ){

					// 문자열 제거 후 숫자만 반환
					value = fnCommon_getOnlyNumber(value);
					var value_number = Number(value);
					if(value_number > 0){

						/*
						// 한도결과조회 화면에서 입력된 신청금액(한도값으로 사용)
						if( !fnCommon_isNull(REQ_AMT) ){
							var REQ_AMT_number = Number(REQ_AMT);

							// 한도금액 넘으면 한도금액으로 재설정
							if(value_number > REQ_AMT_number){
								value_number = REQ_AMT_number;

								value = String(value_number);
							}
						}
						*/

						// 콤마찍기
						var value_format = fnCommon_addComma(value);
						$("#" + id).val( value_format );

						if(value_number > 10000){
							value_number = parseInt( value_number/10000 );   // 만원단위 이하 절사
							if(value_number > 0){
								value = String(value_number);

								// 콤마찍기
								value_format = fnCommon_addComma(value);

								// 이 영역은 한개씩밖에 존재하지 않으니까
								$("#input_manwon").parent().show();
								$("#input_manwon").html(value_format);
							}
						}
					}
				}
				
				// DHKANG 보증료
				if(!fnCommon_isNull(goods_CD)  &&  goods_CD == "52351" ){
					searchGrtFee();					
				}
			},



			/* --------------------------------------------------------------------------------------
				대출기간 변경 이벤트
				loanRenewal4_012.fnChange_loanPeriodCombo
			 -------------------------------------------------------------------------------------- */
			fnChange_loanPeriodCombo : function(e){
				var value = e.target.value;

				// 116 자동신청서작성  // 이어하기로 진입한 경우
				if( !fnCommon_isNull(REG_KIND)  &&  REG_KIND == "116" ){

					// 보증서발급여부 0 미발급이면
					if( fnCommon_isNull(FEE_PAPER_ISSUE_YN)  ||  FEE_PAPER_ISSUE_YN == "0" ){

						// 대출기간 한도까지만 변경가능
						if( !fnCommon_isNull(loanPeriodCombo_maxval)  &&  (Number(loanPeriodCombo_maxval) < Number(value)) ){
							alert("설정된 대출기간 " + loanPeriodCombo_maxval + "개월까지만 선택할 수 있습니다.");

							// 기존 설정된 기간으로 강제 설정 // 강제 설정 후에 이벤트가 종료되는 현상으로 시간차 설정
							setTimeout(function(){
								$("#loanPeriodCombo").val(loanPeriodCombo_maxval);
							}, 300);

						}
					}
				}
				
				// DHKANG 보증료
				if(!fnCommon_isNull(goods_CD)  &&  goods_CD == "52351" ){
					searchGrtFee();					
				}

			},



			/* --------------------------------------------------------------------------------------
				슬라이드 바 클릭 이벤트
				loanRenewal4_012.fnEvent_Slide
			 -------------------------------------------------------------------------------------- */
			fnEvent_Slide : function(e, btn_slid_id){

				// 슬라이드 접기 동작여부
				var close_flag = false;

				// 이벤트 대상 슬라이드 토글버튼 객체 추출
			    var toggle_button = null;

			    // 수동 제어시 id 받아서 객체 추출
				if( !fnCommon_isNull(btn_slid_id) ){
					toggle_button = $("#" + btn_slid_id);
				}else{
					toggle_button = $(this);
					close_flag = true;   // 슬라이드 접기 동작여부 // 고객의 자발적 동작시에는 반영
				}

			    // var toggle_button = $(this);
			    var toggle_li = toggle_button.parent('li');

			    // 비활성 슬라이드 바는 클릭해도 열지않기, 앞의 입력 정보를 모두 입력한 후에 확인버튼 클릭할때 열어주기
			    var className = toggle_li.attr("class");
				if( !fnCommon_isNull(className)  &&  className.indexOf("checkToggle") > -1 ){
					return;
				}

			    // 다른 슬라이드 접기
			    toggle_li.siblings().eq(0).removeClass('active').children('.toggleCont').hide();
			    // toggle_li.siblings().eq(0).removeClass('active').children('.toggleCont').hide();

			    // 클릭대상 뒤쪽 선택불가 처리
			    var toggle_li_id = toggle_li[0].id;
				if( !fnCommon_isNull(toggle_li_id) ){

					// 신청정보입력
					if( toggle_li_id.indexOf("1") > -1 ){
						if(!$("#slid_2_li").hasClass("checkToggle")){
							$("#slid_2_li").addClass("checkToggle")
						}
						if(!$("#slid_3_li").hasClass("checkToggle")){
							$("#slid_3_li").addClass("checkToggle")
						}

					// 개인정보입력
					}else if( toggle_li_id.indexOf("2") > -1 ){
						if(!$("#slid_3_li").hasClass("checkToggle")){
							$("#slid_3_li").addClass("checkToggle")
						}
					}
				}

			    // 클릭대상 슬라이드가 비활성이면 활성으로
			    if( toggle_li.hasClass('active') == false){
			    	toggle_li.removeClass('checkToggle');  // 활성으로
			        toggle_li.addClass('active').children('.toggleCont').show();   // 하단부 노출
			        toggle_li.siblings().removeClass('active').children('.toggleCont').hide();
			        $('body,html').animate({scrollTop: toggle_button.offset().top},500);   // 스크롤 이동

		        // 활성이면 비활성으로
			    }else{
					// 슬라이드 접기 동작여부
					if(close_flag){
						toggle_li.removeClass('active').children('.toggleCont').hide();
					}
			    }
			},



			/* --------------------------------------------------------------------------------------
				자택정보 설정
				loanRenewal4_012.fnHomeSetting
			 -------------------------------------------------------------------------------------- */
			fnHomeSetting : function( type ){

				// 기본설정
				if( !fnCommon_isNull(type)  &&  type == "default" ){
					var homeAddr = "";  // 자택주소
					var homeAddr2 = "";  // 상세주소

					// 자택주소 hidden
					var homeAddrType = "2";
					var homeAddr1 = "";
					var homeBuildingCode = "";
					var homeZipCode = "";

					// 주민등록지
					var residAddr = "";
					var residAddr2 = "";
					var residAddrType = "2";
					var residAddr1 = "";
					var residBuildingCode = "";
					var residZipCode = "";

					// 등본스크래핑 하고 온 경우
					if( !fnCommon_isNull(minWon24Addr1)  &&  !fnCommon_isNull(minWon24ZipCd) ){
						homeAddr = minWon24Addr1;   // 자택주소
						homeAddr2 = minWon24HomeAddr2;  // 상세주소

						// 자택주소 hidden
						homeAddrType = "2";
						homeAddr1 = minWon24Addr1;
						homeBuildingCode = "";
						homeZipCode = minWon24ZipCd;

					// 한도결과조회 화면에서 넘어온 경우 선택된 대출신청 상품정보
					}else if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.goods_CD) ){
						// 실거주지 입력
						homeAddr = LNC3003_selected_json.real_ADDR1;
						homeAddr2 = LNC3003_selected_json.real_ADDR2;

						// homeAddrType = LNC3003_selected_json.real_ADDR_TY;
						homeAddr1 = LNC3003_selected_json.real_ADDR1;
						homeBuildingCode = LNC3003_selected_json.real_STRUT_MG_NO;
						homeZipCode = LNC3003_selected_json.real_POSTNO;


						// 기존 주소는 등본으로 받아오기
						residAddr = LNC3003_selected_json.liv_ADDR1;
						residAddr2 = LNC3003_selected_json.liv_ADDR2;
						// residAddrType = LNC3003_selected_json.hm_ADDR_TY;
						residAddr1 = LNC3003_selected_json.liv_ADDR1;
						residBuildingCode = LNC3003_selected_json.liv_STRUT_MG_NO;
						residZipCode = LNC3003_selected_json.liv_POSTNO;

					// 대출신청 결과 조회
					}else if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.goods_CD) ){
						homeAddr = LNC3005_selected.adr_ZIP_ADDR;
						homeAddr2 = LNC3005_selected.adr_ZIP_DTL_ADDR;

						// homeAddrType = LNC3005_selected.addr_KIND;
						homeAddr1 = LNC3005_selected.adr_ZIP_ADDR;
						homeBuildingCode = LNC3005_selected.adr_BLD_MNG_NO;
						homeZipCode = LNC3005_selected.adr_ZIP;

						residAddr = LNC3005_selected.resid_ZIP_ADDR;
						residAddr2 = LNC3005_selected.resid_ZIP_DTL_ADDR;
						// residAddrType = LNC3005_selected.resid_KIND;
						residAddr1 = LNC3005_selected.resid_ZIP_ADDR;
						residBuildingCode = LNC3005_selected.resid_BLD_MNG_NO;
						residZipCode = LNC3005_selected.resid_ZIP;

					// 자동신청정보 // 한도결과조회 화면에서 데이터를 직접적으로 넘기게 되면서 이 데이터는 사실상 필요가 없어짐.
					}else if( !fnCommon_isNull(LNC3003_obj)  &&  !fnCommon_isNull(LNC3003_obj.goods_CD) ){
						homeAddr = LNC3003_obj.liv_ADDR1;
						homeAddr2 = LNC3003_obj.liv_ADDR2;

						// homeAddrType = LNC3003_obj.hm_ADDR_TY;
						homeAddr1 = LNC3003_obj.liv_ADDR1;
						homeBuildingCode = LNC3003_obj.liv_STRUT_MG_NO;
						homeZipCode = LNC3003_obj.liv_POSTNO;
					}

					// 주소정보 있으면 값 자동설정, 상세주소 입력 영역 노출
					if( !fnCommon_isNull(homeAddr)  &&  !fnCommon_isNull(homeAddr2) ){

						//if(homeZipCode.length == 6){
						//	homeZipCode = homeZipCode.substring(1,6);
						//}

						$("#homeAddr_div").html( homeZipCode + " " + homeAddr );  // 고객 노출 영역
						$("#homeAddr2_div").show();

						// 자택주소 hidden
						$("#homeAddr").val( homeAddr );  // 자택주소
						$("#homeAddr2").val( homeAddr2 );  // 상세주소
						$("#homeAddrType").val( homeAddrType );
						$("#homeAddr1").val( homeAddr1 );
						$("#homeBuildingCode").val( homeBuildingCode );
						$("#homeZipCode").val( homeZipCode );
					}

					if( !fnCommon_isNull(residAddr)  &&  !fnCommon_isNull(residAddr2) ){
						$("#residAddr_div").html(residZipCode + " " + residAddr );  // 고객 노출 영역
						$("#residAddr2_div").show();

						// 자택주소 hidden
						$("#residAddr").val( residAddr );  // 자택주소
						$("#residAddr2").val( residAddr2 );  // 상세주소
						$("#residAddrType").val( residAddrType );
						$("#residAddr1").val( residAddr1 );
						$("#residBuildingCode").val( residBuildingCode );
						$("#residZipCode").val( residZipCode );
					}
				}
			},



			/* --------------------------------------------------------------------------------------
				대출기간 콤보생성
				loanRenewal4_012.fnMakeCombo
			 -------------------------------------------------------------------------------------- */
			fnMakeCombo : function( combo_id ){
				if( !fnCommon_isNull(combo_id) ){

					// 대출기간
					if(combo_id == "loanPeriodCombo"){

						var start = 0;  // 최소기간
						var end = 0;  // 최대기간
						var add = 0;  // 기간단위

						// 장동선D 상환기간 변경의 건
						if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52351" ){	// 52351 온라인햇살론
							start = 36;
							end = 60;
							add = 24;
							
						} else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52347" ){	// 52347 사잇돌2(간편소액)
							start = 12;
							end = 60;
							add = 12;
							
						} else {											
							start = 6;
							end = 60;
							add = 6;
							
						}

						var html = "<option value='' selected>선택</option>";
						for(var i = start; i <= end; i = i+add){
							html += "<option value='" + i + "'>" + i + "개월</option>";
						}

						// 대출기간 콤보생성
						$("#loanPeriodCombo").html(html);

						// 12개월 기본설정
						// var loanPeriod = "12";

						// $("#loanPeriodCombo > option[value=" + loanPeriod + "]").attr("selected", "true");
						// $("#loanPeriodCombo").selectmenu("refresh");
					}
				}
				return true;
			},



			/* --------------------------------------------------------------------------------------
				화면값 자동설정
				loanRenewal4_012.fnSetViewData
			 -------------------------------------------------------------------------------------- */
			fnSetViewData : function(){

				// 신청정보에서 데이터 추출 // 자동대출 선택시 고객 선택상품값, 자동대출신청정보, 대출신청서작성정보 중 데이터 추출
				var dataMap = loanRenewal4_012.fnGetDataParam();

				// 신청금액
				//var req_AMT = dataMap.req_AMT;
				//if( !fnCommon_isNull(req_AMT) ){
				//	REQ_AMT = req_AMT;  // 여기저기서 사용할 신청금액값 설정
				//}
				//alert("REQ_AMT = ["+REQ_AMT+"]["+dataMap.req_AMT+"]");
				if( REQ_AMT == "0" || REQ_AMT == null || REQ_AMT == ""  ){
					REQ_AMT = dataMap.req_AMT;
				}

				// 상품코드
				if( !fnCommon_isNull(dataMap.goods_CD) ){
					goods_CD = dataMap.goods_CD;  // 여기저기서 사용할 신청금액값 설정
				}

				// 대출신청번호 받은것 있으면 변경하여 사용
				if( !fnCommon_isNull(dataMap.bank_INSP_NO) ){
					bank_INSP_NO = dataMap.bank_INSP_NO;  // 여기저기서 사용할 대출신청번호값 설정
				}

				// 직장명
				var co_NM = dataMap.co_NM;
				if( !fnCommon_isNull(co_NM) ){
					company_nm = co_NM;
				}
				$("#company_nm").val( company_nm );

				// 자금용도
				var fund_YONGDO_CD = dataMap.fund_YONGDO_CD;


				// 52351 온라인햇살론
				if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52351" ){
					fund_YONGDO_CD = "8";  // 생활
					$("#useTypeCombo").css("background-color", "#eee");   // 비활성 시각효과
					$("#useTypeCombo").attr("disabled", "disabled");
					// $("#useTypeCombo").val("8").attr("selected", "selected");   // 생활
					// $("#useTypeCombo").selectmenu("refresh");

					$("#coment_onlinesunshine").show();  // 햇살론 관련 문구 노출
					$("#return_type").val("원금균등상환방식");   // 상환방식
					
					// DHKANG 보증료
					$("#grtFeeArea").show();
					$("#commentGrtFeeArea").show();

					$("#weak_onlinesunshine").show();  // 햇살론 취약계층구분 노출
					$("#weak_onlinesunshine1").show();  // 햇살론 취약계층구분 노출
					var sun_WEAK_CD = dataMap.sun_WEAK_CD;

					if( "" == sun_WEAK_CD || "00" == sun_WEAK_CD || null == sun_WEAK_CD ){
						$("#sunWeakCode").val("00");
						$("#sunWeakNm").val("해당사항 없음");
					}else{
						var sunWeakNm = "";
						$("#sunWeakCode").val(sun_WEAK_CD);
						$("#sunWeakCodeBtn").prop("disabled", true);
						$("#sunWeakNm").prop("disabled", true);
						$("#sunWeakNm").css("background-color", "#eee");   // 비활성 시각효과
						if( "01" == sun_WEAK_CD ){ sunWeakNm = "한부모가족"; }
						else if( "02" == sun_WEAK_CD ){ sunWeakNm = "조손가족"; }
						else if( "03" == sun_WEAK_CD ){ sunWeakNm = "다문화가족"; }
						else if( "04" == sun_WEAK_CD ){ sunWeakNm = "북한이탈주민"; }
						else if( "05" == sun_WEAK_CD ){ sunWeakNm = "등록장애인"; }
						else if( "06" == sun_WEAK_CD ){ sunWeakNm = "기초생활수급자"; }
						else if( "07" == sun_WEAK_CD ){ sunWeakNm = "차상위계층이하 자"; }
						else if( "99" == sun_WEAK_CD ){ sunWeakNm = "기타"; }
						else {
							$("#sunWeakCode").val("00");
							sunWeakNm = "해당사항 없음";
							$("#sunWeakCodeBtn").prop("disabled", false);
							$("#sunWeakNm").prop("disabled", false);
							$("#sunWeakNm").prop("readonly", true);
							$("#sunWeakNm").css("background-color", "#fff");   // 비활성 시각효과
						}
						$("#sunWeakNm").val(sunWeakNm);
					}


				}
				if( !fnCommon_isNull(fund_YONGDO_CD)  &&  fund_YONGDO_CD != "0" ){
					$("#useTypeCombo").val(fund_YONGDO_CD);
				}

				// 대출기간 콤보생성
				var result_flag = loanRenewal4_012.fnMakeCombo("loanPeriodCombo");
				if(result_flag){

					// 대출기간 있으면 콤보 자동설정
					var req_TERM = dataMap.req_TERM;
					if( !fnCommon_isNull(req_TERM)  &&  req_TERM != "0" ){
						$("#loanPeriodCombo").val(req_TERM);

						// 선택했던 대출기간 값 보관
						loanPeriodCombo_maxval = req_TERM;
					}
				}
				
				//권유자
				se_c_nm = dataMap.se_C_NM;
				
				// 신청금액 설정
				loanRenewal4_012.fnKeyup_inputAmt( "default" );

				// 자택정보 설정(주소)
				loanRenewal4_012.fnHomeSetting("default");


				// 스크래핑 연소득에서 또는 직접입력 또는 본인인증에서 온 경우가 아니라면 직장명이 없으므로 조회된 데이터에서 추출
				if( fnCommon_isNull(company_nm) ){
					company_nm = dataMap.co_NM;
				}

				if( !fnCommon_isNull(company_nm) ){
					company_nm = company_nm.replace("&#40;", "(");
					company_nm = company_nm.replace("&#41;", ")");

					$("#company_nm").prop("disabled", true);
					$("#company_nm").css("background-color", "#eee");   // 비활성 시각효과
					$("#company_nm").val(company_nm);
				}

				// 직장연락처
				var ofc_TELNO = dataMap.ofc_TELNO;
				if( !fnCommon_isNull(ofc_TELNO) ){
					loanRenewal4_012.fnKeyup_workTelNo(null, ofc_TELNO);
				}

				/*
				//  직업직위
				var hac_CD = dataMap.hac_CD;
				if( !fnCommon_isNull(hac_CD) ){
					$("#jobPosCode").val(hac_CD);
					$("#jobPosNm").val(dataMap.hac_CD_NAME);
				}
				*/

				// 이메일
				var email = dataMap.email;
				if( !fnCommon_isNull(email) ){
					$("#email").val(email);
				}

				// 자산현황 10억원미만 기본설정
				//$("#assetStatusCombo").val("2");

			
				// K뱅크
				// 은행명 신한은행 기본설정
				// $("#bankCodeCombo").val("88");
				
				// K뱅크 입금계좌정보 입력
				bankCd = dataMap.in_BANK_CD;
				accoNo = dataMap.in_ACCO_NO;
			
				if(!fnCommon_isNull(bankCd) && bankCd != "0") {
					$("#bankCodeCombo").val(bankCd);
					
					if(!fnCommon_isNull(accoNo)) {
						$("#accCd").val(accoNo);
					}
				} else {
					$("#bankCodeCombo").val("88");	// 은행명 신한은행 기본설정
					
				}
				// K뱅크 end

				// 노출문구 수정
				var option_99 = $("#moneyRootCombo").find("option[value='99']").html("기타(대출)");
				if( !fnCommon_isNull(option_99) ){
					option_99.html("기타(대출)");
				}

				// 거래자금의 원천 99 기타
				$("#moneyRootCombo").val("99");
				$("#moneyRootCombo").prop("disabled", true);  // 비활성 처리
				$("#moneyRootCombo").css("background-color", "#eee");   // 비활성 시각효과

				// 추후 사용예정
				if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52343" ){
					$("#return_type").prop("disabled", true);  // 비활성 처리
					$("#return_type").css("background-color", "#eee");   // 비활성 시각효과
				}else {
					$("#return_type").prop("disabled", true);  // 비활성 처리
					$("#return_type").css("background-color", "#eee");   // 비활성 시각효과
				}

				// 가능한도 노출
				// 문자열 제거 후 숫자만 반환 입력된 신청금액(한도비교시 사용)
				if( !fnCommon_isNull(REQ_AMT) ){
					var REQ_AMT_format = fnCommon_getOnlyNumber(REQ_AMT);
					REQ_AMT_format = fnCommon_addComma(REQ_AMT_format);   // 콤마찍기
					$("#req_amt").prop("placeholder", "가능한도 " + REQ_AMT_format);
				}

				// 보증서발급여부 1 발급이면
				if( !fnCommon_isNull(FEE_PAPER_ISSUE_YN)  &&  FEE_PAPER_ISSUE_YN == "1" ){

					// 116 & 진행상태 1  -->  대출기간/신청금액 수정 불가
					if( !fnCommon_isNull(REG_KIND)  &&  REG_KIND == "116"  &&  !fnCommon_isNull(ST_CD)  &&  ST_CD == "1" ){
						$("#loanPeriodCombo").prop("disabled", true);
						$("#loanPeriodCombo").css("background-color", "#eee");   // 비활성 시각효과
						$("#req_amt").prop("disabled", true);
						$("#req_amt").css("background-color", "#eee");   // 비활성 시각효과
					}
				}

			},

			/*---------------------------------------------------------------------------------------
			 * 금융소비자 버튼클릭
			 * loanRenewal4_012.fnChange_qna02
			 ----------------------------------------------------------------------------------------*/
			fnChange_fincust01 : function (e) {
				//전문금융소비자 체크시
				var checked = $('#fincust0102').prop('checked');
				if (!fnCommon_isNull(checked, "boolean")) {
					alert("전문 금융소비자는 '상시근로자 5인 이상인 법인, 조합 등'만 가능합니다.");
					
					// 일반금융소비자 강제 설정
					setTimeout(function(){
						$("#fincust0101").prop("checked", true);
					}, 300); 

				}
			},
			
			fnChange_fincust02 : function (e) {
				//전문금융소비자 체크시
				var checked = $('#fincust0202').prop('checked');
				if (!fnCommon_isNull(checked, "boolean")) {
					alert("[금융소비자 보호에 대한 법률] 제 17조 적합성 원칙에 따라, 대출상품에 대해 이해하지 못한 경우 대출진행이 불가합니다. \n 문의 1800-3651");
					
					// 일반금융소비자 강제 설정
					setTimeout(function(){
						$("#fincust0201").prop("checked", true);
					}, 300); 

				}
			},


			/* --------------------------------------------------------------------------------------
				주소검색 버튼 클릭
				loanRenewal4_012.fnChange_qna01
			 -------------------------------------------------------------------------------------- */
			fnChange_qna01 : function(e){
				
				// 아니오 체크시
				var checked = $("#qna0102").prop("checked");
				if( !fnCommon_isNull(checked, "boolean") ){
					alert("본인이 아닐 경우,\n대출 신청이 불가합니다.");

					// 예로 강제 설정 // 강제 설정 후에 이벤트가 종료되는 현상으로 시간차 설정
					setTimeout(function(){
						$("#qna0101").prop("checked", true);
					}, 300);

					// 이벤트 전파 중지
					// e.preventDefault();
				}
			},



			/* --------------------------------------------------------------------------------------
				주소검색 버튼 클릭
				loanRenewal4_012.fnSearch_Address
			 -------------------------------------------------------------------------------------- */
			fnSearch_Address : function(){
				postType = "home";   // 팝업 호출시 자택/직장 구분값

				// 주소검색 팝업 호출
				showDialog(popupURL_post, 420);
			},



			/* --------------------------------------------------------------------------------------
				고객선택정보, 기본값 조회
				loanRenewal4_012.fnSearch_1
			 -------------------------------------------------------------------------------------- */
			fnSearch_1 : function(){
				$.ajax({
					type: "post",
					url: callURL_loanRenewal4_012_01,
					dataType: "json",
					data: {"TEST_DATA" : "2"},
					success: function(json){
						var fail_flag = true;

						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){
							fail_flag = false;

							company_nm = json.company_nm;  // 직장명
							year_amt = json.year_amt;  // 연소득
							join_company_day = json.join_company_day;  // 입사일자
							// reqTerm = json.reqTerm;  // 대출기간
							goods_CD = json.goods_CD;  // 상품코드
							isAutoReq = json.isAutoReq;  // 자동신청서작성여부 true/false
							minWon24ZipCd = json.minWon24ZipCd;  // 민원24우편번호
							minWon24Addr1 = json.minWon24Addr1;  // 민원24도로명주소
							minWon24HomeAddr2 = json.minWon24HomeAddr2;  // 민원24자택상세주소
							// today_yyyyMMdd = json.today_yyyyMMdd;  // 오늘일자
							bank_INSP_NO = json.bank_INSP_NO;  // 대출신청번호  // 본인인증 output 으로 받은 신청번호
							REG_KIND = json.REG_KIND;  // 전자서명상태(자서접수처 구분)
							ST_CD = json.ST_CD;  // 진행상태
							FEE_PAPER_ISSUE_YN = json.FEE_PAPER_ISSUE_YN;  // 보증서발급여부

							deviceType = json.deviceType;  // 단말기정보
							custNm = json.custNm;  // 고객명
							hndNo = json.HAND_NO;  // 핸드폰번호

							qna01 = json.qna01;  // 직업 1 직장인(4대보험가입) 2 개인사업자 3 기타사업소득자인적용역제공자 4 연금소득자
							qna02 = json.qna02;  // 고용형태 1 정규직 2 비정규직 3 근로소득미신고자 4 일용근로자
							qna03 = json.qna03;  // 주택소유여부 1 예 2 아니오

							employmentType = json.employmentType;  // 고용형태
							homeType = json.homeType;  // 소유주택구분
							minWon24AddrCd1 = json.minWon24AddrCd1;  // 민원24지역코드1
							minWon24AddrCd2 = json.minWon24AddrCd2;  // 민원24지역코드2
							minWon24AddrCd3 = json.minWon24AddrCd3;  // 민원24지역코드3
							minWon24AddrCd4 = json.minWon24AddrCd4;  // 민원24지역코드4

							REQ_AMT = json.REQ_AMT;  // 입력된 신청금액
							MEMO = json.MEMO;  // 입력된 상담내용

				    		SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;  // 건강보험 스크래핑 성공여부
				    		SCRP_MINWON24_SUCCESS_YN = json.SCRP_MINWON24_SUCCESS_YN;   // 민원24 스크래핑 성공여부

				    		SCRP_NHIS_EXP = json.SCRP_NHIS_EXP;  // 건강보험스크래핑제외 여부
				    		SCRP_MINWON24_EXP = json.SCRP_MINWON24_EXP;  // 민원24스크래핑제외 여부

							// 공통코드 콤보 생성
							fnCommon_combo_commcodelist( json.commcodelist_2115, "moneyRootCombo", "Y" );   // 거래자금의 원천
							//fnCommon_combo_commcodelist( json.commcodelist_2118, "assetStatusCombo", "Y" );   // 자산현황 -> 적합성의 자산규모로 대체
							fnCommon_combo_commcodelist( json.commcodelist_bank, "bankCodeCombo", "Y" );   // 은행목록


							// 한도결과조회 화면에서 자동대출 신청하기 클릭하여 넘어온 경우 선택된 대출신청 상품정보
							LNC3003_selected_json = json.LNC3003_selected_json;

							// 자동신청정보  // 한도결과조회 화면에서 데이터를 직접적으로 넘기게 되면서 이 데이터는 사실상 필요가 없어짐.
							LNC3003_obj = json.LNC3003_obj;

							// 대출신청 결과 조회
							LNC3005_selected = json.LNC3005_selected;

							hae_cd = json.HAE_CD;
							job_major_cd = json.JOB_MAJOR_CD;
							
							// 화면값 자동설정
							loanRenewal4_012.fnSetViewData();


						}
						if(fail_flag){
							alert("고객정보 조회에 실패했습니다.");
						}
					},
					error: function(data, textStatus, error) {
						alert("고객정보 조회에 실패했습니다.");
					},
					complete: function() {
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				이메일 사용안함 클릭
				loanRenewal4_012.fnClick_noEmail
			 -------------------------------------------------------------------------------------- */
			fnClick_noEmail : function(e){
				var checked = e.target.checked;
				if( !fnCommon_isNull(checked, "boolean") ){
					$("#email").prop("disabled", true);
					$("#email").prop("placeholder", "");
					$("#email").val("");
		    		$("#email").css("background-color", "#eee");
				}else{
					$("#email").prop("disabled", false);
					$("#email").prop("placeholder", "입력");
		    		$("#email").css("background-color", "");
				}
			},



			/* --------------------------------------------------------------------------------------
				예금주확인 버튼 클릭
				loanRenewal4_012.fnSearch_accountOwner
			 -------------------------------------------------------------------------------------- */
			fnSearch_accountOwner : function(){

				/*// 예금주 확인 여부 // 예금주 확인된 상태면 재조회 불필요
				if(accountOwner_confirm_flag){
					return;
				}*/

				// 은행콤보
				var bankCd = $("#bankCodeCombo option:selected").val();
				if( fnCommon_isNull(bankCd) ){
					alert("은행명을 선택해주세요.");
					return;
				}

				// 계좌번호
				var accCd = $("#accCd").val();
				if( fnCommon_isNull(accCd) ){
					alert("계좌번호를 입력해주세요.");
					return;
				}
				//계좌번호가 원번호가 아닌경우
				var accCdLen =  accCd.length;
				if(accCd.substring(0,3) == '010'){
					if(accCd.length == 11 || accCd.length == 10){
						alert("자동이체 등록이 불가한 계좌번호입니다.\n\n원계좌번호 또는 다른계좌번호를 입력해 주세요");
						return;
					}
				}

				iajax.clearParam();
				iajax.addParam("CHK_CSRF", random);
				iajax.addParam("PROC_GB", "1");   // 처리구분 : 1 비대면대출 계좌확인 2 비대면대출 계좌확인 신청 3 계좌확인조회 4 비대면인증완료
				iajax.addParam("CMS_BANK_CD", bankCd);
				iajax.addParam("CMS_ACNT_NO", accCd);

				$.ajax({
				    type: "post",
				    url: callURL_requestLNC3101,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){
							accountOwner_confirm_flag = true;   // 예금주 확인 여부
							$("#accCd").prop("disabled", true);  // 계좌번호 비활성
							$("#accCd").css("background-color", "#eee");  // 비활성 시각효과
				    		$("#btnAccountOwner").html("확인완료");   // 예금주 확인 버튼
				    		$("#accNm").val( json.CMS_ACNT_CUST_NM );   // 예금주명
				    		alert("예금주 확인이 완료되었습니다.");

				    	}else{
				    		// alert("입력하신 정보가 확인되지 않았습니다.\n확인 후 재입력 부탁 드립니다.");
			    			if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000910" ){
				    			var RESULT_DESC = json.RESULT_DESC;
				    			if( !fnCommon_isNull(RESULT_DESC) ){
				    				alert( RESULT_DESC );
				    			}else{
				    				alert("계좌인증 가능시간이 아닙니다.\n익일 계좌인증을 다시 진행 해주세요.");
				    			}
				    		}else{
				    			alert( "사업자계좌 등 예금주명이 다른 계좌는 등록할 수가 없습니다.");
				    		}

				    	}
					},
					error: function(data, textStatus, error){
						alert(error);
						log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function(){
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				은행 콤보 변경 이벤트
				loanRenewal4_012.fnChange_bankCode
			 -------------------------------------------------------------------------------------- */
			fnChange_bankCode : function(e){

				// 예금주 확인 여부 초기화
				accountOwner_confirm_flag = false;   // 예금주 확인 여부

				$("#accCd").prop("disabled", false);  // 계좌번호 비활성
				$("#accCd").css("background-color", "");  // 비활성 시각효과 제거

	    		$("#btnAccountOwner").html("예금주확인");   // 예금주 확인 버튼
	    		$("#accNm").val("");   // 예금주명
	    		$("#accCd").val("");  // 계좌번호
			},



			/* --------------------------------------------------------------------------------------
				계좌번호 입력 이벤트
				loanRenewal4_012.fnKeyup_accCd
			 -------------------------------------------------------------------------------------- */
			fnKeyup_accCd : function(e){
				var value = e.target.value;

				// 문자열 제거 후 숫자만 반환
				value = fnCommon_getOnlyNumber(value);

				// 필드에 설정
				e.target.value = value;

				// 예금주 확인 여부 초기화
				accountOwner_confirm_flag = false;   // 예금주 확인 여부
	    		$("#btnAccountOwner").html("예금주확인");   // 예금주 확인 버튼
	    		$("#accNm").val("");   // 예금주명
			},



			/* --------------------------------------------------------------------------------------
				직위 검색 버튼 클릭
				loanRenewal4_012.fnSearch_jobPosition
			 -------------------------------------------------------------------------------------- */
			fnSearch_jobPosition : function(){
				showDialog(popupURL_jobposition, 415);
			},




			/* --------------------------------------------------------------------------------------
				직종 검색 버튼 클릭
				loanRenewal4_012.fnSearch_jobType
			 -------------------------------------------------------------------------------------- */
			fnSearch_jobType : function(){
				showDialog(popupURL_jobtype, 415);
			},



			/* --------------------------------------------------------------------------------------
				직위 검색 버튼 클릭
				loanRenewal4_012.fnSearch_jobPosition
			 -------------------------------------------------------------------------------------- */
			fnSearch_sunWeak : function(){
				showDialog(popupURL_sunWeak, 415);
			},



			/* --------------------------------------------------------------------------------------
				상환스케줄 조회 클릭 - 전문 통신하여 계산값 받기
				loanRenewal4_012.fnSearch_paySchedule
			 -------------------------------------------------------------------------------------- */
			fnSearch_paySchedule : function( hafDay_DD ){
				var FIRST_REPAY_DT = "";  // 최초납입예정일
				var FIRST_REPAY_DD = "";  // 최초 납입응당일

				// 납입일자 선택시에는 응당일로 계산한다
				if( !fnCommon_isNull(hafDay_DD)){
					FIRST_REPAY_DD = hafDay_DD;  // 최초 납입응당일
				}else{
					FIRST_REPAY_DT = firstRepayDt;  // 최초납입예정일
				}
				
				// 신청금액
				var req_amt_string = $("#req_amt").val();
				var req_amt = 0;

				if( fnCommon_isNull(req_amt_string)){
					alert("신청금액을 입력해주세요.");
					return;
				}

				// 문자열 제거 후 숫자만 반환
				req_amt_string = fnCommon_getOnlyNumber(req_amt_string);
				if( !fnCommon_isNull(req_amt_string)){
					req_amt = Number(req_amt_string)/10000;
				}


				// 상환방법 1 만기일시상환 2 원금균등상환 3 기타 or 원리금균등상환방식
				var repayKind = "";

				// 상환방식
				var return_type = $("#return_type").val();
				if( !fnCommon_isNull(return_type)  &&  return_type == "원금균등상환방식"){
					repayKind = "2";
				}else{
					repayKind = "3";
				}


				// 대출기간
				var loanPeriod = $("#loanPeriodCombo").val();
				if( fnCommon_isNull(loanPeriod)){
					alert("대출기간을 선택해주세요.");
					return;
				}


				// 사전금리
				var nrml_RT_string = "0";
				var nrml_RT = 0;

				// 한도결과조회 화면에서 넘어온 경우 선택된 대출신청 상품정보
				if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.goods_CD) ){
					nrml_RT_string = LNC3003_selected_json.nrml_RT;

				// 대출신청 결과 조회
				}else if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.goods_CD) ){
					nrml_RT_string = LNC3005_selected.nrml_RT;

				// 자동신청정보 // 사용하지 않게된 데이터임
				}else if( !fnCommon_isNull(LNC3003_obj)  &&  !fnCommon_isNull(LNC3003_obj.goods_CD) ){
					nrml_RT_string = LNC3003_obj.nrml_RT;
				}

				if( !fnCommon_isNull(nrml_RT_string) ){
					nrml_RT = Number( nrml_RT_string );
				}
				
				iajax.clearParam();
				iajax.addParam("CHK_CSRF", random);
				iajax.addParam("LOAN_AMT", req_amt);		// 신청금액
				iajax.addParam("REPAY_CNT", loanPeriod);		// 상환기간 // 대출기간
				iajax.addParam("REPAY_KIND", repayKind);	// 상환방법
				iajax.addParam("GRACE_PERIOD", "0");	// 거치기간
				iajax.addParam("NRML_RT", nrml_RT*1000);	// 대출이율
				iajax.addParam("FIRST_REPAY_DT", FIRST_REPAY_DT);   // 최초납입예정일
				iajax.addParam("FIRST_REPAY_DD", FIRST_REPAY_DD);   // 최초이자불입일
				iajax.addParam("SEND_MSG", "Y");	// 통신 여부

				$.ajax({
					type: "post",
					url: callURL_selectLNC3012,
					dataType: "json",
					data: iajax.postparam,
					success: function(json){
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"
							&&  !fnCommon_isNull(json.DATA)  &&  !fnCommon_isNull(json.DATA.LNC3012SubList) ){

							// 상환스케줄 표 그리기
							loanRenewal4_012.fnRender_repayGrid( json.DATA.LNC3012SubList );

						}else{
							var RESULT_DESC = json.RESULT_DESC;
							if( fnCommon_isNull(RESULT_DESC) ){
								RESULT_DESC = "일시적으로 오류가 발생하였습니다. 관리자에게 문의하시기 바랍니다.";
							}
							alert( RESULT_DESC );
						}
					},
					error: function(data, textStatus, error){
						alert(error);
						log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function(){
						// 납입일자 선택시에는 응당일로 계산 후 영업일 체크조회 추가  &&  오늘일자 아니면 확인여부값 false 임
						if( !fnCommon_isNull(hafDay_DD)  &&  fnCommon_isNull(workingday_confirm_flag, "boolean")  ){

							// 이체일 변경 이벤트 2 - 영업일 체크
							loanRenewal4_012.fnChange_cmsDate_2();
						}
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				상환스케줄 표 그리기
				loanRenewal4_012.fnRender_repayGrid
			 -------------------------------------------------------------------------------------- */
			fnRender_repayGrid : function( LNC3012SubList ){

				// 상환스케줄 초기화
				$("#return_schedule_tbody").html("");
				$("#return_schedule_div").hide();

				if( !fnCommon_isNull(LNC3012SubList.length)  &&  LNC3012SubList.length > 0 ){
					for(var i=0; i < LNC3012SubList.length; i++){
						var html = "";

						var row = LNC3012SubList[i];
						if( !fnCommon_isNull(row) ){

							// 월단위로 증가하며 일자구하기 // 오늘일자 기준으로 월단위 회차일자 생성
							// var return_day = fnCommon_getDay_addMonth( i+1 );

							// 회차일자
							var loan_DATE = row.loan_DATE;
							if( !fnCommon_isNull(loan_DATE)  &&  loan_DATE.length == 8 ){
								loan_DATE = loan_DATE.substring(0, 4) + "." + loan_DATE.substring(4, 6) + "." + loan_DATE.substring(6, 8);

								// 첫 납입일 = 최초납입예정일
								if(i == 0){
									$("#firstRepayDt_format").html(loan_DATE);
								}
							}

							html += "  	<tr>		  ";
							html += "  		<td>" + row.repay_CNT + "</td>	  ";		// 회차
							html += "  		<td>" + loan_DATE + "</td>	  ";	// 회차일자

							html += "  		<td>" + fnCommon_addComma(row.repay_LOAN_BAL) + "</td>	  ";	// 납입금액 - 원금
							html += "  		<td>" + fnCommon_addComma(row.int_AMT) + "</td>	  ";	// 납입금액 - 이자
							html += "  		<td>" + fnCommon_addComma( parseInt(parseInt(row.repay_LOAN_BAL) + parseInt(row.int_AMT)).toString() ) + "</td>	  ";	// 납입금액 - 합계 = 원금 + 이자
							html += "  		<td>" + fnCommon_addComma(row.loan_BAL) + "</td>	  ";	// 대출잔액
							html += "  	</tr>		  ";

							// 상환스케줄 생성
							$("#return_schedule_tbody").append( html );
						}
					}

					// 상환스케줄 노출
					$("#return_schedule_div").show();
				}
			},



			/* --------------------------------------------------------------------------------------
				상환스케줄 조회 클릭(이건 자동대출 계산이래요. 필요없을듯?)
				loanRenewal4_012.fnSearch_paySchedule_autoLoan
			 -------------------------------------------------------------------------------------- */
			fnSearch_paySchedule_autoLoan : function(){

				// 상환스케줄 초기화
				$("#return_schedule_tbody").html("");
				$("#return_schedule_div").hide();

				// 대출기간
				var loanPeriodCombo = $("#loanPeriodCombo").val();
				if( fnCommon_isNull(loanPeriodCombo)){
					alert("대출기간을 선택해주세요.");
					return;
				}

				// 신청금액
				var req_amt = $("#req_amt").val();
				if( fnCommon_isNull(req_amt)){
					alert("신청금액을 입력해주세요.");
					return;
				}

				// 문자열 제거 후 숫자만 반환
				req_amt = fnCommon_getOnlyNumber(req_amt);

				// 사전금리
				var nrml_RT_string = "0";
				var nrml_RT = 0;

				// 인하금리
				var redu_RT_string = "0";
				var redu_RT = 0;

				// 한도결과조회 화면에서 넘어온 경우 선택된 대출신청 상품정보
				if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.goods_CD) ){
					nrml_RT_string = LNC3003_selected_json.nrml_RT;
					redu_RT_string = LNC3003_selected_json.redu_RT;

				// 대출신청 결과 조회
				}else if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.goods_CD) ){
					nrml_RT_string = LNC3005_selected.nrml_RT;

				// 자동신청정보
				}else if( !fnCommon_isNull(LNC3003_obj)  &&  !fnCommon_isNull(LNC3003_obj.goods_CD) ){
					nrml_RT_string = LNC3003_obj.nrml_RT;
					redu_RT_string = LNC3003_obj.redu_RT;
				}

				if( !fnCommon_isNull(nrml_RT_string) ){
					nrml_RT = Number( nrml_RT_string );
				}
				if( !fnCommon_isNull(redu_RT_string) ){
					redu_RT = Number( redu_RT_string );
				}

				// 대출기간
				var loanPeriodCombo = $("#loanPeriodCombo").val();
				if( !fnCommon_isNull(loanPeriodCombo) ){
					var loanPeriod = Number(loanPeriodCombo);
					if( !fnCommon_isNull(loanPeriod) ){
						var nrml_RT_division_100 = parseFloat(nrml_RT/100);  // 연금리 // 사전금리 백분율로 변환
						var req_amt_0000 = Number(req_amt);   // 신청금액
						var redu_RT_division_100 = parseFloat(redu_RT/100);   // 인하금리 백분율로 변환
						// var req_amt_0000_ori = Number(req_amt + "0000");
						// var nrml_RT_division_100_12 = parseFloat(nrml_RT_division_100/12);  // 월금리

						var sumAmt = 0;  // 누적합계
						// var sumOriInterest = 0;  // 누적이자
						// var sumInterest = 0;   // 누적이자
						// var sumDiffInterest = 0;

						for(var i = 0; i < loanPeriod; i++){
							var html = "";

							// 기간 1년 이상부터는 인하금리 적용
							if(i >= 12){
								nrml_RT_division_100 = parseFloat(nrml_RT_division_100 - redu_RT_division_100);
							}

							var rate = parseFloat(nrml_RT_division_100/12);   // 인하금리까지 반영된 월금리
							var interest = Math.floor(req_amt_0000 * rate);   // 신청금액*월금리=이자
							// var oriInterest = Math.floor(req_amt_0000_ori * nrml_RT_division_100_12);   // 신청금액*월금리

							// 월금리, 잔여기간개월수, 신청금액으로 해당개월납입금액 구하기
							var this_month_RepayAmt = Math.floor(Math.abs( loanRenewal4_012.fnGet_thisMonthRepayAmt(rate, loanPeriod-i, req_amt_0000) ));
							// var this_month_RepayAmt_2 = Math.floor(Math.abs( loanRenewal4_012.fnGet_thisMonthRepayAmt(nrml_RT_division_100_12, loanPeriod-i, req_amt_0000) ));

							var paymentCapital = this_month_RepayAmt - interest;   // 해당개월납입금액-이자=원금
							req_amt_0000 = req_amt_0000 - (this_month_RepayAmt - interest);   // 잔액
							sumAmt += paymentCapital;   // 누적합계

							// sumOriInterest += oriInterest;  // 누적이자
							// sumInterest += interest;  // 누적이자
							// sumDiffInterest += (oriInterest - interest);
							// req_amt_0000_ori = req_amt_0000_ori-(this_month_RepayAmt_2-oriInterest);

							// 월단위로 증가하며 일자구하기 // 오늘일자 기준으로 월단위 회차일자 생성
							var return_day = fnCommon_getDay_addMonth( i+1 );

							html += "  	<tr>		  ";
							html += "  		<td>" + (i+1) + "</td>	  ";		// 회차
							html += "  		<td>" + return_day + "</td>	  ";	// 회차일자

							html += "  		<td>" + fnCommon_addComma(paymentCapital) + "</td>	  ";	// 납입금액 - 원금
							html += "  		<td>" + fnCommon_addComma(interest) + "</td>	  ";	// 납입금액 - 이자
							html += "  		<td>" + fnCommon_addComma(sumAmt) + "</td>	  ";	// 납입금액 - 합계
							html += "  		<td>" + fnCommon_addComma(req_amt_0000) + "</td>	  ";	// 대출잔액
							html += "  	</tr>		  ";

							// 상환스케줄 생성
							$("#return_schedule_tbody").append( html );
						}

						// 상환스케줄 노출
						$("#return_schedule_div").show();
					}
				}

				/*
				var popupURL = "<c:url value='/popup/autoloanSchedule'/>";   // pop_autoloan_schedule
				showDialog(popupURL, 450);
				*/
			},



			/* --------------------------------------------------------------------------------------
				월금리, 잔여기간개월수, 신청금액으로 해당월납입금액 구하기
				loanRenewal4_012.fnGet_thisMonthRepayAmt
			 -------------------------------------------------------------------------------------- */
			fnGet_thisMonthRepayAmt : function( rate, loanPeriod, req_amt_0000 ){

				// 월금리 0이면
				if(rate == 0){
					return - req_amt_0000 / loanPeriod;  // 신청금액/잔여기간개월수 음수로 반환
				}

				var pow = Math.pow(rate+1, loanPeriod);   // 제곱표기 (월금리의 개월승)
				var thisMonthRepayAmt = rate / (pow - 1) * -(req_amt_0000 * pow);

				return thisMonthRepayAmt;
			},



			/* --------------------------------------------------------------------------------------
				대출신청 완료 버튼 클릭  // 대출신청서작성완료 호출 - 직장인최적상품대출신청
				loanRenewal4_012.fnSave_1
			 -------------------------------------------------------------------------------------- */
			fnSave_1 : function(){
				// 유효성 체크
				var result = loanRenewal4_012.fnValidationCheck("default");
				if(!result){
					return false;
				}
				// iajax 구성 // 신청구분 3 자동신청가능여부
				loanRenewal4_012.fnSetAjaxParam("3");
				// iajax 연계점 정보 parameter 추가
				fnCommon_partnerData();

				$.ajax({
				    type: "post",
				    url: callURL_requestLNC4004,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

				    		// 자동대출가능여부
				    		var autolaonPsbYn = json.DATA.AUTOLOAN_PSB_YN;

				    		// 자동대출가능여부 1 자동신청가능
							if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "1" ){

				    			// 자동대출 호출
				    			loanRenewal4_012.fnSave_2();

			    			// 자동대출가능여부 2 신청서작성
				    		}else if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "2"){

				    			// 자동신청서작성
				    			loanRenewal4_012.fnSave_3();

				    		}else if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "3" ){

				    			// 온라인서류제출하기 종료
								var type = "3";
								if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "3"){
									type = "2";
								}

								var data_list = [
										 { "key" : "view_name", "value" : "loanRenewal4_013" }   // 대출신청이 접수되었습니다.
									   , { "key" : "title", "value" : "신청결과" }
									   , { "key" : "type", "value" : type }   // 1 앱설치하기, 2 온라인서류제출하기 3 기본 4 이어서진행하기 5 대출불가안내
									];

								// renewal4 공통 url 호출
								fnCommon_callUrl( data_list );


				    		}else{

				    			// 전화신청
				    			loanRenewal4_012.fnSave_4();

				    		}

				    	}else{

				    		// 대출불가안내
				    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302" ){
					    		loanRenewal4_012.fnGoNextSorryStep();

				    		// 오류메세지안내
				    		}else{
					    		var errorMsg = json.RESULT_DESC;
								alert(errorMsg.split("<br/>").join("\n"));
				    		}
				    	}
				    },
					error: function(data, textStatus, error){
						alert(error);
						log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function(){
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				신청구분에 따른 값 자동설정
				loanRenewal4_012.fnSetAjaxParam
			 -------------------------------------------------------------------------------------- */
			fnSetAjaxParam : function(reqGb){
				var email = "";   // 이메일

				// 신청정보에서 데이터 추출
				var dataMap = loanRenewal4_012.fnGetDataParam();

				// 이메일 사용안함 체크박스
				var noEmail = $("#noEmail");
				var noEmail_checked = noEmail.prop("checked");
				if( fnCommon_isNull(noEmail_checked, "boolean") ){

					// 체크안된 경우 이메일 입력 필수
					email = $("#email").val();
				}

				// 직장전화번호
				var workTelNum = $("#workTelNum").val();
				workTelNum = fnCommon_getOnlyNumber(workTelNum);   // 문자열 제거 후 숫자만 반환

				// 신청금액
				var req_amt = $("#req_amt").val();
				req_amt = fnCommon_getOnlyNumber(req_amt);   // 문자열 제거 후 숫자만 반환

				// 한도금액 // 사전한도
				var limit_AMT = "";

				// 한도결과조회 화면에서 넘어온 경우 선택된 대출신청 상품정보
				if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.goods_CD) ){
					limit_AMT = LNC3003_selected_json.limit_AMT;

				// 대출신청 결과 조회
				}else if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.goods_CD) ){
					limit_AMT = LNC3005_selected.req_AMT;

				// 자동신청정보 // 3005 에는 한도정보가 없고 신청서작성은 자동대출일때만 진행하므로 여기서 꺼내쓰자!
				}else if( !fnCommon_isNull(LNC3003_obj)  &&  !fnCommon_isNull(LNC3003_obj.goods_CD) ){
					limit_AMT = LNC3003_obj.limit_AMT;
				}

				if( !fnCommon_isNull(limit_AMT) ){
					limit_AMT += "0000";   // 만원 단위로 변환
				}

				iajax.clearParam();
				iajax.addParam("CHK_CSRF", random);
				iajax.addParam("CUST_NO", dataMap.cust_NO);
				iajax.addParam("GOODS_CD", dataMap.goods_CD);
				iajax.addParam("REQ_AMT", req_amt);
				iajax.addParam("BANK_INSP_NO", bank_INSP_NO);
				iajax.addParam("SEND_MSG", "Y");

				iajax.addParam("CMS_BANK_CD", $("#bankCodeCombo").val());   // 은행명 콤보
				iajax.addParam("CMS_ACNT_NO", $("#accCd").val());   // 계좌번호
				iajax.addParam("CMS_CUST_NM", $("#accNm").val());  // 예금주명

				iajax.addParam("REQ_TERM", $("#loanPeriodCombo").val());   // 대출기간
				iajax.addParam("CMS_REQ_DATE", $("#cmsDateCombo").val());   // 납입일

				iajax.addParam("ADR_DSTCD", $("#residAddrType").val());
				iajax.addParam("ADR_ZIP", $("#residZipCode").val());
				iajax.addParam("ADR_ZIP_ADDR", $("#residAddr1").val());
				iajax.addParam("ADR_ZIP_DTL_ADDR", $("#residAddr2").val());
				iajax.addParam("ADR_BLD_MNG_NO", $("#residBuildingCode").val());

				iajax.addParam("REAL_DSTCD", $("#homeAddrType").val()); // 실거주주소구분
				iajax.addParam("REAL_ZIP", $("#homeZipCode").val()); // 실거주우편번호
				iajax.addParam("REAL_ZIP_ADDR", $("#homeAddr1").val()); // 실거주기본주소
				iajax.addParam("REAL_ZIP_DTL_ADDR", $("#homeAddr2").val()); // 실거주상세주소
				iajax.addParam("REAL_BLD_MNG_NO", $("#homeBuildingCode").val()); // 실거주건물관리번호

				iajax.addParam("EMAIL", email);
				iajax.addParam("OFC_TELNO", workTelNum);

				iajax.addParam("EMP_FORM_CD", qna02);
				iajax.addParam("FUND_YONGDO_CD", $("#useTypeCombo").val());   // 자금용도
				iajax.addParam("HOUSE_OWN_DSTCD", qna03);

				iajax.addParam("JOB_POS_CD", $("#jobPosCode").val());   // 직위
				iajax.addParam("JOB_POS_ETC", $("#jobPosSelf").val());   // 직위직접입력란 TOBE 에는 미사용
				iajax.addParam("JOB_TYPE_CD", $("#jobTypeCode").val());   // 직종
				iajax.addParam("JOB_TYPE_ETC", $("#jobTypeSelf").val());   // 그외직종직접입력값

				iajax.addParam("REAL_CUST_YN", "Y");
				iajax.addParam("MONEY_ROOT_CD", $("#moneyRootCombo").val());   // 거래자금 원천
				iajax.addParam("MONEY_ROOT_ETC", $("#moneyRootSelf").val());	 // 거래자금 원천 직접입력값
				
				//iajax.addParam("ASSET_STS_CD", $("#assetStatusCombo").val());   // 자금현황
				iajax.addParam("ASSET_STS_CD", $('#totAssetCdCombo').val());   // 자금현황에 자산규모 값 세팅
				
				//-> 적합성 데이터 추가-------------------------------------------------------------
				var finCustGb = "";
				var finCustGb_obj = $("input[type='radio'][name='finCustGb']:checked");
				if( !fnCommon_isNull(finCustGb_obj)  &&  !fnCommon_isNull(finCustGb_obj.length)  &&  finCustGb_obj.length > 0 ){
					finCustGb = finCustGb_obj[0].value;
				}
				/*var goodsKnowCd = "";
				var goodsKnowCd_obj = $("input[type='radio'][name='goodsKnowCd']:checked");
				if( !fnCommon_isNull(goodsKnowCd_obj)  &&  !fnCommon_isNull(goodsKnowCd_obj.length)  &&  goodsKnowCd_obj.length > 0 ){
					goodsKnowCd = goodsKnowCd_obj[0].value;
				}
				var loanExprCd = "";
				var loanExprCd_obj = $("input[type='radio'][name='loanExprCd']:checked");
				if( !fnCommon_isNull(loanExprCd_obj)  &&  !fnCommon_isNull(loanExprCd_obj.length)  &&  loanExprCd_obj.length > 0 ){
					loanExprCd = loanExprCd_obj[0].value;
				}
				*/
				
				iajax.addParam("FIN_CUST_GB", finCustGb); //금융소비자구분				
				iajax.addParam("TOT_ASSET_CD", $('#totAssetCdCombo').val()); //총자산규모
				iajax.addParam("FIXED_EXP_CD", $('#fixedExpCdCombo').val()); //고정지출비용
				//iajax.addParam("GOODS_KNOW_CD", goodsKnowCd); //대출상품이해도 제외됨 2021.03.19
				//iajax.addParam("LOAN_EXPR_CD", loanExprCd); //대출경험 제외됨 2021.03.22
				//-----------------------------------------------------------------------------

				iajax.addParam("LIMIT_AMT", limit_AMT);   // 한도금액
				iajax.addParam("REQ_GB", reqGb);  // 신청구분 1 전화신청 2 자동대출 3 자동신청가능여부 4 자동신청 5 온라인햇살론오류로인한신청 6 자동신청서작성
				iajax.addParam("TRANC_YN", "0");   // 대환여부 1 대환 0 대환아님 // 신청서작성화면은 자동대출일때만 올수있고 자동대출은 대환선택불가
				iajax.addParam("SUN_WEAK_CD", $("#sunWeakCode").val());   // 햇살론 취약계층

				if( !fnCommon_isNull(minWon24AddrCd1) ){
					iajax.addParam("MINWON24_ADDR_CD1", minWon24AddrCd1);
				}
				if( !fnCommon_isNull(minWon24AddrCd2) ){
					iajax.addParam("MINWON24_ADDR_CD2", minWon24AddrCd2);
				}
				if( !fnCommon_isNull(minWon24AddrCd3) ){
					iajax.addParam("MINWON24_ADDR_CD3", minWon24AddrCd3);
				}
				if( !fnCommon_isNull(minWon24AddrCd4) ){
					iajax.addParam("MINWON24_ADDR_CD4", minWon24AddrCd4);
				}
			},



			/* --------------------------------------------------------------------------------------
				전화신청
				loanRenewal4_012.fnSave_4
			 -------------------------------------------------------------------------------------- */
			fnSave_4 : function(){

				// iajax 구성 // 신청구분 1 전화신청
				loanRenewal4_012.fnSetAjaxParam("1");

				// iajax 연계점 정보 parameter 추가
				fnCommon_partnerData();

				$.ajax({
				    type: "post",
				    url: callURL_requestLNC4004,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json) {
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){
				    		var type = "";

							// 신청정보에서 데이터 추출
							var dataMap = loanRenewal4_012.fnGetDataParam();

				    		type = "2";


			    			// "대출 신청이 접수되었습니다."
			    			var data_list = [
			    		             { "key" : "view_name", "value" : "loanRenewal4_013" }
			    		           , { "key" : "title", "value" : "신청결과" }
			    		           , { "key" : "type", "value" : type }   // type : 1 앱설치하기, 2 온라인서류제출하기 3 기본 4 이어서진행하기 5 대출불가안내
			    				];

			    			// renewal4 공통 url 호출
			    			fnCommon_callUrl( data_list );

				    	}else{

				    		// 대출불가안내
				    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302" ){
					    		loanRenewal4_012.fnGoNextSorryStep();

				    		// 오류메세지안내
				    		}else{
					    		var errorMsg = json.RESULT_DESC;
								alert(errorMsg.split("<br/>").join("\n"));
				    		}
				    	}
				    },
					error: function(data, textStatus, error) {
						alert(error);
						log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function() {
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				기본값 조회
				loanRenewal4_012.fnGetWon
			 -------------------------------------------------------------------------------------- */
			fnGetWon : function(){
				var loanAmt = document.getElementById("won");

				// 콤마제거
				var str = loanAmt.value;
				str = str.replace(/,/g,'');
				loanAmt.value = str;

				var returnVal = loanAmt.value;
				fnCommon_addComma(loanAmt);  // 천단위마다 콤마추가
				return returnVal;
			},



			/* --------------------------------------------------------------------------------------
				신청정보에서 데이터 추출 // 자동대출 선택시 고객 선택상품값, 자동대출신청정보, 대출신청서작성정보 중 데이터 추출
				loanRenewal4_012.fnGetDataParam
			 -------------------------------------------------------------------------------------- */
			fnGetDataParam : function(){
				var result = {};

				var cust_NO = "";   // 고객번호
				var goods_CD = "";   // 상품코드
				var bank_INSP_NO_check = "";	// 저축은행신청번호
				var co_NM = "";  // 직장명
				
				// K뱅크
				var bankCd = "";	// 은행코드
				var accoNo = "";	// 계좌번호

				// 3005 에만 있는 컬럼
				var req_AMT = "";   // 신청금액
				var req_TERM = "";   // 대출기간
				var fund_YONGDO_CD = "";   // 자금용도
				var ofc_TELNO = "";   // 직장연락처
				var hac_CD = "";   // 직업직위
				var hac_CD_NAME = "";   // 직업직위명
				var email = "";   // 이메일
				var sun_WEAK_CD = ""; //햇살론 취약계층 구분
				var	se_C_NM = "";	//권유자
				
				if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.goods_CD) ){
						cust_NO = LNC3003_selected_json.cust_NO;
						goods_CD = LNC3003_selected_json.goods_CD;
						
						//K뱅크
						bankCd = LNC3003_selected_json.in_BANK_CD;
						accoNo = LNC3003_selected_json.in_ACCO_NO;
					// 대출신청 결과 조회
				}else if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.goods_CD) ){
					cust_NO = LNC3005_selected.cust_NO;
					goods_CD = LNC3005_selected.goods_CD;
					
					//K뱅크
					bankCd = LNC3005_selected.in_BANK_CD;
					accoNo = LNC3005_selected.in_ACCO_NO;
					
					//권유자
					se_C_NM = LNC3005_selected.se_C_NM;

				// 한도결과조회 화면에서 넘어온 경우 선택된 대출신청 상품정보
				}else if( !fnCommon_isNull(LNC3003_obj)  &&  !fnCommon_isNull(LNC3003_obj.goods_CD) ){
					cust_NO = LNC3003_obj.cust_NO;
					goods_CD = LNC3003_obj.goods_CD;
					
					//K뱅크
					bankCd = LNC3003_obj.in_BANK_CD;
					accoNo = LNC3003_obj.in_ACCO_NO;
				}
				if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.goods_CD) ){

					cust_NO = LNC3005_selected.cust_NO;
					co_NM = LNC3005_selected.co_NM;

					bank_INSP_NO_check = LNC3005_selected.bank_INSP_NO;  // 3005 에서는 신청번호 추출해서 사용
					req_AMT = LNC3005_selected.req_AMT;
					req_TERM = LNC3005_selected.req_TERM;
					fund_YONGDO_CD = LNC3005_selected.fund_YONGDO_CD;
					ofc_TELNO = LNC3005_selected.ofc_TELNO;
					hac_CD = LNC3005_selected.hac_CD;
					hac_CD_NAME = LNC3005_selected.hac_CD_NAME;
					email = LNC3005_selected.email;
					sun_WEAK_CD = LNC3005_selected.sun_WEAK_CD;
					if( !fnCommon_isNull(req_AMT)){
						req_AMT += "0000";  // 만 단위로 조정
					}
					
					// K뱅크
					bankCd = LNC3005_selected.in_BANK_CD;
					accoNo = LNC3005_selected.in_ACCO_NO;
					
					//권유자
					se_C_NM = LNC3005_selected.se_C_NM;
				}


				// 이어하기 진입시 직장명 native에 뿌렸다가 다시 받는경우 한글깨짐현상이 있어 다시 조회한 값으로 추출
				if( fnCommon_isNull(company_nm) ){
					if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.goods_CD) ){
						co_NM = LNC3005_selected.co_NM;
					}
				}

				// 반환할 맵에 데이터 삽입
				result.cust_NO = cust_NO;
				result.goods_CD = goods_CD;
				result.co_NM = co_NM;

				result.bank_INSP_NO = bank_INSP_NO_check;

				result.req_AMT = req_AMT;
				result.req_TERM = req_TERM;
				result.fund_YONGDO_CD = fund_YONGDO_CD;
				result.ofc_TELNO = ofc_TELNO;
				result.hac_CD = hac_CD;
				result.hac_CD_NAME = hac_CD_NAME;
				result.email = email;
				result.sun_WEAK_CD = sun_WEAK_CD;
				
				//K뱅크
				result.in_BANK_CD = bankCd;	
				result.in_ACCO_NO = accoNo;
				
				//권유자 
				result.se_C_NM = se_C_NM;

				return result;
			},



			/* --------------------------------------------------------------------------------------
				자동대출 호출
				loanRenewal4_012.fnSave_2
			 -------------------------------------------------------------------------------------- */
			fnSave_2 : function(){

				// 신청구분 1 전화신청 2 자동대출 3 자동신청가능여부 4 자동신청 5 온라인햇살론오류로인한신청 6 자동신청서작성
				var REQ_GB = "";

				// 앱여부
				var isApp_flag = fnCommon_isApp();

				// 자동대출 진행 // 건강보험스크래핑제외 여부  or  건보스크래핑 성공
				if( isApp_flag  &&  ((!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")  ||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y")) ){

					REQ_GB = "2";  // 신청구분 2 자동대출
				}else{
					REQ_GB = "4";  // 신청구분 4 자동신청
				}

				// iajax 구성
				loanRenewal4_012.fnSetAjaxParam( REQ_GB );

				// 신청정보에서 데이터 추출
				var dataMap = loanRenewal4_012.fnGetDataParam();

				// iajax 연계점 정보 parameter 추가
				fnCommon_partnerData();

				$.ajax({
				    type: "post",
				    url: callURL_requestLNC4004,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json) {
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){
				    		if(REQ_GB == "2"){

								// 대출 실행 전 안내 호출
					    		loanRenewal4_012.fnGoNextBeforeGuideStep(json.DATA.LOAN_INSP_NO, json.DATA.BANK_COMFIRM_NO);

				    		}else{
				    			// "대출 신청이 접수되었습니다."
				    			var data_list = [
				    		             { "key" : "view_name", "value" : "loanRenewal4_013" }
				    		           , { "key" : "title", "value" : "신청결과" }
				    		           , { "key" : "type", "value" : "4" }   // type : 1 앱설치하기, 2 온라인서류제출하기 3 기본 4 이어서진행하기 5 대출불가안내
				    				];

				    			// renewal4 공통 url 호출
				    			fnCommon_callUrl( data_list );
				    		}

				    	}else{

				    		// 대출불가안내
				    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302" ){
					    		loanRenewal4_012.fnGoNextSorryStep();

				    		}else{

					    		// 온라인햇살론
								if( !fnCommon_isNull(dataMap.goods_CD)  &&  dataMap.goods_CD == "52351" ){

									// 온라인햇살론오류로인한신청
					    			loanRenewal4_012.fnGoOnlineSunshineLoanSubmit();

					    		}else{
						    		var errorMsg = json.RESULT_DESC;
									alert(errorMsg.split("<br/>").join("\n"));
					    		}
				    		}
				    	}
				    },
					error: function(data, textStatus, error) {
						alert(error);
						log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function() {
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				자동신청서작성
				loanRenewal4_012.fnSave_3
			 -------------------------------------------------------------------------------------- */
			fnSave_3 : function(){
   		
	    		// 앱여부
				var isApp_flag = fnCommon_isApp();

				// 자동대출 진행 // 건강보험스크래핑제외 여부  or  건보스크래핑 성공
				if( isApp_flag ){
					REQ_GB = "6";  // 신청구분 2 자동대출
				}else{
					
					REQ_GB = "4";  // 신청구분 4 자동신청
				}
				
				loanRenewal4_012.fnSetAjaxParam(REQ_GB);
				
				// 신청정보에서 데이터 추출
				var dataMap = loanRenewal4_012.fnGetDataParam();

				// iajax 연계점 정보 parameter 추가
				fnCommon_partnerData();

				$.ajax({
				    type: "post",
				    url: callURL_requestLNC4004,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json) {
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

				    		
							if(REQ_GB == "6"){

					    		// 대출 실행 전 안내 호출
					    		loanRenewal4_012.fnGoNextBeforeGuideStep(json.DATA.LOAN_INSP_NO, json.DATA.BANK_COMFIRM_NO);

				    		}else{
				    			// "대출 신청이 접수되었습니다."
				    			var data_list = [
				    		             { "key" : "view_name", "value" : "loanRenewal4_013" }
				    		           , { "key" : "title", "value" : "신청결과" }
				    		           , { "key" : "type", "value" : "4" }   // 1 앱설치하기, 2 온라인서류제출하기 3 기본 4 이어서진행하기 5 대출불가안내
				    				];

				    			// renewal4 공통 url 호출
				    			fnCommon_callUrl( data_list );
				    		}

				    	}else{

				    		// 대출불가안내
				    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302" ){
					    		loanRenewal4_012.fnGoNextSorryStep();

				    		}else{
								// 52351 온라인햇살론
								if( !fnCommon_isNull(dataMap.goods_CD)  &&  dataMap.goods_CD == "52351" ){

									// 온라인햇살론오류로인한신청
						    		loanRenewal4_012.fnGoOnlineSunshineLoanSubmit();

								}else{
						    		var errorMsg = json.RESULT_DESC;
									alert(errorMsg.split("<br/>").join("\n"));
								}
				    		}
				    	}
				    },
					error: function(data, textStatus, error) {
						alert(error);
						log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function() {
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				온라인햇살론오류로인한신청
				loanRenewal4_012.fnGoOnlineSunshineLoanSubmit
			 -------------------------------------------------------------------------------------- */
			fnGoOnlineSunshineLoanSubmit : function(){

				// 신청정보에서 데이터 추출
				var dataMap = loanRenewal4_012.fnGetDataParam();

				// 신청금액
				var req_amt = $("#req_amt").val();
				req_amt = fnCommon_getOnlyNumber(req_amt);   // 문자열 제거 후 숫자만 반환

				iajax.clearParam();
				iajax.addParam("CHK_CSRF", random);
				iajax.addParam("CUST_NO", dataMap.cust_NO);
				iajax.addParam("GOODS_CD", dataMap.goods_CD);
				iajax.addParam("REQ_AMT", req_amt);
				iajax.addParam("BANK_INSP_NO", bank_INSP_NO);
				iajax.addParam("REQ_GB", "5");   // 5 온라인햇살론오류로인한신청
				iajax.addParam("SEND_MSG", "Y");   // 전문통신여부
				iajax.addParam("TRANC_YN", "0");   // 대환여부 1 대환 0 대환아님 // 신청서작성화면은 자동대출일때만 올수있고 자동대출은 대환선택불가
				iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// 류예샘D 신규대행사(애드게더) 파라미터 적재
				
				// iajax 연계점 정보 parameter 추가
				fnCommon_partnerData();

				$.ajax({
				    type: "post",
				    url: callURL_requestLNC3004,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json) {
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"  ){
				    		alert("온라인햇살론 보증서 발급이 잠시 중단되어, 담당 직원이 확인 후 연락드리겠습니다.");

							// "대출 신청이 접수되었습니다."
							var data_list = [
						             { "key" : "view_name", "value" : "loanRenewal4_013" }
						           , { "key" : "title", "value" : "신청결과" }
						           , { "key" : "type", "value" : "3" }   // type : 1 앱설치하기, 2 온라인서류제출하기 3 기본 4 이어서진행하기 5 대출불가안내
								];

							// renewal4 공통 url 호출
							fnCommon_callUrl( data_list );

				    	}else{

				    		// 대출불가안내
				    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
					    		loanRenewal4_012.fnGoNextSorryStep();

				    		// 오류메세지안내
				    		}else{
					    		var errorMsg = json.RESULT_DESC;
								alert(errorMsg.split("<br/>").join("\n"));
				    		}
				    	}
					},
					error: function(data, textStatus, error) {
						alert(error);
						log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function() {
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				대출불가안내
				loanRenewal4_012.fnGoNextSorryStep
			 -------------------------------------------------------------------------------------- */
			fnGoNextSorryStep : function(){

				// "대출 신청이 접수되었습니다."
				var data_list = [
			             { "key" : "view_name", "value" : "loanRenewal4_013" }
			           , { "key" : "title", "value" : "신청결과" }
			           , { "key" : "type", "value" : "5" }   // 1 앱설치하기, 2 온라인서류제출하기 3 기본 4 이어서진행하기 5 대출불가안내
					];

				// renewal4 공통 url 호출
				fnCommon_callUrl( data_list );
			},



			/* --------------------------------------------------------------------------------------
				유효성체크
				loanRenewal4_012.fnValidationCheck
			 -------------------------------------------------------------------------------------- */
			fnValidationCheck : function( type, num ){

				// 결과처리에 사용할 리스트
				var result_list = [];

				// 신청금액
				var req_amt = $("#req_amt").val();
				var req_amt_number = 0;
				req_amt = fnCommon_getOnlyNumber(req_amt);   // 문자열 제거 후 숫자만 반환
				if(fnCommon_isNull(req_amt)){
					result_list.push({
						  msg : "신청금액을 정확하게 입력해주세요."
						, focus_field_id : "req_amt"
						, focus_slid_id : "btn_slid_1"
					});

				}else{
					req_amt_number = Number(req_amt);

					// 10만 단위로 입력형식 제한
					if(req_amt_number > 0  &&  req_amt_number > 100000){
						var req_amt_number_2 = req_amt_number%100000;
						if(!fnCommon_isNull(req_amt_number_2)  &&  req_amt_number_2 > 0){

							// 메세지 팝업
				    		var msg = "<p>신청금액은 10만원 단위로 입력 가능합니다.</p>";
				    		var no_button_flag = false;  // 아니오 버튼 노출 여부
				    		var fnCallback_yes = loanRenewal4_012.fnKeyup_inputAmt_2;  // 확인 버튼에 함수 지정 // 한도결과조회 화면 이동
				    		var fnCallback_no = null;  // 아니오 미사용

							fnCommon_popup("open", msg, no_button_flag, fnCallback_yes, fnCallback_no);
							return false;
						}
					}
				}

				// 사전한도
				var limit_AMT = "";
				var limit_AMT_number = 0;

				// 한도결과조회 화면에서 넘어온 경우 선택된 대출신청 상품정보
				if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.goods_CD) ){
					limit_AMT = LNC3003_selected_json.limit_AMT;

				// 대출신청 결과 조회
				}else if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.goods_CD) ){
					limit_AMT = LNC3005_selected.req_AMT;

				// 자동신청정보
				}else if( !fnCommon_isNull(LNC3003_obj)  &&  !fnCommon_isNull(LNC3003_obj.goods_CD) ){
					limit_AMT = LNC3003_obj.limit_AMT;
				}

				if( !fnCommon_isNull(limit_AMT) ){
					limit_AMT_number = Number(limit_AMT) * 10000;  // 만원 단위로 변환
				}

				// 신청금액 한도범위내 체크
				if(limit_AMT_number < req_amt_number){
					result_list.push({
						  msg : "선택하신 상품의 예상한도를 초과하셨습니다."
						, focus_field_id : "req_amt"
						, focus_slid_id : "btn_slid_1"
					});
				}


				var chk_goods_cd = "";
				if( !fnCommon_isNull(LNC3003_selected_json.goods_CD) ){
					chk_goods_cd = LNC3003_selected_json.goods_CD;
				}else if( !fnCommon_isNull(LNC3005_selected.goods_CD) ){
					chk_goods_cd = LNC3005_selected.goods_CD;
				}else if( !fnCommon_isNull(LNC3003_obj.goods_CD) ){
					chk_goods_cd = LNC3003_obj.goods_CD;
				}

				//권유자에 따른 신청금액 제어 
				if( !fnCommon_isNull(se_c_nm) && (se_c_nm == "777805" || se_c_nm == "777801") ) //케이뱅크, 웰컴저축은행
				{
					if(req_amt_number < 1000000)
					{						
						result_list.push({
							  msg : "신청 최소금액은 100만원입니다. 신청금액을 다시 확인하여 주세요."
							, focus_field_id : "req_amt"
							, focus_slid_id : "btn_slid_1"
						});
					}
				}
				else
				if( "52341" == chk_goods_cd){ // 참신한500
					if( req_amt_number < 500000 ){
						result_list.push({
							  msg : "신청금액은 최소 50만원 이상 입력하셔야 합니다."
							, focus_field_id : "req_amt"
							, focus_slid_id : "btn_slid_1"
						});
					}
				}else if(req_amt_number < 1000000){
					result_list.push({
						  msg : "신청금액은 최소 100만원 이상 입력하셔야 합니다."
						, focus_field_id : "req_amt"
						, focus_slid_id : "btn_slid_1"
					});
				}

				if(req_amt_number%10000 != 0){
					result_list.push({
						  msg : "신청금액은 만원 단위로 입력해주세요."
						, focus_field_id : "req_amt"
						, focus_slid_id : "btn_slid_1"
					});
				}

				// 대출기간
				var loanPeriod = $("#loanPeriodCombo").val();
				if( fnCommon_isNull(loanPeriod) ){
					result_list.push({
						  msg : "대출기간을 선택해주세요."
						, focus_field_id : "loanPeriodCombo"
						, focus_slid_id : "btn_slid_1"
					});
				}

				// 자금용도
				var useTypeCombo = $("#useTypeCombo").val();
				if( fnCommon_isNull(useTypeCombo) ){
					result_list.push({
						  msg : "자금용도를 선택해주세요."
						, focus_field_id : "useTypeCombo"
						, focus_slid_id : "btn_slid_1"
					});
				}

				// 대출금 본인 사용여부
				var qna0101 = $("#qna0101");
				var qna0101_checked = qna0101.prop("checked");
				if( fnCommon_isNull(qna0101_checked, "boolean") ){
					result_list.push({
						  msg : "본인이 아닐 경우,\n대출 신청이 불가합니다."
						, focus_field_id : "qna0101"
						, focus_slid_id : "btn_slid_1"
					});

				}else{

					// 거래자금의 원천
					var moneyRootCombo = $("#moneyRootCombo").val();
					if( fnCommon_isNull(moneyRootCombo) ){
						result_list.push({
							  msg : "거래자금의 원천을 선택해주세요."
							, focus_field_id : "moneyRootCombo"
							, focus_slid_id : "btn_slid_1"
						});
					}

					// 자금현황
					/*var assetStatusCombo = $("#assetStatusCombo").val();
					if( fnCommon_isNull(assetStatusCombo) ){
						result_list.push({
							  msg : "자금현황을 선택해주세요."
							, focus_field_id : "assetStatusCombo"
							, focus_slid_id : "btn_slid_1"
						});
					}*/
				}
				
				// 적합성 유효성체크 시작--------------------------------------------
				var fincust0101 = $("#fincust0101"); //금융 소비자 구분
				var fincust0101_checked = fincust0101.prop("checked");
				if( fnCommon_isNull(fincust0101_checked, "boolean") ){
					result_list.push({
						  msg : "전문금융소비자는 '상시근로자 5인 이상인 법인, 조합 등'만 가능합니다."
						, focus_field_id : "fincust0101"
						, focus_slid_id : "btn_slid_1"
					});
				}
				
				var totAssetCdCombo = $("#totAssetCdCombo").val(); //총자산규모
				if( fnCommon_isNull(totAssetCdCombo) ){
					result_list.push({
						  msg : "총자산규모를 선택해주세요."
						, focus_field_id : "totAssetCdCombo"
						, focus_slid_id : "btn_slid_1"
					});
				}
				
				/*var fincust0201 = $("#fincust0201"); //금융 소비자 구분
				var fincust0201_checked = fincust0201.prop("checked");
				if( fnCommon_isNull(fincust0201_checked, "boolean") ){
					result_list.push({
						  msg : "[금융소비자 보호에 대한 법률] 제17조 적합성 원칙에 따라, 대출상품에 대해 이해하지 못한 경우 대출진행이 불가합니다. "
						, focus_field_id : "fincust0201"
						, focus_slid_id : "btn_slid_1"
					});
				}*/
				
				var fixedExpCdCombo = $("#fixedExpCdCombo").val(); //고정지출비용
				if( fnCommon_isNull(fixedExpCdCombo) ){
					result_list.push({
						  msg : "고정 지출비용을 선택해주세요."
						, focus_field_id : "fixedExpCdCombo"
						, focus_slid_id : "btn_slid_1"
					}); 
				}
				//적합성 유효성 끝------------------------------------------

				// 주민등록지
				var residAddr1 = $("#residAddr1").val();
				if( fnCommon_isNull(residAddr1) ){
					result_list.push({
						  msg : "주민등록지를 검색해주세요."
						, focus_field_id : "residAddr1"
						, focus_slid_id : "btn_slid_2"
					});
				}
				var residAddr2 = $("#residAddr2").val();
				if( fnCommon_isNull(residAddr2) ){
					result_list.push({
						  msg : "주민등록지 상세주소를 입력해주세요."
						, focus_field_id : "residAddr2"
						, focus_slid_id : "btn_slid_2"
					});
				}
				var residAddrType = $("#residAddrType").val();
				if( fnCommon_isNull(residAddrType) ){
					result_list.push({
						  msg : "주민등록지를 선택해주세요."
						, focus_field_id : "residAddrType"
						, focus_slid_id : "btn_slid_2"
					});
				}

				// 실거주지
				var homeAddr1 = $("#homeAddr1").val();
				if( fnCommon_isNull(homeAddr1) ){
					result_list.push({
						  msg : "실거주지를 검색해주세요."
						, focus_field_id : "homeAddr1"
						, focus_slid_id : "btn_slid_2"
					});
				}
				var homeAddr2 = $("#homeAddr2").val();
				if( fnCommon_isNull(homeAddr2) ){
					result_list.push({
						  msg : "실거주지 상세주소를 입력해주세요."
						, focus_field_id : "homeAddr2"
						, focus_slid_id : "btn_slid_2"
					});
				}
				var homeAddrType = $("#homeAddrType").val();
				if( fnCommon_isNull(homeAddrType) ){
					result_list.push({
						  msg : "실거주지를 선택해주세요."
						, focus_field_id : "homeAddrType"
						, focus_slid_id : "btn_slid_2"
					});
				}

				if(job_major_cd != "3" &&  job_major_cd != "4")
				{
					// 직장명
					var company_nm = $("#company_nm").val();
					if( fnCommon_isNull(company_nm) ){
						result_list.push({
							  msg : "직장명을 입력해주세요."
							, focus_field_id : "company_nm"
							, focus_slid_id : "btn_slid_2"
						});
					}
	
					// 직장전화번호
					var workTelNum = $("#workTelNum").val();
					var noCharhndNo = fnCommon_getOnlyNumber(hndNo);   // 문자열 제거 후 숫자만 반환
					workTelNum = fnCommon_getOnlyNumber(workTelNum);   // 문자열 제거 후 숫자만 반환
					if( fnCommon_isNull(workTelNum) || workTelNum.indexOf("00") == 0){
						result_list.push({
							  msg : "직장전화번호를 정확히 입력해주세요.\n자동대출의 경우 재직확인 전화를 하지 않습니다."
							, focus_field_id : "workTelNum"
							, focus_slid_id : "btn_slid_2"
						});
					}else if(noCharhndNo == workTelNum){
						result_list.push({
							  msg : "직장전화번호를 정확히 입력해주세요.\n자동대출의 경우 재직확인 전화를 하지 않습니다."
							, focus_field_id : "workTelNum"
							, focus_slid_id : "btn_slid_2"
						});
					}
					
					if(!fnCommon_isNull(goods_CD)  &&  (goods_CD == "52351" || goods_CD == "52301") ){
						// 직위
						var jobPosNm = $("#jobPosNm").val();
						if( fnCommon_isNull(jobPosNm) ){
							result_list.push({
								  msg : "직위를 검색하여 선택해주세요."
								, focus_field_id : "jobPosNm"
								, focus_slid_id : "btn_slid_2"
							});
						}
					}
				}
	
				// 직종
				var jobTypeNm = $("#jobTypeNm").val();
				if( fnCommon_isNull(jobTypeNm) ){
					result_list.push({
						  msg : "직종을 검색하여 선택해주세요."
						, focus_field_id : "jobTypeNm"
						, focus_slid_id : "btn_slid_2"
					});
				}

				// 28 은 직접입력인듯?
				var jobTypeCode = $("#jobTypeCode").val();
				if( !fnCommon_isNull(jobTypeCode)  &&  jobTypeCode == "28" ){

					var jobTypeSelf = $("#jobTypeSelf").val();
					if( fnCommon_isNull(jobTypeSelf) ){
						result_list.push({
							  msg : "직종을 입력해주세요."
							, focus_field_id : "jobTypeSelf"
							, focus_slid_id : "btn_slid_2"
						});
					}
				}

				// 이메일
				var email = $("#email").val();
				var noEmail = $("#noEmail");  // 이메일 사용안함 체크박스
				var noEmail_checked = noEmail.prop("checked");

				// 체크안된 경우
				if( fnCommon_isNull(noEmail_checked, "boolean") ){

					// 이메일 입력 필수
					if( fnCommon_isNull(email) ){
						result_list.push({
							  msg : "이메일을 입력해주세요."
							, focus_field_id : "email"
							, focus_slid_id : "btn_slid_2"
						});

					// 이메일 있으면 유효성 체크
					}else{
						var email_valid_flag = true;   // 이메일 유효성 체크결과
						if(email.indexOf("@") < 0){
							email_valid_flag = false;
						}else{
							var email_1 = email.substring(0, email.indexOf("@"));
							var email_2 = email.substring(email.indexOf("@")+1, email.length);

							if( fnCommon_isNull(email_1)  ||  fnCommon_isNull(email_2) ){
								email_valid_flag = false;
							}else{
								if(email_2.indexOf(".") < 0){
									email_valid_flag = false;
								}else{
									var email_2_1 = email_2.substring(0, email_2.indexOf("."));
									var email_2_2 = email_2.substring(email_2.indexOf(".")+1, email_2.length);
									if( fnCommon_isNull(email_2_1)  ||  fnCommon_isNull(email_2_2) ){
										email_valid_flag = false;
									}
								}
							}
						}

						if(!email_valid_flag){
							result_list.push({
								  msg : "입력된 이메일을 확인해주세요."
								, focus_field_id : "email"
								, focus_slid_id : "btn_slid_2"
							});
						}
					}
				}

				// 은행명 콤보
				var bankCodeCombo = $("#bankCodeCombo").val();
				if( fnCommon_isNull(bankCodeCombo) ){
					result_list.push({
						  msg : "은행을 선택해주세요."
						, focus_field_id : "bankCodeCombo"
						, focus_slid_id : "btn_slid_3"
					});
				}

				// 계좌번호
				var accCd = $("#accCd").val();
				if( fnCommon_isNull(accCd) ){
					result_list.push({
						  msg : "계좌번호를 입력해주세요."
						, focus_field_id : "accCd"
						, focus_slid_id : "btn_slid_3"
					});
				}

				// 예금주 확인 여부
				if(accountOwner_confirm_flag == false){
					result_list.push({
						  msg : "예금주 확인을 해주세요."
						, focus_field_id : "btnAccountOwner"
						, focus_slid_id : "btn_slid_3"
					});
				}

				// 납입일자 영업일 확인 여부
				if(workingday_confirm_flag == false){
					result_list.push({
						  msg : "납입일(이체일)을 확인해주세요."
						, focus_field_id : "cmsDateCombo"
						, focus_slid_id : "btn_slid_3"
					});
				}


				// 결과노출 내용 있으면
				if( !fnCommon_isNull(result_list)  &&  !fnCommon_isNull(result_list.length)  &&  result_list.length > 0 ){

					// 기본체크일때는 가장 먼저 쌓인 메세지만 노출, 해당영역 포커스 처리
					if( fnCommon_isNull(type)  ||  type == "default"){
						var result_map = result_list[0];

						if( !fnCommon_isNull(result_map) ){
							var msg = result_map.msg;
							var focus_field_id = result_map.focus_field_id;
							var focus_slid_id = result_map.focus_slid_id;

							if( !fnCommon_isNull(msg)  &&  !fnCommon_isNull(focus_field_id)  &&  !fnCommon_isNull(focus_slid_id) ){
								alert(msg);
								$("#" + focus_field_id).focus();

								// 슬라이드 바 클릭 이벤트 강제 발생
								loanRenewal4_012.fnEvent_Slide(null, focus_slid_id);
								return false;
							}
						}

					// 지정체크일때는 현재슬라이드의 가장 먼저 쌓인 메세지만 노출
					}else{
						if( !fnCommon_isNull(num) ){
							if(num == 2  || num == 3){
								var check_slid_id = "";

								// 2 고객정보입력으로 이동일때는 1번째 슬라이드(신청정보입력) 부분만 체크한다
								if(num == 2){
									check_slid_id = "btn_slid_1";   // 체크대상 슬라이드 id

								// 3 자동이체 및 입금계좌정보 입력 2 고객정보입력으로 이동일때는 1번째 슬라이드(신청정보입력) 부분만 체크한다
								}else if(num == 3){
									check_slid_id = "btn_slid_2";   // 체크대상 슬라이드 id
								}

								for(var i=0; i < result_list.length; i++){
									var result_map = result_list[i];

									if( !fnCommon_isNull(result_map) ){
										var msg = result_map.msg;
										var focus_field_id = result_map.focus_field_id;
										var focus_slid_id = result_map.focus_slid_id;

										if( !fnCommon_isNull(msg)  &&  !fnCommon_isNull(focus_field_id)  &&  !fnCommon_isNull(focus_slid_id)  &&  focus_slid_id == check_slid_id ){
											alert(msg);
											$("#" + focus_field_id).focus();

											// 슬라이드 바 클릭 이벤트 강제 발생
											loanRenewal4_012.fnEvent_Slide(null, focus_slid_id);
											return false;
										}
									}
								}
							}
						}
					}
				}

				return true;
			},



			/* --------------------------------------------------------------------------------------
				대출 실행 전 안내 호출
				loanRenewal4_012.fnGoNextBeforeGuideStep
			 -------------------------------------------------------------------------------------- */
			fnGoNextBeforeGuideStep : function(loanInspNo, bankConfirmNo){
				var url = callURL_before_guide;

				// 신청정보에서 데이터 추출
				var dataMap = loanRenewal4_012.fnGetDataParam();

				// 52351 온라인햇살론
				if( !fnCommon_isNull(dataMap.goods_CD)  &&  (dataMap.goods_CD == "52301"  ||  dataMap.goods_CD == "52351") ){
					url = callURL_before_guide_sunshine;
				}

				// 신청금액
				var req_amt = $("#req_amt").val();
				req_amt = fnCommon_getOnlyNumber(req_amt);   // 문자열 제거 후 숫자만 반환

				// 앱여부
				var isApp_flag = fnCommon_isApp();
				if( !fnCommon_isNull(isApp_flag, "boolean") ){
					var params = {
							pluginId: "webPostBridge",
							method: "onExecute",
							params: {
								"url": url,
								"data": {
									"title": "대출 실행 전 안내",
									"CUST_NO": dataMap.cust_NO,
								    "CUST_NM": fnCommon_deleteNull(custNm),
								    "BANK_INSP_NO": loanInspNo,
								    "BANK_COMFIRM_NO": bankConfirmNo,
								    "REQ_AMT": req_amt,
								    "DEVICE_TYPE": deviceType,
								    "CONTRACT_YN": "Y"
								}
						    },
							callBack: function(isOK, json) {
							}
						};
					SDSFrameWork.plugin.execute(params);

				// web
				}else{

					// 기존에 폼이 있었으면 삭제
					$("#loanRenewal4_view_form").remove();

					// 새 폼 구성
					var html = "";
					html += "<form id='loanRenewal4_view_form' name='loanRenewal4_view_form'>";
					html += "<input type='hidden' id='CUST_NO' name='CUST_NO' value='" + dataMap.cust_NO + "'/>";
					html += "<input type='hidden' id='CUST_NM' name='CUST_NM' value='" + fnCommon_deleteNull(custNm) + "'/>";
					html += "<input type='hidden' id='BANK_INSP_NO' name='BANK_INSP_NO' value='" + loanInspNo + "'/>";
					html += "<input type='hidden' id='BANK_COMFIRM_NO' name='BANK_COMFIRM_NO' value='" + bankConfirmNo + "'/>";
					html += "<input type='hidden' id='REQ_AMT' name='REQ_AMT' value='" + req_amt + "'/>";
					html += "<input type='hidden' id='DEVICE_TYPE' name='DEVICE_TYPE' value='" + deviceType + "'/>";
					html += "<input type='hidden' id='CONTRACT_YN' name='CONTRACT_YN' value='Y'/>";
					html += "</form>";
					$("body").append( html );  // 화면에 새로생성

					$("#loanRenewal4_view_form").attr("method", "post");
					$("#loanRenewal4_view_form").attr("action", url);
					$("#loanRenewal4_view_form").submit();
				}
			}

	};   // var loanRenewal4_012 = {










	/* --------------------------------------------------------------------------------------
		신청결과 안내 화면
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_013 = {

			/* --------------------------------------------------------------------------------------
				기본수행
				loanRenewal4_013.fnInit
			 -------------------------------------------------------------------------------------- */
			fnInit : function(){

				// 고객기본정보 조회
				loanRenewal4_013.fnSearch_1();
			},



			/* --------------------------------------------------------------------------------------
				고객기본정보 조회
				loanRenewal4_013.fnSearch_1
			 -------------------------------------------------------------------------------------- */
			fnSearch_1 : function(){

				// 고객기본정보 조회
				iajax.clearParam();
				iajax.addParam("CHK_CSRF", random);

				$.ajax({
				    type: "post",
				    url: callURL_loanRenewal4_013_01,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

							// 직업 1 직장인(4대보험가입) 2 개인사업자 3 기타사업소득자인적용역제공자 4 연금소득자
							var qna01 = json.qna01;

							// 전달받은 영역 노출
							if( !fnCommon_isNull(type) ){

								// 1 앱 설치하기 2 온라인 서류제출하기 3 기본 4 이어서 진행하기 5 대출불가안내
								$("#div_" + type).show();

								// 홈으로 이동 버튼 숨기기 // 2 온라인 서류제출하기 4 이어서 진행하기
								if(type == "2"  ||  type == "4"){
									$("#btn_gohome").hide();
								}
							}


							var ad_view_no = json.AD_VIEW_NO;
							// 20200102 웹컴 추가
							if( null != ad_view_no && "2" == ad_view_no ){
								$("#div_ad1_2").show();
								$("#div_ad2_2").show();
								$("#div_ad3_2").show();
								loanRenewal4_013.fnNext_welcome0();
							}

				    	} else {
				    		var errorMsg = json.RESULT_DESC;
							alert(errorMsg.split("<br/>").join("\n"));
				    	}
				    },
					error: function(data, textStatus, error) {
						alert(error);
						// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function() {
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				딥링크 호출
				loanRenewal4_013.fnSend_deepLink
			 -------------------------------------------------------------------------------------- */
			fnSend_deepLink : function( view_name, title ){

				// 볼일없지만 안전장치!
				if( fnCommon_isNull(view_name)  ||  fnCommon_isNull(title) ){
					alert("링크대상 정보를 확인하세요.");
					return;
				}

				// 앱여부
				var isApp_flag = fnCommon_isApp();


				// app  -->  화면 이동
				if(!fnCommon_isNull(isApp_flag, "boolean")){

					// 딥링크 처리 서비스 사용(데이터 처리를 함께 사용하기 위해)
					var url = "/loanRenewal4/loanRenewal4_deeplink";
			  		var params = {
							pluginId: "webPostBridge",
							method: "onExecute",
							params: {
								"url": url,
								"data": {
									"viewname" : view_name,
									"title" : title
								}
						    },
							callBack: function(isOK, json) {
							}
						};
					SDSFrameWork.plugin.execute(params);


				// web  -->  딥링크 호출
				}else{
					// var url = "https://shinhansmartloan.page.link/?link=http://221.147.190.221:8181/loanRenewal4/loanRenewal4_deeplink/";
					var url = "https://shinhansmartloan.page.link/?link=https://m.shinhansavings.com/loanRenewal4/loanRenewal4_deeplink/";

					url += "?1";  // 네이티브여부 1 웹 2 네이티브
					url += "|N";   // 로그인필요여부 Y/N
					url += "|" + view_name;   // 반환받을 화면id
					url += "|" + encodeURIComponent(title);

					// 고정값
					url += "&apn=com.shinhan.smartloan";
					url += "&isi=936581060";
					url += "&ibi=com.shinhan.SmartLoan";
					url += "&ius=ssbmobile";
					url += "&efr=1";  // 0 페이지이동 1 redirect

					var cleckTime = new Date();

					$("#__check_app__").remove();  // 여러번 시도시 발생했던 영역 삭제
					var $iframe = $("<iframe id='__check_app__' />").hide().appendTo("body");

					/*
					setTimeout(function(){
						if((new Date() - cleckTime) < 2000){
							location.href = url;
						}
					}, 500);
					*/

					// Android
					if( fnCommon_isNull(isIOS, "boolean") ){
						var uagentLow = navigator.userAgent.toLocaleLowerCase();

						// chrome
						if(uagentLow.search("chrome") > -1 && navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split("/")[1] > 25) {
							location.href = url;

						}else{
							$iframe.attr("src", url);
						}

					// IOS
					}else{
						location.href = url;
					}
				}
			},



			/* --------------------------------------------------------------------------------------
				웰컴 연계안내 화면 이동
				loanRenewal4_013.fnNext_welcome
			 -------------------------------------------------------------------------------------- */
			fnNext_welcome : function(){

				// 고객기본정보 조회
				iajax.clearParam();
				iajax.addParam("CHK_CSRF", random);
				iajax.addParam("CH", "welcome1");

				$.ajax({
				    type: "post",
				    url: callURL_loanRenewal4_013_02,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
				    },
					error: function(data, textStatus, error) {
						// 오류 원인을 알수 없음
						// alert(error);
					},
					complete: function() {

						var data_list = [
					             { "key" : "view_name", "value" : "ad_welcome" }
					           , { "key" : "title", "value" : "연계대출상품 핵심설명서" }
							];

						// renewal4 공통 url 호출
						fnCommon_callUrl( data_list );

					}
				});
			},



			/* --------------------------------------------------------------------------------------
				웰컴 연계안내 화면 이동
				loanRenewal4_013.fnNext_welcome0
			 -------------------------------------------------------------------------------------- */
			fnNext_welcome0 : function(){

				// 고객기본정보 조회
				iajax.clearParam();
				iajax.addParam("CHK_CSRF", random);
				iajax.addParam("CH", "welcome0");

				$.ajax({
				    type: "post",
				    url: callURL_loanRenewal4_013_02,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
				    },
					error: function(data, textStatus, error) {
					},
					complete: function() {

					}
				});
			},



			/* --------------------------------------------------------------------------------------
				연계대출 화면으로 화면 이동
				loanRenewal4_013.fnNext_welcome_go
			 -------------------------------------------------------------------------------------- */
			fnNext_welcome_go : function(){

				// 고객기본정보 조회
				iajax.clearParam();
				iajax.addParam("CHK_CSRF", random);
				iajax.addParam("CH", "welcome2");

				$.ajax({
				    type: "post",
				    url: callURL_loanRenewal4_013_03,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
				    },
					error: function(data, textStatus, error) {
						alert(error);
					},
					complete: function() {

						location.href="https://m.welcomebank.co.kr/ib20/mnu/MOWLCTLAD092";

					}
				});
			},



			/* --------------------------------------------------------------------------------------
				온라인 서류제출하기
				loanRenewal4_013.fnSendPaperOnline_ASIS
			fnSendPaperOnline_ASIS : function(){

				$("#__check_app__").remove();  // 여러번 시도시 발생했던 영역 삭제
				var $iframe = $("<iframe id='__check_app__' />").hide().appendTo("body");

				// web
				if( fnCommon_isNull(isApp, "boolean") ){
					var appName = "";

					// IOS
					if( !fnCommon_isNull(isIOS, "boolean") ){
						appName = "앱스토어";

					// Android
					}else{
						appName = "Play스토어";
					}

					if(confirm("온라인 서류 제출하기 메뉴를 이용하기 위해서는 신한저축은행 모바일 대출 앱을 설치하셔야 합니다. " + appName + "로 이동하시겠습니까?")){
						var cleckTime = new Date();

						setTimeout(function(){
							if((new Date() - cleckTime) < 2000){
								location.href = "/app_download";
							}
						}, 500);

						// Android
						if( fnCommon_isNull(isIOS, "boolean") ){
							var uagentLow = navigator.userAgent.toLocaleLowerCase();

							if(uagentLow.search("chrome") > -1 && navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split("/")[1] > 25){
								location.href = "Intent://#Intent;scheme=ssbmobile;end";
							}else{
								$iframe.attr("src", "ssbmobile://");
							}

						// IOS
						}else{
							location.href = "ssbmobile://";
						}
					}

				// app
				}else{
					var params = {
							pluginId: "webPostBridge",
							method: "onExecute",
							params: {
								"url": "/loan_document/login",
								"data": {
									"title": "온라인 서류 제출"
								}
						    },
							callBack: function(isOK, json){
							}
						};
					SDSFrameWork.plugin.execute(params);
				}
			},
			 -------------------------------------------------------------------------------------- */



			/* --------------------------------------------------------------------------------------
				앱 다운로드
				loanRenewal4_013.fnAppDownLoad_ASIS
			fnAppDownLoad_ASIS : function(){

				// 앱을 열어서 신청결과조회  url 이동
				var url = "ssbmobile://link?url=%2Floan_request%2Flogin&title=%EB%8C%80%EC%B6%9C%EC%8B%A0%EC%B2%AD%EA%B2%B0%EA%B3%BC%EC%A1%B0%ED%9A%8C";
			    var intentUrl = "Intent://link?url=%2Floan_request%2Flogin&title=%EB%8C%80%EC%B6%9C%EC%8B%A0%EC%B2%AD%EA%B2%B0%EA%B3%BC%EC%A1%B0%ED%9A%8C#Intent;scheme=ssbmobile;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.shinhan.smartloan;end";

			    // 앱스토어 이동
				var iosDownUrl = "https://itunes.apple.com/kr/app/id936581060?mt=8";

				var cleckTime = new Date();

				$("#__check_app__").remove();  // 여러번 시도시 발생했던 영역 삭제
				var $iframe = $("<iframe id='__check_app__' />").hide().appendTo("body");


				setTimeout(function(){
					if((new Date() - cleckTime) < 2000){

						// Android
						if( fnCommon_isNull(isIOS, "boolean") ){
							location.href = intentUrl;

						// IOS
						}else{
							location.href = iosDownUrl;
						}
					}
				}, 500);


				// Android
				if( fnCommon_isNull(isIOS, "boolean") ){
					var uagentLow = navigator.userAgent.toLocaleLowerCase();

					// chrome
					if(uagentLow.search("chrome") > -1 && navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split("/")[1] > 25) {
						location.href = intentUrl;

					}else{
						$iframe.attr("src", url);
					}

				// IOS
				}else{
					location.href = url;
				}
			}
			 -------------------------------------------------------------------------------------- */

	};   // var loanRenewal4_013 = {










	/* --------------------------------------------------------------------------------------
		본인인증 - 온라인서류제출
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_014 = {

		/* --------------------------------------------------------------------------------------
			기본수행
			loanRenewal4_014.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// 고객명 변경 이벤트
			$("input[type='text'][name='cert_custNm']").on("keyup", loanRenewal4_014.fnKeyup_custNm );

		    // 본인인증 탭 메뉴 클릭 이벤트 생성
			$("#tab_button_mobile").on("click", loanRenewal4_014.fnEvent_TabClick );
			$("#tab_button_credit").on("click", loanRenewal4_014.fnEvent_TabClick );


			// native 에서 접근시 smartloan_layout.jsp 이 안따라온다. 바닥의 필수값이 없어짐. isApp
			// 화면이동하는 공통함수 사용시 필요하므로 영역 추가
			var isApp_obj = $("#isApp");
			if( fnCommon_isNull(isApp_obj)  ||  fnCommon_isNull(isApp_obj.length)  ||  isApp_obj.length < 1 ){
				$("body").append("<input type='hidden' id='isApp' value='true' />");
			}


			// -- nFilter --		// 보안키패드
			setNFilterScreenSize($(window).width(), window.innerHeight);
			setNFilterCommon(document.getElementById('resid_no2'), "mode=number");   // 주민번호 뒷자리
			setNFilterCommon(document.getElementById('card_no'), "mode=number");  // 카드번호
			//setNFilterCommon(document.getElementById('card_no_4'), "mode=number");  // 카드번호
			//setNFilterCommon(document.getElementById('valid_trm_yymm'), "mode=number");  // 유효기간 연월
			//setNFilterCommon(document.getElementById('cd_pwd'), "mode=number");   // 비밀번호(앞 2자리 입력)
			//	setNFilterInputSize("small");
			nFilterScrollto(false);
			setNFilterMobileInit(); //mobile
			// -- nFilter --


			// 단말 휴대폰번호 선취득 여부
			var getPhoneNumber_flag = false;

			// 앱여부
			var isApp_flag = fnCommon_isApp();
			if(isApp_flag){

				// Android
				if( fnCommon_isNull(isIOS, "boolean") ){
					getPhoneNumber_flag = true;
				}
			}

			// 단말 휴대폰번호 선취득
			if(getPhoneNumber_flag){

				// 단말정보 받은 후 수행할 함수 *plugin 수행 시점차이때문에 콜백을 사용해야함
				// 고객기본정보 조회
				var fnCallback = loanRenewal4_014.fnSearch_1;

				// 단말정보 받기 // 휴대폰번호
				fnCommon_getDeviceData("getPhoneNumber", fnCallback);

			}else{
				// 고객기본정보 조회
				loanRenewal4_014.fnSearch_1();
			}
		},



		/* --------------------------------------------------------------------------------------
			신용카드 본인인증
			loanRenewal4_014.fnCert_card_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_card_confirm : function(){

    		// 본인인증완료여부
    		isAuthed = false;

		iajax.clearParam();

		iajax.addParam("KIND_CHK", "22" ); //명시적 21:ARS인증, 22:신용카드인증 확인
		iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );
		iajax.addParam("CHK_CSRF", random);
		iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );   // 실명번호
		iajax.addParam("IP", IP);							//IP로 사용
		iajax.addParam("AUT_AUTH_NO", "02");				// (01:pc 02:mWeb 03:mApp)
		var isApp_flag = fnCommon_isApp();
		if(isApp_flag){
			iajax.addParam("AUT_AUTH_NO", "03");
		}
		iajax.addParam("CD_PWD", $("#credit_code").val());	//카드사코드로 사용


		// -- nFilter --	   // 보안키패드로 입력받은 값
		var encData = nFilterEncrypted();
		iajax.addParam("enc", encData);
		// -- nFilter --

		// iajax 연계점 정보 parameter 추가
		fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_ARS_REQ,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
			    		isAuthed = true;
			    		AUTH_TYPE = "card";

			    		// 고객번호조회(로그인)
						loanRenewal4_014.fnSearch_2();

			    		// 본인인증 성공 처리
						// loanRenewal4_014.fnCert_Success();

			    	}else{
			    		alert("신용카드 인증이 실패하였습니다.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					alert("신용카드 인증이 실패하였습니다.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			본인인증 확인 버튼 클릭
			loanRenewal4_014.fnCert_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_confirm : function(){

			// 본인인증 완료했으면 인증단계 pass // app 에서 뒤로가기시 하단의 web 이 노출되어 재인증 현상 방지
			if(isAuthed){

				// 신청결과조회
				loanRenewal4_014.fnSearch_3();

    			// 화면이동
    			// loanRenewal4_014.fnMovePage_controll();

			}else{

				// 선택된 탭 추출
				var tab_button_list = $("a[name='tab_button']");
				if( !fnCommon_isNull(tab_button_list)  &&  !fnCommon_isNull(tab_button_list.length)  &&  tab_button_list.length > 0 ){
					for(var i=0; i < tab_button_list.length; i++){

						// 활성화 된 탭에 속하는 서비스 사용
						var button = tab_button_list[i];
						var parent = $(button).parent();
						if( !fnCommon_isNull(parent)  &&  parent.hasClass("tab_on") ){

							var button_id = button.id;
							if( !fnCommon_isNull(button_id) ){

								var fnCallback = null;
								var valid_result = false;

								// 실명인증 요청 유효성 체크 - (이름, 주민번호, 휴대폰번호) 기본 본인인증 공통영역 체크이므로 함께 사용하자!
								var result = loanRenewal4_014.fnSave_realName_valid();
								if(!result){
									return false;
								}

								// 휴대폰
								if(button_id == "tab_button_mobile"){

									// 휴대폰인증 유효성체크 // valid : 번호검증
									valid_result = loanRenewal4_014.fnCert_phone_valid("valid");

									// 입력된 휴대폰 인증번호 검증
									fnCallback = loanRenewal4_014.fnCert_phone_confirm;

								// 신용카드
								}else if(button_id == "tab_button_credit"){

									// Ars요청을 정상적으로 했는지 체크
									if(!isArsCalled){
										alert("[ARS요청]버튼을 눌러 통화연결 시, 카드비밀번호 앞 2자리를 입력한 후 재시도해주세요.");
										return false;
									}

									// 신용카드 유효성체크
									valid_result = loanRenewal4_014.fnCert_card_valid();

									// 신용카드 본인인증
									fnCallback = loanRenewal4_014.fnCert_card_confirm;
								}

								// 유효성체크 통과했는지 확인
								if(!valid_result){
									return false;
								}

								// 실명인증 요청
								loanRenewal4_014.fnSave_realName(fnCallback);
							}
						}
					}
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			신용카드 유효성체크
			loanRenewal4_014.fnCert_card_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_card_valid : function(){

			/*
			// 필수항목 동의여부 체크
			var agree_credit = $(":checkbox[name='agree_credit']");
			if( !fnCommon_isNull(agree_credit)  &&  !fnCommon_isNull(agree_credit.length)  &&  agree_credit.length > 0 ){
				for(var i=0; i < agree_credit.length; i++){

					var checkbox = agree_credit[i];
					if( !fnCommon_isNull(checkbox) ){

						var checked = checkbox.checked;
						if( fnCommon_isNull(checked, "boolean") ){

							// 해당 체크박스 라벨 한글 추출
							alert( checkbox.title + " 항목을 '동의'로 선택하신 후 진행해주세요.");
							$("#" + checkbox.id).focus();
							return false;
						}
					}
				}
			}*/

			var allChk_credit = $("#allChk_credit")[0].checked;
			if( !allChk_credit ){
				alert("신용카드 본인인증 전체동의로 선택하신 후 진행해주세요.");
				return false;
			}

			return true;
		},



		/* --------------------------------------------------------------------------------------
			본인인증 탭 메뉴 클릭 이벤트
			loanRenewal4_014.fnEvent_TabClick
		 -------------------------------------------------------------------------------------- */
		fnEvent_TabClick : function(e){

    		// 비활성화상태인 탭 클릭시
    		var className = e.target.className;
			if( fnCommon_isNull(className)  ||  className.indexOf("active") < 0 ){

	    		// 본인인증완료여부
	    		isAuthed = false;
			}

    		var this_button_id = e.target.id;
			if( !fnCommon_isNull(this_button_id) ){

				// 다른탭 클릭효과 없애기
				var tab_button_list = $("a[name='tab_button']");
				if( !fnCommon_isNull(tab_button_list)  &&  !fnCommon_isNull(tab_button_list.length)  &&  tab_button_list.length > 0 ){
					for(var i=0; i < tab_button_list.length; i++){

						var button = tab_button_list[i];
						var button_id = button.id;
						if( !fnCommon_isNull(button_id) ){

							var button_obj = $("#" + button_id);
							if( !fnCommon_isNull(button_obj)  &&  button_obj.length > 0 ){
								var parent = button_obj.parent();  // 감싸고 있는 li 태그

								var div_id = button_id.replace("_button", "");  // id 패턴 맞춰서 하단 div 영역 id 추출

								// 해당 탭은 활성화
								if( button_id == this_button_id ){

									// 활성화 효과
									if( !fnCommon_isNull(parent)  &&  !parent.hasClass("tab_on")){
										parent.addClass("tab_on");
									}

									// 하단부 노출
									$("#" + div_id).show();
									$("#" + div_id + "_agree").show();

								// 다른 탭은 비활성
								}else{
									parent.removeClass("tab_on");
									$("#" + div_id).hide();
									$("#" + div_id + "_agree").hide();
								}
							}
						}
					}
				}

				// 휴대폰
				if(this_button_id == "tab_button_mobile"){

					// 하단의 탭 귀속영역 입력란으로 사용
					var cert_hndNo = $("#cert_hndNo").val();  // 상단 입력란
					$("#tab_mobile_cert_hndNo").val(cert_hndNo);  // 하단 휴대폰 번호 입력 영역

					$("#cert_hndNo_dl").hide();
					$("#tab_mobile_cert_hndNo_dl").show();

				}else{
					$("#cert_hndNo_dl").hide();
					$("#tab_mobile_cert_hndNo_dl").hide();
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			신용카드 본인인증 서비스 동의 자세히보기
			loanRenewal4_014.fnShow_agree_certif02
		 -------------------------------------------------------------------------------------- */
		fnShow_agree_certif02 : function(){
			showDialog(popupURL_clause_auth_card, 420);
		},



		/* --------------------------------------------------------------------------------------
			본인인증 성공 처리
			loanRenewal4_014.fnCert_Success
		fnCert_Success : function(){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("view_name", "loanRenewal4_014");  // 후처리 방식 다르게하기위한 구분자

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_06,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if( !fnCommon_isNull( json )  &&  !fnCommon_isNull( json.RESULT_NO )  &&  json.RESULT_NO == "0000" ){

			    		// 고객번호조회(로그인)
						loanRenewal4_014.fnSearch_2();

			    	}else{
						// 메세지 팝업
			    		var msg = "<p>" + json.RESULT_DESC + "</p>";
						fnCommon_popup("open", msg);
			    	}
			    },
				error: function(data, textStatus, error){
					alert("본인인증 성공 처리를 실패하였습니다.\n확인 후 다시 시도해주세요.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}

			});
		},
		 -------------------------------------------------------------------------------------- */



		/* --------------------------------------------------------------------------------------
			고객번호조회(로그인)
			loanRenewal4_014.fnSearch_2
		 -------------------------------------------------------------------------------------- */
		fnSearch_2 : function(){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);

			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()));
			iajax.addParam("AUTH_TYPE", AUTH_TYPE);  // 본인인증 방식
			iajax.addParam("IP", IP);
			iajax.addParam("SEND_MSG", "Y");   // 전문통신여부


			// -- nFilter --	   // 보안키패드로 입력받은 값들
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --


			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3100,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000") {
			    		// 로그인 후 Native에 로그인 정보 전달
			    		fnCall_SuccessWebLogin();
			    		/*
						iajax.clearParam();
						iajax.addParam("CHK_CSRF", random);

						$.ajax({
						    type: "post",
						    url: "/loanRenewal5/myinfo/loginInfo",
						    dataType: "json",
						    data: iajax.postparam,
						    success: function(json) {
						    	if(json.RESULT_NO == "0000") {
						    		var isApp_flag = fnCommon_isApp();
						    		// alert('1isApp_flag=' + isApp_flag + 'CUST_NO=' + json.CUST_NO + ',CUST_NM=' + json.CUST_NM + ',1');
						    		if(isApp_flag) {
						    			var params = {
						    					pluginId: "slCommon",
						    					method: "successWebLogin",
						    					params: {
						    						"data": {
						    							"CUST_NO": json.CUST_NO,
						    							"CUST_NM": json.CUST_NM
						    						}
						    					},
						    					callBack: function(isOK, json){
						    					}
						    				};
						    			SDSFrameWork.plugin.execute(params);
						    		} else {
						    		}
						    	} else {
						    	}
						    },
							error: function(data, textStatus, error) {
									console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
							},
							complete: function() {
							}
						});
						*/
				    	// app 이 올라왔다가 뒤로가기 동작시 하단의 web 레이어가 노출되어 다시 인증을 하는 현상 방지
				    	$("#auth_finish").show();  // 본인인증 완료 영역 노출
				    	$("#slid_3_div").hide();  // 본인인증 영역 숨기기

			    		// 신청결과조회
			    		loanRenewal4_014.fnSearch_3( json['CUST_NO'] );

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					alert("고객번호 조회에 실패하였습니다.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			신청결과조회
			loanRenewal4_014.fnSearch_3
		 -------------------------------------------------------------------------------------- */
		fnSearch_3 : function( CUST_NO ){
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("IP", IP);
			iajax.addParam("SEND_MSG", "Y");  // 전문통신여부
			// iajax.addParam("loanRenewal4_014_START_YN", "Y");   // 온라인서류제출 메뉴로 접근여부

			/*
			iajax.addParam("CUST_NM", $("#cert_custNm").val());
			iajax.addParam("CUST_NO", CUST_NO);
			iajax.addParam("AUTH_TYPE", AUTH_TYPE);  // 본인인증방식
			*/

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_04,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000") {
			    		if(json.CHECK_BANK_INSP_NO == ""){
			    			alert("대출신청 내역이 없습니다.\n문의사항 1800-3651");
			    			fnCommon_goHome();

			    		}else{

							// 20181210 공공기관 점검상태 output 추가 요건 반영
			    			SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;   // 건보스크래핑장애여부
			    			SCRP_NHIS_ERROR_MSG = json.SCRP_NHIS_ERROR_MSG;   // 건보스크래핑장애메세지
			    			SCRP_MINWON24_ERROR_YN = json.SCRP_MINWON24_ERROR_YN;   // 민원24스크래핑장애메세지
			    			SCRP_MINWON24_ERROR_MSG = json.SCRP_MINWON24_ERROR_MSG;   // 민원24스크래핑장애메세지
			    			CERT_HNDNO = json.CERT_HNDNO;   // 인증휴대폰번호

			    			if(json.ONLINE_DOC_A == "1"){
			    				isNoface = "Y";
			    			}else{
			    				isNoface = "N";
			    			}
			    			if(json.ONLINE_DOC_B == "1"){
			    				isNhisNps = "Y";
			    			}else{
			    				isNhisNps = "N";
			    			}
			    			if(json.ONLINE_DOC_C == "1"){
			    				isMinWon24 = "Y";
			    			}else{
			    				isMinWon24 = "N";
			    			}
			    			if(json.ONLINE_DOC_D == "1"){
			    				isNhisMinWon24 = "Y";
			    			}else{
			    				isNhisMinWon24 = "N";
			    			}

			    			if(json.ONLINE_DOC_E == "1"){
			    				isEtcDocument = "Y";
			    			}else{
			    				isEtcDocument = "N";
			    			}

			    			if(json.ONLINE_DOC_F == "1" || json.ONLINE_DOC_F == "2" || json.ONLINE_DOC_F == "3"){
			    				isHometax = json.ONLINE_DOC_F;
			    			}else{
			    				isHometax = "N";
			    			}

							is_ONLINE_DOC_G = json.ONLINE_DOC_G;
							is_ONLINE_DOC_H = json.ONLINE_DOC_H;

			    			// 모바일 5차개선 - 홈텍스 유형 추가
			    			hometax_scrapping_type = json.ONLINE_DOC_F;
			    			// 화면이동
			    			loanRenewal4_014.fnMovePage_controll();
			    		}
			    	}else{
			    		var errorMsg = json.RESULT_DESC;
			    		alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					alert("고객번호 조회에 실패하였습니다.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			화면이동
			loanRenewal4_014.fnMovePage_controll
		 -------------------------------------------------------------------------------------- */
		fnMovePage_controll : function(){

			if(isNoface == "Y"){
				// 신분증 제출 화면 호출
				loanRenewal4_014.fnMovePage_1();

			}else if(isNhisNps == "Y" || isNhisMinWon24 == "Y"  ||  isMinWon24 == "Y"
			     || (hometax_scrapping_type == "1" || hometax_scrapping_type == "2" || hometax_scrapping_type == "3")
				 ||  is_ONLINE_DOC_G == "1" ||  is_ONLINE_DOC_H == "1" ){

				// 장애중이면 중단
				// 건보스크래핑장애여부 & 민원24스크래핑장애여부
				if( !fnCommon_isNull(SCRP_NHIS_ERROR_YN)  &&  SCRP_NHIS_ERROR_YN == "Y"
					&&  !fnCommon_isNull(SCRP_MINWON24_ERROR_YN)  &&  SCRP_MINWON24_ERROR_YN == "Y" ){

					var msg = "";
					msg += "<p>" + SCRP_NHIS_ERROR_MSG + "</p>";
					msg += "<p>" + SCRP_MINWON24_ERROR_MSG + "</p>";

					// 메세지 팝업
					fnCommon_popup("open", msg);
					return false;

				// 건보스크래핑장애여부
				}else if( !fnCommon_isNull(SCRP_NHIS_ERROR_YN)  &&  SCRP_NHIS_ERROR_YN == "Y" ){
					var msg = "";
					msg += "<p>" + SCRP_NHIS_ERROR_MSG + "</p>";

					// 메세지 팝업
					fnCommon_popup("open", msg);
					return false;

				// 민원24스크래핑장애여부
				}else if( !fnCommon_isNull(SCRP_MINWON24_ERROR_YN)  &&  SCRP_MINWON24_ERROR_YN == "Y" ){
					var msg = "";
					msg += "<p>" + SCRP_MINWON24_ERROR_MSG + "</p>";

					// 메세지 팝업
					fnCommon_popup("open", msg);
					return false;

				}else{

					// 건강보험 & 민원24 스크래핑
					var params = {
							pluginId: "webPostBridge",
							method: "onExecute",
							params: {
								"url": "/loan_document/scrapping",
								"data": {
									"title": "온라인 서류 제출",
								    "isNoface": isNoface,
								    "isNhisNps": isNhisNps,
								    "isMinWon24": isMinWon24,
								    "isNhisMinWon24": isNhisMinWon24,
								    "isEtcDocument": isEtcDocument
								}
						    },
							callBack: function(isOK, json) {
							}
						};
					SDSFrameWork.plugin.execute(params);

					/*
					// 건강 or 건강민원24 제출대상 고객이고 건강보험스크래핑 아직 안했으면
					if( (isNhisNps == "Y" || isNhisMinWon24 == "Y")  &&  (fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  ||  SCRP_NHIS_SUCCESS_YN != "Y")    ){

						// 온라인서류제출(스크래핑) - 한도조회 화면 호출
						var data_list = [
					             { "key" : "view_name", "value" : "loanRenewal4_002" }
					           , { "key" : "title", "value" : "개인정보입력" }
							];

						// renewal4 공통 url 호출
						fnCommon_callUrl( data_list );

					// 민원24 제출대상 고객이고 민원24스크래핑 아직 안했으면
					}else if( (isMinWon24 == "Y" || isNhisMinWon24 == "Y")  &&  (fnCommon_isNull(SCRP_MINWON24_SUCCESS_YN)  ||  SCRP_MINWON24_SUCCESS_YN != "Y")    ){

						// 온라인서류제출(스크래핑) - 등본교부 화면 호출
						var data_list = [
					             { "key" : "view_name", "value" : "loanRenewal4_007" }
					           , { "key" : "title", "value" : "개인정보입력" }
							];

						// renewal4 공통 url 호출
						fnCommon_callUrl( data_list );
					}
					*/
				}

			}else if(isEtcDocument == "Y"){
				// 기타 서류 제출하기 화면 호출
				loanRenewal4_014.fnMovePage_3();

			}else{
				alert("온라인 서류 제출 대상이 아닙니다.\n문의사항 1800-3651");
    			fnCommon_goHome();
			}
		},



		/* --------------------------------------------------------------------------------------
			기타 서류 제출하기 화면 호출
			loanRenewal4_014.fnMovePage_3
		 -------------------------------------------------------------------------------------- */
		fnMovePage_3 : function(){
			var params = {
					pluginId: "slEtcDocument",
					method: "onExcute",
					params: {
						"data": {
							"title": "온라인 서류 제출",
						    "isNoface": isNoface,
						    "isNhisNps": isNhisNps,
						    "isMinWon24": isMinWon24,
						    "isNhisMinWon24": isNhisMinWon24,
						    "isEtcDocument": isEtcDocument
						}
				    },
					callBack: function(isOK, json) {
						if(json.result == "true") {

							// 완료 화면 이동
							loanRenewal4_014.fnMovePage_2();

						}else{
							alert("온라인 서류 제출을 실패하였습니다.");
							fnCommon_goHome();
						}
					}
				};
			SDSFrameWork.plugin.execute(params);
		},



		/* --------------------------------------------------------------------------------------
			신분증 제출 화면 호출
			loanRenewal4_014.fnMovePage_1
		 -------------------------------------------------------------------------------------- */
		fnMovePage_1 : function(){
			var params = {
					pluginId: "slNoFace",
					method: "onStart",
					params: {
						"data": {
							"title": "온라인 서류 제출"
						}
					},
					callBack: function(isOK, json) {
						if(json.result == "true") {
							//if( isNhisNps == "N" && isMinWon24 == "N" && isNhisMinWon24 == "N" && isEtcDocument == "N" && isHometax == "N") {
							//	alert("제출된 온라인 서류 확인 후\n담당직원이 연락드릴 예정입니다.");
							//	location.href = "<c:url value='/main'/>";
							//}else{
								// 신청결과조회 // 재조회하여 갱신된 데이터 사용하기 위해
							//	loanRenewal4_014.fnSearch_3();
							//}

							if( isNhisNps == "Y" || isNhisMinWon24 == "Y"  ||  isMinWon24 == "Y"
												 || (hometax_scrapping_type == "1" || hometax_scrapping_type == "2" || hometax_scrapping_type == "3")
												 ||  is_ONLINE_DOC_G == "1" ||  is_ONLINE_DOC_H == "1" ){
								loanRenewal4_014.fnSearch_3();
							}else{
								alert("제출된 온라인 서류 확인 후\n담당직원이 연락드릴 예정입니다.");
								location.href = "<c:url value='/main'/>";
							}

						} else {
							alert("온라인 서류 제출을 실패하였습니다.");
							fnCommon_goHome();
						}
					}
				};
			SDSFrameWork.plugin.execute(params);
		},



		/* --------------------------------------------------------------------------------------
			완료 화면 이동
			loanRenewal4_014.fnMovePage_2
		 -------------------------------------------------------------------------------------- */
		fnMovePage_2 : function(){
			var params = {
					pluginId: "webPostBridge",
					method: "onExecute",
					params: {
						"url": "/loan_document/complete",
						"data": {
							"title": "온라인 서류 제출",
						    "isNoface": isNoface,
						    "isNhisNps": isNhisNps,
						    "isMinWon24": isMinWon24,
						    "isNhisMinWon24": isNhisMinWon24,
						    "isEtcDocument": isEtcDocument
						}
				    },
					callBack: function(isOK, json) {
					}
				};
			SDSFrameWork.plugin.execute(params);
		},



		/* --------------------------------------------------------------------------------------
			휴대폰인증 유효성체크
			loanRenewal4_014.fnCert_phone_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_valid : function( type ){
			var result = true;

			// 통신사
			var telecom = $("#telecom option:selected").val();
			if( fnCommon_isNull(telecom) ){
				alert("통신사를 선택해주세요.");
				$("#telecom").focus();
				return false;
			}

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( fnCommon_isNull(cert_hndNo) ){
				alert("휴대폰번호를 입력해주세요.");
				$("#cert_hndNo").focus();
				return false;
			}

			var cert_hndNo_pattern = /^\d{10,11}$/;
			if(!cert_hndNo_pattern.test(cert_hndNo)){
				alert("휴대폰번호를 정확하게\n입력해주세요.");
				$("#cert_hndNo").focus();
				return false;
			}

			/*
			// 필수항목 동의여부 체크
			var agree_mobile = $(":checkbox[name='agree_mobile']");
			if( !fnCommon_isNull(agree_mobile)  &&  !fnCommon_isNull(agree_mobile.length)  &&  agree_mobile.length > 0 ){
				for(var i=0; i < agree_mobile.length; i++){

					var checkbox = agree_mobile[i];
					if( !fnCommon_isNull(checkbox) ){

						var checked = checkbox.checked;
						if( fnCommon_isNull(checked, "boolean") ){

							// 해당 체크박스 라벨 한글 추출
							alert( checkbox.title + " 항목을 '동의'로 선택하신 후 진행해주세요.");
							$("#" + checkbox.id).focus();
							return false;
						}
					}
				}
			}
			*/
			var allChk_mobile = $("#allChk_mobile")[0].checked;
			if( !allChk_mobile ){
				alert("휴대폰 본인인증 전체동의로 선택하신 후 진행해주세요.");
				return false;
			}


			if( !fnCommon_isNull(type) ){

				// 입력된 인증번호 검증
				if(type == "valid"){
					var aut_auth_no = $("#aut_auth_no").val();
					if( fnCommon_isNull(aut_auth_no) ){
						alert("인증이 완료되지 않았습니다.\n인증요청 후 인증번호를 입력해주세요.");
						return false;
					}
				}
			}

			return result;
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 본인인증 - 입력된 휴대폰 인증번호 검증
			loanRenewal4_014.fnCert_phone_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_confirm : function(){

    		// 본인인증완료여부
    		isAuthed = false;

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );   // 고객명
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );   // 실명번호
			iajax.addParam("RESID_NO_2", $("#resid_no2").val() );
			iajax.addParam("HND_NO", cert_hndNo );   // 휴대폰번호
			iajax.addParam("COM_KIND", $("#telecom").val() );   // 통신사
			iajax.addParam("AUT_AUTH_NO", $("#aut_auth_no").val());	  // 입력된 인증번호

			// -- nFilter --	   // 보안키패드로 입력받은 값
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){

			    		// 타이머 동작
			    		loanRenewal4_014.fn_stopTimer();

			    		// 본인인증완료여부
			    		isAuthed = true;
			    		AUTH_TYPE = "hp";

			    		// 고객번호조회(로그인)
						loanRenewal4_014.fnSearch_2();

			    		// 본인인증 성공 처리
			    		// loanRenewal4_014.fnCert_Success();

			    	}else{
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 인증요청 타이머 시작
			loanRenewal4_014.fn_startTimer
		 -------------------------------------------------------------------------------------- */
		fn_startTimer : function(){
			seconds = 180;
			countDownTimer = setInterval("loanRenewal4_014.fn_secoundPassed()", 1000);
		},

		/* --------------------------------------------------------------------------------------
			휴대폰 인증요청 타이머 종료
			loanRenewal4_014.fn_stopTimer
		 -------------------------------------------------------------------------------------- */
		fn_stopTimer : function(){
			clearInterval(countDownTimer);
		},

		/* --------------------------------------------------------------------------------------
			휴대폰 인증요청 타이머
			loanRenewal4_014.fn_secoundPassed
		 -------------------------------------------------------------------------------------- */
		fn_secoundPassed : function(){
			var minutes = Math.round((seconds - 30) / 60);
			var remainingSeconds = seconds % 60;

			if(remainingSeconds < 10) {
				remainingSeconds = "0" + remainingSeconds;
			}

			// $("#verify_time").html("고객님 휴대폰으로 인증번호가 전송되었습니다.<br>SMS 인증시간 [ " + minutes + " : " + remainingSeconds + " ]");
			$("#cert_phone_timer").html("[<span>" + minutes + " : " + remainingSeconds + "</span>]");

			if( fnCommon_isNull(seconds) ){
				alert("휴대폰 인증이 실패하였습니다.\n인증시간이 초과된 경우\n인증번호 재요청 후 입력해주세요.");
				loanRenewal4_014.fn_stopTimer();
			}else{
				seconds--;
			}
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 본인인증 서비스 동의 자세히보기
			loanRenewal4_014.fnShow_agree_certif01
		 -------------------------------------------------------------------------------------- */
		fnShow_agree_certif01 : function(){

			popupURL = popupURL_clause_auth_hp_skt;
			showDialog(popupURL, 420);

			/*
			// 통신사
			var telecom = $("#telecom option:selected").val();
			if( fnCommon_isNull(telecom) ){
				alert("통신사를 선택해주세요.");
				return;

			}else{
				var popupURL = "";

				// sk
				if(telecom == "1" || telecom == "5"){
					popupURL = popupURL_clause_auth_hp_skt;

				// kt
				}else if(telecom == "2" || telecom == "6"){
					popupURL = popupURL_clause_auth_hp_kt;

				// lg
				}else{
					popupURL = popupURL_clause_auth_hp_lgt;
				}

				showDialog(popupURL, 420);
			}
			*/
		},



		/* --------------------------------------------------------------------------------------
			실명인증 요청 유효성 체크
			loanRenewal4_014.fnSave_realName_valid
		 -------------------------------------------------------------------------------------- */
		fnSave_realName_valid : function(){
			var result = true;

			// 이름
			var cert_custNm = fnCommon_deleteNull($("#cert_custNm").val());
			if( fnCommon_isNull(cert_custNm) ){
				alert("이름을 입력해주세요.");
				$("#cert_custNm").focus();
				return false;
			}

			// 주민등록번호
			var cert_residNo_1 = $("#cert_residNo_1").val();
			if( fnCommon_isNull(cert_residNo_1)  ||  cert_residNo_1.length < 6 ){
				alert("주민등록번호 앞자리 6자리를 입력해주세요.");
				$("#cert_residNo_1").focus();
				return false;
			}
			var resid_no2 = $("#resid_no2").val();
			if( fnCommon_isNull(resid_no2)  ||  resid_no2.length < 7 ){
				alert("주민등록번호 뒷자리 7자리를 입력해주세요.");
				$("#resid_no2").focus();
				return false;
			}

			/*
			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( fnCommon_isNull(cert_hndNo)  ||  cert_hndNo.length < 10 ){
				alert("휴대폰번호를 입력해주세요.");
				$("#cert_hndNo").focus();
				return false;
			}

			var cert_hndNo_pattern = /^\d{10,11}$/;
			if(!cert_hndNo_pattern.test(cert_hndNo)) {
				alert("휴대폰번호를 정확하게\n입력해주세요.");
				$("#cert_hndNo").focus();
				return false;
			}
			*/

			return result;
		},



		/* --------------------------------------------------------------------------------------
			실명인증 요청
			loanRenewal4_014.fnSave_realName
		 -------------------------------------------------------------------------------------- */
		fnSave_realName : function(fnCallback){

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()));
			iajax.addParam("RESID_NO1", $("#cert_residNo_1").val());
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("N01", "0");   // 전화	// 화면에서 없어진 항목
			iajax.addParam("N02", "0");   // DM		// 화면에서 없어진 항목

			// 고객정보에 임의 설정하기 위해 휴대폰번호 전송
			iajax.addParam("HND_NO", cert_hndNo );   // 휴대폰번호


			// -- nFilter --	   // 보안키패드로 입력받은 주민등록번호 뒷자리
			var encData = nFilterEncrypted();
			iajax.addParam("RESID_NO2", encData);
			// -- nFilter --


			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_05,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
						if( !fnCommon_isNull(fnCallback) ){
							fnCallback();
						}

			    	}else{
				    	var authErrMsg  = "실명인증이 실패하였습니다.\n";
				        authErrMsg += "확인 후 다시 시도해주세요.\n";
				        authErrMsg += "개명 등으로 실명이 변경된 경우\n";
				        authErrMsg += "NICE (02-2122-4000)\n";
				        authErrMsg += "통해 변경 후 이용가능합니다.\n\n";
				        authErrMsg += "신용조회 차단서비스 이용시\n";
				        authErrMsg += "차단해제 후 진행바랍니다.\n";
				        authErrMsg += "NICE: 02-2122-4000\n";
				        authErrMsg += "KCB: 02-708-1000";

						alert(authErrMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					alert("실명인증이 실패하였습니다.\n확인 후 다시 시도해주세요.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					alert("data.status:[ " + data.status + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 인증번호 요청
			loanRenewal4_014.fnCert_phone_request
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_request : function(){

    		// 본인인증완료여부
    		isAuthed = false;

			// 초기화
			$("#cert_phone_timer_dl").hide();		// 인증번호 입력 영역
			$("#aut_auth_no").hide();	 // 인증번호
			$("#aut_auth_no").val("");

			// 실명인증 요청 유효성 체크
			var result = loanRenewal4_014.fnSave_realName_valid();
			if(!result){
				return false;
			}

			// 휴대폰인증 유효성체크
			var result = loanRenewal4_014.fnCert_phone_valid();
			if(!result){
				return false;
			}

			iajax.clearParam();

			// 통신사
			var telecom = $("#telecom").val();
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );
			iajax.addParam("COM_KIND", telecom );
			iajax.addParam("CHK_CSRF", random);

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( !fnCommon_isNull(cert_hndNo)  &&  !fnCommon_isNull(cert_hndNo.length)  &&  cert_hndNo.length >= 10 ){
				iajax.addParam("HND_NO", cert_hndNo);
			}

			// -- nFilter --	   // 보안키패드로 입력받은 값
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			//AOS 문자자동가져오기 콜
			callsmsAos();

			//앱여부
			var isApp_flag = fnCommon_isApp();
			if(isApp_flag){
				// Android
				if( fnCommon_isNull(isIOS, "boolean") ){
					iajax.addParam("APP_GUBUN", "9");
				}else{
					iajax.addParam("APP_GUBUN", "8");
				}
			}else{
				iajax.addParam("APP_GUBUN", "1");
			}

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_04,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000"){

			    		// 인증시간 timer 노출
						$("#cert_phone_timer_dl").show();
						$("#aut_auth_no").show();

			    		// 인증요청 버튼
			    		$("#certif01_btn_1").html("재요청");
			    		$("#certif01_btn_1").removeClass("on");

			    		// 타이머 동작
			    		loanRenewal4_014.fn_stopTimer();
			    		loanRenewal4_014.fn_startTimer();

			    	}else{
			    		alert("인증번호 발송에 실패하였습니다. 다시 시도해주세요.");
			    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
			    	}
			    },
				error: function(data, textStatus, error) {
					alert("실명인증이 실패하였습니다.\n확인 후 다시 시도해주세요.");
		    		console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					alert("data.status:[ " + data.status + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			주민등록번호 근거 및 도용방지 안내 팝업
			loanRenewal4_014.fnPopup_1
		 -------------------------------------------------------------------------------------- */
		fnPopup_1 : function( type ){

			var msg = "";
			msg += "<p>신한저축은행은 신용정보의 이용 및 보호에 관한 법률 시행령 제 37조의 2에 의거하여 주민등록번호를 수집합니다.</p>";
			msg += "<p>타인의 주민등록번호를 도용하거나, 부정사용하는 자는 3년 이하의 징역 또는 3천만원 이하의 벌금이 부과될 수 있습니다.</p>";

			// 메세지 팝업
			fnCommon_popup("open", msg);
		},



		/* --------------------------------------------------------------------------------------
			휴대폰번호 변경 이벤트
			loanRenewal4_014.fnKeyup_hndNo
		 -------------------------------------------------------------------------------------- */
		fnKeyup_hndNo : function(e){

			// 본인인증완료여부
			isAuthed = false;

			var value = e.target.value;

			// 문자열 제거 후 숫자만 반환
			value = fnCommon_getOnlyNumber(value);

			// 필드에 재설정될 값
			var value_format = value;

			if( !fnCommon_isNull(value)  &&  value.length > 0 ){
				if(value.length > 3){

					// 앞자리 잘라내기
					value_format = value.substring(0, 3);
					value = value.substring(3, value.length);

					// 아직도 세자리 이상이면
					if(value.length > 3){

						// 중간자리 잘라내기
						value_format += "-" + value.substring(0, 3);
						value = value.substring(3, value.length);

						// 아직도 네자리 이상이면 중간자리로 한자리 더 넘기기
						if(value.length > 4){
							value_format += value.substring(0, 1);
							value = value.substring(1, value.length);
						}
					}

					// 남은 뒷자리가 있으면 이것도 붙이기
					if( !fnCommon_isNull(value) ){
						value_format += "-" + value;
					}
				}
			}

			// 모든 휴대폰번호 필드에 설정
			$("input[type='tel'][name='cert_hndNo']").val(value_format);
		},



		/* --------------------------------------------------------------------------------------
			주민등록번호 앞자리 변경 이벤트
			loanRenewal4_014.fnKeyup_residNo_1
		 -------------------------------------------------------------------------------------- */
		fnKeyup_residNo_1 : function(e){

    		// 본인인증완료여부
    		isAuthed = false;

			// 문자열 제거 후 숫자만 반환
    		var value = e.target.value;
    		e.target.value = fnCommon_getOnlyNumber(value);
		},



		/* --------------------------------------------------------------------------------------
			고객명 변경 이벤트
			loanRenewal4_014.fnKeyup_custNm
		 -------------------------------------------------------------------------------------- */
		fnKeyup_custNm : function( type ){

			// 본인인증완료여부
			isAuthed = false;

			if( !fnCommon_isNull(type) ){

				// 고객명 X 클릭
				if(type == "delete"){
					$("#cert_custNm").val("");
					$("#cert_custNm").focus();  // 키패드가 사라지면 싫으니까
				}
			}

			// 이름 있으면 삭제버튼 보이게
			var cert_custNm = $("#cert_custNm").val();
			if( !fnCommon_isNull(cert_custNm) ){
				$("#cert_custNm_delete_p").show();
			}else{
				$("#cert_custNm_delete_p").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			고객기본정보 조회
			loanRenewal4_014.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function( device_result ){
			// 단말에서 추출한 휴대폰번호 있었으면 먼저 설정
			if( !fnCommon_isNull(device_result)  &&  !fnCommon_isNull(device_result.phoneNumber) ){
				device_phoneNumber = device_result.phoneNumber;
				device_phoneNumber = fnCommon_getOnlyNumber(device_phoneNumber);  // 문자열 제거 후 숫자만 반환

				if( !fnCommon_isNull(device_phoneNumber)  &&  !fnCommon_isNull(device_phoneNumber.length) ){

					// 82로 시작하는 경우
					if(device_phoneNumber.indexOf("82") == 0  &&  device_phoneNumber.length > 2){

						// 앞2자리 82 제거  ex) 8201012345678  이렇게 옴
						device_phoneNumber = device_phoneNumber.substring(2, device_phoneNumber.length);
						device_phoneNumber = "0" + device_phoneNumber;
					}

					// 휴대폰번호 변경 이벤트를 사용해서 값 설정
					loanRenewal4_014.fnKeyup_hndNo({target:{value:device_phoneNumber}});
				}
			}

			// 고객기본정보 조회
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_03,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

						// 고객명
						var custNm = json.custNm;
						if( !fnCommon_isNull(custNm) ){
							$("input[type='text'][name='cert_custNm']").val( custNm );
						}

						// 생년월일
						var residNo = json.residNo;
						if( !fnCommon_isNull(residNo) ){
							$("input[type='tel'][name='cert_residNo_1']").val( residNo );
						}

						// 휴대폰번호
						var hndNo = json.hndNo;
						if( !fnCommon_isNull(hndNo) ){

							// 문자열 제거 후 숫자만 반환
							hndNo = fnCommon_getOnlyNumber(hndNo);

							// 휴대폰번호 변경 이벤트를 사용해서 값 설정
							loanRenewal4_014.fnKeyup_hndNo({target:{value:hndNo}});
						}

						// 딥링크유입 아니면 체크
						// if( fnCommon_isNull(type)  ||  type != "deep_link" ){

						onloanAction = json.onloanAction;
						auth_need_yn = json.auth_need_yn;
						CHECK_BANK_INSP_NO = json.CHECK_BANK_INSP_NO;

						isNoface = json.isNoface;
						isNhisNps = json.isNhisNps;
						isMinWon24 = json.isMinWon24;
						isNhisMinWon24 = json.isNhisMinWon24;
						isEtcDocument = json.isEtcDocument;

						SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;
						SCRP_MINWON24_ERROR_YN = json.SCRP_MINWON24_ERROR_YN;
						SCRP_NHIS_ERROR_MSG = json.SCRP_NHIS_ERROR_MSG;
						SCRP_MINWON24_ERROR_MSG = json.SCRP_MINWON24_ERROR_MSG;

						SCRP_NHIS_EXP = json.SCRP_NHIS_EXP;
						SCRP_MINWON24_EXP = json.SCRP_MINWON24_EXP;

						SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;   // 건강보험 스크래핑 성공여부
						SCRP_MINWON24_SUCCESS_YN = json.SCRP_MINWON24_SUCCESS_YN;   // 민원24 스크래핑 성공여부

						loanRenewal4_014_START_YN = json.loanRenewal4_014_START_YN;   // 온라인서류제출 메뉴로 접근여부

						is_ONLINE_DOC_G = json.ONLINE_DOC_G;
						is_ONLINE_DOC_H = json.ONLINE_DOC_H;

						if( !fnCommon_isNull(onloanAction)  &&  onloanAction == "nohaveloan" ){
							alert("대출신청 내역이 없습니다.\n문의사항 1800-3651");
							fnCommon_goHome();
							return;

						}else{

							// 본인인증 불필요 케이스이면 다음스텝으로 바로 이동
							if( !fnCommon_isNull(auth_need_yn)  &&  auth_need_yn == "N" ){
								isAuthed = true;

						    	// app 이 올라왔다가 뒤로가기 동작시 하단의 web 레이어가 노출되어 다시 인증을 하는 현상 방지
						    	$("#auth_finish").show();  // 본인인증 완료 영역 노출
						    	$("#slid_3_div").hide();  // 본인인증 영역 숨기기

								// 신청결과조회
								loanRenewal4_014.fnSearch_3();

								// 화면이동 // 비대면 or 온라인서류제출 or 기타서류제출 이동
								// loanRenewal4_014.fnMovePage_controll();
								return;
							}
						}
						// }

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					alert(error);
					// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},

		/* --------------------------------------------------------------------------------------
			휴대폰 동의 선택
			loanRenewal4_014.fnAgree_mobile
		 -------------------------------------------------------------------------------------- */
		fnAgree_mobile : function(){
			var al_agree_mobile = $("#al_agree_mobile").val();
			if("0" == al_agree_mobile){
				$("#allChk_mobile").prop("checked", true);
				$("#al_agree_mobile").val(1)
			}else{
				$("#allChk_mobile").prop("checked", false);
				$("#al_agree_mobile").val(0)
			}

		},

		/* --------------------------------------------------------------------------------------
			신용카드 동의 선택
			loanRenewal4_014.fnAgree_credit
		 -------------------------------------------------------------------------------------- */
		fnAgree_credit : function(){
			var al_agree_credit = $("#al_agree_credit").val();
			if("0" == al_agree_credit){
				$("#allChk_credit").prop("checked", true);
				$("#al_agree_credit").val(1)
			}else{
				$("#allChk_credit").prop("checked", false);
				$("#al_agree_credit").val(0)
			}

		}

	};   // var loanRenewal4_014 = {















	/* --------------------------------------------------------------------------------------
		본인인증 - 한도결과조회
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_015 = {

		/* --------------------------------------------------------------------------------------
			기본수행
			loanRenewal4_015.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// 고객명 변경 이벤트
			$("input[type='text'][name='cert_custNm']").on("keyup", loanRenewal4_015.fnKeyup_custNm );

		    // 본인인증 탭 메뉴 클릭 이벤트 생성
			$("#tab_button_mobile").on("click", loanRenewal4_015.fnEvent_TabClick );
			$("#tab_button_credit").on("click", loanRenewal4_015.fnEvent_TabClick );


			// -- nFilter --		// 보안키패드
			setNFilterScreenSize($(window).width(), window.innerHeight);
			setNFilterCommon(document.getElementById('resid_no2'), "mode=number");   // 주민번호 뒷자리
			setNFilterCommon(document.getElementById('card_no'), "mode=number");  // 카드번호
			//setNFilterCommon(document.getElementById('card_no_4'), "mode=number");  // 카드번호
			//setNFilterCommon(document.getElementById('valid_trm_yymm'), "mode=number");  // 유효기간 연월
			//setNFilterCommon(document.getElementById('cd_pwd'), "mode=number");   // 비밀번호(앞 2자리 입력)
			//	setNFilterInputSize("small");
			nFilterScrollto(false);
			setNFilterMobileInit(); //mobile
			// -- nFilter --


			// native 에서 접근시 smartloan_layout.jsp 이 안따라온다. 바닥의 필수값이 없어짐. isApp
			// 화면이동하는 공통함수 사용시 필요하므로 영역 추가
			var isApp_obj = $("#isApp");
			if( fnCommon_isNull(isApp_obj)  ||  fnCommon_isNull(isApp_obj.length)  ||  isApp_obj.length < 1 ){
				$("body").append("<input type='hidden' id='isApp' value='true' />");
			}


			// 단말 휴대폰번호 선취득 여부
			var getPhoneNumber_flag = false;

			// 앱여부
			var isApp_flag = fnCommon_isApp();
			if(isApp_flag){

				// Android
				if( fnCommon_isNull(isIOS, "boolean") ){
					getPhoneNumber_flag = true;
				}
			}

			// 단말 휴대폰번호 선취득
			if(getPhoneNumber_flag){

				// 단말정보 받은 후 수행할 함수 *plugin 수행 시점차이때문에 콜백을 사용해야함
				// 고객기본정보 조회
				var fnCallback = loanRenewal4_015.fnSearch_1;

				// 단말정보 받기 // 휴대폰번호
				fnCommon_getDeviceData("getPhoneNumber", fnCallback);

			}else{
				// 고객기본정보 조회
				loanRenewal4_015.fnSearch_1();
			}
		},



		/* --------------------------------------------------------------------------------------
			신용카드 본인인증
			loanRenewal4_015.fnCert_card_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_card_confirm : function(){

    		// 본인인증완료여부
    		isAuthed = false;

			iajax.clearParam();

			iajax.addParam("KIND_CHK", "22" ); //명시적 21:ARS인증, 22:신용카드인증 확인
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );   // 실명번호
			iajax.addParam("IP", IP);							//IP로 사용
			iajax.addParam("AUT_AUTH_NO", "02");				// (01:pc 02:mWeb 03:mApp)
			var isApp_flag = fnCommon_isApp();
			if(isApp_flag){
				iajax.addParam("AUT_AUTH_NO", "03");
			}
			iajax.addParam("CD_PWD", $("#credit_code").val());	//카드사코드로 사용


			// -- nFilter --	   // 보안키패드로 입력받은 값
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_ARS_REQ,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
			    		isAuthed = true;
			    		AUTH_TYPE = "card";

			    		// 고객번호조회(로그인)
						loanRenewal4_015.fnSearch_2();

			    		// 본인인증 성공 처리
						// loanRenewal4_015.fnCert_Success();

			    	}else{
			    		alert("신용카드 인증이 실패하였습니다.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
			    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
			    	}
			    },
				error: function(data, textStatus, error){
					alert("신용카드 인증이 실패하였습니다.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			본인인증 확인 버튼 클릭
			loanRenewal4_015.fnCert_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_confirm : function(){

			// 본인인증 완료했으면 인증단계 pass // app 에서 뒤로가기시 하단의 web 이 노출되어 재인증 현상 방지
			if(isAuthed){
				var params = {
						pluginId: "webPostBridge",
						method: "onExecute",
						params: {
	    					"url": "/loanRequestResult",
	    					"data": {
	    						"title": "대출진행조회",
	    						"CUST_NO": custNo,
	    					    "CUST_NM": fnCommon_deleteNull(custNm)
	    					}
						},
						callBack: function(isOK, json) {
						}
					};
				SDSFrameWork.plugin.execute(params);

			}else{

				// 선택된 탭 추출
				var tab_button_list = $("a[name='tab_button']");
				if( !fnCommon_isNull(tab_button_list)  &&  !fnCommon_isNull(tab_button_list.length)  &&  tab_button_list.length > 0 ){
					for(var i=0; i < tab_button_list.length; i++){

						// 활성화 된 탭에 속하는 서비스 사용
						var button = tab_button_list[i];
						var parent = $(button).parent();
						if( !fnCommon_isNull(parent)  &&  parent.hasClass("tab_on") ){

							var button_id = button.id;
							if( !fnCommon_isNull(button_id) ){

								var fnCallback = null;
								var valid_result = false;

								// 실명인증 요청 유효성 체크 - (이름, 주민번호, 휴대폰번호) 기본 본인인증 공통영역 체크이므로 함께 사용하자!
								var result = loanRenewal4_015.fnSave_realName_valid();
								if(!result){
									return false;
								}

								// 휴대폰
								if(button_id == "tab_button_mobile"){

									// 휴대폰인증 유효성체크 // valid : 번호검증
									valid_result = loanRenewal4_015.fnCert_phone_valid("valid");

									// 입력된 휴대폰 인증번호 검증
									fnCallback = loanRenewal4_015.fnCert_phone_confirm;

								// 신용카드
								}else if(button_id == "tab_button_credit"){

									// Ars요청을 정상적으로 했는지 체크
									if(!isArsCalled){
										alert("[ARS요청]버튼을 눌러 통화연결 시, 카드비밀번호 앞 2자리를 입력한 후 재시도해주세요.");
										return false;
									}

									// 신용카드 유효성체크
									valid_result = loanRenewal4_015.fnCert_card_valid();

									// 신용카드 본인인증
									fnCallback = loanRenewal4_015.fnCert_card_confirm;
								}

								// 유효성체크 통과했는지 확인
								if(!valid_result){
									return false;
								}

								// 실명인증 요청
								loanRenewal4_015.fnSave_realName(fnCallback);
							}
						}
					}
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			신용카드 유효성체크
			loanRenewal4_015.fnCert_card_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_card_valid : function(){


			/*
			// 필수항목 동의여부 체크
			var agree_credit = $(":checkbox[name='agree_credit']");
			if( !fnCommon_isNull(agree_credit)  &&  !fnCommon_isNull(agree_credit.length)  &&  agree_credit.length > 0 ){
				for(var i=0; i < agree_credit.length; i++){

					var checkbox = agree_credit[i];
					if( !fnCommon_isNull(checkbox) ){

						var checked = checkbox.checked;
						if( fnCommon_isNull(checked, "boolean") ){

							// 해당 체크박스 라벨 한글 추출
							alert( checkbox.title + " 항목을 '동의'로 선택하신 후 진행해주세요.");
							$("#" + checkbox.id).focus();
							return false;
						}
					}
				}
			}*/

			var allChk_credit = $("#allChk_credit")[0].checked;
			if( !allChk_credit ){
				alert("신용카드 본인인증 전체동의로 선택하신 후 진행해주세요.");
				return false;
			}

			return true;
		},



		/* --------------------------------------------------------------------------------------
			본인인증 탭 메뉴 클릭 이벤트
			loanRenewal4_015.fnEvent_TabClick
		 -------------------------------------------------------------------------------------- */
		fnEvent_TabClick : function(e){

    		// 비활성화상태인 탭 클릭시
    		var className = e.target.className;
			if( fnCommon_isNull(className)  ||  className.indexOf("active") < 0 ){

	    		// 본인인증완료여부
	    		isAuthed = false;
			}

    		var this_button_id = e.target.id;
			if( !fnCommon_isNull(this_button_id) ){

				// 다른탭 클릭효과 없애기
				var tab_button_list = $("a[name='tab_button']");
				if( !fnCommon_isNull(tab_button_list)  &&  !fnCommon_isNull(tab_button_list.length)  &&  tab_button_list.length > 0 ){
					for(var i=0; i < tab_button_list.length; i++){

						var button = tab_button_list[i];
						var button_id = button.id;
						if( !fnCommon_isNull(button_id) ){

							var button_obj = $("#" + button_id);
							if( !fnCommon_isNull(button_obj)  &&  button_obj.length > 0 ){
								var parent = button_obj.parent();  // 감싸고 있는 li 태그

								var div_id = button_id.replace("_button", "");  // id 패턴 맞춰서 하단 div 영역 id 추출

								// 해당 탭은 활성화
								if( button_id == this_button_id ){

									// 활성화 효과
									if( !fnCommon_isNull(parent)  &&  !parent.hasClass("tab_on")){
										parent.addClass("tab_on");
									}

									// 하단부 노출
									$("#" + div_id).show();
									$("#" + div_id + "_agree").show();

								// 다른 탭은 비활성
								}else{
									parent.removeClass("tab_on");
									$("#" + div_id).hide();
									$("#" + div_id + "_agree").hide();
								}
							}
						}
					}
				}

				// 휴대폰
				if(this_button_id == "tab_button_mobile"){

					// 하단의 탭 귀속영역 입력란으로 사용
					var cert_hndNo = $("#cert_hndNo").val();  // 상단 입력란
					$("#tab_mobile_cert_hndNo").val(cert_hndNo);  // 하단 휴대폰 번호 입력 영역

					$("#cert_hndNo_dl").hide();
					$("#tab_mobile_cert_hndNo_dl").show();

				}else{
					$("#cert_hndNo_dl").hide();
					$("#tab_mobile_cert_hndNo_dl").hide();
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			신용카드 본인인증 서비스 동의 자세히보기
			loanRenewal4_015.fnShow_agree_certif02
		 -------------------------------------------------------------------------------------- */
		fnShow_agree_certif02 : function(){
			showDialog(popupURL_clause_auth_card, 420);
		},



		/* --------------------------------------------------------------------------------------
			고객번호조회(로그인)
			loanRenewal4_015.fnSearch_2
		 -------------------------------------------------------------------------------------- */
		fnSearch_2 : function(){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);

			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()));
			iajax.addParam("AUTH_TYPE", AUTH_TYPE);  // 본인인증 방식
			iajax.addParam("IP", IP);
			iajax.addParam("SEND_MSG", "Y");   // 전문통신여부


			// -- nFilter --	   // 보안키패드로 입력받은 값들
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --


			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3100,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {

		    		// 신청결과조회
		    		// loanRenewal4_015.fnSearch_3( json['CUST_NO'] );

					if(json.RESULT_NO == "0000") {
						// 로그인 시 저장된 회원명과 회원번호 조회
			    		// 로그인 후 Native에 로그인 정보 전달
			    		fnCall_SuccessWebLogin();

						/*
						iajax.clearParam();
						iajax.addParam("CHK_CSRF", random);

						$.ajax({
						    type: "post",
						    url: "/loanRenewal5/myinfo/loginInfo",
						    dataType: "json",
						    data: iajax.postparam,
						    success: function(json) {
						    	if(json.RESULT_NO == "0000") {
						    		var isApp_flag = fnCommon_isApp();
						    		// alert('1isApp_flag=' + isApp_flag + 'CUST_NO=' + json.CUST_NO + ',CUST_NM=' + json.CUST_NM + ',1');
						    		if(isApp_flag) {
						    			var params = {
						    					pluginId: "slCommon",
						    					method: "successWebLogin",
						    					params: {
						    						"data": {
						    							"CUST_NO": json.CUST_NO,
						    							"CUST_NM": json.CUST_NM
						    						}
						    					},
						    					callBack: function(isOK, json){
						    					}
						    				};
						    			SDSFrameWork.plugin.execute(params);
						    		} else {
						    		}
						    	} else {
						    	}
						    },
							error: function(data, textStatus, error) {
									console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
							},
							complete: function() {
							}
						});
			    		*/
				    	custNo = json.CUST_NO;

				    	// app 이 올라왔다가 뒤로가기 동작시 하단의 web 레이어가 노출되어 다시 인증을 하는 현상 방지
				    	$("#auth_finish").show();  // 본인인증 완료 영역 노출
				    	$("#slid_3_div").hide();  // 본인인증 영역 숨기기
			    		$("div[name='redesign_button']").hide();

						var params = {
								pluginId: "webPostBridge",
								method: "onExecute",
								params: {
			    					"url": "/loanRequestResult",
			    					"data": {
			    						"title": "대출진행조회",
			    						"CUST_NO": custNo,
			    					    "CUST_NM": fnCommon_deleteNull(custNm)
			    					}
								},
								callBack: function(isOK, json) {
								}
							};
						SDSFrameWork.plugin.execute(params);

					} else {
			    		var params = {
								pluginId: "webPostBridge",
								method: "onExecute",
			    				params: {
			    					"url": "/loanRequestResult",
			    					"data": {
			    						"title": "대출진행조회",
			    						"CUST_NO": "",
			    					    "CUST_NM": fnCommon_deleteNull(custNm)
			    					}
								},
								callBack: function(isOK, json) {
								}
							};
						SDSFrameWork.plugin.execute(params);
					}


			    },
				error: function(data, textStatus, error) {
					alert("고객번호 조회에 실패하였습니다.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			화면이동
			loanRenewal4_015.fnMovePage_controll
		 -------------------------------------------------------------------------------------- */
		fnMovePage_controll : function(){
			var params = {
					pluginId: "webPostBridge",
					method: "onExecute",
					params: {
    					"url": "/loanRequestResult",
    					"data": {
    						"title": "대출진행조회",
    						"CUST_NO": custNo,
    					    "CUST_NM": fnCommon_deleteNull(custNm)
    					}
					},
					callBack: function(isOK, json) {
					}
				};
			SDSFrameWork.plugin.execute(params);
		},



		/* --------------------------------------------------------------------------------------
			휴대폰인증 유효성체크
			loanRenewal4_015.fnCert_phone_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_valid : function( type ){
			var result = true;

			// 통신사
			var telecom = $("#telecom option:selected").val();
			if( fnCommon_isNull(telecom) ){
				alert("통신사를 선택해주세요.");
				$("#telecom").focus();
				return false;
			}

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( fnCommon_isNull(cert_hndNo) ){
				alert("휴대폰번호를 입력해주세요.");
				$("#cert_hndNo").focus();
				return false;
			}

			var cert_hndNo_pattern = /^\d{10,11}$/;
			if(!cert_hndNo_pattern.test(cert_hndNo)){
				alert("휴대폰번호를 정확하게\n입력해주세요.");
				$("#cert_hndNo").focus();
				return false;
			}

			/*
			// 필수항목 동의여부 체크
			var agree_mobile = $(":checkbox[name='agree_mobile']");
			if( !fnCommon_isNull(agree_mobile)  &&  !fnCommon_isNull(agree_mobile.length)  &&  agree_mobile.length > 0 ){
				for(var i=0; i < agree_mobile.length; i++){

					var checkbox = agree_mobile[i];
					if( !fnCommon_isNull(checkbox) ){

						var checked = checkbox.checked;
						if( fnCommon_isNull(checked, "boolean") ){

							// 해당 체크박스 라벨 한글 추출
							alert( checkbox.title + " 항목을 '동의'로 선택하신 후 진행해주세요.");
							$("#" + checkbox.id).focus();
							return false;
						}
					}
				}
			}*/
			var allChk_mobile = $("#allChk_mobile")[0].checked;
			if( !allChk_mobile ){
				alert("휴대폰 본인인증 전체동의로 선택하신 후 진행해주세요.");
				return false;
			}

			if( !fnCommon_isNull(type) ){

				// 입력된 인증번호 검증
				if(type == "valid"){
					var aut_auth_no = $("#aut_auth_no").val();
					if( fnCommon_isNull(aut_auth_no) ){
						alert("인증이 완료되지 않았습니다.\n인증요청 후 인증번호를 입력해주세요.");
						return false;
					}
				}
			}

			return result;
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 본인인증 - 입력된 휴대폰 인증번호 검증
			loanRenewal4_015.fnCert_phone_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_confirm : function(){

    		// 본인인증완료여부
    		isAuthed = false;

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );   // 고객명
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );   // 실명번호
			iajax.addParam("RESID_NO_2", $("#resid_no2").val() );
			iajax.addParam("HND_NO", cert_hndNo );   // 휴대폰번호
			iajax.addParam("COM_KIND", $("#telecom").val() );   // 통신사
			iajax.addParam("AUT_AUTH_NO", $("#aut_auth_no").val());	  // 입력된 인증번호

			// -- nFilter --	   // 보안키패드로 입력받은 값
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){

			    		// 타이머 동작
			    		loanRenewal4_015.fn_stopTimer();

			    		// 본인인증완료여부
			    		isAuthed = true;
			    		AUTH_TYPE = "hp";

			    		// 고객번호조회(로그인)
						loanRenewal4_015.fnSearch_2();

			    		// 본인인증 성공 처리
			    		// loanRenewal4_015.fnCert_Success();

			    	}else{
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 인증요청 타이머 시작
			loanRenewal4_015.fn_startTimer
		 -------------------------------------------------------------------------------------- */
		fn_startTimer : function(){
			seconds = 180;
			countDownTimer = setInterval("loanRenewal4_015.fn_secoundPassed()", 1000);
		},

		/* --------------------------------------------------------------------------------------
			휴대폰 인증요청 타이머 종료
			loanRenewal4_015.fn_stopTimer
		 -------------------------------------------------------------------------------------- */
		fn_stopTimer : function(){
			clearInterval(countDownTimer);
		},

		/* --------------------------------------------------------------------------------------
			휴대폰 인증요청 타이머
			loanRenewal4_015.fn_secoundPassed
		 -------------------------------------------------------------------------------------- */
		fn_secoundPassed : function(){
			var minutes = Math.round((seconds - 30) / 60);
			var remainingSeconds = seconds % 60;

			if(remainingSeconds < 10) {
				remainingSeconds = "0" + remainingSeconds;
			}

			// $("#verify_time").html("고객님 휴대폰으로 인증번호가 전송되었습니다.<br>SMS 인증시간 [ " + minutes + " : " + remainingSeconds + " ]");
			$("#cert_phone_timer").html("[<span>" + minutes + " : " + remainingSeconds + "</span>]");

			if( fnCommon_isNull(seconds) ){
				alert("휴대폰 인증이 실패하였습니다.\n인증시간이 초과된 경우\n인증번호 재요청 후 입력해주세요.");
				loanRenewal4_015.fn_stopTimer();
			}else{
				seconds--;
			}
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 본인인증 서비스 동의 자세히보기
			loanRenewal4_015.fnShow_agree_certif01
		 -------------------------------------------------------------------------------------- */
		fnShow_agree_certif01 : function(){

			popupURL = popupURL_clause_auth_hp_skt;
			showDialog(popupURL, 420);

			/*
			// 통신사
			var telecom = $("#telecom option:selected").val();
			if( fnCommon_isNull(telecom) ){
				alert("통신사를 선택해주세요.");
				return;

			}else{
				var popupURL = "";

				// sk
				if(telecom == "1" || telecom == "5"){
					popupURL = popupURL_clause_auth_hp_skt;

				// kt
				}else if(telecom == "2" || telecom == "6"){
					popupURL = popupURL_clause_auth_hp_kt;

				// lg
				}else{
					popupURL = popupURL_clause_auth_hp_lgt;
				}

				showDialog(popupURL, 420);
			}
			*/
		},



		/* --------------------------------------------------------------------------------------
			실명인증 요청 유효성 체크
			loanRenewal4_015.fnSave_realName_valid
		 -------------------------------------------------------------------------------------- */
		fnSave_realName_valid : function(){
			var result = true;

			// 이름
			var cert_custNm = $("#cert_custNm").val();
			if( fnCommon_isNull(cert_custNm) ){
				alert("이름을 입력해주세요.");
				$("#cert_custNm").focus();
				return false;
			}

			// 주민등록번호
			var cert_residNo_1 = $("#cert_residNo_1").val();
			if( fnCommon_isNull(cert_residNo_1)  ||  cert_residNo_1.length < 6 ){
				alert("주민등록번호 앞자리 6자리를 입력해주세요.");
				$("#cert_residNo_1").focus();
				return false;
			}
			var resid_no2 = $("#resid_no2").val();
			if( fnCommon_isNull(resid_no2)  ||  resid_no2.length < 7 ){
				alert("주민등록번호 뒷자리 7자리를 입력해주세요.");
				$("#resid_no2").focus();
				return false;
			}

			/*
			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( fnCommon_isNull(cert_hndNo)  ||  cert_hndNo.length < 10 ){
				alert("휴대폰번호를 입력해주세요.");
				$("#cert_hndNo").focus();
				return false;
			}

			var cert_hndNo_pattern = /^\d{10,11}$/;
			if(!cert_hndNo_pattern.test(cert_hndNo)) {
				alert("휴대폰번호를 정확하게\n입력해주세요.");
				$("#cert_hndNo").focus();
				return false;
			}
			*/
			return result;
		},



		/* --------------------------------------------------------------------------------------
			실명인증 요청
			loanRenewal4_015.fnSave_realName
		 -------------------------------------------------------------------------------------- */
		fnSave_realName : function(fnCallback){

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()));
			iajax.addParam("RESID_NO1", $("#cert_residNo_1").val());
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("N01", "0");   // 전화	// 화면에서 없어진 항목
			iajax.addParam("N02", "0");   // DM		// 화면에서 없어진 항목

			// 고객정보에 임의 설정하기 위해 휴대폰번호 전송
			iajax.addParam("HND_NO", cert_hndNo );   // 휴대폰번호


			// -- nFilter --	   // 보안키패드로 입력받은 주민등록번호 뒷자리
			var encData = nFilterEncrypted();
			iajax.addParam("RESID_NO2", encData);
			// -- nFilter --


			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_05,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
						if( !fnCommon_isNull(fnCallback) ){
							fnCallback();
						}

			    	}else{
				    	var authErrMsg  = "실명인증이 실패하였습니다.\n";
				        authErrMsg += "확인 후 다시 시도해주세요.\n";
				        authErrMsg += "개명 등으로 실명이 변경된 경우\n";
				        authErrMsg += "NICE (02-2122-4000)\n";
				        authErrMsg += "통해 변경 후 이용가능합니다.\n\n";
				        authErrMsg += "신용조회 차단서비스 이용시\n";
				        authErrMsg += "차단해제 후 진행바랍니다.\n";
				        authErrMsg += "NICE: 02-2122-4000\n";
				        authErrMsg += "KCB: 02-708-1000";

						alert(authErrMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					alert("실명인증이 실패하였습니다.\n확인 후 다시 시도해주세요.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					alert("data.status:[ " + data.status + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			휴대폰 인증번호 요청
			loanRenewal4_015.fnCert_phone_request
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_request : function(){

    		// 본인인증완료여부
    		isAuthed = false;

			// 초기화
			$("#cert_phone_timer_dl").hide();		// 인증번호 입력 영역
			$("#aut_auth_no").hide();	 // 인증번호
			$("#aut_auth_no").val("");

			// 실명인증 요청 유효성 체크
			var result = loanRenewal4_015.fnSave_realName_valid();
			if(!result){
				return false;
			}

			// 휴대폰인증 유효성체크
			var result = loanRenewal4_015.fnCert_phone_valid();
			if(!result){
				return false;
			}

			iajax.clearParam();

			// 통신사
			var telecom = $("#telecom").val();
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );
			iajax.addParam("COM_KIND", telecom );
			iajax.addParam("CHK_CSRF", random);

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( !fnCommon_isNull(cert_hndNo)  &&  !fnCommon_isNull(cert_hndNo.length)  &&  cert_hndNo.length >= 10 ){
				iajax.addParam("HND_NO", cert_hndNo);
			}

			// -- nFilter --	   // 보안키패드로 입력받은 값
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			//AOS 문자자동가져오기 콜
			callsmsAos();

			//앱여부
			var isApp_flag = fnCommon_isApp();
			if(isApp_flag){
				// Android
				if( fnCommon_isNull(isIOS, "boolean") ){
					iajax.addParam("APP_GUBUN", "9");
				}else{
					iajax.addParam("APP_GUBUN", "8");
				}
			}else{
				iajax.addParam("APP_GUBUN", "1");
			}

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_04,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000"){

			    		// 인증시간 timer 노출
						$("#cert_phone_timer_dl").show();
						$("#aut_auth_no").show();

			    		// 인증요청 버튼
			    		$("#certif01_btn_1").html("재요청");
			    		$("#certif01_btn_1").removeClass("on");

			    		// 타이머 동작
			    		loanRenewal4_015.fn_stopTimer();
			    		loanRenewal4_015.fn_startTimer();

			    	}else{
			    		alert("인증번호 발송에 실패하였습니다. 다시 시도해주세요.");
			    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
			    	}
			    },
				error: function(data, textStatus, error) {
					alert("실명인증이 실패하였습니다.\n확인 후 다시 시도해주세요.");
		    		console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					alert("data.status:[ " + data.status + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			주민등록번호 근거 및 도용방지 안내 팝업
			loanRenewal4_015.fnPopup_1
		 -------------------------------------------------------------------------------------- */
		fnPopup_1 : function( type ){

			var msg = "";
			msg += "<p>신한저축은행은 신용정보의 이용 및 보호에 관한 법률 시행령 제 37조의 2에 의거하여 주민등록번호를 수집합니다.</p>";
			msg += "<p>타인의 주민등록번호를 도용하거나, 부정사용하는 자는 3년 이하의 징역 또는 3천만원 이하의 벌금이 부과될 수 있습니다.</p>";

			// 메세지 팝업
			fnCommon_popup("open", msg);
		},



		/* --------------------------------------------------------------------------------------
			휴대폰번호 변경 이벤트
			loanRenewal4_015.fnKeyup_hndNo
		 -------------------------------------------------------------------------------------- */
		fnKeyup_hndNo : function(e){

			// 본인인증완료여부
			isAuthed = false;

			var value = e.target.value;

			// 문자열 제거 후 숫자만 반환
			value = fnCommon_getOnlyNumber(value);

			// 필드에 재설정될 값
			var value_format = value;

			if( !fnCommon_isNull(value)  &&  value.length > 0 ){
				if(value.length > 3){

					// 앞자리 잘라내기
					value_format = value.substring(0, 3);
					value = value.substring(3, value.length);

					// 아직도 세자리 이상이면
					if(value.length > 3){

						// 중간자리 잘라내기
						value_format += "-" + value.substring(0, 3);
						value = value.substring(3, value.length);

						// 아직도 네자리 이상이면 중간자리로 한자리 더 넘기기
						if(value.length > 4){
							value_format += value.substring(0, 1);
							value = value.substring(1, value.length);
						}
					}

					// 남은 뒷자리가 있으면 이것도 붙이기
					if( !fnCommon_isNull(value) ){
						value_format += "-" + value;
					}
				}
			}

			// 모든 휴대폰번호 필드에 설정
			$("input[type='tel'][name='cert_hndNo']").val(value_format);
		},



		/* --------------------------------------------------------------------------------------
			주민등록번호 앞자리 변경 이벤트
			loanRenewal4_015.fnKeyup_residNo_1
		 -------------------------------------------------------------------------------------- */
		fnKeyup_residNo_1 : function(e){

    		// 본인인증완료여부
    		isAuthed = false;

			// 문자열 제거 후 숫자만 반환
    		var value = e.target.value;
    		e.target.value = fnCommon_getOnlyNumber(value);
		},



		/* --------------------------------------------------------------------------------------
			고객명 변경 이벤트
			loanRenewal4_015.fnKeyup_custNm
		 -------------------------------------------------------------------------------------- */
		fnKeyup_custNm : function( type ){

			// 본인인증완료여부
			isAuthed = false;

			if( !fnCommon_isNull(type) ){

				// 고객명 X 클릭
				if(type == "delete"){
					$("#cert_custNm").val("");
					$("#cert_custNm").focus();  // 키패드가 사라지면 싫으니까
				}
			}

			// 이름 있으면 삭제버튼 보이게
			var cert_custNm = $("#cert_custNm").val();
			if( !fnCommon_isNull(cert_custNm) ){
				$("#cert_custNm_delete_p").show();
			}else{
				$("#cert_custNm_delete_p").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			고객기본정보 조회
			loanRenewal4_015.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function( device_result ){

			// 단말에서 추출한 휴대폰번호 있었으면 먼저 설정
			if( !fnCommon_isNull(device_result)  &&  !fnCommon_isNull(device_result.phoneNumber) ){
				device_phoneNumber = device_result.phoneNumber;
				device_phoneNumber = fnCommon_getOnlyNumber(device_phoneNumber);  // 문자열 제거 후 숫자만 반환

				if( !fnCommon_isNull(device_phoneNumber)  &&  !fnCommon_isNull(device_phoneNumber.length) ){

					// 82로 시작하는 경우
					if(device_phoneNumber.indexOf("82") == 0  &&  device_phoneNumber.length > 2){

						// 앞2자리 82 제거  ex) 8201012345678  이렇게 옴
						device_phoneNumber = device_phoneNumber.substring(2, device_phoneNumber.length);
						device_phoneNumber = "0" + device_phoneNumber;
					}

					// 휴대폰번호 변경 이벤트를 사용해서 값 설정
					loanRenewal4_015.fnKeyup_hndNo({target:{value:device_phoneNumber}});
				}
			}

			// 고객기본정보 조회
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			// iajax.addParam("loanRenewal4_014_START_YN", "N");   // 온라인서류제출 메뉴로 접근여부

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_03,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

						auth_need_yn = json.auth_need_yn;
						custNo = json.custNo;
						custNm = json.custNm;

						// 고객명
						if( !fnCommon_isNull(custNm) ){
							$("input[type='text'][name='cert_custNm']").val( custNm );
						}

						// 생년월일
						var residNo = json.residNo;
						if( !fnCommon_isNull(residNo) ){
							$("input[type='tel'][name='cert_residNo_1']").val( residNo );
						}

						// 휴대폰번호
						var hndNo = json.hndNo;
						if( !fnCommon_isNull(hndNo) ){

							// 문자열 제거 후 숫자만 반환
							hndNo = fnCommon_getOnlyNumber(hndNo);

							// 휴대폰번호 변경 이벤트를 사용해서 값 설정
							loanRenewal4_015.fnKeyup_hndNo({target:{value:hndNo}});
						}

						// 딥링크유입 아니면 체크
						// if( fnCommon_isNull(type)  ||  type != "deep_link" ){

						// 본인인증 불필요 케이스이면 다음스텝으로 바로 이동 // 서비스에서 분기했으므로 사실 이건 불필요!
						if( !fnCommon_isNull(auth_need_yn)  &&  auth_need_yn == "N" ){
							isAuthed = true;

					    	// app 이 올라왔다가 뒤로가기 동작시 하단의 web 레이어가 노출되어 다시 인증을 하는 현상 방지
					    	$("#auth_finish").show();  // 본인인증 완료 영역 노출
					    	$("#slid_3_div").hide();  // 본인인증 영역 숨기기
				    		$("div[name='redesign_button']").hide();

							loanRenewal4_015.fnMovePage_controll();
						}

						// }

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					alert(error);
					// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},

		/* --------------------------------------------------------------------------------------
			휴대폰 동의 선택
			loanRenewal4_015.fnAgree_mobile
		 -------------------------------------------------------------------------------------- */
		fnAgree_mobile : function(){
			var al_agree_mobile = $("#al_agree_mobile").val();
			if("0" == al_agree_mobile){
				$("#allChk_mobile").prop("checked", true);
				$("#al_agree_mobile").val(1)
			}else{
				$("#allChk_mobile").prop("checked", false);
				$("#al_agree_mobile").val(0)
			}

		},

		/* --------------------------------------------------------------------------------------
			신용카드 동의 선택
			loanRenewal4_015.fnAgree_credit
		 -------------------------------------------------------------------------------------- */
		fnAgree_credit : function(){
			var al_agree_credit = $("#al_agree_credit").val();
			if("0" == al_agree_credit){
				$("#allChk_credit").prop("checked", true);
				$("#al_agree_credit").val(1)
			}else{
				$("#allChk_credit").prop("checked", false);
				$("#al_agree_credit").val(0)
			}

		}

	};   // var loanRenewal4_015 = {














	/* --------------------------------------------------------------------------------------
		건강보험공단 스크래핑 장애 안내
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_016 = {

		/* --------------------------------------------------------------------------------------
			기본수행
			loanRenewal4_016.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// 고객기본정보 조회
			loanRenewal4_016.fnSearch_1();
		},


		/* --------------------------------------------------------------------------------------
			고객기본정보 조회 - 한글 유실 현상으로 재조회
			loanRenewal4_016.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function(){
			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_012_02,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

						// 선택된 대출신청번호에 맞는 3005 재조회한 항목
						var LNC3005_selected = json.LNC3005_selected;

						var SCRP_NHIS_ERROR_MSG = "";	// 건보스크래핑장애메세지
						if( !fnCommon_isNull(LNC3005_selected) ){
							SCRP_NHIS_ERROR_MSG = LNC3005_selected.scrp_NHIS_ERROR_MSG;	// 건보스크래핑장애메세지
						}

			    		// 건보 장애있으면 안내 메세지 발생
				    	if( fnCommon_isNull(SCRP_NHIS_ERROR_MSG) ){
				    		SCRP_NHIS_ERROR_MSG = "건강보험공단 장애로 스크래핑을 실패했습니다.";
				    	}

				    	alert(SCRP_NHIS_ERROR_MSG);
				    	fnCommon_goHome();

				    	/*
						// 메세지 팝업
			    		var msg = "<p>" + SCRP_NHIS_ERROR_MSG + "</p>";
			    		var no_button_flag = false;  // 아니오 버튼 노출 여부
			    		var fnCallback_yes = fnCommon_goHome;  // 확인 버튼에 함수 지정 // 메인으로 이동
			    		var fnCallback_no = null;  // 아니오 미사용

						fnCommon_popup("open", msg, no_button_flag, fnCallback_yes, fnCallback_no);
						*/

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					alert(error);
					// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		}

	};   // var loanRenewal4_016 = {



	/* --------------------------------------------------------------------------------------
		본인인증 - 온라인서류제출
	 -------------------------------------------------------------------------------------- */
	var wlogin = {


		/* --------------------------------------------------------------------------------------
			기본수행
			wlogin.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// 고객명 변경 이벤트
			$("input[type='text'][name='cert_custNm']").on("keyup", loanRenewal4_014.fnKeyup_custNm );

		    // 본인인증 탭 메뉴 클릭 이벤트 생성
			$("#tab_button_mobile").on("click", loanRenewal4_014.fnEvent_TabClick );
			$("#tab_button_credit").on("click", loanRenewal4_014.fnEvent_TabClick );


			// native 에서 접근시 smartloan_layout.jsp 이 안따라온다. 바닥의 필수값이 없어짐. isApp
			// 화면이동하는 공통함수 사용시 필요하므로 영역 추가
			var isApp_obj = $("#isApp");
			if( fnCommon_isNull(isApp_obj)  ||  fnCommon_isNull(isApp_obj.length)  ||  isApp_obj.length < 1 ){
				$("body").append("<input type='hidden' id='isApp' value='true' />");
			}


			// -- nFilter --		// 보안키패드
			setNFilterScreenSize($(window).width(), window.innerHeight);
			setNFilterCommon(document.getElementById('resid_no2'), "mode=number");   // 주민번호 뒷자리
			setNFilterCommon(document.getElementById('card_no'), "mode=number");  // 카드번호
			//setNFilterCommon(document.getElementById('card_no_4'), "mode=number");  // 카드번호
			//setNFilterCommon(document.getElementById('valid_trm_yymm'), "mode=number");  // 유효기간 연월
			//setNFilterCommon(document.getElementById('cd_pwd'), "mode=number");   // 비밀번호(앞 2자리 입력)
			nFilterScrollto(false);
			setNFilterMobileInit(); //mobile
			// -- nFilter --

		},

		/* --------------------------------------------------------------------------------------
			본인인증 확인 버튼 클릭
			wlogin.fnCert_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_confirm : function(){

			// 본인인증 완료했으면 인증단계 pass // app 에서 뒤로가기시 하단의 web 이 노출되어 재인증 현상 방지
			if(isAuthed){

				// 신청결과조회
				wlogin.fnMyRateInfo();

			}else{

				// 선택된 탭 추출
				var tab_button_list = $("a[name='tab_button']");
				if( !fnCommon_isNull(tab_button_list)  &&  !fnCommon_isNull(tab_button_list.length)  &&  tab_button_list.length > 0 ){
					for(var i=0; i < tab_button_list.length; i++){

						// 활성화 된 탭에 속하는 서비스 사용
						var button = tab_button_list[i];
						var parent = $(button).parent();
						if( !fnCommon_isNull(parent)  &&  parent.hasClass("tab_on") ){

							var button_id = button.id;
							if( !fnCommon_isNull(button_id) ){

								var fnCallback = null;
								var valid_result = false;

								// 실명인증 요청 유효성 체크 - (이름, 주민번호, 휴대폰번호) 기본 본인인증 공통영역 체크이므로 함께 사용하자!
								var result = loanRenewal4_014.fnSave_realName_valid();
								if(!result){
									return false;
								}

								// 휴대폰
								if(button_id == "tab_button_mobile"){

									// 휴대폰인증 유효성체크 // valid : 번호검증
									valid_result = loanRenewal4_014.fnCert_phone_valid("valid");

									// 입력된 휴대폰 인증번호 검증
									fnCallback = wlogin.fnCert_phone_confirm;

								// 신용카드
								}else if(button_id == "tab_button_credit"){

									// Ars요청을 정상적으로 했는지 체크
									if(!isArsCalled){
										alert("[ARS요청]버튼을 눌러 통화연결 시, 카드비밀번호 앞 2자리를 입력한 후 재시도해주세요.");
										return false;
									}

									// 신용카드 유효성체크
									valid_result = loanRenewal4_014.fnCert_card_valid();

									// 신용카드 본인인증
									fnCallback = wlogin.fnCert_card_confirm;
								}

								// 유효성체크 통과했는지 확인
								if(!valid_result){
									return false;
								}

								// 실명인증 요청
								loanRenewal4_014.fnSave_realName(fnCallback);
							}
						}
					}
				}
			}
		},

		/* --------------------------------------------------------------------------------------
			휴대폰 본인인증 - 입력된 휴대폰 인증번호 검증
			wlogin.fnCert_phone_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_confirm : function(){

    		// 본인인증완료여부
    		isAuthed = false;

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );   // 고객명
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );   // 실명번호
			iajax.addParam("RESID_NO_2", $("#resid_no2").val() );
			iajax.addParam("HND_NO", cert_hndNo );   // 휴대폰번호
			iajax.addParam("COM_KIND", $("#telecom").val() );   // 통신사
			iajax.addParam("AUT_AUTH_NO", $("#aut_auth_no").val());	  // 입력된 인증번호

			// -- nFilter --	   // 보안키패드로 입력받은 값
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){

			    		// 타이머 동작
			    		loanRenewal4_014.fn_stopTimer();

			    		// 본인인증완료여부
			    		isAuthed = true;
			    		AUTH_TYPE = "hp";

			    		// 고객번호조회(로그인)
						wlogin.wloginGetNo();

			    	}else{
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},


		/* --------------------------------------------------------------------------------------
			신용카드 본인인증
			wlogin.fnCert_card_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_card_confirm : function(){

    		// 본인인증완료여부
    		isAuthed = false;

			iajax.clearParam();

			iajax.addParam("KIND_CHK", "22" ); //명시적 21:ARS인증, 22:신용카드인증 확인
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );   // 실명번호
			iajax.addParam("IP", IP);							//IP로 사용
			iajax.addParam("AUT_AUTH_NO", "02");				// (01:pc 02:mWeb 03:mApp)
			var isApp_flag = fnCommon_isApp();
			if(isApp_flag){
				iajax.addParam("AUT_AUTH_NO", "03");
			}
			iajax.addParam("CD_PWD", $("#credit_code").val());	//카드사코드로 사용


			// -- nFilter --	   // 보안키패드로 입력받은 값
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_ARS_REQ,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
			    		isAuthed = true;
			    		AUTH_TYPE = "card";

			    		// 고객번호조회(로그인)
						wlogin.wloginGetNo();

			    	}else{
			    		alert("신용카드 인증이 실패하였습니다.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					alert("신용카드 인증이 실패하였습니다.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
				},
				complete: function(){
				}
			});
		},


		/* --------------------------------------------------------------------------------------
			신용카드 본인인증
			wlogin.fnCert_card_confirm_old
		 -------------------------------------------------------------------------------------- */
		fnCert_card_confirm_old : function(){

    		// 본인인증완료여부
    		isAuthed = false;

			// 휴대폰번호
			var cert_hndNo = $("#cert_hndNo").val();

			// 문자열 제거 후 숫자만 반환
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );   // 실명번호
			iajax.addParam("HND_NO", cert_hndNo );   // 휴대폰번호

			iajax.addParam("card_no_1", $("#card_no_1").val() );   // 신용카드
			iajax.addParam("card_no_2", $("#card_no_2").val() );
			iajax.addParam("card_no_3", $("#card_no_3").val() );

			// -- nFilter --	   // 보안키패드로 입력받은 값
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax 연계점 정보 parameter 추가
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_02,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
			    		isAuthed = true;
			    		AUTH_TYPE = "card";

			    		// 고객번호조회(로그인)
						wlogin.wloginGetNo();

			    	}else{
			    		alert("신용카드 인증이 실패하였습니다.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
			    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
			    	}
			    },
				error: function(data, textStatus, error){
					alert("신용카드 인증이 실패하였습니다.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},


		/* --------------------------------------------------------------------------------------
			고객번호조회(로그인)
			wlogin.wloginGetNo
		 -------------------------------------------------------------------------------------- */
		wloginGetNo : function(){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);

			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()));
			iajax.addParam("AUTH_TYPE", AUTH_TYPE);  // 본인인증 방식
			iajax.addParam("IP", IP);
			iajax.addParam("SEND_MSG", "Y");   // 전문통신여부


			// -- nFilter --	   // 보안키패드로 입력받은 값들
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3100,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000") {

				    	// app 이 올라왔다가 뒤로가기 동작시 하단의 web 레이어가 노출되어 다시 인증을 하는 현상 방지
				    	$("#auth_finish").show();  // 본인인증 완료 영역 노출
				    	$("#slid_3_div").hide();  // 본인인증 영역 숨기기

			    		// 신청결과조회
			    		wlogin.fnMyRateInfo();

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					alert("고객번호 조회에 실패하였습니다.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},


		/* --------------------------------------------------------------------------------------
			신청결과조회
			wlogin.fnMyRateInfo
		 -------------------------------------------------------------------------------------- */
		fnMyRateInfo : function(){

			// 기존에 폼이 있었으면 삭제
			$("#loanRenewal4_view_form").remove();

			// 새 폼 구성
			var html = "";
			html += "<form id='loanRenewal4_view_form' name='loanRenewal4_view_form'>";
			html += "</form>";
			$("body").append( html );  // 화면에 새로생성

			$("#loanRenewal4_view_form").attr("method", "post");
			$("#loanRenewal4_view_form").attr("action", "/loan_myinfo/myRateInfo");
			$("#loanRenewal4_view_form").submit();

		},



		/* --------------------------------------------------------------------------------------
			계좌조회
			wlogin.myRateAcco
		 -------------------------------------------------------------------------------------- */
		myRateAcco : function(){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("ACCO_NO", $("#acco_no").val() );   // 계좌번호
			iajax.addParam("SEND_MSG", "Y" );   // 계좌번호

			$.ajax({
			    type: "post",
			    url: callURL_searchRateAcco,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
						$("#prod_name").html(json.DATA.PROD_NAME);
						$("#amt").html(fnCommon_addComma(json.DATA.AMT) + " 원");
						$("#ref_mth").html(json.DATA.REF_MTH);
						$("#exp_mm").html(json.DATA.EXP_MM + " 개월");
						$("#apy_no").html(json.DATA.APY_NO);
						$("#com_name").html(json.DATA.COM_NAME);
						$("#com_lvl").html(json.DATA.COM_LVL);
						$("#com_amt").html(fnCommon_addComma(json.DATA.COM_AMT) + " 원");
						$("#com_period").html(json.DATA.COM_PERIOD);
						$("#cre_lvl").html(json.DATA.CRE_LVL + " 등급 (NICE)");
						$("#rate01").html(json.DATA.RATE01);
						$("#rate02").html(json.DATA.RATE02);
						$("#rate03").html(json.DATA.RATE03);
						var rate_date = json.DATA.RATE_DATE;
						if( json.DATA.RATE_DATE.length == 8 ){
							rate_date = json.DATA.RATE_DATE.substring(0,4) + "-" + json.DATA.RATE_DATE.substring(4,6) + "-" + json.DATA.RATE_DATE.substring(6,8);
						}
						$("#rate_date").html(rate_date);
			    	}else{
			    		alert("금리산정이 되지 않았습니다.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					alert("금리산정이 되지 않았습니다.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
				},
				complete: function(){
				}
			});
		}
	}


















/* ----------------------------------------------------------------------------------------------------------------------- */
/* --------    뜯어온 함수 Start !!    ---------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------
	입력된 주소정보로 나머지주소 조회
	pop_post_minwon24.jsp   에서 호출하기때문에 뜯어옴
-------------------------------------------------------------------- */
function goAddressList(addr1, addr2, addr3){
	var params = {
			pluginId: "slCert",
			method: "addressListForMinWon24",
			params: {
				"data": {
					"REV_ACT_MARK": "2",
					"TIME_OUT": "180000",
					"ADDR1": addr1,
					"ADDR2": addr2,
					"ADDR3": addr3
				}
		    },
			callBack: function(isOK, json){
				if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.result)  &&  json.result == "true"){
					var str = "";

					// 선택된 주소값 변환
					if( !fnCommon_isNull(json.addresslist) ){
						str = JSON.stringify(json.addresslist);
					}

					$("#orgAddressList").val(str);
					$("#step").val("2");

					// 주소팝업을 다시띄우네?
					showDialog(callURL_post_minwon24, 420);

				}else{

					// 오류안내
					alert(json.message);

					// 스크래핑 타임아웃 처리
					var scrp_nm = "MinWon";
					var job_nm = "주소목록조회";
					var msg = json.message;

					var timeout_msg = "통신이 원활하지 않습니다.";
					if (msg != timeout_msg){
						return;
					}

					iajax.clearParam();
					iajax.addParam("CHK_CSRF", random);
					iajax.addParam("SCRT_NM", fnCommon_deleteNull(scrp_nm));
					iajax.addParam("JOB_NM", job_nm);
					iajax.addParam("RES_MSG", msg);

					$.ajax({
					    type: "post",
					    url: callURL_insertScrtHistTimeout,
					    dataType: "json",
					    data: iajax.postparam,
					    success: function(json) {
					    },
				    	error: function(data, textStatus, error) {
						},
						complete: function() {
						}
					});
				}
			}
		};
	SDSFrameWork.plugin.execute(params);
};

/* --------    뜯어온 함수 End !!    ---------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------------------- */












/* ------------------------------------------------------------------------------------------------------------------------ */
/* --------    공통함수 Start !!    --------------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------
	null check
 -------------------------------------------------------------------- */
function fnCommon_isNull(val, type){
	var result = false;

	if(val == null  ||  val == undefined){
		result = true;

	}else{

		// boolean 형태 판별일때
		if(type != null  &&  type != undefined  &&  type == "boolean"){
			if(val == false  ||  val == "false"){
				result = true;
			}
		}else{
			if(typeof val == "string"){
				val = val.trim();
				if(val == "null"  ||  val == "undefined"  ||  val == ""){
					result = true;
				}
			}

			if(typeof val == "number"){
				if(val == 0){
					result = true;
				}else if(String(val) == "NAN"  ||  String(val) == "NaN"){
					result = true;
				}
			}
		}
	}

	return result;
};
/* ------------------------------------------------------------------------------------------------------------------------ */
/* --------    공통함수 Start !!    --------------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------
	null check
 -------------------------------------------------------------------- */
function fnCommon_deleteNull(val){
	var result = false;

	if(val == null  ||  val == undefined || val == ""){
		result = true;
	}
	if(result == false){
		val = val.trim();
	}
	return val;
};


/* --------------------------------------------------------------------
	공통코드 콤보박스 생성
	commcodelist : 공통코드 리스트
	combo_id : 대상 selectbox
	temp_yn : 선택 option 추가여부
 -------------------------------------------------------------------- */
function fnCommon_combo_commcodelist( commcodelist, combo_id, temp_yn ){
	if( !fnCommon_isNull(commcodelist)  &&  commcodelist.length > 0 ){
		var html = "";

		for(var i=0; i < commcodelist.length; i++){
			var code_obj = commcodelist[i];
			if( !fnCommon_isNull(code_obj) ){

				var minor_KEY = code_obj.minor_KEY;
				var descript = code_obj.descript;

				var selected = "";

				// 선택 option 추가여부
				if( !fnCommon_isNull(temp_yn)  &&  temp_yn == "Y"  &&  i == 0 ){
					html += "<option value='' selected>선택</option>";
				}

				/*
				// 첫번째 항목 자동선택 설정
				if( !fnCommon_isNull(minor_KEY)  &&  minor_KEY == "1" ){
					selected = " selected";
				}
				*/

				html += "<option value='" + minor_KEY + "'" + selected + ">" + descript + "</option>";
			}
		}

		$("#" + combo_id).html(html);
	}
};



/* --------------------------------------------------------------------
	금액 한글로 변환
 -------------------------------------------------------------------- */
function fnCommon_convertAmt(amt, hangul_id) {
	var numCheck = /^\d*$/;
	if(!numCheck.test(amt)) {
		$("#" + hangul_id).html("");
		return;
	}

	var arrayAmt = new Array("일", "이", "삼", "사", "오", "육", "칠", "팔", "구", "십");
	var arrayPosi = new Array("", "십", "백", "천");
	var arrayUnit = new Array("", "만", "억", "조");

	var posi = amt.length%4; //자리수
	var len = (amt.length/4).toString();
	var unit;

	if(len.indexOf(".")>0) {
		unit = len.substring(0, len.indexOf(".")); //단위(0:일단위, 1:만단위...)
	} else {
		unit = amt.length/4-1;
	}

	var korAmt = "";
	var op = 0;

	for(var i=0; i<amt.length; i++) {
		if(posi == 0) {
			posi = 4;
		}

		var num = parseInt(amt.substring(i, i+1));
		if(num != 0) {
			korAmt += arrayAmt[num-1];
			korAmt += arrayPosi[posi-1];
			op = 1;
		}

		if(posi == 1) {
			if(op == 1) {
				korAmt += arrayUnit[unit];
			}
			unit--;
			op=0;
		}
		posi--;
	}

	if(korAmt.length == 0 || korAmt.length == null || amt < 10000) {
		$("#" + hangul_id).hide();
		$("#" + hangul_id).html("");
	} else {
		$("#" + hangul_id).show();
		$("#" + hangul_id).html("<span>" + korAmt + "</span>원");
	}
};



/* --------------------------------------------------------------------
	문자열 제거 후 숫자만 반환(문자열로 조합해서 반환)
 -------------------------------------------------------------------- */
function fnCommon_getOnlyNumber(value) {
	var result = "";

	var value_string = String(value);
	var pattern = /[0-9]/;   // 숫자만

	if( !fnCommon_isNull(value_string)  &&  !fnCommon_isNull(value_string.length)  &&  value_string.length > 0 ){
		var len = value_string.length;
		for(var i=0; i < len; i++){

			// 한글자씩 숫자인지 선별해서 추출
			var character = value_string.substring(0, 1);
			value_string = value_string.substring(1, value_string.length);   // 잘라낸 한글자 빼고 나머지 부분

			if(pattern.test(character)){
				result += character;
			}
		}
	}

	return result;
};



/* --------------------------------------------------------------------
	메세지 팝업
 -------------------------------------------------------------------- */
function fnCommon_popup( type, msg, no_button_flag, fnCallback_yes, fnCallback_no ){

	// 기존 잔여 메세지 있을수 있으니까 삭제기능 기본으로 깔아두기
	$("#popup_common").remove();

	if( !fnCommon_isNull(type) ){
		if(type == "open"){
			if( !fnCommon_isNull(msg) ){

				var popup_html = "";
				popup_html += "  	<article class='layerWrap reDesignPop' id='popup_common'>						  ";
				popup_html += "  		<div class='bgAlpha'>					  ";
				popup_html += "  			<div class='popup'>				  ";
				popup_html += "  				<div class='layerCont'>			  ";
				popup_html += "  					<div class='layerCont_txtBox'>		  ";

				// 전달받은 내용
				popup_html += msg;

				popup_html += "  					</div>		  ";
				popup_html += "  					<div class='layerFoot'>		  ";

				// 아니오 버튼 노출 여부
				if( !fnCommon_isNull(no_button_flag, "boolean") ){
					popup_html += "  						<button type='button' class='btnLg' id='popup_common_btn_no'>아니오</button>	  ";
					popup_html += "  						<button type='button' class='btnLg' id='popup_common_btn_yes'>확인</button>	  ";
				}else{
					popup_html += "  						<button type='button' class='btnLg widthAll' id='popup_common_btn_yes'>확인</button>	  ";   // 한개인 경우
				}

				popup_html += "  					</div><!-- //layerFoot -->		  ";
				popup_html += "  				</div>			  ";
				popup_html += "  							  ";
				popup_html += "  			</div>				  ";
				popup_html += "  		</div>					  ";
				popup_html += "  	</article>						  ";

				$(".contents").append( popup_html );  // 화면에 생성
				$("#popup_common_btn_yes").on("click", fnCommon_popup );  // 확인버튼에 닫기 기능 추가

				// 아니오 버튼 노출 여부
				if( !fnCommon_isNull(no_button_flag, "boolean") ){
					$("#popup_common_btn_no").on("click", fnCommon_popup );  // 아니오버튼에 닫기 기능 추가
				}

				// 확인 버튼에 지정 함수 이벤트 생성
				if( !fnCommon_isNull(fnCallback_yes) ){
					$("#popup_common_btn_yes").on("click", fnCallback_yes);
				}

				// 아니오 버튼에 지정 함수 이벤트 생성
				if( !fnCommon_isNull(fnCallback_no) ){
					$("#popup_common_btn_no").on("click", fnCallback_no);
				}

				$("#popup_common").show();  // 다 만들었으니까 노출OK
			}
		}

		/*else if(type == "close"){
			$("#popup_common").remove();
		}*/
	}
};



/* --------------------------------------------------------------------
	메세지 팝업(버튼명 커스텀)
 -------------------------------------------------------------------- */
function fnCommon_popup_customBtn(type, msg, btnName_left, btnName_right, left_button_flag, fnCallback_left, fnCallback_right){
	$("#popup_common").remove(); // 기존 잔여 메세지 제거

	if( !fnCommon_isNull(type) ){
		if(type == "open"){
			if( !fnCommon_isNull(msg) ){

				// 좌우측 버튼명 미지정인 경우 기본값 세팅
				if( fnCommon_isNull(btnName_left, "string") ){
					btnName_left = "아니오";
				}

				if( fnCommon_isNull(btnName_right, "string") ){
					btnName_right = "확인";
				}

				// 커스텀 팝업 세팅
				var popup_html = "";
				popup_html += "  	<article class='layerWrap reDesignPop' id='popup_common'>						  ";
				popup_html += "  		<div class='bgAlpha'>					  ";
				popup_html += "  			<div class='popup'>				  ";
				popup_html += "  				<div class='layerCont'>			  ";
				popup_html += "  					<div class='layerCont_txtBox'>		  ";

				popup_html += msg;
				popup_html += "  					</div>		  ";
				popup_html += "  					<div class='layerFoot'>		  ";

				if( !fnCommon_isNull(left_button_flag, "boolean") ){
					popup_html += "  						<button type='button' class='btnLg' id='popup_common_btn_left'>";
					popup_html += btnName_left;
					popup_html += "</button>	  ";
					popup_html += "  						<button type='button' class='btnLg' id='popup_common_btn_right'>";
					popup_html += btnName_right;
					popup_html += "</button>	  ";
				}else{
					popup_html += "  						<button type='button' class='btnLg widthAll' id='popup_common_btn_right'>"
					popup_html += btnName_right;
					popup_html += "</button>	  ";
				}

				popup_html += "  					</div><!-- //layerFoot -->		  ";
				popup_html += "  				</div>			  ";
				popup_html += "  							  ";
				popup_html += "  			</div>				  ";
				popup_html += "  		</div>					  ";
				popup_html += "  	</article>						  ";

				// 화면 생성
				$(".contents").append( popup_html );

				// 버튼 이벤트 설정
				$("#popup_common_btn_right").on("click", fnCommon_popup_customBtn );  // 우측 버튼에 닫기 기능 추가

				if( !fnCommon_isNull(left_button_flag, "boolean") ){
					$("#popup_common_btn_left").on("click", fnCommon_popup_customBtn );  // 좌측 버튼에 닫기 기능 추가
				}

				if( !fnCommon_isNull(fnCallback_left) ){
					$("#popup_common_btn_left").on("click", fnCallback_left);
				}

				if( !fnCommon_isNull(fnCallback_right) ){
					$("#popup_common_btn_right").on("click", fnCallback_right);
				}

				// 팝업 노출
				$("#popup_common").show();
			}
		}
	}
};



/* --------------------------------------------------------------------
	renewal4 공통 url 호출 :
		parameter 를 포함한 화면 호출 기능. app/web 경우에 따른 호출방식/데이터구조 분기작업
	 	*parameter가 한글인 경우 encoding 별도작업 필요. encoding 방식은 dpc_common.js 참조
 -------------------------------------------------------------------- */
function fnCommon_callUrl( data_list ){

	/* 사용방법 sample
	var data_list = [

         // 화면호출 기본값
           { "key" : "view_name", "value" : "loanRenewal4_test" }   // 리뉴얼 화면 호출시 사용
         , { "key" : "view_name_other", "value" : "/online_sunshineloan/step3/sorry" }   // redirect 대상 url  // 기존업무/타업무 url 은 그대로 사용할것임.
         , { "key" : "title", "value" : "본인인증" }   // 앱 호출시 header 에 설정될 화면명 지정해줘야함.

         // parameter
         , { "key" : "reqAmt", "value" : REQ_AMT }
         , { "key" : "autoloanPsbYn", "value" : AUTOLOAN_PSB_YN }
         , { "key" : "custNo", "value" : LNC3003.CUST_NO }
         , { "key" : "goodsCode", "value" : LNC3003.GOODS_CD }
		];

	// renewal4 공통 url 호출
	fnCommon_callUrl( data_list );
	*/

	if( !fnCommon_isNull(data_list)  &&  !fnCommon_isNull(data_list.length)  &&  data_list.length > 0 ){

		// 협력사 정보 추가 // 끌고 다니기 위해
		data_list.push({ "key" : "sr", "value" : sr });
		data_list.push({ "key" : "sn", "value" : sn });
		data_list.push({ "key" : "sc", "value" : sc });
		data_list.push({ "key" : "se", "value" : se });
		data_list.push({ "key" : "utmSource", "value" : utmSource });
		data_list.push({ "key" : "utmMedium", "value" : utmMedium });
		data_list.push({ "key" : "utmCampaign", "value" : utmCampaign });
		data_list.push({ "key" : "utmTerm", "value" : utmTerm });
		data_list.push({ "key" : "utmContent", "value" : utmContent });
		data_list.push({ "key" : "sDownGb", "value" : sDownGb });
		data_list.push({ "key" : "suggrDistgNo", "value" : suggrDistgNo });
	}

	// 화면 호출 : 앱 여부를 끌고다녀야 하므로 공통으로 구현, 실제 호출 대상 화면 id 는 parameter 로 같이 받음
	var url = "/loanRenewal4/loanRenewal4_view";

	// 앱여부
	var isApp_flag = fnCommon_isApp();

	// app
	if(isApp_flag){
		var data = {};

		// 전달받은 데이터 있으면 전송구조 생성
		if( !fnCommon_isNull(data_list)  &&  !fnCommon_isNull(data_list.length)  &&  data_list.length > 0 ){
			for(var i=0; i < data_list.length; i++){
				var data_obj = data_list[i];

				var key = data_obj.key;
				var value = data_obj.value;

				if( !fnCommon_isNull(key)  &&  !fnCommon_isNull(value) ){
					data[key] = value;
				}
			}
		}

		// 앱 여부 구분값 추가
		data["isApp"] = "true";

  		var params = {
				pluginId: "webPostBridge",
				method: "onExecute",
				params: {
					"url": url,
					"data": data
			    },
				callBack: function(isOK, json) {
				}
			};
		SDSFrameWork.plugin.execute(params);

	// web
	}else{

		// 기존에 폼이 있었으면 삭제
		$("#loanRenewal4_view_form").remove();

		// 새 폼 구성
		var html = "";
		html += "<form id='loanRenewal4_view_form' name='loanRenewal4_view_form'>";


		// 전달받은 데이터 있으면 전송구조 생성
		if( !fnCommon_isNull(data_list)  &&  !fnCommon_isNull(data_list.length)  &&  data_list.length > 0 ){
			for(var i=0; i < data_list.length; i++){
				var data_obj = data_list[i];

				var key = data_obj.key;
				var value = data_obj.value;

				if( !fnCommon_isNull(key)  &&  !fnCommon_isNull(value) ){
					html += "<input type='hidden' id='" + key + "' name='" + key + "' value='" + value + "'/>";
				}
			}
		}

		html += "</form>";
		$("body").append( html );  // 화면에 새로생성

		$("#loanRenewal4_view_form").attr("method", "post");
		$("#loanRenewal4_view_form").attr("action", url);
		$("#loanRenewal4_view_form").submit();
	}
};



/* --------------------------------------------------------------------
	메인화면 이동
 -------------------------------------------------------------------- */
function fnCommon_goHome() {
	/*
	$.ajax({
	    type: "post",
	    url: "/main",
	    dataType: "json"
	});
	*/
	location.href = "/main";
};



/* --------------------------------------------------------------------
	뒤로가기
 -------------------------------------------------------------------- */
function fnCommon_goBack() {
	var isApp_flag = fnCommon_isApp();
	if(isApp_flag){
		var params = {
				pluginId: "slCert",
				method: "goBack",
				callBack: function(isOK, json) {
				}
			};
		SDSFrameWork.plugin.execute(params);

	}else{
		fnCommon_goHome();
	}
};



/* --------------------------------------------------------------------
	앱 여부 return
 -------------------------------------------------------------------- */
function fnCommon_isApp(){
	var isApp = $("#isApp").val();   // smartloan_layout.jsp 에 깔아둔 값 사용
	var isApp_flag = false;

	if( !fnCommon_isNull(isApp)  &&  (isApp == true  ||  isApp == "true"  ||  isApp == "Y") ){
		isApp_flag = true;
	}

	return isApp_flag;
};



/* --------------------------------------------------------------------
	콤마찍기
-------------------------------------------------------------------- */
function fnCommon_addComma( value ){

	// 문자열 제거 후 숫자만 반환
	value = fnCommon_getOnlyNumber(value);
	var value_format = value;

	// 콤마찍기
	// 한글값 구하기
	var length = value.length;
	if(length > 3){

		var division = parseInt(length / 3);
		var rest = length % 3;

		// 나머지 있으면 콤마갯수 하나 늘리기
		if(rest > 0){
			division = division + 1;
		}

		// 3의 배수만큼 콤마 삽입
		if(division > 0){
			value_format = "";

			for(var i=0; i < division; i++){
				if(i > 0){
					value_format = "," + value_format;
				}
				value_format = value.substring(value.length-3, value.length) + value_format;  // 3자리 잘라서 붙이기
				value = value.substring(0, value.length-3 );  // 남는부분
			}
		}
	}

	return value_format;
};



/* --------------------------------------------------------------------
	세션 정상여부 체크
-------------------------------------------------------------------- */
function fnCommon_checkSession(){
	if( fnCommon_isNull(session_check_success_yn)  ||  session_check_success_yn == "N" ){
		alert("세션이 만료되었습니다.");

		// 메인화면 이동
		fnCommon_goHome();
	}
};



/* --------------------------------------------------------------------
	로딩중 dim 처리 // layer_popup.jsp 에 생성된 dim 영역 활용
	*실제 통신거래시에는 app 에서 loading dim 을 띄우고 있어서 web 에서 강제로 처리할때만 사용.
-------------------------------------------------------------------- */
function fnCommon_showMask(){

	// show 할때 여러개 겹쳐지면 보기 않좋아! 너무 까매!
	var display = $(".ajax_load_mask").css("display");
	if( fnCommon_isNull(display) || display != "block" ){
		$(".ajax_load_mask").css("display","block");   // dim
		$(".ajax_loader").css("display","block");   // 빙글빙글
	}
};

function fnCommon_hideMask(){
	$(".ajax_load_mask").css("display","none");   // dim
	$(".ajax_loader").css("display","none");   // 빙글빙글
};



/* --------------------------------------------------------------------
	월단위로 증가하며 일자구하기
-------------------------------------------------------------------- */
function fnCommon_getDay_addMonth( addMonth_num ){
	var result = "";

	var today = new Date();
	var yyyy = today.getFullYear();
	var mm = today.getMonth() + 1;
	var dd = today.getDate();

	// 추가된 개월 더하기
	if( !fnCommon_isNull(addMonth_num) ){
		mm = mm + addMonth_num;

		// 12개월 넘겼으면 연도로 추가
		if(mm > 12){

			// 반복횟수
			var repeat_count = parseInt(mm / 12);
			for(var i=0; i < repeat_count; i++){
				yyyy = yyyy + 1;
				mm = mm - 12;
			}
		}

		// 음수대비 // 0 == 12월, -1 == 11월 ... -11 == 1월
		if(mm < 1){

			// 반복횟수
			var repeat_count = parseInt(mm / 12) * -1;  // 계산을 위해 양수로 전환
			for(var i=0; i < repeat_count; i++){
				yyyy = yyyy - 1;
				mm = mm + 12;
			}
		}

		// 개월 변경 있으면 일자 다시맞추기
		// 각 월의 마지막일자
		var maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var maxDay = maxDaysInMonth[mm-1];  // 해당월의 마지막일자

		// 2월이면 윤년 체크하여 마지막일자 구하기
		if( (mm + 1) == 2  &&  ( (yyyy%4 == 0  &&  yyyy%100 != 0)  ||  yyyy%400 == 0 )){
			maxDay = 29;
		}

		// 설정될 월의 마지막일자는 넘지않도록
		if(dd > maxDay){
			dd = maxDay;
		}
	}

	var result_day = new Date( yyyy, mm-1, dd, 0, 0, 0);
	yyyy = result_day.getFullYear();
	mm = result_day.getMonth() + 1;
	dd = result_day.getDate();

	var yyyy_string = String(yyyy);
	var mm_string = String(mm);
	var dd_string = String(dd);

	// 자릿수 채우기
	yyyy_string = fnCommon_lpad( yyyy_string, 4, "0" );
	mm_string = fnCommon_lpad( mm_string, 2, "0" );
	dd_string = fnCommon_lpad( dd_string, 2, "0" );

	result = yyyy_string + "." + mm_string + "." + dd_string;
	return result;
};



/* --------------------------------------------------------------------
	좌측에 문자열 추가
-------------------------------------------------------------------- */
function fnCommon_lpad( value, num, temp ){

	// 제시된 길이보다 실제 값 길이가 짧으면 temp 로 채운다
	if( !fnCommon_isNull(value)  &&  !fnCommon_isNull(value.length)  &&  !fnCommon_isNull(num)  &&  value.length < num  &&  !fnCommon_isNull(temp) ){

		// 부족한 길이만큼
		var gap = num - value.length;
		for(var i=0; i < gap; i++){
			value = temp + value;
		}
	}

	return value;
};



/* --------------------------------------------------------------------
	iajax 연계점 정보 parameter 추가
-------------------------------------------------------------------- */
function fnCommon_partnerData(){
	if( !fnCommon_isNull(ref)  &&  ref == "partner" ){
		if( !fnCommon_isNull(iajax) ){
			iajax.addParam("AD_SR", sr);		// 당사코드 1(기본코드 유입처)
			iajax.addParam("AD_SN", sn);		// 당사코드 2(권유자사번 구분코드)
			iajax.addParam("AD_SC", sc);		// 당사코드 3(광고메인 구분코드)
			iajax.addParam("AD_SE", se);		// 당사코드 4(기타)

			iajax.addParam("AD_UTM_SOURCE", utmSource);		// 유입소스
			iajax.addParam("AD_UTM_MEDIUM", utmMedium);		// 광고매체
			iajax.addParam("AD_UTM_CAMPAIGN", utmCampaign);		// 캠페인 구분
			iajax.addParam("AD_UTM_TERM", utmTerm);		// 키워드
			iajax.addParam("AD_UTM_CONTENT", utmContent);		// 컨텐츠 구분

			iajax.addParam("DOWN_GB_NM", sr);

			/*
			if( !fnCommon_isNull(sr)  &&  sr == "upsp" ){
				iajax.addParam("DOWN_GB_NM", sr);
			}else{
				iajax.addParam("DOWN_GB_NM", sDownGb);  // 업무구분명
			}
			*/

			iajax.addParam("SUGGR_DISTG_NO", suggrDistgNo);		// 권유자식별번호
		}
	}
	
};



/* --------------------------------------------------------------------
	단말정보 받기  *IOS는 정책상 단말정보 취득불가
-------------------------------------------------------------------- */
function fnCommon_getDeviceData( method, fnCallback ){

	/* 사용 sample
	var phoneNumber = fnCommon_getDeviceData("getPhoneNumber");  // 휴대폰번호
	var imei = fnCommon_getDeviceData("getIMEI");  // imei 정보

	*필수! 화면에 미리 선언해둘 변수
	var device_phoneNumber = "";  // 단말에서 추출한 휴대폰번호
	var device_imei = "";  // 단말에서 추출한 IMEI
	*/

	// 앱여부
	var isApp_flag = fnCommon_isApp();
	if(isApp_flag){

		// Android
		//if( fnCommon_isNull(isIOS, "boolean") ){
			if( !fnCommon_isNull(method) ){

				var params = {
						pluginId: "slDevice",
						method: method,
						params: {},
						callBack : function(isOK, json){

							// 전달받은 콜백 수행
							if( !fnCommon_isNull(fnCallback) ){
								fnCallback(json);
							}
						}
					};
				SDSFrameWork.plugin.execute(params);
			}
		//}
	}

	return true;
};



/* --------------------------------------------------------------------------------------
	maxlength 입력값 도달시 커서이동
 -------------------------------------------------------------------------------------- */
function fnCommon_maxlength_check( e, next_field_id ){

	// 이벤트정보
	if(!fnCommon_isNull(e)){

		// 이벤트대상정보
		var currentTarget = e.currentTarget;
		if(!fnCommon_isNull(currentTarget)){

			// 최대길이제한값
			var maxLength = currentTarget.maxLength;
			if(!fnCommon_isNull(maxLength)){

				// 현재 입력값 길이가 최대길이제한값에 도달했으면 포커스 이동
				var value = currentTarget.value;
				if(!fnCommon_isNull(value)  &&  !fnCommon_isNull(value.length)  &&  value.length > 0){

					var length = value.length;
					if(length >= maxLength){

						// 다음 이동 필드 id 받았으면 이동시켜주기
						if( !fnCommon_isNull(next_field_id) ){
							$("#" + next_field_id).focus();
						}
					}
				}
			}
		}
	}

};



/* --------------------------------------------------------------------------------------
	byte 제한만큼 잘라내기
	fnCommon_cutByte
 -------------------------------------------------------------------------------------- */
function fnCommon_cutByte( limit, value ){
	var result_value = "";

	// 길이 제한
	// var limit = 40;  // 40 byte 제한
	var limit_index = 0;
	var byte_length = 0;

	// byte 체크
	if( !fnCommon_isNull(value)  &&  !fnCommon_isNull(value.length)  &&  value.length > 0 ){
		for(var i=0; i < value.length; i++){

			var char = value.charAt(i);
			if(escape(char).length > 4){
				byte_length += 2;  // 한글인 경우 2더하기
			}else{
				byte_length += 1;
			}

			if(byte_length <= limit){
				limit_index = i + 1;  // 글자 길이 지정
			}
		}
	}

	// 재설정
	result_value = value.substr(0, limit_index);
	return result_value;
};



/* --------------------------------------------------------------------------------------
	공통 기본수행
-------------------------------------------------------------------------------------- */
function fnCommon_init(){

	// 입력필드 포커스 오면 offset top 으로 스크롤 이동
	// $("input").on("focus", function(e){
	$("input[type='text'], input[type='tel'], input[type='password']").on("focus", function(e){

		// var scrollTop_value = $("#" + e.target.id).offset().top;
		var scrollTop_value = $(e.target).offset().top;
		$('body').animate({scrollTop: scrollTop_value }, 500);
	});


	// 앱여부
	var isApp_flag = fnCommon_isApp();

	// web 에서 버튼 사라지는 현상 임시보완 // 이렇게 하면 새 디자인 영역 안으로 버튼이 들어가게 되서 위로 올라온다
	if(fnCommon_isNull(isApp_flag, "boolean")){
		$("div[name='redesign_button']").addClass("btnHoldNone");
	}

	/*
	// 모바일대출4차개선 공통으로 버튼 이동 // index 문제로 뒤로 숨는 현상이 있어 바닥으로 내리기로 함. (layout 영역으로 이동)
	var loanRenewal4_button_area_delete = $("#loanRenewal4_button_area_delete").html();
	if(!fnCommon_isNull(loanRenewal4_button_area_delete)){
		$("#loanRenewal4_button_area_paste").html(loanRenewal4_button_area_delete);
		$("#loanRenewal4_button_area_delete").html("");
	}
	*/
};


function setAuthNumber(num) {
	$("#aut_auth_no").val(num);
};

function callsmsAos(){

	//앱여부
	var isApp_flag = fnCommon_isApp();
	if(isApp_flag){

		// Android
		if( fnCommon_isNull(isIOS, "boolean") ){
			var params = {
					pluginId: "slCommon",
					method: "startSmsAuth",
					params: {}
				};
			SDSFrameWork.plugin.execute(params);
		}
	}
};
/* --------    공통함수 End !!    --------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------ */

/* --------------------------------------------------------------------------------------
	모바일 5차개선
	승인 후 Native에 로그인 정보 전달
-------------------------------------------------------------------------------------- */
function fnCall_SuccessWebLogin() {
	iajax.clearParam();
	iajax.addParam("CHK_CSRF", random);

	var isApp_flag = fnCommon_isApp();
	// alert('1isApp_flag=' + isApp_flag + 'CUST_NO=' + json.CUST_NO + ',CUST_NM=' + json.CUST_NM + ',1');
	//if(isApp_flag) {
		$.ajax({
		    type: "post",
		    url: "/loanRenewal5/myinfo/loginInfo",
		    dataType: "json",
		    data: iajax.postparam,
		    success: function(json) {
		    	if(json.RESULT_NO == "0000") {
	    			var params = {
	    					pluginId: "slCommon",
	    					method: "successWebLogin",
	    					params: {
	    						"data": {
	    							"CUST_NO": json.CUST_NO,
	    							"CUST_NM": json.CUST_NM
	    						}
	    					},
	    					callBack: function(isOK, json){
	    					}
	    				};
	    			SDSFrameWork.plugin.execute(params);

		    	} else {
		    	}
		    },
			error: function(data, textStatus, error) {
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
			},
			complete: function() {
			}
		});
	//}
}



function fnCommon_Show_agree_card(type) {

	var credit_code = $("#credit_code").val();	// 신용카드 회사
	if( fnCommon_isNull(credit_code) ){
		alert("카드사를 선택해 주세요.");
		$("#credit_code").focus();
		return false;
	}

	var popupURL_clause_auth_card1 = "https://ssl.daoupay.com/cardCertify/DaouCardCertifyAgreementPersonalInfo.jsp"; // 개인정보 수집 및 이용동의
	var popupURL_clause_auth_card2 = "https://ssl.daoupay.com/cardCertify/DaouCardCertifyAgreementIdentityInfo.jsp"; // 고유식별정보 처리 동의
	var popupURL_clause_auth_card3 = "https://ssl.daoupay.com/cardCertify/DaouCardCertifyAgreementCert.jsp"; // 본인확인 서비스 이용약관
	var popupURL_clause_auth_card4 = "https://ssl.daoupay.com/cardCertify/DaouCardCertifyAgreementCardService.jsp"; //카드사 서비스 이용약관

	var url = "";
	if( type == '1' ){
		url = popupURL_clause_auth_card1 + "?CARDCODE=" + credit_code;
	}else if( type == '2' ){
		url = popupURL_clause_auth_card2 + "?CARDCODE=" + credit_code;
	}else if( type == '3' ){
		url = popupURL_clause_auth_card3 + "?CARDCODE=" + credit_code;
	}else if( type == '4' ){
		url = popupURL_clause_auth_card4 + "?CARDCODE=" + credit_code;
	}

	var isApp_flag = fnCommon_isApp();
	if(!isApp_flag){
		window.open(url,"agree","width=420");
	}else {
		showDialog(url, 420);
	}

}


function insertScrtHistTimeout(scrp_nm, job_nm, msg) {
	var timeout_msg = "통신이 원활하지 않습니다.";
	if (msg != timeout_msg) {
		return;
	}

	var callURL = "<c:url value='/insertScrtHistTimeout'/>";

	iajax.clearParam();
	iajax.addParam("CHK_CSRF", random);
	iajax.addParam("SCRT_NM", scrp_nm);
	iajax.addParam("JOB_NM", job_nm);
	iajax.addParam("RES_MSG", msg);

	$.ajax({
	    type: "post",
	    url: callURL,
	    dataType: "json",
	    data: iajax.postparam,
	    success: function(json) {
	    },
    	error: function(data, textStatus, error) {
		},
		complete: function() {
		}
	});

}


function insertScrtHistAdd(scrp_nm, job_nm, code, msg) {

	var callURL = "/loan_document/insertScrtHistAdd";
	
	iajax.clearParam();
	iajax.addParam("CHK_CSRF", random);
	iajax.addParam("SCRT_NM", scrp_nm);
	iajax.addParam("JOB_NM", job_nm);
	iajax.addParam("RES_CODE", code);
	iajax.addParam("RES_MSG", msg);
	
	iajax.addParam("SEND_USR_TIME", "11111111111111");
	iajax.addParam("RES_USR_TIME", "11111111111111");
	
	

	$.ajax({
	    type: "post",
	    url: callURL,
	    dataType: "json",
	    data: iajax.postparam,
	    success: function(json) {
	    },
    	error: function(data, textStatus, error) {
		},
		complete: function() {
		}
	});

}

/* ------------------------------------------------------------------------------
   보증료 Question Mark 팝업 이벤트
------------------------------------------------------------------------------- */
function alertGrtFeeGuide() {
	var guideTxt = "햇살론은 정부보증상품으로 대출금액과 대출기간에 대한 연2% 보증료(사회적배려대상자인 경우 연1% 적용)가 발생하여, 대출실행 시 대출금액에서 차감하고 송금됩니다.";
	alert(guideTxt);			
}
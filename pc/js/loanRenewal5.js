/**
 * ����ϴ���4������ ��ũ��Ʈ
 */

// �����Ķ����
var fnCommon = {};

// fnCommon.isApp = false;   // �� ����
// function fnCommon_addComma( value ){};  // �����Լ� ex.

	/* --------------------------------------------------------------------------------------
		�Ǹ�����/�������/�������� ���� ȭ��
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_001 = {

		/* --------------------------------------------------------------------------------------
			�⺻����
			loanRenewal4_001.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// ����üũ����Ʈ ����
			$("#slid_0_li").addClass("open");  // Ȱ��ȭ
			$("#slid_0_div").show();  // �ϴ� ����

		    // ������� üũ�ڽ� Ŭ�� �̺�Ʈ
			$("input[type='checkbox'][name='agree_chk']").on("change", loanRenewal4_001.fnEvent_CheckChange );

			// �����̵� �̺�Ʈ ����

			$('.toggleList li .btnToggle').on("click", loanRenewal4_001.fnEvent_Slide );

			//$("#slid_3_li").on("click",  loanRenewal4_001.fnEvent_Slide  );

		    //�������� �� �޴� Ŭ�� �̺�Ʈ ����
			//if(userBrs != "Chrome") {
				$("#tab_button_official").on("click", loanRenewal4_001.fnEvent_TabClick );
			//}

			$("#tab_button_mobile").on("click", loanRenewal4_001.fnEvent_TabClick );
			$("#tab_button_credit").on("click", loanRenewal4_001.fnEvent_TabClick );

			// ���� ���� �̺�Ʈ
			$("input[type='text'][name='cert_custNm']").on("keyup", loanRenewal4_001.fnKeyup_custNm );

			// �������� �� �޴� Ŭ�� �̺�Ʈ �߻�
			loanRenewal4_001.fnEvent_TabClick( {target:{id:"tab_button_mobile",className:""}} );

			loanRenewal4_001.fnSearch_1();

			$('body,html').animate({scrollTop: 0}, 100);
		},


		/* --------------------------------------------------------------------------------------
			����󼼺��� ����(�ݱ�)
			loanRenewal4_001.fnClose_agreeDetail
		 -------------------------------------------------------------------------------------- */
		fnClose_agreeDetail : function(e){

			// ���ǹ�ư�� ��� ���ǰ� ����
			var button_id = e.target.id;
			if( !fnCommon_isNull(button_id)  &&  button_id == "agree_view_popup_close" ){
				agree_chk_all_show_flag = true;   // ����������� // ��ü
			}

			// ��ũ�� �̵� ���� ������ ���� �ʱ�ȭ
			$('#agree_view_popup_scroll').animate({scrollTop:0}, 0);
			$("#agree_view_popup").hide();
		},



		/* --------------------------------------------------------------------------------------
			����󼼺��� Ȯ��(+��ư Ŭ��)
			loanRenewal4_001.fnZoomIn
		 -------------------------------------------------------------------------------------- */
		fnZoomIn : function(){
		    var popup_width = ($("#popup_page01").width() + 25) + "px";
	    	$("img[name='agree_view_page']").css('width', popup_width );
		},



		/* --------------------------------------------------------------------------------------
			����󼼺��� ���(-��ư Ŭ��)
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
			����󼼺���
			loanRenewal4_001.fnShow_agreeDetail
		 -------------------------------------------------------------------------------------- */
		fnShow_agreeDetail : function( agree_id ){
			if( !fnCommon_isNull(agree_id) ){

				// ��� �˾� ���� �������� ������ ����
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
					html += "  							<img id='popup_page01' name='agree_view_page' src='/Files/pdf/SH_RB01.png' style='width:100%;'/>	  ";
					html += "  							<img id='popup_page02' name='agree_view_page' src='/Files/pdf/SH_RB02.png' style='width:100%;'/>	  ";
					html += "  							<img id='popup_page03' name='agree_view_page' src='/Files/pdf/SH_RB03.png' style='width:100%;'/>	  ";
					html += "  							<img id='popup_page04' name='agree_view_page' src='/Files/pdf/SH_RB04.png' style='width:100%;'/>	  ";
					html += "  							<img id='popup_page05' name='agree_view_page' src='/Files/pdf/SH_RB05.png' style='width:100%;'/>	  ";
					html += "  							<img id='popup_page06' name='agree_view_page' src='/Files/pdf/SH_RB06.png' style='width:100%;'/>	  ";
					html += "  							<img id='popup_page07' name='agree_view_page' src='/Files/pdf/SH_RB07.png' style='width:100%;'/>	  ";
					html += "  						</div>		  ";
					html += "  					</div>			  ";
					html += "  					<div id='agree_view_popup_close' onclick='javascript:loanRenewal4_001.fnClose_agreeDetail(event);' class='pop_Title' style='color:#fff; height:53px; background-color:#3858ed;'>Ȯ��</div>			  ";
					html += "  				</div>				  ";
					html += "  			</div>					  ";
					html += "  		</div>						  ";
					html += "  		</article>						  ";

					$("body").append(html);
				}

				// *show �� ���� �ؾ� ����� ������
				$("#agree_view_popup").show();

				// ��ũ�� ��ġ �⺻����
				var window_height = $(window).height();
				var agree_height = $("#agree_view_popup_close").height();
				var popup_height = window_height - agree_height;
				$("#agree_view_popup_scroll").css('height', popup_height + "px" );

				// ���λ����� �⺻����
				var window_width = $(window).width();
				var popup_width = window_width;   // (window_width*95/100);
				$("#agree_view_popup_div").css('width', popup_width + "px");


				// ��ü����  or  [�ʼ�]����(�ſ�)���� ����&middot;�̿�&middot;��������
				if(agree_id != "all"  &&  agree_id != "agree_chk_1"){
					var scrollTop_id = "";

					// [�ʼ�]����(�ſ�)���� ��ȸ ����
					if(agree_id == "agree_chk_2"){
						scrollTop_id = "popup_page02";

					// ���յ�2 // ���ﺸ������ ���� �̿� ���Ǽ�
					}else if(agree_id == "agree_chk_3"){
						scrollTop_id = "popup_page03";

					// [�޻�� �ʼ�]����(�ſ�)���� ����&middot;�̿�&middot;���� ����
					}else if(agree_id == "agree_chk_4"){
						scrollTop_id = "popup_page04";

					// [�޻�� �ʼ�]�ſ����� ��ȸ ����
					}else if(agree_id == "agree_chk_5"){
						scrollTop_id = "popup_page05";

					// [����]���������Ƚɻ���û
					}else if(agree_id == "agree_chk_6"){
						scrollTop_id = "popup_page07";

					// �ſ���������&middot;�̿�&middot;�������ð��Ǹ��ȳ���
					}else if(agree_id == "agree_chk_8"){
						scrollTop_id = "popup_page06";
					}

					// ��ũ�� �̵�
					if( !fnCommon_isNull(scrollTop_id) ){
						var scrollTop_value = $("#" + scrollTop_id).offset().top;

						// �ۿ��� // ���϶� ������ ������ height �� �� ª��, ������� ����
						var isApp_flag = fnCommon_isApp();
						if( isApp_flag ){
							scrollTop_value - 45;
						}

						$('#agree_view_popup_scroll').animate({scrollTop: scrollTop_value }, 500);
					}
				}
			}

			// ����üũ���� // ���� 1 ������(4�뺸�谡��) 2 ���λ���� 3 ��Ÿ����ҵ��������뿪������ 4 ���ݼҵ���
			var qna01 = $("input[type='radio'][name='qna01']:checked");
			var qna01_value = "";
			if( !fnCommon_isNull(qna01)  &&  !fnCommon_isNull(qna01.length)  &&  qna01.length > 0 ){
				qna01_value = qna01[0].value;
			}
			if(qna01_value == 1){
				$("#popup_page04").show();  // �������� �Ϸ� ���� ����
				$("#popup_page05").show();  // �������� �Ϸ� ���� ����
			}else{
				$("#popup_page04").hide();  // �������� �Ϸ� ���� ����
				$("#popup_page05").hide();  // �������� �Ϸ� ���� ����
			}

		},

		/* --------------------------------------------------------------------------------------
			��ü���� Ŭ��
			loanRenewal4_001.fnClickAllCheck
		 -------------------------------------------------------------------------------------- */
		fnClickAllCheck : function(e){
			var checked_flag = false;
			var checked = $("#allChk")[0].checked;
			if( !fnCommon_isNull(checked, "boolean") ){
				checked_flag = true;

				// ��ü��� �󼼺���
				loanRenewal4_001.fnShow_agreeDetail('all');
			}

			// �޻�� ���� ���� ����
			var agree_4_li_display = $("#agree_4_li").prop("style").display;
			var agree_4_check_flag = true;   // �޻�е� ��ü���ǿ� ���� ����

			// ����� �����̸� üũ���� ����
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

							// ��ü���� �����׸�
							// ���� �������� �ȳ� ��û
							//if( agree_obj_id.indexOf("agree_chk_6") < 0 && agree_obj_id.indexOf("agree_chk_7") < 0 ){

								// �޻�� ����
								if( agree_obj_id.indexOf("agree_chk_4") > -1  ||  agree_obj_id.indexOf("agree_chk_5") > -1 ){

									// ��ü���� ���ۿ� ���Կ��� Ȯ��
									if(agree_4_check_flag){
										$("#" + agree_obj_id ).prop("checked", checked_flag);
									}

								// üũ�� ����
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
			���� ���� �̺�Ʈ
			loanRenewal4_001.fnKeyup_custNm
		 -------------------------------------------------------------------------------------- */
		fnKeyup_custNm : function( type ){

			// ���������ϷῩ��
			isAuthed = false;

			if( !fnCommon_isNull(type) ){

				// ���� X Ŭ��
				if(type == "delete"){
					$("#cert_custNm").val("");
					$("#cert_custNm").focus();  // Ű�е尡 ������� �����ϱ�
				}
			}

			// �̸� ������ ������ư ���̰�
			var cert_custNm = $("#cert_custNm").val();
			if( !fnCommon_isNull(cert_custNm) ){
				$("#cert_custNm_delete_p").show();
			}else{
				$("#cert_custNm_delete_p").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			������� üũ�ڽ� Ŭ�� �̺�Ʈ
			loanRenewal4_001.fnEvent_CheckChange
		 -------------------------------------------------------------------------------------- */
		fnEvent_CheckChange : function(e){
			var checked = e.target.checked;  // ���� �߻��� üũ���ΰ�
			var id = e.target.id;

			// üũ �����̸� ��ü���� ������Ű��
			if( fnCommon_isNull(checked, "boolean") ){
				$("#allChk").prop("checked", false);
				var label = $("label[for='allCheck']");  // �ð��� Ŭ��ȿ���� ���ֱ�

					label.removeClass("checked");
					//label.addClass("ui-checkbox-off");

			}
		},



		/* --------------------------------------------------------------------------------------
			�������� �� �޴� Ŭ�� �̺�Ʈ
			loanRenewal4_001.fnEvent_TabClick
		 -------------------------------------------------------------------------------------- */
		fnEvent_TabClick : function(e){
    		// ��Ȱ��ȭ������ �� Ŭ����
    		var className = e.target.className;
			if( fnCommon_isNull(className)  ||  className.indexOf("active") < 0 ){

	    		// ���������ϷῩ��
	    		isAuthed = false;
			}

    		var this_button_id = e.target.id;
			if( !fnCommon_isNull(this_button_id) ){

				// ������ ��ư�̸� �ۿ��� üũ
				// ����� 5������ - ����
				//if(this_button_id == "tab_button_official"  &&  !isApp_flag){

					// ���� �ƴϸ� �޴������� �⺻����
					//this_button_id = "tab_button_mobile";
				//}

				// �ٸ��� Ŭ��ȿ�� ���ֱ�
				var tab_button_list = $("a[name='tab_button']");

				if( !fnCommon_isNull(tab_button_list)  &&  !fnCommon_isNull(tab_button_list.length)  &&  tab_button_list.length > 0 ){
					for(var i=0; i < tab_button_list.length; i++){

						var button = tab_button_list[i];
						var button_id = button.id;

						if( !fnCommon_isNull(button_id) ){
							// ������ �ƴҶ� �׳� ����, �������̸� ���϶��� ����
							// ����� 5������, isApp_flag ����
							if(button_id != "tab_button_official"  ||  (button_id == "tab_button_official")){
//								if(button_id != "tab_button_official"  ||  (button_id == "tab_button_official"  &&  isApp_flag)){
								var button_obj = $("#" + button_id);
								if( !fnCommon_isNull(button_obj)  &&  button_obj.length > 0 ){
									var parent = button_obj.parent();  // ���ΰ� �ִ� li �±�

									var div_id = button_id.replace("_button", "");  // id ���� ���缭 �ϴ� div ���� id ����

									// �ش� ���� Ȱ��ȭ
									if( button_id == this_button_id ){

										// Ȱ��ȭ ȿ��
										if( !fnCommon_isNull(parent)  &&  !parent.hasClass("tab_on")){
											parent.addClass("tab_on");
											bonin_sw =button_id;

										}

										// �ϴܺ� ����
										$("#" + div_id).show();
										$("#" + div_id + "_agree").show();

										/* toggle ����
										if(!button_obj.hasClass("active")){
											button_obj.addClass("ui-btn-active");
										}
										if(!button_obj.parent().hasClass("active")){
											button_obj.parent().addClass("ui-tabs-active ui-state-active");
										}
										*/

									// �ٸ� ���� ��Ȱ��
									}else{
										parent.removeClass("tab_on");
										$("#" + div_id).hide();
										$("#" + div_id + "_agree").hide();

										/* toggle ����
										button_obj.removeClass("ui-btn-active");
										button_obj.parent().removeClass("ui-tabs-active ui-state-active");
										*/
									}
								}
							}
						}
					}
				}


				// �޴���
				if(this_button_id == "tab_button_mobile"){

					// �ϴ��� �� �ͼӿ��� �Է¶����� ���
					var cert_hndNo = $("#cert_hndNo").val();  // ��� �Է¶�
					$("#tab_mobile_cert_hndNo").val(cert_hndNo);  // �ϴ� �޴��� ��ȣ �Է� ����

					$("#cert_hndNo_dl").hide();
					$("#tab_mobile_cert_hndNo_dl").show();

				}else{
					$("#cert_hndNo_dl").show();
					$("#tab_mobile_cert_hndNo_dl").hide();
				}


	    		/*
	    		<li class="ui-block-c ui-state-default ui-corner-top ui-tabs-active ui-state-active" role="tab" tabindex="0" aria-controls="tab_credit"
	    			aria-labelledby="tab_button_credit" aria-selected="true">

			    		<a href="#tab_credit" id="tab_button_credit" class="ui-link ui-btn ui-tabs-anchor" role="presentation" tabindex="-1">
			    		�ſ�ī��
			    		</a>
	    		</li>
	    		*/

			}

			$('body,html').animate({scrollTop: 0}, 100);
		},



		/* --------------------------------------------------------------------------------------
			�޴�����ȣ ���� �̺�Ʈ
			loanRenewal4_001.fnKeyup_hndNo
		 -------------------------------------------------------------------------------------- */
		fnKeyup_hndNo : function(e){

			// ���������ϷῩ��
			isAuthed = false;

			var value = e.target.value;

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			value = fnCommon_getOnlyNumber(value);

			// �ʵ忡 �缳���� ��
			var value_format = value;

			if( !fnCommon_isNull(value)  &&  value.length > 0 ){
				if(value.length > 3){

					// ���ڸ� �߶󳻱�
					value_format = value.substring(0, 3);
					value = value.substring(3, value.length);

					// ������ ���ڸ� �̻��̸�
					if(value.length > 3){

						// �߰��ڸ� �߶󳻱�
						value_format += "-" + value.substring(0, 3);
						value = value.substring(3, value.length);

						// ������ ���ڸ� �̻��̸� �߰��ڸ��� ���ڸ� �� �ѱ��
						if(value.length > 4){
							value_format += value.substring(0, 1);
							value = value.substring(1, value.length);
						}
					}

					// ���� ���ڸ��� ������ �̰͵� ���̱�
					if( !fnCommon_isNull(value) ){
						value_format += "-" + value;
					}
				}
			}

			// ��� �޴�����ȣ �ʵ忡 ����
			$("input[type='tel'][name='cert_hndNo']").val(value_format);
		},



		/* --------------------------------------------------------------------------------------
			�ֹε�Ϲ�ȣ �ٰ� �� ������� �ȳ� �˾�
			loanRenewal4_001.fnPopup_1
		 -------------------------------------------------------------------------------------- */
		fnPopup_1 : function( type ){

			var msg = "";
			msg += "<p>�������������� �ſ������� �̿� �� ��ȣ�� ���� ���� ����� �� 37���� 2�� �ǰ��Ͽ� �ֹε�Ϲ�ȣ�� �����մϴ�.</p>";
			msg += "<p>Ÿ���� �ֹε�Ϲ�ȣ�� �����ϰų�, ��������ϴ� �ڴ� 3�� ������ ¡�� �Ǵ� 3õ���� ������ ������ �ΰ��� �� �ֽ��ϴ�.</p>";

			// �޼��� �˾�
			fnCommon_popup("open", msg);
		},



		/* --------------------------------------------------------------------------------------
			�޴��� �������� ���� ���� �ڼ�������
			loanRenewal4_001.fnShow_agree_certif01
		 -------------------------------------------------------------------------------------- */
		fnShow_agree_certif01 : function(){
			popupURL = popupURL_clause_auth_hp_skt;
			showDialog(popupURL, 420);

			/* 20190524 ��� ��Ż縦 �����ֵ��� ����
			// ��Ż�
			var telecom = $("#telecom option:selected").val();
			if( fnCommon_isNull(telecom) ){
				alert("��Ż縦 �������ּ���.");
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
			�ſ�ī�� �������� ���� ���� �ڼ�������
			loanRenewal4_001.fnShow_agree_certif02
		 -------------------------------------------------------------------------------------- */
		fnShow_agree_certif02 : function(){
			showDialog(popupURL_clause_auth_card, 420);
		},



		/* --------------------------------------------------------------------------------------
			�ֹε�Ϲ�ȣ ���ڸ� ���� �̺�Ʈ
			loanRenewal4_001.fnKeyup_residNo_1
		 -------------------------------------------------------------------------------------- */
		fnKeyup_residNo_1 : function(e){

    		// ���������ϷῩ��
    		isAuthed = false;

			// ���ڿ� ���� �� ���ڸ� ��ȯ
    		var value = e.target.value;
    		e.target.value = fnCommon_getOnlyNumber(value);
		},



		/* --------------------------------------------------------------------------------------
			�ܸ����� ����
			loanRenewal4_001.fnSave_2
		 -------------------------------------------------------------------------------------- */
		fnSave_2 : function( device_result ){

			// �ܸ����� ������ ���� ������ ����
			if( !fnCommon_isNull(device_result) ){

				var BANK_INSP_NO_param = BANK_INSP_NO;  // �����û��ȣ
				var HND_NO = device_phoneNumber;  // �ܸ����� ������ �޴�����ȣ // �ȵ���̵常 ���� ����

				// �ܸ�����
				var IMEI = device_result.imei;  // �ȵ���̵常 ���� ����
				var DEVICE_TYPE = device_result.DEVICE_TYPE;
				var DEVICE_MDL = device_result.DEVICE_MDL;
				var APP_VER = device_result.APP_VER;
				var OS_VER = device_result.OS_VER;

				// null �� ������ iajax.postparam �������ϱ� ����!
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
				// ����� ���� 5�� - ����
				// iajax.addParam("CHK_CSRF", random);
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
				    		alert("�ܸ����� ���忡 �����Ͽ����ϴ�.");
				    	}
				    },
					beforeSend : function() {
						ing.show();
					},
					error: function(data, textStatus, error){
						ing.hide();
			    		alert("�ܸ����� ���忡 �����Ͽ����ϴ�.");
					},
					complete: function(){

			    		loanRenewal4_001.fnSearch_2();
					}
				});
			}
		},



		/* --------------------------------------------------------------------------------------
			���⺻���� ��ȸ
			loanRenewal4_001.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function( device_result ){

			/* ����� 5������
			 * PC �� �ΰ���� ����
			 */
			/*
			// �ܸ����� ������ �޴�����ȣ �־����� ���� ����
			if( !fnCommon_isNull(device_result)  &&  !fnCommon_isNull(device_result.phoneNumber) ){
				device_phoneNumber = device_result.phoneNumber;
				device_phoneNumber = fnCommon_getOnlyNumber(device_phoneNumber);  // ���ڿ� ���� �� ���ڸ� ��ȯ

				if( !fnCommon_isNull(device_phoneNumber)  &&  !fnCommon_isNull(device_phoneNumber.length) ){

					// 82�� �����ϴ� ���
					if(device_phoneNumber.indexOf("82") == 0  &&  device_phoneNumber.length > 2){

						// ��2�ڸ� 82 ����  ex) 8201012345678  �̷��� ��
						device_phoneNumber = device_phoneNumber.substring(2, device_phoneNumber.length);
						device_phoneNumber = "0" + device_phoneNumber;
					}

					// �޴�����ȣ ���� �̺�Ʈ�� ����ؼ� �� ����
					loanRenewal4_001.fnKeyup_hndNo({target:{value:device_phoneNumber}});
				}
			}
			 */

			// ���⺻���� ��ȸ
			iajax.clearParam();
//			iajax.addParam("CHK_CSRF", random);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){

						SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;  // �ǰ����� ��ũ���� ��������
						YOUTH_GUIDE_YN = json.YOUTH_GUIDE_YN;  // ������������ ���� ����
						$("#qna01").val(json.qna01);
						$("#qna02").val(json.qna02);
						$("#qna03").val(json.qna03);

						// �޻�� ���� ���⿩��
						if(json.qna01 == "1"){
							$("#agree_4_li").show();
							$("#agree_5_li").show();
						}else{
							$("#agree_4_li").hide();
							$("#agree_5_li").hide();

							// üũ���� // ���� �������� �ʵ���
							$("#agree_chk_4").prop("checked", false);
							$("#agree_chk_4_1").prop("checked", false);
							$("#agree_chk_5").prop("checked", false);
							$("#agree_chk_5_1").prop("checked", false);
						}
						
						// DHKANG[������500] ���յ� ���� ���⿩��
						if(json.qna01 == "8" || json.qna01 == "9") {
							$("#agree_3_li").hide();

							// üũ����
							$("#agree_chk_3").prop("checked", false);
							$("#agree_chk_3_1").prop("checked", false);
							
						}


						// ����
						var custNm = fnCommon_deleteNull(json.custNm);
						if( !fnCommon_isNull(custNm) ){
							$("input[type='text'][name='cert_custNm']").val( custNm );
						}

						// �������
						var residNo = json.residNo;
						if( !fnCommon_isNull(residNo) ){
							$("input[type='tel'][name='cert_residNo_1']").val( residNo );
						}

						// �޴�����ȣ
						var hndNo = json.hndNo;
						if( !fnCommon_isNull(hndNo) ){

							// ���ڿ� ���� �� ���ڸ� ��ȯ
							hndNo = fnCommon_getOnlyNumber(hndNo);

							// �޴�����ȣ ���� �̺�Ʈ�� ����ؼ� �� ����
							loanRenewal4_001.fnKeyup_hndNo({target:{value:hndNo}});
						}

						isXecureAuth = json.isXecureAuth;
						SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error) {
					ing.hide();
					// alert(error);
					// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�ſ�ī�� ��ȿ��üũ
			loanRenewal4_001.fnCert_card_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_card_valid : function(){

			// �ſ�ī�� ��ȣ
			var card_no_1 = $("#card_no_1").val();
			if( fnCommon_isNull(card_no_1)  ||  card_no_1.length < 4 ){
				alert("�ſ�ī�� ��ȣ�� �Է����ּ���.");
				$("#card_no_1").focus();
				return false;
			}
			var card_no_2 = $("#card_no_2").val();
			if( fnCommon_isNull(card_no_2)  ||  card_no_2.length < 4 ){
				alert("�ſ�ī�� ��ȣ�� �Է����ּ���.");
				$("#card_no_2").focus();
				return false;
			}
			var card_no_3 = $("#card_no_3").val();
			if( fnCommon_isNull(card_no_3)  ||  card_no_3.length < 4 ){
				alert("�ſ�ī�� ��ȣ�� �Է����ּ���.");
				$("#card_no_3").focus();
				return false;
			}
			var card_no_4 = $("#card_no_4").val();
			if( fnCommon_isNull(card_no_4)  ||  card_no_4.length < 3 ){
				alert("�ſ�ī�� ��ȣ�� �Է����ּ���.");
				$("#card_no_4").focus();
				return false;
			}

			// �ſ�ī�� ����
			var valid_trm_yymm = $("#valid_trm_yymm").val();
			if( fnCommon_isNull(valid_trm_yymm)  ||  valid_trm_yymm.length < 4 ){
				alert("�ſ�ī�� ��ȿ�Ⱓ�� �Է����ּ���.");
				$("#valid_trm_yymm").focus();
				return false;
			}

			// �ſ�ī�� ��й�ȣ �� 2�ڸ�
			var cd_pwd = $("#cd_pwd").val();
			if( fnCommon_isNull(cd_pwd)  ||  cd_pwd.length < 2 ){
				alert("��й�ȣ �� 2�ڸ��� �Է����ּ���.");
				$("#cd_pwd").focus();
				return false;
			}

			/*
			// �ʼ��׸� ���ǿ��� üũ
			var agree_credit = $(":checkbox[name='agree_credit']");
			if( !fnCommon_isNull(agree_credit)  &&  !fnCommon_isNull(agree_credit.length)  &&  agree_credit.length > 0 ){
				for(var i=0; i < agree_credit.length; i++){

					var checkbox = agree_credit[i];
					if( !fnCommon_isNull(checkbox) ){

						var checked = checkbox.checked;
						if( fnCommon_isNull(checked, "boolean") ){

							// �ش� üũ�ڽ� �� �ѱ� ����
							alert( checkbox.title + " �׸��� '����'�� �����Ͻ� �� �������ּ���.");
							$("#" + checkbox.id).focus();
							return false;
						}
					}
				}
			}
			*/

			var allChk_credit = $("#allChk_credit")[0].checked;
			if( !allChk_credit ){
				alert("�ſ�ī�� �������� ��ü���Ƿ� �����Ͻ� �� �������ּ���.");
				return false;
			}

			return true;
		},



		/* --------------------------------------------------------------------------------------
			�ſ�ī�� ��������
			loanRenewal4_001.fnCert_card_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_card_confirm : function(){

    		// ���������ϷῩ��
    		isAuthed = false;

    		$("#cert_hndNo").val($("#cert_hndNo_credit").val());

    		// �޴�����ȣ
    		var cert_hndNo = $("#cert_hndNo_credit").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();

			iajax.addParam("KIND_CHK", "22" ); //����� 21:ARS����, 22:�ſ�ī������ Ȯ��
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#credit_custNm").val()) );

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo_credit").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			var hndNoSplit = cert_hndNo.split('-');
			iajax.addParam("HND_NO1", hndNoSplit[0]);
			iajax.addParam("HND_NO2", hndNoSplit[1]);
			iajax.addParam("HND_NO3", hndNoSplit[2]);
			iajax.addParam("IP", IP);							//IP�� ���
			iajax.addParam("AUT_AUTH_NO", "01");				//01 ���ͳ�
			iajax.addParam("CD_PWD", $("#credit_code").val());	//ī����ڵ�� ���

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_CARD,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					ing.hide();
			    	if(json.RESULT_NO == "0000"){
			    		isAuthed = true;

			    		// �������� ���� ó��
						loanRenewal4_001.fnCert_Success();

			    	}else{
			    		alert("�ſ�ī�� ������ �����Ͽ����ϴ�.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
					alert("�ſ�ī�� ������ �����Ͽ����ϴ�.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
				},
				complete: function(){
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			������� �� Ȯ��
			loanRenewal4_001.fnConfirmAgree
		 -------------------------------------------------------------------------------------- */
		fnConfirmAgree : function(){
		
			// �޻�� ���ǰ���
			var sunshine_agree_Y_count = 0;

			// �޻�� ���Ǿȵ��׸� ����
			var sunshine_agree_N_list = [];

			// ����üũ���� // ���� 1 ������(4�뺸�谡��) 2 ���λ���� 3 ��Ÿ����ҵ��������뿪������ 4 ���ݼҵ���
			/*var qna01 = $("input[type='radio'][name='qna01']:checked");
			var qna01_value = "";
			if( !fnCommon_isNull(qna01)  &&  !fnCommon_isNull(qna01.length)  &&  qna01.length > 0 ){
				qna01_value = qna01[0].value;
			}*/

			var qna01 = $("#qna01").val();
			var qna01_value = "";
			if( !fnCommon_isNull(qna01)  &&  !fnCommon_isNull(qna01.length)  &&  qna01.length > 0 ){
				qna01_value = $("#qna01").val();
			}


			// �������� ����Ʈ
			var agree_list = $("input[type='checkbox'][name='agree_chk']");
			if( !fnCommon_isNull(agree_list)  &&  !fnCommon_isNull(agree_list.length)  &&  agree_list.length > 0 ){
				for(var i=0; i < agree_list.length; i++){

					var agree_obj = agree_list[i];
					if( !fnCommon_isNull(agree_obj) ){

						var agree_obj_id = agree_obj.id;
						var checked = agree_obj.checked;  // üũ����

						if( !fnCommon_isNull(agree_obj_id) ){

							// [�ʼ�]����(�ſ�)���� �����̿��������� // [�ʼ�]����(�ſ�)���� ��ȸ ���� // [�ʼ�]��Ȯ������ �ȳ�
							if( agree_obj_id.indexOf("agree_chk_1") > -1  ||  agree_obj_id.indexOf("agree_chk_2") > -1  ||  agree_obj_id.indexOf("agree_chk_9") > -1 ){
								if( fnCommon_isNull(checked, "boolean") ){
									var confirm_result = confirm("'" + agree_obj.title + "' �׸��� ���� �ʼ������Դϴ�. ���� �� �����Ͻðڽ��ϱ�?");
									if(confirm_result){

										$("#" + agree_obj_id).parent().addClass("checked");

										$("#" + agree_obj_id).prop("checked", true);
										//$("#" + agree_obj_id).trigger('click');

										 // �ϴ� ���׸���� ���ǽ�������
										if( agree_obj_id.indexOf("agree_chk_1") > -1  ||  agree_obj_id.indexOf("agree_chk_2") > -1 ){
											$("#" + agree_obj_id + "_1").prop("checked", true);
											$("#" + agree_obj_id + "_2").prop("checked", true);

											$("#" + agree_obj_id  + "_1").parent().addClass("checked");
											$("#" + agree_obj_id  + "_2").parent().addClass("checked");

										}
									}else{
										return false;
									}
								}

							// ���λ����, ��Ÿ����ҵ���, ���ݼҵ��ڴ� ���յ�2 ���� �ʼ�
							}else if( agree_obj_id.indexOf("agree_chk_3") > -1  &&  fnCommon_isNull(checked, "boolean") ){
								//DHKANG[������500]
								
								if( !fnCommon_isNull(qna01_value)  &&  ( qna01_value == "2"  ||  qna01_value == "3"  ||  qna01_value == "4" ) ){

									var qna01_name = "";
									if(qna01_value == "2"){
										qna01_name = "���λ����";
									}else if(qna01_value == "3"){
										qna01_name = "��Ÿ����ҵ���";
									}else if(qna01_value == "4"){
										qna01_name = "���ݼҵ���";
									}

									var confirm_result = confirm(qna01_name + "�� '" + agree_obj.title + "'�׸��� �ʼ������Դϴ�. ���� �� �����Ͻðڽ��ϱ�?");
									if(confirm_result){
										$("#" + agree_obj_id).prop("checked", true);
										$("#" + agree_obj_id).parent().addClass("checked");

										$("#" + agree_obj_id + "_1").prop("checked", true);  // �ϴ� ���׸���� ���ǽ�������
										$("#" + agree_obj_id + "_1").parent().addClass("checked");
									}else{
										return false;
									}
								}

							// �޻�� �ʼ��� ���ÿ� ��ε��� �Ǵ� ��� �̵��Ǹ� ����
							}else if( agree_obj_id.indexOf("agree_chk_4") > -1  ||  agree_obj_id.indexOf("agree_chk_5") > -1 ){
								if( !fnCommon_isNull(checked, "boolean") ){
									sunshine_agree_Y_count++;

								}else{
									// ���Ǿȵ��׸� ����
									sunshine_agree_N_list.push("agree_obj_id");
								}

							//�������� �Ƚɻ���û üũ
							}else if( agree_obj_id.indexOf("agree_chk_6") > -1){
								if( fnCommon_isNull(checked, "boolean") ){
									var confirm_result = confirm(agree_obj.title + "\n�������, ��û �ߴ� �� ������ ��Ȱ���� ���� ��� ���������� ������ ���͵帳�ϴ�. �����Ͻðڽ��ϱ�?");
									if(confirm_result){
										$("#" + agree_obj_id).prop("checked", true);
										$("#" + agree_obj_id).parent().addClass("checked");
									}
								}
							}
						}
					}
				}
			}

			// �޻�� ���ǵ� �׸� ������ �������� ���õ��� �ʼ�
			if(sunshine_agree_Y_count > 0  &&  sunshine_agree_Y_count < 4){
				var confirm_result = confirm("�޻�� �ѵ���ȸ�� ���ؼ��� ���α�������� ���Ǽ� ���ǰ� �ʿ��մϴ�.\n�����Ͻðڽ��ϱ�?");
				// confirm("���յ�2���� �ѵ��� �Բ� ��ȸ�ϱ� ���ؼ��� ���ﺸ�������� ���Ǽ� ���ǰ� �ʿ��մϴ�.\n�����Ͻðڽ��ϱ�?")

				// ���������� �������� �ڵ�üũ, �̵��Ǵ� ��� ����
				$("#agree_chk_4").prop("checked", confirm_result);
				$("#agree_chk_4_1").prop("checked", confirm_result);
				$("#agree_chk_5").prop("checked", confirm_result);
				$("#agree_chk_5_1").prop("checked", confirm_result);

				$("#agree_chk_4").parent().addClass("checked");
				$("#agree_chk_4_1").parent().addClass("checked");
				$("#agree_chk_5").parent().addClass("checked");
				$("#agree_chk_5_1").parent().addClass("checked");

			}

			// DHKANG[������500] �ֺ�, ������ ���
			if(qna01_value == "8" || qna01_value == "9") {
				$("#agree_chk_3").prop("checked", false);
				$("#agree_chk_3_1").prop("checked", false);
				
			}

			//�������� �Ƚɻ���û üũ
			if( $("#agree_chk_6")[0].checked == false){

					var confirm_result = confirm($("#agree_chk_6")[0].title + "\n�������, ��û �ߴ� �� ������ ��Ȱ���� ���� ��� ���������� ������ ���͵帳�ϴ�. �����Ͻðڽ��ϱ�?");
					if(confirm_result){
						$("#agree_chk_6").prop("checked", true);
						$("#agree_chk_6").parent().addClass("checked");

					}

			}

			// ��ü���� ��� �������� üũ
			if( fnCommon_isNull(agree_chk_all_show_flag, "boolean") ){

				// ��ü��� �󼼺��� 20191107
				//loanRenewal4_001.fnShow_agreeDetail('all');
			}
			agree_chk_flag = true;
			// ��ȿ�� ��������� �������� �����̵� ����
			loanRenewal4_001.fnMove_slide(3);
		},



		/* --------------------------------------------------------------------------------------
			�������� Ȯ�� ��ư Ŭ��
			loanRenewal4_001.fnCert_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_confirm : function(){

			all_tran_success_yn = true;

			// �ŷ� ��� ���� ���� ���� üũ
			// �������� �Ϸ������� �����ܰ� pass // app ���� �ڷΰ���� �ϴ��� web �� ����Ǿ� ������ ���� ����
			if(isAuthed  &&  all_tran_success_yn){

    			// ȭ���̵� // ������������ �ȳ� or �¶��μ�������(��ũ����)
    			loanRenewal4_001.fnNext();

			}else{

				// ���õ� �� ����
				var tab_button_list = $("a[name='tab_button']");
				if( !fnCommon_isNull(tab_button_list)  &&  !fnCommon_isNull(tab_button_list.length)  &&  tab_button_list.length > 0 ){
					for(var i=0; i < tab_button_list.length; i++){

						// Ȱ��ȭ �� �ǿ� ���ϴ� ���� ���
						var button = tab_button_list[i];
						var parent = $(button).parent();
						if( !fnCommon_isNull(parent)  &&  parent.hasClass("tab_on") ){

							var button_id = button.id;
							if( !fnCommon_isNull(button_id) ){

								var fnCallback = null;
								var valid_result = false;

								// ������
								if(button_id == "tab_button_official"){

									// ������ ��ȿ��üũ - (�̸�, �ֹι�ȣ, �޴�����ȣ) �⺻ �������� ���뿵�� üũ�̹Ƿ� �Բ� �������!
									valid_result = loanRenewal4_001.fnCert_valid_xecure();
									if(!valid_result){
										return false;
									}

									isAuthed = false;
									fn_Xecure_Confirm();

									// �޴���
								}else if(button_id == "tab_button_mobile"){

									// �޴������� ��ȿ��üũ // valid : ������ȣ����
									valid_result = fnCommon_Cert_phone_valid("valid");
									if(!valid_result){
										return false;
									}

									// �Էµ� �޴��� ������ȣ ����
									fnCallback = loanRenewal4_001.fnCert_phone_confirm;

									// �Ǹ����� ��û // �⺻������� ���� ���� ����
									loanRenewal4_001.fnSave_realName(fnCallback, button_id);
									// �ſ�ī��
								}else if(button_id == "tab_button_credit"){

									// Ars��û�� ���������� �ߴ��� üũ
									if(!isArsCalled){
										alert("[ARS��û]��ư�� ���� ��ȭ���� ��, ī���й�ȣ �� 2�ڸ��� �Է��� �� ��õ����ּ���.");
										return false;
									}

									// �ſ�ī�� ��ȿ��üũ
									valid_result = loanRenewal4_015.fnCert_card_valid();
									if(!valid_result){
										return false;
									}

									// �ſ�ī�� ��������
									fnCallback = loanRenewal4_001.fnCert_card_confirm;

									// �Ǹ����� ��û // �⺻������� ���� ���� ����
									loanRenewal4_001.fnSave_realName(fnCallback, button_id);
								}
							}
						}
					}
				}
			}

		},



		/* --------------------------------------------------------------------------------------
			������ ��ȿ��üũ
			loanRenewal4_001.fnCert_xecure_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_xecure_valid : function( type ){
			var result = true;

			// �̸�
			var cert_custNm = $("#cert_custNm").val();
			if( fnCommon_isNull(cert_custNm) ){
				alert("�̸��� �Է����ּ���.");
				$("#cert_custNm").focus();
				return false;
			}

			// �ֹε�Ϲ�ȣ
			var cert_residNo_1 = $("#cert_residNo_1").val();
			if( fnCommon_isNull(cert_residNo_1)  ||  cert_residNo_1.length < 6 ){
				alert("�ֹε�Ϲ�ȣ ���ڸ� 6�ڸ��� �Է����ּ���.");
				$("#cert_residNo_1").focus();
				return false;
			}
			var resid_no2 = $("#resid_no2").val();
			if( fnCommon_isNull(resid_no2)  ||  resid_no2.length < 7 ){
				alert("�ֹε�Ϲ�ȣ ���ڸ� 7�ڸ��� �Է����ּ���.");
				$("#resid_no2").focus();
				return false;
			}

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( fnCommon_isNull(cert_hndNo)  ||  cert_hndNo.length < 10 ){
				alert("�޴�����ȣ�� �Է����ּ���.");
				$("#cert_hndNo").focus();
				return false;
			}

			var cert_hndNo_pattern = /^\d{10,11}$/;
			if(!cert_hndNo_pattern.test(cert_hndNo)) {
				alert("�޴�����ȣ�� ��Ȯ�ϰ�\n�Է����ּ���.");
				$("#cert_hndNo").focus();
				return false;
			}

			return result;
		},


	/* --------------------------------------------------------------------------------------
	������ ��ȿ��üũ
	loanRenewal4_001.fnCert_valid_xecure
 -------------------------------------------------------------------------------------- */
	fnCert_valid_xecure : function( type ){
		var result = true;

		$("#cert_custNm").val($("#offi_custNm").val());

		// �̸�
		var cert_custNm = $("#offi_custNm").val();
		if( fnCommon_isNull(cert_custNm) ){
			alert("�̸��� �Է����ּ���.");
			$("#offi_custNm").focus();
			return false;
		}

		// �ֹε�Ϲ�ȣ
		var cert_residNo_1 = $("#offi_residNo_1").val();
		if( fnCommon_isNull(cert_residNo_1)  ||  cert_residNo_1.length < 6 ){
			alert("�ֹε�Ϲ�ȣ ���ڸ� 6�ڸ��� �Է����ּ���.");
			$("#offi_residNo_1").focus();
			return false;
		}
		var resid_no2 = $("#offi_residNo_2").val();
		if( fnCommon_isNull(resid_no2)  ||  resid_no2.length < 7 ){
			alert("�ֹε�Ϲ�ȣ ���ڸ� 7�ڸ��� �Է����ּ���.");
			$("#offi_residNo_2").focus();
			return false;
		}


		// �޴��� ��ȣ �߰� - �޴��� ��ȣ�� ������ ���� �Ұ�
		// �޴�����ȣ
		var cert_hndNo = $("#cert_hndNo_xecure").val();

		// ���ڿ� ���� �� ���ڸ� ��ȯ
		cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

		if( fnCommon_isNull(cert_hndNo)  ||  cert_hndNo.length < 10 ){
			alert("�޴�����ȣ�� �Է����ּ���.");
			$("#cert_hndNo_xecure").focus();
			return false;
		}

		var cert_hndNo_pattern = /^\d{10,11}$/;
		if(!cert_hndNo_pattern.test(cert_hndNo)) {
			alert("�޴�����ȣ�� ��Ȯ�ϰ�\n�Է����ּ���.");
			$("#cert_hndNo_xecure").focus();
			return false;
		}


		return result;
	},


		/* --------------------------------------------------------------------------------------
			������ �������� ȣ��(app)
			loanRenewal4_001.fnCert_xecure_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_xecure_confirm : function(){
	   		isAuthed = false;
	   		fn_Xecure_Confirm();
		},



		/* --------------------------------------------------------------------------------------
			�޴��� �������� - �Էµ� �޴��� ������ȣ ����
			loanRenewal4_001.fnCert_phone_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_confirm : function(){

    		// ���������ϷῩ��
    		isAuthed = false;

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("cust_nm", fnCommon_deleteNull($("#mobile_custNm").val()) );   // ����
			iajax.addParam("HND_NO", cert_hndNo );   // �޴�����ȣ
			iajax.addParam("com_kind", $("#telecom").val() );   // ��Ż�
			iajax.addParam("aut_auth_no", $("#aut_auth_no").val());	  // �Էµ� ������ȣ

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_SMSOK,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
			    		// ���������ϷῩ��
			    		isAuthed = true;
			    		// �������� ���� ó��
			    		loanRenewal4_001.fnCert_Success();
			    	}else{
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�޻��(������) �ѵ���ȸ ����
			loanRenewal4_001.fnGetSunshineYn
		 -------------------------------------------------------------------------------------- */
		fnGetSunshineYn : function(){

			// �޻��(������) �ѵ���ȸ ����
			var sunshine_yn_flag = "N";

			// [�޻�� �ʼ�]�ſ����� �����̿����� ����
			var agree_chk_4 = $("#agree_chk_4")[0].checked;
			var agree_4_checked = !fnCommon_isNull( agree_chk_4, "boolean");

			// [�޻�� �ʼ�]�ſ����� ��ȸ ����
			var agree_chk_5 = $("#agree_chk_5")[0].checked;
			var agree_5_checked = !fnCommon_isNull( agree_chk_5, "boolean");

			// �޻�� ���ǵǾ����� �ѵ���ȸ�� �ϳ� �� ��������(���α��������)
			if( agree_4_checked  &&  agree_5_checked ){
				sunshine_yn_flag = "Y";
			}

			return sunshine_yn_flag;
		},



		/* --------------------------------------------------------------------------------------
			�������� ���� ó��
			loanRenewal4_001.fnCert_Success
		 -------------------------------------------------------------------------------------- */
		fnCert_Success : function(){
		 	if(!isAuthed){
				alert("�����Ͻ� ���������� ������ �������ּ���.");
				return;
			}

		 	// �������� üũ�뵵�� ����
		 	isAuthed = false;

			// �޻��(������) �ѵ���ȸ ����
			var sunshine_yn = loanRenewal4_001.fnGetSunshineYn();

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("EKAMS",FN_GetCookie("emf.797.ekams"));
			iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// ������D �űԴ����(�ֵ�Դ�) �Ķ���� ����

			iajax.addParam("SUNSHINELOAN_YN", sunshine_yn);
			iajax.addParam("ONLINE_SUNSHINELOAN_YN", sunshine_yn);


			// �����������
			var agree_list = $("input[type='checkbox'][name='agree_chk']");
			if( !fnCommon_isNull(agree_list)  &&  !fnCommon_isNull(agree_list.length)  &&  agree_list.length > 0 ){
				for(var i=0; i < agree_list.length; i++){
					var agree_obj = agree_list[i];

					if( !fnCommon_isNull(agree_obj) ){
						var agree_obj_id = agree_obj.id;
						var checked = agree_obj.checked;  // üũ����
						var checked_string = "0";  // default �̵���

						// üũ�Ǿ������� ���� ó��
						if( !fnCommon_isNull(checked, "boolean") ){
							checked_string = "1";
						}

						// parameter �߰�
						iajax.addParam(agree_obj_id, checked_string);
					}
				}
			}

			var agree_chk_6 =$("#agree_chk_6")[0].checked;
			if(agree_chk_6){
				iajax.addParam("agree_chk_6","1");
			}else{
				iajax.addParam("agree_chk_6","0");
			}

			var agree_chk_7 =$("#agree_chk_7")[0].checked;
			if(agree_chk_7){
				iajax.addParam("agree_chk_7","1");
			}else{
				iajax.addParam("agree_chk_7","0");
			}

			var agree_chk_10 = $("#agree_chk_10")[0].checked;
			if( agree_chk_10 ){
				iajax.addParam("N01","1");
			}else{
				iajax.addParam("N01","0");
			}

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_AUTH,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull( json )  &&  json.RESULT_NO == "0000" ){

						// 5063  ��������
						try{
							Emf.convCall(797, 5063, 0, 0, 0);
						}catch (err) { }
						setTimeout(function(){
						 	// �������� üũ�뵵�� �缳��
						 	isAuthed = true;

							// ������������ ���� ���� ����
							if( !fnCommon_isNull( json.YOUTH_GUIDE_YN ) ){
								YOUTH_GUIDE_YN = json.YOUTH_GUIDE_YN;
							}


							// û�� ����
							if( !fnCommon_isNull( json.youth_age_yn ) ){
								youth_age_yn = json.youth_age_yn;
							}

							// ������ �������� ���� "true" / "false"
							if( !fnCommon_isNull( json.isXecureAuth ) ){
								isXecureAuth = json.isXecureAuth;
							}

							if( !fnCommon_isNull( json.DATA ) ){

								// �ǰ����轺ũ�������� ����
								SCRP_NHIS_EXP = json.DATA.SCRP_NHIS_EXP;

								// �ο�24��ũ�������� ����
								SCRP_MINWON24_EXP = json.DATA.SCRP_MINWON24_EXP;

								// �ѵ���ȸ�̷¿���
								LIMIT_AMT_SEARCH_YN = json.DATA.LIMIT_AMT_SEARCH_YN;

								// �����ѵ���ȸ�̷¿���
								TODAY_LIMIT_AMT_SEARCH_YN = json.DATA.TODAY_LIMIT_AMT_SEARCH_YN;

					    		// �Ǻ���ũ������ֿ���
					    		SCRP_NHIS_ERROR_YN = json.DATA.SCRP_NHIS_ERROR_YN;

					    		// �ο�24��ũ������ֿ���
					    		SCRP_MINWON24_ERROR_YN = json.DATA.SCRP_MINWON24_ERROR_YN;
							}

							// ��ȯ���� �����û��ȣ
							BANK_INSP_NO = json.BANK_INSP_NO;
							
							loanRenewal4_001.fnSearch_2();

						},100);
			    	}else{

			    		var fail_flag = true;

			    		// �����������Դϴ�. ���������� ��ȸ���� �̾ �����ϼ���
						if( !fnCommon_isNull( json )  &&  !fnCommon_isNull( json.RESULT_DETAIL_NO ) ){
							if(json.RESULT_DETAIL_NO == "000903"  ||  json.RESULT_DETAIL_NO == "000902"){
								fail_flag = false;

								// �޼��� �˾�
					    		var msg = "<p>" + json.RESULT_DESC + "</p>";
					    		var no_button_flag = false;  // �ƴϿ� ��ư ���� ����
					    		var fnCallback_yes = loanRenewal4_001.fnMovePage_4;  // Ȯ�� ��ư�� �Լ� ���� // �ѵ������ȸ ȭ�� �̵�
					    		var fnCallback_no = null;  // �ƴϿ� �̻��

								fnCommon_popup("open", msg, no_button_flag, fnCallback_yes, fnCallback_no);

							}
						}

						// �޼��� �˾�
						if(fail_flag){
				    		var msg = "<p>" + json.RESULT_DESC + "</p>";
							fnCommon_popup("open", msg);
							loanRenewal4_001.fnMovePage_4();
						}
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
					alert("�������� ���� ó���� �����Ͽ����ϴ�.\nȮ�� �� �ٽ� �õ����ּ���.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
					ing.hide();

				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�̾��ϱ� - �ѵ������ȸ ȭ�� �̵�
			loanRenewal4_001.fnMovePage_4
		 -------------------------------------------------------------------------------------- */
		fnMovePage_4 : function(){

				var data_list = [
					             { "key" : "view_name", "value" : "/lo/LOAN2115.jsp" }
					           , { "key" : "title", "value" : "�ѵ���ȸ" }
					           , { "key" : "parent", "value" : "IB" }
					           , { "key" : "topMenu", "value" : "IB_REQ" }
					           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
					];

				// renewal4 ���� url ȣ��
				fnCommon_callUrl( data_list );

		},



		/* --------------------------------------------------------------------------------------
			�Ǹ����� ��û // �⺻������� ���� ���� ����
			loanRenewal4_001.fnSave_realName
		 -------------------------------------------------------------------------------------- */
		fnSave_realName : function( fnCallback, button_id ){

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();
			if(button_id == "tab_button_official") {
				cert_hndNo = $("#cert_hndNo_xecure").val();
			} else if(button_id == "tab_button_credit") {
				cert_hndNo = $("#cert_hndNo_credit").val();
			}

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()));

			iajax.addParam("N01", "0");   // ��ȭ	// ȭ�鿡�� ������ �׸�
			iajax.addParam("N02", "0");   // DM		// ȭ�鿡�� ������ �׸�

			// �������� ���� �����ϱ� ���� �޴�����ȣ ����
			iajax.addParam("HND_NO", cert_hndNo );   // �޴�����ȣ

			// *�Ǹ������� �����׸��� �������� �������� �ʰ� DB �� �׾Ƶд�. ���߿� ������?
			// �������� �Ƚɻ�� ��û
			var agree_chk_6 = $("#agree_chk_6")[0].checked;
			var agree_chk_6_value = 0;
			if( !fnCommon_isNull( agree_chk_6, "boolean") ){
				agree_chk_6_value = 1;
			}
			iajax.addParam("C08", agree_chk_6_value);   // �������� �Ƚɻ�� ��û�� ���� ����

			// ���� �������� ���� ��û
			var agree_chk_7 = $("#agree_chk_7")[0].checked;
			var agree_chk_7_value = 0;
			if( !fnCommon_isNull( agree_chk_7, "boolean") ){
				agree_chk_7_value = 1;
			}
			iajax.addParam("C09", agree_chk_7_value);   // ���� �������� ���� ��û

			// [���յ�2�ʼ�]�ſ�������ȸ����
			var agree_chk_3 = $("#agree_chk_3")[0].checked;
			var agree_chk_3_value = "0";
			if( !fnCommon_isNull( agree_chk_3, "boolean") ){
				agree_chk_3_value = "1";
			}
			iajax.addParam("C10", agree_chk_3_value);  // ���ﺸ������ : ����(�ſ�)������ �������̿롤������ ���� ����

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_NAME,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
			    		//alert("�����Ǿ����ϴ�.");
				    	// �Ǹ����� �� ������ �������� ����(������ or �޴��� or �ſ�ī��)
				    	fnCallback();

			    	}else{
						ing.hide()

				    	var authErrMsg  = "�Ǹ������� �����Ͽ����ϴ�.\n";
				        authErrMsg += "Ȯ�� �� �ٽ� �õ����ּ���.\n";
				        authErrMsg += "���� ������ �Ǹ��� ����� ���\n";
				        authErrMsg += "NICE (02-2122-4000)\n";
				        authErrMsg += "���� ���� �� �̿밡���մϴ�.\n\n";
				        authErrMsg += "�ſ���ȸ ���ܼ��� �̿��\n";
				        authErrMsg += "�������� �� ����ٶ��ϴ�.\n";
				        authErrMsg += "NICE: 02-2122-4000\n";
				        authErrMsg += "KCB: 02-708-1000";

						alert(authErrMsg.split("<br/>").join("\n"));
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
					alert("�Ǹ������� �����Ͽ����ϴ�.\nȮ�� �� �ٽ� �õ����ּ���.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
					// ing.hide();
				}
			});
		},


		/* --------------------------------------------------------------------------------------
			�������� �Ϸ� �� ���� ȭ�� ȣ��
			loanRenewal4_001.fnNext
		 -------------------------------------------------------------------------------------- */
		fnNext : function(){

			// �ѵ���ȸ�̷¿��� Y
			if( !fnCommon_isNull( LIMIT_AMT_SEARCH_YN )  &&  LIMIT_AMT_SEARCH_YN == "Y" ){

				// �޼��� �˾�
	    		var msg = "�ֱ� �����ѵ���ȸ �̷��� �ֽ��ϴ�.\n�ֱ� �ѵ���ȸ����� Ȯ���Ͻðڽ��ϱ�?\n��Ȯ�� �ѵ������� ���� �ſ���ȸ�� �մϴ�.";
	    		var no_button_flag = true;  // �ƴϿ� ��ư ���� ����
	    		var fnCallback_yes = loanRenewal4_001.fnMovePage_1;  // Ȯ�� ��ư�� �Լ� ���� // �ѵ������ȸ ȭ�� �̵�
	    		var fnCallback_no = loanRenewal4_001.fnSave_1;  // �ƴϿ� ��ư�� �Լ� ���� // 3003 ��ȸ�� ó�����а� ���Ǽ���

				fnCommon_popup("open", msg, no_button_flag, fnCallback_yes, fnCallback_no);

			}else{

				// 3003 ��ȸ�� ó�����а� ���Ǽ���
				loanRenewal4_001.fnSave_1();
			}
		},



		/* --------------------------------------------------------------------------------------
			�ѵ������ȸ ȭ�� �̵�
			loanRenewal4_001.fnMovePage_1
		 -------------------------------------------------------------------------------------- */
		fnMovePage_1 : function(){

			// �ѵ���ȸ ȭ���̵�
			loanRenewal4_001.fnMovePage_3();

			/*
			// �����ѵ���ȸ�̷¿��� Y
			if( !fnCommon_isNull( TODAY_LIMIT_AMT_SEARCH_YN )  &&  TODAY_LIMIT_AMT_SEARCH_YN == "Y" ){

				// �ѵ���ȸ ȭ���̵�
				loanRenewal4_001.fnMovePage_3();

			}else{

				// �޼��� �˾�
	    		var msg = "<p>���� �ſ���ȸ������ �����ϴ�.\n��Ȯ�� �ѵ��� ������ ���� �ſ���ȸ�� ����ȸ�մϴ�.</p>";
	    		var no_button_flag = false;  // �ƴϿ� ��ư ���� ����
	    		var fnCallback_yes = loanRenewal4_001.fnMovePage_3;  // Ȯ�� ��ư�� �Լ� ���� // �ѵ���ȸ ȭ���̵�
	    		var fnCallback_no = null;  // �ƴϿ� ��ư�� �Լ� ����

				fnCommon_popup("open", msg, no_button_flag, fnCallback_yes, fnCallback_no);
			}
			*/
		},



		/* --------------------------------------------------------------------------------------
			�������̵�
			loanRenewal4_001.fnMovePage_3
		 -------------------------------------------------------------------------------------- */
		fnMovePage_3 : function(){
			var data_list = [
//				             { "key" : "view_name", "value" : "loanRenewal4_004" }
				             { "key" : "view_name", "value" : "/lo/LOAN2104.jsp" }
				           , { "key" : "title", "value" : "�ѵ���ȸ���" }
				           , { "key" : "parent", "value" : "IB" }
				           , { "key" : "topMenu", "value" : "IB_REQ" }
				           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
				           , { "key" : "beforeview", "value" : "loanRenewal4_001" }  // �ѵ���ȸ ȭ�鿡�� ���� �߻��� �ǵ��ư� ȭ��id
				];

			// renewal4 ���� url ȣ��
			fnCommon_callUrl( data_list );
		},



		/* --------------------------------------------------------------------------------------
			3003 ��ȸ�� ó�����а� ���Ǽ���
			loanRenewal4_001.fnSave_1
		 -------------------------------------------------------------------------------------- */
		fnSave_1 : function(){

			iajax.clearParam();
			//iajax.addParam("CHK_CSRF", random);
			iajax.addParam("PROC_GB_3003", "0");  // 3003 ��ȸ�� ó�����а� ����  // ó������ 0 �ѵ���ȸ��û 1 �Ϲ��ѵ���ȸ 2 �����ѵ���ȸ

			iajax.addParam("qna01", $("#qna01").val());
			iajax.addParam("qna02", $("#qna02").val());
			iajax.addParam("qna03", $("#qna03").val());

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_07,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"){

						// �������̵�
						loanRenewal4_001.fnMovePage_2();

			    	}else{
			    		alert("���Ǽ����� �����Ͽ����ϴ�.");
			    		return;
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
		    		// alert("���Ǽ����� �����Ͽ����ϴ�.");
					fnCommon_SessionExpired();
		    		return;
				},
				complete: function() {
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�������̵�
			loanRenewal4_001.fnMovePage_2
		 -------------------------------------------------------------------------------------- */
		fnMovePage_2 : function(){

			// �ۿ���
			// ����� 5������, ����
			//var isApp_flag = fnCommon_isApp();

			// �ǰ����轺ũ�������� ����  or  �̹� ��ũ���� ����������
			if( (!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")
				||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y") ){

				// �����û�ѵ���ȸ ȭ�� ȣ��
				var data_list = [
					             { "key" : "view_name", "value" : "/lo/LOAN2104.jsp" }
					           , { "key" : "title", "value" : "�ѵ���ȸ���" }
					           , { "key" : "parent", "value" : "IB" }
					           , { "key" : "topMenu", "value" : "IB_REQ" }
					           , { "key" : "leftMenu", "value" : strLeftMenu }
					           , { "key" : "beforeview", "value" : "/lo/LOAN2101.jsp" }  // �ѵ���ȸ ȭ�鿡�� ���� �߻��� �ǵ��ư� ȭ��id
					];

				// renewal4 ���� url ȣ��
				fnCommon_callUrl( data_list );

			}else{

				// �������� �����Է� ȭ��
				var view_name = "/lo/LOAN2103.jsp";
				var title = "���������Է�";

				// ���̰� �������� �������� ������ ��ũ���� ȭ�� �̵�
				// ����� 5������, isApp_flag ����

					if( !fnCommon_isNull(isXecureAuth)  &&  (isXecureAuth == "Y"  ||  isXecureAuth == "true") ){

					// ������ ������ ������ ���
					// ����� 5������ - ���� ������ ����ȭ�鿡�� ó���Ǵ� ����� input type="hidden"���� ����
					// var qna01_obj = $("input[type='radio'][name='qna01']:checked");
					var qna01_obj = $("#qna01");
					if( !fnCommon_isNull(qna01_obj)  &&  !fnCommon_isNull(qna01_obj.length)  &&  qna01_obj.length > 0 ){
						var qna01 = qna01_obj.val(); // ����� 5������ - ���� ������ ����ȭ�鿡�� ó���Ǵ� ����� input type="hidden"���� ����

						// --------------------- ������(4�뺸�� ���� �ʼ�)
						if(qna01 == "1"){

							// �Ǻ���ũ������ֿ���
							if( fnCommon_isNull(SCRP_NHIS_ERROR_YN)  ||  SCRP_NHIS_ERROR_YN == "N" ){

								// �¶��μ�������(��ũ����) - �ѵ���ȸ ȭ�� ȣ��
								view_name = "/lo/LOAN2102.jsp";
								title = "���������Է�";
							}
						}
					}
				}


				//alert("������������ ���� ����");
				//YOUTH_GUIDE_YN = "N";
				//youth_age_yn = "Y";

				// ������������ ���� �������� ����
				if( fnCommon_isNull(YOUTH_GUIDE_YN)  ||  YOUTH_GUIDE_YN != "Y" ){

					// û���̸�
					if( !fnCommon_isNull(youth_age_yn)  &&  youth_age_yn == "Y" ){

						// ������������ �ȳ� ȭ�� ȣ��
						view_name = "/lo/LOAN2106.jsp";
						title = "���������Է�";
					}
				}

				var data_list = [
			             { "key" : "view_name", "value" : view_name }
			           , { "key" : "title", "value" : title }
			           , { "key" : "parent", "value" : "IB" }
			           , { "key" : "topMenu", "value" : "IB_REQ" }
			           , { "key" : "leftMenu", "value" : strLeftMenu }
					];

				// renewal4 ���� url ȣ��
				fnCommon_callUrl( data_list );
			}
		},



		/* --------------------------------------------------------------------------------------
			�����û������ȸ
			loanRenewal4_001.fnSearch_2
		 -------------------------------------------------------------------------------------- */
		fnSearch_2 : function(){

			iajax.clearParam();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_3103,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){

		    			// �ŷ� ��� ���� ����
		    			all_tran_success_yn = true;

				    	// app �� �ö�Դٰ� �ڷΰ��� ���۽� �ϴ��� web ���̾ ����Ǿ� �ٽ� ������ �ϴ� ���� ����
				    	$("#slid_3_div").hide();  // �������� ���� �����

		    			// ȭ���̵� // ������������ �ȳ� or �¶��μ�������(��ũ����)
		    			loanRenewal4_001.fnNext();

			    	} else {
			    		alert("�����û���� ��ȸ�� �����Ͽ����ϴ�.\nȮ�� �� �ٽ� �õ����ּ���.");
			    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
					alert("�����û���� ��ȸ�� �����Ͽ����ϴ�.\nȮ�� �� �ٽ� �õ����ּ���.");
		    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
				},
				complete: function() {
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�޴��� ������ȣ ��û
			loanRenewal4_001.fnCert_phone_request
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_request : function(){

    		// ���������ϷῩ��
    		isAuthed = false;

			// �ʱ�ȭ
			$("#cert_phone_timer_dl").hide();		// ������ȣ �Է� ����
			$("#aut_auth_no").hide();	 // ������ȣ
			$("#aut_auth_no").val("");

			// �޴������� ��ȿ��üũ
			var result = fnCommon_Cert_phone_valid();
			if(!result){
				return false;
			}

			iajax.clearParam();

			// ��Ż�
			var telecom = $("#telecom").val();
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );  // ����
			iajax.addParam("COM_KIND", telecom );

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( !fnCommon_isNull(cert_hndNo)  &&  !fnCommon_isNull(cert_hndNo.length)  &&  cert_hndNo.length >= 10 ){
				iajax.addParam("HND_NO", cert_hndNo);
			}

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_SMS,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000"){

			    		// �����ð� timer ����
						$("#cert_phone_timer_dl").show();
						$("#aut_auth_no").show();

			    		// ������û ��ư
			    		$("#certif01_btn_1").html("���û");
			    		$("#certif01_btn_1").removeClass("on");

			    		// Ÿ�̸� ����
			    		loanRenewal4_001.fn_stopTimer();
			    		loanRenewal4_001.fn_startTimer();

			    	}else{
			    		alert("������ȣ �߼ۿ� �����Ͽ����ϴ�. �ٽ� �õ����ּ���.");
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error) {
					ing.hide();
					alert("�Ǹ������� �����Ͽ����ϴ�.\nȮ�� �� �ٽ� �õ����ּ���.");
				},
				complete: function() {
					ing.hide();
				}
			});
		},


		/* --------------------------------------------------------------------------------------
			�޴��� ������û Ÿ�̸� ����
			loanRenewal4_001.fn_startTimer
		 -------------------------------------------------------------------------------------- */
		fn_startTimer : function(){
			seconds = 180;
			countDownTimer = setInterval("loanRenewal4_001.fn_secoundPassed()", 1000);
		},

		/* --------------------------------------------------------------------------------------
			�޴��� ������û Ÿ�̸� ����
			loanRenewal4_001.fn_stopTimer
		 -------------------------------------------------------------------------------------- */
		fn_stopTimer : function(){
			clearInterval(countDownTimer);
		},

		/* --------------------------------------------------------------------------------------
			�޴��� ������û Ÿ�̸�
			loanRenewal4_001.fn_secoundPassed
		 -------------------------------------------------------------------------------------- */
		fn_secoundPassed : function(){
			var minutes = Math.round((seconds - 30) / 60);
			var remainingSeconds = seconds % 60;

			if(remainingSeconds < 10) {
				remainingSeconds = "0" + remainingSeconds;
			}

			// $("#verify_time").html("���� �޴������� ������ȣ�� ���۵Ǿ����ϴ�.<br>SMS �����ð� [ " + minutes + " : " + remainingSeconds + " ]");
			$("#cert_phone_timer").html("[" + minutes + " : " + remainingSeconds + "]");

			if( fnCommon_isNull(seconds) ){
				alert("�޴��� ������ �����Ͽ����ϴ�.\n�����ð��� �ʰ��� ���\n������ȣ ���û �� �Է����ּ���.");
				loanRenewal4_001.fn_stopTimer();
			}else{
				seconds--;
			}
		},



		/* --------------------------------------------------------------------------------------
			������� Ȯ�� ��ư Ŭ�� �˾�  // �Ʒ����� ���� ���̾��˾�
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
			�Ʒ����� ���� ���̾��˾� �ݱ�
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
			������ȣ �Է� �� Ȯ�ι�ư Ŭ�� �̺�Ʈ ���� // ���̾��˾�
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
	        loanRenewal4_001.fn_closePop(link);  // ���̾��˾� �ݱ�
	        return false;
		},



		/* --------------------------------------------------------------------------------------
			// ���̾��˾� ����
			loanRenewal4_001.fn_openPop
		 -------------------------------------------------------------------------------------- */
		fn_openPop : function( popup_id, cust_no, cust_nm ){

	        // �����û ������ ����. ����Ұ��ȳ�
			if( !fnCommon_isNull(popup_id)  &&  popup_id == "popup_sorry" ){

				// app
				if(isApp){
		    		var result = confirm("�Է��Ͻ� �������� �����û ������ �����Ͽ� ������ �Ұ����մϴ�.\n��û����� ���÷��� 'Ȯ��'�� ����, �ڼ��� ������ �������� ���� �������ּ���.");
		    		if(result){
	    				var params = {
	    						pluginId: "webPostBridge",
	    						method: "onExecute",
	    						params: {
	    							"url": "/loanRequestResult",
	    							"data": {
	    								"title": "����������ȸ",
	    								"CUST_NO": cust_no,
	    							    "CUST_NM": fnCommon_deleteNull(cust_nm)
	    							}
	    					    },
	    						callBack : function(isOK, json){
	    						}
	    					};
	    				SDSFrameWork.plugin.execute(params);
		    		}else{
		    			// ����ȭ�� �̵�
		    			fnCommon_goHome();
		    		}

	    		// web
				}else{
					// ������� // �� �ٿ�ε� ����
					// appInvoke();

			        $("#" + popup_id).show();

			        // ���̾��˾� �ݱ� �̺�Ʈ ����
			        $("#" + popup_id + "_close").click(function(){
				        $("#" + popup_id).hide();
				    });
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			���̾��˾� �ݱ�
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
			������ �����̵� �̵�
			loanRenewal4_001.fnMove_slide
		 -------------------------------------------------------------------------------------- */
		fnMove_slide : function( num ){
			if( !fnCommon_isNull(num) ){

				// �������
				if(num == 2){

					// ����üũ����Ʈ �ݱ�
					$("#slid_1_li").removeClass("active");
					$("#slid_1_div").hide();

					// ������� ����
					$("#slid_2_li").removeClass("checkToggle");  // ��Ȱ����� ���ֱ�
					$("#slid_2_li").addClass("active");
					$("#slid_2_div").show();

				// ��������
				}else if(num == 3){

					// ������� �ݱ�
					$("#slid_0_li").removeClass("open");
					$("#slid_0_div").hide();

					// �������� ����
					//$("#slid_3_li").removeClass("checkToggle");  // ��Ȱ����� ���ֱ�
					$("#slid_3_li").addClass("open");
					$("#slid_3_div").show();

					// �������� �� �޴� Ŭ�� �̺�Ʈ // �ڵ��� Ŭ��ȿ���� ����
					loanRenewal4_001.fnEvent_TabClick( {target:{id:"tab_button_mobile",className:""}} );
				}

				// ��ũ�� �̵�
		         $('body,html').animate({scrollTop: 0}, 100);
			}
		},



		/* --------------------------------------------------------------------------------------
			�����̵� �� Ŭ�� �̺�Ʈ
			loanRenewal4_001.fnEvent_Slide
		 -------------------------------------------------------------------------------------- */
		fnEvent_Slide : function(e){
		    var toggle_button = $(this);
		    var toggle_li = toggle_button.parent('li');

		    // ��Ȱ�� �����̵� �ٴ� Ŭ���ص� �����ʱ�, ���� �Է� ������ ��� �Է��� �Ŀ� �����ֱ�
		    var className = toggle_li.attr("class");
			if( !fnCommon_isNull(className)  &&  className.indexOf("checkToggle") > -1 ){
				return;
			}

		    // �ٸ� �����̵� ����
		    toggle_li.siblings().eq(0).removeClass('active').children('.toggleCont').hide();
		    // toggle_li.siblings().eq(0).removeClass('active').children('.toggleCont').hide();

		    // Ŭ����� ����
		    var toggle_li_id = toggle_li[0].id;
			if( !fnCommon_isNull(toggle_li_id) ){

				// ����üũ����Ʈ
				if( toggle_li_id.indexOf("1") > -1 ){
					if(!$("#slid_2_li").hasClass("checkToggle")){
						$("#slid_2_li").addClass("checkToggle")
					}
					if(!$("#slid_3_li").hasClass("checkToggle")){
						$("#slid_3_li").addClass("checkToggle")
					}

				// �������
				}else if( toggle_li_id.indexOf("2") > -1 ){
					if(!$("#slid_3_li").hasClass("checkToggle")){
						$("#slid_3_li").addClass("checkToggle")
					}
				}
			}

		    /*
		    $('.certifMenu').show();	// �������� ��
		    $('.certifCont').hide();  // �������� �Է¶�
		    */

		    // Ŭ����� �����̵尡 ��Ȱ���̸� Ȱ������
		    if( toggle_li.hasClass('active') == false){
		    	toggle_li.removeClass('checkToggle');  // Ȱ������
		        toggle_li.addClass('active').children('.toggleCont').show();   // �ϴܺ� ����
		        toggle_li.siblings().removeClass('active').children('.toggleCont').hide();
		        $('body,html').animate({scrollTop: toggle_button.offset().top},500);   // ��ũ�� �̵�

	        // Ȱ���̸� ��Ȱ������
		    }else{
		        toggle_li.removeClass('active').children('.toggleCont').hide();
		    }

		},



		/* --------------------------------------------------------------------------------------
			����üũ����Ʈ Ȯ�� ��ư Ŭ��
			loanRenewal4_001.fnConfirm_checklist
		 -------------------------------------------------------------------------------------- */
		fnConfirm_checklist : function(){

			// ����
			var qna01 = $("input[type='radio'][name='qna01']:checked");
			if( fnCommon_isNull(qna01)  ||  fnCommon_isNull(qna01.length)  &&  qna01.length < 1 ){
				alert("������ �������ֽñ� �ٶ��ϴ�.");
				return false;
			}


			var qna01_checked = qna01[0];
			var qna01_checked_value = qna01_checked.value;



			if( fnCommon_isNull(qna01_checked_value) ){
				alert("������ �������ֽñ� �ٶ��ϴ�.");
				return false;
			}

			// --------------------- ������(4�뺸�� ���� �ʼ�)
			if(qna01_checked_value == "1"){

				// �������
				var qna02 = $("input[type='radio'][name='qna02']:checked");
				if( fnCommon_isNull(qna02)  ||  fnCommon_isNull(qna02.length)  &&  qna02.length < 1 ){
					alert("������¸� �������ֽñ� �ٶ��ϴ�.");
					return false;
				}

				// ���ü�������
				var qna03 = $("input[type='radio'][name='qna03']:checked");
				if( fnCommon_isNull(qna03)  ||  fnCommon_isNull(qna03.length)  &&  qna03.length < 1 ){
					alert("���ü������θ� �������ֽñ� �ٶ��ϴ�.");
					return false;
				}

				var qna02_checked = qna02[0];
				var qna02_checked_value = qna02_checked.value;

				var qna03_checked = qna03[0];
				var qna03_checked_value = qna03_checked.value;


				// ������� �����̵� �̵�
				//loanRenewal4_001.fnMove_slide(2);
				loanRenewal4_005.fnNext_1();

			// --------------------- ������ �ƴϸ�
			}else{

				// ������� �����̵� �̵�
				//loanRenewal4_001.fnMove_slide(2);
				loanRenewal4_005.fnNext_1();
			}
		},



		/* --------------------------------------------------------------------------------------
			���� ����
			loanRenewal4_001.fnRadio_select
		 -------------------------------------------------------------------------------------- */
		fnRadio_select : function( name, val ){
			if( !fnCommon_isNull(name) ){			
				var sunshine_show_flag = false;	// �޻�� ���� ���⿩��
				var saitdol_show_flag = true;	// DHKANG[������500] ���յ�2 ���� ���⿩��
				var next_step_flag = false;	// �������� ��ȯ ����


				// ����
				var qna01 = $("input[type='radio'][name='qna01']:checked");
				if( !fnCommon_isNull(qna01)  &&  !fnCommon_isNull(qna01.length)  &&  qna01.length > 0 ){
					var qna01_checked = qna01[0];
					var qna01_checked_value = qna01_checked.value;


					// --------------------- ������(4�뺸�� ���� �ʼ�)
					if( !fnCommon_isNull(qna01_checked_value)  &&  qna01_checked_value == "1" ){

						// �������/���ü������� ����
						$("#qna02_p").show();
						$("#qna02_ul").show();
						$("#qna03_p").show();
						$("#qna03_ul").show();

						// �������� �޻�� �ʼ��׸� ����
						sunshine_show_flag = true;


						// �������
						var qna02 = $("input[type='radio'][name='qna02']:checked");
						var qna02_checked_flag = false;  // ���ÿ���
						if( !fnCommon_isNull(qna02)  &&  !fnCommon_isNull(qna02.length)  &&  qna02.length > 0 ){
							var qna02_checked = qna02[0];
							var qna02_checked_value = qna02_checked.value;
							qna02_checked_flag = true;

							/*
							// ������� : �ٷμҵ�̽Ű���, �Ͽ�ٷ���  -->  �¶����޻��(52351) ��ǰ ���� �� � ��ũ���� ����
							if( !fnCommon_isNull(qna02_checked_value)  &&  (qna02_checked_value == "3"  ||  qna02_checked_value == "4") ){

								// �������� �޻�� �����
								sunshine_show_flag = false;
							}
							*/
						}

						// ���ü�������
						var qna03 = $("input[type='radio'][name='qna03']:checked");
						var qna03_checked_flag = false;  // ���ÿ���
						if( !fnCommon_isNull(qna03)  &&  !fnCommon_isNull(qna03.length)  &&  qna03.length > 0 ){
							var qna03_checked = qna03[0];
							var qna03_checked_value = qna03_checked.value;
							qna03_checked_flag = true;

							/*
							// ���θ��� ���� ���� : ��  -->  �¶����޻��(52351) ��ǰ ���� �� � ��ũ���� ����
							if( !fnCommon_isNull(qna03_checked_value)  &&  qna03_checked_value == "1" ){

								// �������� �޻�� �����
								sunshine_show_flag = false;
							}
							*/
						}

						// ������ �ͼ� ���׵� ��� ���õǾ����� ������������ �̵�
						if(qna02_checked_flag  &&  qna03_checked_flag){
							next_step_flag = true;
						}


					// --------------------- ������ �ƴϸ�
					}else{

						// �������/���ü������� �����
						$("#qna02_p").hide();
						$("#qna02_ul").hide();
						$("#qna03_p").hide();
						$("#qna03_ul").hide();

						// �������� �޻�� �����
						sunshine_show_flag = false;
						
						// DHKANG[������500] �ֺ�(5), ����(6) ó��
						if( !fnCommon_isNull(qna01_checked_value)  &&  (qna01_checked_value == "8" || qna01_checked_value == "9")){
							saitdol_show_flag = false;
						}

						// �������� �̵�
						next_step_flag = true;

						// �������/���ü��� �ʱ�ȭ // ���õ� �׸� ����ȿ��
						$("input[type='radio'][name='qna02']").prop("checked", false);
						$("input[type='radio'][name='qna03']").prop("checked", false);
					}
				}


				// �޻�� ���� ���⿩��
				if(sunshine_show_flag){
					$("#agree_4_li").show();
					$("#agree_5_li").show();
				}else{
					$("#agree_4_li").hide();
					$("#agree_5_li").hide();

					// üũ���� // ���� �������� �ʵ���
					$("#agree_chk_4").prop("checked", false);
					$("#agree_chk_4_1").prop("checked", false);
					$("#agree_chk_5").prop("checked", false);
					$("#agree_chk_5_1").prop("checked", false);
				}
				
				// DHKANG[������500] �����̸� ������ �ɵ�, ���յ�2 ���� ���� ���� (�ֺ�, ���� ����)
				if(!saitdol_show_flag) {
					$("#agree_3_li").hide();

					// üũ����
					$("#agree_chk_3").prop("checked", false);
					$("#agree_chk_3_1").prop("checked", false);
				}
				

				// �������� �̵� ����
				if(next_step_flag){

					// �ʹ� ���� �̵��Ѵ� �Ͽ� Ȯ�ι�ư���� ��ü
					// ������� �����̵� �̵�
					// loanRenewal4_001.fnMove_slide(2);
				}
			}
		},

		/* --------------------------------------------------------------------------------------
			�޴��� ���� ����
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
			�ſ�ī�� ���� ����
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

		},

		/* --------------------------------------------------------------------------------------
			�޴�����ȣ ���� �̺�Ʈ
			loanRenewal4_014.fnKeyup_hndNo
		 -------------------------------------------------------------------------------------- */
		fnKeyup_hndNo_target : function(e){

			// ���������ϷῩ��
			isAuthed = false;

			var value = e.target.value;

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			value = fnCommon_getOnlyNumber(value);

			// �ʵ忡 �缳���� ��
			var value_format = value;

			if( !fnCommon_isNull(value)  &&  value.length > 0 ){
				if(value.length > 3){

					// ���ڸ� �߶󳻱�
					value_format = value.substring(0, 3);
					value = value.substring(3, value.length);

					// ������ ���ڸ� �̻��̸�
					if(value.length > 3){

						// �߰��ڸ� �߶󳻱�
						value_format += "-" + value.substring(0, 3);
						value = value.substring(3, value.length);

						// ������ ���ڸ� �̻��̸� �߰��ڸ��� ���ڸ� �� �ѱ��
						if(value.length > 4){
							value_format += value.substring(0, 1);
							value = value.substring(1, value.length);
						}
					}

					// ���� ���ڸ��� ������ �̰͵� ���̱�
					if( !fnCommon_isNull(value) ){
						value_format += "-" + value;
					}
				}
			}

			// ��� �޴�����ȣ �ʵ忡 ����
			// $("input[type='tel'][name='cert_hndNo']").val(value_format);
			$("#" + e.target.id).val(value_format);
		}


	};   // var loanRenewal4_001 = {






	/* --------------------------------------------------------------------------------------
		�¶��μ�������(��ũ����) ȭ�� - �ѵ���ȸ
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_002 = {

		/* --------------------------------------------------------------------------------------
			�⺻����
			loanRenewal4_002.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// ���� �ʼ�üũ
			// ����� 5������
			// ���� üũ�� include file="/cm/session.jsp"�� ó��
			// fnCommon_checkSession();

			// ������, �������� ������ ����
			loanRenewal4_002.fnSearch_1();
		},



		/* --------------------------------------------------------------------------------------
			������, �������� ������
			loanRenewal4_002.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function(){

			iajax.clearParam();
			iajax.addParam("BANK_INSP_NO", bank_Insp_No);
		
			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_002_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"){
			    		custNm = fnCommon_deleteNull(json.custNm);
			    		$("#customerName1").val(custNm);

			    		SUNSHINELOAN_YN = json.SUNSHINELOAN_YN;
			    		isPersonInfoReq = json.isPersonInfoReq;
			    		isShinhanFan = json.isShinhanFan;
			    		isXecureAuth = json.isXecureAuth;
			    		SCRAP_CERT_PASS_YN = json.SCRAP_CERT_PASS_YN;
			    		qna01 = json.qna01;
			    		qna02 = json.qna02;
			    		qna03 = json.qna03;

			    		SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;	// �Ǻ���ũ������ֿ���
			    		SCRP_NHIS_ERROR_MSG = json.SCRP_NHIS_ERROR_MSG;		// �Ǻ���ũ������ָ޼���
			    		loanRenewal4_014_START_YN = json.loanRenewal4_014_START_YN;		// �¶��μ������� �޴��� ���ٿ���

			    		REG_KIND = json.REG_KIND;		// ���ڼ������(�ڼ�����ó ����)
			    		ST_CD = json.ST_CD;		// �������
						
						ONLINE_DOC_C = json.ONLINE_DOC_C;
						ONLINE_DOC_F = json.ONLINE_DOC_F;
						ONLINE_DOC_G = json.ONLINE_DOC_G;
						ONLINE_DOC_H = json.ONLINE_DOC_H;

			    		// �¶��μ������� �޴��� ������ ���̽� �ƴϸ� ���ܹ� ����
				    	if( fnCommon_isNull(loanRenewal4_014_START_YN)  ||  loanRenewal4_014_START_YN != "Y"){
				    		$(".personal_data_bar").show();
				    	}

			    		// �Ǻ� ��������� �ȳ� �޼��� �߻�
				    	if( !fnCommon_isNull(SCRP_NHIS_ERROR_YN)  &&  (SCRP_NHIS_ERROR_YN == "Y"  ||  SCRP_NHIS_ERROR_YN == "1") ){
					    	if( fnCommon_isNull(SCRP_NHIS_ERROR_MSG) ){
					    		SCRP_NHIS_ERROR_MSG = "�ǰ�������� ��ũ������ �����߽��ϴ�.";
					    	}

							// �޼��� �˾�
				    		var msg = "<p>" + SCRP_NHIS_ERROR_MSG + "</p>";
				    		var no_button_flag = false;  // �ƴϿ� ��ư ���� ����
				    		var fnCallback_yes = fnCommon_goHome;  // Ȯ�� ��ư�� �Լ� ���� // �������� �̵�
				    		var fnCallback_no = null;  // �ƴϿ� �̻��

							fnCommon_popup("open", msg, no_button_flag, fnCallback_yes, fnCallback_no);
				    	}

						// ���� 115�� �����Է¹�ư ����
						if( "115" == REG_KIND || "108" == REG_KIND ){
							$("#btn_direct_view").hide();
							$("#btn_direct_info_view").hide();
							fnIs115();
						}
					}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
					// alert(error);
					fnCommon_SessionExpired();
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
					ing.hide();
		        }
			});

		},



		/* --------------------------------------------------------------------------------------
			�¶��μ������� ���� �̿��û ��Ī Ŭ���� �˾� ȣ��
			loanRenewal4_002.fnShowPopup
		 -------------------------------------------------------------------------------------- */
		fnShowPopup : function(e){

			// [�ʼ�]����(�ſ�)���������̿��������Ǽ�(�¶��μ�������)
			showDialog(popupURL, 420);
		},



		/* --------------------------------------------------------------------------------------
			Ȯ���� üũ�ڽ� Ŭ���� �̺�Ʈ
			loanRenewal4_002.fnClickAgree
		 -------------------------------------------------------------------------------------- */
		fnClickAgree : function(e){
			var next_yn_flag = false;

			// üũ�ڽ� ���ǽ� Ȯ�ι�ư ����
			var agree_1 = $("#agree_1");
			if( !fnCommon_isNull(agree_1)  &&  !fnCommon_isNull(agree_1.length)  &&  agree_1.length > 0 ){
				var checked = agree_1[0].checked;
				if( checked ){
					next_yn_flag = true;
				}
			}

			if(next_yn_flag){
				//$("#btn_next").show();
				//$("#btn_next").focus();
		        //$('body,html').animate({scrollTop: $("#btn_next").offset().top},500);   // ��ũ�� �̵�
			}else{
				// $("#btn_next")[0].style.display = "none";
				//$("#btn_next").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			��ũ���� ��û
			loanRenewal4_002.fnScraping_1
		 -------------------------------------------------------------------------------------- */
		fnScraping_1 : function(){

			CooconiSASNX.init( function (b){
				ing.hide();
				//���డ�ɿ���
				if(!b){
					//��ġ������ �̵�
					alert('��ũ���� ���α׷� ��ġ �� �̿��Ͻñ� �ٶ��ϴ�.');
					location.href = "../coocon/file/NXiSAS.exe";
					return false;
				}else{

					// ����� ���� 5��
					// �ѵ���ȸ�� �ǰ������ ���ο����� ��ũ������ ����
					isScrapping_NHIS = true;

					// 20200421 NPS ���
					isScrapping_NPS = true;
					
					if( "Y" == nhis_only ){
						isScrapping_NHIS = true;
						isScrapping_NPS = false;
					}
					
					// 20201029 115���¿��� �Ǵ�
					// ONLINE_DOC_G �Ǻ�
					// ONLINE_DOC_H ���ο���
					if( "115" == REG_KIND ){
						
						
						if( "0" == ONLINE_DOC_G ){	// �ǰ�����
							isScrapping_NHIS = false;
						}
						
						// DHKANG[������500] ��ũ���� ����
						if( "0" == ONLINE_DOC_H || JOB_MAJOR_CD == "4") {	// DHKANG ���ο��� (��������(4: ��Ÿ�ҵ�)�� ��� ����)
							isScrapping_NPS = false;
						}
						
					}

				    if ($("#customerName1").val().trim() ==""){
				        alert("���� �Է��Ͽ� �ֽʽÿ�.");
				        $("#customerName1").focus();
				        return false;
				    }

				    if(!$("#agree_1").parent().hasClass("checked") ){
						alert("�¶��μ������� ���� �̿� ��û�� ������ �ּ���.");
						return false;
					}


					// ���� 12���̸�
					if( !fnCommon_isNull(this_month)  &&  this_month == "13" ){

						// 1�⾿ �Ⱓ �մ���ְ�
						START_DATE1 = startDate2;
						END_DATE1 = endDate2;
						START_DATE2 = startDate3;
						END_DATE2 = endDate3;

						// 3��° �Ⱓ(����⵵��������)�� 000000 ~ 000000 ���� ����
						START_DATE3 = "000000";
						END_DATE3 = "000000";

					}else{

						// 12�� �ƴϸ� �⺻����
						START_DATE1 = startDate1;
						END_DATE1 = endDate1;
						START_DATE2 = startDate2;
						END_DATE2 = endDate2;
						START_DATE3 = startDate3;
						END_DATE3 = endDate3;
					}

					$.ajax({
					    type: "post",
					    url: callURL_noopForMobileWeb,   // ���� Ÿ�� �߰�
					    dataType: "json",
					    success: function(json){
					    	if(json.RESULT_NO == "0000"){
					    		fnCommon_OpenCert(START_DATE1, END_DATE1, START_DATE2, END_DATE2, START_DATE3, END_DATE3, isScrapping_NHIS, isScrapping_NPS);

					    	}else{
					    		fnCommon_LoadingLayer(false);
					    		alert("��ð� ���� �̿��� �����ʾ� ������ ���������� ��ȣ�ϱ� ���Ͽ� �ڵ����� ���������� ��ҵǾ����ϴ�.\nȮ���� �����ø� ����ȭ������ �̵��մϴ�.");
				    			fnCommon_goHome();
					    	}
					    },
						error: function(data, textStatus, error) {
							fnCommon_LoadingLayer(false);
							fnCommon_SessionExpired();
						},
						complete: function() {
							fnCommon_LoadingLayer(false);
				        }
					});
				}
			});




		},



		/* --------------------------------------------------------------------------------------
			��ũ���� ��û��� ��ȸ
			loanRenewal4_002.fnScraping_2_NEW
		 -------------------------------------------------------------------------------------- */
		fnScraping_2_NEW : function(res_NPS, res_NHIS, message){
		
			var send_NHIS = "E";
			if(res_NHIS && isScrapping_NHIS){
				send_NHIS = "Y";
			}else if(!isScrapping_NHIS){
				send_NHIS = "N";
			}
			
			var send_NPS = "E";
			if(res_NPS && isScrapping_NPS){
				send_NPS = "Y";
			}else if(!isScrapping_NPS){
				send_NPS = "N";
			}			
			
			loanRenewal4_002.fnScraping_3_NEW(send_NHIS,send_NPS, message);
			
			/*
			if( res_NHIS && res_NPS ){
				loanRenewal4_002.fnScraping_3_NEW("Y","Y", message);
			}else if(res_NHIS){
				loanRenewal4_002.fnScraping_3_NEW("Y","E", message);
				//loanRenewal4_002.fnScraping_3(true, "Y");
				//loanRenewal4_002.fnScraping_reSearch_NPS(message);
			}else if(res_NPS){
				loanRenewal4_002.fnScraping_3_NEW("E","Y", message);
				//loanRenewal4_002.fnScraping_3_NPS(true, "Y");
				//loanRenewal4_002.fnScraping_reSearch(message);
			}else{
				loanRenewal4_002.fnScraping_3_NEW("E","E", message);
			}
			*/			

		},



		/* --------------------------------------------------------------------------------------
			��ũ���� ��û��� ��ȸ
			loanRenewal4_002.fnScraping_2
		 -------------------------------------------------------------------------------------- */
		fnScraping_2 : function(res, message){

			console.log("**********************************************res=" + res);
			console.log("**********************************************message=" + message);
			// Y ���༺�� N �̽��� E ���������� ����
			// �ǰ����� ��ũ���� ����
			var SCRP_NHIS = "Y";

			// callback ���� ����� ��ũ���� ��û ��� �������� �����
			var res_result_flag = false;

			/*
			if( !fnCommon_isNull(res)  &&  !fnCommon_isNull(res.result)  &&  res.result == "true" ){
				res_result_flag = true;
				loanRenewal4_002.fnScraping_3(res_result_flag, SCRP_NHIS);

			}else{

				// �����޼��� üũ�ؼ� ������ ����
				var message = res.message;
				if( !fnCommon_isNull(message)  &&  message.indexOf("���ΰǰ��������") > -1 ){

    				// 2�� �� �ٽ� ��ũ���� ���� ��ȸ
    				setTimeout(function(){
    					loanRenewal4_002.fnScraping_reSearch(res.message);
    				} , 2000);

				}
			}*/
			if(res){
				res_result_flag = true;
				loanRenewal4_002.fnScraping_3(res_result_flag, SCRP_NHIS);

			}else{

				// �����޼��� üũ�ؼ� ������ ����
				//var message = res.message;
				//if( !fnCommon_isNull(message)  &&  message.indexOf("���ΰǰ��������") > -1 ){
				// ����� 5�� ����
				// ���ο����� ��쿡�� �����޽����� ���޵Ǵ� ����� ���ΰǰ���������� ����
				if( !fnCommon_isNull(message)){

    				// 2�� �� �ٽ� ��ũ���� ���� ��ȸ
    				setTimeout(function(){
    					//ing.hide();
    					//alert(message);
    					loanRenewal4_002.fnScraping_reSearch(message);
    				} , 2000);

				}
			}

		},


		/* --------------------------------------------------------------------------------------
			��ũ���� ��û��� ��ȸ
			loanRenewal4_002.fnScraping_2_NPS
		 -------------------------------------------------------------------------------------- */
		fnScraping_2_NPS : function(res, message){
			// Y ���༺�� N �̽��� E ���������� ����
			// �ǰ����� ��ũ���� ����
			var SCRP_NPS = "Y";

			// callback ���� ����� ��ũ���� ��û ��� �������� �����
			var res_result_flag = false;

			/*
			if( !fnCommon_isNull(res)  &&  !fnCommon_isNull(res.result)  &&  res.result == "true" ){
				res_result_flag = true;
				loanRenewal4_002.fnScraping_3(res_result_flag, SCRP_NHIS);

			}else{

				// �����޼��� üũ�ؼ� ������ ����
				var message = res.message;
				if( !fnCommon_isNull(message)  &&  message.indexOf("���ΰǰ��������") > -1 ){

					// 2�� �� �ٽ� ��ũ���� ���� ��ȸ
					setTimeout(function(){
						loanRenewal4_002.fnScraping_reSearch(res.message);
					} , 2000);

				}
			}*/
			if(res){
				res_result_flag = true;
				loanRenewal4_002.fnScraping_3_NPS(res_result_flag, SCRP_NPS);

			}else{

				// �����޼��� üũ�ؼ� ������ ����
				//var message = res.message;
				//if( !fnCommon_isNull(message)  &&  message.indexOf("���ΰǰ��������") > -1 ){
				// ����� 5�� ����
				// ���ο����� ��쿡�� �����޽����� ���޵Ǵ� ����� ���ΰǰ���������� ����
				// 20191219 - �׳� ����
				message = "ERROR NPS";
				if( !fnCommon_isNull(message)){

					// 2�� �� �ٽ� ��ũ���� ���� ��ȸ
					//setTimeout(function(){
						//ing.hide();
						//alert(message);
						loanRenewal4_002.fnScraping_reSearch_NPS(message);
					//} , 2000);

				}
			}

		},

		/* --------------------------------------------------------------------------------------
			��ũ���� ��û��� ��ȸ
			loanRenewal4_002.fnScraping_3_NEW
		 -------------------------------------------------------------------------------------- */
		fnScraping_3_NEW : function(SCRP_NHIS, SCRP_NPS, message){
			iajax.clearParam();
			iajax.addParam("PROC_GB", "1");   // 1 �ѵ���ȸ��ũ���� 2 �¶��μ������⽺ũ����
			iajax.addParam("SEND_MSG", "Y");
			iajax.addParam("SCRP_NHIS", SCRP_NHIS);
			iajax.addParam("SCRP_NPS", SCRP_NPS);
			iajax.addParam("BANK_INSP_NO", bank_Insp_No);
			
			// �մܿ��� fnScraping_reSearch�ϴ� ��Ȱ�� �ϱ⿡ ����
			//loanRenewal4_002.fnScraping_reSearch(message)
			
			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3002_NEW,  // �ѵ���ȸ��ũ����
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	ing.hide();
			    	if(json.RESULT_NO == "0000") {

						// NHIS ���� ������ ���
						if( "Y" == SCRP_NHIS ){
							// �ҵ��Է¿���
							var yyIncmAmtYn = json.DATA.YY_INCM_AMT_YN;
							if( !fnCommon_isNull(yyIncmAmtYn)  &&  yyIncmAmtYn == "Y"){

								// �¶��μ������� �޴��� ���ٿ���
								if( !fnCommon_isNull(loanRenewal4_014_START_YN)  &&  loanRenewal4_014_START_YN == "Y"){
									fnCommon_LoadingLayer(false);
									alert("�¶��μ�������� ����Ȯ���� �Ұ��մϴ�.");
									//fnCommon_goBack();

								}else{
									fnCommon_LoadingLayer(false);
									var confirm_result = confirm("�¶��� ���� ������ �Ϸ�Ǿ�����, �ڵ����� �ҵ������ ���� �ʽ��ϴ�. �ҵ������� ���� �Է��Ͻðڽ��ϱ�?");
									if(!confirm_result){
										return false;
									}

									// �������� �����Է� ȭ�� �̵�
									var data_list = [
													 { "key" : "view_name", "value" : "/lo/LOAN2103.jsp" }
												   , { "key" : "parent", "value" : "IB" }
												   , { "key" : "topMenu", "value" : "IB_REQ" }
												   , { "key" : "leftMenu", "value" : "IB_REQ_010" }
												   , { "key" : "title", "value" : "���������Է�" }
										];

									// renewal4 ���� url ȣ��
									fnCommon_callUrl( data_list );
								}

							}else{
								fnCommon_LoadingLayer(false);
								alert("�¶��� ���� ������\n�Ϸ�Ǿ����ϴ�.");

								if( online_yn ){
									fnCommon_goHome();
								}else{
									// ���� ���ҵ� �ݾ� ��ȸ // ������� �� �ǰ����� �ڰݵ�� ����, �ǰ����� ����Ȯ��, �ǰ����� �ڰݵ��Ȯ�� ��ȸ
									loanRenewal4_002.fnSearch_yyyyAmt();
								}
							}
						}else if( "A" == SCRP_NHIS ){

							// �����û�ѵ���ȸ ȭ�� ȣ��
							var data_list = [
											 { "key" : "view_name", "value" : "/lo/LOAN2104.jsp" }
										   , { "key" : "parent", "value" : "IB" }
										   , { "key" : "topMenu", "value" : "IB_REQ" }
										   , { "key" : "leftMenu", "value" : "IB_REQ_010" }
										   , { "key" : "title", "value" : "�ѵ���ȸ���" }
								];

							// renewal4 ���� url ȣ��
							fnCommon_callUrl( data_list );
		    			}else if( "E" == SCRP_NHIS ){
							// "E" ���� �ΰ�� 
							fnCommon_LoadingLayer(false);
							var confirm_result = confirm("�¶��� ���� ������ �����Ͽ����ϴ�. ���������� �Է��Ͻðڽ��ϱ�? (��ȭ���⸸ ����)");
							if(!confirm_result){
								return false;
							}

							// �������� �����Է� ȭ�� �̵�
							var data_list = [
											 { "key" : "view_name", "value" : "/lo/LOAN2103.jsp" }
										   , { "key" : "parent", "value" : "IB" }
										   , { "key" : "topMenu", "value" : "IB_REQ" }
										   , { "key" : "leftMenu", "value" : "IB_REQ_010" }
										   , { "key" : "title", "value" : "���������Է�" }
								];

							// renewal4 ���� url ȣ��
							fnCommon_callUrl( data_list );
						
						}else{
						
							// "N" ���� �ΰ��							
							// ����D ��û -> ���ο��ݸ� ��ũ���� ����Ǵ� ��� ����ϰ� ������ ������� ����
							var yyIncmAmtYn = json.DATA.YY_INCM_AMT_YN;
							
							if( !fnCommon_isNull(yyIncmAmtYn)  &&  yyIncmAmtYn == "N"){
								company_nm = "";
								year_amt = "";
								join_company_day = "";
								_002_pass_yn = "N";

								// ���ǿ� ����
								loanRenewal4_002.fnSave_1();
								
								/*
								// ���� ���
								// �����û�ѵ���ȸ ȭ�� ȣ��
								var data_list = [
											 { "key" : "view_name", "value" : "/lo/LOAN2104.jsp" }
										   , { "key" : "parent", "value" : "IB" }
										   , { "key" : "topMenu", "value" : "IB_REQ" }
										   , { "key" : "leftMenu", "value" : "IB_REQ_010" }
										   , { "key" : "title", "value" : "�ѵ���ȸ���" }
								];

								// renewal4 ���� url ȣ��
								fnCommon_callUrl( data_list );
								*/
								
							} else {
								var confirm_result = confirm("�¶��� ���� ������ �Ϸ�Ǿ�����, �ڵ����� �ҵ������ ���� �ʾҽ��ϴ�. �ҵ������� ���� �Է��Ͻðڽ��ϱ�? ");
								if(!confirm_result){
									return false;
								}
								
								// �������� �����Է� ȭ�� �̵�
								var data_list = [
													 { "key" : "view_name", "value" : "/lo/LOAN2103.jsp" }
												   , { "key" : "parent", "value" : "IB" }
												   , { "key" : "topMenu", "value" : "IB_REQ" }
												   , { "key" : "leftMenu", "value" : "IB_REQ_010" }
												   , { "key" : "title", "value" : "���������Է�" }
												];
												
								// renewal4 ���� url ȣ��
								fnCommon_callUrl( data_list );
							
							}
						
						}

			    	} else {
			    		fnCommon_LoadingLayer(false);
			    		var errorMsg = json.RESULT_DESC;
			    		alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					fnCommon_LoadingLayer(false);
				},
				complete: function() {
					fnCommon_LoadingLayer(false);
		        }
			});
		},

		/* --------------------------------------------------------------------------------------
			��ũ���� ��û��� ��ȸ
			loanRenewal4_002.fnScraping_3
		 -------------------------------------------------------------------------------------- */
		fnScraping_3 : function(res_result_flag, SCRP_NHIS){

			iajax.clearParam();
			iajax.addParam("PROC_GB", "1");   // 1 �ѵ���ȸ��ũ���� 2 �¶��μ������⽺ũ����
			iajax.addParam("SEND_MSG", "Y");
			iajax.addParam("SCRP_NHIS", SCRP_NHIS);
			iajax.addParam("SCRP_NPS", "N");
			iajax.addParam("BANK_INSP_NO", bank_Insp_No);
			
			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3002_NEW,  // �ѵ���ȸ��ũ����
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	ing.hide();
			    	if(json.RESULT_NO == "0000") {

					// ��ũ���� ��û ��� �������� �����
		    			if(res_result_flag){

			    			// �ҵ��Է¿���
				    		var yyIncmAmtYn = json.DATA.YY_INCM_AMT_YN;
							if( !fnCommon_isNull(yyIncmAmtYn)  &&  yyIncmAmtYn == "Y"){

								// �¶��μ������� �޴��� ���ٿ���
								if( !fnCommon_isNull(loanRenewal4_014_START_YN)  &&  loanRenewal4_014_START_YN == "Y"){
									fnCommon_LoadingLayer(false);
									alert("�¶��μ�������� ����Ȯ���� �Ұ��մϴ�.");
									//fnCommon_goBack();

								}else{
									fnCommon_LoadingLayer(false);
									var confirm_result = confirm("�¶��� ���� ������ �Ϸ�Ǿ�����, �ڵ����� �ҵ������ ���� �ʽ��ϴ�. �ҵ������� ���� �Է��Ͻðڽ��ϱ�?");
									if(!confirm_result){
										return false;
									}

					    			// �������� �����Է� ȭ�� �̵�
									var data_list = [
//										             { "key" : "view_name", "value" : "loanRenewal4_003" }
										             { "key" : "view_name", "value" : "/lo/LOAN2103.jsp" }
											       , { "key" : "parent", "value" : "IB" }
										           , { "key" : "topMenu", "value" : "IB_REQ" }
										           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
										           , { "key" : "title", "value" : "���������Է�" }
										];

					    			// renewal4 ���� url ȣ��
					    			fnCommon_callUrl( data_list );
								}

				    		}else{
				    			fnCommon_LoadingLayer(false);
			    				alert("�¶��� ���� ������\n�Ϸ�Ǿ����ϴ�.");

								if( online_yn ){
									fnCommon_goHome();
								}else{
									// ���� ���ҵ� �ݾ� ��ȸ // ������� �� �ǰ����� �ڰݵ�� ����, �ǰ����� ����Ȯ��, �ǰ����� �ڰݵ��Ȯ�� ��ȸ
									loanRenewal4_002.fnSearch_yyyyAmt();
								}
				    		}

		    			}else{
		    				// �ҵ��Է¿���
				    		var yyIncmAmtYn = json.DATA.YY_INCM_AMT_YN;
							if( !fnCommon_isNull(yyIncmAmtYn)  &&  yyIncmAmtYn == "N"){

								company_nm = "";
								year_amt = "";
								join_company_day = "";
								_002_pass_yn = "N";

						    	// ���ǿ� ����
								loanRenewal4_002.fnSave_1();
							}else{

			    				// ���ΰǰ�������� ���� & ��ŵ������ ����
					    		// �����û�ѵ���ȸ ȭ�� ȣ��
								var data_list = [
//									             { "key" : "view_name", "value" : "loanRenewal4_004" }
									             { "key" : "view_name", "value" : "/lo/LOAN2104.jsp" }
									           , { "key" : "parent", "value" : "IB" }
									           , { "key" : "topMenu", "value" : "IB_REQ" }
									           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
									           , { "key" : "title", "value" : "�ѵ���ȸ���" }
									];

								// renewal4 ���� url ȣ��
								fnCommon_callUrl( data_list );
			    			}
		    			}


			    	} else {
			    		fnCommon_LoadingLayer(false);
			    		var errorMsg = json.RESULT_DESC;
			    		alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					fnCommon_LoadingLayer(false);
					// alert(error);
					fnCommon_SessionExpired();
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
					fnCommon_LoadingLayer(false);
					// �ε� ����
					// fnCommon_hideMask();
		        }
			});
		},


		/* --------------------------------------------------------------------------------------
			��ũ���� ��û��� ��ȸ - ���ο���
			���ο��� ��ũ������ ȭ�� ��� ���� �ʴ� ����� ��ũ���� ������ ����
			loanRenewal4_002.fnScraping_3_NPS
		 -------------------------------------------------------------------------------------- */
		fnScraping_3_NPS : function(res_result_flag, SCRP_NPS){

			iajax.clearParam();
			iajax.addParam("PROC_GB", "1");   // 1 �ѵ���ȸ��ũ���� 2 �¶��μ������⽺ũ����
	//		iajax.addParam("CHK_CSRF", random);
			iajax.addParam("SEND_MSG", "Y");
			iajax.addParam("SCRP_NHIS", "N"); // ���ο��� ��ũ���νÿ��� �ǰ������� 'N'���� ����
			iajax.addParam("SCRP_NPS", SCRP_NPS);
			iajax.addParam("BANK_INSP_NO", bank_Insp_No);
			
			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3002_NEW,  // �ѵ���ȸ��ũ����
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	ing.hide();
			    	if(json.RESULT_NO == "0000") {


		    			// ��ũ���� ��û ��� �������� �����
		    			if(res_result_flag){


			    			// �ҵ��Է¿���
				    		var yyIncmAmtYn = json.DATA.YY_INCM_AMT_YN;
							if( !fnCommon_isNull(yyIncmAmtYn)  &&  yyIncmAmtYn == "Y"){

								// �¶��μ������� �޴��� ���ٿ���
								if( !fnCommon_isNull(loanRenewal4_014_START_YN)  &&  loanRenewal4_014_START_YN == "Y"){
									fnCommon_LoadingLayer(false);
									//alert("�¶��μ�������� ����Ȯ���� �Ұ��մϴ�.");
									//fnCommon_goBack();
								}else{
									fnCommon_LoadingLayer(false);
									//var confirm_result = confirm("�¶��� ���� ������ �Ϸ�Ǿ�����, �ڵ����� �ҵ������ ���� �ʽ��ϴ�. �ҵ������� ���� �Է��Ͻðڽ��ϱ�?");
									//if(!confirm_result){
										//return false;
									//}

									/*
					    			// �������� �����Է� ȭ�� �̵�
									var data_list = [
	//									             { "key" : "view_name", "value" : "loanRenewal4_003" }
										             { "key" : "view_name", "value" : "/lo/LOAN2103.jsp" }
											       , { "key" : "parent", "value" : "IB" }
										           , { "key" : "topMenu", "value" : "IB_REQ" }
										           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
										           , { "key" : "title", "value" : "���������Է�" }
										];

					    			// renewal4 ���� url ȣ��
					    			fnCommon_callUrl( data_list );
					    			*/
								}

				    		}else{
				    			fnCommon_LoadingLayer(false);
			    				//alert("�¶��� ���� ������\n�Ϸ�Ǿ����ϴ�.");

	    						// ���� ���ҵ� �ݾ� ��ȸ // ������� �� �ǰ����� �ڰݵ�� ����, �ǰ����� ����Ȯ��, �ǰ����� �ڰݵ��Ȯ�� ��ȸ
	    						//loanRenewal4_002.fnSearch_yyyyAmt();
				    		}

		    			}else{
		    				/*
		    				// �ҵ��Է¿���
				    		var yyIncmAmtYn = json.DATA.YY_INCM_AMT_YN;
							if( !fnCommon_isNull(yyIncmAmtYn)  &&  yyIncmAmtYn == "N"){

								company_nm = "";
								year_amt = "";
								join_company_day = "";
								_002_pass_yn = "N";

						    	// ���ǿ� ����
								loanRenewal4_002.fnSave_1();
							}else{

			    				// ���ΰǰ�������� ���� & ��ŵ������ ����
					    		// �����û�ѵ���ȸ ȭ�� ȣ��
								var data_list = [
	//								             { "key" : "view_name", "value" : "loanRenewal4_004" }
									             { "key" : "view_name", "value" : "/lo/LOAN2104.jsp" }
									           , { "key" : "parent", "value" : "IB" }
									           , { "key" : "topMenu", "value" : "IB_REQ" }
									           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
									           , { "key" : "title", "value" : "�ѵ���ȸ���" }
									];

								// renewal4 ���� url ȣ��
								fnCommon_callUrl( data_list );
			    			}
			    			*/
		    			}


			    	} else {
			    		fnCommon_LoadingLayer(false);
			    		//var errorMsg = json.RESULT_DESC;
			    		//alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					fnCommon_LoadingLayer(false);
					// alert(error);
					//fnCommon_SessionExpired();
					//console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
					fnCommon_LoadingLayer(false);
					// �ε� ����
					// fnCommon_hideMask();
		        }
			});
		},

		/* --------------------------------------------------------------------------------------
			����ȸ ��û�Ͻðڽ��ϱ�? ��
			loanRenewal4_002.fnScraping_2_callback_y
		 -------------------------------------------------------------------------------------- */
		fnScraping_2_callback_y : function(){

			// ��ũ���� ��û
			loanRenewal4_002.fnScraping_1();
		},



		/* --------------------------------------------------------------------------------------
			����ȸ ��û�Ͻðڽ��ϱ�? �ƴϿ�
			loanRenewal4_002.fnScraping_2_callback_n
		 -------------------------------------------------------------------------------------- */
		fnScraping_2_callback_n : function(){
			fnCommon_goHome();
		},



		/* --------------------------------------------------------------------------------------
			�ٽ� ��ũ���� ���� ��ȸ
			loanRenewal4_002.fnScraping_reSearch
		 -------------------------------------------------------------------------------------- */
		fnScraping_reSearch : function( msg ){

			iajax.clearParam();
			//iajax.addParam("CHK_CSRF", random); //�׽�Ʈ�� ����
			iajax.addParam("SCRT_NM", "NHIS");  // ���ΰǰ��������

			$.ajax({
				type: "post",
				url: callURL_getScrtResCd,
				dataType: "json",
				data: iajax.postparam,
				success: function(json){

					// ����
					if(json.DATA.ANS_PROC == '0'){

						loanRenewal4_002.fnScraping_3(true, "Y");

					}else if(json.DATA.ANS_PROC == '1'){
						if (json.DATA.JOB_NM == '�α���'){
							ing.hide();
							alert(msg.split("<br/>").join("\n"));
							//fnCommon_goBack();  // �ڷΰ��� ó��

						}else{
							loanRenewal4_002.fnScraping_3(false, "E");
						}

					}else{
						ing.hide();
						alert(msg.split("<br/>").join("\n"));
						//fnCommon_goBack();  // �ڷΰ��� ó��
					}
				},
				error: function(data, textStatus, error) {
				},
				complete: function() {
				},
			});

		},

		/* --------------------------------------------------------------------------------------
			�ٽ� ��ũ���� ���� ��ȸ
			loanRenewal4_002.fnScraping_reSearch_NPS
		 -------------------------------------------------------------------------------------- */
		fnScraping_reSearch_NPS : function( msg ){

			iajax.clearParam();
			//iajax.addParam("CHK_CSRF", random); //�׽�Ʈ�� ����
			iajax.addParam("SCRT_NM", "NPS");  // ���ΰǰ��������

			$.ajax({
				type: "post",
				url: callURL_getScrtResCd,
				dataType: "json",
				data: iajax.postparam,
				success: function(json){

					// ����
					if(json.DATA.ANS_PROC == '0'){

						loanRenewal4_002.fnScraping_3_NPS(true, "Y");

					}else if(json.DATA.ANS_PROC == '1'){
						if (json.DATA.JOB_NM == '�α���'){
							ing.hide();
							//alert(msg.split("<br/>").join("\n"));
							//fnCommon_goBack();  // �ڷΰ��� ó��

						}else if(json.DATA.JOB_NM == '�������޳���_����'){
							loanRenewal4_002.fnScraping_3_NPS(true, "Y");
						}else{
							loanRenewal4_002.fnScraping_3_NPS(false, "E");
						}

					}else{
						ing.hide();
						// alert(msg.split("<br/>").join("\n"));
						//fnCommon_goBack();  // �ڷΰ��� ó��
					}
				},
				error: function(data, textStatus, error) {
				},
				complete: function() {
				},
			});

		},

		/* --------------------------------------------------------------------------------------
			��ũ���� Ÿ�Ӿƿ� ó��
			loanRenewal4_002.fnScraping_timeout
		 -------------------------------------------------------------------------------------- */
		fnScraping_timeout : function( scrp_nm, job_nm, msg ){
			var timeout_msg = "����� ��Ȱ���� �ʽ��ϴ�.";
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
			���� ���ҵ� �ݾ� ��ȸ // ������� �� �ǰ����� �ڰݵ�� ����, �ǰ����� ����Ȯ��, �ǰ����� �ڰݵ��Ȯ�� ��ȸ
			loanRenewal4_002.fnSearch_yyyyAmt
		 -------------------------------------------------------------------------------------- */
		fnSearch_yyyyAmt : function(){
			iajax.clearParam();
			//iajax.addParam("CHK_CSRF", random);
			iajax.addParam("BANK_INSP_NO", bank_Insp_No);
			$.ajax({
			    type: "post",
			    url: callURL_selectNHIS,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"  &&  !fnCommon_isNull(json.DATA) ){

			    		// ����� �� �ǰ����� �ڰݵ�� ����
			    		var startDate = json.DATA.C_START_DATE;   // ��������
			    		var comName = json.DATA.C_COM_NAME;   // �����
			    		var companyCount = Number(json.DATA.COM_COUNT);   // ����� ����

			    		var yyIncmAmt = json.DATA.YY_INCM_AMT;  // �����׸� --> ���ҵ�ݾ��ε�?
			    		var cPaymentDate = json.DATA.C_PAYMENT_DATE;  // �����׸� --> �÷������� ���� �������ε�?

			    		// �ǰ����� ����Ȯ��
			    		var paymentCount = Number(json.DATA.PAYMENT_COUNT);   // ����Ƚ��

			    		// �ǰ����� �ڰݵ��Ȯ��
			    		var certCount = Number(json.DATA.CERT_COUNT);   // �ڰݵ��Ȯ��Ƚ��

				    	if( fnCommon_isNull(cPaymentDate) ){
			    			yyIncmAmt = "0";

			    		}else if( fnCommon_isNull(comName) ){
			    			yyIncmAmt = "0";
			    		}

				    	// �������� �����Է� ȭ�� �̵� ����
				    	var loanRenewal4_003_move_flag = false;

				    	// �ǰ����� ����Ƚ�� �ִµ�
			    		if(paymentCount > 0){

			    			// ������̳� �ڰݵ�� ������ ������
					    	if( fnCommon_isNull(companyCount)  ||  fnCommon_isNull(certCount) ){

					    		// �������� �����Է� ȭ�� �̵�
					    		loanRenewal4_003_move_flag = true;
			    			}
			    		}

			    		// ����� �ִµ�
			    		if(companyCount > 0) {

			    			// �ڰݵ�� ������ ������
			    			if(fnCommon_isNull(certCount)) {

					    		// �������� �����Է� ȭ�� �̵�
					    		loanRenewal4_003_move_flag = true;
			    			}
			    		}

				    	if(loanRenewal4_003_move_flag){

							// �¶��μ������� �޴��� ���ٿ���
							if( !fnCommon_isNull(loanRenewal4_014_START_YN)  &&  loanRenewal4_014_START_YN == "Y"){
								alert("�¶��� ���� ���� ���Գ����� ��ġ�����ʽ��ϴ�.");
								fnCommon_goBack();

							}else{
								var confirm_result = confirm("�¶��� ���� ���� ���Գ����� ��ġ�����ʽ��ϴ�.\n�ҵ������� ���� �Է��Ͻðڽ��ϱ�?");
								if(!confirm_result){
									return false;
								}

				    			// �������� �����Է� ȭ�� �̵�
								var data_list = [
									             { "key" : "view_name", "value" : "/lo/LOAN2103.jsp" }
									           , { "key" : "parent", "value" : "IB" }
									           , { "key" : "topMenu", "value" : "IB_REQ" }
									           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
									           , { "key" : "title", "value" : "���������Է�" }
									];

				    			// renewal4 ���� url ȣ��
				    			fnCommon_callUrl( data_list );
							}

				    	}else{

					    	// ����� �������� 40 byte ����
							// byte ���Ѹ�ŭ �߶󳻱�
							comName = fnCommon_cutByte(40, comName);

					    	// ��ȸ�� �ҵ����� ���ǿ� ����
					    	company_nm = comName;   // �����
					    	year_amt = yyIncmAmt;  // ���ҵ�ݾ�
					    	join_company_day = startDate;  // �ǰ����� �ڰݵ�� ��������(�Ի�����)

					    	// ���ǿ� ����
							loanRenewal4_002.fnSave_1();
				    	}

			    	}else{
			    		fnCommon_LoadingLayer(false);
			    		alert("�¶��� ���� ���� ��ȸ�ý��� �����Դϴ�.");
			    	}
			    },
				error: function(data, textStatus, error) {
					// alert(error);
					fnCommon_SessionExpired();
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {

					// �ε� ����
					// fnCommon_hideMask();
		        }
			});
		},



		/* --------------------------------------------------------------------------------------
			���ǿ� ����
			loanRenewal4_002.fnSave_1
		 -------------------------------------------------------------------------------------- */
		fnSave_1 : function(){
			iajax.clearParam();
			//iajax.addParam("CHK_CSRF", random);
			iajax.addParam("company_nm", company_nm);  // �����
			iajax.addParam("year_amt", year_amt);  // ���ҵ�ݾ�
			iajax.addParam("join_company_day", join_company_day);  // �ǰ����� �ڰݵ�� ��������(�Ի�����)
			iajax.addParam("SCRP_NHIS_SUCCESS_YN", "Y");  // ��ũ���� �������ΰ� ����
			iajax.addParam("SCRAP_CERT_PASS_YN", "Y");  // �������� ��ũ���� �� ��� ������ ����ִ��� ��ũ���� �̿�� ������ ���Է� PASS

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

						// �¶��μ������� �޴��� ���ٿ���
						if( !fnCommon_isNull(loanRenewal4_014_START_YN)  &&  loanRenewal4_014_START_YN == "Y"){
							fnCommon_goBack();

						}else{
				    		// �����û�ѵ���ȸ ȭ�� ȣ��
							var data_list = [
//								             { "key" : "view_name", "value" : "loanRenewal4_004" }
								             { "key" : "view_name", "value" : "/lo/LOAN2104.jsp" }
								           , { "key" : "title", "value" : "�ѵ���ȸ���" }
								           , { "key" : "parent", "value" : "IB" }
								           , { "key" : "topMenu", "value" : "IB_REQ" }
								           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
		//						           , { "key" : "beforeview", "value" : "loanRenewal4_002" }  // �ѵ���ȸ ȭ�鿡�� ���� �߻��� �ǵ��ư� ȭ��id
								           , { "key" : "beforeview", "value" : "/lo/LOAN2102.jsp" }  // �ѵ���ȸ ȭ�鿡�� ���� �߻��� �ǵ��ư� ȭ��id
								];

							// renewal4 ���� url ȣ��
							fnCommon_callUrl( data_list );
						}

			    	} else {
			    		fnCommon_LoadingLayer(false);
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
		    	error: function(data, textStatus, error) {
		    		fnCommon_SessionExpired();
				},
				complete: function() {
				}
			});
		},

		fnCommon_ScrappingHist : function (scrt_nm, job_nm, send_usr_time, res_usr_time, res_code, res_msg) {

			var callURL = "/lo/LOAN2102_insertScrtHist.jsp";

			iajax.clearParam();
			iajax.addParam("SCRT_NM", scrt_nm);
			iajax.addParam("JOB_NM", job_nm);
			iajax.addParam("SEND_USR_TIME", send_usr_time);
			iajax.addParam("RES_USR_TIME", res_usr_time);
			iajax.addParam("RES_CODE", res_code);
			iajax.addParam("RES_MSG", res_msg);
			iajax.addParam("OS_VER", "");
			iajax.addParam("DEVICE_TYPE", "");
			iajax.addParam("RES_USR_TIME", "");



			try {
				$.ajax({
				    type: "post",
				    url: callURL,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
						console.log("json");
				    },
					error : function(data, textStatus, error) {
						alert("data: " + data + ", textStatus: " + textStatus
								+ ", error: " + error);
					},
					beforeSend : function() {
					},
					complete : function() {
					}
				});
			} catch (e) {
				ing.hide();
				alert(e);
				//alert(e.descryption);
			}
		},

		//loanRenewal4_002.fnMovie_Direct
		fnMovie_Direct : function() {
			// �������� �����Է� ȭ�� �̵�
			var data_list = [
				             { "key" : "view_name", "value" : "/lo/LOAN2103.jsp" }
				           , { "key" : "parent", "value" : "IB" }
				           , { "key" : "topMenu", "value" : "IB_REQ" }
				           , { "key" : "leftMenu", "value" : strLeftMenu }
				           , { "key" : "title", "value" : "���������Է�" }
				];

			// renewal4 ���� url ȣ��
			fnCommon_callUrl( data_list );

		}

	};   // var loanRenewal4_002 = {







	/* --------------------------------------------------------------------------------------
		�������� �����Է� ȭ��
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_003 = {

			/* --------------------------------------------------------------------------------------
				�⺻����
				loanRenewal4_003.fnInit
			 -------------------------------------------------------------------------------------- */
			fnInit : function(){

				// ���ҵ� ���� �̺�Ʈ
				$("#year_amt").on("keyup", loanRenewal4_003.fnKeyup_year_amt );

				// �Ի����� ���� �̺�Ʈ
				$("#join_company_day").on("keyup", loanRenewal4_003.fnKeyup_join_company_day );

				// �� �������� ��ȸ
				loanRenewal4_003.fnSearch_1();
			},



			/* --------------------------------------------------------------------------------------
				���ҵ� �Է¶� �Է��̺�Ʈ
				loanRenewal4_003.fnKeyup_inputAmt
			 -------------------------------------------------------------------------------------- */
			fnKeyup_inputAmt : function(e){

				// �������� Ȥ�� �𸣴ϱ� �ʱ�ȭ ó�� ����
				$("#input_manwon").parent().hide();
				$("#input_manwon").html("");

				var id = e.target.id;
				var value = $("#" + id).val();

				if( !fnCommon_isNull(value) ){

					// ���ڿ� ���� �� ���ڸ� ��ȯ
					value = fnCommon_getOnlyNumber(value);
					var value_number = Number(value);
					if(value_number > 0){

						/*
						// max�� ����
						if(value_number > 9999999999){
							value = value.substring(0, value.length-1);
							value_number = Number(value);
						}
						*/

						// �޸����
						var value_format = fnCommon_addComma(value);
						$("#" + id).val( value_format );

						if(value_number > 10000){
							value_number = parseInt( value_number/10000 );   // �������� ���� ����
							if(value_number > 0){
								value = String(value_number);

								// �޸����
								value_format = fnCommon_addComma(value);

								// �� ������ �Ѱ����ۿ� �������� �����ϱ�
								$("#input_manwon").parent().show();
								$("#input_manwon").html(value_format);
							}
						}
					}
				}
			},



			/* --------------------------------------------------------------------------------------
				�� �������� ��ȸ
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

							// �������� �����Է°� // beforeview ���� ���� �ǵ��ƿ��� ���ɼ��� ������ �����Է°� ������ �ٽ� �������ֱ�
				    		$("#company_nm").val( json.company_nm );   // �����
				    		$("#year_amt").val( json.year_amt );   // ���ҵ�
				    		$("#join_company_day").val( json.join_company_day );   // �Ի�����

				    		// �̺�Ʈ �����߻����Ѽ� ���� ���߱�
				    		// ���ҵ� �Է¶� �Է��̺�Ʈ
							loanRenewal4_003.fnKeyup_inputAmt( {target:{id:"year_amt"}} );

							// �Ի����� ���� �̺�Ʈ
							loanRenewal4_003.fnKeyup_join_company_day( {target:{value:json.join_company_day}} );

							//�ӽ� �ϵ��ڵ� 20191106 kkk

				    		// ������ ������ ���� ���� ����
				    		// ���� 1 ������(4�뺸�谡��) 2 ���λ���� 3 ��Ÿ����ҵ��������뿪������ 4 ���ݼҵ���
					    	if( !fnCommon_isNull(qna01) ){

					    		var company_nm_dt = "";
					    		var join_company_day_dt = "";

					    		// 1 ������(4�뺸�谡��)
					    		if(qna01 == "1"){
					    			company_nm_dt = "�����";
					    			join_company_day_dt = "�Ի�����";
									
					    			$("#join_company_day_comment").html("3�����̻� ������ ��û ����");  // �Ի����� �ȳ�
					    			$("#join_company_day_comment_dl").show();
					    			$("#join_company_day_comment0").hide();


				    			// 2 ���λ����
					    		}else if(qna01 == "2"){
					    			company_nm_dt = "����ڸ�";
					    			join_company_day_dt = "���������";
					    			$("#year_amt_dt").html("���ռҵ漼�ݾ�");
					    			//$("#join_company_day_comment").html("");
					    			$("#join_company_day_comment0").html("���ռҵ漼 �ҵ�ݾ�������� �ҵ�ݾ�");  // �Ի����� �ȳ�
					    			$("#join_company_day_comment").hide();
					    			//$("#year_amt_dt_dl").show();


				    			// 3 ��Ÿ����ҵ��������뿪������
					    		}else if(qna01 == "3"){
					    			company_nm_dt = "����ڸ�";
					    			join_company_day_dt = "�Ի�����";
					    			$("#join_company_day_comment").hide();
					    			$("#join_company_day_comment0").hide();

				    			// 4 ���ݼҵ���
					    		}else if(qna01 == "4"){
					    			company_nm_dt = "���ݼҵ�����";
					    			join_company_day_dt = "���ݼ��ɰ�����";
					    			$("#join_company_day_comment").html("1ȸ�̻� ���� ���ɽ� ��û ����");  // ���ݼ��ɰ����� �ȳ�
					    			$("#join_company_day_comment_dl").show();
					    			$("#join_company_day_comment0").hide();

					    			// ����� �����Է� ���� �̻��
					    			$("#company_nm_dd_1").hide();

					    			// �������� �޺��ڽ� ���
					    			$("#company_nm_dd_2").show();
					    		
								} else if (qna01 == "8" || qna01 == "9") { // DHKANG[������500] �ֺ�, ���� ���̽� �����, �Ի����� ����
									$("#company_nm_dt_tr").hide();
									$("#join_company_day_dt_tr").hide();
									$("#join_company_day_comment0").hide();
									
								}

				    			$("#company_nm_dt").html( company_nm_dt );
				    			$("#join_company_day_dt").html( join_company_day_dt );
								$("#join_company_day").attr("title", join_company_day_dt );

				    			// 1 ������(4�뺸�谡��) �϶��� ��ũ���� ����
				    			if(qna01 == "1"){

							    	// �Ǻ���ũ������ֿ��� ��� �ƴϸ� �¶��μ������� �̵� ����
							    	if( fnCommon_isNull(SCRP_NHIS_ERROR_YN)  ||  SCRP_NHIS_ERROR_YN != "Y" ){

										// �ۿ��� // ���϶��� ��ũ���� ȭ�� �̵� ��ư ����
										var isApp_flag = fnCommon_isApp();
										if( isApp_flag ){
											$("#btn_moveScrap").show();
										}
							    	}
				    			}
					    	}else{
								alert("�������� ��ΰ� �ƴմϴ�.");
							}

							// �����ڵ� �޺� ����
							fnCommon_combo_commcodelist( json.commcodelist_75048, "pensionCombo", "Y" );   // ��������
						}
				    },
					beforeSend : function() {
						ing.show();
					},
					error: function(data, textStatus, error){
						ing.hide();
						// alert(error);
						fnCommon_SessionExpired();
						console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function(){
						ing.hide();
			        }
				});
			},



			/* --------------------------------------------------------------------------------------
				�¶��μ�������(��ũ����) - �ѵ���ȸ ȭ�� ȣ��
				loanRenewal4_003.fnMovePage_scraping
			 -------------------------------------------------------------------------------------- */
			fnMovePage_scraping : function(){

				// �ۿ��� // ���϶��� ��ũ���� ȭ�� �̵�
				// ����� 5������
				// PC ���� ����� ����
				//var isApp_flag = fnCommon_isApp();
				//if( !isApp_flag ){
					//alert("�¶��μ�������(��ũ����)�� app ���ӽÿ��� �����մϴ�.");
					//return false;
				//}

	    		var data_list = [
//	    		                 { "key" : "view_name", "value" : "loanRenewal4_002" }
	    		                 { "key" : "view_name", "value" : "/lo/LOAN2102.jsp" }
	    		               , { "key" : "title", "value" : "���������Է�" }
					           , { "key" : "parent", "value" : "IB" }
					           , { "key" : "topMenu", "value" : "IB_REQ" }
					           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
	                 ];

	    		// renewal4 ���� url ȣ��
	    		fnCommon_callUrl( data_list );
			},



			/* --------------------------------------------------------------------------------------
				��ȿ�� üũ
				loanRenewal4_003.fnSearch_limit_validation
			 -------------------------------------------------------------------------------------- */
			fnSearch_limit_validation : function(){

				var company_nm = $("#company_nm").val();   // �����
				var year_amt = $("#year_amt").val();   // ���ҵ�
				var join_company_day = $("#join_company_day").val();   // �Ի�����

				// ���ڿ� ���� �� ���ڸ� ��ȯ
				year_amt = fnCommon_getOnlyNumber(year_amt);
				join_company_day = fnCommon_getOnlyNumber(join_company_day);

				var year_amt_number = Number(year_amt);

				// ������ ��� �ǽʴϱ�?
		    	if( fnCommon_isNull(qna01) ){
					alert("���õ� ���������� �����ϴ�.");
    				return false;

		    	} else if (qna01 == "8" || qna01 == "9") {	// DHKANG[������500] �ֺ�, ���� ���̽��� �� �����Է� �� ���ҵ游 �ޱ�
					if(fnCommon_isNull(year_amt) || year_amt == 0) {
						alert("���ҵ��� �Է����ּ���.");
						return false;
					}
					
				} else{

		    		// ���ݼҵ���
		    		if( qna01 == "4"){
		    			if( fnCommon_isNull(year_amt_number)){
		    				alert("���ҵ��� �Է����ּ���.");
		    				$("#year_amt").focus();
		    				return false;
		    			}
		    			if(year_amt_number < 6000000){
							alert("���ҵ� �ݾ��� �ּ� 600���� �̻���\n��쿡�� ������ �����մϴ�.");
		    				$("#year_amt").focus();
		    				return false;
		    			}

		    			// ��������
		    			var pensionCombo = $("#pensionCombo").val();
		    			if( fnCommon_isNull(pensionCombo)){
		    				alert("�������¸� �������ּ���.");
		    				$("#pensionCombo").focus();
		    				return false;
		    			}

		    		} else{
		    			if( fnCommon_isNull(company_nm)){
		    				alert("�����(����ڸ�)�� �Է����ּ���.");
		    				$("#company_nm").focus();
		    				return false;
		    			}

		    			// 1 ������(4�뺸�谡��)
			    		if( qna01 == "1"  &&  year_amt_number < 1000000){
							alert("���ҵ� �ݾ��� �ּ� 100���� �̻���\n��쿡�� ������ �����մϴ�.");
		    				$("#year_amt").focus();
		    				return false;

	    				// 2 ���λ����
			    		}else if( qna01 == "2"  &&  year_amt_number < 6000000){
							alert("���ҵ� �ݾ��� �ּ� 600���� �̻���\n��쿡�� ������ �����մϴ�.");
		    				$("#year_amt").focus();
		    				return false;

	    				// 3 ��Ÿ����ҵ��������뿪������
			    		}else if( qna01 == "3"  &&  year_amt_number < 10000000){
							alert("���ҵ� �ݾ��� �ּ� 1,000���� �̻���\n��쿡�� ������ �����մϴ�.");
		    				$("#year_amt").focus();
		    				return false;
			    		}
		    		}

					// �Ի����� �ʼ�
			    	if( fnCommon_isNull(join_company_day)  ||  fnCommon_isNull(join_company_day.length)  ||  join_company_day.length != 8 ){
		    			var join_company_day_dt = $("#join_company_day_dt").html();
						alert( join_company_day_dt + "�� �Է����ּ���.");
	    				return false;
			    	}

					// ��������
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

					// �������ں��� �̷��̸� ����Ұ�
					if(currentDay < join_company_day_number){
		    			var join_company_day_dt = $("#join_company_day_dt").html();
						alert( join_company_day_dt + "�� Ȯ�����ּ���.");
	    				return false;
					}
		    	}

			   return true;
			},



			/* --------------------------------------------------------------------------------------
				�ѵ���ȸ Ŭ�� - �������� �����Է°� ���Ǻ���
				loanRenewal4_003.fnSave_1
			 -------------------------------------------------------------------------------------- */
			fnSave_1 : function(){

				// ��ȿ�� üũ
				var result = loanRenewal4_003.fnSearch_limit_validation();
				if(!result){
					return false;
				}

				// �����
				var company_nm = $("#company_nm").val();
				
	    		// ���� 4 ���ݼҵ���
		    	if( !fnCommon_isNull(qna01)  &&  qna01 == "4" ){

	    			// ��������
	    			company_nm = $("#pensionCombo").val();
		    	}

				// ���ҵ�
				var year_amt = $("#year_amt").val();

				// �Ի�����
				var join_company_day = $("#join_company_day").val();

				// ���ڿ� ���� �� ���ڸ� ��ȯ
				year_amt = fnCommon_getOnlyNumber(year_amt);
				join_company_day = fnCommon_getOnlyNumber(join_company_day);

				var month_3 = fnCommon_getDay_addMonth(-3);
				month_3 = fnCommon_getOnlyNumber(month_3);
				var jjj = $("#company_nm_dt").html();

				if( jjj == "�����" && month_3 <= join_company_day ){
					alert("�����Ⱓ 3���� �̻� �� ��û �����մϴ�. �����Ⱓ ���� �� ��û ��Ź�帳�ϴ�.");
					return;
				}

				iajax.clearParam();
				//iajax.addParam("CHK_CSRF", random);
				iajax.addParam("company_nm", fnCommon_deleteNull(company_nm));
				iajax.addParam("year_amt", year_amt);
				iajax.addParam("join_company_day", join_company_day);

				$.ajax({
				    type: "post",
				    url: callURL_loanRenewal4_003_02,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
				    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"){

				    		// 5065  �����Է� - �ҵ��Է�
				    		try{
				    			Emf.convCall(797, 5065, 0, 0, 0);
				    		}catch (err) { }
				    		setTimeout(function(){
								// �����û�ѵ���ȸ ȭ�� ȣ��
								var data_list = [
									             { "key" : "view_name", "value" : "/lo/LOAN2104.jsp" }
									           , { "key" : "title", "value" : "�ѵ���ȸ���" }
									           , { "key" : "parent", "value" : "IB" }
									           , { "key" : "topMenu", "value" : "IB_REQ" }
									           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
									           , { "key" : "beforeview", "value" : "/lo/LOAN2103.jsp" }  // �ѵ���ȸ ȭ�鿡�� ���� �߻��� �ǵ��ư� ȭ��id
									];

								// renewal4 ���� url ȣ��
								fnCommon_callUrl( data_list );
				    		},100);

				    	}else{
				    		alert("�����Է°� ���忡 �����Ͽ����ϴ�.");
				    	}
					},
					beforeSend : function() {
						//ing.show();
					},
					error: function(data, textStatus, error){
						ing.hide();
						fnCommon_SessionExpired();
						console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function() {
						ing.hide();
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				����� ���� �̺�Ʈ
				loanRenewal4_003.fnKeyup_company_nm
			 -------------------------------------------------------------------------------------- */
			fnKeyup_company_nm : function( type ){

				// X Ŭ��
				if( !fnCommon_isNull(type)  &&  type == "delete" ){
					$("#company_nm").val("");
					$("#company_nm").focus();  // Ű�е尡 ������� �����ϱ�
				}

				// �� ������ ������ư ���̰�
				var company_nm = $("#company_nm").val();

		    	// ����� �������� 40 byte ����
				// byte ���Ѹ�ŭ �߶󳻱�
				company_nm = fnCommon_cutByte(40, company_nm);

				if( !fnCommon_isNull(company_nm) ){
					$("#company_nm").val(company_nm);
					$("#company_nm_delete_p").show();
				}else{
					$("#company_nm_delete_p").hide();
				}
			},



			/* --------------------------------------------------------------------------------------
				���ҵ� ���� �̺�Ʈ
				loanRenewal4_003.fnKeyup_year_amt
			 -------------------------------------------------------------------------------------- */
			fnKeyup_year_amt : function( type ){

				// X Ŭ��
				if( !fnCommon_isNull(type)  &&  type == "delete" ){

					// �������� �ʱ�ȭ
					$("#input_manwon").parent().hide();
					$("#input_manwon").html("");

					$("#year_amt").val("");
					$("#year_amt").focus();  // Ű�е尡 ������� �����ϱ�
				}

				// �� ������ ������ư �����
				var year_amt = $("#year_amt").val();
				if( fnCommon_isNull(year_amt) ){
					$("#year_amt_delete_p").hide();

				// �� ������
				}else{
					$("#year_amt_delete_p").show();  // ������ư ���̱�

					// �޸����
					var year_amt_format = fnCommon_addComma(year_amt);

					// ������ �������� ����
					$("#year_amt").val( year_amt_format );
				}
			},



			/* --------------------------------------------------------------------------------------
				�Ի����� ���� �̺�Ʈ
				loanRenewal4_003.fnKeyup_join_company_day
			 -------------------------------------------------------------------------------------- */
			fnKeyup_join_company_day : function( e, type ){

				// X Ŭ��
				if( !fnCommon_isNull(type)  &&  type == "delete" ){
					$("#join_company_day").val("");
					$("#join_company_day").focus();  // Ű�е尡 ������� �����ϱ�
				}

				// �� ������ ������ư ���̰�
				var join_company_day = $("#join_company_day").val();
				if( !fnCommon_isNull(join_company_day) ){
					$("#join_company_day_delete_p").show();
				}else{
					$("#join_company_day_delete_p").hide();
				}

				// ���� ���߱�
				var value = e.target.value;

				// ���ڿ� ���� �� ���ڸ� ��ȯ
				value = fnCommon_getOnlyNumber(value);

				// �ʵ忡 �缳���� ��
				var value_format = value;

				if( !fnCommon_isNull(value)  &&  value.length > 0 ){
					if(value.length > 4){

						// ���ڸ� �߶󳻱�
						value_format = value.substring(0, 4);
						value = value.substring(4, value.length);

						// ������ ���ڸ� �̻��̸�
						if(value.length > 2){

							// �߰��ڸ� �߶󳻱�
							value_format += "-" + value.substring(0, 2);
							value = value.substring(2, value.length);

							// ������ ���ڸ� �̻��̸� �߰��ڸ��� ���ڸ� �� �ѱ��
							if(value.length > 2){
								value_format += value.substring(0, 1);
								value = value.substring(1, value.length);
							}
						}

						// ���� ���ڸ��� ������ �̰͵� ���̱�
						if( !fnCommon_isNull(value) ){
							value_format += "-" + value;
						}
					}
				}

				// �ʵ忡 ����
				$("#join_company_day").val(value_format);
			}



	};   // var loanRenewal4_003 = {








	/* --------------------------------------------------------------------------------------
		�����û�ѵ���ȸ ȭ�� ȣ��
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_004 = {

		/* --------------------------------------------------------------------------------------
			�⺻����
			loanRenewal4_004.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// ��ȭ��� ��ȭ�鿡���� ���ֱ� // ȭ���̿뿡 ����
			$(".ddaragagi").hide();

			loanRenewal4_004.fnSearch_2();
		},



		/* --------------------------------------------------------------------------------------
			�����ѵ���ȸ ��û - ������������ǰ��û
			loanRenewal4_004.fnSearch_2
		 -------------------------------------------------------------------------------------- */
		fnSearch_2 : function(){
			// ����� 5������ - �ε��� ����
			//ing.show();
			// ����Ʈ �ʱ�ȭ
			$("#LNC3003_list_1").html("");
			$("#LNC3003_list_2").html("");

			iajax.clearParam();
			iajax.addParam("BANK_INSP_NO", bankInspNo);	//
			console.log("BANK_INSP_NO00", bankInspNo);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_004_03,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){

			    	// ó�����·� �������п�û �ݿ�
			    	if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_GB)  &&  json.RESULT_GB == "E"){
			    		// ����� 5������ - �ε���
			    		//ing.hide();
						// �޼��� �˾�
			    		var msg = json.RES_MSG + "\n";
			    		msg += "Ȩ���� �̵��մϴ�.";
				    							
			    		//var no_button_flag = true;  // �ƴϿ� ��ư ���� ����
			    		//var fnCallback_yes = loanRenewal4_004.fnSearch_2_callback_y;  // Ȯ�� ��ư�� �Լ� ����
			    		//var fnCallback_no = loanRenewal4_004.fnSearch_2_callback_n;  // �ƴϿ� ��ư�� �Լ� ����

						//fnCommon_popup("open", msg, no_button_flag, fnCallback_yes, fnCallback_no);
						//return false;

			    		/*
			    		// ȣ���� �������� �����߻��� �ǵ��ư� ȭ��id ����
				    	if( !fnCommon_isNull(beforeview)){
							var data_list = [
			    		             { "key" : "view_name", "value" : beforeview }
			    		           , { "key" : "title", "value" : "���������Է�" }
			                    ];

			    			// renewal4 ���� url ȣ��
			    			fnCommon_callUrl( data_list );

				    	}else{
				    		fnCommon_goHome();
				    	}
				    	*/
						
						alert(msg);
						fnCommon_goHome();
						
						// �����û���ۼ� ȭ�� ȣ��
						/*
						var data_list = [
											{ "key" : "view_name", "value" : "/lo/LOAN2115.jsp" }
										  , { "key" : "title", "value" : "����������ȸ" }
										  , { "key" : "parent", "value" : "IB" }
										  , { "key" : "topMenu", "value" : "IB_REQ" }
										  , { "key" : "leftMenu", "value" : "IB_REQ_050" }
							];
						
						// renewal4 ���� url ȣ��
						fnCommon_callUrl( data_list );
						*/
			    	}else{

				    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"){
				    		SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;  // �ǰ�������ֿ���
				    		SCRP_MINWON24_ERROR_YN = json.SCRP_MINWON24_ERROR_YN;  // �ο�24��ũ������ֿ���
				    		SCRP_NHIS_EXP = json.SCRP_NHIS_EXP;  // �ǰ����轺ũ�������� ����
				    		SCRP_MINWON24_EXP = json.SCRP_MINWON24_EXP;  // �ο�24��ũ�������� ����
				    		SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;  // �ǰ����� ��ũ���� ��������
				    		SCRP_MINWON24_SUCCESS_YN = json.SCRP_MINWON24_SUCCESS_YN;   // �ο�24 ��ũ���� ��������
							BANK_INSP_NO_key = json.BANK_INSP_NO;  // �����û��ȣ
							SUNSHINELOAN_YN = json.SUNSHINELOAN_YN;  // ���ھ�������
							CERT_HNDNO = json.CERT_HNDNO;  // �����޴�����ȣ

							// ���޹��� �������� �����Է°� ����
							company_nm = json.company_nm;  // �����
							year_amt = json.year_amt;  // ���ҵ�
							join_company_day = json.join_company_day;  // �Ի�����


				    		// ��ȸ�� �ѵ���ȸ���
				    		var LNC3003_list = json.LNC3003_list;
							if( fnCommon_isNull(LNC3003_list)  ||  fnCommon_isNull(LNC3003_list.length)  ||  LNC3003_list.length < 1 ){
								// alert("��ȸ�� �ѵ������ �����ϴ�.");

					    		// ����Ұ��ȳ� // ��ȸ�ѵ���� ������ �ҽ��� ó���Ȱ����� ����.
					    		loanRenewal4_004.fnGoNextSorryStep();

							}else{
								// �ѵ���ȸ��� ����Ʈ �׸���
								loanRenewal4_004.fnRenderList(LNC3003_list);
							}

				    		// �����ѵ� ��ȸ
							// loanRenewal4_004.fnSearch_1();

				    	}else{
				    		//�ӽ� 20191224
				    		var LNC3003_list = json.LNC3003_list;
							if( fnCommon_isNull(LNC3003_list)  ||  fnCommon_isNull(LNC3003_list.length)  ||  LNC3003_list.length < 1 ){
								// alert("��ȸ�� �ѵ������ �����ϴ�.");

								//
								//alert("�¶��� ���������� �Ϸ�Ǿ����ϴ�.");

								location.href = "/";

					    		return;
							}

				    		alert("�����ѵ� ��ȸ�� �����Ͽ����ϴ�.");

				    		/*
			    			var errorMsg = json.RESULT_DESC.replace( "\n1800-3651\n(���� 09:00~18:00 ��� ����)", "");
				    		if(json.RESULT_DETAIL_NO == "000399"){
				    			errorMsg = "[�ý��ۿ���]\n"
				    				+ "�ſ���ȸ ���ܼ��񽺷� �ѵ� ��ȸ�� ���� �ʽ��ϴ�.\n"
				    				+ "�ſ���ȸ ���� ���� ���� �� ��ȸ ��Ź �帳�ϴ�.\n"
				    				+ "[���� ����]\n"
				    				+ "NICE:02-2122-4000\n"
				    				+ "KCB:02-708-1000\n"
				    				+ "��������\n"
				    				+ errorMsg;
				    		}else{
				    			errorMsg = "[�ý��ۿ���]\n"
				    				+ "���� ������ ��� �˼��մϴ�.\n"
				    				+ "�߰� �� �ָ��� �ܺαⰣ IT���� ������ ������ �߻��� �� �ֽ��ϴ�.\n"
				    				+ "���� ������ ���������� Ȯ���Ͽ� ���Բ� ���� �帮���� �ϰڽ��ϴ�.\n"
				    				+ "�߰� �Ǵ� �ָ��� ��� ������ ������ ���� �帮�ڽ��ϴ�.\n"
				    				+ "����:1800-3651 (���� 09~18��)\n"
				    				+ "��������\n"
				    				+ errorMsg;
				    		}

				    		alert(errorMsg.split("<br/>").join("\n"));
				    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
				    		fnCommon_goHome();
				    		*/
				    	}
			    	}
				},
				beforeSend : function() {
					ing.hide();
					fnCommon_LoadingLayer_04(true);
				},
				error: function(data, textStatus, error){
					fnCommon_LoadingLayer_04(false);
					fnCommon_SessionExpired();
		    		console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
		    		// alert(error);
		    		// fnCommon_goHome();
				},
				complete: function() {
					fnCommon_LoadingLayer_04(false);
/*
					// �ε� ����
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
*/
					/*
					$(".ajax-loading-icon")[0].style.removeProperty('background-image');
					*/
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			��ȸ ������ �� ����
			loanRenewal4_004.fnSearch_2_callback_y
		 -------------------------------------------------------------------------------------- */
		fnSearch_2_callback_y : function(){

			// �����ѵ���ȸ ��û - ������������ǰ��û
			loanRenewal4_004.fnSearch_2();
		},



		/* --------------------------------------------------------------------------------------
			��ȸ ������ �ƴϿ� ����
			loanRenewal4_004.fnSearch_2_callback_n
		 -------------------------------------------------------------------------------------- */
		fnSearch_2_callback_n : function(){
    		fnCommon_goHome();
		},



		/* --------------------------------------------------------------------------------------
			�����ѵ� ��ȸ
			loanRenewal4_004.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function(){

			iajax.clearParam();
			// ����� 5������ - ����
			//iajax.addParam("CHK_CSRF", random);
			// iajax.addParam("bankInspNo", bankInspNo);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_004_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"){

			    		// ��ȸ�� �ѵ���ȸ���
			    		var LNC3003_list = json.LNC3003_list;

						// �ѵ���ȸ��� ����Ʈ �׸���
						loanRenewal4_004.fnRenderList(LNC3003_list);

						// ���޹��� �������� �����Է°� ����
						company_nm = json.company_nm;  // �����
						year_amt = json.year_amt;  // ���ҵ�
						join_company_day = json.join_company_day;  // �Ի�����
						SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;  // ��ũ���� ����

			    	}else{
			    		alert("�����ѵ� ��ȸ�� �����Ͽ����ϴ�.");
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
			�ѵ���ȸ��� ����Ʈ �׸���
			loanRenewal4_004.fnRenderList
		 -------------------------------------------------------------------------------------- */
		fnRenderList : function( LNC3003_list ){

			var auto_count = 0;   // �ڵ����� ����
			var not_auto_count = 0;   // ��ȭ���� ����

			if( !fnCommon_isNull(LNC3003_list)  &&  LNC3003_list.length > 0 ){
				for(var i=0; i < LNC3003_list.length; i++){

					var LNC3003 = LNC3003_list[i];
					if( !fnCommon_isNull(LNC3003) ){

						var list_div_id = "";  // ����Ʈ�� �� ����
						var list_div_row_id = "";  // ����Ʈ �� ���� ����
						var list_choice_button = "";  // ���ù�ư

						// ��ǰ�ڵ�
//						var goods_CD = LNC3003.goods_CD;
						// ����� 5������ - �ʵ�� �빮�ڷ� ����
						var goods_CD = LNC3003.GOODS_CD;

						// ��ȯ�ѵ�
						var tranc_LIMIT = LNC3003.TRANC_LIMIT;
						var tranc_LIMIT_number = Number(tranc_LIMIT);
						var tranc_LIMIT_flag = false;

						// �ڵ������ǰ����
						var loan_GOODS_YN = LNC3003.LOAN_GOODS_YN;
						if( !fnCommon_isNull(loan_GOODS_YN)  &&  loan_GOODS_YN == "1" ){

							// �ڵ����� ����Ʈ�� �߰�
							list_div_id = "LNC3003_list_1";
							list_div_row_id = "list_1_div_";
							list_choice_button = "list_1_button_";
							auto_count++;

						}else{
							// ��ȭ���� ����Ʈ�� �߰�
							list_div_id = "LNC3003_list_2";
							list_div_row_id = "list_2_div_";
							list_choice_button = "list_2_button_";
							not_auto_count++;

							// ��ȭ�����̸� ��ȯ�ѵ� ���, 52301 �޻�� 52351 �¶����޻�� 52346 ���յ�2 ǥ�� �� ��ȯ�ѵ� �̻��
							if( (!fnCommon_isNull(tranc_LIMIT)  &&  ( fnCommon_isNull(goods_CD)  ||  (goods_CD != "52351"  &&  goods_CD != "52301"  &&  goods_CD != "52346"))) ){
								tranc_LIMIT_flag = true;
							}
						}

						var limit_AMT = LNC3003.LIMIT_AMT;  // �⺻�ѵ�
						var limit_AMT_number = Number(limit_AMT);

						// �⺻�ѵ� + ��ȯ�ѵ�
						// var sum = String(limit_AMT_number + tranc_LIMIT_number);

						// ��ȯ�ѵ��� ǥ���ϱ�� ��
						var sum = String(tranc_LIMIT_number);

						// �޸����
						limit_AMT = fnCommon_addComma(limit_AMT);
						tranc_LIMIT = fnCommon_addComma(tranc_LIMIT);
						var sum_string = fnCommon_addComma(sum);

						// �⺻�� ���� ����
						var html = "";
						html += '<li id="' + list_div_row_id + LNC3003.BANK_INSP_NO + '" name="list_div">';
						html += '<label class="styleChk" id="' + list_div_row_id + LNC3003.BANK_INSP_NO + '_label" name="label_box">';
						html += '<div class="loanBox roundBorder">';

						// 52351 �¶����޻�� �� �ڰݾȳ� �˾� �߰�
						if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52351" ){
							// �¶����޻��(52351)
							html += '<div class="loanTit">';
 							html += '<ul class="part">';
 							html += '<li> </li>';
 							html += '<li> </li>';
 							html += '</ul>';
							html += '<dl>';
							html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
							html += '<dd>�ſ� �� �ҵ������ ���� �������� ���� �������� �����ǰ</dd>';
							html += '</dl>';
							html += '<div class="btnWrap">';
							html += '<a href="#" id="call_CertLayer" class="btnText underLine" onclick="javascript:fnOpen_CertLayer();">�ڰݿ��</a>';
							html += '</div>';
							html += '</div>';
						}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52350" ){
							// �������߱ݸ�(����)(52350)
							html += '<div class="loanTit">';
							html += '<ul class="part">';
							html += '<li><span>�ɾ�</span></li>';
							html += '<li><span>�ָ�</span></li>';
							html += '</ul>';
							html += '<dl>';
							html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
							html += '<dd>���� ���� ���ѱ����׷��� �������� ���� �ڵ��ɻ� �ſ����</dd>';
							html += '</dl>';
							html += '</div>';
						}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52347" ){
							// ���յ�2(����)(52347)
							html += '<div class="loanTit">';
							html += '<ul class="part">';
							html += '<li><span>�ɾ�</span></li>';
							html += '<li><span>�ָ�</span></li>';
							html += '</ul>';
							html += '<dl>';
							html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
							html += '<dd>�����������湮 ���ﺸ������ �߱ݸ� �ſ����</dd>';
							html += '</dl>';
							html += '</div>';
						}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52332" ){
							// �����Ѱ���(52332)
							html += '<div class="loanTit">';
							html += '<ul class="part">';
							html += '<li><span>�ɾ�</span></li>';
							html += '<li><span>�ָ�</span></li>';
							html += '</ul>';
							html += '<dl>';
							html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
							html += '<dd>���� �ǰ����� �����ڸ� ���� �ڵ��ɻ� �ſ����</dd>';
							html += '</dl>';
							html += '</div>';
						}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52343" ){
							// ���ǵ���׷�(52343)
							html += '<div class="loanTit">';
							html += '<ul class="part">';
							html += '<li><span>�ɾ�</span></li>';
							html += '<li><span>�ָ�</span></li>';
							html += '</ul>';
							html += '<dl>';
							html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
							html += '<dd>������� ���� ���� �ڵ��ɻ� �ſ����</dd>';
							html += '</dl>';
							html += '</div>';
						}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52353" ){
							// �����ѽſ�(52353)
							html += '<div class="loanTit">';
							html += '<ul class="part">';
 							html += '<li> </li>';
 							html += '<li> </li>';
 							html += '</ul>';
							html += '<dl>';
							html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
							html += '<dd>�������� ���� �ſ����</dd>';
							html += '</dl>';
							html += '</div>';
						}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52346" ){
							// ���յ�2(52346)
							html += '<div class="loanTit">';
							html += '<ul class="part">';
 							html += '<li> </li>';
 							html += '<li> </li>';
 							html += '</ul>';
							html += '<dl>';
							html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
							html += '<dd>���ﺸ������ ���� �߱ݸ� �ſ����</dd>';
							html += '</dl>';
							html += '</div>';
						}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52301" ){
							// �޻��������(52301)
							html += '<div class="loanTit">';
							html += '<ul class="part">';
 							html += '<li> </li>';
 							html += '<li> </li>';
 							html += '</ul>';
							html += '<dl>';
							html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
							html += '<dd>�ſ� �� �ҵ������ ���� �������� ���� �������� �����ǰ</dd>';
							html += '</dl>';
							html += '</div>';
						}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52354" ){
							// ����Ʈ��׷�2(52354)
							html += '<div class="loanTit">';
							html += '<ul class="part">';
							html += '<li><span>�ɾ�</span></li>';
							html += '<li><span>�ָ�</span></li>';
 							html += '</ul>';
							html += '<dl>';
							html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
							html += '<dd>������� ���� ���� �ڵ��ɻ� �ſ����</dd>';
							html += '</dl>';
							html += '</div>';
						} else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52341" ) { // ������500(52341)
							html += '<div class="loanTit">';
							html += '<ul class="part">';
							html += '<li><span>�ɾ�</span></li>';
							html += '<li><span>�ָ�</span></li>';
 							html += '</ul>';
							html += '<dl>';
							html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
							html += '<dd>������ �̿� ������ �ڵ��ɻ� �ſ����</dd>';
							html += '</dl>';
							html += '</div>';
						} else {
							// �������߱ݸ�/�������߱ݸ�2
							html += '<div class="loanTit">';
							html += '<ul class="part">';
 							html += '<li> </li>';
 							html += '<li> </li>';
 							html += '</ul>';
							html += '<dl>';
							html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
							html += '<dd>�ҵ桤������ �췮�� ���� ���� �߱ݸ� �ſ����</dd>';
							html += '</dl>';
							html += '</div>';
						}

						html += '<div class="loanInfo">';
						html += '<dl>';
						html += '<dt>�ݸ�</dt>';
						html += '<dd>��<strong>' + LNC3003.NRML_RT + '</strong>%</dd>';
						html += '<dd><button class="ui-btn ui-shadow ui-corner-all" id="' + list_choice_button + LNC3003.BANK_INSP_NO + '"  style="display:none;">����</button></dd>';
						html += '</dl>';
						html += '<dl>';
						html += '<dt>�⺻�ѵ�</dt>';
						html += '<dd><strong>' + limit_AMT + '</strong>����</dd>';
						html += '</dl>';

						html += '</div>';
						html += '</div>';
						html += '<input type="checkbox"  id="' + list_choice_button + LNC3003.BANK_INSP_NO + '_checkbox" class="wa-style-chkbox">';
						html += '</label>';

	                    html += '<div class="loanForm" id="' + list_div_row_id + 'detail_' + LNC3003.BANK_INSP_NO + '" name="detail_box">';
	                    html += '</div>';


						html += '</div>';
						html += '</li>';


						$("#" + list_div_id).append( html );
						$("#" + list_div_row_id + LNC3003.BANK_INSP_NO).data( LNC3003 );  // ������ �ɾ�α�

						// �⺻+��ȯ�ѵ�
							$("#" + list_choice_button + LNC3003.BANK_INSP_NO).on("click", loanRenewal4_004.fnRenderDetail );

						// �⺻+��ȯ�ѵ��� ���� ��ǰ�� �ϳ� ���Ӱ� ����
						if(tranc_LIMIT_flag) {
							html = "";
							html += '<li id="' + list_div_row_id + 'TRANC_LIMIT_' + LNC3003.BANK_INSP_NO + '" name="list_div">';
							html += '<label class="styleChk" id="' + list_div_row_id + 'TRANC_LIMIT_'  + LNC3003.BANK_INSP_NO + '_label">';
							html += '<div class="loanBox roundBorder">';

							// 52351 �¶����޻�� �� �ڰݾȳ� �˾� �߰�
							if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52351" ){
								html += '<div class="loanTit">';
								html += '<ul class="part">';
	 							html += '<li> </li>';
	 							html += '<li> </li>';
	 							html += '</ul>';
								html += '<dl>';
								html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
								html += '<dd>�ſ� �� �ҵ������ ���� �������� ���� �������� �����ǰ</dd>';
								html += '</dl>';
								html += '<div class="btnWrap">';
								html += '<a href="#" id="call_CertLayer" class="btnText underLine" onclick="javascript:fnOpen_CertLayer();">�ڰݿ��</a>';
								html += '</div>';
								html += '</div>';
							}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52350" ){
								html += '<div class="loanTit">';
								html += '<ul class="part">';
								html += '<li><span>�ɾ�</span></li>';
								html += '<li><span>�ڵ�</span></li>';
								html += '</ul>';
								html += '<dl>';
								html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
								html += '<dd>���� ���� ���ѱ����׷��� �������� ���� �ڵ��ɻ� �ſ����</dd>';
								html += '</dl>';
								html += '</div>';
							}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52347" ){
								html += '<div class="loanTit">';
								html += '<ul class="part">';
								html += '<li><span>�ɾ�</span></li>';
								html += '<li><span>�ڵ�</span></li>';
								html += '</ul>';
								html += '<dl>';
								html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
								html += '<dd>�����������湮 ���ﺸ������ �߱ݸ� �ſ����</dd>';
								html += '</dl>';
								html += '</div>';
							}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52332" ){
								html += '<div class="loanTit">';
								html += '<ul class="part">';
								html += '<li><span>�ɾ�</span></li>';
								html += '<li><span>�ڵ�</span></li>';
								html += '</ul>';
								html += '<dl>';
								html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
								html += '<dd>���� �ǰ����� �����ڸ� ���� �ڵ��ɻ� �ſ����</dd>';
								html += '</dl>';
								html += '</div>';
							}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52343" ){
								html += '<div class="loanTit">';
								html += '<ul class="part">';
								html += '<li><span>�ɾ�</span></li>';
								html += '<li><span>�ڵ�</span></li>';
								html += '</ul>';
								html += '<dl>';
								html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
								html += '<dd>�������� ������� ���� ���� �ڵ��ɻ� �ſ����</dd>';
								html += '</dl>';
								html += '</div>';
							}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52353" ){
								html += '<div class="loanTit">';
								html += '<ul class="part">';
	 							html += '<li> </li>';
	 							html += '<li> </li>';
	 							html += '</ul>';
								html += '<dl>';
								html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
								html += '<dd>�������� ���� �ſ����</dd>';
								html += '</dl>';
								html += '</div>';
							}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52346" ){
								html += '<div class="loanTit">';
								html += '<ul class="part">';
	 							html += '<li> </li>';
	 							html += '<li> </li>';
	 							html += '</ul>';
								html += '<dl>';
								html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
								html += '<dd>���ﺸ������ ���� �߱ݸ� �ſ����</dd>';
								html += '</dl>';
								html += '</div>';
							}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52301" ){
								html += '<div class="loanTit">';
								html += '<ul class="part">';
	 							html += '<li> </li>';
	 							html += '<li> </li>';
	 							html += '</ul>';
								html += '<dl>';
								html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
								html += '<dd>�ſ� �� �ҵ������ ���� �������� ���� �������� �����ǰ</dd>';
								html += '</dl>';
								html += '</div>';
							}else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52354" ){
								html += '<div class="loanTit">';
								html += '<ul class="part">';
								html += '<li><span>�ɾ�</span></li>';
								html += '<li><span>�ڵ�</span></li>';
	 							html += '</ul>';
								html += '<dl>';
								html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
								html += '<dd>������� ���� ���� �ڵ��ɻ� �ſ����</dd>';
								html += '</dl>';
								html += '</div>';
								
							} else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52341" ) { // ������500(52341)
								html += '<div class="loanTit">';
								html += '<ul class="part">';
								html += '<li><span>�ɾ�</span></li>';
								html += '<li><span>�ڵ�</span></li>';
	 							html += '</ul>';
								html += '<dl>';
								html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
								html += '<dd>������ �̿� ������ �ڵ��ɻ� �ſ����</dd>';
								html += '</dl>';
								html += '</div>';
								
							} else{
								html += '<div class="loanTit">';
								html += '<ul class="part">';
	 							html += '<li> </li>';
	 							html += '<li> </li>';
	 							html += '</ul>';
								html += '<dl>';
								html += '<dt>' + LNC3003.GOODS_NM + '</dt>';
								html += '<dd>�ҵ桤������ �췮�� ���� ���� �߱ݸ� �ſ����</dd>';
								html += '</dl>';
								html += '</div>';
							}

							// �⺻+��ȯ�ѵ�
							html += '<div class="loanInfo">';
							html += '<dl>';
							html += '<dt>�ݸ�</dt>';
							html += '<dd>��<strong>' + LNC3003.NRML_RT + '</strong>%</dd>';
							html += '</dl>';
							html += '<dl>';
							html += '<dt>�⺻+<span style="color:blue;font-size:13px;">��ȯ</span>�ѵ�</dt>';
							html += '<dd><strong>' + sum_string + '</strong>����</dd>';
							html += '<dd><button class="ui-btn ui-shadow ui-corner-all" id="' + list_choice_button + 'TRANC_LIMIT_' + LNC3003.BANK_INSP_NO + '" style="display:none;">����</button></dd>';
							html += '</dl>';
							html += '</div>';
							html += '</div>';
							html += '<input type="checkbox" id="' + list_choice_button + 'TRANC_LIMIT_' + LNC3003.BANK_INSP_NO + '_checkbox" class="wa-style-chkbox">';
							html += '</label>';
		                    html += '<div class="loanForm" id="' + list_div_row_id + 'detail_' + 'TRANC_LIMIT_' + LNC3003.BANK_INSP_NO + '" name="detail_box">';
		                    html += '</div>';

							html += '</div>';
							html += '</li>';



							$("#" + list_div_id).append( html );
							$("#" + list_div_row_id + 'TRANC_LIMIT_' + LNC3003.BANK_INSP_NO).data( LNC3003 );  // ������ �ɾ�α�

							$("#" + list_choice_button + "TRANC_LIMIT_" + LNC3003.BANK_INSP_NO).on("click", loanRenewal4_004.fnRenderDetail );
						}
					}
				}
			}

			// �ڵ����� ����
			if( fnCommon_isNull(auto_count)  ||  auto_count < 1 ){
				$("#LNC3003_list_1_NO").show();
			} else {

			}

			// ��ȭ���� ����
			if( fnCommon_isNull(not_auto_count)  ||  not_auto_count < 1 ){
				$("#LNC3003_list_2_NO").show();
			}else {

			}

    		// ����� 5������ - �ε���
			//ing.hide();
			fnCommon_LoadingLayer_04(false);
		},



		/* --------------------------------------------------------------------------------------
			�¶����޻�� �ڰ�Ȯ�� �˾�
			loanRenewal4_004.fnShowPopup_1
		 -------------------------------------------------------------------------------------- */
		fnShowPopup_1 : function(){

			// �޼��� �˾�
    		var msg = "";

    		msg += "<p>";
    		msg += "<span style='font-family:NotoSans-Medium;'>�޻�� ������</span><br/>";
    		msg += "�� ���� 3���� �̻� �ټ����� ������ ��<br/>";
    		msg += "���ҵ� 3,500���� ���� �Ǵ�<br/>";
    		msg += "���ҵ� 4,500���� ���� & ���α�������� 6��� ����<br/><br/>";

    		msg += "<span style='font-family:NotoSans-Medium;'>�¶����޻�� �󼼿��</span><br/>";
    		msg += "1. �� ���� <span style='font-family:NotoSans-Medium; color:#e84736'>�ֱ� �ǰ������ 3����</span>�̻� ���󳳺�<br/>";
    		msg += "2. <span style='font-family:NotoSans-Medium; color:#e84736'>���� �̺���</span><br/>";
    		msg += "3. <span style='font-family:NotoSans-Medium; color:#e84736'>������, ���θ��� �޴���</span> ����<br/><br/>";

    		msg += "�� �¶����޻���� ��û�� ���<br/>";
    		msg += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;���� �޻�� ��� �ݸ��� <span style='font-family:NotoSans-Medium; color:#e84736'>1.3%p</span> ���ϵ˴ϴ�.";
    		msg += "</p>";

			fnCommon_popup("open", msg);
		},



		/* --------------------------------------------------------------------------------------
			���� ��ư Ŭ���� �Է� ���� �����ֱ�
			loanRenewal4_004.fnRenderDetail
		 -------------------------------------------------------------------------------------- */
		fnRenderDetail : function(e){
//			console.log("e.target.id=" + e.target.id);
//			console.log(e.target.id.replace("button", "div"));
			var temp_label_id = e.target.id.replace("button", "div") + "_label";
			console.log("temp_label_id=" + temp_label_id);
			console.log('if(!$("#" + temp_label_id).hasClass("checked"))=' + $("#" + temp_label_id).hasClass("checked"));
//			console.log(temp_label_id);
//			console.log($("#" + temp_label_id).hasClass("checked"));
			if(!$("#" + temp_label_id).hasClass("checked")) {
				// �󼼺��� �� ��� ���ֱ�
				$("div[name='detail_box']").hide();
				$("div[name='detail_box']").html("");
				$("label[name='label_box']").removeClass("checked");

				// ����ȿ�� ���ֱ�
				$(".limit_select").removeClass("choice");
				// $("div[name='list_div']").removeClass("choice");


				var id = e.target.id;
				console.log("e.target.id=" + e.target.id);
				if( !fnCommon_isNull(id) ){

					// 1 �ڵ����� 2 ��ȭ����  �� ����
					var type_num = "1";
					if(id.indexOf("list_2_button_") > -1){
						type_num = "2";
					}

					// ���������û��ȣ ����
					var bank_INSP_NO = id.replace("list_" + type_num + "_button_", "");

					// ��ȯ�ѵ� ����
					var tranc_LIMIT_flag = false;
					if(id.indexOf("TRANC_LIMIT_") > -1){
						tranc_LIMIT_flag = true;
						// PC Web������ �⺻+��ȯ�� �ϳ��� ��ǰ���� ����ϹǷ�...TRANC_LIMIT_����
						// bank_INSP_NO = bank_INSP_NO.replace("TRANC_LIMIT_", "");
					}

					if( !fnCommon_isNull(bank_INSP_NO) ){

						// �ɾ�� ������ ����
						var list_div_row_id = "list_" + type_num + "_div_" + bank_INSP_NO;
						//if(tranc_LIMIT_flag) {
							//list_div_row_id = "list_" + type_num + "_div_TRANC_LIMIT_" + bank_INSP_NO;
						//}

						var LNC3003 = $("#" + list_div_row_id).data();

						// ���õ� LNC3003
						// ��ȯ������ ��ȸ�� ���.
						selected_LNC3003 = LNC3003;

						// �����ѵ�
						var limit_AMT = LNC3003.LIMIT_AMT;
						var limit_AMT_number = Number(limit_AMT) * 10000;

						// ��ǰ�ڵ�
						var LNC3003_goods_CD = LNC3003.GOODS_CD;

						if( LNC3003_goods_CD == null || LNC3003_goods_CD == "" ){
							alert("������ ��ǰ�� �����ϴ�. \n��1800-3651�� �����ּ���.");
							fnCommon_goHome();							
						}
						
						
						// ��ȯ ������ �˾��� ����Ⱓ ������ ���� �� ����
						// LOAN2104.jsp�� ����
						fnSet_ScheduleLoanPeriod(LNC3003_goods_CD);

						// ��ǰ�� �ð��ȳ�
						var goods_time_coment = "";

						// �ڵ����⿡�� �ִ� ��ǰ����
						// 52350 �������߱ݸ�(����), 52347 ���յ�2(����Ҿ�), 52332 �����Ѱ������ 9:30, 52341 ������500
						if( !fnCommon_isNull(LNC3003_goods_CD)  &&  (LNC3003_goods_CD == "52350" || LNC3003_goods_CD == "52347" || LNC3003_goods_CD == "52332" || LNC3003_goods_CD == "52343" || LNC3003_goods_CD == "52354" || LNC3003_goods_CD == "52341") ){
							goods_time_coment = "��� ���� �Ϸ��Ͻø� ���� �۱ݵ˴ϴ�. (��, 23��~02�ÿ��� �ý��� ���˽ð����� �۱ݺҰ�)";

						// 52351 �¶����޻�� 6:00
						}else if( !fnCommon_isNull(LNC3003_goods_CD)  &&  LNC3003_goods_CD == "52351" ){
							goods_time_coment = "18�ñ��� ��� ���� �Ϸ��Ͻø� ���� �۱ݵ˴ϴ�. (��, �񿵾����� ��� �Ϳ����� 08�� ���� ���� �۱�)";
						}

						var detail_id = "list_" + type_num + "_div_detail_" + bank_INSP_NO;   // ���õ� �׸� ���� ���Է� ����
						var max_amt_id = "list_" + type_num + "_div_detail_max_amt_" + bank_INSP_NO;   // �ִ�ݾ� üũ�ڽ�
						var send_button_id = "list_" + type_num + "_detail_send_" + bank_INSP_NO;  // ��û�ϱ��ư
						var delete_button_id = "list_" + type_num + "_detail_delete_" + bank_INSP_NO;  // ������ư
						var input_id = "list_" + type_num + "_input_amt_" + bank_INSP_NO;  // ��û�ݾ� �Է¿���
						var man_id = "list_" + type_num + "_input_amt_man_" + bank_INSP_NO;  // ��û�ݾ� ������ ��ȯ����
						var textarea_id = "list_" + type_num + "_textarea_amt_" + bank_INSP_NO;  // ��㳻�� �Է¿���
						var expect_repay_amt_it = "list_" + type_num + "_strong_amt_" + bank_INSP_NO;  // 

						var checkbox_label_id = "list_" + type_num + "_div_" + bank_INSP_NO + "_label";  // 

						// ����Ⱓ select id
						var select_label_id = "list_" + type_num + "_div_" + bank_INSP_NO + "_select";  // 
						var schedule_button_id = "list_" + type_num + "_btn_" + bank_INSP_NO + "_schedule";

						// ��ȯ�ѵ�
						var html = "";

						// �ڵ������� ��û���� ���⶧���� �Էµ� �ݾ��̳� �޸𳻿��� �ǹ̰� ����. �Է¿��� �������ʰ��ϰ� ��ư�� �츮��� ����(������ ����)
						// 1 �ڵ����� 2 ��ȭ����
						if(type_num == "1"){
							html += "  	<div class='limit_check' style='display:none;'>�ִ�ݾ�<div class='limit_check_box'><input type='checkbox' id='" + max_amt_id + "' name='agree_chk' class='checkBox'></div></div>				  ";
							html += "  	<div class='limit_input' style='padding-bottom: 0px;'>				  ";
							html += "  		<ul>			  ";
							html += "  			<li><div class='ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset' style='display:none;'>		  ";
							html += "  				  <input type='tel' id=" + input_id + " maxlength='10' name='input_won' value='" + limit_AMT_number + "' placeholder='��û�ݾ� �Է� (������)' title='��û�ݾ�'></div>		  ";
							html += "  			<p class='' style='display:none;'>��</p></li>		  ";
							html += "  		</ul>			  ";
							html += "  		<ul>			  ";
							html += "  			<li style='display:none;'><span id='" + man_id + "' name='input_manwon'></span>����</li>		  ";
							html += "  		</ul>			  ";
							html += "  	</div>				  ";
							html += "  	<div class='limit_textarea' style='display:none;'><textarea id=" + textarea_id + " class='textarea ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow' placeholder='(����) �ñ��� �� �� ��� ������ �������ּ���.'></textarea></div>				  ";
							html += '<p class="alignCenter mb30">"'+goods_time_coment +'"</p>';
		                    html += '<div class="btnWrap alignCenter">';
		                    html += '<button type="button" class="btn btnLarge btnActive" id="' + send_button_id + '">�����û�ϱ�</button>';

						}else{

							html += '<div class="styleTbl">';
							html += '<table class="rowType01 noline">';
							html += '<caption class="blind">���̺���</caption>';
							html += '<colgroup>';
							html += '<col style="width:145px;">';
							html += '<col>';
							html += '<col style="width:145px;">';
							html += '<col>';
							html += '</colgroup>';
							html += '<tbody>';
							html += '<tr>';
							html += '<th scope="row">��û�ݾ�</th>';
							html += '<td colspan="3">';
							html += '<div class="inputWrap">';
							html += '<span>';
							html += '<input type="tel" id="' + input_id + '" maxlength="10" name="input_won" class="styleText num" style="width:235px;" placeholder="��û�ݾ� �Է� (������)" title="��û�ݾ�">';
							html += '<i class="text" id="' + man_id + '" name="input_manwon">��</i>';
							html += '</span>';
							html += '<span class="btn"><label class="styleChk"><input type="checkbox" id="' + max_amt_id + '" name="agree_chk" class="wa-style-chkbox"><span>�ִ�ݾ�</span></label></span>';
							html += '</div>';
							html += '</td>';
							html += '</tr>';
							html += '<tr>';
							html += '<th scope="row">�Ⱓ</th>';
							html += '<td>';
							html += '<div class="inputWrap">';
							html += '<span>';
							html += '<select class="styleSelect" style="width:235px;" id="' + select_label_id + '" title="�Ⱓ">'; 
							// �¶����޻��, �޻��������
							if(LNC3003_goods_CD == "52351" || LNC3003_goods_CD == "52301") {
								html += '<option value="36">36����</option>';
								html += '<option value="60">60����</option>';
							} else if(LNC3003_goods_CD == "52341") {
								html += '<option value="12">12����</option>';
								html += '<option value="18">18����</option>';
								html += '<option value="24">24����</option>';
							} else {

								html += '<option value="12">12����</option>';
								html += '<option value="24">24����</option>';
								html += '<option value="36">36����</option>';
								html += '<option value="48">48����</option>';
								html += '<option value="60">60����</option>';
							}
							html += '</select>';
							html += '</span>';
							html += '</div>';
							html += '</td>';
							html += '<th scope="row">��ȯ���</th>';
							html += '<td>';
							html += '<div class="inputWrap">';
							if(LNC3003_goods_CD == "52351" || LNC3003_goods_CD == "52301") {
								html += '<span><input type="text" class="styleText" style="width:235px;" title="���ݱյ��ȯ" value="���ݱյ��ȯ" readonly="readonly" id="return_type_method"></span>';
							} else {
								html += '<span><input type="text" class="styleText" style="width:235px;" title="�����ݱյ��ȯ" value="�����ݱյ��ȯ" readonly="readonly"  id="return_type_method"></span>';
							}
							html += '</div>';
							html += '</td>';
							html += '</tr>';
							html += '</tbody>';
							html += '</table>';
							html += '</div>';
							html += '<div class="btnWrap alignCenter mt20">';
							html += '<button type="button" class="btn btnLarge btnActive" onclick="javascript:fnSearch_RepayAmt(\'' + type_num + '\',\'' + tranc_LIMIT_flag + '\');">�� ���Աݾ� ��ȸ</button>';
							html += '</div>';
							html += '<div class="loanExpect">';
							html += '<dl>';
							if(LNC3003_goods_CD == "52351" || LNC3003_goods_CD == "52301") {
								html += '<dt>���� �� ���Աݾ�</dt>';
							} else {
								html += '<dt>���� �� ���Աݾ�</dt>';
							}
							html += '<dd><strong id="' + expect_repay_amt_it + '"></strong>��';
							html += '<div class="btnWrap">';
							html += '<button type="button" id="'+schedule_button_id+'" class="btnText iconQuestion" onclick="javascript:fnOpen_PopSchedule(\'' + type_num + '\',\'' + tranc_LIMIT_flag + '\'); ">��ȯ������ ��ȸ</button>';
							html += '</dd></div>';
							html += '</dl>';
							html += '<div class="textBox">';
							if(!fnCommon_isNull(LNC3003.LOAN_GOODS_YN) && LNC3003.LOAN_GOODS_YN == 0) {
								if( LNC3003_goods_CD == "52301" ){
									html += '<p>�޻���� ���α���������� �����ϴ� ��ǰ���� ����ݾװ� ����Ⱓ�� ���� �� 2%�� �����Ḧ ��������Ͽ� �ϰ� �����մϴ�.</p>';
								}
							}
							html += '<p>���� �� ���Աݾ��� ���� ���Աݾװ� ���̰� �� �� �ֽ��ϴ�. ���ݱյ��ȯ �� �����Աݾ��� �����˴ϴ�.</p>';
							html += '<p>�ּ� ��û�ݾ��� 3�鸸�� �Դϴ�. ��, �޻�� ������ �ּ� ��û�ݾ��� 5�鸸�� �̻��̸�, �鸸�� ������ ��޵˴ϴ�.</p>';
							html += '<p>�ڼ��� ����� ���Ͻ� ���, ��㼾��(��1800-3651)�� ������Ź�帳�ϴ�.</p>';
							html += '</div>';
							html += '<div class="textArea">';
							html += '<textarea id="' + textarea_id + '" title="(����) ������ ���ǳ����� �����ּ���" placeholder="(����) ������ ���ǳ����� �����ֽø� ��� �� ������ �� �� �ֽ��ϴ�."></textarea>';
							html += '</div>';
							html += '</div>';
							html += '<div class="btnWrap alignCenter">';
							html += '<button style="margin-top:10px;" type="button" class="btn btnLarge btnActive" id="' + send_button_id + '">�����û�ϱ�</button>';
							html += '</div>';

						}

						// ȭ�鿡 ����
						$("#" + detail_id).html(html).trigger("create");

						// �ִ�ݾ� üũ�ڽ� �̺�Ʈ ����
						$("#" + max_amt_id).on("click", loanRenewal4_004.fnClick_maxAmt );

						// ��û�ϱ� ��ư �̺�Ʈ ����
						$("#" + send_button_id).on("click", loanRenewal4_004.fnSend_detail_1 );

						// ���� ��ư �̺�Ʈ ����
						$("#" + delete_button_id).on("click", loanRenewal4_004.fnDelete_detail );

						// ��û�ݾ� �Է¿��� �Է��̺�Ʈ ����
						$("#" + input_id).on("keyup", loanRenewal4_004.fnKeyup_inputAmt );

						// ���� ȿ���ֱ�
						//var parent = $("#" + id).parent();
						//parent.addClass("choice");

						// ���Է¶� ����
						//$("#" + detail_id).show();
						$("#" + checkbox_label_id).addClass("checked");
						$("#" + detail_id).show();
					}
				}
			} else {
				$("div[name='detail_box']").hide();
				$("div[name='detail_box']").html("");
				$("label[name='label_box']").removeClass("checked");

				$("#" + temp_label_id).removeClass("checked")
			}
		},



		/* --------------------------------------------------------------------------------------
			�ִ�ݾ� üũ�ڽ� �̺�Ʈ
			loanRenewal4_004.fnClick_maxAmt
		 -------------------------------------------------------------------------------------- */
		fnClick_maxAmt : function(e){

			// Ȥ�� �𸣴ϱ� �ʱ�ȭ ó�� ����
			$("input[type='tel'][name='input_won']").val("");  // ��
			$("span[name='input_manwon']").parent().hide();  // ����
			$("span[name='input_manwon']").html("");

			// üũ�϶� �ѵ� �ִ밪 �ڵ�����
			var checked = e.currentTarget.checked;
			console.log('checked=' + checked);

			// üũ ǥ�� css ����
			if(checked) {
				$("#" + e.target.id).parent().addClass("checked");
			} else {
				$("#" + e.target.id).parent().removeClass("checked");
			}

			if(!fnCommon_isNull(checked, "boolean")){

				var max_amt_id = e.target.id;
				var bank_INSP_NO = "";  // ���� ��û��ȣ

				// 1 �ڵ����� 2 ��ȭ����  �� ����
				var type_num = "1";
				if( !fnCommon_isNull(max_amt_id)  &&  max_amt_id.indexOf("list_2_div_detail_max_amt_") > -1){
					type_num = "2";

					// ���� ��û��ȣ ����
					bank_INSP_NO = max_amt_id.replace("list_2_div_detail_max_amt_", "");

				}else{
					// ���� ��û��ȣ ����
					bank_INSP_NO = max_amt_id.replace("list_1_div_detail_max_amt_", "");
				}

				// ��ȯ�ѵ� ����
				var tranc_LIMIT_flag = false;
				if( !fnCommon_isNull(bank_INSP_NO)  &&  bank_INSP_NO.indexOf("TRANC_LIMIT_") > -1 ){
					tranc_LIMIT_flag = true;
					//bank_INSP_NO = bank_INSP_NO.replace("TRANC_LIMIT_", "");
				}

				// �θ�â�� �ɾ�� ������ ����
				var list_div_row_id = "list_" + type_num + "_div_" + bank_INSP_NO;
				var LNC3003 = $("#" + list_div_row_id).data();
				if( !fnCommon_isNull(LNC3003) ){

					// ��ȯ�ѵ�
					var tranc_LIMIT = LNC3003.TRANC_LIMIT;
					var tranc_LIMIT_number = 0;
					if( !fnCommon_isNull(tranc_LIMIT) ){
						tranc_LIMIT_number = Number(tranc_LIMIT) * 10000;
					}

					// �⺻�ѵ�
					var limit_AMT = LNC3003.LIMIT_AMT;
					var limit_AMT_number = Number(limit_AMT) * 10000;
					var limit_AMT_comma = "";   // �޸��߰��� ���ڿ�

					// ���� ��ư�� ��ȯ�ѵ�������
					if(tranc_LIMIT_flag){

						// ��ȯ�ѵ� ���
						limit_AMT_number = tranc_LIMIT_number;
					}

					if(limit_AMT_number > 0){

						// �޸����
						limit_AMT_comma = fnCommon_addComma( String(limit_AMT_number) );

						// ��û�ݾ� �Է¿����� �ڵ�����
						var input_id = "list_" + type_num + "_input_amt_" + bank_INSP_NO;
						$("#" + input_id).val(limit_AMT_comma);

						if(limit_AMT_number > 10000){

							var manwon_int = parseInt(limit_AMT_number/10000);
							if(manwon_int > 0){

								// �޸����
								limit_AMT_comma = fnCommon_addComma( String(manwon_int) );

								// ��û�ݾ� ������ ��ȯ����
								//var man_id = "list_" + type_num + "_input_amt_man_" + bank_INSP_NO;
								//$("#" + man_id).html( limit_AMT_comma );
								//$("#" + man_id).parent().show();
							}
						}
					}

				}
			}
		},



		/* --------------------------------------------------------------------------------------
			��û�ݾ� �Է¿��� �Է�
			loanRenewal4_004.fnKeyup_inputAmt
		 -------------------------------------------------------------------------------------- */
		fnKeyup_inputAmt : function(e){

			// �������� Ȥ�� �𸣴ϱ� �ʱ�ȭ ó�� ����
			$("span[name='input_manwon']").parent().hide();
			$("span[name='input_manwon']").html("");

			var id = e.target.id;
			var value = $("#" + id).val();

			if( !fnCommon_isNull(value) ){

				// ���ڿ� ���� �� ���ڸ� ��ȯ
				value = fnCommon_getOnlyNumber(value);
				var value_number = Number(value);
				if(value_number > 0){

					// �޸����
					var value_format = fnCommon_addComma(value);
					$("#" + id).val( value_format );

					if(value_number > 10000){
						value_number = parseInt( value_number/10000 );   // �������� ���� ����
						if(value_number > 0){
							value = String(value_number);

							// �޸����
							value_format = fnCommon_addComma(value);

							// �� ������ �Ѱ����ۿ� �������� �����ϱ�
							$("span[name='input_manwon']").parent().show();
							$("span[name='input_manwon']").html(value_format);
						}
					}
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			��û�ϱ� ��ư Ŭ�� - �Է°� ���Ǻ���
			loanRenewal4_004.fnSend_detail_1
		 -------------------------------------------------------------------------------------- */
		fnSend_detail_1 : function(e){
			var send_button_id = e.target.id;
			var bank_INSP_NO = "";  // ���� ��û��ȣ

    		// �� ����
			// ����� 5������ - PC Web�� ����
    		// var isApp_flag = fnCommon_isApp();

			// 1 �ڵ����� 2 ��ȭ����  �� ����
			var type_num = "1";
			if( !fnCommon_isNull(send_button_id)  &&  send_button_id.indexOf("list_2_detail_send_") > -1){
				type_num = "2";

				// ���� ��û��ȣ ����
				bank_INSP_NO = send_button_id.replace("list_2_detail_send_", "");

			}else{
				// ���� ��û��ȣ ����
				bank_INSP_NO = send_button_id.replace("list_1_detail_send_", "");
			}

			// ��ȯ�ѵ� ����
			var TRANC_LIMIT_flag = false;
			var TRANC_YN = "0";   // ��ȯ���� 1 ��ȯ 0 ��ȯ�ƴ�
			if( !fnCommon_isNull(bank_INSP_NO)  &&  bank_INSP_NO.indexOf("TRANC_LIMIT_") > -1 ){
				// PC Web������ �⺻+��ȯ���ε� �ϳ��� ��ǰ���� ����ϹǷ�...TRANC_LIMIT�� ����
				//bank_INSP_NO = bank_INSP_NO.replace("TRANC_LIMIT_", "");
				TRANC_LIMIT_flag = true;
				TRANC_YN = "1";   // 1 ��ȯ
			}

			// �θ�â�� �ɾ�� ������ ����
			var list_div_row_id = "list_" + type_num + "_div_" + bank_INSP_NO;
			var LNC3003 = $("#" + list_div_row_id).data();
			if( !fnCommon_isNull(LNC3003) ){
				// �������� ���������ʰ� null ��üó��
				/*
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
				if( LNC3003.ad_VIEW_YN == null ){  LNC3003.ad_VIEW_YN = "";  }
				if( LNC3003.scrp_NHIS == null ){  LNC3003.scrp_NHIS = "";  }
				if( LNC3003.scrp_MINWON24 == null ){  LNC3003.scrp_MINWON24 = "";  }
				if( LNC3003.tranc_LIMIT == null ){  LNC3003.tranc_LIMIT = "";  }
				if( LNC3003.tranc_RT == null ){  LNC3003.tranc_RT = "";  }
				if( LNC3003.loan_GOODS_YN == null ){  LNC3003.loan_GOODS_YN = "";  }
				*/
				// �������� ���������ʰ� null ��üó��
				if( LNC3003.SUNSHINELOAN_YN == null ){  LNC3003.SUNSHINELOAN_YN = "";  }
				if( LNC3003.CUST_NO == null ){  LNC3003.CUST_NO = "";  }
				if( LNC3003.BANK_INSP_NO == null ){  LNC3003.BANK_INSP_NO = "";  }
				if( LNC3003.GOODS_NM == null ){  LNC3003.GOODS_NM = "";  }
				if( LNC3003.NRML_RT == null ){  LNC3003.NRML_RT = "";  }
				if( LNC3003.AUTOLOAN_YN == null ){  LNC3003.AUTOLOAN_YN = "";  }
				if( LNC3003.ONLINE_SUNSHINELOAN_YN == null ){  LNC3003.ONLINE_SUNSHINELOAN_YN = "";  }
				if( LNC3003.SGI_AGR_YN == null ){  LNC3003.SGI_AGR_YN = "";  }
				if( LNC3003.GOODS_CD == null ){  LNC3003.GOODS_CD = "";  }
				if( LNC3003.CO_NM == null ){  LNC3003.CO_NM = "";  }
				if( LNC3003.YOUTH_GUIDE_YN == null ){  LNC3003.YOUTH_GUIDE_YN = "";  }
				if( LNC3003.HAC_CD == null ){  LNC3003.HAC_CD = "";  }
				if( LNC3003.RGST_NO == null ){  LNC3003.RGST_NO = "";  }
				if( LNC3003.ENTC_DT == null ){  LNC3003.ENTC_DT = "";  }
				if( LNC3003.CUST_NM == null ){  LNC3003.CUST_NM = "";  }
				if( LNC3003.PRIORITY == null ){  LNC3003.PRIORITY = "";  }
				if( LNC3003.LIMIT_AMT == null ){  LNC3003.LIMIT_AMT = "";  }
				if( LNC3003.REDU_RT == null ){  LNC3003.REDU_RT = "";  }
				if( LNC3003.HAF_CD == null ){  LNC3003.HAF_CD = "";  }
				if( LNC3003.HAE_CD == null ){  LNC3003.HAE_CD = "";  }
				if( LNC3003.INSR_YN == null ){  LNC3003.INSR_YN = "";  }
				if( LNC3003.RED_CD == null ){  LNC3003.RED_CD = "";  }
				if( LNC3003.RESID_ADDR_SELF_YN == null ){  LNC3003.RESID_ADDR_SELF_YN = "";  }
				if( LNC3003.HM_ADDR_TY == null ){  LNC3003.HM_ADDR_TY = "";  }
				if( LNC3003.LIV_POSTNO == null ){  LNC3003.LIV_POSTNO = "";  }
				if( LNC3003.LIV_ADDR1 == null ){  LNC3003.LIV_ADDR1 = "";  }
				if( LNC3003.LIV_ADDR2 == null ){  LNC3003.LIV_ADDR2 = "";  }
				if( LNC3003.LIV_STRUT_MG_NO == null ){  LNC3003.LIV_STRUT_MG_NO = "";  }
				if( LNC3003.REAL_ADDR_TY == null ){  LNC3003.REAL_ADDR_TY = "";  }
				if( LNC3003.REAL_POSTNO == null ){  LNC3003.REAL_POSTNO = "";  }
				if( LNC3003.REAL_ADDR1 == null ){  LNC3003.REAL_ADDR1 = "";  }
				if( LNC3003.REAL_ADDR2 == null ){  LNC3003.REAL_ADDR2 = "";  }
				if( LNC3003.REAL_STRUT_MG_NO == null ){  LNC3003.REAL_STRUT_MG_NO = "";  }
				
				if( LNC3003.AD_VIEW_YN == null ){  LNC3003.AD_VIEW_YN = "";  }
				if( LNC3003.SCRP_NHIS == null ){  LNC3003.SCRP_NHIS = "";  }
				if( LNC3003.SCRP_MINWON24 == null ){  LNC3003.SCRP_MINWON24 = "";  }
				if( LNC3003.TRANC_LIMIT == null ){  LNC3003.TRANC_LIMIT = "";  }
				if( LNC3003.TRANC_RT == null ){  LNC3003.TRANC_RT = "";  }
				if( LNC3003.LOAN_GOODS_YN == null ){  LNC3003.LOAN_GOODS_YN = "";  }
				
				if( LNC3003.IN_BANK_CD == null ){  LNC3003.IN_BANK_CD = "";  }	// �Ա�����
				if( LNC3003.IN_ACCO_NO == null ){  LNC3003.IN_ACCO_NO = "";  }	// �Աݰ��¹�ȣ

				// ���õ� ��ǰ object �ӽú���
				LNC3003_selected = LNC3003;

				var goods_CD = LNC3003.GOODS_CD;   // ��ǰ�ڵ�
				var REQ_AMT = $("#list_" + type_num + "_input_amt_" + bank_INSP_NO).val();   // �����û�ݾ�
				var MEMO = $("#list_" + type_num + "_textarea_amt_" + bank_INSP_NO).val();   // ��㳻��

				// ���ڿ� ���� �� ���ڸ� ��ȯ
				REQ_AMT = fnCommon_getOnlyNumber(REQ_AMT);

				// �ڵ�����/��ȭ���� ��û��ư Ŭ���� ��ȿ�� üũ
				var result = loanRenewal4_004.fnSend_detail_1_validation( LNC3003, REQ_AMT, MEMO, TRANC_LIMIT_flag );
				if(!result){
					return false;
				}


				//  -------------------  1 �ڵ�����
				if(type_num == "1"){

					// �Է°��� �����û���ۼ� ȭ������ ������ ���� ���ǿ� ����
					loanRenewal4_004.fnSave_3(LNC3003, REQ_AMT, MEMO);

				//  -------------------  2 ��ȭ����
				}else{

					// ��ǰ�ڵ�
					var goods_CD = LNC3003.GOODS_CD;

					iajax.clearParam();
					// ����� 5������ - ����
					//iajax.addParam("CHK_CSRF", random);
					iajax.addParam("CUST_NO", LNC3003.CUST_NO);
					iajax.addParam("GOODS_CD", LNC3003.GOODS_CD);
					iajax.addParam("REQ_AMT", REQ_AMT);   // �����û�ݾ�
					iajax.addParam("BANK_INSP_NO", BANK_INSP_NO_key);   // ���������û��ȣ
					iajax.addParam("SEND_MSG", "Y");   // ��༭�ۼ�(���ھ���) �������� ��� ���� �۽�
					iajax.addParam("MEMO", MEMO);   // ���� �Է��� ��㳻��
					iajax.addParam("REQ_GB", "3");  // ��û���� 1 ��ȭ��û 2 �ڵ����� 3 �ڵ���û���ɿ���(���������ȭ����) 4 �ڵ���û 5 �¶����޻�п��������ѽ�û 6 �ڵ���û���ۼ�
					iajax.addParam("TRANC_YN", TRANC_YN);   // ��ȯ���� 1 ��ȯ 0 ��ȯ�ƴ�
					iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// ������D �űԴ����(�ֵ�Դ�) �Ķ���� ����

					// iajax ������ ���� parameter �߰�
					// ����� 5������ - ����
					//fnCommon_partnerData();

					$.ajax({
					    type: "post",
					    url: callURL_requestLNC3004,
					    dataType: "json",
					    data: iajax.postparam,
					    success: function(json){
							if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"  ){

							/*
					    		// ��û��� �ȳ� ȭ�鿡�� ���⿵�� ����
					    		var type = "3";

								// 52301 �޻��������
						    	if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52301" ){
						    		type = "3";  // �⺻���� ����

						    	}else{
					    			// �� & �ǰ����轺ũ�������� ����  or  ��ũ���� ���� ����
					    			//if( isApp_flag  &&  ((!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")  ||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y")) ){
						    		if( ((!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")  ||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y")) ){
							    		type = "3";  // �⺻���� ����
					    			}else{
							    		type = "2";  // �¶��� �������� ��ư ���̵���
					    			}
						    	}
							*/
								
								// �ڵ����Ⱑ�ɿ���
								var autolaonPsbYn = json.DATA.AUTOLOAN_PSB_YN;
								
								var type = "3";
								if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "3"){
									type = "2";
								}

								var data_list = [
//						    		             { "key" : "view_name", "value" : "loanRenewal4_013" }   // �����û�� �����Ǿ����ϴ�.
						    		             { "key" : "view_name", "value" : "/lo/LOAN2113.jsp" }   // �����û�� �����Ǿ����ϴ�.
						    		           , { "key" : "title", "value" : "��û���" }
									           , { "key" : "parent", "value" : "IB" }
									           , { "key" : "topMenu", "value" : "IB_REQ" }
									           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
						    		           , { "key" : "type", "value" : type }   // 1 �ۼ�ġ�ϱ�, 2 �¶��μ��������ϱ� 3 �⺻ 4 �̾�����ϱ� 5 ����Ұ��ȳ�
				                    ];

				    			// renewal4 ���� url ȣ��
				    			fnCommon_callUrl( data_list );

					    		// ��û�Ϸ� �ȳ� �̵�
					    		// loanRenewal4_004.fnNext_thanks( LNC3003, json.DATA.REQ_AMT, json.DATA.AUTOLOAN_PSB_YN );

					    	}else{

					    		// ����Ұ��ȳ�
					    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
						    		loanRenewal4_004.fnGoNextSorryStep();

					    		}else{

									// 52351 �¶����޻��
									if( !fnCommon_isNull(LNC3003.GOODS_CD)  &&  LNC3003.GOODS_CD == "52351" ){

										// �¶����޻�п��������ѽ�û
										loanRenewal4_004.fnSave_1(LNC3003, REQ_AMT, MEMO);

									}else{
							    		var errorMsg = json.RESULT_DESC;
										alert(errorMsg.split("<br/>").join("\n"));
									}
					    		}
					    	}
						},
						beforeSend : function() {
							ing.show();
						},
						error: function(data, textStatus, error){
							ing.hide();
							// alert(error);
							fnCommon_SessionExpired();
							log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
						},
						complete: function(){
							ing.hide();
						}
					});
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			�ڵ����� ��û�ϱ� Ŭ���� �������Է°� ���Ǻ���
			loanRenewal4_004.fnSave_3
		 -------------------------------------------------------------------------------------- */
		fnSave_3 : function(LNC3003, REQ_AMT, MEMO){

			// TOBE - �Է°��� �����û���ۼ� ȭ������ ������ ���� ���ǿ� ����
			iajax.clearParam();
			//iajax.addParam("CHK_CSRF", random);
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
						// �޴��� ��������  or  ���� �޴��� �����̷� ������ ���ʿ�				
						var view_name = "";
						var title = "";
						var data_list;
						
						if( (!fnCommon_isNull(json.isHpAuth)  &&  json.isHpAuth == "Y")  ||  !fnCommon_isNull(CERT_HNDNO) ){
						
							// �� & �ǰ����轺ũ�������� ����  or  �Ǻ���ũ���� ����
							if(((!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")  ||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y"))  ){
								// �����û���ۼ� ȭ������ �̵�
					    		view_name = "/lo/LOAN2112.jsp";
					    		title = "�����û�� �ۼ�";
								
								data_list = [
									 { "key" : "view_name", "value" : view_name }
								   , { "key" : "title", "value" : title }
								   , { "key" : "parent", "value" : "IB" }
								   , { "key" : "topMenu", "value" : "IB_REQ" }
								   , { "key" : "leftMenu", "value" : "IB_REQ_010" }
								];

								// renewal4 ���� url ȣ��
								fnCommon_callUrl( data_list );

							}else{
								// ������������ǰ�����û - �ڵ���û���ɿ��� üũ
								loanRenewal4_004.fnSave_2(REQ_AMT);
								
							}
						
						} else {	// �޴��� ���� �������� �߰����� ȭ������ �̵�
							view_name = "/lo/LOAN2108.jsp";
							title = "�߰� ��������";
							
							data_list = [
									 { "key" : "view_name", "value" : view_name }
								   , { "key" : "title", "value" : title }
								   , { "key" : "parent", "value" : "IB" }
								   , { "key" : "topMenu", "value" : "IB_REQ" }
								   , { "key" : "leftMenu", "value" : "IB_REQ_010" }
							];
							
							// renewal4 ���� url ȣ��
							fnCommon_callUrl( data_list );
							
						}
						
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
		    	error: function(data, textStatus, error){
		    		ing.hide();
		    		fnCommon_SessionExpired();
				},
				complete: function(){
					ing.hide();
				}
			});

		},



		/* --------------------------------------------------------------------------------------
			������������ǰ�����û - �ڵ���û���ɿ��� üũ
			loanRenewal4_004.fnSave_2
		 -------------------------------------------------------------------------------------- */
		fnSave_2 : function(REQ_AMT){

			iajax.clearParam();
			// ����� 5������ - ����
			//iajax.addParam("CHK_CSRF", random);
			iajax.addParam("REQ_GB", "3");  // ��û���� 1 ��ȭ��û 2 �ڵ����� 3 �ڵ���û���ɿ���(���������ȭ����) 4 �ڵ���û 5 �¶����޻�п��������ѽ�û 6 �ڵ���û���ۼ�
			iajax.addParam("CUST_NO", LNC3003_selected.CUST_NO);
			iajax.addParam("GOODS_CD", LNC3003_selected.GOODS_CD);
			iajax.addParam("REQ_AMT", REQ_AMT);   // �����û�ݾ�
			iajax.addParam("BANK_INSP_NO", BANK_INSP_NO_key);   // ���������û��ȣ
			iajax.addParam("SEND_MSG", "Y");   // ��༭�ۼ�(���ھ���) �������� ��� ���� �۽�
			iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// ������D �űԴ����(�ֵ�Դ�) �Ķ���� ����
			
			// iajax ������ ���� parameter �߰�
			// ����� 5������ - ����
//			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3004,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

			    		// �ڵ����Ⱑ�ɿ���
			    		var autolaonPsbYn = json.DATA.AUTOLOAN_PSB_YN;

			    		// �ڵ����Ⱑ�ɿ��� 1 �ڵ���û����
						if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "1" ){

			    			// �ڵ����� ȣ��
							loanRenewal4_004.fnSave_4(REQ_AMT);

		    			// �ڵ����Ⱑ�ɿ��� 2 ��û���ۼ�
			    		}else if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "2"){
			    			// �ڵ���û���ۼ�
			    			// loanRenewal4_004.fnSave_5(REQ_AMT);
							
							// �԰��C ����ϰ� ������ ������� ����(5�� ���̽�. �����û�� �ۼ� �̵� -> 3004 3�� -> 3004 6��)
							var data_list = [
				    		                 	{ "key" : "view_name", "value" : "/lo/LOAN2112.jsp" }
			    		                 	  , { "key" : "title", "value" : "�����û�� �ۼ�" }
					   				          , { "key" : "parent", "value" : "IB" }
									          , { "key" : "topMenu", "value" : "IB_REQ" }
									          , { "key" : "leftMenu", "value" : "IB_REQ_010" }
			                    ];
								
							// renewal4 ���� url ȣ��
							fnCommon_callUrl( data_list );

			    		}else if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "3"){
			    			// �¶��μ��������ϱ� ����
			    			loanRenewal4_004.fnSave_6(REQ_AMT, autolaonPsbYn);
			    		}else{
			    			// �����Ǿ����ϴ� ����
			    			loanRenewal4_004.fnSave_6(REQ_AMT, "0");
			    		}
			    	}else{

			    		// ����Ұ��ȳ�
			    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
				    		loanRenewal4_004.fnGoNextSorryStep();

			    		// �����޼����ȳ�
			    		}else{
				    		var errorMsg = json.RESULT_DESC;
							alert(errorMsg.split("<br/>").join("\n"));
			    		}
			    	}
				},
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
					// alert(error);
					fnCommon_SessionExpired();
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			����Ұ��ȳ�
			loanRenewal4_004.fnGoNextSorryStep
		 -------------------------------------------------------------------------------------- */
		fnGoNextSorryStep : function(){

			// "���� ��û�� �����Ǿ����ϴ�."
			var data_list = [
//				             { "key" : "view_name", "value" : "loanRenewal4_013" }
				             { "key" : "view_name", "value" : "/lo/LOAN2113.jsp" }
				           , { "key" : "title", "value" : "�����û | �Ƚ��ѵ���ȸ | �ѵ���ȸ���" }
				           , { "key" : "parent", "value" : "IB" }
				           , { "key" : "topMenu", "value" : "IB_REQ" }
				           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
				           , { "key" : "type", "value" : "5" }   // 1 �ۼ�ġ�ϱ�, 2 �¶��μ��������ϱ� 3 �⺻ 4 �̾�����ϱ� 5 ����Ұ��ȳ�
				];

			// renewal4 ���� url ȣ��
			fnCommon_callUrl( data_list );
		},



		/* --------------------------------------------------------------------------------------
			�ڵ���û ���н� ��ȭ��û ó��
			loanRenewal4_004.fnSave_6
		 -------------------------------------------------------------------------------------- */
		fnSave_6 : function(REQ_AMT, autolaonPsbYn){

			// �ѵ��ݾ�
			var LIMIT_AMT = fnCommon_getOnlyNumber(LNC3003_selected.LIMIT_AMT);   // ���ڿ� ���� �� ���ڸ� ��ȯ

			// iajax ����
			iajax.clearParam();
			// ����� 5������ - ����
			//iajax.addParam("CHK_CSRF", random);
			iajax.addParam("REQ_GB", "1");  // ��û���� 1 ��ȭ��û 2 �ڵ����� 3 �ڵ���û���ɿ���(���������ȭ����) 4 �ڵ���û 5 �¶����޻�п��������ѽ�û 6 �ڵ���û���ۼ�
//			iajax.addParam("CUST_NO", LNC3003_selected.cust_NO);
//			iajax.addParam("GOODS_CD", LNC3003_selected.goods_CD);
			iajax.addParam("CUST_NO", LNC3003_selected.CUST_NO);
			iajax.addParam("GOODS_CD", LNC3003_selected.GOODS_CD);
			iajax.addParam("REQ_AMT", REQ_AMT);   // �����û�ݾ�
			iajax.addParam("LIMIT_AMT", LIMIT_AMT);   // �ѵ��ݾ�
			iajax.addParam("BANK_INSP_NO", BANK_INSP_NO_key);   // ���������û��ȣ
			iajax.addParam("SEND_MSG", "Y");   // ��༭�ۼ�(���ھ���) �������� ��� ���� �۽�

			// iajax ������ ���� parameter �߰�
			// ����� 5������ - ����
//			fnCommon_partnerData();


			$.ajax({
			    type: "post",
			    url: callURL_requestLNC4004,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){
			    		/*
						var type = "";

			    		// �¶����޻��
						if( !fnCommon_isNull(LNC3003_selected.GOODS_CD)  &&  LNC3003_selected.GOODS_CD == "52351" ){
							type = "3";

						}else{
							type = "2";
						}
						*/
			    		var type = "3"; // �����Ǿ����ϴ� ������������ �̵�
						
						if( autolaonPsbYn == "3" ){
							type = "2"; // �¶��μ��������ϱ� ������������ �̵�
						}

		    			// "���� ��û�� �����Ǿ����ϴ�."
		    			var data_list = [
				    		             { "key" : "view_name", "value" : "/lo/LOAN2113.jsp" }
				    		           , { "key" : "title", "value" : "��û���" }
							           , { "key" : "parent", "value" : "IB" }
							           , { "key" : "topMenu", "value" : "IB_REQ" }
							           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
				    		           , { "key" : "type", "value" : type }   // 1 �ۼ�ġ�ϱ�, 2 �¶��μ��������ϱ� 3 �⺻ 4 �̾�����ϱ� 5 ����Ұ��ȳ�
		    				];

		    			// renewal4 ���� url ȣ��
		    			fnCommon_callUrl( data_list );

			    	}else{

			    		// ����Ұ��ȳ�
			    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
				    		loanRenewal4_004.fnGoNextSorryStep();

			    		// �����޼����ȳ�
			    		}else{
				    		var errorMsg = json.RESULT_DESC;
							alert(errorMsg.split("<br/>").join("\n"));
			    		}
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error) {
					ing.hide();
					fnCommon_SessionExpired();
				},
				complete: function() {
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�ڵ���û���ۼ�
			loanRenewal4_004.fnSave_5
		 -------------------------------------------------------------------------------------- */
		fnSave_5 : function(REQ_AMT){

			// �ѵ��ݾ�
			var LIMIT_AMT = fnCommon_getOnlyNumber(LNC3003_selected.LIMIT_AMT);   // ���ڿ� ���� �� ���ڸ� ��ȯ
//			var LIMIT_AMT = fnCommon_getOnlyNumber(LNC3003_selected.limit_AMT);   // ���ڿ� ���� �� ���ڸ� ��ȯ

			// iajax ����
			iajax.clearParam();
			// ����� 5������ - ����
//			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("REQ_GB", "6");  // ��û���� 1 ��ȭ��û 2 �ڵ����� 3 �ڵ���û���ɿ���(���������ȭ����) 4 �ڵ���û 5 �¶����޻�п��������ѽ�û 6 �ڵ���û���ۼ�
//			iajax.addParam("CUST_NO", LNC3003_selected.cust_NO);
//			iajax.addParam("GOODS_CD", LNC3003_selected.goods_CD);
			iajax.addParam("CUST_NO", LNC3003_selected.CUST_NO);
			iajax.addParam("GOODS_CD", LNC3003_selected.GOODS_CD);
			iajax.addParam("REQ_AMT", REQ_AMT);   // �����û�ݾ�
			iajax.addParam("LIMIT_AMT", LIMIT_AMT);   // �ѵ��ݾ�
			iajax.addParam("BANK_INSP_NO", BANK_INSP_NO_key);   // ���������û��ȣ
			iajax.addParam("SEND_MSG", "Y");   // ��༭�ۼ�(���ھ���) �������� ��� ���� �۽�

			// iajax ������ ���� parameter �߰�
			// ����� 5������ - ����
//			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_requestLNC4004,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){
						// ����D ��û(�����û�� �ۼ�)				
						// �ڵ����Ⱑ�ɿ���
			    		//var autolaonPsbYn = json.DATA.AUTOLOAN_PSB_YN;
						
						// �����û���ۼ� ȭ�� ȣ��
				    		var data_list = [
				    		                 	{ "key" : "view_name", "value" : "/lo/LOAN2112.jsp" }
			    		                 	  , { "key" : "title", "value" : "�����û�� �ۼ�" }
					   				          , { "key" : "parent", "value" : "IB" }
									          , { "key" : "topMenu", "value" : "IB_REQ" }
									          , { "key" : "leftMenu", "value" : "IB_REQ_010" }
			                    ];
								
						// renewal4 ���� url ȣ��
						fnCommon_callUrl( data_list );
						
						/*
		    			var data_list = [
				    		             { "key" : "view_name", "value" : "/lo/LOAN2113.jsp" }
//				    		             { "key" : "view_name", "value" : "loanRenewal4_013" }
				    		           , { "key" : "title", "value" : "��û���" }
							           , { "key" : "parent", "value" : "IB" }
							           , { "key" : "topMenu", "value" : "IB_REQ" }
							           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
				    		           , { "key" : "type", "value" : "1" }   // 1 �ۼ�ġ�ϱ�, 2 �¶��μ��������ϱ� 3 �⺻ 4 �̾�����ϱ� 5 ����Ұ��ȳ�
		    				];

		    			// renewal4 ���� url ȣ��
		    			fnCommon_callUrl( data_list );
						*/

			    	}else{

			    		// ����Ұ��ȳ�
			    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
			    			loanRenewal4_004.fnGoNextSorryStep();

			    		}else{
							// 52351 �¶����޻��
							if( !fnCommon_isNull(LNC3003_selected.GOODS_CD)  &&  LNC3003_selected.GOODS_CD == "52351" ){
//								if( !fnCommon_isNull(LNC3003_selected.goods_CD)  &&  LNC3003_selected.goods_CD == "52351" ){

								// �¶����޻�п��������ѽ�û
					    		loanRenewal4_004.fnGoOnlineSunshineLoanSubmit();

							}else{
					    		var errorMsg = json.RESULT_DESC;
								alert(errorMsg.split("<br/>").join("\n"));
							}
			    		}
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error) {
					ing.hide();
					fnCommon_SessionExpired();
				},
				complete: function() {
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�ڵ����� ȣ��
			loanRenewal4_004.fnSave_4
		 -------------------------------------------------------------------------------------- */
		fnSave_4 : function(REQ_AMT){

			// ��û���� 1 ��ȭ��û 2 �ڵ����� 3 �ڵ���û���ɿ��� 4 �ڵ���û 5 �¶����޻�п��������ѽ�û 6 �ڵ���û���ۼ�
			var REQ_GB = "";

			// �ۿ���
			// ����� 5������ - ����
			//var isApp_flag = fnCommon_isApp();

			// �ڵ����� ���� // �� & �ǰ����轺ũ�������� ����  or  �Ǻ���ũ���� ����
			// ����� 5������ - isApp_flag ����
			if( ( (!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")  ||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y") ) ){
//				if( isApp_flag  &&  ( (!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")  ||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y") ) ){

				REQ_GB = "2";  // ��û���� 2 �ڵ�����
			}else{
				REQ_GB = "4";  // ��û���� 4 �ڵ���û
			}


			// ��û�ݾ�
			// var req_amt = fnCommon_getOnlyNumber(LNC3003_selected.limit_AMT);   // ���ڿ� ���� �� ���ڸ� ��ȯ

			// iajax ����
			iajax.clearParam();
			// ����� 5������ - ����
//			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("REQ_GB", REQ_GB);  // ��û���� 1 ��ȭ��û 2 �ڵ����� 3 �ڵ���û���ɿ���(���������ȭ����) 4 �ڵ���û 5 �¶����޻�п��������ѽ�û 6 �ڵ���û���ۼ�
//			iajax.addParam("CUST_NO", LNC3003_selected.cust_NO);
//			iajax.addParam("GOODS_CD", LNC3003_selected.goods_CD);
			iajax.addParam("CUST_NO", LNC3003_selected.CUST_NO);
			iajax.addParam("GOODS_CD", LNC3003_selected.GOODS_CD);
			iajax.addParam("REQ_AMT", REQ_AMT);   // �����û�ݾ�
			iajax.addParam("BANK_INSP_NO", BANK_INSP_NO_key);   // ���������û��ȣ
			iajax.addParam("SEND_MSG", "Y");   // ��༭�ۼ�(���ھ���) �������� ��� ���� �۽�
			iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// ������D �űԴ����(�ֵ�Դ�) �Ķ���� ����

			// iajax ������ ���� parameter �߰�
			// ����� 5������ - ����
//			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3004,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"  ){

			    		// ��û�Ϸ�ȳ� ȭ�鿡 ����� ���� ����
			    		var type = "3";

			    		// ��û���� 4 �ڵ���û �̾����� �̾ �����ϱ� ���� ����
			    		if(REQ_GB == "4"){
				    		type = "4";
			    		}

		    			// "���� ��û�� �����Ǿ����ϴ�."
		    			var data_list = [
//				    		             { "key" : "view_name", "value" : "loanRenewal4_013" }
				    		             { "key" : "view_name", "value" : "/lo/LOAN2113.jsp" }
				    		           , { "key" : "title", "value" : "��û���" }
							           , { "key" : "parent", "value" : "IB" }
							           , { "key" : "topMenu", "value" : "IB_REQ" }
							           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
				    		           , { "key" : "type", "value" : type }   // type : 1 �ۼ�ġ�ϱ�, 2 �¶��μ��������ϱ� 3 �⺻ 4 �̾�����ϱ� 5 ����Ұ��ȳ�
		    				];

		    			// renewal4 ���� url ȣ��
		    			fnCommon_callUrl( data_list );

			    	}else{

			    		// ����Ұ��ȳ�
			    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
			    			loanRenewal4_004.fnGoNextSorryStep();

			    		}else{
				    		// �¶����޻��
							if( !fnCommon_isNull(LNC3003_selected.GOODS_CD)  &&  LNC3003_selected.GOODS_CD == "52351" ){
//								if( !fnCommon_isNull(LNC3003_selected.goods_CD)  &&  LNC3003_selected.goods_CD == "52351" ){

								// �¶����޻�п��������ѽ�û
				    			loanRenewal4_004.fnGoOnlineSunshineLoanSubmit();

				    		}else{
					    		var errorMsg = json.RESULT_DESC;
								alert(errorMsg.split("<br/>").join("\n"));
				    		}
			    		}
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error) {
					ing.hide();
					fnCommon_SessionExpired();
				},
				complete: function() {
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�¶����޻�п��������ѽ�û
			loanRenewal4_004.fnGoOnlineSunshineLoanSubmit
		 -------------------------------------------------------------------------------------- */
		fnGoOnlineSunshineLoanSubmit : function(){

			// ��û�ݾ�
//			var req_amt = fnCommon_getOnlyNumber(LNC3003_selected.limit_AMT);   // ���ڿ� ���� �� ���ڸ� ��ȯ
			var req_amt = fnCommon_getOnlyNumber(LNC3003_selected.LIMIT_AMT);   // ���ڿ� ���� �� ���ڸ� ��ȯ

			iajax.clearParam();
			// ����� 5������ - ����
//			iajax.addParam("CHK_CSRF", random);
//			iajax.addParam("CUST_NO", LNC3003_selected.cust_NO);
//			iajax.addParam("GOODS_CD", LNC3003_selected.goods_CD);
			iajax.addParam("CUST_NO", LNC3003_selected.CUST_NO);
			iajax.addParam("GOODS_CD", LNC3003_selected.GOODS_CD);
			iajax.addParam("REQ_AMT", req_amt);
			iajax.addParam("BANK_INSP_NO", bank_INSP_NO);
			iajax.addParam("REQ_GB", "5");   // 5 �¶����޻�п��������ѽ�û
			iajax.addParam("SEND_MSG", "Y");   // ������ſ���
			iajax.addParam("TRANC_YN", "0");   // ��ȯ���� 1 ��ȯ 0 ��ȯ�ƴ� // �ڵ������� ��ȯ���úҰ�
			iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// ������D �űԴ����(�ֵ�Դ�) �Ķ���� ����

			// iajax ������ ���� parameter �߰�
			// ����� 5������ - ����
//			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3004,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"  ){
			    		alert("�¶����޻�� ������\n�ڵ� �߱� ����� �ƴմϴ�.\n�������� �����Ͽ�\n������ ���� �����帮�ڽ��ϴ�.");

						// "���� ��û�� �����Ǿ����ϴ�."
						var data_list = [
//							             { "key" : "view_name", "value" : "loanRenewal4_013" }
							             { "key" : "view_name", "value" : "/lo/LOAN2113.jsp" }
							           , { "key" : "title", "value" : "��û���" }
							           , { "key" : "parent", "value" : "IB" }
							           , { "key" : "topMenu", "value" : "IB_REQ" }
							           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
							           , { "key" : "type", "value" : "3" }   // type : 1 �ۼ�ġ�ϱ�, 2 �¶��μ��������ϱ� 3 �⺻ 4 �̾�����ϱ� 5 ����Ұ��ȳ�
							];

						// renewal4 ���� url ȣ��
						fnCommon_callUrl( data_list );

			    	}else{
			    		// ����Ұ��ȳ�
			    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
				    		loanRenewal4_004.fnGoNextSorryStep();

			    		// �����޼����ȳ�
			    		}else{
				    		var errorMsg = json.RESULT_DESC;
							alert(errorMsg.split("<br/>").join("\n"));
			    		}
			    	}
				},
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error) {
					ing.hide();
					// alert(error);
					fnCommon_SessionExpired();
					log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			��û������ ��� // ������������ǰ�����û ���
			loanRenewal4_004.fnSave_1
		 -------------------------------------------------------------------------------------- */
		fnSave_1 : function(LNC3003, REQ_AMT, MEMO){

			// ��û�ݾ�
//			var req_amt = fnCommon_getOnlyNumber(LNC3003_selected.limit_AMT);   // ���ڿ� ���� �� ���ڸ� ��ȯ
			var req_amt = fnCommon_getOnlyNumber(LNC3003_selected.LIMIT_AMT);   // ���ڿ� ���� �� ���ڸ� ��ȯ

			iajax.clearParam();
			// ����� 5������ - ����
//			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("REQ_GB", "5");  // ��û���� 1 ��ȭ��û 2 �ڵ����� 3 �ڵ���û���ɿ���(���������ȭ����) 4 �ڵ���û 5 �¶����޻�п��������ѽ�û 6 �ڵ���û���ۼ�
//			iajax.addParam("CUST_NO", LNC3003_selected.cust_NO);
//			iajax.addParam("GOODS_CD", LNC3003_selected.goods_CD);
			iajax.addParam("CUST_NO", LNC3003_selected.CUST_NO);
			iajax.addParam("GOODS_CD", LNC3003_selected.GOODS_CD);
			iajax.addParam("REQ_AMT", req_amt);   // �����û�ݾ�
			iajax.addParam("BANK_INSP_NO", BANK_INSP_NO_key);   // ���������û��ȣ
			iajax.addParam("SEND_MSG", "Y");   // ��༭�ۼ�(���ھ���) �������� ��� ���� �۽�
			iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// ������D �űԴ����(�ֵ�Դ�) �Ķ���� ����

			// iajax ������ ���� parameter �߰�
			// ����� 5������ - ����
//			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3004,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if( !fnCommon_isNull(json)){
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"  ){

			    			// ����Ұ��ȳ� �̵�
			    			loanRenewal4_004.fnNext_sorry();

				    	}else{

				    		// ����Ұ��ȳ�
				    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
					    		loanRenewal4_004.fnGoNextSorryStep();

				    		// �����޼����ȳ�
				    		}else{
					    		var errorMsg = json.RESULT_DESC;
								alert(errorMsg.split("<br/>").join("\n"));
				    		}
			    		}
			    	}
				},
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
					// alert(error);
					fnCommon_SessionExpired();
					log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			����Ұ��ȳ� �̵�
			loanRenewal4_004.fnNext_sorry
		 -------------------------------------------------------------------------------------- */
		fnNext_sorry : function(){
			var data_list = [
                 { "key" : "view_name", "value" : "" }
               , { "key" : "view_name_other", "value" : callURL_sorry }
               , { "key" : "parent", "value" : "IB" }
	           , { "key" : "topMenu", "value" : "IB_REQ" }
	           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
               , { "key" : "title", "value" : "��û���" }
                ];

			// renewal4 ���� url ȣ��
			fnCommon_callUrl( data_list );
		},



		/* --------------------------------------------------------------------------------------
			��û�Ϸ� �ȳ� �̵�
			loanRenewal4_004.fnNext_thanks
		 -------------------------------------------------------------------------------------- */
			fnNext_thanks : function( LNC3003, REQ_AMT, AUTOLOAN_PSB_YN ){

				var title = "";
				var goods_CD = "";  // ��ǰ�ڵ�

				// �ڵ����Ⱑ�ɿ���
		    	if( !fnCommon_isNull(AUTOLOAN_PSB_YN)  &&  AUTOLOAN_PSB_YN == "1"){
		    		title = "�ѵ�Ȯ��/�����û";
		    	}else{
		    		title = "��û���";
		    	}

		    	if( !fnCommon_isNull(LNC3003) ){
		    		goods_CD = LNC3003.GOODS_CD;

		    		// �޻�� ������
			    	if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52301" ){

			    		// ���ھ��� �������� �ʰ� ������� ����
			    		AUTOLOAN_PSB_YN = "2";

			    		// �� ����
			    		//var isApp_flag = fnCommon_isApp();
			    		//if(!isApp_flag){

				    		// web �̸� ���� // ���� ���°���? �ϴ� �־����Ŵϱ� ����
							//FN_EchoCresendo('Y', '15', '', '');
			    		//}
			    	}
		    	}

				var data_list = [

	                 // ȭ��ȣ�� �⺻��
	                   { "key" : "view_name", "value" : "" }
	                 , { "key" : "view_name_other", "value" : callURL_thanks }
	                 , { "key" : "title", "value" : title }
			         , { "key" : "parent", "value" : "IB" }
			         , { "key" : "topMenu", "value" : "IB_REQ" }
			         , { "key" : "leftMenu", "value" : "IB_REQ_010" }

	                 // parameter
	                 , { "key" : "reqAmt", "value" : REQ_AMT }
	                 , { "key" : "autoloanPsbYn", "value" : AUTOLOAN_PSB_YN }
	                 , { "key" : "custNo", "value" : LNC3003.CUST_NO }
	                 , { "key" : "goodsCode", "value" : LNC3003.GOODS_CD }
	                ];

				// renewal4 ���� url ȣ��
				fnCommon_callUrl( data_list );
		},



		/* --------------------------------------------------------------------------------------
			�����û ��ư Ŭ���� ��ȿ�� üũ
			loanRenewal4_004.fnSend_detail_1_validation
		 -------------------------------------------------------------------------------------- */
		fnSend_detail_1_validation : function( LNC3003, REQ_AMT, MEMO, TRANC_LIMIT_flag ){
			var limit_AMT_number = 0;  // �����ѵ�
			var goods_CD = "";  // ��ǰ�ڵ�
			var REQ_AMT_number = 0;  // ��û�ݾ� �Է°�
			var tranc_LIMIT_number = 0;  // ��ȯ�ѵ�

			if( !fnCommon_isNull(REQ_AMT) ){
				REQ_AMT_number = Number(REQ_AMT);
			}

			// ���õ� �����ǰ��
			if( !fnCommon_isNull(LNC3003) ){
				goods_CD = LNC3003.GOODS_CD;

				// �����ѵ�
				var limit_AMT = LNC3003.LIMIT_AMT;
				if( !fnCommon_isNull(limit_AMT) ){
					limit_AMT_number = Number(limit_AMT);
					if(limit_AMT_number <= 0){
						alert("�����Ͻ� ��ǰ�� ��û�����ѵ��� �����ϴ�.");
						return false;
					}

					// �񱳸� ���� ���������� ��ȯ
					limit_AMT_number = limit_AMT_number * 10000;
				}

				// ��ȯ�ѵ�
				var tranc_LIMIT = LNC3003.TRANC_LIMIT;
				if( !fnCommon_isNull(tranc_LIMIT) ){
					tranc_LIMIT_number = Number(tranc_LIMIT);

					// �񱳸� ���� ���������� ��ȯ
					tranc_LIMIT_number = tranc_LIMIT_number * 10000;
				}
			}

			// ���ڸ� ��ȯ���� �����û�ݾ�   // var numPattern = /^\d*$/;
			if( fnCommon_isNull(REQ_AMT) ){
				alert("�����û�ݾ��� �Է����ּ���.");
				return false;
			}

			// �Էµ� ��û�ݾ��� �����ѵ��� ������ �Ұ�
			// ��ȯ�ѵ� �����϶� ��ȯ�ѵ�
			if( !fnCommon_isNull(TRANC_LIMIT_flag, "boolean") ){
				if((tranc_LIMIT_number) < REQ_AMT_number){
					alert("�����Ͻ� ��ǰ�� �����ѵ��� �ʰ��ϼ̽��ϴ�.");
					return false;
				}
			}else{
				if(limit_AMT_number < REQ_AMT_number){
					alert("�����Ͻ� ��ǰ�� �����ѵ��� �ʰ��ϼ̽��ϴ�.");
					return false;
				}
			}

			// ���յ�2(ǥ��) or ���յ�2(����Ҿ�)
			if( !fnCommon_isNull(goods_CD)  &&  (goods_CD == "52346" || goods_CD == "52347") ){
				if( Number(REQ_AMT) % 100000 != 0){
					alert("�����û�ݾ��� 10���� ������ �Է����ּ���.");
					return false;
				}
			}

			// �ּ� ��û�ݾ� ����
			// �޻��(52301, 52351) : 500
			// ������ �߱ݸ�, ������(52320), ��׷�(52323), ���յ�2(ǥ��)(52346) : 300
			// ������ �ڵ�����(52350), ���յ�2(����Ҿ�)(52347) 100

			return true;
		},



		/* --------------------------------------------------------------------------------------
			���� ��ư Ŭ���� �󼼿��� ����
			loanRenewal4_004.fnDelete_detail
		 -------------------------------------------------------------------------------------- */
		fnDelete_detail : function(e){

			// �󼼺��� �� ��� ���ֱ�
			$("div[name='detail_box']").hide();
			$("div[name='detail_box']").html("");

			// ����ȿ�� ���ֱ�
			$(".limit_select").removeClass("choice");
			// $("div[name='list_div']").removeClass("choice");
		}



	};   // var loanRenewal4_004 = {








	/* --------------------------------------------------------------------------------------
		���̽��ǽ� ���� �ȳ� Ȯ�� ȭ��
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_005 = {

		/* --------------------------------------------------------------------------------------
			�⺻����
			loanRenewal4_005.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// ��������
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

			// *���������̹Ƿ� ���ڷ� ��ȯ�ʼ�  ex) ���� : 2018�� 00�� 00��
			var today_format = "���� : " + yyyy + "�� " + mm + "�� " + dd + "��";
			$("#today_format").html( today_format );

			// ������ ��ȸ
			loanRenewal4_005.fnSearch_1();
		},



		/* --------------------------------------------------------------------------------------
			������ ��ȸ
			loanRenewal4_005.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function(){

			iajax.clearParam();
			//iajax.addParam("CHK_CSRF", random);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_005_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	ing.hide();
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

						// ���� // �α��� ���Ѱ�� �̸� ���� ����
						var custNm = json.custNm;
						if( !fnCommon_isNull(custNm) ){
							$("#custNm").html("���� : " + custNm);
							$("#custNm").show();
						}

						REG_KIND = json.REG_KIND;   // ���ڼ������(�ڼ�����ó ����)
						ST_CD = json.ST_CD;   // �������
						SCRP_NHIS_EXP = json.SCRP_NHIS_EXP;   // �ǰ����轺ũ���� ���� ����
						SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;   // �ǰ����轺ũ���� ���� ����
						SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;   // �Ǻ���ũ���� ��� ����
						YOUTH_GUIDE_YN = json.YOUTH_GUIDE_YN;   // ������������ ���� ���� ����
						youth_age_yn = json.youth_age_yn;   // û�� ����

			    	}else{
						//alert("������ ��ȸ�� �����Ͽ����ϴ�.");
			    	}
			    },
				beforeSend : function() {
					//ing.show();
				},
				error: function(data, textStatus, error){
					//alert("������ ��ȸ�� �����Ͽ����ϴ�.");
					//ing.hide();
				},
				complete: function(){
					//ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			Ȯ���� üũ�ڽ� Ŭ���� �̺�Ʈ
			loanRenewal4_005.fnClickAgree
		 -------------------------------------------------------------------------------------- */
		fnClickAgree : function(e){
			var next_yn_flag = false;

			// üũ�ڽ� ���ǽ� Ȯ�ι�ư ����
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
				// ����� 5������
				// PC ���� ����� ����
		        //$('body,html').animate({scrollTop: $("#btn_next").offset().top},500);   // ��ũ�� �̵�
			}else{
				$("#btn_next").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			���� ��ư Ŭ�� - ���̽��ǽ�/û����� ���ǿ��ΰ� ����
			loanRenewal4_005.fnNext_1
		 -------------------------------------------------------------------------------------- */
		fnNext_1 : function(){

			// ���⺻���� ��ȸ
			iajax.clearParam();
//			iajax.addParam("CHK_CSRF", random);

			iajax.addParam("VOICE_LOAN_YN", "Y");   // ���̽��ǽ̹���ǥ �ȳ�����
			// iajax.addParam("YOUTH_GUIDE_YN", "Y");   // û����� �ȳ�����

			iajax.addParam("qna01", $("input[type='radio'][name='qna01']:checked")[0].value);

			var qna02 = $("input[type='radio'][name='qna02']:checked");
			if( fnCommon_isNull(qna02)  ||  fnCommon_isNull(qna02.length)  &&  qna02.length < 1 ){

			}else{
				iajax.addParam("qna02", $("input[type='radio'][name='qna02']:checked")[0].value);
			}


			var qna03 = $("input[type='radio'][name='qna03']:checked");
			if( fnCommon_isNull(qna03)  ||  fnCommon_isNull(qna03.length)  &&  qna03.length < 1 ){

			}else{
				iajax.addParam("qna03", $("input[type='radio'][name='qna03']:checked")[0].value);
			}





			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_005_02,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){
						console.log(json.qna01);
						// 5062  ���̽��ǽ�
						try{
							Emf.convCall(797, 5062, 0, 0, 0);
						}catch(err){ }
						setTimeout(function(){

							// ȭ��б� ȣ��
							loanRenewal4_005.fnNext_2();
						},100);
						// ȭ��б� ȣ��
						//loanRenewal4_005.fnNext_2();

			    	}else{
						alert("���ǿ��ΰ� ������ �����Ͽ����ϴ�.");
			    	}
			    },
				beforeSend : function() {
					//ing.show();
				},
				error: function(data, textStatus, error) {
					//ing.hide();
					// alert(error);
					// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
					// ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			ȭ��б� ȣ��
			loanRenewal4_005.fnNext_2
		 -------------------------------------------------------------------------------------- */
		fnNext_2 : function(){

			var data_list = null;
			// ����� 5������
			// �ű� �������� ó��
			var appCall_yn = "N";
			// �̾��ϱ� ������ ���
			// ����� 5������, PC Web�� ����� appCall_yn ����
			if( !fnCommon_isNull(appCall_yn)  &&  appCall_yn == "Y" ){

				// 115 �ڵ���û��ȯ & ������� 1
				if( !fnCommon_isNull(REG_KIND)  &&  REG_KIND == "115"  &&  !fnCommon_isNull(ST_CD)  &&  ST_CD == "1" ){

					// �ǰ����轺ũ�������� ����  or  �̹� ��ũ���� ����������
					if( (!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")
							||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y") ){
						data_list = [
						             //{ "key" : "view_name", "value" : "loanRenewal4_004.jsp" }
						             { "key" : "view_name", "value" : "/lo/LOAN2104.jsp" }
						           , { "key" : "title", "value" : "�ѵ���ȸ���" }
						           , { "key" : "parent", "value" : "IB" }
						           , { "key" : "topMenu", "value" : "IB_REQ" }
						           , { "key" : "leftMenu", "value" : strLeftMenu }
					           //, { "key" : "beforeview", "value" : "loanRenewal4_005.jsp" }  // �ѵ���ȸ ȭ�鿡�� ���� �߻��� �ǵ��ư� ȭ��id
						           , { "key" : "beforeview", "value" : "/lo/LOAN2105.jsp" }  // �ѵ���ȸ ȭ�鿡�� ���� �߻��� �ǵ��ư� ȭ��id
							];

					}else{
						// �Ǻ���ũ������� �ƴϸ�
						if( fnCommon_isNull(SCRP_NHIS_ERROR_YN)  ||  SCRP_NHIS_ERROR_YN != "Y" ){

							// �¶��μ�������(��ũ����) - �ѵ���ȸ ȭ�� ȣ��
							data_list = [
//							             { "key" : "view_name", "value" : "loanRenewal4_002.jsp" }
							             { "key" : "view_name", "value" : "/lo/LOAN2102.jsp" }
							           , { "key" : "title", "value" : "���������Է�" }
							           , { "key" : "parent", "value" : "IB" }
							           , { "key" : "topMenu", "value" : "IB_REQ" }
							           , { "key" : "leftMenu", "value" : strLeftMenu }
								];

						// �Ǻ���ũ���� ����� ��� ��� �ȳ� ȭ������ ����
						}else{
							data_list = [
							             { "key" : "view_name", "value" : "/lo/LOAN2116.jsp" }
							           , { "key" : "title", "value" : "����Ұ� �ȳ�" }
							           , { "key" : "parent", "value" : "IB" }
							           , { "key" : "topMenu", "value" : "IB_REQ" }
							           , { "key" : "leftMenu", "value" : strLeftMenu }
								];
						}
					}

					// ������������ ���� �������� ����
					if( fnCommon_isNull(YOUTH_GUIDE_YN)  ||  YOUTH_GUIDE_YN != "Y" ){

						// û���̸�
						if( !fnCommon_isNull(youth_age_yn)  &&  youth_age_yn == "Y" ){
							data_list = [
							             { "key" : "view_name", "value" : "/lo/LOAN2106.jsp" }
							           , { "key" : "title", "value" : "���������Է�" }
							           , { "key" : "parent", "value" : "IB" }
							           , { "key" : "topMenu", "value" : "IB_REQ" }
							           , { "key" : "leftMenu", "value" : strLeftMenu }
								];
						}
					}
				}

				if( data_list == null ){
					alert("�̾ ���� ������ ���°� �ƴմϴ�.\n��㼾�� (��1800-3651)�� �����ϼ���.");
					fnCommon_goHome();
				}


			// �ű� ��û ������ ���
			}else{
				// ����üũ����Ʈ/�������/�������� ����ȭ�� ȣ��
				data_list = [
				             { "key" : "view_name", "value" : "/lo/LOAN2101.jsp" }
				           , { "key" : "title", "value" : "���������Է�" }
				           , { "key" : "parent", "value" : "IB" }
				           , { "key" : "topMenu", "value" : "IB_REQ" }
				           , { "key" : "leftMenu", "value" : strLeftMenu }
					];
			}

			// renewal4 ���� url ȣ��
			fnCommon_callUrl( data_list );
		}

	};   // var loanRenewal4_005 = {






	/* --------------------------------------------------------------------------------------
		������������ �ȳ� ȭ��
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_006 = {

		/* --------------------------------------------------------------------------------------
			�⺻����
			loanRenewal4_006.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// ��������
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

			// *���������̹Ƿ� ���ڷ� ��ȯ�ʼ�  ex) ���� : 2018�� 00�� 00��
			var today_format = "���� : " + yyyy + "�� " + mm + "�� " + dd + "��";
			$("#today_format").html( today_format );

			// ���⺻���� ��ȸ
			loanRenewal4_006.fnSearch_1();
		},



		/* --------------------------------------------------------------------------------------
			���⺻���� ��ȸ
			loanRenewal4_006.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function(){

			// ���⺻���� ��ȸ
			iajax.clearParam();
			// ����� 5������ - ����
//			iajax.addParam("CHK_CSRF", random);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

						// ������ �������� ����
						var isXecureAuth_string = json.isXecureAuth;
						if( !fnCommon_isNull(isXecureAuth_string)  &&  isXecureAuth_string == "Y" ){
							isXecureAuth = true;
						}

						// �Ǻ���ũ������ֿ���
						SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;

						// ����üũ����Ʈ���� �����ߴ� �������� // ���� 1 ������(4�뺸�谡��) 2 ���λ���� 3 ��Ÿ����ҵ��������뿪������ 4 ���ݼҵ���
						qna01 = json.qna01;

						REG_KIND = json.REG_KIND;  // ���ڼ������(�ڼ�����ó ����)
						ST_CD = json.ST_CD;  // �������
						SHINHAN_FAN_YN = json.SHINHAN_FAN_YN;  // �ų������ǿ���
						CERT_HNDNO = json.CERT_HNDNO;   // �����޴�����ȣ
						ONLINE_DOC_C = json.ONLINE_DOC_C;   // �ο�24 ������ ����
						ONLINE_DOC_D = json.ONLINE_DOC_D;   // �Ǻ�+�ο�24 ������ ����
						ONLINE_DOC_F= json.ONLINE_DOC_F;   // ����û ��ũ���� ����
						GOODS_CD_LNC3005 = json.GOODS_CD;   // ��ǰ�ڵ�

						SCRP_NHIS_EXP = json.SCRP_NHIS_EXP;   // �ǰ����轺ũ�������� ����
						SCRP_MINWON24_EXP = json.SCRP_MINWON24_EXP;   // �ο�24��ũ�������� ����
						SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;   // �ǰ����� ��ũ���� ��������


						// ���� // �α��� ���Ѱ�� �̸� ���� ����
						var custNm = json.custNm;
						if( !fnCommon_isNull(custNm) ){
							$("#custNm").html("���� : " + custNm);
							$("#custNm").show();
						}

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error) {
					fnCommon_SessionExpired();
				},
				complete: function() {
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			Ȯ���� üũ�ڽ� Ŭ���� �̺�Ʈ
			loanRenewal4_006.fnClickAgree
		 -------------------------------------------------------------------------------------- */
		fnClickAgree : function(e){
			var next_yn_flag = false;
			// $("#agree_1").prop("checked", true);

			// üũ�ڽ� ���ǽ� Ȯ�ι�ư ����
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
			}else{
				$("#btn_next").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			���� ��ư Ŭ�� - ���̽��ǽ�/û����� ���ǿ��ΰ� ����
			loanRenewal4_006.fnNext_1
		 -------------------------------------------------------------------------------------- */
		fnNext_1 : function(){

			// ���⺻���� ��ȸ
			iajax.clearParam();
			// ����� 5������ - ����
			//iajax.addParam("CHK_CSRF", random);

			// iajax.addParam("VOICE_LOAN_YN", "Y");   // ���̽��ǽ̹���ǥ �ȳ�����
			iajax.addParam("YOUTH_GUIDE_YN", "Y");   // û����� �ȳ�����

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_005_02,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

						// 5064  ��������� - û�����
						try{
							Emf.convCall(797, 5064, 0, 0, 0);
						}catch (err) { }
						setTimeout(function(){
							// ȭ�� �̵�
							loanRenewal4_006.fnNext_2();
						},100);

						// ȭ�� �̵�
						//loanRenewal4_006.fnNext_2();

			    	}else{
						alert("���ǿ��ΰ� ������ �����Ͽ����ϴ�.");
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error) {
					ing.hide();
					// alert(error);
					fnCommon_SessionExpired();
					// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			ȭ�� �̵�
			loanRenewal4_006.fnNext_2
		 -------------------------------------------------------------------------------------- */
		fnNext_2 : function(){

//			var view_name = "loanRenewal4_012";
			var view_name = "/lo/LOAN2112.jsp";
			var title = "�����û�� �ۼ�";

			// �̾��ϱ�� ������ ���
			// 116 �ڵ���û���ۼ�  &  ������� 1  &  �ų������� 1
			if( !fnCommon_isNull(REG_KIND)  &&  REG_KIND == "116"
					&&  !fnCommon_isNull(ST_CD)  &&  ST_CD == "1"
					&&  !fnCommon_isNull(SHINHAN_FAN_YN)  &&  (SHINHAN_FAN_YN == "1" || SHINHAN_FAN_YN == "Y" )){

				// ����ó ������ �޴������� �̷� �����Ƿ� �߰��������� ȭ�� ȣ��
				if(fnCommon_isNull(CERT_HNDNO)){
					//view_name = "loanRenewal4_008";
					view_name = "/lo/LOAN2108.jsp";
					title = "�߰� ��������";

				}else{

					view_name = "/lo/LOAN2112.jsp";
					title = "�����û�� �ۼ�";

					/* 202002 ��� ������ ����
					// 52351 �¶����޻��
					if( !fnCommon_isNull(GOODS_CD_LNC3005)  &&  GOODS_CD_LNC3005 == "52351" ){

						// �¶��μ�������(��ũ����) ����� ȭ�� ȣ��
						view_name = "/lo/LOAN2107.jsp";
						title = "���������Է�";

					}else{

	    				// �����û���ۼ� ȭ�� ȣ��
						// �¶��μ�������(��ũ����) ����� ȭ�� ȣ��
						view_name = "/lo/LOAN2112.jsp";
						title = "�����û�� �ۼ�";
					}
					*/
				}

				var data_list = [
			             { "key" : "view_name", "value" : view_name }
			           , { "key" : "title", "value" : title }
			           , { "key" : "parent", "value" : "IB" }
			           , { "key" : "topMenu", "value" : "IB_REQ" }
			           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
					];

				// renewal4 ���� url ȣ��
				fnCommon_callUrl( data_list );


			}else{

				// �ǰ����轺ũ�������� ����  or  ��ũ���� ���� ����
				if( (!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")
					||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y")){

					// �����û�ѵ���ȸ ȭ�� ȣ��
					var data_list = [
						             { "key" : "view_name", "value" : "/lo/LOAN2104.jsp" }
						           , { "key" : "title", "value" : "�ѵ���ȸ���" }
						           , { "key" : "parent", "value" : "IB" }
						           , { "key" : "topMenu", "value" : "IB_REQ" }
						           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
						           , { "key" : "beforeview", "value" : "/lo/LOAN2106.jsp" }  // �ѵ���ȸ ȭ�鿡�� ���� �߻��� �ǵ��ư� ȭ��id
						];

					// renewal4 ���� url ȣ��
					fnCommon_callUrl( data_list );

				}else{

					// �ۿ��� // ��ũ���� ȭ�� �̵�
					//var isApp_flag = fnCommon_isApp();

					var view_name = "";
					var title = "";

					// ���ڼ������(�ڼ�����ó ����) 115 �ڵ���û��ȯ �����϶��� ������ �����ʰ� ������ ��ũ��������
					if( !fnCommon_isNull(REG_KIND)  &&  REG_KIND == "115" ){

						// �� & �Ǻ���ũ������� �ƴҶ�
						if( (fnCommon_isNull(SCRP_NHIS_ERROR_YN)  ||  SCRP_NHIS_ERROR_YN != "Y") ){

							// �¶��μ�������(��ũ����) - �ѵ���ȸ ȭ�� ȣ��
							view_name = "/lo/LOAN2102.jsp";
							title = "���������Է�";

						}else{
							alert("�̾ ���� ������ ���°� �ƴմϴ�.\n��㼾�� (��1800-3651)�� �����ϼ���.");
							return false;
						}

					}else{

						// �������� �����Է� ȭ��
						view_name = "/lo/LOAN2103.jsp";
						title = "���������Է�";

						// ��  &  �������� ��������  &  �Ǻ���ũ������� �ƴҶ�
						if( !fnCommon_isNull(isXecureAuth)  &&  (isXecureAuth == "true"  ||  isXecureAuth == true  ||  isXecureAuth == "Y")
							&&  (fnCommon_isNull(SCRP_NHIS_ERROR_YN)  ||  SCRP_NHIS_ERROR_YN != "Y") ){

							// ������(4�뺸�� ���� �ʼ�)
							if( !fnCommon_isNull(qna01)  &&  qna01 == "1" ){

								// �¶��μ�������(��ũ����) - �ѵ���ȸ ȭ�� ȣ��
								view_name = "/lo/LOAN2102.jsp";
								title = "���������Է�";
							}
						}
					}

					var data_list = [
				             { "key" : "view_name", "value" : view_name }
				           , { "key" : "title", "value" : title }
				           , { "key" : "parent", "value" : "IB" }
				           , { "key" : "topMenu", "value" : "IB_REQ" }
				           , { "key" : "leftMenu", "value" : "IB_REQ_010" }
						];

					// renewal4 ���� url ȣ��
					fnCommon_callUrl( data_list );
				}
			}
		}

	};   // var loanRenewal4_006 = {








	/* --------------------------------------------------------------------------------------
		�¶��μ�������(��ũ����) ����� ȭ��
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_007 = {

		/* --------------------------------------------------------------------------------------
			�⺻����
			loanRenewal4_007.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			$("#refreshBtn").click(function() {
				$("#secMsg").val("");
				fnCommon_Annoymous_Security();
			});

			$("#minWon24AddrBtn").click(function() {
				fnOpen_District();
			});

			// ���ȼ��� �����
			loanRenewal4_007.fnRefreshImage();

			// 3�� �� �ٽ� ��ũ���� ���� ��ȸ
//			setTimeout(function(){
//				$("#minWon24HomeAddr_btn").css("top", "inherit");
//				$("#minWon24HomeAddr_btn").show();
//			} , 300);

			// ������, �������� ������ ����
			loanRenewal4_007.fnSearch_1();
		},



		/* --------------------------------------------------------------------------------------
			���ּ� �Է½� ���ڼ� ����
			loanRenewal4_007.fnKeyup_minWon24HomeAddr2
		 -------------------------------------------------------------------------------------- */
		fnKeyup_minWon24HomeAddr2 : function(e){
			var limit = 100;
			var value = e.target.value;

			// byte ���Ѹ�ŭ �߶󳻱�
			value = fnCommon_cutByte(limit, value);
			$("#minWon24HomeAddr2").val(value);
		},



		/* --------------------------------------------------------------------------------------
			������, �������� ������
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
			    		isXecureAuth = json.isXecureAuth;  // �������� (������) ����
			    		SCRAP_CERT_PASS_YN = json.SCRAP_CERT_PASS_YN;
			    		isPersonInfoReq = json.isPersonInfoReq;  // ��������¡�����
			    		loanRenewal4_014_START_YN = json.loanRenewal4_014_START_YN;  // �¶��μ������� �޴��� ���ٿ���
					}
		    		custNm = fnCommon_deleteNull(json.custNm);

		    		$("#customerName1").val(custNm);
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
					// alert(error);
					fnCommon_SessionExpired();
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
					ing.hide();
		        }
			});

		},

		/* --------------------------------------------------------------------------------------
			Ȩ�ؽ� ��ũ���� ���� ��ȸ
			loanRenewal4_007.fnSearch_2
		 -------------------------------------------------------------------------------------- */
		fnSearch_2 : function(){

			iajax.clearParam();
			iajax.addParam("SEND_MSG", "Y");

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_007_checkLNC3005,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if( !fnCommon_isNull(json)  &&  json.RESULT_NO == "0000"){
			    		if(!fnCommon_isNull(json.hometaxType)) {
			    			hometax_type = json.hometaxType;
			    		}

			    		if(!fnCommon_isNull(json.rgstNo)) {
			    			hometax_rgstNo = json.rgstNo;
			    		}
					}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
					// alert(error);
					fnCommon_SessionExpired();
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
					ing.hide();
		        }
			});

		},


		/* --------------------------------------------------------------------------------------
			��ũ���� ��û�� ��ȿ��üũ
			loanRenewal4_007.fnScraping_1_validation
		 -------------------------------------------------------------------------------------- */
		fnScraping_1_validation : function(){
			var cust_nm = $("#customerName1").val();
		    if (fnCommon_isNull(cust_nm)){
		        alert("���� �Է��Ͽ� �ֽʽÿ�.");
		        return false;
		    }

			// �˾����� �������� �ּҰ�
			var minWon24Addr = $("#minWon24Addr").val();
	    	if( fnCommon_isNull(minWon24Addr) ){
				alert("�ּҸ� �˻����ּ���.");
				return false;
	    	}
			var minWon24HomeAddr2 = $("#minWon24HomeAddr2").val();
	    	if( fnCommon_isNull(minWon24HomeAddr2) ){
				alert("���ּҸ� �Է����ּ���.");
				return false;
	    	}

	    	// �̹��� ���ȼ���
			var secMsg = $("#secMsg").val();
	    	if( fnCommon_isNull(secMsg) ){
				alert("���ȼ��ڸ� �Է����ּ���.");
				return false;
	    	}
	    	if( secMsg.length != 6 ){
				alert("���ȼ��ڸ� 6�ڸ��� �Է����ּ���.");
				return false;
	    	}

	    	return true;
		},



		/* --------------------------------------------------------------------------------------
			��ũ���� ��û
			loanRenewal4_007.fnScraping_1
		 -------------------------------------------------------------------------------------- */
		fnScraping_1 : function(){

			// �� ���� // ���� �ƴ� ��� ��ũ���� ȭ������ �Ⱥ��������� Ȥ�� �𸣴ϱ�!
//			var isApp_flag = fnCommon_isApp();
//			if(!isApp_flag){
//				alert("��ũ������ app������ �����մϴ�. app���� �ٽ� �����Ͻñ� �ٶ��ϴ�.");
//				return false;
//			}

			// ��ũ���� ��û�� ��ȿ��üũ
			var result = loanRenewal4_007.fnScraping_1_validation();
			if(!result){
				return false;
			}

			var isScrapping_MINWON = true;
			// ����û ��ũ������ ����
			var isScrapping_HOMETAX = false;

//			if(hometax_type == null || hometax_type.length < 1) {
//				isScrapping_HOMETAX = false;
//			}

			// ������ ȣ�� ��ũ���� native method
//			var method = "certListForScraping";

			// ������ ��ȣ�� ��ũ���� *���������� ������ �������� ����Ѵ�.
			// var method = "noCertListForScraping";

			// 1 �ο�24   2 NPS(���ο���)   3 NHIS(���ΰǰ�)  *20181120 ���ο��� �̻���ϱ�� ������(������) ����
//			var FOR_TYPE = "1";

			// �������� (������) ����  // �������� �������� �� ������ ���
//			if( !fnCommon_isNull(SCRAP_CERT_PASS_YN)  &&  SCRAP_CERT_PASS_YN == "Y" ){
//				method = "noCertListForScraping";   // ������ ��ȣ�� ��ũ���� *�ۿ� ���������� ������ �������� ���
//			}

			$.ajax({
			    type: "post",
			    url: callURL_noopForMobileWeb,   // ���� Ÿ�� �߰�
			    dataType: "json",
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
			    		fnCommon_OpenCert(isScrapping_MINWON, isScrapping_HOMETAX);
/*			    		var params = {
			    				pluginId: "slCert",
			    				method: method,
			    				params: {
			    					"data": {
			    						"CUST_NM": fnCommon_deleteNull(custNm),
			    						"BANK_INSP_NO": "SERVER_VALUE",
			    						"SSN": residNo,
			    						"title": "�ο�24 �����",
			    						"REV_ACT_MARK": "2",
			    						"TIME_OUT": "180000",
			    						"MAX_COUNT": "2",
			    						"FOR_TYPE": FOR_TYPE,
			    						"SUNSHINE_YN": "",   // �޻�� ���� ���� - �ο�24 ��ũ���� ���� // �ʿ���°���

			    						"ORG_ADDR1": $("#orgAddr1").val(),
			    						"ORG_ADDR2": $("#orgAddr2").val().split(' ')[0],
			    						"ADDR": $("#minWon24Addr").val(),
			    						"ADDR_CD": $("#minWon24AddrCd1").val(),
			    						"ZIP_CD": $("#minWon24ZipCd").val(),
			    						"SEC_MSG": $("#secMsg").val(),   // �̹�������

			    						// �ǰ����� �ʿ��׸�
			    						"START_DATE": "",
			    						"END_DATE": "",
			    						"START_DATE1": "",
			    						"END_DATE1": "",
			    						"START_DATE2": "",
			    						"END_DATE2": "",
			    						"START_DATE3": "",
			    						"END_DATE3": ""
			    					}
			    			    },
			    				callBack: function(isOK, json) {
			    					/*
			    					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.session_time_add_success_yn)  &&  json.session_time_add_success_yn == "N" ){
			    						alert("���� Ÿ�Ӿƿ� ���忡 �����߽��ϴ�.\n�α��� �� �̿��Ͻñ� �ٶ��ϴ�.");
			    					}
			    					*/

		    						// ��ũ���� ��û��� ��ȸ
//		    						loanRenewal4_007.fnScraping_2( json );
//			    				}
//			    			};
//			    		SDSFrameWork.plugin.execute(params);

			    	}else{
			    		fnCommon_LoadingLayer_07(false);
			    		alert("��ð� ���� �̿��� �����ʾ� ������ ���������� ��ȣ�ϱ� ���Ͽ� �ڵ����� ���������� ��ҵǾ����ϴ�.\nȮ���� �����ø� ����ȭ������ �̵��մϴ�.");
		    			fnCommon_goHome();
			    	}
			    },
				error: function(data, textStatus, error) {
					// alert(error);
					fnCommon_SessionExpired();
	    			fnCommon_goHome();
				}
			});

		},



		/* --------------------------------------------------------------------------------------
			��ũ���� ��û��� ��ȸ
			loanRenewal4_007.fnScraping_2
		 -------------------------------------------------------------------------------------- */
		fnScraping_2 : function( res_result_flag, message ){

			// Y ���༺�� N �̽��� E ���������� ����
			// �ο�24 ��ũ���� ����
			var SCRP_MINWON24 = "Y";

			// callback ���� ����� ��ũ���� ��û ��� �������� �����
//			var res_result_flag = false;

			//alert( "fnScraping_2 res.result[" + res.result + "]\n" + "res.message = [" + res.message + "]" );

			if( res_result_flag ){
//				if( !fnCommon_isNull(res)  &&  !fnCommon_isNull(res.result)  &&  res.result == "true" ){
				res_result_flag = true;
				loanRenewal4_007.fnScraping_3(res_result_flag, SCRP_MINWON24);

			}else{

				// �����޼��� üũ�ؼ� ������ ����
				//var message = res.message;
				if( !fnCommon_isNull(message)  &&  message.indexOf("�ο�24") > -1 ){
					SCRP_MINWON24 = "E";
				}

				// ��ũ���� Ÿ�Ӿƿ� ó��
				loanRenewal4_007.fnScraping_timeout( "", "", message );  // ����� ��Ȱ���� �ʽ��ϴ�.

				// 3�� �� �ٽ� ��ũ���� �����ڵ� ���� ��ȸ
				setTimeout(function(){
					res_reSearch = loanRenewal4_007.fnScraping_reSearch(message, SCRP_MINWON24);
				} , 2000);

				ing.hide();




				return true;
			}
		},



		/* --------------------------------------------------------------------------------------
			��ũ���� ��û��� ��ȸ
			loanRenewal4_007.fnScraping_3
		 -------------------------------------------------------------------------------------- */
		fnScraping_3 : function( res_result_flag, SCRP_MINWON24 ){

			iajax.clearParam();
			iajax.addParam("PROC_GB", "1");   // 1 �ѵ���ȸ��ũ���� 2 �¶��μ������⽺ũ����
			//iajax.addParam("CHK_CSRF", random);
			iajax.addParam("SEND_MSG", "Y");
			// iajax.addParam("SCRP_NHIS", SCRP_NHIS);
			iajax.addParam("SCRP_MINWON24", SCRP_MINWON24);

			// ��������¡�����
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
		    			// ��ũ���� ��û ��� �������� �����
		    			if(res_result_flag){
		    				ing.hide();
		    				alert("�¶��� ���� ������\n�Ϸ�Ǿ����ϴ�.");

		    				// �ο�24 �ּ� ���� ����
		    				loanRenewal4_007.fnSave_1();

		    			}else{
		    				fnCommon_LoadingLayer_07(false);
		    				alert("������� �����Ͽ� ��������� ������ �������ּž� �մϴ�. ��û�����Ϸ� �� ����ڰ� �����帱���� �Դϴ�. �����ܰ踦 ��� �������ּ���.");

		    				$("#btn_next").hide();

		    				// �����û���ۼ� ȭ�� ȣ��
				    		var data_list = [
				    		                 	{ "key" : "view_name", "value" : "/lo/LOAN2112.jsp" }
				    		                  , { "key" : "title", "value" : "�����û�� �ۼ�" }
					   				          , { "key" : "parent", "value" : "IB" }
									          , { "key" : "topMenu", "value" : "IB_REQ" }
									          , { "key" : "leftMenu", "value" : "IB_REQ_010" }
			                    ];

							// renewal4 ���� url ȣ��
							fnCommon_callUrl( data_list );

		    			}

			    	}else{
			    		fnCommon_LoadingLayer_07(false);
			    		var errorMsg = json.RESULT_DESC;
			    		alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					fnCommon_LoadingLayer_07(false);
					// alert(error);
					fnCommon_SessionExpired();
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
		        }
			});
		},



		/* --------------------------------------------------------------------------------------
			�ο�24 �ּ� ���� ����
			loanRenewal4_007.fnSave_1
		 -------------------------------------------------------------------------------------- */
		fnSave_1 : function(){

			iajax.clearParam();
			//iajax.addParam("CHK_CSRF", random);
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
			iajax.addParam("MINWON24_SECMSG", $("#secMsg").val() );   // �̹��� �Է°�
			iajax.addParam("SCRP_MINWON24_SUCCESS_YN", "Y" );   // �ο�24 ��ũ���� ��������
			iajax.addParam("SCRAP_CERT_PASS_YN", "Y" );   // ��ũ���ο� ������ ��� ������ ����ִ��� ��ũ���� �̿�� ������ ���Է� PASS

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_007_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if( !fnCommon_isNull( json )  &&  !fnCommon_isNull( json.RESULT_NO )  &&  json.RESULT_NO == "0000" ){

			    		fnCommon_LoadingLayer_07(false);
						// �¶��μ������� �޴��� ���ٿ���
						if( !fnCommon_isNull(loanRenewal4_014_START_YN)  &&  loanRenewal4_014_START_YN == "Y"){
			    			fnCommon_goHome();

						}else{

		    				// �����û���ۼ� ȭ�� ȣ��
				    		var data_list = [
				    		                 	{ "key" : "view_name", "value" : "/lo/LOAN2112.jsp" }
			    		                 	  , { "key" : "title", "value" : "�����û�� �ۼ�" }
					   				          , { "key" : "parent", "value" : "IB" }
									          , { "key" : "topMenu", "value" : "IB_REQ" }
									          , { "key" : "leftMenu", "value" : "IB_REQ_010" }
			                    ];

							// renewal4 ���� url ȣ��
							fnCommon_callUrl( data_list );
						}

			    	}else{
			    		fnCommon_LoadingLayer_07(false)
			    		alert("�ο�24 �ּ�ó���� �����Ͽ����ϴ�.");
			    	}
			    },
				error: function(data, textStatus, error){
					fnCommon_LoadingLayer_07(false);
		    		alert("�ο�24 �ּ�ó���� �����Ͽ����ϴ�.");
				},
				complete: function() {
		        }
			});
		},



		/* --------------------------------------------------------------------------------------
			��ũ���� Ÿ�Ӿƿ� ó��
			loanRenewal4_007.fnScraping_timeout
		 -------------------------------------------------------------------------------------- */
		fnScraping_timeout : function( scrp_nm, job_nm, msg ){
			var timeout_msg = "����� ��Ȱ���� �ʽ��ϴ�.";
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
			�ٽ� ��ũ���� ���� ��ȸ
			loanRenewal4_007.fnScraping_reSearch
			return true : ���� ������ �����迡 �������� ����
			return false : ������ ������ �����迡 ���������� ����
			���� : �α��� �ΰ�� ȭ�� ���� �� �� ��ũ���� ����
			       �Ʒ��� ��� ȭ�� ������ �� ��ũ���� ����
			       	8000C311	�õ�/�ñ��� �Է��� �ʿ��մϴ�. Ȯ�� �� ��ȸ�Ͻñ� �ٶ��ϴ�.
					8000C312	�߸��� ����_�õ��Դϴ�. Ȯ�� �� �ٽ� �ŷ��Ͻñ� �ٶ��ϴ�.
					8000C322	�߸��� ����_�ñ����Դϴ�. Ȯ�� �� �ٽ� �ŷ��Ͻñ� �ٶ��ϴ�.
					8000C423	�߸��� �ּ��Դϴ�. Ȯ�� �� �ٽ� �ŷ��Ͻñ� �ٶ��ϴ�.
		 -------------------------------------------------------------------------------------- */
		fnScraping_reSearch : function( msg, SCRP_MINWON24 ){

			iajax.clearParam();
			/*iajax.addParam("CHK_CSRF", random);*/
			iajax.addParam("SCRT_NM", "MinWon");  // �ο�24

			$.ajax({
			    type: "post",
			    url: callURL_getScrtResCd,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	///////////////////////////////////////////////////////////////////////////////////////
			    	// �����ڵ� : 8000C616 ���� 2�� => ���ε�(���ȼ���)
			    	// �����ڵ� : 8000C311 ���� 5�� => ���ε�(�ּҰ˻�)
			    	// �׿� �α��ΰ��ÿ��� => ���ε�(�α���)
			    	// ==>
			    	// ���������ڵ� ����(0)       => ��ũ���� ��û��� ��ȸ(3002) "Y"
			    	// ���������ڵ� �����ο���(1) => ��ũ���� ��û��� ��ȸ(3002) "A"
			    	// �׿� 		����(9)       => �����޼��� �� ��ũ���� ��û��� ��ȸ(3002) "E"

			    	fnCommon_LoadingLayer_07(false);
		    		if( json.DATA.RES_CODE == "8000C616" || json.DATA.RES_CODE == '80003391' ){

		    			alert("���ȼ��ڰ� �߸� �ԷµǾ����ϴ�.\nȮ�� �� �ٽ� ���� ��Ź�帮�ڽ��ϴ�.\n\n"  + msg.split("<br/>").join("\n"));

			    		var data_list = [
			    		                 	{ "key" : "view_name", "value" : "/lo/LOAN2107.jsp" }
			    		                 	//{ "key" : "view_name", "value" : "loanRenewal4_007" }
			    		                  , { "key" : "title", "value" : "���������Է�" }
					                    ];

									// ���ε�
			    		fnCommon_callUrl( data_list );
			    		return false;

		    		}else if(json.DATA.RES_CODE == '8000C311' || json.DATA.RES_CODE == '8000C312' ||
			    				 json.DATA.RES_CODE == '8000C322' || json.DATA.RES_CODE == '8000C423' ||
			    				 json.DATA.RES_CODE == '8000C019' ) {

		    			alert("�ּ��Է��� �߸��Ǿ����ϴ�.\n�ֹε�ϵ�� �ּ����� ��Ȯ�� �Է����ּ���.\n\n"  + msg.split("<br/>").join("\n"));

			    		var data_list = [
			    		                 	//{ "key" : "view_name", "value" : "loanRenewal4_007" }
			    		                 	{ "key" : "view_name", "value" : "/lo/LOAN2107.jsp" }
			    		                  , { "key" : "title", "value" : "���������Է�" }
					                    ];

									// ���ε�
			    		fnCommon_callUrl( data_list );
			    		return false;

		    		}

			    	if (json.DATA.JOB_NM == '�α���'){
			    		alert(msg.split("<br/>").join("\n"));

			    		var data_list = [
//			    		                 	{ "key" : "view_name", "value" : "loanRenewal4_007" }
				    		                 	{ "key" : "view_name", "value" : "/lo/LOAN2107.jsp" }
		    		                  , { "key" : "title", "value" : "���������Է�" }
					                    ];

									// ���ε�
			    		fnCommon_callUrl( data_list );
			    		return false;
		    		}


			    	if(json.DATA.ANS_PROC == '0') {
			    		SCRP_MINWON24 = "Y";

			    		loanRenewal4_007.fnScraping_3(true, SCRP_MINWON24);
						return true;

			    	}else if (json.DATA.ANS_PROC == '1') {
			    		SCRP_MINWON24 = "A";

			    		loanRenewal4_007.fnScraping_3(true, SCRP_MINWON24);
	    				return true;

			    	}else {
			    		SCRP_MINWON24 = "E";
			    		alert(msg.split("<br/>").join("\n"));

						loanRenewal4_007.fnScraping_3(false, SCRP_MINWON24);
		    			return false;
			    	}
			    },
		    	error: function(data, textStatus, error) {
		    		fnCommon_SessionExpired();
				},
				complete: function() {
				}
			});

			//return true;
		},



		/* --------------------------------------------------------------------------------------
			Ȯ���� üũ�ڽ� Ŭ���� �̺�Ʈ
			loanRenewal4_007.fnClickAgree
		 -------------------------------------------------------------------------------------- */
		fnClickAgree : function(e){
			var next_yn_flag = false;

			// üũ�ڽ� ���ǽ� Ȯ�ι�ư ����
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
		        $('body,html').animate({scrollTop: $("#btn_next").offset().top},500);   // ��ũ�� �̵�
			}else{
				$("#btn_next").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			���ȼ��� �����
			loanRenewal4_007.fnRefreshImage
		 -------------------------------------------------------------------------------------- */
		fnRefreshImage : function(){

			// �Է¼��� �ʱ�ȭ
			$("#secMsg").val("");

			/*var params = {
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
//							$("#secImg").css("width", "140px");
//							$("#secImg").css("height", "70px");
//							$("#secImg").show();

//						} else {
							// Ÿ�Ӿƿ� ó��
//							loanRenewal4_007.fnTimeout("MinWon", "���ȹ���", json.message);

//							alert(json.message.split("<br/>").join("\n"));
//						}
//					}
//				};
//			SDSFrameWork.plugin.execute(params);
			fnCommon_Annoymous_Security();
		},



		/* --------------------------------------------------------------------------------------
			��ũ���� Ÿ�Ӿƿ� ó��
			loanRenewal4_007.fnTimeout
		 -------------------------------------------------------------------------------------- */
		fnTimeout : function(scrp_nm, job_nm, msg){
			var timeout_msg = "����� ��Ȱ���� �ʽ��ϴ�.";
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
			�ּҰ˻� �˾� ȣ��
			loanRenewal4_007.fnSearchAddress
		 -------------------------------------------------------------------------------------- */
		fnSearchAddress : function(){

			/*
			// test �׽�Ʈ
			var str = '[{"�õ�":"����Ư����","�ñ���":["������","������"]}]';
			$("#orgDistrict").val(str);  // �õ��� ����Ʈ
			$("#step").val("1");

			// �ּ��˾� ȣ��
			showDialog(callURL_post_minwon24, 420);   // pop_post_minwon24.jsp
			return;
			*/

			// �����κ�ȭ�� ���ϱ� ���� �˻���ư���� ��Ŀ�� �����̵�
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
								str = [{"�õ�":"����Ư����"},{"�ñ���":"������"}];
								*/

								$("#orgDistrict").val(str);  // �õ��� ����Ʈ
								$("#step").val("1");

								// �ּ��˾� ȣ��
								showDialog(callURL_post_minwon24, 420);   // pop_post_minwon24.jsp
							}

						} else {
							// Ÿ�Ӿƿ� ó��
							loanRenewal4_007.fnTimeout("MinWon", "���������˻�", json.message);

							alert(json.message.split("<br/>").join("\n"));
						}
					}
				};
			SDSFrameWork.plugin.execute(params);
		}



	};   // var loanRenewal4_007 = {





	/* --------------------------------------------------------------------------------------
		�߰� �������� ȭ��
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_008 = {

		/* --------------------------------------------------------------------------------------
			�⺻����
			loanRenewal4_008.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// ���� ���� �̺�Ʈ
			$("input[type='text'][name='cert_custNm']").on("keyup", loanRenewal4_008.fnKeyup_custNm );

			// ���⺻���� ��ȸ
			loanRenewal4_008.fnSearch_1();
		},



		/* --------------------------------------------------------------------------------------
			�޴������� ��ȿ��üũ
			loanRenewal4_008.fnCert_phone_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_valid : function( type ){
			var result = true;

			// ��Ż�
			var telecom = $("#telecom option:selected").val();
			if( fnCommon_isNull(telecom) ){
				alert("��Ż縦 �������ּ���.");
				$("#telecom").focus();
				return false;
			}

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( fnCommon_isNull(cert_hndNo) ){
				alert("�޴�����ȣ�� �Է����ּ���.");
				$("#cert_hndNo").focus();
				return false;
			}

			var cert_hndNo_pattern = /^\d{10,11}$/;
			if(!cert_hndNo_pattern.test(cert_hndNo)){
				alert("�޴�����ȣ�� ��Ȯ�ϰ�\n�Է����ּ���.");
				$("#cert_hndNo").focus();
				return false;
			}


			var allChk_mobile = $("#allChk_mobile")[0].checked;
			if( !allChk_mobile ){
				alert("�޴��� �������� ��ü���Ƿ� �����Ͻ� �� �������ּ���.");
				return false;
			}

			if( !fnCommon_isNull(type) ){

				// �Էµ� ������ȣ ����
				if(type == "valid"){
					var aut_auth_no = $("#aut_auth_no").val();
					if( fnCommon_isNull(aut_auth_no) ){
						alert("������ �Ϸ���� �ʾҽ��ϴ�.\n������û �� ������ȣ�� �Է����ּ���.");
						return false;
					}
				}
			}

			return result;
		},



		/* --------------------------------------------------------------------------------------
			�޴��� �������� - �Էµ� �޴��� ������ȣ ����
			loanRenewal4_008.fnCert_phone_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_confirm : function(){

    		// ���������ϷῩ��
    		isAuthed = false;

			/*// �޴������� ��ȿ��üũ // valid : ��ȣ����
			var result = loanRenewal4_008.fnCert_phone_valid("valid");
			if(!result){
				return false;
			}*/

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();

			iajax.addParam("HND_NO", cert_hndNo );   // �޴�����ȣ
			iajax.addParam("com_kind", $("#telecom").val() );   // ��Ż�
			iajax.addParam("aut_auth_no", $("#aut_auth_no").val());	  // �Էµ� ������ȣ
			iajax.addParam("PAGE_FROM", "loanRenewal4_008");

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if( !fnCommon_isNull( json )  &&  !fnCommon_isNull( json.RESULT_NO )  &&  json.RESULT_NO == "0000" ){

			    		// Ÿ�̸� ����
			    		loanRenewal4_008.fn_stopTimer();

			    		// ���������ϷῩ��
			    		isAuthed = true;

			    		// �������� ���� ó��
			    		// loanRenewal4_008.fnCert_Success();

			    		SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;  // �Ǻ���ũ���� ���� ����
			    		SCRP_NHIS_EXP = json.SCRP_NHIS_EXP;  // �ǰ����轺ũ�������� ����

			    		SCRP_MINWON24_SUCCESS_YN = json.SCRP_MINWON24_SUCCESS_YN;   // �ο�24��ũ���μ�������
			    		SCRP_MINWON24_ERROR_YN = json.SCRP_MINWON24_ERROR_YN;   // �ο�24��ũ������ֿ���
			    		SCRP_MINWON24_EXP = json.SCRP_MINWON24_EXP;  // �ο�24��ũ�������� ����


						// default �����û���ۼ� ȭ��
						var view_name = "/lo/LOAN2112.jsp";
						var title = "�����û�� �ۼ�";

						// ȭ�� �̵�
						var data_list = [
								{ "key" : "view_name", "value" : view_name }
							  , { "key" : "title", "value" : title }
							, { "key" : "parent", "value" : "IB" }
							, { "key" : "topMenu", "value" : "IB_REQ" }
							, { "key" : "leftMenu", "value" : "IB_REQ_010" }
							];

						// renewal4 ���� url ȣ��
						fnCommon_callUrl( data_list );

			    	}else{
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					ing.hide();
					fnCommon_SessionExpired();
				},
				beforeSend: function() {
					ing.show();
				},
				complete: function(){
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�޴��� ������û Ÿ�̸� ����
			loanRenewal4_008.fn_startTimer
		 -------------------------------------------------------------------------------------- */
		fn_startTimer : function(){
			seconds = 180;
			countDownTimer = setInterval("loanRenewal4_008.fn_secoundPassed()", 1000);
		},

		/* --------------------------------------------------------------------------------------
			�޴��� ������û Ÿ�̸� ����
			loanRenewal4_008.fn_stopTimer
		 -------------------------------------------------------------------------------------- */
		fn_stopTimer : function(){
			clearInterval(countDownTimer);
		},

		/* --------------------------------------------------------------------------------------
			�޴��� ������û Ÿ�̸�
			loanRenewal4_008.fn_secoundPassed
		 -------------------------------------------------------------------------------------- */
		fn_secoundPassed : function(){
			var minutes = Math.round((seconds - 30) / 60);
			var remainingSeconds = seconds % 60;

			if(remainingSeconds < 10) {
				remainingSeconds = "0" + remainingSeconds;
			}

			$("#cert_phone_timer").html("[" + minutes + " : " + remainingSeconds + "]");

			if( fnCommon_isNull(seconds) ){
				alert("�޴��� ������ �����Ͽ����ϴ�.\n�����ð��� �ʰ��� ���\n������ȣ ���û �� �Է����ּ���.");
				loanRenewal4_008.fn_stopTimer();
			}else{
				seconds--;
			}
		},



		/* --------------------------------------------------------------------------------------
			�޴��� �������� ���� ���� �ڼ�������
			loanRenewal4_008.fnShow_agree_certif01
		 -------------------------------------------------------------------------------------- */
		fnShow_agree_certif01 : function(){

			popupURL = popupURL_clause_auth_hp_skt;
			showDialog(popupURL, 420);

		},



		/* --------------------------------------------------------------------------------------
			�Ǹ����� ��û ��ȿ�� üũ
			loanRenewal4_008.fnSave_realName_valid
		 -------------------------------------------------------------------------------------- */
		fnSave_realName_valid : function(){
			var result = true;

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( fnCommon_isNull(cert_hndNo)  ||  cert_hndNo.length < 10 ){
				alert("�޴�����ȣ�� �Է����ּ���.");
				$("#cert_hndNo").focus();
				return false;
			}

			var cert_hndNo_pattern = /^\d{10,11}$/;
			if(!cert_hndNo_pattern.test(cert_hndNo)) {
				alert("�޴�����ȣ�� ��Ȯ�ϰ�\n�Է����ּ���.");
				$("#cert_hndNo").focus();
				return false;
			}

			return result;
		},



		/* --------------------------------------------------------------------------------------
			�Ǹ����� ��û
			loanRenewal4_008.fnSave_realName
		 -------------------------------------------------------------------------------------- */
		fnSave_realName : function(){

			// �Ǹ����� ��û ��ȿ�� üũ
			var result = loanRenewal4_008.fnSave_realName_valid();
			if(!result){
				return false;
			}

			// �޴������� ��ȿ��üũ // valid : ��ȣ����
			var result = loanRenewal4_008.fnCert_phone_valid("valid");
			if(!result){
				return false;
			}

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();

			iajax.addParam("N01", "0");   // ��ȭ	// ȭ�鿡�� ������ �׸�
			iajax.addParam("N02", "0");   // DM		// ȭ�鿡�� ������ �׸�
			iajax.addParam("PAGE_FROM", "loanRenewal4_008");

			// �������� ���� �����ϱ� ���� �޴�����ȣ ����
			iajax.addParam("HND_NO", cert_hndNo );   // �޴�����ȣ


			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_NAME,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){

				    	// �Ǹ����� �� ������ �������� ����
						// �Էµ� �޴��� ������ȣ ����
						loanRenewal4_008.fnCert_phone_confirm();

			    	}else{
						ing.hide();

				    	var authErrMsg  = "�Ǹ������� �����Ͽ����ϴ�.\n";
				        authErrMsg += "Ȯ�� �� �ٽ� �õ����ּ���.\n";
				        authErrMsg += "���� ������ �Ǹ��� ����� ���\n";
				        authErrMsg += "NICE (02-2122-4000)\n";
				        authErrMsg += "���� ���� �� �̿밡���մϴ�.\n\n";
				        authErrMsg += "�ſ���ȸ ���ܼ��� �̿��\n";
				        authErrMsg += "�������� �� ����ٶ��ϴ�.\n";
				        authErrMsg += "NICE: 02-2122-4000\n";
				        authErrMsg += "KCB: 02-708-1000";

						alert(authErrMsg.split("<br/>").join("\n"));
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
					alert("�Ǹ������� �����Ͽ����ϴ�.\nȮ�� �� �ٽ� �õ����ּ���.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�޴��� ������ȣ ��û
			loanRenewal4_008.fnCert_phone_request
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_request : function(){

    		// ���������ϷῩ��
    		isAuthed = false;

			// �ʱ�ȭ
			$("#cert_phone_timer_dl").hide();		// ������ȣ �Է� ����
			$("#aut_auth_no").hide();	 // ������ȣ
			$("#aut_auth_no").val("");

			// �Ǹ����� ��û ��ȿ�� üũ
			var result = loanRenewal4_008.fnSave_realName_valid();
			if(!result){
				return false;
			}

			// �޴������� ��ȿ��üũ
			var result = loanRenewal4_008.fnCert_phone_valid();
			if(!result){
				return false;
			}

			iajax.clearParam();

			// ��Ż�
			var telecom = $("#telecom").val();
			iajax.addParam("COM_KIND", telecom );
			iajax.addParam("PAGE_FROM", "loanRenewal4_008");

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( !fnCommon_isNull(cert_hndNo)  &&  !fnCommon_isNull(cert_hndNo.length)  &&  cert_hndNo.length >= 10 ){
				iajax.addParam("HND_NO", cert_hndNo);
			}

			iajax.addParam("APP_GUBUN", "1");


			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_SMS,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000"){

			    		// �����ð� timer ����
						$("#cert_phone_timer_dl").show();
						$("#aut_auth_no").show();

			    		// ������û ��ư
			    		$("#certif01_btn_1").html("���û");
			    		$("#certif01_btn_1").removeClass("on");

			    		// Ÿ�̸� ����
			    		loanRenewal4_008.fn_stopTimer();
			    		loanRenewal4_008.fn_startTimer();

			    	}else{
			    		alert("������ȣ �߼ۿ� �����Ͽ����ϴ�. �ٽ� �õ����ּ���.");
			    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error) {
					ing.hide();
					alert("�Ǹ������� �����Ͽ����ϴ�.\nȮ�� �� �ٽ� �õ����ּ���.");
		    		console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�ֹε�Ϲ�ȣ �ٰ� �� ������� �ȳ� �˾�
			loanRenewal4_008.fnPopup_1
		 -------------------------------------------------------------------------------------- */
		fnPopup_1 : function( type ){

			var msg = "";
			msg += "<p>�������������� �ſ������� �̿� �� ��ȣ�� ���� ���� ����� �� 37���� 2�� �ǰ��Ͽ� �ֹε�Ϲ�ȣ�� �����մϴ�.</p>";
			msg += "<p>Ÿ���� �ֹε�Ϲ�ȣ�� �����ϰų�, ��������ϴ� �ڴ� 3�� ������ ¡�� �Ǵ� 3õ���� ������ ������ �ΰ��� �� �ֽ��ϴ�.</p>";

			// �޼��� �˾�
			fnCommon_popup("open", msg);
		},



		/* --------------------------------------------------------------------------------------
			�޴�����ȣ ���� �̺�Ʈ
			loanRenewal4_008.fnKeyup_hndNo
		 -------------------------------------------------------------------------------------- */
		fnKeyup_hndNo : function(e){

			// ���������ϷῩ��
			isAuthed = false;

			var value = e.target.value;

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			value = fnCommon_getOnlyNumber(value);

			// �ʵ忡 �缳���� ��
			var value_format = value;

			if( !fnCommon_isNull(value)  &&  value.length > 0 ){
				if(value.length > 3){

					// ���ڸ� �߶󳻱�
					value_format = value.substring(0, 3);
					value = value.substring(3, value.length);

					// ������ ���ڸ� �̻��̸�
					if(value.length > 3){

						// �߰��ڸ� �߶󳻱�
						value_format += "-" + value.substring(0, 3);
						value = value.substring(3, value.length);

						// ������ ���ڸ� �̻��̸� �߰��ڸ��� ���ڸ� �� �ѱ��
						if(value.length > 4){
							value_format += value.substring(0, 1);
							value = value.substring(1, value.length);
						}
					}

					// ���� ���ڸ��� ������ �̰͵� ���̱�
					if( !fnCommon_isNull(value) ){
						value_format += "-" + value;
					}
				}
			}

			// ��� �޴�����ȣ �ʵ忡 ����
			$("input[type='tel'][name='cert_hndNo']").val(value_format);
		},



		/* --------------------------------------------------------------------------------------
			�ֹε�Ϲ�ȣ ���ڸ� ���� �̺�Ʈ
			loanRenewal4_008.fnKeyup_residNo_1
		 -------------------------------------------------------------------------------------- */
		fnKeyup_residNo_1 : function(e){

    		// ���������ϷῩ��
    		isAuthed = false;

			// ���ڿ� ���� �� ���ڸ� ��ȯ
    		var value = e.target.value;
    		e.target.value = fnCommon_getOnlyNumber(value);
		},



		/* --------------------------------------------------------------------------------------
			���� ���� �̺�Ʈ
			loanRenewal4_008.fnKeyup_custNm
		 -------------------------------------------------------------------------------------- */
		fnKeyup_custNm : function( type ){

			// ���������ϷῩ��
			isAuthed = false;

			if( !fnCommon_isNull(type) ){

				// ���� X Ŭ��
				if(type == "delete"){
					$("#cert_custNm").val("");
					$("#cert_custNm").focus();  // Ű�е尡 ������� �����ϱ�
				}
			}

			// �̸� ������ ������ư ���̰�
			var cert_custNm = $("#cert_custNm").val();
			if( !fnCommon_isNull(cert_custNm) ){
				$("#cert_custNm_delete_p").show();
			}else{
				$("#cert_custNm_delete_p").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			���⺻���� ��ȸ
			loanRenewal4_008.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function(){

			// ���⺻���� ��ȸ
			iajax.clearParam();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

						// �޴�����ȣ
						var hndNo = json.hndNo;
						if( !fnCommon_isNull(hndNo) ){

							// ���ڿ� ���� �� ���ڸ� ��ȯ
							hndNo = fnCommon_getOnlyNumber(hndNo);

							// �޴�����ȣ ���� �̺�Ʈ�� ����ؼ� �� ����
							loanRenewal4_008.fnKeyup_hndNo({target:{value:hndNo}});
						}

						SCRP_MINWON24_ERROR_YN = json.SCRP_MINWON24_ERROR_YN;
						SCRP_NHIS_EXP = json.SCRP_NHIS_EXP;
						SCRP_MINWON24_EXP = json.SCRP_MINWON24_EXP;
						SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;
						SCRP_MINWON24_SUCCESS_YN = json.SCRP_MINWON24_SUCCESS_YN;
						SUNSHINELOAN_YN = json.SUNSHINELOAN_YN;

						REG_KIND = json.REG_KIND;  // ���ڼ������(�ڼ�����ó ����)
						ST_CD = json.ST_CD;  // �������
						SHINHAN_FAN_YN = json.SHINHAN_FAN_YN;  // �ų������ǿ���
						CERT_HNDNO = json.CERT_HNDNO;   // �����޴�����ȣ
						ONLINE_DOC_C = json.ONLINE_DOC_C;   // �ο�24 ������ ����
						ONLINE_DOC_D = json.ONLINE_DOC_D;   // �Ǻ�+�ο�24 ������ ����
						ONLINE_DOC_F = json.ONLINE_DOC_F;   // ����û ��ũ���� ����
						GOODS_CD_LNC3005 = json.GOODS_CD;   // ��ǰ�ڵ�

						// �ѵ������ȸ ȭ�鿡�� �ڵ����� ��û�ϱ� Ŭ���Ͽ� �Ѿ�� ��� ���õ� �����û ��ǰ����
						LNC3003_selected_json = json.LNC3003_selected_json;

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					fnCommon_SessionExpired();
				},
				complete: function() {
				}
			});
		},

		/* --------------------------------------------------------------------------------------
			�޴��� ���� ����
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
		�����û�� �ۼ� ȭ��
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_012 = {

			/* --------------------------------------------------------------------------------------
				�⺻����
				loanRenewal4_012.fnInit
			 -------------------------------------------------------------------------------------- */
			fnInit : function(){

				// ��û�����Է� ����
				$("#slid_1_li").addClass("active");  // Ȱ��ȭ
				$("#slid_1_div").show();  // �ϴ� ����

				// �����̵� �̺�Ʈ ����
				// $('.toggleList li .btnToggle').on("click", loanRenewal4_012.fnEvent_Slide );

				// ���ʳ��Կ����� ���ϱ�
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

				// *���������̹Ƿ� ���ڷ� ��ȯ�ʼ�
				firstRepayDt = currentYear + "" + currentMonth + "" + currentDate;
				firstRepayDt_format = currentYear + "." + currentMonth + "." + currentDate;
				$("#firstRepayDt_format").html("");   // ���ʳ��Կ����� ����

				// ����� ���� ��뿩�θ� ���� �ʱ�ȭ
				$("#qna0101").prop("checked", true);
				$("#qna0101").parent().addClass("checked");

				// �⺻�� ��ȸ
				loanRenewal4_012.fnSearch_1();
			},



			/* --------------------------------------------------------------------------------------
				���ּ� �Է½� ���ڼ� ����
				loanRenewal4_012.fnKeyup_homeAddr2
			 -------------------------------------------------------------------------------------- */
			fnKeyup_homeAddr2 : function(e){
				var limit = 100;
				var value = e.target.value;

				// byte ���Ѹ�ŭ �߶󳻱�
				value = fnCommon_cutByte(limit, value);
				$("#homeAddr2").val(value);
			},



			/* --------------------------------------------------------------------------------------
				��ü�� ���� �̺�Ʈ 1 - ��ȯ������ ��ȸ�Ͽ� ù ������ ����
				loanRenewal4_012.fnChange_cmsDate_1
			 -------------------------------------------------------------------------------------- */
			fnChange_cmsDate_1 : function(e){

				$("#firstRepayDt_format").html("");  // ���� ù ������ �ʱ�ȭ
				workingday_confirm_flag = false;  // �������� ������ Ȯ�� ���� �ʱ�ȭ

				var hafDay = e.target.value;  // ������üũ

				if( hafDay == "" || hafDay == null ){
					return false;
				}

				var today = new Date();
				var yyyy = today.getFullYear();
				var mm = today.getMonth() + 1;
				var dd = today.getDate();
				var addMontyNumber = 1;  // default +1


				// �������ڸ� ������üũ ���
				if(parseInt(dd) == parseInt(hafDay)){
					workingday_confirm_flag = true;  // �������� ������ Ȯ�� ����

				// ���� �������ڸ�
				}else if(parseInt(dd) > parseInt(hafDay)){
					addMontyNumber = addMontyNumber - 1;

				// ���� ��������
				}else{
					// addMontyNumber = 1;
				}

				mm = today.getMonth() + addMontyNumber;

				var yyyy_string = String(yyyy);
				var mm_string = String(mm);
				var dd_string = hafDay;

				// �ڸ��� ä���
				yyyy_string = fnCommon_lpad( yyyy_string, 4, "0" );
				mm_string = fnCommon_lpad( mm_string, 2, "0" );
				dd_string = fnCommon_lpad( dd_string, 2, "0" );

				// ���� ����������
				hafDay_DD = dd_string;  // yyyy_string + mm_string + dd_string;


				// hafDay_DD  parameter �� ������ ��ȯ������ ��ȸ �� ������üũ �Ѵ�
				// ��ȯ������ ����ȸ�Ͽ� ���� ù �������� ����
				// ��ȯ������ ��ȸ // ����ù������ ���ϱ� ���� ������ ������
				loanRenewal4_012.fnSearch_paySchedule( hafDay_DD );
			},



			/* --------------------------------------------------------------------------------------
				��ü�� ���� �̺�Ʈ 2 - ������ üũ
				loanRenewal4_012.fnChange_cmsDate_2
			 -------------------------------------------------------------------------------------- */
			fnChange_cmsDate_2 : function(e){
				iajax.clearParam();
				// ����� 5������ - ����
				//iajax.addParam("CHK_CSRF", random);
				iajax.addParam("haf_day", hafDay_DD);

				$.ajax({
				    type: "post",
				    url: callURL_getHafCheck,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.DATA)  &&  !fnCommon_isNull(json.DATA.HAF_CHECK_YN)  &&  json.DATA.HAF_CHECK_YN == "Y" ){
							workingday_confirm_flag = true;  // �������� ������ Ȯ�� ����
							nextsw =true;
				    	}else{
				    		alert("��ü���� ��û�Ϸκ��� 4���������ĺ��� ������ �����մϴ�.");
				    		nextsw =false;
				    	}
				    },
					error: function(data, textStatus, error){
						ing.hide();
						// alert(error.split("<br/>").join("\n"));
						fnCommon_SessionExpired();
						console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function(){
						ing.hide();
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				������ȭ��ȣ ���� �̺�Ʈ
				loanRenewal4_012.fnKeyup_workTelNo
			 -------------------------------------------------------------------------------------- */
			fnKeyup_workTelNo : function(e, telno){
				var value = $("#workTelNum").val();

				if( fnCommon_isNull(e)  &&  !fnCommon_isNull(telno) ){
					value = telno;
				}

				// ���ڿ� ���� �� ���ڸ� ��ȯ
				value = fnCommon_getOnlyNumber(value);

				// �ʵ忡 �缳���� ��
				var value_format = value;
				if( !fnCommon_isNull(value)  &&  value.length > 0 ){

					var first_cut_length = 3;

					// 02 �� �����ϸ� ���� �缳��
					if(value.indexOf("02") == 0){
						first_cut_length = 2;
					}

					if(value.length > first_cut_length){

						// ���ڸ� �߶󳻱�
						value_format = value.substring(0, first_cut_length);
						value = value.substring(first_cut_length, value.length);

						// ������ ���ڸ� �̻��̸�
						if(value.length > 3){

							// �߰��ڸ� �߶󳻱�
							value_format += "-" + value.substring(0, 3);
							value = value.substring(3, value.length);

							// ������ ���ڸ� �̻��̸� �߰��ڸ��� ���ڸ� �� �ѱ��
							if(value.length > 4){
								value_format += value.substring(0, 1);
								value = value.substring(1, value.length);

								// ������ ���ڸ� �̻��̸� ���ڸ� �߶������
								if(value.length > 4){
									value = value.substring(0, 4);
								}
							}
						}

						// ���� ���ڸ��� ������ �̰͵� ���̱�
						if( !fnCommon_isNull(value) ){
							value_format += "-" + value;
						}
					}
				}

				// �ʵ忡 ����
				$("#workTelNum").val( value_format )
			},



			/* --------------------------------------------------------------------------------------
				������ �����̵� �̵�
				loanRenewal4_012.fnMove_slide
			 -------------------------------------------------------------------------------------- */
			fnMove_slide : function( num ){
				if( !fnCommon_isNull(num) ){

					// ��ȿ��üũ
					var result = loanRenewal4_012.fnValidationCheck("target", num);
					if(!result){
						return false;
					}

					// �������Է�
					if(num == 2){

						// ��û�����Է� �ݱ�
						$("#slid_1_li").removeClass("active");
						$("#slid_1_div").hide();

						// �������Է� ����
						$("#slid_2_li").removeClass("checkToggle");  // ��Ȱ����� ���ֱ�
						$("#slid_2_li").addClass("active");
						$("#slid_2_div").show();

						// ��ȯ������ ��ȸ // ����ù������ ���ϱ� ���� ������ ������
						loanRenewal4_012.fnSearch_paySchedule();


					// �ڵ���ü �� �Աݰ������� �Է�
					}else if(num == 3){

						// �������Է� �ݱ�
						$("#slid_2_li").removeClass("active");
						$("#slid_2_div").hide();

						// �ڵ���ü �� �Աݰ������� �Է� ����
						$("#slid_3_li").removeClass("checkToggle");  // ��Ȱ����� ���ֱ�
						$("#slid_3_li").addClass("active");
						$("#slid_3_div").show();
					}

					// ��ũ�� �̵�
			        // $('body,html').animate({scrollTop: 0}, 500);
				}
			},



			/* --------------------------------------------------------------------------------------
				�ִ�ݾ� Ŭ�� �̺�Ʈ
				loanRenewal4_012.fnClick_maxAmt
			 -------------------------------------------------------------------------------------- */
			fnClick_maxAmt : function(e){
//				var checked = $("#maxAmt").prop("checked");
				var checked = $("#maxAmt").prop("checked");
				if( !fnCommon_isNull(checked, "boolean") ){

					// ��û�ݾ� ����
					loanRenewal4_012.fnKeyup_inputAmt( "default" );

				}else{
					// �ʱ�ȭ
					$("#req_amt").val("");   // ��û�ݾ�
					$("#input_manwon").parent().hide();
					$("#input_manwon").html("");   // ��������
					
					// �¶����޻�� ������ �ڵ����
					if(!fnCommon_isNull(goods_CD)  &&  goods_CD == "52351" ){
						$("#grtFee").val("�� " + calcGrtFee);		
					}
				}
			},



			/* --------------------------------------------------------------------------------------
				��û�ݾ� 10���������� �缳��
				loanRenewal4_012.fnKeyup_inputAmt_2
			 -------------------------------------------------------------------------------------- */
			fnKeyup_inputAmt_2 : function(e){

				// �������� Ȥ�� �𸣴ϱ� �ʱ�ȭ ó�� ����
				$("#input_manwon").parent().hide();
				$("#input_manwon").html("");

				var value = $("#req_amt").val();
				if( !fnCommon_isNull(value) ){

					// ���ڿ� ���� �� ���ڸ� ��ȯ
					value = fnCommon_getOnlyNumber(value);
					var value_number = Number(value);
					if(value_number > 100000){

						value_number = value_number - value_number%100000;
						value = String(value_number);

						// �޸����
						var value_format = fnCommon_addComma(value);
						$("#req_amt").val( value_format );

						if(value_number > 10000){
							value_number = parseInt( value_number/10000 );   // �������� ���� ����
							if(value_number > 0){
								value = String(value_number);

								// �޸����
								value_format = fnCommon_addComma(value);

								// �� ������ �Ѱ����ۿ� �������� �����ϱ�
								$("#input_manwon").parent().show();
								$("#input_manwon").html(value_format + "����");
							}
						}

						$("#req_amt").focus();				
					}
				}

			},



			/* --------------------------------------------------------------------------------------
				��û�ݾ� �Է¿��� �Է�
				loanRenewal4_012.fnKeyup_inputAmt
			 -------------------------------------------------------------------------------------- */
			fnKeyup_inputAmt : function(e){
			
				// �������� Ȥ�� �𸣴ϱ� �ʱ�ȭ ó�� ����
				$("#input_manwon").parent().hide();
				$("#input_manwon").html("");

				var id = "";
				var value = "";

				// �⺻���� ����̸�
				if( !fnCommon_isNull(e)  &&  e == "default" ){
					id = "req_amt";  // ��û�ݾ� �Է¿���
					value = REQ_AMT;  // �ѵ������ȸ ȭ�鿡�� �Էµ� ��û�ݾ�

				}else{
					id = e.target.id;
					value = $("#" + id).val();
				}

				if( !fnCommon_isNull(value) ){

					// ���ڿ� ���� �� ���ڸ� ��ȯ
					value = fnCommon_getOnlyNumber(value);
					var value_number = Number(value);
					if(value_number > 0){

						/*
						// �ѵ������ȸ ȭ�鿡�� �Էµ� ��û�ݾ�(�ѵ������� ���)
						if( !fnCommon_isNull(REQ_AMT) ){
							var REQ_AMT_number = Number(REQ_AMT);

							// �ѵ��ݾ� ������ �ѵ��ݾ����� �缳��
							if(value_number > REQ_AMT_number){
								value_number = REQ_AMT_number;

								value = String(value_number);
							}
						}
						*/

						// �޸����
						var value_format = fnCommon_addComma(value);
						$("#" + id).val( value_format );

						if(value_number > 10000){
							value_number = parseInt( value_number/10000 );   // �������� ���� ����
							if(value_number > 0){
								value = String(value_number);

								// �޸����
								value_format = fnCommon_addComma(value);

								// �� ������ �Ѱ����ۿ� �������� �����ϱ�
								$("#input_manwon").parent().show();
								$("#input_manwon").html(value_format + "����");
							}
						}
					}
				}
				
				// �¶����޻�� ������ �ڵ���� 
				if(!fnCommon_isNull(goods_CD)  &&  goods_CD == "52351" ){
					searchGrtFee();					
				}
				
			},



			/* --------------------------------------------------------------------------------------
				����Ⱓ ���� �̺�Ʈ
				loanRenewal4_012.fnChange_loanPeriodCombo
			 -------------------------------------------------------------------------------------- */
			fnChange_loanPeriodCombo : function(e){
				var value = e.target.value;

				// 116 �ڵ���û���ۼ�  // �̾��ϱ�� ������ ���
				if( !fnCommon_isNull(REG_KIND)  &&  REG_KIND == "116" ){

					// �������߱޿��� 0 �̹߱��̸�
					if( fnCommon_isNull(FEE_PAPER_ISSUE_YN)  ||  FEE_PAPER_ISSUE_YN == "0" ){

						// ����Ⱓ �ѵ������� ���氡��
						if( !fnCommon_isNull(loanPeriodCombo_maxval)  &&  (Number(loanPeriodCombo_maxval) < Number(value)) ){
							alert("������ ����Ⱓ " + loanPeriodCombo_maxval + "���������� ������ �� �ֽ��ϴ�.");

							// ���� ������ �Ⱓ���� ���� ���� // ���� ���� �Ŀ� �̺�Ʈ�� ����Ǵ� �������� �ð��� ����
							setTimeout(function(){
								$("#loanPeriodCombo").val(loanPeriodCombo_maxval);
							}, 300);

						}
					}
				}
				
				// �¶����޻�� ������ �ڵ����
				if(!fnCommon_isNull(goods_CD)  &&  goods_CD == "52351" ){
					searchGrtFee();					
				}	

			},



			/* --------------------------------------------------------------------------------------
				�����̵� �� Ŭ�� �̺�Ʈ
				loanRenewal4_012.fnEvent_Slide
			 -------------------------------------------------------------------------------------- */
			fnEvent_Slide : function(e, btn_slid_id){

				// �����̵� ���� ���ۿ���
				var close_flag = false;

				// �̺�Ʈ ��� �����̵� ��۹�ư ��ü ����
			    var toggle_button = null;

			    // ���� ����� id �޾Ƽ� ��ü ����
				if( !fnCommon_isNull(btn_slid_id) ){
					toggle_button = $("#" + btn_slid_id);
				}else{
					toggle_button = $(this);
					close_flag = true;   // �����̵� ���� ���ۿ��� // ���� �ڹ��� ���۽ÿ��� �ݿ�
				}

			    // var toggle_button = $(this);
			    var toggle_li = toggle_button.parent('li');

			    // ��Ȱ�� �����̵� �ٴ� Ŭ���ص� �����ʱ�, ���� �Է� ������ ��� �Է��� �Ŀ� Ȯ�ι�ư Ŭ���Ҷ� �����ֱ�
			    var className = toggle_li.attr("class");
				if( !fnCommon_isNull(className)  &&  className.indexOf("checkToggle") > -1 ){
					return;
				}

			    // �ٸ� �����̵� ����
			    toggle_li.siblings().eq(0).removeClass('active').children('.toggleCont').hide();
			    // toggle_li.siblings().eq(0).removeClass('active').children('.toggleCont').hide();

			    // Ŭ����� ���� ���úҰ� ó��
			    var toggle_li_id = toggle_li[0].id;
				if( !fnCommon_isNull(toggle_li_id) ){

					// ��û�����Է�
					if( toggle_li_id.indexOf("1") > -1 ){
						if(!$("#slid_2_li").hasClass("checkToggle")){
							$("#slid_2_li").addClass("checkToggle")
						}
						if(!$("#slid_3_li").hasClass("checkToggle")){
							$("#slid_3_li").addClass("checkToggle")
						}

					// ���������Է�
					}else if( toggle_li_id.indexOf("2") > -1 ){
						if(!$("#slid_3_li").hasClass("checkToggle")){
							$("#slid_3_li").addClass("checkToggle")
						}
					}
				}

			    // Ŭ����� �����̵尡 ��Ȱ���̸� Ȱ������
			    if( toggle_li.hasClass('active') == false){
			    	toggle_li.removeClass('checkToggle');  // Ȱ������
			        toggle_li.addClass('active').children('.toggleCont').show();   // �ϴܺ� ����
			        toggle_li.siblings().removeClass('active').children('.toggleCont').hide();
			        $('body,html').animate({scrollTop: toggle_button.offset().top},500);   // ��ũ�� �̵�

		        // Ȱ���̸� ��Ȱ������
			    }else{
					// �����̵� ���� ���ۿ���
					if(close_flag){
						toggle_li.removeClass('active').children('.toggleCont').hide();
					}
			    }
			},



			/* --------------------------------------------------------------------------------------
				�������� ����
				loanRenewal4_012.fnHomeSetting
			 -------------------------------------------------------------------------------------- */
			fnHomeSetting : function( type ){

				// �⺻����
				if( !fnCommon_isNull(type)  &&  type == "default" ){
					var homeAddr = "";  // �����ּ�
					var homeAddr2 = "";  // ���ּ�

					// �����ּ� hidden
					var homeAddrType = "2";
					var homeAddr1 = "";
					var homeBuildingCode = "";
					var homeZipCode = "";
					
					// �ֹε����
					var residAddr = "";
					var residAddr2 = "";
					var residAddrType = "2";
					var residAddr1 = "";
					var residBuildingCode = "";
					var residZipCode = "";


					// ���ũ���� �ϰ� �� ���
					if( !fnCommon_isNull(minWon24Addr1)  &&  !fnCommon_isNull(minWon24ZipCd) ){
						homeAddr = minWon24Addr1;   // �����ּ�
						homeAddr2 = minWon24HomeAddr2;  // ���ּ�

						// �����ּ� hidden
						homeAddrType = "2";
						homeAddr1 = minWon24Addr1;
						homeBuildingCode = "";
						homeZipCode = minWon24ZipCd;

					// �ѵ������ȸ ȭ�鿡�� �Ѿ�� ��� ���õ� �����û ��ǰ����
					}else if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.GOODS_CD) ){						
						// �ǰ����� �Է�
						homeAddr = LNC3003_selected_json.REAL_ADDR1;
						homeAddr2 = LNC3003_selected_json.REAL_ADDR2;

						// homeAddrType = LNC3003_selected_json.REAL_ADDR_TY;
						homeAddr1 = LNC3003_selected_json.REAL_ADDR1;
						homeBuildingCode = LNC3003_selected_json.REAL_STRUT_MG_NO;
						homeZipCode = LNC3003_selected_json.REAL_POSTNO;
					
					
						// ���� �ּҴ� ����� �޾ƿ���
						residAddr = LNC3003_selected_json.LIV_ADDR1;
						residAddr2 = LNC3003_selected_json.LIV_ADDR2;

						// residAddrType = LNC3003_selected_json.HM_ADDR_TY;
						residAddr1 = LNC3003_selected_json.LIV_ADDR1;
						residBuildingCode = LNC3003_selected_json.LIV_STRUT_MG_NO;
						residZipCode = LNC3003_selected_json.LIV_POSTNO;

					// �����û ��� ��ȸ
					}else if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.GOODS_CD) ){
						homeAddr = LNC3005_selected.ADR_ZIP_ADDR;
						homeAddr2 = LNC3005_selected.ADR_ZIP_DTL_ADDR;

						// homeAddrType = LNC3005_selected.ADDR_KIND;
						homeAddr1 = LNC3005_selected.ADR_ZIP_ADDR;
						homeBuildingCode = LNC3005_selected.ADR_BLD_MNG_NO;
						homeZipCode = LNC3005_selected.ADR_ZIP;
						
						residAddr = LNC3005_selected.RESID_ZIP_ADDR;
						residAddr2 = LNC3005_selected.RESID_ZIP_DTL_ADDR;

						// residAddrType = LNC3005_selected.RESID_KIND;
						residAddr1 = LNC3005_selected.RESID_ZIP_ADDR;
						residBuildingCode = LNC3005_selected.RESID_BLD_MNG_NO;
						residZipCode = LNC3005_selected.RESID_ZIP;

					// �ڵ���û���� // �ѵ������ȸ ȭ�鿡�� �����͸� ���������� �ѱ�� �Ǹ鼭 �� �����ʹ� ��ǻ� �ʿ䰡 ������.
					}else if( !fnCommon_isNull(LNC3003_obj)  &&  !fnCommon_isNull(LNC3003_obj.GOODS_CD) ){

						homeAddr = LNC3003_obj.LIV_ADDR1;
						homeAddr2 = LNC3003_obj.LIV_ADDR2;

						// homeAddrType = LNC3003_obj.HM_ADDR_TY;
						homeAddr1 = LNC3003_obj.LIV_ADDR1;
						homeBuildingCode = LNC3003_obj.LIV_STRUT_MG_NO;
						homeZipCode = LNC3003_obj.LIV_POSTNO;
					}
					
					// �ּ����� ������ �� �ڵ�����, ���ּ� �Է� ���� ����
					if( !fnCommon_isNull(homeAddr)  &&  !fnCommon_isNull(homeAddr2) ){
						$("#homeAddr_div").val( homeAddr );  // �� ���� ����
						$("#homeAddr2_div").show();
						
						// �����ּ� hidden
						$("#homeAddr").val( homeAddr );  // �����ּ�
						$("#homeAddr_div").val( homeAddr );  // �����ּ�

						$("#homeAddr2").val( homeAddr2 );  // ���ּ�
						$("#homeAddrType").val( homeAddrType );
						$("#homeAddr1").val( homeAddr1 );
						$("#homeBuildingCode").val( homeBuildingCode );
						$("#homeZipCode").val( homeZipCode );
					}
					
					if( !fnCommon_isNull(residAddr)  &&  !fnCommon_isNull(residAddr2) ){
						$("#residAddr_div").val( residAddr );  // �� ���� ����
						$("#residAddr2_div").show();

						// �����ּ� hidden
						$("#residAddr").val( residAddr );  // �����ּ�
						$("#residAddr2").val( residAddr2 );  // ���ּ�
						$("#residAddrType").val( residAddrType );
						$("#residAddr1").val( residAddr1 );
						$("#residBuildingCode").val( residBuildingCode );
						$("#residZipCode").val( residZipCode );
					}
				}
			},



			/* --------------------------------------------------------------------------------------
				����Ⱓ �޺�����
				loanRenewal4_012.fnMakeCombo
			 -------------------------------------------------------------------------------------- */
			fnMakeCombo : function( combo_id ){
				if( !fnCommon_isNull(combo_id) ){

					// ����Ⱓ
					if(combo_id == "loanPeriodCombo"){

						var start = 0;  // �ּұⰣ
						var end = 0;  // �ִ�Ⱓ
						var add = 0;  // �Ⱓ����						
						
						// �嵿��D ��ȯ�Ⱓ ������ ��	
						if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52351" ){	// 52351 �¶����޻��
							start = 36;
							end = 60;
							add = 24;
							
						} else if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52347" ){	// 52347 ���յ�2(����Ҿ�)
							start = 12;
							end = 60;
							add = 12;
							
						} else {											
							start = 6;
							end = 60;
							add = 6;
							
						}

						var html = "<option value='' selected>����</option>";
						for(var i = start; i <= end; i = i+add){
							html += "<option value='" + i + "'>" + i + "����</option>";
						}

						// ����Ⱓ �޺�����
						$("#loanPeriodCombo").html(html);

						// 12���� �⺻����
						// var loanPeriod = "12";

						// $("#loanPeriodCombo > option[value=" + loanPeriod + "]").attr("selected", "true");
						// $("#loanPeriodCombo").selectmenu("refresh");
					}
				}
				return true;
			},



			/* --------------------------------------------------------------------------------------
				ȭ�鰪 �ڵ�����
				loanRenewal4_012.fnSetViewData
			 -------------------------------------------------------------------------------------- */
			fnSetViewData : function(){			
				// ��û�������� ������ ���� // �ڵ����� ���ý� �� ���û�ǰ��, �ڵ������û����, �����û���ۼ����� �� ������ ����
				var dataMap = loanRenewal4_012.fnGetDataParam();

				// ��û�ݾ�
				//var req_AMT = dataMap.req_AMT;
				//if( !fnCommon_isNull(req_AMT) ){
				//	REQ_AMT = req_AMT;  // �������⼭ ����� ��û�ݾװ� ����
				//}
				
				if( REG_KIND == "116" && "" != dataMap.req_AMT && null != dataMap.req_AMT){
					REQ_AMT = dataMap.req_AMT;
				}else if( REQ_AMT == "" || REQ_AMT == null ){
					REQ_AMT = dataMap.req_AMT;
				}

				// ��ǰ�ڵ�
				if( !fnCommon_isNull(dataMap.goods_CD) ){
					goods_CD = dataMap.goods_CD;  // �������⼭ ����� ��û�ݾװ� ����
				}
				// �����û��ȣ ������ ������ �����Ͽ� ���
				if( !fnCommon_isNull(dataMap.bank_INSP_NO) ){
					bank_INSP_NO = dataMap.bank_INSP_NO;  // �������⼭ ����� �����û��ȣ�� ����
				}

				// �����
				var co_NM = dataMap.co_NM;
				if( !fnCommon_isNull(co_NM) ){
					company_nm = co_NM;
				}
				$("#company_nm").val( company_nm );

				// �ڱݿ뵵
				var fund_YONGDO_CD = dataMap.fund_YONGDO_CD;

				// 52351 �¶����޻��
				if( !fnCommon_isNull(goods_CD)  &&  goods_CD == "52351" ){
				
					fund_YONGDO_CD = "8";  // ��Ȱ
					$("#useTypeCombo").css("background-color", "#eee");   // ��Ȱ�� �ð�ȿ��
					$("#useTypeCombo").attr("disabled", "disabled");

					$("#coment_onlinesunshine").show();  // �޻�� ���� ���� ����
					
					// �¶����޻�� ������ ��갪 ����
					$("#grtFeeArea").show();
					$("#coment_onlinesunshine").show();
					
					// �¶����޻���� ��쿡�� '����' ���� 
					$("#jobPositionTh").show();
					$("#jobPositionTd").show();
					
					$("#return_type").val("���ݱյ��ȯ���");   // ��ȯ���

					// ��ȸ���������� �ڵ� �߰�
					$("#weak_onlinesunshine").show();  // �޻�� ���������� ����
					var sun_WEAK_CD = dataMap.sun_WEAK_CD;

					if( "" == sun_WEAK_CD || "00" == sun_WEAK_CD || null == sun_WEAK_CD ){
						$("#sunWeakCode").val("00");
						$("#sunWeakNm").val("�ش���� ����");
					}else{
						chg_can_sun = false;
						var sunWeakNm = "";
						$("#sunWeakCode").val(sun_WEAK_CD);
						$("#sunWeakNm").prop("disabled", true);

						$("#sunWeakCodeBtn").hide();   // ��Ȱ�� �ð�ȿ��
						if( "01" == sun_WEAK_CD ){ sunWeakNm = "�Ѻθ���"; }
						else if( "02" == sun_WEAK_CD ){ sunWeakNm = "���հ���"; }
						else if( "03" == sun_WEAK_CD ){ sunWeakNm = "�ٹ�ȭ����"; }
						else if( "04" == sun_WEAK_CD ){ sunWeakNm = "������Ż�ֹ�"; }
						else if( "05" == sun_WEAK_CD ){ sunWeakNm = "��������"; }
						else if( "06" == sun_WEAK_CD ){ sunWeakNm = "���ʻ�Ȱ������"; }
						else if( "07" == sun_WEAK_CD ){ sunWeakNm = "�������������� ��"; }
						else if( "99" == sun_WEAK_CD ){ sunWeakNm = "��Ÿ"; }
						else {
							chg_can_sun = true;
							$("#sunWeakCode").val("00");
							sunWeakNm = "�ش���� ����";
							$("#sunWeakNm").prop("disabled", false);
							$("#sunWeakNm").prop("readonly", true);
							$("#sunWeakCodeBtn").css("background-color", "#fff");   // ��Ȱ�� �ð�ȿ��

						}
						$("#sunWeakNm").val(sunWeakNm);
					}
				}
				if( !fnCommon_isNull(fund_YONGDO_CD)  &&  fund_YONGDO_CD != "0" ){
					$("#useTypeCombo").val(fund_YONGDO_CD);
				}

				// ����Ⱓ �޺�����
				var result_flag = loanRenewal4_012.fnMakeCombo("loanPeriodCombo");
				if(result_flag){

					// ����Ⱓ ������ �޺� �ڵ�����
					var req_TERM = dataMap.req_TERM;
					if( !fnCommon_isNull(req_TERM)  &&  req_TERM != "0" ){
						$("#loanPeriodCombo").val(req_TERM);

						// �����ߴ� ����Ⱓ �� ����
						loanPeriodCombo_maxval = req_TERM;
					}
				}
				
				//������
				se_c_nm = dataMap.se_C_NM;
				
				// ��û�ݾ� ����
				loanRenewal4_012.fnKeyup_inputAmt( "default" );

				// �������� ����(�ּ�)
				loanRenewal4_012.fnHomeSetting("default");


				// ��ũ���� ���ҵ濡�� �Ǵ� �����Է� �Ǵ� ������������ �� ��찡 �ƴ϶�� ������� �����Ƿ� ��ȸ�� �����Ϳ��� ����
				// DHKANG ������500 ���� ���� ó��
				var haeCd = dataMap.HAE_CD;
				
				if(haeCd == "7" || haeCd == "8" || haeCd == "9") {	// DHKANG ���ݼҵ���, �ֺ�, ������ ��� �����, ������ȭ��ȣ �׸� ����
					$("#companyInfoArea").hide();
				
				} else {
					if( fnCommon_isNull(company_nm) ){
						company_nm = dataMap.co_NM;
					}

					if( !fnCommon_isNull(company_nm) ){
						company_nm = company_nm.replace("&#40;", "(");
						company_nm = company_nm.replace("&#41;", ")");

						$("#company_nm").prop("disabled", true);
						$("#company_nm").css("background-color", "#eee");   // ��Ȱ�� �ð�ȿ��
						$("#company_nm").val(company_nm);
					}

					// ���忬��ó
					var ofc_TELNO = dataMap.ofc_TELNO;
					if( !fnCommon_isNull(ofc_TELNO) ){
						loanRenewal4_012.fnKeyup_workTelNo(null, ofc_TELNO);
					}				
				}

				/*
				//  ��������
				var hac_CD = dataMap.hac_CD;
				if( !fnCommon_isNull(hac_CD) ){
					$("#jobPosCode").val(hac_CD);
					$("#jobPosNm").val(dataMap.hac_CD_NAME);
				}
				*/

				// �̸���
				var email = dataMap.email;
				if( !fnCommon_isNull(email) ){
					$("#email").val(email);
				}

				// �ڻ���Ȳ 10����̸� �⺻����
				//$("#assetStatusCombo").val("2");

				// �Աݰ������� �޾ƿ��� ��� ����
				bankCd = dataMap.IN_BANK_CD;	// �Ա�����
				acctNo = dataMap.IN_ACCO_NO;	// �Աݰ��¹�ȣ
				
				if(!fnCommon_isNull(bankCd) && bankCd != "0") {
					$("#bankCodeCombo").val(bankCd);
					
					if(!fnCommon_isNull(acctNo)) {
						$("#accCd").val(acctNo);
					}
					
				} else {
					$("#bankCodeCombo").val("88");	// ����� �������� �⺻����
				}
				

				// �����ѵ� ����
				// ���ڿ� ���� �� ���ڸ� ��ȯ �Էµ� ��û�ݾ�(�ѵ��񱳽� ���)
				if( !fnCommon_isNull(REQ_AMT) ){
					var REQ_AMT_format = fnCommon_getOnlyNumber(REQ_AMT);
					REQ_AMT_format = fnCommon_addComma(REQ_AMT_format);   // �޸����
					$("#req_amt").prop("placeholder", "�����ѵ� " + REQ_AMT_format);
				}

				// �������߱޿��� 1 �߱��̸�
				if( !fnCommon_isNull(FEE_PAPER_ISSUE_YN)  &&  FEE_PAPER_ISSUE_YN == "1" ){

					// 116 & ������� 1  -->  ����Ⱓ/��û�ݾ� ���� �Ұ�
					if( !fnCommon_isNull(REG_KIND)  &&  REG_KIND == "116"  &&  !fnCommon_isNull(ST_CD)  &&  ST_CD == "1" ){
						$("#loanPeriodCombo").prop("disabled", true);
						$("#loanPeriodCombo").css("background-color", "#eee");   // ��Ȱ�� �ð�ȿ��
						$("#req_amt").prop("disabled", true);
						$("#req_amt").css("background-color", "#eee");   // ��Ȱ�� �ð�ȿ��
						$("#maxAmt").prop("disabled", true);   // ��Ȱ�� �ð�ȿ��

					}
				}

			},



			/* --------------------------------------------------------------------------------------
				�ּҰ˻� ��ư Ŭ��
				loanRenewal4_012.fnChange_qna01
			 -------------------------------------------------------------------------------------- */
			fnChange_qna01 : function(e){

				// �ƴϿ� üũ��
				var checked = $("#qna0102").prop("checked");
				if( !fnCommon_isNull(checked, "boolean") ){
					$("#qna0101").parent().removeClass("checked"); // ���õ� ���·� ��Ÿ�� ����
					$("#qna0102").parent().addClass("checked"); // ���õ� ���·� ��Ÿ�� ����
					alert("������ �ƴ� ���,\n���� ��û�� �Ұ��մϴ�.");

					// ���� ���� ���� // ���� ���� �Ŀ� �̺�Ʈ�� ����Ǵ� �������� �ð��� ����
					setTimeout(function(){
						$("#qna0101").prop("checked", true);
						$("#qna0101").parent().addClass("checked"); // ���õ� ���·� ��Ÿ�� ����
						$("#qna0102").parent().removeClass("checked"); // ���õ� ���·� ��Ÿ�� ����
					}, 300);

					// �̺�Ʈ ���� ����
					// e.preventDefault();
				}
			},



			/* --------------------------------------------------------------------------------------
				�ּҰ˻� ��ư Ŭ��
				loanRenewal4_012.fnSearch_Address
			 -------------------------------------------------------------------------------------- */
			fnSearch_Address : function(){
				postType = "home";   // �˾� ȣ��� ����/���� ���а�

				// �ּҰ˻� �˾� ȣ��
				// showDialog(popupURL_post, 420);
				// ����� 5������
				$("#find_address_div").show();
				$("#address_list_tbody").html("");
			},



			/* --------------------------------------------------------------------------------------
				����������, �⺻�� ��ȸ
				loanRenewal4_012.fnSearch_1
			 -------------------------------------------------------------------------------------- */
			fnSearch_1 : function(){
				$.ajax({
					type: "post",
					url: callURL_loanRenewal4_012_01,
					dataType: "json",
					data: {},   // {"TEST_DATA" : "2"},
					success: function(json){
						var fail_flag = true;

						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){
							fail_flag = false;

							company_nm = json.company_nm;  // �����
							year_amt = json.year_amt;  // ���ҵ�
							join_company_day = json.join_company_day;  // �Ի�����
							goods_CD = json.goods_CD;  // ��ǰ�ڵ�
							isAutoReq = json.isAutoReq;  // �ڵ���û���ۼ����� true/false
							minWon24ZipCd = json.minWon24ZipCd;  // �ο�24�����ȣ
							minWon24Addr1 = json.minWon24Addr1;  // �ο�24���θ��ּ�
							minWon24HomeAddr2 = json.minWon24HomeAddr2;  // �ο�24���û��ּ�
							bank_INSP_NO = json.bank_INSP_NO;  // �����û��ȣ  // �������� output ���� ���� ��û��ȣ
							REG_KIND = json.REG_KIND;  // ���ڼ������(�ڼ�����ó ����)
							ST_CD = json.ST_CD;  // �������
							FEE_PAPER_ISSUE_YN = json.FEE_PAPER_ISSUE_YN;  // �������߱޿���

							deviceType = json.deviceType;  // �ܸ�������
							custNm = json.custNm;  // ����
							hndNo = json.HAND_NO;  // �ڵ�����ȣ

							qna01 = json.qna01;  // ���� 1 ������(4�뺸�谡��) 2 ���λ���� 3 ��Ÿ����ҵ��������뿪������ 4 ���ݼҵ���
							qna02 = json.qna02;  // ������� 1 ������ 2 �������� 3 �ٷμҵ�̽Ű��� 4 �Ͽ�ٷ���
							qna03 = json.qna03;  // ���ü������� 1 �� 2 �ƴϿ�

							employmentType = json.employmentType;  // �������
							homeType = json.homeType;  // �������ñ���
							minWon24AddrCd1 = json.minWon24AddrCd1;  // �ο�24�����ڵ�1
							minWon24AddrCd2 = json.minWon24AddrCd2;  // �ο�24�����ڵ�2
							minWon24AddrCd3 = json.minWon24AddrCd3;  // �ο�24�����ڵ�3
							minWon24AddrCd4 = json.minWon24AddrCd4;  // �ο�24�����ڵ�4

							REQ_AMT = json.REQ_AMT;  // �Էµ� ��û�ݾ�							
							MEMO = json.MEMO;  // �Էµ� ��㳻��
				    		SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;  // �ǰ����� ��ũ���� ��������
				    		SCRP_MINWON24_SUCCESS_YN = json.SCRP_MINWON24_SUCCESS_YN;   // �ο�24 ��ũ���� ��������
							
							SCRP_NHIS_EXP = json.SCRP_NHIS_EXP;  // �ǰ����轺ũ�������� ����
				    		SCRP_MINWON24_EXP = json.SCRP_MINWON24_EXP;  // �ο�24��ũ�������� ����
							
							// �����ڵ� �޺� ����
							fnCommon_combo_commcodelist( json.commcodelist_2118, "assetStatusCombo", "Y" );   // �ڻ���Ȳ
							fnCommon_combo_commcodelist( json.commcodelist_bank, "bankCodeCombo", "Y" );   // ������


							// �ѵ������ȸ ȭ�鿡�� �ڵ����� ��û�ϱ� Ŭ���Ͽ� �Ѿ�� ��� ���õ� �����û ��ǰ����
							LNC3003_selected_json = json.LNC3003_selected_json

							// �ڵ���û����  // �ѵ������ȸ ȭ�鿡�� �����͸� ���������� �ѱ�� �Ǹ鼭 �� �����ʹ� ��ǻ� �ʿ䰡 ������.
							LNC3003_obj = json.LNC3003_obj;

							// �����û ��� ��ȸ
							LNC3005_selected = json.LNC3005_selected;

							// ȭ�鰪 �ڵ�����
							loanRenewal4_012.fnSetViewData();
						}
						if(fail_flag){
							ing.hide();
							alert("������ ��ȸ�� �����߽��ϴ�.");
						}
					},
					beforeSend : function() {
						ing.show();
					},
					error: function(data, textStatus, error) {
						ing.hide();
						// alert("������ ��ȸ�� �����߽��ϴ�.");
						fnCommon_SessionExpired();
					},
					complete: function() {
						ing.hide();
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				�̸��� ������ Ŭ��
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
					$("#email").prop("placeholder", "�Է�");
		    		$("#email").css("background-color", "");
				}
			},



			/* --------------------------------------------------------------------------------------
				������Ȯ�� ��ư Ŭ��
				loanRenewal4_012.fnSearch_accountOwner
			 -------------------------------------------------------------------------------------- */
			fnSearch_accountOwner : function(){

				/*// ������ Ȯ�� ���� // ������ Ȯ�ε� ���¸� ����ȸ ���ʿ�
				if(accountOwner_confirm_flag){
					return;
				}*/

				// �����޺�
				var bankCd = $("#bankCodeCombo option:selected").val();
				if( fnCommon_isNull(bankCd) ){
					alert("������� �������ּ���.");
					return;
				}

				// ���¹�ȣ
				var accCd = $("#accCd").val();
				if( fnCommon_isNull(accCd) ){
					alert("���¹�ȣ�� �Է����ּ���.");
					return;
				}
				//���¹�ȣ�� ����ȣ�� �ƴѰ��
				var accCdLen =  accCd.length;
				if(accCd.substring(0,3) == '010'){
					if(accCd.length == 11 || accCd.length == 10){
						alert("�ڵ���ü ����� �Ұ��� ���¹�ȣ�Դϴ�.\n\n�����¹�ȣ �Ǵ� �ٸ����¹�ȣ�� �Է��� �ּ���");
						return;
					}
				}

				iajax.clearParam();
				// ����� 5������ - ����
				// iajax.addParam("CHK_CSRF", random);
				iajax.addParam("PROC_GB", "1");   // ó������ : 1 ������� ����Ȯ�� 2 ������� ����Ȯ�� ��û 3 ����Ȯ����ȸ 4 ���������Ϸ�
				iajax.addParam("CMS_BANK_CD", bankCd);
				iajax.addParam("CMS_ACNT_NO", accCd);

				$.ajax({
				    type: "post",
				    url: callURL_requestLNC3101,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
				    	ing.hide();
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){
							accountOwner_confirm_flag = true;   // ������ Ȯ�� ����
							$("#accCd").prop("disabled", true);  // ���¹�ȣ ��Ȱ��
							$("#accCd").css("background-color", "#eee");  // ��Ȱ�� �ð�ȿ��
				    		$("#btnAccountOwner").html("Ȯ�οϷ�");   // ������ Ȯ�� ��ư
				    		$("#accNm").val( json.CMS_ACNT_CUST_NM );   // �����ָ�

				    		alert("������ Ȯ���� �Ϸ�Ǿ����ϴ�.");

				    	}else{
				    		// alert("�Է��Ͻ� ������ Ȯ�ε��� �ʾҽ��ϴ�.\nȮ�� �� ���Է� ��Ź �帳�ϴ�.");
			    			if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000910" ){
				    			var RESULT_DESC = json.RESULT_DESC;
				    			if( !fnCommon_isNull(RESULT_DESC) ){
				    				alert( RESULT_DESC );
				    			}else{
				    				alert("�������� ���ɽð��� �ƴմϴ�.\n���� ���������� �ٽ� ���� ���ּ���.");
				    			}
				    		}else{
				    			alert( "����ڰ��� �� �����ָ��� �ٸ� ���´� ����� ���� �����ϴ�.");
				    		}

				    	}
					},
					beforeSend : function() {
						ing.show();
					},
					error: function(data, textStatus, error){
						ing.hide();
						// alert(error);
						fnCommon_SessionExpired();
						console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function(){
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				���� �޺� ���� �̺�Ʈ
				loanRenewal4_012.fnChange_bankCode
			 -------------------------------------------------------------------------------------- */
			fnChange_bankCode : function(e){

				// ������ Ȯ�� ���� �ʱ�ȭ
				accountOwner_confirm_flag = false;   // ������ Ȯ�� ����

				$("#accCd").prop("disabled", false);  // ���¹�ȣ ��Ȱ��
				$("#accCd").css("background-color", "");  // ��Ȱ�� �ð�ȿ�� ����

	    		$("#btnAccountOwner").html("������Ȯ��");   // ������ Ȯ�� ��ư
	    		$("#accNm").val("");   // �����ָ�
	    		$("#accCd").val("");  // ���¹�ȣ
			},



			/* --------------------------------------------------------------------------------------
				���¹�ȣ �Է� �̺�Ʈ
				loanRenewal4_012.fnKeyup_accCd
			 -------------------------------------------------------------------------------------- */
			fnKeyup_accCd : function(e){
				var value = e.target.value;

				// ���ڿ� ���� �� ���ڸ� ��ȯ
				value = fnCommon_getOnlyNumber(value);

				// �ʵ忡 ����
				e.target.value = value;

				// ������ Ȯ�� ���� �ʱ�ȭ
				accountOwner_confirm_flag = false;   // ������ Ȯ�� ����
	    		$("#btnAccountOwner").html("������Ȯ��");   // ������ Ȯ�� ��ư
	    		$("#accNm").val("");   // �����ָ�
			},



			/* --------------------------------------------------------------------------------------
				���� �˻� ��ư Ŭ��
				loanRenewal4_012.fnSearch_jobPosition
			 -------------------------------------------------------------------------------------- */
			fnSearch_jobPosition : function(){
				//showDialog(popupURL_jobposition, 415);
				$("#find_jobposition_div").show();
			},



			/* --------------------------------------------------------------------------------------
				���� �˻� ��ư Ŭ��
				loanRenewal4_012.fnSearch_jobType
			 -------------------------------------------------------------------------------------- */
			fnSearch_jobType : function(){
				showDialog(popupURL_jobtype, 415);
			},



			/* --------------------------------------------------------------------------------------
				��ȯ������ ��ȸ Ŭ�� - ���� ����Ͽ� ��갪 �ޱ�
				loanRenewal4_012.fnSearch_paySchedule
			 -------------------------------------------------------------------------------------- */
			fnSearch_paySchedule : function( hafDay_DD ){
				var FIRST_REPAY_DT = "";  // ���ʳ��Կ�����
				var FIRST_REPAY_DD = "";  // ���� ����������

				// �������� ���ýÿ��� �����Ϸ� ����Ѵ�
				if( !fnCommon_isNull(hafDay_DD)){
					FIRST_REPAY_DD = hafDay_DD;  // ���� ����������
				}else{
					FIRST_REPAY_DT = firstRepayDt;  // ���ʳ��Կ�����
				}

				// ��û�ݾ�
				var req_amt_string = $("#req_amt").val();
				var req_amt = 0;

				if( fnCommon_isNull(req_amt_string)){
					alert("��û�ݾ��� �Է����ּ���.");
					return;
				}

				// ���ڿ� ���� �� ���ڸ� ��ȯ
				req_amt_string = fnCommon_getOnlyNumber(req_amt_string);
				if( !fnCommon_isNull(req_amt_string)){
					req_amt = Number(req_amt_string)/10000;
				}


				// ��ȯ��� 1 �����Ͻû�ȯ 2 ���ݱյ��ȯ 3 ��Ÿ or �����ݱյ��ȯ���
				var repayKind = "";

				// ��ȯ���
				var return_type = $("#return_type").val();
				if( !fnCommon_isNull(return_type)  &&  return_type == "���ݱյ��ȯ���"){
					repayKind = "2";
				}else{
					repayKind = "3";
				}
				// ����Ⱓ
				var loanPeriod = $("#loanPeriodCombo").val();
				if( fnCommon_isNull(loanPeriod)){
					alert("����Ⱓ�� �������ּ���.");
					return;
				}


				// �����ݸ�
				var nrml_RT_string = "0";
				var nrml_RT = 0;

				// �ѵ������ȸ ȭ�鿡�� �Ѿ�� ��� ���õ� �����û ��ǰ����
				if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.GOODS_CD) ){
					nrml_RT_string = LNC3003_selected_json.NRML_RT;

				// �����û ��� ��ȸ
				}else if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.GOODS_CD) ){
					nrml_RT_string = LNC3005_selected.NRML_RT;

				// �ڵ���û���� // ������� �ʰԵ� ��������
				}else if( !fnCommon_isNull(LNC3003_obj)  &&  !fnCommon_isNull(LNC3003_obj.GOODS_CD) ){
					nrml_RT_string = LNC3003_obj.NRML_RT;
				}

				if( !fnCommon_isNull(nrml_RT_string) ){
					nrml_RT = Number( nrml_RT_string );
				}

				iajax.clearParam();
				// ����� 5������ - ����
				// iajax.addParam("CHK_CSRF", random);
				iajax.addParam("LOAN_AMT", req_amt);		// ��û�ݾ�
				iajax.addParam("REPAY_CNT", loanPeriod);		// ��ȯ�Ⱓ // ����Ⱓ
				iajax.addParam("REPAY_KIND", repayKind);	// ��ȯ���
				iajax.addParam("GRACE_PERIOD", "0");	// ��ġ�Ⱓ
				iajax.addParam("NRML_RT", nrml_RT*1000);	// ��������
				iajax.addParam("FIRST_REPAY_DT", FIRST_REPAY_DT);   // ���ʳ��Կ�����
				iajax.addParam("FIRST_REPAY_DD", FIRST_REPAY_DD);   // �������ں�����
				iajax.addParam("SEND_MSG", "Y");	// ��� ����

				$.ajax({
					type: "post",
					url: callURL_selectLNC3012,
					dataType: "json",
					data: iajax.postparam,
					success: function(json){
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"
							&&  !fnCommon_isNull(json.DATA)  &&  !fnCommon_isNull(json.DATA.LNC3012SubList) ){

							// ��ȯ������ ǥ �׸���
							loanRenewal4_012.fnRender_repayGrid( json.DATA.LNC3012SubList );

						}else{
							var RESULT_DESC = json.RESULT_DESC;
							if( fnCommon_isNull(RESULT_DESC) ){
								RESULT_DESC = "�Ͻ������� ������ �߻��Ͽ����ϴ�. �����ڿ��� �����Ͻñ� �ٶ��ϴ�.";
							}
							alert( RESULT_DESC );
						}
					},
					beforeSend : function() {
						ing.show();
					},
					error: function(data, textStatus, error){
						ing.hide();
						// alert(error);
						fnCommon_SessionExpired();
						console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function(){
						ing.hide();

						// �������� ���ýÿ��� �����Ϸ� ��� �� ������ üũ��ȸ �߰�  &&  �������� �ƴϸ� Ȯ�ο��ΰ� false ��
						if( !fnCommon_isNull(hafDay_DD)  &&  fnCommon_isNull(workingday_confirm_flag, "boolean")  ){

							// ��ü�� ���� �̺�Ʈ 2 - ������ üũ
							loanRenewal4_012.fnChange_cmsDate_2();
						}
					}
				});
			},

			/* --------------------------------------------------------------------------------------
			��ȯ������ ��ȸ Ŭ�� - ���� ����Ͽ� ��갪 �ޱ�
			loanRenewal4_012.fnSearch_paySchedule2
		 -------------------------------------------------------------------------------------- */
		fnSearch_paySchedule2 : function( hafDay_DD ){
			var FIRST_REPAY_DT = "";  // ���ʳ��Կ�����
			var FIRST_REPAY_DD = "";  // ���� ����������

			// �������� ���ýÿ��� �����Ϸ� ����Ѵ�
			if( !fnCommon_isNull(hafDay_DD)){
				FIRST_REPAY_DD = hafDay_DD;  // ���� ����������
			}else{
				FIRST_REPAY_DT = firstRepayDt;  // ���ʳ��Կ�����
			}

			// ��û�ݾ�
			var req_amt_string = $("#req_amt").val();
			var req_amt = 0;

			if( fnCommon_isNull(req_amt_string)){
				alert("��û�ݾ��� �Է����ּ���.");
				return;
			}

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			req_amt_string = fnCommon_getOnlyNumber(req_amt_string);
			if( !fnCommon_isNull(req_amt_string)){
				req_amt = Number(req_amt_string)/10000;
			}


			// ��ȯ��� 1 �����Ͻû�ȯ 2 ���ݱյ��ȯ 3 ��Ÿ or �����ݱյ��ȯ���
			var repayKind = "";

			// ��ȯ���
			var return_type = $("#return_type").val();
			if( !fnCommon_isNull(return_type)  &&  return_type == "���ݱյ��ȯ���"){
				repayKind = "2";
			}else{
				repayKind = "3";
			}


			// ����Ⱓ
			var loanPeriod = $("#loanPeriodCombo").val();
			if( fnCommon_isNull(loanPeriod)){
				alert("����Ⱓ�� �������ּ���.");
				return;
			}


			// �����ݸ�
			var nrml_RT_string = "0";
			var nrml_RT = 0;

			// �ѵ������ȸ ȭ�鿡�� �Ѿ�� ��� ���õ� �����û ��ǰ����
			if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.GOODS_CD) ){
				nrml_RT_string = LNC3003_selected_json.NRML_RT;

			// �����û ��� ��ȸ
			}else if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.GOODS_CD) ){
				nrml_RT_string = LNC3005_selected.NRML_RT;

			// �ڵ���û���� // ������� �ʰԵ� ��������
			}else if( !fnCommon_isNull(LNC3003_obj)  &&  !fnCommon_isNull(LNC3003_obj.GOODS_CD) ){
				nrml_RT_string = LNC3003_obj.NRML_RT;
			}

			if( !fnCommon_isNull(nrml_RT_string) ){
				nrml_RT = Number( nrml_RT_string );
			}

			iajax.clearParam();
			// ����� 5������ - ����
			// iajax.addParam("CHK_CSRF", random);
			iajax.addParam("LOAN_AMT", req_amt);		// ��û�ݾ�
			iajax.addParam("REPAY_CNT", loanPeriod);		// ��ȯ�Ⱓ // ����Ⱓ
			iajax.addParam("REPAY_KIND", repayKind);	// ��ȯ���
			iajax.addParam("GRACE_PERIOD", "0");	// ��ġ�Ⱓ
			iajax.addParam("NRML_RT", nrml_RT*1000);	// ��������
			iajax.addParam("FIRST_REPAY_DT", FIRST_REPAY_DT);   // ���ʳ��Կ�����
			iajax.addParam("FIRST_REPAY_DD", FIRST_REPAY_DD);   // �������ں�����
			iajax.addParam("SEND_MSG", "Y");	// ��� ����

			$.ajax({
				type: "post",
				url: callURL_selectLNC3012,
				dataType: "json",
				data: iajax.postparam,
				success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"
						&&  !fnCommon_isNull(json.DATA)  &&  !fnCommon_isNull(json.DATA.LNC3012SubList) ){

						// ��ȯ������ ǥ �׸���
						loanRenewal4_012.fnRender_repayGrid2( json.DATA.LNC3012SubList );

					}else{
						var RESULT_DESC = json.RESULT_DESC;
						if( fnCommon_isNull(RESULT_DESC) ){
							RESULT_DESC = "�Ͻ������� ������ �߻��Ͽ����ϴ�. �����ڿ��� �����Ͻñ� �ٶ��ϴ�.";
						}
						alert( RESULT_DESC );
					}
				},
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
					// alert(error);
					fnCommon_SessionExpired();
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
					ing.hide();

					// �������� ���ýÿ��� �����Ϸ� ��� �� ������ üũ��ȸ �߰�  &&  �������� �ƴϸ� Ȯ�ο��ΰ� false ��
					if( !fnCommon_isNull(hafDay_DD)  &&  fnCommon_isNull(workingday_confirm_flag, "boolean")  ){

						// ��ü�� ���� �̺�Ʈ 2 - ������ üũ
						loanRenewal4_012.fnChange_cmsDate_2();
					}
				}
			});
		},




			/* --------------------------------------------------------------------------------------
				��ȯ������ ǥ �׸���
				loanRenewal4_012.fnRender_repayGrid
			 -------------------------------------------------------------------------------------- */
			fnRender_repayGrid : function( LNC3012SubList ){

				// ��ȯ������ �ʱ�ȭ
				$("#return_schedule_tbody").html("");
				$("#return_schedule_div").hide();

				if( !fnCommon_isNull(LNC3012SubList.length)  &&  LNC3012SubList.length > 0 ){
					for(var i=0; i < LNC3012SubList.length; i++){
						var html = "";

						var row = LNC3012SubList[i];
						if( !fnCommon_isNull(row) ){

							// �������� �����ϸ� ���ڱ��ϱ� // �������� �������� ������ ȸ������ ����
							// var return_day = fnCommon_getDay_addMonth( i+1 );

							// ȸ������
							var loan_DATE = row.LOAN_DATE;
							if( !fnCommon_isNull(loan_DATE)  &&  loan_DATE.length == 8 ){
								loan_DATE = loan_DATE.substring(0, 4) + "." + loan_DATE.substring(4, 6) + "." + loan_DATE.substring(6, 8);

								// ù ������ = ���ʳ��Կ�����
								if(i == 0){
									$("#firstRepayDt_format").html("���� ù ������ " + loan_DATE);
								}
							}

							html += "  	<tr>		  ";
							html += "  		<td>" + row.REPAY_CNT + "</td>	  ";		// ȸ��
							html += "  		<td>" + loan_DATE + "</td>	  ";	// ȸ������

							html += "  		<td>" + fnCommon_addComma(row.REPAY_LOAN_BAL) + "</td>	  ";	// ���Աݾ� - ����
							html += "  		<td>" + fnCommon_addComma(row.INT_AMT) + "</td>	  ";	// ���Աݾ� - ����
							html += "  		<td>" + fnCommon_addComma( parseInt(parseInt(row.REPAY_LOAN_BAL) + parseInt(row.INT_AMT)).toString() ) + "</td>	  ";	// ���Աݾ� - �հ� = ���� + ����
							html += "  		<td>" + fnCommon_addComma(row.LOAN_BAL) + "</td>	  ";	// �����ܾ�
							html += "  	</tr>		  ";

							// ��ȯ������ ����
							$("#return_schedule_tbody").append(html );
						}
					}

					// ��ȯ������ ���� ��Ű�� ����.
					// $("#return_schedule_div").show();
					ing.hide();
				}
			},

			/* --------------------------------------------------------------------------------------
			��ȯ������ ǥ �׸���
			loanRenewal4_012.fnRender_repayGrid2
		 -------------------------------------------------------------------------------------- */
		fnRender_repayGrid2 : function( LNC3012SubList ){

			// ��ȯ������ �ʱ�ȭ
			$("#return_schedule_tbody").html("");
			$("#return_schedule_div").hide();

			if( !fnCommon_isNull(LNC3012SubList.length)  &&  LNC3012SubList.length > 0 ){
				for(var i=0; i < LNC3012SubList.length; i++){
					var html = "";

					var row = LNC3012SubList[i];
					if( !fnCommon_isNull(row) ){

						// �������� �����ϸ� ���ڱ��ϱ� // �������� �������� ������ ȸ������ ����
						// var return_day = fnCommon_getDay_addMonth( i+1 );

						// ȸ������
						var loan_DATE = row.LOAN_DATE;
						if( !fnCommon_isNull(loan_DATE)  &&  loan_DATE.length == 8 ){
							loan_DATE = loan_DATE.substring(0, 4) + "." + loan_DATE.substring(4, 6) + "." + loan_DATE.substring(6, 8);

							// ù ������ = ���ʳ��Կ�����
							if(i == 0){
								$("#firstRepayDt_format").html("���� ù ������ " + loan_DATE);
							}
						}

						html += "  	<tr>		  ";
						html += "  		<td>" + row.REPAY_CNT + "</td>	  ";		// ȸ��
						html += "  		<td>" + loan_DATE + "</td>	  ";	// ȸ������

						html += "  		<td>" + fnCommon_addComma(row.REPAY_LOAN_BAL) + "</td>	  ";	// ���Աݾ� - ����
						html += "  		<td>" + fnCommon_addComma(row.INT_AMT) + "</td>	  ";	// ���Աݾ� - ����
						html += "  		<td>" + fnCommon_addComma( parseInt(parseInt(row.REPAY_LOAN_BAL) + parseInt(row.INT_AMT)).toString() ) + "</td>	  ";	// ���Աݾ� - �հ� = ���� + ����
						html += "  		<td>" + fnCommon_addComma(row.LOAN_BAL) + "</td>	  ";	// �����ܾ�
						html += "  	</tr>		  ";

						// ��ȯ������ ����
						$("#return_schedule_tbody").append(html );
					}
				}

				// ��ȯ������ ���� ��Ű�� ����.
				 $("#return_schedule_div").show();
				ing.hide();
			}
		},




			/* --------------------------------------------------------------------------------------
				��ȯ������ ��ȸ Ŭ��(�̰� �ڵ����� ����̷���. �ʿ������?)
				loanRenewal4_012.fnSearch_paySchedule_autoLoan
			 -------------------------------------------------------------------------------------- */
			fnSearch_paySchedule_autoLoan : function(){

				// ��ȯ������ �ʱ�ȭ
				$("#return_schedule_tbody").html("");
				$("#return_schedule_div").hide();

				// ����Ⱓ
				var loanPeriodCombo = $("#loanPeriodCombo").val();
				if( fnCommon_isNull(loanPeriodCombo)){
					alert("����Ⱓ�� �������ּ���.");
					return;
				}

				// ��û�ݾ�
				var req_amt = $("#req_amt").val();
				if( fnCommon_isNull(req_amt)){
					alert("��û�ݾ��� �Է����ּ���.");
					return;
				}

				// ���ڿ� ���� �� ���ڸ� ��ȯ
				req_amt = fnCommon_getOnlyNumber(req_amt);

				// �����ݸ�
				var nrml_RT_string = "0";
				var nrml_RT = 0;

				// ���ϱݸ�
				var redu_RT_string = "0";
				var redu_RT = 0;

				// �ѵ������ȸ ȭ�鿡�� �Ѿ�� ��� ���õ� �����û ��ǰ����
				if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.GOODS_CD) ){
					nrml_RT_string = LNC3003_selected_json.NRML_RT;
					redu_RT_string = LNC3003_selected_json.REDU_RT;

				// �����û ��� ��ȸ
				}else if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.GOODS_CD) ){
					nrml_RT_string = LNC3005_selected.NRML_RT;

				// �ڵ���û����
				}else if( !fnCommon_isNull(LNC3003_obj)  &&  !fnCommon_isNull(LNC3003_obj.GOODS_CD) ){
					nrml_RT_string = LNC3003_obj.NRML_RT;
					redu_RT_string = LNC3003_obj.REDU_RT;
				}

				if( !fnCommon_isNull(nrml_RT_string) ){
					nrml_RT = Number( nrml_RT_string );
				}
				if( !fnCommon_isNull(redu_RT_string) ){
					redu_RT = Number( redu_RT_string );
				}

				// ����Ⱓ
				var loanPeriodCombo = $("#loanPeriodCombo").val();
				if( !fnCommon_isNull(loanPeriodCombo) ){
					var loanPeriod = Number(loanPeriodCombo);
					if( !fnCommon_isNull(loanPeriod) ){
						var nrml_RT_division_100 = parseFloat(nrml_RT/100);  // ���ݸ� // �����ݸ� ������� ��ȯ
						var req_amt_0000 = Number(req_amt);   // ��û�ݾ�
						var redu_RT_division_100 = parseFloat(redu_RT/100);   // ���ϱݸ� ������� ��ȯ
						// var req_amt_0000_ori = Number(req_amt + "0000");
						// var nrml_RT_division_100_12 = parseFloat(nrml_RT_division_100/12);  // ���ݸ�

						var sumAmt = 0;  // �����հ�
						// var sumOriInterest = 0;  // ��������
						// var sumInterest = 0;   // ��������
						// var sumDiffInterest = 0;

						for(var i = 0; i < loanPeriod; i++){
							var html = "";

							// �Ⱓ 1�� �̻���ʹ� ���ϱݸ� ����
							if(i >= 12){
								nrml_RT_division_100 = parseFloat(nrml_RT_division_100 - redu_RT_division_100);
							}

							var rate = parseFloat(nrml_RT_division_100/12);   // ���ϱݸ����� �ݿ��� ���ݸ�
							var interest = Math.floor(req_amt_0000 * rate);   // ��û�ݾ�*���ݸ�=����
							// var oriInterest = Math.floor(req_amt_0000_ori * nrml_RT_division_100_12);   // ��û�ݾ�*���ݸ�

							// ���ݸ�, �ܿ��Ⱓ������, ��û�ݾ����� �ش簳�����Աݾ� ���ϱ�
							var this_month_RepayAmt = Math.floor(Math.abs( loanRenewal4_012.fnGet_thisMonthRepayAmt(rate, loanPeriod-i, req_amt_0000) ));
							// var this_month_RepayAmt_2 = Math.floor(Math.abs( loanRenewal4_012.fnGet_thisMonthRepayAmt(nrml_RT_division_100_12, loanPeriod-i, req_amt_0000) ));

							var paymentCapital = this_month_RepayAmt - interest;   // �ش簳�����Աݾ�-����=����
							req_amt_0000 = req_amt_0000 - (this_month_RepayAmt - interest);   // �ܾ�
							sumAmt += paymentCapital;   // �����հ�

							// sumOriInterest += oriInterest;  // ��������
							// sumInterest += interest;  // ��������
							// sumDiffInterest += (oriInterest - interest);
							// req_amt_0000_ori = req_amt_0000_ori-(this_month_RepayAmt_2-oriInterest);

							// �������� �����ϸ� ���ڱ��ϱ� // �������� �������� ������ ȸ������ ����
							var return_day = fnCommon_getDay_addMonth( i+1 );

							html += "  	<tr>		  ";
							html += "  		<td>" + (i+1) + "</td>	  ";		// ȸ��
							html += "  		<td>" + return_day + "</td>	  ";	// ȸ������

							html += "  		<td>" + fnCommon_addComma(paymentCapital) + "</td>	  ";	// ���Աݾ� - ����
							html += "  		<td>" + fnCommon_addComma(interest) + "</td>	  ";	// ���Աݾ� - ����
							html += "  		<td>" + fnCommon_addComma(sumAmt) + "</td>	  ";	// ���Աݾ� - �հ�
							html += "  		<td>" + fnCommon_addComma(req_amt_0000) + "</td>	  ";	// �����ܾ�
							html += "  	</tr>		  ";

							// ��ȯ������ ����
							$("#return_schedule_tbody").append( html );
						}

						// ��ȯ������ ����
						$("#return_schedule_div").show();
					}
				}

				/*
				var popupURL = "<c:url value='/popup/autoloanSchedule'/>";   // pop_autoloan_schedule
				showDialog(popupURL, 450);
				*/
			},



			/* --------------------------------------------------------------------------------------
				���ݸ�, �ܿ��Ⱓ������, ��û�ݾ����� �ش�����Աݾ� ���ϱ�
				loanRenewal4_012.fnGet_thisMonthRepayAmt
			 -------------------------------------------------------------------------------------- */
			fnGet_thisMonthRepayAmt : function( rate, loanPeriod, req_amt_0000 ){

				// ���ݸ� 0�̸�
				if(rate == 0){
					return - req_amt_0000 / loanPeriod;  // ��û�ݾ�/�ܿ��Ⱓ������ ������ ��ȯ
				}

				var pow = Math.pow(rate+1, loanPeriod);   // ����ǥ�� (���ݸ��� ������)
				var thisMonthRepayAmt = rate / (pow - 1) * -(req_amt_0000 * pow);

				return thisMonthRepayAmt;
			},



			/* --------------------------------------------------------------------------------------
				�����û �Ϸ� ��ư Ŭ��  // �����û���ۼ��Ϸ� ȣ�� - ������������ǰ�����û
				loanRenewal4_012.fnSave_1
			 -------------------------------------------------------------------------------------- */
			fnSave_1 : function(){

				// ��ȿ�� üũ
				var result = loanRenewal4_012.fnValidationCheck("default");
				if(!result){
					return false;
				}

				// iajax ���� // ��û���� 3 �ڵ���û���ɿ���
				loanRenewal4_012.fnSetAjaxParam("3");

				$.ajax({
				    type: "post",
				    url: callURL_requestLNC4004,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

				    		// �ڵ����Ⱑ�ɿ���
				    		var autolaonPsbYn = json.DATA.AUTOLOAN_PSB_YN;

				    		// ����� 5������ - �׽�Ʈ������
				    		// autolaonPsbYn = "1";

				    		// �ڵ����Ⱑ�ɿ��� 1 �ڵ���û����
							if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "1" ){

				    			// �ڵ����� ȣ��
				    			loanRenewal4_012.fnSave_2();

			    			// �ڵ����Ⱑ�ɿ��� 2 ��û���ۼ�
				    		}else if( !fnCommon_isNull(autolaonPsbYn)  &&  autolaonPsbYn == "2"){

				    			// �ڵ���û���ۼ�
				    			loanRenewal4_012.fnSave_3();

				    		}else{
				    			// ��ȭ��û
				    			loanRenewal4_012.fnSave_4();
				    		}

				    	}else{
							ing.hide();

				    		// ����Ұ��ȳ�
				    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302" ){
					    		loanRenewal4_012.fnGoNextSorryStep();

				    		// �����޼����ȳ�
				    		}else{
					    		var errorMsg = json.RESULT_DESC;
								alert(errorMsg.split("<br/>").join("\n"));
				    		}
				    	}
				    },
					beforeSend: function() {
						ing.show();
					},
					error: function(data, textStatus, error){
						ing.hide();
						fnCommon_SessionExpired();
					},
					complete: function(){
					}
				});
				
			},



			/* --------------------------------------------------------------------------------------
				��û���п� ���� �� �ڵ�����
				loanRenewal4_012.fnSetAjaxParam
			 -------------------------------------------------------------------------------------- */
			fnSetAjaxParam : function(reqGb){
				var email = "";   // �̸���

				// ��û�������� ������ ����
				var dataMap = loanRenewal4_012.fnGetDataParam();

				// �̸��� ������ üũ�ڽ�
				var noEmail = $("#noEmail");
				var noEmail_checked = noEmail.prop("checked");
				if( fnCommon_isNull(noEmail_checked, "boolean") ){

					// üũ�ȵ� ��� �̸��� �Է� �ʼ�
					email = $("#email").val();
				}

				// ������ȭ��ȣ
				var workTelNum = $("#workTelNum").val();
				workTelNum = fnCommon_getOnlyNumber(workTelNum);   // ���ڿ� ���� �� ���ڸ� ��ȯ

				// ��û�ݾ�
				var req_amt = $("#req_amt").val();
				req_amt = fnCommon_getOnlyNumber(req_amt);   // ���ڿ� ���� �� ���ڸ� ��ȯ

				// �ѵ��ݾ� // �����ѵ�
				var limit_AMT = "";

				// �ѵ������ȸ ȭ�鿡�� �Ѿ�� ��� ���õ� �����û ��ǰ����
				if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.GOODS_CD) ){
					limit_AMT = LNC3003_selected_json.LIMIT_AMT;

				// �����û ��� ��ȸ
				}else if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.GOODS_CD) ){
					limit_AMT = LNC3005_selected.REQ_AMT;

				// �ڵ���û���� // 3005 ���� �ѵ������� ���� ��û���ۼ��� �ڵ������϶��� �����ϹǷ� ���⼭ ��������!
				}else if( !fnCommon_isNull(LNC3003_obj)  &&  !fnCommon_isNull(LNC3003_obj.GOODS_CD) ){
					limit_AMT = LNC3003_obj.LIMIT_AMT;
				}

				if( !fnCommon_isNull(limit_AMT) ){
					limit_AMT += "0000";   // ���� ������ ��ȯ
				}

				iajax.clearParam();
				// ��渮 5������ - ����
				// iajax.addParam("CHK_CSRF", random);
				iajax.addParam("CUST_NO", dataMap.cust_NO);
				iajax.addParam("GOODS_CD", dataMap.goods_CD);
				iajax.addParam("REQ_AMT", req_amt);
				iajax.addParam("BANK_INSP_NO", bank_INSP_NO);
				iajax.addParam("SEND_MSG", "Y");
				
				iajax.addParam("IN_BANK_CD", dataMap.IN_BANK_CD);			// �Ա�����
				iajax.addParam("IN_ACCO_NO", dataMap.IN_ACCO_NO);			// �Աݰ��¹�ȣ

				iajax.addParam("CMS_BANK_CD", $("#bankCodeCombo").val());   // ����� �޺�
				iajax.addParam("CMS_ACNT_NO", $("#accCd").val());   // ���¹�ȣ
				iajax.addParam("CMS_CUST_NM", $("#accNm").val());  // �����ָ�

				iajax.addParam("REQ_TERM", $("#loanPeriodCombo").val());   // ����Ⱓ
				iajax.addParam("CMS_REQ_DATE", $("#cmsDateCombo").val());   // ������

				iajax.addParam("ADR_DSTCD", $("#residAddrType").val());
				iajax.addParam("ADR_ZIP", $("#residZipCode").val());
				iajax.addParam("ADR_ZIP_ADDR", $("#residAddr1").val());
				iajax.addParam("ADR_ZIP_DTL_ADDR", $("#residAddr2").val());
				iajax.addParam("ADR_BLD_MNG_NO", $("#residBuildingCode").val());
				
				iajax.addParam("REAL_DSTCD", $("#homeAddrType").val()); // �ǰ����ּұ���
				iajax.addParam("REAL_ZIP", $("#homeZipCode").val()); // �ǰ��ֿ����ȣ
				iajax.addParam("REAL_ZIP_ADDR", $("#homeAddr1").val()); // �ǰ��ֱ⺻�ּ�
				iajax.addParam("REAL_ZIP_DTL_ADDR", $("#homeAddr2").val()); // �ǰ��ֻ��ּ�
				iajax.addParam("REAL_BLD_MNG_NO", $("#homeBuildingCode").val()); // �ǰ��ְǹ�������ȣ

				iajax.addParam("EMAIL", email);
				iajax.addParam("OFC_TELNO", workTelNum);

				iajax.addParam("EMP_FORM_CD", qna02);
				iajax.addParam("FUND_YONGDO_CD", $("#useTypeCombo").val());   // �ڱݿ뵵
				iajax.addParam("HOUSE_OWN_DSTCD", qna03);

				iajax.addParam("JOB_POS_CD", $("#jobPosCode").val());   // ����
				iajax.addParam("JOB_POS_ETC", $("#jobPosSelf").val());   // ���������Է¶� TOBE ���� �̻��
				iajax.addParam("JOB_TYPE_CD", $("#jobTypeCode").val());   // ����
				iajax.addParam("JOB_TYPE_ETC", $("#jobTypeSelf").val());   // �׿����������Է°�

				iajax.addParam("REAL_CUST_YN", "Y");
				iajax.addParam("MONEY_ROOT_CD",  "99");   // �ŷ��ڱ� ��õ
				iajax.addParam("MONEY_ROOT_ETC", $("#moneyRootSelf").val());	 // �ŷ��ڱ� ��õ �����Է°�
				iajax.addParam("ASSET_STS_CD", $("#assetStatusCombo").val());   // �ڱ���Ȳ

				iajax.addParam("LIMIT_AMT", limit_AMT);   // �ѵ��ݾ�
				iajax.addParam("REQ_GB", reqGb);  // ��û���� 1 ��ȭ��û 2 �ڵ����� 3 �ڵ���û���ɿ��� 4 �ڵ���û 5 �¶����޻�п��������ѽ�û 6 �ڵ���û���ۼ�
				iajax.addParam("TRANC_YN", "0");   // ��ȯ���� 1 ��ȯ 0 ��ȯ�ƴ� // ��û���ۼ�ȭ���� �ڵ������϶��� �ü��ְ� �ڵ������� ��ȯ���úҰ�

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

				iajax.addParam("SUN_WEAK_CD", $("#sunWeakCode").val()); // ��ȸ����������
				
				/* �����Һ��ڹ� �߰� 2021.03.10 */
				//�����Һ��ڱ���
				var finCustGbVal = $("input[name='finCustGb']:checked").val();

				//�����ǰ���ص�
				//var goodsKnowCdVal = $("input[name='goodsKnowCd']:checked").val();
				//�����̿����
				//var loanExprCdVal = $("input[name='loanExprCd']:checked").val();
				
				iajax.addParam("FIN_CUST_GB",	finCustGbVal);					//�����Һ��ڱ���
				iajax.addParam("TOT_ASSET_CD",	$("#totAssetCdCombo").val());	//���ڻ�Ը�
				//iajax.addParam("GOODS_KNOW_CD",	goodsKnowCdVal);				//�����ǰ���ص�
				//iajax.addParam("LOAN_EXPR_CD", loanExprCdVal);					//�����̿����
				iajax.addParam("FIXED_EXP_CD",	$("#fixedExpCdCombo").val());	//����������

			},


			/* --------------------------------------------------------------------------------------
				��ȭ��û
				loanRenewal4_012.fnSave_4
			 -------------------------------------------------------------------------------------- */
			fnSave_4 : function(){

				// iajax ���� // ��û���� 1 ��ȭ��û
				loanRenewal4_012.fnSetAjaxParam("1");

				$.ajax({
				    type: "post",
				    url: callURL_requestLNC4004,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json) {
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){
				    		var type = "";

							// ��û�������� ������ ����
							var dataMap = loanRenewal4_012.fnGetDataParam();

				    		type = "2";
							
			    			// "���� ��û�� �����Ǿ����ϴ�."
			    			var data_list = [
			    		             { "key" : "view_name", "value" : "/lo/LOAN2113.jsp" }
			    		           , { "key" : "title", "value" : "��û���" }
									, { "key" : "parent", "value" : "IB" }
									, { "key" : "topMenu", "value" : "IB_REQ" }
									, { "key" : "leftMenu", "value" : "IB_REQ_010" }
			    		           , { "key" : "type", "value" : type }   // type : 1 �ۼ�ġ�ϱ�, 2 �¶��μ��������ϱ� 3 �⺻ 4 �̾�����ϱ� 5 ����Ұ��ȳ�
			    				];

			    			// renewal4 ���� url ȣ��
			    			fnCommon_callUrl( data_list );

				    	}else{

				    		// ����Ұ��ȳ�
				    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302" ){
					    		loanRenewal4_012.fnGoNextSorryStep();

				    		// �����޼����ȳ�
				    		}else{
					    		var errorMsg = json.RESULT_DESC;
								alert(errorMsg.split("<br/>").join("\n"));
				    		}
				    	}
				    },
					beforeSend: function() {
						ing.show();
					},
					error: function(data, textStatus, error) {
						// alert(error);
						ing.hide();
						fnCommon_SessionExpired();
						console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function() {
						ing.hide();
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				�⺻�� ��ȸ
				loanRenewal4_012.fnGetWon
			 -------------------------------------------------------------------------------------- */
			fnGetWon : function(){
				var loanAmt = document.getElementById("won");

				// �޸�����
				var str = loanAmt.value;
				str = str.replace(/,/g,'');
				loanAmt.value = str;

				var returnVal = loanAmt.value;
				fnCommon_addComma(loanAmt);  // õ�������� �޸��߰�
				return returnVal;
			},



			/* --------------------------------------------------------------------------------------
				��û�������� ������ ���� // �ڵ����� ���ý� �� ���û�ǰ��, �ڵ������û����, �����û���ۼ����� �� ������ ����
				loanRenewal4_012.fnGetDataParam
			 -------------------------------------------------------------------------------------- */
			fnGetDataParam : function(){
			
				var result = {};

				var cust_NO = "";  				// ����ȣ
				var goods_CD = "";   			// ��ǰ�ڵ�
				var bank_INSP_NO_check = "";	// ���������û��ȣ
				var co_NM = "";  				// �����				
				var bankCd = "";				// �Ա�����
				var acctNo = "";				// �Աݰ��¹�ȣ
				var haeCd = "";					// DHKANG ������500 �ٹ�����

				// 3005 ���� �ִ� �÷�
				var req_AMT = "";   			// ��û�ݾ�
				var req_TERM = "";   			// ����Ⱓ
				var fund_YONGDO_CD = "";  		// �ڱݿ뵵
				var ofc_TELNO = "";   			// ���忬��ó
				var hac_CD = "";   				// ��������
				var hac_CD_NAME = "";   		// ����������
				var email = "";   				// �̸���
				var sun_WEAK_CD = ""; 			//�޻�� ������ ����
				var	se_C_NM = "";	//������
				
				// ���ͳ� ������ �ʵ���� �빮�ڷ� ��� ��ȯ�Ǿ� �����ϰ� ����(201124 ���̹�ũ �۾� ����~)
				if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.goods_CD) ){
						cust_NO = LNC3003_selected_json.cust_NO;
						goods_CD = LNC3003_selected_json.goods_CD;
						
				// �����û ��� ��ȸ
				}else if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.GOODS_CD) ){
					cust_NO = LNC3003_selected_json.CUST_NO;
					goods_CD = LNC3003_selected_json.GOODS_CD;
					bankCd = LNC3003_selected_json.IN_BANK_CD;
					acctNo = LNC3003_selected_json.IN_ACCO_NO;
					haeCd = LNC3003_selected_json.HAE_CD;
						
				// �����û ��� ��ȸ
				}else if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.goods_CD) ){
					cust_NO = LNC3005_selected.cust_NO;
					goods_CD = LNC3005_selected.goods_CD;
					
					//������
					se_C_NM = LNC3005_selected.SE_C_NM;					

				// �ѵ������ȸ ȭ�鿡�� �Ѿ�� ��� ���õ� �����û ��ǰ����
				}else if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.GOODS_CD) ){
					cust_NO = LNC3005_selected.CUST_NO;
					goods_CD = LNC3005_selected.GOODS_CD;
					bankCd = LNC3005_selected.IN_BANK_CD;
					acctNo = LNC3005_selected.IN_ACCO_NO;
					haeCd = LNC3005_selected.HAE_CD;
					
					//������
					se_C_NM = LNC3005_selected.SE_C_NM;

				// �ѵ������ȸ ȭ�鿡�� �Ѿ�� ��� ���õ� �����û ��ǰ����
				}else if( !fnCommon_isNull(LNC3003_obj)  &&  !fnCommon_isNull(LNC3003_obj.goods_CD) ){
					cust_NO = LNC3003_obj.cust_NO;
					goods_CD = LNC3003_obj.goods_CD;
					
				}else if( !fnCommon_isNull(LNC3003_obj)  &&  !fnCommon_isNull(LNC3003_obj.GOODS_CD) ){
					cust_NO = LNC3003_obj.CUST_NO;
					goods_CD = LNC3003_obj.GOODS_CD;
					bankCd = LNC3003_selected_json.IN_BANK_CD;
					acctNo = LNC3003_selected_json.IN_ACCO_NO;
					haeCd = LNC3003_selected_json.HAE_CD;
					
				}

				if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.goods_CD) ){
					cust_NO = LNC3005_selected.cust_NO;
					co_NM = LNC3005_selected.co_NM;
					bank_INSP_NO_check = LNC3005_selected.bank_INSP_NO;  // 3005 ������ ��û��ȣ �����ؼ� ���
					req_AMT = LNC3005_selected.req_AMT;
					req_TERM = LNC3005_selected.req_TERM;
					fund_YONGDO_CD = LNC3005_selected.fund_YONGDO_CD;
					ofc_TELNO = LNC3005_selected.ofc_TELNO;
					hac_CD = LNC3005_selected.hac_CD;
					hac_CD_NAME = LNC3005_selected.hac_CD_NAME;
					email = LNC3005_selected.email;
					sun_WEAK_CD = LNC3005_selected.sun_WEAK_CD;
					if( !fnCommon_isNull(req_AMT)){
						req_AMT += "0000";  // �� ������ ����
					}
					
					se_C_NM = LNC3005_selected.SE_C_NM;
				}
				
				if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.GOODS_CD) ){
					cust_NO = LNC3005_selected.CUST_NO;
					co_NM = LNC3005_selected.CO_NM;

					bank_INSP_NO_check = LNC3005_selected.BANK_INSP_NO;  // 3005 ������ ��û��ȣ �����ؼ� ���
					req_AMT = LNC3005_selected.REQ_AMT;
					
					req_TERM = LNC3005_selected.REQ_TERM;
					fund_YONGDO_CD = LNC3005_selected.FUND_YONGDO_CD;
					ofc_TELNO = LNC3005_selected.OFC_TELNO;
					hac_CD = LNC3005_selected.HAC_CD;
					hac_CD_NAME = LNC3005_selected.HAC_CD_NAME;
					email = LNC3005_selected.EMAIL;
					sun_WEAK_CD = LNC3005_selected.SUN_WEAK_CD;
					if( !fnCommon_isNull(req_AMT)){
						req_AMT += "0000";  // �� ������ ����
					}
					
					bankCd = LNC3005_selected.IN_BANK_CD;
					acctNo = LNC3005_selected.IN_ACCO_NO;
					haeCd = LNC3005_selected.HAE_CD;	// DHKANG ������500
					
					se_C_NM = LNC3005_selected.SE_C_NM; 
				}

				// �̾��ϱ� ���Խ� ����� native�� �ѷȴٰ� �ٽ� �޴°�� �ѱ۱��������� �־� �ٽ� ��ȸ�� ������ ����
				if( fnCommon_isNull(company_nm) ){
					if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.GOODS_CD) ){
						co_NM = LNC3005_selected.CO_NM;
					}
				}
				
				// ��ȯ�� �ʿ� ������ ����
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
				result.IN_BANK_CD = bankCd;
				result.IN_ACCO_NO = acctNo;
				result.HAE_CD = haeCd;		// DHKANG ������500
				//������ 
				result.se_C_NM = se_C_NM;
				
				return result;
			},



			/* --------------------------------------------------------------------------------------
				�ڵ����� ȣ��
				loanRenewal4_012.fnSave_2
			 -------------------------------------------------------------------------------------- */
			fnSave_2 : function(){

				// ��û���� 1 ��ȭ��û 2 �ڵ����� 3 �ڵ���û���ɿ��� 4 �ڵ���û 5 �¶����޻�п��������ѽ�û 6 �ڵ���û���ۼ�
				var REQ_GB = "";

				// �ۿ���
				//var isApp_flag = fnCommon_isApp();

				// �ڵ����� ���� // �ǰ����轺ũ�������� ����  or  �Ǻ���ũ���� ����
				if( ((!fnCommon_isNull(SCRP_NHIS_EXP)  &&  SCRP_NHIS_EXP == "Y")  ||  (!fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  &&  SCRP_NHIS_SUCCESS_YN == "Y")) ){

					REQ_GB = "2";  // ��û���� 2 �ڵ�����
				}else{
					REQ_GB = "4";  // ��û���� 4 �ڵ���û
				}

				// iajax ����
				loanRenewal4_012.fnSetAjaxParam( REQ_GB );

				// ��û�������� ������ ����
				var dataMap = loanRenewal4_012.fnGetDataParam();

				// iajax ������ ���� parameter �߰�
				// ����� 5������ - ����
//				fnCommon_partnerData();

				$.ajax({
				    type: "post",
				    url: callURL_requestLNC4004,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json) {
				    	// ����� 5������ - �׽�Ʈ������
				    	// json.RESULT_NO = "0000";
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){
				    		if(REQ_GB == "2"){

								// ���� ���� �� �ȳ� ȣ��
					    		loanRenewal4_012.fnGoNextBeforeGuideStep(json.DATA.LOAN_INSP_NO, json.DATA.BANK_COMFIRM_NO);

				    		}else{
				    			// "���� ��û�� �����Ǿ����ϴ�."
				    			var data_list = [
				    		             { "key" : "view_name", "value" : "/lo/LOAN2113.jsp" }
				    		           , { "key" : "title", "value" : "��û���" }
										, { "key" : "parent", "value" : "IB" }
										, { "key" : "topMenu", "value" : "IB_REQ" }
										, { "key" : "leftMenu", "value" : "IB_REQ_010" }
				    		           , { "key" : "type", "value" : "4" }   // type : 1 �ۼ�ġ�ϱ�, 2 �¶��μ��������ϱ� 3 �⺻ 4 �̾�����ϱ� 5 ����Ұ��ȳ�
				    				];

				    			// renewal4 ���� url ȣ��
				    			fnCommon_callUrl( data_list );
				    		}

				    	}else{

				    		// ����Ұ��ȳ�
				    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302" ){
					    		loanRenewal4_012.fnGoNextSorryStep();

				    		}else{

					    		// �¶����޻��
								if( !fnCommon_isNull(dataMap.goods_CD)  &&  dataMap.goods_CD == "52351" ){

									// �¶����޻�п��������ѽ�û
					    			loanRenewal4_012.fnGoOnlineSunshineLoanSubmit();

					    		}else{
						    		var errorMsg = json.RESULT_DESC;
									alert(errorMsg.split("<br/>").join("\n"));
					    		}
				    		}
				    	}
				    },
					error: function(data, textStatus, error) {
						// alert(error);
						ing.hide();
						fnCommon_SessionExpired();
						console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					beforeSend: function() {
						ing.show();
					},
					complete: function() {
						ing.hide();
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				�ڵ���û���ۼ�
				loanRenewal4_012.fnSave_3
			 -------------------------------------------------------------------------------------- */
			fnSave_3 : function(){

				// iajax ���� // ��û���� 6 �ڵ���û���ۼ�
				loanRenewal4_012.fnSetAjaxParam("6");

				// ��û�������� ������ ����
				var dataMap = loanRenewal4_012.fnGetDataParam();

				$.ajax({
				    type: "post",
				    url: callURL_requestLNC4004,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json) {
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

				    		// ���� ���� �� �ȳ� ȣ��
				    		loanRenewal4_012.fnGoNextBeforeGuideStep(json.DATA.LOAN_INSP_NO, json.DATA.BANK_COMFIRM_NO);

				    	}else{

				    		// ����Ұ��ȳ�
				    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302" ){
					    		loanRenewal4_012.fnGoNextSorryStep();

				    		}else{
								// 52351 �¶����޻��
								if( !fnCommon_isNull(dataMap.goods_CD)  &&  dataMap.goods_CD == "52351" ){

									// �¶����޻�п��������ѽ�û
						    		loanRenewal4_012.fnGoOnlineSunshineLoanSubmit();

								}else{
						    		var errorMsg = json.RESULT_DESC;
									alert(errorMsg.split("<br/>").join("\n"));
								}
				    		}
				    	}
				    },
					error: function(data, textStatus, error) {
						ing.hide();
						fnCommon_SessionExpired();
					},
					beforeSend: function() {
						ing.show();
					},
					complete: function() {
						ing.hide();
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				�¶����޻�п��������ѽ�û
				loanRenewal4_012.fnGoOnlineSunshineLoanSubmit
			 -------------------------------------------------------------------------------------- */
			fnGoOnlineSunshineLoanSubmit : function(){

				// ��û�������� ������ ����
				var dataMap = loanRenewal4_012.fnGetDataParam();

				// ��û�ݾ�
				var req_amt = $("#req_amt").val();
				req_amt = fnCommon_getOnlyNumber(req_amt);   // ���ڿ� ���� �� ���ڸ� ��ȯ

				iajax.clearParam();
				// ����� 5������ - ����
				iajax.addParam("CUST_NO", dataMap.cust_NO);
				iajax.addParam("GOODS_CD", dataMap.goods_CD);
				iajax.addParam("REQ_AMT", req_amt);
				iajax.addParam("BANK_INSP_NO", bank_INSP_NO);
				iajax.addParam("REQ_GB", "5");   // 5 �¶����޻�п��������ѽ�û
				iajax.addParam("SEND_MSG", "Y");   // ������ſ���
				iajax.addParam("TRANC_YN", "0");   // ��ȯ���� 1 ��ȯ 0 ��ȯ�ƴ� // ��û���ۼ�ȭ���� �ڵ������϶��� �ü��ְ� �ڵ������� ��ȯ���úҰ�
				iajax.addParam("ADGATHER", getAdTrackingCookie("shsb.adgather"));	// ������D �űԴ����(�ֵ�Դ�) �Ķ���� ����

				$.ajax({
				    type: "post",
				    url: callURL_requestLNC3004,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json) {
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000"  ){
				    		alert("�¶����޻�� ������\n�ڵ� �߱� ����� �ƴմϴ�.\n�������� �����Ͽ�\n������ ���� �����帮�ڽ��ϴ�.");

							// "���� ��û�� �����Ǿ����ϴ�."
							var data_list = [
						              { "key" : "view_name", "value" : "/lo/LOAN2113.jsp" }
						            , { "key" : "title", "value" : "��û���" }
									, { "key" : "parent", "value" : "IB" }
									, { "key" : "topMenu", "value" : "IB_REQ" }
									, { "key" : "leftMenu", "value" : "IB_REQ_010" }
						           , { "key" : "type", "value" : "3" }   // type : 1 �ۼ�ġ�ϱ�, 2 �¶��μ��������ϱ� 3 �⺻ 4 �̾�����ϱ� 5 ����Ұ��ȳ�
								];

							// renewal4 ���� url ȣ��
							fnCommon_callUrl( data_list );

				    	}else{

				    		// ����Ұ��ȳ�
				    		if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_DETAIL_NO)  &&  json.RESULT_DETAIL_NO == "000302"){
					    		loanRenewal4_012.fnGoNextSorryStep();

				    		// �����޼����ȳ�
				    		}else{
					    		var errorMsg = json.RESULT_DESC;
								alert(errorMsg.split("<br/>").join("\n"));
				    		}
				    	}
					},
					beforeSend: function() {
						ing.show();
					},
					error: function(data, textStatus, error) {
						ing.hide();
						fnCommon_SessionExpired();
					},
					complete: function() {
						ing.hide();
					}
				});
			},



			/* --------------------------------------------------------------------------------------
				����Ұ��ȳ�
				loanRenewal4_012.fnGoNextSorryStep
			 -------------------------------------------------------------------------------------- */
			fnGoNextSorryStep : function(){

				// "���� ��û�� �����Ǿ����ϴ�."
				var data_list = [
			             { "key" : "view_name", "value" : "/lo/LOAN2113.jsp" }
			           , { "key" : "title", "value" : "��û���" }
						, { "key" : "parent", "value" : "IB" }
						, { "key" : "topMenu", "value" : "IB_REQ" }
						, { "key" : "leftMenu", "value" : "IB_REQ_010" }
			           , { "key" : "type", "value" : "5" }   // 1 �ۼ�ġ�ϱ�, 2 �¶��μ��������ϱ� 3 �⺻ 4 �̾�����ϱ� 5 ����Ұ��ȳ�
					];

				// renewal4 ���� url ȣ��
				fnCommon_callUrl( data_list );
			},



			/* --------------------------------------------------------------------------------------
				��ȿ��üũ
				loanRenewal4_012.fnValidationCheck
			 -------------------------------------------------------------------------------------- */
			fnValidationCheck : function( type, num ){

				// ���ó���� ����� ����Ʈ
				var result_list = [];

				// ��û�ݾ�
				var req_amt = $("#req_amt").val();
				var req_amt_number = 0;
				req_amt = fnCommon_getOnlyNumber(req_amt);   // ���ڿ� ���� �� ���ڸ� ��ȯ
				if(fnCommon_isNull(req_amt)){
					result_list.push({
						  msg : "��û�ݾ��� ��Ȯ�ϰ� �Է����ּ���."
						, focus_field_id : "req_amt"
						, focus_slid_id : "btn_slid_1"
					});

				}else{
					req_amt_number = Number(req_amt);

					// 10�� ������ �Է����� ����
					if(req_amt_number > 0  &&  req_amt_number > 100000){
						var req_amt_number_2 = req_amt_number%100000;
						if(!fnCommon_isNull(req_amt_number_2)  &&  req_amt_number_2 > 0){

							// �޼��� �˾�
				    		var msg = "<p>��û�ݾ��� 10���� ������ �Է� �����մϴ�.</p>";
				    		var no_button_flag = false;  // �ƴϿ� ��ư ���� ����
				    		var fnCallback_yes = loanRenewal4_012.fnKeyup_inputAmt_2;  // Ȯ�� ��ư�� �Լ� ���� // �ѵ������ȸ ȭ�� �̵�
				    		var fnCallback_no = null;  // �ƴϿ� �̻��

							fnCommon_popup("open", msg, no_button_flag, fnCallback_yes, fnCallback_no);
							return false;
						}
					}
				}

				// �����ѵ�
				var limit_AMT = "";
				var limit_AMT_number = 0;

				// �ѵ������ȸ ȭ�鿡�� �Ѿ�� ��� ���õ� �����û ��ǰ����
				if( !fnCommon_isNull(LNC3003_selected_json)  &&  !fnCommon_isNull(LNC3003_selected_json.GOODS_CD) ){
//					limit_AMT = LNC3003_selected_json.limit_AMT;
					limit_AMT = LNC3003_selected_json.LIMIT_AMT;

				// �����û ��� ��ȸ
				}else if( !fnCommon_isNull(LNC3005_selected)  &&  !fnCommon_isNull(LNC3005_selected.GOODS_CD) ){
//					limit_AMT = LNC3005_selected.req_AMT + "0000";
					limit_AMT = LNC3005_selected.REQ_AMT;

				// �ڵ���û����
				}else if( !fnCommon_isNull(LNC3003_obj)  &&  !fnCommon_isNull(LNC3003_obj.GOODS_CD) ){
// 					limit_AMT = LNC3003_obj.limit_AMT;
					limit_AMT = LNC3003_obj.LIMIT_AMT;
				}

				if( !fnCommon_isNull(limit_AMT) ){
					limit_AMT_number = Number(limit_AMT) * 10000;  // ���� ������ ��ȯ
				}

				var chk_goods_cd = "";
				if( !fnCommon_isNull(LNC3003_selected_json.GOODS_CD) ){
					chk_goods_cd = LNC3003_selected_json.GOODS_CD;
				}else if( !fnCommon_isNull(LNC3005_selected.GOODS_CD) ){
					chk_goods_cd = LNC3005_selected.GOODS_CD;
				}else if( !fnCommon_isNull(LNC3003_obj.GOODS_CD) ){
					chk_goods_cd = LNC3003_obj.GOODS_CD;
				}
							
				// DHKANG �ٹ����� �� ����
				var haeCd = "";
				if( !fnCommon_isNull(LNC3003_selected_json.HAE_CD) ){
					haeCd = LNC3003_selected_json.HAE_CD;
				}else if( !fnCommon_isNull(LNC3005_selected.HAE_CD) ){
					haeCd = LNC3005_selected.HAE_CD;
				}else if( !fnCommon_isNull(LNC3003_obj.HAE_CD) ){
					haeCd = LNC3003_obj.HAE_CD;
				}
				
				// ��û�ݾ� �ѵ������� üũ
				if(limit_AMT_number < req_amt_number){
					result_list.push({
						  msg : "�����Ͻ� ��ǰ�� �����ѵ��� �ʰ��ϼ̽��ϴ�."
						, focus_field_id : "req_amt"
						, focus_slid_id : "btn_slid_1"
					});
				}
								
				//�����ڿ� ���� ��û�ݾ� ���� 
				if( !fnCommon_isNull(se_c_nm) && (se_c_nm == "777805" || se_c_nm == "777801") ) //���̹�ũ, ������������
				{
					if(req_amt_number < 1000000)
					{						
						result_list.push({
							  msg : "��û �ּұݾ��� 100�����Դϴ�. ��û�ݾ��� �ٽ� Ȯ���Ͽ� �ּ���."
							, focus_field_id : "req_amt"
							, focus_slid_id : "btn_slid_1"
						});
					}
				}
				else
				if( "52341" == chk_goods_cd){ // ������500
					if( req_amt_number < 500000 ){
						result_list.push({
							  msg : "��û�ݾ��� �ּ� 50���� �̻� �Է��ϼž� �մϴ�."
							, focus_field_id : "req_amt"
							, focus_slid_id : "btn_slid_1"
						});
					}
				}else if(req_amt_number < 1000000){
					result_list.push({
						  msg : "��û�ݾ��� �ּ� 100���� �̻� �Է��ϼž� �մϴ�."
						, focus_field_id : "req_amt"
						, focus_slid_id : "btn_slid_1"
					});
				}

				if(req_amt_number%10000 != 0){
					result_list.push({
						  msg : "��û�ݾ��� ���� ������ �Է����ּ���."
						, focus_field_id : "req_amt"
						, focus_slid_id : "btn_slid_1"
					});
				}

				// ����Ⱓ
				var loanPeriod = $("#loanPeriodCombo").val();
				if( fnCommon_isNull(loanPeriod) ){
					result_list.push({
						  msg : "����Ⱓ�� �������ּ���."
						, focus_field_id : "loanPeriodCombo"
						, focus_slid_id : "btn_slid_1"
					});
				}

				// �ڱݿ뵵
				var useTypeCombo = $("#useTypeCombo").val();
				if( fnCommon_isNull(useTypeCombo) ){
					result_list.push({
						  msg : "�ڱݿ뵵�� �������ּ���."
						, focus_field_id : "useTypeCombo"
						, focus_slid_id : "btn_slid_1"
					});
				}

				// ����� ���� ��뿩��
				var qna0101 = $("#qna0101");
				var qna0101_checked = qna0101.prop("checked");
				
				// �����Һ��� ����
				var finCustGbRdo1 = $("#finCustGbRdo1");
				var finCustGbRdo1_checked = finCustGbRdo1.prop("checked");				
				
				// �����ǰ���ص�
				var goodsKnowCdRdo1 = $("#goodsKnowCdRdo1");
				var goodsKnowCdRdo1_checked = goodsKnowCdRdo1.prop("checked");						
				
				
				if( fnCommon_isNull(qna0101_checked, "boolean") ){
					result_list.push({
						  msg : "������ �ƴ� ���,\n���� ��û�� �Ұ��մϴ�."
						, focus_field_id : "qna0101"
						, focus_slid_id : "btn_slid_1"
					});

				}
				else if( fnCommon_isNull(finCustGbRdo1_checked, "boolean") ){
					result_list.push({
						  msg : "�Ϲݱ����Һ��ڰ� �ƴ� ���,\n���� ��û�� �Ұ��մϴ�."
						, focus_field_id : "finCustGbRdo1"
						, focus_slid_id : "btn_slid_1"
					});

				}
				/*else if( fnCommon_isNull(goodsKnowCdRdo1_checked, "boolean") ){
					result_list.push({
						  msg : "�����ǰ�� �� �������� ���� ���,\n���� ��û�� �Ұ��մϴ�."
						, focus_field_id : "goodsKnowCdRdo1"
						, focus_slid_id : "btn_slid_1"
					});
				}*/				
				else{

					// �ŷ��ڱ��� ��õ 99 ��Ÿ
					// ����� 5������ 99 ��Ÿ�� ����
					// $("#moneyRootCombo").val("99");
					var moneyRootCombo = "99";

					// �ŷ��ڱ��� ��õ
					/*
					var moneyRootCombo = $("#moneyRootCombo").val();
					if( fnCommon_isNull(moneyRootCombo) ){
						result_list.push({
							  msg : "�ŷ��ڱ��� ��õ�� �������ּ���."
							, focus_field_id : "moneyRootCombo"
							, focus_slid_id : "btn_slid_1"
						});
					}
					

					// �ڱ���Ȳ[�����Һ��ں�ȣ�� �߰�(���ڻ�Ը�)�� ����]
					var assetStatusCombo = $("#assetStatusCombo").val();
					if( fnCommon_isNull(assetStatusCombo) ){
						result_list.push({
							  msg : "�ڱ���Ȳ�� �������ּ���."
							, focus_field_id : "assetStatusCombo"
							, focus_slid_id : "btn_slid_1"
						});
					}
					*/
				}

				// �ֹε����
				var residAddr1 = $("#residAddr1").val();
				if( fnCommon_isNull(residAddr1) ){
					result_list.push({
						  msg : "�ֹε������ �˻����ּ���."
						, focus_field_id : "residAddr1"
						, focus_slid_id : "btn_slid_2"
					});
				}
				var residAddr2 = $("#residAddr2").val();
				if( fnCommon_isNull(residAddr2) ){
					result_list.push({
						  msg : "�ֹε���� ���ּҸ� �Է����ּ���."
						, focus_field_id : "residAddr2"
						, focus_slid_id : "btn_slid_2"
					});
				}
				var residAddrType = $("#residAddrType").val();
				if( fnCommon_isNull(residAddrType) ){
					result_list.push({
						  msg : "�ֹε������ �������ּ���."
						, focus_field_id : "residAddrType"
						, focus_slid_id : "btn_slid_2"
					});
				}
				
				// �ǰ�����
				var homeAddr1 = $("#homeAddr1").val();
				if( fnCommon_isNull(homeAddr1) ){
					result_list.push({
						  msg : "�ǰ������� �˻����ּ���."
						, focus_field_id : "homeAddr1"
						, focus_slid_id : "btn_slid_2"
					});
				}
				var homeAddr2 = $("#homeAddr2").val();
				if( fnCommon_isNull(homeAddr2) ){
					result_list.push({
						  msg : "�ǰ����� ���ּҸ� �Է����ּ���."
						, focus_field_id : "homeAddr2"
						, focus_slid_id : "btn_slid_2"
					});
				}
				var homeAddrType = $("#homeAddrType").val();
				if( fnCommon_isNull(homeAddrType) ){
					result_list.push({
						  msg : "�ǰ������� �������ּ���."
						, focus_field_id : "homeAddrType"
						, focus_slid_id : "btn_slid_2"
					});
				}

				
				if(haeCd != "7" && haeCd != "8" && haeCd != "9") {	// DHKANG ���ݼҵ���, �ֺ�, ������ ��� �����, ������ȭ��ȣ üũ ����
					// �����
					var company_nm = $("#company_nm").val();
					if( fnCommon_isNull(company_nm) ){
						result_list.push({
							  msg : "������� �Է����ּ���."
							, focus_field_id : "company_nm"
							, focus_slid_id : "btn_slid_2"
						});
					}

					// ������ȭ��ȣ
					var workTelNum = $("#workTelNum").val();
					var noCharhndNo = fnCommon_getOnlyNumber(hndNo);   // ���ڿ� ���� �� ���ڸ� ��ȯ
					
					workTelNum = fnCommon_getOnlyNumber(workTelNum);   // ���ڿ� ���� �� ���ڸ� ��ȯ
					
					if( fnCommon_isNull(workTelNum) ) {
						result_list.push({
							  msg : "������ȭ��ȣ�� �Է����ּ���."
							, focus_field_id : "workTelNum"
							, focus_slid_id : "btn_slid_2"
						});
						
					} else if(noCharhndNo == workTelNum || workTelNum.substring(0,2) == "00") {	// ����D ��û, ������ȭ��ȣ 0000000 ������ �Է��ϴ� ���̽� ó��
						result_list.push({
							  msg : "���� ��ȭ��ȣ�� ��Ȯ�� �Է����ּ���. �ڵ������� ��� ����Ȯ�� ��ȭ�� ���� �ʽ��ϴ�."
							, focus_field_id : "workTelNum"
							, focus_slid_id : "btn_slid_2"
						});
					}
				
				}

				// ������ �¶����޻��(52351)�� ��쿡�� üũ
				if(chk_goods_cd == "52351") {
					var jobPosNm = $("#jobPosNm").val();
					if( fnCommon_isNull(jobPosNm) ){
						result_list.push({
							  msg : "������ �˻��Ͽ� �������ּ���."
							, focus_field_id : "jobPosNm"
							, focus_slid_id : "btn_slid_2"
						});
					}
				}
				
				// ����
				var jobTypeNm = $("#jobTypeNm").val();
				if( fnCommon_isNull(jobTypeNm) ){
					result_list.push({
						  msg : "������ �˻��Ͽ� �������ּ���."
						, focus_field_id : "jobTypeNm"
						, focus_slid_id : "btn_slid_2"
					});
				}

				// 28 �� �����Է��ε�
				var jobTypeCode = $("#jobTypeCode").val();
				if( !fnCommon_isNull(jobTypeCode)  &&  jobTypeCode == "28" ){

					var jobTypeSelf = $("#jobTypeSelf").val();
					if( fnCommon_isNull(jobTypeSelf) ){
						result_list.push({
							  msg : "������ �Է����ּ���."
							, focus_field_id : "jobTypeSelf"
							, focus_slid_id : "btn_slid_2"
						});
					}
				}

				// �̸���
				var email = $("#email").val();
				var noEmail = $("#noEmail");  // �̸��� ������ üũ�ڽ�
				var noEmail_checked = noEmail.prop("checked");

				// üũ�ȵ� ���
				if( fnCommon_isNull(noEmail_checked, "boolean") ){

					// �̸��� �Է� �ʼ�
					if( fnCommon_isNull(email) ){
						result_list.push({
							  msg : "�̸����� �Է����ּ���."
							, focus_field_id : "email"
							, focus_slid_id : "btn_slid_2"
						});

					// �̸��� ������ ��ȿ�� üũ
					}else{
						var email_valid_flag = true;   // �̸��� ��ȿ�� üũ���
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
								  msg : "�Էµ� �̸����� Ȯ�����ּ���."
								, focus_field_id : "email"
								, focus_slid_id : "btn_slid_2"
							});
						}
					}
				}

				// ����� �޺�
				var bankCodeCombo = $("#bankCodeCombo").val();
				if( fnCommon_isNull(bankCodeCombo) ){
					result_list.push({
						  msg : "������ �������ּ���."
						, focus_field_id : "bankCodeCombo"
						, focus_slid_id : "btn_slid_3"
					});
				}

				// ���¹�ȣ
				var accCd = $("#accCd").val();
				if( fnCommon_isNull(accCd) ){
					result_list.push({
						  msg : "���¹�ȣ�� �Է����ּ���."
						, focus_field_id : "accCd"
						, focus_slid_id : "btn_slid_3"
					});
				}

				// ������ Ȯ�� ����
				if(accountOwner_confirm_flag == false){
					result_list.push({
						  msg : "������ Ȯ���� ���ּ���."
						, focus_field_id : "btnAccountOwner"
						, focus_slid_id : "btn_slid_3"
					});
				}

				// �������� ������ Ȯ�� ����
				if(workingday_confirm_flag == false){
					//alert("������(��ü��)�� Ȯ�����ּ���.");
					//$("#cmsDateCombo").val("");
					//return;
					result_list.push({
						  msg : "������(��ü��)�� Ȯ�����ּ���."
						, focus_field_id : "cmsDateCombo"
						, focus_slid_id : "btn_slid_3"
					});
				}

				if(nextsw == false){
					result_list.push({
						  msg : "��ü���� ��û�Ϸκ��� 4���������ĺ��� ������ �����մϴ�."
						, focus_field_id : "cmsDateCombo"
						, focus_slid_id : "btn_slid_3"
					});

					//alert("��ü���� ��û�Ϸκ��� 4���������ĺ��� ������ �����մϴ�.");
					//$("#cmsDateCombo").val("");
					//return;
				}


				// ������� ���� ������
				if( !fnCommon_isNull(result_list)  &&  !fnCommon_isNull(result_list.length)  &&  result_list.length > 0 ){

					// �⺻üũ�϶��� ���� ���� ���� �޼����� ����, �ش翵�� ��Ŀ�� ó��
					if( fnCommon_isNull(type)  ||  type == "default"){
						var result_map = result_list[0];

						if( !fnCommon_isNull(result_map) ){
							var msg = result_map.msg;
							var focus_field_id = result_map.focus_field_id;
							var focus_slid_id = result_map.focus_slid_id;

							if( !fnCommon_isNull(msg)  &&  !fnCommon_isNull(focus_field_id)  &&  !fnCommon_isNull(focus_slid_id) ){
								alert(msg);
								$("#" + focus_field_id).focus();

								// �����̵� �� Ŭ�� �̺�Ʈ ���� �߻�
								// loanRenewal4_012.fnEvent_Slide(null, focus_slid_id);
								return false;
							}
						}

					// ����üũ�϶��� ���罽���̵��� ���� ���� ���� �޼����� ����
					}else{
						if( !fnCommon_isNull(num) ){
							if(num == 2  || num == 3){
								var check_slid_id = "";

								// 2 �������Է����� �̵��϶��� 1��° �����̵�(��û�����Է�) �κи� üũ�Ѵ�
								if(num == 2){
									check_slid_id = "btn_slid_1";   // üũ��� �����̵� id

								// 3 �ڵ���ü �� �Աݰ������� �Է� 2 �������Է����� �̵��϶��� 1��° �����̵�(��û�����Է�) �κи� üũ�Ѵ�
								}else if(num == 3){
									check_slid_id = "btn_slid_2";   // üũ��� �����̵� id
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

											// �����̵� �� Ŭ�� �̺�Ʈ ���� �߻�
											// loanRenewal4_012.fnEvent_Slide(null, focus_slid_id);
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
				���� ���� �� �ȳ� ȣ��
				loanRenewal4_012.fnGoNextBeforeGuideStep
			 -------------------------------------------------------------------------------------- */
			fnGoNextBeforeGuideStep : function(loanInspNo, bankConfirmNo){
				var url = callURL_before_guide;
				var isSunshine = false;

				// ��û�������� ������ ����
				var dataMap = loanRenewal4_012.fnGetDataParam();

				// 52351 �¶����޻��
				if( !fnCommon_isNull(dataMap.goods_CD)  &&  (dataMap.goods_CD == "52301"  ||  dataMap.goods_CD == "52351") ){
					url = callURL_before_guide_sunshine;
					isSunshine = true;
				}

				// ��û�ݾ�
				var req_amt = $("#req_amt").val();
				req_amt = fnCommon_getOnlyNumber(req_amt);   // ���ڿ� ���� �� ���ڸ� ��ȯ

				if(!isSunshine) {
					var data_list = [
						//{ "key" : "view_name", "value" : "loanRenewal4_015" }
						{ "key" : "view_name", "value" : "/lo/LOAN2152.jsp" }
						, { "key" : "title", "value" : "�ѵ���ȸ" }
						, { "key" : "parent", "value" : "IB" }
						, { "key" : "topMenu", "value" : "IB_REQ" }
						, { "key" : "leftMenu", "value" : "IB_REQ_010" }
						, { "key" : "CUST_NO", "value" : dataMap.cust_NO }
						, { "key" : "BANK_INSP_NO", "value" : loanInspNo }
						, { "key" : "BANK_COMFIRM_NO", "value" : bankConfirmNo }
						, { "key" : "REQ_AMT", "value" : req_amt }
						, { "key" : "DEVICE_TYPE", "value" : "" }
						, { "key" : "CONTRACT_YN", "value" : "Y" }
						, { "key" : "SUNSHINELOAN_YN", "value" : "N" }

						];

						// renewal4 ���� url ȣ��
						fnCommon_callUrl( data_list );
				} else {
					// ���������_Sunshine���� �̵�
					var data_list = [
										//{ "key" : "view_name", "value" : "loanRenewal4_015" }
										{ "key" : "view_name", "value" : "/lo/LOAN2151.jsp" }
										, { "key" : "title", "value" : "�ѵ���ȸ" }
										, { "key" : "parent", "value" : "IB" }
										, { "key" : "topMenu", "value" : "IB_REQ" }
										, { "key" : "leftMenu", "value" : "IB_REQ_010" }
										, { "key" : "CUST_NO", "value" : dataMap.cust_NO }
										, { "key" : "BANK_INSP_NO", "value" : loanInspNo }
										, { "key" : "BANK_COMFIRM_NO", "value" : bankConfirmNo }
										, { "key" : "REQ_AMT", "value" : req_amt }
										, { "key" : "DEVICE_TYPE", "value" : "" }
										, { "key" : "CONTRACT_YN", "value" : "Y" }
										, { "key" : "SUNSHINELOAN_YN", "value" : "Y" }
										// DHKANG ������ ���� ������ �̵���
										, { "key" : "REQ_TERM", "value" : dataMap.req_TERM }
										];

										// renewal4 ���� url ȣ��
										fnCommon_callUrl( data_list );
				}
			},

			/* --------------------------------------------------------------------------------------
			   �����Һ��� ����(�����Һ��ں�ȣ���߰�)
			   loanRenewal4_012.fnChange_finCustGb
			-------------------------------------------------------------------------------------- */			
			fnChange_finCustGb : function(e){

				// ���������Һ��� üũ��
				var checked = $("#finCustGbRdo2").prop("checked");
				
				if( !fnCommon_isNull(checked, "boolean") ){
					
					alert("���������Һ��ڴ� ����ñٷ��� 5�� �̻��� ����, ���� ��� �����մϴ�.");
					
					// �Ϲݱ����Һ��� üũ ����
					// ���� ���� �Ŀ� �̺�Ʈ�� ����Ǵ� �������� �ð��� ����
					setTimeout(function(){

						$("#finCustGbRdo2").parent().removeClass("checked"); //���õ� ������ ��Ÿ�� ����(���������Һ���)
						$("#finCustGbRdo1").parent().addClass("checked");    //���õ� ���·� ��Ÿ�� ����(�Ϲݱ����Һ���)
						$("#finCustGbRdo1").prop("checked", true);						
					}, 300);
				}
			},
			
			/* --------------------------------------------------------------------------------------
			   �����ǰ���ص�(�����Һ��ں�ȣ���߰�)
			   loanRenewal4_012.fnChange_goodsKnowCd
			-------------------------------------------------------------------------------------- */			
			fnChange_goodsKnowCd : function(e){

				// �� �������� ���� üũ��
				var checked = $("#goodsKnowCdRdo2").prop("checked");
				
				if( !fnCommon_isNull(checked, "boolean") ){
					
					alert("[�����Һ��� ��ȣ�� ���� ����] ��17�� ���ռ� ��Ģ�� ����, �����ǰ�� ���� �������� ���� ��� ���������� �Ұ��մϴ�.\r\n�Ϲ��� 1800-3651");
					
					// �� ������ üũ�� ����
					// ���� ���� �Ŀ� �̺�Ʈ�� ����Ǵ� �������� �ð��� ����
					setTimeout(function(){

						$("#goodsKnowCdRdo2").parent().removeClass("checked"); //���õ� ������ ��Ÿ�� ����(�� �������� ����)
						$("#goodsKnowCdRdo1").parent().addClass("checked");    //���õ� ���·� ��Ÿ�� ����(�� ������)
						$("#goodsKnowCdRdo1").prop("checked", true);						
					}, 300);
				}
			}

	}; // var loanRenewal4_012 End


	/* --------------------------------------------------------------------------------------
		��û��� �ȳ� ȭ��
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_013 = {

			/*--------------------------------------------------------------------------------------
				�⺻����
				loanRenewal4_013.fnInit
			 --------------------------------------------------------------------------------------*/
			fnInit : function(){

				// ���⺻���� ��ȸ
				loanRenewal4_013.fnSearch_1();
			},



			/* --------------------------------------------------------------------------------------
				���⺻���� ��ȸ
				loanRenewal4_013.fnSearch_1
			 -------------------------------------------------------------------------------------- */
			fnSearch_1 : function(){

				// ���⺻���� ��ȸ
				iajax.clearParam();
				// ����� 5������ - ����
				//iajax.addParam("CHK_CSRF", random);

				$.ajax({
				    type: "post",
				    url: callURL_loanRenewal4_013_01,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
						if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

							// ���� 1 ������(4�뺸�谡��) 2 ���λ���� 3 ��Ÿ����ҵ��������뿪������ 4 ���ݼҵ���
							var qna01 = json.qna01;

							// ������ �ƴϸ�
							if( fnCommon_isNull(qna01)  ||  qna01 != "1" ){

								// �¶��μ������� ���� �Ұ� --> 3 �⺻���� ����
								if( !fnCommon_isNull(type)  &&  type == "2" ){
									type = "3";
								}
							}

							// ���޹��� ���� ����
							if( !fnCommon_isNull(type) ){

								// 1 �� ��ġ�ϱ� 2 �¶��� ���������ϱ� 3 �⺻ 4 �̾ �����ϱ� 5 ����Ұ��ȳ�
								$("#div_" + type).show();

								// Ȩ���� �̵� ��ư ����� // 2 �¶��� ���������ϱ� 4 �̾ �����ϱ�
								if(type == "2"  ||  type == "4"){
									$("#btn_gohome").hide();
								}
							}

							loanRenewal4_013.fnSearch_2();

				    	} else {
				    		var errorMsg = json.RESULT_DESC;
							alert(errorMsg.split("<br/>").join("\n"));
				    	}
				    },
					error: function(data, textStatus, error) {
						// alert(error);
						fnCommon_SessionExpired();
						// console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function() {
					}
				});
			},

			/* --------------------------------------------------------------------------------------
				���⺻���� ��ȸ
				loanRenewal4_013.fnSearch_2
			 -------------------------------------------------------------------------------------- */
			fnSearch_2 : function( device_result ){

				// ���⺻���� ��ȸ
				iajax.clearParam();

				$.ajax({
				    type: "post",
				    url: callURL_loanRenewal4_001_01,
				    dataType: "json",
				    data: iajax.postparam,
				    success: function(json){
				    	if(json.RESULT_NO == "0000"){

							SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;  // �ǰ����� ��ũ���� ��������
							YOUTH_GUIDE_YN = json.YOUTH_GUIDE_YN;  // ������������ ���� ����

							isXecureAuth = json.isXecureAuth;
							SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;
							isHpAuth = json.isHpAuth;  // ������ �������� ����
							isCardAuth = json.isCardAuth;  // ������ �������� ����
							isOwnAuth = json.isOwnAuth;

				    	} else {
				    		var errorMsg = json.RESULT_DESC;
							alert(errorMsg.split("<br/>").join("\n"));
				    	}
				    },
					beforeSend : function() {
						ing.show();
					},
					error: function(data, textStatus, error) {
						ing.hide();
						// alert(error);
						fnCommon_SessionExpired();
						// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
					},
					complete: function() {
						ing.hide();
					}
				});
			},

			/* --------------------------------------------------------------------------------------
				����ũ ȣ��
				loanRenewal4_013.fnSend_deepLink
			 -------------------------------------------------------------------------------------- */
			fnSend_deepLink : function( view_name, title ){

				// ���Ͼ����� ������ġ!
				if( fnCommon_isNull(view_name)  ||  fnCommon_isNull(title) ){
					alert("��ũ��� ������ Ȯ���ϼ���.");
					return;
				}

				// �ۿ���
				var isApp_flag = fnCommon_isApp();


				// app  -->  ȭ�� �̵�
				if(!fnCommon_isNull(isApp_flag, "boolean")){

					// ����ũ ó�� ���� ���(������ ó���� �Բ� ����ϱ� ����)
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


				// web  -->  ����ũ ȣ��
				}else{
					// var url = "https://shinhansmartloan.page.link/?link=http://221.147.190.221:8181/loanRenewal4/loanRenewal4_deeplink/";
					var url = "https://shinhansmartloan.page.link/?link=https://m.shinhansavings.com/loanRenewal4/loanRenewal4_deeplink/";

					url += "?1";  // ����Ƽ�꿩�� 1 �� 2 ����Ƽ��
					url += "|N";   // �α����ʿ俩�� Y/N
					url += "|" + view_name;   // ��ȯ���� ȭ��id
					url += "|" + encodeURIComponent(title);

					// ������
					url += "&apn=com.shinhan.smartloan";
					url += "&isi=936581060";
					url += "&ibi=com.shinhan.SmartLoan";
					url += "&ius=ssbmobile";
					url += "&efr=1";  // 0 �������̵� 1 redirect

					var cleckTime = new Date();

					$("#__check_app__").remove();  // ������ �õ��� �߻��ߴ� ���� ����
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
				�¶��� ���������ϱ�
				loanRenewal4_013.fnSendPaperOnline_ASIS
			fnSendPaperOnline_ASIS : function(){

				$("#__check_app__").remove();  // ������ �õ��� �߻��ߴ� ���� ����
				var $iframe = $("<iframe id='__check_app__' />").hide().appendTo("body");

				// web
				if( fnCommon_isNull(isApp, "boolean") ){
					var appName = "";

					// IOS
					if( !fnCommon_isNull(isIOS, "boolean") ){
						appName = "�۽����";

					// Android
					}else{
						appName = "Play�����";
					}

					if(confirm("�¶��� ���� �����ϱ� �޴��� �̿��ϱ� ���ؼ��� ������������ ����� ���� ���� ��ġ�ϼž� �մϴ�. " + appName + "�� �̵��Ͻðڽ��ϱ�?")){
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
									"title": "�¶��� ���� ����"
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
				�� �ٿ�ε�
				loanRenewal4_013.fnAppDownLoad_ASIS
			fnAppDownLoad_ASIS : function(){

				// ���� ��� ��û�����ȸ  url �̵�
				var url = "ssbmobile://link?url=%2Floan_request%2Flogin&title=%EB%8C%80%EC%B6%9C%EC%8B%A0%EC%B2%AD%EA%B2%B0%EA%B3%BC%EC%A1%B0%ED%9A%8C";
			    var intentUrl = "Intent://link?url=%2Floan_request%2Flogin&title=%EB%8C%80%EC%B6%9C%EC%8B%A0%EC%B2%AD%EA%B2%B0%EA%B3%BC%EC%A1%B0%ED%9A%8C#Intent;scheme=ssbmobile;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.shinhan.smartloan;end";

			    // �۽���� �̵�
				var iosDownUrl = "https://itunes.apple.com/kr/app/id936581060?mt=8";

				var cleckTime = new Date();

				$("#__check_app__").remove();  // ������ �õ��� �߻��ߴ� ���� ����
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
		�������� - �¶��μ�������
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_014 = {

		/* --------------------------------------------------------------------------------------
			�⺻����
			loanRenewal4_014.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// ���� ���� �̺�Ʈ
			$("input[type='text'][name='cert_custNm']").on("keyup", loanRenewal4_014.fnKeyup_custNm );

		    // �������� �� �޴� Ŭ�� �̺�Ʈ ����
			$("#tab_button_mobile").on("click", loanRenewal4_014.fnEvent_TabClick );
			$("#tab_button_credit").on("click", loanRenewal4_014.fnEvent_TabClick );


			// native ���� ���ٽ� smartloan_layout.jsp �� �ȵ���´�. �ٴ��� �ʼ����� ������. isApp
			// ȭ���̵��ϴ� �����Լ� ���� �ʿ��ϹǷ� ���� �߰�
			var isApp_obj = $("#isApp");
			if( fnCommon_isNull(isApp_obj)  ||  fnCommon_isNull(isApp_obj.length)  ||  isApp_obj.length < 1 ){
				$("body").append("<input type='hidden' id='isApp' value='true' />");
			}


			// -- nFilter --		// ����Ű�е�
			setNFilterScreenSize($(window).width(), window.innerHeight);
			setNFilterCommon(document.getElementById('resid_no2'), "mode=number");   // �ֹι�ȣ ���ڸ�
			setNFilterCommon(document.getElementById('card_no_4'), "mode=number");  // ī���ȣ
			setNFilterCommon(document.getElementById('valid_trm_yymm'), "mode=number");  // ��ȿ�Ⱓ ����
			setNFilterCommon(document.getElementById('cd_pwd'), "mode=number");   // ��й�ȣ(�� 2�ڸ� �Է�)
			//	setNFilterInputSize("small");
			nFilterScrollto(false);
			setNFilterMobileInit(); //mobile
			// -- nFilter --


			// �ܸ� �޴�����ȣ ����� ����
			var getPhoneNumber_flag = false;

			// �ۿ���
			var isApp_flag = fnCommon_isApp();
			if(isApp_flag){

				// Android
				if( fnCommon_isNull(isIOS, "boolean") ){
					getPhoneNumber_flag = true;
				}
			}

			// �ܸ� �޴�����ȣ �����
			if(getPhoneNumber_flag){

				// �ܸ����� ���� �� ������ �Լ� *plugin ���� �������̶����� �ݹ��� ����ؾ���
				// ���⺻���� ��ȸ
				var fnCallback = loanRenewal4_014.fnSearch_1;

				// �ܸ����� �ޱ� // �޴�����ȣ
				fnCommon_getDeviceData("getPhoneNumber", fnCallback);

			}else{
				// ���⺻���� ��ȸ
				loanRenewal4_014.fnSearch_1();
			}
		},



		/* --------------------------------------------------------------------------------------
			�ſ�ī�� ��������
			loanRenewal4_014.fnCert_card_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_card_confirm : function(){

    		// ���������ϷῩ��
    		isAuthed = false;

    		/* // Ȯ�ι�ư ������ �Ǹ����� �κ����� �̸�üũ�ϵ��� �̵���.
			// �ſ�ī�� ��ȿ��üũ
			var result = loanRenewal4_001.fnCert_card_valid();
			if(!result){
				return false;
			}
			*/

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			// ����� 5������ - ����
			//iajax.addParam("CHK_CSRF", random);
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );   // �Ǹ��ȣ
			iajax.addParam("HND_NO", cert_hndNo );   // �޴�����ȣ

			iajax.addParam("card_no_1", $("#card_no_1").val() );   // �ſ�ī��
			iajax.addParam("card_no_2", $("#card_no_2").val() );
			iajax.addParam("card_no_3", $("#card_no_3").val() );

			// -- nFilter --	   // ����Ű�е�� �Է¹��� ��
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax ������ ���� parameter �߰�
			// ����� 5������ - ����
//			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_CARD,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
			    		isAuthed = true;
			    		AUTH_TYPE = "card";

			    		// ����ȣ��ȸ(�α���)
						loanRenewal4_014.fnSearch_2();

			    		// �������� ���� ó��
						// loanRenewal4_014.fnCert_Success();

			    	}else{
			    		alert("�ſ�ī�� ������ �����Ͽ����ϴ�.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
			    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
			    	}
			    },
				error: function(data, textStatus, error){
					alert("�ſ�ī�� ������ �����Ͽ����ϴ�.\n[" + json.RESULT_NO + "]" + json.RESULT_DESC.split("<br/>").join("\n"));
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�������� Ȯ�� ��ư Ŭ��
			loanRenewal4_014.fnCert_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_confirm : function(){

			// �������� �Ϸ������� �����ܰ� pass // app ���� �ڷΰ���� �ϴ��� web �� ����Ǿ� ������ ���� ����
			if(isAuthed){

				// ��û�����ȸ
				loanRenewal4_014.fnSearch_3();

    			// ȭ���̵�
    			// loanRenewal4_014.fnMovePage_controll();

			}else{

				// ���õ� �� ����
				var tab_button_list = $("a[name='tab_button']");
				if( !fnCommon_isNull(tab_button_list)  &&  !fnCommon_isNull(tab_button_list.length)  &&  tab_button_list.length > 0 ){
					for(var i=0; i < tab_button_list.length; i++){

						// Ȱ��ȭ �� �ǿ� ���ϴ� ���� ���
						var button = tab_button_list[i];
						var parent = $(button).parent();
						if( !fnCommon_isNull(parent)  &&  parent.hasClass("tab_on") ){

							var button_id = button.id;
							if( !fnCommon_isNull(button_id) ){

								var fnCallback = null;
								var valid_result = false;

								// �Ǹ����� ��û ��ȿ�� üũ - (�̸�, �ֹι�ȣ, �޴�����ȣ) �⺻ �������� ���뿵�� üũ�̹Ƿ� �Բ� �������!
								var result = loanRenewal4_014.fnSave_realName_valid();
								if(!result){
									return false;
								}

								// �޴���
								if(button_id == "tab_button_mobile"){

									// �޴������� ��ȿ��üũ // valid : ��ȣ����
									valid_result = loanRenewal4_014.fnCert_phone_valid("valid");

									// �Էµ� �޴��� ������ȣ ����
									fnCallback = loanRenewal4_014.fnCert_phone_confirm;

								// �ſ�ī��
								}else if(button_id == "tab_button_credit"){

									// �ſ�ī�� ��ȿ��üũ
									valid_result = loanRenewal4_014.fnCert_card_valid();
									if(!valid_result){
										return false;
									}

									// �ſ�ī�� ��������
									fnCallback = loanRenewal4_014.fnCert_card_confirm;
								}

								// ��ȿ��üũ ����ߴ��� Ȯ��
								if(!valid_result){
									return false;
								}

								// �Ǹ����� ��û
								loanRenewal4_014.fnSave_realName(fnCallback);
							}
						}
					}
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			�ſ�ī�� ��ȿ��üũ
			loanRenewal4_014.fnCert_card_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_card_valid : function(){

			// �ſ�ī�� ��ȣ
			var card_no_1 = $("#card_no_1").val();
			if( fnCommon_isNull(card_no_1)  ||  card_no_1.length < 4 ){
				alert("�ſ�ī�� ��ȣ�� �Է����ּ���.");
				$("#card_no_1").focus();
				return false;
			}
			var card_no_2 = $("#card_no_2").val();
			if( fnCommon_isNull(card_no_2)  ||  card_no_2.length < 4 ){
				alert("�ſ�ī�� ��ȣ�� �Է����ּ���.");
				$("#card_no_2").focus();
				return false;
			}
			var card_no_3 = $("#card_no_3").val();
			if( fnCommon_isNull(card_no_3)  ||  card_no_3.length < 4 ){
				alert("�ſ�ī�� ��ȣ�� �Է����ּ���.");
				$("#card_no_3").focus();
				return false;
			}
			var card_no_4 = $("#card_no_4").val();
			if( fnCommon_isNull(card_no_4)  ||  card_no_4.length < 3 ){
				alert("�ſ�ī�� ��ȣ�� �Է����ּ���.");
				$("#card_no_4").focus();
				return false;
			}

			// �ſ�ī�� ����
			var valid_trm_yymm = $("#valid_trm_yymm").val();
			if( fnCommon_isNull(valid_trm_yymm)  ||  valid_trm_yymm.length < 4 ){
				alert("�ſ�ī�� ��ȿ�Ⱓ�� �Է����ּ���.");
				$("#valid_trm_yymm").focus();
				return false;
			}

			// �ſ�ī�� ��й�ȣ �� 2�ڸ�
			var cd_pwd = $("#cd_pwd").val();
			if( fnCommon_isNull(cd_pwd)  ||  cd_pwd.length < 2 ){
				alert("��й�ȣ �� 2�ڸ��� �Է����ּ���.");
				$("#cd_pwd").focus();
				return false;
			}

			/*
			// �ʼ��׸� ���ǿ��� üũ
			var agree_credit = $(":checkbox[name='agree_credit']");
			if( !fnCommon_isNull(agree_credit)  &&  !fnCommon_isNull(agree_credit.length)  &&  agree_credit.length > 0 ){
				for(var i=0; i < agree_credit.length; i++){

					var checkbox = agree_credit[i];
					if( !fnCommon_isNull(checkbox) ){

						var checked = checkbox.checked;
						if( fnCommon_isNull(checked, "boolean") ){

							// �ش� üũ�ڽ� �� �ѱ� ����
							alert( checkbox.title + " �׸��� '����'�� �����Ͻ� �� �������ּ���.");
							$("#" + checkbox.id).focus();
							return false;
						}
					}
				}
			}*/

			var allChk_credit = $("#allChk_credit")[0].checked;
			if( !allChk_credit ){
				alert("�ſ�ī�� �������� ��ü���Ƿ� �����Ͻ� �� �������ּ���.");
				return false;
			}

			return true;
		},



		/* --------------------------------------------------------------------------------------
			�������� �� �޴� Ŭ�� �̺�Ʈ
			loanRenewal4_014.fnEvent_TabClick
		 -------------------------------------------------------------------------------------- */
		fnEvent_TabClick : function(e){

    		// ��Ȱ��ȭ������ �� Ŭ����
    		var className = e.target.className;
			if( fnCommon_isNull(className)  ||  className.indexOf("active") < 0 ){

	    		// ���������ϷῩ��
	    		isAuthed = false;
			}

    		var this_button_id = e.target.id;
			if( !fnCommon_isNull(this_button_id) ){

				// �ٸ��� Ŭ��ȿ�� ���ֱ�
				var tab_button_list = $("a[name='tab_button']");
				if( !fnCommon_isNull(tab_button_list)  &&  !fnCommon_isNull(tab_button_list.length)  &&  tab_button_list.length > 0 ){
					for(var i=0; i < tab_button_list.length; i++){

						var button = tab_button_list[i];
						var button_id = button.id;
						if( !fnCommon_isNull(button_id) ){

							var button_obj = $("#" + button_id);
							if( !fnCommon_isNull(button_obj)  &&  button_obj.length > 0 ){
								var parent = button_obj.parent();  // ���ΰ� �ִ� li �±�

								var div_id = button_id.replace("_button", "");  // id ���� ���缭 �ϴ� div ���� id ����

								// �ش� ���� Ȱ��ȭ
								if( button_id == this_button_id ){

									// Ȱ��ȭ ȿ��
									if( !fnCommon_isNull(parent)  &&  !parent.hasClass("tab_on")){
										parent.addClass("tab_on");
									}

									// �ϴܺ� ����
									$("#" + div_id).show();
									$("#" + div_id + "_agree").show();

								// �ٸ� ���� ��Ȱ��
								}else{
									parent.removeClass("tab_on");
									$("#" + div_id).hide();
									$("#" + div_id + "_agree").hide();
								}
							}
						}
					}
				}

				// �޴���
				if(this_button_id == "tab_button_mobile"){

					// �ϴ��� �� �ͼӿ��� �Է¶����� ���
					var cert_hndNo = $("#cert_hndNo").val();  // ��� �Է¶�
					$("#tab_mobile_cert_hndNo").val(cert_hndNo);  // �ϴ� �޴��� ��ȣ �Է� ����

					$("#cert_hndNo_dl").hide();
					$("#tab_mobile_cert_hndNo_dl").show();

				}else{
					$("#cert_hndNo_dl").hide();
					$("#tab_mobile_cert_hndNo_dl").hide();
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			�ſ�ī�� �������� ���� ���� �ڼ�������
			loanRenewal4_014.fnShow_agree_certif02
		 -------------------------------------------------------------------------------------- */
		fnShow_agree_certif02 : function(){
			showDialog(popupURL_clause_auth_card, 420);
		},



		/* --------------------------------------------------------------------------------------
			�������� ���� ó��
			loanRenewal4_014.fnCert_Success
		fnCert_Success : function(){

			iajax.clearParam();
			iajax.addParam("CHK_CSRF", random);
			iajax.addParam("view_name", "loanRenewal4_014");  // ��ó�� ��� �ٸ����ϱ����� ������

			// iajax ������ ���� parameter �߰�
			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_AUTH,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if( !fnCommon_isNull( json )  &&  !fnCommon_isNull( json.RESULT_NO )  &&  json.RESULT_NO == "0000" ){

			    		// ����ȣ��ȸ(�α���)
						loanRenewal4_014.fnSearch_2();

			    	}else{
						// �޼��� �˾�
			    		var msg = "<p>" + json.RESULT_DESC + "</p>";
						fnCommon_popup("open", msg);
			    	}
			    },
				error: function(data, textStatus, error){
					alert("�������� ���� ó���� �����Ͽ����ϴ�.\nȮ�� �� �ٽ� �õ����ּ���.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}

			});
		},
		 -------------------------------------------------------------------------------------- */



		/* --------------------------------------------------------------------------------------
			����ȣ��ȸ(�α���)
			loanRenewal4_014.fnSearch_2
		 -------------------------------------------------------------------------------------- */
		fnSearch_2 : function(){

			iajax.clearParam();
			// ����� 5������ - ����
			//iajax.addParam("CHK_CSRF", random);

			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()));
			iajax.addParam("AUTH_TYPE", AUTH_TYPE);  // �������� ���
			iajax.addParam("IP", IP);
			iajax.addParam("SEND_MSG", "Y");   // ������ſ���


			// -- nFilter --	   // ����Ű�е�� �Է¹��� ����
			// var encData = nFilterEncrypted();
			// iajax.addParam("enc", encData);
			// -- nFilter --


			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3100,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000") {

				    	// app �� �ö�Դٰ� �ڷΰ��� ���۽� �ϴ��� web ���̾ ����Ǿ� �ٽ� ������ �ϴ� ���� ����
				    	$("#auth_finish").show();  // �������� �Ϸ� ���� ����
				    	$("#slid_3_div").hide();  // �������� ���� �����

			    		// ��û�����ȸ
			    		loanRenewal4_014.fnSearch_3( json['CUST_NO'] );

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					alert("����ȣ ��ȸ�� �����Ͽ����ϴ�.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			��û�����ȸ
			loanRenewal4_014.fnSearch_3
		 -------------------------------------------------------------------------------------- */
		fnSearch_3 : function( CUST_NO ){

			iajax.clearParam();
			// ����� 5������ - ����
			// iajax.addParam("CHK_CSRF", random);
			iajax.addParam("IP", IP);
			iajax.addParam("SEND_MSG", "Y");  // ������ſ���
			// iajax.addParam("loanRenewal4_014_START_YN", "Y");   // �¶��μ������� �޴��� ���ٿ���

			/*
			iajax.addParam("CUST_NM", $("#cert_custNm").val());
			iajax.addParam("CUST_NO", CUST_NO);
			iajax.addParam("AUTH_TYPE", AUTH_TYPE);  // �����������
			*/

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_04,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000") {
			    		if(json.CHECK_BANK_INSP_NO == ""){
			    			alert("�����û ������ �����ϴ�.\n���ǻ��� 1800-3651");
			    			fnCommon_goHome();

			    		}else{

							// 20181210 ������� ���˻��� output �߰� ��� �ݿ�
			    			SCRP_NHIS_ERROR_YN = json.SCRP_NHIS_ERROR_YN;   // �Ǻ���ũ������ֿ���
			    			SCRP_NHIS_ERROR_MSG = json.SCRP_NHIS_ERROR_MSG;   // �Ǻ���ũ������ָ޼���
			    			SCRP_MINWON24_ERROR_YN = json.SCRP_MINWON24_ERROR_YN;   // �ο�24��ũ������ָ޼���
			    			SCRP_MINWON24_ERROR_MSG = json.SCRP_MINWON24_ERROR_MSG;   // �ο�24��ũ������ָ޼���
			    			CERT_HNDNO = json.CERT_HNDNO;   // �����޴�����ȣ

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

			    			// ȭ���̵�
			    			loanRenewal4_014.fnMovePage_controll();
			    		}
			    	}else{
			    		var errorMsg = json.RESULT_DESC;
			    		alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					alert("����ȣ ��ȸ�� �����Ͽ����ϴ�.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			ȭ���̵�
			loanRenewal4_014.fnMovePage_controll
		 -------------------------------------------------------------------------------------- */
		fnMovePage_controll : function(){
			if(isNoface == "Y"){
				// �ź��� ���� ȭ�� ȣ��
				loanRenewal4_014.fnMovePage_1();

			}else if(isNhisNps == "Y" || isNhisMinWon24 == "Y"  ||  isMinWon24 == "Y"){

				// ������̸� �ߴ�
				// �Ǻ���ũ������ֿ��� & �ο�24��ũ������ֿ���
				if( !fnCommon_isNull(SCRP_NHIS_ERROR_YN)  &&  SCRP_NHIS_ERROR_YN == "Y"
					&&  !fnCommon_isNull(SCRP_MINWON24_ERROR_YN)  &&  SCRP_MINWON24_ERROR_YN == "Y" ){

					var msg = "";
					msg += "<p>" + SCRP_NHIS_ERROR_MSG + "</p>";
					msg += "<p>" + SCRP_MINWON24_ERROR_MSG + "</p>";

					// �޼��� �˾�
					fnCommon_popup("open", msg);
					return false;

				// �Ǻ���ũ������ֿ���
				}else if( !fnCommon_isNull(SCRP_NHIS_ERROR_YN)  &&  SCRP_NHIS_ERROR_YN == "Y" ){
					var msg = "";
					msg += "<p>" + SCRP_NHIS_ERROR_MSG + "</p>";

					// �޼��� �˾�
					fnCommon_popup("open", msg);
					return false;

				// �ο�24��ũ������ֿ���
				}else if( !fnCommon_isNull(SCRP_MINWON24_ERROR_YN)  &&  SCRP_MINWON24_ERROR_YN == "Y" ){
					var msg = "";
					msg += "<p>" + SCRP_MINWON24_ERROR_MSG + "</p>";

					// �޼��� �˾�
					fnCommon_popup("open", msg);
					return false;

				}else{

					// �ǰ����� & �ο�24 ��ũ����
					var params = {
							pluginId: "webPostBridge",
							method: "onExecute",
							params: {
								"url": "/loan_document/scrapping",
								"data": {
									"title": "�¶��� ���� ����",
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
					// �ǰ� or �ǰ��ο�24 ������ ���̰� �ǰ����轺ũ���� ���� ��������
					if( (isNhisNps == "Y" || isNhisMinWon24 == "Y")  &&  (fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  ||  SCRP_NHIS_SUCCESS_YN != "Y")    ){

						// �¶��μ�������(��ũ����) - �ѵ���ȸ ȭ�� ȣ��
						var data_list = [
					             { "key" : "view_name", "value" : "loanRenewal4_002" }
					           , { "key" : "title", "value" : "���������Է�" }
							];

						// renewal4 ���� url ȣ��
						fnCommon_callUrl( data_list );

					// �ο�24 ������ ���̰� �ο�24��ũ���� ���� ��������
					}else if( (isMinWon24 == "Y" || isNhisMinWon24 == "Y")  &&  (fnCommon_isNull(SCRP_MINWON24_SUCCESS_YN)  ||  SCRP_MINWON24_SUCCESS_YN != "Y")    ){

						// �¶��μ�������(��ũ����) - ����� ȭ�� ȣ��
						var data_list = [
					             { "key" : "view_name", "value" : "loanRenewal4_007" }
					           , { "key" : "title", "value" : "���������Է�" }
							];

						// renewal4 ���� url ȣ��
						fnCommon_callUrl( data_list );
					}
					*/
				}

			}else if(isEtcDocument == "Y"){
				// ��Ÿ ���� �����ϱ� ȭ�� ȣ��
				loanRenewal4_014.fnMovePage_3();

			}else{
				alert("�¶��� ���� ���� ����� �ƴմϴ�.\n���ǻ��� 1800-3651");
    			fnCommon_goHome();
			}
		},



		/* --------------------------------------------------------------------------------------
			��Ÿ ���� �����ϱ� ȭ�� ȣ��
			loanRenewal4_014.fnMovePage_3
		 -------------------------------------------------------------------------------------- */
		fnMovePage_3 : function(){
			var params = {
					pluginId: "slEtcDocument",
					method: "onExcute",
					params: {
						"data": {
							"title": "�¶��� ���� ����",
						    "isNoface": isNoface,
						    "isNhisNps": isNhisNps,
						    "isMinWon24": isMinWon24,
						    "isNhisMinWon24": isNhisMinWon24,
						    "isEtcDocument": isEtcDocument
						}
				    },
					callBack: function(isOK, json) {
						if(json.result == "true") {

							// �Ϸ� ȭ�� �̵�
							loanRenewal4_014.fnMovePage_2();

						}else{
							alert("�¶��� ���� ������ �����Ͽ����ϴ�.");
							fnCommon_goHome();
						}
					}
				};
			SDSFrameWork.plugin.execute(params);
		},



		/* --------------------------------------------------------------------------------------
			�ź��� ���� ȭ�� ȣ��
			loanRenewal4_014.fnMovePage_1
		 -------------------------------------------------------------------------------------- */
		fnMovePage_1 : function(){
			var params = {
					pluginId: "slNoFace",
					method: "onStart",
					params: {
						"data": {
							"title": "�¶��� ���� ����"
						}
					},
					callBack: function(isOK, json) {
						if(json.result == "true") {
							if(isNhisNps == "N" && isMinWon24 == "N" && isNhisMinWon24 == "N" && isEtcDocument == "N") {
								alert("�¶��� ���� ������ �Ϸ�Ǿ����ϴ�.");

								// �Ϸ� ȭ�� �̵�
								loanRenewal4_014.fnMovePage_2();

							}else{
								// ��û�����ȸ // ����ȸ�Ͽ� ���ŵ� ������ ����ϱ� ����
								loanRenewal4_014.fnSearch_3();
							}

							/* else if(isNhisNps == "Y" || isMinWon24 == "Y" || isNhisMinWon24 == "Y") {
								alert("�¶��� ���� ������ �Ϸ�Ǿ����ϴ�.\n������� ���� ���� ���� ȭ������\n�̵��մϴ�.");

								// ������̸� �ߴ�
								// �Ǻ���ũ������ֿ��� & �ο�24��ũ������ֿ���
								if( !fnCommon_isNull(SCRP_NHIS_ERROR_YN)  &&  SCRP_NHIS_ERROR_YN == "Y"
									&&  !fnCommon_isNull(SCRP_MINWON24_ERROR_YN)  &&  SCRP_MINWON24_ERROR_YN == "Y" ){

									var msg = "";
									msg += "<p>" + SCRP_NHIS_ERROR_MSG + "</p>";
									msg += "<p>" + SCRP_MINWON24_ERROR_MSG + "</p>";

									// �޼��� �˾�
									fnCommon_popup("open", msg);
									return false;

								// �Ǻ���ũ������ֿ���
								}else if( !fnCommon_isNull(SCRP_NHIS_ERROR_YN)  &&  SCRP_NHIS_ERROR_YN == "Y" ){
									var msg = "";
									msg += "<p>" + SCRP_NHIS_ERROR_MSG + "</p>";

									// �޼��� �˾�
									fnCommon_popup("open", msg);
									return false;

								// �ο�24��ũ������ֿ���
								}else if( !fnCommon_isNull(SCRP_MINWON24_ERROR_YN)  &&  SCRP_MINWON24_ERROR_YN == "Y" ){
									var msg = "";
									msg += "<p>" + SCRP_MINWON24_ERROR_MSG + "</p>";

									// �޼��� �˾�
									fnCommon_popup("open", msg);
									return false;

								}else{

									// default �����û�ѵ���ȸ ȭ�� ȣ��
									var data_list = [
							             { "key" : "view_name", "value" : "loanRenewal4_004" }
								           , { "key" : "title", "value" : "�ѵ���ȸ���" }
								           , { "key" : "beforeview", "value" : "loanRenewal4_014" }  // �ѵ���ȸ ȭ�鿡�� ���� �߻��� �ǵ��ư� ȭ��id
										];

									// �ǰ� or �ǰ��ο�24 ������ ���̰� �ǰ����轺ũ���� ���� ��������
									if( (isNhisNps == "Y" || isNhisMinWon24 == "Y")  &&  (fnCommon_isNull(SCRP_NHIS_SUCCESS_YN)  ||  SCRP_NHIS_SUCCESS_YN != "Y")    ){

										// �¶��μ�������(��ũ����) - �ѵ���ȸ ȭ�� ȣ��
										data_list = [
									             { "key" : "view_name", "value" : "loanRenewal4_002" }
									           , { "key" : "title", "value" : "���������Է�" }
											];

									// �ο�24 ������ ���̰� �ο�24��ũ���� ���� ��������
									}else if( isMinWon24 == "Y"  &&  (fnCommon_isNull(SCRP_MINWON24_SUCCESS_YN)  ||  SCRP_MINWON24_SUCCESS_YN != "Y")    ){

										// �¶��μ�������(��ũ����) - ����� ȭ�� ȣ��
										data_list = [
									             { "key" : "view_name", "value" : "loanRenewal4_007" }
									           , { "key" : "title", "value" : "���������Է�" }
											];
									}

									// renewal4 ���� url ȣ��
									fnCommon_callUrl( data_list );
								}
							}
							*/

						} else {
							alert("�¶��� ���� ������ �����Ͽ����ϴ�.");
							fnCommon_goHome();
						}
					}
				};
			SDSFrameWork.plugin.execute(params);
		},



		/* --------------------------------------------------------------------------------------
			�Ϸ� ȭ�� �̵�
			loanRenewal4_014.fnMovePage_2
		 -------------------------------------------------------------------------------------- */
		fnMovePage_2 : function(){
			var params = {
					pluginId: "webPostBridge",
					method: "onExecute",
					params: {
						"url": "/loan_document/complete",
						"data": {
							"title": "�¶��� ���� ����",
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
			�޴������� ��ȿ��üũ
			loanRenewal4_014.fnCert_phone_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_valid : function( type ){
			var result = true;

			// ��Ż�
			var telecom = $("#telecom option:selected").val();
			if( fnCommon_isNull(telecom) ){
				alert("��Ż縦 �������ּ���.");
				$("#telecom").focus();
				return false;
			}

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( fnCommon_isNull(cert_hndNo) ){
				alert("�޴�����ȣ�� �Է����ּ���.");
				$("#cert_hndNo").focus();
				return false;
			}

			var cert_hndNo_pattern = /^\d{10,11}$/;
			if(!cert_hndNo_pattern.test(cert_hndNo)){
				alert("�޴�����ȣ�� ��Ȯ�ϰ�\n�Է����ּ���.");
				$("#cert_hndNo").focus();
				return false;
			}

			/*
			// �ʼ��׸� ���ǿ��� üũ
			var agree_mobile = $(":checkbox[name='agree_mobile']");
			if( !fnCommon_isNull(agree_mobile)  &&  !fnCommon_isNull(agree_mobile.length)  &&  agree_mobile.length > 0 ){
				for(var i=0; i < agree_mobile.length; i++){

					var checkbox = agree_mobile[i];
					if( !fnCommon_isNull(checkbox) ){

						var checked = checkbox.checked;
						if( fnCommon_isNull(checked, "boolean") ){

							// �ش� üũ�ڽ� �� �ѱ� ����
							alert( checkbox.title + " �׸��� '����'�� �����Ͻ� �� �������ּ���.");
							$("#" + checkbox.id).focus();
							return false;
						}
					}
				}
			}
			*/
			var allChk_mobile = $("#allChk_mobile")[0].checked;
			if( !allChk_mobile ){
				alert("�޴��� �������� ��ü���Ƿ� �����Ͻ� �� �������ּ���.");
				return false;
			}


			if( !fnCommon_isNull(type) ){

				// �Էµ� ������ȣ ����
				if(type == "valid"){
					var aut_auth_no = $("#aut_auth_no").val();
					if( fnCommon_isNull(aut_auth_no) ){
						alert("������ �Ϸ���� �ʾҽ��ϴ�.\n������û �� ������ȣ�� �Է����ּ���.");
						return false;
					}
				}
			}

			return result;
		},



		/* --------------------------------------------------------------------------------------
			�޴��� �������� - �Էµ� �޴��� ������ȣ ����
			loanRenewal4_014.fnCert_phone_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_confirm : function(){

    		// ���������ϷῩ��
    		isAuthed = false;

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			// ����� ���� 5�� - ����
			// iajax.addParam("CHK_CSRF", random);
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );   // ����
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );   // �Ǹ��ȣ
			iajax.addParam("resid_no2", $("#resid_no2").val() );
			iajax.addParam("HND_NO", cert_hndNo );   // �޴�����ȣ
			iajax.addParam("com_kind", $("#telecom").val() );   // ��Ż�
			iajax.addParam("aut_auth_no", $("#aut_auth_no").val());	  // �Էµ� ������ȣ

			// -- nFilter --	   // ����Ű�е�� �Է¹��� ��
			// ����� ���� 5�� - ����
			//var encData = nFilterEncrypted();
			//iajax.addParam("enc", encData);
			// -- nFilter --

			// iajax ������ ���� parameter �߰�
			// ����� 5������ - ����
//			fnCommon_partnerData();

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){

			    		// Ÿ�̸� ����
			    		loanRenewal4_014.fn_stopTimer();

			    		// ���������ϷῩ��
			    		isAuthed = true;
			    		AUTH_TYPE = "hp";

			    		// ����ȣ��ȸ(�α���)
						loanRenewal4_014.fnSearch_2();

			    		// �������� ���� ó��
			    		// loanRenewal4_014.fnCert_Success();

			    	}else{
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					fnCommon_SessionExpired();
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�޴��� ������û Ÿ�̸� ����
			loanRenewal4_014.fn_startTimer
		 -------------------------------------------------------------------------------------- */
		fn_startTimer : function(){
			seconds = 180;
			countDownTimer = setInterval("loanRenewal4_014.fn_secoundPassed()", 1000);
		},

		/* --------------------------------------------------------------------------------------
			�޴��� ������û Ÿ�̸� ����
			loanRenewal4_014.fn_stopTimer
		 -------------------------------------------------------------------------------------- */
		fn_stopTimer : function(){
			clearInterval(countDownTimer);
		},

		/* --------------------------------------------------------------------------------------
			�޴��� ������û Ÿ�̸�
			loanRenewal4_014.fn_secoundPassed
		 -------------------------------------------------------------------------------------- */
		fn_secoundPassed : function(){
			var minutes = Math.round((seconds - 30) / 60);
			var remainingSeconds = seconds % 60;

			if(remainingSeconds < 10) {
				remainingSeconds = "0" + remainingSeconds;
			}

			// $("#verify_time").html("���� �޴������� ������ȣ�� ���۵Ǿ����ϴ�.<br>SMS �����ð� [ " + minutes + " : " + remainingSeconds + " ]");
			$("#cert_phone_timer").html("[" + minutes + " : " + remainingSeconds + "]");

			if( fnCommon_isNull(seconds) ){
				alert("�޴��� ������ �����Ͽ����ϴ�.\n�����ð��� �ʰ��� ���\n������ȣ ���û �� �Է����ּ���.");
				loanRenewal4_014.fn_stopTimer();
			}else{
				seconds--;
			}
		},



		/* --------------------------------------------------------------------------------------
			�޴��� �������� ���� ���� �ڼ�������
			loanRenewal4_014.fnShow_agree_certif01
		 -------------------------------------------------------------------------------------- */
		fnShow_agree_certif01 : function(){

			popupURL = popupURL_clause_auth_hp_skt;
			showDialog(popupURL, 420);

			/*
			// ��Ż�
			var telecom = $("#telecom option:selected").val();
			if( fnCommon_isNull(telecom) ){
				alert("��Ż縦 �������ּ���.");
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
			�Ǹ����� ��û ��ȿ�� üũ
			loanRenewal4_014.fnSave_realName_valid
		 -------------------------------------------------------------------------------------- */
		fnSave_realName_valid : function(){
			var result = true;

			// �̸�
			var cert_custNm = fnCommon_deleteNull($("#cert_custNm").val());
			if( fnCommon_isNull(cert_custNm) ){
				alert("�̸��� �Է����ּ���.");
				$("#cert_custNm").focus();
				return false;
			}

			// �ֹε�Ϲ�ȣ
			var cert_residNo_1 = $("#cert_residNo_1").val();
			if( fnCommon_isNull(cert_residNo_1)  ||  cert_residNo_1.length < 6 ){
				alert("�ֹε�Ϲ�ȣ ���ڸ� 6�ڸ��� �Է����ּ���.");
				$("#cert_residNo_1").focus();
				return false;
			}
			var resid_no2 = $("#resid_no2").val();
			if( fnCommon_isNull(resid_no2)  ||  resid_no2.length < 7 ){
				alert("�ֹε�Ϲ�ȣ ���ڸ� 7�ڸ��� �Է����ּ���.");
				$("#resid_no2").focus();
				return false;
			}

			return result;
		},



		/* --------------------------------------------------------------------------------------
			�Ǹ����� ��û
			loanRenewal4_014.fnSave_realName
		 -------------------------------------------------------------------------------------- */
		fnSave_realName : function(fnCallback){

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()));
			iajax.addParam("RESID_NO1", $("#cert_residNo_1").val());
			// ����� ���� 5�� - ����
			// iajax.addParam("CHK_CSRF", random);
			iajax.addParam("N01", "0");   // ��ȭ	// ȭ�鿡�� ������ �׸�
			iajax.addParam("N02", "0");   // DM		// ȭ�鿡�� ������ �׸�

			// �������� ���� �����ϱ� ���� �޴�����ȣ ����
			iajax.addParam("HND_NO", cert_hndNo );   // �޴�����ȣ


			// -- nFilter --	   // ����Ű�е�� �Է¹��� �ֹε�Ϲ�ȣ ���ڸ�
			var encData = nFilterEncrypted();
			iajax.addParam("RESID_NO2", encData);
			// -- nFilter --


			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_NAME,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
						if( !fnCommon_isNull(fnCallback) ){
							fnCallback();
						}

			    	}else{
				    	var authErrMsg  = "�Ǹ������� �����Ͽ����ϴ�.\n";
				        authErrMsg += "Ȯ�� �� �ٽ� �õ����ּ���.\n";
				        authErrMsg += "���� ������ �Ǹ��� ����� ���\n";
				        authErrMsg += "NICE (02-2122-4000)\n";
				        authErrMsg += "���� ���� �� �̿밡���մϴ�.\n\n";
				        authErrMsg += "�ſ���ȸ ���ܼ��� �̿��\n";
				        authErrMsg += "�������� �� ����ٶ��ϴ�.\n";
				        authErrMsg += "NICE: 02-2122-4000\n";
				        authErrMsg += "KCB: 02-708-1000";

						alert(authErrMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					alert("�Ǹ������� �����Ͽ����ϴ�.\nȮ�� �� �ٽ� �õ����ּ���.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�޴��� ������ȣ ��û
			loanRenewal4_014.fnCert_phone_request
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_request : function(){

    		// ���������ϷῩ��
    		isAuthed = false;

			// �ʱ�ȭ
			$("#cert_phone_timer_dl").hide();		// ������ȣ �Է� ����
			$("#aut_auth_no").hide();	 // ������ȣ
			$("#aut_auth_no").val("");

			// �Ǹ����� ��û ��ȿ�� üũ
			var result = loanRenewal4_014.fnSave_realName_valid();
			if(!result){
				return false;
			}

			// �޴������� ��ȿ��üũ
			var result = loanRenewal4_014.fnCert_phone_valid();
			if(!result){
				return false;
			}

			iajax.clearParam();

			// ��Ż�
			var telecom = $("#telecom").val();
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );
			iajax.addParam("RESID_NO_1", $("#cert_residNo_1").val() );
			iajax.addParam("COM_KIND", telecom );
			// ����� ���� 5�� - ����
			// iajax.addParam("CHK_CSRF", random);

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( !fnCommon_isNull(cert_hndNo)  &&  !fnCommon_isNull(cert_hndNo.length)  &&  cert_hndNo.length >= 10 ){
				iajax.addParam("HND_NO", cert_hndNo);
			}

			// -- nFilter --	   // ����Ű�е�� �Է¹��� ��
			var encData = nFilterEncrypted();
			iajax.addParam("enc", encData);
			// -- nFilter --


			//�ۿ���
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
			    url: callURL_loanRenewal4_001_SMS,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000"){

			    		// �����ð� timer ����
						$("#cert_phone_timer_dl").show();
						$("#aut_auth_no").show();

			    		// ������û ��ư
			    		$("#certif01_btn_1").html("���û");
			    		$("#certif01_btn_1").removeClass("on");

			    		// Ÿ�̸� ����
			    		loanRenewal4_014.fn_stopTimer();
			    		loanRenewal4_014.fn_startTimer();

			    	}else{
			    		alert("������ȣ �߼ۿ� �����Ͽ����ϴ�. �ٽ� �õ����ּ���.");
			    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
			    	}
			    },
				error: function(data, textStatus, error) {
					alert("�Ǹ������� �����Ͽ����ϴ�.\nȮ�� �� �ٽ� �õ����ּ���.");
		    		console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�ֹε�Ϲ�ȣ �ٰ� �� ������� �ȳ� �˾�
			loanRenewal4_014.fnPopup_1
		 -------------------------------------------------------------------------------------- */
		fnPopup_1 : function( type ){

			var msg = "";
			msg += "<p>�������������� �ſ������� �̿� �� ��ȣ�� ���� ���� ����� �� 37���� 2�� �ǰ��Ͽ� �ֹε�Ϲ�ȣ�� �����մϴ�.</p>";
			msg += "<p>Ÿ���� �ֹε�Ϲ�ȣ�� �����ϰų�, ��������ϴ� �ڴ� 3�� ������ ¡�� �Ǵ� 3õ���� ������ ������ �ΰ��� �� �ֽ��ϴ�.</p>";

			// �޼��� �˾�
			fnCommon_popup("open", msg);
		},



		/* --------------------------------------------------------------------------------------
			�޴�����ȣ ���� �̺�Ʈ
			loanRenewal4_014.fnKeyup_hndNo
		 -------------------------------------------------------------------------------------- */
		fnKeyup_hndNo : function(e){

			// ���������ϷῩ��
			isAuthed = false;

			var value = e.target.value;

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			value = fnCommon_getOnlyNumber(value);

			// �ʵ忡 �缳���� ��
			var value_format = value;

			if( !fnCommon_isNull(value)  &&  value.length > 0 ){
				if(value.length > 3){

					// ���ڸ� �߶󳻱�
					value_format = value.substring(0, 3);
					value = value.substring(3, value.length);

					// ������ ���ڸ� �̻��̸�
					if(value.length > 3){

						// �߰��ڸ� �߶󳻱�
						value_format += "-" + value.substring(0, 3);
						value = value.substring(3, value.length);

						// ������ ���ڸ� �̻��̸� �߰��ڸ��� ���ڸ� �� �ѱ��
						if(value.length > 4){
							value_format += value.substring(0, 1);
							value = value.substring(1, value.length);
						}
					}

					// ���� ���ڸ��� ������ �̰͵� ���̱�
					if( !fnCommon_isNull(value) ){
						value_format += "-" + value;
					}
				}
			}

			// ��� �޴�����ȣ �ʵ忡 ����
			$("input[type='tel'][name='cert_hndNo']").val(value_format);
		},



		/* --------------------------------------------------------------------------------------
			�ֹε�Ϲ�ȣ ���ڸ� ���� �̺�Ʈ
			loanRenewal4_014.fnKeyup_residNo_1
		 -------------------------------------------------------------------------------------- */
		fnKeyup_residNo_1 : function(e){

    		// ���������ϷῩ��
    		isAuthed = false;

			// ���ڿ� ���� �� ���ڸ� ��ȯ
    		var value = e.target.value;
    		e.target.value = fnCommon_getOnlyNumber(value);
		},



		/* --------------------------------------------------------------------------------------
			���� ���� �̺�Ʈ
			loanRenewal4_014.fnKeyup_custNm
		 -------------------------------------------------------------------------------------- */
		fnKeyup_custNm : function( type ){

			// ���������ϷῩ��
			isAuthed = false;

			if( !fnCommon_isNull(type) ){

				// ���� X Ŭ��
				if(type == "delete"){
					$("#cert_custNm").val("");
					$("#cert_custNm").focus();  // Ű�е尡 ������� �����ϱ�
				}
			}

			// �̸� ������ ������ư ���̰�
			var cert_custNm = $("#cert_custNm").val();
			if( !fnCommon_isNull(cert_custNm) ){
				$("#cert_custNm_delete_p").show();
			}else{
				$("#cert_custNm_delete_p").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			���⺻���� ��ȸ
			loanRenewal4_014.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function( device_result ){

			// �ܸ����� ������ �޴�����ȣ �־����� ���� ����
			if( !fnCommon_isNull(device_result)  &&  !fnCommon_isNull(device_result.phoneNumber) ){
				device_phoneNumber = device_result.phoneNumber;
				device_phoneNumber = fnCommon_getOnlyNumber(device_phoneNumber);  // ���ڿ� ���� �� ���ڸ� ��ȯ

				if( !fnCommon_isNull(device_phoneNumber)  &&  !fnCommon_isNull(device_phoneNumber.length) ){

					// 82�� �����ϴ� ���
					if(device_phoneNumber.indexOf("82") == 0  &&  device_phoneNumber.length > 2){

						// ��2�ڸ� 82 ����  ex) 8201012345678  �̷��� ��
						device_phoneNumber = device_phoneNumber.substring(2, device_phoneNumber.length);
						device_phoneNumber = "0" + device_phoneNumber;
					}

					// �޴�����ȣ ���� �̺�Ʈ�� ����ؼ� �� ����
					loanRenewal4_014.fnKeyup_hndNo({target:{value:device_phoneNumber}});
				}
			}

			// ���⺻���� ��ȸ
			iajax.clearParam();
			// ����� 5������ - ����
			// iajax.addParam("CHK_CSRF", random);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_03,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

						// ����
						var custNm = json.custNm;
						if( !fnCommon_isNull(custNm) ){
							$("input[type='text'][name='cert_custNm']").val( custNm );
						}

						// �������
						var residNo = json.residNo;
						if( !fnCommon_isNull(residNo) ){
							$("input[type='tel'][name='cert_residNo_1']").val( residNo );
						}

						// �޴�����ȣ
						var hndNo = json.hndNo;
						if( !fnCommon_isNull(hndNo) ){

							// ���ڿ� ���� �� ���ڸ� ��ȯ
							hndNo = fnCommon_getOnlyNumber(hndNo);

							// �޴�����ȣ ���� �̺�Ʈ�� ����ؼ� �� ����
							loanRenewal4_014.fnKeyup_hndNo({target:{value:hndNo}});
						}

						// ����ũ���� �ƴϸ� üũ
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

						SCRP_NHIS_SUCCESS_YN = json.SCRP_NHIS_SUCCESS_YN;   // �ǰ����� ��ũ���� ��������
						SCRP_MINWON24_SUCCESS_YN = json.SCRP_MINWON24_SUCCESS_YN;   // �ο�24 ��ũ���� ��������

						loanRenewal4_014_START_YN = json.loanRenewal4_014_START_YN;   // �¶��μ������� �޴��� ���ٿ���


						if( !fnCommon_isNull(onloanAction)  &&  onloanAction == "nohaveloan" ){
							alert("�����û ������ �����ϴ�.\n���ǻ��� 1800-3651");
							fnCommon_goHome();
							return;

						}else{

							// �������� ���ʿ� ���̽��̸� ������������ �ٷ� �̵�
							if( !fnCommon_isNull(auth_need_yn)  &&  auth_need_yn == "N" ){
								isAuthed = true;

						    	// app �� �ö�Դٰ� �ڷΰ��� ���۽� �ϴ��� web ���̾ ����Ǿ� �ٽ� ������ �ϴ� ���� ����
						    	$("#auth_finish").show();  // �������� �Ϸ� ���� ����
						    	$("#slid_3_div").hide();  // �������� ���� �����

								// ��û�����ȸ
								loanRenewal4_014.fnSearch_3();

								// ȭ���̵� // ���� or �¶��μ������� or ��Ÿ�������� �̵�
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
					// alert(error);
					fnCommon_SessionExpired();
					// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},

		/* --------------------------------------------------------------------------------------
			�޴��� ���� ����
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
			�ſ�ī�� ���� ����
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
		�������� - �ѵ������ȸ
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_015 = {

		/* --------------------------------------------------------------------------------------
			�⺻����
			loanRenewal4_015.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// ���� ���� �̺�Ʈ
			$("input[type='text'][name='cert_custNm']").on("keyup", loanRenewal4_015.fnKeyup_custNm );

		    // �������� �� �޴� Ŭ�� �̺�Ʈ ����
			$("#tab_button_mobile").on("click", loanRenewal4_015.fnEvent_TabClick );
			$("#tab_button_credit").on("click", loanRenewal4_015.fnEvent_TabClick );
			$("#tab_button_official").on("click", loanRenewal4_015.fnEvent_TabClick );
			loanRenewal4_015.fnEvent_TabClick( {target:{id:"tab_button_mobile",className:""}} );
			loanRenewal4_015.fnSearch_1();
			$('body,html').animate({scrollTop: 0}, 100);

		},

		/* --------------------------------------------------------------------------------------
			�ſ�ī�� ��������
			loanRenewal4_015.fnCert_xecure_success
		 -------------------------------------------------------------------------------------- */
		fnCert_xecure_success : function(){

			// ���������ϷῩ��
			isAuthed = true;
    		AUTH_TYPE = "xecure";

    		// ����ȣ��ȸ(�α���)
			loanRenewal4_015.fnSearch_2();

		},

		/* --------------------------------------------------------------------------------------
			�ſ�ī�� ��������
			loanRenewal4_015.fnCert_card_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_card_confirm : function(){

    		// ���������ϷῩ��
    		isAuthed = false;

    		$("#cert_hndNo").val($("#cert_hndNo_credit").val());

    		// �޴�����ȣ
    		var cert_hndNo = $("#cert_hndNo_credit").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();

			iajax.addParam("KIND_CHK", "22" ); //����� 21:ARS����, 22:�ſ�ī������ Ȯ��
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#credit_custNm").val()) );

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo_credit").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			var hndNoSplit = cert_hndNo.split('-');
			iajax.addParam("HND_NO1", hndNoSplit[0]);
			iajax.addParam("HND_NO2", hndNoSplit[1]);
			iajax.addParam("HND_NO3", hndNoSplit[2]);
			iajax.addParam("IP", IP);							//IP�� ���
			iajax.addParam("AUT_AUTH_NO", "01");				//01 ���ͳ�
			iajax.addParam("CD_PWD", $("#credit_code").val());	//ī����ڵ�� ���

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_CARD,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					ing.hide();
			    	if(json.RESULT_NO == "0000"){
			    		isAuthed = true;
			    		AUTH_TYPE = "card";

			    		// ����ȣ��ȸ(�α���)
						loanRenewal4_015.fnSearch_2();

			    	}else{
			    		alert("�ſ�ī�� ������ �����Ͽ����ϴ�.\n" + json.RESULT_DESC.split("<br/>").join("\n"));
			    	}
			    },
				beforeSend: function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
					alert("�ſ�ī�� ���� �����Ͽ����ϴ�.\n");
				},
				complete: function(){
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�������� Ȯ�� ��ư Ŭ��
			loanRenewal4_015.fnCert_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_confirm : function(){

			// �������� �Ϸ������� �����ܰ� pass // app ���� �ڷΰ���� �ϴ��� web �� ����Ǿ� ������ ���� ����
			if(isAuthed){
			}else{

				// ���õ� �� ����
				var tab_button_list = $("a[name='tab_button']");
				if( !fnCommon_isNull(tab_button_list)  &&  !fnCommon_isNull(tab_button_list.length)  &&  tab_button_list.length > 0 ){
					for(var i=0; i < tab_button_list.length; i++){

						// Ȱ��ȭ �� �ǿ� ���ϴ� ���� ���
						var button = tab_button_list[i];
						var parent = $(button).parent();
						if( !fnCommon_isNull(parent)  &&  parent.hasClass("tab_on") ){

							var button_id = button.id;
							if( !fnCommon_isNull(button_id) ){

								var fnCallback = null;
								var valid_result = false;

								// �޴���
								if(button_id == "tab_button_mobile"){

									// �޴������� ��ȿ��üũ // valid : ������ȣ����
									valid_result = fnCommon_Cert_phone_valid("valid");
									if(!valid_result){
										return false;
									}

									// �Էµ� �޴��� ������ȣ ����
									fnCallback = loanRenewal4_015.fnCert_phone_confirm;

								// �ſ�ī��
								}else if(button_id == "tab_button_credit"){

									// Ars��û�� ���������� �ߴ��� üũ
									if(!isArsCalled){
										alert("[ARS��û]��ư�� ���� ��ȭ���� ��, ī���й�ȣ �� 2�ڸ��� �Է��� �� ��õ����ּ���.");
										return false;
									}

									// �ſ�ī�� ��ȿ��üũ
									valid_result = loanRenewal4_015.fnCert_card_valid();
									if(!valid_result){
										return false;
									}

									// �ſ�ī�� ��������
									fnCallback = loanRenewal4_015.fnCert_card_confirm;

								// ������
								}else if(button_id == "tab_button_official"){


									// ������ ��ȿ��üũ - (�̸�, �ֹι�ȣ, �޴�����ȣ) �⺻ �������� ���뿵�� üũ�̹Ƿ� �Բ� �������!
									valid_result = loanRenewal4_001.fnCert_valid_xecure();
									if(!valid_result){
										return false;
									}


									// ������ �������� ȣ��(app)
									fnCallback = loanRenewal4_001.fnCert_xecure_confirm;


									// �޴���
								}

								// ��ȿ��üũ ����ߴ��� Ȯ��
								if(!valid_result){
									return false;
								}

								// �Ǹ����� ��û
								loanRenewal4_015.fnSave_realName(fnCallback);
							}
						}
					}
				}
			}
		},



		/* --------------------------------------------------------------------------------------
			�ſ�ī�� ��ȿ��üũ
			loanRenewal4_015.fnCert_card_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_card_valid : function(){


			var custNm = $("#credit_custNm").val();			// ����
			var res1 = $("#credit_residNo_1").val();		// �ֹ� �չ�ȣ
			var res2 = $("#credit_residNo_2").val();		// �ֹ� �޹�ȣ
			var creditCd = $("#credit_code").val();			// �ſ�ī�� ȸ��
			var cardNo = $("#card_no").val(); 				// �ſ�ī�� ��ȣ
			var cardHndNo = $("#cert_hndNo_credit").val(); 	// �޴��� ��ȣ


			if( fnCommon_isNull(custNm)  ||  custNm == "" ){
				alert("�̸��� �Է��� �ּ���.");
				$("#credit_custNm").focus();
				return false;
			}

			if( fnCommon_isNull(res1)  ||  res1.length < 6 ){
				alert("�ֹε�Ϲ�ȣ ���ڸ��� �Է��� �ּ���.");
				$("#credit_residNo_1").focus();
				return false;
			}

			if( fnCommon_isNull(res2)  ||  res2.length < 7 ){
				alert("�ֹε�Ϲ�ȣ ���ڸ��� �Է��� �ּ���.");
				$("#credit_residNo_2").focus();
				return false;
			}

			if( fnCommon_isNull(creditCd)  ||  creditCd == "" ){
				alert("ī��縦 ������ �ּ���.");
				$("#credit_code").focus();
				return false;
			}

			if( fnCommon_isNull(cardNo)  ||  cardNo.length <= 6 ){
				alert("�ſ�ī�� ��ȣ�� �Է��� �ּ���.");
				$("#card_no").focus();
				return false;
			}

			if( fnCommon_isNull(cardHndNo)  ||  cardHndNo.length != 13 ){
				alert("�޴��� ��ȣ�� �Է��� �ּ���.");
				$("#cert_hndNo_credit").focus();
				return false;
			}

			var allChk_credit = $("#allChk_credit")[0].checked;
			if( !allChk_credit ){
				alert("�ſ�ī�� �������� ��ü���Ƿ� �����Ͻ� �� �������ּ���.");
				return false;
			}

			$("#cert_custNm").val(custNm);

			return true;
		},



		/* --------------------------------------------------------------------------------------
			�������� �� �޴� Ŭ�� �̺�Ʈ
			loanRenewal4_015.fnEvent_TabClick
		 -------------------------------------------------------------------------------------- */
		fnEvent_TabClick : function(e){

    		// ��Ȱ��ȭ������ �� Ŭ����
    		var className = e.target.className;
			if( fnCommon_isNull(className)  ||  className.indexOf("active") < 0 ){

	    		// ���������ϷῩ��
	    		isAuthed = false;
			}

    		var this_button_id = e.target.id;
			if( !fnCommon_isNull(this_button_id) ){

				// �ٸ��� Ŭ��ȿ�� ���ֱ�
				var tab_button_list = $("a[name='tab_button']");
				if( !fnCommon_isNull(tab_button_list)  &&  !fnCommon_isNull(tab_button_list.length)  &&  tab_button_list.length > 0 ){
					for(var i=0; i < tab_button_list.length; i++){

						var button = tab_button_list[i];
						var button_id = button.id;
						if( !fnCommon_isNull(button_id) ){

							var button_obj = $("#" + button_id);
							if( !fnCommon_isNull(button_obj)  &&  button_obj.length > 0 ){
								var parent = button_obj.parent();  // ���ΰ� �ִ� li �±�

								var div_id = button_id.replace("_button", "");  // id ���� ���缭 �ϴ� div ���� id ����

								// �ش� ���� Ȱ��ȭ
								if( button_id == this_button_id ){

									// Ȱ��ȭ ȿ��
									if( !fnCommon_isNull(parent)  &&  !parent.hasClass("tab_on")){
										parent.addClass("tab_on");
										bonin_sw =button_id;

									}

									// �ϴܺ� ����
									$("#" + div_id).show();
									$("#" + div_id + "_agree").show();

								// �ٸ� ���� ��Ȱ��
								}else{
									parent.removeClass("tab_on");
									$("#" + div_id).hide();
									$("#" + div_id + "_agree").hide();
								}
							}
						}
					}
				}

				// �޴���
				if(this_button_id == "tab_button_mobile"){

					// �ϴ��� �� �ͼӿ��� �Է¶����� ���
					var cert_hndNo = $("#cert_hndNo").val();  // ��� �Է¶�
					$("#tab_mobile_cert_hndNo").val(cert_hndNo);  // �ϴ� �޴��� ��ȣ �Է� ����

					$("#cert_hndNo_dl").hide();
					$("#tab_mobile_cert_hndNo_dl").show();

				}else{
					$("#cert_hndNo_dl").hide();
					$("#tab_mobile_cert_hndNo_dl").hide();
				}
			}
			$('body,html').animate({scrollTop: 0}, 100);
		},



		/* --------------------------------------------------------------------------------------
			�ſ�ī�� �������� ���� ���� �ڼ�������
			loanRenewal4_015.fnShow_agree_certif02
		 -------------------------------------------------------------------------------------- */
		fnShow_agree_certif02 : function(){
			showDialog(popupURL_clause_auth_card, 420);
		},



		/* --------------------------------------------------------------------------------------
			����ȣ��ȸ(�α���)
			loanRenewal4_015.fnSearch_2
		 -------------------------------------------------------------------------------------- */
		fnSearch_2 : function(){

			iajax.clearParam();

			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()));
			iajax.addParam("AUTH_TYPE", AUTH_TYPE);  // �������� ���
			iajax.addParam("IP", IP);
			iajax.addParam("SEND_MSG", "Y");   // ������ſ���


			$.ajax({
			    type: "post",
			    url: callURL_requestLNC3100,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {

					if(json.RESULT_NO == "0000") {
				    	custNo = json.CUST_NO;

						var data_list = [
								{ "key" : "view_name", "value" : "/lo/LOAN2161.jsp" }
								, { "key" : "parent", "value" : "IB" }
								, { "key" : "topMenu", "value" : "IB_REQ" }
								, { "key" : "leftMenu", "value" : "IB_REQ_010" }
								, { "key" : "title", "value" : "���������Է�" }
								, { "key" : "CUST_NO", "value" : custNo }
								, { "key" : "CUST_NM", "value" : fnCommon_deleteNull(custNm) }
								];

								// renewal4 ���� url ȣ��
								fnCommon_callUrl( data_list );


					} else {

						var data_list = [
											{ "key" : "view_name", "value" : "/lo/LOAN2161.jsp" }
											, { "key" : "parent", "value" : "IB" }
											, { "key" : "topMenu", "value" : "IB_REQ" }
											, { "key" : "leftMenu", "value" : "IB_REQ_010" }
											, { "key" : "title", "value" : "���������Է�" }
											, { "key" : "CUST_NO", "value" : "" }
											, { "key" : "CUST_NM", "value" : fnCommon_deleteNull(custNm) }
											];

											// renewal4 ���� url ȣ��
											fnCommon_callUrl( data_list );

					}


			    },
				beforeSend: function() {
					ing.show();
				},
				error: function(data, textStatus, error) {
					ing.hide();
					alert("����ȣ ��ȸ�� �����Ͽ����ϴ�.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			ȭ���̵�
			loanRenewal4_015.fnMovePage_controll
		 -------------------------------------------------------------------------------------- */
		fnMovePage_controll : function(){

			var data_list = [
								{ "key" : "view_name", "value" : "/lo/LOAN2161.jsp" }
								, { "key" : "parent", "value" : "IB" }
								, { "key" : "topMenu", "value" : "IB_REQ" }
								, { "key" : "leftMenu", "value" : "IB_REQ_010" }
								, { "key" : "title", "value" : "���������Է�" }
								, { "key" : "CUST_NO", "value" : custNo }
								, { "key" : "CUST_NM", "value" : fnCommon_deleteNull(custNm) }
								];

								// renewal4 ���� url ȣ��
								fnCommon_callUrl( data_list );

		},



		/* --------------------------------------------------------------------------------------
			�޴������� ��ȿ��üũ
			loanRenewal4_015.fnCert_phone_valid
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_valid : function( type ){
			var result = true;

			// ��Ż�
			var telecom = $("#telecom option:selected").val();
			if( fnCommon_isNull(telecom) ){
				alert("��Ż縦 �������ּ���.");
				$("#telecom").focus();
				return false;
			}
			$("#cert_hndNo").val($("#mobile_hndNo").val());
			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( fnCommon_isNull(cert_hndNo) ){
				alert("�޴�����ȣ�� �Է����ּ���.");
				$("#cert_hndNo").focus();
				return false;
			}

			var cert_hndNo_pattern = /^\d{10,11}$/;
			if(!cert_hndNo_pattern.test(cert_hndNo)){
				alert("�޴�����ȣ�� ��Ȯ�ϰ�\n�Է����ּ���.");
				$("#cert_hndNo").focus();
				return false;
			}

			var allChk_mobile = $("#allChk_mobile")[0].checked;
			if( !allChk_mobile ){
				alert("�޴��� �������� ��ü���Ƿ� �����Ͻ� �� �������ּ���.");
				return false;
			}

			if( !fnCommon_isNull(type) ){

				// �Էµ� ������ȣ ����
				if(type == "valid"){
					var aut_auth_no = $("#aut_auth_no").val();
					if( fnCommon_isNull(aut_auth_no) ){
						alert("������ �Ϸ���� �ʾҽ��ϴ�.\n������û �� ������ȣ�� �Է����ּ���.");
						return false;
					}
				}
			}

			return result;
		},



		/* --------------------------------------------------------------------------------------
			�޴��� �������� - �Էµ� �޴��� ������ȣ ����
			loanRenewal4_015.fnCert_phone_confirm
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_confirm : function(){

    		// ���������ϷῩ��
    		isAuthed = false;

    		$("#cert_custNm").val($("#mobile_custNm").val());


			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );   // ����
			iajax.addParam("HND_NO", cert_hndNo );   // �޴�����ȣ
			iajax.addParam("com_kind", $("#telecom").val() );   // ��Ż�
			iajax.addParam("aut_auth_no", $("#aut_auth_no").val());	  // �Էµ� ������ȣ

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_014_01,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
			    		// Ÿ�̸� ����
			    		loanRenewal4_015.fn_stopTimer();

			    		// ���������ϷῩ��
			    		isAuthed = true;
			    		AUTH_TYPE = "hp";

			    		// ����ȣ��ȸ(�α���)
						loanRenewal4_015.fnSearch_2();


			    	}else{
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				beforeSend: function() {
					ing.show();
				},
				error: function(data, textStatus, error){
					ing.hide();
					fnCommon_SessionExpired();
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�޴��� ������û Ÿ�̸� ����
			loanRenewal4_015.fn_startTimer
		 -------------------------------------------------------------------------------------- */
		fn_startTimer : function(){
			seconds = 180;
			countDownTimer = setInterval("loanRenewal4_015.fn_secoundPassed()", 1000);
		},

		/* --------------------------------------------------------------------------------------
			�޴��� ������û Ÿ�̸� ����
			loanRenewal4_015.fn_stopTimer
		 -------------------------------------------------------------------------------------- */
		fn_stopTimer : function(){
			clearInterval(countDownTimer);
		},

		/* --------------------------------------------------------------------------------------
			�޴��� ������û Ÿ�̸�
			loanRenewal4_015.fn_secoundPassed
		 -------------------------------------------------------------------------------------- */
		fn_secoundPassed : function(){
			var minutes = Math.round((seconds - 30) / 60);
			var remainingSeconds = seconds % 60;

			if(remainingSeconds < 10) {
				remainingSeconds = "0" + remainingSeconds;
			}

			// $("#verify_time").html("���� �޴������� ������ȣ�� ���۵Ǿ����ϴ�.<br>SMS �����ð� [ " + minutes + " : " + remainingSeconds + " ]");
			$("#cert_phone_timer").html("[" + minutes + " : " + remainingSeconds + "]");

			if( fnCommon_isNull(seconds) ){
				alert("�޴��� ������ �����Ͽ����ϴ�.\n�����ð��� �ʰ��� ���\n������ȣ ���û �� �Է����ּ���.");
				loanRenewal4_015.fn_stopTimer();
			}else{
				seconds--;
			}
		},



		/* --------------------------------------------------------------------------------------
			�޴��� �������� ���� ���� �ڼ�������
			loanRenewal4_015.fnShow_agree_certif01
		 -------------------------------------------------------------------------------------- */
		fnShow_agree_certif01 : function(){

			popupURL = popupURL_clause_auth_hp_skt;
			showDialog(popupURL, 420);

		},



		/* --------------------------------------------------------------------------------------
			�Ǹ����� ��û ��ȿ�� üũ
			loanRenewal4_015.fnSave_realName_valid
		 -------------------------------------------------------------------------------------- */
		fnSave_realName_valid : function(){
			var result = true;


			// �̸�
			var cert_custNm = $("#cert_custNm").val();
			if( fnCommon_isNull(cert_custNm) ){
				alert("�̸��� �Է����ּ���.");
				$("#cert_custNm").focus();
				return false;
			}

			return result;
		},



		/* --------------------------------------------------------------------------------------
			�Ǹ����� ��û
			loanRenewal4_015.fnSave_realName
		 -------------------------------------------------------------------------------------- */
		fnSave_realName : function(fnCallback){

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			iajax.clearParam();
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()));
			iajax.addParam("N01", "0");   // ��ȭ	// ȭ�鿡�� ������ �׸�
			iajax.addParam("N02", "0");   // DM		// ȭ�鿡�� ������ �׸�

			// �������� ���� �����ϱ� ���� �޴�����ȣ ����
			iajax.addParam("HND_NO", cert_hndNo );   // �޴�����ȣ

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_NAME,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
			    	if(json.RESULT_NO == "0000"){
						if( !fnCommon_isNull(fnCallback) ){
							//alert("�����Ǿ����ϴ�.");
							fnCallback();
						}

			    	}else if(json.RESULT_NO == "3001"){

						// �����û���ۼ� ȭ�� ȣ��
						var data_list = [
											{ "key" : "view_name", "value" : "/lo/LOAN2115.jsp" }
										  , { "key" : "title", "value" : "����������ȸ" }
										  , { "key" : "parent", "value" : "IB" }
										  , { "key" : "topMenu", "value" : "IB_REQ" }
										  , { "key" : "leftMenu", "value" : "IB_REQ_050" }
							];

						// renewal4 ���� url ȣ��
						fnCommon_callUrl( data_list );

			    	}else{
				    	var authErrMsg  = "�Ǹ������� �����Ͽ����ϴ�.\n";
				        authErrMsg += "Ȯ�� �� �ٽ� �õ����ּ���.\n";
				        authErrMsg += "���� ������ �Ǹ��� ����� ���\n";
				        authErrMsg += "NICE (02-2122-4000)\n";
				        authErrMsg += "���� ���� �� �̿밡���մϴ�.\n\n";
				        authErrMsg += "�ſ���ȸ ���ܼ��� �̿��\n";
				        authErrMsg += "�������� �� ����ٶ��ϴ�.\n";
				        authErrMsg += "NICE: 02-2122-4000\n";
				        authErrMsg += "KCB: 02-708-1000";

						alert(authErrMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error){
					alert("�Ǹ������� �����Ͽ����ϴ�.\nȮ�� �� �ٽ� �õ����ּ���.");
					console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function(){
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�޴��� ������ȣ ��û
			loanRenewal4_015.fnCert_phone_request
		 -------------------------------------------------------------------------------------- */
		fnCert_phone_request : function(){

    		// ���������ϷῩ��
    		isAuthed = false;

			// �ʱ�ȭ
			$("#cert_phone_timer_dl").hide();		// ������ȣ �Է� ����
			$("#aut_auth_no").hide();	 // ������ȣ
			$("#aut_auth_no").val("");

			$("#cert_hndNo").val($("#mobile_hndNo").val());
			$("#cert_custNm").val($("#mobile_custNm").val());

			// �Ǹ����� ��û ��ȿ�� üũ
			var result = loanRenewal4_015.fnSave_realName_valid();
			if(!result){
				return false;
			}

			// �޴������� ��ȿ��üũ
			var result = loanRenewal4_015.fnCert_phone_valid();
			if(!result){
				return false;
			}

			iajax.clearParam();

			// ��Ż�
			var telecom = $("#telecom").val();
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#cert_custNm").val()) );
			iajax.addParam("COM_KIND", telecom );

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			cert_hndNo = fnCommon_getOnlyNumber(cert_hndNo);

			if( !fnCommon_isNull(cert_hndNo)  &&  !fnCommon_isNull(cert_hndNo.length)  &&  cert_hndNo.length >= 10 ){
				iajax.addParam("HND_NO", cert_hndNo);
			}

			//�ۿ���
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
			    url: callURL_loanRenewal4_001_SMS,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000"){

			    		// �����ð� timer ����
						$("#cert_phone_timer_dl").show();
						$("#aut_auth_no").show();

			    		// ������û ��ư
			    		$("#certif01_btn_1").html("���û");
			    		$("#certif01_btn_1").removeClass("on");

			    		// Ÿ�̸� ����
			    		loanRenewal4_015.fn_stopTimer();
			    		loanRenewal4_015.fn_startTimer();

			    	}else{
			    		alert("������ȣ �߼ۿ� �����Ͽ����ϴ�. �ٽ� �õ����ּ���.");
			    		console.log("Error code:[ " + json.RESULT_NO + " ], message:[" + json.RESULT_DESC +" ]");
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error) {
					ing.hide();
					alert("�Ǹ������� �����Ͽ����ϴ�.\nȮ�� �� �ٽ� �õ����ּ���.");
		    		console.log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�ſ�ī�� ARS ��û
			loanRenewal4_015.fnCert_cardArs_request
		 -------------------------------------------------------------------------------------- */
		fnCert_cardArs_request : function(){

    		// ���������ϷῩ��
    		isAuthed = false;

			// �޴������� ��ȿ��üũ
			var result = loanRenewal4_015.fnCert_card_valid();
			if(!result){
				return false;
			}

			iajax.clearParam();

			iajax.addParam("KIND_CHK", "21" ); //����� 21:ARS����, 22:�ſ�ī������ Ȯ��
			iajax.addParam("CUST_NM", fnCommon_deleteNull($("#credit_custNm").val()) );

			// �޴�����ȣ
			var cert_hndNo = $("#cert_hndNo_credit").val();

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			var hndNoSplit = cert_hndNo.split('-');
			iajax.addParam("HND_NO1", hndNoSplit[0]);
			iajax.addParam("HND_NO2", hndNoSplit[1]);
			iajax.addParam("HND_NO3", hndNoSplit[2]);
			iajax.addParam("SMS_MSG", IP);						//IP�� ���
			iajax.addParam("AUT_AUTH_NO", "01");				//01 ���ͳ�
			iajax.addParam("CD_PWD", $("#credit_code").val());	//ī����ڵ�� ���

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_001_ARS,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json) {
			    	if(json.RESULT_NO == "0000"){

						alert("ARS�� ��ȭ�Ͽ� ī�� ��й�ȣ �� 2�ڸ��� �Է����ּ���.");
						isArsCalled = true;
			    	}else{
			    		alert("�Էµ� ī���, ī���ȣ, �޴�����ȣ�� ��Ȯ�����ּ���.\nī��翡 ��ϵ� �޴�����ȣ�� �ƴ� ��쿡�� ARS��û�� ���� �ʽ��ϴ�.");
			    	}
			    },
				beforeSend : function() {
					ing.show();
				},
				error: function(data, textStatus, error) {
					ing.hide();
					alert("�Ǹ������� �����Ͽ����ϴ�.\nȮ�� �� �ٽ� �õ����ּ���.");
				},
				complete: function() {
					ing.hide();
				}
			});
		},



		/* --------------------------------------------------------------------------------------
			�ֹε�Ϲ�ȣ �ٰ� �� ������� �ȳ� �˾�
			loanRenewal4_015.fnPopup_1
		 -------------------------------------------------------------------------------------- */
		fnPopup_1 : function( type ){

			var msg = "";
			msg += "<p>�������������� �ſ������� �̿� �� ��ȣ�� ���� ���� ����� �� 37���� 2�� �ǰ��Ͽ� �ֹε�Ϲ�ȣ�� �����մϴ�.</p>";
			msg += "<p>Ÿ���� �ֹε�Ϲ�ȣ�� �����ϰų�, ��������ϴ� �ڴ� 3�� ������ ¡�� �Ǵ� 3õ���� ������ ������ �ΰ��� �� �ֽ��ϴ�.</p>";

			// �޼��� �˾�
			fnCommon_popup("open", msg);
		},



		/* --------------------------------------------------------------------------------------
			�޴�����ȣ ���� �̺�Ʈ
			loanRenewal4_015.fnKeyup_hndNo
		 -------------------------------------------------------------------------------------- */
		fnKeyup_hndNo : function(e){

			// ���������ϷῩ��
			isAuthed = false;

			var value = e.target.value;

			// ���ڿ� ���� �� ���ڸ� ��ȯ
			value = fnCommon_getOnlyNumber(value);

			// �ʵ忡 �缳���� ��
			var value_format = value;

			if( !fnCommon_isNull(value)  &&  value.length > 0 ){
				if(value.length > 3){

					// ���ڸ� �߶󳻱�
					value_format = value.substring(0, 3);
					value = value.substring(3, value.length);

					// ������ ���ڸ� �̻��̸�
					if(value.length > 3){

						// �߰��ڸ� �߶󳻱�
						value_format += "-" + value.substring(0, 3);
						value = value.substring(3, value.length);

						// ������ ���ڸ� �̻��̸� �߰��ڸ��� ���ڸ� �� �ѱ��
						if(value.length > 4){
							value_format += value.substring(0, 1);
							value = value.substring(1, value.length);
						}
					}

					// ���� ���ڸ��� ������ �̰͵� ���̱�
					if( !fnCommon_isNull(value) ){
						value_format += "-" + value;
					}
				}
			}

			// ��� �޴�����ȣ �ʵ忡 ����
			$("input[type='tel'][name='cert_hndNo']").val(value_format);
		},



		/* --------------------------------------------------------------------------------------
			�ֹε�Ϲ�ȣ ���ڸ� ���� �̺�Ʈ
			loanRenewal4_015.fnKeyup_residNo_1
		 -------------------------------------------------------------------------------------- */
		fnKeyup_residNo_1 : function(e){

    		// ���������ϷῩ��
    		isAuthed = false;

			// ���ڿ� ���� �� ���ڸ� ��ȯ
    		var value = e.target.value;
    		e.target.value = fnCommon_getOnlyNumber(value);
		},



		/* --------------------------------------------------------------------------------------
			���� ���� �̺�Ʈ
			loanRenewal4_015.fnKeyup_custNm
		 -------------------------------------------------------------------------------------- */
		fnKeyup_custNm : function( type ){

			// ���������ϷῩ��
			isAuthed = false;

			if( !fnCommon_isNull(type) ){

				// ���� X Ŭ��
				if(type == "delete"){
					$("#cert_custNm").val("");
					$("#cert_custNm").focus();  // Ű�е尡 ������� �����ϱ�
				}
			}

			// �̸� ������ ������ư ���̰�
			var cert_custNm = $("#cert_custNm").val();
			if( !fnCommon_isNull(cert_custNm) ){
				$("#cert_custNm_delete_p").show();
			}else{
				$("#cert_custNm_delete_p").hide();
			}
		},



		/* --------------------------------------------------------------------------------------
			���⺻���� ��ȸ
			loanRenewal4_015.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function( device_result ){

			// ���⺻���� ��ȸ
			iajax.clearParam();

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

						// ����
						if( !fnCommon_isNull(custNm) ){
							$("input[type='text'][name='cert_custNm']").val( custNm );
						}

						// �������
						var residNo = json.residNo;
						if( !fnCommon_isNull(residNo) ){
							$("input[type='tel'][name='cert_residNo_1']").val( residNo );
						}

						// �޴�����ȣ
						var hndNo = json.hndNo;
						if( !fnCommon_isNull(hndNo) ){

							// ���ڿ� ���� �� ���ڸ� ��ȯ
							hndNo = fnCommon_getOnlyNumber(hndNo);

							// �޴�����ȣ ���� �̺�Ʈ�� ����ؼ� �� ����
							loanRenewal4_015.fnKeyup_hndNo({target:{value:hndNo}});
						}

						// �������� ���ʿ� ���̽��̸� ������������ �ٷ� �̵� // ���񽺿��� �б������Ƿ� ��� �̰� ���ʿ�!
						if( !fnCommon_isNull(auth_need_yn)  &&  auth_need_yn == "N" ){
							isAuthed = true;

							loanRenewal4_015.fnMovePage_controll();
						}

						// }

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					// alert(error);
					// fnCommon_SessionExpired();
					// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		},

		/* --------------------------------------------------------------------------------------
			�޴��� ���� ����
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
			�ſ�ī�� ���� ����
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
		�ǰ�������� ��ũ���� ��� �ȳ�
	 -------------------------------------------------------------------------------------- */
	var loanRenewal4_016 = {

		/* --------------------------------------------------------------------------------------
			�⺻����
			loanRenewal4_016.fnInit
		 -------------------------------------------------------------------------------------- */
		fnInit : function(){

			// ���⺻���� ��ȸ
			loanRenewal4_016.fnSearch_1();
		},


		/* --------------------------------------------------------------------------------------
			���⺻���� ��ȸ - �ѱ� ���� �������� ����ȸ
			loanRenewal4_016.fnSearch_1
		 -------------------------------------------------------------------------------------- */
		fnSearch_1 : function(){
			iajax.clearParam();
			// ����� 5������ - ����
			//iajax.addParam("CHK_CSRF", random);

			$.ajax({
			    type: "post",
			    url: callURL_loanRenewal4_012_02,
			    dataType: "json",
			    data: iajax.postparam,
			    success: function(json){
					if( !fnCommon_isNull(json)  &&  !fnCommon_isNull(json.RESULT_NO)  &&  json.RESULT_NO == "0000" ){

						// ���õ� �����û��ȣ�� �´� 3005 ����ȸ�� �׸�
						var LNC3005_selected = json.LNC3005_selected;

						var SCRP_NHIS_ERROR_MSG = "";	// �Ǻ���ũ������ָ޼���
						if( !fnCommon_isNull(LNC3005_selected) ){
							SCRP_NHIS_ERROR_MSG = LNC3005_selected.scrp_NHIS_ERROR_MSG;	// �Ǻ���ũ������ָ޼���
						}

			    		// �Ǻ� ��������� �ȳ� �޼��� �߻�
				    	if( fnCommon_isNull(SCRP_NHIS_ERROR_MSG) ){
				    		SCRP_NHIS_ERROR_MSG = "�ǰ�������� ��ַ� ��ũ������ �����߽��ϴ�.";
				    	}

				    	alert(SCRP_NHIS_ERROR_MSG);
				    	fnCommon_goHome();

				    	/*
						// �޼��� �˾�
			    		var msg = "<p>" + SCRP_NHIS_ERROR_MSG + "</p>";
			    		var no_button_flag = false;  // �ƴϿ� ��ư ���� ����
			    		var fnCallback_yes = fnCommon_goHome;  // Ȯ�� ��ư�� �Լ� ���� // �������� �̵�
			    		var fnCallback_no = null;  // �ƴϿ� �̻��

						fnCommon_popup("open", msg, no_button_flag, fnCallback_yes, fnCallback_no);
						*/

			    	} else {
			    		var errorMsg = json.RESULT_DESC;
						alert(errorMsg.split("<br/>").join("\n"));
			    	}
			    },
				error: function(data, textStatus, error) {
					// alert(error);
					fnCommon_SessionExpired();
					// log("data:[ " + data + " ], textStatus:[ " + textStatus + " ], error:[ " + error + " ]");
				},
				complete: function() {
				}
			});
		}

	};   // var loanRenewal4_016 = {




/* ----------------------------------------------------------------------------------------------------------------------- */
/* --------    ���� �Լ� Start !!    ---------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------
	�Էµ� �ּ������� �������ּ� ��ȸ
	pop_post_minwon24.jsp   ���� ȣ���ϱ⶧���� ����
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

					// ���õ� �ּҰ� ��ȯ
					if( !fnCommon_isNull(json.addresslist) ){
						str = JSON.stringify(json.addresslist);
					}

					$("#orgAddressList").val(str);
					$("#step").val("2");

					// �ּ��˾��� �ٽö���?
					showDialog(callURL_post_minwon24, 420);

				}else{

					// �����ȳ�
					alert(json.message);

					// ��ũ���� Ÿ�Ӿƿ� ó��
					var scrp_nm = "MinWon";
					var job_nm = "�ּҸ����ȸ";
					var msg = json.message;

					var timeout_msg = "����� ��Ȱ���� �ʽ��ϴ�.";
					if (msg != timeout_msg){
						return;
					}

					iajax.clearParam();
					// ����� ���� 5�� - ����
					// iajax.addParam("CHK_CSRF", random);
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

/* --------    ���� �Լ� End !!    ---------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------------------- */












/* ------------------------------------------------------------------------------------------------------------------------ */
/* --------    �����Լ� Start !!    --------------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------
	null check
 -------------------------------------------------------------------- */
function fnCommon_isNull(val, type){
	var result = false;

	if(val == null  ||  val == undefined){
		result = true;

	}else{

		// boolean ���� �Ǻ��϶�
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
/* --------    �����Լ� Start !!    --------------------------------------------------------------------------------------- */

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
	�����ڵ� �޺��ڽ� ����
	commcodelist : �����ڵ� ����Ʈ
	combo_id : ��� selectbox
	temp_yn : ���� option �߰�����
 -------------------------------------------------------------------- */
function fnCommon_combo_commcodelist( commcodelist, combo_id, temp_yn ){
	if( !fnCommon_isNull(commcodelist)  &&  commcodelist.length > 0 ){
		var html = "";

		for(var i=0; i < commcodelist.length; i++){
			var code_obj = commcodelist[i];

			if( !fnCommon_isNull(code_obj) ){

				var minor_KEY = code_obj.MINOR_KEY;
				var descript = code_obj.DESCRIPT;

				var selected = "";

				// ���� option �߰�����
				if( !fnCommon_isNull(temp_yn)  &&  temp_yn == "Y"  &&  i == 0 ){
					html += "<option value='' selected>����</option>";
				}

				/*
				// ù��° �׸� �ڵ����� ����
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
	�ݾ� �ѱ۷� ��ȯ
 -------------------------------------------------------------------- */
function fnCommon_convertAmt(amt, hangul_id) {
	var numCheck = /^\d*$/;
	if(!numCheck.test(amt)) {
		$("#" + hangul_id).html("");
		return;
	}

	var arrayAmt = new Array("��", "��", "��", "��", "��", "��", "ĥ", "��", "��", "��");
	var arrayPosi = new Array("", "��", "��", "õ");
	var arrayUnit = new Array("", "��", "��", "��");

	var posi = amt.length%4; //�ڸ���
	var len = (amt.length/4).toString();
	var unit;

	if(len.indexOf(".")>0) {
		unit = len.substring(0, len.indexOf(".")); //����(0:�ϴ���, 1:������...)
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
		$("#" + hangul_id).html("<span>" + korAmt + "</span>��");
	}
};



/* --------------------------------------------------------------------
	���ڿ� ���� �� ���ڸ� ��ȯ(���ڿ��� �����ؼ� ��ȯ)
 -------------------------------------------------------------------- */
function fnCommon_getOnlyNumber(value) {
	var result = "";

	var value_string = String(value);
	var pattern = /[0-9]/;   // ���ڸ�

	if( !fnCommon_isNull(value_string)  &&  !fnCommon_isNull(value_string.length)  &&  value_string.length > 0 ){
		var len = value_string.length;
		for(var i=0; i < len; i++){

			// �ѱ��ھ� �������� �����ؼ� ����
			var character = value_string.substring(0, 1);
			value_string = value_string.substring(1, value_string.length);   // �߶� �ѱ��� ���� ������ �κ�

			if(pattern.test(character)){
				result += character;
			}
		}
	}

	return result;
};



/* --------------------------------------------------------------------
	�޼��� �˾�
 -------------------------------------------------------------------- */
function fnCommon_popup( type, msg, no_button_flag, fnCallback_yes, fnCallback_no ){

	// ���� �ܿ� �޼��� ������ �����ϱ� ������� �⺻���� ��Ƶα�
	$("#popup_common").remove();

	//alert("msg=" + msg);

	if(msg != null && msg.length > 0 ) {
		if(msg.indexOf("<p>") > -1) {
			msg = msg.replace(/<p>/gi, "");
		}

		if(msg.indexOf("</p>") > -1) {
			msg = msg.replace(/<\/p>/gi, "\n");
		}
	}

	//alert("new msg=" + msg);

	if( !fnCommon_isNull(type) ){
		if(type == "open"){
			if( !fnCommon_isNull(msg) ){
				if(!fnCommon_isNull(fnCallback_yes)) {
					if(confirm(msg)) {
						fnCallback_yes();
					} else {
						if(fnCallback_no != null) {
							fnCallback_no();
						}
					}
				} else {
					alert(msg);
				}

				/*
				var popup_html = "";
				popup_html += "  	<article class='layerWrap reDesignPop' id='popup_common'>						  ";
				popup_html += "  		<div class='bgAlpha'>					  ";
				popup_html += "  			<div class='popup'>				  ";
				popup_html += "  				<div class='layerCont'>			  ";
				popup_html += "  					<div class='layerCont_txtBox'>		  ";

				// ���޹��� ����
				popup_html += msg;

				popup_html += "  					</div>		  ";
				popup_html += "  					<div class='layerFoot'>		  ";

				// �ƴϿ� ��ư ���� ����
				if( !fnCommon_isNull(no_button_flag, "boolean") ){
					popup_html += "  						<button type='button' class='btnLg' id='popup_common_btn_no'>�ƴϿ�</button>	  ";
					popup_html += "  						<button type='button' class='btnLg' id='popup_common_btn_yes'>Ȯ��</button>	  ";
				}else{
					popup_html += "  						<button type='button' class='btnLg widthAll' id='popup_common_btn_yes'>Ȯ��</button>	  ";   // �Ѱ��� ���
				}

				popup_html += "  					</div><!-- //layerFoot -->		  ";
				popup_html += "  				</div>			  ";
				popup_html += "  							  ";
				popup_html += "  			</div>				  ";
				popup_html += "  		</div>					  ";
				popup_html += "  	</article>						  ";

				$(".contents").append( popup_html );  // ȭ�鿡 ����
				$("#popup_common_btn_yes").on("click", fnCommon_popup );  // Ȯ�ι�ư�� �ݱ� ��� �߰�

				// �ƴϿ� ��ư ���� ����
				if( !fnCommon_isNull(no_button_flag, "boolean") ){
					$("#popup_common_btn_no").on("click", fnCommon_popup );  // �ƴϿ���ư�� �ݱ� ��� �߰�
				}

				// Ȯ�� ��ư�� ���� �Լ� �̺�Ʈ ����
				if( !fnCommon_isNull(fnCallback_yes) ){
					$("#popup_common_btn_yes").on("click", fnCallback_yes);
				}

				// �ƴϿ� ��ư�� ���� �Լ� �̺�Ʈ ����
				if( !fnCommon_isNull(fnCallback_no) ){
					$("#popup_common_btn_no").on("click", fnCallback_no);
				}

				$("#popup_common").show();  // �� ��������ϱ� ����OK
				*/
			}
		}

		/*else if(type == "close"){
			$("#popup_common").remove();
		}*/
	}
};



/* --------------------------------------------------------------------
	renewal4 ���� url ȣ�� :
		parameter �� ������ ȭ�� ȣ�� ���. app/web ��쿡 ���� ȣ����/�����ͱ��� �б��۾�
	 	*parameter�� �ѱ��� ��� encoding �����۾� �ʿ�. encoding ����� dpc_common.js ����
 -------------------------------------------------------------------- */
function fnCommon_callUrl( data_list ){

	/* ����� sample
	var data_list = [

         // ȭ��ȣ�� �⺻��
           { "key" : "view_name", "value" : "loanRenewal4_test" }   // ������ ȭ�� ȣ��� ���
         , { "key" : "view_name_other", "value" : "/online_sunshineloan/step3/sorry" }   // redirect ��� url  // ��������/Ÿ���� url �� �״�� ����Ұ���.
         , { "key" : "title", "value" : "��������" }   // �� ȣ��� header �� ������ ȭ��� �����������.

         // parameter
         , { "key" : "reqAmt", "value" : REQ_AMT }
         , { "key" : "autoloanPsbYn", "value" : AUTOLOAN_PSB_YN }
         , { "key" : "custNo", "value" : LNC3003.CUST_NO }
         , { "key" : "goodsCode", "value" : LNC3003.GOODS_CD }
		];

	// renewal4 ���� url ȣ��
	fnCommon_callUrl( data_list );
	*/

	if( !fnCommon_isNull(data_list)  &&  !fnCommon_isNull(data_list.length)  &&  data_list.length > 0 ){

		/*
		// ���»� ���� �߰� // ���� �ٴϱ� ����
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
		*/
	}

	// ȭ�� ȣ�� : �� ���θ� ����ٳ�� �ϹǷ� �������� ����, ���� ȣ�� ��� ȭ�� id �� parameter �� ���� ����
	var url = "/";
	// ������ ���� �־����� ����
	$("#loanRenewal4_view_form").remove();

	// �� �� ����
	var html = "";
	html += "<form id='loanRenewal4_view_form' name='loanRenewal4_view_form'>";


	// ���޹��� ������ ������ ���۱��� ����
	if( !fnCommon_isNull(data_list)  &&  !fnCommon_isNull(data_list.length)  &&  data_list.length > 0 ){
		for(var i=0; i < data_list.length; i++){
			var data_obj = data_list[i];

			var key = data_obj.key;
			var value = data_obj.value;

			if( !fnCommon_isNull(key)  &&  !fnCommon_isNull(value) ){
				if(key == "view_name") {
					url = value;
				} else {
					html += "<input type='hidden' id='" + key + "' name='" + key + "' value='" + value + "'/>";
				}
			}
		}
	}

	html += "</form>";
	$("body").append( html );  // ȭ�鿡 ���λ���

	$("#loanRenewal4_view_form").attr("method", "post");
	$("#loanRenewal4_view_form").attr("action", url);
	$("#loanRenewal4_view_form").submit();
};



/* --------------------------------------------------------------------
	����ȭ�� �̵�
 -------------------------------------------------------------------- */
function fnCommon_goHome() {
	/*
	$.ajax({
	    type: "post",
	    url: "/main",
	    dataType: "json"
	});
	*/
	location.href = "/";
};



/* --------------------------------------------------------------------
	�ڷΰ���
 -------------------------------------------------------------------- */
function fnCommon_goBack() {
	// ����� ���� 5�� -- app ����
	/*

	var isApp_flag = fnCommon_isApp();
	if(isApp_flag){
		var params = {
				pluginId: "slCert",
				method: "goBack",
				callBack: function(isOK, json) {
				}
			};
		SDSFrameWork.plugin.execute(params);

	}else{ */
		fnCommon_goHome();
//	}
};



/* --------------------------------------------------------------------
	�� ���� return
 -------------------------------------------------------------------- */
function fnCommon_isApp(){
	var isApp = $("#isApp").val();   // smartloan_layout.jsp �� ��Ƶ� �� ���
	var isApp_flag = false;

	if( !fnCommon_isNull(isApp)  &&  (isApp == true  ||  isApp == "true"  ||  isApp == "Y") ){
		isApp_flag = true;
	}

	return isApp_flag;
};



/* --------------------------------------------------------------------
	�޸����
-------------------------------------------------------------------- */
function fnCommon_addComma( value ){

	// ���ڿ� ���� �� ���ڸ� ��ȯ
	value = fnCommon_getOnlyNumber(value);
	var value_format = value;

	// �޸����
	// �ѱ۰� ���ϱ�
	var length = value.length;
	if(length > 3){

		var division = parseInt(length / 3);
		var rest = length % 3;

		// ������ ������ �޸����� �ϳ� �ø���
		if(rest > 0){
			division = division + 1;
		}

		// 3�� �����ŭ �޸� ����
		if(division > 0){
			value_format = "";

			for(var i=0; i < division; i++){
				if(i > 0){
					value_format = "," + value_format;
				}
				value_format = value.substring(value.length-3, value.length) + value_format;  // 3�ڸ� �߶� ���̱�
				value = value.substring(0, value.length-3 );  // ���ºκ�
			}
		}
	}

	return value_format;
};



/* --------------------------------------------------------------------
	���� ���󿩺� üũ
-------------------------------------------------------------------- */
function fnCommon_checkSession(){
	if( fnCommon_isNull(session_check_success_yn)  ||  session_check_success_yn == "N" ){
		alert("������ ����Ǿ����ϴ�.");

		// ����ȭ�� �̵�
		fnCommon_goHome();
	}
};



/* --------------------------------------------------------------------
	�ε��� dim ó�� // layer_popup.jsp �� ������ dim ���� Ȱ��
	*���� ��Űŷ��ÿ��� app ���� loading dim �� ���� �־ web ���� ������ ó���Ҷ��� ���.
-------------------------------------------------------------------- */
function fnCommon_showMask(){

	// show �Ҷ� ������ �������� ���� ������! �ʹ� ���!
	var display = $(".ajax_load_mask").css("display");
	if( fnCommon_isNull(display) || display != "block" ){
		$(".ajax_load_mask").css("display","block");   // dim
		$(".ajax_loader").css("display","block");   // ���ۺ���
	}
};

function fnCommon_hideMask(){
	$(".ajax_load_mask").css("display","none");   // dim
	$(".ajax_loader").css("display","none");   // ���ۺ���
};



/* --------------------------------------------------------------------
	�������� �����ϸ� ���ڱ��ϱ�
-------------------------------------------------------------------- */
function fnCommon_getDay_addMonth( addMonth_num ){
	var result = "";

	var today = new Date();
	var yyyy = today.getFullYear();
	var mm = today.getMonth() + 1;
	var dd = today.getDate();

	// �߰��� ���� ���ϱ�
	if( !fnCommon_isNull(addMonth_num) ){
		mm = mm + addMonth_num;

		// 12���� �Ѱ����� ������ �߰�
		if(mm > 12){

			// �ݺ�Ƚ��
			var repeat_count = parseInt(mm / 12);
			for(var i=0; i < repeat_count; i++){
				yyyy = yyyy + 1;
				mm = mm - 12;
			}
		}

		// ������� // 0 == 12��, -1 == 11�� ... -11 == 1��
		if(mm < 1){

			// �ݺ�Ƚ��
			var repeat_count = parseInt(mm / 12) * -1;  // ����� ���� ����� ��ȯ
			for(var i=0; i < repeat_count; i++){
				yyyy = yyyy - 1;
				mm = mm + 12;
			}
		}

		// ���� ���� ������ ���� �ٽø��߱�
		// �� ���� ����������
		var maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var maxDay = maxDaysInMonth[mm-1];  // �ش���� ����������

		// 2���̸� ���� üũ�Ͽ� ���������� ���ϱ�
		if( (mm + 1) == 2  &&  ( (yyyy%4 == 0  &&  yyyy%100 != 0)  ||  yyyy%400 == 0 )){
			maxDay = 29;
		}

		// ������ ���� ���������ڴ� �����ʵ���
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

	// �ڸ��� ä���
	yyyy_string = fnCommon_lpad( yyyy_string, 4, "0" );
	mm_string = fnCommon_lpad( mm_string, 2, "0" );
	dd_string = fnCommon_lpad( dd_string, 2, "0" );

	result = yyyy_string + "." + mm_string + "." + dd_string;
	return result;
};



/* --------------------------------------------------------------------
	������ ���ڿ� �߰�
-------------------------------------------------------------------- */
function fnCommon_lpad( value, num, temp ){

	// ���õ� ���̺��� ���� �� ���̰� ª���� temp �� ä���
	if( !fnCommon_isNull(value)  &&  !fnCommon_isNull(value.length)  &&  !fnCommon_isNull(num)  &&  value.length < num  &&  !fnCommon_isNull(temp) ){

		// ������ ���̸�ŭ
		var gap = num - value.length;
		for(var i=0; i < gap; i++){
			value = temp + value;
		}
	}

	return value;
};



/* --------------------------------------------------------------------
	iajax ������ ���� parameter �߰�
-------------------------------------------------------------------- */
function fnCommon_partnerData(){
	if( !fnCommon_isNull(ref)  &&  ref == "partner" ){
		if( !fnCommon_isNull(iajax) ){
			iajax.addParam("AD_SR", sr);		// ����ڵ� 1(�⺻�ڵ� ����ó)
			iajax.addParam("AD_SN", sn);		// ����ڵ� 2(�����ڻ�� �����ڵ�)
			iajax.addParam("AD_SC", sc);		// ����ڵ� 3(������� �����ڵ�)
			iajax.addParam("AD_SE", se);		// ����ڵ� 4(��Ÿ)

			iajax.addParam("AD_UTM_SOURCE", utmSource);		// ���Լҽ�
			iajax.addParam("AD_UTM_MEDIUM", utmMedium);		// �����ü
			iajax.addParam("AD_UTM_CAMPAIGN", utmCampaign);		// ķ���� ����
			iajax.addParam("AD_UTM_TERM", utmTerm);		// Ű����
			iajax.addParam("AD_UTM_CONTENT", utmContent);		// ������ ����

			iajax.addParam("DOWN_GB_NM", sr);

			/*
			if( !fnCommon_isNull(sr)  &&  sr == "upsp" ){
				iajax.addParam("DOWN_GB_NM", sr);
			}else{
				iajax.addParam("DOWN_GB_NM", sDownGb);  // �������и�
			}
			*/

			iajax.addParam("SUGGR_DISTG_NO", suggrDistgNo);		// �����ڽĺ���ȣ
		}
	}
};


/* --------------------------------------------------------------------------------------
	maxlength �Է°� ���޽� Ŀ���̵�
 -------------------------------------------------------------------------------------- */
function fnCommon_maxlength_check( e, next_field_id ){

	// �̺�Ʈ����
	if(!fnCommon_isNull(e)){

		// �̺�Ʈ�������
		var currentTarget = e.currentTarget;
		if(!fnCommon_isNull(currentTarget)){

			// �ִ�������Ѱ�
			var maxLength = currentTarget.maxLength;
			if(!fnCommon_isNull(maxLength)){

				// ���� �Է°� ���̰� �ִ�������Ѱ��� ���������� ��Ŀ�� �̵�
				var value = currentTarget.value;
				if(!fnCommon_isNull(value)  &&  !fnCommon_isNull(value.length)  &&  value.length > 0){

					var length = value.length;
					if(length >= maxLength){

						// ���� �̵� �ʵ� id �޾����� �̵������ֱ�
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
	byte ���Ѹ�ŭ �߶󳻱�
	fnCommon_cutByte
 -------------------------------------------------------------------------------------- */
function fnCommon_cutByte( limit, value ){
	var result_value = "";

	// ���� ����
	// var limit = 40;  // 40 byte ����
	var limit_index = 0;
	var byte_length = 0;

	// byte üũ
	if( !fnCommon_isNull(value)  &&  !fnCommon_isNull(value.length)  &&  value.length > 0 ){
		for(var i=0; i < value.length; i++){

			var char = value.charAt(i);
			if(escape(char).length > 4){
				byte_length += 2;  // �ѱ��� ��� 2���ϱ�
			}else{
				byte_length += 1;
			}

			if(byte_length <= limit){
				limit_index = i + 1;  // ���� ���� ����
			}
		}
	}

	// �缳��
	result_value = value.substr(0, limit_index);
	return result_value;
};



/* --------------------------------------------------------------------------------------
	���� �⺻����
-------------------------------------------------------------------------------------- */
function fnCommon_init(){

	$("input[type='text'], input[type='tel'], input[type='password']").on("focus", function(e){

		var scrollTop_value = $(e.target).offset().top;
		$('body').animate({scrollTop: scrollTop_value }, 500);
	});


	// �ۿ���
	var isApp_flag = fnCommon_isApp();

	// web ���� ��ư ������� ���� �ӽú��� // �̷��� �ϸ� �� ������ ���� ������ ��ư�� ���� �Ǽ� ���� �ö�´�
	if(fnCommon_isNull(isApp_flag, "boolean")){
		$("div[name='redesign_button']").addClass("btnHoldNone");
	}

};


function setAuthNumber(num) {
	$("#aut_auth_no").val(num);
};


function fnCommon_getTimeYYMMDDHHMMSS() {
	var date = new Date();
	var current = leadingZeros(date.getFullYear(), 4) + leadingZeros(date.getMonth() + 1, 2) + leadingZeros(date.getDate(), 2) + leadingZeros(date.getHours(), 2) + leadingZeros(date.getMinutes(), 2) + leadingZeros(date.getSeconds(), 2);
	return current;
}

function leadingZeros(n, digits) {
	var zero = "";
	n = n.toString();

	if(n.length < digits) {
		for(i=0 ; i<digits-n.length; i++) {
			zero += "0";
		}
	}

	return zero + n;
}
/* --------    �����Լ� End !!    --------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------ */

/* ������ ��ȣȭ */
function fnDecrypt_Coocon(data){

	var input = {} ;
	input['Data'] = data;
	input['Uid'] = CooconiSASNX.OpenUid;
	input['Action'] = CooconiSASNX.OpenAction;
	var param = "data="+ encodeURIComponent(  JSON.stringify(input) );


	var rtn = null;
	$.ajax({
	    url : "/coocon/decode.jsp?",
	    type: "POST",
	    data : param,
	    async: false,
	    success: function(data, textStatus, jqXHR)
	    {
	     	rtn = data['Result'];
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	    	alert("error");
	    }
	});
	return rtn;
}

/* --------------------------------------------------------------------
 * ����� 5������, 20190918.
 * ���� ����� ���� �޽��� ��� �� �������� �̵�
-------------------------------------------------------------------- */
function fnCommon_SessionExpired() {
	alert("�̿�ð��� �ʰ��Ǿ��ų� ��Ʈ��ũ ������\n������ ���������� ��ҵǾ����ϴ�.\n�ٽ� �������ּ���.");
	// loanRenwal4.js�� �Լ� ȣ��
	fnCommon_goHome();
}


/* --------------------------------------------------------------------
	iajax ������ ���� parameter �߰�
-------------------------------------------------------------------- */
function fnCommon_partnerData(){
	if( !fnCommon_isNull(ref)  &&  ref == "partner" ){
		if( !fnCommon_isNull(iajax) ){
			iajax.addParam("AD_SR", sr);		// ����ڵ� 1(�⺻�ڵ� ����ó)
			iajax.addParam("AD_SN", sn);		// ����ڵ� 2(�����ڻ�� �����ڵ�)
			iajax.addParam("AD_SC", sc);		// ����ڵ� 3(������� �����ڵ�)
			iajax.addParam("AD_SE", se);		// ����ڵ� 4(��Ÿ)

			iajax.addParam("AD_UTM_SOURCE", utmSource);			// ���Լҽ�
			iajax.addParam("AD_UTM_MEDIUM", utmMedium);			// �����ü
			iajax.addParam("AD_UTM_CAMPAIGN", utmCampaign);		// ķ���� ����
			iajax.addParam("AD_UTM_TERM", utmTerm);				// Ű����
			iajax.addParam("AD_UTM_CONTENT", utmContent);		// ������ ����

			iajax.addParam("DOWN_GB_NM", sr);

			iajax.addParam("SUGGR_DISTG_NO", suggrDistgNo);		// �����ڽĺ���ȣ
		}
	}
}

/* --------------------------------------------------------------------
	�ֹε�Ϲ�ȣ ���ڸ� ���� �̺�Ʈ
-------------------------------------------------------------------- */
function fnCommon_keyup_residNo2(authType){

	var res1 = "";
	var res2 = "";
	if( authType == "xe" ){
		res1 = $("#offi_residNo_1").val();
		res2 = $("#offi_residNo_2").val();
	}else if( authType == "hn" ){
		res1 = $("#mobile_residNo_1").val();
		res2 = $("#mobile_residNo_2").val();
	}else if( authType == "ca" ){
		res1 = $("#credit_residNo_1").val();
		res2 = $("#credit_residNo_2").val();
	}

	if( res2.length == 7 ){
		fn_res_Confirm(res1, res2);
	}
}


/* --------------------------------------------------------------------
	ī���ȣ ���ڸ� �Է� �̺�Ʈ
-------------------------------------------------------------------- */
function fnCommon_keyup_etc(authType){

	var res = "";
	if( authType == "card" ){
		res = $("#card_no").val();
	}

	if( res.length >= 6 ){
		fn_etc_Confirm(res);
	}

}


/* --------------------------------------------------------------------
	�޴������� ��ȿ��üũ ���(2101/2115)
-------------------------------------------------------------------- */
function fnCommon_Cert_phone_valid(type){

	// ���뺯���� �̸�, �ڵ�����ȣ ����
	$("#cert_custNm").val($("#mobile_custNm").val());
	$("#cert_hndNo").val($("#mobile_hndNo").val());
	var cert_custNm = $("#cert_custNm").val();
	var cert_hndNo = $("#cert_hndNo").val();
	var telecom = $("#telecom option:selected").val();
	var resid_no1 = $("#mobile_residNo_1").val();
	var resid_no2 = $("#mobile_residNo_2").val();

	// �̸�
	if( fnCommon_isNull(cert_custNm) ){
		alert("�̸��� �Է����ּ���.");
		$("#mobile_custNm").focus();
		return false;
	}

	// �ֹε�Ϲ�ȣ
	if( fnCommon_isNull(resid_no1)  ||  resid_no1.length < 6 ){
		alert("�ֹε�Ϲ�ȣ ���ڸ� 6�ڸ��� �Է����ּ���.");
		$("#mobile_residNo_1").focus();
		return false;
	}
	if( fnCommon_isNull(resid_no2)  ||  resid_no2.length < 7 ){
		alert("�ֹε�Ϲ�ȣ ���ڸ� 7�ڸ��� �Է����ּ���.");
		$("#mobile_residNo_2").focus();
		return false;
	}

	// ��Ż�
	if(telecom =="0" ){
		alert("��Ż縦 �������ּ���.");
		$("#telecom").focus();
		return false;
	}

	// �޴�����ȣ
	if( fnCommon_isNull(cert_hndNo) ){
		alert("�޴�����ȣ�� �Է����ּ���.");
		$("#mobile_hndNo").focus();
		return false;
	}

	var allChk_mobile = $("#allChk_mobile")[0].checked;
	if( !allChk_mobile ){
		alert("�޴��� �������� ��ü���Ƿ� �����Ͻ� �� �������ּ���.");
		return false;
	}

	if( !fnCommon_isNull(type) ){

		// �Էµ� ������ȣ ����
		if(type == "valid"){
			var aut_auth_no = $("#aut_auth_no").val();
			if( fnCommon_isNull(aut_auth_no) ){
				alert("������ �Ϸ���� �ʾҽ��ϴ�.\n������û �� ������ȣ�� �Է����ּ���.");
				return false;
			}
		}
	}

	return true;
}

/* --------------------------------------------------------------------
	�ſ�ī�� �������� ���(2115)
-------------------------------------------------------------------- */
function fnCommon_Credit_Term(type) {

	var cardcode = $("#credit_code").val();
	if (!cardcode) {
		alert("ī��縦 �������ּ���.");
		$("#credit_code").focus();

	} else {
		var url = "";

		if(type == "cardService") {	// ī��� ���� �̿���
			url = "https://ssl.daoupay.com/cardCertify/DaouCardCertifyAgreementCardService.jsp";
		} else if (type == "cert") {	// ����Ȯ�� ���� �̿���
			url = "https://ssl.daoupay.com/cardCertify/DaouCardCertifyAgreementCert.jsp";
		} else if (type == "personalInf") {	// �������� ���� �� �̿뵿��
			url = "https://ssl.daoupay.com/cardCertify/DaouCardCertifyAgreementPersonalInfo.jsp";
		} else if (type == "identityInf") {	// �����ĺ����� ó������
			url = "https://ssl.daoupay.com/cardCertify/DaouCardCertifyAgreementIdentityInfo.jsp";
		}


		if (type != "cert") {
			url += "?CARDCODE=" + cardcode;
		}

		window.open(url, type + "_" + cardcode, "width=800,height=500,toolbar=no,menubar=no,location=no,scrollbars=yes,status=no,top=170,left=260");
	}
}


/* ------------------------------------------------------------------------------
   ������ Question Mark �˾� �̺�Ʈ
------------------------------------------------------------------------------- */
function alertGrtFeeGuide() {
	var guideTxt = "�޻���� ���κ�����ǰ���� ����ݾװ� ����Ⱓ�� ���� ��2% ������(��ȸ������������ ��� ��1% ����)�� �߻��Ͽ�, ������� �� ����ݾ׿��� �����ϰ� �۱ݵ˴ϴ�.";
	alert(guideTxt);			
}
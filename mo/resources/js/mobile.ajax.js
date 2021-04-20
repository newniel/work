$(document).bind("mobileinit", function(){
	$.mobile.ajaxLinksEnabled = false;
	$.mobile.ajaxFormsEnabled = false;
	$.mobile.ajaxEnabled = false;
	$.support.touchOverflow = true;
	$.mobile.touchOverflowEnabled = true;

	$.mobile.loader.prototype.options.text = "";
	$.mobile.loader.prototype.options.textVisible = false;
	$.mobile.loader.prototype.options.textonly = false;
	//$.mobile.loader.prototype.options.theme = "a";
	//$.mobile.loader.prototype.options.html = "";
	
	//$.mobile.page.prototype.options.degradeInputs.search = false;
	//$.mobile.pushStateEnabled = false;
	
	//$.mobile.loading('fakeFixLoader');
	$(document).ajaxStart(function(){
		//$.mobile.loading('show');
		
		$(".ajax-loading-area").css("display", "block");
		$(".ui-loader-background").css("display", "block");
//		$(document).bind("touchmove", function(event){
//			event.preventDefault();
//		});
	});
	
	$(document).ajaxStop(function(){
		//$.mobile.loading('hide');
		$(".ajax-loading-area").css("display", "none");
		$(".ui-loader-background").css("display", "none");
//		$(document).unbind("touchmove");
	});
	
});
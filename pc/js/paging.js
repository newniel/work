pagingView = function(options) {
				
				 var startIndex = options.startIndex;
				 var pagingHTML 		= "";
				 var list_function = options.func;//리스트 호출에 사용할 함수
				 var page 			= parseInt(Number(options.page)); // 현재 페이지
				 
				 var totalCount		 = parseInt(Number(options.total)); //실제 데이터 총 갯수
				 
				 var pageBlock		 = parseInt(Number(options.view)); //화면에 보여질 전체 갯수
				 
				 var navigatorNum    = 10; // 그룹 번호 갯수

				 var firstPageNum	 = 1;
				 
				 var lastPageNum		 = Math.floor((totalCount-1)/pageBlock) + 1;

				 var previewPageNum  = page == 1 ? 1 : page-1;

				 var nextPageNum		 = page == lastPageNum ? lastPageNum : page+1;

				 var indexNum		 = startIndex <= navigatorNum  ? 0 : parseInt((startIndex-1)/navigatorNum) * navigatorNum;
				 if (totalCount > 1) {
					 //pagingHTML+= "<p>";

					 if (startIndex > 1) {
						 pagingHTML += "<a href='#' onclick='"+list_function+"("+firstPageNum+")'><img src=\"/images/paging/paging_left1.png\" alt=\"맨앞으로\" /></a> "; 
//						 pagingHTML += "<a class='btn_first disabled' href='#' id='"+firstPageNum+"'><em>Go First</em></a> ";
						 pagingHTML += "<a href='#' onclick='"+list_function+"("+previewPageNum+")'><img src=\"/images/paging/paging_left2.png\" alt=\"이전\" /></a> ";
//						 pagingHTML += "<a class='btn_prev disabled' href='#' id='"+previewPageNum+"'><em>Preview</em></a> ";
					 }else{
						 pagingHTML += "<a><img src=\"/images/paging/paging_left1.png\" alt=\"맨앞으로\" /></a> "; 
//						 pagingHTML += "<a class='btn_first disabled' href='#' id='"+firstPageNum+"'><em>Go First</em></a> ";
						 pagingHTML += "<a><img src=\"/images/paging/paging_left2.png\" alt=\"이전\" /></a> ";
//						 pagingHTML += "<a class='btn_prev disabled' href='#' id='"+previewPageNum+"'><em>Preview</em></a> ";
					 }
					 //pagingHTML += "<span class=num01>";
					 for (var i=1; i<=navigatorNum; i++) {

						 var pageNum = i + indexNum;

						 if (pageNum == startIndex) 

							 pagingHTML += "<strong>"+pageNum+"</strong>&nbsp;&nbsp;";

						 else 

							 pagingHTML += "<a href='#' onclick='"+list_function+"("+pageNum+")'>"+pageNum+"</a>&nbsp;&nbsp;";

						 if (pageNum==lastPageNum)

							 break;

					 }
					 //pagingHTML += "</span>";
					 

					 if (startIndex < lastPageNum) {
						 pagingHTML += "<a href='#' onclick='"+list_function+"("+nextPageNum+")'><img src=\"/images/paging/paging_right2.png\" alt=\"다음\" /></a> ";
//						 pagingHTML += "<a class='btn_next' href='#' id='"+nextPageNum+"'><em>Next</em></a> ";
						 pagingHTML += "<a href='#' onclick='"+list_function+"("+lastPageNum+")'><img src=\"/images/paging/paging_right1.png\" alt=\"맨뒤로\" /></a>";
//						 pagingHTML += "<a class='btn_end' href='#' id='"+lastPageNum+"'><em>Go End</em></a>";

					 }else{
						 pagingHTML += "<a><img src=\"/images/paging/paging_right2.png\" alt=\"다음\" /></a> ";
//						 pagingHTML += "<a class='btn_next' href='#' id='"+nextPageNum+"'><em>Next</em></a> ";
						 pagingHTML += "<a><img src=\"/images/paging/paging_right1.png\" alt=\"맨뒤로\" /></a>";
//						 pagingHTML += "<a class='btn_end' href='#' id='"+lastPageNum+"'><em>Go End</em></a>";

					 }
				 }
				 $(".paging").html(pagingHTML);
			 };

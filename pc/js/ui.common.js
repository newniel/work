;(function($, win, doc, undefined) {
  
    $(doc).ready(function() {
        
        //��ũ�ѹ� ������
        $('.scrollbar-outer').scrollbar();
        
        //checkbox, radio ������
        $.each($('input[type=checkbox], input[type=radio]'), function(){
            var $t = $(this);
            $t.on('change', function(){
                var $tParent = $t.parent();
                if($t.is(':checked')) {
                    $tParent.addClass('checked');
                    
                    if($tParent.hasClass('styleRdo')) {
                        $tParent.siblings().removeClass('checked');
                    }
                } else {
                    $tParent.removeClass('checked');
                }
            });
        });

        // ���Ǽ� Ȯ�� ��ü����/��ü����
        $('.allChk').on('click', function() {
            var $input = $("input[name=agree_chk]");
            if($("#allCheck").prop("checked")){
                $input.prop("checked",true);
                $input.parent().addClass('checked');
            }else{
                $input.prop("checked",false);
                $input.parent().removeClass('checked');
            }
        });

        //���̾� �˾� â�ݱ�
        $('.layerPopup .btnClose').on('click', function(){
            $('.layerPopup').hide();
        });

        $('.agreeHeader .aTitle').on('click', function() {
            if($(this).parent().hasClass('open')) {
              $(this).parent().next().hide();
              $(this).parent().removeClass('open');
            }else {
              $(this).parent().addClass('open');
              $(this).parent().next().show();
            }
        });

        // ���Ǽ� ���� ��ü����
        var ctn = 0;
        $('.agreeViewHeader .btnView').on('click', function() {
            ctn++;
            if (ctn % 2 != 0) {
                $(".agreeViewBody").show();
            }else {
                $(".agreeViewBody").hide();
            }
        }); 

        // ��
        $('.styleTab li').on('click', function() {
            var tabCont = $(this).children().attr('href');
            $('.styleTab li').removeClass('active');
            $('.tabContent').removeClass('active');
            $(this).addClass('active');
            $(tabCont).addClass('active');
        }).first().trigger('click');
        
        // �ε��̹���
        loading.init();
    });
    
    var loading = {
        n: 0,
        target: null,
        intervalFn: function(){
            var t = this;
            var timer = setInterval(function(){
                t.target.css('background-position-y','-'+(100*t.n)+'px');
                if(9 === t.n) {
                    t.n = 1;
                } else {
                    t.n = t.n + 1;
                }
            },150);
        },
        init: function(){
            this.target =  $('.loadingImg');
            this.intervalFn();
        }
    };
})(jQuery, window, document);

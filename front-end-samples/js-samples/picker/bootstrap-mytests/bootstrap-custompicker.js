
(function( $ ){
    var activated;
    
    function customPicker(elt, options){
        var popupId = 'customPicker-popup';
        var popupClass = options.popupClass != undefined ? options.popupClass : '';
        var parentBlock = options.parentBlock != undefined ? options.parentBlock : $('body');
        var formUrl = options.formUrl != undefined ? options.formUrl : '';
        var formMethod = options.formMethod != undefined ? options.formMethod : 'GET';
        var submitText = options.submitText != undefined ? options.submitText : 'Enregistrer';
        var cancelText = options.cancelText != undefined ? options.cancelText : 'Annuler';
        var submitClass = options.submitClass != undefined ? options.submitClass : 'btn-success';
        var cancelClass = options.cancelClass != undefined ? options.cancelClass : '';
        var leftOffset = options.leftOffset != undefined ? options.leftOffset : 0;
        var topOffset = options.topOffset != undefined ? options.topOffset : 0;
        var formContent = options.formContent != undefined ? options.formContent : '<textarea></textarea><br/>';
        var onShow = options.onShow != undefined ? options.onShow : function(popup){};
        var onHide = options.onHide != undefined ? options.onHide : function(popup){};
        
        if($('#'+popupId).length==0){
            $('body').append('<div class="dropdown-menu custompicker-popup '+popupClass+'" id="'+popupId+'">'
                +'<form style="margin: 0px;">'
                    +'<div class="content">'
                    +'</div>'
                    +'<div class="pull-right">'
                        +'<input type="button" />'
                        +'<input type="submit" style="margin-left: 5px;" />'
                    +'</div>'
                +'</form>'
            +'</div>');
            
            $('#'+popupId+' input[type="button"]').click(function(){
                var popup = $(this).parents('#'+popupId);
                popup.hide();
                if(activated != undefined){
                    activated.removeClass('active');
                    activated = undefined;
                }
                onHide(popup);
                return false;
            });
            
            $(document).on('mousedown', function (e) {
              if ($(e.target).closest('#'+popupId).length == 0) {
                var popup = $('#'+popupId);
                popup.hide();
                if(activated != undefined){
                    activated.removeClass('active');
                    activated = undefined;
                }
                onHide(popup);
              }
            });
        }
        
        var thisOffset = elt.offset();
        elt.on('click', function(){
            if(activated != undefined){
                activated.removeClass('active');
            }
            activated = $(this);
            activated.addClass('active');
            var popup = $('#'+popupId);
            popup.find('form').attr('action', formUrl).attr('method', formMethod);
            popup.find('.content').html(formContent);
            popup.find('input[type="submit"]').attr('value', submitText).removeClass().addClass('btn btn-small '+submitClass);
            popup.find('input[type="button"]').attr('value', cancelText).removeClass().addClass('btn btn-small '+cancelClass);
            
            var rigthOffset = eval(thisOffset.left+popup.outerWidth()+leftOffset);
            var maxOffset = parentBlock.outerWidth() + parentBlock.offset().left;
            if(rigthOffset < maxOffset){ // align left
                popup.removeClass('right').css('left', thisOffset.left + leftOffset + 'px');
            } else { // align right
                popup.addClass('right').css('left', thisOffset.left - popup.outerWidth() + elt.outerWidth() - leftOffset + 'px');
            }
            popup.css('position', 'absolute').css('top', thisOffset.top + elt.outerHeight() + topOffset + 6 + 'px').show();
            
            onShow(popup);
            
            return false;
        });
    }
    
    $.fn.customPicker = function( options ) {
        customPicker(this, options);
    };
})( jQuery );
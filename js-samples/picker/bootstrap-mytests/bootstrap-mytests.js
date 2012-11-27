
(function( $ ){
    var activated;
    
    function commentPicker(elt, options){
        var popupId = 'commentpicker-popup';
        var popupClass = options.popupClass != undefined ? options.popupClass : '';
        var parentBlock = options.parentBlock != undefined ? options.parentBlock : $('body');
        var formUrl = options.formUrl != undefined ? options.formUrl : '';
        var formMethod = options.formMethod != undefined ? options.formMethod : 'GET';
        var textFieldName = options.textFieldName != undefined ? options.textFieldName : 'comment';
        var placeholderFieldName = options.placeholderFieldName != undefined ? options.placeholderFieldName : '';
        var submitText = options.submitText != undefined ? options.submitText : 'Enregistrer';
        var cancelText = options.cancelText != undefined ? options.cancelText : 'Annuler';
        var submitClass = options.submitClass != undefined ? options.submitClass : 'btn-success';
        var cancelClass = options.cancelClass != undefined ? options.cancelClass : '';
        var leftOffset = options.leftOffset != undefined ? options.leftOffset : 0;
        var topOffset = options.topOffset != undefined ? options.topOffset : 0;
        
        if($('#'+popupId).length==0){
            $('body').append('<div class="dropdown-menu custompicker-popup '+popupClass+'" id="'+popupId+'">'
                +'<form style="margin: 0px;">'
                    +'<textarea></textarea><br/>'
                    +'<div class="pull-right">'
                        +'<input type="button" />'
                        +'<input type="submit" style="margin-left: 5px;" />'
                    +'</div>'
                +'</form>'
            +'</div>');
            
            $('#'+popupId+' input[type="button"]').click(function(){
                $(this).parents('#'+popupId).hide();
                if(activated != undefined){
                    activated.removeClass('active');
                    activated = undefined;
                }
                return false;
            });
            $(document).on('mousedown', function (e) {
              if ($(e.target).closest('#'+popupId).length == 0) {
                $('#'+popupId).hide();
                if(activated != undefined){
                    activated.removeClass('active');
                    activated = undefined;
                }
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
            popup.find('textarea').attr('name', textFieldName).attr('placeholder', placeholderFieldName).val('');
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
            
            popup.find('textarea').focus();
            return false;
        });
    }
    
    $.fn.commentpicker = function( options ) {
        commentPicker(this, options);
    };
})( jQuery );
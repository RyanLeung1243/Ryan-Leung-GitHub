
$('.searchlight')
.on('mousemove', function(e) {
        $(this).addClass('on').css({'margin-left': event.pageX - 150, 'margin-top': event.pageY - 150});
    })
    // .on('mouseout', function(e) {
    //     $(this).removeClass('on').pointerEvent();
    // })
    .on('click', function() {
        $(this).fadeOut(function() {
            $(this).remove();
        });
    })
;


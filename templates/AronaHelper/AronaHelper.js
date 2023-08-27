var arona = $(".AronaHelper")

$(function () {
    var isDragging = false;
    var startPosition;

    $(arona).mousedown(function (e) {
        isDragging = true;
        startPosition = {
            x: e.clientX,
            y: e.clientY
        };
    });

    $(document).mouseup(function() {
        if (isDragging) {
          isDragging = false;
          var currentPos = $("#draggableDiv").position();
          var bottomPos = Math.max($(window).height() - $("#draggableDiv").outerHeight(), $(document).height() - $("#draggableDiv").outerHeight());

          // Animate the div falling to the higher position
          $("#draggableDiv").animate({
            top: bottomPos,
            left: currentPos.left
          }, 500);
        }
      });

    $(document).mousemove(function (e) {
        if (isDragging) {
            var deltaX = e.clientX - startPosition.x;
            var deltaY = e.clientY - startPosition.y;
            var currentPos = $(arona).position();

            // Update the position of the draggable div
            $(arona).css({
                top: currentPos.top + deltaY,
                left: currentPos.left + deltaX
            });

            startPosition = {
                x: e.clientX,
                y: e.clientY
            };
        }
    });
})
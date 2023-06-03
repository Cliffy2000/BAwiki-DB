$(function () {
    var secondary = $(".studentProfileBasicInfoWrapper .varSecondary").text().toLowerCase();
    if (secondary === 'true') {
        $(".studentProfileBasicInfoWrapper .portraitButton").hide();
        $(".studentProfileBasicInfoWrapper .portraitChangeButton").show();
        $(".studentProfileBasicInfoWrapper .portraitChangeButton").css("border-bottom", "2px solid black");
    } else {
        $(".studentProfileBasicInfoWrapper .portraitButton").css("border-bottom", "2px solid black");
    }

    $(".studentProfileBasicInfoWrapper").on("click", ".portraitChangeButton", function () {
        let first = $(".studentProfileBasicInfoWrapper .portrait").is(':visible');
        $(".studentProfileBasicInfoWrapper .poster").each(function () {
            $(this).hide();
        })
        if (first) {
            $(".studentProfileBasicInfoWrapper .portraitSecondary").show();
        } else {
            $(".studentProfileBasicInfoWrapper .portrait").show();
        }
        $(".studentProfileBasicInfoWrapper .posterSwapperButton").each(function () {
            $(this).css("border-bottom", "none");
        })
        $(this).css("border-bottom", "2px solid black");
    })


    $(".studentProfileBasicInfoWrapper").on("click", ".portraitButton", function () {
        $(".studentProfileBasicInfoWrapper .poster").each(function () {
            $(this).hide();
        })
        $(".studentProfileBasicInfoWrapper .portrait").show();

        $(".studentProfileBasicInfoWrapper .posterSwapperButton").each(function () {
            $(this).css("border-bottom", "none");
        })
        $(this).css("border-bottom", "2px solid black");
    });


    $(".studentProfileBasicInfoWrapper").on("click", ".lobbyButton", function () {
        $(".studentProfileBasicInfoWrapper .poster").each(function () {
            $(this).hide();
        })
        $(".studentProfileBasicInfoWrapper .lobby").show();

        $(".studentProfileBasicInfoWrapper .posterSwapperButton").each(function () {
            $(this).css("border-bottom", "none");
        })
        $(this).css("border-bottom", "2px solid black");
    });
})
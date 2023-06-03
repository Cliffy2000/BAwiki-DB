$(function () {
    $(".studentProfileSkillExWrapper").on("click", ".skillLvButton", function () {
        var lv = parseInt($(this).text());
        $(".studentProfileSkillExWrapper .skillCost").text(
            "Cost: " + skillExCosts[lv - 1]
        );
        $(".studentProfileSkillExWrapper .skillCurrentLv").text("Lv. " + lv);

        $(".studentProfileSkillExWrapper .skillLvButton").css("opacity", 1);
        $(this).css("opacity", 0);

        $(".studentProfileSkillExWrapper .skillText").text(skillExDescriptions[lv - 1]);

        if (lv === 5) {
            $(".studentProfileSkillExWrapper .skillMaterialTitle").text("满级所需素材");
        } else {
            $(".studentProfileSkillExWrapper .skillMaterialTitle").text("升至下级所需素材");
        }

        if ($(".studentProfileSkillExWrapper .grid-container:visible").length > 0) {
            // only switch tables if the table is originally visible
            renderBdMaterialTable(lv);
        }
    });

    $(".studentProfileSkillExWrapper").on("click", ".skillMaterialButton", function () {
        if ($(".studentProfileSkillExWrapper .grid-container:visible").length > 0) {
            // only switch tables if the table is originally visible
            $(".studentProfileSkillExWrapper .grid-container").hide();
            $(".studentProfileSkillExWrapper .skillMaterialButton").html(`<img src=${expand}>`);
        } else {
            let currentLv = parseInt($(".studentProfileSkillExWrapper .skillCurrentLv").text().split(".")[1]);
            renderBdMaterialTable(currentLv);
            $(".studentProfileSkillExWrapper .grid-container").show();
            $(".studentProfileSkillExWrapper .skillMaterialButton").html(`<img src=${collapse}>`);
        }
    });
})
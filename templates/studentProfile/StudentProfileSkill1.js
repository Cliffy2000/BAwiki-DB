$(function () {
    $(".studentProfileSkill1Wrapper").on("click", ".skillLvButton", function () {
		var lv = parseInt($(this).text());
		$(".studentProfileSkill1Wrapper .skillCurrentLv").text("Lv. " + lv);

		$(".studentProfileSkill1Wrapper .skillLvButton").css("opacity", 1);
		$(this).css("opacity", 0);

		$(".studentProfileSkill1Wrapper .skillText").text(skill1Descriptions[lv - 1]);

        if (lv === 10) {
            $(".studentProfileSkill1Wrapper .skillMaterialTitle").text("满级所需素材");
        } else {
            $(".studentProfileSkill1Wrapper .skillMaterialTitle").text("升至下级所需素材");
        }

		if ($(".studentProfileSkill1Wrapper .grid-container:visible").length > 0) {
			// only switch tables if the table is originally visible
			renderNotesMaterialTable(lv, "1");
		}
	});

	$(".studentProfileSkill1Wrapper").on("click", ".skillMaterialButton", function () {
		if ($(".studentProfileSkill1Wrapper .grid-container:visible").length > 0) {
			// only switch tables if the table is originally visible
			$(".studentProfileSkill1Wrapper .grid-container").hide();
			$(".studentProfileSkill1Wrapper .skillMaterialButton").html(`<img src=${expand}>`);
		} else {
			let currentLv = parseInt($(".studentProfileSkill1Wrapper .skillCurrentLv").text().split(".")[1]);
			renderNotesMaterialTable(currentLv, "1");
			$(".studentProfileSkill1Wrapper .grid-container").show();
			$(".studentProfileSkill1Wrapper .skillMaterialButton").html(`<img src=${collapse}>`);
		}
	});
})
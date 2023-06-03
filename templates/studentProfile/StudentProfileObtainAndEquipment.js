$(function () {
    $(".studentProfileObtainAndEquipmentWrapper").on("click", ".equipmentTierButton", function () {
        let tier = $(this).text();
        let newText = "T" + tier;

        $(".studentProfileObtainAndEquipmentWrapper .equipmentCurrentTier").text("T " + $(this).text());

        renderEquipmentTable(tier);

        $(".studentProfileObtainAndEquipmentWrapper .equipmentTierButton").each(function () {
            $(this).css("opacity", 1);
        });
        $(this).css("opacity", 0);
    });
})
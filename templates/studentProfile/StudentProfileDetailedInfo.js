$(function () {
    if ($(".studentProfileDetailedInfoWrapper #teamType").text().replace(/\s+/g, "").toLowerCase() === "striker") $("#teamType").css("color", "#dd2400");
    else if ($(".studentProfileDetailedInfoWrapper #teamType").text().replace(/\s+/g, "").toLowerCase() === "special") $("#teamType").css("color", "#007fff");

    let roles = {
        "攻击手": {
            "en": "Attacker",
            "img": "https://patchwiki.biligame.com/images/ba/d/da/ct6rp5r8ndtf3xvjkqyy57owzr4m81o.png"
        },
        "治疗手": {
            "en": "Healer",
            "img": "https://patchwiki.biligame.com/images/ba/c/c6/k3dpia4w63oeooylw1ha9wlbdtck2w5.png"
        },
        "支援手": {
            "en": "Supporter",
            "img": "https://patchwiki.biligame.com/images/ba/4/44/ka78ajvsxag70dqcapuy079ht6kw4fj.png"
        },
        "战术支援": {
            "en": "Tactical Support",
            "img": "https://patchwiki.biligame.com/images/ba/0/04/1h2wk5iih6rbljv7my250mqkzdx5pvk.png"
        },
        "坦克": {
            "en": "Tank",
            "img": "https://patchwiki.biligame.com/images/ba/6/69/enk0rd5di7f21kla2eafntx24g4knmj.png"
        }
    };

    let role = $("#role").text().replace(/\s+/g, "");
    $(".studentProfileDetailedInfoWrapper #roleIcon").html(`<img src=${roles[role]["img"]}>`);

    let attackTypeHtml = $("#attackType");
    let defenseTypeHtml = $("#defenseType");
    let attackType = attackTypeHtml.text().replace(/\s+/g, "");
    let defenseType = defenseTypeHtml.text().replace(/\s+/g, "");

    if (attackType === "爆炸") attackTypeHtml.css("color", "#8b0000");
    else if (attackType === "贯通") attackTypeHtml.css("color", "#b8860b");
    else if (attackType === "神秘") attackTypeHtml.css("color", "#4682b4");
    else if (attackType === "振动") attackTypeHtml.css("color", "#9932cc");

    if (defenseType === "轻装") defenseTypeHtml.css("color", "#8b0000");
    else if (defenseType === "重装甲") defenseTypeHtml.css("color", "#b8860b");
    else if (defenseType === "特殊装甲") defenseTypeHtml.css("color", "#4682b4");
    else if (defenseType === "弹力装甲") defenseTypeHtml.css("color", "#9932cc");

    let area = $(".studentProfileDetailedInfoWrapper .enhancedArea").text();
    let areas = {
        "市街": "Street",
        "室外": "Outdoor",
        "室内": "Indoor"
    };
    $(`.studentProfileDetailedInfoWrapper .enhanced${areas[area]}`).show();
})
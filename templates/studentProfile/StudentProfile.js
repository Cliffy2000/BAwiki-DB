var globalEquipmentData;
var globalSkillMatData;

var equipment1;
var equipment2;
var equipment3;

var school;
var skillExCosts;
var skillExDescriptions;
var skillMainMaterial;
var skillSecondaryMaterial;
var skillExMainMaterialCount;
var skillExSecondaryMaterialCount;
var skill1Descriptions;
var skill2Descriptions;
var skill3Descriptions;
var skillNormMainMaterialCount;
var skillNormSecondaryMaterialCount;

var expand = "https://patchwiki.biligame.com/images/ba/6/6d/aeaxgam3zgxt1rd2dai4fwm7w9j3afg.png";
var collapse = "https://patchwiki.biligame.com/images/ba/a/ab/sx7xuyqdsn0np11g07w3gz9crka59pr.png";


$(function() {
	if (document.querySelector('.StudentProfile')) {
		$("#firstHeading").css("display", "none");
		$("#biliContributors").css("display", "none");
	}
	
    equipment1 = $(
		".studentProfileObtainAndEquipmentWrapper .equipment1"
	).text();
    
    equipment2 = $(
		".studentProfileObtainAndEquipmentWrapper .equipment2"
	).text();
    equipment3 = $(
		".studentProfileObtainAndEquipmentWrapper .equipment3"
	).text();

	$.ajax({
        url: 'https://wiki.biligame.com/ba/index.php?title=MediaWiki:Equipments.json&action=raw',
        dataType: "text",
        success: function(data) {
            globalEquipmentData = JSON.parse(data);
            renderEquipmentTable("1");
        },
        error: function() {
            console.log("error");
        }
    });
	


    // ======================== 
    //       Skill Panels
    // ========================

    schoolData = {
        "阿拜多斯高等学校": "Abydos",
        "阿里乌斯分校": "Arius",
        "格黑娜学园": "Gehenna",
        "百鬼夜行联合学园": "Hyakkiyako",
        "千年科学学校": "Millennium",
        "红冬联邦学园": "RedWinter",
        "山海经高级中学": "Shanhaijing",
        "圣三一综合学园": "Trinity",
        "瓦尔基里警察学校": "Valkyrie",
        "SRT特殊学园": "Valkyrie"
    }

    school = schoolData[$(".studentProfileSkillExWrapper .variables .school").text()];
    skillExCosts = $(".studentProfileSkillExWrapper .variables .costs").text().split("$").map((str) => str.trim());
	skillExDescriptions = $(".studentProfileSkillExWrapper .variables .descriptions")
		.text()
		.split("$")
		.map((str) => str.trim());

	skillMainMaterial = $(
		".studentProfileSkillExWrapper .variables .mainMaterial"
	).text();
    skillExMainMaterialCount = $(
		".studentProfileSkillExWrapper .variables .mainMaterialCount"
	).text().split("$").map((str) => str.trim());
	skillSecondaryMaterial = $(
		".studentProfileSkillExWrapper .variables .secondaryMaterial"
	).text();
    skillExSecondaryMaterialCount = $(
		".studentProfileSkillExWrapper .variables .secondaryMaterialCount"
	).text().split("$").map((str) => str.trim());

    skill1Descriptions = $(".studentProfileSkill1Wrapper .variables .descriptions")
		.text()
		.split("$")
		.map((str) => str.trim());
    skill2Descriptions = $(".studentProfileSkill2Wrapper .variables .descriptions")
		.text()
		.split("$")
		.map((str) => str.trim());
    skill3Descriptions = $(".studentProfileSkill3Wrapper .variables .descriptions")
		.text()
		.split("$")
		.map((str) => str.trim());


    skillNormMainMaterialCount = $(
		".studentProfileSkill1Wrapper .variables .mainMaterialCount"
	).text().split("$").map((str) => str.trim());
    skillNormSecondaryMaterialCount = $(
		".studentProfileSkill1Wrapper .variables .secondaryMaterialCount"
	).text().split("$").map((str) => str.trim());


	$.ajax({
        url: 'https://wiki.biligame.com/ba/index.php?title=MediaWiki:SkillMaterials.json&action=raw',
        dataType: "text",
        success: function(data) {
            globalSkillMatData = JSON.parse(data);

            renderBdMaterialTable(5);
            $(".studentProfileSkillExWrapper .skillText").text(skillExDescriptions[4]);
            $(".studentProfileSkillExWrapper .skillCost").text("Cost: " + skillExCosts[4]);

            renderNotesMaterialTable(10, "1");
            $(".studentProfileSkill1Wrapper .skillText").text(skill1Descriptions[9]);

            $(".studentProfileSkill2Wrapper .skillText").text(skill2Descriptions[9]);
            $(".studentProfileSkill2Wrapper .grid-container").hide();
            $(".studentProfileSkill3Wrapper .skillText").text(skill3Descriptions[9]);
            $(".studentProfileSkill3Wrapper .grid-container").hide();
        },
        error: function() {
            console.log("error");
        }
    });
})


async function renderEquipmentTable(tier) {
    let content = `<div class="equipmentLeftCol"></div>`;

    [equipment1, equipment2, equipment3].forEach(function(element) {
        let properties = ``;
        let actualTier = tier;
        if (!("8" in globalEquipmentData[element]) && tier === "8") actualTier = 7;
        globalEquipmentData[element][actualTier]["properties"].forEach(function(p) {
        	console.log(p);
            properties += `<p style="font-size: 12px; font-weight: bold">${p}</p>`;
        })
        content += `
            <div class="equipmentTableCol">
                <img class="equipmentIcon" src="${globalEquipmentData[element][actualTier]['img']}">
                <p class="equipmentName">${globalEquipmentData[element][actualTier]['cn']}</p>
                ${properties}
            </div>
        `;
    });

    content += `<div class="equipmentRightCol"></div>`;

    $(".studentProfileObtainAndEquipmentWrapper .equipmentSecondRow").html(content);
}


async function renderBdMaterialTable(lv) {
	let content = "";
	let fixedCountMain = [12, 12, 12, 8];
	let fixedTotal = [30, 30, 30, 8];
    let credits = ["80,000", "500,000", "3,000,000", "10,000,000", "13,580,000"];

	if (lv === 1) {
		content += materialElement(globalSkillMatData[school]["Bd"]["1"]["img"], 1, 12, globalSkillMatData[school]["Bd"]["1"]["cn"]);
		content += materialElement(globalSkillMatData[skillMainMaterial]["1"]["img"], 1, skillExMainMaterialCount[0], globalSkillMatData[skillMainMaterial]["1"]["cn"]);
	} else if (lv >= 2 && lv <= 4) {
		content += materialElement(globalSkillMatData[school]["Bd"][lv.toString()]["img"], lv, fixedCountMain[lv-1], globalSkillMatData[school]["Bd"][lv.toString()]["cn"]);
		content += materialElement(globalSkillMatData[school]["Bd"][(lv-1).toString()]["img"], lv-1, 18, globalSkillMatData[school]["Bd"][(lv-1).toString()]["cn"]);
		content += materialElement(globalSkillMatData[skillMainMaterial][lv.toString()]["img"], lv, skillExMainMaterialCount[lv-1], globalSkillMatData[skillMainMaterial][lv.toString()]["cn"]);
		content += materialElement(globalSkillMatData[skillSecondaryMaterial][(lv-1).toString()]["img"], lv-1, skillExSecondaryMaterialCount[lv-2], globalSkillMatData[skillSecondaryMaterial][(lv-1).toString()]["cn"]);
	} else {
		// Do not combine! this is for html order.
		for (let i=4; i>=1; i--) {
			content += materialElement(globalSkillMatData[school]['Bd'][i.toString()]["img"], i, fixedTotal[i-1], globalSkillMatData[school]['Bd'][i.toString()]["cn"]);
		}
        
        if (skillMainMaterial === skillSecondaryMaterial) {
            content += materialElement(globalSkillMatData[skillMainMaterial]["4"]["img"], 4, skillExMainMaterialCount[3], globalSkillMatData[skillMainMaterial]["4"]["cn"]);
            for (let i=3; i>=1; i--) {
                content += materialElement(globalSkillMatData[skillMainMaterial][i.toString()]["img"], i, (parseInt(skillExMainMaterialCount[i-1]) + parseInt(skillExSecondaryMaterialCount[i-1])).toString(), globalSkillMatData[skillMainMaterial][i.toString()]["cn"]);
            }
        }
        else {
            for (let i=4; i>=1; i--) {
                content += materialElement(globalSkillMatData[skillMainMaterial][i.toString()]["img"], i, skillExMainMaterialCount[i-1], globalSkillMatData[skillMainMaterial][i.toString()]["cn"]);
            }
            for (let i=3; i>=1; i--) {
                content += materialElement(globalSkillMatData[skillSecondaryMaterial][i.toString()]["img"], i, skillExSecondaryMaterialCount[i-1], globalSkillMatData[skillSecondaryMaterial][i.toString()]["cn"]);
            }
        }
	}

	content += creditElement(credits[lv - 1]);
	$(".studentProfileSkillExWrapper .grid-container").html(content);
}


async function renderNotesMaterialTable(lv, skillNum) {
    let content = "";
    let fixedCountMain = [5, 8, 5, 8, 5, 8, 8, 12];
    let fixedTotal = [25, 25, 25, 20];
    var credits = ["5000", "7500", "60,000", "90,000", "300,000", "450,000", "1,500,000", "2,400,000", "4,000,000", "8,812,500"];

    if (lv <= 2) {
        content += materialElement(globalSkillMatData[school]["Notes"]["1"]["img"], 1, fixedCountMain[lv-1], globalSkillMatData[school]["Notes"]["1"]["cn"]);
    } else if (lv <= 8) {
        let r = Math.floor((lv+1) / 2);
        let remainder = (lv-1) % 2;
        content += materialElement(globalSkillMatData[school]["Notes"][r.toString()]["img"], r, fixedCountMain[lv-1], globalSkillMatData[school]["Notes"][r.toString()]["cn"]);
        if (remainder == 1) {
            content += materialElement(globalSkillMatData[school]['Notes'][(r-1).toString()]["img"], r-1, 12, globalSkillMatData[school]['Notes'][(r-1).toString()]["cn"]);
        }

        if (lv === 3) {
            content += materialElement(globalSkillMatData[skillMainMaterial]["1"]["img"], 1, skillNormMainMaterialCount[0], globalSkillMatData[skillMainMaterial]["1"]["cn"]);
        } else if (lv === 4) {
            content += materialElement(globalSkillMatData[skillMainMaterial]["2"]["img"], 2, skillNormMainMaterialCount[1], globalSkillMatData[skillMainMaterial]["2"]["cn"]);
            content += materialElement(globalSkillMatData[skillSecondaryMaterial]["1"]["img"], 1, skillNormSecondaryMaterialCount[0], globalSkillMatData[skillSecondaryMaterial]["1"]["cn"]);
        } else if (lv === 5) {
            content += materialElement(globalSkillMatData[skillMainMaterial]["2"]["img"], 2, skillNormMainMaterialCount[2], globalSkillMatData[skillMainMaterial]["2"]["cn"]);
            content += materialElement(globalSkillMatData[skillSecondaryMaterial]["1"]["img"], 1, skillNormSecondaryMaterialCount[1], globalSkillMatData[skillSecondaryMaterial]["1"]["cn"]);
        } else if (lv === 6) {
            content += materialElement(globalSkillMatData[skillMainMaterial]["3"]["img"], 3, skillNormMainMaterialCount[3], globalSkillMatData[skillMainMaterial]["3"]["cn"]);
            content += materialElement(globalSkillMatData[skillSecondaryMaterial]["2"]["img"], 2, skillNormSecondaryMaterialCount[2], globalSkillMatData[skillSecondaryMaterial]["2"]["cn"]);
        } else if (lv === 7) {
            content += materialElement(globalSkillMatData[skillMainMaterial]["4"]["img"], 4, skillNormMainMaterialCount[4], globalSkillMatData[skillMainMaterial]["4"]["cn"]);
            content += materialElement(globalSkillMatData[skillSecondaryMaterial]["3"]["img"], 3, skillNormSecondaryMaterialCount[3], globalSkillMatData[skillSecondaryMaterial]["3"]["cn"]);
        } else if (lv === 8) {
            content += materialElement(globalSkillMatData[skillMainMaterial]["4"]["img"], 4, skillNormMainMaterialCount[5], globalSkillMatData[skillMainMaterial]["4"]["cn"]);
            content += materialElement(globalSkillMatData[skillSecondaryMaterial]["3"]["img"], 3, skillNormSecondaryMaterialCount[4], globalSkillMatData[skillSecondaryMaterial]["3"]["cn"]);
        }
    } else if (lv === 9) {
        content += materialElement(globalSkillMatData["SecretNotes"]["img"], 4, 1, globalSkillMatData["SecretNotes"]["cn"]);
    } else {
        for (let i=4; i>=1; i--) {
            content += materialElement(globalSkillMatData[school]["Notes"][i.toString()]["img"], i, fixedTotal[i-1], globalSkillMatData[school]["Notes"][i.toString()]["cn"]);
        }

        if (skillMainMaterial === skillSecondaryMaterial) {
            content += materialElement(globalSkillMatData[skillMainMaterial]["4"]["img"], 4, (parseInt(skillNormMainMaterialCount[4]) + parseInt(skillNormMainMaterialCount[5])).toString(), globalSkillMatData[skillMainMaterial]["4"]["cn"]);
            content += materialElement(globalSkillMatData[skillMainMaterial]["3"]["img"], 3, (parseInt(skillNormMainMaterialCount[3]) + parseInt(skillNormSecondaryMaterialCount[3]) + parseInt(skillNormSecondaryMaterialCount[4])).toString(), globalSkillMatData[skillMainMaterial]["3"]["cn"]);
            content += materialElement(globalSkillMatData[skillMainMaterial]["2"]["img"], 2, (parseInt(skillNormMainMaterialCount[1]) + parseInt(skillNormMainMaterialCount[2]) + parseInt(skillNormSecondaryMaterialCount[2])).toString(), globalSkillMatData[skillMainMaterial]["2"]["cn"]);
            content += materialElement(globalSkillMatData[skillMainMaterial]["1"]["img"], 1, (parseInt(skillNormMainMaterialCount[0]) + parseInt(skillNormSecondaryMaterialCount[0]) + parseInt(skillNormSecondaryMaterialCount[1])), globalSkillMatData[skillMainMaterial]["1"]["cn"]);
        }
        else {
            content += materialElement(globalSkillMatData[skillMainMaterial]["4"]["img"], 4, (parseInt(skillNormMainMaterialCount[4]) + parseInt(skillNormMainMaterialCount[5])).toString(), globalSkillMatData[skillMainMaterial]["4"]["cn"]);
            content += materialElement(globalSkillMatData[skillMainMaterial]["3"]["img"], 3, skillNormMainMaterialCount[3], globalSkillMatData[skillMainMaterial]["3"]["cn"]);
            content += materialElement(globalSkillMatData[skillMainMaterial]["2"]["img"], 2, (parseInt(skillNormMainMaterialCount[1]) + parseInt(skillNormMainMaterialCount[2])).toString(), globalSkillMatData[skillMainMaterial]["2"]["cn"]);
            content += materialElement(globalSkillMatData[skillMainMaterial]["1"]["img"], 1, skillNormMainMaterialCount[0], globalSkillMatData[skillMainMaterial]["1"]["cn"]);
    
            content += materialElement(globalSkillMatData[skillSecondaryMaterial]["3"]["img"], 3, (parseInt(skillNormSecondaryMaterialCount[3]) + parseInt(skillNormSecondaryMaterialCount[4])).toString(), globalSkillMatData[skillSecondaryMaterial]["3"]["cn"]);
            content += materialElement(globalSkillMatData[skillSecondaryMaterial]["2"]["img"], 2, skillNormSecondaryMaterialCount[2], globalSkillMatData[skillSecondaryMaterial]["2"]["cn"]);
            content += materialElement(globalSkillMatData[skillSecondaryMaterial]["1"]["img"], 1, (parseInt(skillNormSecondaryMaterialCount[0]) + parseInt(skillNormSecondaryMaterialCount[1])).toString(), globalSkillMatData[skillSecondaryMaterial]["1"]["cn"]);
    
        }

        content += materialElement(globalSkillMatData["SecretNotes"]["img"], 4, 1, globalSkillMatData["SecretNotes"]["cn"]);
    }

    content += creditElement(credits[lv - 1]);

    $(`.studentProfileSkill${skillNum}Wrapper .grid-container`).html(content);
}


function materialElement(materialImg, tier, count, text) {
    var colors = ["777777", "4682B4", "B8860B", "9932CC"];
    return `
    <div class="grid-item">
      <div class="skillMaterialItem">
        <img src=${materialImg}>
        <p style="color: #${colors[tier - 1]}; display: inline">${text}</p>
      </div>
      <p class="skillMaterialElementCount">x${count}</p>
    </div>
  `;
}

function creditElement(count) {
    return `
    <div class="grid-item" style="grid-column: 1 / span 4;">
      <div class="skillCredit">
        <img src="https://patchwiki.biligame.com/images/ba/a/af/q4sx2zu1w1pd1oktv4zama3j65kcnsy.png">
        <p class="creditText">${count}</p>
      </div>
    </div>
  `;
}
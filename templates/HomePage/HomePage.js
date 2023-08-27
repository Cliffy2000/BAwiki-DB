var homePageBgMain = "https://patchwiki.biligame.com/images/ba/3/35/k4yzucfsekwgdx17u0udbcomaih944q.png";
var homePageBgIntel = "https://patchwiki.biligame.com/images/ba/2/20/cmql470g6slo5y1g9bw8wf3fjzxslgu.png";
var homePageBgUpdates = "https://patchwiki.biligame.com/images/ba/7/75/2bf0wrdu0qb7zdu05ks023m43xsbfhf.png";
var homePageBgInfo = "https://patchwiki.biligame.com/images/ba/c/c0/r17i1ealif8m3bd327bwbdooj2922cm.png";
var homePageBgAbout = "https://patchwiki.biligame.com/images/ba/6/6f/p79fghlfrhyiosvisy6iq31e38j00jx.png";

var homePageInfo1 = "https://patchwiki.biligame.com/images/ba/d/d0/e6ou59p1lxwmma3zmutcsd6omkdl3th.png";
var homePageInfo2 = "https://patchwiki.biligame.com/images/ba/7/7a/gwbyaozb81e655aca0fuely7tzlpjwl.png";
var homePageInfo3 = "https://patchwiki.biligame.com/images/ba/a/aa/ct393ymyw54p10a38y6xrgli8bik3xt.png";
var homePageInfo4 = "https://patchwiki.biligame.com/images/ba/3/3b/hxe7svgis183pgdfa6gb0dvdu5za72x.png";

var homePageCycleLeft = "https://patchwiki.biligame.com/images/ba/a/ab/qzgmq4ahzcbl0x7c6o14rhwm94nmk6p.png";
var homePageCycleRight = "https://patchwiki.biligame.com/images/ba/9/93/fhsxemwmxcbms47kcxdd3j1yz0zca8g.png";
var homePageCycleSticker = "https://patchwiki.biligame.com/images/ba/8/88/1evbqv8ekjn0qe7s04jib0dii1640op.png";

var homePageCurrent = 0;
var homePageScrolling = false;

let serverList = ["jp", "in", "cn"];
let languageList = ["cn", "cnt", "en", "jp", "kr"];

let currentServer;
let currentLanguage;
try {
    currentServer = localStorage.getItem("BlueArchive-BWiki-ServerSelection");
    currentLanguage = localStorage.getItem("BlueArchive-BWiki-LanguageSelection");
} catch (e) {
    currentServer = "cn";
    currentLanguage = "cn";
}
if (!currentServer || !serverList.includes(currentServer)) currentServer = "cn";
if (!currentLanguage || !languageList.includes(currentLanguage)) currentLanguage = "cn";


$(function () {
    // ======== Home Page BWiki Variables ========
    let bwikiNumUsers = $(".variableNumUsers").text();
    let bwikiNumActiveUsers = $(".variableNumActiveUsers").text();
    let bwikiNumEdits = $(".variableNumEdits").text();
    let bwikiNumPages = $(".variableNumPages").text();

    let homePage;

    $.ajax({
        url: "https://wiki.biligame.com/ba/index.php?title=MediaWiki:HomePageDev.json&action=raw",
        dataType: "text",
        success: function(data) {
            let homePageData = JSON.parse(data);
            let currentEventCycle = homePageData["currentEventCycle"];
            let currentBannerCycle = homePageData["currentBannerCycle"];
            let bulletinBoard = homePageData["bulletinBoard"];
            let updatesCycle = homePageData["updatesCycle"];
             
            let counter;

            counter = 1;
            let homePageCurrentEventsContent = ``;
            currentEventCycle[currentServer].forEach(item => {
                let currentClass = "homePageEventCyclePage cyclePage" + counter;
                homePageCurrentEventsContent += `<div class="${currentClass}" data-start-time="${item['startTime']}" data-end-time="${item['endTime']}">
                    <img src="${item["src"]}">
                </div>`;
                counter += 1;
            });
            let homePageCurrentEvents = `<div class="homePageEventCyclePageContainer">
                ${homePageCurrentEventsContent}
            </div>`;

            counter = 1;
            let homePageCurrentBannersContent = ``;
            currentBannerCycle[currentServer].forEach(item => {
                let currentClass = "homePageEventCyclePage cyclePage" + counter;
                let jumpTo = ``;
                if (item["url"] !== "") {
                    jumpTo = `onclick="window.location='${item["url"]}';" style="cursor: pointer"`;
                }
                homePageCurrentBannersContent += `<div class="${currentClass}" data-start-time="${item['startTime']}" data-end-time="${item['endTime']}">
                    <img src="${item["src"]}" ${jumpTo}>
                </div>`;
                counter += 1;
            });
            let homePageCurrentBanners = `<div class="homePageEventCyclePageContainer">
                ${homePageCurrentBannersContent}
            </div>`;

            let homePageCurrentBulletinContent = ``;
            bulletinBoard[currentServer].forEach(item => {
                let type = item["type"].charAt(0).toUpperCase() + item["type"].slice(1).toLowerCase();
                let currentClass = "homePageBulletin bulletin" + type;
                let jumpTo = ``;
                if (item["url"] !== "") {
                    jumpTo = `onclick="window.location='${item["url"]}';" style="cursor: pointer"`;
                }
                homePageCurrentBulletinContent += `<div class="${currentClass}" data-end-time="${item["endTime"]}" ${jumpTo}>
                    <div class="homePageBulletinTitle">${item["title"]}</div>
                    <div class="homePageBulletinText">${item["text"]}</div>
                </div>`;
            });
            let homePageCurrentBulletin = `<div class="homePageBulletinContent">
                ${homePageCurrentBulletinContent}
            </div>`;

            counter = 1;
            let homePageLatestUpdatesContent = ``;
            updatesCycle[currentServer].forEach(item => {
                let jumpTo = ``;
                if (item["url"] !== "") {
                    jumpTo = `onclick="window.location='${item["url"]}';" style="cursor: pointer"`;
                }
                let currentClass = "homePageUpdatesCyclePage cyclePage" + counter;
                if (item["type"] === "comic") {
                    homePageLatestUpdatesContent += `<div class="${currentClass}" data-text="${item["text"]}" ${jumpTo}>
                        <img src="${item["src"]}">
                    </div>`;
                }

                else if (item["type"] === "video") {
                    homePageLatestUpdatesContent += `<div class="${currentClass}" data-text="${item["text"]}" ${jumpTo}>
                    <iframe scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" src="${item["src"]}" style="width: 400%;height:400%;transform: scale(0.25); transform-origin: 0 0;"></iframe>
                    </div>`;
                }

                counter += 1;
            });
            let homePageLatestUpdates = `<div class="homePageUpdatesCyclePageContainer">
                ${homePageLatestUpdatesContent}
            </div>`;

            homePage = `
                <div id="fullpage">
                    <div class="section" data-anchor="homePageSection1">
                        <img class="homePageSectionBackground" src=${homePageBgMain}>
                        <div class="homePageLeftNav">
                            <div class="homePageServerNav">
                                <div class="homePageServerNavContainer">
                                    <div class="homePageServerNavButton" data-server="jp">
                                        <div class="homePageServerNavText">
                                            日服
                                        </div>
                                    </div>
                                </div>
                                <div class="homePageServerNavContainer">
                                    <div class="homePageServerNavButton" data-server="in">
                                        <div class="homePageServerNavText">
                                            国际服
                                        </div>
                                    </div>
                                </div>
                                <div class="homePageServerNavContainer">
                                    <div class="homePageServerNavButton" data-server="cn">
                                        <div class="homePageServerNavText">
                                            国服
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="homePageLanguageNav">
                                <div class="homePageLanguageNavContainer">
                                    <div class="homePageLanguageNavButton" data-language="cn">
                                        <div class="homePageServerNavText">
                                            中文
                                        </div>
                                    </div>
                                </div>
                                <div class="homePageLanguageNavContainer">
                                    <div class="homePageLanguageNavButton" data-language="cn">
                                        <div class="homePageServerNavText">
                                            繁中
                                        </div>
                                    </div>
                                </div>
                                <div class="homePageLanguageNavContainer">
                                    <div class="homePageLanguageNavButton" data-language="cn">
                                        <div class="homePageServerNavText">
                                            English
                                        </div>
                                    </div>
                                </div>
                                <div class="homePageLanguageNavContainer">
                                    <div class="homePageLanguageNavButton" data-language="cn">
                                        <div class="homePageServerNavText">
                                            日语
                                        </div>
                                    </div>
                                </div>
                                <div class="homePageLanguageNavContainer">
                                    <div class="homePageLanguageNavButton" data-language="cn">
                                        <div class="homePageServerNavText">
                                            韩语
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section" data-anchor="homePageSection2">
                        <div class="homePage2">
                            <img class="homePageSectionBackground" src=${homePageBgIntel}>
                            <div class="homePageEventsCol1">
                                <div class="homePageWhiteContainer">
                                    <div class="homePageEventCycleContainer">
                                        ${homePageCurrentEvents}
                                        <div class="homePageEventCycleRemainingTime"></div>
                                        <div class="homePageEventCycleButtonLeft">
                                            <img src=${homePageCycleLeft}>
                                        </div>
                                        <div class="homePageEventCycleButtonRight">
                                            <img src=${homePageCycleRight}>
                                        </div>
                                        <div class="homePageEventCycleStickerContainer">
                                            <div class="homePageEventCycleSticker">
                                                <div class="homePageEventCycleStickerImg">
                                                    <img src=${homePageCycleSticker}>
                                                </div>
                                                <div class="homePageEventCycleStickerText"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="homePageWhiteContainer">
                                    <div class="homePageEventCycleContainer">
                                        ${homePageCurrentBanners}
                                        <div class="homePageEventCycleRemainingTime"></div>
                                        <div class="homePageEventCycleButtonLeft">
                                            <img src=${homePageCycleLeft}>
                                        </div>
                                        <div class="homePageEventCycleButtonRight">
                                            <img src=${homePageCycleRight}>
                                        </div>
                                        <div class="homePageEventCycleStickerContainer">
                                            <div class="homePageEventCycleSticker">
                                                <div class="homePageEventCycleStickerImg">
                                                    <img src=${homePageCycleSticker}>
                                                </div>
                                                <div class="homePageEventCycleStickerText"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="homePageEventsCol2">
                                <div class="homePageWhiteContainer">
                                    <div class="homePageBulletinBoard">
                                        <div class="homePageBulletinHeader">公告</div>
                                        <div class="homePageBulletinContentContainer">
                                            ${homePageCurrentBulletin}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section" data-anchor="homePageSection3">
                        <div class="homePage3">
                            <img class="homePageSectionBackground" src=${homePageBgUpdates}>
                            <div class="homePageCol">
                                <div class="homePageWhiteContainer">
                                    <div class="homePageUpdatesCycleContainer">
                                        ${homePageLatestUpdates}
                                        <div class="homePageUpdatesCycleText"></div>
                                        <div class="homePageUpdatesCycleButtonLeft">
                                            <img src=${homePageCycleLeft}>
                                        </div>
                                        <div class="homePageUpdatesCycleButtonRight">
                                            <img src=${homePageCycleRight}>
                                        </div>
                                        <div class="homePageUpdatesCycleStickerContainer">
                                            <div class="homePageUpdatesCycleSticker">
                                                <div class="homePageUpdatesCycleStickerImg">
                                                    <img src=${homePageCycleSticker}>
                                                </div>
                                                <div class="homePageUpdatesCycleStickerText"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section" data-anchor="homePageSection4">
                        <div class="homePage4">
                            <img class="homePageSectionBackground" src=${homePageBgInfo}>
                            <div class="homePageCol">
                                <div class="homePageWhiteContainer">
                                    <div class="homePageCenterContainer">
                                        <div class="homePageInfoCycleContainer">
                                            <img class="cyclePage1" src=${homePageInfo1}>
                                            <img class="cyclePage2" src=${homePageInfo2}>
                                            <img class="cyclePage3" src=${homePageInfo3}>
                                            <img class="cyclePage4" src=${homePageInfo4}>
                                        </div>
                                        <div class="homePageInfoTextContainer">
                                            ブルーアーカイブ （Blue Archive，暂译名:碧蓝档案） 是由韩国Nexon开发、中国Yostar代理、在日本发行的一款积极向上的角色收集RPG游戏。<br>
                                            游戏可以在日区Google Store或App Store下载，国内登录需要加速器。详情请参考新手入门
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section" data-anchor="homePageSection5">
                        <div class="homePage5">
                            <img class="homePageSectionBackground" src=${homePageBgAbout}>
                            <div class="homePageCol">
                                <div class="homePageWhiteContainer">
                                    <div class="homePageAboutContainer">
                                        <div class="homePageAboutText">
                                            欢迎大家来到碧蓝档案Bwiki！
                                            <br><br>
                                            本网站是由碧蓝档案情报站组织建设的民间非营利网站，网站主要内容包括游戏公开数据的收集、整合与汉化，游戏内容的攻略与考据，官方推特等游戏周边讯息的搬运与翻译。
                                            <br><br>
                                            受Bwiki服务器本身的限制，如有遇到内容错误或者功能失效的情况，请先刷新页面；如果问题依然存在，请于评论区反馈或与我们私信。
                                            <br><br>
                                            本网站的内容建设尚在进行中，请耐心等待建设人员的后续优化工作。如果有希望投稿的内容或希望追加的内容，也请直接与我们取得联系。                            
                                        </div>
                                        <div class="homePageAboutWikiContainer">
                                            <div class="homePageAboutWikiContainerHeader">WIKI信息</div>
                                            <div class="homePageAboutWikiText">
                                                本Wiki共有 ${bwikiNumUsers} 名注册用户，近期有 <a href="https://wiki.biligame.com/ba/%E7%89%B9%E6%AE%8A:%E8%B4%A1%E7%8C%AE%E5%BE%97%E5%88%86">${bwikiNumActiveUsers}</a> 位活跃编辑者，${bwikiNumEdits} 次编辑，<a href="https://wiki.biligame.com/ba/%E7%89%B9%E6%AE%8A:%E6%9C%80%E8%BF%91%E6%9B%B4%E6%94%B9">${bwikiNumPages}</a> 个页面。
                                                <br><br>
                                                若无特殊说明，Wiki内容按照 CC BY-NC-SA协议提供。
                                                <br><br>
                                                后续的安排和规划会写在更新计划中。
                                                <br>
                                                碧蓝档案wiki交流群：738194534
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="homePageSideNav" id="#menu">
                    <div class="homePageSideNavContainer">
                        <div class="homePageSideNavButton" data-anchor="homePageSection1">
                            <div class="homePageSideNavText">
                                主页
                            </div>
                        </div>
                    </div>
                    <div class="homePageSideNavContainer">
                        <div class="homePageSideNavButton" data-anchor="homePageSection2">
                            <div class="homePageSideNavText">
                                当期活动
                            </div>
                        </div>
                    </div>
                    <div class="homePageSideNavContainer">
                        <div class="homePageSideNavButton" data-anchor="homePageSection3">
                            <div class="homePageSideNavText">
                                最新动态
                            </div>
                        </div>
                    </div>
                    <div class="homePageSideNavContainer">
                        <div class="homePageSideNavButton" data-anchor="homePageSection4">
                            <div class="homePageSideNavText">
                                游戏介绍
                            </div>
                        </div>
                    </div>
                    <div class="homePageSideNavContainer">
                        <div class="homePageSideNavButton" data-anchor="homePageSection5">
                            <div class="homePageSideNavText">
                                关于
                            </div>
                        </div>
                    </div>
                </div>
            `;

            $.getScript("https://wiki.biligame.com/ba/index.php?title=MediaWiki:FullPage.js&action=raw", function () {
                initializeFullPage();
                initializeContent();
            });
        }
    })


    function initializeFullPage() {
        $(".HomePageWrapper").html(homePage);

        $('#fullpage').fullpage({
            licenseKey: "gplv3-license",
            lockAnchors: true,
            anchors: ["homePageSection1", "homePageSection2", "homePageSection3", "homePageSection4", "homePageSection5"],
            menu: "#menu",
            scrollOverflow: false,
            credits: { enabled: false },
            afterLoad: function (origin, destination, direction) {
                var activeSection = destination.anchor;

                $('.homePageSideNavButton').removeClass('homePageSideNavButtonActive');

                $('.homePageSideNavButton[data-anchor=' + activeSection + ']').addClass('homePageSideNavButtonActive');
            },
        });
    }

    function initializeContent() {
        $(`.homePageServerNavButton[data-server=${currentServer}]`).addClass("homePageServerNavButtonActive");

        $(".homePageEventCycleContainer").each(function () {
            $(this).data("cyclePage", 1);
            $(this).find(".cyclePage1").show();
            $(this).data("animation", 0);

            let pageCount = $(this).find(".homePageEventCyclePage").length;
            let stickerText = 1 + "/" + pageCount;
            $(this).find(".homePageEventCycleStickerText").html(stickerText);
            if (pageCount === 1) {
                $(this).find(".homePageEventCycleButtonLeft").hide();
                $(this).find(".homePageEventCycleButtonRight").hide();
            }
        });

        $(".homePageEventCycleRemainingTime").each(function () {
            let startTime = $(this).parent().find(".cyclePage1").data('startTime');
            let endTime = $(this).parent().find(".cyclePage1").data('endTime');
            $(this).data("startTime", startTime);
            $(this).data("endTime", endTime);
        });

        $(".homePageUpdatesCycleContainer").each(function () {
            $(this).data("cyclePage", 1);
            $(this).find(".cyclePage1").show();
            $(this).data("animation", 0);

            let pageCount = $(this).find(".homePageUpdatesCyclePage").length;
            let stickerText = 1 + "/" + pageCount;
            $(this).find(".homePageUpdatesCycleStickerText").html(stickerText);
            if (pageCount === 1) {
                $(this).find(".homePageUpdatesCycleButtonLeft").hide();
                $(this).find(".homePageUpdatesCycleButtonRight").hide();
            }
        });

        $(".homePageUpdatesCycleText").each(function () {
            let text = $(this).parent().find(".cyclePage1").data('text');
            $(this).html(text);
        });

        $(".homePageInfoCycleContainer").data("cyclePage", 1);
        $(".homePageInfoCycleContainer").find(".cyclePage1").show();
    }


    $(".homePageWrapper").on("click", ".homePageServerNavButton", function() {
        let selectedServer = $(this).data("server");
        localStorage.setItem("BlueArchive-BWiki-ServerSelection", selectedServer);
        location.reload();
    });

    // function getRemainingTime(endTime) {
    //     let currentTime = new Date();
    //     let remainingTime = endTime - currentTime;

    //     let timeString;
    //     if (remainingTime < 0) {
    //         timeString = false;
    //         return timeString;
    //     }

    //     let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    //     let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    //     let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    //     timeString = days + "天" + hours + "小时";
    //     if (days === 0) {
    //         timeString += (minutes + "分钟");
    //         if (hours === 0) {
    //             timeString += (seconds + "秒");
    //         }
    //     }

    //     return timeString;
    // }

    function generateTimeString(start, end) {
        if (end === "open") {
            return "国服开放";
        }
        if (end === "permanent") {
            return "常驻活动增加";
        }

        let currentTime = new Date().getTime();
        let startTime = new Date(start).getTime();
        let flag = "pending";

        let timeCount = startTime - currentTime;
        if ((start === "") || (start === undefined)) {
            timeCount = -1;
        }
        if (timeCount < 0) {
            flag = "during";
            let endTime = new Date(end).getTime();
            timeCount = endTime - currentTime;
            if (timeCount < 0) {
                flag = "finished";
                return "本活动已结束";
            }
        }

        let days = Math.floor(timeCount / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeCount % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeCount % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeCount % (1000 * 60)) / 1000);
        let timeString = days + "天" + hours + "小时";
        if (days === 0) {
            timeString += (minutes + "分钟");
            if (hours === 0) {
                timeString += (seconds + "秒");
            }
        }

        if (flag === "pending") {
            return "距离活动开始还有" + timeString;
        }

        else if (flag === "during") {
            return "距离活动结束还有" + timeString;
        }
    }

    setInterval(function () {
        $(".homePageEventCycleRemainingTime").each(function () {
            let timeString = generateTimeString($(this).data("startTime"), $(this).data("endTime"));
            $(this).html(timeString);
        });

        
        $(".bulletinEvent").each(function() {
            let timeString = generateTimeString($(this).data("startTime"), $(this).data("endTime"));
            $(this).find(".homePageBulletinTitle").html(timeString);
        });
    }, 500);

    $(".homePageWrapper").on('click', ".homePageSideNavButton", function () {
        var section = $(this).data('anchor');
        fullpage_api.moveTo(section);

        $('.homePageSideNavButton').removeClass('homePageSideNavButtonActive');
        $(this).addClass('homePageSideNavButtonActive');
    });

    function eventCycleClick(container, direction) {
        let vals = ["100%", "-100%"];
        if (direction === "left") {
            vals = ["-100%", "100%"];
        }
        if (container.data("animation") === 0) {
            container.data("animation", 1);
            let currentPage = container.data("cyclePage");
            let nextPage;
            if (direction === "left") {
                nextPage = currentPage === 1 ? container.find(".homePageEventCyclePage").length : currentPage - 1;
            } else {
                nextPage = currentPage === container.find(".homePageEventCyclePage").length ? 1 : currentPage + 1;
            }
            
            container.find(".cyclePage" + nextPage).css({
                "left": vals[0],
                "display": "block"
            });
            container.find(".cyclePage" + nextPage).animate({
                left: 0
            }, 300);
            container.find(".cyclePage" + currentPage).animate({
                left: vals[1]
            }, 300, function () {
                container.find(".cyclePage" + currentPage).hide();
                container.data("animation", 0);
                container.find(".homePageEventCycleStickerText").html(nextPage + "/" + container.find(".homePageEventCyclePage").length);
                container.find(".homePageEventCycleRemainingTime").data("startTime", container.find(".cyclePage" + nextPage).data("startTime"));
                container.find(".homePageEventCycleRemainingTime").data("endTime", container.find(".cyclePage" + nextPage).data("endTime"));
            });

            container.data("cyclePage", nextPage);
        }
    }

    $(".HomePageWrapper").on("click", ".homePageEventCycleButtonLeft", function () {
        let container = $(this).parent();
        eventCycleClick(container, "left");
    });

    $(".HomePageWrapper").on("click", ".homePageEventCycleButtonRight", function () {
        let container = $(this).parent();
        eventCycleClick(container, "right");
    });

    setInterval(function () {
        $(".homePageEventCycleContainer").each(function () {
            let container = $(this);
            if ((container.data("animation") === 0) && (container.find(".homePageEventCyclePage").length > 1)) {
                eventCycleClick(container, "right");
            }
        })
    }, 7500);

    function updatesCycleClick(container, direction) {
        let vals = ["100%", "-100%"];
        if (direction === "left") {
            vals = ["-100%", "100%"];
        }
        if (container.data("animation") === 0) {
            container.data("animation", 1);
            let currentPage = container.data("cyclePage");
            let nextPage;
            if (direction === "left") {
                nextPage = currentPage === 1 ? container.find(".homePageUpdatesCyclePage").length : currentPage - 1;
            } else {
                nextPage = currentPage === container.find(".homePageUpdatesCyclePage").length ? 1 : currentPage + 1;
            }

            container.find(".cyclePage" + nextPage).css({
                "left": vals[0],
                "display": "block"
            });
            container.find(".cyclePage" + nextPage).animate({
                left: 0
            }, 300);
            container.find(".cyclePage" + currentPage).animate({
                left: vals[1]
            }, 300, function () {
                container.find(".cyclePage" + currentPage).hide();
                container.data("animation", 0);
                container.find(".homePageUpdatesCycleStickerText").html(nextPage + "/" + container.find(".homePageUpdatesCyclePage").length);
                container.find(".homePageUpdatesCycleText").html(container.find(".cyclePage" + nextPage).data("text"));
            });

            container.data("cyclePage", nextPage);
        }
    }

    $(".HomePageWrapper").on("click", ".homePageUpdatesCycleButtonLeft", function () {
        let container = $(this).parent();
        updatesCycleClick(container, "left");
    });

    $(".HomePageWrapper").on("click", ".homePageUpdatesCycleButtonRight", function () {
        let container = $(this).parent();
        updatesCycleClick(container, "right");
    });

    setInterval(function() {
        let currentImg = $(".homePageInfoCycleContainer").data("cyclePage");
        let infoImgCount = $(".homePageInfoCycleContainer").find("img").length;
        let nextImg = currentImg === infoImgCount ? 1 : currentImg + 1;

        $(".homePageInfoCycleContainer").find(".cyclePage" + currentImg).hide();
        $(".homePageInfoCycleContainer").find(".cyclePage" + nextImg).show();

        $(".homePageInfoCycleContainer").data("cyclePage", nextImg)
    }, 5000);
    
    setTimeout(function() {
    	$(".homePageUpdatesCyclePage").not(":first").hide();
		$(".homePageUpdatesCyclePage").each(function() {
		    $(this).find("iframe").css({
		        "width": "80%",
		        "height": "80%",
		        "transform": "scale(1.25)"
		    });
		});

	}, 2000);
});

var FRAME_RATE = 80;
var GRAVITY = 32;
var BOUNCE = 1;

var [aronaTouchOffsetX, aronaTouchOffsetY] = [0.7, 0.59];
var aronaBounceMargin = 0.2;
var [aronaPosX, aronaPosY] = [0, 0];
var [aronaVelocityX, aronaVelocityY] = [0, 0];
var [aronaAccelerationX, aronaAccelerationY] = [0, 0];
var [aronaDeltaX, aronaDeltaY] = [0, 0];

var [aronaScrollPrevX, aronaScrollPrevY] = [0, 0];
var [aronaScrollDeltaX, aronaScrollDeltaY] = [0, 0];

var aronaDragging = false;
var aronaGrounded = true;
var aronaDizzy = false;
var aronaUmbrella = false;
var navbarGround = true;

var [mouseDownPrevPosX, mouseDownPrevPosY] = [0, 0];

var customNavbarOverlay = false;
var customNavbarSecondaryMenu = false;

var aronaStandbyImg = "https://patchwiki.biligame.com/images/ba/8/8f/kmvuzwe8faxnarr7h7ro9616sdkwmr6.png";
var aronaDragImg = "https://patchwiki.biligame.com/images/ba/8/8f/hh1dbh027k8oxva4of1x36bjaapyr5h.png";
var aronaAirborneImg = "https://patchwiki.biligame.com/images/ba/f/f4/9wquzesqx9oxop1fyhb1dzkzxdfs8yi.png";
var aronaDizzyImg = "https://patchwiki.biligame.com/images/ba/2/22/o244yggobblnf7c10veui4r1ihcev1o.png";
var aronaUmbrellaOpenImg = "https://patchwiki.biligame.com/images/ba/b/b7/rpmc77o8551siadve3ca2vkfbg6a35j.png";

var aronaBannerPool = { "1": ["Haruka", "Juri", "Chinatsu", "Yoshimi", "Serina", "Suzumi", "Shimiko", "Asuna", "Kotama", "Kotori", "Pina", "Nodoka", "TsurugiSwimsuit", "IzumiSwimsuit", "Tomoe", "Fubuki", "Michiru", "AyaneSwimsuit", "ShizukoSwimsuit", "HibikiCheerleader", "HasumiTrack", "JunkoNewyear", "YuzuMaid"], "2": ["Serika", "Nonomi", "Ayane", "Mutsuki", "Kayoko", "Fuuka", "Akari", "Junko", "Hasumi", "Airi", "Hanae", "Akane", "Hare", "Utaha", "Yuuka", "Chise", "Tsubaki", "Shizuko", "Momoi", "Hanako", "Kirino", "Mari"], "3": ["Shiroko", "Hoshino", "Aru", "Haruna", "Izumi", "Hina", "Iori", "Hifumi", "Tsurugi", "Karin", "Neru", "Maki", "Hibiki", "Sumire", "Eimi", "Shun", "Saya", "Mashiro", "Izuna", "Aris", "Midori", "Cherino", "Yuzu", "Azusa", "Koharu", "AzusaSwimsuit", "MashiroSwimsuit", "HifumiSwimsuit", "HinaSwimsuit", "IoriSwimsuit", "ShirokoRiding", "ShunYoung", "SayaCasual", "NeruBunny", "KarinBunny", "AsunaBunny", "Natsu", "HatsuneMiku", "Ako", "CherinoHotspring", "ChinatsuHotspring", "NodokaHotspring", "AruNewyear", "MutsukiNewyear", "SerikaNewyear", "Wakamo", "Sena", "Chihiro", "Mimori", "Ui", "Hinata", "Marina", "Saki", "Miyako", "Miyu", "Kaede", "Iroha", "Tsukuyo", "Misaki", "Hiyori", "Atsuko", "NonomiSwimsuit", "WakamoSwimsuit", "HoshinoSwimsuit", "IzunaSwimsuit", "ChiseSwimsuit", "Saori", "Moe", "Kazusa", "Kokona", "UtahaCheerleader", "Noa", "AkaneBunny", "YuukaTrack", "MariTrack", "Himari", "Shigure", "SerinaChristmas", "HanaeChristmas", "HarunaNewyear", "FuukaNewyear", "Mine", "Mika", "Megu", "Kanna", "Sakurako", "Toki", "Nagisa", "Koyuki", "KayokoNewyear", "HarukaNewyear", "Kaho", "ArisMaid", "TokiBunny", "Reisa"] };
var aronaBannerPoolRates = { "1": 0.785, "2": 0.185, "3": 0.03};
var aronaBannerPoolImgs;

function preloadImgs() {
    let imgs = [aronaDragImg, aronaAirborneImg, aronaDizzyImg, aronaUmbrellaOpenImg];
    imgs.forEach(item => {
        let img = new Image();
        img.src = item;
    });
}

function generateFallingFile(rarity, posX, posY, vX, vY) {
    let color;
    if (rarity === '1') {
        color = "dodgerblue";
    } else if (rarity === '2') {
        color = "gold";
    } else if (rarity === '3') {
        color = "magenta";
    }

    let file = `<div class="aronaFallingFile physicalObject">
        <div class="physicalObjectImg" style="background-color:${color}"></div>
    </div>`;
    $(".customNavigationWrapper").append(file);
    let $currentFile = $(".aronaFallingFile:last");
    $currentFile.data("rarity", rarity);
    $currentFile.data("posX", posX);
    $currentFile.data("posY", posY);
    $currentFile.data("vX", vX);
    $currentFile.data("vY", vY);
    $currentFile.css({
        "left": posX,
        "top": posY
    });
}

function generateBounceBackItem(rarity, posX, posY, vX, vY) {
    let item;
    if (rarity === "1") {
        item = `<div class="aronaDrawEligma physicalObject">
            <div class="physicalObjectImg" style="background-color:pink"></div>
        </div>`;
    }

    else {
        let studentImg = aronaBannerPoolImgs[drawStudent(rarity)];
        let size;
        item = `<div class="aronaDrawStudent${rarity} physicalObject">
            <img class="physicalObjectImg" src="${studentImg}">
        </div>`;
    }
    $(".customNavigationWrapper").append(item);
    let $currentItem = $(".physicalObject:last");
    $currentItem.data("posX", posX);
    $currentItem.data("posY", posY);
    $currentItem.data("vX", vX);
    $currentItem.data("vY", vY);
    $currentItem.data("frameCount", 0);
    $currentItem.css({
        "left": posX,
        "top": posY
    });
}

// Randomly draws a file
function drawFile() {
    let randomNum = Math.random();
    if (randomNum < aronaBannerPoolRates['1']) {
        return '1';
    } else if (randomNum < (aronaBannerPoolRates['1'] + aronaBannerPoolRates['2'])) {
        return '2';
    } else {
        return '3';
    }
}


// determines what students is in the file
function drawStudent(rarity) {
    let index = Math.floor(Math.random() * aronaBannerPool[rarity].length);
    return aronaBannerPool[rarity][index];
}


$(function () {
    let navbar = `
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="height:0; width:0; position: absolute;">
            <defs>
                <filter id="glassmorphism" x="0" y="0">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="0"/>
                </filter>
            </defs>
        </svg>
        <div class="customNavigation">
            <div class="customNavbar">
                <div class="customNavbarButton" data-secondary="home">
                    <div class="customNavbarButtonIcon">
                        <img src="https://patchwiki.biligame.com/images/ba/e/e4/4nbwrpmailme8912lkvlzy9p3clf28h.svg">
                    </div>
                    <div class="customNavbarButtonText">
                        首页
                    </div>
                </div>
                <div class="customNavbarButton" data-secondary="catalog">
                    <div class="customNavbarButtonIcon">
                        <img src="https://patchwiki.biligame.com/images/ba/8/8c/azzpw8oeofvup8ch6c26hcfakjw0me1.svg">
                    </div>
                    <div class="customNavbarButtonText">
                        图鉴
                    </div>
                </div>
                <div class="customNavbarButton" data-secondary="intel">
                    <div class="customNavbarButtonIcon">
                        <img src="https://patchwiki.biligame.com/images/ba/9/9f/gr7784eaijteidglvx3folrxiswoq5f.svg">
                    </div>
                    <div class="customNavbarButtonText">
                        情报
                    </div>
                </div>
                <div class="customNavbarButton" data-secondary="news">
                    <div class="customNavbarButtonIcon">
                        <img src="https://patchwiki.biligame.com/images/ba/0/0a/k5agqn9mgivjqkhfhbgx3anv30bl9nr.svg">
                    </div>
                    <div class="customNavbarButtonText">
                        动态
                    </div>
                </div>
                <div class="customNavbarButton" data-secondary="others">
                    <div class="customNavbarButtonIcon">
                        <img src="https://patchwiki.biligame.com/images/ba/9/90/2jo51y038qw8ih98c1xemgyl7i3yyl0.svg">
                    </div>
                    <div class="customNavbarButtonText">
                        其他
                    </div>
                </div>
                <div class="customNavbarBackground"></div>
            </div>
        </div>

        <div class="customSecondaryNavbarContainer">
            <div class="customSecondaryMenuContainer">
                <div class="customSecondaryMenuGrid">
                    <div class="customSecondaryMenuItem" data-button-index=1></div>
                    <div class="customSecondaryMenuItem" data-button-index=2></div>
                    <div class="customSecondaryMenuItem" data-button-index=3></div>
                    <div class="customSecondaryMenuItem" data-button-index=4></div>
                </div>
            </div>
            <div class="customNavbarAronaAnchorContainer">
                <div class="customNavbarAronaAnchor"></div>
            </div>
        </div>
    `;

    let aronaHtml = `<div class="aronaContainer">
        <img src=${aronaStandbyImg}>
        <div class="aronaContainerCover"></div>
    </div>`;

    $.ajax({
        url: "https://wiki.biligame.com/ba/index.php?title=MediaWiki:NavbarTest.json&action=raw",
        dataType: "text",
        success: function (data) {
            aronaBannerPoolImgs = JSON.parse(data);
        }
    });
    preloadImgs();
    
    $(".customNavigationWrapper").html(navbar);
    // add glassmorphism effect (background blur) on pc browser
    if (!(/Mobi|Android/i.test(navigator.userAgent))) {
        $(".HomePageWrapper").css({
            filter: "url(#glassmorphism)"
        });
    }
    $(".customSecondaryNavbarContainer").after(aronaHtml);

    $aronaContainer = $(".aronaContainer");

    $(".customNavigationWrapper").on("click", ".customNavbarButton", function () {
        if (!customNavbarSecondaryMenu) {
            customNavbarSecondaryMenu = $(this).data("secondary");
            $(".customNavigation").before(`<div class="customNavigationScreenOverlay"></div>`);
            fullpage_api.setAllowScrolling(false);

            $(".customSecondaryMenuGrid").animate({
                bottom: 0,
                opacity: 1
            }, 250);

            for (let i = 1; i <= 10; i += 1) {
                setTimeout(() => {
                    $("feGaussianBlur").attr("stdDeviation", i);
                    $(".customNavigationScreenOverlay").css({ opacity: 0.05 * i });
                    $(".customNavbar").css({ opacity: 1 - 0.01 * i });
                }, i * 25);
            }
        }

        else if (customNavbarSecondaryMenu !== $(this).data("secondary")) {
            customNavbarSecondaryMenu = $(this).data("secondary");
        }

        else {
            fullpage_api.setAllowScrolling(true);
            $(".customNavigationScreenOverlay").remove();
            customNavbarSecondaryMenu = false;

            $(".customSecondaryMenuGrid").animate({
                bottom: "-100%",
                opacity: 0
            }, 250);

            for (let i = 9; i >= 0; i -= 1) {
                setTimeout(() => {
                    $("feGaussianBlur").attr("stdDeviation", i);
                    $(".customNavigationScreenOverlay ").css({ opacity: 0.05 * i });
                    $(".customNavbar").css({ opacity: 1 - 0.01 * i });
                }, (10 - i) * 25);
            }
        }
    });

    $(window).on("resize", function () {
        let anchorPosition = $(".customNavbarAronaAnchor").offset();
        aronaPosX = anchorPosition.left;
        aronaPosY = anchorPosition.top;
        $(".aronaContainer").css({
            'position': 'fixed',
            'left': aronaPosX + 'px',
            'top': aronaPosY + 'px'
        });
        console.log("aronaPosX ", aronaPosX, "    aronaPosY ", aronaPosY);
    }).trigger("resize");

    
    // checks if location has detailed content
    function checkForExtraInfo() {
        (GlobalAronaAssistantExtraInfo === "") ? $(".aronaContainer").css("background-color", "#8fd8ff") : $(".aronaContainer").css("background-color", "#48ad60");
    }


    function aronaConstrainPosition() {
        if (aronaPosX < 0 - $aronaContainer.outerWidth() * aronaTouchOffsetX) {
            aronaPosX = 0 - $aronaContainer.outerWidth() * aronaTouchOffsetX - aronaPosX;
            aronaVelocityX *= -BOUNCE;
            aronaAccelerationX *= -BOUNCE;
            generateFallingFile(drawFile(), 0, aronaPosY, Math.random()*15, 0);
        }

        else if (aronaPosX > $(window).width() - $aronaContainer.outerWidth() * (1 - aronaTouchOffsetX)) {
            aronaPosX = 2 * ($(window).width() - $aronaContainer.outerWidth() * (1 - aronaTouchOffsetX)) - aronaPosX;
            aronaVelocityX *= -BOUNCE;
            aronaAccelerationX *= -BOUNCE;
            generateFallingFile(drawFile(), $(window).width()-80, aronaPosY, -Math.random()*15, 0);
        }


        if (aronaPosY >= $(window).height() + 1500) {
            let anchorPosition = $(".customNavbarAronaAnchor").offset();
            aronaPosX = anchorPosition.left;
            aronaPosY = anchorPosition.top; 
            aronaVelocityY = 0;
            aronaAccelerationY = 0;
            aronaGrounded = true;
        }

        else if (aronaPosY < 0 - $aronaContainer.outerHeight() * aronaTouchOffsetY) {
            aronaPosY = 0 - $aronaContainer.outerHeight() * aronaTouchOffsetY - aronaPosY;
            aronaVelocityY *= -BOUNCE;
            aronaAccelerationY *= -BOUNCE;
        }
    }

    function aronaContainerStartDrag(e) {
        aronaDragging = true;
        aronaGrounded = false;
        [aronaVelocityX, aronaVelocityY] = [0, 0];
        [aronaAccelerationX, aronaAccelerationY] = [0, 0];
        if (e.type === "touchstart") {
            mouseDownPrevPosX = e.originalEvent.touches[0].clientX;
            mouseDownPrevPosY = e.originalEvent.touches[0].clientY;
        }

        else {
            mouseDownPrevPosX = e.clientX;
            mouseDownPrevPosY = e.clientY;
        }

        aronaPosX = mouseDownPrevPosX - $aronaContainer.outerWidth() * aronaTouchOffsetX;
        aronaPosY = mouseDownPrevPosY - $aronaContainer.outerHeight() * aronaTouchOffsetY;

        $(".aronaContainer>img").attr("src", `${aronaDragImg}`);

        $(".aronaContainer").css({
            'position': 'fixed',
            'left': aronaPosX + 'px',
            'top': aronaPosY + 'px',
            'pointer-events': 'none'
        });
    }

    function aronaContainerDrag(e) {
        if (!aronaDragging) return;

        let mouseDownNewPosX, mouseDownNewPosY;

        if (e.type === "touchmove") {
            mouseDownNewPosX = e.originalEvent.touches[0].clientX;
            mouseDownNewPosY = e.originalEvent.touches[0].clientY;
        }
        else {
            mouseDownNewPosX = e.clientX;
            mouseDownNewPosY = e.clientY;
        }

        let arr = document.elementsFromPoint(mouseDownNewPosX, mouseDownNewPosY);
        let targetDiv = Array.from(arr).find(el => el.classList.contains('aronaDetailedInfoData'));
        GlobalAronaAssistantExtraInfo = (targetDiv === undefined) ? "" : 1;

        mouseDownNewPosX = Math.max(0, Math.min($(window).width(), mouseDownNewPosX));
        mouseDownNewPosY = Math.max(0, Math.min($(window).height(), mouseDownNewPosY));
        aronaVelocityX = (mouseDownNewPosX - mouseDownPrevPosX) / 2;
        aronaVelocityY = (mouseDownNewPosY - mouseDownPrevPosY) / 2;
        aronaDeltaX += mouseDownNewPosX - mouseDownPrevPosX;
        aronaDeltaY += mouseDownNewPosY - mouseDownPrevPosY;
        mouseDownPrevPosX = mouseDownNewPosX;
        mouseDownPrevPosY = mouseDownNewPosY;
        checkForExtraInfo();
    }

    function aronaContainerEndDrag() {
        aronaDragging = false;
        $(".aronaContainer>img").attr("src", `${aronaStandbyImg}`);
        $(".aronaContainer").css("pointer-events", "auto");
    }

    // Mouse events
    $('.aronaContainer').on('mousedown', aronaContainerStartDrag);
    $(window).on('mousemove', aronaContainerDrag);
    $(window).on('mouseup', aronaContainerEndDrag);

    // Touch events
    $('.aronaContainer').on('touchstart', aronaContainerStartDrag);
    $(window).on('touchmove', aronaContainerDrag);
    $(window).on('touchend', aronaContainerEndDrag);

    $(".aronaContainer").on("click", function() {
        console.log("click");
    })

    setInterval(function mainLoop() {

        let [currentScrollX, currentScrollY] = [$(window).scrollLeft(), $(window).scrollTop()];
        [aronaScrollDeltaX, aronaScrollDeltaY] = [currentScrollX - aronaScrollPrevX, currentScrollY - aronaScrollPrevY];
        [aronaScrollPrevX, aronaScrollPrevY] = [currentScrollX, currentScrollY];


        // main loop for arona if she is not grounded
        if (!aronaGrounded) {
            if (!aronaDragging) {
                // arona is not dragged and is affected by forces

                aronaAccelerationY = (GRAVITY / FRAME_RATE);
                aronaVelocityY += aronaAccelerationY;
                aronaPosX += aronaVelocityX;
                aronaPosY += aronaVelocityY;
            }

            else {
                aronaPosX += aronaDeltaX;
                aronaPosY += aronaDeltaY;
            }

            aronaConstrainPosition();
            
            aronaPosX += aronaScrollDeltaX;
            aronaPosY += aronaScrollDeltaY;

            $(".aronaContainer").css({
                'position': 'fixed',
                'left': aronaPosX + 'px',
                'top': aronaPosY + 'px'
            });
            aronaDeltaX = 0;
            aronaDeltaY = 0;
        }

        // main loop for falling objects
        $(".physicalObject").each(function() {
            if ($(this).data("posY") > $(window).height() + 100) {
                if ($(this).hasClass("aronaFallingFile")) {
                    if ($(this).data("rarity") === "1") {
                        generateBounceBackItem("1", $(this).data("posX"), $(window).height(), $(this).data("vX")/2, -15);
                    }
                    else if ($(this).data("rarity") === "2"){
                        generateBounceBackItem("2", $(this).data("posX"), $(window).height(), $(this).data("vX")/2, -18);
                    }
                    else {
                        generateBounceBackItem("3", $(this).data("posX"), $(window).height(), $(this).data("vX")/2, -18);
                    }
                }
                $(this).remove();
            }

            $(this).data("vY", $(this).data("vY")+(GRAVITY / FRAME_RATE));
            
            $(this).data("posX", $(this).data("posX")+$(this).data("vX"));
            $(this).data("posY", $(this).data("posY")+$(this).data("vY"));

            if ($(this).hasClass("aronaDrawStudent3")) {
                $(this).data("posX", $(this).data("posX")-$(this).data("vX")/1.5);
                $(this).data("posY", $(this).data("posY")-$(this).data("vY")/1.5);
            }

            $(this).css({
                "top": $(this).data("posY"),
                "left": $(this).data("posX")
            })
        });



    }, 1000 / FRAME_RATE);
})


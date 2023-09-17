// Navbar & Arona Assistant v2.0.1
// 2023.9.10

/**
 * @typedef {string} html
 * A string, usually formatted, that contains HTML content.
 */

// ======== Variable list ========
// CSS variables
var cssNavbarHeight = 70;

// animation variables
var animNavbarDelayTime = 1500;
var animNavbarTransition1Time = 500;
var animNavbarTransition2Time = 500;
var animNavbarTransition3Time = 500;
var animSecondaryNavbarTime = 250;
var animAronaStandbyTime = 625;

// Constants
var extraInfoClassName = "aronaDetailedInfoData";
var clickThreshold = 5;
var FRAME_RATE = 60;
var GRAVITY = 30;
var BOUNCE = 1;

// Variables
var [aronaTouchOffsetX, aronaTouchOffsetY] = [0.7, 0.59];
var [aronaPosX, aronaPosY] = [0, 0];
var [aronaVelocityX, aronaVelocityY] = [0, 0];
var [aronaAccelerationX, aronaAccelerationY] = [0, 0];
var [aronaDeltaX, aronaDeltaY] = [0, 0];

var [mouseDownStartPosX, mouseDownStartPosY] = [0, 0];
var [mouseDownPrevPosX, mouseDownNewPosY] = [0, 0];

var [aronaScrollPrevX, aronaScrollPrevY] = [0, 0];
var [aronaScrollDeltaX, aronaScrollDeltaY] = [0, 0];

// States
var customNavbarOverlay = false;
var customNavbarSecondaryMenu = false;

var aronaPreloaded = false;
var aronaBannerPreloaded = false;

var aronaActive = false;
var aronaDragging = false;

// Cached states
var navbarState = localStorage.getItem("BWikiNavbarState");
if (!navbarState) {
    navbarState = -1;
}


/** 
 * @type { "hidden" | "standby" | "dragging" | "falling" | "dizzy" } 
 * The later three are all considered active states
 * */
var aronaState = "hidden";
/** If Arona can fall through the bottom */
var aronaGround = true;

// Resource variables
// Arona hidden
var aronaHiddenBaseImgPath;
var aronaHiddenHeadwearImgPath;

// Arona standby
var aronaStandbyBaseImgPath = "https://patchwiki.biligame.com/images/ba/7/7a/jrnle39pxjjy4ekbgv4oh32oti0nbc9.png";
var aronaStandbyExpDefaultImgPath;
/** Blink expression for Arona in standby state */
var aronaStandbyExpDiff1ImgPath;
var aronaStandbyHands1ImgPath;
var aronaStandbyHands2ImgPath;

// Arona active
var aronaActiveBaseImgPath = "https://patchwiki.biligame.com/images/ba/0/08/iedj3m2i7zueqob14028oqbik0na3ft.png";
var aronaActiveExpDefaultImgPath = "https://patchwiki.biligame.com/images/ba/0/07/85cdelmc92xqicizbvmowgo15muu5fg.png";
/** Blink expression for Arona in active state */
var aronaActiveExpDiff1ImgPath = "https://patchwiki.biligame.com/images/ba/8/8e/65xzd7nyqubwltt8l5xnxf7o0njxpw5.png";
/** Happy expression for Arona in active state */
var aronaActiveExpDiff2ImgPath = "https://patchwiki.biligame.com/images/ba/d/d4/r2341zln871k5q73w49tjyjyvdibkxj.png";
/** Shocked expression for Arona in active state */
var aronaActiveExpDiff3ImgPath = "https://patchwiki.biligame.com/images/ba/8/81/tp6srb5hhqr6eed57e0v9ljdghb91r3.png";
/** Dizzy expression for Arona in active state */
var aronaActiveExpDiff4ImgPath = "https://patchwiki.biligame.com/images/ba/a/ac/ee8ni7uawyuo6mbuyvr0z8tb5wf0hzb.png";
var aronaActiveTexture1ImgPath = "https://patchwiki.biligame.com/images/ba/0/05/m74rvw7793ekgf6z2ewos269u58uprc.png";
var aronaActiveTexture2ImgPath = "https://patchwiki.biligame.com/images/ba/5/52/e7k7fn0l4id2fonpzsfiqt2rczxdo21.png";

var aronaBannerPool = {};
var aronaBannerRates = {};
var aronaBannerDataPath;
var aronaBannerImgs;

var aronaBannerFileBlue;
var aronaBannerFileGold;
var aronaBannerFilePurple;
var aronaBannerEligma;

// ======== Preload resources ========
/**
 * Preload an image.
 * @param {string} src the link to the image
 * @returns {Promise} a promise to the image
 */
function preloadImg(src) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = src;
        img.onload = function() {
            resolve(src);
        };
        img.onerror = function() {
            reject(new Error(`Failed to load image at ${src}`));
        };
    });
}


/** 
 * Add the images to the dom without adding them to elements.
 */
function preloadAronaImages() {

}


/**
 * Adds the student icons loaded from json file to the dom without elements.
 */
function preloadBannerImages() {

}


// ======== Banner draw functions ========
/**
 * Randomly picks a rarity according to banner rates.
 * @returns {integer} number between 1~3 to indicate the base stars of the student
 */
function drawRandomFile() {
    let randomNum = Math.random();
    if (randomNum < aronaBannerRates['1']) {
        return 1;
    } else if (randomNum < (aronaBannerRates['1'] + aronaBannerRates['2'])) {
        return 2;
    } else {
        return 3;
    }
}

/**
 * Randomly picks a student from the chosen rarity.
 * @param {integer} rarity the base stars of the student
 * @returns {string} the name of the chosen student
 */
function drawRandomStudent(rarity) {
    let index = Math.floor(Math.random() * aronaBannerPool[rarity].length);
    return aronaBannerPool[rarity][index];
}


// ======== Html generation functions ========
/**
 * Generates the main navbar to be added to the DOM.
 * @returns {html} the navbar of the page
 */
function generateNavbar() {
    let navbar = `
        <div class="customNavigation">
            <div class="customNavbar">
                <div class="customNavbarButton" data-secondary="home" onclick="window.location.href='https://wiki.biligame.com/ba'">
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
                <div class="customSecondaryMenuGrid"></div>
            </div>
            <div class="customNavbarAronaAnchorContainer">
                <div class="customNavbarAronaAnchor"></div>
            </div>
        </div>
    `;

    return navbar;
}


/**
 * Generates the A.R.O.N.A. letter cover for the navbar.
 * @returns {html} the html for the cover in visible state
 */
function generateNavbarCover() {
    let cover = `<div class="customNavbarCover">
        <div class="customNavbarCoverContent">
            <div>A.</div>
            <div>R.</div>
            <div>O.</div>
            <div>N.</div>
            <div>A.</div>
        </div>
    </div>`;

    return cover;
}


/**
 * Changes the CSS values of .customNavigation, .customNavbar, .customSecondaryNavbarContainer so that they accomodate the new height of the base navbar.
 * @param {number} height the new height of the base navbar
 */
function adjustNavbarHeight(height) {
    $(".customNavigation").css("height", `${height}px`);
    $(".customNavbar").css("height", `${height}px`);
    $(".customSecondaryNavbarContainer").css("bottom", `${height}px`);
}


/**
 * Generates the initial Arona to be added to the DOM.
 * @returns {html} arona in default hidden state
 */
function generateInitialArona() {
    let arona = `<div class="aronaContainer">
        <img src="${aronaStandbyBaseImgPath}">
        <div class="aronaContainerCover"></div>
    </div>`;

    return arona;
}


/**
 * Generates the colored file that drops when Arona collides with the border.
 * @param {integer} rarity the base stars of the student
 * @returns {html} html element of the file
 */
function generateDrawFile(rarity) {
    let file;
    if (rarity === '1') {
        file = aronaBannerFileBlue;
    } else if (rarity === '2') {
        file = aronaBannerFileGold;
    } else {
        file = aronaBannerFilePurple;
    }

    let fileHtml = `<div class="aronaFallingFile physicalObject">
        <img src="${file}">
    </div>`;
    return fileHtml;
}


/**
 * Generates the bounce back item when files disappear below the lower border. It can be a eligma or a student icon.
 * @param {integer} rarity 
 * @param {string} student 
 * @returns {html} html element that contains whatever item that bounces back.
 */
function generateDrawItem(rarity, student) {
    let item;

    if (rarity === '1') {
        item = `<div class="aronaDrawEligma physicalObject">
            <img src="${aronaBannerEligma}">
        </div>`;
    } else {
        // TODO: differentiate between rarities by changing size
        item = `<div class="aronaDrawStudent${rarity} physicalObject">
            <img src="${aronaBannerImgs[student]}">
        </div>`;
    }

    return item;
}


// ======== Navbar functions ========
/**
 * Plays the animation that renders in the navbar. Arona is changed from hidden to standby.
 * @param {"integer"} delay Indicates the length of delay before the function is executed in milliseconds.
 */
function navbarShow(delay=0) {
    $(".customNavigationWrapper").delay(delay).animate({
        bottom: `0px`
    }, animNavbarTransition1Time, function() {
        $(".customNavbarButton").css("opacity", 0);
        $(".customNavbarCover").animate({
            opacity: 0
        }, animNavbarTransition2Time, function() {
            $(".customNavbarCover").remove();
            let aronaAdded = false;
            $(".customNavbarButton").animate({
                opacity: 1
            }, animNavbarTransition3Time, function() {
                if (!aronaAdded) {
                    aronaAdded = true;
                    let arona = generateInitialArona();
                    $(".customSecondaryNavbarContainer").after(arona);
                    $(".aronaContainer").css({
                        top: $(".customNavbarAronaAnchor").offset().top + $(".aronaContainer").height() - $(window).scrollTop(),
                        left: $(".customNavbarAronaAnchor").offset().left - $(window).scrollLeft()
                    });
                    $(".aronaContainer").animate({
                        top: $(".customNavbarAronaAnchor").offset().top - $(window).scrollTop()
                    }, animAronaStandbyTime);
                }
            });
        })
    });
}


/**
 * Plays the animation that hides the navbar. arona is changed from standby to hidden.
 */
function navbarHide() {
    $(".customNavigationWrapper").animate({
        bottom: `-${cssNavbarHeight}px`
    }, animNavbarTransition1Time, function() {
        $(".customNavbar").after(generateNavbarCover());
    });
}


function updateSecondaryNavbar() {
    if (!customNavbarSecondaryMenu) {
        return;
    }

    if (customNavbarSecondaryMenu === "catalog") {
        $(".customSecondaryMenuGrid").html(`
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">1-1</div>
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">1-2</div>
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">1-3</div>
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">1-4</div>
        `);
    }
    else if (customNavbarSecondaryMenu === "intel") {
        $(".customSecondaryMenuGrid").html(`
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">2-1</div>
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">2-2</div>
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">2-3</div>
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">2-4</div>
        `);
    }
    else if (customNavbarSecondaryMenu === "news") {
        $(".customSecondaryMenuGrid").html(`
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">3-1</div>
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">3-2</div>
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">3-3</div>
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">3-4</div>
        `);
    }
    else if (customNavbarSecondaryMenu === "others") {
        $(".customSecondaryMenuGrid").html(`
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">4-1</div>
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">4-2</div>
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">4-3</div>
            <div class="customSecondaryMenuItem" onclick="window.location.href=''">4-4</div>
        `);
    }
}


// ======== Arona functions ========
/**
 * Adds Arona to anchor element, and shows move up animation by default.
 */
function aronaSetStandby() {
    let arona = `<div class="customNavbarAronaAnchor">
        <img src="${aronaStandbyBaseImgPath}">
    </div>`;

    $(".customNavbarAronaAnchorContainer").html(arona);
}


/**
 * Function that is attached to the drag start event listeners.
 * @param {*} event 
 */
function aronaStartDrag(event) {
    aronaActive = true;
    aronaDragging = true;
    [aronaVelocityX, aronaVelocityY] = 0;
    [aronaAccelerationX, aronaAccelerationY] = 0;

    if (event.type === "touchstart") {
        mouseDownStartPosX = event.originalEvent.touches[0].clientX;
        mouseDownStartPosY = event.originalEvent.touches[0].clientY;
    }
    else {
        mouseDownStartPosX = event.clientX;
        mouseDownStartPosY = event.clientY;
    }

    mouseDownPrevPosX = mouseDownStartPosX;
    mouseDownPrevPosY = mouseDownStartPosY;
    aronaPosX = mouseDownPrevPosX - $aronaContainer.outerWidth() * aronaTouchOffsetX;
    aronaPosY = mouseDownPrevPosY - $aronaContainer.outerHeight() * aronaTouchOffsetY;
}

/**
 * Function that is attached to the drag event listeners. Also checks for detailed information at current mouse locaiton.
 * @param {*} event 
 */
function aronaDrag(event) {

}


/**
 * Function that is attached to the drag end event listeners. Determines whether Arona should hover for info, open umbrella or free fall.
 * @param {*} event 
 */
function aronaEndDrag(event) {
     
}


/**
 * Limits Arona's position to be within the borders. Handles bounces and edge cases for off screen mouse positions.
 */
function aronaConstrainPosition() {

}


/**
 * Limits velocities when Arona has umbrella open.
 */
function aronaUmbrella() {

}


/**
 * Checks if the current mouse position is over HTML elements with class name that indicates additional info.
 * Directly updates the global detailed info variable.
 */
function aronaPositionInfoCheck() {

}


/**
 * Updates Arona to change between character and explanation box states.
 */
function aronaDetailedInfoToggle() {

}


// ======== Main function ========

$(function() {
    // load json data

    
    // preload image resources


    // generate navbar
    let navbar = generateNavbar();
    $(".customNavigationWrapper").html(navbar);
    $(".customNavbar").after(generateNavbarCover());
    adjustNavbarHeight(cssNavbarHeight);
    $(".customNavigationWrapper").css("bottom", `-${cssNavbarHeight}px`);

    // force navbar show on first load
    navbarShow(animNavbarDelayTime);

    // initialize arona


    // event listeners
    $(window).on("resize", function() {
        $("*").stop(true, true);

        if ($(".aronaContainer").length === 0) {
            $(".customSecondaryNavbarContainer").after(generateInitialArona());
        }

        $(".aronaContainer").css({
            top: $(".customNavbarAronaAnchor").offset().top - $(window).scrollTop(),
            left: $(".customNavbarAronaAnchor").offset().left - $(window).scrollLeft()
        });

        if (navbarState === 0) {
            $(".customNavigationWrapper").css(bottom, `-${cssNavbarHeight}px`);
            $(".customNavbar").after(generateNavbarCover());
        }

        else {
            $(".customNavigationWrapper").css("bottom", "0px");
            $(".customNavbarCover").remove();
            $(".customNavbarButton").css("opacity", 1);
        }
    });


    $(".customNavigationWrapper").on("click", ".customNavbarButton", function () {
        if ($(this).data("secondary") === "home") {
            return;
        }

        if (!customNavbarSecondaryMenu) {
            customNavbarSecondaryMenu = $(this).data("secondary");
            $(".customNavigation").before(`<div class="customNavigationScreenOverlay"></div>`);
            if (typeof fullpage_api !== "undefined") {
                fullpage_api.setAllowScrolling(false);
            }

            $(".customSecondaryMenuGrid").animate({
                bottom: 0,
                opacity: 1
            }, animSecondaryNavbarTime);
            
            for (let i = 1; i <= 10; i += 1) {
                setTimeout(() => {
                    $(".customNavigationScreenOverlay").css({
                        "background-color": `rgba(0, 0, 0, ${0.06*i})`,
                        "backdrop-filter": `blur(${i}px)`
                    }, 250);
                    $(".customNavbar").css({ opacity: 1 - 0.01 * i });
                }, i * (animSecondaryNavbarTime/10));
            }

            updateSecondaryNavbar();
        }

        else if (customNavbarSecondaryMenu !== $(this).data("secondary")) {
            customNavbarSecondaryMenu = $(this).data("secondary");
            updateSecondaryNavbar();
        }

        else {
            if (typeof fullpage_api !== "undefined") {
                fullpage_api.setAllowScrolling(true);
            }
            customNavbarSecondaryMenu = false;

            $(".customSecondaryMenuGrid").animate({
                bottom: "-100%",
                opacity: 0
            }, animSecondaryNavbarTime);
            
            setTimeout(() => {
                $(".customNavigationScreenOverlay").remove();
            }, animSecondaryNavbarTime);
            
            for (let i = 1; i <= 10; i += 1) {
                setTimeout(() => {
                    $(".customNavigationScreenOverlay").css({
                        "background-color": `rgba(0, 0, 0, ${0.06*(10-i)})`,
                        "backdrop-filter": `blur(${10-i}px)`
                    }, 250);
                    $(".customNavbar").css({ opacity: 1 - 0.01*(10-i) });
                }, i * (animSecondaryNavbarTime/10));
            }
        }
    });

    $(".aronaContainer").on("mousedown", aronaStartDrag);
    $(window).on("mousemove", aronaDrag);
    $(window).on("mouseup", aronaEndDrag);

    // ======== Main loop that iterates by frame ========
    setInterval(function() {
        // unconditional checks after every frame
        // scroll distance

        // arona dizzy check


        // arona position when dragging

        // arona position in other states
        // - grounded: force set y
        // - falling: constrain position
        //   - free fall
        //   - umbrella: constrain velocity


        // constrain arona position
        // - horizontal: bounce
        // - vertical: top bounce, bottom crop


        // physcial objects
        // - always under gravity
        // - never collide with borders

    }, FRAME_RATE);
});
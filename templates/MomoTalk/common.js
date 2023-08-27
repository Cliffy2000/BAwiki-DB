var currentStudent;
var currentAffection = "1";
var messageBlockIndex = 0;
var responseBlockIndex = 0;
var rowId = 0;
var chatOpen = false;

// ================= page statuses and global variables
var momotalkMainJson;
var momotalkData = {};
var momotalkPage = 0;

// ================= local panel states
var momotalkStudentSelect = false;      // student selection page in diy

// ================= momotalk parameters
var momotalkCurrectPerson = "student";
var momotalkBasicLineIndex = null;
var momotalkBasicLineDataIndex = null;
var momotalkCurrentType = 'affection1';  // affection/custom, determines which data to expand for blocks
var momotalkCurrentBlockIndex = 0;
// var momotalkBasicCurrentMode; // send, lineSelect, insert, edit
var diyAdvancedStudentList = [];


$(function () {
    // full screen
    $(".appHeader").on("click", function () {
        var element = $(".app")[0];
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            // if (element.requestFullscreen) {
            //     $(this).html(`<p>1</p>`);
            //     element.requestFullscreen();
            // } else if (element.mozRequestFullScreen) {
            //     $(this).html(`<p>2</p>`);
            //     element.mozRequestFullScreen();
            // } else if (element.webkitRequestFullscreen) {
            //     $(this).html(`<p>3</p>`);
            //     element.webkitRequestFullscreen();
            // } else if (element.msRequestFullscreen) {
            //     $(this).html(`<p>4</p>`);
            //     element.msRequestFullscreen();
            // } else {
            //     $(this).html(`<p>5</p>`);
            //     // mobile
            //     $('div').removeClass('on-top');
            //     element.addClass('on-top');
            //     $('body').addClass('hide-all');
            // }
            $(this).html(`<p>5</p>`);
            $('div').removeClass('on-top');
            $(".app").addClass('on-top');
            $('body').addClass('hide-all');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else {
                // Reset styles after exiting pseudo-fullscreen
                element.style.position = 'static';
                element.style.width = 'auto';
                element.style.height = 'auto';
                element.style.zIndex = 'auto';
            }
        }
    });


    // loads the main json for momotalk that and renders the characters
    // whose momotalks have been published
    $.ajax({
        url: "https://wiki.biligame.com/ba/index.php?title=MediaWiki:MomotalkMain.json&action=raw",
        dataType: "text",
        success: function (data) {
            momotalkMainJson = JSON.parse(data);
            let chats = ``;
            // fill chats window with content on load
            for (let student in momotalkMainJson) {
                if (momotalkMainJson[student]["publish"] === true) {
                    chats += `
                    <div class="chatPreview" id="${student}">
                        <div class="previewImg">
                            <img src="${momotalkMainJson[student]["img"]}" >
                        </div>
                        <div class="previewText">
                            <div class="previewName">${student}</div>
                            <div class="previewMessage">${momotalkMainJson[student]["statusLine"]}</div>
                        </div>
                    </div>`;
                }
                momotalkData[student] = {
                    "img": momotalkMainJson[student]["img"]
                }
                diyAdvancedStudentList.push(student);
            };
            $(".chatPreviewList").html(chats);
        },
        error: function () {
            console.log("Failed to load student list.");
        }
    });

    // ingame momotalk chat content
    $(".mainWindow").on("click", ".chatPreview", function () {
        if (!chatOpen) {
            chatOpen = true;
            currentStudent = $(this).attr('id');

            // generates the json link to the current student, 
            // loads the file and starts the conversation 
            let currentUrl = "https://wiki.biligame.com/ba/index.php?title=MediaWiki:Momotalk" + currentStudent + ".min.jsn&action=raw";
            $.ajax({
                url: currentUrl,
                dataType: "text",
                success: function (data) {
                    let jsonData = JSON.parse(data);
                    for (let k in jsonData) {
                        momotalkData[currentStudent][k] = jsonData[k];
                    }
                    let newPage = `<div class="chatScreen"></div>`;
                    $(".mainWindow").append(newPage);
                    // this is the initial messsage
                    // $(".chatScreen").append(renderInitialMessage(momotalkData[currentStudent]["affection"]["1"][0][0]));

                    $(".chatScreen").animate({
                        left: 0
                    }, 500, function () {
                        $(".chatPreviewList").hide();

                        // this is the first render
                        // if (momotalkData[currentStudent]["affection"]["1"]["messages"][0].length > 1) {
                        //     messageAnimations(momotalkData[currentStudent]["affection"]["1"]["messages"][0].slice(1), 0, function () {
                        //         optionsAnimations(momotalkData[currentStudent]["affection"]["1"]["replies"][responseBlockIndex]);
                        //     });
                        // }
                        // else {
                        //     optionsAnimations(momotalkData[currentStudent]["affection"]["1"]["replies"][responseBlockIndex]);
                        // }
                        renderAnimationSequence(0);
                    });
                },
                error: function () {
                    console.log("Failed to load specific data file for the student");
                }
            });
        }
    });

    // onclick event for user response selector
    $(".mainWindow").on("click", ".option", function () {
        // if (responseBlockIndex !== -1) {
        //     if ($(this).hasClass("option1")) {
        //         // clicked on the first option
        //         $(".optionsRow").remove();
        //         responseAnimations(data[currentStudent]["replies"][responseBlockIndex][0][0]);
        //         messageAnimations(data[currentStudent]["messages"][messageBlockIndex], 0, function () {
        //             optionsAnimations(data[currentStudent]["replies"][responseBlockIndex]);
        //         });
        //     }

        //     else {
        //         // clicked on second option
        //         $(".optionsRow").remove();
        //         responseAnimations(data[currentStudent]["replies"][responseBlockIndex][1][0]);
        //         messageAnimations(data[currentStudent]["messages"][messageBlockIndex], 0, function () {
        //             optionsAnimations(data[currentStudent]["replies"][responseBlockIndex]);
        //         });
        //     }
        // }
        let optionText = $(this).text();
        $(".optionsRow").remove();
        responseAnimations(optionText);
        renderAnimationSequence(0);
    });

    // return button from chat to chatPreview
    $(".returnButton").on("click", function () {
        $(".chatPreviewList").show();
        $(".chatScreen").animate({
            left: "100%"
        }, 500, function () {
            $(".returnButton").hide();
            $(".chatScreen").remove();
            chatOpen = false;
        });
    });

    // switch to ingame momotalk content
    $(".chat").on("click", function () {
        if (momotalkPage === 1) {
            momotalkPage = 0;
            $('.chat').css({ "background-color": "#68788F" });
            $('.diy').css({ "background-color": "#4c5b6f" });

            // determines if there is an ongoing ingame chat
            if (chatOpen) {
                $(".chatScreen").show();
            } else {
                $(".chatPreviewList").show();
            }
            $(".diyHomePage").hide();
        }
    });

    // switch to custom content
    $(".diy").on("click", function () {
        if (momotalkPage === 0) {
            momotalkPage = 1;
            $('.diy').css({ "background-color": "#68788F" });
            $('.chat').css({ "background-color": "#4c5b6f" });

            if (chatOpen) {
                $(".chatScreen").hide();
            } else {
                $(".chatPreviewList").hide();
            }
            $(".diyHomePage").show();
        }
    });

    // diy basic mode start with student selection page
    $(".diyBasicMode").on("click", function () {
        if (!momotalkStudentSelect) {
            momotalkStudentSelect = true;
            let students = ``;
            for (let student in momotalkMainJson) {
                let id = "studentSelectIcon" + student;
                students += `
                    <div class="studentSelectIcon" id=${id} onclick="studentSelectIconClick(event, 'basic')">
                        <img src=${momotalkMainJson[student]['img']}>
                    </div>`;
            }

            let studentPanel = `
                <div class="studentSelectPanel">
                    <div class="studentSelectPanelHeader">
                        <div class="studentSelectPanelHeaderText">
                            Select a student
                        </div>
                        <div>X</div>
                    </div>
                    <div class="studentSelectIconGrid">
                        ${students}
                    </div>
                </div>`;
            $(".mainWindow").append(studentPanel);
        }
    });

    // diy basic mode text send with enter keypress
    $(".mainWindow").on('keypress', ".diyBasicInput", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            basicModeSendText();
            basicModeReset();
        }
    });

    // diy basic mode text send with send button press
    $(".mainWindow").on("click", ".diyBasicInputSend", function () {
        basicModeSendText();
        basicModeReset();
    });

    // diy basic mode text insert save with enter keypress
    $(".mainWindow").on('keypress', ".diyBasicInsert", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            basicInsertSave();
        }
    });

    $(".diyAdvancedMode").on("click", function () {
        if (!momotalkStudentSelect) {
            let studentPanel = generateAdvancedStudentSelect();
            $(".mainWindow").append(studentPanel);
        }
    })
})


function basicRowSelect(element) {
    if ($(element).css("background-color") !== "rgb(211, 211, 211)") {
        momotalkBasicLineIndex = $('.diyBasicRow').index(element);
        momotalkBasicLineDataIndex = findRowInData(momotalkBasicLineIndex);
        if (momotalkBasicLineDataIndex) {
            $('.diyBasicRow').css('background-color', 'white');
            $(element).css('background-color', '#d3d3d3');

            $(".diyBasicButtonBar").show();
            $(".diyBasicInputBar").hide();
        }
    }

    // the current row is already selected and should be deselected
    else {
        $('.diyBasicRow').css('background-color', 'white');
        $(".diyBasicButtonBar").hide();
        $(".diyBasicEditBar").hide();
        $(".diyBasicInputBar").show();
        momotalkBasicLineIndex = null;
        momotalkBasicLineDataIndex = null;
    }
}


function studentSelectIconClick(event, mode) {
    currentStudent = event.currentTarget.id.slice(17);
    momotalkCurrectPerson = currentStudent;
    $(".studentSelectPanel").remove();
    momotalkStudentSelect = false;

    // different modes
    if (mode === "basic") {
        renderDiyBasicMode();
    } else if (mode === "advanced") {
        renderAdvancedMode();
    }
}


// renders the basic mode page as well as hidden button bars
function renderDiyBasicMode() {
    let newDiy = `
        <div class="diyBasicScreen">
            <div class="diyBasicDataScreen"></div>
            <div class="diyBasicInputBar">
                <div class="diyBasicInputIcon">
                    <img src=${momotalkMainJson[currentStudent]['img']} onclick="basicSwapMomotalkPerson()">
                </div>
                <div class="diyBasicInputWindow">
                    <input class="diyBasicInput" type="text">
                </div>
                <div class="diyBasicInputSend diyBasicButtonSmall">
                    <p>发送</p>
                </div>
            </div>
            <div class="diyBasicButtonBar" style="display: none">
                <div class="diyBasicInputInsert diyBasicButtonLarge" onclick="basicModeInsert()">
                    <p>在此行前插入</p>
                </div>
                <div class="diyBasicInputDelete diyBasicButtonSmall" onclick="basicModeDelete()">
                    <p>删除</p>
                </div>
                <div class="diyBasicInputEdit diyBasicButtonSmall" onclick="basicModeEdit()">
                    <p>编辑</p>
                </div>
            </div>
            <div class="diyBasicInsertBar" style="display: none">
                <div class="diyBasicInsertIcon">
                    
                </div>
                <div class="diyBasicInsertWindow">
                    <input class="diyBasicInsert" type="text">
                </div>
                <div class="diyBasicInsertSave diyBasicButtonSmall" onclick="basicInsertSave()">
                    <p>保存</p>
                </div>
            </div>
            <div class="diyBasicEditBar" style="display: none">
                <div class="diyBasicEditIcon">
                    
                </div>
                <div class="diyBasicEditWindow">
                    <input class="diyBasicEdit" type="text">
                </div>
                <div class="diyBasicEditSave diyBasicButtonSmall" onclick="basicEditSave()">
                    <p>保存</p>
                </div>
            </div>
        </div>
    `;
    $(".mainWindow").append(newDiy);
    $(".diyBasicScreen").animate({
        left: 0,
    }, 500, function () {
        $(".diyHomePage").hide();
    });
}


function renderAdvancedMode() {
    let newDiy = `
        <div class="diyAdvancedScreen">
            <div class="diyAdvancedDataScreen"></div>
            <div class="diyAdvancedInputBar">
                <div class="diyAdvancedInputIcon">
                    <img src=${momotalkMainJson[currentStudent]['img']} onclick="advancedSwapMomotalkPerson()">
                </div>
                <div class="diyAdvancedInputWindow">
                    <input class="diyAdvancedInput" type="text">
                </div>
                <div class="diyAdvancedInputSend diyAdvancedButtonSmall">
                    <p>发送</p>
                </div>
            </div>
            <div class="diyAdvancedButtonBar" style="display: none">
                <div class="diyAdvancedInputInsert diyAdvancedButtonLarge" onclick="advancedModeInsert()">
                    <p>在此行前插入</p>
                </div>
                <div class="diyAdvancedInputDelete diyAdvancedButtonSmall" onclick="advancedModeDelete()">
                    <p>删除</p>
                </div>
                <div class="diyAdvancedInputEdit diyAdvancedButtonSmall" onclick="advancedModeEdit()">
                    <p>编辑</p>
                </div>
            </div>
            <div class="diyAdvancedInsertBar" style="display: none">
                <div class="diyAdvancedInsertIcon">
                    
                </div>
                <div class="diyAdvancedInsertWindow">
                    <input class="diyAdvancedInsert" type="text">
                </div>
                <div class="diyAdvancedInsertSave diyAdvancedButtonSmall" onclick="advancedInsertSave()">
                    <p>保存</p>
                </div>
            </div>
            <div class="diyAdvancedEditBar" style="display: none">
                <div class="diyAdvancedEditIcon">
                    
                </div>
                <div class="diyAdvancedEditWindow">
                    <input class="diyAdvancedEdit" type="text">
                </div>
                <div class="diyAdvancedEditSave diyAdvancedButtonSmall" onclick="advancedEditSave()">
                    <p>保存</p>
                </div>
            </div>
        </div>
    `;
    $(".mainWindow").append(newDiy);
    $(".diyAdvancedScreen").animate({
        left: 0,
    }, 500, function () {
        $(".diyHomePage").hide();
    });
}


function basicSwapMomotalkPerson() {
    if (momotalkCurrectPerson === 'USER') {
        momotalkCurrectPerson = currentStudent;
        $(".diyBasicInputIcon img").attr("src", momotalkMainJson[currentStudent]['img']);
        $(".diyBasicInsertIcon img").attr("src", momotalkMainJson[currentStudent]['img']);
    } else {
        momotalkCurrectPerson = 'USER';
        $(".diyBasicInputIcon img").attr("src", "https://patchwiki.biligame.com/images/ba/c/c0/i30cet6xtxofuq07fjsfmquldzmzpgf.png");
        $(".diyBasicInsertIcon img").attr("src", "https://patchwiki.biligame.com/images/ba/c/c0/i30cet6xtxofuq07fjsfmquldzmzpgf.png");
    }
}


function getLast(arr) {
    return arr[arr.length - 1];
}


function findRowInData(index) {
    let count = 0;
    let arr = momotalkData[currentStudent]['custom'];

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (count === index) {
                return [i, j];
            }
            count++;
        }
    }

    return null;
}


function basicModeSendText() {
    let text = $(".diyBasicInput").val();
    if (text === '') {
        return;
    }

    if (!('custom' in momotalkData[currentStudent])) {
        momotalkData[currentStudent]['custom'] = [];
    }

    // first entry of data
    if (momotalkData[currentStudent]['custom'].length === 0) {
        momotalkData[currentStudent]['custom'].push(
            [
                [momotalkCurrectPerson, text, true, -1]
            ]
        );
        basicModeDataAppend(text, true);
    }

    // existing data exists
    else {
        if ((momotalkCurrectPerson !== "USER") && (momotalkData[currentStudent]['custom'][momotalkData[currentStudent]['custom'].length - 1][0][0] !== "USER")) {
            let prevPointer = getLast(getLast(momotalkData[currentStudent]['custom']))[3];
            momotalkData[currentStudent]['custom'][momotalkData[currentStudent]['custom'].length - 1][momotalkData[currentStudent]['custom'][momotalkData[currentStudent]['custom'].length - 1].length - 1][3] = null;
            momotalkData[currentStudent]['custom'][momotalkData[currentStudent]['custom'].length - 1].push(
                [momotalkCurrectPerson, text, false, prevPointer]
            );
            basicModeDataAppend(text, false);
        }
        else {
            momotalkData[currentStudent]['custom'].push(
                [
                    [momotalkCurrectPerson, text, true, -1]
                ]
            );
            basicModeRecountIndices(momotalkData[currentStudent]['custom'].length - 2);
            basicModeDataAppend(text, true);
        }
    }

    $(".diyBasicDataScreen").scrollTop($(".diyBasicDataScreen")[0].scrollHeight);
}


function basicModeReset() {
    $(".diyBasicInput").val('');
}


function basicModeInsert() {
    $(".diyBasicInsertIcon").html($(".diyBasicInputIcon").html());
    $(".diyBasicInsertBar").show();
    $(".diyBasicButtonBar").hide();
}


function basicInsertSave() {
    let text = $(".diyBasicInsert").val();
    if (text === '') {
        return;
    }

    let insertIcon = true;
    // insert a user line
    if (momotalkCurrectPerson === "USER") {
        // check if the inserted line is in the middle of a student 
        // block that needs to be split
        if ((momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]][0][0] !== "USER") && (momotalkBasicLineDataIndex[1] > 0)) {
            // split the block that contains the current line
            let currentBlock = momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]];
            let blockFront = currentBlock.slice(0, momotalkBasicLineDataIndex[1]);
            let blockBack = currentBlock.slice(momotalkBasicLineDataIndex[1]);

            momotalkData[currentStudent]['custom'].splice(momotalkBasicLineDataIndex[0], 1, blockFront, [["USER", text, true, momotalkBasicLineDataIndex[0] + 1]], blockBack);
            basicModeRecountIndices(momotalkBasicLineDataIndex[0]);
        }

        else {
            momotalkData[currentStudent]['custom'].splice(momotalkBasicLineDataIndex[0], 0, [["USER", text, true, momotalkBasicLineDataIndex[0] + 1]]);
            basicModeRecountIndices(momotalkBasicLineDataIndex[0] + 1);
        }
    }

    // insert a student line
    else {
        // inserting at the beginning of a student block
        if ((momotalkBasicLineDataIndex[1] === 0) && (momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]][0][0] !== "USER")) {
            // change the original first line
            momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]][0][2] = false;
            momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]].splice(0, 0, [currentStudent, text, true, null]);
            basicModeRecountIndices(momotalkBasicLineDataIndex[0]); // DEPRECATED

            let movedLineDataIndex = findRowInData(momotalkBasicLineIndex + 1);
            let movedLine = basicLineGeneration(momotalkData[currentStudent]['custom'][movedLineDataIndex[0]][movedLineDataIndex[1]][0], momotalkData[currentStudent]['custom'][movedLineDataIndex[0]][movedLineDataIndex[1]][1], false);
            $(`.diyBasicRow:eq(${momotalkBasicLineIndex})`).replaceWith(movedLine);
        }

        // inserting in the middle of a student block
        else if ((momotalkBasicLineDataIndex[1] > 0) && (momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]][0][0] !== "USER")) {
            momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]].splice(momotalkBasicLineDataIndex[1], 0, [currentStudent, text, false, null]);
            insertIcon = false;
        }

        else {
            // inserting before a user block as the first block
            if (momotalkBasicLineDataIndex[0] === 0) {
                momotalkData[currentStudent]['custom'].splice(0, 0, [[currentStudent, text, true, 1]]);
                basicModeRecountIndices(0);
            }

            else {
                let prevBlockIndex = findRowInData(momotalkBasicLineIndex - 1);
                let prevBlockPerson = (momotalkData[currentStudent]['custom'][prevBlockIndex[0]][0][0] === "USER");
                // insert between user blocks as student
                if (prevBlockPerson) {
                    momotalkData[currentStudent]['custom'].splice(momotalkBasicLineDataIndex[0], 0, [[currentStudent, text, true, 0]]);
                    basicModeRecountIndices(momotalkBasicLineDataIndex[0]);
                }

                // merge into previous student block
                else {
                    momotalkData[currentStudent]['custom'][prevBlockIndex[0]].push([currentStudent, text, false, momotalkData[currentStudent]['custom'][prevBlockIndex[0]][prevBlockIndex[1]][3]]);
                    momotalkData[currentStudent]['custom'][prevBlockIndex[0]][prevBlockIndex[1]][3] = null;
                    insertIcon = false;
                }
            }
        }
    }

    let newLine = basicLineGeneration(momotalkCurrectPerson, text, insertIcon);
    $(`.diyBasicRow:eq(${momotalkBasicLineIndex})`).before(newLine);

    $(".diyBasicInsert").val('');
    $(".diyBasicInsertBar").hide();
    $(".diyBasicInputBar").show();
    $('.diyBasicRow').css('background-color', 'white');
}


function basicModeRecountIndices(startIndex) {
    for (let i = startIndex; i < momotalkData[currentStudent]['custom'].length; i++) {
        let newIndex = i + 1;
        if (i === momotalkData[currentStudent]['custom'].length - 1) {
            newIndex = -1;
        }
        momotalkData[currentStudent]["custom"][i][momotalkData[currentStudent]["custom"][i].length - 1][3] = newIndex;
    }
}


function basicModeDelete() {
    // always delete the full user block in basic mode
    if (momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]][0][0] === "USER") {
        momotalkData[currentStudent]['custom'].splice(momotalkBasicLineDataIndex[0], 1);

        // makes sure index is correct before checking if the prev and after
        // blocks can be merged
        let arr = momotalkData[currentStudent]['custom'];
        if ((momotalkBasicLineDataIndex[0] > 0) && (momotalkBasicLineDataIndex[0] < arr.length)) {
            // merge prev and after student blocks
            if ((arr[momotalkBasicLineDataIndex[0] - 1][0][0] !== "USER") && (arr[momotalkBasicLineDataIndex[0]][0][0] !== "USER")) {
                let after = arr[momotalkBasicLineDataIndex[0]][0];
                $(`.diyBasicRow:eq(${momotalkBasicLineIndex + 1})`).replaceWith(basicLineGeneration(after[0], after[1], false));

                momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]][0][2] = false;
                let merged = arr[momotalkBasicLineDataIndex[0] - 1].concat(arr[momotalkBasicLineDataIndex[0]]);
                momotalkData[currentStudent]['custom'].splice(momotalkBasicLineDataIndex[0] - 1, 2, merged);
                basicModeRecountIndices(momotalkBasicLineIndex - 1);
            }

            // delete without additional merges
            else {
                if (momotalkBasicLineIndex < momotalkData[currentStudent]['custom'].length) {
                    basicModeRecountIndices(momotalkBasicLineIndex);
                }
            }
        }

        $(`.diyBasicRow:eq(${momotalkBasicLineIndex})`).remove();
    }

    // deleting a student line
    else {
        let blockLength = momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]].length;
        $(`.diyBasicRow:eq(${momotalkBasicLineIndex})`).remove();
        // delete a single line student block
        if (blockLength === 1) {
            momotalkData[currentStudent]['custom'].splice(momotalkBasicLineDataIndex[0], 1);
            basicModeRecountIndices(momotalkBasicLineDataIndex[0]);
        }
        // delete the first line of a student block
        else if (momotalkBasicLineDataIndex[1] === 0) {
            momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]].splice(0, 1);
            momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]][0][2] = true;
            let arr = momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]][0];
            $(`.diyBasicRow:eq(${momotalkBasicLineIndex})`).replaceWith(basicLineGeneration(arr[0], arr[1], arr[2]));
        }

        // delete a line in a student block
        else {
            if (momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]] === momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]].length - 1) {
                momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]][momotalkBasicLineDataIndex[1] - 1][3] = momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]][momotalkBasicLineDataIndex[1]][3];
            }
            momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]].splice(momotalkBasicLineDataIndex[1], 1);
        }
    }

    $(".diyBasicButtonBar").hide();
    $(".diyBasicInputBar").show();
}


function basicModeEdit() {
    $(".diyBasicEditIcon").html($(".diyBasicInputIcon").html());
    $(".diyBasicEditBar").show();
    $(".diyBasicButtonBar").hide();
    $(".diyBasicEdit").val(momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]][momotalkBasicLineDataIndex[1]][1]);
}


function basicEditSave() {
    let editted = $(".diyBasicEdit").val();
    momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]][momotalkBasicLineDataIndex[1]][1] = editted;
    $(`.diyBasicRow:eq(${momotalkBasicLineIndex})`).replaceWith(
        basicLineGeneration(momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]][momotalkBasicLineDataIndex[1]][0], editted, momotalkData[currentStudent]['custom'][momotalkBasicLineDataIndex[0]][momotalkBasicLineDataIndex[1]][2])
    );
    $(".diyBasicEdit").val('');
    $(".diyBasicEditBar").hide();
    $(".diyBasicInputBar").show();
    $(".diyBasicRow").css("background-color", "white");
}


function basicModeDataAppend(textContent, icon) {
    let content = basicLineGeneration(momotalkCurrectPerson, textContent, icon)
    $(".diyBasicDataScreen").append(content);
}


function basicLineGeneration(person, textContent, icon) {
    if (person === 'USER') {
        if (icon) {
            newLine = `
                <div class="diyBasicDataRow diyBasicRow" onclick="basicRowSelect(this)">
                    <div class="diyBasicUserRow">
                        <div class="diyUserLineTextPointed">
                            <p>${textContent}</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            newLine = `
                <div class="diyBasicDataRow diyBasicRow" onclick="basicRowSelect(this)">
                    <div class="diyBasicUserRow">
                        <div class="diyUserLineText">
                            <p>${textContent}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    else {
        if (icon) {
            newLine = `
                <div class="diyBasicDataIconRow diyBasicRow" onclick="basicRowSelect(this)">
                    <div class="diyBasicStudentRow">
                        <div class="diyBasicStudentRowIcon">
                            <img src=${momotalkData[person]['img']}>
                        </div>
                        <div class="diyBasicStudentRowLine">
                            <div class="diyStudentLineName">
                                <p>${currentStudent}</p>
                            </div>
                            <div class="diyStudentLineTextPointed">
                                <p>${textContent}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            newLine = `
                <div class="diyBasicDataRow diyBasicRow" onclick="basicRowSelect(this)">
                    <div class="diyBasicStudentRow">
                        <div class="diyBasicStudentRowIcon">
                        </div>
                        <div class="diyBasicStudentRowLine">
                            <div class="diyStudentLineText">
                                <p>${textContent}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    return newLine;
}


// DEPRECATED
function renderInitialMessage(text) {
    return `
        <div class="chatRowWithIcon messageRow" id=${rowId}>
            <div class="chatRowIcon">
            <img src="${momotalkData[currentStudent]["img"]}">
            </div>
            <div class="chatRowTextCol">
                <div class="chatRowName">
                    ${currentStudent}
                </div>
                <div class="chatRowText">
                    ${text}
                </div>
            </div>
        </div>
    `;
}


function renderMessageRow(person, text, withIcon) {
    let msg = ``;
    if (text.indexOf(".png") === -1) {
        msg = `<div class="chatRowText chatRowContent" style="display: none">
                ${text}
            </div>`;
    } else {
        msg = `<div class="chatRowImg chatRowContent" style="display: none">
                <div class="chatRowImgWrapper">
                    <img src="${text}">
                </div>
            </div>`
    }

    if (withIcon) {
        return `
            <div class="chatRowWithIcon messageRow" id=${rowId}>
                <div class="chatRowIcon">
                <img src="${momotalkData[person]["img"]}">
                </div>
                <div class="chatRowTextCol">
                    <div class="chatRowName">
                        ${person}
                    </div>
                    <div class="chatTypingDots">
                        <div class="typingDot1"></div>
                        <div class="typingDot2"></div>
                        <div class="typingDot3"></div>
                    </div>
                    ${msg}
                </div>
            </div>
        `;
    }

    else {
        return `
            <div class="chatRow messageRow" id=${rowId}>
                <div class="chatRowIcon"></div>
                <div class="chatRowTextCol">
                    <div class="chatTypingDots">
                        <div class="typingDot1"></div>
                        <div class="typingDot2"></div>
                        <div class="typingDot3"></div>
                    </div>
                    <div class="chatRowText chatRowContent" style="display: none">
                        ${text}
                    </div>
                </div>
            </div>
        `;
    }
}


// DEPRECATED
function renderOptionsRow(lines) {
    let options = ``;
    lines.forEach(line => {
        options += `<div class="option option1" onclick=updateMessageIndex(${line[1]})>${line[0]}</div>`;
    });
    return `
        <div class="optionsRow">
            <div class="optionsRowContent">
                <div class="optionsHeader">
                    <div class="optionsHeaderText">
                        <p>回复</p>
                    </div>
                </div>
                <div class="optionSelector">
                    ${options}
                </div>
            </div>
        <div>
    `;
}

function generateOptionsBlock(block) {
    let options = ``;
    block.forEach(line => {
        options += `<div class="option" onclick=updateBlockIndex(${line[3]})>${line[1]}</div>`;
    });
    return `
        <div class="optionsRow">
            <div class="optionsRowContent">
                <div class="optionsHeader">
                    <div class="optionsHeaderText">
                        <p>回复</p>
                    </div>
                </div>
                <div class="optionSelector">
                    ${options}
                </div>
            </div>
        <div>
    `;
}


function renderResponseRow(line) {
    return `
        <div class="responseRow">
            <div class="responseRowContent">
                <p>${line}</p>
            </div>
        </div>
    `;
}


// DEPRECATED
function messageAnimations(lines, i, callback) {
    if (i >= lines.length) {
        callback();
        return;
    }

    let line = lines[i];
    let icon = line[2];
    let chatWindow = $(".chatScreen");

    if (line[line.length - 1] !== null) {
        responseBlockIndex = line[3];
    }

    $(chatWindow).queue(function (next) {
        rowId += 1;
        let row = renderMessageRow(line[1], icon);

        // wait 500ms before new message shows up
        $(chatWindow).animate({ opacity: '1' }, 500, function () {
            $(chatWindow).append(row);
            $(".mainWindow").scrollTop($(".mainWindow")[0].scrollHeight);
            $(".messageRow:last").find(".chatTypingDots").delay(1000).fadeOut(1, function () {
                $(this).remove();
                $(".messageRow:last").find(".chatRowContent").show();
                $(".mainWindow").scrollTop($(".mainWindow")[0].scrollHeight);
                $(chatWindow).animate({ opacity: '1' }, 500, function () {
                    next();
                    messageAnimations(lines, i + 1, callback);
                });
            });
        });
    }).dequeue();
}


// starts rendering down the block sequence and stops after rendering
// the first options block
function renderAnimationSequence(recursiveIndex) {
    let currentBlock = momotalkData[currentStudent][momotalkCurrentType][momotalkCurrentBlockIndex];

    // reached end of block sequence
    if (momotalkCurrentBlockIndex === -1) {
        return;
    }

    // preventing index out of range error
    if (momotalkCurrentBlockIndex >= momotalkData[currentStudent][momotalkCurrentType].length) {
        return;
    }

    // upcoming block is a user block, function should end after render
    if (currentBlock[0][0] === "USER") {
        renderOptions(currentBlock);
        momotalkCurrentBlockIndex = currentBlock[currentBlock.length - 1][3];
        return;
    }

    // end case for recursion
    if (recursiveIndex >= currentBlock.length) {
        momotalkCurrentBlockIndex = currentBlock[currentBlock.length - 1][3];
        renderAnimationSequence(0);
        return;
    }

    // recursive loop to go through a student message block
    let chatWindow = $(".chatScreen");
    $(chatWindow).queue(function (next) {

        let row = renderMessageRow(currentBlock[recursiveIndex][0], currentBlock[recursiveIndex][1], currentBlock[recursiveIndex][2]);

        $(chatWindow).animate({ opacity: '1' }, 500, function () {
            $(chatWindow).append(row);
            $(".mainWindow").scrollTop($(".mainWindow")[0].scrollHeight);
            $(".messageRow:last").find(".chatTypingDots").delay(1000).fadeOut(1, function () {
                $(this).remove();
                $(".messageRow:last").find(".chatRowContent").show();
                $(".mainWindow").scrollTop($(".mainWindow")[0].scrollHeight);
                $(chatWindow).animate({ opacity: '1' }, 500, function () {
                    next();
                    renderAnimationSequence(recursiveIndex + 1);
                });
            });
        });
    }).dequeue();
}


// DEPRECATED
function optionsAnimations(lines) {
    let chatWindow = $(".chatScreen");

    $(chatWindow).queue(function (next) {
        let options = renderOptionsRow(lines);
        $(chatWindow).animate({ opacity: '1' }, 200, function () {
            $(chatWindow).append(options);
            $(".mainWindow").scrollTop($(".mainWindow")[0].scrollHeight);
            next();
        });
    }).dequeue();
}


function renderOptions(block) {
    let chatWindow = $(".chatScreen");

    $(chatWindow).queue(function (next) {
        let options = generateOptionsBlock(block);
        $(chatWindow).animate({ opacity: '1' }, 200, function () {
            $(chatWindow).append(options);
            $(".mainWindow").scrollTop($(".mainWindow")[0].scrollHeight);
            next();
        });
    }).dequeue();
}


function responseAnimations(line) {
    let chatWindow = $(".chatScreen");

    $(chatWindow).queue(function (next) {
        let response = renderResponseRow(line);
        $(".mainWindow").scrollTop($(".mainWindow")[0].scrollHeight);
        $(chatWindow).animate({ opacity: '1' }, 200, function () {
            $(chatWindow).append(response);
            $(".mainWindow").scrollTop($(".mainWindow")[0].scrollHeight);
            next();
        });
    }).dequeue();
}


// DEPRECATED
function updateMessageIndex(i) {
    messageBlockIndex = i;
}


function updateBlockIndex(newBlockIndex) {
    momotalkCurrentBlockIndex = newBlockIndex;
}


function generateAdvancedStudentSelect() {
    let students = ``;
    for (let student in momotalkMainJson) {
        let id = "studentSelectIcon" + student;
        students += `
                    <div class="studentSelectIcon" id=${id} onclick="studentSelectIconClick(event, 'advanced')">
                        <img src=${momotalkMainJson[student]['img']}>
                    </div>`;
    }

    let studentPanel = `
        <div class="studentSelectPanel">
            <div class="studentSelectPanelHeader">
                <div class="studentSelectPanelHeaderText">
                    Select a student
                </div>
                <div>X</div>
            </div>
            <div class="studentSelectIconGrid">
                ${students}
            </div>
        </div>`;

    return studentPanel;
}

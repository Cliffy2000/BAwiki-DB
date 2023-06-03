var data = {
    "Aru": {
        "Id": 1,
        "img": "AruIcon.png",
        "messages": [
            /* 
                For every message the structure is as follows:
                    1. The first value is the content of the current line and is always a string. It can be the sentence of text, or the src link to the img.
                    2. a boolean value to indicate if there is an icon for the line.
                    3. 

            */
            [
                ["Message 1", true, false, null],
                ["Message 2", false, false, 0]
            ],
            [
                ["Message 3", true, false, 1]
            ],
            [
                ["Message 4", true, false, null],
                ["Message 5", false, false, null],
                ["Message 6", true, false, 2]
            ],
            [
                ["Message 7", true, false, null],
                ["Message 8", true, false, 2]
            ],
            [
                ["Message 9", true, false, null],
                ["Message 10", false, false, null]
            ],
        ],
        // [response text, message index change]
        "replies": [
            [   
                ["Response 1", 1]
            ],
            [
                ["Response 2", 2],
                ["Repsonse 3", 3]
            ],
            [
                ["Response 4", 4]
            ]
        ]
    },
    "Yuuka": {
        "Id": 1,
        "img": "YuukaTrackIcon.png"
    },
}

var currentStudent;
var messageBlockIndex = 0;
var responseBlockIndex = 0;
var currentTier = 0;
var rowId = 0

$(function () {
    let chats = ``;
    // fill chats window with content on load
    for (let student in data) {
        chats += `
            <div class="chatPreview" id="${student}">
                <div class="previewImg">
                    <img src="${data[student]['img']}" >
                </div>
                <div class="previewText">
                    <div class="previewName">${student}</div>
                    <div class="previewMessage">This is a sample message.</div>
                </div>
            </div>
        `
    }
    $(".chatPreviewList").html(chats);

    $(".chatPreview").on('click', function () {
        currentStudent = $(this).attr('id')

        let newPage = `<div class="chatScreen"></div>`;
        $(".mainWindow").append(newPage);
        // this is the initial messsage
        $(".chatScreen").html(renderInitialMessage(data[currentStudent]['messages'][currentTier][messageBlockIndex][0][0], withIcon = true));

        $(".chatScreen").html(renderResponseRow());

        $(".chatScreen").animate({
            left: 0
        }, 500, function () {
            $(".chatPreviewList").hide();
            $(".returnButton").show();

            // this is the first render
            optionsAnimations(['abc']);
            messageAnimations([['1', true], ['2', false]], 0);
            $(".chatScreen").dequeue();
            $(".chatScreen").dequeue();
        });
    });

    $(".mainWindow").on('click', ".option", function() {
        let numOptions = $('.optionSelector').find(".option").length;

        if ($(this).hasClass("option1")) {
            // clicked on the first option
            if (numOptions == 1) {
                $(this).remove();
                renderMessageRow(data[currentStudent]['replies'][responseBlockIndex][0]);
                messageBlockIndex += 1;
                renderMessageRow(data[currentStudent]['mess'])
            }
        } 
        
        else {
            // clicked on second option
            console.log('2');
        }
    })

    $(".returnButton").on('click', function () {
        $(".chatPreviewList").show();
        $(".chatScreen").animate({
            left: "100%"
        }, 500, function () {
            $(".returnButton").hide();
            $(".chatScreen").remove();
        });
    })
})


function renderInitialMessage(text) {
    return `
        <div class="chatRowWithIcon messageRow" id=${rowId}>
            <div class="chatRowIcon">
            <img src="${data[currentStudent]["img"]}">
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


function renderMessageRow(text, withIcon) {
    if (withIcon) {
        return `
            <div class="chatRowWithIcon messageRow" id=${rowId}>
                <div class="chatRowIcon">
                <img src="${data[currentStudent]["img"]}">
                </div>
                <div class="chatRowTextCol">
                    <div class="chatRowName">
                        ${currentStudent}
                    </div>
                    <div class="chatTypingDots">
                        <div class="typingDot1"></div>
                        <div class="typingDot2"></div>
                        <div class="typingDot3"></div>
                    </div>
                    <div class="chatRowText" style="display: none">
                        ${text}
                    </div>
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
                    <div class="chatRowText" style="display: none">
                        ${text}
                    </div>
                </div>
            </div>
        `;
    }
}


function renderOptionsRow(lines) {
    let options = ``;
    lines.forEach(line => {
        options += `<div class="option option1">${line}</div>`;
    });
    return `
        <div class="optionsRow">
            <div class="optionsHeader">
                <div class="optionsHeaderText">
                    <p>回复</p>
                </div>
            </div>
            <div class="optionSelector">
                ${options}
            </div>
        </div>
    `;
}


function renderResponseRow(line) {
    return `
        <div class="responseRow" style="display:none">
            <p>${line}}</p>
        </div>
    `;
}


function messageAnimations(lines, i) {
    if (i >= lines.length) {
        return;
    }

    let line = lines[i];
    let icon = line[1];
    let window = $(".chatScreen");

    $(window).queue(function (next) {
        rowId += 1;
        let row = renderMessageRow(line[0], icon);

        // wait 500ms before new message shows up
        $(window).animate({opacity: '1'}, 500, function() {
            $(window).append(row);
            $(".messageRow:last").find(".chatTypingDots").delay(1000).fadeOut(1, function() {
                $(this).remove();
                $(".messageRow:last").find(".chatRowText").show();
                $(window).animate({opacity: '1'}, 500, function() {
                    messageAnimations(lines, i+1);
                    next();
                });
            });
        });
    });
}


function optionsAnimations(lines) {
    let window = $(".chatScreen");

    $(window).queue(function (next) {
        let options = renderOptionsRow(lines);
        $(window).animate({opacity: '1'}, 200, function() {
            $(window).append(options);
            next();
        });
    });
}


function responseAnimations(line) {
    let window = $(".chatScreen");

    $(window).queue(function (next) {
        let response = renderResponseRow(line);
        $(window).animate({opacity: '1'}, 200, function() {
            $(window).append(response);
            next();
        });
    });
}



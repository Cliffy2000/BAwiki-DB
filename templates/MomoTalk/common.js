var yuzu = {
    "img": "YuzuIcon.png",
    "affection": {
        "1": {
            "messages": [
                [
                    ["先生は休憩する時、どこで過ごされますか？", true, 0]
                ],
                [
                    ["確かに、シャーレは休むのにちょうど良い空間が多いですよね", true, null],
                    ["わたしは⋯⋯人が通らなくて、日陰になっている、暗いところが好きです", true, null],
                    ["誰にも邪魔されない、わたしだけの癒しの空間⋯⋯", true, null],
                    ["そういうところなら、いつまででもいられそうで", false, 1]
                ],
                [
                    ["そ、それは⋯⋯でも、ちょっと分かるかもです。悪くないですよね", true, null],
                    ["わたしは⋯⋯人が通らなくて、日陰になっている、暗いところが好きです", true, null],
                    ["誰にも邪魔されない、わたしだけの癒しの空間⋯⋯", true, null],
                    ["そういうところなら、いつまででもいられそうで", false, 1]
                ],
                [
                    ["先生、今度は他のロッカーを探しておいていただけると⋯⋯", true, null],
                    ["ゲーム開発部のは、わたし専用のロッカーなので⋯⋯", false, 2]
                ],
                [
                    ["そ、そう仰られましても二人では入れませんし⋯⋯", true, null],
                    ["ダメなものはダメ、です", false, -1]
                ]
            ],
            "replies": [
                [
                    ["だいたいシャーレかな", 1],
                    ["だいたいトイレかな", 2]
                ],
                [
                    ["前往柚子的羁绊剧情1", 3]
                ],
                [
                    ["一緒に使うのはダメ？", 4]
                ]
            ]
        },
        "2": {
            "messages": [
                [
                    ["先生は、どんな種類のゲームがお好きですか？", true, 0]
                ],
                [
                    ["あ、そうなんですね。わたしは⋯⋯ゲームでしたら大抵のものは好きです？", true, null],
                    ["ただ、他の人たちとプレイをしなくちゃいけない、オンラインゲームなどはちょっと⋯⋯", false, null],
                    ["なんだかプレッシャーを感じてしまって⋯⋯あまりやりません", false, null],
                    ["あ、でも、対戦型格闘ゲームはよくやりそうなんだ？", true, 1]
                ],
                [
                    ["はい、ああいうタイプのゲームは、それほど苦手ではなくて", true, null],
                    ["今度、わたしが好きなゲーム会社から新しい対戦格闘ゲームが出るそうで、楽しみです", false, 2]
                ],
                [
                    ["そ、そうでしょうか⋯⋯？", true, 3]
                ]

            ],
            "replies": [
                [
                    ["コンシューマーゲニムが好きかな", 1],
                    ["アーケードゲームが好きかな", 1]
                ],
                [
                    ["そうなんだ？", 2]
                ],
                [
                    ["ユズと格ゲーって、なんだか意外な組み合わせだね⋯⋯", 3]
                ],
                [
                    ["前往柚子的羁绊剧情2", -1]
                ]
            ]
        },
        "3": {
            "messages": [
                [
                    ["ゲームを開発するのって、すごくお金が必要なんですよね⋯⋯", true, null],
                    ["前回の開発ではサーバーを維持するお金が足りなくて、", true, null],
                    ["途中でデータを飛ばしてしまったこともあったぐらいなので⋯⋯", false, 0]
                ],
                [
                    ["幸いにもバックアップのデータがあったのでなんとか復旧できましたが⋯⋯", true, null],
                    ["4日間分の作業が、水の泡になってしまいました⋯⋯", false, 1]
                ],
                [
                    ["はい⋯⋯", true, null],
                    ["次回作の開発の時は、同じミスを繰り返さないように、", false, null],
                    ["前もって開発費を集めておかないとです", false, 2]
                ]
            ],
            "replies": [
                [
                    ["（°▯°;）それは大変だ⋯⋯最終的にどうなったの？", 1]
                ],
                [
                    ["ゲームの開発は、大変な世界なんだね⋯⋯", 2]
                ],
                [
                    ["前往柚子的羁绊剧情3", -1]
                ]

            ]
        },
        "4": {
            "messages": [
                [
                    ["この前のアルバイトは、色々とやってしまいました⋯⋯", true, null],
                    ["お客様の前で何度も体が固まってしまって、ミスの連発でしたし⋯⋯", true, null],
                    ["店長さんからは大丈夫だと言っていただけましたが⋯⋯", false, 0]
                ],
                [
                    ["え？別のアルバイトですか⋯⋯?", true, null],
                    ["む、無理です！この前のコンビニのアルバイトだって、何とかギリギリだったのに⋯⋯", false, 1]
                ],
                [
                    ["え、そんなアルバイトが⋯⋯", true, null],
                    ["それなら、大丈夫かもしれません⋯⋯", false, 2]
                ]
            ],
            "replies": [
                [
                    ["じゃあ、今度は別のアルバイトをしてみない？", 1]
                ],
                [
                    ["大丈夫。今度のアルバイトは、直接人の顔を見なくてもできるやつだから", 2]
                ],
                [
                    ["前往柚子的羁绊剧情4", -1]
                ]
            ]
        },
        "5": {
            "messages": [
                [
                    ["先生、今月分のアルバイトのお給料をいただきました！", true, null],
                    ["思ったより金額があったので、余ったお金で部員のみんなへのプレゼントもできました", true, 0]
                ],
                [
                    ["それで、えっと⋯⋯もしよかったら今週末、あの遊園地に来てくれませんか？", true, 1]
                ],
                [
                    ["その⋯⋯先生に、お渡ししたいプレゼントが、ありまして", true, 2]
                ],
                [
                    ["いえ、その、先生と一緒に⋯⋯", true, null],
                    ["じゃなくて、それもですが、えっと⋯⋯", false, null],
                    ["先生に、どうしてもプレゼントをお渡ししたいんです！", false, 3]

                ],
                [
                    ["yuzuDemo.png", true, null],
                    ["フリーパス、こんなに早く手元に戻ってくるとは思いませんでした", false, null],
                    ["お願いしたいこと⋯⋯決まりましたか？", false, 4]

                ],
                [
                    ["確かに何でもと言いましたが、そんなことにせっかくのフリーパスを使わないでください⋯⋯！", true, null],
                    ["これぐらいでしたら、普通に言っていただければ買ってきますから！", false, -1]
                ]
            ],
            "replies": [
                [
                    ["('‿')それは良かった、お疲れ様！", 1]
                ],
                [
                    ["遊園地に？", 2]
                ],
                [
                    ["気持ちだけで十分だよ", 3]
                ],
                [
                    ["前往柚子的羁绊剧情5", 4]
                ],
                [
                    ["シャーレに来る時に、パンと牛乳を買ってきてくれない？", 5]
                ]
            ]
        }
    }
};

var yuuka = {
    "img": "YuukaTrackIcon.png"
};


var currentStudent;
var messageBlockIndex = 0;
var responseBlockIndex = 0;
var affectionTier = 0;
var rowId = 0;
var chatOpen = false;

// =================
var momotalkMainJson;

$(function () {
    $.ajax({
        url: "https://wiki.biligame.com/ba/index.php?title=MediaWiki:MomotalkMain.json&action=raw",
        dataType: "text",
        success: function(data) {
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
            };
            $(".chatPreviewList").html(chats);
        },
        error: function() {
            console.log("failed to load icons");
        }
    })

    

    $(".chatPreview").on('click', function () {
        if (!chatOpen) {
            chatOpen = true;
            currentStudent = $(this).attr('id')

            let newPage = `<div class="chatScreen"></div>`;
            $(".mainWindow").append(newPage);
            // this is the initial messsage
            $(".chatScreen").append(renderInitialMessage(data[currentStudent]['messages'][messageBlockIndex][0][0]));

            $(".chatScreen").animate({
                left: 0
            }, 500, function () {
                $(".chatPreviewList").hide();
                $(".returnButton").show();

                // this is the first render
                if (data[currentStudent]["messages"][0].length > 1) {
                    messageAnimations(data[currentStudent]["messages"][0].slice(1), 0, function () {
                        optionsAnimations(data[currentStudent]["replies"][responseBlockIndex]);
                    });
                }
                else {
                    optionsAnimations(data[currentStudent]["replies"][responseBlockIndex]);
                }

            });
        }
    });

    $(".mainWindow").on('click', ".option", function () {
        if (responseBlockIndex !== -1) {
            if ($(this).hasClass("option1")) {
                // clicked on the first option
                $(".optionsRow").remove();
                responseAnimations(data[currentStudent]["replies"][responseBlockIndex][0][0]);
                messageAnimations(data[currentStudent]["messages"][messageBlockIndex], 0, function () {
                    optionsAnimations(data[currentStudent]["replies"][responseBlockIndex]);
                });
            }

            else {
                // clicked on second option
                $(".optionsRow").remove();
                responseAnimations(data[currentStudent]["replies"][responseBlockIndex][1][0]);
                messageAnimations(data[currentStudent]["messages"][messageBlockIndex], 0, function () {
                    optionsAnimations(data[currentStudent]["replies"][responseBlockIndex]);
                });
            }
        }
    })

    $(".returnButton").on('click', function () {
        $(".chatPreviewList").show();
        $(".chatScreen").animate({
            left: "100%"
        }, 500, function () {
            $(".returnButton").hide();
            $(".chatScreen").remove();
            chatOpen = false;
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
    let msg = ``;
    console.log(text);
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


function renderResponseRow(line) {
    return `
        <div class="responseRow">
            <div class="responseRowContent">
                <p>${line}</p>
            </div>
        </div>
    `;
}


function messageAnimations(lines, i, callback) {
    if (i >= lines.length) {
        callback();
        return;
    }

    let line = lines[i];
    let icon = line[1];
    let chatWindow = $(".chatScreen");

    if (line[line.length - 1] !== null) {
        responseBlockIndex = line[line.length - 1];
    }

    $(chatWindow).queue(function (next) {
        rowId += 1;
        let row = renderMessageRow(line[0], icon);

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


function updateMessageIndex(i) {
    messageBlockIndex = i;
}
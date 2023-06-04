var data = {
    "Aru": {
        "Id": 1,
        "img": "AruIcon.png",
        "messages": [
            [
                ["先生は休憩する時、どこで過ごされますか？", true, 0],
            ],
/* 1*/
            [
                ["確かに、シャーレは休むのにちょうど良い空間が多いですよね", true, null],
                ["わたしは⋯⋯人が通らなくて、日陰になっている、暗いところが好きです", true, null],
                ["誰にも邪魔されない、わたしだけの癒しの空間⋯⋯", true, null],
                ["そういうところなら、いつまででもいられそうで", false, 1]
            ],
/* 2*/
            [
                ["そ、それは⋯⋯でも、ちょっと分かるかもです。悪くないですよね", true, null],
                ["わたしは⋯⋯人が通らなくて、日陰になっている、暗いところが好きです", true, null],
                ["誰にも邪魔されない、わたしだけの癒しの空間⋯⋯", true, null],
                ["そういうところなら、いつまででもいられそうで", false, 1]
            ],
/* 3*/
            [
        ["先生、今度は他のロッカーを探しておいていただけると⋯⋯", true, null],
                ["ゲーム開発部のは、わたし専用のロッカーなので⋯⋯", false, 2]
            ],
/* 4*/
            [
                ["そ、そう仰られましても二人では入れませんし⋯⋯", true, null],
                ["ダメなものはダメ、です", false, 3]
            ],
/* 5*/
            [
                ["先生は、どんな種類のゲームがお好きですか？", true, 4]
            ],
/* 6*/
            [
                ["あ、そうなんですね。わたしは⋯⋯ゲームでしたら大抵のものは好きです？", true, null],
                ["ただ、他の人たちとプレイをしなくちゃいけない、オンラインゲームなどはちょっと⋯⋯", false, null],
                ["なんだかプレッシャーを感じてしまって⋯⋯あまりやりません", false, null],
                ["あ、でも、対戦型格闘ゲームはよくやりそうなんだ？", true, 5]
            ],
/* 7*/
            [
                ["はい、ああいうタイプのゲームは、それほど苦手ではなくて", true, null],
                ["今度、わたしが好きなゲーム会社から新しい対戦格闘ゲームが出るそうで、楽しみです", false, 6]
            ],
/* 8*/
            [
                ["そ、そうでしょうか⋯⋯？", true, 7]
            ],
/* 9*/
            [
                ["ゲームを開発するのって、すごくお金が必要なんですよね⋯⋯", true, null],
                ["前回の開発ではサーバーを維持するお金が足りなくて、", true, null],
                ["途中でデータを飛ばしてしまったこともあったぐらいなので⋯⋯", false, 8]
            ],
/* 10*/
            [
                ["幸いにもバックアップのデータがあったのでなんとか復旧できましたが⋯⋯", true, null],
                ["4日間分の作業が、水の泡になってしまいました⋯⋯", false, 9]
            ],
/* 11*/
            [
                ["はい⋯⋯", true, null],
                ["次回作の開発の時は、同じミスを繰り返さないように、", false, null],
                ["前もって開発費を集めておかないとです", false, 10]
            ],
/* 12*/
            [
                ["この前のアルバイトは、色々とやってしまいました⋯⋯", true, null],
                ["お客様の前で何度も体が固まってしまって、ミスの連発でしたし⋯⋯", true, null],
                ["店長さんからは大丈夫だと言っていただけましたが⋯⋯", false, 11]
            ],
/* 13*/
            [
                ["え？別のアルバイトですか⋯⋯?", true, null],
                ["む、無理です！この前のコンビニのアルバイトだって、何とかギリギリだったのに⋯⋯", false, 12]
            ],
/* 14*/
            [
        ["え、そんなアルバイトが⋯⋯", true, null],
                ["それなら、大丈夫かもしれません⋯⋯", false, 13]
            ],
/* 15*/
            [
                ["先生、今月分のアルバイトのお給料をいただきました！", true, null],
                ["思ったより金額があったので、余ったお金で部員のみんなへのプレゼントもできました", true, 14]
            ],
/* 16*/
            [
                ["それで、えっと⋯⋯もしよかったら今週末、あの遊園地に来てくれませんか？", true, 15]
        ],
/* 17*/
            [
                ["その⋯⋯先生に、お渡ししたいプレゼントが、ありまして", true, 16]
        ],
/* 18*/
            [
                ["いえ、その、先生と一緒に⋯⋯", true, null],
                ["じゃなくて、それもですが、えっと⋯⋯", false, null],
                ["先生に、どうしてもプレゼントをお渡ししたいんです！", false, 17]

        ],
/* 19*/
            [
                ["yuzuDemo.png", true, null],
                ["フリーパス、こんなに早く手元に戻ってくるとは思いませんでした", false, null],
                ["お願いしたいこと⋯⋯決まりましたか？", false, 18]

        ],
/* 20*/
            [
        ["確かに何でもと言いましたが、そんなことにせっかくのフリーパスを使わないでください⋯⋯！", true, null],
                ["これぐらいでしたら、普通に言っていただければ買ってきますから！", false, -1]
        ],
],
        // [response text, message index change]
        "replies": [
/* 0*/
            [   
                ["だいたいシャーレかな", 1],
                ["だいたいトイレかな", 2]
            ],
/* 1*/
            [   
                ["前往柚子的羁绊剧情1", 3]
            ],
/* 2*/
            [
                ["一緒に使うのはダメ？", 4],
            ],
/* 3*/
            [
                ["剧情1结束", 5],
            ],
/* 4*/
            [
                ["コンシューマーゲニムが好きかな", 6],
                ["アーケードゲームが好きかな", 6],
            ],
/* 5*/
            [
                ["そうなんだ？", 7],
            ],
/* 6*/
            [
                ["ユズと格ゲーって、なんだか意外な組み合わせだね⋯⋯", 8],
            ],
/* 7*/
            [
                ["前往柚子的羁绊剧情2", 9],
            ],
/* 8*/
            [
                ["（°▯°;）それは大変だ⋯⋯最終的にどうなったの？", 10],
            ],
/* 9*/
            [
                ["ゲームの開発は、大変な世界なんだね⋯⋯", 11],
/* 10*/     ],
            [
                ["前往柚子的羁绊剧情3", 12],
            ],
/* 11*/
            [
                ["じゃあ、今度は別のアルバイトをしてみない？", 13],
            ],
/* 12*/
            [
                ["大丈夫。今度のアルバイトは、直接人の顔を見なくてもできるやつだから", 14],
            ],
/* 13*/
            [
                ["前往柚子的羁绊剧情4", 15],
            ],
/* 14*/
            [
                ["('‿')それは良かった、お疲れ様！", 16],
            ],
/* 15*/
            [
                ["遊園地に？", 17],
            ],
/* 16*/
            [
                ["気持ちだけで十分だよ", 18],
            ],
/* 17*/
            [
                ["前往柚子的羁绊剧情4", 19],
            ],
/* 18*/
            [
                ["シャーレに来る時に、パンと牛乳を買ってきてくれない？", 20],
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
var rowId = 0;
var chatOpen = false;

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
                if (data["Aru"]["messages"][0].length > 1) {
                    messageAnimations(data["Aru"]["messages"][0].slice(1), 0, function() {
                        optionsAnimations(data["Aru"]["replies"][responseBlockIndex]);
                    });
                }
                else {
                    optionsAnimations(data["Aru"]["replies"][responseBlockIndex]);
                }
                
            });
        }
    });

    $(".mainWindow").on('click', ".option", function() {
        let numOptions = $('.optionSelector').find(".option").length;

        if (responseBlockIndex !== -1) {
            if ($(this).hasClass("option1")) {
                // clicked on the first option
                $(".optionsRow").remove();
                responseAnimations(data["Aru"]["replies"][responseBlockIndex][0][0]);
                messageAnimations(data["Aru"]["messages"][messageBlockIndex], 0, function() {
                    optionsAnimations(data["Aru"]["replies"][responseBlockIndex]);
                });
            } 
            
            else {
                // clicked on second option
                $(".optionsRow").remove();
                responseAnimations(data["Aru"]["replies"][responseBlockIndex][1][0]);
                messageAnimations(data["Aru"]["messages"][messageBlockIndex], 0, function() {
                    optionsAnimations(data["Aru"]["replies"][responseBlockIndex]);
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
    console.log(lines);
    if (i >= lines.length) {
        // recursion complete.
        callback();
        return;
    }

    let line = lines[i];
    let icon = line[1];
    let window = $(".chatScreen");

    if (line[line.length-1] !== null) {
        responseBlockIndex = line[line.length-1];
    }

    $(window).queue(function (next) {
        rowId += 1;
        let row = renderMessageRow(line[0], icon);

        // wait 500ms before new message shows up
        $(window).animate({opacity: '1'}, 500, function() {
            $(window).append(row);
            $(".messageRow:last").find(".chatTypingDots").delay(1000).fadeOut(1, function() {
                $(this).remove();
                $(".messageRow:last").find(".chatRowContent").show();
                $(window).animate({opacity: '1'}, 500, function() {
                    next();
                    messageAnimations(lines, i+1, callback);
                });
            });
        });
    }).dequeue();
}


function optionsAnimations(lines) {
    let window = $(".chatScreen");

    $(window).queue(function (next) {
        let options = renderOptionsRow(lines);
        $(window).animate({opacity: '1'}, 200, function() {
            $(window).append(options);
            next();
        });
    }).dequeue();
}


function responseAnimations(line) {
    let window = $(".chatScreen");

    $(window).queue(function (next) {
        let response = renderResponseRow(line);
        $(window).animate({opacity: '1'}, 200, function() {
            $(window).append(response);
            next();
        });
    }).dequeue();
}


function updateMessageIndex(i) {
    messageBlockIndex = i;
}

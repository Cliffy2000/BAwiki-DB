var data1 = {
    "messages": [
        [
            ["先生は休憩する時、どこで過ごされますか？", true, 1]
        ],
        [
            ["確かに、シャーレは休むのにちょうど良い空間が多いですよね", true, null],
            ["わたしは⋯⋯人が通らなくて、日陰になっている、暗いところが好きです", true, null],
            ["誰にも邪魔されない、わたしだけの癒しの空間⋯⋯", true, null],
            ["そういうところなら、いつまででもいられそうで", false, 2]
        ],
        [
            ["そ、それは⋯⋯でも、ちょっと分かるかもです。悪くないですよね", true, null],
            ["わたしは⋯⋯人が通らなくて、日陰になっている、暗いところが好きです", true, null],
            ["誰にも邪魔されない、わたしだけの癒しの空間⋯⋯", true, null],
            ["そういうところなら、いつまででもいられそうで", false, 2]
        ],
        [
            ["先生、今度は他のロッカーを探しておいていただけると⋯⋯", true, null],
            ["ゲーム開発部のは、わたし専用のロッカーなので⋯⋯", false, 3]
        ],
        [
            ["そ、そう仰られましても二人では入れませんし⋯⋯", true, null],
            ["ダメなものはダメ、です", false, -1]
        ]
    ],
    "replies": [
        [
            ["だいたいシャーレかな", 2],
            ["だいたいトイレかな", 3]
        ],
        [
            ["前往柚子的羁绊剧情1", 4]
        ],
        [
            ["一緒に使うのはダメ？", 5]
        ]
    ]
};

var data = {
    "messages": [
        [

        ]
    ],
    "replies": [
        [

        ]
    ]
}

var currentPanel = 0;
var panels = ["messages", "replies"];

$(function() {
    let textInput = `<input type="text" class="textInput">`;
    let indexInput = `<input type="text" class="indexInput" value="null">`;
    let iconInput = `<input type="checkbox" class="iconInput" style="transform: scale(1.3); margin-left: 10px" checked>`;

    let refresh = `<button type="button" onclick=renderData()>Refresh</button>`;

    let toggleStudent = `<button type="button" onclick=setPanel(0)>Student</button>`;
    let toggleSensei = `<button type="button" onclick=setPanel(1)>Sensei</button>`;
    let newBlock = `<button type="button" onclick=setNewBlock()>New Block</button>`;
    
    $(".inputWindow").append(textInput);
    $(".inputWindow").append(indexInput);
    $(".inputWindow").append(iconInput);
    // (".inputWindow").append(refresh);
    $(".inputWindow").append(toggleStudent);
    $(".inputWindow").append(toggleSensei);
    $(".inputWindow").append(newBlock);

    $(document).on('keypress', '.textInput', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            enterData();
            reset();
            renderData();
        }
    });

    $(document).on('keypress', '.indexInput', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            enterData();
            reset();
            renderData();
        }
    });

})


function setPanel(d) {
    currentPanel = d;
}


function setNewBlock() {
    
}


function enterData() {
    let text = $(".textInput").val();
    if (text === '') {
        return;
    }

    let index = $(".indexInput").val();
    if (index === "null") {
        index = null;
    } else {
        index = parseInt(index);
    }

    let icon = $(".iconInput").is(":checked");

    if (currentPanel === 0) {
        data[panels[currentPanel]][data[panels[currentPanel]].length-1].push(
            [text, icon, index]
        );
    } else {
        data[panels[currentPanel]][data[panels[currentPanel]].length-1].push(
            [text, index]
        );
    }
}


function reset() {
    $(".textInput").val('');

    $(".indexInput").val('null');

    if (data[panels[currentPanel]][data[panels[currentPanel]].length-1].length !== 0) {
        $('.iconInput').prop('checked', false);
    } else {
        $('.iconInput').prop('checked', true);
    }
}


function renderData() {
    if (data["messages"][0].length === 0) {
        return;
    }
    $(".previewData").html(``);
    let responseShown = [];
    let studentIndex = 1;
    data["messages"].forEach(block => {

        let studentPreviewText = ``;
        let senseiPreviewContent = ``;
        let senseiPreview = ``;
        block.forEach(line => {
            if (line[1]) {
                studentPreviewText += `
                    <div class="studentLine">
                        <div class="studentLineIcon"></div>
                        <div class="studentLineText" style="border-radius: 0 5px 5px 0">${line[0]}</div>
                    </div>
                `;
            } else {
                studentPreviewText += `
                    <div class="studentLine">
                        <div class="studentLineText">${line[0]}</div>
                    </div>
                `;
            }
        });

        if ((block[block.length-1][2] !== -1) && (data["replies"][0].length !== 0)) {
            console.log(block[block.length-1][2]);
            if (!((block[block.length-1][2]-1) in responseShown)) {
                responseShown.push(block[block.length-1][2]-1);
                data['replies'][block[block.length-1][2]-1].forEach(line => {
                    senseiPreviewContent += `
                        <div style="display: flex">
                            <div class="senseiLine">
                                <div>${line[0]}</div>
                            </div>
                            <div class="senseiPreviewNext index">
                                <div>${line[1]}</div>
                            </div>
                        </div>
                    `;
                });

                senseiPreview = `
                    <div class="senseiPreviewIndex index">
                        <div>${block[block.length-1][2]}</div>
                    </div>
                    <div class="senseiPreviewText">${senseiPreviewContent}</div>
                    
                `
            }
        }

        let blockContent = `
            <div class="previewRow">
                <div class="studentPreview">
                    <div class="studentPreviewIndex index">
                        <div>${studentIndex}</div>
                    </div>
                    <div class="studentPreviewText">${studentPreviewText}</div>
                    <div class="studentPreviewNext index">
                        <div>${block[block.length-1][2]}</div>
                    </div>
                </div>
                <div class="senseiPreview">
                    ${senseiPreview}
                </div>
            </div>
        `;
        $(".previewData").append(blockContent);
        studentIndex += 1;
    });
}
function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
        (activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
        (typeof activeEl.selectionStart == "number")
    ) {
        text = '';
    } else if (window.getSelection) {
        text = window.getSelection().toString().split(' ');
        if (text[0] === '') {
            text = text[1];
        } else {
            text = text[0];
        }
    }
    if (text === "" || text === null || text === undefined || !/^[a-zA-Z]+$/.test(text)) {
        document.getElementById('efrgethy').style.display = 'none';
    } else if (/^[a-zA-Z]+$/.test(text)) {
        document.getElementById('efrgethy').style.display = 'block';
    }
    return text;
}

document.body.innerHTML += '<div id="efrgethy">\n' +
    '    <div id="dcvfbnsu">\n' +
    '        <h3 style="font-size:24px!important;"><span style="font-weight: 400">definition of</span> <span id="bgdernum"></span><p id="fwthyjmu"></p></h3>\n' +
    '    </div>\n' +
    '    <div id="vrbnyumk">\n' +
    '        <p class="hf5dfgbh" id="ynumidfr">part of speech : <span id="fbtynutg"></span></p>\n' +
    '        <p class="hf5dfgbh" id="dwrfvtbc">definition : <span id="frgtdhjk"></span></p>\n' +
    '        <p class="hf5dfgbh" id="crvetbny">synonyms : <span id="kjnubujk"></span></p>\n' +
    '        <p class="hf5dfgbh" id="xcdfvbyn">example : <span id="ewfreghj"></span></p>\n' +
    '        <p id="dcdfvbyn">open in <a id="dcadvbyn">wikipedia</a></p>\n' +
    '        <p>search on <a id="vgbynduu">web</a></p>\n' +
    '<small style="position: absolute;right:15px;bottom: 15px;font-size: 13px!important;color: #9fa0a0">dic by dicit</small>' +
    '    </div>\n' +
    '</div>';
let b = "";
document.onmouseup = document.onkeyup = document.onselectionchange = function () {
    if (b !== getSelectionText() && getSelectionText() !== "" && getSelectionText() !== null && getSelectionText() !== undefined && /^[a-zA-Z]+$/.test(getSelectionText())) {
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + getSelectionText())
            .then(response => response.json())
            .then(data => {
                document.getElementById('kjnubujk').innerHTML = '';
                document.getElementById('bgdernum').innerHTML = data[0].word;
                document.getElementById('fwthyjmu').innerHTML = data[0].phonetic;
                document.getElementById('fbtynutg').innerHTML = data[0].meanings[0].partOfSpeech;
                document.getElementById('frgtdhjk').innerHTML = data[0].meanings[0].definitions[0].definition;
                document.getElementById('ewfreghj').innerHTML = data[0].meanings[0].definitions[0].example;
                document.getElementById('dcadvbyn').href = 'https://en.wikipedia.org/wiki/' + getSelectionText();
                document.getElementById('vgbynduu').href = 'https://google.com/search?q=' + getSelectionText();
                for (let i = 0; i < data[0].meanings[0].definitions[0].synonyms.length; i++) {
                    if (i !== 0) {
                        document.getElementById('kjnubujk').innerHTML += ', '
                    }
                    document.getElementById('kjnubujk').innerHTML += data[0].meanings[0].definitions[0].synonyms[i];
                }
                for (let i = 0; i < document.getElementsByClassName('hf5dfgbh').length; i++) {
                    if (document.getElementsByClassName('hf5dfgbh')[i].getElementsByTagName('span')[0].innerHTML === '' || document.getElementsByClassName('hf5dfgbh')[i].getElementsByTagName('span')[0].innerHTML === 'undefined' || document.getElementsByClassName('hf5dfgbh')[i].getElementsByTagName('span')[0].innerHTML === undefined) {
                        document.getElementsByClassName('hf5dfgbh')[i].style.display = 'none';
                    } else {
                        document.getElementsByClassName('hf5dfgbh')[i].style.display = 'block';
                    }
                }
                var msg = new SpeechSynthesisUtterance();
                msg.text = getSelectionText();
                window.speechSynthesis.speak(msg);
            })
            .catch(() => {
                document.getElementById('bgdernum').innerHTML = getSelectionText();
                document.getElementById('fwthyjmu').innerHTML = 'undefined';
                document.getElementById('fbtynutg').innerHTML = '';
                document.getElementById('frgtdhjk').innerHTML = '';
                document.getElementById('ewfreghj').innerHTML = '';
                for (let i = 0; i < document.getElementsByClassName('hf5dfgbh').length; i++) {
                    document.getElementsByClassName('hf5dfgbh')[i].style.display = 'none';
                }
                document.getElementById('dcadvbyn').href = 'https://en.wikipedia.org/wiki/' + getSelectionText();
                document.getElementById('vgbynduu').href = 'https://google.com/search?q=' + getSelectionText();
                var msg = new SpeechSynthesisUtterance();
                msg.text = getSelectionText();
                window.speechSynthesis.speak(msg);
            });
    }
    b = getSelectionText();
};
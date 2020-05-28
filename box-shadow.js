
let shadowBoxState = {
    hoff: '0px',
    voff: '0px',
    spreadRadius: '0px',
    blurRadius: '0px',
    shadowColor: '#4A4A4A',
    shadowOpacity: 'FF',
    string() {
        return `${this.hoff} ${this.voff} ${this.blurRadius} ${this.spreadRadius} ${this.shadowColor.toUpperCase()}${this.shadowOpacity}`;
    }
}


let presetsData;
const fetchData = () => {
    fetch('http://localhost:3000/api/box-shadow-data')
        .then(response => response.json())
        .then(data => presetsData = data)
        .then(() => {
            $('.preset1')[0].innerText = presetsData.preset1.name + '\n\n' + presetsData.preset1.date;
            $('.preset2')[0].innerText = presetsData.preset2.name + '\n\n' + presetsData.preset2.date;
            $('.preset3')[0].innerText = presetsData.preset3.name + '\n\n' + presetsData.preset3.date;
            $('.preset4')[0].innerText = presetsData.preset4.name + '\n\n' + presetsData.preset4.date;
            $('.preset5')[0].innerText = presetsData.preset5.name + '\n\n' + presetsData.preset5.date;
            $('.preset6')[0].innerText = presetsData.preset6.name + '\n\n' + presetsData.preset6.date;
        });

}

fetchData();

const setShadowTexts = () => {
    $('.general-shadow')[0].innerText = `box-shadow: ${shadowBoxState.string()}`;
    $('.webkit-shadow')[0].innerText = `-webkit-box-shadow: ${shadowBoxState.string()}`;
    $('.moz-shadow')[0].innerText = `-moz-box-shadow: ${shadowBoxState.string()}`;
}
//Horizontal Offset slider logic
$('input.h-off-val').on('input', (e) => {
    $('h3.h-off-val')[0].innerText = e.target.value + 'px';
    shadowBoxState.hoff = e.target.value + 'px';
    $('.the-box').css('box-shadow', shadowBoxState.string());
    setShadowTexts();
})
//Vertical Offset slider logic
$('input.v-off-val').on('input', (e) => {
    $('h3.v-off-val')[0].innerText = e.target.value + 'px';
    shadowBoxState.voff = e.target.value + 'px';
    $('.the-box').css('box-shadow', shadowBoxState.string());
    setShadowTexts();
})
//Blur Radius slider logic
$('input.blur-val').on('input', (e) => {
    $('h3.blur-val')[0].innerText = e.target.value + 'px';
    shadowBoxState.blurRadius = e.target.value + 'px';
    $('.the-box').css('box-shadow', shadowBoxState.string());
    setShadowTexts();
})
//Spread Radius slider logic
$('input.spread-val').on('input', (e) => {
    $('h3.spread-val')[0].innerText = e.target.value + 'px';
    shadowBoxState.spreadRadius = e.target.value + 'px';
    $('.the-box').css('box-shadow', shadowBoxState.string());
    setShadowTexts();
})
//Opacity slider logic
$('input.shadow-opacity').on('input', (e) => {
    $('h3.shadow-opacity')[0].innerText = e.target.value + '%';
    shadowBoxState.shadowOpacity = getHex(e.target.value);
    $('.the-box').css('box-shadow', shadowBoxState.string());
    setShadowTexts();
})

const getHex = (v) => Math.round(v / 100 * 255).toString(16).toUpperCase().padStart(2, 0);

//Background Color logic
$('input.bg-color').on('input', (e) => {
    if (e.target.value.length == 6) {
        $('.the-box-bg').css('background-color', `#${e.target.value}`);
        $('input.js-bg-color')[0].jscolor.fromString(`#${e.target.value}`);
    }

})
const updateBackgroundColor = (jscolor) => {
    $('.the-box-bg').css('background-color', `#${jscolor}`);
    $('input.bg-color')[0].value = (`${jscolor}`).toUpperCase();
}
//Shadow Color logic
const updateShadowColor = (jscolor) => {
    shadowBoxState.shadowColor = `#${jscolor}`;
    $('.the-box').css('box-shadow', shadowBoxState.string());
    $('input.shadow-color')[0].value = (`${jscolor}`).toUpperCase();
    setShadowTexts();

}
$('input.shadow-color').on('input', (e) => {
    if (e.target.value.length == 6) {
        shadowBoxState.shadowColor = `#${e.target.value}`;
        $('.the-box').css('box-shadow', shadowBoxState.string());
        $('input.js-shadow-color')[0].jscolor.fromString(`#${e.target.value}`);
        setShadowTexts();
    }
})

//Box Color logic
const updateBoxColor = (jscolor) => {
    $('.the-box').css('background-color', `#${jscolor}`);
    $('input.box-bg-color')[0].value = (`${jscolor}`).toUpperCase();
}

$('input.box-bg-color').on('input', (e) => {
    if (e.target.value.length == 6) {
        $('.the-box').css('background-color', `#${e.target.value}`);
        $('input.js-box-bg-color')[0].jscolor.fromString(`#${e.target.value}`);
    }
})

//Save preset button logic
$('.save-button').on('click', () => {
    $('.preset-overlay').css('display', 'grid');
    $('.preset-name-input').focus();
})

//-->Checkbox logic
let checkboxOff = true;
$('.preset-date-input').on('click', () => {
    let el = $('.preset-date-input');
    console.log(el);
    if (checkboxOff) {
        el.css('background-color', '#88eb57');
        el[0].innerText = "YES";
    }
    else {
        el.css('background-color', '#eb5957');
        el[0].innerText = 'NO';
    }
    checkboxOff = !checkboxOff;
})
//-->Save button logic
$('.save-btn').on('click', () => {
    //send data to server here
    let data = {
        boxShadow: `box-shadow: ${shadowBoxState.string()}`,
        name: $('.preset-name-input')[0].value,
        saveDate: $('.preset-date-input')[0].innerText
    }
    fetch('http://localhost:3000/api/box-shadow-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    $('.preset-overlay').css('display', 'none');
    console.log($('.preset-name-input')[0].value);
    console.log($('.preset-date-input')[0].innerText);
    //if OK change saved text
    $('.save-button')[0].innerText = 'Saved Successfully';

    setTimeout(() => {
        $('.save-button')[0].innerText = 'Save Preset';
        fetchData();
    }, 1500)

    $('.preset-name-input')[0].value = '';


})
//-->Cancel button logic
$('.cancel-btn').on('click', () => {
    $('.preset-overlay').css('display', 'none');
    //Clear inputs
    $('.preset-name-input')[0].value = '';
})

//Load preset button logic
$('.load-button').on('click', () => {
    $('.preset-overlay2').css('display', 'grid');
})
//-->load-now button logic
$('.preset1').on('click', () => {
    if (!presetsData.preset1.data.includes('box-shadow')) return;
    loadPresetIntoBox(presetsData.preset1.data);
    $('.preset-overlay2').css('display', 'none');

})
$('.preset2').on('click', () => {
    if (!presetsData.preset2.data.includes('box-shadow')) return;
    loadPresetIntoBox(presetsData.preset2.data);
    $('.preset-overlay2').css('display', 'none');
})
$('.preset3').on('click', () => {
    if (!presetsData.preset3.data.includes('box-shadow')) return;
    loadPresetIntoBox(presetsData.preset3.data);
    $('.preset-overlay2').css('display', 'none');
})
$('.preset4').on('click', () => {
    if (!presetsData.preset4.data.includes('box-shadow')) return;
    loadPresetIntoBox(presetsData.preset4.data);
    $('.preset-overlay2').css('display', 'none');
})
$('.preset5').on('click', () => {
    if (!presetsData.preset5.data.includes('box-shadow')) return;
    loadPresetIntoBox(presetsData.preset5.data);
    $('.preset-overlay2').css('display', 'none');
})
$('.preset6').on('click', () => {
    if (!presetsData.preset6.data.includes('box-shadow')) return;
    loadPresetIntoBox(presetsData.preset6.data);
    $('.preset-overlay2').css('display', 'none');
})

const loadPresetIntoBox = (data) => {
    let dataArray = data.split(' ');
    console.log(dataArray);
    $('h3.h-off-val')[0].innerText = dataArray[1];
    $('input.h-off-val')[0].value = parseInt(dataArray[1]);
    shadowBoxState.hoff = `${parseInt(dataArray[1])}px`;
    $('h3.v-off-val')[0].innerText = dataArray[2];
    $('input.v-off-val')[0].value = parseInt(dataArray[2]);
    shadowBoxState.voff = `${parseInt(dataArray[2])}px`;
    $('h3.blur-val')[0].innerText = dataArray[3];
    $('input.blur-val')[0].value = parseInt(dataArray[3]);
    shadowBoxState.blurRadius = `${parseInt(dataArray[3])}px`;
    $('h3.spread-val')[0].innerText = dataArray[4];
    $('input.spread-val')[0].value = parseInt(dataArray[4]);
    shadowBoxState.spreadRadius = `${parseInt(dataArray[4])}px`;
    $('input.js-shadow-color')[0].jscolor.fromString(`${dataArray[5].substring(0, 7).toLowerCase()}`);
    $('.shadow-color')[0].value = `${dataArray[5].substring(1, 7)}`;
    shadowBoxState.shadowColor = dataArray[5].substring(0, 7);
    $('h3.shadow-opacity')[0].innerText = (parseInt(dataArray[5].substring(7, 9), 16) / 255 * 100).toFixed(1) + '%';
    $('input.shadow-opacity')[0].value = (parseInt(dataArray[5].substring(7, 9), 16) / 255 * 100).toFixed(1);
    shadowBoxState.shadowOpacity = dataArray[5].substring(7, 9);
    $('.the-box').css('box-shadow', shadowBoxState.string());
    setShadowTexts();
}

//MOVE THIS LOADING TO TOP

//Cancel button logic
$('.cancel-btn2').on('click', () => {
    $('.preset-overlay2').css('display', 'none');
})


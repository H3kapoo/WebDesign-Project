//VARIABLES
let checkboxOff = true;
let boxShadowPresets;
let shadowBoxState = {
    hoff: '0px',
    voff: '0px',
    spreadRadius: '0px',
    blurRadius: '0px',
    shadowColor: '#4A4A4A',
    shadowOpacity: 'FF',
    string() { return `${this.hoff} ${this.voff} ${this.blurRadius} ${this.spreadRadius} ${this.shadowColor.toUpperCase()}${this.shadowOpacity}`; }
}

//utils/pretty querry css setter
const SETTER__ELEM_PROP_VAL = (el, prop, val) => $(el).css(prop, val);
const SETTER__ELEM_PROP_VAL__HASH_START = (el, prop, val) => $(el).css(prop, `#${val}`);
const VOID__ELEM__FOCUS = el => $(el).focus();
const SETTER__ELEMZERO_TEXT = (el, text) => $(el)[0].innerText = `${text}`;
const SETTER__ELEMZERO_TEXT__PX_END = (el, text) => $(el)[0].innerText = `${text}px`;
const SETTER__ELEMZERO_TEXT__100_END = (el, text) => $(el)[0].innerText = `${text}%`;
const SETTER__ELEMZERO_TEXT__HASH_START = (el, text) => $(el)[0].innerText = `#${text}`;
const SETTER__ELEMZERO_TEXT__BOXSHADOW_START = (el, text) => $(el)[0].innerText = `box-shadow: ${text}`;
const SETTER__ELEMZERO_TEXT__WEBKIT_START = (el, text) => $(el)[0].innerText = `-webkit-box-shadow: ${text}`;
const SETTER__ELEMZERO_TEXT__MOZ_START = (el, text) => $(el)[0].innerText = `-moz-box-shadow: ${text}`;
const SETTER__ELEMZERO_JSCOLOR__HASH_START = (el, val) => $(el)[0].jscolor.fromString(`#${val}`);
const SETTER__ELEMZERO_JSCOLOR = (el, val) => $(el)[0].jscolor.fromString(`${val}`);
const SETTER__ELEMZERO_VAL__TOUPPER = (el, val) => $(el)[0].value = (`${val}`).toUpperCase();
const SETTER__ELEMZERO_VAL = (el, val) => $(el)[0].value = val;
const GETTER__ELEM = (el) => $(el);
const getHex = (v) => Math.round(v / 100 * 255).toString(16).toUpperCase().padStart(2, 0);
const setShadowTexts = () => {
    SETTER__ELEMZERO_TEXT__BOXSHADOW_START('.general-shadow', shadowBoxState.string());
    SETTER__ELEMZERO_TEXT__WEBKIT_START('.webkit-shadow', shadowBoxState.string());
    SETTER__ELEMZERO_TEXT__MOZ_START('.moz-shadow', shadowBoxState.string());
}
const fetchData = () => {
    fetch('http://localhost:3000/api/box-shadow-data')
        .then(response => response.json())
        .then(data => boxShadowPresets = data)
        .then(() => {
            for (let i = 0; i < boxShadowPresets.length; i++)
                SETTER__ELEMZERO_TEXT(`.preset${i + 1}`, boxShadowPresets[i].name + '\n\n' + boxShadowPresets[i].date);
        }).catch(e => console.log(`Server might be offline: ${e}`));

}
const loadPresetIntoBox = (data) => {

    let dataArray = data.split(' ');

    SETTER__ELEMZERO_TEXT('h3.h-off-val', dataArray[1]);
    SETTER__ELEMZERO_VAL('input.h-off-val', parseInt(dataArray[1]));
    shadowBoxState.hoff = `${parseInt(dataArray[1])}px`;
    SETTER__ELEMZERO_TEXT('h3.v-off-val', dataArray[2]);
    SETTER__ELEMZERO_VAL('input.v-off-val', parseInt(dataArray[2]));
    shadowBoxState.voff = `${parseInt(dataArray[2])}px`;
    SETTER__ELEMZERO_TEXT('h3.blur-val', dataArray[3]);
    SETTER__ELEMZERO_VAL('input.blur-val', parseInt(dataArray[3]));
    shadowBoxState.blurRadius = `${parseInt(dataArray[3])}px`;
    SETTER__ELEMZERO_TEXT('h3.spread-val', dataArray[4]);
    SETTER__ELEMZERO_VAL('input.spread-val', parseInt(dataArray[4]));
    shadowBoxState.spreadRadius = `${parseInt(dataArray[4])}px`;
    SETTER__ELEMZERO_JSCOLOR('input.js-shadow-color', dataArray[5].substring(0, 7).toLowerCase());
    SETTER__ELEMZERO_VAL('.shadow-color', dataArray[5].substring(1, 7));
    shadowBoxState.shadowColor = dataArray[5].substring(0, 7);
    SETTER__ELEMZERO_TEXT__100_END('h3.shadow-opacity', (parseInt(dataArray[5].substring(7, 9), 16) / 255 * 100).toFixed(1));
    SETTER__ELEMZERO_VAL('input.shadow-opacity', (parseInt(dataArray[5].substring(7, 9), 16) / 255 * 100).toFixed(1));
    shadowBoxState.shadowOpacity = dataArray[5].substring(7, 9);
    SETTER__ELEM_PROP_VAL('.the-box', 'box-shadow', shadowBoxState.string());
    setShadowTexts();
}

//STARTS HERE
fetchData();

//Horizontal Offset slider logic
$('input.h-off-val').on('input', (e) => {
    shadowBoxState.hoff = `${e.target.value}px`;
    SETTER__ELEMZERO_TEXT__PX_END('h3.h-off-val', e.target.value);
    SETTER__ELEM_PROP_VAL('.the-box', 'box-shadow', shadowBoxState.string());
    setShadowTexts();
})
//Vertical Offset slider logic
$('input.v-off-val').on('input', (e) => {
    shadowBoxState.voff = `${e.target.value}px`;
    SETTER__ELEMZERO_TEXT__PX_END('h3.v-off-val', e.target.value);
    SETTER__ELEM_PROP_VAL('.the-box', 'box-shadow', shadowBoxState.string());
    setShadowTexts();
})
//Blur Radius slider logic
$('input.blur-val').on('input', (e) => {
    shadowBoxState.blurRadius = `${e.target.value}px`;
    SETTER__ELEMZERO_TEXT__PX_END('h3.blur-val', e.target.value);
    SETTER__ELEM_PROP_VAL('.the-box', 'box-shadow', shadowBoxState.string());
    setShadowTexts();
})
//Spread Radius slider logic
$('input.spread-val').on('input', (e) => {
    shadowBoxState.spreadRadius = `${e.target.value}px`;
    SETTER__ELEMZERO_TEXT__PX_END('h3.spread-val', e.target.value);
    SETTER__ELEM_PROP_VAL('.the-box', 'box-shadow', shadowBoxState.string());
    setShadowTexts();
})
//Opacity slider logic
$('input.shadow-opacity').on('input', (e) => {
    shadowBoxState.shadowOpacity = getHex(e.target.value);
    SETTER__ELEMZERO_TEXT__100_END('h3.shadow-opacity', e.target.value);
    SETTER__ELEM_PROP_VAL('.the-box', 'box-shadow', shadowBoxState.string());
    setShadowTexts();
})


//Background Color logic
$('input.bg-color').on('input', (e) => {
    if (e.target.value.length == 6) {
        SETTER__ELEMZERO_JSCOLOR__HASH_START('input.js-bg-color', e.target.value);
        SETTER__ELEM_PROP_VAL__HASH_START('.the-box-bg', 'background-color', e.target.value);
    }
})
const updateBackgroundColor = (jscolor) => {
    SETTER__ELEM_PROP_VAL__HASH_START('.the-box-bg', 'background-color', jscolor);
    SETTER__ELEMZERO_VAL__TOUPPER('input.bg-color', jscolor);
}
//Shadow Color logic
$('input.shadow-color').on('input', (e) => {
    if (e.target.value.length == 6) {
        shadowBoxState.shadowColor = `#${e.target.value}`;
        SETTER__ELEM_PROP_VAL('.the-box', 'box-shadow', shadowBoxState.string());
        SETTER__ELEMZERO_JSCOLOR__HASH_START('input.js-shadow-color', e.target.value);
        setShadowTexts();
    }
})
const updateShadowColor = (jscolor) => {
    shadowBoxState.shadowColor = `#${jscolor}`;
    SETTER__ELEM_PROP_VAL('.the-box', 'box-shadow', shadowBoxState.string());
    SETTER__ELEMZERO_VAL__TOUPPER('input.shadow-color', jscolor);
    setShadowTexts();
}
//Box Color logic
$('input.box-bg-color').on('input', (e) => {
    if (e.target.value.length == 6) {
        SETTER__ELEM_PROP_VAL__HASH_START('.the-box', 'background-color', e.target.value);
        SETTER__ELEMZERO_JSCOLOR__HASH_START('input.js-box-bg-color', e.target.value);
    }
})
const updateBoxColor = (jscolor) => {
    SETTER__ELEM_PROP_VAL__HASH_START('.the-box', 'background-color', jscolor);
    SETTER__ELEMZERO_VAL__TOUPPER('input.box-bg-color', jscolor);
}

//Save preset button logic
$('.save-button').on('click', () => {
    SETTER__ELEM_PROP_VAL('.preset-overlay', 'display', 'grid');
    VOID__ELEM__FOCUS('.preset-name-input');
})

//-->Checkbox logic
$('.preset-date-input').on('click', () => {
    if (checkboxOff) {
        SETTER__ELEM_PROP_VAL__HASH_START('.preset-date-input', 'background-color', '88eb57');
        SETTER__ELEMZERO_TEXT('.preset-date-input', 'YES');
    }
    else {
        SETTER__ELEM_PROP_VAL__HASH_START('.preset-date-input', 'background-color', 'eb5957');
        SETTER__ELEMZERO_TEXT('.preset-date-input', 'NO');
    }
    checkboxOff = !checkboxOff;
})

//-->Save button logic
$('.save-btn').on('click', () => {
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
    }).catch(e => console.log(`Server might be offline: ${e}`));

    SETTER__ELEM_PROP_VAL('.preset-overlay', 'display', 'none');
    SETTER__ELEMZERO_TEXT('.save-button', 'Saved Successfully');

    setTimeout(() => {
        SETTER__ELEMZERO_TEXT('.save-button', 'Save Preset');
        fetchData();
    }, 1500)
    SETTER__ELEMZERO_VAL('.preset-name-input', '');
})
//-->Cancel button logic
$('.cancel-btn').on('click', () => {
    SETTER__ELEM_PROP_VAL('.preset-overlay', 'display', 'none');
    SETTER__ELEMZERO_VAL('.preset-name-input', '');
})

//Load preset button logic
$('.load-button').on('click', () => SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'grid'))

//-->load-now button logic
$('.preset1').on('click', () => {
    if (!boxShadowPresets[0]) return;
    loadPresetIntoBox(boxShadowPresets[0].data);
    SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'none');
})
$('.preset2').on('click', () => {
    if (!boxShadowPresets[1]) return;
    loadPresetIntoBox(boxShadowPresets[1].data);
    SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'none');
})
$('.preset3').on('click', () => {
    if (!boxShadowPresets[2]) return;
    loadPresetIntoBox(boxShadowPresets[2].data);
    SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'none');
})
$('.preset4').on('click', () => {
    if (!boxShadowPresets[3]) return;
    loadPresetIntoBox(boxShadowPresets[3].data);
    SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'none');
})
$('.preset5').on('click', () => {
    if (!boxShadowPresets[4]) return;
    loadPresetIntoBox(boxShadowPresets[4].data);
    SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'none');
})
$('.preset6').on('click', () => {
    if (!boxShadowPresets[5]) return;
    loadPresetIntoBox(boxShadowPresets[5].data);
    SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'none');
})

//Cancel button logic
$('.cancel-btn2').on('click', () => SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'none'))


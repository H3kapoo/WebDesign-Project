//VARIABLES
let checkboxOff = true;
let borderRadiusPresets;
let borderRadiusState = {
    allCorners: '0px',
    topLeft: '0px',
    topRight: '0px',
    bottomRight: '0px',
    bottomLeft: '0px',
    borderWidth: '0px',
    borderColor: '#4A4A4A',
    style: 'solid',
    setAllCorners() { this.topLeft = this.topRight = this.bottomRight = this.bottomLeft = this.allCorners; },
    borderRadius() { return `${this.topLeft} ${this.topRight} ${this.bottomRight} ${this.bottomLeft}`; },
    borderStyle() { return `${this.borderWidth} ${this.style} ${this.borderColor.toUpperCase()}`; }
}

//utils/pretty querry css setter
const SETTER__ELEM_PROP_VAL = (el, prop, val) => $(el).css(prop, val);
const SETTER__ELEM_PROP_VAL__HASH_START = (el, prop, val) => $(el).css(prop, `#${val}`);
const VOID__ELEM__FOCUS = el => $(el).focus();
const SETTER__ELEMZERO_TEXT = (el, text) => $(el)[0].innerText = `${text}`;
const SETTER__ELEMZERO_TEXT__PX_END = (el, text) => $(el)[0].innerText = `${text}px`;
const SETTER__ELEMZERO_TEXT__100_END = (el, text) => $(el)[0].innerText = `${text}%`;
const SETTER__ELEMZERO_TEXT__HASH_START = (el, text) => $(el)[0].innerText = `#${text}`;
const SETTER__ELEMZERO_TEXT__BORDERRADIUS_START = (el, text) => $(el)[0].innerText = `border-radius: ${text}`;
const SETTER__ELEMZERO_TEXT__WEBKIT_START = (el, text) => $(el)[0].innerText = `-webkit-border-radius: ${text}`;
const SETTER__ELEMZERO_TEXT__MOZ_START = (el, text) => $(el)[0].innerText = `-moz-border-radius: ${text}`;
const SETTER__ELEMZERO_TEXT__BORDER_START = (el, text) => $(el)[0].innerText = `border: ${text}`;
const SETTER__ELEMZERO_JSCOLOR__HASH_START = (el, val) => $(el)[0].jscolor.fromString(`#${val}`);
const SETTER__ELEMZERO_JSCOLOR = (el, val) => $(el)[0].jscolor.fromString(`${val}`);
const SETTER__ELEMZERO_VAL__TOUPPER = (el, val) => $(el)[0].value = (`${val}`).toUpperCase();
const SETTER__ELEMZERO_VAL = (el, val) => $(el)[0].value = val;
const GETTER__ELEM = (el) => $(el);

const setShadowTexts = () => {
    SETTER__ELEMZERO_TEXT__BORDERRADIUS_START('.general-border', borderRadiusState.borderRadius());
    SETTER__ELEMZERO_TEXT__WEBKIT_START('.webkit-border', borderRadiusState.borderRadius());
    SETTER__ELEMZERO_TEXT__MOZ_START('.moz-border', borderRadiusState.borderRadius());
    SETTER__ELEMZERO_TEXT__BORDER_START('.border', borderRadiusState.borderStyle())
}
const fetchData = () => {
    fetch('http://localhost:3000/api/border-radius-data')
        .then(response => response.json())
        .then(data => borderRadiusPresets = data)
        .then(() => {
            for (let i = 0; i < borderRadiusPresets.length; i++)
                SETTER__ELEMZERO_TEXT(`.preset${i + 1}`, borderRadiusPresets[i].name + '\n\n' + borderRadiusPresets[i].date);
        }).catch(e => console.log(`Server might be offline: ${e}`));

}
const loadPresetIntoBox = (borderRadius, borderStyle) => {
    let borderRadiusData = borderRadius.split(' ');
    let borderStyleData = borderStyle.split(' ');

    SETTER__ELEMZERO_TEXT('h3.top-left-val', borderRadiusData[1]);
    SETTER__ELEMZERO_VAL('input.top-left-val', parseInt(borderRadiusData[1]));
    borderRadiusState.topLeft = `${parseInt(borderRadiusData[1])}px`;
    SETTER__ELEMZERO_TEXT('h3.top-right-val', borderRadiusData[2]);
    SETTER__ELEMZERO_VAL('input.top-right-val', parseInt(borderRadiusData[2]));
    borderRadiusState.topRight = `${parseInt(borderRadiusData[2])}px`;
    SETTER__ELEMZERO_TEXT('h3.bot-right-val', borderRadiusData[3]);
    SETTER__ELEMZERO_VAL('input.bot-right-val', parseInt(borderRadiusData[3]));
    borderRadiusState.bottomRight = `${parseInt(borderRadiusData[3])}px`;
    SETTER__ELEMZERO_TEXT('h3.bot-left-val', borderRadiusData[4]);
    SETTER__ELEMZERO_VAL('input.bot-left-val', parseInt(borderRadiusData[4]));
    borderRadiusState.bottomLeft = `${parseInt(borderRadiusData[4])}px`;
    borderRadiusState.borderWidth = `${parseInt(borderStyleData[1])}px`;
    SETTER__ELEMZERO_TEXT('h3.border-width-val', `${parseInt(borderStyleData[1])}px`);
    SETTER__ELEMZERO_VAL('input.border-width-val', parseInt(borderStyleData[1]));

    borderRadiusState.style = borderStyleData[2];
    SETTER__ELEMZERO_VAL('select.style-select', borderStyleData[2]);
    SETTER__ELEMZERO_JSCOLOR('input.js-border-color', borderStyleData[3].substring(0, 7).toLowerCase());
    SETTER__ELEMZERO_VAL('.border-color', borderStyleData[3].substring(1, 7));
    borderRadiusState.borderColor = borderStyleData[3].substring(0, 7);
    SETTER__ELEM_PROP_VAL('.the-box', 'border-radius', borderRadiusState.borderRadius());
    SETTER__ELEM_PROP_VAL('.the-box', 'border', borderRadiusState.borderStyle());
    setShadowTexts();
}

fetchData();

//All Corners slider logic
$('input.all-corners-val').on('input', (e) => {
    borderRadiusState.allCorners = `${e.target.value}px`;
    borderRadiusState.setAllCorners(`${e.target.value}px`);
    SETTER__ELEMZERO_TEXT__PX_END('h3.all-corners-val', e.target.value);
    SETTER__ELEMZERO_TEXT__PX_END('h3.top-left-val', e.target.value);
    SETTER__ELEMZERO_TEXT__PX_END('h3.top-right-val', e.target.value);
    SETTER__ELEMZERO_TEXT__PX_END('h3.bot-right-val', e.target.value);
    SETTER__ELEMZERO_TEXT__PX_END('h3.bot-left-val', e.target.value);
    SETTER__ELEM_PROP_VAL('.the-box', 'border-radius', borderRadiusState.borderRadius());
    SETTER__ELEMZERO_VAL('input.top-left-val', e.target.value);
    SETTER__ELEMZERO_VAL('input.top-right-val', e.target.value);
    SETTER__ELEMZERO_VAL('input.bot-right-val', e.target.value);
    SETTER__ELEMZERO_VAL('input.bot-left-val', e.target.value);
    setShadowTexts();
})
//Top Left Corner slider logic
$('input.top-left-val').on('input', (e) => {
    borderRadiusState.topLeft = `${e.target.value}px`;
    SETTER__ELEMZERO_TEXT__PX_END('h3.top-left-val', e.target.value);
    SETTER__ELEM_PROP_VAL('.the-box', 'border-radius', borderRadiusState.borderRadius());
    setShadowTexts();
})
//Top Right Corner slider logic
$('input.top-right-val').on('input', (e) => {
    borderRadiusState.topRight = `${e.target.value}px`;
    SETTER__ELEMZERO_TEXT__PX_END('h3.top-right-val', e.target.value);
    SETTER__ELEM_PROP_VAL('.the-box', 'border-radius', borderRadiusState.borderRadius());
    setShadowTexts();
})
//Bottom Right Corner slider logic
$('input.bot-right-val').on('input', (e) => {
    borderRadiusState.bottomRight = `${e.target.value}px`;
    SETTER__ELEMZERO_TEXT__PX_END('h3.bot-right-val', e.target.value);
    SETTER__ELEM_PROP_VAL('.the-box', 'border-radius', borderRadiusState.borderRadius());
    setShadowTexts();
})
//Bottom Left Corner slider logic
$('input.bot-left-val').on('input', (e) => {
    borderRadiusState.bottomLeft = `${e.target.value}px`;
    SETTER__ELEMZERO_TEXT__PX_END('h3.bot-left-val', e.target.value);
    SETTER__ELEM_PROP_VAL('.the-box', 'border-radius', borderRadiusState.borderRadius());
    setShadowTexts();
})
//Border width slider logic
$('input.border-width-val').on('input', (e) => {
    borderRadiusState.borderWidth = `${e.target.value}px`;
    SETTER__ELEMZERO_TEXT__PX_END('h3.border-width-val', e.target.value);
    SETTER__ELEM_PROP_VAL('.the-box', 'border', borderRadiusState.borderStyle());
    setShadowTexts();
})
//Box Color logic
$('input.box-color').on('input', (e) => {
    if (e.target.value.length == 6) {
        SETTER__ELEMZERO_JSCOLOR__HASH_START('input.js-box-color', e.target.value);
        SETTER__ELEM_PROP_VAL__HASH_START('.the-box', 'background-color', e.target.value);
    }
})
const updateBoxColor = (jscolor) => {
    SETTER__ELEM_PROP_VAL__HASH_START('.the-box', 'background-color', jscolor);
    SETTER__ELEMZERO_VAL__TOUPPER('input.box-color', jscolor);
}
//Border Color logic
$('input.border-color').on('input', (e) => {
    if (e.target.value.length == 6) {
        borderRadiusState.borderColor = `#${e.target.value}`;
        SETTER__ELEM_PROP_VAL('.the-box', 'border', borderRadiusState.borderStyle());
        SETTER__ELEMZERO_JSCOLOR__HASH_START('input.js-border-color', e.target.value);
        setShadowTexts();
    }
})
const updateBorderColor = (jscolor) => {
    borderRadiusState.borderColor = `#${jscolor}`;
    SETTER__ELEM_PROP_VAL('.the-box', 'border', borderRadiusState.borderStyle());
    SETTER__ELEMZERO_VAL__TOUPPER('input.border-color', jscolor);
    setShadowTexts();
}
//Border Style select logic
$('select.style-select').on('change', (e) => {
    borderRadiusState.style = e.target.value;
    SETTER__ELEM_PROP_VAL('.the-box', 'border', borderRadiusState.borderStyle());
    setShadowTexts();
})
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
        borderRadius: `border-radius: ${borderRadiusState.borderRadius()}`,
        borderStyle: `border: ${borderRadiusState.borderStyle()}`,
        name: $('.preset-name-input')[0].value,
        saveDate: $('.preset-date-input')[0].innerText
    }
    fetch('http://localhost:3000/api/border-radius-data', {
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
    if (!borderRadiusPresets[0]) return;
    loadPresetIntoBox(borderRadiusPresets[0].borderRadius, borderRadiusPresets[0].borderStyle);
    SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'none');
})
$('.preset2').on('click', () => {
    if (!borderRadiusPresets[1]) return;
    loadPresetIntoBox(borderRadiusPresets[1].borderRadius, borderRadiusPresets[1].borderStyle);
    SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'none');
})
$('.preset3').on('click', () => {
    if (!borderRadiusPresets[2]) return;
    loadPresetIntoBox(borderRadiusPresets[2].borderRadius, borderRadiusPresets[2].borderStyle);
    SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'none');
})
$('.preset4').on('click', () => {
    if (!borderRadiusPresets[3]) return;
    loadPresetIntoBox(borderRadiusPresets[3].borderRadius, borderRadiusPresets[3].borderStyle);
    SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'none');
})
$('.preset5').on('click', () => {
    if (!borderRadiusPresets[4]) return;
    loadPresetIntoBox(borderRadiusPresets[4].borderRadius, borderRadiusPresets[4].borderStyle);
    SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'none');
})
$('.preset6').on('click', () => {
    if (!borderRadiusPresets[5]) return;
    loadPresetIntoBox(borderRadiusPresets[5].borderRadius, borderRadiusPresets[5].borderStyle);
    SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'none');
})

//Cancel button logic
$('.cancel-btn2').on('click', () => SETTER__ELEM_PROP_VAL('.preset-overlay2', 'display', 'none'))


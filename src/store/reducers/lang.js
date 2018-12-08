import i18n from '@/lang/index';

let localLang = localStorage.getItem('lang');

if (!localLang) {
    localStorage.setItem('lang', 'cn');
    localLang = 'cn';
}

const initialState = {
    lang: localLang,
    data: i18n[localLang]
}

const lang = (state = initialState, {type, lang}) => {
    switch (type) {
        case 'CHANGE_LANG':
            return {
                ...state,
                lang,
                data: i18n[lang]
            }
    }
    
    return state;
}

export default lang;
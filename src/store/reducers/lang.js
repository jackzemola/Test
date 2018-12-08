import i18n from '@/lang/index';

const initialState = {
    lang: 'cn',
    data: i18n['cn']
}

const lang = (state = initialState, {type, lang}) => {
    switch (type) {
        case 'CHANGE_LANG':
            return Object.ossign({}, state, {
                lang,
                data: i18n[lang]
            })
    }
    
    return state;
}

export default lang;
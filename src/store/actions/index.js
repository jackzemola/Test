export const changeLang = lang => {
    lang = lang.toLowerCase();
    return {
        type: 'CHANGE_LANG',
        lang
    };
}
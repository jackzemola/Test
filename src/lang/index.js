const i18n = (requireContext => {
    const arr = requireContext.keys().map((item) => {
        const reg = /^\.\/(.*)\.js/;
        let result = {
            [reg.exec(item)[1]]: requireContext(item).default
        };
        return result;
    });
    return Object.assign(...arr);
})(require.context('./i18n/', true, /^.*\.js$/))

export default i18n;
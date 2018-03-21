function getUrlParamByPosition(url, position) {
    if (typeof url !== 'string' || typeof position !== 'number') return undefined;
    let params = url.slice(0);
    let valueParamByPosition = "";
    // Get string params
    params = params.split('?').length > 0 ? params.split('?')[1] : undefined;
    // Get array params from string
    params = params !== undefined ? params.split('&') : undefined;
    // Return value nameParam
    if (Array.isArray(params)) {
        params.map((el, index) => {
            if (index == (position - 1)) valueParamByPosition = el.split('=')[1];
        });
    }
    return valueParamByPosition.length > 0 ? valueParamByPosition : undefined;
};

function getUrlParamByName(url, nameParam) {
    if (typeof url !== 'string' || typeof nameParam !== 'string') return undefined;
    let params = url.slice(0);
    let valueParamByName = "";
    // Get string params
    params = params.split('?').length > 0 ? params.split('?')[1] : undefined;
    // Get array params from string
    params = params !== undefined ? params.split('&') : undefined;
    // Return value nameParam
    if (Array.isArray(params)) {
        params.map(el => {
            let values = el.split('=');
            if (values[0] === nameParam) valueParamByName = values[1];
        });
    }
    return valueParamByName.length > 0 ? valueParamByName : undefined;
}

function getNameLoadPage(url) {
    if (typeof url === 'string') {
        return url.slice(0).split("?")[0].split("/").slice(-1)[0].split('.')[0];
    } else {
        return undefined;
    }
}
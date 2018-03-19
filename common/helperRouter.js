function getUrlParams(url, nameParam = "", position = 1) {
    if (nameParam === "") return 0;
    let param = url.slice(0);
    // Get params
    param = param.split('?').length > 0 ? param.split('?')[1] : 0;
    // Get param position index
    param = (param !== 0 && param.split('&').length > 0) ? param.split('&')[position - 1] : 0;
    // Get value param nameParam
    param = (param !== 0 && param.split('=').length > 0) ? 
        param.split('=')[0] === nameParam ? param.split('=')[1] : 0 : 0;
    return param;
}
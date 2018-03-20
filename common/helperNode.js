function createNode(nodeType, attribute = {}, addText = "", addHtml = "") {
    let element = document.createElement(`${nodeType}`);

    let keys = Object.keys(attribute);
    let values = Object.values(attribute);
    keys.map((el, index) => element.setAttribute(`${el}`, `${values[index]}`));

    if (addText !== "") element.innerText = addText;
    if (addHtml !== "") element.innerHTML = addHtml;
    
    return element;
}
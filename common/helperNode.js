function createNode(nodeType, attribute = {}, addText = "") {
    let element = document.createElement(`${nodeType}`);

    if (Array.isArray(attribute) || attribute === null || typeof attribute !== 'object') attribute = {};
    
    let keys = Object.keys(attribute);
    let values = Object.values(attribute);
    keys.map((el, index) => element.setAttribute(`${el}`, `${values[index]}`));

    if (addText !== "") element.innerText = addText;
    
    return element;
}
if (getNameLoadPage(location.href).includes('index')) {
    document.addEventListener('DOMContentLoaded', loadListPost);
}

function loadListPost() {
    fetch(`${config.BaseUrl}/posts`)
        .then(response => response.json())
        .then(json => Object.keys(json).map((key) => json[key]))
        .then(data => data.map((obj, index) => {
            
            let elemPost = createNode('div', {"class": "post"});
            elemPost.appendChild(createNode('h3', null, `${index + 1}. ${obj.title}`));

            let elemButton = createNode('a', {"name":`posts/${obj.id}`, "class": "btn"}, "Детально");
                elemButton.addEventListener('click', () => location.href = `detail.html?id=${obj.id}`);
            elemPost.appendChild(elemButton);

            document.getElementById('content').appendChild(elemPost);
        }
    ));
};
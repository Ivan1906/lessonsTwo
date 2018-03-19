if (location.href.split("?")[0].split("/").slice(-1)[0].split('.')[0].includes('index')) {
    document.addEventListener('DOMContentLoaded', loadListPost);
}

function loadListPost() {
    fetch(`${config.BaseUrl}/posts`)
        .then(response => response.json())
        .then(json => Object.keys(json).map((key) => json[key]))
        .then(data => data.map((obj, index) => {
            let elemPost = document.createElement('div');
            elemPost.className = 'post';

            let elemTitle = document.createElement('h3');
            elemTitle.innerText = `${index + 1}. ${obj.title}`;

            let elemButton = document.createElement('a');
            elemButton.setAttribute('name', `posts/${obj.id}`);
            elemButton.addEventListener('click', () => location.href = `detail.html?id=${obj.id}`);
            elemButton.innerText = 'Детально';
            elemButton.className = 'btn';
            
            elemPost.appendChild(elemTitle);
            elemPost.appendChild(elemButton);
            document.getElementById('content').appendChild(elemPost);
        }
    ));
};
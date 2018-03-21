if (getNameLoadPage(location.href).includes('detail')) {
    document.addEventListener('DOMContentLoaded', detailPost);
}

function detailPost() {
    let postId = getUrlParamByName(location.href, "id");
    //let postId = getUrlParamByPosition(location.href, 1);

    fetch(`${config.BaseUrl}/posts/${postId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Помилка запиту до сервера при отримані детальної інформації поста")
        })
        .then(json => Object.keys(json).map(key => json[key]))
        .then(data => {
            document.getElementById("detailContent").innerHTML = "";

            let elemPost = createNode('div', {"class": "post"});
                elemPost.appendChild(createNode('h2', null, `${data[2]}`));
                elemPost.appendChild(createNode('p', null, `${data[3]}`));
            let elemCommets = createNode('div', {"class": "comments", "id": "comments"});

            document.getElementById('detailContent').appendChild(elemPost).appendChild(elemCommets);
            
            getCommentsByPostId(postId);
        })
        .catch(error => document.getElementById("detailContent").innerHTML = `<h1>${error.message}</h1>`);
};

function getCommentsByPostId(urlPost) {
    fetch(`${config.BaseUrl}/posts/${urlPost}/comments`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Помилка запиту до сервера при отримані коментарів поста")
    })
    .then(json => Object.keys(json).map(key => json[key]))
    .then(data => data.map((obj, index) => {
        let elemComment = createNode('div', {"class": "comment"});

        elemComment.appendChild(createNode('h4', null, `${index + 1}. ${obj.name}`.toUpperCase()));
        elemComment.appendChild(createNode('address', null, `${obj.email}`))
        elemComment.appendChild(createNode('p', null, `${obj.body}`))

        document.getElementById('comments').appendChild(elemComment);
    }))
    .catch(error => document.getElementById("comments").innerHTML = `<h1>${error.message}</h1>`);
}
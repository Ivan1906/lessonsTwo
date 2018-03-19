if (location.href.split("?")[0].split("/").slice(-1)[0].split('.')[0].includes('detail')) {
    document.addEventListener('DOMContentLoaded', detailPost);
}

function detailPost() {
    let postId = getUrlParams(location.href, "id", 1);
    console.log(`${config.BaseUrl}/posts/${postId}`);
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

            let elemPost = document.createElement('div');
            elemPost.className = 'post';

            let elemCommets = document.createElement('div');
            elemCommets.id = 'comments';
            elemCommets.className = 'comments';

            let elemTitle = document.createElement('h2');
            elemTitle.innerText = data[2];

            let elemBody = document.createElement('p');
            elemBody.innerText = data[3];

            elemPost.appendChild(elemTitle);
            elemPost.appendChild(elemBody);
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
        let elemComment = document.createElement('div');
        elemComment.className = 'comment';

        let elemName = document.createElement('h4');
        elemName.innerText = `${index + 1}. ${obj.name}`.toUpperCase();

        let elemEmail = document.createElement('address');
        elemEmail.innerText = obj.email;

        let elemBody = document.createElement('p');
        elemBody.innerText = obj.body;

        elemComment.appendChild(elemName);
        elemComment.appendChild(elemEmail);
        elemComment.appendChild(elemBody);
        document.getElementById('comments').appendChild(elemComment);
    }))
    .catch(error => document.getElementById("comments").innerHTML = `<h1>${error.message}</h1>`);
}
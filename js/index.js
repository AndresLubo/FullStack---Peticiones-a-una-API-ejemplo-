const d = document,
    $main = d.querySelector("main"),
    $t_post = d.getElementById("t-post").content,
    $t_user = d.getElementById("t-user").content,
    $t_comment = d.getElementById("t-comments").content,
    $fragment = d.createDocumentFragment();


const get = async(options) => {
    let {
        url,
        headers,
        succes
    } = options;

    try {
        let res = await axios.get(url),
            json = await res.data;

        succes(json);

    } catch (error) {
        let message = error.statusText || "Ocurrió un error";
        $main.innerHTML = `<p><b>Error ${error.status}: ${message}</b></p>`;
    }
}

const clearMain = () => {
    $main.innerHTML = null;
}

const getUsers = () => {
    get({
        url: "https://jsonplaceholder.typicode.com/users",
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        succes: (json) => {
            json.forEach(el => {
                $t_user.querySelector(".card-header").textContent = el.name;
                $t_user.querySelector(".username").textContent = `Username: ${el.username}`;
                $t_user.querySelector(".id").textContent = `Id: ${el.id}`;
                $t_user.querySelector(".email").textContent = `Email: ${el.email}`;
                $t_user.querySelector(".phone").textContent = `Phone: ${el.phone}`;
                $t_user.querySelector(".website").textContent = `WebSite: ${el.website}`;

                let $clone = d.importNode($t_user, true);
                $fragment.appendChild($clone);
            });

            clearMain();
            $main.appendChild($fragment);
        }
    })
}


d.addEventListener("DOMContentLoaded", getUsers())


d.addEventListener("click", e => {

    if (e.target.matches(".usuarios")) {
        e.preventDefault();
        getUsers();
    }


    if (e.target.matches(".post")) {
        e.preventDefault();
        get({
            url: "https://jsonplaceholder.typicode.com/posts",
            headers: {
                "content-type": "application/json; charset=utf-8"
            },
            succes: (json) => {
                json.forEach(el => {
                    $t_post.querySelector(".card-header").textContent = `Post: ${el.id}`;
                    $t_post.querySelector(".card-title").textContent = el.title;
                    $t_post.querySelector(".card-text").textContent = el.body;

                    let $clone = d.importNode($t_post, true);
                    $fragment.appendChild($clone);
                });

                clearMain();
                $main.appendChild($fragment);
            }
        })
    }


    if (e.target.matches(".comentarios")) {
        e.preventDefault();

        get({
            url: "https://jsonplaceholder.typicode.com/comments",
            headers: {
                "content-type": "application/json; charset=utf-8"
            },
            succes: (json) => {
                json.forEach(el => {
                    $t_comment.querySelector(".card-header").textContent = el.id;
                    $t_comment.querySelector(".name").textContent = el.name;
                    $t_comment.querySelector(".email").textContent = el.email;
                    $t_comment.querySelector(".blockquote-footer").textContent = el.body;

                    let $clone = d.importNode($t_comment, true);
                    $fragment.appendChild($clone);
                });

                clearMain();
                $main.appendChild($fragment);
            }
        });
    }
})
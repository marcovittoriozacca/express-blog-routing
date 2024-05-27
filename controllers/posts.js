const postsList = require('../database/db.js');
//index controller for the route /posts
const index = (req,res) => {
    let html;

    html = `<ul>`;
    postsList.forEach(p => { 
        html+= `<li>
                    <h2>${p.title}</h2>
                    <p>${p.content}</p>
                    <img width="200" src="./imgs/posts/${p.image}" alt="${p.title}">
                </li>`
    });
    html += `</ul>`;
    res.send(html);
}

module.exports = {
    index,
}

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

const show = (req, res) => {
    const param =  req.params.slug;
    
    const targetPost = postsList.find(post => post.slug === param);
    res.format({
        html: () => {
            if(targetPost){
                const {title, content, image, tags} = targetPost;
                res.send(`
                    <h1>${title}</h1>
                    <p>${content}</p>
                    <img width="200" src="/imgs/posts/${image}" alt="${title}">
                    <div>
                        ${tags.map(tag => `<span>${tag}</span>`).join(' - ')}
                    </div>
                `)
            }else{
                res.status(404).send(`Post: ${param} not found`);
            }
        },
        json: () => {
            if(targetPost){
                res.json(targetPost);
            }else{
                res.status(404).json({
                    success: false,
                    error: `Post: ${param} not found`
                });
            }
        }
    })
}

module.exports = {
    index,
    show
}

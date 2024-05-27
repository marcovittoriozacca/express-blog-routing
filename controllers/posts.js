const postsList = require('../database/db.js');
const path = require('path');
const fs = require('fs');
const {showLink} = require('../utils.js');
//index controller for the route /posts
const index = (req,res) => {
    let html;

    html = `<ul>`;
    postsList.forEach(p => { 
        html+= `<li>
                    <a style="text-decoration:none" href="${showLink(req, p.title)}">
                        <h2>${p.title}</h2>
                        <p>${p.content}</p>
                        <img width="200" src="./imgs/posts/${p.image}" alt="${p.title}">
                    </a>
                </li>`
    });
    html += `</ul>`;
    res.send(html);
}

const show = (req, res) => {
    const param =  req.params.slug;
    
    let targetPost = postsList.find(post => post.slug === param);
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
                targetPost.image_url = `${req.headers.host}/imgs/posts/${targetPost.image}`;
                targetPost.image_download_link = `${req.headers.host}/posts/${param}/download`;
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

const create = (req, res) => {
    res.format({
        html: () => {
            res.send('<h1>Creazione nuovo post</h1>')
        },
        default: () => {
            res.status(406).send('Error 406 - Not Acceptable')
        }
    })
}

const download = (req, res) => {
    const param = req.params.slug;
    const targetPost = postsList.find(post => post.slug.replace('/', '-') === param);
    if(targetPost){
        const imagePath = path.join(__dirname, '../public/imgs/posts/', `${targetPost.image}`);
    
        if(fs.existsSync(imagePath)){
            res.download(imagePath)
        }else{
            res.status(404).send(`Error 404 - The image ${targetPost.image} doesn't exist`)
        }
    }else{
        res.status(404).send(`Error 404 - Post: ${param} doesn't exist`)
    }

}
module.exports = {
    index,
    show,
    create,
    download
}

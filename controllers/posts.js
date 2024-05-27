const postsList = require('../database/db.js');
const path = require('path');
const fs = require('fs');
const {showLink, getTemplate} = require('../utils.js');
//index controller for the route /posts

let html = getTemplate('template');

const index = (req,res) => {
    const content = postsList.map(p => `
    <li>
        <a class="flex flex-col gap-y-5" href="${showLink(req, p.title)}">
            <h2 class="text-3xl font-semibold text-blue-500">${p.title}</h2>
            <p>${p.content}</p>
            <figure class="w-52 rounded-md overflow-hidden">
                <img class="w-full h-auto" src="./imgs/posts/${p.image}" alt="${p.title}">
            </figure>
            <div>
                ${p.tags.map(tag => `<span class="odd:text-blue-400 even:text-rose-400">${tag}</span>`).join(' - ')}
            </div>
        </a>
    </li>
  `).join('');

  const mainHtml = html.replace("yield", content);
    res.send(mainHtml);
}
//show controller for the route /posts/:slug where :slug is a dynamic parameter passed throug the url
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

//create controller - at the moment its just displays an h1
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

//download route to download the single post image
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

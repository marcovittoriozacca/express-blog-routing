const fs = require('fs');
const path = require('path');

const showLink = (req, element) => {
    const elementPath = element.replaceAll(' ', '-').replaceAll('/', '-').toLowerCase();
    return `http://${req.headers.host}/posts/${elementPath}`;
}
const getTemplate = (name) => {
    const filePath = path.join(__dirname, name+'.html');
    return fs.readFileSync(filePath).toString();
}


module.exports = {
    showLink,
    getTemplate
}
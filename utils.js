const showLink = (req, element) => {
    return `http://${req.headers.host}/posts/${element.toLowerCase()}`;
}

module.exports = {
    showLink,
}
const express = require('express');
require('dotenv').config();
const posts = require('./routers/posts.js');

const app = express();
app.use(express.static('public'));

const port = process.env.PORT || 3000;
const host = process.env.host || "localhost";

app.get('/', (req, res) => {
    res.send('<h1>Pagina Iniziale</h1>');
})

// /posts route with posts router using posts controller
app.use('/posts', posts);

app.listen(port, host, () => {
    console.log(`Server avviato su: http://${host}:${port}`);
})
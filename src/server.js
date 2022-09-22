import express from 'express';

let articlesInfo = [
    {
        name: 'learn-react',
        upvotes: 0,
        comments: [],
    },
    {
        name: 'learn-node',
        upvotes: 0,
        comments: [],
    },
    {
        name: 'learn-mongodb',
        upvotes: 0,
        comments: [],
    },
];

const app = express();
app.use(express.json()); // parse body when receive json body

// app.get('/hello', (request, response) => {
//     response.send('Hello!');
// });

// app.post('/hello', (request, response) => {
//     console.log(request.body);
//     response.send(`Hello ${request.body.name}!`);
// });

// app.get('/hello/:name/goodbye/:otherName', (request, response) => {
//     const { name, otherName } = request.params;
//     response.send(`Hello ${name}, goodbye ${otherName}!`);
// });

// app.get('/hello/:name/goodbye/:otherName', (request, response) => {
//     const { name, otherName } = request.params;
//     response.send(`Hello ${name}, goodbye ${otherName}!`);
// });

app.put('/api/articles/:name/upvote', (req, res) => {
    const { name } = req.params;
    const article = articlesInfo.find(a => a.name === name);

    if (article) {
        article.upvotes += 1;
        res.send(`The ${name} article has ${article.upvotes} upvotes!`);
    } else {
        res.send(`The ${name} article doen\'t exist!`);
    }
});

app.post('/api/articles/:name/comment', (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    
    const article = articlesInfo.find(a => a.name === name);

    if (article) {
        article.comments.push({ postedBy, text });
        res.send(article.comments);
    } else {
        res.send(`The ${name} article doen\'t exist!`);
    }
});
 

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});
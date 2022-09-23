import express from 'express';
import { db, connectToDB } from './db.js';

const app = express();
app.use(express.json()); // parse body when receive json body

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article); // not res.send()!
    } else {
        res.sendStatus(404).send('Article not found!'); 
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;

    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 }, // increment by one
        // $set: { upvotes: 10 }, // set to 10
    });

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(`The ${name} article has ${article.upvotes} upvotes!`);
    } else {
        res.send(`The ${name} article doen\'t exist!`);
    }
});

app.post('/api/articles/:name/comment', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } }, // add new item in array
    });

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(article.comments);
    } else {
        res.send(`The ${name} article doen\'t exist!`);
    }
});
 
connectToDB(() => {
    console.log('Successfully connected to the Data Base!');

    app.listen(8000, () => { // server will not start till we connect to the data base
        console.log('Server is listening on port 8000');
    });
});

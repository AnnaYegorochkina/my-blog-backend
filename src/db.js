import { MongoClient } from 'mongodb';

let db;

async function connectToDB(cb) {
    const client = new MongoClient('mongodb://127.0.0.1:27017'); // local host
    await client.connect();

    db = client.db('react-blog-db'); // use react-blog-db
    cb();
}

export {
    db,
    connectToDB,
};
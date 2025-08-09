import { MongoClient } from 'mongodb';

const URL = 'mongodb://localhost:27017/';
const URL_CLUSTER = 'mongodb+srv://admin:admin@cluster0.5tfsa9x.mongodb.net/';

const client = new MongoClient(URL);

const start = async () => {
  try {
    await client.connect();
    console.log('Конект до БД mongodb');
    await client.db('mongo');
    // якщо не вказати існуючу під базу 'mongo', то всі дані 
    // будуть створюватися і записуватися в стандартну підбазу 'test'
    await client.db('mongo').createCollection('users2');
    const users = client.db('mongo').collection('users');
    users.insertOne({ fullname: "ulbitv", age: 12 });
    const user = await users.findOne({ fullname: "ulbitv" });
    console.log(user);
  } catch (error) {
    console.error(error);
  }
}

start();
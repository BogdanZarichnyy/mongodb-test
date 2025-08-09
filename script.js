import { MongoClient } from 'mongodb';

const URL = 'mongodb://localhost:27017/';
const URL_CLUSTER = 'mongodb+srv://admin:admin@cluster0.5tfsa9x.mongodb.net/';

const client = new MongoClient(URL);
// const client = new MongoClient(URL_CLUSTER);

const names = [ "Alice", "Bob", "Franc", "Mike", "Nick", "Den", "Oliver", "Jack" ];
const cities = [ "Lisbon", "Porto", "Madrid", "Berlin", "Paris", "Rome", "London", "Kiev" ];

const bulkData = [];

const start = async () => {
  try {
    await client.connect();
    console.log('Конект до БД mongodb');
    await client.db('mongo');
    // якщо не вказати існуючу під базу 'mongo', то всі дані 
    // будуть створюватися і записуватися в стандартну підбазу 'test'
    // await client.db('mongo').createCollection('users2');
    const users = client.db('mongo').collection('users');

    // for (let i = 0; i < 10000000; i++) {
    for (let i = 0; i < 1000000; i++) {
      bulkData.push({
        name: names[Math.floor(Math.random() * names.length)] + '_' + i,
        age: Math.floor(Math.random() * 60) + 18,
        verified: Math.random() < 0.5,
        email: `user${i}@example.com`,
        address: {
          city: cities[Math.floor(Math.random() * cities.length)],
          street: `Street ${Math.floor(Math.random() * 100) + 1}`
        }
      });
      if (bulkData.length === 1000) {
        // db.users.insertMany(bulkData);
        await users.insertMany(bulkData);
        bulkData.length = 0; // очищуємо масив
        console.log(`Inserted ${i + 1} document`);
      }
    }

    await client.close();
    console.log('Дісконект від БД mongodb');
  } catch (error) {
    console.error(error);
  }
}

start();
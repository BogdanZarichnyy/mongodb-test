# mongodb-test
mongodb-test

use test // mongodb://localhost:27017/

show dbs

use mongo

db.createCollection("users")

show collections

db.users.insertOne({
  name: "ulbitv",
  age: 25
})

db.users.find()

db.users.insertMany([
  {name: "Vasya", age: 28},
  {name: "Petya", age: 23},
  {name: "Dima", age: 35},
  {name: "Anton", age: 24},
  {name: "ulbi tv", age: 42}
])

-------------------------------------------------------
// вивиодить всі записи в колекції

db.users.find()

db.users.find({ age: 25 }) // === '25'

db.users.find({ age: 25, name: "asd" })  // null

db.users.find({ age: 25, name: "ulbitv" })

db.users.find({ name: "ulbi" })  // null

db.users.find({ name: "ulbi tv" })

-------------------------------------------------------

db.users.find({$or: [{ name: "ulbitv" }, { age: 35 }] })

db.users.find({ age: {$lt:30} }) // < '30'

db.users.find({ age: {$lt:28} }) // < '28'

db.users.find({ age: {$lte:28} }) // <= '28'

db.users.find({ age: {$gt:28} }) // > '28'

db.users.find({ age: {$gte:28} }) // >=  '28'

db.users.find({ age: {$ne:28} }) // !== '28'

-------------------------------------------------------

// { name: 1 } - 1 вказує на те, що поле name потрібно показати у відповіді

db.users.find({ age: { $lt: 28 }}, { name: 1 } )

// { ..., _id: 0 } - 0 вказує на те, що поле _id не показувати у відповіді

db.users.find({ age: { $lt: 28 }}, { name: 1, _id: 0 } )

db.users.find({ age: { $lte: 28 }}, { name: 1, _id: 0 } )

db.users.find({ age: { $gte: 28 }}, { name: 1, _id: 0 } )

db.users.find({ age: { $gt: 28 }}, { name: 1, _id: 0 } )

-------------------------------------------------------

db.users.find().sort({ age: 1 }) // прямий порядок сортування

db.users.find().sort({ age: -1 }) // зворотній порядок сортування

-------------------------------------------------------

db.users.find().limit(4) // перші 4 записи

// від'ємні числа будуть рахуватися як плюсові, 
// вони ніяк не впливають на порядок виводу

db.users.find().limit(-2)

// знайдемо перших 2 записи пропустивши перший

db.users.find().limit(2).skip(1)

-------------------------------------------------------

db.users.findOne({_id: ObjectId("68963345ee5ba432140774cf")})

db.users.findOne({age: 23})

-------------------------------------------------------

db.users.update(
  {name: "ulbitv"},
  {
    $set: {
      name: "ilon mask",
      age: 45
    }
  }
)

db.users.updateOne(
  {name: "ulbitv"},
  {
    $set: {
      name: "ilon mask",
      age: 45
    }
  }
)

// перейменовуємо поле name на fullname у всіх записах
db.users.updateMany(
  {},
  {
    $rename: {
      name: "fullname",
    }
  }
)

-------------------------------------------------------

db.users.deleteOne({ age: 24 })

-------------------------------------------------------

db.users.bulkWrite([{}, {}, ...{} ]) // виконує декілька операцій одночасно

db.users.bulkWrite([
  {
    insertOne: {
      document: { fullname: "nastya", age: 18 }
    }
  },
  {
    deleteOne: {
      filter: { fulname: "petya" }
    }
  }
])

db.users.bulkWrite([
  {
    insertOne: {
      document: { fullname: "Nastya", age: 18 }
    }
  },
  {
    deleteMany: {
      filter: { $or: [{ fullname: "Petya" }, { fullname: "nastya" }] }
    }
  }
])

-------------------------------------------------------

db.users.deleteMany({ fullname: "Nastya" })

db.users.deleteOne({ fullname: "Nastya" })

-------------------------------------------------------

db.users.insertOne({ fullname: "petya", age: 44})

// знаходимо петю і додаємо йому поле з постами

db.users.update(
  { fullname: "petya" },
  {
    $set: {
      posts: [
        { title: "javascript", text: "js top" },
        { title: "mongo", text: "mongo database" },
      ]
    }
  }
)

-------------------------------------------------------

// знаходимо петю і виводимо поле з постами

db.users.findOne(
  { fullname: "petya" },
  { posts: 1 }
)

// знаходимо запис в якого є пости із значенням у полі title: "javascript"

db.users.find(
  {
    posts: {
      $elemMatch: {
        title: "javascript"
      }
    }
  }
)

-------------------------------------------------------

// знаходимо запис в якого є поле posts
db.users.find({ posts: { $exists: true } })

db.users.find({ email: { $exists: true } })

db.users.find({ email: { $exists: false } })

db.users.find({ $and: [{email: { $exists: false }}, {posts: { $exists: false }}] })

-------------------------------------------------------

db.users.find({ age: { $in: [18, 35, 44] } })

db.users.find({ age: { $in: [12, 35, 46] } })

db.users.find({ age: { $gte: 18, $lte: 60 } })

db.users.find({ age: { $gte: 18, $lte: 35 } })

-------------------------------------------------------

db.users.find({ $and: [{ age: { $gt: 20 }}, { email: { $exists: false } }] })

db.users.find({ $and: [{ age: { $gt: 30 }}, { email: { $exists: false } }] })

db.users.find({ age: { $gt: 30 }, email: { $exists: false } })

db.users.find({ $or: [{ age: { $gt: 30 }}, { email: { $exists: false } }] })

db.users.find({ $or: [{ age: { $gt: 30 }}, { email: { $exists: true } }] })

db.users.find({ fullname: { $not: { $eq: "ilon mask" } } })

-------------------------------------------------------

db.users.insertOne({ 
  name: "Tom", 
  age: 33, 
  address: {
    street: "Avenida de Liberdade 1",
    city: "Lisboa"
  } 
})

db.users.find({ "adress.city": "Lisboa" })

db.users.find({ adress.city: "Lisboa" }) //  буде помилка

-------------------------------------------------------
// countDocuments використовують якщо потрібно дізнатися скільки документів, 
// наприклад, існує із записами age більше 30 - оператор повертає число

db.users.countDocuments({ age: { $gt: 30 } })

db.users.count({ age: { $gt: 30 } }) // count DeprecationWarning

-------------------------------------------------------
// збільшуємо всім age на 1 - оператор $inc

db.users.updateMany(
  {},
  { $inc: { age: 1 } }
)

db.users.updateMany(
  { adress: { $exists: true } },
  { $rename: { "adress": "address" } }
)

// створимо йому нове поле newField

db.users.updateOne(
  { _id: ObjectId('689666eaee5ba432140774de') },
  { $set: { newField: "abc" } }
)

// видалимо йому нове поле newField

db.users.updateOne(
  { _id: ObjectId('689666eaee5ba432140774de') },
  { $unset: { newField: "abc" } }
)

-------------------------------------------------------

// створимо йому нове поле permissions - воно буде масивом,
// оператор $push автоматично створить масив якщо його немає

db.users.updateOne(
  { _id: ObjectId('689666eaee5ba432140774de') },
  { $push: { permissions: "create_post" } }
)

db.users.updateOne(
  { _id: ObjectId('689666eaee5ba432140774de') },
  { $push: { permissions: "delete_post" } }
)

// видалимо тільки що додане значення із цього масиву

db.users.updateOne(
  { _id: ObjectId('689666eaee5ba432140774de') },
  { $pull: { permissions: "delete_post" } }
)

-------------------------------------------------------

db.users.deleteMany({ age: { $gt: 30 } })

db.users2.drop()

db.users.drop()

db.dropDatabase()

-------------------------------------------------------
// індекси прискорюють пошук в БД
// спочатку наповнимо БД рандомними даними - 10 мільйонів записів
// запускаємо скрипт script.js і чекаємо поки він закінчить роботу

db.users.find().limit(2)

db.users.find({ age: { $gte: 40 } }).sort({ age: 1 })

db.users.find({ age: { $gte: 40 } }).sort({ age: 1 }).limit(100000)

// на локальній БД максимум ліміт ставити пів мільйона .limit(500000),
// інакше служба mongodb вирубається і пошкодить саму БД і не запуститься
// щоб відновити роботу потрібно закрити MongoDB Compass або відключитися 
// відключитися від БД в ньому, потім видалити всі файли з папки 
// C:\Program Files\MongoDB\Server\8.0\data, перезапустити службу mongodb 
// і наново заповнити БД даними - наразі у БД 1 000 000 записів

db.users.find({ age: { $gte: 40 } }).sort({ age: 1 }).limit(500000)

-------------------------------------------------------
// спробуємо пришвидшити пошук в БД

db.users.find({ age: { $gte: 40 }, "address.city": "Paris" })
  .sort({ age: -1 }).limit(500000)

-------------------------------------------------------
// створимо індекси по полю age і повторимо наші запити в БД

db.users.createIndex({ age: 1 })

-------------------------------------------------------

// якщо ми додамо в запит сортування і по іншому полю, наприклад по name,
// то операція буде виконуватися так же як і без індексів

db.users.find({ age: { $gte: 40 }, "address.city": "Paris" })
  .sort({ age: -1, name: 1 }).limit(500000)

-------------------------------------------------------

// в такому разі потрібно створювати індекси на групу полів по яких
// буде часто здійснюватися та шукатися якась інформація в БД

db.users.createIndex({ age: -1, name: 1 })

-------------------------------------------------------

// а тепер змінимо порядок сортування у запиті: age по зростанню,
// name по спаданню - він спрацює швидко, бо не порушений порядок індексів

db.users.find({ age: { $gte: 40 }, "address.city": "Paris" })
  .sort({ age: 1, name: -1 }).limit(500000)

// але при такому порядку сортування: age та name по зростанню,
// запит буде повільний, тому що індекси створені в іншому порядку

db.users.find({ age: { $gte: 40 }, "address.city": "Paris" })
  .sort({ age: 1, name: 1 }).limit(500000)

// тому перед важкими запитами, потрібно наперед передбачити та створити
// всі індекси по яким буде здійснюватися пошук інформації в БД

// щоб побачити індекси в певній колекції використовують наступну команду

db.users.getIndexes()

// результат - індекс '_id_' створюється завжди у всіх колекціях

[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { age: 1 }, name: 'age_1' },
  { v: 2, key: { age: -1, name: 1 }, name: 'age_-1_name_1' }
]

// видалити індекс

db.users.dropIndex('age_-1_name_1')
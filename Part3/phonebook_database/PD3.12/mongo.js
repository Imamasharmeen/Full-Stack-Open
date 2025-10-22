// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('Please provide password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]
// const name = process.argv[3]
// const number = process.argv[4]

// // 🔗 তোমার MongoDB connection URL
// const url = `mongodb+srv://fullstack_open:${password}@cluster0.s6qv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// mongoose.set('strictQuery', false)
// mongoose.connect(url)

// // 📘 Schema define
// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// })

// // 📘 Model তৈরি
// const Person = mongoose.model('Person', personSchema)




// if (name && number){

//   const person = new Person({
//     name,
//     number,
//   });

//   person
//     .save()
//     .then((result) => {
//     console.log( `added ${name} number ${number} to phonebook `);
//     mongoose.connection.close();
//   })

//   .catch((err) => {
//   console.error("Error saving the person: ", err);
//   mongoose. connection.close();
//   })
// } else {
//   Person
//     .find({})
//     .then((result) => {
//     console.log("phonebook:");
//     result.forEach((person) => {
//     console.log(`${person.name} ${person.number}` );
//   });
//   mongoose.connection.close();
//   })
//   .catch((err) => {
//   console.error("Error fetching the person data: ", err);
//   mongoose.connection.close()
//   })
// }


// require('dotenv').config();
const mongoose = require('mongoose');
if (process.argv.length < 3) {
  console.log('Please provide the MongoDB URI as an argument');
  process.exit(1);
}
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

// Use the MongoDB URI from the .env file
const url = `mongodb+srv://phonebook:${password}@cluster0.gfqxkdb.mongodb.net/phone_book?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

// 📘 Schema define
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// 📘 Model তৈরি
const Person = mongoose.model('Person', personSchema);

// const person = new Person({
//      name,
//     number,
// });
// person
//   .save()
//   .then((result) => {
//     console.log(`added ${name} number ${number} to phonebook`);
//     mongoose.connection.close();
//   })

if (name && number) {
  const person = new Person({
    name,
    number,
  });


  person
    .save()
    .then((result) => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error('Error saving the person: ', err);
      mongoose.connection.close();
    });
} else {
  Person.find({})
    .then((result) => {
      console.log('phonebook:');
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error('Error fetching the person data: ', err);
      mongoose.connection.close();
    });
}
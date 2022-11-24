/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const _ = require('lodash');

mongoose.connect('mongodb+srv://laophan74:01639914061@cluster.n9czek3.mongodb.net/?retryWrites=true&w=majority');

const bookSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  author: [{ type: mongoose.Types.ObjectId, ref: 'Author' }],
});

const authorSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  firstName: String,
  lastName: String,
});

const Book = mongoose.model('Book', bookSchema);
const Author = mongoose.model('Author', authorSchema);

function addNew() {
  const newBook = new Book({
    _id: new mongoose.Types.ObjectId(),
  });

  newBook.save(() => {
    const newAuthor = new Author({
      _id: new mongoose.Types.ObjectId(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });

    newAuthor.save();
    newBook.author.push(newAuthor._id);
    newBook.save();
  });
}
// addNew();

async function pushAuthorToBook() {
  const newAuthor = await Author.create({
    _id: new mongoose.Types.ObjectId(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  });
  await Book.updateOne(
    { _id: '6373485735b0be1e7c6ad6a3' },
    { $push: { author: newAuthor._id } },
  );
  console.log(newAuthor);
}
// pushAuthorToBook();

function populate(condition, key) {
  async function handleAuthor(filter) {
    const a = await Book.findOne(filter);
    const author = [];
    for (let i = 0; i < a.author.length; i += 1) {
      const e = await Author.findOne({ _id: a.author[i] });
      if (typeof (key) !== 'undefined') {
        author.push(e[key]);
      } else author.push(e);
    }
    const result = {
      _id: a._id,
      author,
    };
    console.log(result);
  }
  if (_.isArray(condition)) {
    for (let i = 0; i < condition.length; i += 1) {
      handleAuthor(condition[i]);
    }
  } else {
    handleAuthor(condition);
  }
}
// ANCHOR -  populate(condition: one(object) or many(array of object), option: key: String)
populate(
  [{ _id: '6373485735b0be1e7c6ad6a3' }, { _id: '63721bedcd09f0f54000446b' }],
  'firstName',
);

// populate({ _id: '63721bedcd09f0f54000446b' });

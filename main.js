/* eslint-disable no-console */
const mongoose = require('mongoose');
const User = require('./User');

const { Story, Person } = require('./People');

mongoose.connect('mongodb+srv://laophan74:01639914061@cluster.n9czek3.mongodb.net/?retryWrites=true&w=majority');

// ANCHOR - Thêm

async function addUser(name, age, gender) {
  const addedUser = await User.create({
    name,
    age,
    gender,
  });

  // NOTE - create() tạo mới 1 document, trả về Object Document đó

  console.log(addedUser);
}
// addUser('Nguyen Thi Thuy Tien', 22, false);

async function addManyUser(arr) {
  const addedUser = await User.insertMany(arr);

  // NOTE - insertMany() tạo mới nhiều document, trả về các Object Document đó

  console.log(addedUser);
}
// addManyUser([
//   { name: 'Hoang Thuy Linh', age: 20, gender: false },
//   { name: 'Hoang Hai', age: 20, gender: true },
// ]);

// ANCHOR - Sửa

async function findOneAndUpdateUser(filter, data) {
  try {
    const updatedUser = await User.findOneAndUpdate(filter, data, { new: true });

    // NOTE - findOneAndUpdate() chỉ sửa document đầu tiên tìm được, trả về Object Document đó
    // { new: true } để trả về Object đó sau khi update

    console.log(updatedUser);
  } catch (error) {
    console.log(error);
  }
}
// findOneAndUpdateUser(
//   { age: 26 },
//   { age: 25 },
// );

async function updateOneUser(filter, data) {
  try {
    const updatedUser = await User.updateOne(filter, data);

    // NOTE - findOneAndUpdate() chỉ sửa document đầu tiên tìm được, trả về thông tin các document đó(số lượng, id)

    console.log(updatedUser);
  } catch (error) {
    console.log(error);
  }
}
// updateOneUser(
//   { age: 30 },
//   { age: 22 },
// );

async function updateManyUser(filter, data) {
  try {
    const updatedUser = await User.updateMany(filter, data);

    // NOTE - findOneAndUpdate() sửa tất cả các document tìm được, trả về thông tin các document đó(số lượng, id)

    console.log(updatedUser);
  } catch (error) {
    console.log(error);
  }
}
// updateManyUser(
//   { age: 22 },
//   { age: 23 },
// );

// ANCHOR - Xoá

async function findOneAndDeleteUser(filter) {
  try {
    const deletedUser = await User.findOneAndDelete(filter);

    // NOTE - findOneAndDelete() chỉ xoá các document đầu tiên tìm được, trả về Object Document đó

    console.log(deletedUser);
  } catch (error) {
    console.log(error);
  }
}
// findOneAndDeleteUser(
//   { name: 'Thanh Tu' },
// );

async function deleteOneUser(filter) {
  try {
    const deletedUser = await User.deleteOne(filter);

    // NOTE - deleteOne() chỉ xoá các document đầu tiên tìm được, trả về thông tin các document bị xoá(số lượng)

    console.log(deletedUser);
  } catch (error) {
    console.log(error);
  }
}
// deleteOneUser(
//   { name: 'Thanh Tu' },
// );

async function deleteManyUser(filter) {
  try {
    const deletedUser = await User.deleteMany(filter);

    // NOTE - deleteOne() xoá tất cả các document tìm được, trả về thông tin các document bị xoá(số lượng)

    console.log(deletedUser);
  } catch (error) {
    console.log(error);
  }
}
// deleteManyUser(
//   { name: 'Thanh Tu' },
// );

// ANCHOR - Tìm

async function findUser(filter) {
  try {
    const result = await User.find(filter);
    // const result = await User.findOne(filter);

    // NOTE - find() trả về toàn bộ document nó tìm được, nếu không có thì trả về [] rỗng

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function findOneUser(filter) {
  try {
    const result = await User.findOne(filter);
    // const result = await User.findOne(filter);

    // NOTE - findOne() trả về document đầu tiên tìm được, nếu không có thì trả về null

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function findUserById(filter) {
  try {
    const result = await User.findById(filter);

    // NOTE - findById() trả về document tìm được, nếu không có thì trả về null

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
// findUser(
//   { age: 20 },
// );
// findOneUser(
//   { age: 20 },
// );
// findUserById('636884c2b9c25f030dc44d99');

// ANCHOR - Populate

const author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Duy Manh',
  age: 50,
});

// NOTE - Create 1 document cha liên kết khoá ngoại với 1 document con

function create(title) {
  author.save(async e => {
    if (e) console.log(e);
    const story1 = new Story({
      _id: new mongoose.Types.ObjectId(),
      title,
      author: author._id,
    });
    story1.save(er => {
      if (er) console.log(er);
    });
    // Trường stories của Person là mảng các _id Story, vì thế khi tạo mới 1 Story thì ta phải push vào
    author.stories.push(story1._id);
    author.save();
  });
}
// create('Kiep Do Den');

// NOTE - Populate() để tham chiếu đến Document khác, trả về Object đó

async function Populate() {
  const result = await Person.findOne({ name: 'Duy Manh' }).populate('stories');
  console.log(result);
}
// Populate();

// NOTE - Push document con vô 1 document cha

async function pushStory(idAuthor, title) {
  const story1 = await Story.create({
    _id: new mongoose.Types.ObjectId(),
    title,
    author: idAuthor,
  });
  const result = await Person.updateOne(
    { _id: idAuthor },
    { $push: { stories: story1 } },
  );
  console.log(result);
}
// pushStory('636a2c4d1e6befd044de3221', 'Nua Vang Trang');

// NOTE - Khi không có document nào được liên kết, populate sẽ trả về null, ở đây là array nên sẽ trả về rỗng

Person.deleteOne({ name: 'Someone' }).exec();
// Populate();

// NOTE - Select trường muốn lấy

async function select() {
  const result = await Story.findOne({ title: 'Truyen Kieu' }).populate('author');
  console.log(result.author.age);

  const result1 = await Person.findOne({ name: 'Nguyen Du' }).populate('stories');
  for (let i = 0; i < result1.stories.length; i += 1) {
    console.log(result1.stories[i].title);
  }
}
// select();

// NOTE - Populate nhiều nguồn

Person.findOne('Someone').populate('ref1').populate('ref2');
// Nếu ref1 và ref2 như nhau thì nó chỉ lấy ref2

// NOTE - Limit

async function limit() {
  const result = await Person.findOne({ name: 'Duy Manh' }).populate({
    path: 'stories',
    perDocumentLimit: 2,
  });
  console.log(result);
}
// limit();

// NOTE - Transform : Duyệt qua các phần tử trong path

async function findOne() {
  const a = await Person.findOne({ name: 'Duy Manh' }).populate({
    path: 'stories',
    // Duyệt qua từng phần tử, nếu có thì trả về title của object đó
    transform: doc => (doc == null ? null : doc.title),
  });
  console.log(a);
}
findOne();

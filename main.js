/* eslint-disable no-console */
const mongoose = require('mongoose');
const User = require('./User');

const { Schema } = mongoose;
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

// const newPerson = new Person({
//   _id: new mongoose.Types.ObjectId(),
//   name: 'NAME',
//   age: 23,
// });

// async function addPerson(_id, name, age) {
//   const addedUser = await Person.create({
//     _id,
//     name,
//     age,
//   });
//   console.log(addedUser);
// }
// async function addStory(author, title) {
//   const addedUser = await Story.create({
//     author,
//     title,
//   });
//   console.log(addedUser);
// }

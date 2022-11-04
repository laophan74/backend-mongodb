/* eslint-disable no-console */
const mongoose = require('mongoose');
const User = require('./User');

mongoose.connect('mongodb+srv://laophan74:01639914061@cluster.n9czek3.mongodb.net/?retryWrites=true&w=majority');

// NOTE - Thêm mới data

async function addUser(name, age, gender) {
  await User.create({
    name,
    age,
    gender,
  });
}

// addUser('Thanh Tu', 26, true);

// NOTE - Tìm kiếm rồi cập nhật data

async function updateUser(filter, data) {
  await User.findOneAndUpdate(filter, data, {
    new: true,
  });
}

// updateUser(
//   { name: 'Trong Thuy' },
//   { name: 'Da Cap nhat' },
// );

// NOTE - Tìm kiếm rồi xoá bản ghi

async function deleteUser(filter) {
  await User.findOneAndDelete(filter);
}

// deleteUser(
//   { name: 'Thanh Thuy' },
// );

// NOTE - Lấy data theo điều kiện

async function retrieveData(filter) {
  const result = await User.find(filter);
  console.log(result);
}

retrieveData(
  { name: 'Thuy Dung' },
);

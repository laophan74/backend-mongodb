/* eslint-disable no-console */
const mongoose = require('mongoose');
const University = require('./University');

mongoose.connect('mongodb+srv://laophan74:01639914061@cluster.n9czek3.mongodb.net/?retryWrites=true&w=majority');

async function Create() {
  const result = await University.insertMany([
    {
      country: 'Spain',
      city: 'Madrid',
      name: 'USAL',
      location: {
        type: 'Point',
        coordinates: [-5.6722512, 17, 40.9607792],
      },
      students: [
        { year: 2014, number: 24774 },
        { year: 2015, number: 23166 },
        { year: 2016, number: 21913 },
        { year: 2017, number: 21715 },
      ],
    },
    {
      country: 'Spain',
      city: 'Madrid',
      name: 'UPSA',
      location: {
        type: 'Point',
        coordinates: [-5.6691191, 17, 40.9631732],
      },
      students: [
        { year: 2014, number: 4788 },
        { year: 2015, number: 4821 },
        { year: 2016, number: 6550 },
        { year: 2017, number: 6125 },
      ],
    },
    {
      country: 'Germany',
      city: 'Berlin',
      name: 'BER1',
      location: {
        type: 'Point',
        coordinates: [-2.6692221, 33, 37.9333332],
      },
      students: [
        { year: 2014, number: 2345 },
        { year: 2015, number: 1231 },
        { year: 2016, number: 6343 },
        { year: 2017, number: 6333 },
      ],
    },
    {
      country: 'England',
      city: 'Liverpool',
      name: 'PHONX',
      location: {
        type: 'Point',
        coordinates: [3.6691191, 11, 22.9631111],
      },
      students: [
        { year: 2014, number: 4222 },
        { year: 2015, number: 4222 },
        { year: 2016, number: 6456 },
        { year: 2017, number: 1234 },
      ],
    },
  ]);
  console.log(result);
}
// Create();

// ANCHOR - $match: Xác định những document phù hợp với điều kiện

async function match() {
  const result = await University.aggregate([
    { $match: { country: 'Spain', city: 'Madrid' } },
  ]);
  console.log(result);
}
// match();

// ANCHOR - $project: Chỉ định các field cần thiết khi thực hiện truy vấn dựa vào input đầu vào

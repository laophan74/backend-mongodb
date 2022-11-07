const mongoose = require('mongoose');

const { Schema } = mongoose;

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

module.exports = { Story, Person };

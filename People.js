const mongoose = require('mongoose');

const { Schema } = mongoose;

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  // ref là một option để cho mongoose có thể hiểu là nó liên kết với model nào và ở đây là Story
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
});

const storySchema = Schema({
  _id: Schema.Types.ObjectId,
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

module.exports = { Story, Person };

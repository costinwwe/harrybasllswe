// src/models/textModel.js
const mongoose = require('mongoose');

const textSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: String,
      default: 'Anonymous',
    },
  },
  {
    timestamps: true,
  }
);

const Text = mongoose.model('Text', textSchema);

module.exports = Text;
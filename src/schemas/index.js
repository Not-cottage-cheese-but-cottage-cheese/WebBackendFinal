const mongoose = require("mongoose");

const { Schema } = mongoose;

const authorSchema = new Schema({
  name: String,
  avatar: String,
  email: String,
})

const attachSchema = new Schema({
  name: String,
    src: String,
    type: String
})

const mailSchema = new Schema({
  author: authorSchema,
  dateTime: String,
  text: String,
  title: String,
  newThread: Boolean,
  important: Boolean,
  flag: Boolean,
  confidence: Boolean,
  finance: Boolean,
  read: Boolean,
  attach: [attachSchema]
});

module.exports = mailSchema;

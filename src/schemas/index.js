const mongoose = require("mongoose");

const { Schema } = mongoose;

const mailSchema = new Schema({
  author: {
    name: String,
    avatar: String,
    email: String,
  },
  dateTime: String,
  text: String,
  title: String,
  newThread: Boolean,
  important: Boolean,
  flag: Boolean,
  confidence: Boolean,
  finance: Boolean,
  read: Boolean,
});

module.exports = mailSchema;

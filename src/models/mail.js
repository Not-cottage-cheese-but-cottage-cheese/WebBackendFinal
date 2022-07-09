const mongoose = require("mongoose");
const mailSchema = require("../schemas");

const Mail = mongoose.model("Mail", mailSchema);

module.exports = Mail;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    url: String,
    description: String
});
const Link = mongoose.model("links", LinkSchema);

module.exports = Link;
/**
 * Url model
 *
 */

var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  long_url: {
    type: String,
    required: true,
    index: {unique: true}
  },
  hash: {
    type: String,
    required: true,
    index: {unique: true}
  },
  password: {
    type: String
  },
  image_url: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model("Url", schema);

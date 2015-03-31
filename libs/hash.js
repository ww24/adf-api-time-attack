// hash.js

var crypto = require("crypto");

exports.createHash = function (url) {
  return crypto.createHash("sha1").update(url).digest("base64")
    .split("/").join("a")
    .split("+").join("b")
    .split("=").join("c")
    .slice(0, 8);
};

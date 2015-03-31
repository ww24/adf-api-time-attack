/**
 * API end point
 *
 */

var express = require("express");
var router = express.Router();
var validator = require("validator");
var models = require("../models");
var libs = require("../libs");
var config = require("config");

router.post("/shortenurl", function (req, res, next) {
  var long_url = req.body.LongUrl;
  var password = req.body.PassWord;
  var image_url = req.body.ImageUrl;

  if (! validator.isLength(long_url, 1)) {
    var err = new Error("Bad Request");
    err.status = 400;
    return next(err);
  }

  var hash = libs.hash.createHash(long_url);

  models.Url.findOneAndUpdate({
    hash: hash
  }, {
    hash: hash,
    long_url: long_url,
    password: password || null,
    image_url: image_url || null
  }, {
    upsert: true
  }).exec().then(function (url) {
    res.status(201).json({
      ShortUrl: "http://" + config.server.host + "/" + url.hash
    });
  }, function (err) {
    err.status = 500;
    console.error(err);
    return next(err);
  });
});

module.exports = router;

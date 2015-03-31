/**
 * Index router
 *
 */

var express = require("express");
var router = express.Router();

var libs = require("../libs");
var routes = libs.loader(__dirname);
var models = require("../models");

router.use("/api/v1", routes.api);

router.get("/:hash", function (req, res, next) {
  var password = req.query.PassWord;

  models.Url.findOne({
    hash: req.params.hash
  }).exec().then(function (url) {
    if (! url) {
      res.status(404).send("Not Found");
    }

    if (url.password) {
      if (! password) {
        if (! url.image_url) {
          return res.status(403).json({
            message: "You need a password."
          });
        }

        return res.status(403).render("image", {
          image_url: url.image_url
        });
      }

      if (url.password !== password) {
        return res.status(401).send("Unauthorized");
      }
    }

    res.set("Location", url.long_url);
    res.status(308).render("redirect", {
      long_url: url.long_url
    });
  }, function (err) {
    err.status = 500;
    next(err);
  });
});

// catch 404
router.use(function (req, res) {
  res.status(404).send("Not Found");
});

module.exports = router;

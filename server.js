/**
 * okusureminder
 *
 */

var express = require("express");
var bodyParser = require("body-parser");
var hogan = require("hogan-express");
var routes = require("./routes");
var config = require("config");
var path = require("path");

var app = express();

// express settings
app.disable("x-powered-by");
app.set("port", process.env.PORT || config.server.port);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", hogan);

// middleware
app.use(express.static(path.resolve(__dirname, "public")));
app.use(bodyParser.json());

// load routes
app.use(routes);

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: err
    });
  });
} else {
  process.on("uncaughtException", function (err) {
    console.error(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: null
  });
});

var server = app.listen(app.get("port"), function() {
  console.log("Express server listening on " + JSON.stringify(server.address()));
});

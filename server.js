//Packages / Modules
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");

var app = express();
var PORT = process.env.PORT || 3000;

//require sequelize models
var db = require("./models");


app.use(bodyParser.urlencoded({ extended: false }));

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Method Override
app.use(methodOverride("_method"));

//create static path
app.use(express.static(process.cwd() + "/public"));


require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Listening on port: " + PORT);
    });
});
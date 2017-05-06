//Packages / Modules
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");

var app = express();
var PORT = process.env.PORT || 3000;

var connection = require("./config/connection");

app.use(bodyParser.urlencoded({ extended: false }));

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Method Override
app.use(methodOverride("_method"));

//create static path
app.use(express.static(process.cwd() + "/public"));

var orm = require("./config/orm.js");

app.get("/", function (req, res) {

    //Arrays to store both menus
    var current = [];
    var retired = [];

    orm.select("menu", function (result) {

        //Loop through all results, separate current & retired
        for(var i = 0; i < result.length; i++){
            if(result[i].retired === 0){
                current.push(result[i]);
            }
            else {
                retired.push(result[i]);
            }
        }
        //display both menus
        res.render("index", {
            current: current,
            retired: retired
        });
    });

});

app.post("/", function (req, res) {
    orm.insert("menu", req.body.burgerName, function (result) {
        res.redirect("/");
    });
});

app.put("/:id", function (req, res) {
   orm.update("menu", req.params.id, function (result) {
       res.redirect("/");
   })
});

app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
});
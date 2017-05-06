//Packages / Modules
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");

var app = express();
var PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Method Override
app.use(methodOverride("_method"));

//create static path
app.use(express.static(process.cwd() + "/public"));


//require sequelize models
var db = require("./models");

var orm = require("./config/orm.js");

app.get("/", function (req, res) {

    //Arrays to store both menus
    var current = [];
    var retired = [];

    db.Burger.findAll({}).then(function (result) {

        //Loop through all results, separate current & retired
        for(var i = 0; i < result.length; i++){
            if(result[i].retired === false){
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
    })
});

app.post("/", function (req, res) {

    db.Burger.create({
        burger_name: req.body.burgerName
    }).then(function (result) {
        res.redirect("/");
    });
});

app.put("/:id", function (req, res) {

    db.Burger.update({
        retired: true
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.redirect("/");
    })
});

db.sequelize.sync({force: true}).then(function () {
    app.listen(PORT, function () {
        console.log("Listening on port: " + PORT);
    });
});
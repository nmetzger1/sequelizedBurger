var db = require("../models");

module.exports = function (app) {

    //returns both retired and current burgers
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

    //returns single burger name
    app.get("/:id", function (req, res) {

        console.log("ID", req.params.id);

        db.Burger.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            console.log(result);
            return res.json(result);
        })
    });

    app.post("/", function (req, res) {

        db.Burger.create({
            burger_name: req.body.burgerName,
            price: "6.79"
        }).then(function (result) {
            res.redirect("/");
        });
    });

    app.put("/:id/:sales", function (req, res) {

        console.log("bing.");

        db.Burger.update({
            retired: true
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (result) {

            var redirect = {
                redirect: "/"
            };

            return res.json(redirect);
        })
    });
};
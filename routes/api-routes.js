var db = require("../models");

module.exports = function (app) {

    //returns both retired and current burgers
    app.get("/", function (req, res) {

        //Arrays to store both menus
        var current = [];
        var retired = [];

        db.Burger.findAll({
            include: db.Sales
        }).then(function (result) {

            //Loop through all results, separate current & retired
            for(var i = 0; i < result.length; i++){
                if(result[i].retired === false){
                    current.push(result[i]);
                }
                else {

                    var retiredArray = {
                        burger_name: result[i].burger_name,
                        total_sales: result[i].price * result[i].Sales[0].units_sold
                    };

                    retired.push(retiredArray);
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

        db.Burger.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            console.log(result);
            return res.json(result);
        })
    });

    //adds burger to the table as current
    app.post("/", function (req, res) {

        var name = req.body.burgerName;
        var price = req.body.burgerPrice;

        if(name == "" || price == ""){
            return res.sendStatus(400, "Name or Price is empty.");
        }

        db.Burger.create({
            burger_name: name,
            price: price
        }).then(function (result) {
            res.redirect("/");
        });
    });

    //moves the burger to retired
    app.put("/:id/:sales", function (req, res) {

        console.log("bing.");

        db.Burger.update({
            retired: true
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (result) {

            db.Sales.create({
                units_sold: req.params.sales,
                BurgerId: req.params.id
            }).then(function (results) {

                var redirect = {
                    redirect: "/"
                };

                return res.json(redirect);
            })
        })
    });
};
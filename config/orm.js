var connection = require("./connection.js");

var orm = {
    select: function(table, cb){
        var query = "SELECT * FROM ??";
        debugger;
        connection.query(query, [table], function (err, result) {
            if(err){
                throw err;
            }

            cb(result);
        });
    },
    insert: function (table, burgerName, cb) {
        var insertStatement = "INSERT INTO ?? (burger_name, retired) VALUES (?,?)";

        connection.query(insertStatement, [table, burgerName, 0], function (err, result) {
            if(err){
                throw err;
            }

            cb(result);
        })
    },
    
    update: function (table, id, cb) {
        var updateStatement = "UPDATE ?? SET retired = 1 WHERE id = ?";

        connection.query(updateStatement, [table, id], function (err, result) {
            if(err){
                throw err;
            }

            cb(result);
        })
    }
};

module.exports = orm;
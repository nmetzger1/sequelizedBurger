module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {

        //column setup
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        retired: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        price: {
            type: DataTypes.DECIMAL(5,2),
            allowNull: false
        }

}, {
        //table join
        classMethods: {
            associate: function (models) {
                Burger.hasMany(models.Sales)
            }
        }
    });

    return Burger;
};
module.exports = function (sequelize, DataTypes) {
    var Sales = sequelize.define("Sales", {
        units_sold: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_sales: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    },{
        //join with burger table
        classMethods: {
            associate: function (models) {
                Sales.belongsTo(models.Burger, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Sales;
};
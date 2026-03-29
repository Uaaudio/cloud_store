const Connection = require("../database/connection");
const Sequelize = require("sequelize");

const Order = Connection.define("orders",{
    
    id:{
        primaryKey: true,
        type: Sequelize.INTEGER(),
        autoIncrement: true,
        allowNull: false,
    },
    products:{
        type: Sequelize.STRING(),
        allowNull: false,
        defaultValue: "Nenhum Produto Incluso."

    },
    totalValue:{
        type: Sequelize.FLOAT(),
        allowNull: false
    },
    status:{
        type: Sequelize.ENUM("PAGO","PENDENTE","CANCELADO"),
        allowNull:false,
        defaultValue: "PENDENTE"

    }

});


module.exports = Order;
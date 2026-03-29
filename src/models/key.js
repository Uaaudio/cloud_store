const Connection = require("../database/connection");
const Sequelize = require("sequelize");


const Key = Connection.define("keys",{

    id:{
        primaryKey: true,
        type: Sequelize.INTEGER(),
        autoIncrement: true,
        allowNull: false,
    },
    code:{
        type: Sequelize.STRING(),
        allowNull:false,
        defaultValue:"0000-0000-0000-0000"
    },
    status:{
        type: Sequelize.ENUM("VENDIDO","ESTOQUE"),
        allowNull:false,
        defaultValue: "ESTOQUE"
    }



});

module.exports = Key;
const Connection = require("../database/connection");
const Sequelize = require("sequelize");

// Meu modelo de usuário.

const User = Connection.define("users",{

    id:{
        primaryKey: true,
        type: Sequelize.INTEGER(),
        autoIncrement: true,
        allowNull: false,
    },
    name:{
        type: Sequelize.STRING(),
        allowNull:false,
        defaultValue : "Nada Informado"
    },
    email:{
        type: Sequelize.STRING(),
        allowNull:false,
        defaultValue: "Nada Informado",
        unique:true
    },
    password:{
        type: Sequelize.STRING(),
        allowNull:false,
        
    },
    role:{
        type: Sequelize.ENUM("CLIENTE","ADMIN","DEVELOPER"),
        allowNull:false,
        defaultValue: "CLIENTE"
    }

});


module.exports = User;



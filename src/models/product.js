const Connection = require("../database/connection");
const Sequelize = require("sequelize");


const Product = Connection.define ("products",{
     id:{
            primaryKey: true,
            type: Sequelize.INTEGER(),
            autoIncrement: true,
            allowNull: false,
        },
    name:{
            type: Sequelize.STRING(),
            allowNull:false,
            defaultValue : "Nada Informado",
            unique: true
        },
    price:{
        type: Sequelize.FLOAT(),
        allowNull: true,
        
    },
    stock:{
        type: Sequelize.INTEGER(),
        allowNull: true,
        
    },
    image:{
        type: Sequelize.STRING(),
        allowNull: false,
        defaultValue: "IMAGEM NÃO ENVIADA"
    }
});


module.exports = Product;
const Connection = require("../database/connection");
const Sequelize = require("sequelize");


const Category = Connection.define("categories",{

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
    slug:{ // Vou usar o slugify aqui , relaxa
            type: Sequelize.STRING(),
            allowNull:false,
            defaultValue : "Nada Informado",
            unique:true
        }

});


module.exports = Category;
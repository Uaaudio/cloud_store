const Connection = require("../database/connection");
const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product");
const Key = require("../models/key");
const Order = require("../models/order");

// Criando relacionamentos...
User.hasMany(Order);
Order.belongsTo(User);

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Key);
Key.belongsTo(Product);

// Altere alter para true temporariamente se você mudou a estrutura de algum Model
Connection.sync({ alter: true, force: false })
.then(()=>{
    console.log("Banco de dados sincronizado com sucesso!!");
})
.catch((error)=>{
    console.log("Falha ao sincronizar banco de dados");
    console.log(error);
});
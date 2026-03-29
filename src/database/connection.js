const Sequelize = require("sequelize");


const Connection = new Sequelize(process.env.DB,process.env.USER,process.env.PASSWORD,{

    dialect:"mysql",
    host: process.env.HOST,
    port: process.env.PORT

});

Connection.authenticate()
.then(()=>{
    console.log("Banco de dados conectado com sucesso!!");
}).catch((error)=>{
    console.log("Falha ao conectar o banco de dados");
    console.log(error);
});


module.exports = Connection;
const express = require("express");
const app = express();
const path = require("path");
const PORT = 3001;

//Chamando e config a env.
const dotenv = require("dotenv");
dotenv.config();

// 1. Onde estão os arquivos de LOGICA visual (.ejs)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src",'public', "views")); // Removi o /public do meio

// 2. Onde estão os arquivos ESTATICOS (CSS, Imagens, JS do navegador)
// O caminho correto conforme o seu print de pastas:
app.use(express.static(path.join(__dirname, "src", "public")));

//Body Parser.
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

// cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());


// Conexão com o banco de dados.
const Connection = require("./src/database/connection");
const tableSync = require("./src/middlewares/tableRelationships");

// importando rotas.
const adminRoutes = require("./src/routes/adminRoutes");
const userRoutes = require("./src/routes/userRoutes");
const mainRoutes = require("./src/routes/mainRoutes")

//rotas
app.use("/",mainRoutes);
app.use("/admin",adminRoutes);
app.use("/user",userRoutes);




app.listen(PORT,()=>{
    console.log(`Aplicação rodando na porta ${PORT}`);
});
const express = require("express");
const router = express.Router();




// Importando minhas funções.
const {loginPage} = require("../controllers/main/loginPage");
const {feedPage} = require("../controllers/main/feedPage");
const {registerPage} = require("../controllers/main/registerPage");

router.get("/login",loginPage);
router.get("/",feedPage);
router.get("/register",registerPage);

module.exports = router ; 
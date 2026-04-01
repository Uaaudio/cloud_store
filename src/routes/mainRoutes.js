const express = require("express");
const router = express.Router();




// Importando minhas funções.
const {loginPage} = require("../controllers/main/loginPage");
const {feedPage} = require("../controllers/main/feedPage");
const {registerPage} = require("../controllers/main/registerPage");
const {seeCategories} = require("../controllers/main/seeCategories");
const {seeProducts} = require("../controllers/main/seeProducts");
const {createCheckout} = require("../controllers/main/payment");

router.post("/checkout",createCheckout);
router.get("/login",loginPage);
router.get("/",feedPage);
router.get("/register",registerPage);
router.get("/categories",seeCategories);
router.get("/products/:Id",seeProducts);

module.exports = router ; 
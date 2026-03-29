const express = require("express");
const router = express.Router();


// importando minhas funções.
const {registerUser} = require("../controllers/user/registerUser");
const {userLogin} = require("../controllers/user/userLogin");

// rotas.
router.post("/create",registerUser);
router.post("/login",userLogin);




module.exports = router;


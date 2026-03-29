const express = require("express");
const router = express.Router();

// função para verificar se de fato é admin.
const {adminPass} = require("../middlewares/adminPass");


const  {upload} = require("../middlewares/multerConfig");


//minhas funções.
const {editUser}= require("../controllers/admin/editUser");
const {deleteUser} = require("../controllers/admin/deleteUser");
const { adminDashboard } = require("../controllers/admin/adminDashboard");
const {createCategory} = require("../controllers/admin/createCategory");
const {addProduct} = require("../controllers/admin/createProduct");
const {listCategories} = require("../controllers/admin/listCategories");
const {editCategory} = require("../controllers/admin/editCategory");


// Admin rotas.
router.put("/edit",editUser);
router.delete("/delete",deleteUser);
router.get("/dashboard",adminPass,adminDashboard);
router.post("/newcategory",createCategory);
router.post("/newproduct", upload.single('productImage'), addProduct);
router.get("/categories",listCategories);
router.post("/editcategory",editCategory);


module.exports = router;


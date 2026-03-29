const Category = require("../../models/category");

async function listCategories(req,res){

    try{

        const categories = await Category.findAll();

        if(categories){
            return res.render("categories",{categories});
        };
        
    }catch{
        console.log("Erro ao listar as categorias");
        return res.redirect("/admin/dashboard");
    }



};

module.exports = {listCategories};
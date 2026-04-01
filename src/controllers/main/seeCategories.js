const Category = require("../../models/category");

async function seeCategories(req,res){

    try{

        const categories = await Category.findAll();

        if(categories){
            return res.render("seecategories",{categories});
        };
        
    }catch{
        console.log("Erro ao listar as categorias");
        return res.redirect(req.get("referer"));
    }


};

module.exports = {seeCategories};
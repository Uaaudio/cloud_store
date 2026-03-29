const Category = require("../../models/category");


async function editCategory(req,res){
    try{
        const categoryName = req.body.categoryName;
        const categoryId = req.body.categoryId;
        
        if (categoryName){
            await Category.update({
                name:categoryName
            },{
                where:{
                    id:categoryId
                }
            });

            return res.redirect("/admin/categories");
        };

    }catch{
        console.log("falha ao editar categoria");
        return res.redirect("/admin/dashboard");

    }
};

module.exports = {editCategory};
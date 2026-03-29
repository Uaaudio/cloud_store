const Category = require("../../models/category");
const slugify = require("slugify");

async function createCategory(req,res){


    try{
        const name = req.body.categoryName;
        
        if (name){

            const slugName = slugify(name,'-');

            try{

                await Category.create({
                    name:name,
                    slug: slugName
                });

                return res.redirect(req.get('referer'));
            }catch{
                console.log("Falha ao criar categoria no banco de dados.");
                return res.redirect("/admin/dashboard");
            }
        }


    }catch{
        console.log("Falha ao criar categoria.");
        return res.redirect("/admin/dashboard");
    }




};

module.exports = {createCategory};
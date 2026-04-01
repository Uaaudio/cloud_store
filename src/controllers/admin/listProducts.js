const Product = require("../../models/product"); // model dos produtos.

// função para listar os produtos de uma categoria;
async function listProducts(req,res){

    try{
        
        // vai tentar coletar o id  da categoria direto do paramentro se não conseguir ele recebe null ;
        const categoryId = req.params.Id ? req.params.Id : null ;  

        if (categoryId){
            
            try{
                
                const products = await Product.findAll({where:{categoryId:categoryId}});
                const productsData = products ? products : null;

                return res.render("products",{productsData});
            }catch{

                console.log("Falha na consulta.");
                return res.redirect("/admin/categories");

            };
        };

        console.log("Id inválido.");
        return res.redirect("/admin/categories");

    }catch{

        console.log("Falha ao receber paramentro ID da categoria");
        return res.redirect("/admin/categories");

    };
};


module.exports = {listProducts};
const { where } = require("sequelize");
const Product = require("../../models/product");


async function editProduct(req,res){


    try{

        const productId = req.body.productId;
        const productName = req.body.productName;
        const productPrice = req.body.productPrice;
        const productStock = req.body.productStock;

        const allData = (productId && productName && productPrice  && productStock) ? true : false ;

        if(allData){

            const product = await Product.update({
                name: productName,
                price: productPrice,
                stock: productStock,

            },{
                where:{
                    id:productId
                }});

            
            return res.redirect(req.get("referer"));
            
        };
    

    }catch{

        console.log("Falha ao atualizar produto. (Campos em branco)");
        return res.redirect(req.get("referer"))

    };





};

module.exports = {editProduct};

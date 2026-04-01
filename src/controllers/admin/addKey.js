const Key = require("../../models/key"); // Minha model de keys.
const Product = require("../../models/product"); // Minha models de produtos.

// função responsável por adicionar as Keys nos produtos.
async function addKey(req,res) {
    
    try{

        const code = req.body.keyCode ; // input do front que vai receber o código da Key;
        const product = req.body.productId ; // input do front que vai receber o produto a qual a key pertence;
        
        if(code && product){
            try{
                const newKey = await Key.create({
                    code:code,
                    productId: product,
                    status: 'ESTOQUE'
                });

                // 1. Primeiro buscamos o produto (use o Model em Maiúsculo)
                const produtoEncontrado = await Product.findOne({ where: { id: product } });

                if (produtoEncontrado) {
                    // 2. Atualizamos o estoque incrementando 1
                    await Product.update(
                        { stock: produtoEncontrado.stock + 1 }, 
                        { where: { id: product } }
                    );
                    };

                console.log("Key registrada com Sucesso!!");
                return res.redirect(req.get("referer")); // recarrega a página.

            }catch{
                console.log("Falha ao registrar Key.(Problema no create)"); // log de error.
                return res.redirect(req.get("referer")); // recarrega a página
            };
            
        };

    }catch{
        console.log("Falha ao registrar a Key.(Campos em branco)"); // log de error.
        return res.redirect(req.get("referer")); // recarrega a página

    };

};

module.exports = {addKey};
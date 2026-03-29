const Product = require("../../models/product");

async function addProduct(req, res) {

    try {
        const product = req.body.productName;
        const price = req.body.productPrice;
        const stock = req.body.productStock;
        const category = req.body.productCategory;

        // 4. PEGAR O NOME DA IMAGEM (O Multer coloca os dados em req.file)
        // Se o cara não mandou foto, ele usa uma string vazia ou padrão
        const image = req.file ? req.file.filename : "";

        if (product && price) {

            try {
                const newProduct = await Product.create({
                    name: product,
                    price: price,
                    stock: stock,
                    categoryId: category,
                    image: image // 5. SALVAR O NOME DA IMAGEM NO BANCO
                });

                return res.redirect(req.get('referer'));
            } catch (err) {
                console.log("Falha ao registrar produto no banco.");
                return res.status(500).send("Problema no create.");
            }

        } else {
            console.log("Falha ao registrar produto: Nome ou Preço faltando.");
            return res.status(500).send("Preencha o campo nome e preço.");
        };

    } catch (err) {
        console.log("Falha ao registrar produto (Erro no try externo)");
        return res.status(500).send("Falha ao registrar produto.");
    };

};

module.exports = { addProduct };
const Product = require("../../models/product");
const jwt = require("jsonwebtoken");

async function feedPage(req, res, next) {
    try {
        const products = await Product.findAll();

        // Obtendo o cargo do usuário manualmente para o template
        // sem disparar os redirecionamentos do middleware
        let role = null;
        const token = req.cookies.token;

        if (token) {
            try {
                const data = jwt.verify(token, process.env.SECRET);
                role = data.role;
            } catch (err) {
                // Token inválido ou expirado, mantemos role como null
            }
        }

        if (products) {
            return res.render("feed", { products, role });
        } else {
            return res.status(404).send("Falha ao carregar o feed");
        }
    } catch (err) {
        return res.status(500).send("Falha ao carregar o feed");
    }
}

module.exports = { feedPage };
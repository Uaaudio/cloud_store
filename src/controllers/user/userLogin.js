const User = require("../../models/user");
const bcrypt = require("bcrypt");
// Importando sua função de gerar a string do token
const { loginToken } = require("../../middlewares/loginToken");

async function userLogin(req, res) {
    try {
        const { email, password } = req.body;

        // 1. Verifica se os campos foram preenchidos
        if (!email || !password) {
            return res.status(400).send("Dados incompletos, preencha novamente");
        }

        // 2. Busca o usuário no banco
        const Usuario = await User.findOne({ where: { email: email } });

        if (!Usuario) {
            return res.status(404).send("Usuário não existe.");
        }

        // 3. Compara a senha com o Hash do banco
        const matchPassword = await bcrypt.compare(password, Usuario.password);

        if (matchPassword) {
            // --- O QUE ESTAVA FALTANDO: ---
            // Gerar o token de fato chamando sua função
            const token = await loginToken(Usuario);

            // 4. Salva no Cookie do navegador
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000, // 24h
                secure: false, // Mude para true se usar HTTPS (produção).
                sameSite: 'lax'
            });

            // 5. Redireciona para o Dashboard
            return res.redirect("/");

        } else {
            return res.status(401).send("Senha incorreta, tente novamente.");
        }

    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).send("Erro interno no servidor.");
    }
};

module.exports = { userLogin };
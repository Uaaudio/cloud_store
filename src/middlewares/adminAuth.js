const jwt = require("jsonwebtoken");

async function adminAuth(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.redirect("/");
        }

        const data = jwt.verify(token, process.env.SECRET);
        const isAuth = (data.role === "ADMIN" || data.role === "DEVELOPER");

        if (isAuth) {
            return next();
        }
        return res.redirect("/");
    } catch (err) {
        console.error("Falha ao consultar token:", err.message);
        return res.redirect("/");
    }
}

module.exports = { adminAuth };
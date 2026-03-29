
async function registerPage(req,res) {
    
    try{
        return res.render("register");
    }catch{
        return res.status(500).send("Erro ao carregar página de registro");
    }
};

module.exports = {registerPage};

async function loginPage(req,res){

    try{
        return res.status(200).render("login");

    }catch{
        return res.status(500).send("Falha ao rederizar página");
    };

};


module.exports = {loginPage};
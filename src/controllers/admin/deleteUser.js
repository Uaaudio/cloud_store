const User = require("../../models/user");


async function deleteUser(req,res){

    try{
        
        const Id= req.body.profileId;

        await User.destroy({where:{id:Id}});
        
        return res.status(200).send(`Usuario Deletado com sucesso!`);


    }catch{
        console.log("Falha ao deletar usuário");
        return res.status(500).send("Falha ao deletar usuário"); //res.redirect("/admin")
    };
    
    
};


module.exports = {deleteUser};
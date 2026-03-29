
const User = require("../../models/user");
const bcrypt = require("bcrypt");

async function editUser(req,res) {
    
    try{

        const Id = req.body.profileId;
        const name = req.body.editName;
        const password = req.body.editPass;
        const email = req.body.editEmail;
        const role = req.body.editRole;

        const Usuario = Id ? await User.findOne({where:{id:Id}}) : null ;
        
        if(password){
        }else{
            console.log("Campo senha está vazio, favor verificar.");
            return res.status(500).send();
        };
            
        if(Usuario){
            
            // Verificações super super precisas...
            const newName = name ? name : Usuario.name;
            const newEmail = email ? email : Usuario.email;
            const newRole = role ? role : Usuario.role;
            const newPassword = password ? password : Usuario.password;

            //Novo hash de senha.
            const hashPassword = await bcrypt.hash(newPassword,15);

            //Atualizando o Usuário.
            await User.update(
                {
                    name: newName,
                    email:newEmail,
                    password:hashPassword,
                    role:newRole
                },
                {where:{id:Usuario.id}}
            
            );

            //Log para verificação.
            console.log("Usuario Atualizado com sucesso!");

            return res.status(200).send("Usuário Atualizado com sucesso!"); // retorno vazio(Vai retornar a pagina do adm)
            
        }else{
            console.log("Não foi possivel atualizar o usuário");
            return res.status(500).send(); // Novamente vazio e vai pro adm tbm.
        }
    }catch{
        console.log("Dados Incompletos, confira por gentileza");
        return res.status(500).send();

    };


};


module.exports = {editUser};
const User = require("../../models/user");
const bcrypt = require("bcrypt");

//BY UAUDIO

//função para gerar o token.
const {loginToken} = require("../../middlewares/loginToken");
const { where } = require("sequelize");

async function registerUser(req,res){

    try{

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if(password){
                
        }else{
            console.log("Falha ao criar usuário.");
            return res.status(500).send("Informações em branco");
        };

        const uniqueEmail = await User.findOne({where:{email:email}});
        
        if(uniqueEmail){
            return res.status(500).send("Usuário ja cadastrado");
        };


        try{

            //hash antes de salvar.
            const hashPassword = await bcrypt.hash(password,15); 
            
            const newUser = await User.create({
                name:name,
                email:email,
                password:hashPassword
            });

            if(newUser){
                const Usuario = await User.findOne({where:{email:email}});
               
                if(Usuario){
                    
                    const token = await loginToken(Usuario);

                    res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 1 * 60 * 60 * 1000, // 24h
                    secure: false, // Mude para true se usar HTTPS (produção)
                    sameSite: 'lax'
                    });

                    return res.redirect("/");
                };

            }else{
                return res.status(500).send("Falha ao cadastrar usuario.");
            };

        }catch{

            console.log("Falha ao criar usuário.");
            return res.status(302).redirect("/login");

        };

    }catch{

        console.log("Falha ao criar usuário.");
        return res.status(500).send("Informações em branco");

    };

};

module.exports = {registerUser};
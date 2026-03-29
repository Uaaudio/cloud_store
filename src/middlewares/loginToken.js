const jwt = require("jsonwebtoken");


async function loginToken(usuario) {
    
    const secret = process.env.SECRET ;
    
    const userData = {
        id: usuario.id,
        name: usuario.name,
        role: usuario.role,
    }


    const token = jwt.sign(userData,secret,{expiresIn: "24h"});

    return token;



};


module.exports = {loginToken};
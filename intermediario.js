
const { consultorio } = require('./bancodedados');
const dadosGerais = consultorio

//`GET` `/consultas?cnes_consultorio=1001&senha_consultorio=CubosHealth@2022`
const validarSenha = (req, res, next) => {
    const { cnes_consultorio , senha_consultorio } = req.query;

    if (cnes_consultorio !== dadosGerais.cnes || senha_consultorio !== dadosGerais.senha){
        return res.status(401).send({ mensagem: "Cnes ou senha inválidos!"});
    }

    next();
}



module.exports = 
{ 
    validarSenha
};
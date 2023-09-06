const express = require("express");
const { validarSenha }= require('./intermediario');//importando a senha de segurança do banco.


//invocando o express para usar essa constante com os verbos
const rotas = express();//invocando express para o arquivo de rotas

//importando as rotas da pasta controladores
const { listarConsultas, criarConsulta, atualizarConsulta, deletarConsulta, finalizarConsulta,
        consultarLaudo, listarConsultasPorMedico } =  require("./controladores/clientesControlador");
   

//listando as rotas e verbos: get, post, put, delete 
rotas.get('/consultas', validarSenha, listarConsultas );
rotas.post('/consultas', criarConsulta);
rotas.put('/consultas/:identificadorConsulta', atualizarConsulta);
rotas.delete('/consultas/:identificadorConsulta', deletarConsulta);
rotas.post('/consultas/:identificadorConsulta', finalizarConsulta);
rotas.get('/consulta/laudo', consultarLaudo);
rotas.get('/consultas/medico', listarConsultasPorMedico);


module.exports = rotas
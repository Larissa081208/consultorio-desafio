
const dados = require('../bancodedados');

//identificado único da consulta
let id = 1;//
let idLaudo = 1;



//Endpoint 1 - Listar consultas médicas
const listarConsultas = (req, res) => {

    return res.status(200).send(dados.consultas) 
    
};







// Endpoint 2 - Criar Consulta médica
const criarConsulta = (req, res) => {
    const { tipoConsulta, valorConsulta , paciente : {nome, cpf, dataNascimento, celular, email, senha} } = req.body;
    // informações passadas na requisição body

    //verificar se valor da consulta é um número
   function valorConsultaNumero(valor){
        return !isNaN(parseFloat(valor)) && isFinite(valor);
   }

    //verificar se já existe uma consulta em andamento com e-mail ou cpf informado.
    function cpfEmailExistente(cpf, email){
        return dados.consultas.some(consulta => consulta.paciente.cpf === cpf || consulta.paciente.email === email)
    }

     //verificar se existe médico para o tipo de consulta informado
   function vincularMedico(tipoConsulta){
      const medico = dados.consultorio.medicos.find(medico => medico.especialidade.includes(tipoConsulta))
       return medico? medico.identificador: null; 
    }


    //não permitir criar um consulta com especialidade que não está na base
    function tipoConsultaInformadaExiste(tipoConsulta){
        return dados.consultorio.medicos.some (medico => medico.especialidade === tipoConsulta);
    }

    //verificar se todas as propriedades de paciente estão sendo informadas
    if (!tipoConsulta){
        return res.status(400).send({ mensagem: "Tipo de consulta é obrigatório"});
    }

    if (!valorConsultaNumero(valorConsulta)){
        return res.status(400).send({ mensagem: "Valor da consulta deve ser um número válido"});
    }

    if (!tipoConsultaInformadaExiste(tipoConsulta)){
        return res.status(400).send({ mensagem: "O tipo de consulta informada não consta nas especialidades dos médicos na base"});
    }

    if (!nome){
        return res.status(400).send({ mensagem: "O nome é obrigatório"});
    }

    if (!cpf){
        return res.status(400).send({ mensagem: "CPF é obrigatório"});
    }

    if (!dataNascimento){
        return res.status(400).send({ mensagem: "Data de nascimento é obrigatório"});
    }
    if (!celular){
        return res.status(400).send({ mensagem: "Celular é obrigatório"});
    }
    if (!senha){
        return res.status(400).send({ mensagem: "Senha é obrigatório"});
    }

    //nãp permitir criar consulta com cpf ou email já informados antes
    if (cpfEmailExistente(cpf, email)){
        return res.status(400).send({ mensagem: "Já existe uma consulta em andamento com esse cpf ou email."})
    }

    const identificadorMedico = vincularMedico(tipoConsulta);
    if (!identificadorMedico){
        return res.status(400).send({ mensagem: "Não encontrado médico para esta especialidade"})
    }


    //armazernar em um objeto temporariamente 
    const novaConsulta = {
          identificador:(id),
          tipoConsulta,
          valorConsulta,
          identificadorMedico,
          finalizada: false,
          paciente: {nome, cpf, dataNascimento, celular, email, senha}

    }


    id ++;
    dados.consultas.push(novaConsulta);//empurrar para o array de consultas
    return res.status(201).send({ mensagem: "Consulta agendada!"}); 
    
};





// Endpoint 3 - atualizar consulta médica
const atualizarConsulta = (req, res) => {
    const identificadorConsulta = parseInt(req.params.identificadorConsulta, 10);
    const { nome, cpf, dataNascimento, celular, email, senha } = req.body;
    // informações passadas na requisição
    
    function identificadorConsultaNumero(identificadorConsulta){
        return !isNaN(parseFloat(identificadorConsulta)) && isFinite(identificadorConsulta);
   }

    if (isNaN(identificadorConsulta) || !identificadorConsultaNumero(identificadorConsulta)){
        return res.status(400).send({ mensagem: "Identificador não é um número válido."})
    }

    const consultaInformada = dados.consultas.find(consulta => consulta.identificador === identificadorConsulta )
    //verificar se o identificador corresponde a uma consulta

   
    if (!consultaInformada){
        return res.status(400).send({ mensagem: "Consulta não encontrada!"})
    }

    if (consultaInformada.finalizada !== false){
        return res.status(400).send({ mensagem: "Consulta finalizada nao pode ser atualizada!"})
    }


    function cpfEmailExistente(cpf, email) {
        return dados.consultas.some(consulta => consulta.paciente.cpf === cpf || consulta.paciente.email === email)

    }
    
    if (!nome){
        return res.status(400).send({ mensagem: "O nome é obrigatório"});
    }

    if (!cpf){
        return res.status(400).send({ mensagem: "CPF é obrigatório"});
    }

    if (!dataNascimento){
        return res.status(400).send({ mensagem: "Data de nascimento é obrigatório"});
    }
    if (!celular){
        return res.status(400).send({ mensagem: "Celular é obrigatório"});
    }
    if (!senha){
        return res.status(400).send({ mensagem: "Senha é obrigatório"});
    }


    //nao permitir atualizar consulta com mesmo cpf ou email já informados antes
    if (cpfEmailExistente(cpf, email) && consultaInformada.paciente.cpf === cpf || consultaInformada.paciente.email === email){
        return res.status(400).send({ mensagem: "cpf e email já existe no banco de dados."})

    }   
    
    //verificar se a consulta corresponde a solicitada e verificar se não está finalizada
    const statusConsulta = dados.consultas.some(consulta => consulta.paciente.cpf === cpf || consulta.paciente.email === email && 
    !consulta.finalizada);
   
    if (statusConsulta){
        return res.status(400).send({ mensagem: "Esta consulta está finalizada."})
    }

    //Caso a consulta ainda esteja em andamento
    consultaInformada.paciente = { nome, cpf, dataNascimento, celular, email, senha }

    return res.status(201).send({ mensagem: "Consulta atualizada!"}); 
    
};






//endpoint 4 - deletar uma conulta
const deletarConsulta = (req, res) => {
    const identificadorConsulta = parseInt(req.params.identificadorConsulta, 10);

    function identificadorConsultaNumero(identificadorConsulta){
        return !isNaN(parseFloat(identificadorConsulta)) && isFinite(identificadorConsulta);
    }

    if (isNaN(identificadorConsulta) || !identificadorConsultaNumero(identificadorConsulta)){
        return res.status(400).send({ mensagem: "Identificador não é um número válido."})
    }

    const buscarPorIndice = dados.consultas.findIndex(consulta => consulta.identificador === identificadorConsulta)
    if (buscarPorIndice !== -1){
        if(dados.consultas[buscarPorIndice].finalizada === true){
        return res.status(400).send({ mensagem: "consulta já foi finalizada, n pode ser excluída."})
        }
    


    dados.consultas.splice(buscarPorIndice, 1);
    return res.status(200).send({ mensagem: "consulta cancelada."});

    } else{

        return res.status(400).send({ mensagem: "consulta não encontrada."})
   }

}


//Endpoint 5 - Finalizar uma consulta

const finalizarConsulta = (req, res) => {
    const { identificadorConsulta, textoMedico } = req.body;

   if (!identificadorConsulta || !textoMedico){
    return res.status(400).send({ mensagem: "Identificador e laudo médico são obrigatórios!"})

   }

    //encontrar a consulta no array
    const consultaInformada = dados.consultas.find(consulta => consulta.identificador == identificadorConsulta);
    
    if (!consultaInformada){
        return res.status(400).send({ mensagem: "Consulta não encontrada!"});
    }

    if (consultaInformada.finalizada !== false){
        return res.status(400).send({ mensagem: "Consulta já foi finalizada!"});
    }

    if (textoMedico.length > 0 && textoMedico <= 200 ){
        return res.status(400).send({ mensagem: "texto médico deve ter entre 1 e 200 caracteres."})

    }


    consultaInformada.finalizada = true;

    const laudo = {
        identificador : (idLaudo),
        identificadorConsulta:(consultaInformada.identificador),
        identificadorMedico:(consultaInformada.identificadorMedico),
        texto : textoMedico,
        paciente: (consultaInformada.paciente)
    };
    dados.laudos.push(laudo);//empurrar para o array de laudo
    idLaudo ++
      
    
  
  const consultaFinalizada = {
    identificador: (consultaInformada.identificador),
    tipoConsulta: (consultaInformada.tipoConsulta),
    identificadorMedico: (consultaInformada.identificadorMedico),
    finalizada: (consultaInformada.finalizada),
    identificadorLaudo:(laudo.identificador),
    valorConsulta:(consultaInformada.valorConsulta),
    paciente:(consultaInformada.paciente)

  }

  dados.consultasFinalizadas.push(consultaFinalizada);//empurrar para o array  
  return res.status(200).send({ mensagem: "Consulta finalizada!"})
 


};




const consultarLaudo = (req, res) => {
   const { identificador_Consulta, senha} = req.query;


  if (!identificador_Consulta || !senha){
    return res.status(400).send({ mensagem: "Consulta finalizada!"});
  }


  const consultaInformada = dados.consultas.find(consulta => consulta.identificador == identificador_Consulta);
    
    if (!consultaInformada){
        return res.status(400).send({ mensagem: "Consulta não encontrada!"});
    }

    if (consultaInformada.paciente.senha !== senha){
        return res.status(400).send({ mensagem: "senha inválida!"});
    }


    const obterLaudo = dados.laudos.find(laudo => laudo.identificadorConsulta === consultaInformada.identificador);

    if (!obterLaudo){
        return res.status(400).send({ mensagem: "Laudo não disponível para esta consulta!"});

    }

    const resposta = {
        identificador: (obterLaudo.identificador),
        identificadorConsulta: (consultaInformada.tipoConsulta),
        identificadorMedico: (consultaInformada.identificadorMedico),
        textoMedico:(obterLaudo.texto),
        paciente:(consultaInformada.paciente)
    }

    return res.status(200).send(resposta);



};

const listarConsultasPorMedico = (req, res) => {
    const identificador_medico = parseInt(req.query.identificador_medico, 10);

   
   if (!identificador_medico){
    return res.status(400).send({ mensagem: "Identicador médico é obrigatório!"});
   }

   const obterMedico = dados.consultorio.medicos.find((medico) => medico.identificador === parseInt(identificador_medico));
 
   if (!obterMedico){
    return res.status(400).send({ mensagem: "O médico informado não existe na base!"});

   }

   const consultasVinculadasMedico = dados.consultas.filter((consultas) => consultas.identificadorMedico === parseInt(identificador_medico) &&
   dados.consultasFinalizadas)
    
   return res.status(200).send(consultasVinculadasMedico);

}




module.exports = {
    listarConsultas,
    criarConsulta,
    atualizarConsulta,
    deletarConsulta,
    finalizarConsulta,
    consultarLaudo,
    listarConsultasPorMedico
}

![](src/transferir.png)

# API - CONSULTÓRIO MÉDICO

### 1 - Finalidade do projeto:

- 🎯 Este projeto consistiu em criar uma RESTful API para um consultório médico como objetivo do desafio alternativo do curso de Desenvolvimento de Software com foco em Back end, pela Cubos Academy. 

- 👷🏾‍♀️Para a construção utilizei linguagem javaScript, framework Node.js.

- Papel enquanto desenvolvedora foi construir uma API RESTful que permitisse: 
  - Criar consulta médica
  - Listar consultas médicas
  - Atualizar os dados de uma consulta
  - Excluir uma consulta médica
  - Finalizar uma consulta médica
  - Listar o laudo de uma consulta
  - Listar as consultas que um médico atendeu


- Esse projeto possui como requisitos obrigatórios:
  - Padrão REST
  - O código está organizado seguindo a estrutura:
    - index/ (arquivo principal para rodar o servidor)
    - Pasta Controladores/controladoresCliente(Todos endpoints criados)
    - Intermediário (Função de validar a senha do consultório)
    - bancodedados.js(fornecido pela Cubos
    - rotas.js
    
- Observações:
    - Qualquer valor (dinheiro) está sendo representado em centavos (Ex.: R$ 10,00 reais = 1000).
    - o armazenamento está sendo feito em memória, ou seja, a persistência está sendo realizada no arquivo bancodedados.js .


---
### 2 - Detalhamento das funcionalidades do projeto:
- #### Endpoint 1 - Criar consulta médica
   - url: POST - http://localhost:8000/consultas

      - agendamento de uma consulta
      ![ROTA CRIAR CONSULTA](image-1.png)


      


- #### Endpoint 2 - Listar consultas médicas
   - url: GET - http://localhost:8000/consultas?cnes_consultorio=1001&senha_consultorio=CubosHealth@2022

     - listando duas consultas agendadas (paciente e especialidades diferentes)
     ![Alt text](image-2.png)

- #### Endpoint 3 - Atualizar os dados de uma consulta
  - url: PUT - http://localhost:8000/consultas/1

     - atualizando dados da consulta da paciente 1
     ![Alt text](image-3.png)

- #### Endpoint 3 - Excluir uma consulta médica
  - Url: DELETE - http://localhost:8000/consultas/1
     - consulta da paciente 1 sendo cancelada
     ![Alt text](image-4.png)

- #### Endpoint 4 - Finalizar uma consulta médica
  - Url: POST - http://localhost:8000/consultas/1

     - consulta da paciente 2 finalizada após laudo médico
     ![Alt text](image-5.png)



- #### Endpoint 5 - Listar o laudo de uma consulta
  - Url: GET - http://localhost:8000/consulta/laudo

     - laudo da consulta da paciente 2
     ![Alt text](image-6.png)

- ####  Endpoint 6 - Listar as consultas que um médico atendeu
  - url: GET - http://localhost:8000/consultas/medico

     - consultas que o médico atendeu 
      ![Alt text](image-7.png)



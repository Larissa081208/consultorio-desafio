![image](https://github.com/Larissa081208/consultorio-desafio/assets/138145047/3e4ca11a-05c2-43e8-a364-6247152fd804)

# API - CONSULTÓRIO MÉDICO

## 1 - Finalidade do projeto:

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
## 2 - Detalhamento das funcionalidades do projeto:
- ### Endpoint 1 - Criar consulta médica
   - url: POST - http://localhost:8000/consultas

      - agendamento de uma consulta
      - 
        ![image](https://github.com/Larissa081208/consultorio-desafio/assets/138145047/fe1f8836-da46-4716-8962-1650cb7d41b7) 

- ### Endpoint 2 - Listar consultas médicas
   - url: GET - http://localhost:8000/consultas?cnes_consultorio=1001&senha_consultorio=CubosHealth@2022

       - listando duas consultas agendadas (paciente e especialidades diferentes)
       ![image](https://github.com/Larissa081208/consultorio-desafio/assets/138145047/c3d85375-4fbe-4e1b-876b-1a2bbb8fe4ee)

- ### Endpoint 3 - Atualizar os dados de uma consulta
  - url: PUT - http://localhost:8000/consultas/1

     - atualizando dados da consulta da paciente 1
     ![image](https://github.com/Larissa081208/consultorio-desafio/assets/138145047/f6e482ea-74ea-4138-a1d9-902b7a2c4a2c)

- ### Endpoint 4 - Excluir uma consulta médica
  - Url: DELETE - http://localhost:8000/consultas/1
     - consulta da paciente 1 sendo cancelada
     ![image](https://github.com/Larissa081208/consultorio-desafio/assets/138145047/ef0ef108-5343-403c-b32c-f54b20547fac)

- ### Endpoint 5 - Finalizar uma consulta médica
  - Url: POST - http://localhost:8000/consultas/1

     - consulta da paciente 2 finalizada após laudo médico
      ![image](https://github.com/Larissa081208/consultorio-desafio/assets/138145047/89789691-db17-474a-92bb-ae175f0a9fcb)




- ### Endpoint 5 - Listar o laudo de uma consulta
  - Url: GET - http://localhost:8000/consulta/laudo

     - laudo da consulta da paciente 2
      ![image](https://github.com/Larissa081208/consultorio-desafio/assets/138145047/c0f59866-9e0f-4f76-88dd-311b378f9ffa)


- ###  Endpoint 6 - Listar as consultas que um médico atendeu
  - url: GET - http://localhost:8000/consultas/medico

     - consultas que o médico atendeu 
       ![image](https://github.com/Larissa081208/consultorio-desafio/assets/138145047/a8d74486-6c2f-4e01-a445-c7b58cf9d752)




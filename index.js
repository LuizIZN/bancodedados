"use strict";

const gerarMatricula = () => {
  let matricula = "";

  for (let i = 0; i < 7; i++) {
    matricula += String(Math.floor(Math.random()*10));
  }

  return matricula;
}

const schemas = require('./schemas.js');
const mongoose = require('mongoose');
const express = require('express');
const postgre = require('pg');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function connect() {
  const ec2ip = '34.207.236.122';
  const url = `mongodb://admin:admin@${ec2ip}:27017/museu`;

  try {
    // Conectar ao MongoDB
    await mongoose.connect(url);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
  }
}

connect();

/* Rotas de página */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create.html'));
})

app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

/* Rotas de API */
app.get("/api/gerentes", async (req, res) => {
  try {
      const gerentes = await schemas.Funcionario.find({ tipoFuncionario: "gerente" });
      res.json(gerentes);
  } catch (err) {
      res.status(500).json({ error: "Erro ao buscar gerentes" });
  }
});

app.get("/api/diretores", async (req, res) => {
  try {
      const diretores = await schemas.Funcionario.find({ tipoFuncionario: "diretor" });
      res.json(diretores);
  } catch (err) {
      res.status(500).json({ error: "Erro ao buscar diretores" });
  }
});

app.get('/api/itens', async (req, res) => {
  try {
    const itens = await schemas.Item.find();
    res.json(itens);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar itens');
  }
});

app.get('/api/search', async (req, res) => {
  const { collection } = req.query;

  if (!collection) return res.status(400).json({ message: 'Parâmetros inválidos' });

  try {
      let Model;

      if (collection === 'itens') {
          Model = schemas.Item;
      } else if (collection === 'funcionarios') {
          Model = schemas.Funcionario;
      } else if (collection === 'exposicoes') {
          Model = schemas.Exposicao;
      } else {
          return res.status(400).json({ message: 'Coleção desconhecida' });
      }

      const resultados = await Model.find({
          // $text: { $search: busca }
      });

      res.json(resultados);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar itens' });
  }
});

app.post('/funcionario', async (req, res) => {
  try {
      const { tipoFuncionario, cargaHoraria, responsabilidades, turno, dataPromocao, ...outrosCampos } = req.body;

      let camposAdicionais = {};
      
      if (tipoFuncionario === 'gerente') {
          if (!cargaHoraria || !responsabilidades) {
              return res.status(400).json({ message: '**Campos de cargaHoraria e responsabilidades são obrigatórios para Gerente' });
          }
          camposAdicionais = { cargaHoraria, responsabilidades };
      } else if (tipoFuncionario === 'atendente') {
          if (!turno) {
              return res.status(400).json({ message: '**Campo de turno é obrigatório para Atendente' });
          }
          camposAdicionais = { turno };
      } else if (tipoFuncionario === 'diretor') {
          if (!dataPromocao) {
              return res.status(400).json({ message: '**Campo de dataPromocao é obrigatório para Diretor' });
          }
          camposAdicionais = { dataPromocao };
      }

      const { emails } = req.body;
      const emailArray = emails.split(',').map(email => email.trim().toLowerCase());

      const funcionarioData = {
          tipoFuncionario,
          ...outrosCampos,
          ...camposAdicionais
      };

      funcionarioData.matricula = gerarMatricula();
      funcionarioData.emails = emailArray;
      
      const novoFuncionario = new schemas.Funcionario(funcionarioData); 

      await novoFuncionario.save().then(() => console.log("Salvo!"));

      res.status(201).json({ message: 'Funcionário inserido com sucesso', funcionario: novoFuncionario });
  } catch (err) {
      res.status(500).json({ message: '**Erro ao inserir funcionário', error: err });
  }
});

app.post('/item', async (req, res) => {
  try {
      const itemData = req.body;

      console.log(itemData);

      const gerente = await schemas.Funcionario.findById(exposicaoData.gerente);

      itemData.itens = arrayItens;
      itemData.gerente = {
        idDiretor: gerente._id,
        primeiroNome: gerente.primeiroNome,
        sobrenome: gerente.sobrenome
      };
      
      const novoItem = new schemas.Item(itemData);

      await novoItem.save();

      res.status(201).json({ message: 'Item inserido com sucesso', item: novoItem });
  } catch (err) {
      res.status(500).json({ message: '**Erro ao inserir item', error: err });
  }
});

app.post('/exposicao', async (req, res) => {
  try {
      const exposicaoData = req.body;

      const idItens = exposicaoData.itens;
      let arrayItens = [];

      idItens.forEach(async e => {
        const item = await schemas.Item.findById(e);
        arrayItens.push({ idItem: item._id, nome: item.nome });
      });
      
      const diretor = await schemas.Funcionario.findById(exposicaoData.diretor);

      exposicaoData.itens = arrayItens;
      exposicaoData.diretor = {
        idDiretor: diretor._id,
        primeiroNome: diretor.primeiroNome,
        sobrenome: diretor.sobrenome
      };

      const novaExposicao = new schemas.Exposicao(exposicaoData);

      await novaExposicao.save().then(() => console.log("Salvo!"));

      res.status(201).json({ message: 'Exposição inserida com sucesso', exposicao: novaExposicao });
  } catch (err) {
      res.status(500).json({ message: '**Erro ao inserir exposição', error: err });
  }
});

/* main */
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});

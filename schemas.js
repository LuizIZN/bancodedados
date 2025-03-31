const mongoose = require('mongoose');

const Funcionario = mongoose.model('Funcionario', new mongoose.Schema({
    cpf: String,
    primeiroNome: String,
    sobrenome: String,
    emails: [String],
    senha: String,
    dataNasc: Date,
    tipoFuncionario: { type: String, enum: ['gerente', 'atendente', 'diretor'] },
    matricula: String,
    cargaHoraria: Number,
    responsabilidades: String,
    turno: String,
    dataPromocao: Date
}));

const Contrato = mongoose.model('Contrato', new mongoose.Schema({
    valor: Number,
    pessoaJuridica: {
        idVisitante: mongoose.Schema.Types.ObjectId,
        cnpj: String,
        razaoSocial: String
    },
    gerente: {
        idGerente: mongoose.Schema.Types.ObjectId,
        primeiroNome: String,
        sobrenome: String
    },
    descricao: String
}));

const HorarioFuncionamento = mongoose.model('HorarioFuncionamento', new mongoose.Schema({
    codHorario: String,
    inicio: String,
    fim: String,
    diasComerciais: [String],
    gerente: {
        idGerente: mongoose.Schema.Types.ObjectId,
        primeiroNome: String,
        sobrenome: String
    }
}));

const Manutencao = mongoose.model('Manutencao', new mongoose.Schema({
    idTecnico: Number,
    gerente: {
        idGerente: mongoose.Schema.Types.ObjectId,
        primeiroNome: String,
        sobrenome: String
    },
    item: {
        idItem: mongoose.Schema.Types.ObjectId,
        nome: String
    },
    valor: Number,
    data: Date,
    descricao: String
}));

const Venda = mongoose.model('Venda', new mongoose.Schema({
    valor: Number,
    data: Date,
    gerente: {
        idGerente: mongoose.Schema.Types.ObjectId,
        primeiroNome: String,
        sobrenome: String
    },
    itens: [{
        idItem: mongoose.Schema.Types.ObjectId,
        nome: String
    }]
}));

const Item = mongoose.model('Item', new mongoose.Schema({
    nome: String,
    estadoConservacao: String,
    classificacao: String,
    gerente: {
        idGerente: mongoose.Schema.Types.ObjectId,
        primeiroNome: String,
        sobrenome: String
    }
}));

const Exposicao = mongoose.model('Exposicao', new mongoose.Schema({
    dias: [String],
    texto: String,
    diretor: {
        idDiretor: mongoose.Schema.Types.ObjectId,
        primeiroNome: String,
        sobrenome: String
    },
    itens: [{
        idItem: mongoose.Schema.Types.ObjectId,
        nome: String
    }],
    descricao: String
}));

const Noticia = mongoose.model('Noticia', new mongoose.Schema({
    titulo: String,
    texto: String,
    palavrasChave: [String],
    diretor: {
        idDiretor: mongoose.Schema.Types.ObjectId,
        primeiroNome: String,
        sobrenome: String
    }
}));

const Evento = mongoose.model('Evento', new mongoose.Schema({
    titulo: String,
    coordenador: String,
    data: Date,
    horario: String,
    duracao: String,
    diretor: {
        idDiretor: mongoose.Schema.Types.ObjectId,
        primeiroNome: String,
        sobrenome: String
    },
    descricao: String
}));

const Emprestimo = mongoose.model('Emprestimo', new mongoose.Schema({
    valor: Number,
    dias: Number,
    atendente: {
        atendenteId: mongoose.Schema.Types.ObjectId,
        primeiroNome: String,
        sobrenome: String
    },
    descricao: String
}));

const Visita = mongoose.model('Visita', new mongoose.Schema({
    codVisita: String,
    data: Date,
    hora: String,
    atendente: {
        atendenteId: mongoose.Schema.Types.ObjectId,
        primeiroNome: String,
        sobrenome: String
    },
    visitantes: [{
        idVisitante: mongoose.Schema.Types.ObjectId,
        tipoVisitante: { type: String, enum: ['pessoaFisica', 'pessoaJuridica'] },
        cnpj: String,
        razaoSocial: String,
        cpf: String,
        primeiroNome: String,
        sobrenome: String
    }]
}));

const Doacao = mongoose.model('Doacao', new mongoose.Schema({
    valor: Number,
    data: Date,
    visitante: {
        idVisitante: mongoose.Schema.Types.ObjectId,
        tipoVisitante: { type: String, enum: ['pessoaFisica', 'pessoaJuridica'] },
        cnpj: String,
        razaoSocial: String,
        cpf: String,
        primeiroNome: String,
        sobrenome: String
    },
    gerente: {
        idGerente: mongoose.Schema.Types.ObjectId,
        primeiroNome: String,
        sobrenome: String
    }
}));

module.exports = {
    Funcionario,
    Contrato,
    HorarioFuncionamento,
    Manutencao,
    Venda,
    Item,
    Exposicao,
    Noticia,
    Evento,
    Emprestimo,
    Visita,
    Doacao
};

db.createCollection("funcionarios", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["cpf", "primeiroNome", "sobrenome", "emails", "senha", "matricula", "tipoFuncionario"],
            properties: {
                cpf: { bsonType: "string" },
                primeiroNome: { bsonType: "string" },
                sobrenome: { bsonType: "string" },
                emails: {
                    bsonType: "array",
                    minItems: 1,
                    uniqueItems: true,
                    items: {
                        bsonType: "string",
                        pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"
                    }
                },
                senha: { bsonType: "string" },
                dataNasc: { bsonType: "date" },
                tipoFuncionario: { enum: ["gerente", "atendente", "diretor"] },
                matricula: { bsonType: "string" }
            },
            oneOf: [
                {
                    bsonType: "object",
                    properties: {
                        cargaHoraria: { bsonType: "int", minimum: 0 },
                        responsabilidades: { bsonType: "string" }
                    },
                    required: ["cargaHoraria", "responsabilidades"]
                },
                {
                    bsonType: "object",
                    properties: {
                        turno: { bsonType: "string" }
                    },
                    required: ["turno"]
                },
                {
                    bsonType: "object",
                    properties: {
                        dataPromocao: { bsonType: "date" }
                    },
                    required: ["dataPromocao"]
                }
            ]
        }
    }
})

db.createCollection("contratos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["valor", "pessoaJuridica", "gerente"],
            properties: {
                valor: { bsonType: "double", minimum: 0 },
                pessoaJuridica: {
                    bsonType: "object",
                    required: ["idVisitante", "cnpj", "razaoSocial"],
                    properties: {
                        idVisitante: { bsonType: "objectId" },
                        cnpj: { bsonType: "string" },
                        razaoSocial: { bsonType: "string" }
                    }
                },
                gerente: {
                    bsonType: "object",
                    required: ["idGerente", "primeiroNome", "sobrenome"],
                    properties: {
                        idGerente: { bsonType: "objectId" },
                        primeiroNome: { bsonType: "string" },
                        sobrenome: { bsonType: "string" }
                    }
                },
                descricao: { bsonType: "string" }
            }
        }
    }
})

db.createCollection("horariosFuncionamento", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["codHorario", "inicio", "fim", "diasComerciais", "gerente"],
            properties: {
                codHorario: { bsonType: "string" },
                inicio: { bsonType: "string" },
                fim: { bsonType: "string" },
                diasComerciais: {
                    bsonType: "array",
                    minItems: 0,
                    uniqueItems: true,
                    items: {
                        bsonType: "string",
                        enum: ["segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado", "domingo"]
                    }
                },
                gerente: {
                    bsonType: "object",
                    required: ["idGerente", "primeiroNome", "sobrenome"],
                    properties: {
                        idGerente: { bsonType: "objectId" },
                        primeiroNome: { bsonType: "string" },
                        sobrenome: { bsonType: "string" }
                    }
                }
            }
        }
    }
})

db.createCollection("manutencoes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["idTecnico", "valor", "data", "item", "gerente"],
            properties: {
                idTecnico: { bsonType: "int" },
                gerente: {
                    bsonType: "object",
                    required: ["idGerente", "primeiroNome", "sobrenome"],
                    properties: {
                        idGerente: { bsonType: "objectId" },
                        primeiroNome: { bsonType: "string" },
                        sobrenome: { bsonType: "string" }
                    }
                },
                item: {
                    bsonType: "object",
                    required: ["idItem", "nome"],
                    properties: {
                        idItem: { bsonType: "objectId" },
                        nome: { bsonType: "string" }
                    }
                },
                valor: { bsonType: "double", minimum: 0 },
                data: { bsonType: "date" },
                descricao: { bsonType: "string" }
            }
        }
    }
})

db.createCollection("vendas", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["valor", "data", "gerente", "itens"],
            properties: {
                valor: { bsonType: "double", minimum: 0 },
                data: { bsonType: "date" },
                gerente: {
                    bsonType: "object",
                    required: ["idGerente", "primeiroNome", "sobrenome"],
                    properties: {
                        idGerente: { bsonType: "objectId" },
                        primeiroNome: { bsonType: "string" },
                        sobrenome: { bsonType: "string" }
                    }
                },
                itens: {
                    bsonType: "array",
                    minItems: 1,
                    uniqueItems: true,
                    items: {
                        bsonType: "object",
                        required: ["idItem", "nome"],
                        properties: {
                            idItem: { bsonType: "objectId" },
                            nome: { bsonType: "string" }
                        }
                    }
                }
            }
        }
    }
})

db.createCollection("itens", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nome", "estadoConservacao", "gerente"],
            properties: {
                nome: { bsonType: "string" },
                estadoConservacao: { bsonType: "string" },
                classificacao: { bsonType: "string" },
                gerente: {
                    bsonType: "object",
                    required: ["idGerente", "primeiroNome", "sobrenome"],
                    properties: {
                        idGerente: { bsonType: "objectId" },
                        primeiroNome: { bsonType: "string" },
                        sobrenome: { bsonType: "string" }
                    }
                }
            }
        }
    }
})

db.createCollection("exposicoes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["dias", "texto", "diretor", "itens"],
            properties: {
                dias: {
                    bsonType: "array",
                    minItems: 1,
                    uniqueItems: true,
                    items: {
                        bsonType: "string",
                        enum: ["segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado", "domingo"]
                    }
                },
                texto: { bsonType: "string" },
                diretor: {
                    bsonType: "object",
                    required: ["idDiretor", "primeiroNome", "sobrenome"],
                    properties: {
                        idDiretor: { bsonType: "objectId" },
                        primeiroNome: { bsonType: "string" },
                        sobrenome: { bsonType: "string" }
                    }
                },
                itens: {
                    bsonType: "array",
                    minItems: 1,
                    uniqueItems: true,
                    items: {
                        bsonType: "object",
                        required: ["idItem", "nome"],
                        properties: {
                            idItem: { bsonType: "objectId" },
                            nome: { bsonType: "string" }
                        }
                    }
                },
                descricao: { bsonType: "string" }
            }
        }
    }
})

db.createCollection("noticias", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["titulo", "texto", "palavrasChave", "diretor"],
            properties: {
                titulo: { bsonType: "string" },
                texto: { bsonType: "string" },
                palavrasChave: {
                    bsonType: "array",
                    minItems: 1,
                    uniqueItems: true,
                    items: { bsonType: "string" }
                },
                diretor: {
                    bsonType: "object",
                    required: ["idDiretor", "primeiroNome", "sobrenome"],
                    properties: {
                        idDiretor: { bsonType: "objectId" },
                        primeiroNome: { bsonType: "string" },
                        sobrenome: { bsonType: "string" }
                    }
                }
            }
        }
    }
})

db.createCollection("eventos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["titulo", "coordenador", "data", "horario", "duracao", "diretor"],
            properties: {
                titulo: { bsonType: "string" },
                coordenador: { bsonType: "string" },
                data: { bsonType: "date" },
                horario: { bsonType: "string" },
                duracao: { bsonType: "string" },
                diretor: {
                    bsonType: "object",
                    required: ["idDiretor", "primeiroNome", "sobrenome"],
                    properties: {
                        idDiretor: { bsonType: "objectId" },
                        primeiroNome: { bsonType: "string" },
                        sobrenome: { bsonType: "string" }
                    }
                },
                descricao: { bsonType: "string" }
            }
        }
    }
})

db.createCollection("emprestimos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["valor", "dias", "atendente"],
            properties: {
                valor: { bsonType: "double" },
                dias: { bsonType: "int" },
                atendente: {
                    bsonType: "object",
                    required: ["atendenteId", "primeiroNome", "sobrenome"],
                    properties: {
                        atendenteId: { bsonType: "objectId" },
                        primeiroNome: { bsonType: "string" },
                        sobrenome: { bsonType: "string" }
                    }
                },
                descricao: { bsonType: "string" }
            }
        }
    }
})

db.createCollection("visitas", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["codVisita", "data", "hora", "atendente", "visitantes"],
            properties: {
                codVisita: { bsonType: "string" },
                data: { bsonType: "date" },
                hora: { bsonType: "string" },
                atendente: {
                    bsonType: "object",
                    required: ["atendenteId", "primeiroNome", "sobrenome"],
                    properties: {
                        atendenteId: { bsonType: "objectId" },
                        primeiroNome: { bsonType: "string" },
                        sobrenome: { bsonType: "string" }
                    }
                },
                visitantes: {
                    bsonType: "object",
                    additionalProperties: {
                        bsonType: "object",
                        required: ["idVisitante", "tipoVisitante"],
                        properties: {
                            idVisitante: { bsonType: "objectId" },
                            tipoVisitante: {
                                bsonType: "string",
                                enum: ["pessoaFisica", "pessoaJuridica"]
                            }
                        },
                        oneOf: [
                            {
                                bsonType: "object",
                                required: ["cnpj", "razaoSocial"],
                                properties: {
                                    cnpj: { bsonType: "string" },
                                    razaoSocial: { bsonType: "string" }
                                }
                            },
                            {
                                bsonType: "object",
                                required: ["cpf", "primeiroNome", "sobrenome"],
                                properties: {
                                    cpf: { bsonType: "string" },
                                    primeiroNome: { bsonType: "string" },
                                    sobrenome: { bsonType: "string" }
                                }
                            }
                        ]
                    }
                }
            }
        }
    }
})

db.createCollection("doacoes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["valor", "data", "visitante", "gerente"],
            properties: {
                valor: { bsonType: "double" },
                data: { bsonType: "date" },
                visitante: {
                    bsonType: "object",
                    required: ["idVisitante", "tipoVisitante"],
                    properties: {
                        idVisitante: { bsonType: "objectId" },
                        tipoVisitante: { 
                            bsonType: "string",
                            enum: ["pessoaFisica", "pessoaJuridica"]
                        },
                        properties: {
                            oneOf: [
                                {
                                    bsonType: "object",
                                    required: ["cnpj", "razaoSocial"],
                                    properties: {
                                        cnpj: { bsonType: "string" },
                                        razaoSocial: { bsonType: "string" }
                                    }
                                },
                                {
                                    bsonType: "object",
                                    required: ["cpf", "primeiroNome", "sobrenome"],
                                    properties: {
                                        cpf: { bsonType: "string" },
                                        primeiroNome: { bsonType: "string" },
                                        sobrenome: { bsonType: "string" }
                                    }
                                }
                            ]
                        }
                    }
                },
                gerente: {
                    bsonType: "object",
                    required: ["idGerente", "primeiroNome", "sobrenome"],
                    properties: {
                        idGerente: { bsonType: "objectId" },
                        primeiroNome: { bsonType: "string" },
                        sobrenome: { bsonType: "string" }
                    }
                }
            }
        }
    }
})
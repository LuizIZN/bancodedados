import pkg from "pg";
import prompt from "prompt-sync";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "database-museu-postegres.cz9ghptubzlk.us-east-1.rds.amazonaws.com",
  database: "museu",
  password: "postgres",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

const conectar = async () => {
  try {
    const client = await pool.connect();
    console.log("Conectado com sucesso");
    client.release();
  } catch (error) {
    console.log("Erro ao conectar", error);
    process.exit(1);
  }
};

const insert = async (values) => {
  try {
    const client = await pool.connect();
    const query =
      "INSERT INTO mydb.funcionario (cpf, primeiro_nome, sobrenome, data_nasc, senha, email) VALUES ($1, $2, $3, $4, $5, $6)";
    await client.query(query, values);
    console.log("Inserido com sucesso");
    client.release();
  } catch (error) {
    console.log("Erro ao inserir", error);
  }
};

const select = async () => {
  try {
    const client = await pool.connect();
    const query = "SELECT * FROM mydb.funcionario";
    const result = await client.query(query);

    if (result.rows.length === 0) {
      console.log("Nenhum registro encontrado");
      return;
    }

    console.log(result.rows);
    client.release();
  } catch (error) {
    console.log("Erro ao selecionar", error);
  }
};

const getByPrimeiroNome = async (primeiroNome) => {
  try {
    const client = await pool.connect();
    const query = "SELECT * FROM mydb.funcionario WHERE primeiro_nome = $1";
    const result = await client.query(query, [primeiroNome]);
    console.log(result.rows);
    client.release();
  } catch (error) {
    console.log("Erro ao selecionar", error);
  }
};

const main = async () => {
  await conectar();

  const input = prompt();

  while (true) {
    console.log("1 - Inserir");
    console.log("2 - Listar");
    console.log("3 - Buscar por primeiro nome");
    console.log("4 - Sair");

    const option = parseInt(input("Escolha uma opção: "));

    switch (option) {
      case 1:
        {
          const cpf = input("CPF: ");
          const primeiroNome = input("Primeiro nome: ");
          const sobrenome = input("Sobrenome: ");
          const dataNasc = input("Data de nascimento: ");
          const senha = input("Senha: ");
          const email = input("Email: ");
          await insert([cpf, primeiroNome, sobrenome, dataNasc, senha, [email]]);
        }
        break;
      case 2:
        await select();
        break;
      case 3:
        {
          const primeiroNome = input("Primeiro nome: ");
          await getByPrimeiroNome(primeiroNome);
        }
        break;
      case 4:
        console.log("Saindo...");
        process.exit(0);
      default:
        console.log("Opção inválida");
        break;
    }
  }
};

main();
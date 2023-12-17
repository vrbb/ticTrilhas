const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const Produto = sequelize.define("Produto", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  preco: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
});

async function insertProduto(nome, descricao, preco) {
  try {
    await Produto.create({ nome, descricao, preco });

    console.log("Produto criado com sucesso.");
  } catch (error) {
    console.error("Erro ao criar produto:", error);
  }
}

async function readProdutos() {
  try {
    const produtos = await Produto.findAll();

    console.log("Produtos:", produtos);
    return produtos;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return null;
  }
}

async function readProduto(nome) {
  try {
    const produto = await Produto.findOne({ where: { nome } });

    console.log("Produto:", produto);
    return produto;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}

const updateProduto = async (id, updateData) => {
  console.log("Obtendo produto: ", id);
  console.log({ updateData });
  try {
    const produto = await Produto.findOne({
      where: { id },
    });
    console.log("Produto encontrado, realizando update.", produto);
    await produto.update(updateData);
    return produto;
  } catch (error) {
    console.log("Erro ao atualizar produto:", error);
  }
  return null;
};

const deleteProduto = async (id) => {
  console.log("Obtendo produto: ", id);
  try {
    const produto = await Produto.findOne({
      where: { id },
    });
    console.log("Produto encontrado, deletando..", produto);
    await produto.destroy();
    return true;
  } catch (error) {
    console.log("Erro ao deletar produto:", error);
    return false;
  }
};

const Cliente = sequelize.define("Cliente", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sobrenome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

async function insertCliente(nome, sobrenome, cpf, telefone) {
  try {
    await Cliente.create({ nome, sobrenome, cpf, telefone });

    console.log("Cliente criado com sucesso.");
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
  }
}

async function readClientes() {
  try {
    const clientes = await Cliente.findAll();

    console.log("Clientes:", clientes);
    return clientes;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return null;
  }
}

async function readCliente(cpf) {
  try {
    const cliente = await Cliente.findOne({ where: { cpf } });

    console.log("Cliente:", cliente);
    return cliente;
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    return null;
  }
}

const updateCliente = async (id, updateData) => {
  console.log("Obtendo cliente: ", id);
  console.log({ updateData });
  try {
    const cliente = await Cliente.findOne({
      where: { id },
    });
    console.log("Cliente encontrado, realizando update.", cliente);
    await cliente.update(updateData);
    return cliente;
  } catch (error) {
    console.log("Erro ao atualizar cliente:", error);
  }
  return null;
};

const deleteCliente = async (id) => {
  console.log("Obtendo cliente: ", id);
  try {
    const cliente = await Cliente.findOne({
      where: { id },
    });
    console.log("Cliente encontrado, deletando..", cliente);
    await cliente.destroy();
    return true;
  } catch (error) {
    console.log("Erro ao deletar cliente:", error);
    return false;
  }
};

const Venda = sequelize.define("Venda", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

// Estabelecendo a relação
Cliente.hasMany(Venda);

const insertVenda = async (ClienteId) => {
  try {
    await Venda.create(ClienteId);

    console.log("Venda criada com sucesso.");
  } catch (error) {
    console.error("Erro ao criar venda:", error);
  }
};

module.exports = {
  Produto,
  Cliente,
  Venda,
  sequelize,
  insertProduto,
  readProdutos,
  readProduto,
  updateProduto,
  deleteProduto,
  insertCliente,
  readClientes,
  readCliente,
  updateCliente,
  deleteCliente,
  insertVenda,
};

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

module.exports = {
  Produto,
  sequelize,
  insertProduto,
  readProdutos,
  readProduto,
  updateProduto,
  deleteProduto,
};

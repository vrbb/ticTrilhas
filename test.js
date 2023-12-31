// test.js
const fetch = require("node-fetch");

async function criarProduto() {
  const data = {
    nome: "Acai",
    descricao: "Acai 100% natural 500ml",
    preco: 26.99,
  };

  try {
    const response = await fetch("http://localhost:3000/cadastrarProduto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
  }
}

async function buscarProdutos() {
  try {
    const response = await fetch("http://localhost:3000/lerProdutos");
    const produtos = await response.json();
    console.log("Produtos:", produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}

async function buscarProduto() {
  try {
    const response = await fetch("http://localhost:3000/lerProduto/Acai");
    const produtos = await response.json();
    console.log("Produto:", produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}

async function atualizarProduto() {
  try {
    const data = {
      nome: "Acai Puro 250ml",
      descricao: "Acai 100% natural 250ml",
      preco: 14.99,
      id: 1,
    };

    const response = await fetch("http://localhost:3000/atualizarProduto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const produto = await response.json();
    console.log("Produto:", produto);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
  }
}

async function deletarProduto() {
  try {
    await fetch("http://localhost:3000/deletarProduto/1", {
      method: "DELETE",
    });
    console.log("Produto deletado");
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
  }
}
// Run  tests
(async () => {
  await criarProduto();
  await buscarProdutos();
  await buscarProduto();
  await atualizarProduto();
  await deletarProduto();
})();

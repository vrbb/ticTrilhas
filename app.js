const http = require("http");
const {
  sequelize,
  insertProduto,
  readProdutos,
  readProduto,
  updateProduto,
  deleteProduto,
} = require("./models");

const hostname = "127.0.0.1";
const port = 3000;

const cadastrarProduto = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      console.log("Cadastrando Produto...");
      const { nome, descricao, preco } = JSON.parse(body);

      await insertProduto(nome, descricao, preco);
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end("Produto adicionado.");
    } catch (e) {
      console.log(e);
    }
  });
};

const lerProdutos = async (res) => {
  try {
    const produtos = await readProdutos();
    console.log({ produtos });

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(produtos));
  } catch (e) {
    console.log(e);
  }
};

const lerProduto = async (req, res) => {
  const nome = req.url.split("/")[2];

  console.log({ nome });
  try {
    const produto = await readProduto(nome);
    console.log({ produto });

    res.setHeader("Content-Type", "application/json");
    if (produto) res.end(JSON.stringify(produto));
  } catch (e) {
    console.log(e);
  }
};

const atualizarProduto = async (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", async () => {
    try {
      const fullData = JSON.parse(data);
      console.log({ fullData });

      const produto = await updateProduto(fullData.id, fullData);

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(produto.toJSON()));
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Produto adicionado.");
    } catch (e) {
      console.log(e);
    }
  });
};

const deletarProduto = async (req, res) => {
  const id = req.url.split("/")[2];
  try {
    await deleteProduto(id);
    res.setHeader("Content-Type", "text/plain");

    res.statusCode = 200;
    res.end("Produto deletado.");
  } catch (e) {
    console.log(e);
  }
};

(async () => {
  await sequelize.sync();

  const server = http.createServer(async (req, res) => {
    if (req.method === "POST" && req.url === "/cadastrarProduto") {
      await cadastrarProduto(req, res);
    } else if (req.method === "GET" && req.url.includes("/lerProdutos")) {
      await lerProdutos(res);
    } else if (req.method === "GET" && req.url.includes("/lerProduto")) {
      await lerProduto(req, res);
    } else if (req.method === "POST" && req.url === "/atualizarProduto") {
      await atualizarProduto(req, res);
    } else if (req.method === "DELETE" && req.url.includes("/deletarProduto")) {
      await deletarProduto(req, res);
    }
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
})();

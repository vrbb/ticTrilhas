import http from "http";
import {
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
} from "./models";

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

const cadastrarCliente = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      console.log("Cadastrando Cliente...");
      const { nome, sobrenome, cpf, telefone } = JSON.parse(body);

      await insertCliente(nome, sobrenome, cpf, telefone);
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end("Cliente adicionado.");
    } catch (e) {
      console.log(e);
    }
  });
};

const lerClientes = async (res) => {
  try {
    const clientes = await readClientes();
    console.log({ clientes });

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(clientes));
  } catch (e) {
    console.log(e);
  }
};

const lerCliente = async (req, res) => {
  const cpf = req.url.split("/")[2];

  console.log({ nome });
  try {
    const cliente = await readCliente(cpf);
    console.log({ cliente });

    res.setHeader("Content-Type", "application/json");
    if (cliente) res.end(JSON.stringify(cliente));
  } catch (e) {
    console.log(e);
  }
};

const atualizarCliente = async (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", async () => {
    try {
      const fullData = JSON.parse(data);
      console.log({ fullData });

      const cliente = await updateCliente(fullData.id, fullData);

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(cliente.toJSON()));
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Cliente adicionado.");
    } catch (e) {
      console.log(e);
    }
  });
};

const deletarCliente = async (req, res) => {
  const id = req.url.split("/")[2];
  try {
    await deleteCliente(id);
    res.setHeader("Content-Type", "text/plain");

    res.statusCode = 200;
    res.end("Cliente deletado.");
  } catch (e) {
    console.log(e);
  }
};

const cadastrarVenda = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      console.log("Cadastrando Venda...");
      const { Cliente } = JSON.parse(body);

      await insertVenda(Cliente.id);
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end("Venda adicionada.");
    } catch (e) {
      console.log(e);
    }
  });
};
(async () => {
  await sequelize.sync();

  const server = http.createServer(async (req, res) => {
    //Produto
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
    //Cliente
    else if (req.method === "POST" && req.url === "/cadastrarCliente") {
      await cadastrarCliente(req, res);
    } else if (req.method === "GET" && req.url.includes("/lerClientes")) {
      await lerClientes(res);
    } else if (req.method === "GET" && req.url.includes("/lerCliente")) {
      await lerCliente(req, res);
    } else if (req.method === "POST" && req.url === "/atualizarCliente") {
      await atualizarCliente(req, res);
    } else if (req.method === "DELETE" && req.url.includes("/deletarCliente")) {
      await deletarCliente(req, res);
    }
    //Venda
    else if (req.method === "POST" && req.url === "/cadastrarVenda") {
      await cadastrarVenda(req, res);
    }
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
})();

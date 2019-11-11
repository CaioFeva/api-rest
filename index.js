const express = require("express");
const server = express();
server.use(express.json());

//--------------------------------//

const produtos = ["Panela"];

//middleware

function checaProduto(req, res, next) {
  const { nome } = req.params;
  const produto = produtos.find(p => p.nome == nome);

  if (!produto) {
    return res.status(400).json({ error: "Produto não encontrado" });
  }

  return next();
}

server.post("/produtos", (req, res) => {
  const { nome, valor } = req.body;

  const produto = {
    nome,
    valor,
    conteudo: []
  };
  produtos.push(produto);

  return res.json(produto);
});
server.put("/produtos/:nome", checaProduto, (req, res) => {
  const { nome } = req.params;
  const { valor } = req.body;
  const produto = produtos.find(p => p.nome == nome);

  produto.valor = valor;

  return res.json(produto);
});

server.delete("/produtos/:nome", (req, res) => {
  const { nome } = req.params;
  const produtoIndex = produtos.findIndex(p => p.nome == nome);

  produtos.splice(produtoIndex, 1);
  return res.send();
});

server.get("/produtos/:nome", (req, res) => {
  const { nome } = req.params;

  return res.json(produtos[nome]);
});

server.get("/produtos", (req, res) => {
  return res.json(produtos);
});

server.post("produtos/:nome/conteudo", (req, res) => {
  const { nome } = req.params;
  const { valor } = req.body;
  const produto = produtos.findnome(p => p.nome == nome);

  produto.conteudo.push(valor);

  return res.json(produto);
});

server.listen(3000);

import express from 'express'

const app = express();

app.use(express.json());

let pecas = [
  { id: 1, nome: 'Camiseta azul', tipo: 'top', cor: 'azul' },
  { id: 2, nome: 'Calça jeans', tipo: 'bottom', cor: 'azul' },
  { id: 3, nome: 'Jaqueta de couro', tipo: 'outerwear', cor: 'preto' },
  { id: 4, nome: 'Tênis branco', tipo: 'calçado', cor: 'branco' }
];

function pecaParaXml(peca) {
  return `
  <peca>
    <id>${peca.id}</id>
    <nome>${peca.nome}</nome>
    <tipo>${peca.tipo}</tipo>
    <cor>${peca.cor}</cor>
  </peca>`;
}

app.get('/pecas', (req, res) => {
  let resultado = pecas;
  const { nome, tipo, cor } = req.query;

  if (nome) {
    resultado = resultado.filter(p =>
      p.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }
  if (tipo) {
    resultado = resultado.filter(p =>
      p.tipo.toLowerCase() === tipo.toLowerCase()
    );
  }
  if (cor) {
    resultado = resultado.filter(p =>
      p.cor.toLowerCase() === cor.toLowerCase()
    );
  }

  res.status(200).json(resultado);
});

app.get('/pecas/xml', (req, res) => {
  let resultado = pecas;
  const { nome, tipo, cor } = req.query;

  if (nome) {
    resultado = resultado.filter(p =>
      p.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }
  if (tipo) {
    resultado = resultado.filter(p =>
      p.tipo.toLowerCase() === tipo.toLowerCase()
    );
  }
  if (cor) {
    resultado = resultado.filter(p =>
      p.cor.toLowerCase() === cor.toLowerCase()
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<pecas>${resultado.map(pecaParaXml).join('')}
</pecas>`;

  res.type('application/xml').status(200).send(xml);
});

app.get('/pecas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const peca = pecas.find(p => p.id === id);

  if (!peca) {
    return res.status(404).json({ erro: 'Peça não encontrada' });
  }

  res.status(200).json(peca);
});

app.get('/pecas/:id/xml', (req, res) => {
  const id = parseInt(req.params.id);
  const peca = pecas.find(p => p.id === id);

  if (!peca) {
    const xmlErro = `<?xml version="1.0" encoding="UTF-8"?>
<erro>Peça não encontrada</erro>`;
    return res.type('application/xml').status(404).send(xmlErro);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>${pecaParaXml(peca)}`;
  res.type('application/xml').status(200).send(xml);
});

app.post('/pecas', (req, res) => {
  const { nome, tipo, cor } = req.body;

  if (!nome || !tipo || !cor) {
    return res.status(400).json({
      erro: 'Campos obrigatórios: nome, tipo, cor'
    });
  }

  const novaPeca = {
    id: pecas.length > 0 ? Math.max(...pecas.map(p => p.id)) + 1 : 1,
    nome,
    tipo,
    cor
  };

  pecas.push(novaPeca);
  res.status(201).json(novaPeca);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em 3000`);
});
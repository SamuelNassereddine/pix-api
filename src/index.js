const express = require('express');
const cors = require('cors');
const { payload } = require('pix-payload');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dados fixos do PIX conforme informado pelo usuário
const PIX_DATA = {
  name: "samuel nasser",
  city: "sao bernardo do campo",
  key: "32147445000195", // CNPJ como chave PIX
  transactionId: "celebra" // txid informado pelo usuário
};

// Rota principal para geração do PIX
app.post('/api/gerar-pix', (req, res) => {
  try {
    // Verifica se o valor está no formato root ou direto
    let valor;
    
    if (req.body.root && req.body.root.valor) {
      // Formato do BotConversa: {"root": {"valor": "100"}}
      valor = req.body.root.valor;
    } else if (req.body.valor) {
      // Formato direto: {"valor": "100"}
      valor = req.body.valor;
    } else {
      return res.status(400).json({ 
        erro: true, 
        mensagem: 'Valor não encontrado na requisição.' 
      });
    }
    
    // Converte para número se for string
    const valorNumerico = parseFloat(valor);
    
    if (isNaN(valorNumerico)) {
      return res.status(400).json({ 
        erro: true, 
        mensagem: 'Valor inválido. Forneça um valor numérico válido.' 
      });
    }

    // Cria o payload do PIX com os dados fixos e o valor variável
    const pixData = {
      ...PIX_DATA,
      amount: valorNumerico
    };

    // Gera o código PIX copia e cola
    const pixCopiaCola = payload(pixData);

    // Retorna apenas o código PIX copia e cola
    return res.status(200).json({ 
      pixCopiaCola 
    });
  } catch (error) {
    console.error('Erro ao gerar PIX:', error);
    return res.status(500).json({ 
      erro: true, 
      mensagem: 'Erro ao gerar código PIX.' 
    });
  }
});

// Rota de documentação simples
app.get('/', (req, res) => {
  res.json({
    api: 'API de Geração de PIX Copia e Cola',
    endpoints: {
      '/api/gerar-pix': {
        method: 'POST',
        body: { 
          'formato1': { 'valor': 'número (ex: 100.50)' },
          'formato2': { 'root': { 'valor': 'número (ex: 100.50)' } }
        },
        response: { pixCopiaCola: 'string com código PIX copia e cola' }
      }
    }
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Para compatibilidade com serverless da Vercel
module.exports = app;

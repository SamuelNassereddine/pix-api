# API de Geração de PIX Copia e Cola

Esta API foi desenvolvida para gerar códigos PIX copia e cola que podem ser integrados ao BotConversa. A API recebe um valor de transação e retorna o código PIX copia e cola correspondente.

## Estrutura do Projeto

```
pix-api/
├── src/
│   └── index.js       # Código principal da API
├── package.json       # Dependências e configurações do projeto
├── vercel.json        # Configuração para deploy na Vercel
└── README.md          # Documentação do projeto
```

## Tecnologias Utilizadas

- Node.js
- Express.js
- Biblioteca pix-payload (para geração do código PIX)
- Vercel (para hospedagem)

## Configuração

Os dados do PIX estão configurados no arquivo `src/index.js`:

```javascript
// Dados fixos do PIX conforme informado pelo usuário
const PIX_DATA = {
  name: "samuel nasser",
  city: "sao bernardo do campo",
  key: "32147445000195", // CNPJ como chave PIX
  transactionId: "celebra" // txid informado pelo usuário
};
```

## Instalação e Execução Local

1. Clone o repositório:
```bash
git clone https://github.com/SamuelNassereddine/pix-api.git
cd pix-api
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor localmente:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

## Endpoints da API

### Gerar PIX Copia e Cola

- **URL**: `/api/gerar-pix`
- **Método**: `POST`
- **Corpo da Requisição**:
  ```json
  {
    "valor": 100.50
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "pixCopiaCola": "00020126490014br.gov.bcb.pix0114321474450001..."
  }
  ```

### Documentação

- **URL**: `/`
- **Método**: `GET`
- **Resposta**: Documentação básica da API

## Deploy na Vercel

Para fazer o deploy na Vercel:

1. Faça login na Vercel (https://vercel.com)
2. Conecte seu repositório GitHub
3. Selecione o repositório `pix-api`
4. Clique em "Deploy"

A Vercel detectará automaticamente as configurações do projeto e fará o deploy.

## Integração com BotConversa

Para integrar com o BotConversa, configure um webhook que faça uma requisição POST para o endpoint `/api/gerar-pix` da sua API hospedada na Vercel, enviando o valor da transação no corpo da requisição.

Exemplo de URL após o deploy: `https://pix-api.vercel.app/api/gerar-pix`

O BotConversa deve enviar uma requisição com o seguinte formato:

```json
{
  "valor": 100.50
}
```

E receberá como resposta:

```json
{
  "pixCopiaCola": "00020126490014br.gov.bcb.pix0114321474450001..."
}
```

O código PIX copia e cola pode então ser enviado ao cliente pelo BotConversa.

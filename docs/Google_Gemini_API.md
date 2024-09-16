# Gemini API

## Instale o pacote GoogleGenerativeAI para Node.js

`npm install @google/generative-ai`

Importe o pacote e configure o serviço com sua chave de API:

```bash
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
```

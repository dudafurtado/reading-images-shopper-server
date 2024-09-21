# Sobre o projeto

Teste Técnico para Desenvolvimento Web. Foi construído o back-end de um serviço de leitura de imagens. São 3 endpoints e uma integração com a API do Google Gemini. O propósito do projeto é gerencia a leitura individualizada de consumo de água e gás. Para facilitar a coleta da informação, o serviço utilizará IA para obter a medição através da foto de um medidor.

- [Documentação de orientação do desafio](./Teste_Tecnico_Desenvolvimento_Web.pdf)
- [Descrição da vaga](./Gupy_Vaga_Desenvolvedor_Web_FullStack_Junior.pdf)

## Tecnologias

- **Node.js** para construir a API rest.
- **TypeScript** de linguagem de programação.
- **Nest.js** como framework.
- **MySQL** no banco de dados.
- **Prisma** para modelagem do banco de dados.
- **Data Transfer Object** para validações.
- **Gemini API** de AI.
- **Dotenv** para segurança das variáveis de ambiente.
- **UUID** para identificador de valores.
- **Prettier** e **Eslint** para identação do código.
- **Docker** para container da aplicação.
- **Git** para versionamento.

## Endpoint

### POST /upload

Responsável por receber uma imagem em base 64, consultar o Gemini e retornar a
medida lida pela API.

Esse endpoint deve validar o tipo de dados dos parâmetros enviados, verificar se já existe uma leitura no mês naquele tipo de leitura e integrar com uma API de LLM para extrair o valor da imagem.

Ela irá retornar um link temporário para a imagem, um GUID e o valor numérico reconhecido pela LLM.

### PATCH /confirm

Responsável por confirmar ou corrigir o valor lido pelo LLM,

Esse endpoint deve validar o tipo de dados dos parâmetros enviados, verificar se o código de leitura informado existe, verificar se o código de leitura já foi confirmado e salvar no banco de dados o novo valor informado.

Ele **NÃO** deve fazer novas consultas ao LLM para validar o novo resultado recebido.

Ela irá retornar uma resposta de **OK** ou **ERRO** dependendo do valor informado.

### GET /`<customer code>`/list

Responsável por listar as medidas realizadas por um determinado cliente

Esse endpoint deve receber o código do cliente e filtrar as medidas realizadas por ele. Ele opcionalmente pode receber um query parameter “measure_type”, que deve ser “WATER” ou “GAS”.

Ela irá retornar uma lista com todas as leituras realizadas.

## Estudo

Utilizei a linguagem markdown e separei a pasta de docs para guardar documentos dos passos a passos de como usar as tecnologias.

- [NestJs](./docs/NestJS.md)
- [Prisma](./docs/Prisma.md)
- [Google Gemini API](./docs/Google_Gemini_API.md)
- [Docker](./docs/Docker.md)
- [Lidando com Erros no NestJs](./docs/Dealing_With_Error_NestJS.md)
- [Configuração da Variável de Ambiente no NestJs](./docs/Store_Configuration_Variables.md)
- [Validações com Data Transfer Object](./docs/Data_Transfer_Object.md)
- [Readonly POO](./docs/Readonly.md)

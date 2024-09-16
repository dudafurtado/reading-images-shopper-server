# PRISMA

## 1. Configuração do Prisma com MySQL

Instale as dependências necessárias:

`npm install @prisma/client`
`npm install prisma --save-dev`

Inicialize o Prisma no projeto:

`npx prisma init`

### Configuração do prisma/schema.prisma

Abra o arquivo prisma/schema.prisma e configure o datasource para MySQL:

```bash
datasource db {
provider = "mysql"
url = env("DATABASE_URL")
}

generator client {
provider = "prisma-client-js"
}

model User {
id Int @id @default(autoincrement())
email String @unique
name String
createdAt DateTime @default(now())
}
```

Configuração da variável de ambiente: No arquivo .env, configure a variável DATABASE_URL:

`DATABASE_URL="mysql://username:password@host:port/database"`

## 2. Configuração do Docker

Atualize o docker-compose.yml: Substitua o conteúdo atual por este para incluir o MySQL:

```bash
version: '3'
services:
app:
build: .
ports: - '3000:3000'
depends_on: - db
environment:
DATABASE_URL: "mysql://root:password@db:3306/mydatabase"

db:
image: mysql:8
ports: - '3306:3306'
environment:
MYSQL_ROOT_PASSWORD: password
MYSQL_DATABASE: mydatabase

mongo:
image: mongo
ports: - '27017:27017'
```

Atualize o Dockerfile: Certifique-se de que o Dockerfile está correto para rodar o Nest.js:

```bash
FROM node:16
WORKDIR /app
COPY package\*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
```

## 3. Utilização das Migrations com Prisma

Criação de migrations: Sempre que fizer mudanças no schema.prisma, gere uma migration com:

`npx prisma migrate dev --name init`

Gerar o Prisma Client: Após configurar o schema e migrations, gere o cliente Prisma:

`npx prisma generate`

## 4. Subir os containers com Docker

Execute o seguinte comando para subir a aplicação e os serviços:

`docker-compose up --build`

Isso deve configurar seu projeto Nest para usar MySQL com Prisma e Docker, além de criar e gerenciar as migrations.

Prisma ORM comes with a built-in GUI to view and edit the data in your database. You can open it using the following command

`npx prisma studio`

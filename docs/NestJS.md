# NEST.JS

`npm i -g @nestjs/cli`
`nest new project-name`

## Criar um Módulo

Em Nest.js, os controladores e serviços são organizados dentro de módulos. Cada módulo agrupa funcionalidades relacionadas.

Para criar um módulo, você pode usar o CLI do Nest.js:

`nest generate module users`

Isso criará um módulo chamado UsersModule dentro de uma pasta users.

## Criar um Serviço

O serviço é onde a lógica de negócios é implementada. Para criar um serviço, use o seguinte comando:

`nest generate service users`

Isso gerará um arquivo users.service.ts dentro da pasta users, contendo o serviço UsersService.

```bash
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [];

  findAll() {
    return this.users;
  }

  create(user) {
    this.users.push(user);
  }
}
```

## Criar um Controlador

O controlador recebe as requisições HTTP e chama os métodos do serviço para manipular os dados. Para criar um controlador, use o comando:

`nest generate controller users`

Isso criará um arquivo users.controller.ts dentro da pasta users, contendo o controlador UsersController.

```bash
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
    return 'User created';
  }
}
```

## Configurar as Rotas

As rotas são automaticamente configuradas pelo Nest.js através dos decoradores que você usa nos métodos do controlador. No exemplo acima:

A rota GET /users chamará o método findAll do controlador.
A rota POST /users chamará o método create do controlador.

## Integrar o Serviço e o Controlador no Módulo

O último passo é garantir que o serviço e o controlador estão registrados no módulo. No arquivo users.module.ts, o Nest.js já deve ter registrado automaticamente:

```bash
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
controllers: [UsersController],
providers: [UsersService],
})
export class UsersModule {}
```

## Project setup

```bash
npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

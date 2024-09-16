DATA TRANSFER OBJECT

Para criar um DTO (Data Transfer Object) utilizando class-validator e class-transformer para validar os dados de users, siga os passos abaixo:

Passo 1: Instalar as Dependências
Se você ainda não instalou as dependências class-validator e class-transformer, faça isso com o seguinte comando:

npm install class-validator class-transformer

Passo 2: Criar um DTO de Users
Crie um arquivo para o DTO dentro da pasta users. Vamos chamar de create-user.dto.ts. Esse arquivo vai definir a estrutura dos dados que você espera receber em uma requisição, junto com as regras de validação.

Exemplo de um DTO para criação de usuário (CreateUserDto):

import { IsString, IsInt, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateUserDto {
@IsString()
@MinLength(2)
@MaxLength(20)
readonly name: string;

@IsEmail()
readonly email: string;

@IsInt()
@IsOptional()
readonly age?: number;
}

Explicação dos Decoradores

@IsString(): Valida se o valor é uma string.
@MinLength(2): Valida se a string tem pelo menos 2 caracteres.
@MaxLength(20): Valida se a string tem no máximo 20 caracteres.
@IsEmail(): Valida se o valor é um e-mail válido.
@IsInt(): Valida se o valor é um número inteiro.
@IsOptional(): Indica que o campo é opcional.

Passo 3: Usar o DTO no Controlador
Agora, no seu controlador (users.controller.ts), você deve usar o DTO para validar os dados da requisição. Quando você define o tipo do parâmetro como CreateUserDto, o Nest.js automaticamente valida os dados antes de passar para o método do controlador:

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

Passo 4: Habilitar o ValidationPipe
Certifique-se de que o ValidationPipe está habilitado globalmente, como mencionado anteriormente. Isso garantirá que todas as requisições que passam pelos DTOs sejam validadas:

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new ValidationPipe());
await app.listen(3000);
}
bootstrap();

Passo 5: Personalizar a resposta de erro de validação para retornar no formato que você especificou, você pode criar um ValidationPipe customizado usando a opção exceptionFactory.

app.useGlobalPipes(new ValidationPipe({
exceptionFactory: (errors: ValidationError[]) => {
const errorDescriptions = errors.map(error => {
const constraints = Object.values(error.constraints).join(', ');
return `${error.property}: ${constraints}`;
});

      return new BadRequestException({
        error_code: 'INVALID_DATA',
        error_description: `Os dados fornecidos no corpo da requisição são inválidos: ${errorDescriptions.join('; ')}`,
      });
    },

}));

exceptionFactory: A função exceptionFactory permite personalizar a exceção lançada pelo ValidationPipe.

ValidationError[]: O ValidationPipe passa uma lista de ValidationError que contém detalhes sobre os erros de validação.

Customização da Mensagem: Dentro da exceptionFactory, você pode formatar a mensagem de erro conforme necessário. Aqui, estamos criando uma mensagem que inclui um error_code e um error_description que contém a descrição do erro.

{
"statusCode": 400,
"message": {
"error_code": "INVALID_DATA",
"error_description": "Os dados fornecidos no corpo da requisição são inválidos: image must be a base64 string; measure_uuid must be a UUID"
}
}

Lista de outros decoradores úteis do class-validator que você pode utilizar para validar dados no Nest.js:

Validação Geral:

@IsBoolean(): Valida se o valor é um booleano (true ou false).
@IsBoolean()
isActive: boolean;

@IsNumber(): Valida se o valor é um número.
@IsNumber()
age: number;

@IsArray(): Valida se o valor é um array.
@IsArray()
tags: string[];

@IsEnum(): Valida se o valor pertence a um enum.
enum MeasureType {
WATER = 'WATER',
GAS = 'GAS',
}
@IsEnum(MeasureType)
measureType: MeasureType;

@IsDate(): Valida se o valor é uma data (Date).
@IsDate()
birthDate: Date;

@IsUrl(): Valida se o valor é uma URL válida.
@IsUrl()
website: string;

@IsUUID(): Valida se o valor é um UUID válido.
@IsUUID()
id: string;

Validação de Strings:

@IsNotEmpty(): Valida se o valor não está vazio.
@IsNotEmpty()
title: string;

@IsOptional(): Indica que a propriedade é opcional (não precisa estar presente no objeto validado).
@IsOptional()
description?: string;

@IsPhoneNumber(): Valida se o valor é um número de telefone válido. Aceita um código de região como parâmetro opcional.
@IsPhoneNumber('BR') // Para validar um número de telefone do Brasil
phoneNumber: string;

@IsCreditCard(): Valida se o valor é um número de cartão de crédito válido.
@IsCreditCard()
creditCardNumber: string;

@IsJSON(): Valida se o valor é uma string JSON válida.
@IsJSON()
data: string;

@IsIP(): Valida se o valor é um endereço IP válido. Pode ser 4 ou 6 para especificar a versão do IP.
@IsIP('4')
ipAddress: string;

Validação de Números:

@Min(): Valida se o valor é maior ou igual ao valor mínimo.
@Min(18)
age: number;

@Max(): Valida se o valor é menor ou igual ao valor máximo.
@Max(100)
age: number;

@IsPositive(): Valida se o valor é um número positivo.
@IsPositive()
amount: number;

@IsNegative(): Valida se o valor é um número negativo.
@IsNegative()
debt: number;

@IsLatitude(): Valida se o valor é uma latitude válida.
@IsLatitude()
latitude: number;

@IsLongitude(): Valida se o valor é uma longitude válida.
@IsLongitude()
longitude: number;

Validação de Objetos e Arrays:

@ValidateNested(): Valida propriedades aninhadas que são objetos.
@ValidateNested()
address: AddressDto;

@ArrayMinSize(): Valida se o array tem no mínimo o tamanho especificado.
@ArrayMinSize(1)
tags: string[];

@ArrayMaxSize(): Valida se o array tem no máximo o tamanho especificado.
@ArrayMaxSize(10)
tags: string[];

@ArrayNotEmpty(): Valida se o array não está vazio.
@ArrayNotEmpty()
items: string[];

@IsIn(): Valida se o valor está em um array de valores permitidos.
@IsIn(['admin', 'user', 'guest'])
role: string;

Validação Customizada:

@Validate(): Permite criar validações customizadas.
typescript
Copiar código
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomTextLength implements ValidatorConstraintInterface {
validate(text: string) {
return text.length > 1 && text.length < 10;
}

defaultMessage() {
return 'Text length should be between 1 and 10 characters';
}
}

export class CreateTextDto {
@Validate(CustomTextLength)
text: string;
}

Essa lista cobre uma ampla gama de casos de validação que podem ser úteis em diferentes cenários dentro de uma aplicação Nest.js.

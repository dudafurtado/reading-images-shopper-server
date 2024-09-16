# Tratamento de Erro no Nest.js

Essas exceções são úteis para tratar diferentes cenários de erros em uma aplicação Nest.js e para fornecer mensagens de erro claras e consistentes aos clientes da API.

## ConflictException (409)

Usado quando há um conflito de dados, como tentar criar um recurso que já existe.

```bash
import { ConflictException } from '@nestjs/common';

throw new ConflictException({
  error_code: 'DOUBLE_REPORT',
  error_description: 'Já existe uma leitura para este tipo no mês atual',
});
```

## BadRequestException (400)

Usado para indicar que a requisição do cliente é inválida.

```bash
import { BadRequestException } from '@nestjs/common';

throw new BadRequestException({
  error_code: 'INVALID_DATA',
  error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
});
```

## NotFoundException (404)

Usado quando o recurso solicitado não é encontrado.

```bash
import { NotFoundException } from '@nestjs/common';

throw new NotFoundException({
  error_code: 'MEASURES_NOT_FOUND',
  error_description: 'Nenhuma leitura encontrada',
});
```

## UnauthorizedException (401)

Usado para indicar que o cliente não está autenticado ou que a autenticação falhou.

```bash
import { UnauthorizedException } from '@nestjs/common';

throw new UnauthorizedException({
  error_code: 'UNAUTHORIZED',
  error_description: 'Usuário não autenticado',
});
```

## ForbiddenException (403)

Usado quando o cliente não tem permissão para acessar o recurso solicitado.

```bash
import { ForbiddenException } from '@nestjs/common';

throw new ForbiddenException({
  error_code: 'FORBIDDEN',
  error_description: 'Você não tem permissão para acessar este recurso',
});
```

## InternalServerErrorException (500)

Usado para indicar que ocorreu um erro inesperado no servidor.

```bash
import { InternalServerErrorException } from '@nestjs/common';

throw new InternalServerErrorException({
  error_code: 'INTERNAL_SERVER_ERROR',
  error_description: 'Ocorreu um erro inesperado no servidor',
});
```

## ServiceUnavailableException (503)

Usado quando um serviço externo ou dependência está indisponível.

```bash
import { ServiceUnavailableException } from '@nestjs/common';

throw new ServiceUnavailableException({
  error_code: 'SERVICE_UNAVAILABLE',
  error_description: 'O serviço está temporariamente indisponível',
});
```

## GatewayTimeoutException (504)

Usado quando uma dependência externa não responde dentro do tempo esperado.

```bash
import { GatewayTimeoutException } from '@nestjs/common';

throw new GatewayTimeoutException({
  error_code: 'GATEWAY_TIMEOUT',
  error_description: 'O tempo de resposta da API externa esgotou',
});
```

## UnprocessableEntityException (422)

Usado quando a requisição está correta, mas os dados não podem ser processados.

```bash
import { UnprocessableEntityException } from '@nestjs/common';

throw new UnprocessableEntityException({
  error_code: 'UNPROCESSABLE_ENTITY',
  error_description: 'Os dados fornecidos não podem ser processados',
});
```

## BadGatewayException (502)

Usado quando o servidor, ao atuar como gateway ou proxy, recebe uma resposta inválida de um servidor upstream.

```bash
import { BadGatewayException } from '@nestjs/common';

throw new BadGatewayException({
  error_code: 'BAD_GATEWAY',
  error_description: 'Falha ao processar a resposta do servidor externo',
});
```

### Resumo

- **ConflictException (409):** Conflito de dados.
- **BadRequestException (400):** Requisição inválida.
- **NotFoundException (404):** Recurso não encontrado.
- **UnauthorizedException (401):** Falha de autenticação.
- **ForbiddenException (403):** Falta de permissão.
- **InternalServerErrorException (500):** Erro inesperado no servidor.
- **ServiceUnavailableException (503):** Serviço indisponível.
- **GatewayTimeoutException (504):** Tempo de resposta excedido.
- **UnprocessableEntityException (422):** Dados não processáveis.
- **BadGatewayException (502):** Resposta inválida de um servidor upstream.

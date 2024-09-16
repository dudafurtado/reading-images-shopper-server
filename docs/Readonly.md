# READONLY

Em TypeScript, a palavra-chave readonly é usada para definir uma propriedade de um objeto que só pode ser atribuída durante a sua inicialização. Isso significa que, uma vez que a propriedade foi atribuída um valor, esse valor não pode ser alterado.

```bash
class User {
  readonly id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  const user = new User(1, 'Alice');

  // Isso funciona
  console.log(user.id); // 1

  // Isso não é permitido e causará um erro de compilação
  user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.
}
```

## Uso

Isso pode ser particularmente útil em objetos que são passados como argumentos para funções, onde você deseja garantir que os dados originais não sejam modificados.

### Imutabilidade

Readonly é útil para garantir que certos valores, como IDs, permanecem imutáveis após serem atribuídos.

### Segurança do código

A utilização de readonly ajuda a prevenir modificações acidentais em propriedades que não deveriam ser alteradas após a criação do objeto.

# DOCKER

É uma plataforma que permite criar, implantar e executar aplicações dentro de "containers". Containers são como máquinas virtuais leves que empacotam uma aplicação e todas as suas dependências, como bibliotecas, ferramentas e configurações, em um ambiente isolado. Isso garante que a aplicação funcione da mesma forma em qualquer ambiente, seja no seu computador, em um servidor ou na nuvem.

Docker facilita a criação de ambientes consistentes para rodar sua aplicação. Ele pode ser usado com qualquer banco de dados, inclusive dockerizando o banco. Docker é compatível com Prisma, e ambos podem ser usados juntos para gerenciar o banco de dados dentro de um container.

## Como o Docker funciona

### Containers

São ambientes isolados que contêm tudo o que sua aplicação precisa para rodar, como código, dependências e variáveis de ambiente. Eles são criados a partir de uma imagem Docker.

### Imagens Docker

São "blueprints" ou "modelos" para containers. Elas contêm todas as informações necessárias para criar um container, como o sistema operacional, dependências e o código da aplicação.

### Dockerfile

É um arquivo de configuração onde você define passo a passo como criar a imagem Docker para a sua aplicação.

### Docker Compose

É uma ferramenta que permite definir e gerenciar aplicações multi-container. Você cria um arquivo docker-compose.yml onde especifica como os containers da sua aplicação interagem, por exemplo, um container para a aplicação e outro para o banco de dados.

## Passo a Passo para Instalar o Docker no Pop!\_OS

Primeiro, certifique-se de que sua lista de pacotes está atualizada:

`sudo apt update`

Instale alguns pacotes que são necessários para adicionar novos repositórios:

`sudo apt install apt-transport-https ca-certificates curl software-properties-common`

Adicione a chave GPG oficial do Docker para verificar a integridade dos pacotes:

`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`

Adicione o repositório oficial do Docker à sua lista de repositórios:

`sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`

Após adicionar o repositório, atualize a lista de pacotes novamente:

`sudo apt update`

Instale o Docker e o Docker Compose com o seguinte comando:

`sudo apt install docker-ce docker-ce-cli containerd.io`

Verifique se o Docker está instalado corretamente e se o serviço está rodando:

`sudo systemctl status docker`

Você deve ver uma mensagem indicando que o Docker está ativo e funcionando.

Para usar o Docker sem precisar de sudo, adicione seu usuário ao grupo docker:

`sudo usermod -aG docker $USER`

Nota: Você precisará sair e entrar novamente para que as mudanças tenham efeito.

Verifique a Instalação do Docker: Para confirmar que o Docker foi instalado corretamente, execute:

`docker --version`

E para testar se o Docker está funcionando corretamente:

`docker run hello-world`

### Instale o Docker Compose

O Docker Compose é uma ferramenta que permite definir e executar aplicativos Docker multi-contêiner. Para instalar o Docker Compose, execute:

`sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`

Em seguida, torne o binário executável:

`sudo chmod +x /usr/local/bin/docker-compose`

Verifique a instalação do Docker Compose:

`docker-compose --version`

Pronto! Agora o Docker e o Docker Compose estão instalados e configurados no seu sistema Pop!\_OS.

## Baixe o Docker Desktop

Execute este comando para baixar o arquivo .deb:

`wget https://desktop.docker.com/linux/main/amd64/docker-desktop-4.22.0-amd64.deb`

Após o download, instale o Docker Desktop com:

`sudo dpkg -i docker-desktop-4.22.0-amd64.deb`

Caso ocorram erros relacionados a dependências, execute:

`sudo apt-get install -f`

Depois da instalação, inicie o Docker Desktop a partir do menu de aplicativos ou execute:

`docker-desktop`

## Passos para Dockerizar sua Aplicação

### 1. Instalação do Docker

<https://www.docker.com/>

### 2. Criar um Dockerfile

O Dockerfile é um script com uma série de comandos que dizem ao Docker como criar uma imagem para sua aplicação.

#### O Que Deve Ter no Dockerfile

Base Image: Define a imagem base que será usada para criar o container (FROM).
Working Directory: Define o diretório de trabalho dentro do container (WORKDIR).
Copy Files: Copia arquivos para dentro do container (COPY).
Install Dependencies: Instala dependências necessárias (RUN).
Expose Port: Expõe a porta em que a aplicação vai rodar (EXPOSE).
Run Command: Define o comando a ser executado quando o container iniciar (CMD ou ENTRYPOINT).

#### Aqui está um exemplo básico de um Dockerfile para uma aplicação Node.js

Use uma imagem base do Node.js
`FROM node:14`

Defina o diretório de trabalho no container
`WORKDIR /app`

Copie o package.json e o package-lock.json para o diretório de trabalho
`COPY package\*.json ./`

Instale as dependências da aplicação
`RUN npm install`

Copie o restante do código da aplicação
`COPY . .`

Exponha a porta que a aplicação irá rodar
`EXPOSE 3000`

Comando para iniciar a aplicação
`CMD ["npm", "start"]`

#### Dicas

Multistage Builds: Use builds múltiplos para separar a construção do código e a execução final. Isso ajuda a manter a imagem final mais leve.

Keep it Small: Tente manter o Dockerfile e a imagem resultante o menor possível, copiando apenas o que é necessário e removendo arquivos temporários.

Construir a Imagem Docker: Com o Dockerfile configurado, você pode criar uma imagem da sua aplicação usando o seguinte comando:

`docker build -t minha-aplicacao .`

Esse comando cria uma imagem chamada minha-aplicacao usando as instruções no Dockerfile.

Rodar um Container: Depois de criar a imagem, você pode rodar um container usando essa imagem:

`docker run -p 3000:3000 minha-aplicacao`

Isso cria e inicia um container baseado na imagem minha-aplicacao e mapeia a porta 3000 do container para a porta 3000 no host.

Criar o arquivo docker-compose.yml: O docker-compose.yml é usado para definir e gerenciar múltiplos containers como um serviço. Aqui está um exemplo de um docker-compose.yml básico:

`version: '3'
services:
app:
build: .
ports: - "3000:3000"
volumes: - .:/app
environment:
NODE_ENV: development`

Esse arquivo define um serviço chamado app que é construído usando o Dockerfile na raiz do projeto. Ele mapeia a porta 3000 do container para a porta 3000 do host e monta o diretório atual (.) dentro do container em /app.

Subir os Serviços com Docker Compose: Agora, para iniciar sua aplicação e qualquer outro serviço definido no docker-compose.yml, você só precisa executar:

`docker-compose up`

Isso construirá a imagem, se necessário, e iniciará todos os containers definidos.

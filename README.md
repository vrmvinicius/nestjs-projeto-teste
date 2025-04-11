# Projeto NestJS - Sistema de Gerenciamento de Clientes

Este projeto implementa um sistema de gerenciamento de clientes utilizando NestJS com uma arquitetura limpa e orientada a domínio.

## Estrutura do Projeto

O projeto segue os princípios de Domain-Driven Design (DDD) e Command Query Responsibility Segregation (CQRS), organizando o código em camadas bem definidas:

- **Entidades de Domínio**: Representam os conceitos principais do negócio
- **Value Objects**: Encapsulam valores com regras de validação específicas
- **Commands**: Implementam operações que alteram o estado do sistema
- **Queries**: Implementam operações de consulta sem efeitos colaterais

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações server-side em Node.js
- **MikroORM**: ORM para persistência de dados
- **SQLite**: Banco de dados relacional leve
- **class-validator**: Biblioteca para validação de dados
- **CQRS**: Padrão para separação de responsabilidades entre comandos e consultas

## Funcionalidades Implementadas

### Gerenciamento de Clientes

- **Cadastro de Cliente**: Permite criar novos clientes com validação de dados
- **Atualização de Cliente**: Permite atualizar informações de clientes existentes
- **Consulta de Cliente**: Permite buscar clientes por ID ou listar todos os clientes
- **Desativação de Cliente**: Permite marcar um cliente como inativo

### Validações Implementadas

- Validação de formato de e-mail
- Validação de formato de telefone
- Verificação de unicidade de e-mail
- Validação de tamanho de campos

## Estrutura de Dados

### Cliente

- **ID**: Identificador único do cliente
- **Nome**: Nome do cliente (até 100 caracteres)
- **Email**: Endereço de e-mail único (até 150 caracteres)
- **Telefone**: Número de telefone (até 20 caracteres)
- **Ativo**: Indica se o cliente está ativo
- **Data de Cadastro**: Data em que o cliente foi cadastrado

## Como Executar o Projeto

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run start:dev

# Executar em modo de produção
npm run start:prod
```

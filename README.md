# 🚀 Projeto 1: To-Do List Full Stack (Java + React)

Um aplicativo clássico de lista de tarefas (To-Do List) construído com uma arquitetura robusta e moderna, focada em boas práticas de desenvolvimento backend (Spring Boot) e frontend (React com TypeScript).

Este projeto serve como a fundação do meu roadmap, demonstrando domínio em APIs RESTful, persistência de dados com JPA e gerenciamento de estado no frontend.

![[Screenshot do App]]()

---

## 🛠️ Stack de Tecnologias

Este projeto é dividido em duas partes principais, contidas nas pastas `/backend` e `/frontend`.

### Backend (Pasta `/backend`)
* **Java 17**
* **Spring Boot 3:** Para a criação da API RESTful.
* **Spring Data JPA:** Para persistência de dados.
* **PostgreSQL:** Banco de dados relacional.
* **Lombok:** Para redução de código boilerplate.
* **Maven:** Gerenciador de dependências.
* **JUnit 5 / Mockito:** Para testes unitários e de integração.

### Frontend (Pasta `/frontend`)
* **React 18**
* **TypeScript:** Para tipagem estática e segurança no desenvolvimento.
* **Vite:** Build tool de frontend moderna e rápida.
* **Zustand:** Gerenciamento de estado leve e moderno.
* **Axios:** Para chamadas à API REST.

### Infraestrutura
* **Docker** e **Docker Compose:** Para containerizar e orquestrar a aplicação completa (Backend, Frontend e Banco de Dados) com um único comando.

---

## ✨ Recursos Principais (Features)

* **CRUD Completo** de Tarefas (Criar, Ler, Atualizar, Deletar).
* **Validação de Dados** no backend (ex: `title` obrigatório, `priority` válida).
* **Gerenciamento de Prioridade** (LOW, MEDIUM, HIGH).
* **Marcar Tarefas** como completas/pendentes (via `PATCH`).
* **Tratamento de Erros** robusto com um `GlobalExceptionHandler` (retornando 400, 404 e 500 de forma amigável).

---

## 🏛️ Arquitetura (Decisões de Design)

O design deste projeto foca na separação clara de responsabilidades, seguindo padrões de mercado.

1.  **Arquitetura em 3 Camadas (Backend):**
    * **`Controller`:** Responsável por expor os endpoints REST, receber DTOs e lidar com respostas HTTP.
    * **`Service`:** Onde mora a lógica de negócio (ex: como criar ou atualizar uma tarefa). Programado para a interface (`TaskService`) para desacoplamento.
    * **`Repository`:** Camada de acesso a dados, usando Spring Data JPA.

2.  **Padrão DTO (Data Transfer Object):**
    * A API não expõe a entidade do banco (`Task.java`) diretamente.
    * Usamos DTOs (ex: `TaskCreateUpdateDTO`, `TaskResponseDTO`) para validar entradas e formatar saídas, garantindo uma API segura e estável.

3.  **Ambiente Containerizado:**
    * A aplicação inteira (backend, frontend e DB) é gerenciada pelo `docker-compose.yml`.
    * O frontend é servido por um container **Nginx** otimizado para produção.

---

## 🚀 DEV LOG

Caso queira saber como foi o desenvolvimento do projeto, abaixo descrevo um pouco dos desafios que enfrentei. (PS. Podem haver situações relativamente bobas, mas sem julgamentos, viu?)

Backend [Clique aqui](/backend/DEV_LOG.md)

---

## 🚀 Como Rodar o Projeto

Você pode rodar este projeto de duas formas. A mais fácil e recomendada é usando o Docker.

### 1. A Forma Fácil (Docker - Recomendado)
Este método sobe o banco de dados, o backend e o frontend de uma vez.

**Pré-requisitos:**
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando.

**Passos:**
1.  Clone este repositório:
    ```bash
    git clone [https://seu-link-do-repo.git](https://seu-link-do-repo.git)
    ```
2.  Navegue até a pasta deste projeto:
    ```bash
    cd nome-do-repo/projeto-1
    ```
3.  Execute o Docker Compose (o `--build` é necessário na primeira vez):
    ```bash
    docker-compose up --build
    ```
4.  Pronto!
    * O frontend estará acessível em: `http://localhost:3000`
    * A API do backend estará acessível em: `http://localhost:8080`

### 2. A Forma Manual (Desenvolvimento Local)

Se preferir rodar cada parte separadamente (sem Docker).

**Pré-requisitos:**
* Java 17 (JDK)
* Node.js v18+
* Um banco PostgreSQL rodando manualmente em `localhost:5432` com as credenciais do `application.properties`.

**Passo 1: Rodar o Backend**
```bash
# Navegue até a pasta do backend
cd projeto-1/backend

# Instale as dependências e rode
mvn spring-boot:run
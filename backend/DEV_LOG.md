# 📖 Diário de Bordo: Projeto To-Do List

Este arquivo documenta os principais desafios, erros e decisões de arquitetura tomadas durante o desenvolvimento do Projeto To-Do List.

## Desafio 1: Erro de Autenticação do PostgreSQL no Docker

**Problema:**
Logo no início, ao tentar rodar o backend (`docker-compose up`), a aplicação Spring Boot falhava ao iniciar com o erro: `FATAL: autenticação do tipo password falhou para usuário "admin"`.

**Investigação:**
* Verifiquei os arquivos `application.properties` (no Spring) e `docker-compose.yml` (no Docker) e as credenciais (`admin`/`password`) pareciam idênticas.
* Após um "reset nuclear" (`docker-compose down -v`), o erro persistia.

**Solução:**
1.  Destruir o volume de dados antigo e persistido do Docker (que continha o usuário errado) com o comando `docker-compose down -v`.
2.  Alterei a porta padrão do banco no `application.properties` e no `docker-compose.yml` 
3.  Subir os containers novamente.

**Aprendizado:** Volumes do Docker persistem dados *mesmo após* a correção do `docker-compose.yml`. O comando `down -v` é essencial para "resetar" o estado do banco.

---

## Desafio 2: Erro `Circular view path [tasks]`

**Problema:**
Ao fazer um `POST` para `/tasks`, o Spring retornava um erro 500 com a mensagem `Circular view path [tasks]`.

**Investigação:**
* O erro indicava que o Spring estava tentando renderizar uma *view* (uma página HTML) chamada "tasks", em vez de retornar JSON.
* Isso me levou a revisar as anotações do meu `TaskController`. Eu estava usando a anotação `@Controller` por engano.

**Solução:**
* Substituir `@Controller` por **`@RestController`**.
* A anotação `@RestController` é a correta para APIs REST, pois ela automaticamente combina `@Controller` e `@ResponseBody`, dizendo ao Spring para converter o objeto de retorno em JSON.

**Aprendizado:** A diferença fundamental entre as anotações de controle do Spring e como o framework decide entre renderizar uma *view* ou retornar *dados*.

---

## Desafio 3: Erro `java: cannot find symbol: method setTitle`

**Problema:**
O código não compilava na minha IDE (IntelliJ). A IDE não encontrava métodos básicos como `setTitle` ou `getDescription` na minha entidade `Task.java`, mesmo ela estando anotada com `@Data` do Lombok.

**Investigação:**
* O código estava correto. A dependência do Lombok estava no `pom.xml`.
* O problema não era o código, mas a **configuração da IDE**.

**Solução:**
* O IntelliJ precisa de um plugin específico para "entender" as anotações do Lombok e seus métodos gerados.
* **No IntelliJ:** Foi necessário instalar o plugin "Lombok" e habilitar o "Annotation Processing" nas configurações (`Settings > Build, Execution, Deployment > Compiler > Annotation Processors`).

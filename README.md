# TO DO LIST APPLICATION

Está é uma aplicação React para gerênciamento de tarefas. Ela utiliza Chakra UI como biblioteca de componentes, React Hook Form e Yup para validação de formulários, e JSON Server para simular uma API. A autenticação é gerenciada pelo Auth0.

## Configuração do Auth0

1. Crie uma conta no [Auth0](https://auth0.com/) se ainda não tiver uma.

2. No dashboard do Auth0, crie uma nova aplicação:

   - Clique em "Applications" no menu lateral.
   - Clique em "Create Application".
   - Dê um nome à sua aplicação.
   - Selecione "Single Page Web Applications" como tipo de aplicação.
   - Clique em "Create".

3. Na página de configurações da aplicação:

   - Em "Allowed Callback URLs", adicione `http://localhost:5173/`.
   - Em "Allowed Logout URLs", adicione `http://localhost:5173/`.
   - Em "Allowed Web Origins", adicione `http://localhost:5173/`.
   - Se a aplicação rodar em uma porta diferente, substitua 5173 pela porta correta.
   - Salve as alterações.

4. Anote o "Domain" e "Client ID" fornecidos na página de configurações.

Para mais detalhes sobre a configuração do Auth0, consulte a [documentação oficial](https://auth0.com/docs/quickstart/spa/react).

## Configuração do Projeto

1. Clone o repositório do projeto.

2. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   `VITE_AUTH0_DOMAIN=seu_dominio_auth0`
   `VITE_AUTH0_CLIENT_ID=seu_client_id_auth0`

Substitua `seu_dominio_auth0` e `seu_client_id_auth0` pelos valores obtidos no dashboard do Auth0.

3. Instale as dependências:

`npm install`

## Executando a Aplicação

Para iniciar a aplicação e o servidor JSON simultaneamente, execute:

`npm run dev`

Isso iniciará o servidor de desenvolvimento React e o JSON Server em concorrência.

## Executando os Testes

Para rodar os testes unitários:

`npm run test`

Para gerar um relatório de cobertura de testes:

`npm run test:coverage`

## Recursos Adicionais

- [Documentação do Chakra UI](https://chakra-ui.com/docs/getting-started)
- [Documentação do React Hook Form](https://react-hook-form.com/get-started)
- [Documentação do Yup](https://github.com/jquense/yup)
- [Documentação do JSON Server](https://github.com/typicode/json-server)

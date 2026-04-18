<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Regras do Projeto (next-oculos)

## Arquitetura e Backend

1. O backend deve ser implementado usando Route Handlers do Next.js em `app/api/**`.
2. Não criar servidor backend separado (ex.: Express, Nest, Fastify) para o MVP.
3. Toda regra de negocio deve ficar em camadas reutilizaveis (ex.: `services/**` e `lib/**`), evitando logica complexa direto nas rotas.
4. Rotas devem seguir contratos claros de request/response em JSON e validar entrada antes de processar.

## Banco e Modelagem

1. Prisma e PostgreSQL sao o padrao oficial do projeto.
2. PostgreSQL local deve rodar em Docker (preferencialmente via `docker compose`) para padronizar o ambiente entre desenvolvedores.
3. Mudancas de schema devem gerar migracoes versionadas e rastreaveis.
4. Nomear modelos/campos com clareza para refletir o dominio: usuario, loja, solicitacao, orcamento, mensagem, notificacao.

## Produto e Escopo (MVP)

1. Priorizar fluxo principal: autenticacao, solicitacoes, orcamentos, chat simples e historico.
2. Evitar implementar agora itens fora do MVP: pagamento na plataforma, ranking complexo e catalogo avancado.
3. Sempre otimizar para entrega incremental e testavel ponta a ponta.

## Qualidade e Desenvolvimento

1. Antes de codar ou alterar API/comportamento, consultar docs locais do Next em `node_modules/next/dist/docs/`.
2. Sempre que possivel, criar codigo orientado a tipos com TypeScript estrito.
3. Manter funcoes pequenas, nomes descritivos e baixo acoplamento entre modulos.
4. Em features novas, incluir validacoes e tratamento de erros com mensagens objetivas.
5. Evitar criar `function foo(){}` fora do componente quando a função é usada somente por ele. Prefira declarar helpers dentro do componente como `const foo = () => {}`.
5. Em formularios, usar `useForm()` (ex.: react-hook-form) sempre que possivel, evitando estado manual com `useState`.
6. Sempre que possível, `page.tsx` deve ser SSR (Server Component) por padrão. Se precisar de `"use client"`, criar um componente separado com `"use client"` e importá-lo na `page.tsx`.

## Testes E2E (Cypress)

1. O padrao oficial para testes end-to-end e Cypress.
2. Componentes importantes para fluxo e2e (ex.: `input`, `button`, `select`, `textarea`, links de acao e elementos de feedback) devem usar `data-testid`.
3. O atributo deve ser estavel e sem depender de texto visivel, estilo CSS ou estrutura de DOM.
4. Convencao recomendada para nomes: `contexto-elemento-acao` (ex.: `login-email-input`, `login-submit-button`, `quote-send-button`).
5. Em refatoracoes de UI, preservar os `data-testid` existentes para evitar quebra dos testes.

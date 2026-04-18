# 🧠 Plataforma de Orçamentos para Óticas

## 📌 Visão Geral

Plataforma online que conecta **clientes com receita oftalmológica** a **lojas de óculos**, permitindo que:

* Clientes publiquem suas receitas
* Lojas enviem orçamentos (lances)
* Cliente escolha a melhor proposta

👉 Modelo semelhante a um marketplace de serviços sob demanda.

---

## 🎯 Proposta de Valor

### 👤 Para Clientes

* Comparar preços facilmente
* Receber múltiplos orçamentos
* Escolher com base em preço, avaliação e atendimento

### 🏪 Para Lojas

* Receber leads qualificados
* Aumentar vendas
* Competir com outras lojas da região

---

## 🔄 Fluxo Principal

### Cliente

1. Cadastro/Login
2. Define região (CEP/cidade)
3. Envia receita (imagem/PDF)
4. Cria solicitação de orçamento
5. Recebe propostas
6. Conversa via chat
7. Escolhe uma loja
8. Fecha fora da plataforma (MVP)
9. Avalia serviço

---

### Loja

1. Cadastro/Login
2. Cria perfil da loja
3. Define região de atendimento
4. Recebe notificações
5. Visualiza receita
6. Envia orçamento
7. Conversa com cliente
8. Fecha venda
9. Recebe avaliação

---

## 🧱 Módulos do Sistema

### 🔐 Autenticação

* Login/Cadastro
* Perfis: `cliente` e `loja`

---

### 🧾 Solicitações (Receitas)

* Upload de receita
* Campos:

  * grau
  * tipo de lente (opcional)
  * observações
* Status:

  * aberta
  * em negociação
  * finalizada

---

### 💰 Orçamentos (Lances)

* Loja informa:

  * preço
  * prazo
  * observações
* Cliente:

  * aceita
  * recusa
  * negocia

---

### 💬 Chat

* Comunicação cliente ↔ loja
* Contexto da solicitação
* Histórico persistido

---

### 🔔 Notificações

* Nova solicitação
* Novo orçamento
* Nova mensagem
* Atualizações

---

### ⭐ Avaliações

* Nota (1 a 5)
* Comentário
* Afeta reputação da loja

---

### 🛍️ Catálogo da Loja

* Galeria de armações
* Preços opcionais

---

### 📊 Histórico

#### Cliente

* Solicitações
* Compras

#### Loja

* Propostas
* Vendas

---

## 🚀 MVP (Primeira Versão)

### ✔️ Incluir:

* Login (cliente + loja)
* Criar solicitação com receita
* Notificar lojas por região
* Envio de orçamento
* Aceite/Rejeição
* Chat simples
* Histórico básico

### ❌ Não incluir ainda:

* Pagamento na plataforma
* Catálogo avançado
* Sistema de avaliação completo

---

## 💡 Evoluções Futuras

* IA para leitura automática de receita
* Geolocalização automática
* Pagamentos integrados
* Sistema de entrega
* Ranking de lojas
* App mobile

---

## ⚠️ Pontos Críticos

### Qualidade das lojas

* Validação de CNPJ
* Aprovação manual

---

### Guerra de preços

* Sistema de reputação
* Destaque por avaliação

---

### Receita inválida

* Validação mínima
* Instruções claras

---

### Fechamento fora da plataforma

* Aceitável no MVP
* Futuro: incentivo para manter dentro

---

## 🧩 Arquitetura Técnica

### 🖥️ Stack Principal

* **Frontend + Backend:** Next.js (App Router)
* **ORM:** Prisma
* **Banco de Dados:** PostgreSQL

---

### 📦 Estrutura Sugerida (Next.js)

```
/app
  /api
    /auth
    /requests
    /quotes
    /chat
    /notifications

  /(auth)
    /login
    /register

  /(dashboard)
    /client
    /store

/lib
  prisma.ts
  auth.ts

/services
  request.service.ts
  quote.service.ts
  chat.service.ts
```

---

### 🔌 Backend (Next.js API Routes)

* CRUD de usuários
* Solicitações
* Orçamentos
* Chat
* Notificações

---

### 💬 Realtime

* WebSocket (Socket.io ou Pusher)
* Usado para:

  * chat
  * notificações

---

### 🗄️ Banco de Dados (Prisma - visão inicial)

Principais entidades:

* User
* Store
* Request (Solicitação)
* Quote (Orçamento)
* Message (Chat)
* Notification
* Review

---

## 🧠 Conceito do Produto

👉 **Marketplace de Óticas Sob Demanda**

---

## ⚙️ Estratégia de Desenvolvimento

* Usar IA para acelerar desenvolvimento
* Começar pelo backend (modelagem + APIs)
* Depois construir UI mínima funcional
* Iterar rápido no MVP

---

## 📌 Próximos Passos

1. Modelar banco com Prisma
2. Criar autenticação
3. Implementar fluxo de solicitação
4. Implementar envio de orçamentos
5. Adicionar chat básico
6. Testar fluxo completo

---

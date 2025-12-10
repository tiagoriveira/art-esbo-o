# Roadmap de Produto: SketchCoach

**Autor:** Manus AI (atuando como Product Manager)
**Data:** 10 de Dezembro de 2025

## 1. Visão do Produto

Construir a ferramenta **mais simples e direta** para que um iniciante em desenho possa transformar uma foto em um esboço e praticar de forma guiada. O sucesso é medido pela capacidade do usuário de sair da inércia e começar a desenhar em menos de 60 segundos.

## 2. Princípios Orientadores

1.  **KISS (Keep It Simple, Stupid):** Se uma feature não resolve o problema central, ela não entra. Focamos no caminho mais curto para o valor.
2.  **Ship Fast, Iterate:** Lançamos o mínimo viável para aprender com o uso real. A perfeição é inimiga do "pronto".
3.  **Backend como Serviço (BaaS):** Usamos Supabase para evitar gerenciamento de infraestrutura e acelerar o desenvolvimento.

---

## 3. Roadmap de Produto (Fases Enxutas)

O desenvolvimento será dividido em fases que entregam valor de forma incremental e independente.

### **Fase 1: O Protótipo Funcional (Client-Side MVP)**

**Objetivo:** Validar a proposta de valor principal com **zero backend** e **zero custo**. O produto deve funcionar 100% no navegador.

| Feature Essencial | Descrição | Status |
| :--- | :--- | :--- |
| **1. Upload de Imagem** | Usuário seleciona uma foto do seu dispositivo. | 🔴 Pendente |
| **2. Geração de Esboço Local** | A foto é processada no navegador (`Canvas API`) para criar um esboço simples. | 🔴 Pendente |
| **3. Visualização Comparativa** | A interface exibe a foto original e o esboço lado a lado. | 🟡 Parcial |
| **4. Guia Pedagógico Fixo** | Uma lista de 5 passos de desenho (hardcoded) é exibida. | 🟡 Parcial |

**Resultado esperado ao final da Fase 1:** Um usuário pode, de forma anônima, transformar uma foto em um esboço e seguir um guia estático. O produto já é útil e prova o conceito.

---

### **Fase 2: A Experiência Conectada (Supabase)**

**Objetivo:** Permitir que o usuário **salve seu trabalho** e tenha uma identidade mínima, criando a base para o reengajamento.

| Feature Essencial | Descrição | Status |
| :--- | :--- | :--- |
| **1. Autenticação Simples** | Login com email/senha ou um clique (Google/GitHub) via Supabase Auth. | 🔴 Pendente |
| **2. Salvamento de Projetos** | A imagem original e o esboço gerado são salvos no Supabase Storage. | 🔴 Pendente |
| **3. Galeria "Meus Esboços"** | Uma página simples que lista os projetos salvos do usuário. | 🔴 Pendente |

**Resultado esperado ao final da Fase 2:** O usuário não perde mais seu trabalho. Ele pode fechar o navegador, voltar e continuar de onde parou, criando o primeiro loop de retenção.

---

### **Fase 3: O Treinador Inteligente (IA Simples)**

**Objetivo:** Melhorar a **qualidade percebida** da feature principal (o esboço) com o mínimo de complexidade técnica.

| Feature Essencial | Descrição | Status |
| :--- | :--- | :--- |
| **1. Backend de Esboço** | Criar uma Supabase Edge Function que recebe uma imagem. | 🔴 Pendente |
| **2. Processamento Melhorado** | Na Edge Function, usar uma biblioteca (ex: `sharp`) para gerar um esboço de qualidade superior ao do Canvas API. | 🔴 Pendente |
| **3. Substituição Transparente** | O frontend agora chama essa função em vez de processar localmente. Para o usuário, a mágica simplesmente ficou melhor. | 🔴 Pendente |

**Resultado esperado ao final da Fase 3:** O produto se torna mais "mágico" e profissional, aumentando a satisfação do usuário e o valor percebido com um esforço de backend contido.

---

### **Fase 4: O Ciclo de Feedback (Engajamento)**

**Objetivo:** Fechar o ciclo de aprendizado, dando ao usuário uma sensação de **progresso e conquista**.

| Feature Essencial | Descrição | Status |
| :--- | :--- | :--- |
| **1. Notas de Prática** | Permitir que o usuário salve uma nota de texto simples para cada projeto (ex: "Tive dificuldade com a sombra do nariz"). | 🔴 Pendente |
| **2. Histórico Simples** | Mostrar a data de criação de cada projeto na galeria. | 🔴 Pendente |

**Resultado esperado ao final da Fase 4:** O SketchCoach evolui de uma simples "ferramenta" para um "diário de prática", incentivando o uso contínuo.

---

## 4. O Que NÃO Faremos (Por Enquanto)

Para manter o foco, as seguintes ideias estão **explicitamente fora do escopo** inicial:

*   Sistema de feedback sobre o desenho do usuário.
*   Canvas de desenho dentro do app.
*   Gamificação (badges, streaks, pontos).
*   Recursos sociais (comunidade, compartilhamento, curtidas).
*   Múltiplos estilos de esboço ou filtros complexos.
*   Planos de assinatura ou monetização.

Essas ideias podem ser reavaliadas **após** a conclusão e análise das 4 fases principais.

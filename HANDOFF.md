# Documento de Handoff – Projeto SketchCoach

**Data:** 10 de Dezembro de 2025
**Autor:** Manus AI

## 1. Visão Geral do Projeto

O objetivo do **SketchCoach** é criar uma ferramenta para auxiliar iniciantes em desenho a praticar e aprender. O sistema converte uma foto enviada pelo usuário em um esboço guiado e, em seguida, fornece um processo passo-a-passo para a prática do desenho, atuando como um "treinador visual".

Este documento detalha o estado atual do projeto frontend, compara a implementação com os requisitos funcionais e não funcionais, e estabelece um plano de ação para as funcionalidades pendentes.

## 2. Análise do Estado Atual vs. Requisitos

O projeto frontend foi iniciado com Vite, React e TypeScript, estabelecendo uma estrutura de navegação entre três telas principais: `UploadScreen`, `GenerateScreen` e `LearningScreen`. A interface do usuário (UI) foi construída para ser visualmente próxima ao design final, mas a lógica funcional principal ainda não foi implementada.

A seguir, uma análise detalhada comparando os Requisitos Funcionais (RF) com a implementação atual.

| Requisito | Descrição | Status | Análise e Gaps | Prioridade |
| :--- | :--- | :--- | :--- | :--- |
| **RF1.1** | Deve aceitar imagens (upload). | 🔴 **Pendente** | A UI para upload existe (`UploadScreen`), mas a lógica para capturar, processar e armazenar o arquivo (`File API`) não está implementada. A navegação é simulada. | **Alta** |
| **RF1.2** | Deve exibir imagem após upload. | 🔴 **Pendente** | O sistema não exibe a imagem do usuário. As telas `GenerateScreen` e `LearningScreen` utilizam imagens de exemplo (`hardcoded`). | **Alta** |
| **RF2.1** | Deve processar a imagem com detecção de bordas. | 🔴 **Pendente** | **Funcionalidade crítica ausente.** A lógica de conversão (grayscale, operador Sobel, inversão) em um `<canvas>` não foi implementada. | **Alta** |
| **RF2.2** | Deve exibir o esboço resultante. | 🔴 **Pendente** | A `GenerateScreen` exibe uma imagem de esboço estática, não o resultado do processamento da imagem do usuário. | **Alta** |
| **RF2.3** | Deve permitir download do esboço. | 🔴 **Pendente** | O botão "Export" existe na UI, mas não possui a funcionalidade para baixar a imagem do canvas. | **Média** |
| **RF2.4** | Deve permitir limpar/resetar o resultado. | 🔴 **Pendente** | Não há botão ou função de "Reset" na `GenerateScreen` para limpar o esboço e recomeçar. | **Baixa** |
| **RF3.1** | Deve gerar automaticamente cinco passos. | 🔴 **Pendente** | Os passos estão representados visualmente na `LearningScreen`, mas não são gerados dinamicamente. A estrutura de dados `Step[]` precisa ser criada. | **Média** |
| **RF3.2** | Deve exibir cada passo em lista. | 🟡 **Parcial** | A lista é exibida, mas de forma estática. A UI precisa ser conectada a um estado dinâmico (`steps` array). | **Média** |
| **RF3.3** | Deve permitir selecionar um passo. | 🔴 **Pendente** | A seleção de passo não é funcional. A UI não responde ao clique do usuário para mudar o `selectedStep`. | **Média** |
| **RF3.4** | Deve mostrar descrição detalhada do passo. | 🟡 **Parcial** | A UI mostra uma descrição estática. Precisa ser atualizada dinamicamente com base no `selectedStep`. | **Média** |
| **RF3.5** | Deve permitir "Iniciar exercício". | 🔴 **Pendente** | O botão existe na UI, mas não possui funcionalidade associada. | **Baixa** |
| **RF3.6** | Deve permitir "Salvar nota". | 🔴 **Pendente** | O campo de texto e o botão de salvar existem, mas a lógica para salvar a nota no estado não foi implementada. | **Baixa** |
| **RF4.1** | Deve separar visualmente áreas de imagem e guia. | 🟢 **Concluído** | A estrutura da UI com as áreas A, B e C está bem definida e implementada visualmente. | **N/A** |
| **RF4.2** | Deve permitir alternar dicas. | 🔴 **Pendente** | Não há um controle para "Mostrar/ocultar dicas" na `LearningScreen`. | **Baixa** |

## 3. Plano de Ação Sugerido

Para completar o desenvolvimento do protótipo funcional (local-first), a seguinte sequência de tarefas é recomendada, organizada por prioridade.

### Fase 1: Implementação do Core de Geração de Esboço

1.  **Implementar Lógica de Upload (RF1.1, RF1.2):**
    *   No `UploadScreen`, adicionar um `<input type="file">` invisível e ativá-lo com o clique na área de upload.
    *   Usar a `FileReader` API para ler o arquivo de imagem selecionado e criar uma `Data URL`.
    *   Armazenar a URL no estado global da aplicação (ex: Context API ou Zustand) como `originalImageURL`.
    *   Navegar para a `GenerateScreen` e passar a imagem para ser exibida como referência.

2.  **Implementar Processamento de Imagem (RF2.1, RF2.2):**
    *   Na `GenerateScreen`, criar um componente de `<canvas>` oculto.
    *   Ao carregar a tela, desenhar a `originalImageURL` no canvas.
    *   Implementar uma função `generateSketch` que:
        *   Obtém os dados de pixel do canvas (`getImageData`).
        *   Aplica os filtros: grayscale, operador Sobel para detecção de bordas e inversão de cores.
        *   Escreve os pixels modificados de volta no canvas (`putImageData`).
        *   Exporta o conteúdo do canvas para uma nova `Data URL` e a armazena no estado `sketchImageURL`.
    *   Exibir a `sketchImageURL` na área de visualização do esboço.

3.  **Implementar Controles do Esboço (RF2.3, RF2.4):**
    *   Conectar os sliders de "Complexidade", "Line Weight", etc., para que chamem a função `generateSketch` a cada alteração, permitindo o ajuste fino em tempo real.
    *   Implementar a função do botão "Export" para criar um link de download (`<a>`) com a `sketchImageURL`.

### Fase 2: Implementação do Guia Interativo

1.  **Estruturar Dados dos Passos (RF3.1):**
    *   Criar um array de objetos no arquivo `constants.ts` para armazenar os 5 passos pedagógicos, seguindo a estrutura `Step` definida nos requisitos.

2.  **Dinamizar a Lista de Passos (RF3.2, RF3.3, RF3.4):**
    *   Na `LearningScreen`, carregar os passos do array de constantes.
    *   Mapear (`map`) o array para renderizar a lista de passos dinamicamente.
    *   Implementar um estado `selectedStep` e uma função `handleSelectStep` que atualiza o passo ativo com base no clique do usuário.
    *   Fazer com que a área de descrição detalhada exiba as informações do `selectedStep`.

### Fase 3: Funcionalidades Adicionais e Polimento

1.  **Implementar Ações do Guia (RF3.5, RF3.6):**
    *   Adicionar a lógica para os botões "Iniciar exercício" e "Salvar nota", mesmo que seja apenas um `console.log` ou um alerta para indicar que a ação foi acionada.

2.  **Adicionar Controles Faltantes (RF2.4, RF4.2):**
    *   Implementar o botão "Reset" na `GenerateScreen` para limpar a `sketchImageURL`.
    *   Adicionar o botão de "Mostrar/ocultar dicas" na `LearningScreen` e conectá-lo a um estado booleano `showTips`.

## 4. Conclusão

O projeto tem uma base de UI sólida e bem estruturada. O foco principal para a próxima fase de desenvolvimento deve ser a implementação da lógica de processamento de imagem, que é o coração do sistema. Após a conclusão do core funcional, a dinamização do guia interativo completará os requisitos essenciais do protótipo.

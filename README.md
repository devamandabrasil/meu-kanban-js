Criação: O usuário digita uma tarefa e clica em adicionar. A tarefa é criada instantaneamente na coluna "A Fazer" usando manipulação do DOM.

Movimentação: Através da API de Drag and Drop nativa do JavaScript, o usuário pode clicar e arrastar a tarefa para qualquer outra coluna ("Fazendo" ou "Concluído").

Salvamento: A cada movimento (ou criação), o projeto atualiza um array de objetos no JavaScript e salva essas informações no localStorage. Quando a página é recarregada, ela lê esse armazenamento e reconstrói o quadro exatamente como o usuário o deixou.

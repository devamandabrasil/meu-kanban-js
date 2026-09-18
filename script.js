// 1. Selecionamos os elementos que vamos manipular
const inputTarefa = document.getElementById('nova-tarefa');
const btnAdicionar = document.getElementById('btn-adicionar');
// CORREÇÃO 1: A classe no HTML é '.coluna' (singular)
const colunas = document.querySelectorAll('.coluna');

// ARRAY que vai guardar nossas tarefas na memória
// Ele tenta buscar tarefas antigas no localStorage ou inicia vazio []
let listaDeTarefas = JSON.parse(localStorage.getItem('tarefas-kanban')) || [];

// 2. Função para salvar as tarefas no navegador
function salvaNoLocalStorage() {
    localStorage.setItem('tarefas-kanban', JSON.stringify(listaDeTarefas));
}

// 3. Função que cria o visual da tarefa na tela
function criarElementoTarefa(textoDaTarefa, colunaAlvoId) {
    const tarefa = document.createElement('div');
    tarefa.classList.add('tarefa');
    tarefa.draggable = true;
    tarefa.textContent = textoDaTarefa;

    // Eventos de arrastar
    tarefa.addEventListener('dragstart', () => {
        tarefa.classList.add('arrastando');
    });
    
    tarefa.addEventListener('dragend', () => {
        tarefa.classList.remove('arrastando');
    });
    
    // Coloca a tarefa na coluna certa
    document.getElementById(colunaAlvoId).appendChild(tarefa);
}

// 4. Carregar as tarefas salvas quando a página abre
function carregarTarefas() {
    listaDeTarefas.forEach(tarefa => {
        // Para cada tarefa salva, cria o visual na tela
        criarElementoTarefa(tarefa.texto, tarefa.coluna);
    });
}
carregarTarefas(); // Roda a função assim que o arquivo é lido

// 5. Adicionar nova tarefa
btnAdicionar.addEventListener('click', () => {
    if (inputTarefa.value === '') return;

    const texto = inputTarefa.value;

    // Cria visualmente na coluna 'a-fazer'
    criarElementoTarefa(texto, 'a-fazer');

    // Salva na memória do sistema
    listaDeTarefas.push({
        texto: texto,
        coluna: 'a-fazer'
    });
    salvaNoLocalStorage();
    
    inputTarefa.value = '';
});

// 6. Arrastar e Soltar (Atualizando a memória)
colunas.forEach(coluna => {
    coluna.addEventListener('dragover', (e) => {
        e.preventDefault();

        const tarefaArrastada = document.querySelector('.arrastando');
        coluna.appendChild(tarefaArrastada);
    });
    // Quando o botão do mouse é solto (drop), precisamos atualizar a coluna na memória
    coluna.addEventListener('drop', () => {
        const tarefaArrastada = document.querySelector('.arrastando');
        const textoDaTarefa = tarefaArrastada.textContent;
        const novaColunaId = coluna.id;

        // // Procura a tarefa na nossa lista e atualiza o nome da coluna dela
        const index = listaDeTarefas.findIndex(t => t.texto === textoDaTarefa);
        if (index !== -1) {
            listaDeTarefas[index].coluna = novaColunaId;
            salvaNoLocalStorage();
        }
    });
});
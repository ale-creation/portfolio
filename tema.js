//=============================================================================
// SCRIPT GLOBAL: MODO NOTURNO COM MEMÓRIA
//=============================================================================

// 1. Executa IMEDIATAMENTE ao carregar qualquer página
const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'claro') {
    document.body.classList.add('modo-claro');
}

// 2. Configura o botão (APENAS se o botão existir na página atual)
const botaoTema = document.getElementById('botao-tema');

if (botaoTema) {
    // Ajusta o texto inicial do botão baseado no tema salvo
    if (document.body.classList.contains('modo-claro')) {
        botaoTema.innerText = "🌙 Modo Noturno";
    } else {
        botaoTema.innerText = "☀️ Modo Claro";
    }

    // Escuta o clique
    botaoTema.addEventListener('click', () => {
        document.body.classList.toggle('modo-claro');
        
        if (document.body.classList.contains('modo-claro')) {
            botaoTema.innerText = "🌙 Modo Noturno";
            localStorage.setItem('tema', 'claro');
        } else {
            botaoTema.innerText = "☀️ Modo Claro";
            localStorage.setItem('tema', 'escuro');
        }
    });
}
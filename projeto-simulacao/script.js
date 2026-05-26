const terreno = document.getElementById('terreno');
const btnPlantar = document.getElementById('btn-plantar');
const btnLimpar = document.getElementById('btn-limpar');
const contadorTxt = document.getElementById('contador');
const mensagem = document.getElementById('mensagem-sistema');

let populacao = 0;

// Função para gerar uma planta em um lugar aleatório do terreno
function criarPlanta() {
    populacao++;
    contadorTxt.innerText = populacao;

    const planta = document.createElement('span');
    planta.classList.add('planta');
    planta.innerText = '🌱';

    const larguraTerreno = terreno.clientWidth - 30;
    const alturaTerreno = terreno.clientHeight - 30;
    
    const xAleatorio = Math.floor(Math.random() * larguraTerreno);
    const yAleatorio = Math.floor(Math.random() * alturaTerreno);

    planta.style.left = `${xAleatorio}px`;
    planta.style.top = `${yAleatorio}px`;

    // Guardamos a posição exata como atributos na tag para conseguir calcular a distância depois
    planta.setAttribute('data-x', xAleatorio);
    planta.setAttribute('data-y', yAleatorio);

    terreno.appendChild(planta);
    atualizarMensagem();
}

// Função para atualizar o texto do sistema baseando-se na população
function atualizarMensagem() {
    if (populacao > 99) {
        mensagem.innerText = "⚠ Superpopulação! Recursos escassos.";
        mensagem.style.color = "orange";
    } else if (populacao === 0) {
        mensagem.innerText = "O terreno está vazio. Comece a plantar!";
        mensagem.style.color = "#f7f7f7";
    } else {
        mensagem.innerText = "O ecossistema está saudável.";
        mensagem.style.color = "lightgreen";
    }
}

// ==========================================================================
// NOVA LÓGICA: CRONÔMETRO DE ANULAÇÃO (COMPETIÇÃO POR RECURSOS)
// ==========================================================================

// Função matemática simples para medir a distância entre duas plantas (Teorema de Pitágoras!)
function calcularDistancia(p1, p2) {
    const x1 = parseFloat(p1.getAttribute('data-x'));
    const y1 = parseFloat(p1.getAttribute('data-y'));
    const x2 = parseFloat(p2.getAttribute('data-x'));
    const y2 = parseFloat(p2.getAttribute('data-y'));

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Esta função roda de tempos em tempos procurando plantas "grudadas"
function simularCicloDeVida() {
    const todasPlantas = Array.from(document.querySelectorAll('.planta'));
    const plantasParaRemover = new Set(); // Guarda quem vai morrer neste ciclo

    // Compara cada planta com todas as outras
    for (let i = 0; i < todasPlantas.length; i++) {
        for (let j = i + 1; j < todasPlantas.length; j++) {
            const plantaA = todasPlantas[i];
            const plantaB = todasPlantas[j];

            // Se a distância entre elas for menor que 15 pixels, elas disputam e morrem!
            if (calcularDistancia(plantaA, plantaB) < 15) {
                plantasParaRemover.add(plantaA);
                plantasParaRemover.add(plantaB);
            }
        }
    }

    // Se houver plantas para anular, removemos elas com um efeito visual
    if (plantasParaRemover.size > 0) {
        plantasParaRemover.forEach(planta => {
            planta.innerText = '🍂'; // Transforma em folha seca antes de sumir
            planta.style.opacity = '0';
            
            setTimeout(() => {
                if (planta.parentNode === terreno) {
                    terreno.removeChild(planta);
                    populacao--;
                    contadorTxt.innerText = populacao;
                    atualizarMensagem();
                }
            }, 600); // Espera 0.6 segundos para sumir de vez
        });
    }
}

// ATIVA O CRONÔMETRO: Roda a função acima a cada 1.5 segundos (1500 milissegundos)
setInterval(simularCicloDeVida, 1500);

// ==========================================================================
// OUVINTES DE EVENTOS (Cliques)
// ==========================================================================
btnPlantar.addEventListener('click', criarPlanta);
terreno.addEventListener('click', criarPlanta);

btnLimpar.addEventListener('click', () => {
    terreno.innerHTML = '';
    populacao = 0;
    contadorTxt.innerText = populacao;
    atualizarMensagem();
});
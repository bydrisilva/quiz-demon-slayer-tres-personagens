// molde principal para criar os personagens do jogo
class Personagem {
    constructor(nome, descricao, imagem) {
        this.nome = nome;
        this.descricao = descricao;
        this.imagem = imagem;
        this.pontos = 0;
    }

    // metodo para adicionar pontos ao personagem
    adicionarPontos(valor) {
        this.pontos += valor;
    }

    // metodo para limpar a pontuacao quando o jogo recomecar
    zerarPontos() {
        this.pontos = 0;
    }
}

// criacao dos tres personagens principais do anime
const tanjiro = new Personagem("Tanjiro Kamado", "Você é gentil, empático e tem um forte senso de justiça. Sempre tenta proteger quem ama.", "https://i.imgur.com/vHq0L5d.jpeg");
const inosuke = new Personagem("Inosuke Hashibira", "Você é competitivo, age por instinto e adora um bom desafio físico.", "https://i.imgur.com/GQq3Z2J.jpeg");
const zenitsu = new Personagem("Zenitsu Agatsuma", "Você pode ser ansioso e medroso, mas entrega resultados impressionantes quando é necessário.", "https://i.imgur.com/L1Z6J7P.jpeg");

// lista que guarda os objetos criados acima
const personagens = [tanjiro, inosuke, zenitsu];

// banco de dados com as 10 perguntas baseadas na planilha
// a matriz de pontos segue a ordem exata: tanjiro, inosuke, zenitsu
const perguntas = [
    {
        texto: "1. Em um problema difícil, você normalmente...",
        opcoes: [
            { texto: "Tenta manter a calma e pensar no melhor jeito de resolver.", pontos: [3, 0, 1] },
            { texto: "Vai pra cima sem pensar muito.", pontos: [0, 3, 0] },
            { texto: "Fica nervoso no começo, mas ainda tenta continuar.", pontos: [1, 0, 3] }
        ]
    },
    {
        texto: "2. Seus amigos te descreveriam como...",
        opcoes: [
            { texto: "Gentil e confiável.", pontos: [3, 0, 1] },
            { texto: "Impulsivo e competitivo.", pontos: [0, 3, 0] },
            { texto: "Sensível e emotivo.", pontos: [1, 0, 3] }
        ]
    },
    {
        texto: "3. Quando alguém que você gosta está em perigo, você...",
        opcoes: [
            { texto: "Protege essa pessoa com tudo o que puder.", pontos: [3, 0, 1] },
            { texto: "Parte para o confronto na mesma hora.", pontos: [0, 3, 0] },
            { texto: "Entra em pânico, mas tenta ajudar.", pontos: [1, 0, 3] }
        ]
    },
    {
        texto: "4. Em um grupo, você costuma ser quem...",
        opcoes: [
            { texto: "Tenta unir todo mundo.", pontos: [3, 0, 1] },
            { texto: "Quer liderar do seu próprio jeito.", pontos: [0, 3, 0] },
            { texto: "Reclama bastante, mas continua junto.", pontos: [1, 0, 3] }
        ]
    },
    {
        texto: "5. Qual dessas qualidades combina mais com você?",
        opcoes: [
            { texto: "Empatia.", pontos: [3, 0, 1] },
            { texto: "Coragem.", pontos: [0, 3, 0] },
            { texto: "Lealdade.", pontos: [1, 0, 3] }
        ]
    },
    {
        texto: "6. Quando alguém te irrita, você...",
        opcoes: [
            { texto: "Tenta se controlar e resolver na conversa.", pontos: [3, 0, 1] },
            { texto: "Responde na hora e sem filtro.", pontos: [0, 3, 0] },
            { texto: "Fica muito abalado e demonstra isso.", pontos: [1, 0, 3] }
        ]
    },
    {
        texto: "7. Sobre desafios, você prefere...",
        opcoes: [
            { texto: "Evoluir aos poucos, com dedicação.", pontos: [3, 0, 1] },
            { texto: "Procurar os mais difíceis só para provar seu valor.", pontos: [0, 3, 0] },
            { texto: "Evitar, mas enfrentar se for necessário.", pontos: [1, 0, 3] }
        ]
    },
    {
        texto: "8. Seu jeito de demonstrar carinho é...",
        opcoes: [
            { texto: "Cuidando das pessoas.", pontos: [3, 0, 1] },
            { texto: "Implicando, mas no fundo protegendo.", pontos: [0, 3, 0] },
            { texto: "Falando muito do que sente.", pontos: [1, 0, 3] }
        ]
    },
    {
        texto: "9. Qual ambiente combina mais com sua energia?",
        opcoes: [
            { texto: "Um lugar tranquilo, com pessoas queridas.", pontos: [3, 0, 1] },
            { texto: "Um lugar agitado, onde sempre acontece algo.", pontos: [0, 3, 0] },
            { texto: "Um lugar seguro e confortável.", pontos: [1, 0, 3] }
        ]
    },
    {
        texto: "10. Qual frase combina mais com você?",
        opcoes: [
            { texto: "Mesmo sendo difícil, eu vou continuar.", pontos: [3, 0, 1] },
            { texto: "Me coloca no desafio mais insano possível.", pontos: [0, 3, 0] },
            { texto: "Eu estou com medo, mas não quero desistir.", pontos: [1, 0, 3] }
        ]
    }
];

// controle de qual pergunta esta aparecendo na tela
let indicePerguntaAtual = 0;

// captura os elementos do html para manipular o dom
const telaInicial = document.getElementById("tela-inicial");
const telaQuiz = document.getElementById("tela-quiz");
const telaResultado = document.getElementById("tela-resultado");

// arrow function para iniciar o jogo ao clicar no botao
document.getElementById("btn-comecar").addEventListener("click", () => {
    telaInicial.classList.add("oculta");
    telaQuiz.classList.remove("oculta");
    carregarPergunta();
});

// arrow function que atualiza o texto da pergunta e cria os botoes de opcao
const carregarPergunta = () => {
    const perguntaAtual = perguntas[indicePerguntaAtual];
    document.getElementById("texto-pergunta").textContent = perguntaAtual.texto;
    
    const caixaOpcoes = document.getElementById("caixa-opcoes");
    
    // limpa os botoes da pergunta anterior
    caixaOpcoes.innerHTML = "";

    // laco de repeticao para criar um botao para cada opcao disponivel
    perguntaAtual.opcoes.forEach(opcao => {
        const botao = document.createElement("button");
        botao.textContent = opcao.texto;
        botao.classList.add("botao-friv");
        
        // escuta o clique e chama a funcao de calcular pontos
        botao.addEventListener("click", () => processarResposta(opcao.pontos));
        
        caixaOpcoes.appendChild(botao);
    });
};

// arrow function que distribui os pontos escondidos e avanca o jogo
const processarResposta = (pontosDaOpcao) => {
    tanjiro.adicionarPontos(pontosDaOpcao[0]);
    inosuke.adicionarPontos(pontosDaOpcao[1]);
    zenitsu.adicionarPontos(pontosDaOpcao[2]);

    indicePerguntaAtual++;

    // condicional para saber se ainda tem perguntas ou se o jogo acabou
    if (indicePerguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
};

// arrow function que calcula quem ganhou e mostra na tela final
const mostrarResultado = () => {
    telaQuiz.classList.add("oculta");
    telaResultado.classList.remove("oculta");

    // assume que o primeiro e o vencedor antes de comparar
    let vencedor = personagens[0];

    // laco de repeticao para descobrir quem tem a maior pontuacao
    personagens.forEach(personagem => {
        if (personagem.pontos > vencedor.pontos) {
            vencedor = personagem;
        }
    });

    // atualiza o dom com os dados do vencedor
    document.getElementById("nome-vencedor").textContent = vencedor.nome;
    document.getElementById("desc-vencedor").textContent = vencedor.descricao;
    document.getElementById("img-vencedor").src = vencedor.imagem;
    
    // exibe a pontuacao final conforme exigido no edital
    document.getElementById("pontos-vencedor").textContent = `Pontuação final: ${vencedor.pontos} pontos`;
};

// arrow function para zerar tudo e voltar para a primeira tela
document.getElementById("btn-reiniciar").addEventListener("click", () => {
    indicePerguntaAtual = 0;
    
    // laco para zerar os pontos de todos os personagens
    personagens.forEach(personagem => {
        personagem.zerarPontos();
    });
    
    telaResultado.classList.add("oculta");
    telaInicial.classList.remove("oculta");
});

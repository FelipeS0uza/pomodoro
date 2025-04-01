const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicFocoInput = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');
const iniciarPausarBt = document.querySelector('#start-pause span');
const logoPlayPause = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const music = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioFinalizado = new Audio('/sons/beep.mp3');
let tempoDecorridoEmSeg = 1500;
let intervaloId = null;
music.loop = true;

musicFocoInput.addEventListener('change', () => {
    if(music.paused) {
        music.play()
    } else {
        music.pause()
    }
})


function clickBt(botao, contexto, titulo, timer) {
    
    botao.addEventListener('click', () => {
        botoes.forEach(function (contexto){     //percoreu o array botoes e tirou a classe 'active' de todos
            contexto.classList.remove('active')
        })
        html.setAttribute('data-contexto', contexto);
        banner.setAttribute('src', `/imagens/${contexto}.png`);
        title.innerHTML = titulo;
        botao.classList.add('active');          //adiciou a classe 'active' no botão clicado
        tempoDecorridoEmSeg = timer;
        mostrarTempo()
    })
}

clickBt(focoBt, 'foco', 
    `Otimize sua produtividade,<br>
    <strong class="app__title-strong">mergulhe no que importa.</strong>`, 1500)

clickBt(curtoBt, 'descanso-curto',
     `Que tal dar uma respirada?<br>
     <strong class="app__title-strong">Faça uma pausa curta!</strong>`, 300)

clickBt(longoBt, 'descanso-longo', 
    `Hora de voltar à superfície.<br>
    <strong class="app__title-strong">Faça uma pausa longa.</strong>`, 900)


const contagemRegressiva = () => {
    if(tempoDecorridoEmSeg <= 0) {
        audioFinalizado.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSeg -= 1
    // console.log(`Tempo: ${tempoDecorridoEmSeg}`)
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarPausar)


function iniciarPausar() {
    if(intervaloId) {
        audioPause.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarPausarBt.textContent = "Pausar"
    logoPlayPause.setAttribute('src', '/imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
    iniciarPausarBt.textContent = "Começar"
    logoPlayPause.setAttribute('src', '/imagens/play_arrow.png')
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSeg * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br',{minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
console.log('[Supra] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


//mensagem de confirmação pré-jogo
const smsGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
           sprites,
        smsGetReady.sX, smsGetReady.sY,
        smsGetReady.w, smsGetReady.h,
        smsGetReady.x, smsGetReady.y,
        smsGetReady.w, smsGetReady.h,
        );
    }

}



//Plano de Fundo 
const planodeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha () {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0 , 0, canvas.width, canvas.height)
        contexto.drawImage(
            sprites,
           planodeFundo.spriteX, planodeFundo.spriteY,
           planodeFundo.largura, planodeFundo.altura,
           planodeFundo.x, planodeFundo.y,
           planodeFundo.largura, planodeFundo.altura,
        );
        contexto.drawImage(
            sprites,
           planodeFundo.spriteX, planodeFundo.spriteY,
           planodeFundo.largura, planodeFundo.altura,
           (planodeFundo.x + this.largura), planodeFundo.y,
           planodeFundo.largura, planodeFundo.altura,
        );
    }
}

// base/chao
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha () {
        contexto.drawImage(
            sprites,
           chao.spriteX, chao.spriteY,
           chao.largura, chao.altura,
           chao.x, chao.y,
           chao.largura, chao.altura,
        );
        contexto.drawImage(
            sprites,
           chao.spriteX, chao.spriteY,
           chao.largura, chao.altura,
           (chao.x + this.largura), chao.y,
           chao.largura, chao.altura,
        );
    },
};

//função de colisão do passaro

function fazColisao(FlappyBird, chao) {
    const FlappyBirdY = FlappyBird.y + FlappyBird.altura;
    const chaoY = chao.y;

    if(FlappyBirdY >= chaoY){
    return true;
    }
    return false;
}


// passaro
function criarFlappyBird(){
    const FlappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24, 
        x: 10,
        y: 50,
        gravidade: 0.25,
        velocidade: 0,
        pulo: 4.6,
        pula(){
            FlappyBird.velocidade = -FlappyBird.pulo;
        },
        atualiza(){
            if(fazColisao(FlappyBird, chao)){
                mudaParaTela(Telas.INICIO);
            return;
            }
            FlappyBird.velocidade =  FlappyBird.velocidade + FlappyBird.gravidade
            FlappyBird.y = FlappyBird.y + FlappyBird.velocidade;
        },
        desenha () {
            contexto.drawImage(
                sprites,
               FlappyBird.spriteX, FlappyBird.spriteY,
               FlappyBird.largura, FlappyBird.altura,
               FlappyBird.x, FlappyBird.y,
               FlappyBird.largura, FlappyBird.altura,
            );
        },
    }
    return FlappyBird;
}


//variaveis globais
const globais = {};

//TELAS

let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa(){
            globais.FlappyBird = criarFlappyBird();
        },
        desenha(){
            planodeFundo.desenha();
            chao.desenha();
           globais.FlappyBird.desenha();

            smsGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza(){

        }
    },

    JOGO: {
        desenha(){

           planodeFundo.desenha();
            chao.desenha();
            globais.FlappyBird.desenha();
        },
        click() {
            globais.FlappyBird.pula();
        },
        atualiza(){
            globais.FlappyBird.atualiza();
        }
    }
}



function loop() {
    
telaAtiva.desenha();
telaAtiva.atualiza();

   

    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if(telaAtiva.click){
        telaAtiva.click();
    }
})

mudaParaTela(Telas.INICIO);
loop();
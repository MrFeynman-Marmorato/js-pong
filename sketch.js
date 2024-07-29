// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;

// variáveis da velocidade da bolinha
let velocidadexBolinha = 4;
let velocidadeyBolinha = 6;

// variáveis da posição da minha raquete
let xRaquete = 10;
let yRaquete = 140;

// variáveis da raquete do oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 140;
let chanceDeErrar = 0;

// variáveis gerais das raquetes
let larguraRaquete = 10;
let alturaRaquete = 120;

// variáveis do placar
let meusPontos = 0;
let pontosOponente = 0;

// variáveis dos sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  desenhaRaquete(xRaquete, yRaquete);
  desenhaRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  movimentaRaqueteOponente();
  placar();
  marcaPonto();
  
}

function mostraBolinha(){
  noStroke();
  // fill('purple')
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function verificaColisaoBorda(){
  if(xBolinha > (width - raio) ||
    xBolinha < (0 + raio)){
    velocidadexBolinha *= -1;
  }
  
  if(yBolinha > (height - raio) ||
    yBolinha < (0 + raio)){
    velocidadeyBolinha *= -1;
  }
}

function desenhaRaquete(x, y){
  noStroke();
  // fill('pink');
  rect(x, y, larguraRaquete, alturaRaquete);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(x, y){
  if((xBolinha - raio <= xRaquete + larguraRaquete) &&
    (yBolinha + raio >= yRaquete) && 
     (yBolinha - raio <= yRaquete + alturaRaquete)){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
  
  if((xBolinha + raio >= xRaqueteOponente) &&
    (yBolinha + raio >= yRaqueteOponente) && 
     (yBolinha - raio <= yRaqueteOponente + alturaRaquete)){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeyOponente = yBolinha - yRaqueteOponente - alturaRaquete/2;
  // calculaChanceDeErrar();
  yRaqueteOponente += velocidadeyOponente //+ chanceDeErrar;
}

function placar(){
  textAlign(CENTER);
  textSize(20);
  fill('orange')
  stroke(255);
  rect(130, 5, 40, 25);
  rect(430, 5, 40, 25);
  fill(255);
  text(meusPontos, 150, 25);
  text(pontosOponente, 450, 25);
}

function marcaPonto(){
  // tiraBug();
  if(xBolinha <= (0 + raio)){
    pontosOponente += 1;
    ponto.play();
  }
  if(xBolinha >= (width - raio)){
    meusPontos += 1;
    ponto.play();
    numeroDeRaquetadas = 0;
  }
}

function calculaChanceDeErrar() {
  if (pontosOponente > meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 70){
    chanceDeErrar = 60;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= -60){
    chanceDeErrar = 30;
    }
  }
}

function tiraBug(){
  if(xBolinha <= 0){
    xBolinha = raio;
  }
}

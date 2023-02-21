// Globais! 
var PLAY = 1;
var END = 0;
var gameState = PLAY;


var aleatoriaGroup;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;


var gameOverImg,restartImg;
var gameOver, restart;


var jumpSound , checkPointSound, dieSound 





function preload()
{
    trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");  
    trex_collided = loadAnimation("trex_collided.png");

    groundImage = loadImage("ground2.png");
    cloudImage = loadImage("cloud.png");
    obstacle1 = loadImage("obstacle1.png");  
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");

    restartImg = loadImage("restart.png")
    gameOverImg = loadImage("gameOver.png")

    jumpSound = loadSound("jump.mp3")  
    dieSound = loadSound("die.mp3")
    checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);

  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);

  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  //criar grupos de obstáculos e nuvens
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  trex.setCollider("rectangle",0,0,90,90);
  trex.debug = false






  
  // concatenando

  console.log(`  Pontuação ${score}    ` );
  console.log("Pontuação" +  score )

  
  

  
}

function draw() {
  
  background(180);
  //exibir pontuação
  text("Score: " + score, 500,50);
  

  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //mover o solo
    ground.velocityX = -4;
    //pontuação
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //pular quando a tecla de espaço for pressionada
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -12;
        jumpSound.play();   // play() 
    }
    
    //adicione gravidade
    trex.velocityY = trex.velocityY + 0.8
  
    //gerar as nuvens
    spawnClouds();
  
    //gerar obstáculos no solo
    spawnObstacles();

    aleatoria()
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END) {
  
      gameOver.visible = false
      restart.visible = true;
     
      ground.velocityX = 0;
      trex.velocityY = 0
     
      //mudar a animação do trex
      trex.changeAnimation("collided", trex_collided);
     
      //definir a vida útil dos objetos do jogo para que nunca sejam destruídos
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
  //impedir que o trex caia
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
  // Local -  pq esta dentro de uma função
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //atribuir escala e vida útil ao obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   // 3 - adicione cada obstáculo ao grupo
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {

          cloud = createSprite(600,100,40,10);
          cloud.y = Math.round(random(10,60));
          cloud.addImage(cloudImage);
          cloud.scale = 0.5;
          cloud.velocityX = -3;

          //atribuir tempo de vida à variável
          cloud.lifetime = 134;

          //ajustar a profundidade
          cloud.depth = trex.depth;
          trex.depth = trex.depth + 1;
    
    //adicionando nuvem ao grupo
   cloudsGroup.add(cloud);
    }
}


function aleatoria(){

if (frameCount % 60 === 0) {

var  ran = createSprite(150,15,20,20)
ran.y = Math.round(random(10,20))

ran.velocityX = 2



}




}




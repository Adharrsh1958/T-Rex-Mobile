var play = 1;
var end = 0;
var gameState = play;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var jumpSound, dieSound, checkpointSound;



var newImage;
var gameoverImg, restartImg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  moonAnimation = loadAnimation("My Gr8 Moon");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud-1.png");
  
   obstacle1 = loadImage("obstacle1.png");
   obstacle2 = loadImage("obstacle2.png");
   obstacle3 = loadImage("obstacle3.png"); 
   obstacle4 = loadImage("obstacle4.png");
   obstacle5 = loadImage("obstacle5.png");
   obstacle6 = loadImage("obstacle6.png");
  
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  moon = createSprite(width-50,100,10,10);
  moon.addAAnimation("moon",moonAnimation);
  moon.scale=0.1;
  var message="this is a message"
  console.log(message);
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  gameover.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,185,400,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hello"+ 5);
  
  
  trex.setCollider("circle",0,0,55);
  trex.debug = false;
  
  score = 0;
}

function draw() {
  background("black");
  
  
  console.log("This is", gameState);
  text("score:" + score,500,50);
  
  if(gameState === play){
    
    gameover.visible = false;
    restart.visible = false;
    
    console.log("play1");
    ground.velocityX = -(6+3*score/100);
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
      checkpointSound.play();
    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    console.log("play2");
    if((touches.length>0 || keyDown("space"))&& trex.y >= 150) {
      trex.velocityY = -13;
      jumpSound.play();
      touches=[];
    }
  console.log("play3")
    
  trex.velocityY = trex.velocityY + 0.8;
    
  //spawn the clouds
  spawnClouds();
  spawnObstacles();
    if (obstaclesGroup.isTouching(trex)){
      gameState = end;
      dieSound.play();
    }
  }
  else if(gameState === end){
    gameover.visible = true;
    restart.visible = true;

      if(mousePressedOver(restart)){
    console.log("Restart The Game");
    reset();
  }

    ground.velocityX = 0;
    trex.changeAnimation("collided", trex_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
}
    
    trex.collide(invisibleGround);
    
  drawSprites();
}


function reset(){
  gameState=play;
  gameover.visible=false;
  restart.visible=false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score=0;
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 250
    
    //adjust the depth
    cloud.depth = score.depth;
    score.depth = score.depth + 1;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding each cloud to the group
    cloudsGroup.add(cloud);
    }
}

function spawnObstacles(){
 if (frameCount % 60 === 0) {
    Obstacles = createSprite(600,160,400,10);
    Obstacles.velocityX = -(6+score/100);
   
   rand = Math.round(random(1,6));
   switch(rand){
     case 1: Obstacles.addImage(obstacle1);
       break;
     case 2: Obstacles.addImage(obstacle2);
       break;
     case 3: Obstacles.addImage(obstacle3);
       break;
     case 4: Obstacles.addImage(obstacle4);
       break;
     case 5: Obstacles.addImage(obstacle5);
       break;
     case 6: Obstacles.addImage(obstacle6);
       break;
       default:break;
   }
    Obstacles.scale = 0.5;
    Obstacles.lifetime = 250;
   
   //adding each obstacle to the group
   obstaclesGroup.add(Obstacles);
   
 }
}


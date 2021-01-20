var score;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup
var score
 var background, ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
}




function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(50,150,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale =0.1;
  
  ground = createSprite(300,380,800,5);

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  //score added
  score =0;
}


function draw() {
 background("white");
  
  text("Survival Time="+score,250,20)
 if(keyDown("SPACE") && monkey.y>=100){
    monkey.velocityY = -10;
  }
  

  ground.velocityX = -5;
  if (ground.x<0){
    ground.x = ground.width/2;
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(ground);
  if (gameState ===PLAY){
        score = score + Math.round(getFrameRate()/60);
    food();
    obstacles();
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    }
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
  }
  if(gameState===END){
    ground.velocityX = 0;
    monkey.destroy();
  }
 
  drawSprites();
}
function food(){
  if (frameCount % 80===0){
 var banana  = createSprite(600,550,10,10) ;
    banana.y = Math.round(random(20,350));
  banana.addImage(bananaImage);
  banana.velocityX = -5;
  banana.scale = 0.1;
  banana.lifetime = 300;
  FoodGroup.add(banana);
  }
}
function obstacles(){
    if(frameCount % 300 ===0){
      var obstacle =  createSprite(600,Math.round(random(370,380)),20,20);
      obstacle.velocityX = -5;
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.2;
      obstacle.lifetime = 300;
      obstacleGroup.add(obstacle);
    }
  }







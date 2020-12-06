
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(400,400)
monkey = createSprite(50,370,20,20)
monkey.addAnimation("running", monkey_running)
monkey.scale = 0.175

ground = createSprite(200,380,1000,20) 
FoodGroup = new Group();
obstacleGroup = new Group();
}


function draw() {
  background("lightgreen")
ground.velocityX = -4
if(ground.x<0){
  ground.x = ground.width/2
}
if (keyDown("space")){
  monkey.velocityY = -20
  
}
monkey.velocityY = monkey.velocityY + 1  
if(monkey.isTouching(FoodGroup)){
FoodGroup.destroyEach();
  score = score + 1
}
if (monkey.isTouching(obstacleGroup)){
    ground.velocityX = 0
    monkey.velocityX = 0
    FoodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
}
monkey.collide(ground)
spawnFood()
spawnObstacles()
drawSprites()
text("score:"+score,200,30)
}

function spawnFood(){
  if (frameCount%80===0){
    banana = createSprite(400,Math.round(random(50,300)),10,10)
    banana.addImage(bananaImage)
   banana.velocityX = -4
    banana.scale = 0.05
    banana.lifetime = 100
    monkey.depth = banana.depth + 1
    FoodGroup.add(banana)
  }
}
function spawnObstacles(){
  if(frameCount%200===0){
    obstacle = createSprite(400,350,10,40)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = -5
    obstacle.lifetime = 100
    obstacle.scale = 0.15
    obstacleGroup.add(obstacle)
  }
}

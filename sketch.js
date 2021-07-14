var bg,bgImg
var ground,groundImg,invisibleGround
var spider,spiderImg
var spiderLogo,spiderLogoImg
var obstacles, ob1, ob2, ob3, rand
var score =0
var edges 
var enemy,enemyImg
var enemyGroup 
var stand
var gameover,gameoverImg
var booster,boosterGroup,boosterImg
var PLAY =1
var END = 0
var gamestate = PLAY
function preload(){
  bgImg = loadImage("BackGround.jpg")
  groundImg = loadImage("2.jpg")
  spiderImg=loadAnimation("SpiderMan Running2.png","SpiderMan Running3.png","SpiderMan Running4.png")
  spiderLogoImg=loadImage("Spidy.png")
  stand=loadImage("sp7.png")
  enemyImg=loadImage("enimer.png")
  gameoverImg = loadImage("over.png")
  boosterImg = loadImage("yoyoyoy.png")
}

function setup() {
 createCanvas(1600,730)
 
//create a backGround
bg= createSprite(800,365,1600,730)
bg.addImage(bgImg)
bg.velocityX = -6
bg.x = bg.width / 2

//create a gameoversprite
gameover =createSprite(800,365)
gameover.addImage(gameoverImg)
gameover.scale = 0.7
gameover.visible=false
//create a Spiderlogo
spiderLogo = createSprite(50,50,100,100)
spiderLogo.addImage(spiderLogoImg)
spiderLogo.scale = 0.4

//create a Spider Man 
spider=createSprite(100,500,100,100)
spider.addAnimation("spider",spiderImg)
spider.addImage("standing",stand)
spider.scale=0.5

//create a ground sprite
ground = createSprite(800,900)
ground.addImage("ground",groundImg)
ground.scale=2
ground.x = ground.width/2
ground.velocityX = -30

enemyGroup=createGroup()
boosterGroup=createGroup()
//create a invisible ground
invisibleGround = createSprite(800,680,1600,50)
invisibleGround.visible = false
}

//score = 0
function draw() {
background("black")
if (gamestate === PLAY){
  if(boosterGroup.isTouching(spider)){
    score = score+3
    boosterGroup.destroyEach()
  }
//Unlimited BackGrounds
if(bg.x <650){
  bg.x=bg.width/2
}
//jump when the space button is pressed
if (keyDown("space")&&spider.y>161){
   spider.velocityY = -10
}    
spider.velocityY  = spider.velocityY + 0.8

if (ground.x <415){
  ground.x = ground.width/2
}

if (keyDown("Up")){
spider.y = spider.y - 20
}

if (keyDown("Down")){
  spider.y = spider.y + 20
  }

if (keyDown("right")){
  spider.x = spider.x + 20
    }

if (keyDown("Up")){
   spider.x = spider.x - 20
    }


    spawnEnemy()
    if(enemyGroup.isTouching(spider)){
      
   
      gamestate = END
     
      }
      spawnBooster()
}

if(gamestate===END){
  bg.velocityX=0
  spider.velocityY= 0
  spider.changeImage("standing",stand)
  ground.velocityX= 0
 enemyGroup.destroyEach()
 enemyGroup.setVelocityXEach(0);
 enemyGroup.setVelocityYEach(0);
 gameover.visible=true
 boosterGroup.destroyEach()
 boosterGroup.setVelocityXEach(0);
 boosterGroup.setVelocityYEach(0);
}



  
      
edges = createEdgeSprites()
//making it move by touching the ground
spider.collide(invisibleGround)
spider.bounceOff(edges)

drawSprites()
textSize(40)
fill ("black")
text ("Score "+score,80,60)
}
function spawnEnemy(){
if(frameCount%200===0){
  if( enemy=createSprite(random(50,650),random(100,350),80,80)){
    enemy.addImage(enemyImg)
    enemy.scale=0.3
    enemy.velocityX=4
    enemy.velocityY=4
  }
  if(enemy = createSprite(random(800,1500),random(100,350),80,80)){
    enemy.addImage(enemyImg)
    enemy.scale=0.3
    enemy.velocityX = -4
    enemy.velocityY = 4
  }
  enemy.lifetime = 300
  enemyGroup.add(enemy)
}
}
function spawnBooster(){
  if(frameCount%100===0){
    if( booster=createSprite(random(50,650),random(400,250),100,100)){
     booster.addImage(boosterImg)
      booster.scale=0.3
      booster.velocityX=4
      booster.velocityY=4
    }
    if(booster = createSprite(random(800,1500),random(400,250),100,100)){
     booster.addImage(boosterImg)
      booster.scale=0.3
      booster.velocityX = -4
      booster.velocityY = 4
    }
    booster.lifetime = 100
    boosterGroup.add(booster)
}
}
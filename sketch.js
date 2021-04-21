var score = 0
var life = 3
var badRobot, goodRobot, badGroup;
var gameState = 0

function preload(){
goodImage = loadImage("Images/Good.png")
badImage = loadImage("Images/Bad.png")
restartImage = loadImage("Images/restart.png")
}

function setup() {
  createCanvas(600,600);
  goodRobot = createSprite(300,500,30,30)
  goodRobot.addImage(goodImage)
  goodRobot.scale = 0.15
  badGroup = createGroup()
  restart = createButton("RESTART")
  restart.position(260, 320)
}

function draw() {
  background("black"); 
  
  fill("white")
  text("Score : " + score, 20, 25)
  text("Lives : " + life, 20, 45)
  if(gameState === 0){
  goodRobot.visible = true
  restart.hide()
  score = score + Math.round(getFrameRate()/65)
  goodRobot.velocityX = 0
  if(keyDown(LEFT_ARROW)){
    goodRobot.velocityX = -5
  }
  if(keyDown(RIGHT_ARROW)){
    goodRobot.velocityX = 5
  }
  for(var i = 0; i<badGroup.length; i++){
    if(badGroup.get(i).isTouching(goodRobot)){
      badGroup.get(i).destroy()
      life = life-1
    }
  }
  badGuys()
  if(life <= 0){
    gameState = 1
  }
}

if(gameState === 1){
  badGroup.destroyEach()
  goodRobot.visible = false
  text("FINAL SCORE = " + score, 250, 300)
  restart.show()
  restart.mousePressed(()=>{
    gameState = 0
    life = 3
    score = 0
  })
    
  
}
  drawSprites();
 
}

function badGuys() {
  if(frameCount%20 === 0){
    badRobot = createSprite(random(0,600), 0, 20, 20)
    badRobot.addImage(badImage)
    badRobot.scale = random(0.01, 0.05)
    badRobot.velocityY = 4 + score/20
    badRobot.lifetime = 150
    console.log(badRobot.velocityY)
    badGroup.add(badRobot)
  }
}
//THINGS LEFT-
//multiplayer settings
//diagCheck

//QUESTION-
//mam we how to wait for coin to fall before updating the array
//diagCheck
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const Constraint = Matter.Constraint;

var engine, world;
var squareSize = 60
var database;
var form, player, game;
var board;
var coins=[];
var endMsg;
var ground;
var validCol;
var playerCount;
var allPlayers
var coinState
var backgroundImg
var gameState = 0
var arrBoard = []
var marginX = 90
var marginY = 90
var canvas
var droppedCol
var playerState = 1
var turn
var wall1,wall2
var numRow = 6
var numCol = 7
var speed = 1
var numWin = 4
var player2Y=30
var player1Y=50
function preload(){
  boardImg = loadImage("images/board.png")
  redImage= loadImage("images/redCoin.png")
  yellowImage= loadImage("images/yellowCoin.png")
}
function setup() {
  createCanvas(displayWidth,displayHeight);

  engine = Engine.create();
  world = engine.world;

  database = firebase.database();

  game = new Game();
  game.start();

  board = new Board()
  board.pushPosition()
  console.log(arrBoard)
  
  ground = new Ground(arrBoard[numRow - 1][int(numCol / 2)]["x"],arrBoard[0][0]["y"]+40,squareSize*numCol,20)
  
  game.getGameState();
  game.getTurn();
  game.updateMsg(" ");
  Coin.getCoinState()
}

function draw() {
  
  Engine.update(engine);
 
  if(playerCount === 2 && gameState==0){
    game.updateState(1);
    game.updateTurn(1);
  }

  if(gameState === 1){
    clear();
    game.play(); 
  }
  textSize(20)
  if(turn==1){
    fill("red")
  }else{
   
 fill("#d1a30a")
  }
   

  if(gameState == 2){
    game.end()
  }
  
}

function mouseClicked(){
  if(gameState==1&& turn==player.index){
 // console.log("gameState:",gameState)
   var col= board.getDroppedCoinCol()
   coins[coins.length-1].droppedCol = col
   coins[coins.length-1].updateCoinState()
    if (isValidCol(col)) {
     
      var row = board.getDroppedCoinRow(col)
      coins[coins.length-1].droppedRow = row
      coins[coins.length-1].updateCoinState()
      coins[coins.length - 1].state = "Dropped"
      
  
      if (allchecks(row, col)) {
        //call winning func
        game.updateMsg("wins :)")
        game.updateState(2);
        
      }
      else if (coins.length == numRow * numCol) {
        game.updateMsg("TIE *_*")
        game.updateState(2)
       
      } else {
        if (turn == 1) {
          game.updateTurn(2)
        } else {
          game.updateTurn(1)
        }
      }
  
    }
  }
  }

  

    

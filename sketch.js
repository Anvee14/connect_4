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
  
  ground = new Ground(displayWidth/2,arrBoard[0][0]["y"]+30,displayWidth,10)
  
  game.getGameState();
  game.getTurn();
  game.updateMsg(" ")
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

  if(gameState == 2){
    game.end()
  }
  
}

function mouseClicked(){
  if(gameState==1&& turn==player.index){
 // console.log("gameState:",gameState)
   coins[coins.length-1].droppedCol = board.getDroppedCoinCol()
   coins[coins.length-1].updateCoinState()
   checkGameFlow()
  }
}
  

    

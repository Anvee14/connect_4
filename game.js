class Game {
  constructor() {

  }

  getGameState() {
    var gameStateRef = database.ref('gameState')
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })
  }

  updateState(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  getTurn() {
    var gameStateRef = database.ref('turn')
    gameStateRef.on("value", function (data) {
      turn = data.val();
    })
  }
  
  updateTurn(turn) {
    database.ref('/').update({
      turn: turn
    });
  }

  getMsg() {
    var gameMsgRef = database.ref('winMsg')
    gameMsgRef.on("value", function (data) {
      endMsg = data.val();
    })
  }
  
  updateMsg(msg) {
    database.ref('/').update({
      winMsg: msg
    });
  }


  async start() {
    if (gameState == 0) {
      player = new Player()
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getPlayerCount();
      }
      form = new Form()
      form.display();
    }
  }

  play() {
    form.hide();
    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      background(255, 200, 200);

      if (turn === 1 && playerState == 1) {
        var coin = new Coin(arrBoard[numRow - 1][int(numCol / 2)]["x"],
        arrBoard[numRow - 1][0]["y"] - squareSize, 59, 59)
        coin.updateCoinState()
        coin.setImage(redImage)
        coins.push(coin)
        Coin.getCoinState()
        
        playerState = 2
      }

      if (turn == 2 && playerState == 2) {
        var coin = new Coin(arrBoard[numRow - 1][int(numCol / 2)]["x"],
        arrBoard[numRow - 1][0]["y"] - squareSize, 59, 59)
        coin.updateCoinState()
        coin.setImage(yellowImage)
        coins.push(coin)
        Coin.getCoinState()
        playerState = 1

      }

      if (turn == player.index) {
        coins[coins.length - 1].setCoinX()
      }
     
      Matter.Body.setPosition(coins[coins.length - 1].body,
         { x: coinState.x, y: coinState.y })
     
    }

    
    for (var i = 0; i < coins.length; i++) {
      coins[i].display()
    }

    board.drawBoard()

  }

  end() {
    background(255, 200, 200);
    textSize(15)
    game.getMsg()
    text("Player " + turn + " " + endMsg, 200, 50)
    for (var i = 0; i < coins.length; i++) {
      coins[i].display()
    }

    board.drawBoard()
  }


}



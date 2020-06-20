class Coin {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true,
      restitution:1.0,
      friction: 0.2,
      'density':0.5

    }
    this.body = Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;
    World.add(world, this.body);

    this.x = this.body.position.x
    this.y = this.body.position.y
    this.droppedCol = -1
    this.droppedRow = -1


    this.state = "notDropped"

  }
  display() {
    var pos = this.body.position
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, this.width, this.height);


  }
  static getCoinState() {
    var coinStateRef = database.ref('coinState')
    coinStateRef.on("value", function (data) {
      coinState = data.val();
      if(gameState==1){
        var col = coinState.droppedCol
        var row = coinState.droppedRow
        if (col >= 0 && row >= 0 && isValidCol(col)) {
          Matter.Body.setStatic(coins[coins.length - 1].body, false)
          arrBoard[row][col]["state"] = turn
        }
      }
     
    })
  }

  updateCoinState() {
    database.ref('coinState').set({
      x: this.x,
      y: this.y,
      droppedCol: this.droppedCol,
      droppedRow: this.droppedRow
    });

  }

  setCoinX() {

    if (this.state == "notDropped") {

      if (mouseX > marginX && mouseX < marginX + squareSize * numCol) {
        var cols = Math.floor((mouseX - marginX) / squareSize)
        coins[coins.length - 1].x = arrBoard[0][cols]["x"]
        //coins[coins.length-1].droppedCol = board.getDroppedCoinCol()
        coins[coins.length - 1].updateCoinState()
        //Matter.Body.setPosition(coins[coins.length-1].body,{x:arrBoard[0][cols]["x"],y:coins[coins.length-1].body.position.y})
      }
    }

  }

  setImage(img) {
    this.image = img

  }



}
class Coin {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true,
      //     restitution:0.8,
      friction: 0.1,
      //'density':1.0

    }
    this.body = Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;
    World.add(world, this.body);

    this.x = this.body.position.x
    this.y = this.body.position.y
    this.droppedCol = -1

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
      var col = coinState.droppedCol
      if (col >= 0 && isValidCol(col)) {
        Matter.Body.setStatic(coins[coins.length - 1].body, false)
      }
    })
  }

  updateCoinState() {
    database.ref('coinState').set({
      x: this.x,
      y: this.y,
      droppedCol: this.droppedCol
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
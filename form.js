class Form{
    constructor(){
      this.nameBox = createInput("Enter Name")
      this.button = createButton("Enter")
      this.title = createElement('h1')
      this.greeting = createElement('h2')
      this.reset = createButton("resetData")
    }
    hide(){
      this.title.hide()
      this.button.hide()
      this.nameBox.hide()
      this.greeting.hide()
    }
    display(){
        this.title.html("CONNECT 4")
        this.title.position(displayWidth/2,displayHeight/7)
        this.nameBox.position(displayWidth/2 , displayHeight/2 - 80)
        this.button.position(displayWidth/2 + 60, displayHeight/2)
        this.reset.position(displayWidth/2+500,displayHeight/6)
        this.reset.mousePressed(()=>{
          game.updateState(0)
          player.updatePlayerCount(0)
          game.updateTurn(0)
          let playersRef=database.ref('players')
          playersRef.remove()
          let coinsRef=database.ref('coinState')
          coinsRef.remove()
        })
        this.button.mousePressed(()=>{
          this.nameBox.hide();
          this.button.hide();
          player.name = this.nameBox.value();
          playerCount+=1;
          player.index = playerCount;
          player.update();
          player.updatePlayerCount(playerCount);
          this.greeting.html("Hello " + player.name)
          this.greeting.position(displayWidth/2 , displayHeight/4);
        });
    
    }
    
}
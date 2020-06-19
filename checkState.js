function isValidCol(col){
    if(arrBoard[numRow-1][col]["state"]==0){
        return true 
    }
    else{
        return false
    }
}
function allchecks(row,col){
  if(horiCheck(row,col)>=numWin||vertCheck(row,col)>=numWin||diagCheckLeft(row,col)>=numWin||diagCheckRight(row,col)>=numWin){
    return true
  }else{
    return false
  }
}
function horiCheck(row,col){
    var counter = 1
    //console.log(arrBoard[0][5]["state"])

    for(var i = col+1 ;i<arrBoard[row].length;i++){
      if(arrBoard[row][col]["state"]== arrBoard[row][i]["state"]){
          counter++
      }else{
        break;
        }
      }

      for(var i = col-1 ;i>=0;i--){
      if(arrBoard[row][col]["state"]== arrBoard[row][i]["state"]){
          counter++
        
      }else{
        break;
        }
      }
      return counter;
    }        
    function vertCheck(row,col){
        var counter = 1
      //  console.log(arrBoard[0][3]["state"])

        for(var i = row +1 ;i<arrBoard.length;i++){
          if(arrBoard[row][col]["state"]== arrBoard[i][col]["state"]){
              counter++
          }else{
            break;
            }
          }

          for(var i = row-1 ;i>=0;i--){
          if(arrBoard[row][col]["state"]== arrBoard[i][col]["state"]){
              counter++
            
          }else{
            break;
            }
          }
          return counter;
        }
        function diagCheckRight(row,col){
          var counter = 1
          let i1=row
          let j1=col
          while(i1<arrBoard.length-1 && j1<arrBoard[row].length-1) {
              if(arrBoard[row][col]["state"]==arrBoard[++i1][++j1]["state"]){
                 counter++
                 
              }else{
                break;
              }
          }
          let i2=row
          let j2=col
          while(i2>0 && j2>0) {
          if(arrBoard[row][col]["state"]==arrBoard[--i2][--j2]["state"]){
             counter++
             
          }else{
            break;
          }
      }
      return counter;
    }
     
    function diagCheckLeft(row,col){
      var counter = 1
      let i1=row
      let j1=col
      while(i1<arrBoard.length-1 && j1>0) {
          if(arrBoard[row][col]["state"]==arrBoard[++i1][--j1]["state"]){
             counter++
             
          }else{
            break;
          }
      }
      let i2=row
      let j2=col
      while(i2>0 && j2<arrBoard[row].length-1) {
      if(arrBoard[row][col]["state"]==arrBoard[--i2][++j2]["state"]){
         counter++
         
      }else{
        break;
      }
  }
  return counter;
}

function checkGameFlow() {
  if (gameState == 1){
  var col=coinState.droppedCol
  if (col>=0 && isValidCol(col)) {
    //Matter.Body.setStatic(coins[coins.length - 1].body,false)
    var row = board.getDroppedCoinRow(col)
    coins[coins.length - 1].state = "Dropped"
    arrBoard[row][col]["state"] = turn

    if (allchecks(row, col)) {
      //call winning func
      game.updateMsg("WIN")
      game.updateState(2);
      
    }
    else if (coins.length == numRow * numCol) {
      game.updateMsg("TIE")
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
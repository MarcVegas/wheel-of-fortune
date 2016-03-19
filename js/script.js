console.log("script loaded")

var tiles = [$(".tile.r1"),$(".tile.r2"),$(".tile.r3")]
var tilesPerRow = tiles[0].length

var clue = "hello my name is bob"

function placeClue() {
  clue = clue.split(" ")
  var currRow = 0
  var currCol = 0

  for(var i=0; i<clue.length; i++) {  //for each element (aka word) in clue
    currWord = clue[i]
    if(currCol + currWord.length < tilesPerRow) { //if element fits
      if(currCol !== 0) { //if not on first column add a space
        currCol += 1
      }
    } else {
      currRow += 1 //go to next row
      currCol = 0 //go to first tile of that row
    }
    for(var j=0; j< currWord.length; j++) {
      $(tiles[currRow][currCol]).addClass('blank-tile').html(currWord[j])
      currCol++
    }
  }
}
  //for each element (aka word) in clue
     //check if the word fits
        //if it fits
          // if not the first word
            // add space
       // else go to next row
     //now add the word






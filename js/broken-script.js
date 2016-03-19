

// for (var i=0; i<clue.length; i++) {
//     for (j=0; j<tilesPerRow; j++) {
//       if(clue[i] !== " ") {
//       $(tiles[i]).addClass('blank-tile')
//       }
//       $(tiles[i]).html(clue[i]) //this gives you the answer
//     }
//   }

 // clue = clue.split(" ")
 //  var currentTile = 0
 //  var currentRow = 1
 //  //row 1 tile = 0
 //  //row 2 tile = 10
 //  //row 3 tile = 20 = Math.floor(currentTile/ tilesPerRow)

 //  //for each element (aka word) in clue
 //  for (var i=0; i<clue.length;i++) {
 //    var currWord = clue[i]
 //    //check if the word fits
 //    if(currWord.length + currentTile <= tilesPerRow) { //if it fits
 //      if(i!==0) { // if not the first word
 //        currentTile +=1 // add space
 //      }
 //    } else {
 //      // go to next row
 //      currentTile = Math.ceil(currentTile/tilesPerRow)* tilesPerRow
 //    }
 //    //now add the word
 //    for (var j=0;j<currWord.length; j++) {
 //      $(tiles[currentTile]).html(currWord[j])
 //      console.log(currWord[j], currentTile)
 //      currentTile++
 //    }

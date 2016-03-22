
console.log("script loaded")

var tiles = [$(".tile.r1"),$(".tile.r2"),$(".tile.r3")]
var tilesPerRow = tiles[0].length
var buyVowelButton = $("#buy-vowel")
var solveButton = $("#solve")
var guessBox = $("#guess-box")
var instructionBox = $("#instructions")
var startButton = $("#start").click(playTurn)
var gameState = "start"

var clue = "hello my name is bob"
var clueArr
var clueTablePos = []
var returnPressed = false
var guessedLetters = ""
var score = [0,0]
var scoreEls = $("#p1-score, #p2-score")
var currPlayer = 0
var currSpinVal = 0


var wheel = {
  el: $("#wheel"),
  values: [ 50000,
            5000,
            8500,
            3000,
            5000,
            4500,
            "Lose a Turn",
            4000,
            9500,
            3500,
            5000,
            6500,
            "Bankrupt",
            7000,
            3000,
            3000,
            8000,
            9000,
            6000,
            3000,
            5500,
            7500,
            4000,
            5000,
            3000],
  spin: function() {
      //hide the other buttons
      gameState = "spin"
      buyVowelButton.hide()
      solveButton.hide()
      guessBox.show()

      var max = wheel.values.length
      var min = 0
      currSpinVal = wheel.values[Math.floor(Math.random() * (max - min)) + min]

      if(currSpinVal === "Bankrupt") {
        instructionBox.html("Sad, you're bankrupt")

      } else if (currSpinVal === "Lose a Turn") {
        console.log("you lose your turn")
      } else {
        instructionBox.html("Nice, " + currSpinVal + ". Guess a letter and press enter.")
      }

      wheel.el.hide()
      return currSpinVal
    }
}



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

$(document).keydown(function (e) {
  if(e.which === 13 && returnPressed === false) {
    guess(guessBox.val())
    guessBox.val("")
    returnPressed = true
  }
})

$(document).keyup(function (e) {
  if(e.which === 13 && returnPressed === true) {
    returnPressed = false
  }
})


wheel.el.click(wheel.spin)
buyVowelButton.click(buyVowel)
solveButton.click(solve)

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

buyVowelButton.hide()
solveButton.hide()
guessBox.hide()
wheel.el.hide()


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function playTurn() {
  gameState = "choose"
  placeClue()
  instructionBox.html("Ok Player " + (currPlayer + 1) + ", what do you want to do?")

  //choose what you want to do.
  choose()
}


function placeClue() {
  clueArr = clue.split(" ")
  var currRow = 0
  var currCol = 0

  for(var i=0; i<clueArr.length; i++) {  //for each element (aka word) in clue
    currWord = clueArr[i]
    if(currCol + currWord.length < tilesPerRow) { //if element fits
      if(currCol !== 0) { //if not on first column add a space
        currCol += 1
      }
    } else {
      currRow += 1 //go to next row
      currCol = 0 //go to first tile of that row
    }
    for(var j=0; j< currWord.length; j++) {
      $(tiles[currRow][currCol]).addClass('blank-tile')//.html(currWord[j])
      clueTablePos.push([currRow, currCol])
      currCol++
    }
  }
}

function guess(letter) {
  if (isVowel(letter) && gameState ==="spin" ) {
    showMessage("If you want to guess a vowel, buy a vowel. Please guess a constonant.")
  } else if(gameState === "spin") {
    var bleh = clue.replace(/\s/ig, "")
    //get rid of spaces in clue for this function (b/c cluesTableMap doesn't map out the spaces)
    var pos = bleh.indexOf(letter)
    var posArr = []
    var count = 0

    //look for the letters in the clue
    if(bleh.indexOf(letter) === -1) {
      instructionBox.html("Sorry, no " + letter)
      nextPlayer()
      playTurn()
      return
    } else if(guessedLetters.indexOf(letter) !== -1) {
      instructionBox.html("Sorry, " + letter +" was already guessed.")
      nextPlayer()
      playTurn()
      return
    } else {
      //if it exists, return all the indicies of the letter in the clue and their respective position on the table
      while (pos !== -1) {
        posArr.push(pos)
        pos = bleh.indexOf(letter, pos+1)
        count++
      }
    }

    //highlight the tiles with the letter
    for (var i=0;i<posArr.length; i++) {
      tileRow = clueTablePos[posArr[i]][0]
      tileCol = clueTablePos[posArr[i]][1]
      $(tiles[tileRow][tileCol]).addClass("highlight").html(bleh[posArr[i]]).click(function(e) { //give tiles ability to flip
        $(e.currentTarget).removeClass('highlight')
        console.log("hello")
        $(e.currentTarget).off()
      });
    }

    guessedLetters += letter // add the letter to the guessed letter

    gameState = "choose"
    playTurn()

    return count
  }

}

function guessCheck (letter) { // returns "correct", "vowel", "already guessed", or "wrong"

}

function buyVowel () {
  //1. guess
  //2. update score
  console.log('buy a vowel!')
}

function updateScore (points, numGuessed) {
  score[currPlayer] = score[currPlayer] + points*numGuessed
  $(scoreEls[currPlayer]).html(score[currPlayer])
}

function solve() {
  console.log('solve')
}


function isVowel (letter) {
  letter = letter.toLowerCase()
  var vowels = ["a", "e", "i", "o", "u"]
  return vowels.indexOf(letter) !== -1
}

function nextPlayer() {
  if(currPlayer === 1) {
    currPlayer = 0
  } else {
    currPlayer++
  }
  console.log(currPlayer)
}

function showMessage(msg) {
  instructionBox.html(msg+ " ")
  instructionBox.append($("<button id=continue>").click(choose))
}

function choose() {
  console.log("test")
  startButton.hide()
  guessBox.hide()
  buyVowelButton.show()
  solveButton.show()
  wheel.el.show()
  $("#continue").off()
}




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

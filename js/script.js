console.log("script loaded")

var tiles = [$(".tile.r1"),$(".tile.r2"),$(".tile.r3")]
var tilesPerRow = tiles[0].length
var spinButton = $("#spin")
var buyVowelButton = $("#buy-vowel")
var solveButton = $("#solve")
var guessBox = $("#guess-box")

var wheel = [ 50000,
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
              3000]

var clue = "hello my name is bob"
var clueArr
var clueTablePos = []
var returnPressed = false
var guessedLetters = ""
var score = [0,0]
var scoreEls = $("#p1-score, #p2-score")
var currPlayer = 0

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


spinButton.click(spinWheel)
buyVowelButton.click(buyVowel)
solveButton.click(solve)

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



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
      $(tiles[currRow][currCol]).addClass('blank-tile').html(currWord[j])
      clueTablePos.push([currRow, currCol])
      currCol++
    }
  }
}

function spinWheel() {
  var max = wheel.length
  var min = 0
  var points = wheel[Math.floor(Math.random() * (max - min)) + min]
  console.log("points =", points)
  return points
}

function guess(letter) {
  var bleh = clue.replace(/\s/ig, "")
  //get rid of spaces in clue for this function (b/c cluesTableMap doesn't map out the spaces)
  var pos = bleh.indexOf(letter)
  var posArr = []
  var count = 0

  //look for the letters in the clue
  if(bleh.indexOf(letter) === -1) {
    return "wrong!" //if you're wrong, then the function ends
  } else if(guessedLetters.indexOf(letter) !== -1) {
    return "already guessed that letter"
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
    $(tiles[tileRow][tileCol]).addClass("highlight")
  }

  guessedLetters += letter // add the letter to the guessed letter
  return count
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


var roundScore = [0,0]
var currPlayer = 0

var clue = "hello my name is bob"
var clueTablePos = []
var guessedLetters = ""


var $tiles = [$(".tile.r1"),$(".tile.r2"),$(".tile.r3")]
var tilesPerRow = $tiles[0].length

var $instructionBox = $("#instructions")

var $p1Score = $("#p1-score")
var $p2Score = $("#p2-score")
var pScore = {  score: [0,0],
                el: [$p1Score, $p2Score]}


var $startButton = $("#start")
var $guessInput = $("#guess-input")
var $spinButton = $("#spin")
var $buyVowelButton = $("#buy-vowel")
var $solveButton = $("#solve")
var $wheel = $("#wheel")

$wheel.values = [ 50000,
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

$wheel.getValue = function () {
  var max = this.values.length
  var min = 0
  return this.values[Math.floor(Math.random() * (max - min)) + min]
}




/* --------------------------------------------------------------- */

$startButton.on("click", function (e) {
  showMessage("Let's play!", true)
  $startButton.hide().off()
  placeTiles()
})

/* --------------------------------------------------------------- */
function showMessage(msg, showContinue) {
  $instructionBox.html(msg+ " ")
  if(showContinue) {
    $instructionBox.append($("<button id=continue>").click(function () {
    $(this).hide()
    choose()
    }).html(">"))
  }
}

function placeTiles() {
  var clueArr = clue.split(" ")
  var currRow = 0
  var currCol = 0

  for(var i=0; i<clueArr.length; i++) {  //for each element (aka word) in clue
    var currWord = clueArr[i]
    if(currCol + currWord.length < tilesPerRow) { //if element fits
      if(currCol !== 0) { //if not on first column add a space
        currCol += 1
      }
    } else {
      currRow += 1 //go to next row
      currCol = 0 //go to first tile of that row
    }
    for(var j=0; j< currWord.length; j++) {
      $($tiles[currRow][currCol]).addClass('blank-tile')//.html(currWord[j])
      clueTablePos.push([currRow, currCol])
      currCol++
    }
  }
}

function choose() {
  enableChoices()
  showMessage("Ok Player " + (currPlayer+1) + ", what do you want to do?", false)
}

function enableChoices() {
  $spinButton.show().on("click", spin)
  $buyVowelButton.show().on("click", buyVowel)
  $solveButton.show().on("click", solve)
}

function disableChoices() {
  $spinButton.hide().off()
  $buyVowelButton.hide().off()
  $solveButton.hide().off()
}

function spin () {
  var returnDown = false
  disableChoices()

  var spinValue = $wheel.getValue()

  console.log("currPlayer =", currPlayer, "spinValue =", spinValue)

  if(spinValue === "Bankrupt") {
    showMessage(spinValue +  "! Womp womp!", true)
    updateScore(0,0,true)
    nextPlayer()

  } else if (spinValue === "Lose a Turn") {
    showMessage(spinValue +  " Player " + (currPlayer+1) + ".", true)
    nextPlayer()
  } else {
    $guessInput.show().keydown(function (event){
      if(event.which === 13 && returnDown === false) {
        returnDown = true
        guess($(this).val(), spinValue)
        $(this).val("")
      }
    }).keyup(function(event) {
      if(event.which === 13 && returnDown === true){
        returnDown = false
      }
    })
    showMessage(spinValue +  "! Player " + (currPlayer+1) + ", please guess a letter.", false)
  }
}


function buyVowel () {
  console.log("buy a vowel!")
}

function solve () {
  console.log("solve!")
}

function guess (letter, spinValue) {
  var result = checkGuess(letter)
  if(result === "vowel") {
    showMessage("Sorry, you have to buy vowels. Please guess a consonant. You spun " + spinValue + ".", false)
  } if(result === "not a letter") {
    showMessage("Uh, that's not a letter", false)
  } else if (result === "already-guessed") {
    showMessage("Whoops, '" + letter + "' was already guessed. Sorry you lost your turn.", true)
    nextPlayer()
    $guessInput.hide().off()
  } else if (result === "wrong") {
    guessedLetters += letter
    nextPlayer()
    showMessage("No '" + letter + "'. Player " + (currPlayer+ 1) + ", you're up", true)
    $guessInput.hide().off()
  } else if (result === "correct") {
    guessedLetters += letter
    var clueNoSpaces = clue.replace(/\s/ig, "")
    var pos = clueNoSpaces.indexOf(letter)
    var posArr = []
    var count = 0

    while (pos !== -1) {
        posArr.push(pos)
        pos = clueNoSpaces.indexOf(letter, pos+1)
        count++
    }

    //highlight the tiles with the letter
    for (var i=0;i<posArr.length; i++) {
      tileRow = clueTablePos[posArr[i]][0]
      tileCol = clueTablePos[posArr[i]][1]
      $($tiles[tileRow][tileCol]).addClass("highlight").html(clueNoSpaces[posArr[i]]).click(function(e) { //give tiles ability to flip
          $(e.currentTarget).removeClass('highlight')
          $(e.currentTarget).off()
        })
    }

    updateScore(spinValue, count)

    $guessInput.hide().off()
    showMessage("Alright! Go ahead and flip them!", true)
  }
}

function checkGuess(letter) { //return "vowel", "correct", "already guessed", "wrong", or "not a letter"
  var vowels = ["a", "e", "i", "o", "u"]
  var clueNoSpaces = clue.replace(/\s/ig, "")

  if (letter.length === 0) {
    return "no input"
  } else if (!/[a-zA-Z]/.test(letter)) {
    return "not a letter"
  } else if(vowels.indexOf(letter) !== -1) {
    return "vowel"
  } else if(guessedLetters.indexOf(letter) !== -1) {
    return "already-guessed"
  } else if(clueNoSpaces.indexOf(letter) === -1) {
    return "wrong"
  } else {
    return "correct"
  }
}

function nextPlayer() {
  if(currPlayer === 1) {
    currPlayer = 0
  } else {
    currPlayer++
  }
}


function updateScore (points, numGuessed, bankrupt) {
  if(bankrupt) {
    roundScore[currPlayer] =0
  } else {
    roundScore[currPlayer] += points*numGuessed
  }
  pScore.el[currPlayer].html(roundScore[currPlayer])

}

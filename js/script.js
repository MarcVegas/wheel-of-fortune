var gameScore = [0,0]
var roundScore = [0,0]
var currPlayer = 0
var round = 1

var clue, category
[category, clue] = clueBank.getRandClue()
console.log(category, ",",clue)
var clueTablePos = []
var guessedLetters = ""
var buyAVowel = false


var $tiles = [$(".tile.r1"),$(".tile.r2"),$(".tile.r3")]
var tilesPerRow = $tiles[0].length
var $category = $("#category")

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
  placeTiles()
  showMessage("Let's play!", true) // shows message and displays continue button
  $startButton.hide().off()
})

/* --------------------------------------------------------------- */
function showMessage(msg, showContinue, nextRound) {
  $instructionBox.html(msg + " ")
  if(showContinue) {
    $instructionBox.append($("<button id=continue>").click(function () {
      $(this).hide()
      choose()
    }).html(">"))
  }
  if (nextRound) {
    $instructionBox.append($("<button id=continue>").click(function () {
      $(this).hide()
      emptyBoard()
      // placeTiles()
      showMessage("Let's play the round " + round,true)
    }).html(">"))
  }
}

function emptyBoard() {
  for (var i=0; i<$tiles.length; i++) {
    $tiles[i].removeClass("blank-tile").html("")
  }
}

function placeTiles() {
  var clueArr = clue.split(" ")
  var currRow = 0
  var currCol = 0

  $category.html(category)

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
  buyAVowel = false
  disableChoices()

  var spinValue = $wheel.getValue()


  if(spinValue === "Bankrupt") {
    showMessage(spinValue +  "! Womp womp!", true)
    updateScore(0,0,true)
    nextPlayer()

  } else if (spinValue === "Lose a Turn") {
    showMessage(spinValue +  " Player " + (currPlayer+1) + ".", true)
    nextPlayer()
  } else {
    var returnDown = false
    $guessInput.show().focus().keydown(function (event){
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
  //check if you can even buy a vowel
  if(roundScore[currPlayer] < 250) {
    showMessage("You need at least 250 for a vowel.", true)
    $guessInput.hide().off()
  } else {
    spinValue = -250
    disableChoices()
    showMessage("Alright, vowels are 250 each.", false)
    var returnDown = false
      $guessInput.show().focus().keydown(function (event){
        if(event.which === 13 && returnDown === false) {
          returnDown = true
          guessVowel($(this).val(), spinValue)
          $(this).val("")
        }
      }).keyup(function(event) {
        if(event.which === 13 && returnDown === true){
          returnDown = false
        }
      })
  }
}

function solve () {
  disableChoices()
  showMessage("Go ahead and solve.")
  var returnDown = false
  $guessInput.show().focus().attr('maxlength', 30).keydown(function (event){
    if(event.which === 13 && returnDown === false) {
      returnDown = true
      checkSolve($(this).val())
      $(this).val("").attr('maxlength', 1)
    }
  }).keyup(function(event) {
    if(event.which === 13 && returnDown === true){
      returnDown = false
    }
  })
}



function guess (letter, spinValue) {
  letter = letter.toLowerCase()
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

      letterCount = updateBoard(letter)

      updateScore(spinValue, letterCount)

      $guessInput.hide().off()
      showMessage("Alright! Go ahead and flip them!", true)
  }
}

function guessVowel (letter, spinValue) {
  letter = letter.toLowerCase()

  //check the letter
  var result = checkGuess(letter)
  var clueNoSpaces = clue.replace(/\s/ig, "")
  if(result !== "vowel") {
    showMessage("That's not a vowel.", false)
  } else {
    if (guessedLetters.indexOf(letter) !== -1){
      showMessage("Whoops, '" + letter + "' was already guessed. Sorry you lost your turn.", true)
      nextPlayer()
      $guessInput.hide().off()
    } else if (clueNoSpaces.indexOf(letter) === -1) {
      guessedLetters += letter
      nextPlayer()
      showMessage("No '" + letter + "'. Player " + (currPlayer+ 1) + ", you're up", true)
      $guessInput.hide().off()
    } else {
        guessedLetters += letter

        letterCount = updateBoard(letter)
        updateScore(spinValue, letterCount)
        $guessInput.hide().off()
        showMessage("Flip over those vowels!", true)
    }
  }
}

function updateBoard(letter) {
  //find positions of letter on board
  var clueNoSpaces = clue.replace(/\s/ig, "")
  var pos = clueNoSpaces.indexOf(letter)
  var posArr = []
  var count = 0

  // pos and count of the letters
  while (pos !== -1) {
      posArr.push(pos)
      pos = clueNoSpaces.indexOf(letter, pos+1)
      count++
  }

  //highlight all the tiles with that letter
  for (var i=0;i<posArr.length; i++) {
    tileRow = clueTablePos[posArr[i]][0]
    tileCol = clueTablePos[posArr[i]][1]
    $($tiles[tileRow][tileCol]).addClass("highlight").html(clueNoSpaces[posArr[i]]).click(function(e) { //give tiles ability to flip
        $(e.currentTarget).removeClass('highlight').off()
      })
  }

  return count
}


//note have it return an array of strings
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

function checkSolve(guess) {
  guess = guess.toLowerCase()

  var clueNoSpaces = clue.replace(/\s/ig, "")
  var guessNoSpaces = guess.replace(/\s/ig, "").toLowerCase()
  if (clueNoSpaces === guessNoSpaces) {
    // loop through every letter in the clue and place it on the board
    for (var j=0; j<guessNoSpaces.length; j++) {

      //find the position(s) of that letter
      var letter = guessNoSpaces[j]
      var pos = clueNoSpaces.indexOf(letter)
      var posArr = []
      var count = 0

      while (pos !== -1) {
          posArr.push(pos)
          pos = clueNoSpaces.indexOf(letter, pos+1)
          count++
      }

      //place that letter on the board
      for (var i=0;i<posArr.length; i++) {
        tileRow = clueTablePos[posArr[i]][0]
        tileCol = clueTablePos[posArr[i]][1]
        $($tiles[tileRow][tileCol])
          .html(clueNoSpaces[posArr[i]])
          .click(function(e) { //give tiles ability to flip
            $(e.currentTarget).off()
          })
      }
    }
    showMessage("Congratulations! You banked " + roundScore[currPlayer] + " that round! Here are the scores.", false,true)
    //bank round points of the current player only
    gameScore[currPlayer] += roundScore[currPlayer]
    //reset round score
    roundScore = [0,0]
    //display game scores
    for (var i=0; i<gameScore.length; i++) {
      pScore.el[i].html(gameScore[i])
    }
    //go to next round.
    nextRound()


  } else {
    nextPlayer()
    showMessage("Not quite, sorry. You're up Player "+ (currPlayer+1), true)
  }

  $guessInput.hide().off()
}

function nextPlayer() {
  if(currPlayer === 1) {
    currPlayer = 0
  } else {
    currPlayer++
  }
}

function nextRound() {
  if (round > 3) {
    console.log("finished game")
    round = 0
    console.log("now round =", round)
  } else {
    round++
    console.log("round = ", round)
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

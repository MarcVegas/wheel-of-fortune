var $startButton = $("#start")
var $guessInput = $("#guess-input")
var $spin = $("#spin")
var $buyVowel = $("#buy-vowel")
var $solve = $("#solve")
var $wheel = $("wheel")

var $instructionBox = $("#instructions")

var currPlayer = 0

$startButton.on("click", function (e) {
  showMessage("Let's play!", true)
})

function choose() {
  $startButton.hide()
  $spin.show()
  $buyVowel.show()
  $solve.show()
  showMessage("Ok Player " + (currPlayer+1) + ", what do you want to do?", false)
}

function showMessage(msg, showContinue) {
  $instructionBox.html(msg+ " ")
  if(showContinue) {
    $instructionBox.append($("<button id=continue>").click(function () {
    $(this).hide()
    choose()
    }).html(">"))
  }

}

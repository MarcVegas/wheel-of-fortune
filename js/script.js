console.log("script loaded")

var tiles = $(".tile")

var clue = "hello aj"

function bleh() {
  for (var i=0; i<clue.length; i++) {
    $(tiles[i]).html(clue[i])
  }
}



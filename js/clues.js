clueBank =[
{category:'event' , clue:'dinner and a movie'},
{category:'movie' , clue:'titanic'},
{category:'designer brand ' , clue:'alexander mc queen '},
{category:'mexican food' , clue:'arroz con pollo'},
{category:'favorite ga wdi person ' , clue:'joseph '},
{category:'e coli factory' , clue:'chipotle'},
{category:'do this in the morning' , clue:'brush your teeth'},
{category:'in the kitchen' , clue:'microwave oven'}
]

clueBank.getRandClue = function () {
  var max = this.length
  var min = 0
  randI = Math.floor(Math.random() * (max - min)) + min
  var category = this[randI].category
  var clue = this[randI].clue
  clueBank.splice(randI,1)
  return [category, clue]
}


var gifUrls = [ "https://media2.giphy.com/media/yhfTY8JL1wIAE/200.gif",
                "https://media.giphy.com/media/TlK63ED1ShqW53CCUNO/200.gif",
                "https://media1.giphy.com/media/l0NwNQ5nfmFOPvv5m/200.gif",
                "https://media3.giphy.com/media/14ayNgUBowfsjK/200.gif",
                "https://media2.giphy.com/media/HqgwFzsJncfjW/200.gif",
                "https://media1.giphy.com/media/3o8doSSp6MTgcgrnHi/200.gif",
                "https://media2.giphy.com/media/xTiTnCyfutIMgUJPgY/200.gif",
                "https://media0.giphy.com/media/5yLgocrb5JLqhq7pp3W/200.gif",
                "https://media1.giphy.com/media/CItWwfeMBdiZa/200.gif",
                "https://media3.giphy.com/media/YrJp9LFIDkwms/200.gif",
                "https://media1.giphy.com/media/XVMeBWrKBpb5m/200.gif",
                "https://media1.giphy.com/media/134DHd1VQrXvuE/200.gif",
                "https://media0.giphy.com/media/12CG3zRhS63JJu/200.gif",
                "https://media1.giphy.com/media/xT0BKKqGNmvgqvjCo0/200.gif",
                "https://media3.giphy.com/media/l41lHDSvmwnQGDUD6/200.gif",
                "https://media2.giphy.com/media/zKqY3liTpHwOc/200.gif",
                "https://media1.giphy.com/media/3oEduLs7eN545vHYYg/200.gif",
                "https://media0.giphy.com/media/xkCK3tAhDSUBa/200.gif"]

gifUrls.getUrl = function () {
  var max = this.length
  var min = 0
  randI = Math.floor(Math.random() * (max - min)) + min
  return this[randI]
}

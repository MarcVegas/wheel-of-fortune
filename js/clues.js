clueBank =[
{category:'around the house' , clue:'address book'},
{category:'food and drink' , clue:'american cheddar cheese'},
{category:'food and drink' , clue:'banana split'},
{category:'fictional characters' , clue:'big bird'},
{category:'around the house' , clue:'bookends'},
{category:'fictional characters' , clue:'chicken little'},
{category:'food and drink' , clue:'chicken salad'},
{category:'around the house' , clue:'desk chair'},
{category:'food and drink' , clue:'eclair'},
{category:'food and drink' , clue:'gala apples'},
{category:'food and drink' , clue:'gala apples'},
{category:'fictional characters' , clue:'harry potter'},
{category:'fictional characters' , clue:'homer simpson'},
{category:'fictional characters' , clue:'jabba the hut'},
{category:'food and drink' , clue:'long grain rice'},
{category:'food and drink' , clue:'pudding cup'},
{category:'food and drink' , clue:'rice and beans'},
{category:'food and drink' , clue:'shrimp taco'},
{category:'food and drink' , clue:'taco salad'},
{category:'fictional characters' , clue:'wile e coyote'},
{category:'around the house' , clue:'winter coat'},
{category:'food and drink' , clue:'pizza burger'}
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
                ]

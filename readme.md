#Wheel of Fortune

By: AJ Almaguer


I made this version of Wheel of Fortune for my first project of General Assembly's Web Development Immersive program. I chose this project because it could be something that I would actually use with my friends and family. I used to be a summer camp counselor, so I enjoy facilitating group experiences.

This is a two-player Wheel of Fortune game. Players have three rounds to "bank" as many points to win the game. In each round, you earn points by "spinning the wheel" and correctly guessing letters in the of the puzzle displayed on the board. But be careful of landing on *Bankrupt* or *Lose-a-Turn*! 

Just like the TV show, you have to keep track of the guessed letters yourself. If the letter you guess isn't in the puzzle or has already been guessed, you lose your turn. A round ends when a player solves the puzzle, which allows them to "bank" their points for that round—the other player loses all points earned that round since they didn't solve.

**Play it here:** [http://ajalmaguer.github.io/wheel-of-fortune/](http://ajalmaguer.github.io/wheel-of-fortune/)

##Technologies Used

1. HTML
2. CSS
   * CSS3 Animations and Transitions
   * ​
3. Javascript & JQuery
4. Gifs curtousy of [Giphy.com](www.giphy.com)

##The Design

User stories can be found at: [Pivotal Tracker Board](https://www.pivotaltracker.com/n/projects/1558283)

The game board is created using a table. The cells that hold the clue letters have the class `"tiles". The tiles are called into javascript using jquery and are placed into a 2D Array. The critical function is placeTiles(), which takes the clue, breaks up the string into an array, and places each word onto the board one at a time. If the word does not fit onto the row, it will be placed at the beginning of the next row.


![board design](https://raw.githubusercontent.com/ajalmaguer/wheel-of-fortune/master/images/wheel-of-fortune.png)


These are the flow charts I made to plan out the logic of the game. The three basic options you have when it's your turn is spin, buy vowel, and solve. Each button has it's own function to execute the logic of that choice.


![spin logic](https://raw.githubusercontent.com/ajalmaguer/wheel-of-fortune/master/images/spin%20flow%20chart.png)


![buy vowel logic](https://raw.githubusercontent.com/ajalmaguer/wheel-of-fortune/master/images/buy%20vowel%20flow%20chart.png)


![solve logic](https://raw.githubusercontent.com/ajalmaguer/wheel-of-fortune/master/images/solve%20flow%20chart.png)


The game checks the letters you guess. It knows whether you guessed a constonant, a vowel, a non-letter, or a letter that was already guessed. The game is not case sensitive.


I mostly worked on the control logic of the game before adding css. Here's a gif of the project throughout the development process.


![screenshots](https://raw.githubusercontent.com/ajalmaguer/wheel-of-fortune/master/images/design-over-time.gif)


##Get Started

1. Download this repository
2. Open **index.html**

*Play online here:* [ajalmaguer.github.com/wheel-of-fortune](ajalmaguer.github.com/wheel-of-fortune) 



## Next Steps


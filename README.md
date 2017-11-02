# golf-stats

This project can be used to keep track of rounds of golf played and to calculate various statistics such as handicap index and scoring average. It uses the Flask framework for the backend, Jinja2 for rendering templates and Pandas for some of the calculations. I created it to practice Flask; it's a work in progress.

Deployed on Heroku at: https://golf-stats.herokuapp.com

For any interested party, the code for calculating handicap can be found in /backend/models/round.py. The algorithm is exactly as defined by the USGA except for the number of rounds used for the calculation when fewer than 20 rounds have been entered. I felt that using more rounds gives a better representation of what a golfer can expect his/her handicap to be once more rounds are entered.

Main page:
![Main page](/static/images/main.png?raw=true)

List of rounds:
![Old rounds](/static/images/rounds.png?raw=true)

Round edit page:
![Round edit](/static/images/round_edit.png?raw=true)

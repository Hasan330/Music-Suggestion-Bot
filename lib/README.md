Logic:
1) User initiates talk with bot
2) Bot tells the user how it could be used
	options:
	a) suggest random song
	b) predict taste (suggest random songs and rate taste based on user feedback)
	c) suggest relevant song (then ask the user how relevant that song was in terms of genre, song choice, aggressiveness, etc..)
	d) what's new
	e) schedule song sending to user
3) User selects applicable criteria and bot deals with it accordingly

Future Plans:
1) Get user data (likes, number of friends, posted music, location, age, gender, etc..)
2) Classify user based on this data and predict taste
3) Link between predicted data and actual user taste (based on knowledge from previous users and user opinions) --> Try to find a general pattern
4) 


Locally:

cd Facebook\ Bot/messenger-platform-samples/node/ 
git commit -am "desired message"
sudo git push heroku master


when this error appears (Error: listen EADDRINUSE :::5000)
	ps aux | grep node
	kill -9 $PID
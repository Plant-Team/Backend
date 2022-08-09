# PLANNING STRATEGY

PLANT WORLD is an application for posting plants that you have grown and finding plants grown by people in your local area. 
When you first enter the site, you are first prompted to sign in, and if you don't have a log in, you can create an account. Once you are logged in, you are routed to the home page, where you can see all of the plants posted by other users. From here you can post your own plants. Once posted, you  can edit and delete those plants if you need to.
If you need to change some of your account details, you can go to your account to edit your details, such as your username. If you don't need your account anymore, you can delete your account by clicking delete.

## PICTURES OF WEBSITE HERE

![alt text](https://)
![alt text](https://)
![alt text](https://)

## TECHNOLOGIES USED
The back end of this application is built in Mode.js, and uses Express, MongoDB, and Mongoose.

INSTALLATION INSTRUCTIONS
All you need to work PLANT WORLD is a modern web browser and you're good to go!

## MVP USER STORIES
- _As a user, I want to be able to create a profile and post plants_
- _As a user, I want to be able to get details from the plants of others, as well as edit my own plants._
- _As a user, I want to be able to delete plants, and if I need to, delete my account._

## WIREFRAMES
These were the concepts for the site created in canva.
![alt text](https://)
![alt text](https://)
![alt text](https://)

## APPROACH TAKEN
We started off planning our application in concept, followed by User Stories. Once the User Stories were complete, we were able to follow a RESTful approach to make our proposed ideas fit into CRUD methods. Then we created wireframes. Our wireframes were the guide for the Frontend, and from those we could figure out our components. Our Backend was the first thing to tackle.
We created a boilerplate for the database and hooked it up to MongoDB. We each took a piece of the models and controllers and plugged them together.
We needed to test these out, and did so in Postman, to make sure that our http methods were functional.
Then we added Authoirization to our plantController, requiring a token from a user in order to POST, PUT, GET, or DELETE them.
We also needed to add a special Sign In and Sign Up function, to post to the database, to return a new token.

In our Frontend repo there are more details about the approach to creating our Backend.

By far the greatest challenge of hooking up the front and back ends was the Authorization in order to pull information that required permissions. What we ended up with was pretty basic, but it works. There's still a lot to learn about the relationship between Frontend and Backend when Auth is in between the two, and in the future, we should probably have left Authorization to the end of the project.

[CLICK THIS LINK TO VISIT THE LIVE SITE](https://secret-refuge-99565.herokuapp.com/api/plants)


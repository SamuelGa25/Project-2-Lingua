# Project-2
https://protected-island-60101.herokuapp.com/


npm init -y
npm i

npm install express sequelize mysql2    
npm i dotenv
npm i bcrypt
npm install express-handlebars
npm i express-session connect-session-sequelize
npm i jest -D

or

npm i express sequelize mysql2 dotenv bcrypt express-handlebars express-session connect-session-sequelize


# Lingua Team Project ![Lingua Logo](./public/images/Logo.png)

> Lingua project. A web application to make new friends and learn a new language.
> GitHub link [_here_](https://github.com/SamuelGa25/Project-2-Lingua.git). 
> Live demo [_here_](https://protected-island-60101.herokuapp.com/). 
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Instructions](#instructions)
* [Features](#features)
* [Screenshots](#screenshots)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contacts](#contacts)



## General Info
Current app will provide an ability to find friends and suggestions for your journey into a new language.

Use Node.js and Express.js to create a RESTful API.

Use Handlebars.js as the templating engine.

Use MySQL and the Sequelize ORM for the database.

Have both GET and POST routes for retrieving and adding new data.

Be deployed using Heroku (with data).

Use at least one new library, package, or technology that we haven’t discussed.

Have a polished UI.

Be responsive.

Be interactive (i.e., accept and respond to user input).

Have a folder structure that meets the MVC paradigm.

Include authentication (express-session and cookies).

Protect API keys and sensitive information with environment variables.

Have a clean repository that meets quality coding standards (file structure, naming conventions, best practices for class/id naming conventions, indentation, quality comments, etc.).

Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).

## Technologies
Project is created with:
- HTML
- CSS
- JavaScript
- Materialize CSS Framework
- jQuery
- NodeJS


## Setup
To open this project in vscode using git in Terminal/Git Bash:

```
$ mkdir lingua
$ cd lingua
$ git clone https://github.com/SamuelGa25/Project-2-Lingua.git
$ code .
```

## Instructions
### When you open app you presented a main blog with all posts/ comments information/ author and date of creation.
- In Age Check Modal you can only click Yes or No. You can't close it with clicking outside of the modal.
   - If you less than 21 and choose NO you will be redirected to a baby website. 
   - If you click Yes in Age Check Modal you will get access to the web app. The local storage will store your selection and won't bother you with this question anymore.
   - If you won't give permission to access your location if will use default location: Miami,FL. And display 20 liquor stores that in this area.
   - If you give permission to access your location the map will display 20 liquor stores close to your location.


1. To search for a cocktail by name:
- Enter a cocktail name in the and click "Find a Recipe"
   - You will be given result based on your request.
   - If you pick a cocktail that not in API database 
      - It will open a Modal with a message that we don't have it in our database.

2. You can start a new search, just follow instruction in step 1.

3. If you don't know what cocktail you want, but want to get something click on Surprise Me button.
- It will display a cocktail randomly picked from our database.
   
4. After you've done with picking and searching for cocktails you can check the closest liquor stores on the map.
- If you click on a marker you will be displayed with:
   - Name
   - Rating
   - Address
   - And a website if the place have this info on the file.

5. As a bonus you can read about paring your new drink with some food.
- Just click [Do you want to find paring food for your cocktail?](https://www.thespruceeats.com/how-to-pair-cocktails-and-food-759992) at the footer, right next to our github account links.

## Features
- Search
- Random Drink
- Map
- Modal Respond
- Keeping Data in Local Storage
- Find Location
- Dynamically Created Elements

## Screenshots
![Example screenshot](./assets/images/screenshot.gif)

You can check the demo [here](https://youtu.be/R3NqT9h9_90).

## Usage
For pleasure and comfort, information that helps you make cocktails and locate closest stores.

## Project Status
Project is: _completed_

## Room for Improvement
To do:
- Add search feature of nearby bars 
- Add menu to nearby bars 
- Suggest bars with the best menu & ratings. 

## Acknowledgements
- This project was inspired by UM Coding Boot Camp Project #1.
- This project using [Google Maps Platform](https://developers.google.com/maps).
- This project using [Cocktail API](https://www.thecocktaildb.com/api.php).
- This project thinks of people needs with finding right meal for a cocktail by redirection to [The Spruce Eats](https://www.thespruceeats.com/how-to-pair-cocktails-and-food-759992).
- This project lets people have fun, no matter of their age, using help of [KneeBouncers](https://kneebouncers.com/).

- This project was creating from scratch using ideas and believes of an incredible team of people👽.
![Example gif](./assets/images/team-people.jpg)

## Contacts
Created by:
- [Stepan Matysik](https://github.com/elfsvet).
- [Samuel Garcia](https://github.com/SamuelGa25).
- [Josiah Canada](https://github.com/Josiah-Canada).
- [Michel Lopez]().

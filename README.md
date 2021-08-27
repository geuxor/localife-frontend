# Localife - your next local adventures

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

> Frontend client files for the localife app. ([localife backend](https://github.com/geuxor/localife-backend)  )

[![GitHub license](https://img.shields.io/github/license/geuxor/localife-frontend)](https://github.com/geuxor/localife-frontend/blob/develop/LICENSE)[![GitHub release](https://img.shields.io/github/release/geuxor/localife-frontend)](https://github.com/geuxor/localife-frontend/releases/tag/0.9.0)[![GitHub contributors](https://img.shields.io/github/contributors/geuxor/localife-frontend)](https://github.com/geuxor/localife-frontend/graphs/contributors)[![GitHub issues](https://img.shields.io/github/issues/geuxor/localife-frontend)](https://GitHub.com/geuxor/localife-frontend/issues)

<span align="center">![ForTheBadge built-with-love](https://forthebadge.com/images/badges/built-with-love.svg)</span>

<p align="center">
 <img src="./readmeFiles/logo-small.png" alt="localife logo" style="zoom:40%;" >


Localife is an app that encourages you to explore the world by enjoying the life of a local!
It started with an idea of a scratch map and evolved into a good looking, smooth running and fun Web App.
Localife is made with React and Express and with the help of Postgres and Redis.

 </p>
 
<p align="center">
 <img src="./readmeFiles/back500.png" style="zoom:20%;" >
</p>

Once you're logged in (0Auth is coming next...), start searching by location and dates - you will discover many type of local experiences listed while visible in a map! You can select a map pin for more information and see the description of each experience. You can book by date and amount of people using Stripe Connect and see a list of bookings and (coming soon... start chatting with the provider). 

It's very easy to register as a provider, and you can start creating experiences in no-time. As a provider you decide the price, location and images.Travellers will soon be booking your experience and you can start sharing your daily activities, stories, common interests and favorite spots with the visitor. 

If you don't know where to go next, try the discovery button that will give you a variety of suggestions (comming next... )

<p align="center">
 <img src="./readmeFiles/screenshot2.png" >
</p>

## TLDR:

Checkout a video demo of the app on [YouTube](https://www.youtube.com/watch?v=):

[![Watch the video](https://img.youtube.com/vi//hqdefault.jpg)](https://youtu.be/)

## Table of contents

[localife backend](https://github.com/geuxor/localife-backend)  
[Tech Stack](#tech-stack)  
[Running localife](#running-localife)
[Architecture](#architecture)
[Observations](#observations)  
[Developers Team](#developers-team)  
[Contributors](#contributors-✨)


## Tech Stack

💖 [React]()\
💖 [Typescript](https://www.typescriptlang.org/)  
💖 [Redux](https://redux.js.org/)  
💖 [Express](https://expressjs.com/)  
💖 [PostgreSQL](https://www.postgresql.org/)  
💖 [Sequelize](https://sequelize.org/)  
💖 [Heroku](https://www.heroku.com/)  
💖 

## Tech-Stack

![https://reactjs.org](https://img.shields.io/badge/react-%5E16.3.1-%2361DAFB?style=flat-square&logo=react)
![https://www.typescriptlang.org](https://img.shields.io/badge/TypeScript-%5E3.7.5-%23007ACC?style=flat-square&logo=typescript)

### Frontend

- [TypeScript](https://www.typescriptlang.org)
- [React](https://reactjs.org)
- [Style-components](https://styled-components.com/)
- [Cloudinary](https://cloudinary.com/)
- [Redux](https://redux.js.org/)

![https://www.cloudinary.com](https://img.shields.io/badge/cloudinary-API-yellow)
![https://www.material-ui.com](https://img.shields.io/badge/material--ui--white?style=for-the-badge&logo=materialui)
![https://www.stripe.com](https://img.shields.io/badge/stripe%20Connect--v1--white?style=for-the-badge&logo=stripe)
![https://www.typescriptlang.org](https://img.shields.io/badge/typescript--v1--white?style=for-the-badge&logo=typescript)
![https://www.reactjs.org](https://img.shields.io/badge/react--v1--white?style=for-the-badge&logo=react)
![https://ant.design/](https://img.shields.io/badge/antd--v1--white?style=for-the-badge&logo=npm)
![https://github.com/axios/axios](https://img.shields.io/badge/axios--v1--white?style=for-the-badge&logo=npm)
![https://redux.js.org/](https://img.shields.io/badge/redux--v1--white?style=for-the-badge&logo=redux)
![https://styled-components.com/](https://img.shields.io/badge/styled%20components--v1--white?style=for-the-badge&logo=styled-components)
![https://eslint.org/](https://img.shields.io/badge/eslint--v1--white?style=for-the-badge&logo=eslint)

### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org)
- [PostgreSQL](https://www.postgresql.org/)  
- [Sequelize](https://sequelize.org/)  

### CI / CD

- [Github](https://github.com/features/actions)
- [Trello](https://trello.com)

### Hosting

- [heroku](https://heroku.com) for Frontend and Backend
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for the Database

### Authentication

- Session Cookies with bcrypt

### APIs

- [Stripe Connect](https://stripe.com)
- [Google Places API](https://cloud.google.com/maps-platform/places)


## Running Localife

- Fork & clone this repo  
  Run `npm i` in localife directory  
  Adjust the necessary env variables to match your system. There's a .env.copy file to help you with this process.  
  (You will need an API key for the untappd and google places APIs)  
  Run `npm start`

- Fork & clone the [server repo](https://github.com/geuxor/localife-backend)  
  Make sure you have postgreSQL installed on your machine [mac](https://www.postgresql.org/download/macosx/) || [windows](https://www.postgresql.org/download/windows/)  
  Run `npm i` in localife-backend/server directory  
  Adjust the necessary env variables to match your system. There's a .env.copy file to help you with this process.
  Edit the ./config/config.json file with your database details.
  With the database running, run `npm run recreateDb`. This will generate the tables in the database and seed the data to get the project started.
  Run `npm start` in localife-backend/server directory
  
## Architecture

<p align="center">
 <img src="./readmeFiles/localife-front.png" style="zoom:20%;" >
</p>

## Observations

##### Room for improvements

- Explore using a more global styling method
- Better typing for TypeScript
- Write tests

##### Next orders

- Deploy localife to the web
- Add chat system
- Add new cities
- Add more badges
- Create PWA 

## Developers Team

😋  German - [Github](https://github.com/geuxor) - [LinkedIn](https://www.linkedin.com/in/german-b)\
🤠  Seb - [Github](https://github.com/) - [LinkedIn](https://www.linkedin.com/)\
🥳  Maria - [Github](https://github.com/) - [LinkedIn](https://www.linkedin.com/)\
😂  Will - [Github](https://github.com/) - [LinkedIn](https://www.linkedin.com/)

## Contributors ✨

Thanks goes to these wonderful people ([💝 ](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
  <td align="center"><a href="http://www.linkedin.com/in/german-b">
   <img src="https://avatars.githubusercontent.com/u/16254346?v=4" width="100px;" alt=""/><br /><sub><b>German</b></sub></a><br />
   <a href="#infra-gexuor" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> 
   <a href="https://github.com/geuxor/localife-frontend/commits?author=geuxor" title="Code">💻</a></td>

   <td align="center"><a href=""><img src="https://avatars3.githubusercontent.com/u/?v=4" width="100px;" alt=""/><br /><sub><b>Seb</b></sub></a><br /><a href="#infra-" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/geuxor/localife-frontend/commits?author=" title="Code">💻</a></td>
   
   <td align="center"><a href=""><img src="https://avatars3.githubusercontent.com/u/?v=4" width="100px;" alt=""/><br /><sub><b>Maria</b></sub></a><br /><a href="#infra-" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/geuxor/localife-frontend/commits?author=" title="Code">💻</a></td>
   
   <td align="center"><a href=""><img src="https://avatars3.githubusercontent.com/u/?v=4" width="100px;" alt=""/><br /><sub><b>Will</b></sub></a><br /><a href="#infra-" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/geuxor/localife-frontend/commits?author=" title="Code">💻</a></td>
  
 </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


# Productivity-Manager

*	A full stack productivity management tool built with React, Express, Node.js and MongoDB.
*   Features include a Kanban board for tasks, a goals section, and a productivity timer.
*   The Kanban board and goals section is built upon the react-beautiful-dnd library for drag and drop.
*   The Productivity App has user authentication through the register and login buttons in the nav bar. It also features a guest button for quick access and testing of the app.
*   The data is stored in a MongoDB database and when the user logs in, the data is fetched through an API call which will then populate the redux store.

<a href="https://productivity-manager-fe.onrender.com/">View the App on Render (may take 15 seconds for backend instance to start)</a>

<a href="https://productivity-manager-fe.onrender.com/">
  <img src="/Screenshots/example.JPG" alt="Logo">
</a>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Contact](#contact)


## Built With

* React.js
* Redux
* Express.js
* Node.js
* MongoDB
* react-beautiful-dnd library
* jwt
* Material UI components

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Create a mongoDB database, for example through https://www.mongodb.com/cloud/atlas

Create a .env file with your mongodb url and jwt secret to be exported for use.

### Installation
 
1. Clone the repo
```sh
git clone https://github.com/nathanjnile/Productivity-Manager.git
```
2. Install NPM packages in both the main and the client directory
```sh
npm install
```

<!-- CONTACT -->
## Contact

Project Link: [https://github.com/nathanjnile/Productivity-Manager](https://github.com/nathanjnile/Productivity-Manager)

# recipe API

This is the data API (back end) for my [React Recipe app](https://github.com/DrewStock/React-Recipe-app) (front end). 
* recipe API is deployed to Heroku at [https://drewstockpdx-recipe-api.herokuapp.com](https://drewstockpdx-recipe-api.herokuapp.com)
* The app creates a web server using [Node.js](https://nodejs.org/en/about/) and [Express](https://expressjs.com/), to serve up data from a [MongoDB](https://www.mongodb.com/) database 
* Data schemas are modeled using [Mongoose](http://mongoosejs.com/)
* Database is hosted by [mLab](https://mlab.com/)
* Overview of functionality:
    * GET request to [https://drewstockpdx-recipe-api.herokuapp.com/api/recipes](https://drewstockpdx-recipe-api.herokuapp.com/api/recipes) - server returns response text (JSON), an array of 'recipe' objects
* Plans for future development:
    * Implement additional CRUD operations:
        * To create a new recipe
        * To update an existing recipe
        * To delete an existing recipe
    * Implement user authentication
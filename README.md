# recipe API

This is the data API (back end) for my [React Recipe app](https://github.com/DrewStock/React-Recipe-app) (front end). 
* recipe API is deployed to Heroku at [https://drewstockpdx-recipe-api.herokuapp.com](https://drewstockpdx-recipe-api.herokuapp.com)
* The app creates a web server using [Node.js](https://nodejs.org/en/about/) and [Express](https://expressjs.com/), to serve up data from a [MongoDB](https://www.mongodb.com/) database 
* Data schemas are modeled using [Mongoose](http://mongoosejs.com/)
* Database is hosted by [mLab](https://mlab.com/)
* Overview of functionality:
    * GET request to [https://drewstockpdx-recipe-api.herokuapp.com/api/recipes](https://drewstockpdx-recipe-api.herokuapp.com/api/recipes) - server writes response text (JSON), an array of 'recipe' objects
    * GET request to '/api/recipes/:id' - server writes response text, which is the resource (a 'recipe' object) with that ID
    * POST request to '/api/recipes' - server writes response text and creates a new resource (a new 'recipe' object), whose contents are the parsed body of the request
    * PUT request to '/api/recipes/:id' - server writes response text and creates a new resource (if not already existing) or updates an existing resource. The updated contents of the resource are the parsed body of the request
    * DELETE request to '/api/recipes/:id' - server writes response text and deletes resource
* Plans for future development:
    * Implement additional CRUD operations:
        * <strike>To create a new recipe</strike> <strong>Completed</strong>
        * <strike>To update an existing recipe</strike> <strong>Completed</strong>
        * <strike>To delete an existing recipe</strike> <strong>Completed</strong>
    * Implement user authentication
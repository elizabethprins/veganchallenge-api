const recipes = require('./recipes/recipes.service.js');
const users = require('./users/users.service.js');
const cookbooks = require('./cookbooks/cookbooks.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(recipes);
  app.configure(users);
  app.configure(cookbooks);
};

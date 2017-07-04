const errors = require('feathers-errors');
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    const user = hook.params.user;
    const recipes = hook.app.service('recipes');
    const recipeId = hook.id;

    if (!user) {
      throw new errors.NotAuthenticated('You need to sign in before you can edit recipes!');
    }

    return recipes.get(recipeId)
      .then((recipe) => {
        if (recipe.authorId.toString() !== user._id.toString()) {
          // user is not the author, so we only allow likes.
          if (hook.data.liked === undefined) {
            throw new errors.Forbidden('You need to be the author to edit this recipe!');
          }
        }

        if (hook.data.liked !== undefined) {
          let data = {}
          const action = hook.data.liked ? '$addToSet' : '$pull';
          data[action] = { likedBy: user._id };
          hook.data = data;
        }

        return Promise.resolve(hook);
      });
  };
};

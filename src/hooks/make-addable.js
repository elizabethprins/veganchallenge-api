const errors = require('feathers-errors');
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.data.added === undefined) return Promise.resolve(hook);

    return hook.app.service('recipes').get(hook.id)
      .then((recipe) => {
        const { cookbookId } = recipe

        cookbookId.includes(hook.data.cookbookId) ? hook.data = { cookbookId: cookbookId } : hook.data = { cookbookId: cookbookId.concat(hook.data.cookbookId) }

        return Promise.resolve(hook);
      })
  };
};

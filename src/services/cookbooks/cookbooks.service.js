// Initializes the `cookbooks` service on path `/cookbooks`
const createService = require('feathers-mongoose');
const createModel = require('../../models/cookbooks.model');
const hooks = require('./cookbooks.hooks');
const filters = require('./cookbooks.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'cookbooks',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/cookbooks', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('cookbooks');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

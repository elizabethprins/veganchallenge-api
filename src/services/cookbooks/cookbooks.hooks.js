const { authenticate } = require('feathers-authentication').hooks;
const { restrictToOwner, associateCurrentUser, restrictToAuthenticated } = require('feathers-authentication-hooks');
const { populate } = require('feathers-hooks-common');

const creatorSchema = {
  include: {
    service: 'users',
    nameAs: 'creator',
    parentField: 'creatorId',
    childField: '_id'
  }
};


const restrict = [
  authenticate('jwt'),
  restrictToAuthenticated()
];


module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      restrictToAuthenticated(),
      associateCurrentUser({ as: 'creatorId' })
    ],
    update: [...restrict],
    patch: [...restrict],
    remove: [...restrict]
  },

  after: {
    all: [
      populate({ schema: creatorSchema })
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

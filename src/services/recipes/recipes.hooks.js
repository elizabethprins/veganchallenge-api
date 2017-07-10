const { authenticate } = require('feathers-authentication').hooks;
const { restrictToOwner, associateCurrentUser, restrictToAuthenticated } = require('feathers-authentication-hooks');
const { populate } = require('feathers-hooks-common');

const authorSchema = {
  include: {
    service: 'users',
    nameAs: 'author',
    parentField: 'authorId',
    childField: '_id'
  }
};

const likerSchema = {
  include: {
    service: 'users',
    nameAs: 'likers',
    parentField: 'likedBy',
    childField: '_id'
  }
};

const addingSchema = {
  include: {
    service: 'cookbooks',
    nameAs: 'adders',
    parentField: 'cookbookId',
    childField: '_id'
  }
};


const restrict = [
  authenticate('jwt'),
  restrictToAuthenticated()
];

const makeLikable = require('../../hooks/make-likable');

const makeAddable = require('../../hooks/make-addable');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      restrictToAuthenticated(),
      associateCurrentUser({ as: 'authorId' })
    ],
    update: [...restrict, makeLikable(), makeAddable()],
    patch: [...restrict, makeLikable(), makeAddable()],
    remove: [...restrict]
  },

  after: {
    all: [
      populate({ schema: authorSchema })
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

// recipes-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const ingredientsSchema = new Schema({
    amount: { type: Number, required: false },
    measure: { type: String, required: false },
    ingredient: { type: String, required: true }
  });

  const cookBookSchema = new Schema({
    bookTitle: { type: String, required: true },
    summary: { type: String, required: false },
    ownerId: { type: Schema.Types.ObjectId, ref: 'users' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  const recipes = new Schema({
    title: { type: String, required: true },
    picture: { type: String, required: true },
    persons: { type: Number, required: true },
    ingredients: [ingredientsSchema],
    cookBooks: [cookBookSchema],
    breakfast: { type: Boolean, default: false },
    brunch: { type: Boolean, default: false },
    lunch: { type: Boolean, default: false },
    snacks: { type: Boolean, default: false },
    appetizer: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
    dessert: { type: Boolean, default: false },
    drink: { type: Boolean, default: false },
    chinese: { type: Boolean, default: false },
    indian: { type: Boolean, default: false },
    mexican: { type: Boolean, default: false },
    thai: { type: Boolean, default: false },
    vietnamese: { type: Boolean, default: false },
    indonesian: { type: Boolean, default: false },
    greek: { type: Boolean, default: false },
    italian: { type: Boolean, default: false },
    spanish: { type: Boolean, default: false },
    libanese: { type: Boolean, default: false },
    maroccan: { type: Boolean, default: false },
    westAfrican: { type: Boolean, default: false },
    french: { type: Boolean, default: false },
    bbq: { type: Boolean, default: false },
    valentine: { type: Boolean, default: false },
    birthday: { type: Boolean, default: false },
    highTea: { type: Boolean, default: false },
    easter: { type: Boolean, default: false },
    halloween: { type: Boolean, default: false },
    sinterklaas: { type: Boolean, default: false },
    christmas: { type: Boolean, default: false },
    spring: { type: Boolean, default: false },
    summer: { type: Boolean, default: false },
    autumn: { type: Boolean, default: false },
    winter: { type: Boolean, default: false },
    nuts: { type: Boolean, default: false },
    gluten: { type: Boolean, default: false },
    sugar: { type: Boolean, default: false },
    soy: { type: Boolean, default: false },
    raw: { type: Boolean, default: false },
    lessThanFifteen: { type: Boolean, default: false },
    fifteenToThirty: { type: Boolean, default: false },
    thirtyToOneHour: { type: Boolean, default: false },
    moreThanOneHour: { type: Boolean, default: false },
    description: { type: String, required: false },
    cookingSteps: { type: String, required: true },
    tip: { type: String, required: false },
    authorId: { type: Schema.Types.ObjectId, ref: 'users' },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    comments: [{ type: String, required: false }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('recipes', recipes);
};

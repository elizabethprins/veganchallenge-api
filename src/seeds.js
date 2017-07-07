const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const user = {
  name: 'Will Fris',
  email: 'admin@admin.com',
  password: 'qwerty1',
  admin: true,
};


const recipes = [{
  title: 'Broccoli-courgettesoep',
  picture: 'https://veganchallenge.nl/wp-content/uploads/2013/05/JUN_15_ZAT_LUNCH_Broccoli-courgette-soep.jpg',
  persons: 4,
  ingredients: [
    { amount: 2,
      measure: 'el',
      ingredient: 'olijfolie'},
    { amount: 1,
      ingredient: 'rode ui, fijngesneden'},
    { amount: 1,
      ingredient: 'courgette'},
    { amount: 300,
      measure: 'g',
      ingredient: 'broccoliroosjes'},
    { amount: 750,
      measure: 'ml',
      ingredient: 'water'},
    { amount: 1.5,
      ingredient: 'tuinkruidenbouillontablet'},
    { amount: 1,
      measure: 'bosje',
      ingredient: 'verse munt'}
  ],
  lunch: true,
  appetizer: true,
  dinner: true,
  nuts: true,
  gluten: true,
  sugar: true,
  soy: true,
  lessThanFifteen: true,
  description: 'Deze groene soep heb je in een handomdraai op tafel. Een makkelijke manier om veel groenten binnen te krijgen!',
  cookingSteps: 'Verhit de olijfolie en fruit de ui 3 minuten. Bak de courgette 5 min. mee. Voeg de broccoli, water, bouillontablet en munt toe. Laat 4 min. zacht koken. Pureer met een staafmixer. Breng op smaak met peper en zout.',
  tip: 'voor een vollere soep kun je een kopje (ongezouten) cashewnoten 2 uur laten weken, afgieten en met de soep mee pureren. Ook kan je wat rijstmelkroom of sojaroom mee pureren.'
},{
  title: 'Pompoen Pindastoofpot',
  picture: 'https://veganchallenge.nl/wp-content/uploads/2013/09/NOV_1_VRIJ_AVOND_Pompoen-pindastoofpot.jpg',
  persons: 4,
  ingredients: [
    { amount: 250,
      measure: 'gr',
      ingredient: 'zilvervliesrijst of quinoa'},
    { amount: 1,
      measure: 'el',
      ingredient: 'zonnebloemolie'},
    { amount: 1,
      ingredient: 'ui, fijngesneden'},
    { amount: 1,
      ingredient: 'teen knoflook'},
    { amount: 1,
      ingredient: 'wortel, in blokjes'},
    { amount: 600,
      measure: 'gr',
      ingredient: 'pompoen'},
    { amount: 400,
      measure: 'gr',
      ingredient: ' blik tomatenblokjes op sap'},
    { amount: 75,
      measure: 'gr',
      ingredient: 'pindakaas met stukjes'},
    { amount: 2,
      measure: 'el',
      ingredient: 'sojasaus'},
    { amount: 1,
      measure: 'el',
      ingredient: 'kerriepoeder'},
    { amount: 0.5,
      measure: 'tl',
      ingredient: 'chilipoeder'},
    { amount: 2,
      measure: 'tl',
      ingredient: 'peterselie'},
    { amount: 500,
      measure: 'ml',
      ingredient: 'groentebouillon'},
    { amount: 1,
      measure: 'blik',
      ingredient: 'kidneybonen uitgelekt'},
    { amount: 150,
      measure: 'gr',
      ingredient: 'tuinerwten (diepvries)'},
    { amount: 50,
      measure: 'gr',
      ingredient: 'dry roasted peanuts '},
  ],
  dinner: true,
  westAfrican: true,
  autumn: true,
  thirtyToOneHour: true,
  description: 'Als het aan onze receptontwikkelaar Alynda ligt, gaat er bijna dagelijks wel pindakaas door één van de VeganChallenge recepten. Aangezien niet iedereen dat even lekker vindt, houden we het beperkt, maar dit recept is een goed voorbeeld dat het soms wel heel lekker kan zijn. Geïnspireerd door de Afrikaanse keuken, waar pinda en pompoen een klassieke combi zijn! NB: check even of je dry roasted peanuts vegan zijn, dit is meestal wel zo.',
  cookingSteps: 'Kook de rijst/quinoa volgens de gebruiksaanwijzing op de verpakking. Verhit de olie in een ruime pan en smoor de ui 3-5 minuten met de deksel op de pan. Pers de knoflook erboven uit en voeg de wortel en pompoen toe. Bak dit nog 5 minuten, roer tussendoor. Voeg de tomatenblokjes, pindakaas, sojasaus, kerrie, chilipoeder, peterselie en bouillon toe. Roer goed door, breng aan de kook, zet het vuur laag en laat 20 minuten zachtjes stoven. Voeg in de laatste 5 minuten de kidneybonen en tuinerwten toe. Serveer de stoofpot met de rijst of quinoa, bestrooid met de pinda’s.',
  tip: 'bij sommige supermarkten kun je pompoen uit de vriezer kopen, is wat duurder maar scheelt een boel snijwerk. Halveer dan de hoeveelheid bouillon.'
},{
  title: 'Paprika’s gevuld met groene spaghetti',
  picture: 'https://veganchallenge.nl/wp-content/uploads/2016/10/Spaghetti_Paprika-730x450.jpg',
  persons: 4,
  ingredients: [
    { amount: 75,
      measure: 'g',
      ingredient: 'cashewnoten'},
    { ingredient: 'water'},
    { amount: 200,
      measure: 'g',
      ingredient: '(volkoren) spaghetti'},
    { amount: 4,
      ingredient: 'oranje paprikas'},
    { amount: 2,
      measure: 'el',
      ingredient: 'pesto'},
    { amount: 60,
      measure: 'g',
      ingredient: '(grote hand) spinazie'},
    { amount: 1,
      measure: 'klein teentje',
      ingredient: 'knoflook, gepeld'},
    { amount: 1,
      ingredient: 'kleine avocado'},
    { amount: 4,
      measure: 'el',
      ingredient: 'edelgist (optioneel)'}
  ],
  appetizer: true,
  dinner: true,
  italian: true,
  halloween: true,
  autumn: true,
  sugar: true,
  soy: true,
  thirtyToOneHour: true,
  description: 'Dit gevulde paprikarecept is perfect voor een Halloweenfeestje, maar natuurlijk ook voor een sfeervol Halloweendiner thuis. Serveer dit als voor- of bijgerecht of eet ze samen met monsterburgers voor een meer complete maaltijd.',
  cookingSteps: 'Doe de cashewnoten in een schaaltje en voeg 300 ml kokend water toe. Zet opzij. Breng een grote pan water aan de kook en kook de spaghetti volgens de verpakking. Snijd ondertussen gezichtjes uit de paprika’s. Als je niet van rauwe paprika houdt kun je ze in de oven op 200 graden zo’n 20 minuten bakken op bakpapier. Doe de pesto, spinazie, knoflook, avocado en edelgist in een blender of keukenmachine. Voeg de cashewnoten samen met het water waarin ze zijn geweekt toe en blend het geheel tot een gladde saus. Meng de saus door de spaghetti en vul de paprika’s ermee.'
},{
  title: 'Groene tosti',
  picture: 'https://veganchallenge.nl/wp-content/uploads/2013/01/FEB16-ZAT-LUNCH-Groenste-tosti-768x961.jpg',
  persons: 1,
  ingredients: [
    { amount:2,
      measure: 'sneetjes',
      ingredient: 'brood'},
    { amount: 3,
      measure: 'tl',
      ingredient: 'kaasvrije pesto' },
    { amount:6,
      measure: 'blaadjes',
      ingredient: 'spinazie'},
    { amount: 1,
      measure: 'kwart',
      ingredient: 'Avocado, in dunne plakjes gesneden'},
    { ingredient: 'Zout en peper' },
    { amount:2,
      measure: 'el',
      ingredient: 'edelgist (optioneel)'},
  ],
  breakfast: true,
  french: true,
  valentine: true,
  birthday: true,
  highTea: true,
  easter: true,
  halloween: true,
  sinterklaas: true,
  christmas: true,
  spring: true,
  summer: true,
  autumn: true,
  winter: true,
  lessThanFifteen: true,
  description: 'Een makkelijke, super gezonde en plantaardige variant van de kaastosti. Door de edelgist behoudt de tosti zijn kaas-achtige smaak. Door de extra groenten heeft de tosti meer bite en textuur. Ook lekker voor mee naar school of werk. Kaasvrije pesto is bijvoorbeeld verkrijgbaar van AH Puur&Eerlijk, maar je kan het ook zelf maken door bijvoorbeeld basilicum met olie of notenpasta te mengen.',
  cookingSteps: 'Besmeer één snee brood met de pesto. Leg hierbovenop de blaadjes spinazie en de plakjes avocado. Voeg zout, peper en edelgist toe en leg het andere sneetje brood erbovenop. Laat de tosti bruin en knapperig worden in een tosti ijzer.',
  tip: 'Serveer met ketchup of tomatensalsa!',
},
{
  title: 'Carrot cupcakes',
  picture: 'https://veganchallenge.nl/wp-content/uploads/2013/05/JUN_8_ZAT_BAK_Carrot-cake.jpg',
  persons: 24,
  ingredients: [
    { amount: 500,
      measure: 'ml',
      ingredient: 'sinaasappelsap'},
    { amount: 150,
      measure: 'ml',
      ingredient: 'olie'},
    { amount: 200,
      measure: 'g',
      ingredient: 'suiker'},
    { amount: 50,
      measure: 'g',
      ingredient: 'walnoten'},
    { amount: 50,
      measure: 'g',
      ingredient: 'rozijnen'},
    { amount: 1,
      measure: 'tl',
      ingredient: 'nootmuskaat'},
    { amount: 1,
      measure: 'tl',
      ingredient: 'kaneel'},
    { amount: 1,
      measure: 'tl',
      ingredient: 'speculaaskruiden'},
    { amount: 400,
      measure: 'g',
      ingredient: 'volkorenmeel'},
    { amount: 1,
      measure: 'zakje',
      ingredient: 'bakpoeder'},
    { amount: 0.5,
      measure: 'tl',
      ingredient: 'zout'},
    { amount: 250,
      measure: 'g',
      ingredient: 'geraspte wortels'}
  ],
  dessert: true,
  soy: true,
  thirtyToOneHour: true,
  description: 'Hoeveel grapjes je ook over wortels en konijnenvoer kunt bedenken, deze cake wil je zeker zelf opeten! Carrot cake komt oorspronkelijk uit Amerika, maar je kunt dit recept gewoon maken met ingrediënten uit de supermarkt.',
  cookingSteps: 'Verwarm de oven voor op 175 graden. Voeg in een kom of maatbeker de sinaasappelsap, olie, suiker en vanille extract samen. Hak de walnoten in stukken en doe deze samen met de rozijnen, nootmuskaat, kaneel speculaaskruiden, volkorenmeel, bakpoeder en zout in een ruime kom.  Schil eventueel de wortels en rasp ze fijn. Voeg de vloeibare ingrediënten al mixend bij de droge ingrediënten en meng goed. Voeg tenslotte de wortel toe. Verdeel het beslag over 24 cupcake vormpjes of vul er een cakeblik (30 cm) of taartvorm (Ø 24 cm) mee, en bak, afhankelijk van de vorm, 25 tot 65 minuten.',
  tip: 'Voor nog meer verwennerij kun je een heerlijk romig glazuur maken van vegan margarine (100 g), poedersuiker(150 g) en vanille om een laagje op de taart te maken. Je kunt zelfs kleine worteltjes van oranje en groene marsepein maken voor er bovenop.'
}];

// Seed the user and recipes!
const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth());

feathersClient.service('users').create(user)
  .then(() => {
    feathersClient.authenticate({
      strategy: 'local',
      email: user.email,
      password: user.password
    })
      .then(() => {
        recipes.map((recipe) => {
          feathersClient.service('recipes').create(recipe)
            .then((result) => {
              console.log('Recipe seeded...', result.title);
            }).catch((error) => {
              console.error('Error seeding recipe!', error.message);
            });
        });
      })
      .catch(function(error){
        console.error('Error authenticating!', error);
      });
  })
  .catch(function(error) {
    console.error('Error creating user!');
  });

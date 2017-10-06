process.env.NODE_ENV = 'test';

const sequelize = require('sequelize');
const recipes = require('../morerecipe/models/recipe');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);
// Our parent block
describe('recipes', () => {
  beforeEach((done) => { // Before each test we empty the database
    recipes.remove({}, (err) => {
      done();
    });
  });
  /*
  * Test the /GET route
  */
  describe('/GET recipes', () => {
    it('it should GET all the recipes', (done) => {
      chai.request(server)
        .get('/recipes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

});

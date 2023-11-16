const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../app"); // Adjust the path as per your project structure
const sequelize = require('../helpers/database'); // Adjust the path as per your project structure
chai.use(chaiHttp);
const expect = chai.expect;

describe('Login Endpoint', () => {
    beforeEach(async () => {
        // Run your seeder here if needed, or sync the database
        // await sequelize.sync({ force: true });
    });

    it('should successfully log in a user', (done) => {
        chai.request("http://localhost:3001")
            .post('/auth/login')
            .send({ username: 'demoUser', password: 'password' }) // Adjust according to your seeder data
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                done();
            });
    });

    it('should reject login with incorrect credentials', (done) => {
        chai.request("http://localhost:3001")
            .post('/auth/login')
            .send({ username: 'demoUser', password: 'wrongpassword' })
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message', 'Your username or password is incorrect.');
                done();
            });
    });

    it('should reject login with missing username', (done) => {
        chai.request("http://localhost:3001")
            .post('/auth/login')
            .send({ password: 'password' })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message', 'Your username is missing.');
                done();
            });
    });

    after(async () => {
        // Clean up the database here if necessary
        // try {
        //     await sequelize.drop(); // Drop all tables in the test database
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    });
});

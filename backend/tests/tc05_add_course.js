const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../app"); // Adjust the path as per your project structure
const sequelize = require('../helpers/database'); // Adjust the path as per your project structure

chai.use(chaiHttp);
const expect = chai.expect;

describe('Add Course Endpoint', () => {
    let token = '';

    before(async () => {
        // Log in as the test admin user to get a token
        const loginResponse = await chai.request("http://localhost:3000")
            .post('/auth/login')
            .send({ username: 'testadmin', password: 'testPassword' });
        token = loginResponse.body.token; // Save the token for later use
    });

    it('should successfully add a new course', (done) => {
        chai.request("http://localhost:3000")
            .post('/course/admin/add')
            .set('Authorization', `Bearer ${token}`)
            .send({
                course_code: "CS101",
                course_session: "2023",
                // ... other course details
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
    });

    // Additional tests as needed

    // after(async () => { ... Cleanup if necessary });
});

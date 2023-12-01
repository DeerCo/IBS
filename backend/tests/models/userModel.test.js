const chai = require('chai');
const expect = chai.expect;
const sequelize = require('../../helpers/database');
const User = require('../../models/user');

describe('User Model', () => {
    before(async () => {
        await sequelize.sync({ force: true }); // This will recreate the tables
    });

    it('should create a new user', async () => {
        const newUser = await User.create({
            username: 'testuser',
            password: 'password', // Hash the password in actual implementation
            email: 'test@example.com'
        });

        expect(newUser).to.be.an('object');
        expect(newUser.username).to.equal('testuser');
    });

    // Add more tests for reading, updating, and deleting users

    after(async () => {
        try {
            await sequelize.drop(); // Drop all tables
        } catch (error) {
            console.error('Error dropping tables:', error);
        }
    });
});

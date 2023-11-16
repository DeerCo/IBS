const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

const execAsync = util.promisify(exec);

const testCaseId = process.argv[2]; // Get test case ID from command line argument

if (!testCaseId) {
    console.error('Please provide a test case ID.');
    process.exit(1);
}

const testsDir = './tests/';
const seederFile = `tc${testCaseId}_seeder.js`;
let testFile = '';

// Function to find the test file
const findTestFile = () => {
    const files = fs.readdirSync(testsDir);
    const testFileRegex = new RegExp(`^tc${testCaseId}_.+\\.js$`);

    for (let file of files) {
        if (testFileRegex.test(file)) {
            testFile = file;
            break;
        }
    }

    if (!testFile) {
        console.error(`No test file found for test case ID ${testCaseId}`);
        process.exit(1);
    }
};

// Function to run a command
const runCommand = (command) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
    });
};


// Run migrations, seeder, and the test
const runTest = async () => {
    try {
        // Run migrations
        console.log('Running migrations...');
        runCommand(`NODE_ENV=test npx sequelize-cli db:migrate`);

        // Run the seeder
        console.log(`Running seeder: ${seederFile}`);
        await execAsync(`npx sequelize-cli db:seed --seed ${seederFile}`);

        // Run the test
        console.log(`Running test: ${testFile}`);
        const { stdout, stderr } = await execAsync(`mocha --recursive ${path.join(testsDir, testFile)}`);
        console.log(stdout);
        if (stderr) {
            console.error(stderr);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

process.env.NODE_ENV = 'test';
findTestFile();
runTest();

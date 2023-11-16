// const express = require('express');
// const router = express.Router();
// const helpers = require('../../../utilities/helpers');
// const client = require('../../../setup/db');
//
// router.post('/', (req, res) => {
//     if (!('username' in req.body) || req.body['username'] === '') {
//         res.status(400).json({ message: 'Your username is missing.' });
//         return;
//     }
//     if (!('password' in req.body) || req.body['password'] === '') {
//         res.status(400).json({ message: 'Your password is missing.' });
//         return;
//     }
//
//     let sql_login =
//         'SELECT (password = crypt(($1), password)) AS authenticated, email, admin FROM user_info WHERE username = ($2)';
//     let sql_roles =
//         'SELECT * FROM (course_role JOIN course ON course_role.course_id = course.course_id) WHERE username = ($1) AND hidden = false ORDER BY course.course_id';
//     let sql_admin = 'SELECT * FROM course';
//
//     client.query(
//         sql_login,
//         [req.body['password'], req.body['username'].toLowerCase()],
//         (err_login, pg_res_login) => {
//             if (err_login) {
//                 console.log("======== err_login: =======");
//                 console.log(err_login);
//                 res.status(404).json({ message: 'Unknown error.' });
//                 console.log(err_login);
//             }
//
//             if (pg_res_login.rowCount === 0) {
//                 res.status(401).json({ message: 'Your username or password is incorrect.' });
//             } else if (pg_res_login.rows[0]['authenticated'] === true) {
//                 if (pg_res_login.rows[0]['admin'] === true) {
//                     client.query(sql_admin, (err_admin, pg_res_admin) => {
//                         if (err_admin) {
//                             console.log("======== err_admin: =======");
//                             console.log(err_admin);
//                             res.status(404).json({ message: 'Unknown error.' });
//                             console.log(err_admin);
//                             return;
//                         }
//
//                         let roles = {};
//                         let roles_with_details = [];
//                         for (let row of pg_res_admin.rows) {
//                             roles[row['course_id']] = 'admin';
//                             roles_with_details.push({
//                                 course_id: row['course_id'],
//                                 course_code: row['course_code'],
//                                 course_session: row['course_session'],
//                                 role: 'admin'
//                             });
//                         }
//
//                         let token = helpers.generateAccessToken(
//                             req.body['username'].toLowerCase(),
//                             pg_res_login.rows[0]['email'],
//                             pg_res_login.rows[0]['admin'],
//                             roles
//                         );
//                         res.json({
//                             token: token,
//                             roles: roles_with_details,
//                             admin: pg_res_login.rows[0]['admin']
//                         });
//                     });
//                 } else {
//                     client.query(
//                         sql_roles,
//                         [req.body['username'].toLowerCase()],
//                         (err_roles, pg_res_roles) => {
//                             if (err_roles) {
//                                 console.log("======== err_roles: =======");
//                                 console.log(err_roles);
//                                 res.status(404).json({ message: 'Unknown error.' });
//                                 console.log(err_roles);
//                                 return;
//                             }
//
//                             let roles = {};
//                             let roles_with_details = [];
//                             for (let row of pg_res_roles.rows) {
//                                 roles[row['course_id']] = row['role'];
//                                 roles_with_details.push({
//                                     course_id: row['course_id'],
//                                     course_code: row['course_code'],
//                                     course_session: row['course_session'],
//                                     role: row['role']
//                                 });
//                             }
//
//                             let token = helpers.generateAccessToken(
//                                 req.body['username'].toLowerCase(),
//                                 pg_res_login.rows[0]['email'],
//                                 pg_res_login.rows[0]['admin'],
//                                 roles
//                             );
//                             res.json({ token: token, roles: roles_with_details });
//                         }
//                     );
//                 }
//             } else {
//                 res.status(401).json({ message: 'Your username or password is incorrect.' });
//             }
//         }
//     );
// });
//
// module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const helpers = require('../../../utilities/helpers');
const User = require('../../../models/user'); // Adjust the path as per your project structure

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || username === '') {
        return res.status(400).json({ message: 'Your username is missing.' });
    }
    if (!password || password === '') {
        return res.status(400).json({ message: 'Your password is missing.' });
    }

    try {
        const user = await User.findOne({ where: { username: username.toLowerCase() } });

        if (!user) {
            return res.status(401).json({ message: 'Your username or password is incorrect.' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Your username or password is incorrect.' });
        }

        // Here, add the logic to handle user roles and token generation as per your application's logic
        // ...

        let token = helpers.generateAccessToken(username.toLowerCase(), user.email, user.admin, /* roles */);

        res.json({
            token: token,
            // Include other user details as needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unknown error.' });
    }
});

module.exports = router;

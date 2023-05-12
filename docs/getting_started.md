# IBS Repository - Getting Started

## Notes

-   We're using `flexy`, a MUI-based component library.
-   Use the CLI command: `docker compose up --build -d` to rebuild the docker containers and run them.
    -   the `--build` tag is essential to rebuild the docker containers.
-   Use the CLI command: `docker compose down` to shut down the docker containers.
-   The older components have uppercase first letter.
    -   The newer components have lowercase first letter.
-   The `base_url` for backend is: `http://localhost:3444/api`




## Running in Docker - `localhost`

### Setting up

1. Go to `backend/utilities/postman_collections` and import the postman collections into Postman.

     1.   Go to `Admin/Login` endpoint and set the following in `Variables` tab:

          ```
          base_url: http://localhost:3444/api
          ```

2. Create `.env` file for both `backend/` and `frontend/` directories.

     -   Copy and paste the following into `backend/` directory:

         ```env
         TOKEN_SECRET=sadhno231lskajdn123newkql
         DATABASE_URL=postgres://ibs:password@localhost:5432/ibs
         #GITLAB_URL=***https://gitlab.com/api/v4/***
         #GITLAB_TOKEN=***gitlab_token***
         PORT=3000
         #EMAIL_SERVICE=***yahoo*** # Only needed if using email service (yahoo, google, ...)
         #EMAIL_USER=***email_address***
         #EMAIL_PASS=***email_password*** # Only needed if using external email service (yahoo, google, ...)
         ```

         *Note*: `TOKEN_SECRET` can be anything. 
         Also make sure there are no `***` between values of `.env` files. 
         Ensure that there is no whitespace (space) at the end of each value of `.env` keys

     -   Copy and paste the following to `frontend/` directory:

         ```env
         PORT=5000
         #REACT_APP_API_URL=https://ibs.dakshm.com/api
         REACT_APP_API_URL=http://localhost:3444/api
         #REACT_APP_API_URL=/api
         #REACT_APP_API_URL=https://ibs.utm.utoronto.ca/api
         ```

         *Note*: Use the 3rd line for testing through docker containers.

3. Make sure docker is running.

4. Use `docker compose up --build -d` to run the docker containers from root directory.

     -   Verify that docker is running successfully. Feel free to stop the docker containers if successful.
     -   Or, use `JetBrains`'  built-in services tab to run docker from `docker-compose.yml`.

5. If using `JetBrains` products, make sure the plugin `Database Tools and SQL for Webstorm` (for WebStorm) is installed.

6. On the right sidebar, click on `Database` tab. 

     -   Click on `+` icon, then `Data Source`, then `PostgreSQL`.

     -   Set the following values in `General` tab:

         ```
         Name: ibs@localhost
         Host: localhost
         Port: 5432
         Authentication: User & Password
         User: ibs
         Password: password
         Database: ibs
         URL: jdbc:postgresql://localhost:5432/ibs
         ```

         *Note*: If warning shows to download missing drivers from this window. Download them as necessary.

     -   Under `Schemas` tab:

         Make sure to check every checkbox to show `All schemas`.

     -   Click `Ok` to save changes.

7. Under `Database` tab:

     1.   Double-click on `ibs@localhost/ibs/public/tables/user_info`.

     2.   Click on `+` icon and add the following values:

          ```
          username: admin
          password: $1$Y0NGHXUf$JKRQO2Ic8HyidX4.0VBbb0
          email: admin@mail.com
          admin: true
          ```

          *Note*: `email` column can be set to any value and `password` value is set to the hash of `pass`.

     3.   Either press `Ctrl+Enter` or click on `Submit` icon to save changes to DB.

8. Shutdown docker containers (if haven't done already) and rebuild the docker containers using `docker compose up --build -d`.

9. Send `POST` request by going into Postman under `Admin/Login` endpoint, then fill in body using the following values and send request:

     ```
     username: admin
     password: pass
     ```

     -   On success, you should receive `200 OK` and JWT token as response message.
     -   On `502 Bad Gateway`, try to restart and rebuild the docker containers and make sure the `.env` files have the correct format (without spaces before newline).

10. On Postman....

      1.   Go to `Admin/Course/Add Course`, and fill in the body with the following values:

           ```
           course_code: string
           course_session: string
           gitlab_group_id: integer
           default_token_count: integer
           token_length: integer
           hidden: false
           ```

           -   On success, you should receive `200 OK` response header with the response message of

               ```json
               {
                   "message": "The course is added and the course specific tables have been created.",
                   "course_id": ...
               }
               ```

11. Verify that the courses have been added correctly by...

      1.   Going into WebStorm, and clicking on `Refresh` icon in `Database` tab and verifying that a separate schema has been created for the course you just added.
      2.   Going into Postman, and sending a request to `Admin/Course/All courses` to verify that the course you added works.

12. Then on a web browser, head to `http://localhost:3444`.

      -   Set username to `admin` and password to `pass`.
      -   Login.
      -   Then verify that the course you just added is displayed in `http://localhost:3444/home`.



### Running

1. Make sure docker is running.
2. Ensure that the setup above has been completed.
3. Use `docker compose up --build -d` to run the docker containers from root directory.
4. The front-end right now is pretty much empty, so use Postman to test endpoints and see the response format.



### Adding Roles/Users

#### Notes

-   Han said the reason why line 14 (in `general.js`) is commented out is because the team decided to let the admin add all users to the course

#### Steps (via Postman)

1. Ensure that line 14 in `backend/route/general.js` is uncommented so that the backend uses the register route.

2. Go to Postman.

     1.   Under `Variables` tab in the Postman folder called `Instructor`, make sure the following values are set:

          ```
          base_url: http://localhost:3444/api
          course_id: 1 # or whatever the course id you have
          ```

     2.   Go to `Register` endpoint and set the following request body parameters:

          ```
          username: instructor # whatever you want, see regex in backend/utilities/helpers.js
          password: passwordTest # must be >8 characters
          email: instructor@mail.com # @ character must be in the string
          ```

     3.   Send request. Ensure `200 OK` is returned.

3. To double check, navigate to `user_info` table in the database and confirm that the user has been added to the database.

#### Steps (via UI-Frontend)

1. Make sure that an admin user role is added to the database.

2. Login to `http://localhost:3444` as necessary via admin access.

3. Go to desired course.

     -   Make sure the following parameters under `Add role` is in the correct format:

         ```
         Username: whateverRole # check regex in backend/utilities/helpers.js (specifically name_validate function)
         Role: instructor # must be EITHER "instructor", "ta", or "student"
         Email: role@mail.com # just ensure "@" character is in string
         Update user info: false # boolean to update role/user or not
         ```

### Note
For questions/issues regarding hot-reloading on the frontend read [this](frontend_hot_reloading.md)

**Written by Eric Ryu**

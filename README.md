
# Register page

Register page with fully functional authentication and credentials stored in cookies.

A user can create an account, which is saved in the database with a hashed password. Once logged in, the user can fetch user data, update their email, or delete their account. Users without valid credentials cannot access user data, update accounts, or delete them.

## Stack used

**Frontend:** React.js with TypeScript, Tailwind CSS

**Frontend libraries:** Motion, React Router Dom, Axios

**Backend:** Express.js, MongoDB

**Backend libraries:** dotenv, nodemon, cors, lodash, crypto


## How to install project

Git clone project.

```bash
    git clone https://github.com/wobloj/RegisterPage.git
```
Installation dependencies.

```bash
    cd server
    npm install
```

```bash
    cd client
    npm install
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`

`PORT`


## Run Project

To run project make sure you are in `server` file and `client` file.

To run backend in terminal type: `npm start`.

To run frontend in terminal type: `npm run dev`

## Features

- Login and register user
- Full data validation
- Fetch users 
- Animated messages and divs


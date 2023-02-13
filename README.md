# node-dmbz1u

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/node-dmbz1u)

# Project scapholding

I used a variation of this repository to structure this project
[node-rest-api-scaffold](https://github.com/lionphilips/node-rest-api-scaffold)

# Requirements

- PostgreSQL 15
- Node.js 16.4.2

# Environment variables

For development and testing environments you have to initialize the following variables into your `.env` file.

-NODE_ENV: It can be development, test or production. You can also use your terminal to define this variable with the command `export NODE_ENV=test`.

- DEV_DB_USERNAME= Database username
- DEV_DB_PASSWORD= Database password
- DEV_DB_NAME= Database name for your development environment.
- DEV_DB_HOST= Database host for your development environment
- DEV_DB_PORT= Database port for your development environment
- TEST_DB_USERNAME= Database name for your testing environment.
- TEST_DB_PASSWORD= Database password for your testing environment.
- TEST_DB_NAME= Database name for your testing environment.
- TEST_DB_HOST= Database host for your testing environment.
- TEST_DB_PORT= Datbase por for your testing environment.

# Installation

```
npm install
npx sequelize-cli db:migrate
```

# Run application

You have to change `NODE_ENV` to `development` into your `.env` file

```
npm run start
```

# Run tests

You have to change `NODE_ENV` to `test` into your `.env` file

```
npx sequelize-cli db:drop;npx sequelize-cli db:create; npx sequelize-cli db:migrate; npx sequelize-cli db:seed:all
npm run start
```

In another terminal:

```
npm run test
```

# Aspects not coverage in this solution

- It would be more mantainable to have env file per environment. For example, `.env.development`, `.env.testing`, `.env.production`

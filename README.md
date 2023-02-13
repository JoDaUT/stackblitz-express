# node-dmbz1u

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/express-simple-n32cyz)

# Database design

I considered two distinct approaches:

Have a single "Device" table with fields such as "name", "ip", "type", "status", and "factoryId". In addition, a JSON field called "details" could be added to store any extra device-specific information. However, I ultimately decided against this approach as it could lead to over-reliance on JSON, and for that reasoning a NoSQL database is a better option.

Have a base "Device" table with the same fields as before, but also include three child tables to store specific information about each device. While this approach adds complexity to queries, it aligns with normalization and the relational database philosophy.

I decided to go with option 2 as it was more familiar and met the requirements of this code challenge.

# Project scaffolding

I used a modification of this repository to structure this project
[node-rest-api-scaffold](https://github.com/lionphilips/node-rest-api-scaffold)

# Requirements

- PostgreSQL 15
- Node.js 16.4.2

# Environment variables

For development and testing environments, you have to initialize the following variables into your `.env` file.

- NODE_ENV: It can be development, test or production. You can also use your terminal to define this variable with the command `export NODE_ENV=test`.
- DEV_DB_USERNAME= Database username for development.
- DEV_DB_PASSWORD= Database password for development.
- DEV_DB_NAME= Database name for your development environment.
- DEV_DB_HOST= Database host for your development environment
- DEV_DB_PORT= Database port for your development environment
- TEST_DB_USERNAME= Database name for your testing environment.
- TEST_DB_PASSWORD= Database password for your testing environment.
- TEST_DB_NAME= Database name for your testing environment.
- TEST_DB_HOST= Database host for your testing environment.
- TEST_DB_PORT= Database por for your testing environment.

# Install dependencies

```
npm install
```

# Migrations

```
npx sequelize-cli db:migrate
```

# Run application

You have to change `NODE_ENV` to `development` into your `.env` file or export this variable with `set NODE_ENV=development` in your terminal.

```
npm run start
```

# How to use

You have the following routes available:

- GET http://localhost:3010/device
- POST http://localhost:3010/device
- PUT http://localhost:3010/device/:id
- DELETE http://localhost:3010/device/:id

# Run tests

You have to change `NODE_ENV` to `test` into your `.env` file

```
npx sequelize-cli db:drop;npx sequelize-cli db:create; npx sequelize-cli db:migrate; npx sequelize-cli db:seed:all
npm run start
```

In a different terminal:

```
npm run test
```

# Aspects not covered in this solution

- It would be more maintainable to have env file per environment. For example, `.env.development`, `.env.testing`, `.env.production`
- The tests implemented still can be improved to be completely not dependent from the seeds.
- All the device interactions with the database could be more abstracted with techniques like the Repository pattern.
- This project does not implement any kind of session authentication.
- This documentation was tested of only Windows using PowerShell.

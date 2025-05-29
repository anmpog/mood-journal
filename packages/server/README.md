# Environment

## Variables

Right now (development) my environment variables are living in a simple `.env` file. Prisma relies on a `DATABASE_URL` that points to a PostgresQL database I am running locally. The connection string stored in the `DATABASE_URL` environment variable takes the form of:

```
DATABASE_URL="postgresql://<USER>@localhost:5432/<PROJECT_NAME>?schema=public"
```

PostgresQL connection strings are detailed [here](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)

## Node

I've started banging on this silly thing with node `V22.12.0`.

# Migration Info

I opted to use the pattern of having multiple `.env` files. This requires reliance on the NPM package `dotenv-cli`, which is apparently to be installed globally. According to the [docs for Prisma](https://www.prisma.io/docs/orm/more/development-environment/environment-variables#using-multiple-env-files), which I am using for managing database migrations, you could add a script to the `package.json` file that looks like:

```json
  "scripts": {
    "migrate:postgres": "dotenv -e .env.sample -- npx prisma migrate dev --name init",
  },
```

This script loads environment variables defined in a file called `.env.sample`. This should allow any pre-runtime scripts(like `prisma migrate`) access to environment variables.

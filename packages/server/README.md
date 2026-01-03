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

This hypothetical script loads environment variables defined in a file called `.env.sample`. This should allow any pre-runtime scripts(like `prisma migrate`) access to environment variables.

# Password Security

Passwords are hashed on the server using the Argon2id hashing algorithm. I used the following [guidelines/settings](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#introduction) to configure the Argon2id implementation I used. At the time I built this part of the code the recommendation from OWASP was:

> Use Argon2id with a minimum configuration of 19 MiB of memory, an iteration count of 2, and 1 degree of parallelism.

## Journal Entries

As I'm writing this I'm laboring over what decisions to make about what a
Journal Entry should be, and what data it should try to collect. As of August
2025, with the help of GPT, I'm thinking that I want the data model to start as
something like:

```
model JournalEntry {
  id           Int      @id @default(autoincrement())
  createdAt    DateTime
  author       User     @relation(fields: [userId], references: [id])
  userId       Int
  moodRating   Int
  stressRating Int
  activities   String[]
  sleepHours   Int
  sleepQuality Int
}
```

I feel gross/guilty using GPT but think I've managed to use it pretty
consistently for guidance and not answers, and I think that's what I'm doing
here – but who knows, the powers of self-justification never cease to amaze me.
In any case my idea for this whole thing is to try to collect data and
then show statistical relationships between "activities" and "moods". I'm not
a stats wizard, I just liked it in college so this is a way for me to
re-engage with that. Additionally, I think this is the kind of data that would
make me more confident about habits I try to cultivate in the near-constant
battle I have for mental well-being.

For now:

- Mood rating is the primary thing I want to find relationships WITH
- Sleep time + quality seems like a proxy for mental well-being
- Activities will be associated with mood-outcomes via statistical analysis
- GPT made a convincing argument that collecting data about subjective stress
  rating could be useful – mainly for people who have low stress by also low
  mood.

---
layout: default
title: Development
order: 4
---

HOFFNUNG 3000 is an NodeJS `express` server hosting a `react` application which communicates with the server API.

## Project structure

The project consists of three main folders: `app` (holding the client application), `server` (API controllers, database) and `common` (shared utilities, translation files).

## Configuration

Read more about the configuration under [installation](./installation.html).

```
git clone git@github.com:adzialocha/hoffnung3000.git
cd hoffnung3000
cp .env.example .env // change your config accordingly
```

Set `NODE_ENV` to `development`.

## Database migration

```
npm run db:migrate
npm run db:seed
```

Create new migrations or seeds via:

```
npm run db:migrate:create
npm run db:seed:create
```

## Building assets

HOFFNUNG 3000 uses *webpack* for bundling JavaScript and SCSS assets.

```
npm run assets:watch // for development
npm run assets:build // for production
```

## Linting

Check your code against the style guides.

```
npm run lint:js
npm run lint:scss
npm run lint // run all linters
```

## Running the development server

Make sure to start the server *after* bundling the assets, to make sure the server can read the generated asset paths correctly. The server starts at *http://localhost:3000* by default (change the port via the `PORT` environment variable).

```
npm run serve
```

## Translation files

Static page content can be changed via the admin panel in HOFFNUNG 3000. Email texts can be changed in `server/mails/` and translations in `common/locales`.

## Log levels

You can set the environment variable `LOG_LEVEL` to `verbose` to get more debug messages in the server log.

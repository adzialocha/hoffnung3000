# HOFFNUNG 3000

Platform for decentralized, anonymized, self-curated festivals.

```
Conversation.belongsToMany(Animal, {
  as: 'animals',
  foreignKey: 'conversationId',
  through: 'conversationsAnimals',
})
```

## Requirements

* Node and npm
* PostgreSQL Database
* Google Map API key
* AWS S3 Cloud Storage
* PayPal Account for payment
* Mail-Server (SMTP)
* [gif-stream-server](https://github.com/adzialocha/gif-stream-server) (optional)

## Setup

```bash
npm install
cp ./.env.example ./.env // edit the configuration to your needs
npm run db:migrate // setup the database
npm run db:seed // create initial data
```

You can log in now with the initial admin account `admin@admin.com` and password `adminadmin`.

## Development

```bash
npm run serve // server runs by default on localhost:3000
npm run watch // run gulp watch process in a second terminal
```

## Linting

```bash
npm run lint:js
npm run lint:scss
npm run lint // run all linters
```

## Deployment

```bash
npm run build // compile assets for production
```

Note that `NPM_CONFIG_PRODUCTION` should be set to `false` for successful [Heroku deployment](https://devcenter.heroku.com/articles/nodejs-support#devdependencies).

---

#### About

HOFFNUNG 3000 is a self-curated festival for music, art and theory developed and organized by [BLATT 3000](https://blatt3000.de) and Klangkeller, 24.-26.08.17 in Berlin - HOFFNUNG 3000 is an experiment in social, artistic and theoretical collaboration. Feel free to use the platform for your own festivals.

https://hoffnung3000.de

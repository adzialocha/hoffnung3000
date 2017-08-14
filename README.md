# HOFFNUNG 3000

```
Conversation.belongsToMany(Animal, {
  as: 'animals',
  foreignKey: 'conversationId',
  through: 'conversationsAnimals',
})
```

Platform for decentralized, anonymized, self-curated festivals. https://hoffnung3000.de

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

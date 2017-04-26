# HOFFNUNG 3000

Platform for decentralized, self-curated festivals.

## Requirements

* node
* yarn
* bower
* postgres database

## Setup

```bash
yarn install && bower install
cp ./.env.example ./.env // edit the configuration to your needs
yarn run db:migrate // setup the database
```

## Development

```bash
yarn run serve // server runs by default on localhost:3000
yarn run watch // run webpack process in a second terminal
```

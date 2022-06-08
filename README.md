# HOFFNUNG 3000

Platform for decentralized, anonymized, self-curated festivals.

```javascript
Conversation.belongsToMany(Animal, {
  as: 'animals',
  foreignKey: 'conversationId',
  through: 'conversationsAnimals',
})
```

## Features

* Register `resources` (skills, items, etc.) and make them available to other users
* Create `places` (address, gps position or *virtual*) and define time slots, so other users can organize events there
* Organize `events` in `places` and use `resources` of others to realize them
* Users can be anonymized with randomly generated [animal avatars](https://github.com/adzialocha/random-animal-name-generator/)
* Random meetings with random participants in random places
* Built-in messenger and activity stream
* `events` and `places` can be private (not visible to audience) or public
* [.gif-stream](https://github.com/adzialocha/gif-stream/blob/master/example.gif) documentation tool

## How can I use this platform?

Check out the [Handbook](https://hoffnung3000.de) to get started.

## Requirements

* Server with NodeJS environment (`<= 16`)
* PostgreSQL database
* Mail-Server (SMTP)
* PayPal Account for payment (optional)
* AWS S3 Cloud Storage (optional)
* [gif-stream-server](https://github.com/adzialocha/gif-stream-server) (optional)

## Development

Read the [Handbook](https://hoffnung3000.de) for more information about setup, contributions, deployment of HOFFNUNG 3000.

## About

HOFFNUNG 3000 was developed for a self-curated festival for music, art and theory organized by [BLATT 3000](https://blatt3000.de) and [Klangkeller](http://www.klangkeller.net/), 24.-26.08.17 in Berlin - HOFFNUNG 3000 is an experiment in social, artistic and theoretical collaboration. Feel free to use the platform for your own festivals. :panda_face:

## Projects using the platform

* https://blatt3000.de/ (HOFFNUNG 3000 2017, Berlin DE)
* https://festival.antiuniversity.org/ (ANTI UNIVERSITY 2020 & 2021, London UK)
* https://openfutures.ch/ (Open Futures 2021, Zürich CH)
* https://freilauf.camp/ (DIY Bike Camp 2020, Berlin DE)
* https://www.femmusicgather.org/ (Feminist UdK Course 2020, Berlin DE)
* https://www.molekuel-festival.de/ (Music festival 2020, Cologne DE)
* https://kalendar.zukunftsdorf22.de/ (Zukunftsdorf 2022, Documenta fifteen, Kassel DE)

*🛸 Please note that some of these websites might not be online anymore.*

## Related projects

* [`hoffnung3000-jekyll-theme`](https://github.com/sandreae/hoffnung3000-jekyll-theme): Turn your current HOFFNUNG 3000 instance into a Jekyll archive page.
* [`gif-stream-server`](https://github.com/adzialocha/gif-stream-server): .gif stream server for HOFFNUNG 3000.
* [`random-animal-name-generator`](https://github.com/adzialocha/random-animal-name-generator/): Package to generate random animal names.
* [`p2panda`](https://github.com/p2panda/handbook): p2p protocol which originated from HOFFNUNG 3000.

## Contributors

* [`@adzialocha`](https://github.com/adzialocha)
* [`@sandreae`](https://github.com/sandreae)

## License

GNU Affero General Public License v3.0 [`AGPL-3.0`](LICENSE)

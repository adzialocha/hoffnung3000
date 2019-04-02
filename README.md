# HOFFNUNG 3000

Platform for decentralized, anonymized, self-curated festivals.

```
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

## Questions

:arrow_forward: **How can I use this platform?**

Check out the [Handbook](https://hoffnung3000.de) to get started.

:arrow_forward: **How is this decentralized?**

The participants define all places by themselves, in this sense all events of the festival can take place "everywhere" in your city or even outside of it. This sort of decentralization does not have anything to do with the *technical* term: If you are interested in truly decentralized architectures like [p2p](https://en.wikipedia.org/wiki/Peer-to-peer) networks you should read about [p2panda](https://github.com/adzialocha/p2panda-specification).

:arrow_forward: **How is this anonymous?**

We thought it would be interesting to experiment with how we take decisions as organizers, curators and visitors by obfuscating the gender and realname of every festival participant with a randomly generated animal avatar. Technically it is still possible to look into the database to figure out which real person is behind what animal, in this sense the anonymity is only true for the participants using the platform.

:arrow_forward: **How is this self-curated?**

HOFFNUNG 3000 is a platform which helps a group of people to organize events by creating and sharing resources and places. It can therefore be used to put up a festival which does not need any curatorial instance (like an organizer, booker, jury, etc.).

:arrow_forward: **Sounds all very strange, is it real?**

Yes, it is! We started with a first festival platform [VERANTWORTUNG 3000](github.com/adzialocha/verantwortung3000) in 2016 and realized another self-curated festival in 2017 in Berlin, named [HOFFNUNG 3000](https://blatt3000.de/hoffnung3000/).

## Requirements

* Server with NodeJS environment
* PostgreSQL database
* Mail-Server (SMTP)
* PayPal Account for payment (optional)
* AWS S3 Cloud Storage (optional)
* [gif-stream-server](https://github.com/adzialocha/gif-stream-server) (optional)

## Development

Read the [Handbook](https://hoffnung3000.de) for more information about setup, contributions, deployment of HOFFNUNG 3000.

## About

HOFFNUNG 3000 was developed for a self-curated festival for music, art and theory organized by [BLATT 3000](https://blatt3000.de) and [Klangkeller](http://www.klangkeller.net/), 24.-26.08.17 in Berlin - HOFFNUNG 3000 is an experiment in social, artistic and theoretical collaboration. Feel free to use the platform for your own festivals. :panda_face:

## License

```
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
```

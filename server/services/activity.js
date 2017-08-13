import Activity from '../models/activity'
import Animal from '../models/animal'
import User from '../models/user'

import { sendActivityNotification } from '../helpers/mailTemplate'

function addActivity(data) {
  return new Promise((resolve, reject) => {
    Activity.create(data)
      .then(() => resolve())
      .catch(err => reject(err))
  })
}

function sendMail(data) {
  return new Promise((resolve, reject) => {
    Animal.findById(data.animalId)
      .then(animal => {
        return User.findById(data.userId)
          .then(user => {
            let subject = ''
            let message = ''

            if (data.type === 'RECEIVED_MESSAGE') {
              subject = 'YOU RECEIVED A NEW MESSAGE'
              message = `${animal.name} sent you a message on the platform!`
            } else if (data.type === 'RECEIVED_REQUEST') {
              subject = 'YOU RECEIVED A REQUEST'
              message = `${animal.name} requests your ${data.objectType} "${data.objectTitle}" for an event!`
            } else if (data.type === 'RANDOM_MEETING_JOINED') {
              subject = 'YOU JOINED A RANDOM MEETING'
              message = 'You joined a random meeting!\n\nA conversation related to this random meeting was just openend in your inbox, check it on the platform for further details about time and place.\n\nThere you can start the dialogue with other attending participants you might eventually meet soon <3'
            }

            const locals = {
              message,
            }

            return sendActivityNotification(
              subject,
              locals,
              user.email
            )
          })
      })
      .then(() => resolve())
      .catch(err => reject(err))
  })
}

function sendMails(activities) {
  return Promise.all(activities.map(data => {
    return sendMail(data)
  }))
}

export function addMessageActivity(data) {
  return new Promise((resolve, reject) => {
    const activities = data.receivingAnimals.map(animal => {
      return {
        animalId: data.sendingAnimal.id,
        userId: animal.userId,
        type: 'RECEIVED_MESSAGE',
      }
    })

    Activity.bulkCreate(activities)
      .then(() => sendMails(activities))
      .then(() => resolve())
      .catch(err => reject(err))
  })
}

export function addRequestResourcesActivity(data) {
  const { event, resources } = data

  return new Promise((resolve, reject) => {
    const activities = resources.map(resource => {
      return {
        animalId: event.animalId,
        eventId: event.id,
        objectId: resource.id,
        objectTitle: resource.title,
        objectType: 'resource',
        type: 'RECEIVED_REQUEST',
        userId: resource.animal.userId,
      }
    })

    Activity.bulkCreate(activities)
      .then(() => sendMails(activities))
      .then(() => resolve())
      .catch(err => reject(err))
  })
}

export function addRequestPlaceActivity(data) {
  const { event, place } = data

  const activity = {
    animalId: event.animalId,
    eventId: event.id,
    objectId: place.id,
    objectTitle: place.title,
    objectType: 'place',
    type: 'RECEIVED_REQUEST',
    userId: place.animal.userId,
  }

  return Promise.all([
    sendMail(activity),
    addActivity(activity),
  ])
}

export function addCreateMeetingActivity(data) {
  const { place, animalId, userId } = data

  // send a message to creating user
  const activity = {
    animalId,
    objectId: place.id,
    objectTitle: place.title,
    objectType: 'place',
    type: 'CREATE_RANDOM_MEETING',
    userId,
  }

  return Promise.all([
    addActivity(activity),
  ])
}

export function addJoinMeetingActivity(data) {
  return new Promise((resolve, reject) => {
    // send a message to all currently participating users
    const activities = data.receivingAnimals.map(animal => {
      return {
        animalId: data.joiningAnimal.id,
        userId: animal.userId,
        type: 'JOIN_RANDOM_MEETING',
      }
    })

    // send a message to joining user
    const ownActivity = {
      animalId: data.joiningAnimal.id,
      type: 'JOIN_RANDOM_MEETING_ME',
      userId: data.joiningAnimal.userId,
    }

    activities.push(ownActivity)

    Activity.bulkCreate(activities)
      .then(() => sendMails(activities))
      .then(() => resolve())
      .catch(err => reject(err))
  })
}

export function addCreateActivity(data) {
  return addActivity(Object.assign({}, { type: 'CREATE_OBJECT' }, data))
}

export function addUpdateActivity(data) {
  return addActivity(Object.assign({}, { type: 'UPDATE_OBJECT' }, data))
}

export function addDeleteActivity(data) {
  return addActivity(Object.assign({}, { type: 'DELETE_OBJECT' }, data))
}

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

export function addCreateActivity(data) {
  return addActivity(Object.assign({}, { type: 'CREATE_OBJECT' }, data))
}

export function addUpdateActivity(data) {
  return addActivity(Object.assign({}, { type: 'UPDATE_OBJECT' }, data))
}

export function addDeleteActivity(data) {
  return addActivity(Object.assign({}, { type: 'DELETE_OBJECT' }, data))
}

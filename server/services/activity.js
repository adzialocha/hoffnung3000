import Activity from '../models/activity'
import Animal from '../models/animal'
import User from '../models/user'

import { AnimalBelongsToUser } from '../database/associations'
import { getConfig } from '../config'
import { sendActivityNotification } from '../helpers/mailTemplate'
import { translate } from '../../common/services/i18n'

function addActivity(data) {
  return new Promise((resolve, reject) => {
    Activity.create(data)
      .then(() => resolve())
      .catch(err => reject(err))
  })
}

function sendMail(data) {
  return new Promise((resolve, reject) => {
    return getConfig('isAnonymizationEnabled').then(config => {
      Animal.findByPk(data.animalId, {
        include: AnimalBelongsToUser,
      })
        .then(animal => {
          let name = animal.name

          if (!config.isAnonymizationEnabled) {
            name = `${animal.user.firstname} ${animal.user.lastname}`
          }

          return User.findByPk(data.userId)
            .then(user => {
              const subject = translate(`api.activityMails.${data.type}.subject`)
              const message = translate(`api.activityMails.${data.type}.message`, {
                name,
                objectTitle: data.objectTitle,
                objectType: data.objectType,
              })

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
    addActivity(activity),
    sendMail(activity),
  ])
}

export function addCreateMeetingActivity(data) {
  const { place, animalId, userId } = data

  // Send a message to creating user
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
    sendMail(activity),
  ])
}

export function addJoinMeetingActivity(data) {
  return new Promise((resolve, reject) => {
    // Send a message to all currently participating users
    const activities = data.receivingAnimals.map(animal => {
      return {
        animalId: data.joiningAnimal.id,
        userId: animal.userId,
        type: 'JOIN_RANDOM_MEETING',
      }
    })

    // Send a message to joining user
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

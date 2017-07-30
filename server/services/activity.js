import Activity from '../models/activity'

function addActivity(data) {
  return new Promise((resolve, reject) => {
    Activity.create(data)
      .then(() => resolve())
      .catch(err => reject(err))
  })
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

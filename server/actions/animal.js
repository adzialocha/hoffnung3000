import Animal from '../models/animal'

export function deleteAnimals(where) {
  return new Promise((resolve, reject) => {
    Animal.findAll({
      where,
    })
      .then(animals => {
        const removePromises = animals.map(animal => {
          return animal.destroy()
        })

        return Promise.all(removePromises)
          .then(() => resolve())
      })
      .catch((err) => reject(err))
  })
}

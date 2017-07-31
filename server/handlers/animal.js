import Animal from '../models/animal'

export function deleteAnimals(where) {
  return new Promise((resolve, reject) => {
    Animal.destroy({
      where,
    })
      .then(() => resolve())
      .catch((err) => reject(err))
  })
}

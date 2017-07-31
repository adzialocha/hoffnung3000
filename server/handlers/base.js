export function deleteObjects(model, where, include, associations) {
  return new Promise((resolve, reject) => {
    model.findAll({
      include,
      where,
    })
      .then(associations)
      .then(() => resolve())
      .catch((err) => reject(err))
  })
}

export function deleteObjectsByAnimalId(model, animalId, include, associations) {
  const includeWithAnimal = include
  includeWithAnimal[0].through = {
    where: {
      animalId,
    },
  }

  return deleteObjects(model, {}, includeWithAnimal, associations)
}

export function deleteObjectsByUserId(model, userId, include, associations) {
  const includeWithUser = include
  includeWithUser[0].where = {
    userId,
  }

  return deleteObjects(model, {}, includeWithUser, associations)
}

export function deleteObjectsByIds(model, ids, include, associations) {
  const where = {
    id: {
      $in: ids,
    },
  }

  return deleteObjects(model, where, include, associations)
}

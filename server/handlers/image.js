import Image from '../models/image'

export function updateImagesForObject(resource, images) {
  return new Promise((resolve, reject) => {
    // Remove images when needed
    const keptImages = images.filter(img => img.id)
    const keptImageIds = keptImages.map(img => img.id)

    const removeImagesPromise = resource.getImages()
      .then(currentImages => {
        const removeImages = currentImages.filter(image => {
          return !keptImageIds.includes(image.id)
        })

        const removePromises = removeImages.map(image => {
          return Promise.all([
            image.destroy(),
            resource.removeImage(image),
          ])
        })

        return Promise.all(removePromises)
      })

    // Add new images when given
    const newImages = images.filter(img => !img.id)

    const addNewImagesPromise = Promise.all(newImages.map(image => {
      return Image.create(image, { returning: true })
        .then(newImage => {
          return resource.addImage(newImage)
        })
    }))

    Promise.all([
      removeImagesPromise,
      addNewImagesPromise,
    ])
      .then(() => resolve())
      .catch(err => reject(err))
  })
}

export function deleteImagesForObject(resource) {
  return new Promise((resolve, reject) => {
    if (resource.images.length === 0) {
      resolve()
      return
    }

    resource.setImages([])
      .then(() => {
        return Image.destroy({
          where: {
            id: {
              $in: resource.images.map(image => image.id),
            },
          },
          individualHooks: true,
        })
          .then(() => resolve())
      })
      .catch(err => reject(err))
  })
}

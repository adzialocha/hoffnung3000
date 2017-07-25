import Joi from 'joi'

export default {
  createPlace: {
    body: {
      city: Joi.any().when('mode', { is: 'address', then: Joi.required() }),
      cityCode: Joi.any().when('mode', { is: 'address', then: Joi.required() }),
      country: Joi.any().when('mode', { is: 'address', then: Joi.required() }),
      description: Joi.string().min(20).required(),
      disabledSlots: Joi.array().items(Joi.number()).required(),
      images: Joi.array().required(),
      isPublic: Joi.boolean().required(),
      latitude: Joi.number().when('mode', { is: 'gps', then: Joi.required() }),
      longitude: Joi.number().when('mode', { is: 'gps', then: Joi.required() }),
      mode: Joi.string().allow('gps', 'address', 'virtual').required(),
      slotSize: Joi.number().min(1).max(1440).required(),
      street: Joi.any().when('mode', { is: 'address', then: Joi.required() }),
      title: Joi.string().min(3).required(),
    },
  },
  updatePlace: {
    body: {
      city: Joi.any().when('mode', { is: 'address', then: Joi.required() }),
      cityCode: Joi.any().when('mode', { is: 'address', then: Joi.required() }),
      country: Joi.any().when('mode', { is: 'address', then: Joi.required() }),
      description: Joi.string().min(20).required(),
      disabledSlots: Joi.array().items(Joi.number()).required(),
      images: Joi.array().required(),
      isPublic: Joi.boolean().required(),
      latitude: Joi.number().when('mode', { is: 'gps', then: Joi.required() }),
      longitude: Joi.number().when('mode', { is: 'gps', then: Joi.required() }),
      mode: Joi.string().allow('gps', 'address', 'virtual').required(),
      street: Joi.any().when('mode', { is: 'address', then: Joi.required() }),
      title: Joi.string().min(3).required(),
    },
    params: {
      resourceSlug: Joi.string().required(),
    },
  },
}

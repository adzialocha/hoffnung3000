import ActionTypes from '../actionTypes'
import { postRequest } from '../services/api'

export function uploadImages(images) {
  return postRequest(['upload'], images, {
    request: {
      type: ActionTypes.UPLOAD_IMAGE_REQUEST,
    },
    success: {
      type: ActionTypes.UPLOAD_IMAGE_SUCCESS,
    },
    failure: {
      type: ActionTypes.UPLOAD_IMAGE_FAILURE,
    },
  })
}

import ActionTypes from '../actionTypes'
import { postRequest } from '../services/api'

export function uploadImages(images, base64Strings) {
  return postRequest(['upload'], images, {
    request: {
      type: ActionTypes.UPLOAD_IMAGE_REQUEST,
    },
    success: {
      type: ActionTypes.UPLOAD_IMAGE_SUCCESS,
      meta: {
        base64Strings,
      },
    },
    failure: {
      type: ActionTypes.UPLOAD_IMAGE_FAILURE,
    },
  })
}

export function removeImageFromList(fileName) {
  return {
    type: ActionTypes.UPLOAD_IMAGE_REMOVE_IMAGE,
    meta: {
      fileName,
    },
  }
}

export function clearUploadedImages() {
  return {
    type: ActionTypes.UPLOAD_IMAGE_CLEAR,
  }
}

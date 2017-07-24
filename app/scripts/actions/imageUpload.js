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

export function setUploadedImages(images) {
  return {
    type: ActionTypes.UPLOAD_IMAGE_SET_IMAGES,
    meta: {
      images,
    },
  }
}

export function removeImageFromList(imageId) {
  return {
    type: ActionTypes.UPLOAD_IMAGE_REMOVE_IMAGE,
    meta: {
      imageId,
    },
  }
}

export function clearUploadedImages() {
  return {
    type: ActionTypes.UPLOAD_IMAGE_CLEAR,
  }
}

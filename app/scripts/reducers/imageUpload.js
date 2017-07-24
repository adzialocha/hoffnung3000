import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  errorMessage: '',
  isLoading: false,
  uploadedImages: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.UPLOAD_IMAGE_REQUEST:
    return update(state, {
      errorMessage: { $set: '' },
      isLoading: { $set: true },
    })
  case ActionTypes.UPLOAD_IMAGE_SUCCESS:
    return update(state, {
      uploadedImages: { $push: action.payload.data },
      isLoading: { $set: false },
    })
  case ActionTypes.UPLOAD_IMAGE_FAILURE:
    return update(state, {
      errorMessage: { $set: action.error.message },
      isLoading: { $set: false },
    })
  default:
    return state
  }
}

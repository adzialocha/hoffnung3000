import { getStore } from '../store'
import { initialResourceState } from '../reducers/resources'

function hasCachedResource(state, resourceType, resourceId) {
  const objects = state.resources.objects
  return (resourceType in objects) && (resourceId in objects[resourceType])
}

export function cachedResource(resourceType, resourceId) {
  const store = getStore()
  const state = store.getState()

  if (!hasCachedResource(state, resourceType, resourceId)) {
    return initialResourceState
  }

  return state.resources.objects[resourceType][resourceId]
}

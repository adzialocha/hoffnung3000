import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

const authSelector = (state) => {
  const { auth, user } = state
  return {
    auth,
    user,
  }
}

const redirectAction = routerActions.replace
const failureRedirectPath = '/'

/* eslint-disable new-cap */
export const isAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction,
  failureRedirectPath,
  predicate: auth => auth.isAuthenticated,
  wrapperDisplayName: 'UserIsAuthenticated',
})

export const shouldNotBeAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction,
  failureRedirectPath,
  predicate: auth => !auth.isAuthenticated,
  wrapperDisplayName: 'UserIsNotAuthenticated',
})

export const isParticipant = UserAuthWrapper({
  authSelector,
  redirectAction,
  failureRedirectPath,
  predicate: (state) => {
    return state.auth.isAuthenticated && state.user.isParticipant
  },
  wrapperDisplayName: 'UserIsParticipant',
})

export const isAdmin = UserAuthWrapper({
  authSelector,
  redirectAction,
  failureRedirectPath,
  predicate: (state) => {
    return state.auth.isAuthenticated && state.user.isAdmin
  },
  wrapperDisplayName: 'UserIsAdmin',
})
/* eslint-enable new-cap */

import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

/* eslint-disable new-cap */
export const isAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  predicate: auth => auth.isAuthenticated,
  wrapperDisplayName: 'UserIsAuthenticated',
})

export const shouldNotBeAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  predicate: auth => !auth.isAuthenticated,
  wrapperDisplayName: 'UserIsNotAuthenticated',
})

export const isParticipant = UserAuthWrapper({
  authSelector: (state) => {
    const { auth, user } = state
    return {
      auth,
      user,
    }
  },
  redirectAction: routerActions.replace,
  predicate: (state) => {
    return state.auth.isAuthenticated && state.user.isParticipant
  },
  wrapperDisplayName: 'UserIsParticipant',
})
/* eslint-enable new-cap */

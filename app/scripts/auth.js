import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect'
import { routerActions } from 'connected-react-router'

import { redirectWhenUnauthenticated } from './actions/auth'

const redirectAction = redirectWhenUnauthenticated
const redirectPath = '/login'

/* eslint-disable new-cap */
export const isAuthenticated = connectedReduxRedirect({
  // return true statements if festival is free
  authenticatedSelector: state => {
    return (
      (state.auth.isAuthenticated || state.meta.config.festivalTicketPrice === 0)
    )
  },
  redirectAction,
  redirectPath,
  wrapperDisplayName: 'UserIsAuthenticated',
})

export const shouldNotBeAuthenticated = connectedReduxRedirect({
  allowRedirectBack: false,
  authenticatedSelector: state => !state.auth.isAuthenticated,
  redirectAction: routerActions.replace,
  redirectPath: '/',
  wrapperDisplayName: 'UserIsNotAuthenticated',
})

export const isParticipant = connectedReduxRedirect({
  redirectAction,
  redirectPath,
  authenticatedSelector: state => {
    return (
      state.auth.isAuthenticated &&
      (state.user.isParticipant || state.user.isAdmin) &&
      state.user.isActive
    )
  },
  wrapperDisplayName: 'UserIsParticipant',
})

export const isParticipantOrFreeFestival = connectedReduxRedirect({
  redirectAction,
  redirectPath,
  authenticatedSelector: state => {
    return (
      (state.auth.isAuthenticated || state.meta.config.festivalTicketPrice === 0) &&
      (state.user.isParticipant || state.user.isAdmin || state.meta.config.festivalTicketPrice === 0) &&
      (state.user.isActive || state.meta.config.festivalTicketPrice === 0)
    )
  },
  wrapperDisplayName: 'UserIsParticipantOrFreeFestival',
})

export const isVisitor = connectedReduxRedirect({
  redirectAction,
  redirectPath,
  // return true statements if festival is free
  authenticatedSelector: state => {
    return (
      (state.auth.isAuthenticated || state.meta.config.festivalTicketPrice === 0) &&
      (state.user.isVisitor || state.user.isAdmin || state.meta.config.festivalTicketPrice === 0) &&
      (state.user.isActive || state.meta.config.festivalTicketPrice === 0)
    )
  },
  wrapperDisplayName: 'UserIsVisitor',
})

export const isAdmin = connectedReduxRedirect({
  redirectAction,
  redirectPath,
  authenticatedSelector: state => {
    return (
      state.auth.isAuthenticated &&
      state.user.isAdmin &&
      state.user.isActive
    )
  },
  wrapperDisplayName: 'UserIsAdmin',
})
/* eslint-enable new-cap */

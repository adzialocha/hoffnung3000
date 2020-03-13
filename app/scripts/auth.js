import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect'
import { routerActions } from 'connected-react-router'

import { redirectWhenUnauthenticated } from './actions/auth'

const redirectAction = redirectWhenUnauthenticated
const redirectPath = '/login'

/* eslint-disable new-cap */
export const isAuthenticated = connectedReduxRedirect({
  authenticatedSelector: state => state.auth.isAuthenticated,
  redirectAction,
  redirectPath,
  wrapperDisplayName: 'UserIsAuthenticated',
})

export const isAuthenticatedOrFestivalIsFree = connectedReduxRedirect({
  authenticatedSelector: state => {
    return (
      (state.auth.isAuthenticated || state.meta.config.festivalTicketPrice === 0)
    )
  },
  redirectAction,
  redirectPath,
  wrapperDisplayName: 'UserIsAuthenticatedOrFestivalIsFree',
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

export const isParticipantOrFestivalIsFree = connectedReduxRedirect({
  redirectAction,
  redirectPath,
  authenticatedSelector: state => {
    const isFestivalFree = state.meta.config.festivalTicketPrice === 0
    return (
      (state.auth.isAuthenticated || isFestivalFree) &&
      (state.user.isParticipant || state.user.isAdmin || isFestivalFree) &&
      (state.user.isActive || isFestivalFree)
    )
  },
  wrapperDisplayName: 'UserIsParticipantOrFestivalIsFree',
})

export const isVisitor = connectedReduxRedirect({
  redirectAction,
  redirectPath,
  authenticatedSelector: state => {
    return (
      state.auth.isAuthenticated &&
      (state.user.isVisitor || state.user.isAdmin) &&
      state.user.isActive
    )
  },
  wrapperDisplayName: 'UserIsVisitor',
})

export const isVisitorOrFestivalIsFree = connectedReduxRedirect({
  redirectAction,
  redirectPath,
  authenticatedSelector: state => {
    const isFestivalFree = state.meta.config.festivalTicketPrice === 0
    return (
      (state.auth.isAuthenticated || isFestivalFree) &&
      (state.user.isVisitor || state.user.isAdmin || isFestivalFree) &&
      (state.user.isActive || isFestivalFree)
    )
  },
  wrapperDisplayName: 'UserIsVisitorOrFestivalIsFree',
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

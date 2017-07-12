import React, { Component } from 'react'
import { Route } from 'react-router'
import {
  isAdmin,
  isAuthenticated,
  isParticipant,
  shouldNotBeAuthenticated,
} from './auth'

import {
  Calendar,
  ForgotPassword,
  Home,
  Items,
  Login,
  Page,
  Performers,
  PlacesIndex,
  PlacesNew,
  Profile,
  Register,
  ResetPassword,
  Tickets,
} from './views'

import { Admin } from './containers'

export default class Routes extends Component {
  render() {
    return (
      <main role="main">
        <Route component={Home} exact={true} path="/" />

        <Route component={shouldNotBeAuthenticated(Login)} path="/login" />
        <Route component={shouldNotBeAuthenticated(Register)} path="/register" />
        <Route component={shouldNotBeAuthenticated(Tickets)} path="/tickets" />
        <Route component={shouldNotBeAuthenticated(ForgotPassword)} path="/forgot" />
        <Route component={shouldNotBeAuthenticated(ResetPassword)} path="/reset/:token" />
        <Route component={Calendar} path="/calendar" />
        <Route component={Page} path="/pages/:slug" />
        <Route component={isAuthenticated(Profile)} path="/profile" />
        <Route component={PlacesIndex} path="/places" />
        <Route component={PlacesNew} path="/places/new" />
        <Route component={isParticipant(Performers)} path="/performers" />
        <Route component={isParticipant(Items)} path="/items" />
        <Route component={isAdmin(Admin)} path="/admin" />
      </main>
    )
  }
}

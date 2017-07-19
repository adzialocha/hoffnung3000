import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
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
  NotFound,
  Page,
  Performers,
  PlacesIndex,
  PlacesNew,
  PlacesShow,
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
        <Switch>
          <Route component={Home} exact={true} path="/" />
          <Route component={shouldNotBeAuthenticated(Login)} path="/login" />
          <Route component={shouldNotBeAuthenticated(Register)} path="/register" />
          <Route component={shouldNotBeAuthenticated(Tickets)} path="/tickets" />
          <Route component={shouldNotBeAuthenticated(ForgotPassword)} path="/forgot" />
          <Route component={shouldNotBeAuthenticated(ResetPassword)} path="/reset/:token" />
          <Route component={Calendar} path="/calendar" />
          <Route component={Page} path="/pages/:slug" />
          <Route component={isAuthenticated(Profile)} path="/profile" />
          <Route component={isParticipant(PlacesNew)} path="/places/new" />
          <Route component={isParticipant(PlacesShow)} path="/places/:slug" />
          <Route component={isParticipant(PlacesIndex)} path="/places" />
          <Route component={isParticipant(Performers)} path="/performers" />
          <Route component={isParticipant(Items)} path="/items" />
          <Route component={isAdmin(Admin)} path="/admin" />
          <Route component={NotFound} />
        </Switch>
      </main>
    )
  }
}

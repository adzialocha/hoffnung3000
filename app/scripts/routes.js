import React, { Component } from 'react'
import { Route } from 'react-router'
import {
  isAdmin,
  isAuthenticated,
  isParticipant,
  shouldNotBeAuthenticated,
} from './auth'

import {
  Admin,
  Calendar,
  Home,
  Items,
  Login,
  Page,
  Performers,
  Places,
  Profile,
  Register,
} from './views'

export default class Routes extends Component {
  render() {
    return (
      <main role="main">
        <Route component={Home} exact={true} path="/" />
        <Route component={shouldNotBeAuthenticated(Login)} path="/login" />
        <Route component={shouldNotBeAuthenticated(Register)} path="/register" />
        <Route component={Calendar} path="/calendar" />
        <Route component={Page} path="/pages/:slug" />
        <Route component={isAuthenticated(Profile)} path="/profile" />
        <Route component={isParticipant(Places)} path="/places" />
        <Route component={isParticipant(Performers)} path="/performers" />
        <Route component={isParticipant(Items)} path="/items" />
        <Route component={isAdmin(Admin)} path="/admin" />
      </main>
    )
  }
}

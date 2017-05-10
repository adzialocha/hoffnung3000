import React, { Component } from 'react'
import { Route } from 'react-router'
import { shouldNotBeAuthenticated } from './auth'

import {
  About,
  Calendar,
  Home,
  Login,
  Register,
} from './views'

export default class Routes extends Component {
  render() {
    return (
      <main role="main">
        <Route component={Home} exact={true} path="/" />
        <Route component={About} path="/about" />
        <Route component={shouldNotBeAuthenticated(Login)} path="/login" />
        <Route component={shouldNotBeAuthenticated(Register)} path="/register" />
        <Route component={Calendar} path="/calendar" />
      </main>
    )
  }
}

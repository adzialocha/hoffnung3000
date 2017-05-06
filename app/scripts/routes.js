import React, { Component } from 'react'
import { Route } from 'react-router'
import { isParticipant } from './auth'

import {
  About,
  Home,
  Login,
  Register,
  Test,
} from './views'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route component={Home} exact={true} path="/" />
        <Route component={About} path="/about" />
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register" />
        <Route component={isParticipant(Test)} path="/test" />
      </div>
    )
  }
}

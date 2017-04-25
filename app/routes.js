import React, { Component } from 'react'
import { Route } from 'react-router'

import {
  Home,
  About,
  Test,
} from './views'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route component={Home} exact={true} path="/" />
        <Route component={About} path="/about" />
        <Route component={Test} path="/test" />
      </div>
    )
  }
}

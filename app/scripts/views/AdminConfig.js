import React, { Component } from 'react'

import { AdminConfigPanel } from '../components'

class AdminConfig extends Component {
  render() {
    return (
      <section>
        <h1>Config</h1>
        <AdminConfigPanel />
      </section>
    )
  }
}

export default AdminConfig

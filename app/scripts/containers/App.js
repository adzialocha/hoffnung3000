import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Navigation } from '../components'

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <header>
          <Navigation />
        </header>

        <main>
          { this.props.children }
        </main>

        <footer>
          <p>Footer</p>
        </footer>
      </div>
    )
  }
}

export default App

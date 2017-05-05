import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Header, Footer, Navigation } from '../components'

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="wrapper" role="application">
        <Header />
        <Navigation />
        <main role="main">
          { this.props.children }
        </main>
        <Footer />
      </div>
    )
  }
}

export default App

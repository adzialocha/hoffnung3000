import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Header, Footer, FlashMessageStage, Navigation } from '../components'

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="wrapper" role="application">
        <Header />
        <FlashMessageStage />
        <Navigation />
        { this.props.children }
        <Footer />
      </div>
    )
  }
}

export default App

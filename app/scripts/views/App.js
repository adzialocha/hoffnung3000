import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  FlashMessageStage,
  Footer,
  Header,
  Navigation,
  UserStatusUpdater,
} from '../components'

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="wrapper" role="application">
        <Header />
        <UserStatusUpdater />
        <FlashMessageStage />
        <Navigation />
        { this.props.children }
        <Footer />
      </div>
    )
  }
}

export default App

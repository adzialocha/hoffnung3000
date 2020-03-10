import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withConfig } from '../containers'
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
    config: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="wrapper" role="application">
        <Header />
        <UserStatusUpdater isWithInterval={true} />
        <FlashMessageStage />
        <Navigation />
        { this.props.children }
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.meta,
  }
}

export default connect(
  mapStateToProps, {}
)(withConfig(App))

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { withConfig } from '../containers'

class Header extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
  }

  render() {
    return (
      <header role="banner">
        <div className="logo">
          <Link to="/">{ this.props.config.title }</Link>
        </div>
      </header>
    )
  }
}

export default withConfig(Header)

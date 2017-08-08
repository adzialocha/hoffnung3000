import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import config from '../../../common/config'

class Header extends Component {
  render() {
    return (
      <header role="banner">
        <div className="logo">
          <Link to="/">{ config.title }</Link>
        </div>
      </header>
    )
  }
}

export default Header

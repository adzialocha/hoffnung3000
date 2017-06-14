import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <header role="banner">
        <div className="logo">
          <Link to="/">HOFFNUNG 3000</Link>
        </div>

      </header>
    )
  }
}

export default Header

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <header role="banner">
        <div className="logo">
          <Link to="/" />
        </div>
      </header>
    )
  }
}

export default Header

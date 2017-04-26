import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navigation extends Component {
  render() {
    return (
      <nav role="navigation">
        <ul className="navigation">
          <li className="navigation__item">
            <Link to="/">Home</Link>
          </li>
          <li className="navigation__item">
            <Link to="/test">Test</Link>
          </li>
          <li className="navigation__item">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navigation

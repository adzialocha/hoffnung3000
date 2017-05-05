import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavigationLinks extends Component {
  render() {
    return (
      <ul className="navigation-links">
        <li className="navigation-links__item">
          <Link to="/">Home</Link>
        </li>
        <li className="navigation-links__item">
          <Link to="/test">Test</Link>
        </li>
        <li className="navigation-links__item">
          <Link to="/about">About</Link>
        </li>
      </ul>
    )
  }
}

export default NavigationLinks

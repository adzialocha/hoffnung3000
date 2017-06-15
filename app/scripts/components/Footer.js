import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Footer extends Component {
  render() {
    return (
      <footer role="contentinfo">
        <ul className="inline-navigation">
          <li className="inline-navigation__item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="inline-navigation__item">
            <NavLink to="/pages/about">About</NavLink>
          </li>
          <li className="inline-navigation__item">
            <NavLink to="/pages/information">Information</NavLink>
          </li>
          <li className="inline-navigation__item">
            <NavLink to="/pages/contact">Contact</NavLink>
          </li>
          <li className="inline-navigation__item">
            <NavLink to="/pages/imprint">Imprint</NavLink>
          </li>
        </ul>

        <div className="sponsors">
          <p className="sponsors__text">Supported by</p>
          <img
            className="sponsors__item"
            src="/static/images/logo-senatsverwaltung-berlin.png"
            title="Senatsverwaltung für Kultur und Europa - Berlin"
          />
        </div>
      </footer>
    )
  }
}

export default Footer

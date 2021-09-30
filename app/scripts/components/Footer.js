import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { translate } from '../../../common/services/i18n'

class Footer extends Component {
  render() {
    return (
      <footer role="contentinfo">
        <ul className="inline-navigation">
          <li className="inline-navigation__item">
            <NavLink to="/">
              { translate('components.footer.home') }
            </NavLink>
          </li>

          <li className="inline-navigation__item">
            <NavLink to="/pages/about">
              { translate('components.footer.about') }
            </NavLink>
          </li>

          <li className="inline-navigation__item">
            <NavLink to="/newsletter">
              { translate('components.footer.newsletter') }
            </NavLink>
          </li>

          <li className="inline-navigation__item">
            <NavLink to="/pages/information">
              { translate('components.footer.information') }
            </NavLink>
          </li>

          <li className="inline-navigation__item">
            <NavLink to="/pages/contact">
              { translate('components.footer.contact') }
            </NavLink>
          </li>

          <li className="inline-navigation__item">
            <NavLink to="/pages/imprint">
              { translate('components.footer.imprint') }
            </NavLink>
          </li>
        </ul>
      </footer>
    )
  }
}

export default Footer

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
              { translate('components.footer.programme') }
            </NavLink>
          </li>

          <li className="inline-navigation__item">
            <NavLink to="/pages/about">
              { translate('components.footer.about') }
            </NavLink>
          </li>

          <li className="inline-navigation__item">
            <NavLink to="/pages/how-to-antiuni">
              { translate('components.footer.information') }
            </NavLink>
          </li>

          <li className="inline-navigation__item">
            <NavLink to="/pages/contact">
              { translate('components.footer.contact') }
            </NavLink>
          </li>
        </ul>
      </footer>
    )
  }
}

export default Footer

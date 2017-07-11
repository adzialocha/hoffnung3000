import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { translate } from '../services/i18n'

const PRIMARY_NAVIGATION = [
  { key: 'home', url: '/' },
  { key: 'about', url: '/pages/about' },
  { key: 'calendar', url: '/calendar' },
]

const SECONDARY_NAVIGATION = [
  { key: 'information', url: '/pages/information' },
  { key: 'contact', url: '/pages/contact' },
]

const CURATION_NAVIGATION = [
  { key: 'places', url: '/places' },
  { key: 'performers', url: '/performers' },
  { key: 'items', url: '/items' },
]

const ADMIN_NAVIGATION = CURATION_NAVIGATION.concat([
  { key: 'admin', url: '/admin' },
])

const PARTICIPANT_NAVIGATION = CURATION_NAVIGATION

const VISITOR_NAVIGATION = []

const DEFAULT_NAVIGATION = [
  { key: 'tickets', url: '/tickets' },
]

class NavigationLinks extends Component {
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    isParticipant: PropTypes.bool.isRequired,
    isVisitor: PropTypes.bool.isRequired,
  }

  renderNavigationItems(navigation) {
    return navigation.map((navigationItem, index) => {
      return (
        <li className="navigation-links__item" key={index}>
          <NavLink to={navigationItem.url}>
            {translate(`components.navigationLinks.${navigationItem.key}`)}
          </NavLink>
        </li>
      )
    })
  }

  renderNavigation(navigation) {
    return (
      <ul className="navigation-links">
        {
          this.renderNavigationItems(
            PRIMARY_NAVIGATION
              .concat(navigation)
              .concat(SECONDARY_NAVIGATION)
          )
        }
      </ul>
    )
  }

  render() {
    if (this.props.isAdmin) {
      return this.renderNavigation(ADMIN_NAVIGATION)
    } else if (this.props.isParticipant) {
      return this.renderNavigation(PARTICIPANT_NAVIGATION)
    } else if (this.props.isVisitor) {
      return this.renderNavigation(VISITOR_NAVIGATION)
    }
    return this.renderNavigation(DEFAULT_NAVIGATION)
  }
}

function mapStateToProps(state) {
  return {
    isAdmin: state.user.isAdmin,
    isParticipant: state.user.isParticipant && state.user.isActive,
    isVisitor: state.user.isVisitor && state.user.isActive,
  }
}

export default connect(
  mapStateToProps
)(NavigationLinks)

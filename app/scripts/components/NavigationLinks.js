import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const ADMIN_NAVIGATION = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '/pages/about' },
  { label: 'Calendar', url: '/calendar' },
  { label: 'Admin', url: '/admin' },
]

const PARTICIPANT_NAVIGATION = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '/pages/about' },
  { label: 'Calendar', url: '/calendar' },
]

const DEFAULT_NAVIGATION = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '/pages/about' },
  { label: 'Calendar', url: '/calendar' },
]

class NavigationLinks extends Component {
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    isParticipant: PropTypes.bool.isRequired,
  }

  renderNavigationItems(navigation) {
    return navigation.map((navigationItem, index) => {
      return (
        <li className="navigation-links__item" key={index}>
          <NavLink to={navigationItem.url}>{navigationItem.label}</NavLink>
        </li>
      )
    })
  }

  renderNavigation(navigation) {
    return (
      <ul className="navigation-links">
        {this.renderNavigationItems(navigation)}
      </ul>
    )
  }

  render() {
    if (this.props.isAdmin) {
      return this.renderNavigation(ADMIN_NAVIGATION)
    } else if (this.props.isParticipant) {
      return this.renderNavigation(PARTICIPANT_NAVIGATION)
    }
    return this.renderNavigation(DEFAULT_NAVIGATION)
  }
}

function mapStateToProps(state) {
  return {
    isAdmin: state.user.isAdmin,
    isParticipant: state.user.isParticipant,
  }
}

export default connect(
  mapStateToProps
)(NavigationLinks)

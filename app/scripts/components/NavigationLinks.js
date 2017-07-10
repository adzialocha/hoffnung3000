import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const ADMIN_NAVIGATION = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '/pages/about' },
  { label: 'Calendar', url: '/calendar' },
  { label: 'Places', url: '/places' },
  { label: 'Performers', url: '/performers' },
  { label: 'Items', url: '/items' },
  { label: 'Admin', url: '/admin' },
  { label: 'Contact', url: '/pages/contact' },
]

const PARTICIPANT_NAVIGATION = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '/pages/about' },
  { label: 'Calendar', url: '/calendar' },
  { label: 'Places', url: '/places' },
  { label: 'Performers', url: '/performers' },
  { label: 'Items', url: '/items' },
  { label: 'Information', url: '/pages/information' },
  { label: 'Contact', url: '/pages/contact' },
]

const VISITOR_NAVIGATION = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '/pages/about' },
  { label: 'Calendar', url: '/calendar' },
  { label: 'Places', url: '/places' },
  { label: 'Information', url: '/pages/information' },
  { label: 'Contact', url: '/pages/contact' },
]

const DEFAULT_NAVIGATION = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '/pages/about' },
  { label: 'Calendar', url: '/calendar' },
  { label: 'Tickets', url: '/tickets' },
  { label: 'Information', url: '/pages/information' },
  { label: 'Contact', url: '/pages/contact' },
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

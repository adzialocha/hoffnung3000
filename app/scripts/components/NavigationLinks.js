import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class NavigationLinks extends Component {
  static propTypes = {
    isParticipant: PropTypes.bool.isRequired,
  }

  renderParticipantNavigation() {
    return (
      <ul className="navigation-links">
        <li className="navigation-links__item">
          <Link to="/">Home</Link>
        </li>
        <li className="navigation-links__item">
          <Link to="/calendar">Calendar</Link>
        </li>
        <li className="navigation-links__item">
          <Link to="/about">About</Link>
        </li>
      </ul>
    )
  }

  renderDefaultNavigation() {
    return (
      <ul className="navigation-links">
        <li className="navigation-links__item">
          <Link to="/">Home</Link>
        </li>
        <li className="navigation-links__item">
          <Link to="/calendar">Calendar</Link>
        </li>
        <li className="navigation-links__item">
          <Link to="/about">About</Link>
        </li>
      </ul>
    )
  }

  render() {
    if (this.props.isParticipant) {
      return this.renderParticipantNavigation()
    }
    return this.renderDefaultNavigation()
  }
}

function mapStateToProps(state) {
  const { isParticipant } = state.user
  return {
    isParticipant,
  }
}

export default connect(
  mapStateToProps,
)(NavigationLinks)

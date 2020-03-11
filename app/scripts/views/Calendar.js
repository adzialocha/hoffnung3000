import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { CuratedEventListItem, StaticPage } from '../components'
import { asInfiniteListCalendar } from '../containers'
import { translate } from '../../../common/services/i18n'
import { withConfig } from '../containers'
import { TagSelector } from '../components'

const WrappedInfiniteList = asInfiniteListCalendar(CuratedEventListItem, TagSelector)

class Calendar extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isParticipant: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
  }

  onClick(item) {
    this.props.push(`/events/${item.slug}`)
  }

  onEditClick(item) {
    this.props.push(`/events/${item.slug}/edit`)
  }

  onPreviewClick() {
    this.props.push('/tickets')
  }

  renderItemsList() {
    if ((!this.props.isAuthenticated || !this.props.isActive) && this.props.config.festivalTicketPrice !== 0) {
      return (
        <WrappedInfiniteList
          resourceName="preview"
          onClick={this.onPreviewClick}
        />
      )
    }

    return (
      <WrappedInfiniteList
        resourceName="events"
        onClick={this.onClick}
        onEditClick={this.onEditClick}
      />
    )
  }

  renderCreateButton() {
    if (
      !(this.props.isParticipant || this.props.isAdmin) ||
      !this.props.isAuthenticated
    ) {
      return null
    }

    return (
      <Link className="button button--green" to="/new/event">
        { translate('views.events.createNewButton') }
      </Link>
    )
  }

  renderText() {
    if ((!this.props.isAuthenticated || !this.props.isActive) && this.props.config.festivalTicketPrice !== 0) {
      return <StaticPage hideTitle={true} slug="calendar-public" />
    }

    return <StaticPage hideTitle={true} slug="calendar" />
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.events.calendarTitle') }</h1>
        { this.renderText() }
        { this.renderCreateButton() }
        <hr />
        { this.renderItemsList() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
    this.onPreviewClick = this.onPreviewClick.bind(this)
  }
}

function mapStateToProps(state) {
  return {
    ...state.auth,
    ...state.user,
    ...state.meta,
  }
}

export default connect(
  mapStateToProps, {
    push,
  }
)(withConfig(Calendar))

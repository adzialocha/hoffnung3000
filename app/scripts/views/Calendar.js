import DatePicker from 'react-date-picker'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { CuratedEventListItem, StaticPage } from '../components'
import { TagSelector } from '../components'
import { asInfiniteListCalendar } from '../containers'
import { translate } from '../../../common/services/i18n'
import { withConfig } from '../containers'

const WrappedInfiniteList = asInfiniteListCalendar(CuratedEventListItem, TagSelector)

// Select current day or first day of festival when too early
function defaultDate(festivalDateStart) {
  return DateTime.now({ zone: 'utc ' }) < DateTime.fromISO(festivalDateStart, { zone: 'utc' })
    ? festivalDateStart
    : DateTime.now().toISODate()
}

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

  onDateSelected(date) {
    if (date) {
      this.setState({
        selectedDate: DateTime.fromJSDate(date).toISODate(),
      })
    } else {
      this.setState({
        selectedDate: defaultDate(this.props.config.festivalDateStart),
      })
    }
  }

  renderItemsList() {
    if (
      (
        !this.props.isAuthenticated ||
        !this.props.isActive
      ) && this.props.config.festivalTicketPrice !== 0
    ) {
      return (
        <WrappedInfiniteList
          date={this.state.selectedDate}
          resourceName="preview"
          onClick={this.onPreviewClick}
        />
      )
    }

    return (
      <WrappedInfiniteList
        date={this.state.selectedDate}
        resourceName="events"
        onClick={this.onClick}
        onEditClick={this.onEditClick}
      />
    )
  }

  renderCreateButton() {
    if (
      !(
        this.props.isParticipant ||
        this.props.isAdmin
      ) || !this.props.isAuthenticated
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
    if (
      (
        !this.props.isAuthenticated ||
        !this.props.isActive
      ) && this.props.config.festivalTicketPrice !== 0
    ) {
      return <StaticPage hideTitle={true} slug="calendar-public" />
    }

    return <StaticPage hideTitle={true} slug="calendar" />
  }

  render() {
    const { config } = this.props

    return (
      <section>
        <h1>{ translate('views.events.calendarTitle') }</h1>
        <DatePicker
          maxDate={new Date(config.festivalDateEnd)}
          minDate={new Date(config.festivalDateStart)}
          value={new Date(this.state.selectedDate)}
          onChange={this.onDateSelected}
        />
        { this.renderText() }
        { this.renderCreateButton() }
        { this.renderItemsList() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedDate: defaultDate(props.config.festivalDateStart),
    }

    this.onClick = this.onClick.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
    this.onPreviewClick = this.onPreviewClick.bind(this)
    this.onDateSelected = this.onDateSelected.bind(this)
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

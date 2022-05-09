import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { CuratedEventListItem, StaticPage, DatePicker } from '../components'
import { TagSelector } from '../components'
import { asInfiniteListCalendar } from '../containers'
import { translate } from '../../../common/services/i18n'
import { withConfig } from '../containers'

const WrappedInfiniteList = asInfiniteListCalendar(CuratedEventListItem)

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

  onDateSelected(selectedDate) {
    if (selectedDate) {
      this.setState({
        selectedDate,
      })
    } else {
      this.setState({
        selectedDate: defaultDate(this.props.config.festivalDateStart),
      })
    }
  }

  onTagFilterChange(selectedTags) {
    this.setState({
      selectedTags,
    })
  }

  renderItemsList() {
    const from = this.state.selectedDate
    const to = DateTime.fromISO(from).plus({ day: 1 }).toISODate()

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
          tags={this.state.selectedTags}
          onClick={this.onPreviewClick}
        />
      )
    }

    return (
      <WrappedInfiniteList
        from={from}
        resourceName="events"
        tags={this.state.selectedTags}
        to={to}
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

  renderTagSelector() {
    if (this.props.config.defaultTags.length === 0) {
      return null
    }

    const tags = this.props.config.defaultTags.map(tag => {
      return { label: tag, value: tag }
    })

    return (
      <Fragment>
        <h3>{ translate('views.events.tagSelectorTitle') }</h3>

        <TagSelector
          defaultTags={tags}
          tagArray={this.state.selectedTags}
          onChange={this.onTagFilterChange}
        />
      </Fragment>
    )
  }

  renderDatePicker() {
    return (
      <Fragment>
        <h3>{ translate('views.events.datePickerTitle') }</h3>
        <DatePicker value={this.state.selectedDate} onChange={this.onDateSelected} />
      </Fragment>
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.events.calendarTitle') }</h1>
        { this.renderText() }
        { this.renderCreateButton() }
        <hr />
        { this.renderDatePicker() }
        <hr />
        { this.renderTagSelector() }
        <hr />
        { this.renderItemsList() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedDate: defaultDate(props.config.festivalDateStart),
      selectedTags: [],
    }

    this.onClick = this.onClick.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
    this.onPreviewClick = this.onPreviewClick.bind(this)
    this.onDateSelected = this.onDateSelected.bind(this)
    this.onTagFilterChange = this.onTagFilterChange.bind(this)
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

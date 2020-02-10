import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { LocationMap, CuratedEventListItem, StaticPage } from '../components'
import { asInfiniteListCalendar } from '../containers'
import { translate } from '../../../common/services/i18n'

const WrappedInfiniteList = asInfiniteListCalendar(CuratedEventListItem)

class Calendar extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isParticipant: PropTypes.bool.isRequired,
    listItems: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  }

  componentWillMount() {
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

  onFreeClick(item) {
    this.props.push(`/eventisfree/${item.slug}`)
  }

  renderItemsList() {
    if (!this.props.isAuthenticated || !this.props.isActive) {
      if (this.props.config.festivalTicketPrice === 0) {
        return (
          <WrappedInfiniteList
            resourceName="eventisfree"
            onClick={this.onFreeClick}
          />
        )
      }
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

  renderMap() {
    if (!this.props.listItems.events) {
      return null
    } else if (this.props.listItems.events.listItems[0]) {
      const allEvents = this.props.listItems.events.listItems
      const plots = allEvents.map(item => ({
        city: item.place.city,
        cityCode: item.place.cityCode,
        country: item.place.country,
        key: item.id,
        latitude: item.place.latitude || 0, // for venues without gps positions fix next
        longitude: item.place.longitude || 0, // for venues without gps positions fix next
        mode: item.place.mode,
        street: item.place.street,
        title: item.title,
      }))
      return (
        <div>
          <LocationMap initialCenter= { { lat: this.props.config.defaultLatitude, lng: this.props.config.defaultLongitude } } plots= {plots} />
        </div>
      )
    }
    return null
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
        { this.renderMap() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
    this.onPreviewClick = this.onPreviewClick.bind(this)
    this.onFreeClick = this.onFreeClick.bind(this)
  }
}

function mapStateToProps(state) {
  return {
    ...state.auth,
    ...state.user,
    ...state.meta,
    listItems: state.infiniteList,
  }
}

export default connect(
  mapStateToProps, {
    push,
  }
)(Calendar)

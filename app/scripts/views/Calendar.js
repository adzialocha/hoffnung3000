import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { CalendarMap, CuratedEventListItem, StaticPage } from '../components'
import { TagSelector } from '../components'
import { asInfiniteListCalendar } from '../containers'
import { formatEventTime } from '../../../common/utils/dateFormat'
import { translate } from '../../../common/services/i18n'
import { withConfig } from '../containers'

const WrappedInfiniteList = asInfiniteListCalendar(CuratedEventListItem, TagSelector)

class Calendar extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isParticipant: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    resourceListItems: PropTypes.array.isRequired,
  }

  static defaultProps = {
    resourceListItems: [],
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
    if (
      (
        !this.props.isAuthenticated ||
        !this.props.isActive
      ) && this.props.config.festivalTicketPrice !== 0
    ) {
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

  renderMap() {
    if (
      (
        !this.props.isAuthenticated ||
        !this.props.isActive
      ) && this.props.config.festivalTicketPrice !== 0
    ) {
      return null
    }

    const allEvents = this.props.resourceListItems
    if (!allEvents) {
      return null
    }

    const uniqueVenues = allEvents
      .map(event => event.placeId)
      .map((event, index, final) => final.indexOf(event) === index && index)
      .filter(event => allEvents[event]).map(event => allEvents[event].place)
      .filter(place => place.mode !== 'virtual')

    const virtualVenues = allEvents
      .map(event => event.placeId)
      .map((event, index, final) => final.indexOf(event) === index && index)
      .filter(event => allEvents[event]).map(event => allEvents[event].place)
      .filter(place => place.mode === 'virtual')

    const mapVenuePlots = uniqueVenues.map(venue => {
      const venueEvents = allEvents.reduce((result, event) => {
        if (venue.id === event.placeId) {
          const time = formatEventTime(event.slots[0].from, event.slots[event.slots.length - 1].to)

          result.push({
            title: event.title,
            time: time,
            imageUrl: event.images.length > 0 ? event.images[0].smallImageUrl : null,
            slug: event.slug,
          })
        }
        return result
      }, [])

      return {
        city: venue.city,
        cityCode: venue.cityCode,
        country: venue.country,
        key: venue.id,
        latitude: venue.latitude,
        longitude: venue.longitude,
        mode: venue.mode,
        street: venue.street,
        place: venue.title,
        events: venueEvents,
      }
    })

    const virtualEvents = virtualVenues.map(venue => {
      return allEvents.reduce((result, event) => {
        if (venue.id === event.placeId) {
          const time = formatEventTime(event.slots[0].from, event.slots[event.slots.length - 1].to)

          result.push({
            title: event.title,
            time,
            imageUrl: event.images.length > 0 ? event.images[0].smallImageUrl : null,
            slug: event.slug,
            place: venue.title,
          })
        }
        return result
      }, [])
    })

    return (
      <CalendarMap
        defaultZoom={this.props.config.defaultZoom}
        initialCenter={
          {
            lat: this.props.config.defaultLatitude,
            lng: this.props.config.defaultLongitude,
          }
        }
        plots={mapVenuePlots}
        virtualEvents={virtualEvents}
      />
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.events.calendarTitle') }</h1>
        { this.renderText() }
        { this.renderCreateButton() }
        <hr />
        { this.renderMap() }
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
    ...state.resourceList,
  }
}

export default connect(
  mapStateToProps, {
    push,
  }
)(withConfig(Calendar))

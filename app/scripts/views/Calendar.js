import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { DateTime } from 'luxon'

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
      const allVenues = []
      allEvents.map(item => {
        const filterVenues = allEvents.filter(i => ((item.placeId === i.placeId)))
        const exists = allVenues.filter(x => {
          return x.find(({ placeId }) => placeId === item.placeId)
        })
        if (exists.length === 0) {
          allVenues.push(filterVenues)
          return allVenues
        } return null
      })
      const plots = allVenues.map(item => {
        const venueEvents = item.map(i => {
          const time = DateTime.fromISO(i.slots[0].from).toFormat('T DDDD')
          return {
            title: i.title,
            time: time,
            imageUrl: i.images[0].smallImageUrl,
            slug: i.slug,
          }
        })
        const newArrayObject = {
          city: item[0].place.city,
          cityCode: item[0].place.cityCode,
          country: item[0].place.country,
          key: item[0].id,
          latitude: item[0].place.latitude,
          longitude: item[0].place.longitude,
          mode: item[0].place.mode,
          placeId: item[0].placeId,
          street: item[0].place.street,
          place: item[0].place.title,
          events: venueEvents,
        }
        return newArrayObject
      })
      return (
        <div>
          <LocationMap initialCenter= { { lat: this.props.config.defaultLatitude, lng: this.props.config.defaultLongitude } } plots={plots} />
        </div>
      )
    } return null
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

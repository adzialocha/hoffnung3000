import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { ImageGallery, AnimalLink, LocationMap } from '../components'
import { cachedResource } from '../services/resources'
import { fetchResource } from '../actions/resources'
import { formatEventTime } from '../../../common/utils/dateFormat'
import { translate } from '../../../common/services/i18n'

class EventsShow extends Component {
  static propTypes = {
    fetchResource: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isVisitor: PropTypes.bool.isRequired,
    resourceData: PropTypes.object.isRequired,
    resourceSlug: PropTypes.string.isRequired,
  }

  componentWillMount() {
    this.props.fetchResource('events', this.props.resourceSlug)
  }

  renderActionButton() {
    if (!this.props.resourceData.isOwnerMe) {
      return null
    }

    return (
      <Link
        className="button button--green"
        to={`/events/${this.props.resourceSlug}/edit`}
      >
        { translate('common.editButton') }
      </Link>
    )
  }

  renderPrivacy() {
    if (this.props.resourceData.isPublic) {
      return null
    }

    return (
      <div className="bullet bullet--centered ellipsis">
        { translate('views.events.isPrivateEvent') }
      </div>
    )
  }

  renderDescription() {
    return (
      <div>
        <div
          className="markdown"
          dangerouslySetInnerHTML={ {
            __html: this.props.resourceData.descriptionHtml,
          } }
        />
      </div>
    )
  }

  renderTicketUrl() {
    return (
      <div>
        <p>
          <a href={ this.props.resourceData.ticketUrl }>
            { this.props.resourceData.ticketUrl}
          </a>
        </p>
      </div>
    )
  }

  renderWebsiteUrl() {
    return (
      <div>
        <p>
          <a href={ this.props.resourceData.websiteUrl }>
            { this.props.resourceData.websiteUrl}
          </a>
        </p>
      </div>
    )
  }

  renderAdditionalInfo() {
    return (
      <div>
        <div
          className="markdown"
          dangerouslySetInnerHTML={ {
            __html: this.props.resourceData.additionalInfoHtml,
          } }
        />
      </div>
    )
  }

  renderOwner() {
    if (this.props.isVisitor && this.props.isActive) {
      return null
    }

    return <AnimalLink animal={this.props.resourceData.animal} />
  }

  renderPlaceAddress() {
    const {
      city,
      cityCode,
      country,
      latitude,
      longitude,
      mode,
      street,
    } = this.props.resourceData.place

    if (mode === 'gps') {
      return (
        <div>
          <strong>
            { translate('views.places.locationHeader') }
          </strong>

          <p>@ { latitude }, { longitude }</p>

          <LocationMap initialCenter={ { lat: latitude, lng: longitude } } />
        </div>
      )
    } else if (mode === 'address') {
      return (
        <div>
          <strong>
            { translate('views.places.locationHeader') }
          </strong>

          <p>
            { street }<br />
            { `${cityCode} ${city}` }<br />
            { country }<br />
          </p>
        </div>
      )
    }
    return (
      <div>
        <strong>
          { translate('views.places.locationHeader') }
        </strong>

        <p>{ translate('views.places.virtualLocation') }</p>
      </div>
    )
  }

  renderPlace() {
    if (this.props.isVisitor && this.props.isActive) {
      return this.renderPlaceAddress()
    }

    return (
      <Link to={`/places/${this.props.resourceData.place.slug}`}>
        @ { this.props.resourceData.place.title }
      </Link>
    )
  }

  renderAddress() {
    const {
      city,
      cityCode,
      latitude,
      longitude,
      mode,
      street,
    } = this.props.resourceData.place

    if (mode === 'gps') {
      return `@ ${latitude}, ${longitude}`
    } else if (mode === 'address') {
      return `@ ${street}, ${cityCode} ${city}`
    }

    return translate('components.placeListItem.virtualLocation')
  }

  renderEventTime() {
    const slots = this.props.resourceData.slots
    const firstSlot = slots[0]
    const lastSlot = slots[slots.length - 1]

    return <h4>{ formatEventTime(firstSlot.from, lastSlot.to) }</h4>
  }

  renderTitle() {
    if (this.props.isLoading) {
      return <h1>{ translate('views.events.titlePlaceholder') }</h1>
    }

    return <h1>{ this.props.resourceData.title }</h1>
  }

  renderImageGallery() {
    if (this.props.resourceData.images.length === 0) {
      return null
    }

    return (
      <div>
        <hr />

        <strong>
          { translate('views.common.imageGalleryTitle') }
        </strong>

        <ImageGallery images={this.props.resourceData.images} />
      </div>
    )
  }

  renderContent() {
    if (this.props.isLoading) {
      return <p>{ translate('common.loading') }</p>
    }

    return (
      <div>
        { this.renderOwner() }
        { this.renderPrivacy() }
        { this.renderEventTime() }

        <h4>
          { this.renderPlace() }
        </h4>

        { this.renderDescription() }
        { this.renderImageGallery() }
        { this.renderTicketUrl() }
        { this.renderWebsiteUrl() }
        { this.renderAdditionalInfo() }
      </div>
    )
  }

  render() {
    if (this.props.isError) {
      return <p>{ translate('common.somethingWentWrong') }</p>
    }

    return (
      <section>
        { this.renderTitle() }

        <Link className="button" to="/calendar">
          { translate('common.backToOverview') }
        </Link>

        { this.renderActionButton() }
        <hr />
        { this.renderContent() }
      </section>
    )
  }

  constructor(props) {
    super(props)
  }
}

function mapStateToProps(state, ownProps) {
  const resourceSlug = ownProps.match.params.slug
  const resource = cachedResource('events', resourceSlug)
  const { isLoading, isError, object: resourceData } = resource
  const { isVisitor, isActive } = state.user

  return {
    isActive,
    isError,
    isLoading,
    isVisitor,
    resourceData,
    resourceSlug,
  }
}

export default connect(
  mapStateToProps, {
    fetchResource,
  }
)(EventsShow)

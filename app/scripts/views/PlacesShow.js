import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { asInfiniteListCalendar } from '../containers'
import { CuratedEventListItem } from '../components'
import { LocationMap, ImageGallery, AnimalLink } from '../components'
import { cachedResource } from '../services/resources'
import { fetchResource } from '../actions/resources'
import { numberToSlotSizeStrHuman } from '../../../common/utils/slots'
import { translate } from '../../../common/services/i18n'

const WrappedInfiniteList = asInfiniteListCalendar(CuratedEventListItem)

class PlacesShow extends Component {
  static propTypes = {
    fetchResource: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    resourceData: PropTypes.object.isRequired,
    resourceSlug: PropTypes.string.isRequired,
  }

  componentWillMount() {
    this.props.fetchResource('places', this.props.resourceSlug)
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

  renderActionButton() {
    if (!this.props.resourceData.isOwnerMe) {
      return null
    }

    return (
      <Link
        className="button button--green"
        to={`/places/${this.props.resourceSlug}/edit`}
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
        { translate('views.places.isPrivatePlace') }
      </div>
    )
  }

  renderSlotSize() {
    return (
      <div>
        <strong>
          { translate('views.places.slotSizeHeader') }
        </strong>

        <p>{ numberToSlotSizeStrHuman(this.props.resourceData.slotSize) }</p>
      </div>
    )
  }

  renderAddress() {
    const {
      city,
      cityCode,
      country,
      latitude,
      longitude,
      mode,
      street,
    } = this.props.resourceData

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

  renderOwner() {
    return <AnimalLink animal={this.props.resourceData.animal} />
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

  renderEventList() {
    return (
      <div><h1>{ translate('views.places.eventsHeader') }</h1>
        <WrappedInfiniteList
          placeIdFilter={this.props.resourceData.id}
          resourceName="events"
          onClick={this.onClick}
          onEditClick={this.onEditClick}
        />
      </div>
    )
  }

  renderAccessibilityInfo() {
    return (
      <div>
        <strong>
          { translate('views.places.accessibilityInfoHeader') }
        </strong>
        <p>{ this.props.resourceData.accessibilityInfo }</p>
      </div>
    )
  }

  renderCapacity() {
    return (
      <div>
        <strong>
          { translate('views.places.capacityHeader') }
        </strong>
        <p>{ this.props.resourceData.capacity }</p>
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
        { this.renderDescription() }
        { this.renderImageGallery() }
        <hr />
        { this.renderAddress() }
        { this.renderAccessibilityInfo() }
        { this.renderCapacity() }
        <hr />
        { this.renderSlotSize() }
        <hr />
      </div>
    )
  }

  renderTitle() {
    if (this.props.isLoading) {
      return <h1>{ translate('views.places.titlePlaceholder') }</h1>
    }
    return <h1>{ this.props.resourceData.title }</h1>
  }

  render() {
    if (this.props.isError) {
      return <p>{ translate('common.somethingWentWrong') }</p>
    }

    return (
      <section>
        { this.renderTitle() }

        <Link className="button" to="/places">
          { translate('common.backToOverview') }
        </Link>

        { this.renderActionButton() }
        <hr />
        { this.renderContent() }
        { this.renderEventList() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
  }
}

function mapStateToProps(state, ownProps) {
  const resourceSlug = ownProps.match.params.slug
  const resource = cachedResource('places', resourceSlug)
  const { isLoading, isError, object: resourceData } = resource

  return {
    isError,
    isLoading,
    resourceData,
    resourceSlug,
  }
}

export default connect(
  mapStateToProps, {
    fetchResource,
    push,
  }
)(PlacesShow)

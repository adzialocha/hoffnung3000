import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { cachedResource } from '../services/resources'
import { fetchResource } from '../actions/resources'
import { LocationMap } from '../components'
import { numberToSlotSizeStrHuman } from '../utils/slots'
import { translate } from '../services/i18n'

class PlacesShow extends Component {
  static propTypes = {
    fetchResource: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    resourceSlug: PropTypes.string.isRequired,
    resourceData: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.fetchResource('places', this.props.resourceSlug)
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
        { translate('components.placeListItem.editButton') }
      </Link>
    )
  }

  renderPrivacy() {
    if (this.props.resourceData.isPublic) {
      return null
    }
    return (
      <div className="bullet bullet--centered ellipsis">
        { translate('components.placeListItem.isPrivatePlace') }
      </div>
    )
  }

  renderSlotSize() {
    return (
      <div>
        <strong>
          { translate('components.placeListItem.slotSizeHeader') }
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
            { translate('components.placeListItem.locationHeader') }
          </strong>
          <p>@ { latitude }, { longitude }</p>
          <LocationMap latitude={latitude} longitude={longitude} />
        </div>
      )
    } else if (mode === 'address') {
      return (
        <div>
          <strong>
            { translate('components.placeListItem.locationHeader') }
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
          { translate('components.placeListItem.locationHeader') }
        </strong>
        <p>{ translate('components.placeListItem.virtualLocation') }</p>
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
    const { animalName, animalId } = this.props.resourceData

    return (
      <p>
        { translate('views.places.owner') }
        &nbsp;
        <Link to={`/inbox/new/${animalId}`}>
          { animalName }
        </Link>
      </p>
    )
  }

  renderContent() {
    if (this.props.isLoading) {
      return <p>{ translate('components.common.loading') }</p>
    }

    return (
      <div>
        { this.renderOwner() }
        { this.renderPrivacy() }
        { this.renderDescription() }
        <hr />
        { this.renderAddress() }
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
    return (
      <section>
        { this.renderTitle() }
        <Link className="button" to="/places">
          { translate('views.places.backToOverview') }
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
  const resource = cachedResource('places', resourceSlug)
  const { isLoading, object: resourceData } = resource

  return {
    isLoading,
    resourceData,
    resourceSlug,
  }
}

export default connect(
  mapStateToProps, {
    fetchResource,
  }
)(PlacesShow)

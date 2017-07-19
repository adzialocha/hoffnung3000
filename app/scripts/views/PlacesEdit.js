import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import flash from '../actions/flash'
import { cachedResource } from '../services/resources'
import { fetchResource, updateResource } from '../actions/resources'
import { PlaceForm } from '../forms'
import {
  generateNewSlotItems,
  prepareSlotIds,
} from '../utils/slots'
import { translate } from '../services/i18n'

class PlacesEdit extends Component {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    fetchResource: PropTypes.func.isRequired,
    flash: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    resourceData: PropTypes.object.isRequired,
    resourceSlug: PropTypes.string.isRequired,
    updateResource: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchResource('places', this.props.resourceSlug)
  }

  onSubmit(values) {
    const { title, description, isPublic } = values
    const { slots } = values.slots
    const disabledSlots = slots ? prepareSlotIds(slots) : []

    const successFlash = {
      text: translate('flash.updatePlaceSuccess'),
    }

    const requestParams = {
      ...values.location,
      description,
      disabledSlots,
      isPublic,
      title,
    }

    this.props.updateResource(
      'places',
      this.props.resourceSlug,
      requestParams,
      successFlash,
      '/places'
    )
  }

  renderForm() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>
    }

    if (!this.props.resourceData.isOwnerMe) {
      this.props.flash({
        redirect: '/',
        text: translate('flash.common.unauthorizedView'),
        type: 'error',
      })
    }

    const {
      description,
      isPublic,
      mode,
      slots: slotData,
      title,
    } = this.props.resourceData

    const location = {
      mode,
    }

    if (mode === 'gps') {
      location.latitude = this.props.resourceData.latitude
      location.longitude = this.props.resourceData.longitude
    } else if (mode === 'address') {
      location.street = this.props.resourceData.street
      location.cityCode = this.props.resourceData.cityCode
      location.city = this.props.resourceData.city
      location.country = this.props.resourceData.country
    }

    const slotSize = this.props.resourceData.slotSize
    const slots = {
      slots: generateNewSlotItems(slotSize, slotData),
      slotSize,
    }
    const initialValues = {
      description,
      isPublic,
      location,
      slots,
      title,
    }

    return (
      <PlaceForm
        errorMessage={this.props.errorMessage}
        initialValues={initialValues}
        isSlotSizeVisible={false}
        onSubmit={this.onSubmit}
      />
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
          { translate('common.backToOverview') }
        </Link>
        <hr />
        { this.renderForm() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }
}

function mapStateToProps(state, ownProps) {
  const resourceSlug = ownProps.match.params.slug
  const { errorMessage } = state.resources
  const resource = cachedResource('places', resourceSlug)
  const { isLoading, object: resourceData } = resource

  return {
    errorMessage,
    isLoading,
    resourceData,
    resourceSlug,
  }
}

export default connect(
  mapStateToProps, {
    fetchResource,
    flash,
    updateResource,
  }
)(PlacesEdit)

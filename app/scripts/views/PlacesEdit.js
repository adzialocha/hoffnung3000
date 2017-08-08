import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import flash from '../actions/flash'
import { cachedResource } from '../services/resources'
import { confirm } from '../services/dialog'
import {
  deleteResource,
  fetchResource,
  updateResource,
} from '../actions/resources'
import { PlaceForm } from '../forms'
import {
  generateNewSlotItems,
  getDisabledSlotIndexes,
} from '../../../common/utils/slots'
import { translate } from '../../../common/services/i18n'

class PlacesEdit extends Component {
  static propTypes = {
    deleteResource: PropTypes.func.isRequired,
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

  componentDidUpdate() {
    if (!this.props.isLoading && !this.props.resourceData.isOwnerMe) {
      this.props.flash({
        redirect: '/',
        text: translate('flash.unauthorizedView'),
        type: 'error',
      })
    }
  }

  onSubmit(values) {
    const { title, description, isPublic, images } = values
    const { slots } = values.slots
    const disabledSlots = slots ? getDisabledSlotIndexes(slots) : []

    const successFlash = {
      text: translate('flash.updatePlaceSuccess'),
    }

    const requestParams = {
      ...values.location,
      description,
      disabledSlots,
      images,
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

  onDeleteClick() {
    if (!confirm(translate('common.areYouSure'))) {
      return
    }

    const deleteFlash = {
      text: translate('flash.deletePlaceSuccess'),
    }

    this.props.deleteResource(
      'places',
      this.props.resourceSlug,
      deleteFlash,
      '/places'
    )
  }

  renderForm() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>
    }

    const {
      description,
      images,
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
      images,
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
        <button className="button button--red" onClick={this.onDeleteClick}>
          { translate('common.deleteButton') }
        </button>
        <hr />
        { this.renderForm() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onDeleteClick = this.onDeleteClick.bind(this)
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
    deleteResource,
    fetchResource,
    flash,
    updateResource,
  }
)(PlacesEdit)

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { EsriProvider } from 'leaflet-geosearch'

import { PlaceForm } from '../forms'
import { cachedResource } from '../services/resources'
import { createResource } from '../actions/resources'
import { getDisabledSlotIndexes, generateNewDisabledSlotItems, generateNewSlotItems } from '../../../common/utils/slots'
import { translate } from '../../../common/services/i18n'
import { withConfig } from '../containers'

const DEFAULT_MODE = 'address'
const DEFAULT_SLOT_SIZE = 60 // in minutes
const provider = new EsriProvider()

class PlacesNew extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    createResource: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    nextRandomId: PropTypes.string.isRequired,
  }

  componentWillMount() {
    const { config } = this.props
    const { festivalDateStart, festivalDateEnd } = config

    const slots = generateNewSlotItems(DEFAULT_SLOT_SIZE, [], festivalDateStart, festivalDateEnd)

    this.setState({
      generatedSlots: {
        slots: slots,
        disableSlots: false,
      },
    })
  }

  onDisableSlotsChange(event) {
    const { config } = this.props
    const { festivalDateStart, festivalDateEnd } = config
    let slots = null
    let disableSlots = false

    if (event) {
      slots = generateNewDisabledSlotItems(
        DEFAULT_SLOT_SIZE, festivalDateStart, festivalDateEnd
      )
      disableSlots = true
    } else {
      slots = generateNewSlotItems(
        DEFAULT_SLOT_SIZE, [], festivalDateStart, festivalDateEnd
      )
      disableSlots = false
    }
    this.setState({
      generatedSlots: {
        slots: slots,
        disableSlots: disableSlots,
      },
    })
  }

  onSubmit(values) {
    const { accessibilityInfo, capacity, title, description, isPublic, images } = values
    const { slotSize, slots } = values.slots
    const disabledSlots = slots ? getDisabledSlotIndexes(slots) : []

    const flash = {
      text: translate('flash.createPlaceSuccess'),
    }

    const address = `${values.location.street}, ${values.location.cityCode}, ${values.location.city}`

    provider
      .search({ query: address })
      .then(result => {
        values.location.latitude = result[0].y
        values.location.longitude = result[0].x

        const requestParams = {
          ...values.location,
          accessibilityInfo,
          capacity,
          description,
          disabledSlots,
          images,
          isPublic,
          slotSize,
          title,
        }

        this.props.createResource(
          'places',
          this.props.nextRandomId,
          requestParams,
          flash,
          '/places'
        )
      })
  }

  render() {
    const { config } = this.props

    const initialValues = {
      isPublic: true,
      location: {
        mode: DEFAULT_MODE,
        street: '',
        city: config.defaultCity,
        cityCode: '',
        country: config.defaultCountry,
        latitude: config.defaultLatitude,
        longitude: config.defaultLongitude,
      },
      slots: {
        slotSize: DEFAULT_SLOT_SIZE,
        slots: this.state.generatedSlots.slots,
      },
      areSlotsDisabled: this.state.generatedSlots.disableSlots,
    }

    return (
      <section>
        <h1>{ translate('views.places.createNewTitle') }</h1>

        <Link className="button" to="/places">
          { translate('common.backToOverview') }
        </Link>

        <hr />

        <PlaceForm
          errorMessage={this.props.errorMessage}
          initialValues={initialValues}
          isLoading={this.props.isLoading}
          onDisableSlotsChange={this.onDisableSlotsChange}
          onSubmit={this.onSubmit}
        />
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onDisableSlotsChange = this.onDisableSlotsChange.bind(this)
  }
}

function mapStateToProps(state) {
  const { errorMessage, nextRandomId } = state.resources
  const { isLoading } = cachedResource('places', nextRandomId, true)

  return {
    errorMessage,
    isLoading,
    nextRandomId,
  }
}

export default connect(
  mapStateToProps, {
    createResource,
  }
)(withConfig(PlacesNew))

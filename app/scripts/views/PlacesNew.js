import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { PlaceForm } from '../forms'
import { cachedResource } from '../services/resources'
import { createResource } from '../actions/resources'
import { findGPSCoordinates } from '../services/gps'
import { getDisabledSlotIndexes, generateNewSlotItems } from '../../../common/utils/slots'
import { translate } from '../../../common/services/i18n'
import { withConfig } from '../containers'

const DEFAULT_MODE = 'address'
const DEFAULT_SLOT_SIZE = 60 // in minutes

class PlacesNew extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    createResource: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    nextRandomId: PropTypes.string.isRequired,
  }

  onSubmit(values) {
    const { accessibilityInfo, capacity, title, description, isPublic, images } = values
    const { slotSize, slots } = values.slots
    const disabledSlots = slots ? getDisabledSlotIndexes(slots) : []

    const flash = {
      text: translate('flash.createPlaceSuccess'),
    }

    const preparePlaceValues = new Promise(resolve => {
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

      if (values.location.mode === 'address') {
        // Try to fetch the GPS coordinates of this address
        const address = `${values.location.street}, ${values.location.cityCode}, ${values.location.city}`

        findGPSCoordinates(address)
          .then(({ latitude, longitude }) => {
            resolve(Object.assign({}, requestParams, {
              latitude,
              longitude,
            }))
          })
      } else {
        resolve(requestParams)
      }
    })

    preparePlaceValues
      .then(requestParams => {
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
          onSubmit={this.onSubmit}
        />
      </section>
    )
  }

  // @TODO: Update to modern React API
  /* eslint-disable-next-line camelcase */
  UNSAFE_componentWillMount() {
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

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
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

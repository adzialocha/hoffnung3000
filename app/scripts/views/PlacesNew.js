import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { cachedResource } from '../services/resources'
import { createResource } from '../actions/resources'
import { PlaceForm } from '../forms'
import { getDisabledSlotIndexes } from '../utils/slots'
import { translate } from '../services/i18n'

class PlacesNew extends Component {
  static propTypes = {
    createResource: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    nextRandomId: PropTypes.string.isRequired,
  }

  onSubmit(values) {
    const { title, description, isPublic, images } = values
    const { slotSize, slots } = values.slots
    const disabledSlots = slots ? getDisabledSlotIndexes(slots) : []

    const flash = {
      text: translate('flash.createPlaceSuccess'),
    }

    const requestParams = {
      ...values.location,
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
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.places.createNewTitle') }</h1>
        <Link className="button" to="/places">
          { translate('common.backToOverview') }
        </Link>
        <hr />
        <PlaceForm
          errorMessage={this.props.errorMessage}
          initialValues={ {
            isPublic: true,
            slots: { slotSize: 60 },
          } }
          isLoading={this.props.isLoading}
          onSubmit={this.onSubmit}
        />
      </section>
    )
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
)(PlacesNew)

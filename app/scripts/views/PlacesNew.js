import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { cachedResource } from '../services/resources'
import { createResource } from '../actions/resources'
import { PlaceForm } from '../forms'
import { prepareSlotIds } from '../utils/slots'

class PlacesNew extends Component {
  static propTypes = {
    createResource: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    nextRandomId: PropTypes.string.isRequired,
  }

  onSubmit(values) {
    const { title, description, isPublic } = values
    const { slotSize, slots } = values.slots
    const disabledSlots = slots ? prepareSlotIds(slots) : []

    const flash = {
      text: 'You successfully created a new place',
    }

    const requestParams = {
      ...values.location,
      description,
      disabledSlots,
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
        <h1>Create a new place</h1>
        <Link className="button" to="/places">Back to overview</Link>
        <hr />
        <PlaceForm
          errorMessage={this.props.errorMessage}
          initialValues={ {
            isPublic: true,
            slots: { slotSize: '00:10' },
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
  const { isLoading } = cachedResource('places', nextRandomId)

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

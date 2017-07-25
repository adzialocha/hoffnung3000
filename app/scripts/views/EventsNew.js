import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import getIds from '../utils/getIds'
import { cachedResource } from '../services/resources'
import { createResource } from '../actions/resources'
import { EventForm } from '../forms'
import { StaticPage } from '../components'
import { translate } from '../services/i18n'

class EventsNew extends Component {
  static propTypes = {
    createResource: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    nextRandomId: PropTypes.string.isRequired,
  }

  onSubmit(values) {
    const flash = {
      text: translate('flash.createEventSuccess'),
    }

    const { title, description, isPublic, images } = values

    const requestParams = {
      description,
      images,
      isPublic,
      placeId: values.placeSlots.place.id,
      resources: getIds(values.resources),
      slots: values.placeSlots.selectedSlotsIndexes,
      title,
    }

    this.props.createResource(
      'events',
      this.props.nextRandomId,
      requestParams,
      flash,
      '/calendar'
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.events.createNewTitle') }</h1>
        <StaticPage hideTitle={true} slug="new-event" />
        <Link className="button" to="/calendar">
          { translate('common.backToOverview') }
        </Link>
        <hr />
        <EventForm
          errorMessage={this.props.errorMessage}
          initialValues={ { isPublic: true } }
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
  const { isLoading } = cachedResource('events', nextRandomId, true)

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
)(EventsNew)

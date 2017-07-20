import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { cachedResource } from '../services/resources'
import { createResource } from '../actions/resources'
import { EventForm } from '../forms'
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

    this.props.createResource(
      'events',
      this.props.nextRandomId,
      values,
      flash,
      '/calendar'
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.events.createNewTitle') }</h1>
        <Link className="button" to="/calendar">
          { translate('common.backToOverview') }
        </Link>
        <hr />
        <EventForm
          errorMessage={this.props.errorMessage}
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

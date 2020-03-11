import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import flash from '../actions/flash'
import getIds from '../utils/getIds'
import { cachedResource } from '../services/resources'
import { confirm } from '../services/dialog'
import { EventForm } from '../forms'
import {
  deleteResource,
  fetchResource,
  updateResource,
} from '../actions/resources'
import { translate } from '../../../common/services/i18n'

class EventsEdit extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
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
    this.props.fetchResource('events', this.props.resourceSlug)
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
    const updateFlash = {
      text: translate('flash.updateEventSuccess'),
    }

    const { tags, title, description, isPublic, images, additionalInfo  } = values
    let { ticketUrl, websiteUrl } = values

    if (websiteUrl === 'https://') {websiteUrl = undefined}
    if (ticketUrl === 'https://') {ticketUrl = undefined}

    const requestParams = {
      description,
      images,
      isPublic,
      placeId: values.placeSlots.place.id,
      resources: getIds(values.resources),
      slots: values.placeSlots.selectedSlotsIndexes,
      additionalInfo,
      ticketUrl,
      tags,
      title,
      websiteUrl,
    }

    this.props.updateResource(
      'events',
      this.props.resourceSlug,
      requestParams,
      updateFlash,
      '/calendar'
    )
  }

  onDeleteClick() {
    if (!confirm(translate('common.areYouSure'))) {
      return
    }

    const deleteFlash = {
      text: translate('flash.deleteEventSuccess'),
    }

    this.props.deleteResource(
      'events',
      this.props.resourceSlug,
      deleteFlash,
      '/calendar'
    )
  }

  renderForm() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>
    }

    const {
      additionalInfo,
      description,
      id,
      images,
      isPublic,
      place,
      resources,
      slots,
      tags,
      title,
    } = this.props.resourceData

    let {
      ticketUrl,
      websiteUrl,
    } = this.props.resourceData

    if (websiteUrl === '') {websiteUrl = 'https://'}
    if (ticketUrl === '') {ticketUrl = 'https://'}

    const selectedSlotsIndexes = slots.map(slot => slot.slotIndex)
    selectedSlotsIndexes.sort((slotA, slotB) => slotA - slotB)

    const initialValues = {
      description,
      images,
      isPublic,
      resources,
      placeSlots: {
        place,
        selectedSlotsIndexes,
      },
      additionalInfo,
      ticketUrl,
      tags,
      title,
      websiteUrl,
    }

    return (
      <EventForm
        errorMessage={this.props.errorMessage}
        eventId={id}
        initialValues={initialValues}
        isSlotSizeVisible={false}
        onSubmit={this.onSubmit}
      />
    )
  }

  renderTitle() {
    if (this.props.isLoading) {
      return <h1>{ translate('views.events.titlePlaceholder') }</h1>
    }

    return <h1>{ this.props.resourceData.title }</h1>
  }

  render() {
    return (
      <section>
        { this.renderTitle() }

        <Link className="button" to="/calendar">
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
  const resource = cachedResource('events', resourceSlug)
  const { isLoading, object: resourceData } = resource
  const config = state.meta.config

  return {
    config,
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
)(EventsEdit)

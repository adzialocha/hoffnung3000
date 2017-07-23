import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { cachedResource } from '../services/resources'
import { fetchResource } from '../actions/resources'
import { formatEventTime } from '../utils/dateFormat'
import { translate } from '../services/i18n'

class EventsShow extends Component {
  static propTypes = {
    fetchResource: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    resourceSlug: PropTypes.string.isRequired,
    resourceData: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.fetchResource('events', this.props.resourceSlug)
  }

  renderActionButton() {
    if (!this.props.resourceData.isOwnerMe) {
      return null
    }

    return (
      <Link
        className="button button--green"
        to={`/events/${this.props.resourceSlug}/edit`}
      >
        { translate('common.editButton') }
      </Link>
    )
  }

  renderPrivacy() {
    if (this.props.resourceData.isPublic) {
      return null
    }
    return (
      <div className="bullet bullet--centered ellipsis">
        { translate('views.events.isPrivateEvent') }
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
    const { name } = this.props.resourceData.animal

    return (
      <p>
        { translate('common.by') }
        &nbsp;
        { name }
      </p>
    )
  }

  renderPlace() {
    return (
      <Link to={`/places/${this.props.resourceData.place.slug}`}>
        @ { this.props.resourceData.place.title }
      </Link>
    )
  }

  renderContent() {
    if (this.props.isLoading) {
      return <p>{ translate('common.loading') }</p>
    }

    return (
      <div>
        { this.renderOwner() }
        { this.renderPrivacy() }
        { this.renderEventTime() }
        <h4>
          { this.renderPlace() }
        </h4>
        { this.renderDescription() }
        <hr />
      </div>
    )
  }

  renderAddress() {
    const {
      city,
      cityCode,
      latitude,
      longitude,
      mode,
      street,
    } = this.props.resourceData.place

    if (mode === 'gps') {
      return `@ ${latitude}, ${longitude}`
    } else if (mode === 'address') {
      return `@ ${street}, ${cityCode} ${city}`
    }
    return translate('components.placeListItem.virtualLocation')
  }

  renderEventTime() {
    const slots = this.props.resourceData.slots

    if (slots.length === 0) {
      return null
    }

    const firstSlot = slots[0]
    const lastSlot = slots[slots.length - 1]

    return <h4>{ formatEventTime(firstSlot.from, lastSlot.to) }</h4>
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
  const resource = cachedResource('events', resourceSlug)
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
)(EventsShow)

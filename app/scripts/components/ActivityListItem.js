import dateFns from 'date-fns'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { AnimalLink } from './'
import { translate } from '../../../common/services/i18n'

class ActivityListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  renderAnimal() {
    if (!this.props.item.animal) {
      return (
        <span className="activity-list-item__part">
          { translate('components.activityListItem.someone') }
        </span>
      )
    }

    return (
      <span className="activity-list-item__part">
        <AnimalLink animal={this.props.item.animal} isWithoutBy={true} />
      </span>
    )
  }

  renderActivity() {
    const { type, objectType, event, object } = this.props.item

    let localeKey = `components.activityListItem.activity.${type}.${objectType}`
    if (type === 'RECEIVED_MESSAGE') {
      localeKey = `components.activityListItem.activity.${type}`
    } else if (type === 'RECEIVED_REQUEST' && !event) {
      localeKey = `components.activityListItem.activity.${type}.${objectType}Deleted`
    }

    return (
      <span className="activity-list-item__part">
        {
          translate(
            localeKey, {
              eventTitle: event ? event.title : '',
              objectTitle: object ? object.title : this.props.item.objectTitle,
            }
          )
        }
      </span>
    )
  }

  renderDateAndTime() {
    return (
      <span
        className="activity-list-item__part activity-list-item__part--emphasized"
      >
        { dateFns.format(this.props.item.createdAt, 'DD.MM.YY HH:mm') }
      </span>
    )
  }

  renderLink() {
    const { objectType, type } = this.props.item

    if (type === 'RECEIVED_MESSAGE') {
      return (
        <Link to="/inbox">
          { translate('components.activityListItem.link.message') }
        </Link>
      )
    }

    if (this.props.item.event) {
      return (
        <Link to={`/events/${this.props.item.event.slug}`}>
          { translate('components.activityListItem.link.event') }
        </Link>
      )
    }

    if (!this.props.item.object) {
      return null
    }

    if (!this.props.item.objectType === 'resource') {
      return (
        <Link to="/resources">
          { translate(`components.activityListItem.link.${objectType}`) }
        </Link>
      )
    }

    const { slug } = this.props.item.object

    return (
      <Link to={`/${objectType}s/${slug}`}>
        { translate(`components.activityListItem.link.${objectType}`) }
      </Link>
    )
  }

  render() {
    return (
      <p className="activity-list-item">
        { this.renderDateAndTime() }
        { this.renderAnimal() }
        { this.renderActivity() }
        <span className="activity-list-item__part">
          { this.renderLink() }
        </span>
      </p>
    )
  }
}

export default ActivityListItem

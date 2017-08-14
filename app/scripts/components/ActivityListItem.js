import moment from 'moment-timezone'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { AnimalLink } from './'
import { translate } from '../../../common/services/i18n'

const INBOX_ACTIVITY_TYPES = [
  'CREATE_RANDOM_MEETING',
  'JOIN_RANDOM_MEETING',
  'JOIN_RANDOM_MEETING_ME',
  'RECEIVED_MESSAGE',
]

const NO_ANIMAL_TYPES = [
  'CREATE_RANDOM_MEETING',
  'JOIN_RANDOM_MEETING_ME',
]

class ActivityListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  renderAnimal() {
    if (NO_ANIMAL_TYPES.includes(this.props.item.type)) {
      return null
    }

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
    if (INBOX_ACTIVITY_TYPES.includes(type)) {
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
        { moment(this.props.item.createdAt).format('DD.MM.YY HH:mm') }
      </span>
    )
  }

  renderLink() {
    const { objectType, type } = this.props.item

    if (INBOX_ACTIVITY_TYPES.includes(type)) {
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

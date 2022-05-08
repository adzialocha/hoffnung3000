import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asSimpleEventListItem } from '../containers'
import { formatSimpleEventTime } from '../../../common/utils/dateFormat'

class SimpleEventListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  renderPlaceName() {
    return (
      <div className="simple-list-item-content__description ellipsis">
        { this.props.item.place.title }
      </div>
    )
  }

  renderEventTime() {
    const eventTime = formatSimpleEventTime(this.props.item.from, this.props.item.to)
    return <div><b>{eventTime}</b></div>
  }

  render() {
    return (
      <div className="simple-list-item-content">
        <div className="simple-list-item-content__title ellipsis">
          { this.props.item.title }
        </div>
        <div className="simple-list-item-content__subtitle ellipsis">
          { this.renderEventTime() }
        </div>
        { this.renderPlaceName() }
      </div>
    )
  }
}

export default asSimpleEventListItem(SimpleEventListItem)

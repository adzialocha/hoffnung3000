import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asInfiniteListItem } from '../containers'
import { formatEventTime } from '../utils/dateFormat'

class CuratedEventListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  renderEventTime() {
    const slots = this.props.item.slots
    const firstSlot = slots[0]
    const lastSlot = slots[slots.length - 1]

    return formatEventTime(firstSlot.from, lastSlot.to)
  }

  render() {
    return (
      <div className="list-item-content">
        <div className="list-item-content__title ellipsis">
          { this.props.item.title }
        </div>
        <div className="list-item-content__subtitle ellipsis">
          { this.renderEventTime() }
        </div>
        <div className="list-item-content__description ellipsis">
          { this.props.item.place.title }
        </div>
      </div>
    )
  }
}

export default asInfiniteListItem(CuratedEventListItem)

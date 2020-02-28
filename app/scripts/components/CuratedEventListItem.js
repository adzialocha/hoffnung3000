import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asInfiniteListItem, withAuthState } from '../containers'
import { formatEventTime } from '../../../common/utils/dateFormat'
import { translate } from '../../../common/services/i18n'

class CuratedEventListItem extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
  }

  renderPlaceName() {
    if ((!this.props.isAuthenticated || !this.props.isActive) && this.props.config.festivalTicketPrice !== 0 ) {
      return (
        <div className="list-item-content__description ellipsis">
          { translate('components.curatedEventListItem.getATicket') }
        </div>
      )
    }

    return (
      <div className="list-item-content__description ellipsis">
        { this.props.item.place.title }
      </div>
    )
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
        { this.renderPlaceName() }
      </div>
    )
  }
}

export default asInfiniteListItem(withAuthState(CuratedEventListItem))

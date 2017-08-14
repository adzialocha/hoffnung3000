import moment from 'moment-timezone'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asInfiniteListItem } from '../containers'

class ConversationListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  renderDate() {
    const dateStr = moment(this.props.item.lastMessage.createdAt).format(
      'DD.MM.YY HH:mm'
    )

    return (
      <div className="list-item-content__subtitle ellipsis">
        { dateStr }
      </div>
    )
  }

  render() {
    return (
      <div className="list-item-content">
        <div className="list-item-content__title ellipsis">
          { this.props.item.title }
          { !this.props.item.isRead ? ' *' : null }
        </div>
        { this.renderDate() }
        <div className="list-item-content__description">
          { this.props.item.lastMessage.text.substring(0, 100) + '...' }
        </div>
      </div>
    )
  }
}

export default asInfiniteListItem(ConversationListItem)

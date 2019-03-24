import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { DateTime } from 'luxon'

import { asInfiniteListItem } from '../containers'

const PREVIEW_TEXT_LENGTH = 75

class ConversationListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  renderDate() {
    const dateStr = DateTime
      .fromISO(this.props.item.lastMessage.createdAt)
      .toFormat('dd.MM.yy HH:mm')

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

        <div className="markdown">
          <p>{ this.previewText() }</p>
        </div>
      </div>
    )
  }

  previewText() {
    const text = this.props.item.lastMessage.text

    if (text.length < PREVIEW_TEXT_LENGTH) {
      return text
    }

    return `${text.substring(0, PREVIEW_TEXT_LENGTH)}...`
  }
}

export default asInfiniteListItem(ConversationListItem)

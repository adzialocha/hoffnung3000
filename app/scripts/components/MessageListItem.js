import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { DateTime } from 'luxon'

import { AnimalLink } from './'
import { asInfiniteListItem } from '../containers'

class MessageListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  renderDateAndSender() {
    const dateStr = DateTime
      .fromISO(this.props.item.createdAt)
      .toFormat('dd.MM.yy HH:mm')

    return (
      <div className="list-item-content__title ellipsis">
        { dateStr }
        &nbsp;
        <AnimalLink animal={this.props.item.animal} />
        { this.props.item.isWrittenByMe ? ' (me)' : null }
        { !this.props.item.isRead ? ' *' : null }
      </div>
    )
  }

  render() {
    return (
      <div className="list-item-content">
        { this.renderDateAndSender() }

        <div
          className="markdown"
          dangerouslySetInnerHTML={ { __html: this.props.item.textHtml } }
        />
      </div>
    )
  }
}

export default asInfiniteListItem(MessageListItem)

import dateFns from 'date-fns'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { AnimalLink } from './'
import { asInfiniteListItem } from '../containers'

class MessageListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  renderDateAndSender() {
    const dateStr = dateFns.format(
      this.props.item.createdAt,
      'DD.MM.YY HH:mm'
    )

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
        <div className="list-item-content__description">
          { this.props.item.text }
        </div>
      </div>
    )
  }
}

export default asInfiniteListItem(MessageListItem)

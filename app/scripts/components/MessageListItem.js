import dateFns from 'date-fns'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { AnimalLink } from './'
import { asInfiniteListItem } from '../containers'
import { translate } from '../services/i18n'

class MessageListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  renderDate() {
    const dateStr = dateFns.format(
      this.props.item.createdAt,
      'DD.MM.YY HH:mm'
    )

    return (
      <p>
        <strong>{ translate('components.messageListItem.date') }</strong>
        { dateStr }
      </p>
    )
  }

  render() {
    return (
      <div className="list-item-content">
        <div className="list-item-content__title ellipsis">
          { this.renderDate() }
          <AnimalLink animal={this.props.item.animal} />
        </div>
        <em>{ this.props.item.text }</em>
      </div>
    )
  }
}

export default asInfiniteListItem(MessageListItem)

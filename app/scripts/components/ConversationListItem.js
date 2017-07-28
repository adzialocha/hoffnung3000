import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asInfiniteListItem } from '../containers'

class ConversationListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="list-item-content">
        <div className="list-item-content__title ellipsis">
          { this.props.item.title }
        </div>
      </div>
    )
  }
}

export default asInfiniteListItem(ConversationListItem)

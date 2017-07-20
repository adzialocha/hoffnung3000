import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asInfiniteListItem } from '../containers'
import { translate } from '../services/i18n'

class CuratedEventListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  renderOwner() {
    return translate('common.ownedBy', {
      name: this.props.item.animalName,
    })
  }

  render() {
    return (
      <div className="list-item-content">
        <div className="list-item__title ellipsis">
          { this.props.item.title }
        </div>
        <div className="list-item__subtitle ellipsis">
          { this.renderOwner() }
        </div>
        <div className="list-item__description ellipsis">
          { this.props.item.description }
        </div>
      </div>
    )
  }
}

export default asInfiniteListItem(CuratedEventListItem)

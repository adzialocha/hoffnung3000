import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asInfiniteListItem } from '../containers'
import { translate } from '../services/i18n'

class CuratedSelectableListItem extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
  }

  renderOwner() {
    return translate('common.ownedBy', {
      name: this.props.item.animalName,
    })
  }

  renderSelectedState() {
    const { isSelected, isRemovable, isAvailable } = this.props.input

    if (isRemovable && isSelected(this.props.item)) {
      return <button>Remove</button>
    }

    if (isSelected(this.props.item)) {
      return <button disabled={true}>Selected</button>
    } else if (!isAvailable(this.props.item)) {
      return <button disabled={true}>Not available</button>
    }

    return <button>Add</button>
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
          { this.renderSelectedState() }
        </div>
      </div>
    )
  }
}

export default asInfiniteListItem(CuratedSelectableListItem)

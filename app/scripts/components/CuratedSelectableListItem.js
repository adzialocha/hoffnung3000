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
      name: this.props.item.animal.name,
    })
  }

  renderSelectedState() {
    const { isSelected, isRemovable, isAvailable } = this.props.input

    if (isRemovable && isSelected(this.props.item)) {
      return (
        <button className="button button--red">
          { translate('components.curatedSelectableListItem.removeItem') }
        </button>
      )
    }

    if (isSelected(this.props.item)) {
      return (
        <button className="button" disabled={true}>
          { translate('components.curatedSelectableListItem.isSelected') }
        </button>
      )
    } else if (!isAvailable(this.props.item)) {
      return (
        <button className="button" disabled={true}>
          { translate('components.curatedSelectableListItem.isNotAvailable') }
        </button>
      )
    }

    return (
        <button className="button button--green">
          { translate('components.curatedSelectableListItem.addItem') }
        </button>
      )
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

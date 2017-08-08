import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { AnimalLink } from './'
import { asInfiniteListItem } from '../containers'
import { translate } from '../../../common/services/i18n'

class CuratedSelectableListItem extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
  }

  renderSelectedState() {
    const isAvailable = this.props.input.isAvailable(this.props.item)
    const isSelected = this.props.input.isSelected(this.props.item)
    const { isRemovable } = this.props.input

    if (isRemovable && isSelected && !isAvailable) {
      return (
        <button className="list-item-content__button button button--red">
          { translate('components.curatedSelectableListItem.isNotAvailable') }
        </button>
      )
    }

    if (isRemovable && isSelected) {
      return (
        <button className="list-item-content__button button button--red">
          { translate('components.curatedSelectableListItem.removeItem') }
        </button>
      )
    }

    if (isSelected) {
      return (
        <button className="list-item-content__button button" disabled={true}>
          { translate('components.curatedSelectableListItem.isSelected') }
        </button>
      )
    } else if (!isAvailable) {
      return (
        <button className="list-item-content__button button" disabled={true}>
          { translate('components.curatedSelectableListItem.isNotAvailable') }
        </button>
      )
    }

    return (
      <button className="list-item-content__button button button--green">
        { translate('components.curatedSelectableListItem.addItem') }
      </button>
    )
  }

  render() {
    return (
      <div className="list-item-content">
        <div className="list-item-content__title ellipsis">
          { this.props.item.title }
        </div>
        <div className="list-item-content__subtitle ellipsis">
          <AnimalLink animal={this.props.item.animal} />
        </div>
        <div className="list-item-content__description ellipsis">
          { this.props.item.description }
        </div>
        { this.renderSelectedState() }
      </div>
    )
  }
}

export default asInfiniteListItem(CuratedSelectableListItem)

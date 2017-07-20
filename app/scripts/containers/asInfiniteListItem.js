import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { translate } from '../services/i18n'

export default function asInfiniteListItem(WrappedListItemComponent) {
  return class InfiniteListItemContainer extends Component {
    static propTypes = {
      item: PropTypes.object.isRequired,
      onClick: PropTypes.func,
      onEditClick: PropTypes.func,
    }

    static defaultProps = {
      onClick: undefined,
      onEditClick: undefined,
    }

    onClick() {
      if (!this.props.onClick) {
        return
      }

      this.props.onClick(this.props.item)
    }

    onEditClick(event) {
      event.stopPropagation()

      this.props.onEditClick(this.props.item)
    }

    renderEditButton() {
      if (!this.props.item.isOwnerMe || !this.props.onEditClick) {
        return null
      }

      return (
        <button
          className="list-item__cover-image-button button button--green"
          onClick={this.onEditClick}
        >
          { translate('common.editButton') }
        </button>
      )
    }

    render() {
      const listClasses = classnames(
        'list-item', {
          'list-item--clickable': (this.props.onClick !== undefined),
        }
      )

      return (
        <div className={listClasses} onClick={this.onClick}>
          <div className="list-item__cover-image">
            { this.renderEditButton() }
          </div>
          <WrappedListItemComponent item={this.props.item} />
        </div>
      )
    }

    constructor(props) {
      super(props)

      this.onClick = this.onClick.bind(this)
      this.onEditClick = this.onEditClick.bind(this)
    }
  }
}

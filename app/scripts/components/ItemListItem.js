import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { translate } from '../services/i18n'

class ItemListItem extends Component {
  static propTypes = {
    animalName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isOwnerMe: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  renderActionButton() {
    if (!this.props.isOwnerMe) {
      return null
    }

    return (
      <Link
        className="list-item__cover-image-button button button--green"
        to={`/items/${this.props.slug}/edit`}
      >
        { translate('components.placeListItem.editButton') }
      </Link>
    )
  }

  renderOwner() {
    return translate('components.placeListItem.owner', {
      name: this.props.animalName,
    })
  }

  render() {
    return (
      <div className="list-item" onClick={this.onClick}>
        <div className="list-item__cover-image">
          { this.renderActionButton() }
        </div>
        <div className="list-item__content">
          <div className="list-item__title ellipsis">
            { this.props.title }
          </div>
          <div className="list-item__subtitle ellipsis">
            { this.renderOwner() }
          </div>
          <div className="list-item__description ellipsis">
            { this.props.description }
          </div>
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)
  }
}

export default ItemListItem

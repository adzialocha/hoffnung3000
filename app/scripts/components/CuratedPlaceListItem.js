import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asInfiniteListItem } from '../containers'
import { translate } from '../services/i18n'

class PlaceListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  renderPrivacy() {
    if (this.props.item.isPublic) {
      return null
    }

    return (
      <div className="bullet ellipsis">
        { translate('components.placeListItem.isPrivatePlace') }
      </div>
    )
  }

  renderAddress() {
    const {
      city,
      cityCode,
      latitude,
      longitude,
      mode,
      street,
    } = this.props.item

    if (mode === 'gps') {
      return `@ ${latitude}, ${longitude}`
    } else if (mode === 'address') {
      return `@ ${street}, ${cityCode} ${city}`
    }
    return translate('components.placeListItem.virtualLocation')
  }

  renderOwner() {
    return translate('common.ownedBy', {
      name: this.props.item.animalName,
    })
  }

  render() {
    return (
      <div className="list-item__content">
        <div className="list-item__title ellipsis">
          { this.props.item.title }
        </div>
        <div className="list-item__subtitle ellipsis">
          { this.renderOwner() }
        </div>
        <div className="list-item__description ellipsis">
          { this.renderAddress() }
        </div>
        { this.renderPrivacy() }
      </div>
    )
  }
}

export default asInfiniteListItem(PlaceListItem)

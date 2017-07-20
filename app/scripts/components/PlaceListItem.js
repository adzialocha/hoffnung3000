import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { translate } from '../services/i18n'

class PlaceListItem extends Component {
  static propTypes = {
    animalName: PropTypes.string.isRequired,
    city: PropTypes.string,
    cityCode: PropTypes.string,
    isOwnerMe: PropTypes.bool.isRequired,
    isPublic: PropTypes.bool.isRequired,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    mode: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
    slug: PropTypes.string.isRequired,
    street: PropTypes.string,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    city: undefined,
    cityCode: undefined,
    latitude: undefined,
    longitude: undefined,
    street: undefined,
  }

  onClick() {
    this.props.push(`/places/${this.props.slug}`)
  }

  onEditClick(event) {
    event.stopPropagation()
    this.props.push(`/places/${this.props.slug}/edit`)
  }

  renderActionButton() {
    if (!this.props.isOwnerMe) {
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

  renderPrivacy() {
    if (this.props.isPublic) {
      return null
    }
    return (
      <div className="bullet ellipsis">
        { translate('components.placeListItem.isPrivatePlace') }
      </div>
    )
  }

  renderAddress() {
    if (this.props.mode === 'gps') {
      return `@ ${this.props.latitude}, ${this.props.longitude}`
    } else if (this.props.mode === 'address') {
      return `@ ${this.props.street}, ${this.props.cityCode} ${this.props.city}`
    }
    return translate('components.placeListItem.virtualLocation')
  }

  renderOwner() {
    return translate('common.ownedBy', {
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
            { this.renderAddress() }
          </div>
          { this.renderPrivacy() }
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
  }
}

export default connect(
  null, {
    push,
  }
)(PlaceListItem)

import Modal from 'react-modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asInfiniteList } from '../containers'
import { CuratedPlaceListItem } from './'
import { translate } from '../../../common/services/i18n'

const WrappedInfiniteList = asInfiniteList(CuratedPlaceListItem)

class FormPlaceSlotSelectorPlace extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  onPlaceClick(place) {
    this.setState({
      isModalOpen: false,
    })

    this.props.onChange(place)
  }

  onOpenClick(event) {
    event.preventDefault()

    this.setState({
      isModalOpen: true,
    })
  }

  onCloseClick() {
    this.setState({
      isModalOpen: false,
    })
  }

  renderPlacesList() {
    return (
      <WrappedInfiniteList
        isInModal={true}
        resourceName="places"
        onClick={this.onPlaceClick}
      />
    )
  }

  renderModalContent() {
    return (
      <div className="modal">
        <div className="modal__header">
          <h1>{ translate('components.placeSelector.title') }</h1>
        </div>
        { this.renderPlacesList() }
        <div className="modal__footer">
          <div className="button-group">
            <button
              className="button button--green"
              onClick={this.onCloseClick}
            >
              { translate('components.placeSelector.submitButton') }
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderModal() {
    return (
      <Modal
        contentLabel="FormPlaceSlotSelectorPlaceModal"
        isOpen={this.state.isModalOpen}
      >
        { this.renderModalContent() }
      </Modal>
    )
  }

  render() {
    return (
      <div className="button-group">
        { this.renderModal() }
        <button
          className="button button--green"
          disabled={this.props.disabled}
          onClick={this.onOpenClick}
        >
          { translate('components.placeSelector.openModalButton') }
        </button>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
    }

    this.onCloseClick = this.onCloseClick.bind(this)
    this.onOpenClick = this.onOpenClick.bind(this)
    this.onPlaceClick = this.onPlaceClick.bind(this)
  }
}

export default FormPlaceSlotSelectorPlace

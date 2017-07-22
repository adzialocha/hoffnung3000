import Modal from 'react-modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { SlotEditor } from './'
import { translate } from '../services/i18n'

class FormPlaceSlotSelectorSlot extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    selectedSlotsIndexes: PropTypes.array.isRequired,
    slots: PropTypes.array.isRequired,
  }

  onSlotSelectionChange(selectedSlotsIndexes) {
    this.props.onChange(selectedSlotsIndexes)
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

  renderModalContent() {
    return (
      <div className="modal">
        <div className="modal__header">
          <h1>{ translate('components.slotSelector.title') }</h1>
        </div>
        <div className="modal__content modal__content--scrollable">
          <SlotEditor
            isBookingMode={true}
            selectedSlotsIndexes={this.props.selectedSlotsIndexes}
            slots={this.props.slots}
            onSlotSelectionChange={this.onSlotSelectionChange}
            onSubmit={this.onCloseClick}
          />
        </div>
        <div className="modal__footer">
          <div className="button-group">
            <button
              className="button button--green"
              onClick={this.onCloseClick}
            >
              { translate('components.slotSelector.submitButton') }
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderModal() {
    return (
      <Modal
        contentLabel="FormPlaceSlotSelectorSlotModal"
        isOpen={this.state.isModalOpen}
      >
        { this.renderModalContent() }
      </Modal>
    )
  }

  renderButton() {
    return (
      <div className="button-group">
        <button
          className="button button--green"
          disabled={this.props.disabled}
          onClick={this.onOpenClick}
        >
          { translate('components.slotSelector.openModalButton') }
        </button>
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.renderModal() }
        { this.renderButton() }
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
    this.onSlotSelectionChange = this.onSlotSelectionChange.bind(this)
  }
}

export default FormPlaceSlotSelectorSlot

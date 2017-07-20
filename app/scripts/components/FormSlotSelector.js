import Modal from 'react-modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asFormField } from '../containers'
import { SlotEditor } from './'
import { translate } from '../services/i18n'

class FormSlotSelector extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
    slots: PropTypes.array,
  }

  static defaultProps = {
    slots: undefined,
  }

  componentDidUpdate() {
    this.props.input.onChange(this.state.place)
  }

  onSlotStatusChange(selectedSlots) {
    console.log(selectedSlots)
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
    if (!this.props.slots) {
      return null
    }

    return (
      <div className="modal">
        <div className="modal__header">
          <h1>{ translate('components.formSlotSelector.title') }</h1>
        </div>
        <div className="modal__content">
          <SlotEditor
            isBookingMode={true}
            slots={this.props.slots}
            onSlotStatusChange={this.onSlotStatusChange}
            onSubmit={this.onCloseClick}
          />
        </div>
        <div className="modal__footer">
          <div className="button-group">
            <button
              className="button button--green"
              onClick={this.onCloseClick}
            >
              { translate('components.formSlotSelector.submitButton') }
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderModal() {
    return (
      <Modal
        contentLabel="FormSlotSelectorModal"
        isOpen={this.state.isModalOpen}
      >
        { this.renderModalContent() }
      </Modal>
    )
  }

  renderSelectedSlots() {
    if (!this.props.slots) {
      return null
    }

    return null
  }

  render() {
    return (
      <div className="form__field-input">
        { this.renderModal() }
        { this.renderSelectedSlots() }
        <div className="button-group">
          <button
            className="button button--green"
            disabled={this.props.disabled || !this.props.slots}
            onClick={this.onOpenClick}
          >
            { translate('components.formSlotSelector.openModalButton') }
          </button>
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      selectedSlots: props.input.value,
    }

    this.onCloseClick = this.onCloseClick.bind(this)
    this.onOpenClick = this.onOpenClick.bind(this)
    this.onSlotStatusChange = this.onSlotStatusChange.bind(this)
  }
}

export default asFormField(FormSlotSelector)

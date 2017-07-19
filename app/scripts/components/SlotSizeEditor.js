import Modal from 'react-modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { generateNewSlotItems, checkSlotSize } from '../utils/slots'
import { SlotEditor } from './'
import { translate } from '../services/i18n'

const DEFAULT_SLOT_SIZE = '00:10'

class FormSlotSizeEditor extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.isModalOpen !== nextState.isModalOpen ||
      this.state.slots.length !== nextState.slots.length ||
      this.state.slotSize !== nextState.slotSize
    )
  }

  componentDidUpdate() {
    this.props.onChange({
      slots: this.state.slots,
      slotSize: this.state.slotSize,
    })
  }

  onBlur() {
    this.props.onBlur({
      slots: this.state.slots,
      slotSize: this.state.slotSize,
    })
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

  onSlotSizeChange(event) {
    this.setState({
      slots: generateNewSlotItems(event.target.value),
      slotSize: event.target.value,
    })
  }

  onSlotStatusChange(slots) {
    this.setState({
      slots,
    })
  }

  renderSlotSize() {
    return (
      <div className="form__field">
        <label className="form__field-label">
          { translate('components.slotSizeEditor.slotSizeLabel') }
        </label>
        <input
          className="form__field-input"
          disabled={this.props.disabled}
          type="text"
          value={this.state.slotSize}
          onBlur={this.onBlur}
          onChange={this.onSlotSizeChange}
        />

      </div>
    )
  }

  renderBlockSlots() {
    return (
      <div className="form__field">
        <label className="form__field-label">
          { translate('components.slotSizeEditor.editSlotsLabel') }
        </label>
        <div className="form__field-input">
          <Modal
            contentLabel="FormSlotSizeEditorModal"
            isOpen={this.state.isModalOpen}
          >
            <SlotEditor
              slots={this.state.slots}
              onSlotStatusChange={this.onSlotStatusChange}
              onSubmit={this.onCloseClick}
            />
          </Modal>
          <div className="button-group">
            <button
              className="button button--green"
              disabled={
                this.props.disabled ||
                !checkSlotSize(this.state.slotSize).isValid
              }
              onClick={this.onOpenClick}
            >
              { translate('components.slotSizeEditor.editSlotsButton') }
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="slot-size-editor">
        { this.renderSlotSize() }
        { this.renderBlockSlots() }
      </div>
    )
  }

  constructor(props) {
    super(props)

    const slotSize = props.value.slotSize || DEFAULT_SLOT_SIZE

    this.state = {
      isModalOpen: false,
      slots: props.value.slots || generateNewSlotItems(slotSize),
      slotSize,
    }

    this.onBlur = this.onBlur.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
    this.onOpenClick = this.onOpenClick.bind(this)
    this.onSlotSizeChange = this.onSlotSizeChange.bind(this)
    this.onSlotStatusChange = this.onSlotStatusChange.bind(this)
  }
}

export default FormSlotSizeEditor

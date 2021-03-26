import Modal from 'react-modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactSlider from 'react-slider'

import { asFormField, withConfig } from '../containers'
import {
  checkSlotSize,
  generateNewSlotItems,
  numberToSlotSizeStrHuman,
} from '../../../common/utils/slots'
import { SlotEditor } from './'
import { translate } from '../../../common/services/i18n'

const SLOT_SIZE_MAX = 1440 // in minutes
const SLOT_SIZE_MIN = 0
const SLOT_SIZE_STEP = 5

class FormSlotSizeEditor extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
    isSlotSizeVisible: PropTypes.bool.isRequired,
  }

  onSlotsChange(slots) {
    this.props.input.onChange(this.currentValue({ slots }))
  }

  onSlotSizeChange(slotSize) {
    this.props.input.onChange(this.currentValue({ slotSize }))
  }

  onFocus() {
    this.props.input.onFocus(this.currentValue())
  }

  onBlur() {
    this.props.input.onBlur(this.currentValue())
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

  renderSlotSize() {
    if (!this.props.isSlotSizeVisible) {
      return null
    }

    return (
      <div className="form__field">
        <label className="form__field-label">
          { translate('components.slotSizeEditor.slotSizeLabel') }
        </label>

        <div className="form__field-input">
          <ReactSlider
            className="react-slider"
            disabled={this.props.disabled}
            max={SLOT_SIZE_MAX}
            min={SLOT_SIZE_MIN}
            orientation="horizontal"
            step={SLOT_SIZE_STEP}
            thumbActiveClassName="react-slider__handle--active"
            thumbClassName="react-slider__handle"
            value={this.props.input.value.slotSize}
            onChange={this.onSlotSizeChange}
            onSliderClick={this.onFocus}
          />
          <p>{ numberToSlotSizeStrHuman(this.props.input.value.slotSize) }</p>
        </div>
      </div>
    )
  }

  renderModalContent() {
    return (
      <div className="modal">
        <div className="modal__header">
          <h1>{ translate('components.slotEditor.title') }</h1>
        </div>

        <div className="modal__content modal__content--scrollable">
          <SlotEditor
            slots={this.props.input.value.slots}
            onSlotDisabledChange={this.onSlotsChange}
          />
        </div>

        <div className="modal__footer">
          <div className="button-group">
            <button
              className="button button--green"
              onClick={this.onCloseClick}
            >
              { translate('components.slotEditor.submitButton') }
            </button>
          </div>
        </div>
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
            { this.renderModalContent() }
          </Modal>

          <div className="button-group">
            <button
              className="button button--green"
              disabled={
                this.props.disabled ||
                !checkSlotSize(this.props.input.value.slotSize).isValid
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

  currentValue(newValues = {}) {
    // Generate new slots when slotSize changed
    const { festivalDateStart, festivalDateEnd } = this.props.config

    const slots = newValues.slotSize ? generateNewSlotItems(
      newValues.slotSize, null, festivalDateStart, festivalDateEnd
    ) : this.props.input.value.slots

    const { slotSize } = this.props.input.value

    return Object.assign({}, { slotSize, slots }, {
      ...newValues,
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
    }

    this.onCloseClick = this.onCloseClick.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onOpenClick = this.onOpenClick.bind(this)
    this.onSlotSizeChange = this.onSlotSizeChange.bind(this)
    this.onSlotsChange = this.onSlotsChange.bind(this)
  }
}

export default withConfig(asFormField(FormSlotSizeEditor))

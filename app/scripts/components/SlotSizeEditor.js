import Modal from 'react-modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactSlider from 'react-slider'

import {
  checkSlotSize,
  generateNewSlotItems,
  numberToSlotSizeStrHuman,
} from '../utils/slots'
import { SlotEditor } from './'
import { translate } from '../services/i18n'

class FormSlotSizeEditor extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    isSlotSizeVisible: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
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

  onFocus() {
    this.props.onFocus({
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

  onChange(slotSize) {
    this.setState({
      slotSize,
    })
  }

  onAfterChange(slotSize) {
    this.setState({
      slots: generateNewSlotItems(slotSize),
      slotSize,
    })
  }

  onSlotStatusChange(slots) {
    this.setState({
      slots,
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
            handleActiveClassName="react-slider__handle--active"
            handleClassName="react-slider__handle"
            max={1440}
            min={0}
            orientation="horizontal"
            step={5}
            value={this.state.slotSize}
            onAfterChange={this.onAfterChange}
            onChange={this.onChange}
            onSliderClick={this.onFocus}
          />
          <p>{ numberToSlotSizeStrHuman(this.state.slotSize) }</p>
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
            slots={this.state.slots}
            onSlotStatusChange={this.onSlotStatusChange}
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

    const slotSize = props.value.slotSize

    this.state = {
      isModalOpen: false,
      slots: props.value.slots || generateNewSlotItems(slotSize),
      slotSize,
    }

    this.onChange = this.onChange.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onOpenClick = this.onOpenClick.bind(this)
    this.onAfterChange = this.onAfterChange.bind(this)
    this.onSlotStatusChange = this.onSlotStatusChange.bind(this)
  }
}

export default FormSlotSizeEditor

import dateFns from 'date-fns'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { SlotEditorItem } from './'
import { translate } from '../services/i18n'

class SlotEditor extends Component {
  static propTypes = {
    isBookingMode: PropTypes.bool,
    onSlotStatusChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    slots: PropTypes.array,
  }

  static defaultProps = {
    isBookingMode: false,
    slots: [],
  }

  componentDidUpdate() {
    this.props.onSlotStatusChange(this.state.slots)
  }

  onSubmit() {
    this.props.onSubmit()
  }

  onSlotStatusChange(slot) {
    this.state.slots[slot.id] = slot
    this.setState({
      slots: this.state.slots,
    })
  }

  renderSlotDateHeader(item, index) {
    return (
      <div
        className="slot-editor__day-header"
        key={`header-${index}`}
      >
        { dateFns.format(item.to, 'dd DD.MM.YY') }
      </div>
    )
  }

  renderSlotItem(item, index) {
    return (
      <SlotEditorItem
        isBookingMode={this.props.isBookingMode}
        key={`slot-${index}`}
        slot={item}
        onChange={this.onSlotStatusChange}
      />
    )
  }

  renderSlotItemList(item, previousItem, index) {
    if (!previousItem || !dateFns.isSameDay(item.from, previousItem.from)) {
      return [
        this.renderSlotDateHeader(item, index),
        this.renderSlotItem(item, index),
      ]
    }
    return this.renderSlotItem(item, index)
  }

  renderContent() {
    return this.state.slots.map((item, index) => {
      const previousItem = index > 0 ? this.state.slots[index - 1] : null
      return this.renderSlotItemList(item, previousItem, index)
    })
  }

  render() {
    return (
      <div className="slot-editor">
        <div className="slot-editor__header">
          <h1>{ translate('components.slotEditor.title') }</h1>
        </div>
        <div className="slot-editor__content">
          { this.renderContent() }
        </div>
        <div className="slot-editor__footer">
          <div className="button-group">
            <button
              className="button button--green"
              onClick={this.onSubmit}
            >
              { translate('components.slotEditor.submitButton') }
            </button>
          </div>
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      slots: props.slots,
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onSlotStatusChange = this.onSlotStatusChange.bind(this)
  }
}

export default SlotEditor

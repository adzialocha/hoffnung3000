import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { DateTime } from 'luxon'

import { alert } from '../services/dialog'
import { SlotEditorItem } from './'
import { translate } from '../../../common/services/i18n'

function addOrRemoveFromArray(arr, slotIndex, status) {
  if (status) {
    return arr.concat([slotIndex])
  }
  return arr.filter(value => slotIndex !== value)
}

function isInClosedOrder(arr) {
  if (arr.length < 2) {
    return true
  }

  arr.sort((valA, valB) => valA - valB)

  return !arr.some((currentItem, index) => {
    const nextItem = arr[index + 1]
    return nextItem && nextItem !== currentItem + 1
  })
}

class SlotEditor extends Component {
  static propTypes = {
    isBookingMode: PropTypes.bool,
    onSlotDisabledChange: PropTypes.func,
    onSlotSelectionChange: PropTypes.func,
    selectedSlotsIndexes: PropTypes.array,
    slots: PropTypes.array,
  }

  static defaultProps = {
    isBookingMode: false,
    onSlotDisabledChange: undefined,
    onSlotSelectionChange: undefined,
    selectedSlotsIndexes: [],
    slots: [],
  }

  onToggleAll() {
    const slots = this.state.slots.reduce((acc, item) => {
      if (!item.eventId) {
        item.isDisabled = !item.isDisabled
      }
      acc.push(item)
      return acc
    }, [])

    this.setState({
      slots,
    })

    this.props.onSlotDisabledChange(this.state.slots)
  }

  onSlotDisabledChange(slot, status) {
    const slots = this.state.slots.reduce((acc, item) => {
      if (item.slotIndex === slot.slotIndex) {
        item.isDisabled = status
      }
      acc.push(item)
      return acc
    }, [])

    this.setState({
      slots,
    })

    this.props.onSlotDisabledChange(this.state.slots)
  }

  onSlotBookedChange(slot, status) {
    const selectedSlotsIndexes = addOrRemoveFromArray(
      this.state.selectedSlotsIndexes, slot.slotIndex, status
    )

    if (!isInClosedOrder(selectedSlotsIndexes)) {
      alert(
        translate('components.slotEditor.slotsHaveToBeInClosedOrder')
      )
      return
    }

    this.setState({
      selectedSlotsIndexes,
    })

    this.props.onSlotSelectionChange(selectedSlotsIndexes)
  }

  renderSlotDateHeader(item, index) {
    const date = DateTime
      .fromISO(item.from)
      .toFormat('ccc dd.MM.yy')

    return (
      <div
        className="slot-editor__day-header"
        key={`header-${index}`}
      >
        { date }
      </div>
    )
  }

  renderSlotItem(item, index) {
    return (
      <SlotEditorItem
        isBookingMode={this.props.isBookingMode}
        isSlotBookedByMe={
          this.state.selectedSlotsIndexes.indexOf(item.slotIndex) > -1
        }
        key={`slot-${index}`}
        slot={item}
        onChangeBookedByMeStatus={this.onSlotBookedChange}
        onChangeDisabledStatus={this.onSlotDisabledChange}
      />
    )
  }

  renderSlotItemList(item, previousItem, index) {
    if (!previousItem ||
      !DateTime
        .fromISO(item.from, { zone: 'utc' })
        .hasSame(DateTime.fromISO(previousItem.from, { zone: 'utc' }), 'day')
    ) {
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
        <button onClick={this.onToggleAll}>Toggle ALL</button>
        { this.renderContent() }
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedSlotsIndexes: props.selectedSlotsIndexes,
      slots: props.slots,
    }

    this.onSlotBookedChange = this.onSlotBookedChange.bind(this)
    this.onSlotDisabledChange = this.onSlotDisabledChange.bind(this)
    this.onToggleAll = this.onToggleAll.bind(this)
  }
}

export default SlotEditor

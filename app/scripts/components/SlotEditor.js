import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { DateTime } from 'luxon'

import { DatePicker } from './'
import { SlotEditorItem } from './'
import { alert, confirm } from '../services/dialog'
import { translate } from '../../../common/services/i18n'
import { withConfig } from '../containers'

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
    config: PropTypes.object.isRequired,
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

  onDateSelected(selectedDate) {
    let date
    if (selectedDate) {
      date = selectedDate
    } else {
      if (this.state.selectedSlotsIndexes.length > 0) {
        date = this.props.slots[this.state.selectedSlotsIndexes[0]].from
      } else {
        date = this.props.config.festivalDateStart
      }
    }

    const from = DateTime.fromISO(date, { zone: 'utc' }).toISO()
    const to = DateTime.fromISO(from, { zone: 'utc' }).plus({ day: 1 }).toISO()
    this.setState({ from, to })
  }

  // Toggle `isDisabled` state of all slots of that selected day
  onToggleAll() {
    const indexes = this.currentSlots().map(slot => {
      return slot.slotIndex
    })

    const slots = this.state.slots.reduce((acc, slot) => {
      if (!slot.eventId && indexes.includes(slot.slotIndex)) {
        slot.isDisabled = !slot.isDisabled
      }
      acc.push(slot)
      return acc
    }, [])

    this.setState({
      slots,
    })

    this.props.onSlotDisabledChange(slots)
  }

  // Copy current day selection to all other days
  onCopyAll() {
    if (!confirm(translate('common.areYouSure'))) {
      return
    }

    const pattern = this.currentSlots().map(slot => {
      return slot.isDisabled
    })

    const slots = this.state.slots.reduce((acc, slot, index) => {
      if (!slot.eventId) {
        slot.isDisabled = pattern[index % pattern.length]
      }
      acc.push(slot)
      return acc
    }, [])

    this.setState({
      slots,
    })

    this.props.onSlotDisabledChange(slots)
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

    this.props.onSlotDisabledChange(slots)
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

  renderSlotDateHeader(slot, index) {
    const date = DateTime
      .fromISO(slot.from)
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

  renderSlotItem(slot, index) {
    return (
      <SlotEditorItem
        isBookingMode={this.props.isBookingMode}
        isSlotBookedByMe={
          this.state.selectedSlotsIndexes.indexOf(slot.slotIndex) > -1
        }
        key={`slot-${index}`}
        slot={slot}
        onChangeBookedByMeStatus={this.onSlotBookedChange}
        onChangeDisabledStatus={this.onSlotDisabledChange}
      />
    )
  }

  renderSlotItemList(slot, previousSlot, index) {
    if (!previousSlot ||
      !DateTime
        .fromISO(slot.from, { zone: 'utc' })
        .hasSame(DateTime.fromISO(previousSlot.from, { zone: 'utc' }), 'day')
    ) {
      return [
        this.renderSlotDateHeader(slot, index),
        this.renderSlotItem(slot, index),
      ]
    }

    return this.renderSlotItem(slot, index)
  }

  renderDatePicker() {
    return <DatePicker value={this.state.from} onChange={this.onDateSelected} />
  }

  renderContent() {
    const slots = this.currentSlots()

    return slots.map((slot, index) => {
      const previousSlot = index > 0 ? slots[index - 1] : null
      return this.renderSlotItemList(slot, previousSlot, index)
    })
  }

  render() {
    return (
      <div className="slot-editor">
        {!this.props.isBookingMode && (
          <Fragment>
            <button onClick={this.onToggleAll}>
              {translate('components.slotEditor.toggleAllButton')}
            </button>

            <button onClick={this.onCopyAll}>
              {translate('components.slotEditor.copyAllButton')}
            </button>
          </Fragment>
        )}

        { this.renderDatePicker() }
        { this.renderContent() }
      </div>
    )
  }

  // Returns a list of all slots of that currently selected day
  currentSlots() {
    return this.state.slots
      .filter(slot => {
        return this.state.from < slot.to && this.state.to > slot.from
      })
  }

  constructor(props) {
    super(props)

    const from = DateTime.fromISO(props.config.festivalDateStart, { zone: 'utc' })
    const to = DateTime.fromISO(from, { zone: 'utc' }).plus({ day: 1 })

    this.state = {
      selectedSlotsIndexes: props.selectedSlotsIndexes,
      slots: props.slots,
      from: from.toISO(),
      to: to.toISO(),
    }

    this.onSlotBookedChange = this.onSlotBookedChange.bind(this)
    this.onSlotDisabledChange = this.onSlotDisabledChange.bind(this)
    this.onToggleAll = this.onToggleAll.bind(this)
    this.onCopyAll = this.onCopyAll.bind(this)
    this.onDateSelected = this.onDateSelected.bind(this)
  }
}

export default withConfig(SlotEditor)

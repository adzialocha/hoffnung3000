import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { DateTime, Interval } from 'luxon'

import { DatePicker } from './'
import { SlotEditorItem } from './'
import { alert } from '../services/dialog'
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
    if (selectedDate) {
      this.setState({
        selectedDate,
      })
    } else {
      if (this.state.selectedSlotsIndexes.length > 0) {
        this.setState({
          selectedDate: this.props.slots[this.state.selectedSlotsIndexes[0]].from.toISODate(),
        })
      } else {
        this.setState({
          selectedDate: this.props.config.festivalDateStart,
        })
      }
    }
  }

  onToggleAll() {
    // @TODO: Only for this day

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

  onCopy() {
    // @TODO
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
        .fromISO(item.from)
        .hasSame(DateTime.fromISO(previousItem.from), 'day')
    ) {
      return [
        this.renderSlotDateHeader(item, index),
        this.renderSlotItem(item, index),
      ]
    }

    return this.renderSlotItem(item, index)
  }

  renderDatePicker() {
    return (
      <DatePicker
        value={new Date(this.state.selectedDate)}
        onChange={this.onDateSelected}
      />
    )
  }

  renderContent() {
    const slots = this.currentSlots()

    return slots.map((item, index) => {
      const previousItem = index > 0 ? slots[index - 1] : null
      return this.renderSlotItemList(item, previousItem, index)
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

            <button onClick={this.onCopy}>
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
    const from = DateTime.fromISO(this.state.selectedDate)
    const to = DateTime.fromISO(from).plus({ day: 1 })
    const range = Interval.fromDateTimes(from, to)

    return this.state.slots
      .filter(item => {
        return range.overlaps(Interval.fromDateTimes(item.from, item.to))
      })
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedSlotsIndexes: props.selectedSlotsIndexes,
      slots: props.slots,
      selectedDate: props.config.festivalDateStart,
    }

    this.onSlotBookedChange = this.onSlotBookedChange.bind(this)
    this.onSlotDisabledChange = this.onSlotDisabledChange.bind(this)
    this.onToggleAll = this.onToggleAll.bind(this)
    this.onCopy = this.onCopy.bind(this)
    this.onDateSelected = this.onDateSelected.bind(this)
  }
}

export default withConfig(SlotEditor)

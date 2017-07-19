import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export const DISABLED = 'disabled'
export const BOOKED_BY_ME = 'booked-by-me'
export const BOOKED = 'booked'

class SlotEditorItem extends Component {
  static propTypes = {
    isBookingMode: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    slot: PropTypes.object.isRequired,
  }

  onClick() {
    const { status } = this.props.slot

    if (this.props.isBookingMode) {
      if (status === DISABLED) {
        window.alert('This slot was disabled by the place owner.') // eslint-disable-line no-alert
      } else if (status === BOOKED) {
        window.alert('This slot was booked by someone else.') // eslint-disable-line no-alert
      } else if (status === BOOKED_BY_ME) {
        this.changeSlotStatus(undefined)
      } else {
        this.changeSlotStatus(BOOKED_BY_ME)
      }
    } else {
      if (status === DISABLED) {
        this.changeSlotStatus(undefined)
      } else {
        this.changeSlotStatus(DISABLED)
      }
    }
  }

  render() {
    const { fromTimeStr, toTimeStr, status } = this.props.slot
    const slotClassnames = classnames(
      'slot-editor__item', {
        'slot-editor__item--disabled': status === DISABLED,
        'slot-editor__item--booked': status === BOOKED,
        'slot-editor__item--booked-by-me': status === BOOKED_BY_ME,
      }
    )

    return (
      <div
        className={slotClassnames}
        onClick={this.onClick}
      >
        { fromTimeStr } - { toTimeStr }
      </div>
    )
  }

  changeSlotStatus(status) {
    const slot = this.props.slot
    slot.status = status
    this.props.onChange(slot)
  }

  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }
}

export default SlotEditorItem

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { DateTime } from 'luxon'

import { ValueSelector } from './'
import { translate } from '../../../common/services/i18n'

import {
  withSocialFeatures,
} from '../containers'

const DATE_VALUES = [
  {
    label: translate('components.sidebarRandomMeeting.anytime'),
    value: undefined,
  },
]

for (let value = 1; value < 25; value += 1) {
  const label = value < 10 ? `0${value}:00` : `${value}:00`
  DATE_VALUES.push({ value, label })
}

class SidebarRandomMeeting extends Component {
  static propTypes = {
    isMeetingLoading: PropTypes.bool.isRequired,
    meetingErrorMessage: PropTypes.string.isRequired,
    requestRandomMeeting: PropTypes.func.isRequired,
  }

  onClick() {
    if (this.state.selectedHour === undefined) {
      const date = DateTime
        .local()
        .startOf('hour')
        .toISO()

      this.props.requestRandomMeeting(date, true)
    } else {
      const date = DateTime
        .local()
        .startOf('day')
        .plus({ hours: this.state.selectedHour })
        .toISO()

      this.props.requestRandomMeeting(date, false)
    }
  }

  onDateChange(selectedHour) {
    this.state.selectedHour = selectedHour
  }

  renderErrorMessage() {
    if (this.props.meetingErrorMessage) {
      return (
        <div className="form__error">
          { this.props.meetingErrorMessage }
        </div>
      )
    }
    return null
  }

  render() {
    return (
      <div>
        { this.renderErrorMessage() }
        <ValueSelector values={DATE_VALUES} onChange={this.onDateChange} />
        <br />

        <div className="button-group">
          <button
            className="button"
            disabled={this.props.isMeetingLoading}
            onClick={this.onClick}
          >
            {
              translate('components.sidebarRandomMeeting.requestButton')
            }
          </button>
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedHour: undefined,
    }

    this.onClick = this.onClick.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
  }
}

export default withSocialFeatures(SidebarRandomMeeting)

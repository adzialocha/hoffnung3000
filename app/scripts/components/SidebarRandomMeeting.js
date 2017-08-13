import dateFns from 'date-fns'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

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

for (let value = 0; value < 24; value += 1) {
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
      this.props.requestRandomMeeting()
    } else {
      const date = dateFns.setHours(
        dateFns.startOfToday(), this.state.selectedHour
      )
      this.props.requestRandomMeeting(date.toISOString())
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
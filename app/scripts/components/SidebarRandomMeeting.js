import dateFns from 'date-fns'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { translate } from '../../../common/services/i18n'

import {
  withSocialFeatures,
} from '../containers'

class SidebarRandomMeeting extends Component {
  static propTypes = {
    isMeetingLoading: PropTypes.bool.isRequired,
    meetingErrorMessage: PropTypes.string.isRequired,
    requestRandomMeeting: PropTypes.func.isRequired,
  }

  onClick() {
    const date = dateFns.addHours(new Date(), 4).toISOString()
    this.props.requestRandomMeeting(date)
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

    this.onClick = this.onClick.bind(this)
  }
}

export default withSocialFeatures(SidebarRandomMeeting)

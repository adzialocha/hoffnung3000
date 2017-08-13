import dateFns from 'date-fns'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { translate } from '../../../common/services/i18n'

import {
  withSocialFeatures,
} from '../containers'

class SidebarRandomMeeting extends Component {
  static propTypes = {
    requestRandomMeeting: PropTypes.func.isRequired,
  }

  onClick() {
    const date = dateFns.addHours(new Date(), 4).toISOString()
    this.props.requestRandomMeeting(date)
  }

  render() {
    return (
      <button className="button" onClick={this.onClick}>
        {
          translate('components.sidebar.randomMeetingButton')
        }
      </button>
    )
  }

  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }
}

export default withSocialFeatures(SidebarRandomMeeting)

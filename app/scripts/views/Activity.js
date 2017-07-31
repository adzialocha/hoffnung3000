import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asInfiniteList, withUserStatus } from '../containers'
import { ActivityListItem } from '../components'
import { translate } from '../services/i18n'

const WrappedInfiniteList = asInfiniteList(ActivityListItem)

class Activity extends Component {
  static propTypes = {
    updateStatus: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.updateStatus()
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.activity.title') }</h1>
        <hr />
        <WrappedInfiniteList resourceName="activity" />
      </section>
    )
  }
}

export default withUserStatus(Activity)

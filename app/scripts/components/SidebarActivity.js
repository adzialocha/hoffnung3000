import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { ActivityListItem } from './'
import { translate } from '../../../common/services/i18n'
import { withUserStatus } from '../containers'

class SidebarActivity extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    latestActivities: PropTypes.array.isRequired,
  }

  renderActivities() {
    return this.props.latestActivities.map(activity => {
      return <ActivityListItem item={activity} key={activity.id} />
    })
  }

  render() {
    if (this.props.isLoading) {
      return <p>{ translate('common.loading') }</p>
    }

    return (
      <div>
        { this.renderActivities() }
      </div>
    )
  }
}

export default withUserStatus(SidebarActivity)

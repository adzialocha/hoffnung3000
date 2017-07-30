import React, { Component } from 'react'

import { asInfiniteList } from '../containers'
import { ActivityListItem } from '../components'
import { translate } from '../services/i18n'

const WrappedInfiniteList = asInfiniteList(ActivityListItem)

class Activity extends Component {
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

export default Activity

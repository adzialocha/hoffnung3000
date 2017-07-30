import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { AnimalLink } from './'
import { asInfiniteListItem } from '../containers'

class ActivityListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="list-item-content">
      </div>
    )
  }
}

export default asInfiniteListItem(ActivityListItem)

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { AnimalLink } from './'
import { asInfiniteListItem } from '../containers'

class CuratedResourcesListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="list-item-content">
        <div className="list-item-content__title ellipsis">
          { this.props.item.title }
        </div>
        <div className="list-item-content__subtitle ellipsis">
          <AnimalLink animal={this.props.item.animal} />
        </div>
        <div className="list-item-content__description ellipsis">
          { this.props.item.description }
        </div>
      </div>
    )
  }
}

export default asInfiniteListItem(CuratedResourcesListItem)

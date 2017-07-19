import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { InfiniteListContainer, PlaceListItem } from '../components'
import { translate } from '../services/i18n'

class PlacesIndex extends Component {
  renderPlacesList() {
    return (
      <InfiniteListContainer
        listItemNode={this.listItem}
        resourceName="places"
      />
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.places.title') }</h1>
        <Link className="button button--green" to="/new/place">
          { translate('views.places.createNewPlaceButton') }
        </Link>
        <hr />
        { this.renderPlacesList() }
      </section>
    )
  }

  listItem(props) {
    return <PlaceListItem key={props.id} {...props} />
  }
}

export default PlacesIndex

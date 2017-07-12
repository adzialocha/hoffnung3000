import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { translate } from '../services/i18n'

class PlacesIndex extends Component {
  render() {
    return (
      <section>
        <h1>{ translate('views.places.title') }</h1>
        <Link className="button" to="/places/new">
          { translate('views.places.createNew') }
        </Link>
      </section>
    )
  }
}

export default PlacesIndex

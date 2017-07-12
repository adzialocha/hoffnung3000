import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { translate } from '../services/i18n'

class PlacesNew extends Component {
  render() {
    return (
      <section>
        <h1>{ translate('views.places.createNew') }</h1>
        <Link className="button" to="/places/new">
          { translate('views.places.backToOverview') }
        </Link>
      </section>
    )
  }
}

export default PlacesNew

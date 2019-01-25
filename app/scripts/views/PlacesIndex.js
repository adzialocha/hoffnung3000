import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'

import { asInfiniteList } from '../containers'
import { CuratedPlaceListItem, StaticPage } from '../components'
import { translate } from '../../../common/services/i18n'

const WrappedInfiniteList = asInfiniteList(CuratedPlaceListItem)

class PlacesIndex extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
  }

  onClick(item) {
    this.props.push(`/places/${item.slug}`)
  }

  onEditClick(item) {
    this.props.push(`/places/${item.slug}/edit`)
  }

  renderItemsList() {
    return (
      <WrappedInfiniteList
        resourceName="places"
        onClick={this.onClick}
        onEditClick={this.onEditClick}
      />
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.places.indexTitle') }</h1>
        <StaticPage hideTitle={true} slug="places" />
        <Link className="button button--green" to="/new/place">
          { translate('views.places.createNewButton') }
        </Link>
        <hr />
        { this.renderItemsList() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
  }
}

export default connect(
  null, {
    push,
  }
)(PlacesIndex)

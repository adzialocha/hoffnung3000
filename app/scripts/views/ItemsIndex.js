import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import { asInfiniteList } from '../containers'
import { CuratedListItem } from '../components'
import { translate } from '../services/i18n'

const WrappedInfiniteList = asInfiniteList(CuratedListItem)

class ItemsIndex extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
  }

  onEditClick(item) {
    this.props.push(`/items/${item.slug}/edit`)
  }

  renderItemsList() {
    return (
      <WrappedInfiniteList
        resourceName="items"
        onEditClick={this.onEditClick}
      />
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.items.indexTitle') }</h1>
        <Link className="button button--green" to="/new/item">
          { translate('views.items.createNewButton') }
        </Link>
        <hr />
        { this.renderItemsList() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onEditClick = this.onEditClick.bind(this)
  }
}

export default connect(
  null, {
    push,
  }
)(ItemsIndex)

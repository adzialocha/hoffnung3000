import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { InfiniteListContainer, ItemListItem } from '../components'
import { translate } from '../services/i18n'

class ItemsIndex extends Component {
  renderItemsList() {
    return (
      <InfiniteListContainer
        listItemNode={this.listItem}
        resourceName="items"
      />
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.items.title') }</h1>
        <Link className="button button--green" to="/new/item">
          { translate('views.items.createNewItemButton') }
        </Link>
        <hr />
        { this.renderItemsList() }
      </section>
    )
  }

  listItem(props) {
    return <ItemListItem key={props.id} {...props} />
  }
}

export default ItemsIndex

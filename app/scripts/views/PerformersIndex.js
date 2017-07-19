import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { InfiniteListContainer, PerformerListItem } from '../components'
import { translate } from '../services/i18n'

class PerformersIndex extends Component {
  renderPerformersList() {
    return (
      <InfiniteListContainer
        listItemNode={this.listItem}
        resourceName="performers"
      />
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.performers.title') }</h1>
        <Link className="button button--green" to="/new/performer">
          { translate('views.performers.createNewPerformerButton') }
        </Link>
        <hr />
        { this.renderPerformersList() }
      </section>
    )
  }

  listItem(props) {
    return <PerformerListItem key={props.id} {...props} />
  }
}

export default PerformersIndex

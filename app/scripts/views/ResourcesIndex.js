import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import { asInfiniteList } from '../containers'
import { CuratedResourcesListItem, StaticPage } from '../components'
import { translate } from '../../../common/services/i18n'

const WrappedInfiniteList = asInfiniteList(CuratedResourcesListItem)

class ResourcesIndex extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
  }

  onEditClick(resource) {
    this.props.push(`/resources/${resource.slug}/edit`)
  }

  renderResourcesList() {
    return (
      <WrappedInfiniteList
        resourceName="resources"
        onEditClick={this.onEditClick}
      />
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.resources.indexTitle') }</h1>
        <StaticPage hideTitle={true} slug="resources" />
        <Link className="button button--green" to="/new/resource">
          { translate('views.resources.createNewButton') }
        </Link>
        <hr />
        { this.renderResourcesList() }
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
)(ResourcesIndex)

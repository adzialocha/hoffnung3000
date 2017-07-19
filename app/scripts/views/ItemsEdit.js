import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import flash from '../actions/flash'
import { cachedResource } from '../services/resources'
import { fetchResource, updateResource } from '../actions/resources'
import { ItemForm } from '../forms'
import { translate } from '../services/i18n'

class ItemsEdit extends Component {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    fetchResource: PropTypes.func.isRequired,
    flash: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    resourceData: PropTypes.object.isRequired,
    resourceSlug: PropTypes.string.isRequired,
    updateResource: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchResource('items', this.props.resourceSlug)
  }

  onSubmit(values) {
    const successFlash = {
      text: translate('views.items.updateSuccess'),
    }

    this.props.updateResource(
      'items',
      this.props.resourceSlug,
      values,
      successFlash,
      '/items'
    )
  }

  renderForm() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>
    }

    if (!this.props.resourceData.isOwnerMe) {
      this.props.flash({
        redirect: '/',
        text: translate('flash.common.unauthorizedView'),
        type: 'error',
      })
    }

    return (
      <ItemForm
        errorMessage={this.props.errorMessage}
        initialValues={this.props.resourceData}
        isSlotSizeVisible={false}
        onSubmit={this.onSubmit}
      />
    )
  }

  renderTitle() {
    if (this.props.isLoading) {
      return <h1>{ translate('views.items.titlePlaceholder') }</h1>
    }
    return <h1>{ this.props.resourceData.title }</h1>
  }

  render() {
    return (
      <section>
        { this.renderTitle() }
        <Link className="button" to="/items">
          { translate('views.items.backToOverview') }
        </Link>
        <hr />
        { this.renderForm() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }
}

function mapStateToProps(state, ownProps) {
  const resourceSlug = ownProps.match.params.slug
  const { errorMessage } = state.resources
  const resource = cachedResource('items', resourceSlug)
  const { isLoading, object: resourceData } = resource

  return {
    errorMessage,
    isLoading,
    resourceData,
    resourceSlug,
  }
}

export default connect(
  mapStateToProps, {
    fetchResource,
    flash,
    updateResource,
  }
)(ItemsEdit)

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import flash from '../actions/flash'
import { cachedResource } from '../services/resources'
import { confirm } from '../services/dialog'
import {
  deleteResource,
  fetchResource,
  updateResource,
} from '../actions/resources'
import { ResourceForm } from '../forms'
import { translate } from '../services/i18n'

class ResourcesEdit extends Component {
  static propTypes = {
    deleteResource: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    fetchResource: PropTypes.func.isRequired,
    flash: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    resourceData: PropTypes.object.isRequired,
    resourceSlug: PropTypes.string.isRequired,
    updateResource: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchResource('resources', this.props.resourceSlug)
  }

  componentDidUpdate() {
    if (!this.props.isLoading && !this.props.resourceData.isOwnerMe) {
      this.props.flash({
        redirect: '/',
        text: translate('flash.unauthorizedView'),
        type: 'error',
      })
    }
  }

  onSubmit(values) {
    const successFlash = {
      text: translate('flash.updateResourceSuccess'),
    }

    this.props.updateResource(
      'resources',
      this.props.resourceSlug,
      values,
      successFlash,
      '/resources'
    )
  }

  onDeleteClick() {
    if (!confirm(translate('common.areYouSure'))) {
      return
    }

    const deleteFlash = {
      text: translate('flash.deleteResourceSuccess'),
    }

    this.props.deleteResource(
      'resources',
      this.props.resourceSlug,
      deleteFlash,
      '/resources'
    )
  }

  renderForm() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>
    }

    return (
      <ResourceForm
        errorMessage={this.props.errorMessage}
        initialValues={this.props.resourceData}
        isSlotSizeVisible={false}
        onSubmit={this.onSubmit}
      />
    )
  }

  renderTitle() {
    if (this.props.isLoading) {
      return <h1>{ translate('views.resources.titlePlaceholder') }</h1>
    }
    return <h1>{ this.props.resourceData.title }</h1>
  }

  render() {
    return (
      <section>
        { this.renderTitle() }
        <Link className="button" to="/resources">
          { translate('common.backToOverview') }
        </Link>
        <button className="button button--red" onClick={this.onDeleteClick}>
          { translate('common.deleteButton') }
        </button>
        <hr />
        { this.renderForm() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
}

function mapStateToProps(state, ownProps) {
  const resourceSlug = ownProps.match.params.slug
  const { errorMessage } = state.resources
  const resource = cachedResource('resources', resourceSlug)
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
    deleteResource,
    fetchResource,
    flash,
    updateResource,
  }
)(ResourcesEdit)

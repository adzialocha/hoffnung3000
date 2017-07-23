import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { cachedResource } from '../services/resources'
import { createResource } from '../actions/resources'
import { ResourceForm } from '../forms'
import { translate } from '../services/i18n'

class ResourcesNew extends Component {
  static propTypes = {
    createResource: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    nextRandomId: PropTypes.string.isRequired,
  }

  onSubmit(values) {
    const flash = {
      text: translate('flash.createResourceSuccess'),
    }

    this.props.createResource(
      'resources',
      this.props.nextRandomId,
      values,
      flash,
      '/resources'
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.resources.createNewTitle') }</h1>
        <Link className="button" to="/resources">
          { translate('common.backToOverview') }
        </Link>
        <hr />
        <ResourceForm
          errorMessage={this.props.errorMessage}
          isLoading={this.props.isLoading}
          onSubmit={this.onSubmit}
        />
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }
}

function mapStateToProps(state) {
  const { errorMessage, nextRandomId } = state.resources
  const { isLoading } = cachedResource('resources', nextRandomId, true)

  return {
    errorMessage,
    isLoading,
    nextRandomId,
  }
}

export default connect(
  mapStateToProps, {
    createResource,
  }
)(ResourcesNew)

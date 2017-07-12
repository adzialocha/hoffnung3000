import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { cachedResource } from '../services/resources'
import { fetchResource, updateResource } from '../actions/resources'
import { PageForm } from '../forms'

class AdminPagesEditForm extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    fetchResource: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    resourceData: PropTypes.object.isRequired,
    resourceId: PropTypes.string.isRequired,
    updateResource: PropTypes.func.isRequired,
  }

  static defaultProps = {
    errorMessage: '',
  }

  componentDidMount() {
    this.props.fetchResource('pages', this.props.resourceId)
  }

  onSubmit(values) {
    const flash = {
      text: 'Successfully updated page',
    }

    this.props.updateResource('pages', this.props.resourceId, values, flash)
  }

  renderForm() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>
    }

    return (
      <PageForm
        errorMessage={this.props.errorMessage}
        initialValues={this.props.resourceData}
        onSubmit={this.onSubmit}
      />
    )
  }

  render() {
    return (
      <section>
        <h1>Edit Page { this.title() }</h1>
        <Link className="button" to="/admin/pages/all/1">Back to overview</Link>
        <hr />
        { this.renderForm() }
      </section>
    )
  }

  title() {
    const { title } = this.props.resourceData
    if (!(title && title.length > 0)) {
      return ''
    }

    return `"${this.props.resourceData.title}"`
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }
}

function mapStateToProps(state, ownProps) {
  const { errorMessage } = state.resources
  const { resourceId } = ownProps.match.params
  const resource = cachedResource('pages', resourceId)
  const { isLoading, object } = resource

  return {
    errorMessage,
    isLoading,
    resourceData: object,
    resourceId,
  }
}

export default connect(
  mapStateToProps, {
    fetchResource,
    updateResource,
  }
)(AdminPagesEditForm)

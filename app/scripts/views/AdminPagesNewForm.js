import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { cachedResource } from '../services/resources'
import { createResource } from '../actions/resources'
import { PageForm } from '../forms'

class AdminPagesNewForm extends Component {
  static propTypes = {
    createResource: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    nextRandomId: PropTypes.string.isRequired,
  }

  onSubmit(values) {
    const flash = {
      text: 'Successfully created new page',
    }

    this.props.createResource(
      'pages',
      this.props.nextRandomId,
      values,
      flash,
      '/admin/pages/all'
    )
  }

  renderForm() {
    return (
      <PageForm
        errorMessage={this.props.errorMessage}
        isLoading={this.props.isLoading}
        onSubmit={this.onSubmit}
      />
    )
  }

  render() {
    return (
      <section>
        <h1>New Page</h1>
        <Link className="button" to="/admin/pages/all/1">Back to overview</Link>
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

function mapStateToProps(state) {
  const { errorMessage, nextRandomId } = state.resources
  const { isLoading } = cachedResource('pages', nextRandomId)

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
)(AdminPagesNewForm)

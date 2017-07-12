import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { cachedResource } from '../services/resources'
import { createResource } from '../actions/resources'
import { UserForm } from '../forms'

class AdminUsersNewForm extends Component {
  static propTypes = {
    createResource: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    nextRandomId: PropTypes.string.isRequired,
  }

  onSubmit(values) {
    const flash = {
      text: 'Successfully created new user',
    }

    this.props.createResource(
      'users',
      this.props.nextRandomId,
      values,
      flash,
      '/admin/users/all'
    )
  }

  renderForm() {
    return (
      <UserForm
        errorMessage={this.props.errorMessage}
        isLoading={this.props.isLoading}
        showPasswordField={true}
        onSubmit={this.onSubmit}
      />
    )
  }

  render() {
    return (
      <section>
        <h1>New User</h1>
        <Link className="button" to="/admin/users/all/1">Back to overview</Link>
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
  const { isLoading } = cachedResource('users', nextRandomId)

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
)(AdminUsersNewForm)

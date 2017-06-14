import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { createNewPage } from '../actions/pages'
import { PageForm } from '../components'

class AdminPagesNewForm extends Component {
  static propTypes = {
    createNewPage: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  onSubmit(values) {
    const { title, slug, content } = values
    this.props.createNewPage(title, slug, content)
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
        <Link className="button" to="/admin/pages/all">Back to overview</Link>
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
  const { isLoading, errorMessage } = state.adminPage

  return {
    errorMessage,
    isLoading,
  }
}

export default connect(
  mapStateToProps, {
    createNewPage,
  }
)(AdminPagesNewForm)

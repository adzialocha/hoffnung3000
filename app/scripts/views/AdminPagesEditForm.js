import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPage, updatePage } from '../actions/pages'
import { PageForm } from '../components'

class AdminPagesEditForm extends Component {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    fetchPage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    pageData: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    updatePage: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchPage(this.props.slug)
  }

  onSubmit(values) {
    const { title, slug, content } = values
    this.props.updatePage(title, slug, content)
  }

  renderForm() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>
    }

    return (
      <PageForm
        errorMessage={this.props.errorMessage}
        initialValues={this.props.pageData}
        onSubmit={this.onSubmit}
      />
    )
  }

  render() {
    return (
      <section>
        <h1>Edit Page { this.title() }</h1>
        <Link className="button" to="/admin/pages/all">Back to overview</Link>
        <hr />
        { this.renderForm() }
      </section>
    )
  }

  title() {
    return (!this.props.isLoading) ? `"${this.props.pageData.title}"` : ''
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }
}

function mapStateToProps(state, ownProps) {
  const { isLoading, pageData, errorMessage } = state.adminPage

  return {
    errorMessage,
    isLoading,
    pageData,
    slug: ownProps.match.params.pageSlug,
  }
}

export default connect(
  mapStateToProps, {
    fetchPage,
    updatePage,
  }
)(AdminPagesEditForm)

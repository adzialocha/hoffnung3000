import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchHtmlPage } from '../actions/pages'

class Page extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    fetchHtmlPage: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.props.fetchHtmlPage(this.props.slug)
  }

  renderPageContent() {
    if (this.props.isLoading) {
      return (
        <div className="page__spinner">
          <p>Loading ...</p>
        </div>
      )
    }

    if (this.props.isError) {
      return (
        <div className="page__content">
          <h1>Error</h1>
          <p>The requested page could not be found.</p>
        </div>
      )
    }

    return (
      <div className="page__content">
        <h1>{ this.props.title }</h1>
        <div
          className="page__content-text"
          dangerouslySetInnerHTML={ { __html: this.props.content } }
        />
      </div>
    )
  }

  render() {
    return (
      <section className="page">
        { this.renderPageContent() }
      </section>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { title, content, isLoading, isError } = state.page

  return {
    content,
    isError,
    isLoading,
    slug: ownProps.match.params.slug,
    title,
  }
}

export default connect(
  mapStateToProps, {
    fetchHtmlPage,
  }
)(Page)

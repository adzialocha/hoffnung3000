import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchHtmlPage } from '../actions/pages'
import { translate } from '../services/i18n'

class StaticPage extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    fetchHtmlPage: PropTypes.func.isRequired,
    hideTitle: PropTypes.bool,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    hideTitle: false,
  }

  componentDidMount() {
    this.props.fetchHtmlPage(this.props.slug)
  }

  componentDidUpdate(prevProps) {
    if (this.props.slug !== prevProps.slug) {
      this.props.fetchHtmlPage(this.props.slug)
    }
  }

  renderPageTitle() {
    if (this.props.hideTitle) {
      return null
    }

    return <h1>{ this.props.title }</h1>
  }

  renderPageContent() {
    if (this.props.isLoading) {
      return (
        <div className="page__spinner">
          <p>{ translate('common.loading') }</p>
        </div>
      )
    }

    if (this.props.isError) {
      return (
        <div className="page__content">
          <h1>{ translate('components.staticPage.errorTitle') }</h1>
          <p>{ translate('components.staticPage.errorText') }</p>
        </div>
      )
    }

    return (
      <div className="page__content">
        { this.renderPageTitle() }
        <div
          className="page__content-text"
          dangerouslySetInnerHTML={ { __html: this.props.content } }
        />
      </div>
    )
  }

  render() {
    return (
      <div className="page">
        { this.renderPageContent() }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { title, content, isLoading, isError } = state.page
  const { slug } = ownProps

  return {
    content,
    isError,
    isLoading,
    slug,
    title,
  }
}

export default connect(
  mapStateToProps, {
    fetchHtmlPage,
  }
)(StaticPage)

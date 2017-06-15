import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormField, FormTextarea } from './'

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Required'
  }
  if (!values.slug) {
    errors.slug = 'Required'
  }
  if (!values.content) {
    errors.content = 'Required'
  }
  return errors
}

class PageForm extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    errorMessage: undefined,
    isLoading: false,
  }

  renderErrorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="form__error">
          { this.props.errorMessage }
        </div>
      )
    }
    return null
  }

  render() {
    return (
      <form className="form" onSubmit={this.props.handleSubmit}>
        { this.renderErrorMessage() }
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="Title"
          name="title"
          type="text"
        />
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="Slug"
          name="slug"
          type="text"
        />
        <Field
          component={FormTextarea}
          disabled={this.props.isLoading}
          label="Content"
          name="content"
          type="text"
        />
        <button
          className="form__submit button button--blue"
          disabled={this.props.isLoading}
          type="submit"
        >
          Save
        </button>
      </form>
    )
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'page',
  validate,
})(PageForm)

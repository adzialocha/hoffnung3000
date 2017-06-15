import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class FormTextarea extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
  }

  static defaultProps = {
    disabled: false,
  }

  renderError() {
    const { error, touched, warning } = this.props.meta

    return (
      touched && (
        (error && <span className="form__field-error">{error}</span>) ||
        (warning && <span className="form__field-warning">{warning}</span>)
      )
    )
  }

  render() {
    const { error, touched, warning } = this.props.meta
    const { disabled, label, input } = this.props

    const formFieldClasses = classnames(
      'form__field', {
        'form__field--has-error': error && touched,
        'form__field--has-warning': warning && touched,
      }
    )

    return (
      <div className={formFieldClasses}>
        <label className="form__field-label">{label}</label>
        <textarea
          {...input}
          className="form__field-input"
          disabled={disabled}
        />
        { this.renderError() }
      </div>
    )
  }
}

export default FormTextarea

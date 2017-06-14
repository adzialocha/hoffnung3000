import PropTypes from 'prop-types'
import React, { Component } from 'react'

class FormTextarea extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    disabled: false,
  }

  renderError() {
    const { error, touched, warning } = this.props.meta

    return touched &&
          ((error && <span className="form-field__error">{error}</span>) ||
            (warning && <span className="form-field__warning">{warning}</span>))
  }

  render() {
    const { disabled, label, input, type } = this.props

    return (
      <div className="form__field">
        <label className="form__field-label">{label}</label>
        <textarea
          {...input}
          className="form__field-input"
          disabled={disabled}
          type={type}
        />
        { this.renderError() }
      </div>
    )
  }
}

export default FormTextarea

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class FormCheckbox extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
  }

  static defaultProps = {
    disabled: false,
  }

  onBlur() {
    this.props.input.onBlur(this.refs.checkbox.checked)
  }

  onChange() {
    this.props.input.onChange(this.refs.checkbox.checked)
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
      'form__field',
      'form__field--inline', {
        'form__field--has-error': error && touched,
        'form__field--has-warning': warning && touched,
      }
    )

    return (
      <div className={formFieldClasses}>
        <input
          {...input}
          checked={this.props.input.value}
          className="form__field-input"
          disabled={disabled}
          ref="checkbox"
          type="checkbox"
          onBlur={this.onBlur}
          onChange={this.onChange}
        />
        <label className="form__field-label">{label}</label>
        { this.renderError() }
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
  }
}

export default FormCheckbox

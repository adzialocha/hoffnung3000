import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default function asFormField(WrappedComponent) {
  return class FormFieldContainer extends Component {
    static propTypes = {
      disabled: PropTypes.bool,
      inline: PropTypes.bool,
      input: PropTypes.object.isRequired,
      label: PropTypes.string.isRequired,
      meta: PropTypes.object.isRequired,
    }

    static defaultProps = {
      disabled: false,
      inline: false,
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
      const { meta, label, inline, ...restProps } = this.props
      const { error, touched, warning } = meta

      const formFieldClasses = classnames(
        'form__field', {
          'form__field--has-error': error && touched,
          'form__field--has-warning': warning && touched,
          'form__field--inline': inline,
        }
      )

      return (
        <div className={formFieldClasses}>
          <label className="form__field-label">{label}</label>
          <WrappedComponent {...restProps} />
          { this.renderError() }
        </div>
      )
    }
  }
}

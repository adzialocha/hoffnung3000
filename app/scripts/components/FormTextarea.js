import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asFormField } from '../containers'

class FormTextarea extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    placeholder: '',
  }

  render() {
    const { disabled, input, placeholder, ...rest } = this.props

    return (
      <textarea
        className="form__field-input"
        disabled={disabled}
        placeholder={placeholder}
        {...input}
        {...rest}
      />
    )
  }
}

export default asFormField(FormTextarea)

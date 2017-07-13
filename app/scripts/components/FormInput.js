import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asFormField } from '../forms'

class FormInput extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
  }

  render() {
    const { input, disabled, type } = this.props

    return (
      <input
        className="form__field-input"
        disabled={disabled}
        type={type}
        {...input}
      />
    )
  }
}

export default asFormField(FormInput)

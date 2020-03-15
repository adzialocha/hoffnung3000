import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asFormField } from '../containers'

class FormTextarea extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
  }

  render() {
    const { disabled, input, ...rest } = this.props

    return (
      <textarea
        className="form__field-input"
        disabled={disabled}
        {...input}
        {...rest}
      />
    )
  }
}

export default asFormField(FormTextarea)

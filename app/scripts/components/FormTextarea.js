import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asFormField } from '../forms'

class FormTextarea extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
  }

  render() {
    const { disabled, input } = this.props

    return (
      <textarea
        className="form__field-input"
        disabled={disabled}
        {...input}
      />
    )
  }
}

export default asFormField(FormTextarea)

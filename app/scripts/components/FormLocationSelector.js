import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asFormField } from '../forms'
import { LocationSelector } from './'

class FormLocationSelector extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
  }

  render() {
    const { disabled, input } = this.props

    return (
      <div>
        <LocationSelector
          disabled={disabled}
          {...input}
        />
      </div>
    )
  }
}

export default asFormField(FormLocationSelector)

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asFormField } from '../forms'
import { SlotEditor } from './'

class FormSlotEditor extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
  }

  render() {
    const { disabled, input } = this.props

    return (
      <div className="form__field-input">
        <SlotEditor
          disabled={disabled}
          {...input}
        />
        <div className="button-group">
          <button className="button button--green">Edit slots</button>
        </div>
      </div>
    )
  }
}

export default asFormField(FormSlotEditor)

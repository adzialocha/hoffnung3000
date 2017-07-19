import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asFormField } from '../forms'
import { SlotSizeEditor } from './'

class FormSlotSizeEditor extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
    isSlotSizeVisible: PropTypes.bool.isRequired,
  }

  render() {
    const { disabled, input } = this.props

    return (
      <div>
        <SlotSizeEditor
          disabled={disabled}
          isSlotSizeVisible={this.props.isSlotSizeVisible}
          {...input}
        />
      </div>
    )
  }
}

export default asFormField(FormSlotSizeEditor)

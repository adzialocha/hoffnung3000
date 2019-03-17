import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asFormField } from '../containers'

class FormCheckbox extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
  }

  onBlur() {
    this.props.input.onBlur(this._checkboxElem.checked)
  }

  onChange() {
    this.props.input.onChange(this._checkboxElem.checked)
  }

  render() {
    const { disabled, input } = this.props

    return (
      <input
        checked={this.props.input.value}
        className="form__field-input form__field-checkbox"
        disabled={disabled}
        ref={c => { this._checkboxElem = c }}
        type="checkbox"
        {...input}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    )
  }

  constructor(props) {
    super(props)

    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
  }
}

export default asFormField(FormCheckbox)

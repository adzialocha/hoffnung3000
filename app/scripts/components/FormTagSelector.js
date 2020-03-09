import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { asFormField } from '../containers'
import { FormTagSelectorItem } from './'

class FormTagSelector extends Component {
  static propTypes = {
    defaultTags: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
      })
    ).isRequired,
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
  };

  render() {
    const { input, defaultTags, disabled } = this.props
    return (
      <div>
        {this.props.defaultTags.map(({ label, value }) => (
          <div key={value}>
            <FormTagSelectorItem
              {...input}
              clickedTag={value}
              defaultTags={defaultTags}
              disabled={disabled}
              eventTags={input.value === '' ? JSON.stringify([]) : JSON.stringify(input.value)}
              input={input}
              key={value}
              label={label}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default asFormField(FormTagSelector)

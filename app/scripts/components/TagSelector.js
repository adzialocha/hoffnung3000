import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { FormTagSelectorItem } from './'

class TagSelector extends Component {
  static propTypes = {
    defaultTags: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
      })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    tagArray: PropTypes.array,
  };

  static defaultProps = {
    tagArray: [],
  }

  render() {
    const { defaultTags, tagArray, onChange } = this.props
    return (
      <div>
        {this.props.defaultTags.map(({ label, value }) => (
          <div key={value}>
            <FormTagSelectorItem
              defaultTags={defaultTags}
              key={value}
              label={label}
              tagArray={JSON.stringify(tagArray)}
              thisTag={value}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default TagSelector

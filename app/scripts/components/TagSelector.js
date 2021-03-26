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
      <div className="tag-container">
        {this.props.defaultTags.map(({ label, value }) => (
          <FormTagSelectorItem
            defaultTags={defaultTags}
            key={value}
            label={label}
            tagArray={JSON.stringify(tagArray)}
            thisTag={value}
            onChange={onChange}
          />
        ))}
      </div>
    )
  }
}

export default TagSelector

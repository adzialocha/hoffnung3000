import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FormTagSelectorItem extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    tagArray: PropTypes.string.isRequired,
    thisTag: PropTypes.string.isRequired,
  }

  onSelect(selectedTags) {
    this.props.onChange(selectedTags)
  }

  render() {
    const { tagArray, label, thisTag } = this.props
    return (
      <div
        className={JSON.parse(tagArray).includes(thisTag) === true ? 'tag tag--selected' : 'tag'}
        key={thisTag}
        onClick={this.handleClick}
      >
        {label}
      </div>
    )
  }

  updateTags(selectedTags, clickedTag, setSelectedTags) {
    if (clickedTag && selectedTags) {
      if (selectedTags.includes(clickedTag)) {
        return setSelectedTags(selectedTags.filter(item => item !== clickedTag))
      }
      selectedTags.push(clickedTag)
      return setSelectedTags(selectedTags)
    }
    return false
  }

  handleClick() {
    this.updateTags(JSON.parse(this.props.tagArray), this.props.thisTag, this.onSelect)
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }
}

export default FormTagSelectorItem

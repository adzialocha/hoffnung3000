import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FormTagSelectorItem extends Component {
  static propTypes = {
    clickedTag: PropTypes.string.isRequired,
    eventTags: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  }

  onSelect(tagValue) {
    this.props.onChange(tagValue)
  }

  render() {
    const { eventTags, label, clickedTag } = this.props
    return (
      <tag
        style={eventTags.includes(clickedTag) === true ? { backgroundColor: 'red' } : null}
        onClick={this.handleClick}
      >
        {label}
      </tag>
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
    this.updateTags(this.props.eventTags, this.props.clickedTag, this.onSelect)
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }
}

export default FormTagSelectorItem

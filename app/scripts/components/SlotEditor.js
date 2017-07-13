import PropTypes from 'prop-types'
import React, { Component } from 'react'

class SlotEditor extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
  }

  render() {
    return (
      <div className="slot-editor" />
    )
  }
}

export default SlotEditor

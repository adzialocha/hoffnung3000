import PropTypes from 'prop-types'
import React, { Component } from 'react'

class PaginatedListActionButton extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  onClick() {
    this.setState({
      isDisabled: this.props.onClick(this.props.item),
    })
  }

  render() {
    return (
      <button
        className="paginated-list__action-button"
        disabled={this.state.isDisabled}
        onClick={this.onClick}
      >
        { this.props.label }
      </button>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      isDisabled: false,
    }

    this.onClick = this.onClick.bind(this)
  }
}

export default PaginatedListActionButton

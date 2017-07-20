import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class PaginatedListActionButton extends Component {
  static propTypes = {
    classNameModifier: PropTypes.string,
    item: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    classNameModifier: '',
  }

  onClick() {
    this.setState({
      isDisabled: this.props.onClick(this.props.item),
    })
  }

  render() {
    const buttonClasses = classnames([
      'button',
      'button--small-mobile',
      this.props.classNameModifier,
    ])

    return (
      <button
        className={buttonClasses}
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

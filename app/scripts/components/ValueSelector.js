import PropTypes from 'prop-types'
import React, { Component } from 'react'

class ValueSelector extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    values: PropTypes.array.isRequired,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentIndex !== this.state.currentIndex) {
      this.props.onChange(this.props.values[this.state.currentIndex].value)
    }
  }

  onPreviousClick() {
    let nextIndex = this.state.currentIndex - 1

    if (nextIndex < 0) {
      nextIndex = this.props.values.length - 1
    }

    this.setState({
      currentIndex: nextIndex,
    })
  }

  onNextClick() {
    let nextIndex = this.state.currentIndex + 1

    if (nextIndex > this.props.values.length - 1) {
      nextIndex = 0
    }

    this.setState({
      currentIndex: nextIndex,
    })
  }

  render() {
    return (
      <div className="value-selector">
        <button
          className="button value-selector__button"
          onClick={this.onPreviousClick}
        >
          &lt;
        </button>
        <div className="value-selector__value">
          { this.props.values[this.state.currentIndex].label }
        </div>
        <button
          className="button value-selector__button"
          onClick={this.onNextClick}
        >
          &gt;
        </button>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,
    }

    this.onPreviousClick = this.onPreviousClick.bind(this)
    this.onNextClick = this.onNextClick.bind(this)
  }
}

export default ValueSelector

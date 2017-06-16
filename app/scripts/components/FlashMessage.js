import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { removeMessage } from '../actions/flash'

class FlashMessage extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    lifetime: PropTypes.number.isRequired,
    removeMessage: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.startAutoLeave()
  }

  render() {
    const flashClasses = classnames(
      'flash-message',
      `flash-message--${this.props.type}`
    )

    return (
      <div className={flashClasses} onClick={this.hideMessage}>
        <div className="flash-message__content">
          { this.props.text }
        </div>
      </div>
    )
  }

  hideMessage() {
    this.props.removeMessage(this.props.id)
  }

  startAutoLeave() {
    window.setTimeout(
      this.hideMessage,
      this.props.lifetime,
    )
  }

  constructor(props) {
    super(props)

    this.hideMessage = this.hideMessage.bind(this)
  }
}

export default connect(
  null, {
    removeMessage,
  }
)(FlashMessage)

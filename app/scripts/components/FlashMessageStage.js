import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import FlashMessage from './FlashMessage'

const FLASH_DEFAULT_LIFETIME = 3000

class FlashMessageStage extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
  }

  renderFlashMessages() {
    return this.props.messages.map(message => {
      return (
        <FlashMessage
          id={message.id}
          key={message.id}
          lifetime={message.lifetime || FLASH_DEFAULT_LIFETIME}
          text={message.text}
          type={message.type}
        />
      )
    })
  }

  render() {
    return (
      <div className="flash-message-stage">
        { this.renderFlashMessages() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.flash.messages,
  }
}

export default connect(
  mapStateToProps,
)(FlashMessageStage)

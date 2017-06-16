import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import FlashMessage from './FlashMessage'

const FLASH_DEFAULT_LIFETIME = 30000
const FLASH_TRANSITION_DURATION = 300

class FlashMessageStage extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
  }

  renderFlashMessages() {
    return this.props.messages.map((message) => {
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
        <CSSTransitionGroup
          transitionEnter={true}
          transitionEnterTimeout={FLASH_TRANSITION_DURATION}
          transitionLeaveTimeout={FLASH_TRANSITION_DURATION}
          transitionName={ {
            enter: 'flash-message--enter',
            leave: 'flash-message--leave',
          } }
        >
          { this.renderFlashMessages() }
        </CSSTransitionGroup>
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

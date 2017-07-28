import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { asInfiniteList } from '../containers'
import { cachedResource } from '../services/resources'
import { fetchResource } from '../actions/resources'
import { MessageForm } from '../forms'
import { MessageListItem } from '../components'
import { sendNewMessage } from '../actions/inbox'
import { translate } from '../services/i18n'

const WrappedInfiniteList = asInfiniteList(MessageListItem)

class ConversationsShow extends Component {
  static propTypes = {
    conversationData: PropTypes.object.isRequired,
    conversationId: PropTypes.number.isRequired,
    errorMessage: PropTypes.string.isRequired,
    fetchResource: PropTypes.func.isRequired,
    isLoadingConversation: PropTypes.bool.isRequired,
    isLoadingMessage: PropTypes.bool.isRequired,
    sendNewMessage: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchResource(
      'conversations',
      this.props.conversationId
    )
  }

  onSubmit(values) {
    this.props.sendNewMessage(
      this.props.conversationId,
      values.text
    )
  }

  renderReceiverNames() {
    const names = this.props.conversationData.animals.map(
      animal => animal.name
    )

    return (
      <p>
        <strong>
          { translate('views.inbox.messageTo') }
        </strong>
        &nbsp;
        { names.join(', ') }
      </p>
    )
  }

  renderConversationHeader() {
    if (this.props.isLoadingConversation) {
      return <p>{ translate('common.loading') }</p>
    }

    return (
      <div>
        { this.renderReceiverNames() }
      </div>
    )
  }

  renderMessages() {
    return (
      <WrappedInfiniteList
        resourceName={['conversations', this.props.conversationId, 'messages']}
      />
    )
  }

  renderMessageForm() {
    return (
      <MessageForm
        errorMessage={this.props.errorMessage}
        isLoading={this.props.isLoadingMessage}
        isWithTitle={false}
        onSubmit={this.onSubmit}
      />
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.inbox.conversationTitle') }</h1>
        <Link className="button" to="/inbox">
          { translate('views.inbox.backToConversations') }
        </Link>
        <hr />
        { this.renderConversationHeader() }
        <hr />
        { this.renderMessages() }
        <hr />
        { this.renderMessageForm() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }
}

function mapStateToProps(state, ownProps) {
  const conversationId = ownProps.match.params.id
  const resource = cachedResource('conversations', conversationId)
  const {
    isLoading: isLoadingConversation,
    object: conversationData,
  } = resource
  const {
    errorMessage,
    isLoading: isLoadingMessage,
  } = state.inbox

  return {
    conversationData,
    conversationId: parseInt(conversationId, 10),
    errorMessage,
    isLoadingConversation,
    isLoadingMessage,
  }
}

export default connect(
  mapStateToProps, {
    fetchResource,
    sendNewMessage,
  }
)(ConversationsShow)

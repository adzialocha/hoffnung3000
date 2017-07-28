import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { sendNewMessage } from '../actions/inbox'
import { fetchResource } from '../actions/resources'
import { asInfiniteList } from '../containers'
import { MessageForm } from '../forms'
import { MessageListItem } from '../components'
import { translate } from '../services/i18n'

const WrappedInfiniteList = asInfiniteList(MessageListItem)

class ConversationsShow extends Component {
  static propTypes = {
    conversationData: PropTypes.object.isRequired,
    conversationId: PropTypes.number.isRequired,
    errorMessage: PropTypes.string.isRequired,
    fetchResource: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    sendNewMessage: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchResource(
      'conversations',
      this.props.conversationId
    )
  }

  onSubmit(values) {
    this.props.sendNewMessage(values.text)
  }

  renderReceiverNames() {
    const names = this.props.conversationData.animals.map(animal => animal.name)

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
        isLoading={this.props.isLoading}
        onSubmit={this.onSubmit}
      />
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.inbox.conversationTitle') }</h1>
        <hr />
        { this.renderMessages() }
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
  const resource = cachedResource('converstaions', conversationId)
  const { isLoading, object: conversationData } = resource

  return {
    conversationData,
    conversationId,
    errorMessage,
    isLoading,
  }
}

export default connect(
  mapStateToProps, {
    fetchResource,
    sendNewMessage,
  }
)(ConversationsShow)

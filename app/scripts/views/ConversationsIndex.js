import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { asInfiniteList } from '../containers'
import { ConversationListItem } from '../components'
import { translate } from '../services/i18n'

const WrappedInfiniteList = asInfiniteList(ConversationListItem)

class ConversationsIndex extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
  }

  onClick(item) {
    this.props.push(`/inbox/conversations/${item.id}`)
  }

  renderItemsList() {
    return (
      <WrappedInfiniteList
        resourceName="conversations"
        onClick={this.onClick}
      />
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.inbox.indexTitle') }</h1>
        <hr />
        { this.renderItemsList() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }
}

export default connect(
  null, {
    push,
  }
)(ConversationsIndex)

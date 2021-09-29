import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { SimpleEventListItem } from '../components'
import { asSimpleEventList } from '../containers'

const SimpleEventList = asSimpleEventList(SimpleEventListItem)

class SimpleCalendar extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
  }

  static defaultProps = {
    resourceListItems: [],
  }

  onClick(item) {
    this.props.push(`/events/${item.slug}`)
  }

  renderItemsList() {
    return (
      <SimpleEventList
        resourceName="events"
        onClick={this.onClick}
        onEditClick={this.onEditClick}
      />
    )
  }

  render() {
    return (
      <section>
        { this.renderItemsList() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }
}

function mapStateToProps(state) {
  return {
    ...state.meta,
    ...state.resourceList,
  }
}

export default connect(
  mapStateToProps, {
    push,
  }
)(SimpleCalendar)

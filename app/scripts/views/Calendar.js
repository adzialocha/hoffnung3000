import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { InfiniteListContainer, EventListItem } from '../components'
import { translate } from '../services/i18n'

class Calendar extends Component {
  renderEventsList() {
    return (
      <InfiniteListContainer
        listItemNode={this.listItem}
        resourceName="events"
      />
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.events.calendarTitle') }</h1>
        <Link className="button button--green" to="/new/event">
          { translate('views.events.createNewButton') }
        </Link>
        <hr />
        { this.renderEventsList() }
      </section>
    )
  }

  listItem(props) {
    return <EventListItem key={props.id} {...props} />
  }
}

export default Calendar

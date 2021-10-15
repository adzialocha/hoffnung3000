/* eslint-disable react/sort-comp */
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { DateTime } from 'luxon'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { fetchResourceList } from '../actions/resourceList'
import { translate } from '../../../common/services/i18n'

export default function asSimpleEventList(WrappedListItemComponent) {
  class AllEventsContainer extends Component {
    static propTypes = {
      fetchResourceList: PropTypes.func.isRequired,
      isLoading: PropTypes.bool,
      push: PropTypes.func.isRequired,
      resourceListItems: PropTypes.array,
    }

    static defaultProps = {
      isLoading: true,
      onClick: undefined,
      resourceListItems: [],
    }

    // @TODO: Update to modern React API
    /* eslint-disable-next-line camelcase */
    UNSAFE_componentWillMount() {
      this.props.fetchResourceList('events')
    }

    onClick(item) {
      this.props.push(`/events/${item.slug}`)
    }

    renderSpinner() {
      if (!this.props.isLoading) {
        return null
      }

      return (
        <p className="simple-list-container__spinner">
          { translate('common.loading') }
        </p>
      )
    }

    renderListItemContent(item) {
      return (
        <WrappedListItemComponent
          item={item}
          onClick={this.onClick}
        />
      )
    }

    renderListItems(listItems) {
      return listItems.map((item, index) => {
        const previousItem = index > 0 ? listItems[index - 1] : null
        const dateA = DateTime.fromISO(item.slots[0].from)
        const dateB = previousItem && DateTime.fromISO(previousItem.slots[0].from)
        const isSameDay = previousItem ? dateA.hasSame(dateB, 'day') : false
        const festivalStartDate = DateTime.fromObject({ year: 2020, month: 6, day: 5 })

        const itemComponent = (
          <div
            className="simple-list-container__item"
            key={index}
          >
            { this.renderListItemContent(item) }
          </div>
        )

        if (dateA < festivalStartDate) {
          return null
        }

        if (isSameDay) {
          return itemComponent
        }

        const headerComponent = (
          <div
            className="simple-list-container__item simple-list-container__item--full"
            key={`header-${index}`}
          >
            <h2 className="simple-list-container__heading">
              { DateTime.fromISO(item.slots[0].from).toFormat('dd.MM.yy') }
            </h2>

            { index > 0 ? <hr /> : null }
          </div>
        )

        return [
          headerComponent,
          itemComponent,
        ]
      })
    }

    renderNoEvent() {
      return (
        <p className="simple-list-container__spinner">
          { translate('views.places.noEvents') }
        </p>
      )
    }

    renderEventList() {
      const allEventsList = this.props.resourceListItems
      return this.renderListItems(allEventsList)
    }

    render() {
      return (
        <div className="simple-list-container__item simple-list-container__item--full">
          <h1>Calendar</h1>
          <div className="simple-list-container simple-list-container--half-items">
            { this.renderEventList() }
          </div>
        </div>
      )
    }
    constructor(props) {
      super(props)
      this.onClick = this.onClick.bind(this)
    }
  }

  function mapStateToProps(state) {
    return {
      ...state.resourceList,
    }
  }

  return connect(
    mapStateToProps, {
      fetchResourceList,
      push,
    }
  )(AllEventsContainer)
}

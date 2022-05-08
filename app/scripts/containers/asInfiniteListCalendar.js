import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { DateTime } from 'luxon'
import { connect } from 'react-redux'

import { fetchList, clearList } from '../actions/infiniteList'
import { translate } from '../../../common/services/i18n'

export default function asInfiniteListCalendar(WrappedListItemComponent) {
  class InfiniteListContainer extends Component {
    static propTypes = {
      clearList: PropTypes.func.isRequired,
      currentPageIndex: PropTypes.number,
      fetchList: PropTypes.func.isRequired,
      from: PropTypes.string,
      isLoading: PropTypes.bool,
      listItems: PropTypes.array,
      onClick: PropTypes.func,
      onEditClick: PropTypes.func,
      resourceName: PropTypes.string.isRequired,
      tags: PropTypes.array.isRequired,
      to: PropTypes.string,
      totalPageCount: PropTypes.number,
    }

    static defaultProps = {
      currentPageIndex: 0,
      isLoading: true,
      listItems: [],
      from: undefined,
      to: undefined,
      onClick: undefined,
      onEditClick: undefined,
      totalPageCount: undefined,
    }

    componentDidUpdate(prevProps) {
      if (prevProps.from !== this.props.from || prevProps.to !== this.props.to) {
        this.loadEvents()
      }
    }

    componentWillUnmount() {
      this.props.clearList(this.props.resourceName)
    }

    onLoadMoreClick() {
      this.loadEvents(true)
    }

    renderSpinner() {
      if (!this.props.isLoading) {
        return null
      }

      return (
        <p className="infinite-list-container__spinner">
          { translate('common.loading') }
        </p>
      )
    }

    renderListItemContent(item) {
      return (
        <WrappedListItemComponent
          className="list-item--half"
          item={item}
          onClick={this.props.onClick}
          onEditClick={this.props.onEditClick}
        />
      )
    }

    renderLoadMoreButton() {
      if (this.props.isLoading) {
        return null
      }

      if (this.props.currentPageIndex + 1 >= this.props.totalPageCount) {
        return null
      }

      return (
        <button
          className="button infinite-list-container__more-button"
          onClick={this.onLoadMoreClick}
        >
          { translate('views.events.loadMoreEvents') }
        </button>
      )
    }

    renderListItems(listItems) {
      if (listItems.length === 0) {
        return (
          <p className="infinite-list-container__spinner">
            { translate('components.common.emptyList') }
          </p>
        )
      }

      return listItems.map((item, index) => {
        const previousItem = index > 0 ? listItems[index - 1] : null

        const dateA = DateTime.fromISO(item.from)
        const dateB = previousItem && DateTime.fromISO(previousItem.from)
        const isSameDay = previousItem ? dateA.hasSame(dateB, 'day') : false

        const itemComponent = (
          <div
            className="infinite-list-container__item"
            key={index}
          >
            { this.renderListItemContent(item) }
          </div>
        )

        if (isSameDay) {
          return itemComponent
        }

        const headerComponent = (
          <div
            className="infinite-list-container__item infinite-list-container__item--full"
            key={`header-${index}`}
          >
            <h2 className="infinite-list-container__heading">
              { DateTime.fromISO(item.from).toFormat('dd.MM.yy') }
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

    renderEventList() {
      if (this.props.isLoading) {
        return null
      }

      // Filter allEventsList by array of tags
      if (this.props.tags.length > 0) {
        const filteredListItems = this.props.listItems.filter(event => {
          return !event.tags.some(tag => this.props.tags.includes(tag))
        })

        return this.renderListItems(filteredListItems)
      }

      // Show all events
      return this.renderListItems(this.props.listItems)
    }

    render() {
      return (
        <div className="infinite-list-container__item infinite-list-container__item--full">
          <div className="infinite-list-container infinite-list-container--half-items">
            { this.renderSpinner() }
            { this.renderEventList() }

            <div className="infinite-list-container__item infinite-list-container__item--full">
              { this.renderLoadMoreButton() }
            </div>
          </div>
        </div>
      )
    }

    // @TODO: Update to modern React API
    /* eslint-disable-next-line camelcase */
    UNSAFE_componentWillMount() {
      this.loadEvents()
    }

    loadEvents(nextPage = false) {
      const filter = {}

      if (this.props.from) {
        filter.from = this.props.from
      }

      if (this.props.to) {
        filter.to = this.props.to
      }

      const pageIndex = nextPage ? this.props.currentPageIndex + 1 : 0
      this.props.fetchList(this.props.resourceName, pageIndex, filter)
    }

    constructor(props) {
      super(props)

      this.onLoadMoreClick = this.onLoadMoreClick.bind(this)
    }
  }

  function mapStateToProps(state, props) {
    return {
      ...state.infiniteList[props.resourceName],
      ...state.meta.config,
    }
  }

  return connect(
    mapStateToProps, {
      clearList,
      fetchList,
    }
  )(InfiniteListContainer)
}

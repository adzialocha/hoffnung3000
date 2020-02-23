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
      isLoading: PropTypes.bool,
      listItems: PropTypes.array,
      onClick: PropTypes.func,
      onEditClick: PropTypes.func,
      placeIdFilter: PropTypes.number,
      resourceName: PropTypes.string.isRequired,
      totalPageCount: PropTypes.number,
    }

    static defaultProps = {
      currentPageIndex: 0,
      isLoading: true,
      listItems: [],
      onClick: undefined,
      onEditClick: undefined,
      placeIdFilter: undefined,
      totalPageCount: undefined,
    }

    componentWillMount() {
      this.props.fetchList(this.props.resourceName, 0)
    }

    componentWillUnmount() {
      this.props.clearList(this.props.resourceName)
    }

    onLoadMoreClick() {
      this.props.fetchList(
        this.props.resourceName,
        this.props.currentPageIndex + 1
      )
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
          placeIdFilter={this.props.placeIdFilter}
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

    renderListItems() {
      const { listItems, placeIdFilter } = this.props

      if (!this.props.isLoading && listItems.length === 0) {
        return (
          <p className="infinite-list-container__spinner">
            { translate('components.common.emptyList') }
          </p>
        )
      }

      return listItems.map((item, index) => {
        if ( placeIdFilter !== undefined ) {
          if ( placeIdFilter !== item.placeId ) {
            return null
          }
        }

        const previousItem = index > 0 ? listItems[index - 1] : null

        const dateA = DateTime.fromISO(item.slots[0].from)
        const dateB = previousItem && DateTime.fromISO(previousItem.slots[0].from)
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

    render() {
      return (
        <div className="infinite-list-container infinite-list-container--half-items">
          { this.renderListItems() }

          <div className="infinite-list-container__item infinite-list-container__item--full">
            { this.renderLoadMoreButton() }
          </div>
        </div>
      )
    }

    constructor(props) {
      super(props)

      this.onLoadMoreClick = this.onLoadMoreClick.bind(this)
    }
  }

  function mapStateToProps(state, props) {
    return {
      ...state.infiniteList[props.resourceName],
      ...state.infiniteList[props.placeIdFilter],
    }
  }

  return connect(
    mapStateToProps, {
      clearList,
      fetchList,
    }
  )(InfiniteListContainer)
}

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { DateTime } from 'luxon'
import { connect } from 'react-redux'

import { fetchList, clearList } from '../actions/infiniteList'
import { fetchResourceList } from '../actions/resourceList'
import { translate } from '../../../common/services/i18n'

export default function asInfiniteListCalendar(WrappedListItemComponent, TagSelector) {
  class InfiniteListContainer extends Component {
    static propTypes = {
      clearList: PropTypes.func.isRequired,
      currentPageIndex: PropTypes.number,
      defaultTags: PropTypes.array,
      fetchList: PropTypes.func.isRequired,
      fetchResourceList: PropTypes.func.isRequired,
      isLoading: PropTypes.bool,
      listItems: PropTypes.array,
      onClick: PropTypes.func,
      onEditClick: PropTypes.func,
      placeIdFilter: PropTypes.number,
      resourceListItems: PropTypes.array,
      resourceName: PropTypes.string.isRequired,
      totalPageCount: PropTypes.number,
    }

    static defaultProps = {
      currentPageIndex: 0,
      defaultTags: [],
      isLoading: true,
      listItems: [],
      onClick: undefined,
      onEditClick: undefined,
      placeIdFilter: undefined,
      resourceListItems: [],
      totalPageCount: undefined,
    }

    componentWillMount() {
      this.props.fetchList(this.props.resourceName, 0)
      this.props.fetchResourceList('events')
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

    onTagFilterChange(selectedTags) {
      return this.setState({ filterTags: selectedTags })
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

    renderTagSelector() {
      if (this.props.defaultTags.length !== 0) {
        const defaultTags = this.props.defaultTags.map(tag =>{
          return { label: tag, value: tag }
        })
        return (
          <TagSelector
            defaultTags={defaultTags}
            tagArray={this.state.filterTags}
            onChange={this.onTagFilterChange}
          />
        )
      } return null
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

    renderEventList() {
      const paginatedListItems = this.props.listItems
      const allEventsList = this.props.resourceListItems

      if (!this.props.isLoading && (paginatedListItems.length === 0 || allEventsList.length === 0)) {
        return (
          <p className="infinite-list-container__spinner">
            { translate('components.common.emptyList') }
          </p>
        )
      }

      // filter allEventsList by array of tags
      const filterTags = this.state.filterTags
      const filteredListItems = allEventsList.filter(event => {
        if (event.tags) {
          return event.tags.some(tag => filterTags.includes(tag))
        }
        return null
      })
      if (filterTags.length !== 0) {
        // show filtered list
        return this.renderListItems(filteredListItems)
      }
      // show paginated list
      return this.renderListItems(paginatedListItems)
    }

    render() {
      return (
        <div className="infinite-list-container__item infinite-list-container__item--full">
          <h3>{ translate('views.events.tagSelectorTitle') }</h3>
          { this.renderTagSelector() }
          <div className="infinite-list-container infinite-list-container--half-items">
            { this.renderEventList() }

            <div className="infinite-list-container__item infinite-list-container__item--full">
              { this.renderLoadMoreButton() }
            </div>
          </div>
        </div>
      )
    }
    constructor(props) {
      super(props)
      this.state = {
        filterTags: [],
      }

      this.onTagFilterChange = this.onTagFilterChange.bind(this)
      this.onLoadMoreClick = this.onLoadMoreClick.bind(this)
    }
  }

  function mapStateToProps(state, props) {
    return {
      ...state.infiniteList[props.resourceName],
      ...state.infiniteList[props.placeIdFilter],
      ...state.resourceList,
      ...state.meta.config,

    }
  }

  return connect(
    mapStateToProps, {
      clearList,
      fetchList,
      fetchResourceList,
    }
  )(InfiniteListContainer)
}

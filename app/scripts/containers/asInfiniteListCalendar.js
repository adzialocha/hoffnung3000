import dateFns from 'date-fns'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchList, clearList } from '../actions/infiniteList'
import { translate } from '../services/i18n'

export default function asInfiniteListCalendar(WrappedListItemComponent) {
  class InfiniteListContainer extends Component {
    static propTypes = {
      clearList: PropTypes.func.isRequired,
      currentPageIndex: PropTypes.number.isRequired,
      fetchList: PropTypes.func.isRequired,
      isLoading: PropTypes.bool.isRequired,
      listItems: PropTypes.array.isRequired,
      onClick: PropTypes.func,
      onEditClick: PropTypes.func,
      resourceName: PropTypes.string.isRequired,
      totalPageCount: PropTypes.number,
    }

    static defaultProps = {
      onClick: undefined,
      onEditClick: undefined,
      totalPageCount: undefined,
    }

    componentWillMount() {
      this.props.fetchList(this.props.resourceName, 0)
    }

    componentWillUnmount() {
      this.props.clearList()
    }

    onClickMore() {
      this.props.fetchList(
        this.props.resourceName,
        this.props.currentPageIndex + 1,
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
          onClick={this.props.onClick}
          onEditClick={this.props.onEditClick}
        />
      )
    }

    renderLoadMoreButton() {
      if (this.props.isLoading) {
        return null
      }

      if (this.props.currentPageIndex === this.props.totalPageCount) {
        return null
      }

      return (
        <button onClick={this.onClickMore}>
          { translate('views.events.loadMoreEvents') }
        </button>
      )
    }

    renderListItems() {
      const { listItems } = this.props

      return listItems.map((item, index) => {
        const nextItem = index < listItems.length ? listItems[index + 1] : null

        const isSameDay = nextItem ? dateFns.isSameDay(
          item.slots[item.slots.length - 1].to,
          nextItem.slots[0].from,
        ) : false

        let headerComponent

        if (!isSameDay || index === 0) {
          headerComponent = (
            <div
              className="infinite-list-container__item infinite-list-container__item--full"
              key={`header-${index}`}
            >
              <h2 className="infinite-list-container__heading">
                { dateFns.format(item.slots[0].to, 'DD.MM.YY') }
              </h2>
              { index > 0 ? <hr /> : null }
            </div>
          )
        }

        return [
          headerComponent,
          (
            <div
              className="infinite-list-container__item"
              key={index}
            >
              { this.renderListItemContent(item) }
            </div>
          ),
        ]
      })
    }

    render() {
      return (
        <div
          className="infinite-list-container infinite-list-container--half-items"
        >
          { this.renderListItems() }
          <div
            className="infinite-list-container__item infinite-list-container__item--full"
          >
            { this.renderLoadMoreButton() }
          </div>
        </div>
      )
    }

    constructor(props) {
      super(props)

      this.onClickMore = this.onClickMore.bind(this)
    }
  }

  function mapStateToProps(state) {
    return state.infiniteList
  }

  return connect(
    mapStateToProps, {
      clearList,
      fetchList,
    }
  )(InfiniteListContainer)
}

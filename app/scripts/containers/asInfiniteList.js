import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchList, clearList } from '../actions/infiniteList'
import { translate } from '../../../common/services/i18n'

export default function asInfiniteList(WrappedListItemComponent) {
  class InfiniteListContainer extends Component {
    static propTypes = {
      clearList: PropTypes.func.isRequired,
      currentPageIndex: PropTypes.number.isRequired,
      fetchList: PropTypes.func.isRequired,
      filter: PropTypes.object,
      input: PropTypes.object,
      isInModal: PropTypes.bool,
      isLoading: PropTypes.bool.isRequired,
      listItems: PropTypes.array.isRequired,
      onClick: PropTypes.func,
      onEditClick: PropTypes.func,
      resourceName: PropTypes.any.isRequired,
      totalPageCount: PropTypes.number,
    }

    static defaultProps = {
      filter: {},
      input: undefined,
      isInModal: false,
      onClick: undefined,
      onEditClick: undefined,
      totalPageCount: undefined,
    }

    componentWillMount() {
      this.props.fetchList(
        this.props.resourceName,
        0,
        this.props.filter
      )
    }

    componentWillUnmount() {
      this.props.clearList()
    }

    onLoadMoreClick() {
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
          input={this.props.input}
          item={item}
          onClick={this.props.onClick}
          onEditClick={this.props.onEditClick}
        />
      )
    }

    renderListItems() {
      if (!this.props.isLoading && this.props.listItems.length === 0) {
        return <p>{ translate('components.common.emptyList') }</p>
      }

      return this.props.listItems.map((item, index) => {
        return (
          <div className="infinite-list-container__item" key={index}>
            { this.renderListItemContent(item) }
          </div>
        )
      })
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
          { translate('common.loadMore') }
        </button>
      )
    }

    render() {
      const listClasses = classnames(
        'infinite-list-container', {
          'infinite-list-container--in-modal': this.props.isInModal,
        }
      )

      return (
        <div className={listClasses}>
          { this.renderListItems() }
          { this.renderSpinner() }
          { this.renderLoadMoreButton() }
        </div>
      )
    }

    constructor(props) {
      super(props)

      this.onLoadMoreClick = this.onLoadMoreClick.bind(this)
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

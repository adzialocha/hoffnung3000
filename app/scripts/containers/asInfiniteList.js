import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { fetchList, clearList } from '../actions/infiniteList'
import { translate } from '../../../common/services/i18n'

export default function asInfiniteList(WrappedListItemComponent) {
  class InfiniteListContainer extends Component {
    static propTypes = {
      clearList: PropTypes.func.isRequired,
      currentPageIndex: PropTypes.number,
      fetchList: PropTypes.func.isRequired,
      filter: PropTypes.object,
      input: PropTypes.object,
      isInModal: PropTypes.bool,
      isLoading: PropTypes.bool,
      listItems: PropTypes.array,
      onClick: PropTypes.func,
      onEditClick: PropTypes.func,
      resourceName: PropTypes.any.isRequired,
      totalPageCount: PropTypes.number,
    }

    static defaultProps = {
      currentPageIndex: 0,
      filter: {},
      input: undefined,
      isInModal: false,
      isLoading: true,
      listItems: [],
      onClick: undefined,
      onEditClick: undefined,
      totalPageCount: undefined,
    }

    componentDidMount() {
      this.props.fetchList(
        this.props.resourceName,
        0,
        this.props.filter
      )
    }

    componentWillUnmount() {
      this.props.clearList(this.props.resourceName)
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
      if (this.props.isLoading) {
        return null
      }

      if (this.props.listItems.length === 0) {
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
      if (this.props.isLoading) {
        return null
      }

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

  function mapStateToProps(state, props) {
    return {
      ...state.infiniteList[props.resourceName],
    }
  }

  return connect(
    mapStateToProps, {
      clearList,
      fetchList,
    }
  )(InfiniteListContainer)
}

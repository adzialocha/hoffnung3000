import classnames from 'classnames'
import Infinite from 'react-infinite'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchList, clearList } from '../actions/infiniteList'
import { translate } from '../services/i18n'

export default function asInfiniteList(WrappedListItemComponent) {
  class InfiniteListContainer extends Component {
    static propTypes = {
      className: PropTypes.string,
      clearList: PropTypes.func.isRequired,
      containerHeight: PropTypes.number,
      currentPageIndex: PropTypes.number.isRequired,
      fetchList: PropTypes.func.isRequired,
      filter: PropTypes.object,
      input: PropTypes.object,
      isLoading: PropTypes.bool.isRequired,
      listItemClassName: PropTypes.string,
      listItemHeight: PropTypes.number,
      listItems: PropTypes.array.isRequired,
      onClick: PropTypes.func,
      onEditClick: PropTypes.func,
      resourceName: PropTypes.string.isRequired,
      totalPageCount: PropTypes.number,
      useWindowAsScrollContainer: PropTypes.bool,
    }

    static defaultProps = {
      className: '',
      containerHeight: undefined,
      filter: {},
      input: undefined,
      listItemClassName: '',
      listItemHeight: 175,
      onClick: undefined,
      onEditClick: undefined,
      totalPageCount: undefined,
      useWindowAsScrollContainer: true,
    }

    componentWillMount() {
      this.props.fetchList(this.props.resourceName, 0, this.props.filter)
    }

    componentWillUnmount() {
      this.props.clearList()
    }

    onInfiniteLoad() {
      if (this.props.isLoading) {
        return
      }

      if (this.props.currentPageIndex === this.props.totalPageCount) {
        return
      }

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

    renderListItems() {
      return this.props.listItems.map((item, index) => {
        return (
          <WrappedListItemComponent
            className={this.props.listItemClassName}
            input={this.props.input}
            item={item}
            key={index}
            onClick={this.props.onClick}
            onEditClick={this.props.onEditClick}
          />
        )
      })
    }

    render() {
      const infiniteListClasses = classnames(
        'infinite-list-container',
        this.props.className, {
          'infinite-list-container--in-modal': (
            !this.props.useWindowAsScrollContainer
          ),
        }
      )

      return (
        <Infinite
          className={infiniteListClasses}
          containerHeight={this.props.containerHeight}
          elementHeight={this.props.listItemHeight}
          infiniteLoadBeginEdgeOffset={this.props.listItemHeight}
          isInfiniteLoading={this.props.isLoading}
          loadingSpinnerDelegate={this.renderSpinner()}
          useWindowAsScrollContainer={
            this.props.useWindowAsScrollContainer
          }
          onInfiniteLoad={this.onInfiniteLoad}
        >
          { this.renderListItems() }
        </Infinite>
      )
    }

    constructor(props) {
      super(props)

      this.onInfiniteLoad = this.onInfiniteLoad.bind(this)
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

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchList } from '../actions/paginatedList'

class PaginatedListNavigation extends Component {
  static propTypes = {
    currentPageIndex: PropTypes.number.isRequired,
    fetchList: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    resourceName: PropTypes.string.isRequired,
    totalPageCount: PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.props.fetchList(this.props.resourceName)
  }

  onPreviousPageClick() {
    this.props.fetchList(
      this.props.resourceName,
      this.props.currentPageIndex - 1
    )
  }

  onNextPageClick() {
    this.props.fetchList(
      this.props.resourceName,
      this.props.currentPageIndex + 1
    )
  }

  render() {
    return (
      <div className="paginated-list-navigation">
        <button
          className="paginated-list-navigation__button"
          disabled={this.props.isLoading || !this.hasPreviousPage()}
          onClick={this.onPreviousPageClick}
        >
          &lt;
        </button>
        <div className="paginated-list-navigation__indicator">
          { this.props.currentPageIndex + 1 }
        </div>
        <button
          className="paginated-list-navigation__button"
          disabled={this.props.isLoading || !this.hasNextPage()}
          onClick={this.onNextPageClick}
        >
          &gt;
        </button>
      </div>
    )
  }

  hasNextPage() {
    return this.props.currentPageIndex < this.props.totalPageCount
  }

  hasPreviousPage() {
    return this.props.currentPageIndex > 0
  }

  constructor(props) {
    super(props)

    this.onPreviousPageClick = this.onPreviousPageClick.bind(this)
    this.onNextPageClick = this.onNextPageClick.bind(this)
  }
}

function mapStateToProps(state) {
  const { currentPageIndex, isLoading, totalPageCount } = state.paginatedList
  return {
    currentPageIndex,
    isLoading,
    totalPageCount,
  }
}

export default connect(
  mapStateToProps, {
    fetchList,
  }
)(PaginatedListNavigation)

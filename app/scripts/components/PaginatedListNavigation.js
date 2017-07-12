import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { fetchList } from '../actions/paginatedList'

class PaginatedListNavigation extends Component {
  static propTypes = {
    currentPageIndex: PropTypes.number.isRequired,
    fetchList: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    resourceName: PropTypes.string.isRequired,
    totalPageCount: PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.props.fetchList(
      this.props.resourceName,
      this.props.currentPageIndex - 1
    )
  }

  onPreviousPageClick() {
    const previousPage = this.props.currentPageIndex - 1
    this.props.push(`/admin/${this.props.resourceName}/all/${previousPage}`)
  }

  onNextPageClick() {
    const nextPage = this.props.currentPageIndex + 1
    this.props.push(`/admin/${this.props.resourceName}/all/${nextPage}`)
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
          { this.props.currentPageIndex }
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
    return this.props.currentPageIndex < this.props.totalPageCount + 1
  }

  hasPreviousPage() {
    return this.props.currentPageIndex > 1
  }

  constructor(props) {
    super(props)

    this.onPreviousPageClick = this.onPreviousPageClick.bind(this)
    this.onNextPageClick = this.onNextPageClick.bind(this)
  }
}

function mapStateToProps(state) {
  const { isLoading, totalPageCount } = state.paginatedList

  return {
    isLoading,
    totalPageCount,
  }
}

export default connect(
  mapStateToProps, {
    fetchList,
    push,
  }
)(PaginatedListNavigation)

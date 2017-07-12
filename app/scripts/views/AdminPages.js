import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import { deleteResource } from '../actions/resources'
import { notification } from '../actions/flash'
import { PaginatedList, PaginatedListNavigation } from '../components'
import { removeFromList } from '../actions/paginatedList'

class AdminPages extends Component {
  static propTypes = {
    currentPageIndex: PropTypes.number.isRequired,
    deleteResource: PropTypes.func.isRequired,
    notification: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    removeFromList: PropTypes.func.isRequired,
  }

  onEditClick(page) {
    this.props.push(`/admin/pages/${page.id}/edit`)
  }

  onDeleteClick(page) {
    if (!page.isRemovable) {
      window.alert('Sorry, this page is not removable.') // eslint-disable-line no-alert
      return true
    }

    const userIsSure = window.confirm('Are you sure?') // eslint-disable-line no-alert
    if (!userIsSure) {
      return false
    }

    this.props.deleteResource('pages', page.id)
    this.props.removeFromList(page.id)
    this.props.notification('Page was deleted successfully')

    return true
  }

  render() {
    const tableColumns = [
      { key: '$index', title: '#' },
      { key: 'title', title: 'Title' },
      { key: 'slug', title: 'slug' },
    ]

    const tableActions = [
      {
        title: 'Edit',
        isAdmin: true,
        onClick: this.onEditClick,
      },
      {
        title: 'Delete',
        isAdmin: true,
        classNameModifier: 'button--red',
        onClick: this.onDeleteClick,
      },
    ]

    return (
      <section>
        <h1>Pages</h1>
        <PaginatedList
          actions={tableActions}
          columns={tableColumns}
          onSelect={this.onEditClick}
        />
        <div className="bar">
          <div className="bar__cell bar__cell--align-left">
            <PaginatedListNavigation
              currentPageIndex={this.props.currentPageIndex}
              resourceName="pages"
            />
          </div>
          <div className="bar__cell bar__cell--align-right">
            <Link className="button button--blue" to="/admin/pages/new">New Page</Link>
          </div>
        </div>
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onEditClick = this.onEditClick.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }
}

function mapStateToProps(state, ownProps) {
  const currentPageIndex = 'currentPageIndex' in ownProps.match.params ? parseInt(ownProps.match.params.currentPageIndex, 10) : 0

  return {
    currentPageIndex,
  }
}

export default connect(
  mapStateToProps, {
    deleteResource,
    notification,
    push,
    removeFromList,
  }
)(AdminPages)

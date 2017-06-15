import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import { deleteResource } from '../actions/resources'
import { PaginatedList, PaginatedListNavigation } from '../components'
import { removeFromList } from '../actions/paginatedList'

class AdminPages extends Component {
  static propTypes = {
    deleteResource: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    removeFromList: PropTypes.func.isRequired,
  }

  onEditClick(page) {
    this.props.push(`/admin/pages/${page.id}/edit`)
  }

  onDeleteClick(page) {
    const userIsSure = window.confirm('Are you sure?') // eslint-disable-line no-alert
    if (!userIsSure) {
      return false
    }

    this.props.deleteResource('pages', page.id)
    this.props.removeFromList(page.id)

    return true
  }

  render() {
    const tableColumns = [
      { key: 'id', title: '#' },
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
            <PaginatedListNavigation resourceName="pages" />
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

export default connect(
  null, {
    deleteResource,
    push,
    removeFromList,
  }
)(AdminPages)

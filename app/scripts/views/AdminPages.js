import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import { deletePage } from '../actions/pages'
import { PaginatedList, PaginatedListNavigation } from '../components'

class AdminPages extends Component {
  static propTypes = {
    deletePage: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  onEditClick(page) {
    this.props.push(`/admin/pages/${page.slug}/edit`)
  }

  onDeleteClick(page) {
    this.props.deletePage(page.slug)
  }

  render() {
    const tableColumns = [
      { key: 'id', title: '#' },
      { key: 'title', title: 'Title' },
      { key: 'slug', title: 'slug' },
    ]

    const tableActions = [
      { title: 'Edit', isAdmin: true, onClick: this.onEditClick },
      { title: 'Delete', isAdmin: true, onClick: this.onDeleteClick },
    ]

    return (
      <section>
        <h1>Pages</h1>
        <Link className="button" to="/admin/pages/new">New Page</Link>
        <PaginatedList
          actions={tableActions}
          columns={tableColumns}
          onSelect={this.onEditClick}
        />
        <PaginatedListNavigation resourceName="pages" />
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
    deletePage,
    push,
  }
)(AdminPages)

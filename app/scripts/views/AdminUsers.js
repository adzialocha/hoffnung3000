import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import { deleteResource } from '../actions/resources'
import { PaginatedList, PaginatedListNavigation } from '../components'
import { removeFromList } from '../actions/paginatedList'

class AdminUsers extends Component {
  static propTypes = {
    deleteResource: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    removeFromList: PropTypes.func.isRequired,
  }

  onEditClick(user) {
    this.props.push(`/admin/users/${user.id}/edit`)
  }

  onDeleteClick(user) {
    const userIsSure = window.confirm('Are you sure?') // eslint-disable-line no-alert
    if (!userIsSure) {
      return false
    }

    this.props.deleteResource('users', user.id)
    this.props.removeFromList(user.id)
  }

  render() {
    const tableColumns = [
      { key: 'id', title: '#' },
      { key: 'firstname', title: 'Firstname' },
      { key: 'email', title: 'Email' },
      { key: 'isParticipant', title: 'Participant' },
      { key: 'isAdmin', title: 'Admin' },
    ]

    const tableActions = [
      { title: 'Edit', isAdmin: true, onClick: this.onEditClick },
      { title: 'Delete', isAdmin: true, onClick: this.onDeleteClick },
    ]

    return (
      <section>
        <h1>Users</h1>
        <Link className="button" to="/admin/users/new">New User</Link>
        <PaginatedList
          actions={tableActions}
          columns={tableColumns}
          onSelect={this.onEditClick}
        />
        <PaginatedListNavigation resourceName="users" />
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
)(AdminUsers)

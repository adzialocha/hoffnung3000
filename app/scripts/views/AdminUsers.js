import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import { deleteResource } from '../actions/resources'
import { notification } from '../actions/flash'
import { PaginatedList, PaginatedListNavigation } from '../components'
import { removeFromList } from '../actions/paginatedList'

class AdminUsers extends Component {
  static propTypes = {
    deleteResource: PropTypes.func.isRequired,
    notification: PropTypes.func.isRequired,
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
    this.props.notification('User was deleted successfully')

    return true
  }

  render() {
    const tableColumns = [
      { key: 'id', title: '#' },
      { key: 'firstname', title: 'Firstname' },
      { key: 'email', title: 'Email' },
      { key: 'isParticipant', title: 'Participant' },
      { key: 'isVisitor', title: 'Visitor' },
      { key: 'isAdmin', title: 'Admin' },
      { key: 'isActive', title: 'Active' },
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
        <h1>Users</h1>
        <PaginatedList
          actions={tableActions}
          columns={tableColumns}
          onSelect={this.onEditClick}
        />
        <div className="bar">
          <div className="bar__cell bar__cell--align-left">
            <PaginatedListNavigation resourceName="users" />
          </div>
          <div className="bar__cell bar__cell--align-right">
            <Link className="button button--blue" to="/admin/users/new">New User</Link>
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
    notification,
    push,
    removeFromList,
  }
)(AdminUsers)

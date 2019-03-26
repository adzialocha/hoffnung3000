import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'

import { deleteResource } from '../actions/resources'
import { notification } from '../actions/flash'
import { PaginatedList, PaginatedListNavigation } from '../components'
import { removeFromList } from '../actions/paginatedList'

class AdminUsers extends Component {
  static propTypes = {
    currentPageIndex: PropTypes.number.isRequired,
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
      { key: '$index', title: '#' },
      { key: 'firstname', title: 'Firstname' },
      { key: 'email', title: 'Email' },
      { key: 'isParticipant', title: 'Participant' },
      { key: 'isVisitor', title: 'Visitor' },
      { key: 'isAdmin', title: 'Admin' },
      { key: 'isActive', title: 'Active' },
    ]

    const tableActions = [
      {
        isAdmin: true,
        onClick: this.onEditClick,
        title: 'Edit',
      },
      {
        classNameModifier: 'button--red',
        isAdmin: true,
        isDeleteAction: true,
        onClick: this.onDeleteClick,
        title: 'Delete',
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
            <PaginatedListNavigation
              currentPageIndex={this.props.currentPageIndex}
              resourceName="users"
            />
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
)(AdminUsers)

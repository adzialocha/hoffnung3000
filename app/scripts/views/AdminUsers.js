import React, { Component } from 'react'
import { connect } from 'react-redux'

import { PaginatedList, PaginatedListNavigation } from '../components'

class AdminUsers extends Component {
  onEditClick(user) {
    this.props.push(`/admin/users/${user.id}/edit`)
  }

  onDeleteClick(user) {
    console.log('delete', user)
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
  }
)(AdminUsers)

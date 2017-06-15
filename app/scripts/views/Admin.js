import React, { Component } from 'react'
import { Route } from 'react-router'
import { NavLink } from 'react-router-dom'

import {
  AdminPages,
  AdminPagesEditForm,
  AdminPagesNewForm,
  AdminUsers,
} from './'

class Admin extends Component {
  render() {
    return (
      <div>
        <section>
          <NavLink className="button" to="/admin/users/all">Users</NavLink>
          <NavLink className="button" to="/admin/pages/all">Pages</NavLink>
        </section>
        <Route component={AdminUsers} path="/admin/users/all" />
        <Route component={AdminPages} path="/admin/pages/all" />
        <Route component={AdminPagesNewForm} path="/admin/pages/new" />
        <Route component={AdminPagesEditForm} path="/admin/pages/:resourceId/edit" />
      </div>
    )
  }
}

export default Admin

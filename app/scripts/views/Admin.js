import React, { Component } from 'react'
import { Route } from 'react-router'
import { NavLink } from 'react-router-dom'

import {
  AdminPages,
  AdminPagesEditForm,
  AdminPagesNewForm,
  AdminUsers,
  AdminUsersEditForm,
  AdminUsersNewForm,
} from './'

class Admin extends Component {
  render() {
    return (
      <div>
        <Route component={AdminUsers} path="/admin/users/all" />
        <Route component={AdminUsersNewForm} path="/admin/users/new" />
        <Route component={AdminUsersEditForm} path="/admin/users/:resourceId/edit" />
        <Route component={AdminPages} path="/admin/pages/all" />
        <Route component={AdminPagesNewForm} path="/admin/pages/new" />
        <Route component={AdminPagesEditForm} path="/admin/pages/:resourceId/edit" />
        <section>
          <hr />
          <ul className="inline-navigation">
            <li className="inline-navigation__item">
              <strong>Admin</strong>
            </li>
            <li className="inline-navigation__item">
              <NavLink to="/admin/users/all">Users</NavLink>
            </li>
            <li className="inline-navigation__item">
              <NavLink to="/admin/pages/all">Pages</NavLink>
            </li>
          </ul>
        </section>
      </div>
    )
  }
}

export default Admin

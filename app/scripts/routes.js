import React, { Component } from 'react'
import { Route } from 'react-router'
import { isAdmin, shouldNotBeAuthenticated } from './auth'

import {
  Admin,
  AdminPages,
  AdminPagesEditForm,
  AdminPagesNewForm,
  AdminUsers,
  Calendar,
  Home,
  Login,
  Page,
  Register,
} from './views'

export default class Routes extends Component {
  render() {
    return (
      <main role="main">
        <Route component={Home} exact={true} path="/" />
        <Route component={shouldNotBeAuthenticated(Login)} path="/login" />
        <Route component={shouldNotBeAuthenticated(Register)} path="/register" />
        <Route component={Calendar} path="/calendar" />
        <Route component={Page} path="/pages/:slug" />
        <Route component={isAdmin(Admin)} path="/admin" />
        <Route component={isAdmin(AdminUsers)} path="/admin/users/all" />
        <Route component={isAdmin(AdminPages)} path="/admin/pages/all" />
        <Route component={isAdmin(AdminPagesNewForm)} path="/admin/pages/new" />
        <Route component={isAdmin(AdminPagesEditForm)} path="/admin/pages/:pageSlug/edit" />
      </main>
    )
  }
}

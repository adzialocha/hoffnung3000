import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Admin extends Component {
  render() {
    return (
      <section>
        <NavLink className="button" to="/admin/users/all">Users</NavLink>
        <NavLink className="button" to="/admin/pages/all">Pages</NavLink>
      </section>
    )
  }
}

export default Admin

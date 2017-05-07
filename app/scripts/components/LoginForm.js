import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { login } from '../actions/auth'

class LoginForm extends Component {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
  }

  renderErrorMessage() {
    if (this.props.errorMessage) {
      return (<p>{ this.props.errorMessage }</p>)
    }
    return null
  }

  render() {
    return (
      <form disabled={this.props.isLoading} onSubmit={this.handleSubmit}>
        { this.renderErrorMessage() }
        <label>
          Email address:
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <input className="button" type="submit" value="Login" />
      </form>
    )
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.login(this.state.email, this.state.password)
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
}

function mapStateToProps(state) {
  const { errorMessage, isLoading } = state.auth
  return {
    errorMessage,
    isLoading,
  }
}

export default connect(
  mapStateToProps, {
    login,
  }
)(LoginForm)

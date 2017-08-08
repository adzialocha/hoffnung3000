import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeProfile } from '../actions/user'
import { ProfileForm } from '../forms'
import { translate } from '../../../common/services/i18n'

class Profile extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    changeProfile: PropTypes.func.isRequired,
  }

  static defaultProps = {
    errorMessage: '',
  }

  onSubmit(values) {
    this.props.changeProfile(values.password, values.newPassword)
  }

  renderForm() {
    return (
      <ProfileForm
        errorMessage={this.props.errorMessage}
        isLoading={this.props.isLoading}
        onSubmit={this.onSubmit}
      />
    )
  }

  render() {
    return (
      <section className="form">
        <h1>{ translate('views.profile.title') }</h1>
        <hr />
        { this.renderForm() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }
}

function mapStateToProps(state) {
  const { isLoading, errorMessage } = state.user

  return {
    errorMessage,
    isLoading,
  }
}

export default connect(
  mapStateToProps, {
    changeProfile,
  }
)(Profile)

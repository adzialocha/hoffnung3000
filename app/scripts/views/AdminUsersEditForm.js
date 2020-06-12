import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import pick from '../../../common/utils/pick'
import { UserForm } from '../forms'
import { cachedResource } from '../services/resources'
import { fetchResource, updateResource } from '../actions/resources'

const permittedFields = [
  'city',
  'cityCode',
  'country',
  'email',
  'firstname',
  'isAdmin',
  'isActive',
  'isParticipant',
  'isVisitor',
  'lastname',
  'phone',
  'street',
]

class AdminUsersEditForm extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    fetchResource: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    resourceData: PropTypes.object.isRequired,
    resourceId: PropTypes.string.isRequired,
    updateResource: PropTypes.func.isRequired,
  }

  static defaultProps = {
    errorMessage: '',
  }

  componentDidMount() {
    this.props.fetchResource('users', this.props.resourceId)
  }

  onSubmit(values) {
    const flash = {
      text: 'Successfully updated user',
    }

    this.props.updateResource('users', this.props.resourceId, pick(permittedFields, values), flash)
  }

  renderMeta() {
    if (this.props.isLoading) {
      return null
    }

    const DATE_FORMAT = 'dd.MM.yyyy HH:mm:ss'

    const createdAt = DateTime.fromISO(this.props.resourceData.createdAt)
    const updatedAt = DateTime.fromISO(this.props.resourceData.updatedAt)

    return (
      <div className="left">
        <hr />

        <code>
          ID: { this.props.resourceData.id }<br />
          Created at: { createdAt.toFormat(DATE_FORMAT) }<br />
          Updated at: { updatedAt.toFormat(DATE_FORMAT) }<br />
          Payment Method: { this.props.resourceData.paymentMethod }<br />
          Payment ID: { this.props.resourceData.paymentId }
        </code>
      </div>
    )
  }

  renderForm() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>
    }

    return (
      <UserForm
        errorMessage={this.props.errorMessage}
        initialValues={this.props.resourceData}
        onSubmit={this.onSubmit}
      />
    )
  }

  render() {
    return (
      <section className="form">
        <h1>Edit User { this.title() }</h1>
        <Link className="button" to="/admin/users/all/1">Back to overview</Link>
        { this.renderMeta() }
        <hr />
        { this.renderForm() }
      </section>
    )
  }

  title() {
    const { firstname } = this.props.resourceData

    if (!(firstname && firstname.length > 0)) {
      return ''
    }

    return `"${this.props.resourceData.firstname}"`
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }
}

function mapStateToProps(state, ownProps) {
  const { errorMessage } = state.resources
  const { resourceId } = ownProps.match.params
  const resource = cachedResource('users', resourceId)
  const { isLoading, object } = resource

  return {
    errorMessage,
    isLoading,
    resourceData: object,
    resourceId,
  }
}

export default connect(
  mapStateToProps, {
    fetchResource,
    updateResource,
  }
)(AdminUsersEditForm)

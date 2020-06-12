import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import pick from '../../../common/utils/pick'
import { cachedResource } from '../services/resources'
import { createResource } from '../actions/resources'
import { PageForm } from '../forms'

const permittedFields = [
  'slug',
  'title',
  'content',
]

class AdminPagesNewForm extends Component {
  static propTypes = {
    createResource: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    nextRandomId: PropTypes.string.isRequired,
  }

  onSubmit(values) {
    const flash = {
      text: 'Successfully created new page',
    }

    this.props.createResource(
      'pages',
      this.props.nextRandomId,
      pick(permittedFields, values),
      flash,
      '/admin/pages/all'
    )
  }

  render() {
    return (
      <section>
        <h1>New Page</h1>
        <Link className="button" to="/admin/pages/all/1">Back to overview</Link>
        <hr />

        <PageForm
          errorMessage={this.props.errorMessage}
          isLoading={this.props.isLoading}
          onSubmit={this.onSubmit}
        />
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }
}

function mapStateToProps(state) {
  const { errorMessage, nextRandomId } = state.resources
  const { isLoading } = cachedResource('pages', nextRandomId, true)

  return {
    errorMessage,
    isLoading,
    nextRandomId,
  }
}

export default connect(
  mapStateToProps, {
    createResource,
  }
)(AdminPagesNewForm)

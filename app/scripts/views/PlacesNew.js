import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { cachedResource } from '../services/resources'
import { createResource } from '../actions/resources'
import { PlaceForm } from '../forms'

class PlacesNew extends Component {
  static propTypes = {
    createResource: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    nextRandomId: PropTypes.string.isRequired,
  }

  onSubmit(values) {
    console.log(values)
    // const flash = {
    //   text: 'You successfully created a new place',
    // }

    // this.props.createResource(
    //   'places',
    //   this.props.nextRandomId,
    //   values,
    //   flash,
    //   '/places'
    // )
  }

  render() {
    return (
      <section>
        <h1>Create a new place</h1>
        <Link className="button" to="/places">Back to overview</Link>
        <hr />
        <PlaceForm
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
  const { isLoading } = cachedResource('places', nextRandomId)

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
)(PlacesNew)

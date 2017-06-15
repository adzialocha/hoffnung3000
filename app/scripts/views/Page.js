import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { StaticPage } from '../components'

class Page extends Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
  }

  render() {
    return (
      <section>
        <StaticPage slug={this.props.slug} />
      </section>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    slug: ownProps.match.params.slug,
  }
}

export default connect(
  mapStateToProps
)(Page)

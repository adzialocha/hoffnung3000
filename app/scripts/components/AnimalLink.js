import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { translate } from '../services/i18n'

class AnimalLink extends Component {
  static propTypes = {
    animal: PropTypes.object.isRequired,
  }

  render() {
    const query = {
      receiverAnimals: [this.props.animal],
    }

    return (
      <span>
        { translate('common.by') }
        &nbsp;
        <Link to={ { pathname: '/inbox/new', query } }>
          { this.props.animal.name }
        </Link>
      </span>
    )
  }
}

export default AnimalLink

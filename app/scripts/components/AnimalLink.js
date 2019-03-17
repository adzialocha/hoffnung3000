import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import withConfig from '../containers/withConfig'
import { translate } from '../../../common/services/i18n'

class AnimalLink extends Component {
  static propTypes = {
    animal: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    isWithoutBy: PropTypes.bool,
  }

  static defaultProps = {
    isWithoutBy: false,
  }

  renderBy() {
    if (this.props.isWithoutBy) {
      return null
    }

    return (
      <span>
        { translate('common.by') }
        &nbsp;
      </span>
    )
  }

  renderName() {
    if (
      this.props.config.isAnonymizationEnabled ||
      !this.props.animal.userName
    ) {
      return this.props.animal.name
    }

    return this.props.animal.userName
  }

  render() {
    const query = {
      receiverAnimals: [this.props.animal],
    }

    return (
      <span>
        { this.renderBy() }

        <Link to={ { pathname: '/inbox/new', query } }>
          { this.renderName() }
        </Link>
      </span>
    )
  }
}

export default withConfig(AnimalLink)

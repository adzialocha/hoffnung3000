import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Drawer extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,
    right: PropTypes.bool,
  }

  static defaultProps = {
    right: false,
  }

  render() {
    const drawerClasses = classnames(
      'drawer', {
        'drawer--expanded': this.props.expanded,
        'drawer--right': this.props.right,
      }
    )

    return (
      <div className={drawerClasses}>
        {this.props.children}
      </div>
    )
  }
}

export default Drawer

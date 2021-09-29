import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'

export default function asSimpleEventListItem(WrappedListItemComponent) {
  return class SimpleListItemContainer extends Component {
    static propTypes = {
      className: PropTypes.string,
      input: PropTypes.object,
      item: PropTypes.object.isRequired,
      onClick: PropTypes.func,
    }

    static defaultProps = {
      className: '',
      input: undefined,
      onClick: undefined,
    }

    onClick() {
      if (!this.props.onClick) {
        return
      }

      this.props.onClick(this.props.item)
    }

    render() {
      const listClasses = classnames(
        'simple-list-item',
        this.props.className, {
          'simple-list-item--clickable': (this.props.onClick !== undefined),
        }
      )

      return (
        <div className={listClasses} onClick={this.onClick}>
          <WrappedListItemComponent
            input={this.props.input}
            item={this.props.item}
          />
        </div>
      )
    }

    constructor(props) {
      super(props)

      this.onClick = this.onClick.bind(this)
    }
  }
}

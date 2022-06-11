import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { translate } from '../../../common/services/i18n'

export default function asInfiniteListItem(WrappedListItemComponent) {
  class InfiniteListItemContainer extends Component {
    static propTypes = {
      className: PropTypes.string,
      input: PropTypes.object,
      isAdmin: PropTypes.bool.isRequired,
      item: PropTypes.object.isRequired,
      onClick: PropTypes.func,
      onEditClick: PropTypes.func,
    }

    static defaultProps = {
      className: '',
      input: undefined,
      onClick: undefined,
      onEditClick: undefined,
    }

    onClick() {
      if (!this.props.onClick) {
        return
      }

      this.props.onClick(this.props.item)
    }

    onEditClick(event) {
      event.stopPropagation()

      this.props.onEditClick(this.props.item)
    }

    renderEditButton() {
      if ((!this.props.item.isOwnerMe && !this.props.isAdmin) || !this.props.onEditClick) {
        return null
      }

      return (
        <button
          className="list-item__cover-image-button button button--green"
          onClick={this.onEditClick}
        >
          { translate('common.editButton') }
        </button>
      )
    }

    renderCoverImage() {
      if (!('images' in this.props.item)) {
        return null
      }

      const coverImageStyle = {}

      if (this.props.item.images.length > 0) {
        const url = this.props.item.images[0].smallImageUrl
        coverImageStyle.backgroundImage = `url('${url}')`
      }

      return (
        <div
          className="list-item__cover-image"
          style={coverImageStyle}
        >
          { this.renderEditButton() }
        </div>
      )
    }

    render() {
      const listClasses = classnames(
        'list-item',
        this.props.className, {
          'list-item--clickable': (this.props.onClick !== undefined),
        }
      )

      return (
        <div className={listClasses} onClick={this.onClick}>
          { this.renderCoverImage() }

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
      this.onEditClick = this.onEditClick.bind(this)
    }
  }

  function mapStateToProps(state) {
    return {
      isAdmin: state.user.isAdmin,
    }
  }

  return connect(mapStateToProps)(props => {
    return <InfiniteListItemContainer {...props} />
  })
}

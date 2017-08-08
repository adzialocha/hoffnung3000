import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { translate } from '../../../common/services/i18n'

class FormImageUploaderImage extends Component {
  static propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    imageId: PropTypes.any.isRequired,
    onImageRemoveClick: PropTypes.func,
  }

  static defaultProps = {
    onImageRemoveClick: undefined,
  }

  onImageRemoveClick(event) {
    event.preventDefault()

    this.props.onImageRemoveClick(this.props.imageId)
  }

  renderRemoveButton() {
    if (!this.props.onImageRemoveClick) {
      return null
    }

    return (
      <button
        className="image-uploader__image-button button button--red"
        onClick={this.onImageRemoveClick}
      >
        { translate('components.formImageUploader.deleteImageButton') }
      </button>
    )
  }

  render() {
    return (
      <div
        className="image-uploader__image"
        style={ { backgroundImage: `url(${this.props.backgroundImage})` } }
      >
        { this.renderRemoveButton() }
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.onImageRemoveClick = this.onImageRemoveClick.bind(this)
  }
}

export default FormImageUploaderImage

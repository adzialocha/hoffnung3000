import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { translate } from '../../../common/services/i18n'

class FormImageUploaderImage extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    onImageRemoveClick: PropTypes.func,
  }

  static defaultProps = {
    onImageRemoveClick: undefined,
  }

  onImageRemoveClick(event) {
    event.preventDefault()

    this.props.onImageRemoveClick(this.props.image)
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
    // Take base64 encoded image when it was just uploaded
    const { image } = this.props
    const backgroundImage = image.id ? image.smallImageUrl : image.base64String

    return (
      <div
        className="image-uploader__image"
        style={ { backgroundImage: `url(${backgroundImage})` } }
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

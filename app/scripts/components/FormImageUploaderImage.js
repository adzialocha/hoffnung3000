import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { translate } from '../services/i18n'

class FormImageUploaderImage extends Component {
  static propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    imageId: PropTypes.number.isRequired,
    onImageRemoveClick: PropTypes.func.isRequired,
  }

  onImageRemoveClick(event) {
    event.preventDefault()

    this.props.onImageRemoveClick(this.props.imageId)
  }

  render() {
    return (
      <div
        className="image-uploader__image"
        style={ { backgroundImage: `url(${this.props.backgroundImage})` } }
      >
        <button
          className="image-uploader__image-button button button--red"
          onClick={this.onImageRemoveClick}
        >
          { translate('components.formImageUploader.deleteImageButton') }
        </button>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.onImageRemoveClick = this.onImageRemoveClick.bind(this)
  }
}

export default FormImageUploaderImage

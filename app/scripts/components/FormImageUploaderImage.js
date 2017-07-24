import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { translate } from '../services/i18n'

class FormImageUploaderImage extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    onImageRemoveClick: PropTypes.func.isRequired,
  }

  onImageRemoveClick(event) {
    event.preventDefault()

    this.props.onImageRemoveClick(this.props.image)
  }

  render() {
    return (
      <div
        className="image-uploader__image"
        style={ { backgroundImage: `url(${this.props.image.smallImageUrl})` } }
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

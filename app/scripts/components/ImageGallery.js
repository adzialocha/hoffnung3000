import PropTypes from 'prop-types'
import React, { Component } from 'react'

class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
  }

  renderImages() {
    return this.props.images.map((image, index) => {
      const imageUrl = image.mediumImageUrl

      return (
        <img
          className="image-gallery__image"
          key={index}
          src={imageUrl}
        />
      )
    })
  }

  render() {
    return (
      <div className="image-gallery">
        { this.renderImages() }
      </div>
    )
  }
}

export default ImageGallery

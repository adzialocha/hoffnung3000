import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { FormImageUploaderImage } from './'
import { alert } from '../services/dialog'
import { asFormField, withImageUpload } from '../containers'
import { translate } from '../../../common/services/i18n'

function isNewImage(image) {
  // Newly uploaded images do not have an id yet
  return !('id' in image)
}

function convertFileToBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader()

    reader.onloadend = () => {
      resolve(reader.result)
    }

    reader.readAsDataURL(file)
  })
}

function convertFilesToBase64(files) {
  const promises = []

  for (let i = 0; i < files.length; i++) {
    promises.push(convertFileToBase64(files[i]))
  }

  return Promise.all(promises)
}

class FormImageUploader extends Component {
  static propTypes = {
    clearUploadedImages: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    maxImagesCount: PropTypes.number,
    removeImageFromList: PropTypes.func.isRequired,
    uploadImages: PropTypes.func.isRequired,
    uploadedImages: PropTypes.array.isRequired,
  }

  static defaultProps = {
    maxImagesCount: undefined,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.uploadedImages.length === this.props.uploadedImages.length) {
      return
    }

    this.updateImages(this.allImages())
  }

  componentWillUnmount() {
    this.props.clearUploadedImages()
  }

  onFilesChange(event) {
    const files = event.target.files

    if (files.length === 0) {
      return
    }

    const totalFilesCount = files.length + this.props.uploadedImages.length

    if (
      this.props.maxImagesCount &&
      totalFilesCount > this.props.maxImagesCount
    ) {
      alert(
        translate('components.formImageUploader.maxImageReached', {
          count: this.props.maxImagesCount,
        })
      )
      return
    }

    const formData = new FormData()

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i]
      formData.append('images', file, file.name)
    }

    convertFilesToBase64(files)
      .then(base64Strings => {
        this.props.uploadImages(formData, base64Strings)
      })

    event.target.value = ''
  }

  onUploadClick(event) {
    event.preventDefault()

    this._uploadButtonElem.click()
  }

  onImageRemoveClick(removedImage) {
    if (isNewImage(removedImage)) {
      this.props.removeImageFromList(removedImage.fileName)
    } else {
      this.updateImages(this.allImages().filter(image => {
        return image.fileName !== removedImage.fileName
      }))
    }
  }

  renderErrorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="form__error">
          { this.props.errorMessage }
        </div>
      )
    }

    return null
  }

  renderLoadingIndicator() {
    if (this.props.isLoading) {
      return (
        <p className="image-uploader__loading-indicator">
          { translate('common.loading') }
        </p>
      )
    }

    return null
  }

  renderUploadedImages() {
    return this.allImages().map((image, index) => {
      return (
        <FormImageUploaderImage
          image={image}
          key={index}
          onImageRemoveClick={this.onImageRemoveClick}
        />
      )
    })
  }

  renderUploadButton() {
    const isMaxReached = (
      this.props.maxImagesCount &&
      this.props.uploadedImages.length >= this.props.maxImagesCount
    )

    let uploadButtonLabel = translate(
      'components.formImageUploader.uploadButton'
    )

    if (isMaxReached) {
      uploadButtonLabel = translate(
        'components.formImageUploader.maxImageReached', {
          count: this.props.maxImagesCount,
        }
      )
    }

    return (
      <div className="image-uploader__footer">
        <input
          multiple="multiple"
          ref={c => { this._uploadButtonElem = c }}
          style={ { display: 'none' } }
          type="file"
          onChange={this.onFilesChange}
        />

        <button
          className="button button--green"
          disabled={
            this.props.disabled ||
            this.props.isLoading ||
            isMaxReached
          }
          onClick={this.onUploadClick}
        >
          { uploadButtonLabel }
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="image-uploader">
        { this.renderLoadingIndicator() }
        { this.renderErrorMessage() }

        <div className="image-uploader__image-list">
          { this.renderUploadedImages() }
        </div>

        { this.renderUploadButton() }
      </div>
    )
  }

  allImages() {
    const { input, uploadedImages } = this.props
    const currentValue = input.value ? input.value : []

    // Merge currently given images and newly uploaded ones
    const currentImages = currentValue.filter(image => {
      return !isNewImage(image)
    })

    return currentImages.concat(uploadedImages)
  }

  updateImages(images) {
    // Inform controlling component about current images and
    // remove base64 strings since its not needed there
    this.props.input.onChange(images.map(image => {
      const cleanedImage = Object.assign({}, image)
      delete cleanedImage.base64String
      return cleanedImage
    }))
  }

  constructor(props) {
    super(props)

    this.onFilesChange = this.onFilesChange.bind(this)
    this.onImageRemoveClick = this.onImageRemoveClick.bind(this)
    this.onUploadClick = this.onUploadClick.bind(this)
  }
}

export default asFormField(withImageUpload(FormImageUploader))

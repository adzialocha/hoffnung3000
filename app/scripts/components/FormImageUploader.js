import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asFormField, withImageUpload } from '../containers'
import { FormImageUploaderImage } from './'
import { translate } from '../services/i18n'

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
    promises.push(
      convertFileToBase64(files[i])
    )
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
    removeImageFromList: PropTypes.func.isRequired,
    setUploadedImages: PropTypes.func.isRequired,
    uploadedImages: PropTypes.array.isRequired,
    uploadImages: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (this.props.input.value) {
      this.props.setUploadedImages(this.props.input.value)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.uploadedImages.length !== this.props.uploadedImages.length) {
      const preparedImages = this.props.uploadedImages.map(image => {
        if (image.base64String) {
          return Object.assign({}, {
            fileName: image.fileName,
          })
        }

        return image
      })

      this.props.input.onChange(preparedImages)
    }
  }

  componentWillUnmount() {
    this.props.clearUploadedImages()
  }

  onFilesChange(event) {
    const files = event.target.files

    if (files.length === 0) {
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

    this.refs.uploadButton.click()
  }

  onImageRemoveClick(imageId) {
    this.props.removeImageFromList(imageId)
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
    return this.props.uploadedImages.map((image, index) => {
      return (
        <FormImageUploaderImage
          backgroundImage={image.smallImageUrl || image.base64String}
          imageId={image.id}
          key={index}
          onImageRemoveClick={this.onImageRemoveClick}
        />
      )
    })
  }

  renderUploadButton() {
    return (
      <div className="image-uploader__footer">
        <input
          multiple="multiple"
          ref="uploadButton"
          style={ { display: 'none' } }
          type="file"
          onChange={this.onFilesChange}
        />
        <button
          className="button button--green"
          disabled={this.props.disabled || this.props.isLoading}
          onClick={this.onUploadClick}
        >
          { translate('components.formImageUploader.uploadButton') }
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

  constructor(props) {
    super(props)

    this.onFilesChange = this.onFilesChange.bind(this)
    this.onImageRemoveClick = this.onImageRemoveClick.bind(this)
    this.onUploadClick = this.onUploadClick.bind(this)
  }
}

export default asFormField(withImageUpload(FormImageUploader))

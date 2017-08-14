import fetch from 'isomorphic-fetch'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { PreloadImage } from '../components'
import { withFlash } from '../containers'

import config from '../../../common/config'
import { translate } from '../../../common/services/i18n'

function fetchStream(marker) {
  const markerStr = marker ? `?marker=${marker}` : ''

  return new Promise((resolve, reject) => {
    fetch(`${config.gifStreamServer}/api/stream${markerStr}`)
      .then(response => {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          response.json().then(json => {
            if (response.status !== 200) {
              reject(json)
            } else {
              resolve(json)
            }
          })
        } else {
          reject()
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

class Stream extends Component {
  static propTypes = {
    flash: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.next()
  }

  onClick() {
    this.next()
  }

  onUpdateClick() {
    this.next(true)
  }

  renderSpinner() {
    if (!this.state.isLoading) {
      return null
    }

    return (
      <div className="gif-stream__spinner">
        { translate('common.loading') }
      </div>
    )
  }

  renderImages() {
    return this.state.images.map((image, index) => {
      return (
        <PreloadImage
          className="gif-stream__image"
          key={index}
          src={image.url}
        />
      )
    })
  }

  render() {
    return (
      <div className="gif-stream">
        <div className="gif-stream__container">
          { this.renderImages() }
        </div>
        <button
          className="button gif-stream__button"
          disabled={!this.state.nextMarker || this.state.isLoading}
          onClick={this.onClick}
        >
          { translate('views.stream.loadOlderImagesButton') }
        </button>
        <button
          className="button button--blue gif-stream__button"
          disabled={this.state.isLoading}
          onClick={this.onUpdateClick}
        >
          { translate('views.stream.updateButton') }
        </button>
        { this.renderSpinner() }
      </div>
    )
  }

  next(ignoreMarker = false) {
    if (ignoreMarker) {
      this.setState({
        images: [],
        isLoading: true,
      })
    } else {
      this.setState({
        isLoading: true,
      })
    }

    const marker = ignoreMarker ? null : this.state.nextMarker

    fetchStream(marker)
      .then(stream => {
        this.setState({
          images: this.state.images.concat(stream.data),
          isLoading: false,
          nextMarker: stream.nextMarker,
        })
      })
      .catch(() => {
        this.props.flash({
          text: translate('views.stream.error'),
          type: 'error',
        })
      })
  }

  constructor(props) {
    super(props)

    this.state = {
      images: [],
      isLoading: false,
      nextMarker: undefined,
    }

    this.onClick = this.onClick.bind(this)
    this.onUpdateClick = this.onUpdateClick.bind(this)
  }
}

export default withFlash(Stream)

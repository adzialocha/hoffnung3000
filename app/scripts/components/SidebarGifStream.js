import GifStream from 'gif-stream'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { withFlash } from '../containers'

import config from '../../../common/config'
import { translate } from '../../../common/services/i18n'

const STREAM_INTERVAL = 5000
const PREVIEW_IMAGES_COUNT = 3

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

class SidebarGifStream extends Component {
  static propTypes = {
    flash: PropTypes.func.isRequired,
  }

  componentWillUnmount() {
    this.stream.stop()
  }

  onClick() {
    this.setState({
      images: [],
      isLoading: true,
    })

    if (this.state.isStreaming) {
      this.stream.stop()

      this.setState({
        isStreaming: false,
        isLoading: false,
      })

      this.props.flash({
        text: translate('flash.gifStreamStopped'),
      })
    } else {
      this.stream.start()
        .then(() => {
          this.setState({
            isStreaming: true,
            isLoading: false,
          })

          this.props.flash({
            text: translate('flash.gifStreamStarted'),
          })
        })
        .catch(() => {
          const text = (
            isIOS ? translate(
              'flash.gifStreamErrorIOS'
            ) : translate('flash.gifStreamError')
          )

          this.props.flash({
            lifetime: 20000,
            text,
            type: 'error',
          })

          this.setState({
            isLoading: false,
          })
        })
    }
  }

  renderPreviewImages() {
    return this.state.images.map((src, index) => {
      return (
        <img
          className="gif-stream-preview__image"
          key={index}
          src={src}
        />
      )
    })
  }

  renderPreview() {
    if (this.state.images.length === 0 || !this.state.isStreaming) {
      return null
    }

    return (
      <div className="gif-stream-preview">
        { this.renderPreviewImages() }
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.renderPreview() }
        <div className="button-group">
          <button
            className="button"
            disabled={this.state.isLoading}
            onClick={this.onClick}
          >
            {
              this.state.isStreaming ? translate(
                'components.sidebarGifStream.stop'
              ) : translate('components.sidebarGifStream.start')
            }
          </button>
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)

    const options = {
      callback: data => {
        const images = this.state.images

        if (images.length === PREVIEW_IMAGES_COUNT) {
          images.shift()
        }

        images.push(data.imageData)

        this.setState({
          images,
        })
      },
      interval: STREAM_INTERVAL,
      serverUrl: config.gifStreamServer,
    }

    this.stream = new GifStream(options)

    this.state = {
      images: [],
      isLoading: false,
      isStreaming: false,
    }

    this.onClick = this.onClick.bind(this)
  }
}

export default withFlash(SidebarGifStream)

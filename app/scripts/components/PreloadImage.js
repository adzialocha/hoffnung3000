import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class PreloadImage extends Component {
  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
  }

  static defaultProps = {
    className: 'preload-image',
  }

  componentDidMount() {
    this.loadImage()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.loadImage()
    }
  }

  render() {
    const imageClasses = classnames(
      this.props.className, {
        [`${this.props.className}--error`]: this.state.isError,
        [`${this.props.className}--loading`]: this.state.isLoading,
        [`${this.props.className}--ready`]: this.state.isReady,
      }
    )

    const style = this.state.isReady ? {
      backgroundImage: `url('${this.props.src}')`,
    } : {}

    return (
      <div className={imageClasses} style={style} />
    )
  }

  loadImage() {
    this.setState({
      isError: false,
      isLoading: true,
      isReady: false,
    })

    const img = document.createElement('img')

    img.onload = () => {
      this.setState({
        isLoading: false,
        isReady: true,
      })
    }

    img.onerror = () => {
      this.setState({
        isError: true,
        isLoading: false,
      })
    }

    img.src = this.props.src
  }

  constructor(props) {
    super(props)

    this.state = {
      isError: false,
      isLoading: true,
      isReady: false,
    }
  }
}

export default PreloadImage

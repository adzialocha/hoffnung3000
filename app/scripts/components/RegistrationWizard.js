import React, { Component } from 'react'
import YouTube from 'react-youtube'

import { StaticPage } from './'

const videoOptions = {
  playerVars: {
    autoplay: 0,
    cc_load_policy: 0,
    controls: 0,
    disablekb: 1,
    fs: 0,
    iv_load_policy: 3,
    modestbranding: 1,
    playsinline: 1,
    showinfo: 0,
    rel: 0,
  },
}

const videoId = 'QILiHiTD3uc'

class RegistrationWizard extends Component {
  onVideoEnd() {
    this.setState({
      isVideoFinished: true,
    })
  }

  onNextStep() {
    this.setState({
      step: 1,
    })
  }

  renderSecondStep() {
    return (
      <div>
        <p>Second step</p>
      </div>
    )
  }

  renderFirstStep() {
    return (
      <div>
        <StaticPage slug="registration" />
        <div className="youtube">
          <YouTube
            className="youtube__container"
            opts={videoOptions}
            videoId={videoId}
            onEnd={this.onVideoEnd}
          />
        </div>
        <hr />
        <button
          disabled={!this.state.isVideoFinished}
          onClick={this.onNextStep}
        >
          Next Step
        </button>
      </div>
    )
  }

  render() {
    if (this.state.step === 0) {
      return this.renderFirstStep()
    }
    return this.renderSecondStep()
  }

  constructor(props) {
    super(props)

    this.state = {
      isVideoFinished: false,
      step: 0,
    }

    this.onNextStep = this.onNextStep.bind(this)
    this.onVideoEnd = this.onVideoEnd.bind(this)
  }
}

export default RegistrationWizard

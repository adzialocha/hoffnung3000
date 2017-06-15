import PropTypes from 'prop-types'
import React, { Component } from 'react'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'

import { StaticPage, RegistrationForm } from './'

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
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  onNextStep() {
    this.setState({
      registrationStep: this.state.registrationStep + 1,
    })
  }

  onPreviousStep() {
    this.setState({
      registrationStep: this.state.registrationStep - 1,
    })
  }

  onPayPalCheckout() {
  }

  onTransferCheckout() {
  }

  onTermsAcceptedChanged() {
    this.setState({
      isTermsAccepted: this.refs.termsCheckbox.checked,
    })
  }

  onVideoEnd() {
    this.setState({
      isVideoFinished: true,
    })
  }

  renderPaymentGateway() {
    return (
      <div className="form left">
        <h2>Payment</h2>
        <p>Last step!</p>
        <p>
          The participantion fee is <strong>25,00 Euro</strong>. We will provide you with daily breakfast and the tools to organize yourself during HOFFNUNG 3000.
        </p>
        <p>
          You can pay via PayPal to get direct access or choose to transfer the money via wire-transfer if you prefer this. We will enable your account after your money arrived on our bank-account.
        </p>
        <hr />

        <h2>Agreements</h2>
        <p>
          We want to make sure you read our terms before you sign up.
        </p>
        <ul>
          <li>
            As a participant you are liable for your own gear and instruments. As the host we dont take any responsibily for possible damage through accidents or usage of other participants.
          </li>
          <li>
            With a cancellation until the 01.08. we will pay you the full participation fee. After this date this is not anymore possible anymore.
          </li>
        </ul>
        <div className="form__field form__field--inline">
          <input
            checked={this.state.isTermsAccepted}
            className="form__field-input"
            disabled={this.props.isLoading}
            ref="termsCheckbox"
            type="checkbox"
            onChange={this.onTermsAcceptedChanged}
          />
          <label className="form__field-label">
            I agree with the terms
          </label>
        </div>
        <hr />

        <div className="button-group">
          <button
            className="button button--blue"
            disabled={!this.state.isTermsAccepted}
            onClick={this.onPayPalCheckout}
          >
            Pay via PayPal
          </button>
          <button
            className="button button--blue"
            disabled={!this.state.isTermsAccepted}
            onClick={this.onTransferCheckout}
          >
            Pay via Transfer
          </button>
        </div>
        <hr />

        <button
          className="button button--clear"
          onClick={this.onPreviousStep}
        >
          Previous step
        </button>
      </div>
    )
  }

  renderRegistrationForm() {
    return (
      <div>
        <RegistrationForm
          errorMessage={this.props.errorMessage}
          isLoading={this.props.isLoading}
          onSubmit={this.onNextStep}
        />
      </div>
    )
  }

  renderVideo() {
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
          className="button button--blue"
          disabled={!this.state.isVideoFinished}
          onClick={this.onNextStep}
        >
          Next Step
        </button>
      </div>
    )
  }

  renderStep() {
    if (this.state.registrationStep === 0) {
      return this.renderVideo()
    } else if (this.state.registrationStep === 1) {
      return this.renderRegistrationForm()
    }
    return this.renderPaymentGateway()
  }

  render() {
    return (
      <div>
        <h1>Registration (Step {this.state.registrationStep + 1} of 3)</h1>
        { this.renderStep() }
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      isTermsAccepted: false,
      isVideoFinished: false,
      registrationStep: 0,
    }

    this.onNextStep = this.onNextStep.bind(this)
    this.onPayPalCheckout = this.onPayPalCheckout.bind(this)
    this.onPreviousStep = this.onPreviousStep.bind(this)
    this.onTermsAcceptedChanged = this.onTermsAcceptedChanged.bind(this)
    this.onTransferCheckout = this.onTransferCheckout.bind(this)
    this.onVideoEnd = this.onVideoEnd.bind(this)
  }
}

function mapStateToProps(state) {
  const { errorMessage, isLoading } = state.auth

  return {
    errorMessage,
    isLoading,
  }
}

export default connect(
  mapStateToProps
)(RegistrationWizard)

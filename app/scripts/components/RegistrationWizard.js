import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Scroll from 'react-scroll'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'

import { register } from '../actions/auth'
import { RegistrationForm } from './'

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

const videoId = 'KRYVH7fGa68'

class RegistrationWizard extends Component {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    form: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    register: PropTypes.func.isRequired,
  }

  static defaultProps = {
    form: {},
  }

  onPayPalCheckout() {
    this.setState({
      isCheckoutClicked: true,
    })

    this.props.register('paypal', this.props.form.values)
  }

  onTransferCheckout() {
    this.setState({
      isCheckoutClicked: true,
    })

    this.props.register('transfer', this.props.form.values)
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

  renderSuccess() {
    return (
      <div className="form left">
        <h1>Hurra!</h1>
      </div>
    )
  }

  renderErrorMessage() {
    if (this.props.errorMessage) {
      Scroll.animateScroll.scrollToTop()

      return (
        <div className="form__error">
          { this.props.errorMessage }
        </div>
      )
    }
    return null
  }

  renderPaymentButtons() {
    if (this.state.isCheckoutClicked && this.props.isLoading) {
      return (
        <p>Loading ...</p>
      )
    }

    return (
      <div className="button-group">
        <button
          className="button button--rainbow"
          disabled={!this.state.isTermsAccepted || this.props.isLoading}
          onClick={this.onPayPalCheckout}
        >
          Pay via PayPal
        </button>
        <button
          className="button button--rainbow"
          disabled={!this.state.isTermsAccepted || this.props.isLoading}
          onClick={this.onTransferCheckout}
        >
          Pay via Transfer
        </button>
      </div>
    )
  }

  renderPaymentGateway() {
    return (
      <div className="form left">
        <h1>Registration (Step 3/3)</h1>
        { this.renderErrorMessage() }
        <h2>Payment</h2>
        <p>Last step!</p>
        <p>
          The participation fee is <strong>25,00 Euro</strong>. As a participant at the festival we will provide you with a daily breakfast and the tools to organise yourself during HOFFNUNG 3000 (these features will be available on the 23rd of July).
        </p>
        <p>
          You can pay via PayPal to get direct access or choose to transfer the money via wire-transfer if you prefer this. We will enable your account after your money arrived in our bank-account. You will get an email when this happens.
        </p>
        <hr />

        <h2>Agreements</h2>
        <p>
          We want to make sure you read our terms before you sign up:
        </p>
        <ul>
          <li>
            As a participant you are liable for your own gear and instruments. As hosts we don't take any responsibility for possible damage through accidents or usage by other participants.
          </li>
          <li>
            If you cancel before the 1st of August we will refund your full participation fee. After this date we can no longer give refunds.
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

        { this.renderPaymentButtons() }
        <hr />

        <button
          className="button button--clear"
          disabled={this.props.isLoading}
          onClick={this.previousStep}
        >
          Previous step
        </button>
      </div>
    )
  }

  renderRegistrationForm() {
    return (
      <div>
        <h1>Registration (Step 2 of 3)</h1>
        <RegistrationForm
          errorMessage={this.props.errorMessage}
          isLoading={this.props.isLoading}
          onSubmit={this.nextStep}
        />
      </div>
    )
  }

  renderVideo() {
    return (
      <div className="form">
        <h1>Registration (Step 1 of 3)</h1>
        <p>
          This is a small text about the registration for participants. You have to watch the whole video to proceed.
        </p>
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
          onClick={this.nextStep}
        >
          Next Step
        </button>
      </div>
    )
  }

  render() {
    if (this.state.registrationStep === 0) {
      return this.renderVideo()
    } else if (this.state.registrationStep === 1) {
      return this.renderRegistrationForm()
    } else if (this.state.registrationStep === 2) {
      return this.renderPaymentGateway()
    }
    return this.renderSuccess()
  }

  nextStep() {
    this.setState({
      registrationStep: this.state.registrationStep + 1,
    })

    Scroll.animateScroll.scrollToTop({ duration: 0, smooth: false })
  }

  previousStep() {
    this.setState({
      registrationStep: this.state.registrationStep - 1,
    })

    Scroll.animateScroll.scrollToTop({ duration: 0, smooth: false })
  }

  constructor(props) {
    super(props)

    this.state = {
      isCheckoutClicked: false,
      isTermsAccepted: false,
      isVideoFinished: false,
      registrationStep: 0,
    }

    this.nextStep = this.nextStep.bind(this)
    this.onPayPalCheckout = this.onPayPalCheckout.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.onTermsAcceptedChanged = this.onTermsAcceptedChanged.bind(this)
    this.onTransferCheckout = this.onTransferCheckout.bind(this)
    this.onVideoEnd = this.onVideoEnd.bind(this)
  }
}

function mapStateToProps(state) {
  const { errorMessage, isLoading } = state.auth

  return {
    errorMessage,
    form: state.form.registration,
    isLoading,
  }
}

export default connect(
  mapStateToProps, {
    register,
  }
)(RegistrationWizard)

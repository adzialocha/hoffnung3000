import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Scroll from 'react-scroll'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'

import config from '../../../config'
import { register } from '../actions/auth'
import { RegistrationForm } from '../forms'
import { StaticPage } from './'
import { translate } from '../services/i18n'

const totalSteps = 3

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

const videoId = config.video.registration

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
        <p>{ translate('components.common.loading') }</p>
      )
    }

    return (
      <div className="button-group">
        <button
          className="button button--rainbow"
          disabled={!this.state.isTermsAccepted || this.props.isLoading}
          onClick={this.onPayPalCheckout}
        >
          { translate('components.common.payViaPayPal') }
        </button>
        <button
          className="button button--rainbow"
          disabled={!this.state.isTermsAccepted || this.props.isLoading}
          onClick={this.onTransferCheckout}
        >
          { translate('components.common.payViaTransfer') }
        </button>
      </div>
    )
  }

  renderPaymentGateway() {
    const title = translate('components.registrationWizard.stepTitle', {
      currentStep: 3,
      totalSteps,
    })

    return (
      <div className="form left">
        <h1>{ title }</h1>
        { this.renderErrorMessage() }
        <StaticPage hideTitle={true} slug="registration-payment" />
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
            { translate('components.common.agreeWithTerms') }
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
          { translate('components.common.previousStep') }
        </button>
      </div>
    )
  }

  renderRegistrationForm() {
    const title = translate('components.registrationWizard.stepTitle', {
      currentStep: 2,
      totalSteps,
    })

    return (
      <div>
        <h1>{ title }</h1>
        <RegistrationForm
          errorMessage={this.props.errorMessage}
          isLoading={this.props.isLoading}
          onSubmit={this.nextStep}
        />
      </div>
    )
  }

  renderVideo() {
    const title = translate('components.registrationWizard.stepTitle', {
      currentStep: 1,
      totalSteps,
    })

    return (
      <div className="form">
        <h1>{ title }</h1>
        <StaticPage hideTitle={true} slug="registration-intro" />
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
          { translate('components.common.nextStep') }
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
    return null
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
    this.onTermsAcceptedChanged = this.onTermsAcceptedChanged.bind(this)
    this.onTransferCheckout = this.onTransferCheckout.bind(this)
    this.onVideoEnd = this.onVideoEnd.bind(this)
    this.previousStep = this.previousStep.bind(this)
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

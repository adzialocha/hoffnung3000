import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Scroll from 'react-scroll'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'

import pick from '../../../common/utils/pick'
import { RegistrationForm } from '../forms'
import { StaticPage } from './'
import { register } from '../actions/auth'
import { translate } from '../../../common/services/i18n'
import { withConfig } from '../containers'

const totalSteps = 3

const permittedFields = [
  'email',
  'username',
  'password',
  'paymentMethod',
]

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

class RegistrationWizard extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    errorMessage: PropTypes.string.isRequired,
    form: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    register: PropTypes.func.isRequired,
  }

  static defaultProps = {
    form: {},
  }

  onFreeCheckout() {
    this.setState({
      isCheckoutClicked: true,
    })

    this.props.register('free', pick(permittedFields, this.props.form.values))
  }

  onPayPalCheckout() {
    this.setState({
      isCheckoutClicked: true,
    })

    this.props.register('paypal', pick(permittedFieldsthis, this.props.form.values))
  }

  onTransferCheckout() {
    this.setState({
      isCheckoutClicked: true,
    })

    this.props.register('transfer', pick(permittedFieldsthisthis, this.props.form.values))
  }

  onTermsAcceptedChanged() {
    this.setState({
      isTermsAccepted: this._termsCheckboxElem.checked,
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

  renderFreeButton() {
    return (
      <button
        className="button button--rainbow"
        disabled={!this.state.isTermsAccepted || this.props.isLoading}
        onClick={this.onFreeCheckout}
      >
        { translate('components.common.freeCheckout') }
      </button>
    )
  }

  renderPayPalButton() {
    if (!this.props.config.isPayPalEnabled) {
      return null
    }

    return (
      <button
        className="button button--rainbow"
        disabled={!this.state.isTermsAccepted || this.props.isLoading}
        onClick={this.onPayPalCheckout}
      >
        { translate('components.common.payViaPayPal') }
      </button>
    )
  }

  renderTransferButton() {
    if (!this.props.config.isTransferEnabled) {
      return null
    }

    return (
      <button
        className="button button--rainbow"
        disabled={!this.state.isTermsAccepted || this.props.isLoading}
        onClick={this.onTransferCheckout}
      >
        { translate('components.common.payViaTransfer') }
      </button>
    )
  }

  renderPaymentButtons() {
    if (this.state.isCheckoutClicked && this.props.isLoading) {
      return <p>{ translate('common.loading') }</p>
    }

    if (this.props.config.participationPrice === 0) {
      return (
        <div className="button-group">
          { this.renderFreeButton() }
        </div>
      )
    }

    if (
      !this.props.config.isTransferEnabled &&
      !this.props.config.isPayPalEnabled
    ) {
      return <p>Warning: No payment was configured</p>
    }

    return (
      <div className="button-group">
        { this.renderPayPalButton() }
        { this.renderTransferButton() }
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
            ref={c => { this._termsCheckboxElem = c }}
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

  renderIntroductionVideo() {
    const { videoIntroductionId } = this.props.config

    if (!videoIntroductionId) {
      return null
    }

    return (
      <div className="youtube">
        <YouTube
          className="youtube__container"
          opts={videoOptions}
          videoId={videoIntroductionId}
          onEnd={this.onVideoEnd}
        />
      </div>
    )
  }

  renderIntroduction() {
    const { videoIntroductionId } = this.props.config

    const title = translate('components.registrationWizard.stepTitle', {
      currentStep: 1,
      totalSteps,
    })

    return (
      <div className="form">
        <h1>{ title }</h1>

        <StaticPage hideTitle={true} slug="registration-intro" />

        { this.renderIntroductionVideo() }

        <hr />

        <button
          className="button button--blue"
          disabled={!this.state.isVideoFinished && videoIntroductionId}
          onClick={this.nextStep}
        >
          { translate('components.common.nextStep') }
        </button>
      </div>
    )
  }

  render() {
    if (!this.props.config.isSignUpParticipantEnabled) {
      return null
    }

    if (this.state.registrationStep === 0) {
      return this.renderIntroduction()
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
    this.onFreeCheckout = this.onFreeCheckout.bind(this)
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
)(withConfig(RegistrationWizard))

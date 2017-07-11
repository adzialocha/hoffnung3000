import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Scroll from 'react-scroll'
import { connect } from 'react-redux'

import { buyTicket } from '../actions/auth'
import { TicketForm } from '../forms'

class Tickets extends Component {
  static propTypes = {
    buyTicket: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  onPayPalCheckout() {
    this.setState({
      isCheckoutClicked: true,
    })

    this.props.buyTicket('paypal', this.props.form.values)
  }

  onTransferCheckout() {
    this.setState({
      isCheckoutClicked: true,
    })

    this.props.buyTicket('transfer', this.props.form.values)
  }

  onTermsAcceptedChanged() {
    this.setState({
      isTermsAccepted: this.refs.termsCheckbox.checked,
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
        <h1>Get a festival ticket  (Step 2 of 2)</h1>
        { this.renderErrorMessage() }
        <h2>Payment</h2>
        <p>Last step!</p>
        <p>
          The festival ticket costs <strong>10,00 Euro</strong>. You will get access to all public events and get the opportunity to registrate your own places.
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

  renderTicketForm() {
    return (
      <section>
        <h1>Get a festival ticket (Step 1 of 2)</h1>
        <div className="form">
          <p>This is a text about festival tickets. This is a text about festival tickets. This is a text about festival tickets. This is a text about festival tickets.</p>
        </div>
        <TicketForm
          errorMessage={this.props.errorMessage}
          isLoading={this.props.isLoading}
          onSubmit={this.nextStep}
        />
      </section>
    )
  }

  render() {
    if (this.state.registrationStep === 0) {
      return this.renderTicketForm()
    } else if (this.state.registrationStep === 1) {
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
      registrationStep: 0,
    }

    this.nextStep = this.nextStep.bind(this)
    this.onPayPalCheckout = this.onPayPalCheckout.bind(this)
    this.onTermsAcceptedChanged = this.onTermsAcceptedChanged.bind(this)
    this.onTransferCheckout = this.onTransferCheckout.bind(this)
    this.previousStep = this.previousStep.bind(this)
  }
}

function mapStateToProps(state) {
  const { errorMessage, isLoading } = state.ticket
  return {
    errorMessage,
    form: state.form.ticket,
    isLoading,
  }
}

export default connect(
  mapStateToProps, {
    buyTicket,
  }
)(Tickets)
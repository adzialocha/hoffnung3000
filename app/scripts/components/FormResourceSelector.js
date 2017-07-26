import Modal from 'react-modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asFormField } from '../containers'
import { FormResourceSelectorList } from './'
import { translate } from '../services/i18n'

class FormResourceSelector extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    eventId: PropTypes.number,
    from: PropTypes.string,
    input: PropTypes.object.isRequired,
    to: PropTypes.string,
  }

  static defaultProps = {
    eventId: undefined,
    from: '',
    to: '',
  }

  onChange(selectedItems) {
    this.props.input.onChange(selectedItems)
  }

  onOpenClick(event) {
    event.preventDefault()

    this.setState({
      isModalOpen: true,
    })
  }

  onCloseClick() {
    this.setState({
      isModalOpen: false,
    })
  }

  renderModalContainer() {
    return (
      <FormResourceSelectorList
        eventId={this.props.eventId}
        from={this.props.from}
        to={this.props.to}
        value={this.props.input.value}
        onChange={this.onChange}
      />
    )
  }

  renderModalContent() {
    return (
      <div className="modal">
        <div className="modal__header">
          <h1>{ translate('components.formResourceSelector.title') }</h1>
        </div>
        { this.renderModalContainer() }
        <div className="modal__footer">
          <div className="button-group">
            <button
              className="button button--green"
              onClick={this.onCloseClick}
            >
              { translate('components.formResourceSelector.submitButton') }
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderModal() {
    return (
      <Modal
        contentLabel="FormResourceSelectorModal"
        isOpen={this.state.isModalOpen}
      >
        { this.renderModalContent() }
      </Modal>
    )
  }

  render() {
    return (
      <div className="button-group">
        { this.renderModal() }
        <button
          className="button button--green"
          disabled={this.props.disabled}
          onClick={this.onOpenClick}
        >
          { translate('components.formResourceSelector.openModalButton') }
        </button>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
    }

    this.onChange = this.onChange.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
    this.onOpenClick = this.onOpenClick.bind(this)
  }
}

export default asFormField(FormResourceSelector)

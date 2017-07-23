import Modal from 'react-modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asFormField } from '../containers'
import { FormItemSelectorList } from './'
import { translate } from '../services/i18n'

class FormItemSelector extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    from: PropTypes.string,
    input: PropTypes.object.isRequired,
    to: PropTypes.string,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    from: '',
    to: '',
  }

  onMeasureResize(contentRect) {
    this.setState({
      containerHeight: contentRect.bounds.height,
    })
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
      <FormItemSelectorList
        from={this.props.from}
        to={this.props.to}
        type={this.props.type}
        value={this.props.input.value}
        onChange={this.onChange}
      />
    )
  }

  renderModalContent() {
    return (
      <div className="modal">
        <div className="modal__header">
          <h1>{ this.localeHelper('title') }</h1>
        </div>
        { this.renderModalContainer() }
        <div className="modal__footer">
          <div className="button-group">
            <button
              className="button button--green"
              onClick={this.onCloseClick}
            >
              { translate('components.formItemSelector.submitButton') }
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderModal() {
    return (
      <Modal
        contentLabel="FormItemSelectorModal"
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
          { this.localeHelper('openModalButton') }
        </button>
      </div>
    )
  }

  localeHelper(key) {
    return translate(`components.formItemSelector.${this.props.type}.${key}`)
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

export default asFormField(FormItemSelector)

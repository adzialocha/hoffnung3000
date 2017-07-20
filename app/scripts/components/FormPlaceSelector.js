import Modal from 'react-modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asFormField, asInfiniteList } from '../containers'
import CuratedPlaceListItem from './CuratedPlaceListItem'
import { translate } from '../services/i18n'

const WrappedInfiniteList = asInfiniteList(CuratedPlaceListItem)

class FormPlaceSelector extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
  }

  componentDidUpdate() {
    this.props.input.onChange(this.state.place)
  }

  onPlaceClick(place) {
    this.setState({
      place,
      isModalOpen: false,
    })
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

  renderPlacesList() {
    return (
      <WrappedInfiniteList
        resourceName="places"
        onClick={this.onPlaceClick}
      />
    )
  }

  renderModalContent() {
    return (
      <div className="modal">
        <div className="modal__header">
          <h1>{ translate('components.placeSelector.title') }</h1>
        </div>
        <div className="modal__content">
          { this.renderPlacesList() }
        </div>
        <div className="modal__footer">
          <div className="button-group">
            <button
              className="button button--green"
              onClick={this.onCloseClick}
            >
              { translate('components.placeSelector.submitButton') }
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderSelectedPlace() {
    if (!this.state.place) {
      return null
    }

    return <CuratedPlaceListItem item={this.state.place} />
  }

  render() {
    return (
      <div className="form__field-input">
        <Modal
          contentLabel="FormPlaceSelectorModal"
          isOpen={this.state.isModalOpen}
        >
          { this.renderModalContent() }
        </Modal>
        { this.renderSelectedPlace() }
        <div className="button-group">
          <button
            className="button button--green"
            disabled={this.props.disabled}
            onClick={this.onOpenClick}
          >
            { translate('components.placeSelector.openModalButton') }
          </button>
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      place: props.input.value,
    }

    this.onCloseClick = this.onCloseClick.bind(this)
    this.onOpenClick = this.onOpenClick.bind(this)
    this.onPlaceClick = this.onPlaceClick.bind(this)
  }
}

export default asFormField(FormPlaceSelector)

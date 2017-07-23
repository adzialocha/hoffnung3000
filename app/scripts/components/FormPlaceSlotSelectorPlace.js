import Measure from 'react-measure'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asInfiniteList } from '../containers'
import { CuratedPlaceListItem } from './'
import { translate } from '../services/i18n'

const WrappedInfiniteList = asInfiniteList(CuratedPlaceListItem)

class FormPlaceSlotSelectorPlace extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  onMeasureResize(contentRect) {
    this.setState({
      containerHeight: contentRect.bounds.height,
    })
  }

  onPlaceClick(place) {
    this.setState({
      isModalOpen: false,
    })

    this.props.onChange(place)
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
        containerHeight={this.state.containerHeight}
        resourceName="places"
        useWindowAsScrollContainer={false}
        onClick={this.onPlaceClick}
      />
    )
  }

  renderModalContainer() {
    return (
      <Measure bounds={true} onResize={this.onMeasureResize}>
        {
          ({ measureRef }) => {
            return (
              <div
                className="modal__content modal__content--full"
                ref={measureRef}
              >
                { this.renderPlacesList() }
              </div>
            )
          }
        }
      </Measure>
    )
  }

  renderModalContent() {
    return (
      <div className="modal">
        <div className="modal__header">
          <h1>{ translate('components.placeSelector.title') }</h1>
        </div>
        { this.renderModalContainer() }
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

  renderModal() {
    return (
      <Modal
        contentLabel="FormPlaceSlotSelectorPlaceModal"
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
          { translate('components.placeSelector.openModalButton') }
        </button>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      containerHeight: 500,
      isModalOpen: false,
    }

    this.onCloseClick = this.onCloseClick.bind(this)
    this.onMeasureResize = this.onMeasureResize.bind(this)
    this.onOpenClick = this.onOpenClick.bind(this)
    this.onPlaceClick = this.onPlaceClick.bind(this)
  }
}

export default FormPlaceSlotSelectorPlace

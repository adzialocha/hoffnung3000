import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { asFormField } from '../containers'
import { fetchSlots } from '../actions/slots'
import { generateNewSlotItems } from '../utils/slots'
import { PlaceSelector, SlotSelector, CuratedPlaceListItem } from './'
import { translate } from '../services/i18n'

class FormPlaceSlotSelector extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    fetchSlots: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    slots: PropTypes.array.isRequired,
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.place && (
        !prevState.place ||
        this.state.place.id !== prevState.place.id
      )
    ) {
      this.props.fetchSlots(this.state.place.slug)
    }

    this.props.input.onChange(this.state)
  }

  onPlaceChange(place) {
    this.setState({
      place,
      selectedSlotsIndexes: [],
    })
  }

  onSlotChange(selectedSlotsIndexes) {
    this.setState({
      selectedSlotsIndexes,
    })
  }

  renderSelectedSlots() {
    return null
  }

  renderSlotSelector() {
    if (this.props.isLoading) {
      return (
        <p>
          { translate('components.formPlaceSlotSelector.loadingSlots') }
        </p>
      )
    }

    if (!this.state.place) {
      return (
        <p>
          { translate('components.formPlaceSlotSelector.selectAPlaceFirst') }
        </p>
      )
    }

    return (
      <SlotSelector
        disabled={this.props.disabled}
        selectedSlotsIndexes={this.state.selectedSlotsIndexes}
        slots={this.generateSlots()}
        onChange={this.onSlotChange}
      />
    )
  }

  renderSelectedPlace() {
    if (!this.state.place) {
      return null
    }

    return <CuratedPlaceListItem item={this.state.place} />
  }

  renderPlaceSelector() {
    return (
      <PlaceSelector
        disabled={this.props.disabled}
        place={this.state.place}
        onChange={this.onPlaceChange}
      />
    )
  }

  render() {
    return (
      <div className="form__field-input">
        { this.renderSelectedPlace() }
        { this.renderPlaceSelector() }
        { this.renderSelectedSlots() }
        { this.renderSlotSelector() }
      </div>
    )
  }

  constructor(props) {
    super(props)

    const { place, selectedSlotsIndexes } = props.input.value

    this.state = {
      place,
      selectedSlotsIndexes: selectedSlotsIndexes || [],
    }

    this.onSlotChange = this.onSlotChange.bind(this)
    this.onPlaceChange = this.onPlaceChange.bind(this)
  }

  generateSlots() {
    return generateNewSlotItems(
      this.state.place.slotSize,
      this.props.slots
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.slots,
  }
}

export default connect(
  mapStateToProps, {
    fetchSlots,
  }
)(asFormField(FormPlaceSlotSelector))


import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { asFormField, withConfig } from '../containers'
import { fetchSlots } from '../actions/slots'
import { formatEventTime } from '../../../common/utils/dateFormat'
import { generateNewSlotItems, getSlotWithIndex } from '../../../common/utils/slots'
import { translate } from '../../../common/services/i18n'

import {
  CuratedPlaceListItem,
  FormPlaceSlotSelectorPlace,
  FormPlaceSlotSelectorSlot,
} from './'

class FormPlaceSlotSelector extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    fetchSlots: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    slots: PropTypes.array.isRequired,
  }

  onPlaceChange(place) {
    this.props.input.onChange({
      place,
      selectedSlotsIndexes: [],
    })

    this.props.fetchSlots(place.slug)
  }

  onSlotChange(selectedSlotsIndexes) {
    this.props.input.onChange({
      place: this.props.input.value.place,
      selectedSlotsIndexes,
    })
  }

  renderSelectedSlots() {
    const slotIndexes = this.props.input.value.selectedSlotsIndexes

    if (!slotIndexes || slotIndexes.length === 0) {
      return null
    }

    const slots = this.generateSlots()
    const firstSlot = getSlotWithIndex(slots, slotIndexes[0])
    const lastSlot = getSlotWithIndex(slots, slotIndexes[slotIndexes.length - 1])

    return <h4>{ formatEventTime(firstSlot.from, lastSlot.to) }</h4>
  }

  renderSlotSelector() {
    if (this.props.isLoading) {
      return (
        <p>
          { translate('components.formPlaceSlotSelector.loadingSlots') }
        </p>
      )
    }

    if (!this.props.input.value.place) {
      return (
        <p>
          { translate('components.formPlaceSlotSelector.selectAPlaceFirst') }
        </p>
      )
    }

    return (
      <FormPlaceSlotSelectorSlot
        disabled={this.props.disabled}
        selectedSlotsIndexes={this.props.input.value.selectedSlotsIndexes}
        slots={this.generateSlots()}
        onChange={this.onSlotChange}
      />
    )
  }

  renderSelectedPlace() {
    if (!this.props.input.value.place) {
      return null
    }

    return <CuratedPlaceListItem item={this.props.input.value.place} />
  }

  renderPlaceSelector() {
    return (
      <FormPlaceSlotSelectorPlace
        disabled={this.props.disabled}
        place={this.props.input.value.place}
        onChange={this.onPlaceChange}
      />
    )
  }

  render() {
    return (
      <div className="form__field-input">
        <h2>{ translate('components.formPlaceSlotSelector.where') }</h2>
        { this.renderSelectedPlace() }
        <br />
        { this.renderPlaceSelector() }
        <hr />
        <h2>{ translate('components.formPlaceSlotSelector.when') }</h2>
        { this.renderSelectedSlots() }
        { this.renderSlotSelector() }
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.onSlotChange = this.onSlotChange.bind(this)
    this.onPlaceChange = this.onPlaceChange.bind(this)
  }

  generateSlots() {
    return generateNewSlotItems(
      this.props.input.value.place.slotSize,
      this.props.slots,
      this.props.config.festivalDateStart,
      this.props.config.festivalDateEnd
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
)(asFormField(withConfig(FormPlaceSlotSelector)))


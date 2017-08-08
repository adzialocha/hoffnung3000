import dateFns from 'date-fns'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { asFormField } from '../containers'
import { fetchSlots } from '../actions/slots'
import { formatEventTime } from '../utils/dateFormat'
import { generateNewSlotItems, getSlotWithIndex } from '../../../common/utils/slots'
import {
  CuratedPlaceListItem,
  FormPlaceSlotSelectorPlace,
  FormPlaceSlotSelectorSlot,
} from './'
import { translate } from '../../../common/services/i18n'

class FormPlaceSlotSelector extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    fetchSlots: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    slots: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.generateIsoEventTimeframe(this.state.selectedSlotsIndexes)
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
      eventFromStr: undefined,
      eventToStr: undefined,
      place,
      selectedSlotsIndexes: [],
    })
  }

  onSlotChange(selectedSlotsIndexes) {
    this.generateIsoEventTimeframe(selectedSlotsIndexes)
  }

  renderSelectedSlots() {
    const slotIndexes = this.state.selectedSlotsIndexes

    if (slotIndexes.length === 0) {
      return null
    }

    const slots = this.generateSlots()
    const firstSlot = getSlotWithIndex(slots, slotIndexes[0])
    const lastSlot = getSlotWithIndex(
      slots, slotIndexes[slotIndexes.length - 1]
    )

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

    if (!this.state.place) {
      return (
        <p>
          { translate('components.formPlaceSlotSelector.selectAPlaceFirst') }
        </p>
      )
    }

    return (
      <FormPlaceSlotSelectorSlot
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
      <FormPlaceSlotSelectorPlace
        disabled={this.props.disabled}
        place={this.state.place}
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

    const { place, selectedSlotsIndexes } = props.input.value

    this.state = {
      eventFromStr: undefined,
      eventToStr: undefined,
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

  generateIsoEventTimeframe(slotIndexes) {
    if (slotIndexes.length === 0) {
      return
    }

    const slots = this.generateSlots()
    const firstSlot = getSlotWithIndex(slots, slotIndexes[0])
    const lastSlot = getSlotWithIndex(
      slots, slotIndexes[slotIndexes.length - 1]
    )

    this.setState({
      eventFromStr: dateFns.format(firstSlot.from),
      eventToStr: dateFns.format(lastSlot.to),
      selectedSlotsIndexes: slotIndexes,
    })
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


import Measure from 'react-measure'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asInfiniteList } from '../containers'
import { CuratedSelectableListItem } from './'

const WrappedInfiniteList = asInfiniteList(CuratedSelectableListItem)

class FormResourceSelectorList extends Component {
  static propTypes = {
    eventId: PropTypes.number,
    from: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    to: PropTypes.string.isRequired,
    value: PropTypes.any,
  }

  static defaultProps = {
    eventId: undefined,
    value: [],
  }

  onMeasureResize(contentRect) {
    this.setState({
      containerHeight: contentRect.bounds.height,
    })
  }

  onResourceAddClick(item) {
    if (this.isSelected(item) || !this.isAvailable(item)) {
      return
    }

    this.state.selectedItems.push(item)

    this.setState({
      selectedItems: this.state.selectedItems,
    })

    this.props.onChange(this.state.selectedItems)
  }

  onResourceRemoveClick(item) {
    this.state.selectedItems = this.state.selectedItems.filter(selItem => {
      return selItem.id !== item.id
    })

    this.setState({
      selectedItems: this.state.selectedItems,
    })

    this.props.onChange(this.state.selectedItems)
  }

  renderAllItemsList() {
    const { from, to, eventId } = this.props
    const filter = { from, to }

    if (eventId) {
      filter.eventId = eventId
    }

    return (
      <WrappedInfiniteList
        containerHeight={this.state.containerHeight}
        filter={filter}
        input={
          {
            isAvailable: this.isAvailable,
            isRemovable: false,
            isSelected: this.isSelected,
          }
        }
        resourceName="resources"
        useWindowAsScrollContainer={false}
        onClick={this.onResourceAddClick}
      />
    )
  }

  renderSelectedItemsList() {
    return this.state.selectedItems.map((item, index) => {
      return (
        <CuratedSelectableListItem
          input={
            {
              isAvailable: this.isAvailable,
              isRemovable: true,
              isSelected: this.isSelected,
            }
          }
          item={item}
          key={index}
          onClick={this.onResourceRemoveClick}
        />
      )
    })
  }

  renderItemSelector() {
    return (
      <div className="item-selector">
        <div className="item-selector__list item-selector__list--selection">
          { this.renderSelectedItemsList() }
        </div>
        <div className="item-selector__list">
          { this.renderAllItemsList() }
        </div>
      </div>
    )
  }

  render() {
    return (
      <Measure bounds={true} onResize={this.onMeasureResize}>
        {
          ({ measureRef }) => {
            return (
              <div
                className="modal__content modal__content--full"
                ref={measureRef}
              >
                { this.renderItemSelector() }
              </div>
            )
          }
        }
      </Measure>
    )
  }

  isSelected(item) {
    return this.state.selectedItems.find((selItem) => {
      return selItem.id === item.id
    }) !== undefined
  }

  isAvailable(item) {
    if (item.isAvailable === undefined) {
      return true
    }
    return item.isAvailable
  }

  constructor(props) {
    super(props)

    this.state = {
      containerHeight: 500,
      selectedItems: props.value || [],
    }

    this.isAvailable = this.isAvailable.bind(this)
    this.isSelected = this.isSelected.bind(this)
    this.onMeasureResize = this.onMeasureResize.bind(this)
    this.onResourceAddClick = this.onResourceAddClick.bind(this)
    this.onResourceRemoveClick = this.onResourceRemoveClick.bind(this)
  }
}

export default FormResourceSelectorList

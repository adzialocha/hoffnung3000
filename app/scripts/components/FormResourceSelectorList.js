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
        filter={filter}
        input={
          {
            isAvailable: this.isAvailable,
            isRemovable: false,
            isSelected: this.isSelected,
          }
        }
        isInModal={true}
        resourceName="resources"
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

  render() {
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

  isSelected(item) {
    return this.state.selectedItems.find(selItem => {
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
      selectedItems: props.value || [],
    }

    this.isAvailable = this.isAvailable.bind(this)
    this.isSelected = this.isSelected.bind(this)
    this.onResourceAddClick = this.onResourceAddClick.bind(this)
    this.onResourceRemoveClick = this.onResourceRemoveClick.bind(this)
  }
}

export default FormResourceSelectorList

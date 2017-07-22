import Measure from 'react-measure'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asFormField, asInfiniteList } from '../containers'
import { CuratedSelectableListItem } from './'
import { translate } from '../services/i18n'

const WrappedInfiniteList = asInfiniteList(CuratedSelectableListItem)

class FormItemSelectorList extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.any,
  }

  static defaultProps = {
    value: [],
  }

  onMeasureResize(contentRect) {
    this.setState({
      containerHeight: contentRect.bounds.height,
    })
  }

  onItemAddClick(item) {
    if (this.isSelected(item)) {
      return
    }

    this.state.selectedItems.push(item)

    this.setState({
      selectedItems: this.state.selectedItems,
    })

    this.props.onChange(this.state.selectedItems)
  }

  onItemRemoveClick(item) {
    this.state.selectedItems = this.state.selectedItems.filter(selItem => {
      return selItem.id !== item.id
    })

    this.setState({
      selectedItems: this.state.selectedItems,
    })

    this.props.onChange(this.state.selectedItems)
  }

  renderAllItemsList() {
    return (
      <WrappedInfiniteList
        containerHeight={this.state.containerHeight}
        input={
          {
            isAvailable: this.isAvailable,
            isRemovable: false,
            isSelected: this.isSelected,
          }
        }
        resourceName={this.props.type}
        useWindowAsScrollContainer={false}
        onClick={this.onItemAddClick}
      />
    )
  }

  renderSelectedItemsList() {
    return this.state.selectedItems.map((item, index) => {
      return (
        <CuratedSelectableListItem
          item={item}
          key={index}
          input={
            {
              isAvailable: this.isAvailable,
              isRemovable: true,
              isSelected: this.isSelected,
            }
          }
          onClick={this.onItemRemoveClick}
        />
      )
    })
  }

  renderItemSelector() {
    return (
      <div className="item-selector">
        <div className="item-selector__selected-list">
          { this.renderSelectedItemsList() }
        </div>
        <div className="item-selector__all-list">
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
    })
  }

  isAvailable(item) {
    return true
  }

  constructor(props) {
    super(props)

    this.state = {
      containerHeight: 500,
      selectedItems: props.value || [],
    }

    this.isAvailable = this.isAvailable.bind(this)
    this.isSelected = this.isSelected.bind(this)
    this.onItemAddClick = this.onItemAddClick.bind(this)
    this.onItemRemoveClick = this.onItemRemoveClick.bind(this)
    this.onMeasureResize = this.onMeasureResize.bind(this)
  }
}

export default FormItemSelectorList

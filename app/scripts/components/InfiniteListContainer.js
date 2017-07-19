import Infinite from 'react-infinite'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Header, Footer, FlashMessageStage, Navigation } from '../components'

import { fetchList } from '../actions/infiniteList'
import { translate } from '../services/i18n'

const LIST_ITEM_HEIGHT = 175
const INFINITE_LOAD_OFFSET = 50

class InfiniteListContainer extends Component {
  static propTypes = {
    currentPageIndex: PropTypes.number.isRequired,
    fetchList: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    listItemNode: PropTypes.func.isRequired,
    listItems: PropTypes.array.isRequired,
    resourceName: PropTypes.string.isRequired,
    totalPageCount: PropTypes.number,
  }

  static defaultProps = {
    totalPageCount: undefined,
  }

  componentDidMount() {
    this.props.fetchList(this.props.resourceName, 0)
  }

  onInfiniteLoad() {
    if (this.props.currentPageIndex === this.props.totalPageCount){
      return
    }

    this.props.fetchList(
      this.props.resourceName,
      this.props.currentPageIndex + 1,
    )
  }

  renderSpinner() {
    if (!this.props.isLoading) {
      return null
    }
    return <p>{ translate('components.common.loading') }</p>
  }

  renderPlacesListItems() {
    return this.props.listItems.map((item, index) => {
      return this.props.listItemNode(item)
    })
  }

  render() {
    return (
      <Infinite
        elementHeight={LIST_ITEM_HEIGHT}
        infiniteLoadBeginEdgeOffset={INFINITE_LOAD_OFFSET}
        isInfiniteLoading={this.props.isLoading}
        loadingSpinnerDelegate={this.renderSpinner()}
        useWindowAsScrollContainer={true}
        onInfiniteLoad={this.onInfiniteLoad}
      >
        { this.renderPlacesListItems() }
      </Infinite>
    )
  }

  constructor(props) {
    super(props)

    this.onInfiniteLoad = this.onInfiniteLoad.bind(this)
  }
}

function mapStateToProps(state) {
  return state.infiniteList
}

export default connect(
  mapStateToProps, {
    fetchList,
  }
)(InfiniteListContainer)

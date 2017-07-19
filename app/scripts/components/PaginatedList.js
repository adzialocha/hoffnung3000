import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ITEMS_PER_PAGE } from '../actions/paginatedList'
import { PaginatedListActionButton } from './'
import { translate } from '../services/i18n'

class PaginatedList extends Component {
  static propTypes = {
    actions: PropTypes.array,
    columns: PropTypes.array.isRequired,
    currentPageIndex: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    listItems: PropTypes.array.isRequired,
    userId: PropTypes.number.isRequired,
    userIsAdmin: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    actions: [],
  }

  renderTableCellString(key, value) {
    return (
      <td className="paginated-list__row-cell" key={key}>
        { value }
      </td>
    )
  }

  renderTableCellBoolean(key, value) {
    const cellClasses = classnames(
      'paginated-list__row-cell',
      'paginated-list__row-cell--boolean', {
        'paginated-list__row-cell--boolean-active': value,
      }
    )

    return (
      <td className={cellClasses} key={key} />
    )
  }

  renderTableCells(item, index) {
    return this.props.columns.map((cell) => {
      const key = `${item.id}${cell.key}`
      const value = item[cell.key]
      if (cell.key === '$index') {
        return this.renderTableCellString(key,
          (index + 1) + (this.props.currentPageIndex * ITEMS_PER_PAGE)
        )
      }
      if (typeof value === 'boolean') {
        return this.renderTableCellBoolean(key, value)
      }
      return this.renderTableCellString(key, value)
    })
  }

  renderTableActions(item) {
    if (this.props.actions.length === 0) {
      return null
    }

    return (
      <td>
        {
          this.props.actions.map((action, index) => {
            const key = `${item.id}${index}`

            if (action.isAdmin && !this.props.userIsAdmin) {
              return null
            }

            if (action.isOwner && !item.ownerId === this.props.userId) {
              return null
            }

            if (!this.isItemRemovable(item) && action.isDeleteAction) {
              return null
            }

            return (
              <PaginatedListActionButton
                classNameModifier={action.classNameModifier}
                item={item}
                key={key}
                label={action.title}
                onClick={action.onClick}
              />
            )
          })
        }
      </td>
    )
  }

  renderTableRows() {
    return this.props.listItems.map((item, index) => {
      return (
        <tr className="paginated-list__row" key={item.id}>
          { this.renderTableCells(item, index) }
          { this.renderTableActions(item) }
        </tr>
      )
    })
  }

  renderTableHeader() {
    return this.props.columns.map((cell) => {
      return (
        <th className="paginated-list__header-cell" key={cell.key}>
          { cell.title }
        </th>
      )
    })
  }

  render() {
    if (this.props.isLoading) {
      return <p>{ translate('common.loading') }</p>
    }

    return (
      <div className="paginated-list">
        <table className="paginated-list__table">
          <thead>
            <tr className="paginated-list__header">
              { this.renderTableHeader() }
              { this.props.actions.length > 0 ? <th /> : null }
            </tr>
          </thead>
          <tbody>
            { this.renderTableRows() }
          </tbody>
        </table>
      </div>
    )
  }

  isItemRemovable(item) {
    if (typeof item.isRemovable === 'boolean') {
      return item.isRemovable
    }
    return true
  }
}

function mapStateToProps(state) {
  const { currentPageIndex, listItems, isLoading } = state.paginatedList
  const { isAdmin, id } = state.user

  return {
    currentPageIndex,
    isLoading,
    listItems,
    userId: id,
    userIsAdmin: isAdmin,
  }
}

export default connect(
  mapStateToProps
)(PaginatedList)

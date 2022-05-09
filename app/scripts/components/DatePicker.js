import ReactDatePicker  from 'react-date-picker'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { DateTime } from 'luxon'

import { withConfig } from '../containers'

class DatePicker extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }

  onChange(date) {
    if (date) {
      this.props.onChange(DateTime.fromJSDate(date).toISODate())
    } else {
      this.props.onChange(null)
    }
  }

  render() {
    const { festivalDateStart, festivalDateEnd } = this.props.config

    return (
      <ReactDatePicker
        format="dd.MM.y"
        maxDate={new Date(festivalDateEnd)}
        minDate={new Date(festivalDateStart)}
        value={new Date(this.props.value)}
        onChange={this.onChange}
      />
    )
  }

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }
}

export default withConfig(DatePicker)

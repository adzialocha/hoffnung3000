import ReactDatePicker  from 'react-date-picker'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { withConfig } from '../containers'

class CalendarDatePicker extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  onChange(date) {
    if (date) {
      this.props.onChange(date)
      this.setState({
        value: date,
      })
    } else {
      this.props.onChange([null, null])
      this.setState({
        value: null,
      })
    }
  }

  render() {
    const { festivalDateStart, festivalDateEnd } = this.props.config

    return (
      <ReactDatePicker
        defaultValue={null}
        maxDate={new Date(festivalDateEnd)}
        minDate={new Date(festivalDateStart)}
        returnValue="range"
        value={this.state.value}
        onChange={this.onChange}
      />
    )
  }

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)

    this.state = {
      value: null,
    }
  }
}

export default withConfig(CalendarDatePicker)

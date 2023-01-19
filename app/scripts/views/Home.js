import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import YouTube from 'react-youtube'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { StaticPage, CuratedEventListItem, DatePicker, TagSelector } from '../components'
import { asInfiniteListCalendar, withConfig } from '../containers'
import { translate } from '../../../common/services/i18n'

const WrappedInfiniteList = asInfiniteListCalendar(CuratedEventListItem)

const HomeVideo = withConfig('videoHomeId', props => {
  const videoOptions = {
    playerVars: {
      autoplay: 0,
      cc_load_policy: 0,
      controls: 1,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
      showinfo: 0,
      rel: 0,
    },
  }

  return (
    <Fragment>
      <hr />
      <h2>{translate('views.home.videoTitle')}</h2>

      <div className="form">
        <div className="youtube">
          <YouTube
            className="youtube__container"
            opts={videoOptions}
            videoId={props.config.videoHomeId}
          />
        </div>
      </div>
    </Fragment>
  )
})

// Select current day or first day of festival when too early
function defaultDate(festivalDateStart) {
  return DateTime.now({ zone: 'utc ' }) < DateTime.fromISO(festivalDateStart, { zone: 'utc' })
  || DateTime.now({ zone: 'utc ' }) > DateTime.fromISO(festivalDateStart, { zone: 'utc' })
    ? festivalDateStart
    : DateTime.now().toISODate()
}

class Home extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isParticipant: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
  }

  onClick(item) {
    this.props.push(`/events/${item.slug}`)
  }

  onEditClick(item) {
    this.props.push(`/events/${item.slug}/edit`)
  }

  onPreviewClick() {
    this.props.push('/tickets')
  }

  onDateSelected(selectedDate) {
    if (selectedDate) {
      this.setState({
        selectedDate,
        isDefault: false,
      })
    } else {
      this.setState({
        selectedDate: defaultDate(this.props.config.festivalDateStart),
        isDefault: true,
      })
    }
  }

  onTagFilterChange(selectedTags) {
    this.setState({
      selectedTags,
    })
  }

  renderItemsList() {
    // Select all dates when nothing is selected, otherwise filter by day
    const from = this.state.selectedDate
    const to = this.state.isDefault
      ? DateTime.fromISO(this.props.config.festivalDateEnd, { zone: 'utc' })
      : DateTime.fromISO(from).plus({ day: 1 }).toISODate()

    if (
      (
        !this.props.isAuthenticated ||
        !this.props.isActive
      ) && this.props.config.festivalTicketPrice !== 0
    ) {
      return (
        <WrappedInfiniteList
          date={this.state.selectedDate}
          resourceName="preview"
          tags={this.state.selectedTags}
          onClick={this.onPreviewClick}
        />
      )
    }

    return (
      <WrappedInfiniteList
        from={from}
        resourceName="events"
        tags={this.state.selectedTags}
        to={to}
        onClick={this.onClick}
        onEditClick={this.onEditClick}
      />
    )
  }

  renderCreateButton() {
    if (
      !(
        this.props.isParticipant ||
        this.props.isAdmin
      ) || !this.props.isAuthenticated
    ) {
      return null
    }

    return (
      <Link className="button button--red" to="/new/event">
        {translate('views.events.createNewButton')}
      </Link>
    )
  }

  renderText() {
    return <StaticPage hideTitle={true} slug="home" />
  }

  renderTagSelector() {
    if (this.props.config.defaultTags.length === 0) {
      return null
    }

    const tags = this.props.config.defaultTags.map(tag => {
      return { label: tag, value: tag }
    })

    return (
      <Fragment>
        <h3>{translate('views.events.tagSelectorTitle')}</h3>

        <TagSelector
          defaultTags={tags}
          tagArray={this.state.selectedTags}
          onChange={this.onTagFilterChange}
        />
      </Fragment>
    )
  }

  renderDatePicker() {
    return (
      <Fragment>
        <hr />
        <h3>{translate('views.events.datePickerTitle')}</h3>

        <DatePicker
          isDefault={this.state.isDefault}
          value={this.state.selectedDate}
          onChange={this.onDateSelected}
        />
      </Fragment>
    )
  }

  render() {
    return (
      <section>
        {this.renderText()}
        <br />
        <HomeVideo />
        {this.renderCreateButton()}
        {this.renderDatePicker()}
        {this.renderTagSelector()}
        <hr />
        {this.renderItemsList()}
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedDate: defaultDate(props.config.festivalDateStart),
      selectedTags: [],
      isDefault: true,
    }

    this.onClick = this.onClick.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
    this.onPreviewClick = this.onPreviewClick.bind(this)
    this.onDateSelected = this.onDateSelected.bind(this)
    this.onTagFilterChange = this.onTagFilterChange.bind(this)
  }
}

function mapStateToProps(state) {
  return {
    ...state.auth,
    ...state.user,
    ...state.meta,
  }
}

export default connect(
  mapStateToProps, {
    push,
  }
)(withConfig(Home))

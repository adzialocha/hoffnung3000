import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import YouTube from 'react-youtube'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { StaticPage, CuratedEventListItem } from '../components'
import { translate } from '../../../common/services/i18n'
import { withConfig } from '../containers'
import { asInfiniteListCalendar } from '../containers'

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
      <h2>{ translate('views.home.videoTitle') }</h2>

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

class Home extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  }

  onClick(item) {
    this.props.push(`/events/${item.slug}`)
  }

  render() {
    const { festivalDateStart } = this.props.config
    const today = DateTime.now({ zone: 'utc ' }) < DateTime.fromISO(festivalDateStart, { zone: 'utc' })
      ? festivalDateStart
      : DateTime.now().toISODate()

    return (
      <section>
        <StaticPage slug="home" />
        <HomeVideo />
        <hr />
        <h3>{ translate('views.home.upcomingEventsTitle') }</h3>
        <WrappedInfiniteList from={today} resourceName="events" tags={[]} onClick={this.onClick} />
        <Link className="button" to="/calendar">
          { translate('views.home.goToCalendar') }
        </Link>
      </section>
    )
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(
  mapStateToProps, {
    push,
  }
)(withConfig(Home))

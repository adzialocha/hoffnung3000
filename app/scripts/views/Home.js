import PropTypes from 'prop-types'
import React, { Component } from 'react'
import YouTube from 'react-youtube'

import config from '../../../config'
import { StaticPage } from '../components'
import { translate } from '../services/i18n'
import { withAuthState } from '../containers'

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

const videoId = config.video.tutorial

class Home extends Component {
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isParticipant: PropTypes.bool.isRequired,
  }

  render() {
    const { isAdmin, isAuthenticated, isParticipant } = this.props

    if (isAuthenticated && (isParticipant || isAdmin)) {
      return (
        <section>
          <StaticPage slug="home-with-video" />
          <hr />
          <h2>{ translate('views.home.platformTutorial') }</h2>
          <div className="youtube">
            <YouTube
              className="youtube__container"
              opts={videoOptions}
              videoId={videoId}
            />
          </div>
        </section>
      )
    }

    return (
      <section>
        <StaticPage slug="home" />
      </section>
    )
  }
}

export default withAuthState(Home)

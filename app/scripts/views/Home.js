import React, { Component, Fragment } from 'react'
import YouTube from 'react-youtube'

import { StaticPage, SimpleEventListItem } from '../components'
import { translate } from '../../../common/services/i18n'
import { withAuthState, withConfig } from '../containers'
import { asSimpleEventList } from '../containers'

const SimpleEventList = asSimpleEventList(SimpleEventListItem)

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
  render() {
    return (
      <section>
        <StaticPage slug="home" />
        <HomeVideo />
        <SimpleEventList
          resourceName="events"
        />
      </section>
    )
  }
}

export default withAuthState(Home)

import PropTypes from 'prop-types'
import { Component } from 'react'

import { withUserStatus, withAuthState } from '../containers'

const UPDATE_STATUS_FREQUENCY = 30000

class UserStatusUpdater extends Component {
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isParticipant: PropTypes.bool.isRequired,
    isWithInterval: PropTypes.bool,
    updateStatus: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isWithInterval: false,
  }

  componentDidMount() {
    this.update()
  }

  componentDidUpdate(prevProps) {
    const isPlatformUser = this.props.isAdmin || this.props.isParticipant

    if (isPlatformUser !== (prevProps.isAdmin || prevProps.isParticipant)) {
      this.update()
    }
  }

  componentWillUnmount() {
    this.stopInterval()
  }

  onTick() {
    this.props.updateStatus()
  }

  render() {
    return false
  }

  update() {
    const isPlatformUser = this.props.isAdmin || this.props.isParticipant

    if (this.props.isAuthenticated && isPlatformUser) {
      this.startInterval()
      this.onTick()
    } else {
      this.stopInterval()
    }
  }

  startInterval() {
    if (!this.props.isWithInterval) {
      return
    }

    this.interval = window.setInterval(
      this.onTick,
      UPDATE_STATUS_FREQUENCY
    )
  }

  stopInterval() {
    if (!this.props.isWithInterval) {
      return
    }

    window.clearInterval(this.interval)
  }

  constructor(props) {
    super(props)

    this.onTick = this.onTick.bind(this)
  }
}

export default withUserStatus(withAuthState(UserStatusUpdater))

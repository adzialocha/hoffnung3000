import React, { Component } from 'react'

import { translate } from '../../../common/services/i18n'

class NotFound extends Component {
  render() {
    return (
      <section>
        <h1>{ translate('components.staticPage.errorTitle') }</h1>
        <p>{ translate('components.staticPage.errorText') }</p>
      </section>
    )
  }
}

export default NotFound

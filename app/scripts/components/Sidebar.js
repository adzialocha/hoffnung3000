import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  Drawer,
  SidebarToggle,
  Newsletter,
} from './'

import {
  withAuthState,
  withDrawerState,
  withUserStatus,
} from '../containers'

class Sidebar extends Component {
  static propTypes = {
    isSidebarExpanded: PropTypes.bool.isRequired,
  }

  renderSidebar() {
    return (
      <div className="sidebar">
        <div className="sidebar__content">
          <Newsletter />
          <hr />
          <small>
            <p>Open Futures wird deine E-mail-Adresse die du in diesem Formular angibst dazu verwenden, mit dir in Kontakt zu bleiben und dir Updates und Informationen zu übermitteln.</p>
            <p>Du kannst deine Meinung jederzeit ändern, indem du auf den Abbestellungs-Link klickst, den du in der Fusszeile jeder E-Mail, die du von uns erhältst, finden kannst. Wir verwenden MailChimp als unsere Plattform zur Versendung von Newslettern. Indem du unten zur Absendung dieses Formulars klickst, bestätigst du, dass die von dir angegebenen Informationen an MailChimp zur Verarbeitung in Übereinstimmung mit deren <a href="https://mailchimp.com/legal/" target="_blank">Datenschutzrichtlinien und Bedingungen</a> weitergegeben werden.</p>
          </small>
        </div>
      </div>
    )
  }

  render() {
    return (
      <aside role="complementary">
        <SidebarToggle />

        <Drawer expanded={this.props.isSidebarExpanded} right={true}>
          { this.renderSidebar() }
        </Drawer>
      </aside>
    )
  }
}

export default withAuthState(withDrawerState(withUserStatus(Sidebar)))

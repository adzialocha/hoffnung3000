import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

import {
  isAdmin,
  isAuthenticated,
  isParticipant,
  shouldNotBeAuthenticated,
} from './auth'

import { withConfig } from './containers'

import {
  Activity,
  Admin,
  Calendar,
  ConversationsIndex,
  ConversationsNew,
  ConversationsShow,
  EventsEdit,
  EventsNew,
  EventsShow,
  ForgotPassword,
  Home,
  Login,
  NotFound,
  Page,
  PlacesEdit,
  PlacesIndex,
  PlacesNew,
  PlacesShow,
  Profile,
  Register,
  ResetPassword,
  ResourcesEdit,
  ResourcesIndex,
  ResourcesNew,
  Stream,
  Tickets,
} from './views'

export default class Routes extends Component {
  render() {
    return (
      <main role="main">
        <Switch>
          <Route component={Home} exact={true} path="/" />
          <Route component={shouldNotBeAuthenticated(Login)} path="/login" />
          <Route component={withConfig('isSignUpParticipantEnabled', shouldNotBeAuthenticated(Register))} path="/register" />
          <Route component={withConfig('isSignUpVisitorEnabled', shouldNotBeAuthenticated(Tickets))} path="/tickets" />
          <Route component={shouldNotBeAuthenticated(ForgotPassword)} path="/forgot" />
          <Route component={shouldNotBeAuthenticated(ResetPassword)} path="/reset/:token" />
          <Route component={Page} path="/pages/:slug" />
          <Route component={Calendar} path="/calendar" />
          <Route component={isAuthenticated(Profile)} path="/profile" />
          <Route component={withConfig('gifStreamServerUrl', isAuthenticated(Stream))} path="/stream" />
          <Route component={withConfig('isActivityStreamEnabled', isParticipant(Activity))} path="/activity" />
          <Route component={isParticipant(EventsNew)} path="/new/event" />
          <Route component={isParticipant(PlacesNew)} path="/new/place" />
          <Route component={isParticipant(ResourcesNew)} path="/new/resource" />
          <Route component={isParticipant(EventsEdit)} path="/events/:slug/edit" />
          <Route component={isAuthenticated(EventsShow)} path="/events/:slug" />
          <Route component={isAuthenticated(EventsShow)} path="/eventisfree/:slug" />
          <Route component={isParticipant(PlacesEdit)} path="/places/:slug/edit" />
          <Route component={isParticipant(PlacesShow)} path="/places/:slug" />
          <Route component={isParticipant(PlacesIndex)} path="/places" />
          <Route component={withConfig('isDerMarktEnabled', isParticipant(ResourcesEdit))} path="/resources/:slug/edit" />
          <Route component={withConfig('isDerMarktEnabled', isParticipant(ResourcesIndex))} path="/resources" />
          <Route component={withConfig('isInboxEnabled', isParticipant(ConversationsNew))} path="/inbox/new" />
          <Route component={withConfig('isInboxEnabled', isParticipant(ConversationsShow))} path="/inbox/conversations/:id" />
          <Route component={withConfig('isInboxEnabled', isParticipant(ConversationsIndex))} path="/inbox" />
          <Route component={isAdmin(Admin)} path="/admin" />
          <Route component={NotFound} />
        </Switch>
      </main>
    )
  }
}

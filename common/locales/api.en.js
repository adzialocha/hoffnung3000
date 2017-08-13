export default {
  errors: {
    auth: {
      invalidCredentials: 'Invalid credentials',
      invalidResetToken: 'Expired or invalid token',
      paymentError: 'Payment error',
      paymentMethodError: 'Invalid payment method error',
      registrationLimitExceeded: 'Registration limit was exceeded',
      userExistsAlready: 'A user with this email address already exists',
      userNotExisting: 'User does not exist',
    },
    meeting: {
      alreadyJoined: 'You already joined a meeting during the given time',
      invalidDate: 'Date is too soon or already in the past',
      noPlaceFound: 'Could not find a usable place during the given time',
    },
  },
  activityMails: {
    RECEIVED_MESSAGE: {
      subject: 'YOU RECEIVED A NEW MESSAGE',
      text: '{name} sent you a message on the platform!',
    },
    RECEIVED_REQUEST: {
      subject: 'YOU RECEIVED A REQUEST',
      text: '{name} requests your {objectType} "{objectTitle}" for an event!',
    },
    RANDOM_MEETING_JOINED: {
      subject: 'YOU JOINED A RANDOM MEETING',
      text: 'You joined a random meeting!\n\nA conversation related to this random meeting was just openend in your inbox, check it on the platform for further details about time and place.\n\nThere you can start the dialogue with other attending participants you might eventually meet soon <3',
    },
  },
  products: {
    participation: 'Participation fee',
    ticket: 'Festival ticket',
  },
  meeting: {
    createMessageText: '{name} created a random meeting at {placeTitle} {date}',
    createMessageTitle: 'Random meeting {date} @ {placeTitle}',
    joinMessageText: '{name} joins the random meeting!',
  },
}

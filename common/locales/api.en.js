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
      alreadyJoined: 'You already joined a meeting during this date',
      invalidDate: 'The date is too soon or already in the past',
      noPlaceFound: 'Sorry, we could not find a place for you during the given date',
    },
  },
  activityMails: {
    RECEIVED_MESSAGE: {
      subject: 'YOU RECEIVED A NEW MESSAGE',
      message: '{name} sent you a message on the platform!',
    },
    RECEIVED_REQUEST: {
      subject: 'YOU RECEIVED A REQUEST',
      message: '{name} requests your {objectType} "{objectTitle}" for an event!',
    },
    CREATE_RANDOM_MEETING: {
      subject: 'YOU CREATED A RANDOM MEETING',
      message: 'You created a random meeting! You can wait now for other participants who might join in!\n\nA conversation related to this random meeting was just openend in your inbox, check it on the platform.\n\nThere you can start the dialogue with other attending participants you might eventually meet soon <3',
    },
    JOIN_RANDOM_MEETING: {
      subject: 'YOU JOINED A RANDOM MEETING',
      message: 'You joined a random meeting!\n\nA conversation related to this random meeting was just openend in your inbox, check it on the platform for further details like time and place.\n\nThere you can start the dialogue with other attending participants you might eventually meet soon <3',
    },
  },
  products: {
    participation: 'Participation fee',
    ticket: 'Festival ticket',
  },
  meeting: {
    createMessageText: '{name} created a random meeting at {placeTitle} on {date}. This conversation is your tool where you can prepare and organize yourself for the final rendezvous. Drink a beer, start a band or a revolution, have a passionate debate or fall in love with each other - even in virtual places.',
    createMessageTitle: 'Random meeting {date} @ {placeTitle}',
    joinMessageText: '{name} joins the random meeting!',
  },
}

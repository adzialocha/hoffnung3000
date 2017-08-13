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

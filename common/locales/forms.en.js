export default {
  common: {
    errors: {
      required: 'This field is required',
      minLength: 'This field needs a minimum of {len} characters',
      maxLength: 'This field can\'t be longer than {len} characters',
    },
    basicInformation: 'Basic information',
    uploadImages: 'Upload images',
    submit: 'Save',
  },
  auth: {
    errors: {
      cityCodeRequired: 'Please enter your city code',
      cityRequired: 'Please enter your city',
      countryRequired: 'Please enter your country',
      firstnameRequired: 'Please enter your first name',
      invalidMail: 'Invalid email address',
      lastnameRequired: 'Please enter your last name',
      mailRequired: 'Please enter your email address',
      maxLength: 'This field can\'t be longer than {len} characters',
      minLength: 'This field needs a minimum of {len} characters',
      passwordLength: 'Must be {len} characters or more',
      passwordMatch: 'The given passwords do not match',
      passwordRepeat: 'Please repeat your password',
      passwordRequired: 'Please enter your password',
      phoneRequired: 'Please enter your mobile number',
      required: 'This field is required',
      streetRequired: 'Please enter your street and number',
    },
    changePassword: 'Change your password',
    changePasswordButton: 'Update',
    city: 'City',
    cityCode: 'City code',
    country: 'Country',
    email: 'Your email address',
    firstname: 'Firstname',
    forgotPasswordButton: 'Send',
    lastname: 'Lastname',
    loginButton: 'Login',
    newPassword: 'New password',
    newPasswordRepeat: 'Repeat new password',
    nextStepButton: 'Next step',
    password: 'Password',
    passwordRepeat: 'Repeat password',
    phone: 'Your mobile phone number',
    resetPasswordButton: 'Update',
    streetAndNumber: 'Street and number',
    whyAddress: 'We need your address only to send you an invoice.',
    whyPhone: 'We need your mobile number only in case we need to reach you during the festival.',
    yourAddress: 'Your address',
    yourPassword: 'Your password',
  },
  config: {
    errors: {
      cityCodeRequired: 'Please enter your city code',
      cityRequired: 'Please enter your city',
      countryRequired: 'Please enter your country',
      firstnameRequired: 'Please enter your first name',
      invalidMail: 'Invalid email address',
      lastnameRequired: 'Please enter your last name',
      mailRequired: 'Please enter your email address',
      maxLength: 'This field can\'t be longer than {len} characters',
      minLength: 'This field needs a minimum of {len} characters',
      passwordLength: 'Must be {len} characters or more',
      passwordMatch: 'The given passwords do not match',
      passwordRepeat: 'Please repeat your password',
      passwordRequired: 'Please enter your password',
      phoneRequired: 'Please enter your mobile number',
      required: 'This field is required',
      streetRequired: 'Please enter your street and number',
    },
    basicInformation: 'General',
    mails: 'Mails',
    localization: 'Localization',
    festivalDuration: 'Festival duration',
    festivalTickets: 'Festival tickets',
    wireTransfer: 'Wire transfer',
    videos: 'YouTube Videos',
    features: 'Feature Flags',
    services: 'External Services / Features',
    baseUrl: 'URL',
    title: 'Title',
    description: 'Short description',
    defaultTags: 'enter list of default event tags',
    mailAddressAdmin: 'Email-address of admin / website owner',
    mailAddressRobot: 'Email-address of automated mail sender',
    currency: 'Currency',
    defaultCity: 'Default city name',
    defaultCountry: 'Default country name',
    defaultLatitude: 'Default GPS position: Latitude',
    defaultLongitude: 'Default GPS position: Longitude',
    festivalDateStart: 'Start of festival',
    festivalDateEnd: 'End of festival',
    maximumParticipantsCount: 'Maximum number of participants',
    festivalTicketPrice: 'Visitor ticket price',
    participationPrice: 'Participant ticket price',
    transferReceiverName: 'Receiver name',
    transferBankName: 'Bank name',
    transferIBAN: 'IBAN',
    transferBIC: 'BIC',
    videoHomeId: 'Homepage video ID',
    videoIntroductionId: 'Sign up video ID',
    isActivityStreamEnabled: 'Use activity stream',
    isAnonymizationEnabled: 'Use anonymized animal avatars for users',
    isInboxEnabled: 'Use messaging',
    isRandomMeetingEnabled: 'Use random meetings',
    isDerMarktEnabled: 'Use Der Markt',
    isSignUpParticipantEnabled: 'Activate partipant ticket sales',
    isSignUpVisitorEnabled: 'Activate visitor ticket sales',
    gifStreamServerUrl: 'gif-stream Server URL',
  },
  place: {
    errors: {
      accessibilityInfoRequired: 'Please enter accessibility information',
      capacityRequired: 'Please enter place capacity',
      cityCodeRequired: 'The given address is incomplete. Please fill in the city code field',
      cityRequired: 'The given address is incomplete. Please fill in the city field',
      countryRequired: 'The given address is incomplete. Please fill in the country field',
      descriptionMinLength: 'The description needs a minimum of {len} characters',
      descriptionRequired: 'Describe your place a little',
      gpsCoordinatesRequired: 'No GPS coordinates are specified',
      slotSizeMaximum: 'The slot-size is too large',
      slotSizeMinimum: 'The slot-size is too small',
      slotSizeRequired: 'Please specify a slot size',
      slotSizeWrongFormat: 'The slot-size has a wrong format',
      streetRequired: 'The given address is incomplete. Please fill in the street field',
      titleMinLength: 'The title has to have a minimum of {len} characters',
      titleRequired: 'Please give your place a title',
    },
    accessibilityInfo: 'Accessibility information',
    capacity: 'Capacity',
    areEventsPublic: 'Events in this place are visible in the calendar',
    description: 'Describe your place',
    publicOrPrivate: 'Is it public or private?',
    slots: 'When is it bookable?',
    slotSizeNote: 'Other participants will be able to reserve so called slots in your place. Here you can define how long one slot is.',
    submit: 'Done!',
    title: 'Title of your place',
    where: 'Where is it?',
  },
  resource: {
    errors: {
      descriptionRequired: 'Describe your resource a little',
      titleRequired: 'Please give your resource a title',
    },
    description: 'Describe your resource briefly',
    submit: 'Done. Save it!',
    title: 'Title of your resource',
  },
  event: {
    errors: {
      descriptionRequired: 'Sorry, your description is missing',
      selectPlace: 'Please select a place for your event',
      selectPlaceAndTime: 'You did\'t select any time or place for your event',
      selectTime: 'Please select a time slot for your event',
      setTags: 'Please select at least one tag',
      titleRequired: 'Please give your event a title',
      validUrl: 'Please enter website in this format: "https://website.com"',
    },
    areEventsPublic: 'This event is visible in the calendar and to the public.',
    description: 'Description',
    pickResources: 'Which resources?',
    placeIsPrivate: 'Please note that the selected place is already private',
    publicOrPrivate: 'Is it public or private?',
    selectPlaceAndSlotsFirst: 'Please select a place and time first!',
    submit: 'Save event',
    textFieldPlaceholder: 'You can use Markdown code to style text in this field in the following ways:\n\n **bold text** & *italicized text* \n web image ![](https://www.image.jpg) \n web link [title](https://www.example.com) \n\n When you save your event, the styling and images will show up.',
    ticketUrl: 'Ticket website link',
    tags: 'Event tags',
    title: 'Title of your event',
    additionalInfo: 'Any extra info (like social media handles etc..)',
    websiteUrl: 'Website link',
    what: 'What?',
    whereAndWhen: 'Where and when?',
  },
  message: {
    errors: {
      textRequired: 'Please write a text',
      titleRequired: 'Please give your conversation a title',
    },
    formTitle: 'Write a message',
    submit: 'Send message',
    text: 'Your text',
    title: 'Title of conversation',
  },
}

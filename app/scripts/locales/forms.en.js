export default {
  common: {
    errors: {
      required: 'This field is required',
      minLength: 'This field needs a minimum of {len} characters',
      maxLength: 'This field can\'t be longer than {len} characters',
    },
    basicInformation: 'Basic information',
  },
  place: {
    errors: {
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
    title: 'Title of your place',
    description: 'Describe your place',
    where: 'Where is it?',
    publicOrPrivate: 'Is it public or private?',
    areEventsPublic: 'Events in this place are visible in the calendar',
    slots: 'When is it bookable?',
    submit: 'Done!',
    slotSizeNote: 'Other participants will be able to reserve so called slots in your place. Here you can define how long one slot is.',
  },
  item: {
    errors: {
      descriptionRequired: 'Describe your item a little',
      titleRequired: 'Please give your item a title',
    },
    title: 'Title of your item',
    description: 'Describe your item briefly',
    submit: 'Done. Save it!',
  },
  performer: {
    errors: {
      descriptionRequired: 'Describe your performer a little',
      titleRequired: 'Please give your performer a title',
    },
    title: 'Title of your performer',
    description: 'Describe it!',
    submit: 'Ok. Save it!',
  },
}

function isDefined(obj) {
  return typeof obj !== 'undefined'
}

function float(str, fallback) {
  return isDefined(str) ? parseFloat(str) : fallback
}

function integer(str, fallback) {
  return isDefined(str) ? parseInt(str, 10) : fallback
}

const config = {
  timezone: process.env.CONFIG_TIMEZONE || 'Europe/Berlin',
  title: process.env.CONFIG_TITLE,
  description: process.env.CONFIG_DESCRIPTION,
  basePath: process.env.CONFIG_URL,
  mailAddressAdmin: process.env.CONFIG_MAIL_ADMIN,
  mailAddressRobot: process.env.CONFIG_MAIL_ROBOT,
  maximumParticipantsCount: integer(process.env.CONFIG_MAXMIMUM_PARTICIPATION_COUNT, 30),
  festivalTicketPrice: float(process.env.CONFIG_FESTIVAL_TICKET_PRICE, 10.00),
  participationPrice: float(process.env.CONFIG_PARTICIPATION_PRICE, 25.00),
  currency: process.env.CONFIG_CURRENCY || 'EUR',
  transferDetails: {
    receiverName: process.env.CONFIG_TRANSFER_NAME,
    bankName: process.env.CONFIG_TRANSFER_BANK,
    IBAN: process.env.CONFIG_TRANSFER_IBAN,
    BIC: process.env.CONFIG_TRANSFER_BIC,
  },
  video: {
    registration: process.env.CONFIG_VIDEO_REGISTRATION || 'KRYVH7fGa68',
    tutorial: process.env.CONFIG_VIDEO_TUTORIAL || 'ux2R9jwEIgw',
  },
  googleMapApiKey: process.env.GOOGLE_MAP_API_KEY,
  gifStreamServer: process.env.GIF_STREAM_SERVER,
  festivalDateStart: process.env.CONFIG_FESTIVAL_DATE_START || '2017-08-24T00:00:00.000+02:00',
  festivalDateEnd: process.env.CONFIG_FESTIVAL_DATE_START || '2017-08-27T00:00:00.000+02:00',
  defaultCity: process.env.CONFIG_DEFAULT_CITY || 'Berlin',
  defaultCountry: process.env.CONFIG_DEFAULT_COUNTRY || 'Germany',
  defaultLatitude: float(process.env.CONFIG_DEFAULT_LATITUDE, 52.53647),
  defaultLongitude: float(process.env.CONFIG_DEFAULT_LONGITUDE, 13.40780),
}

export default config

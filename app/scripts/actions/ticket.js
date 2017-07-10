import ActionTypes from '../actionTypes'
import { FLASH } from '../middlewares/flash'
import { postRequest } from '../services/api'
import { REDIRECT } from '../middlewares/redirect'

export function buyTicket(paymentMethod = 'paypal', data) {
  const meta = {
    paymentMethod,
  }

  const payload = {
    ...data,
    paymentMethod,
    paymentProduct: 'ticket',
  }

  const success = {
    type: ActionTypes.TICKET_SUCCESS,
    meta,
  }

  if (paymentMethod === 'transfer') {
    success[FLASH] = {
      text: 'Thank you! We just sent you an email with our bank account details! Please contact us if you didn\'t receive the mail in the next minutes or you have any questions.',
      lifetime: 30000,
    }
    success[REDIRECT] = '/'
  }

  return postRequest(['auth', 'signup'], payload, {
    request: {
      type: ActionTypes.TICKET_REQUEST,
      meta,
    },
    success,
    failure: {
      type: ActionTypes.TICKET_FAILURE,
      meta,
      [FLASH]: {
        text: 'Something went wrong.',
      },
    },
  })
}

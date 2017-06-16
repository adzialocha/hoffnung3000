import paypal from 'paypal-rest-sdk'

const CURRENCY_EURO = 'EUR'

function extractLink(links, key) {
  for (let i = 0; i < links.length; i += 1) {
    if (links[i].rel === key) {
      return links[i].href
    }
  }
  return ''
}

export function createPayment(product) {
  const { name, description, price } = product

  paypal.configure({
    mode: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
    client_id: process.env.PAYPAL_ID,
    client_secret: process.env.PAYPAL_SECRET,
  })

  const items = [{
    name,
    description,
    price,
    quantity: 1,
    currency: CURRENCY_EURO,
  }]

  const paymentDetails = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: process.env.PAYPAL_RETURN_URL,
      cancel_url: process.env.PAYPAL_CANCEL_URL,
    },
    transactions: [{
      description: name,
      amount: {
        currency: CURRENCY_EURO,
        total: price,
      },
      item_list: {
        items,
      },
    }],
  }

  return new Promise((resolve, reject) => {
    paypal.payment.create(paymentDetails, (err, payment) => {
      if (err) {
        return reject(err)
      }
      return resolve({
        redirect: extractLink(payment.links, 'approval_url'),
        payment,
      })
    })
  })
}

export function executePayment(paymentId, payerId) {
  const paymentDetails = { payer_id: payerId }

  return new Promise((resolve, reject) => {
    paypal.payment.execute(paymentId, paymentDetails, (err, payment) => {
      if (err) {
        return reject(err)
      }
      return resolve(payment)
    })
  })
}

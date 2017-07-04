import Payment from 'payment'

const validateCreditCard = (values) => {
  const errors = {}
  const requiredFields = [
    'firstName',
    'lastName',
    'fullAddress',
    'number',
    'exp',
    'cvc',
    'name',
    'phone',
    'street',
    'city',
    'state',
    'zip'
  ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.number) {
    const type = Payment.fns.cardType(values.number);
    const cards = document.querySelectorAll('[data-brand]');

    [].forEach.call(cards, (element) => {
      if (element.getAttribute('data-brand') === type) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    })
  }
  return errors
}

export default validateCreditCard

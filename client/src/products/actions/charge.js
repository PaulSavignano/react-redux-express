export const addCharge = (charge) => {
  return {
    type: 'ADD_ORDER',
    charge
  }
}
export const startAddCharge = (total, token) => {
  return (dispatch, getState) => {
    return fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ total, token })
    })
      .then(res => res.json())
      .then(json => {
        dispatch(addCharge(json))
      })
      .catch(err => console.log(err))
  }
}

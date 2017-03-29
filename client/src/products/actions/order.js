export const fetchOrders = (orders) => ({
  type: 'FETCH_ORDERS',
  orders
})
export const startFetchOrders = () => {
  return (dispatch, getState) => {
    return fetch('/api/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      }
    })
      .then(res => res.json())
      .then(json => dispatch(fetchOrders(json)))
      .catch(err => console.log(err))
  }
}

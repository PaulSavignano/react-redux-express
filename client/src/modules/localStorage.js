export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart')
    if (serializedState === null) {
      return undefined
    }
    return {
      cart: JSON.parse(serializedState)
    }
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.cart)
    localStorage.setItem('cart', serializedState)
  } catch (err) {
    console.log(err)
  }
}

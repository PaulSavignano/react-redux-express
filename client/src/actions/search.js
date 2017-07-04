export const type = 'SEARCH'

const ADD = `ADD_${type}`
const TOGGLE = `TOGGLE_${type}`
const DELETE = `DELETE_${type}`

// Search
export const searchToggle = (bool) => {
  return {
    type: TOGGLE,
    searching: bool
  }
}

export const searchAdd = (value) => {
  return {
    type: ADD,
    value
  }
}

export const searchDelete = () => {
  return {
    type: DELETE
  }
}
